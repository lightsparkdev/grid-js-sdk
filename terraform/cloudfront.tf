# ----------------------------------------------------------------------------
# Variables
# ----------------------------------------------------------------------------

variable "custom_domain" {
  type        = string
  description = "Fully-qualified hostname for the public MCP endpoint (e.g. mcp.grid.lightspark.com)."
  nullable    = false
}

variable "route53_zone_id" {
  type        = string
  description = "Route53 hosted-zone ID in the prod account that owns var.custom_domain (or its parent). Bare ID, e.g. Z2FDTNDATAQYW2 — no /hostedzone/ prefix."
  nullable    = false
}

variable "route53_record_name" {
  type        = string
  description = "Route53 record name for the A/AAAA aliases. If the zone is for grid.lightspark.com., set to 'mcp'. If the zone is for lightspark.com., set to the full FQDN 'mcp.grid.lightspark.com'. Route53 concatenates the zone name to bare labels but accepts FQDNs verbatim."
  nullable    = false
}

variable "waf_rate_limit_per_5min" {
  type        = number
  description = "WAF rate-based rule limit: max requests per 5-min window per source IP before the rule blocks. AWS minimum is 100."
  default     = 100
  validation {
    condition     = var.waf_rate_limit_per_5min >= 100
    error_message = "AWS WAF rate-based rules have a minimum limit of 100 req / 5 min."
  }
}

# SSM parameter sourcing the shared secret CloudFront injects into every
# origin request as the X-Origin-Secret header. The Express server in
# packages/mcp-server/src/http.ts validates this header (timing-safe) and
# rejects /mcp requests that don't carry the matching value.
#
# The parameter is operator-managed (created/rotated out-of-band) so the
# secret value never lands in terraform.auto.tfvars or any other on-disk
# config. Rotation procedure: `aws ssm put-parameter --overwrite ...` then
# `terraform apply` — the new value flows through to both the Lambda env
# var (ORIGIN_SECRET) and the CloudFront custom_header value atomically in
# the next apply.
#
# Note: the resolved value DOES land in terraform state (encrypted at rest
# in the S3 backend) and in the Lambda function configuration (encrypted
# with the grid_mcp_lambda_env CMK). Operators running `terraform apply`
# need ssm:GetParameter on this parameter AND kms:Decrypt on the SSM
# default key (alias/aws/ssm).
data "aws_ssm_parameter" "cloudfront_origin_secret" {
  name = "/grid-mcp/cloudfront-origin-secret"
}

# ----------------------------------------------------------------------------
# ACM cert (us-east-1) + DNS validation
# ----------------------------------------------------------------------------

# CAA record narrowly scoped to var.custom_domain. Required because the
# parent `grid.lightspark.com.` is a CNAME pointing at Vercel's DNS, and
# Vercel's CAA records (pki.goog / globalsign.com / letsencrypt.org /
# sectigo.com) do NOT include Amazon CAs. Per RFC 8659 §3, CAA lookup
# from `mcp.grid.lightspark.com.` would walk up, follow the CNAME, and
# hit Vercel's restriction — causing ACM to fail with `CAA_ERROR`. By
# placing CAA records directly at var.custom_domain, the lookup stops
# at THIS level (closest match wins) and Vercel's restriction is bypassed
# for this specific hostname only. Other lightspark.com subdomains are
# unaffected.
#
# Single `issue` only (no `issuewild`): per RFC 8659 §4.3, `issuewild`
# properties are ignored for non-wildcard FQDN issuance, and the cert
# in this module only requests var.custom_domain (no wildcard SAN). Add
# `issuewild` here if a future change adds a wildcard SAN.
resource "aws_route53_record" "grid_mcp_caa" {
  zone_id = var.route53_zone_id
  name    = var.route53_record_name
  type    = "CAA"
  ttl     = 300
  records = [
    "0 issue \"amazon.com\"",
  ]

  lifecycle {
    # Guard against tfvars misconfiguration where var.route53_record_name
    # combined with var.route53_zone_id would resolve to a different FQDN
    # than var.custom_domain (e.g., record_name="mcp" with zone="lightspark.com."
    # produces "mcp.lightspark.com" — wrong target — and the CAA short-circuit
    # silently doesn't apply at mcp.grid.lightspark.com).
    postcondition {
      condition     = self.fqdn == var.custom_domain
      error_message = "CAA record FQDN (${self.fqdn}) does not match var.custom_domain (${var.custom_domain}). Check var.route53_record_name in terraform.auto.tfvars: use \"mcp\" if the zone is grid.lightspark.com., or \"mcp.grid.lightspark.com\" if the zone is lightspark.com."
    }
  }
}

resource "aws_acm_certificate" "grid_mcp" {
  provider          = aws.use1
  domain_name       = var.custom_domain
  validation_method = "DNS"

  lifecycle {
    create_before_destroy = true
  }

  # Force the CAA record to be created before ACM is asked to issue the
  # cert. This depends_on covers the AUTHORITATIVE-DNS path only: Route53
  # reports INSYNC quickly and AWS's own resolver sees the new record
  # immediately. It does NOT cover recursive-resolver negative caching —
  # if a prior NODATA answer for this name's CAA was cached upstream
  # (RFC 2308 §5), ACM may briefly see the old empty result. ACM retries
  # over hours so this is rarely operationally visible; if a first-attempt
  # validation fails right after a previous failed apply, give it a few
  # minutes (up to the prior record's NODATA TTL, typically <= 300s) and
  # `terraform apply -replace=aws_acm_certificate.grid_mcp`.
  depends_on = [aws_route53_record.grid_mcp_caa]
}

# One DNS record per domain in the cert (we only have one, but for_each
# keeps the pattern correct if a SAN is added later).
resource "aws_route53_record" "acm_validation" {
  for_each = {
    for d in aws_acm_certificate.grid_mcp.domain_validation_options : d.domain_name => {
      name  = d.resource_record_name
      type  = d.resource_record_type
      value = d.resource_record_value
    }
  }

  zone_id         = var.route53_zone_id
  name            = each.value.name
  type            = each.value.type
  records         = [each.value.value]
  ttl             = 60
  allow_overwrite = true # idempotent re-runs
}

resource "aws_acm_certificate_validation" "grid_mcp" {
  provider                = aws.use1
  certificate_arn         = aws_acm_certificate.grid_mcp.arn
  validation_record_fqdns = [for r in aws_route53_record.acm_validation : r.fqdn]

  timeouts {
    create = "15m" # ACM DNS validation typically completes in <5 min; 15m is safety margin
  }
}

# ----------------------------------------------------------------------------
# WAF v2 web ACL (us-east-1, scope=CLOUDFRONT)
# ----------------------------------------------------------------------------

resource "aws_wafv2_web_acl" "grid_mcp" {
  provider = aws.use1
  name     = "grid-mcp"
  scope    = "CLOUDFRONT"

  default_action {
    allow {}
  }

  # Rate-based rule: blocks any IP exceeding the configured limit per 5-min window.
  # This is the v1 mitigation against cost / availability abuse, replacing the
  # Function URL's reserved_concurrent_executions=5 cap as the primary defense.
  rule {
    name     = "rate-limit-per-ip"
    priority = 1
    action {
      block {}
    }
    statement {
      rate_based_statement {
        limit              = var.waf_rate_limit_per_5min
        aggregate_key_type = "IP"
      }
    }
    visibility_config {
      sampled_requests_enabled   = true
      cloudwatch_metrics_enabled = true
      metric_name                = "grid-mcp-rate-limit"
    }
  }

  # AWS Managed Common rule set — covers OWASP top 10 patterns and known bad UAs.
  # In non-overridden (block) mode from day one. The plan's stated security goal
  # includes enforcement, not observation — count-only mode would ship a known
  # gap. The trade-off: false-positives blocking legitimate non-browser MCP
  # clients are possible. Task 6 (Phase 1 smoke) exercises the typical client
  # paths (initialize, tools/list, search_docs, execute) under block-mode WAF,
  # so most false-positives surface there before cutover. The Task 14 follow-up
  # tracks ongoing WAF sampled-requests review for false-positives that only
  # surface under customer traffic patterns.
  rule {
    name     = "managed-common"
    priority = 2
    override_action {
      none {}
    }
    statement {
      managed_rule_group_statement {
        name        = "AWSManagedRulesCommonRuleSet"
        vendor_name = "AWS"
      }
    }
    visibility_config {
      sampled_requests_enabled   = true
      cloudwatch_metrics_enabled = true
      metric_name                = "grid-mcp-managed-common"
    }
  }

  visibility_config {
    sampled_requests_enabled   = true
    cloudwatch_metrics_enabled = true
    metric_name                = "grid-mcp"
  }
}

# ----------------------------------------------------------------------------
# CloudFront distribution
# ----------------------------------------------------------------------------

locals {
  # Strip `https://` and the trailing `/` from the Lambda Function URL to get
  # the bare hostname CloudFront expects as the origin domain_name.
  lambda_url_host = replace(replace(aws_lambda_function_url.grid_mcp.function_url, "https://", ""), "/", "")
}

resource "aws_cloudfront_distribution" "grid_mcp" {
  enabled         = true
  is_ipv6_enabled = true
  comment         = "Grid MCP server — fronts the Lambda Function URL with custom domain + WAF"
  aliases         = [var.custom_domain]
  web_acl_id      = aws_wafv2_web_acl.grid_mcp.arn
  price_class     = "PriceClass_100" # NA + EU only; cheapest tier. Switch to PriceClass_All for global.

  origin {
    domain_name = local.lambda_url_host
    origin_id   = "lambda-url"

    # CloudFront injects this header on every origin request. The Express
    # server in packages/mcp-server/src/http.ts validates it (timing-safe)
    # and rejects /mcp requests that don't carry the matching value. The
    # bare Lambda Function URL is auth_type=NONE; the custom header is the
    # gate that ensures only CloudFront-routed requests reach the app.
    custom_header {
      name  = "X-Origin-Secret"
      value = data.aws_ssm_parameter.cloudfront_origin_secret.value
    }

    custom_origin_config {
      origin_protocol_policy = "https-only"
      http_port              = 80
      https_port             = 443
      origin_ssl_protocols   = ["TLSv1.2"]
      # Max value CloudFront accepts without a quota increase. MCP `execute`
      # calls can theoretically take up to the Lambda timeout (300s), but a
      # CloudFront origin-read-timeout > 60s requires opening an AWS support
      # ticket for a quota increase. v1 ships with this 60s cap; quota
      # increase + Terraform follow-through is a Task 14 BLOCKING item
      # (must complete before sharing the custom domain externally — long
      # execute calls would otherwise silently 504 in production).
      origin_read_timeout      = 60
      origin_keepalive_timeout = 5
    }
  }

  default_cache_behavior {
    target_origin_id       = "lambda-url"
    viewer_protocol_policy = "redirect-to-https"
    allowed_methods        = ["GET", "HEAD", "OPTIONS", "POST", "PUT", "PATCH", "DELETE"]
    cached_methods         = ["GET", "HEAD"]
    compress               = true

    # CachingDisabled managed policy — every MCP request is unique; caching
    # responses would break Streamable HTTP semantics.
    cache_policy_id = "4135ea2d-6df8-44a3-9df3-4b5a84be39ad"

    # AllViewerExceptHostHeader managed policy — forwards all viewer headers
    # (including mcp-session-id, x-grid-*, accept, content-type) and the
    # request body, but rewrites Host for the origin. The Function URL would
    # reject the original viewer Host (mcp.grid.lightspark.com) because it
    # only matches its own *.lambda-url hostname. No OAC = no SigV4 = no
    # body-hashing problem; forwarding the (empty) Authorization is harmless.
    origin_request_policy_id = "b689b0a8-53d0-40ab-baf2-68738e2966ac"
  }

  viewer_certificate {
    acm_certificate_arn      = aws_acm_certificate_validation.grid_mcp.certificate_arn
    ssl_support_method       = "sni-only"
    minimum_protocol_version = "TLSv1.2_2021"
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }
}

# ----------------------------------------------------------------------------
# Route53 alias records (A + AAAA)
# ----------------------------------------------------------------------------

resource "aws_route53_record" "grid_mcp" {
  for_each = toset(["A", "AAAA"])

  zone_id = var.route53_zone_id
  name    = var.route53_record_name
  type    = each.value

  alias {
    name                   = aws_cloudfront_distribution.grid_mcp.domain_name
    zone_id                = aws_cloudfront_distribution.grid_mcp.hosted_zone_id
    evaluate_target_health = false
  }
}
