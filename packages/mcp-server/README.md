# Lightspark Grid TypeScript MCP Server

It is generated with [Stainless](https://www.stainless.com/).

## Installation

### Direct invocation

You can run the MCP Server directly via `npx`:

```sh
export GRID_CLIENT_ID="My Username"
export GRID_CLIENT_SECRET="My Password"
export GRID_AGENT_ACCESS_TOKEN="My Agent Access Token"
export GRID_WEBHOOK_PUBKEY="My Webhook Signature"
npx -y @lightsparkdev/grid-mcp@latest
```

### Via MCP Client

There is a partial list of existing clients at [modelcontextprotocol.io](https://modelcontextprotocol.io/clients). If you already
have a client, consult their documentation to install the MCP server.

For clients with a configuration JSON, it might look something like this:

```json
{
  "mcpServers": {
    "lightsparkdev_grid_api": {
      "command": "npx",
      "args": ["-y", "@lightsparkdev/grid-mcp"],
      "env": {
        "GRID_CLIENT_ID": "My Username",
        "GRID_CLIENT_SECRET": "My Password",
        "GRID_AGENT_ACCESS_TOKEN": "My Agent Access Token",
        "GRID_WEBHOOK_PUBKEY": "My Webhook Signature"
      }
    }
  }
}
```

### Cursor

If you use Cursor, you can install the MCP server by using the button below. You will need to set your environment variables
in Cursor's `mcp.json`, which can be found in Cursor Settings > Tools & MCP > New MCP Server.

[![Add to Cursor](https://cursor.com/deeplink/mcp-install-dark.svg)](https://cursor.com/en-US/install-mcp?name=%40lightsparkdev%2Fgrid-mcp&config=eyJuYW1lIjoiQGxpZ2h0c3BhcmtkZXYvZ3JpZC1tY3AiLCJ0cmFuc3BvcnQiOiJodHRwIiwidXJsIjoiaHR0cHM6Ly9ncmlkLW1jcC5zdGxtY3AuY29tIiwiaGVhZGVycyI6eyJ4LWdyaWQtY2xpZW50LWlkIjoiTXkgVXNlcm5hbWUiLCJ4LWdyaWQtY2xpZW50LXNlY3JldCI6Ik15IFBhc3N3b3JkIiwieC1ncmlkLWFnZW50LWFjY2Vzcy10b2tlbiI6Ik15IEFnZW50IEFjY2VzcyBUb2tlbiIsIlgtR3JpZC1TaWduYXR1cmUiOiJNeSBXZWJob29rIFNpZ25hdHVyZSJ9fQ)

### VS Code

If you use MCP, you can install the MCP server by clicking the link below. You will need to set your environment variables
in VS Code's `mcp.json`, which can be found via Command Palette > MCP: Open User Configuration.

[Open VS Code](https://vscode.stainless.com/mcp/%7B%22name%22%3A%22%40lightsparkdev%2Fgrid-mcp%22%2C%22type%22%3A%22http%22%2C%22url%22%3A%22https%3A%2F%2Fgrid-mcp.stlmcp.com%22%2C%22headers%22%3A%7B%22x-grid-client-id%22%3A%22My%20Username%22%2C%22x-grid-client-secret%22%3A%22My%20Password%22%2C%22x-grid-agent-access-token%22%3A%22My%20Agent%20Access%20Token%22%2C%22X-Grid-Signature%22%3A%22My%20Webhook%20Signature%22%7D%7D)

### Claude Code

If you use Claude Code, you can install the MCP server by running the command below in your terminal. You will need to set your
environment variables in Claude Code's `.claude.json`, which can be found in your home directory.

```
claude mcp add lightsparkdev_grid_mcp_api --header "x-grid-client-id: My Username" --header "x-grid-client-secret: My Password" --header "x-grid-agent-access-token: My Agent Access Token" --header "X-Grid-Signature: My Webhook Signature" --transport http https://grid-mcp.stlmcp.com
```

## Code Mode

This MCP server is built on the "Code Mode" tool scheme. In this MCP Server,
your agent will write code against the TypeScript SDK, which will then be executed in a
sandbox. To accomplish this, the server will expose two tools to your agent:

- The first tool is a docs search tool, which can be used to generically query for
  documentation about your API/SDK.

- The second tool is a code tool, where the agent can write code against the TypeScript SDK.
  The code is executed in a sandbox whose filesystem and network access are restricted to
  what the SDK needs — see "Where code runs" below. Then, anything the code returns or
  prints will be returned to the agent as the result of the tool call.

Using this scheme, agents are capable of performing very complex tasks deterministically
and repeatably.

### Where code runs

The `--code-execution-mode` flag controls where the code tool runs your agent's code:

- `--code-execution-mode=local` runs each code tool call in a Deno subprocess on the same
  machine as the MCP server, restricted to reading the server's own files and to making network
  requests to your API host. Nothing is sent to Stainless. Deno must be installed for this mode
  to work: install it from https://deno.land, or add it to the MCP server's dependencies with
  `npm install deno`.

- `--code-execution-mode=stainless-sandbox` sends the code to a Stainless-hosted sandbox to be
  executed there. This mode is deprecated and is being turned off, so use `local` instead.

## Running remotely

Launching the client with `--transport=http` launches the server as a remote server using Streamable HTTP transport. The `--port` setting can choose the port it will run on, and the `--socket` setting allows it to run on a Unix socket.

Authorization can be provided via the `Authorization` header using the Basic or Bearer scheme.

Additionally, authorization can be provided via the following headers:
| Header | Equivalent client option | Security scheme |
| --------------------------- | ------------------------ | ---------------- |
| `x-grid-client-id` | `username` | BasicAuth |
| `x-grid-client-secret` | `password` | BasicAuth |
| `x-grid-agent-access-token` | `agentAccessToken` | AgentAuth |
| `X-Grid-Signature` | `webhookSignature` | WebhookSignature |

A configuration JSON for this server might look like this, assuming the server is hosted at `http://localhost:3000`:

```json
{
  "mcpServers": {
    "lightsparkdev_grid_api": {
      "url": "http://localhost:3000",
      "headers": {
        "Authorization": "Basic <auth value>"
      }
    }
  }
}
```
