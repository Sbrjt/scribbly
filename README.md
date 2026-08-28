# Scribbly

A minimal blogging website using microservices deployed on AWS.

## Architecture

The project uses a microservice architecture inside a monorepo.
![](/hld.svg)

### Services:

- Web: Frontend built with Next.js
- Auth: Authentication service
- User: User management service
- Post: Blog post management service
- Postgres: Auth and User db
- MongoDB: Post db
- Redis: for caching and refresh tokens
- RabbitMQ: communication between services

All backend services are built using Fastify. The project uses a pnpm workspace.

### Project Structure

```text
scribbly/
|
├── .infra/                 # Terraform configs
|
├── packages/
│   └── common/             # Shared code and utilities
│
├── services/
│   ├── auth/
│   ├── post/
│   ├── user/
│   ├── web/
│   └── nginx/
│
├── compose.yml             # For local development
├── compose.prod.yml
|
├── package.json
└── pnpm-workspace.yaml
```

## Local Development

For local development, the services are run using Docker Compose.

```
docker compose up --build
```

It uses docker images for Postgres, MongoDB, Redis, RabbitMQ and Nginx.

The application services are built using their respective Dockerfiles.

Nginx has been used as the reverse proxy.

## AWS Deployment

The AWS deployment uses managed services equivalent to the local development environment:

| Local    | AWS                |
| -------- | ------------------ |
| Postgres | RDS                |
| MongoDB  | MongoDB on EC2\*\* |
| Redis    | ElastiCache        |
| RabbitMQ | AmazonMQ           |
| Nginx    | API Gateway        |

<sup>
** The EC2 instance was used for MongoDB as DocumentDB is not available in free tier.
</sup>

The images are uploaded to ECR. The services are deployed to ECS on Fargate.

### Terraform

The deployment is managed using Terraform (see `./.infra`).

To spin up the deployment:

```
terraform apply
```

To take down the deployment:

```
terraform destroy
```

Make sure to run the commands from `.\.infra` folder.

### CI/CD

Deployment is automated using GitHub Actions.

- `infra.yml`: creates or updates AWS infrastructure.
- `deploy.yml`: builds and deploys services. (Build Docker images > Push images to ECR > Redeploy ECS)

GitHub Actions authenticates with AWS using OIDC (OpenID Connect).

#

The project has minimal functionality as it was an exercise for learning microservices, AWS and terraform.

Note: The AWS infrastructure is usually shut down due to limited free tier and can be spun up when required.
