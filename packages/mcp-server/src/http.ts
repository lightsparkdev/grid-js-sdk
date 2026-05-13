// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp';
import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js';
import { ClientOptions } from '@lightsparkdev/grid';
import { timingSafeEqual } from 'crypto';
import express from 'express';
import pino from 'pino';
import pinoHttp from 'pino-http';
import { getStainlessApiKey, parseClientAuthHeaders } from './auth';
import { getLogger } from './logger';
import { McpOptions } from './options';
import { initMcpServer, newMcpServer } from './server';

const ORIGIN_SECRET_HEADER = 'x-origin-secret';

// Origin-secret gate. When ORIGIN_SECRET is set, requests to /mcp must carry
// a matching X-Origin-Secret header. CloudFront injects this header via the
// distribution's origin.custom_header config; direct hits to the bare Lambda
// Function URL miss the header and are rejected.
//
// Comparison is timing-safe (crypto.timingSafeEqual after length check) to
// prevent secret-length leakage via response-time analysis.
//
// Header-case note: Node.js (and Express on top of it) normalizes incoming
// header NAMES to lowercase on req.headers — this is why we lookup with the
// lowercase 'x-origin-secret' constant. CloudFront's custom_header.name is
// case-insensitive too. No additional normalization is needed.
//
// Logging: on rejection, we log via the pino logger but DO NOT include the
// expected or provided secret value (or its length) in the log payload —
// length alone leaks information that helps attackers calibrate payloads.
//
// When expectedSecret is undefined or empty (e.g., stdio transport, local
// development, or unconfigured Lambda env), the middleware no-ops. The
// caller is responsible for refusing to start in production without a secret
// configured. The /health route does NOT go through this middleware because
// it is mounted on app.use('/mcp', ...) — LWA's readiness check at /health
// must remain accessible from inside the container.
//
// Secret redaction in request logs: the existing redactHeaders() regex in
// this file matches /secret/i, so 'X-Origin-Secret' values are automatically
// redacted in pino's request-line logs. No additional code is needed for
// that path.
export const originSecretMiddleware = (expectedSecret: string | undefined): express.RequestHandler => {
  return (req, res, next) => {
    if (!expectedSecret) {
      return next();
    }
    const provided = req.headers[ORIGIN_SECRET_HEADER];
    if (typeof provided !== 'string') {
      getLogger().warn(
        { path: req.path, reason: 'missing-or-non-string' },
        'origin-secret middleware rejected request',
      );
      res.status(403).json({ error: 'Forbidden' });
      return;
    }
    const a = Buffer.from(provided);
    const b = Buffer.from(expectedSecret);
    if (a.length !== b.length || !timingSafeEqual(a, b)) {
      getLogger().warn({ path: req.path, reason: 'mismatch' }, 'origin-secret middleware rejected request');
      res.status(403).json({ error: 'Forbidden' });
      return;
    }
    next();
  };
};

const newServer = async ({
  clientOptions,
  mcpOptions,
  req,
  res,
}: {
  clientOptions: ClientOptions;
  mcpOptions: McpOptions;
  req: express.Request;
  res: express.Response;
}): Promise<McpServer | null> => {
  const stainlessApiKey = getStainlessApiKey(req, mcpOptions);
  const customInstructionsPath = mcpOptions.customInstructionsPath;
  const server = await newMcpServer({ stainlessApiKey, customInstructionsPath });

  const authOptions = parseClientAuthHeaders(req, false);

  let upstreamClientEnvs: Record<string, string> | undefined;
  const clientEnvsHeader = req.headers['x-stainless-mcp-client-envs'];
  if (typeof clientEnvsHeader === 'string') {
    try {
      const parsed = JSON.parse(clientEnvsHeader);
      if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
        upstreamClientEnvs = parsed;
      }
    } catch {
      // Ignore malformed header
    }
  }

  // Parse x-stainless-mcp-client-permissions header to override permission options
  //
  // Note: Permissions are best-effort and intended to prevent clients from doing unexpected things;
  // they're not a hard security boundary, so we allow arbitrary, client-driven overrides.
  //
  // See the Stainless MCP documentation for more details.
  let effectiveMcpOptions = mcpOptions;
  const clientPermissionsHeader = req.headers['x-stainless-mcp-client-permissions'];
  if (typeof clientPermissionsHeader === 'string') {
    try {
      const parsed = JSON.parse(clientPermissionsHeader);
      if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
        effectiveMcpOptions = {
          ...mcpOptions,
          ...(typeof parsed.allow_http_gets === 'boolean' && { codeAllowHttpGets: parsed.allow_http_gets }),
          ...(Array.isArray(parsed.allowed_methods) && { codeAllowedMethods: parsed.allowed_methods }),
          ...(Array.isArray(parsed.blocked_methods) && { codeBlockedMethods: parsed.blocked_methods }),
        };
        getLogger().info(
          { clientPermissions: parsed },
          'Overriding code execution permissions from x-stainless-mcp-client-permissions header',
        );
      }
    } catch (error) {
      getLogger().warn({ error }, 'Failed to parse x-stainless-mcp-client-permissions header');
    }
  }

  const mcpClientInfo =
    typeof req.body?.params?.clientInfo?.name === 'string' ?
      { name: req.body.params.clientInfo.name, version: String(req.body.params.clientInfo.version ?? '') }
    : undefined;

  await initMcpServer({
    server: server,
    mcpOptions: effectiveMcpOptions,
    clientOptions: {
      ...clientOptions,
      ...authOptions,
    },
    stainlessApiKey: stainlessApiKey,
    upstreamClientEnvs,
    mcpSessionId: (req as any).mcpSessionId,
    mcpClientInfo,
  });

  if (mcpClientInfo) {
    getLogger().info({ mcpSessionId: (req as any).mcpSessionId, mcpClientInfo }, 'MCP client connected');
  }

  return server;
};

const post =
  (options: { clientOptions: ClientOptions; mcpOptions: McpOptions }) =>
  async (req: express.Request, res: express.Response) => {
    const server = await newServer({ ...options, req, res });
    // If we return null, we already set the authorization error.
    if (server === null) return;
    const transport = new StreamableHTTPServerTransport();
    await server.connect(transport as any);
    await transport.handleRequest(req, res, req.body);
  };

const get = async (req: express.Request, res: express.Response) => {
  res.status(405).json({
    jsonrpc: '2.0',
    error: {
      code: -32000,
      message: 'Method not supported',
    },
  });
};

const del = async (req: express.Request, res: express.Response) => {
  res.status(405).json({
    jsonrpc: '2.0',
    error: {
      code: -32000,
      message: 'Method not supported',
    },
  });
};

const redactHeaders = (headers: Record<string, any>) => {
  // SECURITY MAINTENANCE CONTRACT: this regex matches header NAMES that
  // may carry sensitive values; it is intentionally permissive (substring
  // matches) so common conventions like *-secret, *-signature, *-api-key
  // are caught automatically. When adding ANY new request header that
  // could carry secrets (auth tokens, customer creds, signing material),
  // verify substring match here AND extend the smoke test in
  // docs/superpowers/plans/2026-05-07-lambda-migration.md Task 2.5 Step 3
  // and Task 7 Step 5 with a probe value. Allowlist-by-substring will not
  // catch novel naming conventions (e.g. X-Customer-Hmac); add explicit
  // alternatives when you introduce them.
  const hiddenHeaders = /auth|cookie|key|token|secret|signature|grid|stainless/i;
  const filtered = { ...headers };
  Object.keys(filtered).forEach((key) => {
    if (hiddenHeaders.test(key)) {
      filtered[key] = '[REDACTED]';
    }
  });
  return filtered;
};

export const streamableHTTPApp = ({
  clientOptions = {},
  mcpOptions,
}: {
  clientOptions?: ClientOptions;
  mcpOptions: McpOptions;
}): express.Express => {
  const app = express();
  app.set('query parser', 'extended');
  app.use(express.json());
  app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
    const existing = req.headers['mcp-session-id'];
    const sessionId = (Array.isArray(existing) ? existing[0] : existing) || crypto.randomUUID();
    (req as any).mcpSessionId = sessionId;
    const origWriteHead = res.writeHead.bind(res);
    res.writeHead = function (statusCode: number, ...rest: any[]) {
      res.setHeader('mcp-session-id', sessionId);
      return origWriteHead(statusCode, ...rest);
    } as typeof res.writeHead;
    next();
  });
  app.use(
    pinoHttp({
      logger: getLogger(),
      customProps: (req) => ({
        mcpSessionId: (req as any).mcpSessionId,
      }),
      customLogLevel: (req, res) => {
        if (res.statusCode >= 500) {
          return 'error';
        } else if (res.statusCode >= 400) {
          return 'warn';
        }
        return 'info';
      },
      customSuccessMessage: function (req, res) {
        return `Request ${req.method} to ${req.url} completed with status ${res.statusCode}`;
      },
      customErrorMessage: function (req, res, err) {
        return `Request ${req.method} to ${req.url} errored with status ${res.statusCode}`;
      },
      serializers: {
        req: pino.stdSerializers.wrapRequestSerializer((req) => {
          return {
            ...req,
            headers: redactHeaders(req.raw.headers),
          };
        }),
        res: pino.stdSerializers.wrapResponseSerializer((res) => {
          return {
            ...res,
            headers: redactHeaders(res.headers),
          };
        }),
      },
    }),
  );

  app.get('/health', async (req: express.Request, res: express.Response) => {
    res.status(200).send('OK');
  });
  app.use('/mcp', originSecretMiddleware(process.env.ORIGIN_SECRET));
  app.get('/mcp', get);
  app.post('/mcp', post({ clientOptions, mcpOptions }));
  app.delete('/mcp', del);

  return app;
};

export const launchStreamableHTTPServer = async ({
  clientOptions,
  mcpOptions,
  port,
}: {
  clientOptions?: ClientOptions;
  mcpOptions: McpOptions;
  port: number | string | undefined;
}) => {
  // Fail-closed guard: if running on AWS Lambda with HTTP transport, ORIGIN_SECRET
  // MUST be set. Without it, the middleware no-ops and /mcp becomes wide open to
  // direct Function URL hits — bypassing CloudFront's WAF and origin gate. Fail
  // at boot so a missing env var surfaces as an InitError rather than silent
  // exposure. AWS_LAMBDA_FUNCTION_NAME is set by the Lambda runtime on every
  // invocation and is never present in local dev, so this check correctly
  // scopes to production deploys without breaking local HTTP-transport testing.
  if (process.env.AWS_LAMBDA_FUNCTION_NAME && !process.env.ORIGIN_SECRET) {
    throw new Error(
      'ORIGIN_SECRET must be set when running HTTP transport on AWS Lambda. ' +
        'Without it, the origin-secret middleware no-ops and /mcp is unguarded. ' +
        'Set ORIGIN_SECRET in the Lambda environment configuration.',
    );
  }
  const app = streamableHTTPApp({ ...(clientOptions && { clientOptions }), mcpOptions });
  const server = app.listen(port);
  const address = server.address();

  const logger = getLogger();

  if (typeof address === 'string') {
    logger.info(`MCP Server running on streamable HTTP at ${address}`);
  } else if (address !== null) {
    logger.info(`MCP Server running on streamable HTTP on port ${address.port}`);
  } else {
    logger.info(`MCP Server running on streamable HTTP on port ${port}`);
  }

  return server;
};
