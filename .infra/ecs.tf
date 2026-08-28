data "aws_caller_identity" "current" {}

locals {
  ecr_base = "${data.aws_caller_identity.current.account_id}.dkr.ecr.${var.aws_region}.amazonaws.com/${var.project_name}"
}

# Cluster only — services are defined as standalone resources below
module "ecs" {
  source  = "terraform-aws-modules/ecs/aws"
  version = "~> 5.11"

  cluster_name = "${var.project_name}-cluster"

  fargate_capacity_providers = {
    FARGATE = {
      default_capacity_provider_strategy = {
        weight = 100
      }
    }
  }
}

# IAM role for ECS task execution (pulling images, logging)
resource "aws_iam_role" "ecs_task_execution" {
  name = "${var.project_name}-ecs-task-execution"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Action    = "sts:AssumeRole"
      Effect    = "Allow"
      Principal = { Service = "ecs-tasks.amazonaws.com" }
    }]
  })
}

resource "aws_iam_role_policy_attachment" "ecs_task_execution" {
  role       = aws_iam_role.ecs_task_execution.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
}

# Task definitions
resource "aws_ecs_task_definition" "service" {
  for_each = local.services

  family                   = "${var.project_name}-${each.key}"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                      = "256"
  memory                   = "512"
  execution_role_arn       = aws_iam_role.ecs_task_execution.arn

  container_definitions = jsonencode([{
    name      = "${var.project_name}-${each.key}"
    image     = "${local.ecr_base}/${each.key == "web" ? "web" : "${each.key}-service"}:latest"
    cpu       = 256
    memory    = 512
    essential = true

    portMappings = [{
      name          = each.key
      containerPort = each.value
      hostPort      = each.value
      protocol      = "tcp"
    }]

    environment = local.common_environment

    logConfiguration = {
      logDriver = "awslogs"
      options = {
        "awslogs-group"         = aws_cloudwatch_log_group.ecs[each.key].name
        "awslogs-region"        = var.aws_region
        "awslogs-stream-prefix" = "ecs"
      }
    }
  }])
}

# Security groups for each ECS service
resource "aws_security_group" "ecs_service" {
  for_each = local.services

  name   = "${var.project_name}-${each.key}-sg"
  vpc_id = aws_vpc.main.id

  ingress {
    from_port       = each.value
    to_port         = each.value
    protocol        = "tcp"
    security_groups = [aws_security_group.alb.id]
    description     = "Service port from ALB"
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# ECS services
resource "aws_ecs_service" "service" {
  for_each = local.services

  name            = "${var.project_name}-${each.key}"
  cluster         = module.ecs.cluster_id
  task_definition = aws_ecs_task_definition.service[each.key].arn
  desired_count   = 1
  launch_type     = "FARGATE"

  network_configuration {
    subnets         = aws_subnet.private[*].id
    security_groups = [aws_security_group.ecs_service[each.key].id, aws_security_group.ecs.id]
  }

  load_balancer {
    target_group_arn = aws_lb_target_group.service[each.key].arn
    container_name   = "${var.project_name}-${each.key}"
    container_port   = each.value
  }
}
