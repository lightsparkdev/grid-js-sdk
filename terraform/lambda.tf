variable "lambda_image_tag" {
  type        = string
  description = "ECR image tag for the Grid MCP Lambda function (linux/arm64, with LWA layer). Distinct from var.image_tag (consumed by agentcore.tf during Phase A coexistence) so that updating the Lambda image does not trigger an AgentCore runtime update. Must be unique per push since the ECR repo is IMMUTABLE."
  nullable    = false

  validation {
    condition     = !contains(["latest", "main", "master", "stable"], var.lambda_image_tag)
    error_message = "lambda_image_tag must be unique per build (e.g. git SHA). Moving tags like 'latest'/'main'/'master'/'stable' will be rejected by the IMMUTABLE ECR repo on second push."
  }
}

variable "stainless_api_key" {
  type        = string
  description = "Stainless API key used by the hosted code-execution sandbox and docs-search API. Sourced from the Lightspark Stainless org dashboard. Sensitive — provide via TF_VAR_stainless_api_key or terraform.auto.tfvars (gitignored)."
  sensitive   = true
  nullable    = false
}

resource "aws_cloudwatch_log_group" "grid_mcp" {
  name              = "/aws/lambda/grid-mcp"
  retention_in_days = 30
}

# Customer-managed KMS key for encrypting the Lambda function's environment
# variables (notably STAINLESS_API_KEY). AWS Lambda env vars are encrypted
# at rest by default with an AWS-managed key, but pinning to a CMK here
# means access to the secret is gated by an explicit kms:Decrypt grant —
# even a principal with lambda:GetFunctionConfiguration on the function
# can't read the env var values without the CMK grant.
resource "aws_kms_key" "grid_mcp_lambda_env" {
  description = "Encrypts Lambda env vars for the grid-mcp function"
  # Maximum window. Premature destroy + later roll-forward needs `aws kms
  # cancel-key-deletion` (see Risks); 30 days gives ample recovery time.
  deletion_window_in_days = 30
  enable_key_rotation     = true
}

resource "aws_kms_alias" "grid_mcp_lambda_env" {
  name          = "alias/grid-mcp-lambda-env"
  target_key_id = aws_kms_key.grid_mcp_lambda_env.key_id
}

data "aws_iam_policy_document" "lambda_assume_role" {
  statement {
    principals {
      type        = "Service"
      identifiers = ["lambda.amazonaws.com"]
    }
    actions = ["sts:AssumeRole"]
  }
}

resource "aws_iam_role" "lambda" {
  name               = "grid-mcp-lambda"
  assume_role_policy = data.aws_iam_policy_document.lambda_assume_role.json
}

data "aws_iam_policy_document" "lambda" {
  statement {
    sid       = "Logs"
    actions   = ["logs:CreateLogStream", "logs:PutLogEvents"]
    resources = ["${aws_cloudwatch_log_group.grid_mcp.arn}:*"]
  }

  statement {
    sid = "EcrPull"
    actions = [
      "ecr:BatchGetImage",
      "ecr:GetDownloadUrlForLayer",
      "ecr:BatchCheckLayerAvailability",
    ]
    resources = [aws_ecr_repository.grid_mcp.arn]
  }

  statement {
    sid       = "EcrAuthToken"
    actions   = ["ecr:GetAuthorizationToken"]
    resources = ["*"]
  }

  statement {
    sid       = "DecryptEnvVars"
    actions   = ["kms:Decrypt"]
    resources = [aws_kms_key.grid_mcp_lambda_env.arn]
  }
}

resource "aws_iam_role_policy" "lambda" {
  role   = aws_iam_role.lambda.id
  policy = data.aws_iam_policy_document.lambda.json
}

# Belt-and-suspenders: explicit ECR repository policy granting the Lambda
# service principal pull access. Same-account container Lambdas can pull
# via the execution role alone, but adding this resource policy removes
# ambiguity and protects against AWS behavior shifts.
data "aws_iam_policy_document" "ecr_lambda_pull" {
  statement {
    sid    = "LambdaECRImageRetrievalPolicy"
    effect = "Allow"
    principals {
      type        = "Service"
      identifiers = ["lambda.amazonaws.com"]
    }
    actions = [
      "ecr:BatchGetImage",
      "ecr:GetDownloadUrlForLayer",
    ]
    condition {
      test     = "StringLike"
      variable = "aws:sourceArn"
      values   = ["arn:aws:lambda:${data.aws_region.current.id}:${data.aws_caller_identity.current.account_id}:function:*"]
    }
  }
}

resource "aws_ecr_repository_policy" "grid_mcp_lambda_pull" {
  repository = aws_ecr_repository.grid_mcp.name
  policy     = data.aws_iam_policy_document.ecr_lambda_pull.json
}

resource "aws_lambda_function" "grid_mcp" {
  function_name = "grid-mcp"
  role          = aws_iam_role.lambda.arn
  package_type  = "Image"
  image_uri     = "${aws_ecr_repository.grid_mcp.repository_url}:${var.lambda_image_tag}"
  architectures = ["arm64"]
  memory_size   = 1024
  # 5 minutes — matches the `execute` tool's advertised total timeout
  # (see packages/mcp-server/src/instructions.ts). A shorter Lambda
  # timeout would silently kill long-running code-tool invocations
  # before the MCP server's own timeout fires, producing 502s instead
  # of the structured error the MCP client expects.
  timeout = 300

  # Cap parallel invocations. With auth_type=NONE on the Function URL,
  # this is the v1 mitigation against cost / availability abuse until
  # WAF lands as a follow-up. 5 concurrent invocations × ~1024 MB ≈
  # peak compute cost bounded; cold-start latency for legitimate users
  # is unaffected at this concurrency.
  reserved_concurrent_executions = 5

  kms_key_arn = aws_kms_key.grid_mcp_lambda_env.arn

  environment {
    variables = {
      STAINLESS_API_KEY = var.stainless_api_key
      ORIGIN_SECRET     = data.aws_ssm_parameter.cloudfront_origin_secret.value
    }
  }

  logging_config {
    log_format = "JSON"
    log_group  = aws_cloudwatch_log_group.grid_mcp.name
  }

  depends_on = [
    aws_iam_role_policy.lambda,
    aws_cloudwatch_log_group.grid_mcp,
    aws_ecr_repository_policy.grid_mcp_lambda_pull,
  ]
}

resource "aws_lambda_function_url" "grid_mcp" {
  function_name      = aws_lambda_function.grid_mcp.function_name
  authorization_type = "NONE"
  invoke_mode        = "RESPONSE_STREAM"

  # CORS is intentionally NOT configured. Browser-based MCP clients are
  # out of scope for v1. Permissive CORS (allow_origins=["*"]) on a
  # public no-auth endpoint enables CSRF-style abuse where a malicious
  # site triggers requests using credentials a victim's browser MCP
  # client has stored. With no CORS block, browsers reject cross-origin
  # requests; non-browser MCP clients (Claude Code, Cursor, custom)
  # are unaffected. Adding browser support requires:
  #   1. A specific allow_origins allowlist (NOT "*"), AND
  #   2. Origin validation in src/http.ts to defense-in-depth against
  #      non-browser callers spoofing the Origin header.
  # Both are tracked in Task 11 follow-ups.
}

# Public-invoke resource-based policy. Setting authorization_type=NONE on the
# Function URL is necessary but NOT sufficient: Lambda still requires an
# explicit resource-based policy granting principal="*" with the matching
# function_url_auth_type condition. Without this, every request — direct or
# CloudFront-proxied — returns 403 AccessDeniedException ("Function URL
# authorization issues") regardless of auth_type. The gate against random
# direct hits is the X-Origin-Secret check in src/http.ts; the bare URL is
# intentionally publicly invokable at the IAM layer.
resource "aws_lambda_permission" "public_invoke" {
  statement_id           = "FunctionURLAllowPublicAccess"
  action                 = "lambda:InvokeFunctionUrl"
  function_name          = aws_lambda_function.grid_mcp.function_name
  principal              = "*"
  function_url_auth_type = "NONE"
}

# Companion permission for invoke_mode=RESPONSE_STREAM. Empirically, requests
# routed through CloudFront to a Function URL with invoke_mode=RESPONSE_STREAM
# require BOTH lambda:InvokeFunctionUrl AND lambda:InvokeFunction. With only
# the URL-form permission, CloudFront-routed requests intermittently return
# 403 AccessDeniedException, while direct hits to the bare Function URL
# (which use a different internal code path) succeed. This permission has
# no auth-type condition because lambda:InvokeFunction is the lower-level
# invocation action that Lambda's CloudFront proxy path resolves to.
resource "aws_lambda_permission" "public_invoke_function" {
  statement_id  = "FunctionURLAllowPublicInvokeFunction"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.grid_mcp.function_name
  principal     = "*"
}

# CloudWatch alarms — minimal post-deploy visibility so a production
# regression (5xx, throttle exhaustion, or Stainless 401 storm) is
# actually noticed instead of waiting for customer reports.
resource "aws_cloudwatch_metric_alarm" "grid_mcp_errors" {
  alarm_name          = "grid-mcp-lambda-errors"
  alarm_description   = "Lambda errors > 0 in 5 min — investigate via /aws/lambda/grid-mcp logs"
  namespace           = "AWS/Lambda"
  metric_name         = "Errors"
  dimensions          = { FunctionName = aws_lambda_function.grid_mcp.function_name }
  statistic           = "Sum"
  period              = 300
  evaluation_periods  = 1
  threshold           = 0
  comparison_operator = "GreaterThanThreshold"
  treat_missing_data  = "notBreaching"
}

resource "aws_cloudwatch_metric_alarm" "grid_mcp_throttles" {
  alarm_name          = "grid-mcp-lambda-throttles"
  alarm_description   = "Lambda throttles > 0 — reserved_concurrent_executions=5 is being hit, suggests abuse or organic load growth"
  namespace           = "AWS/Lambda"
  metric_name         = "Throttles"
  dimensions          = { FunctionName = aws_lambda_function.grid_mcp.function_name }
  statistic           = "Sum"
  period              = 300
  evaluation_periods  = 1
  threshold           = 0
  comparison_operator = "GreaterThanThreshold"
  treat_missing_data  = "notBreaching"
}
