data "aws_ssm_parameter" "ubuntu_ami" {
  name = "/aws/service/canonical/ubuntu/server/22.04/stable/current/amd64/hvm/ebs-gp2/ami-id"
}

resource "aws_instance" "mongodb" {
  ami           = data.aws_ssm_parameter.ubuntu_ami.value
  instance_type = "t3.small"


  subnet_id                   = aws_subnet.private[0].id
  vpc_security_group_ids      = [aws_security_group.data.id]
  associate_public_ip_address = false

  root_block_device {
    volume_size           = 20
    volume_type           = "gp3"
    delete_on_termination = true
  }

  user_data = <<-EOF
              #!/bin/bash
              set -e

              # Install Docker
              apt-get update -y
              apt-get install -y ca-certificates curl gnupg
              install -m 0755 -d /etc/apt/keyrings
              curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /etc/apt/keyrings/docker.gpg
              chmod a+r /etc/apt/keyrings/docker.gpg

              echo \
                "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
                $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
                tee /etc/apt/sources.list.d/docker.list > /dev/null

              apt-get update -y
              apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

              # Create data directory for persistence
              mkdir -p /data/mongo

              # Start MongoDB container
              docker run -d \
                --name mongodb \
                --restart always \
                -p ${var.mongo_port}:27017 \
                -e MONGO_INITDB_ROOT_USERNAME=${var.mongo_username} \
                -e MONGO_INITDB_ROOT_PASSWORD=${var.mongo_password} \
                -v /data/mongo:/data/db \
                mongo:latest
              EOF

  tags = {
    Name = "${var.project_name}-mongodb"
  }
}

# Running MongoDB on EC2 since DocumentDB isn't included in the AWS Free Tier :(
