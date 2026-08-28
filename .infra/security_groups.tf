# Load Balancer
# Inbound: Public (0.0.0.0/0) -> ALB on port 80, VPC Link -> ALB on service ports, Outbound: ALB -> anywhere
resource "aws_security_group" "alb" {
  name   = "${var.project_name}-alb-sg"
  vpc_id = aws_vpc.main.id

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  dynamic "ingress" {
    for_each = local.ecs_ports

    content {
      from_port       = ingress.value
      to_port         = ingress.value
      protocol        = "tcp"
      cidr_blocks     = [aws_vpc.main.cidr_block]
      security_groups = [aws_security_group.vpc_link.id]
      description     = "Inbound from API Gateway VPC Link"
    }
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# API Gateway VPC Link Security Group
resource "aws_security_group" "vpc_link" {
  name   = "${var.project_name}-vpc-link-sg"
  vpc_id = aws_vpc.main.id

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# ECS 
# Inbound: ALB -> ECS, Outbound: ECS -> anywhere
resource "aws_security_group" "ecs" {
  name   = "${var.project_name}-ecs-sg"
  vpc_id = aws_vpc.main.id

  dynamic "ingress" {
    for_each = local.ecs_ports

    content {
      from_port       = ingress.value
      to_port         = ingress.value
      protocol        = "tcp"
      security_groups = [aws_security_group.alb.id]
    }
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

}

# Data (PostgreSQL, MongoDB, Redis, RabbitMQ)
# Inbound: ECS -> Data, Outbound: Auto
resource "aws_security_group" "data" {
  name   = "${var.project_name}-data-sg"
  vpc_id = aws_vpc.main.id

  dynamic "ingress" {
    for_each = local.data_ports

    content {
      from_port       = ingress.value
      to_port         = ingress.value
      protocol        = "tcp"
      security_groups = [aws_security_group.ecs.id]
    }
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

