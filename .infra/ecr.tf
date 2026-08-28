resource "aws_ecr_repository" "services" {
  for_each     = toset(local.ecr_services)
  name         = "${var.project_name}/${each.key}"
  force_delete = true
}
