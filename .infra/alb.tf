resource "aws_lb" "main" {
  name            = "${var.project_name}-alb"
  internal        = true
  security_groups = [aws_security_group.alb.id]
  subnets         = aws_subnet.private[*].id
}

resource "aws_lb_target_group" "service" {
  for_each    = local.services
  name        = "${var.project_name}-${each.key}-tg"
  port        = each.value
  vpc_id      = aws_vpc.main.id
  protocol    = "HTTP"
  target_type = "ip"
}

# Allow http
resource "aws_lb_listener" "http" {
  load_balancer_arn = aws_lb.main.arn
  port              = 80
  protocol          = "HTTP"

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.service["web"].arn
  }
}

# Dedicated listeners per service for API Gateway VPC Link integrations
resource "aws_lb_listener" "service" {
  for_each          = local.services
  load_balancer_arn = aws_lb.main.arn
  port              = each.value
  protocol          = "HTTP"

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.service[each.key].arn
  }
}

# route logic for api on port 80 listener
resource "aws_lb_listener_rule" "api" {
  for_each = { for k, v in local.services : k => v if k != "web" }

  listener_arn = aws_lb_listener.http.arn
  priority     = each.value

  action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.service[each.key].arn
  }

  condition {
    path_pattern {
      values = ["/api/${each.key}*"]
    }
  }
}
