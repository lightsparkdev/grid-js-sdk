variable "image_tag" {
  type        = string
  description = "ECR image tag for the Grid MCP server (linux/arm64). Must be unique per push since the ECR repo is IMMUTABLE — use a git SHA, build ID, or release tag, not a moving tag like 'latest'. Leave null on the bootstrap apply (before the first image is pushed) to skip creating the runtime."
  default     = null
  nullable    = true

  validation {
    condition     = var.image_tag == null || !contains(["latest", "main", "master", "stable"], var.image_tag)
    error_message = "image_tag must be unique per build (e.g. git SHA). Moving tags like 'latest'/'main'/'master'/'stable' will be rejected by the IMMUTABLE ECR repo on second push."
  }
}

resource "aws_bedrockagentcore_agent_runtime" "grid_mcp" {
  count = var.image_tag == null ? 0 : 1

  agent_runtime_name = "grid_mcp"
  description        = "Lightspark Grid MCP server (Streamable HTTP, stateless)"
  role_arn           = aws_iam_role.agentcore_runtime.arn

  agent_runtime_artifact {
    container_configuration {
      container_uri = "${aws_ecr_repository.grid_mcp.repository_url}:${var.image_tag}"
    }
  }

  network_configuration {
    network_mode = "PUBLIC"
  }

  protocol_configuration {
    server_protocol = "MCP"
  }

  authorizer_configuration {
    custom_jwt_authorizer {
      discovery_url   = "https://cognito-idp.${data.aws_region.current.name}.amazonaws.com/${aws_cognito_user_pool.grid_mcp.id}/.well-known/openid-configuration"
      allowed_clients = [aws_cognito_user_pool_client.grid_mcp_m2m.id]
    }
  }

  request_header_configuration {
    request_header_allowlist = [
      "x-grid-client-id",
      "x-grid-client-secret",
      "x-grid-signature",
      "x-stainless-api-key",
    ]
  }

  depends_on = [aws_iam_role_policy.agentcore_runtime]
}
