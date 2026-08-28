# API Gateway HTTP API
resource "aws_apigatewayv2_api" "main" {
  name          = "${var.project_name}-api"
  protocol_type = "HTTP"
}

resource "aws_apigatewayv2_vpc_link" "main" {
  name               = "${var.project_name}-vpc-link"
  security_group_ids = [aws_security_group.vpc_link.id]
  subnet_ids         = aws_subnet.private[*].id
}

# Integrations for API microservices (auth, user, post) with path stripping parameter mapping
resource "aws_apigatewayv2_integration" "api" {
  for_each = { for k, v in local.services : k => v if k != "web" }

  api_id             = aws_apigatewayv2_api.main.id
  integration_type   = "HTTP_PROXY"
  connection_type    = "VPC_LINK"
  connection_id      = aws_apigatewayv2_vpc_link.main.id
  integration_method = "ANY"
  integration_uri    = aws_lb_listener.service[each.key].arn

  request_parameters = {
    "overwrite:path" = "/$request.path.proxy"
  }
}

# Integration for web (no path rewriting)
resource "aws_apigatewayv2_integration" "web" {
  api_id             = aws_apigatewayv2_api.main.id
  integration_type   = "HTTP_PROXY"
  connection_type    = "VPC_LINK"
  connection_id      = aws_apigatewayv2_vpc_link.main.id
  integration_method = "ANY"
  integration_uri    = aws_lb_listener.service["web"].arn
}

# Routes for API microservices
resource "aws_apigatewayv2_route" "api_proxy" {
  for_each = { for k, v in local.services : k => v if k != "web" }

  api_id    = aws_apigatewayv2_api.main.id
  route_key = "ANY /api/${each.key}/{proxy+}"
  target    = "integrations/${aws_apigatewayv2_integration.api[each.key].id}"
}

# Default route for web
resource "aws_apigatewayv2_route" "default" {
  api_id    = aws_apigatewayv2_api.main.id
  route_key = "$default"
  target    = "integrations/${aws_apigatewayv2_integration.web.id}"
}

# Stage
resource "aws_apigatewayv2_stage" "default" {
  api_id      = aws_apigatewayv2_api.main.id
  name        = "$default"
  auto_deploy = true
}

output "api_gateway_endpoint" {
  value       = aws_apigatewayv2_api.main.api_endpoint
  description = "Public API Gateway URL"
}
