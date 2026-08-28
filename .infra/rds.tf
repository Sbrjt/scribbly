
resource "aws_db_instance" "postgres" {
  identifier = "${var.project_name}-postgres"
  username   = var.pg_username
  password   = var.pg_password

  engine                 = "postgres"
  instance_class         = "db.t4g.micro"
  allocated_storage      = 20
  db_subnet_group_name   = aws_db_subnet_group.postgres.name
  vpc_security_group_ids = [aws_security_group.data.id]
  skip_final_snapshot    = true # For dev simplicity
}


# Databases will be created by application migrations
# resource "postgresql_database" "databases" {
#   for_each = toset(local.databases)
#   name     = each.value
# }


resource "aws_db_subnet_group" "postgres" {
  name       = "${var.project_name}-rds-subnet-group"
  subnet_ids = aws_subnet.private[*].id
}
