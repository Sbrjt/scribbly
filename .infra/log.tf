resource "aws_cloudwatch_log_group" "ecs" {
  for_each = local.services

  name              = "/aws/ecs/${var.project_name}-${each.key}"
  retention_in_days = 7
}


