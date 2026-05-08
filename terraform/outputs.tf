output "grid_mcp_lambda_function_url" {
  description = "Public HTTPS URL for the Grid MCP server. POST /mcp with x-grid-* headers."
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
