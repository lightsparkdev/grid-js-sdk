output "grid_mcp_custom_domain_url" {
  description = "Public HTTPS URL for the Grid MCP server. POST to the root path with x-grid-* headers (no /mcp suffix — the subdomain names the service). This is the customer-facing URL — share this, not the lambda-url one."
  value       = "https://${var.custom_domain}"
}

output "grid_mcp_lambda_function_url" {
  description = "Bare Lambda Function URL (internal only). Function URL itself is auth_type=NONE, but the Express server requires X-Origin-Secret which CloudFront injects. Direct callers without the secret receive 403. Kept for diagnostics; the public-facing URL is grid_mcp_custom_domain_url."
  value       = aws_lambda_function_url.grid_mcp.function_url
}

output "grid_mcp_lambda_function_name" {
  description = "Lambda function name (use with `aws lambda update-function-code` to deploy a new image)."
  value       = aws_lambda_function.grid_mcp.function_name
}

output "grid_mcp_log_group_name" {
  description = "CloudWatch Logs group for Lambda runtime logs."
  value       = aws_cloudwatch_log_group.grid_mcp.name
}

output "grid_mcp_cloudfront_distribution_id" {
  description = "CloudFront distribution ID. Use for cache invalidation, AWS Console links, or wiring up additional alarms."
  value       = aws_cloudfront_distribution.grid_mcp.id
}

output "grid_mcp_waf_web_acl_arn" {
  description = "WAF v2 web ACL ARN. Use to attach additional resources or to add logging configurations."
  value       = aws_wafv2_web_acl.grid_mcp.arn
}
