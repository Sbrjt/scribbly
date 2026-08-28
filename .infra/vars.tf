variable "aws_region" {
  type    = string
  default = "ap-south-1"

}

variable "project_name" {
  type    = string
  default = "scribbly"
}

variable "mq_username" {
  type      = string
  sensitive = true
}

variable "mq_password" {
  type      = string
  sensitive = true
}

variable "pg_username" {
  type      = string
  sensitive = true
}

variable "pg_password" {
  type      = string
  sensitive = true
}
variable "environment" {
  type    = string
  default = "production"
}

variable "jwt_secret" {
  type      = string
  sensitive = true
}

variable "access_token_ttl" {
  type    = string
  default = "1h"
}

variable "refresh_token_ttl" {
  type    = string
  default = "24h"
}

variable "web_port" {
  type    = number
  default = 3000
}

variable "auth_service_port" {
  type    = number
  default = 4000
}

variable "user_service_port" {
  type    = number
  default = 4001
}

variable "post_service_port" {
  type    = number
  default = 4002
}

variable "pg_port" {
  type    = number
  default = 5432
}

variable "redis_port" {
  type    = number
  default = 6379
}

variable "rabbitmq_port" {
  type    = number
  default = 5671
}

variable "rabbitmq_mgmt_port" {
  type    = number
  default = 16001
}

variable "mongo_username" {
  type      = string
  sensitive = true
}

variable "mongo_password" {
  type      = string
  sensitive = true
}

variable "mongo_port" {
  type    = number
  default = 27017
}



