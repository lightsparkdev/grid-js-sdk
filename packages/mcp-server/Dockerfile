# Dockerfile for Lightspark Grid MCP Server
#
# This Dockerfile builds a Docker image for the MCP Server.
#
# To build the image locally:
#   docker build -f packages/mcp-server/Dockerfile -t @lightsparkdev/grid-mcp:local .
#
# To run the image:
#   docker run -i @lightsparkdev/grid-mcp:local [OPTIONS]
#
# Common options:
#   --tool=<name>              Include specific tools
#   --resource=<name>          Include tools for specific resources
#   --operation=read|write     Filter by operation type
#   --client=<type>            Set client compatibility (e.g., claude, cursor)
#   --transport=<type>         Set transport type (stdio or http)
#
# For a full list of options:
#   docker run -i @lightsparkdev/grid-mcp:local --help
#
# Note: The MCP server uses stdio transport by default. Docker's -i flag
# enables interactive mode, allowing the container to communicate over stdin/stdout.

# Build stage
FROM node:24-alpine AS builder

# Enable corepack to use pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Install bash for build script
RUN apk add --no-cache bash openssl

# Set working directory
WORKDIR /build

# Copy entire repository
COPY . .

# Set CI environment variable so pnpm install runs without prompts
ENV CI=true

# Install all dependencies and build everything
RUN pnpm install --frozen-lockfile && \
    pnpm build

FROM denoland/deno:alpine-2.7.1

# Install node and npm
RUN apk add --no-cache nodejs npm

ENV LD_LIBRARY_PATH=/usr/lib:/usr/local/lib

# Add non-root user
RUN addgroup -g 1001 -S nodejs && adduser -S nodejs -u 1001

# Set working directory
WORKDIR /app

# Copy the build results, preserving directory structure
COPY --from=builder /build .

# Copy the built @lightsparkdev/grid into node_modules
COPY --from=builder /build/dist ./node_modules/@lightsparkdev/grid

# Change ownership to nodejs user
RUN chown -R nodejs:nodejs /app
RUN chown -R nodejs:nodejs /deno-dir

# Switch to non-root user
USER nodejs

# AWS Lambda Web Adapter — runs as a Lambda Extension and bridges Lambda
# invocations to the local Express server on port 8000.
COPY --from=public.ecr.aws/awsguru/aws-lambda-adapter:1.0.0 /lambda-adapter /opt/extensions/lambda-adapter

# Streamable HTTP on 0.0.0.0:8000/mcp.
EXPOSE 8000

ENV PORT=8000 \
    READINESS_CHECK_PATH=/health \
    AWS_LWA_INVOKE_MODE=response_stream \
    AWS_LWA_PASS_THROUGH_PATH=/

ENTRYPOINT ["node", "packages/mcp-server/dist/index.js"]

# Default to Stainless-hosted code-execution and docs-search. This is
# deliberate: with auth_type=NONE on the Function URL and no per-request
# authn, running local Deno workers (--code-execution-mode=local) would
# expose a public, unauthenticated arbitrary-code-execution path on Lambda
# (Deno --allow-env in code-tool.ts can read execution-role temp creds).
# Stainless's hosted sandbox keeps untrusted code out of our compute. The
# Lambda is configured with STAINLESS_API_KEY in Task 5; callers can
# override with x-stainless-api-key per request.
CMD ["--transport", "http", "--port", "8000"]
