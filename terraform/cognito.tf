resource "aws_cognito_user_pool" "grid_mcp" {
  name = "grid-mcp"

  account_recovery_setting {
    recovery_mechanism {
      name     = "verified_email"
      priority = 1
    }
  }

  admin_create_user_config {
    allow_admin_create_user_only = true
  }

  password_policy {
    minimum_length    = 16
    require_lowercase = true
    require_numbers   = true
    require_symbols   = true
    require_uppercase = true
  }

  deletion_protection = "INACTIVE"
}

resource "aws_cognito_user_pool_domain" "grid_mcp" {
  domain       = "grid-mcp-${data.aws_caller_identity.current.account_id}"
  user_pool_id = aws_cognito_user_pool.grid_mcp.id
}

resource "aws_cognito_resource_server" "grid_mcp" {
  identifier = "grid-mcp"
  name       = "grid-mcp"

  scope {
    scope_name        = "invoke"
    scope_description = "Invoke the Grid MCP AgentCore runtime"
  }

  user_pool_id = aws_cognito_user_pool.grid_mcp.id
}

resource "aws_cognito_user_pool_client" "grid_mcp_m2m" {
  name         = "grid-mcp-m2m"
  user_pool_id = aws_cognito_user_pool.grid_mcp.id

  generate_secret = true

  allowed_oauth_flows                  = ["client_credentials"]
  allowed_oauth_flows_user_pool_client = true
  allowed_oauth_scopes                 = ["${aws_cognito_resource_server.grid_mcp.identifier}/invoke"]

  explicit_auth_flows = ["ALLOW_REFRESH_TOKEN_AUTH"]

  access_token_validity  = 24
  token_validity_units {
    access_token = "hours"
  }

  prevent_user_existence_errors = "ENABLED"

  depends_on = [aws_cognito_resource_server.grid_mcp]
}

output "grid_mcp_cognito_token_url" {
  description = "OAuth2 token endpoint for the Grid MCP M2M client. POST client_credentials here to mint a JWT for AgentCore."
  value       = "https://${aws_cognito_user_pool_domain.grid_mcp.domain}.auth.${data.aws_region.current.name}.amazoncognito.com/oauth2/token"
}

output "grid_mcp_cognito_client_id" {
  description = "Cognito M2M client ID."
  value       = aws_cognito_user_pool_client.grid_mcp_m2m.id
}

output "grid_mcp_cognito_client_secret" {
  description = "Cognito M2M client secret. Pair with client ID for client_credentials grant."
  value       = aws_cognito_user_pool_client.grid_mcp_m2m.client_secret
  sensitive   = true
}

output "grid_mcp_cognito_scope" {
  description = "OAuth2 scope to request when minting tokens."
  value       = "${aws_cognito_resource_server.grid_mcp.identifier}/invoke"
}
