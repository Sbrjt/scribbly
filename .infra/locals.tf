locals {
  services = {
    web  = var.web_port
    auth = var.auth_service_port
    user = var.user_service_port
    post = var.post_service_port
  }

  ecr_services = [for k in keys(local.services) : k == "web" ? "web" : "${k}-service"]

  databases = [
    "auth",
    "user"
  ]

  # Database / Data ports
  db_ports = {
    postgres      = var.pg_port
    redis         = var.redis_port
    rabbitmq      = var.rabbitmq_port
    rabbitmq_mgmt = var.rabbitmq_mgmt_port
    mongo         = var.mongo_port
  }

  # Ports for security groups
  ecs_ports  = values(local.services)
  data_ports = values(local.db_ports)

  common_environment = [
    { name = "NODE_ENV", value = var.environment },
    { name = "JWT_SECRET", value = var.jwt_secret },
    { name = "ACCESS_TOKEN_TTL", value = var.access_token_ttl },
    { name = "REFRESH_TOKEN_TTL", value = var.refresh_token_ttl },
    { name = "PG_HOST", value = aws_db_instance.postgres.address },
    { name = "PG_PORT", value = tostring(var.pg_port) },
    { name = "PG_USER", value = var.pg_username },
    { name = "PG_PASSWORD", value = var.pg_password },
    { name = "AUTH_DB_NAME", value = "auth" },
    { name = "USER_DB_NAME", value = "user" },
    { name = "POST_DB_NAME", value = "post" },
    { name = "MONGO_HOST", value = aws_instance.mongodb.private_ip },
    { name = "MONGO_PORT", value = tostring(var.mongo_port) },
    { name = "MONGO_USERNAME", value = var.mongo_username },
    { name = "MONGO_PASSWORD", value = var.mongo_password },
    { name = "REDIS_HOST", value = aws_elasticache_cluster.redis.cache_nodes[0].address },
    { name = "REDIS_PORT", value = tostring(var.redis_port) },
    { name = "RABBITMQ_URI", value = try(replace([for ep in aws_mq_broker.rabbitmq.instances[0].endpoints : ep if can(regex("^amqps?://", ep))][0], "amqps://", "amqps://${var.mq_username}:${var.mq_password}@"), "") },
    { name = "AUTH_SERVICE_PORT", value = tostring(var.auth_service_port) },
    { name = "USER_SERVICE_PORT", value = tostring(var.user_service_port) },
    { name = "POST_SERVICE_PORT", value = tostring(var.post_service_port) },
    { name = "WEB_PORT", value = tostring(var.web_port) },
    { name = "NEXT_PUBLIC_BASE_URL", value = "${aws_apigatewayv2_api.main.api_endpoint}/" }
  ]
}


