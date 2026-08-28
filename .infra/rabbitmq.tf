resource "aws_mq_broker" "rabbitmq" {
  broker_name                = "${var.project_name}-rabbitmq"
  engine_type                = "RabbitMQ"
  engine_version             = "4.2"
  auto_minor_version_upgrade = true
  host_instance_type         = "mq.m7g.medium"
  deployment_mode            = "SINGLE_INSTANCE"

  user {
    username = var.mq_username
    password = var.mq_password
  }

  subnet_ids      = [aws_subnet.private[0].id]
  security_groups = [aws_security_group.data.id]
}
