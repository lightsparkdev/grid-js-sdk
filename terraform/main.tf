terraform {
  required_version = ">= 1.6.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 6.40"
    }
  }

  backend "s3" {
    bucket  = "lsdev.terraform"
    key     = "state/grid-mcp"
    region  = "us-west-2"
    profile = "dev"
  }
}

provider "aws" {
  region  = "us-west-2"
  profile = "dev"

  default_tags {
    tags = {
      Service     = "grid-mcp"
      Environment = "prod"
      ManagedBy   = "terraform"
      Team        = "platform-engineering"
      Repository  = "https://github.com/lightsparkdev/grid-js-sdk"
    }
  }
}

data "aws_caller_identity" "current" {}
data "aws_region" "current" {}

data "aws_iam_openid_connect_provider" "github" {
  url = "https://token.actions.githubusercontent.com"
}

locals {
  github_oidc_subs = [
    "repo:lightsparkdev/grid-js-sdk:ref:refs/heads/main",
  ]
}

data "aws_iam_policy_document" "github-assume-role" {
  statement {
    principals {
      type        = "Federated"
      identifiers = [data.aws_iam_openid_connect_provider.github.arn]
    }

    actions = ["sts:AssumeRoleWithWebIdentity"]

    condition {
      test     = "StringEquals"
      variable = "token.actions.githubusercontent.com:aud"
      values   = ["sts.amazonaws.com"]
    }

    condition {
      test     = "StringLike"
      variable = "token.actions.githubusercontent.com:sub"
      values   = local.github_oidc_subs
    }
  }
}

# resource "aws_iam_role" "github" {
#   name               = "github-actions-grid-mcp"
#   assume_role_policy = data.aws_iam_policy_document.github-assume-role.json
# }

# data "aws_iam_policy_document" "github" {
#   statement {
#     actions   = ["ecr:GetAuthorizationToken"]
#     resources = ["*"]
#   }

#   statement {
#     actions = [
#       "ecr:BatchCheckLayerAvailability",
#       "ecr:BatchGetImage",
#       "ecr:CompleteLayerUpload",
#       "ecr:GetDownloadUrlForLayer",
#       "ecr:InitiateLayerUpload",
#       "ecr:PutImage",
#       "ecr:UploadLayerPart",
#     ]
#     resources = [aws_ecr_repository.grid_mcp.arn]
#   }
# }

# resource "aws_iam_role_policy" "github" {
#   role   = aws_iam_role.github.id
#   policy = data.aws_iam_policy_document.github.json
# }

resource "aws_ecr_repository" "grid_mcp" {
  name                 = "grid-mcp"
  image_tag_mutability = "IMMUTABLE"
}

resource "aws_ecr_lifecycle_policy" "grid_mcp" {
  repository = aws_ecr_repository.grid_mcp.name

  policy = jsonencode({
    rules = [{
      rulePriority = 10
      description  = "Expire untagged images older than 15 days"
      selection = {
        tagStatus   = "untagged"
        countType   = "sinceImagePushed"
        countUnit   = "days"
        countNumber = 15
      }
      action = { type = "expire" }
    }]
  })
}
