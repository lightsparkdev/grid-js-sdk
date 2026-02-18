// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { IncomingMessage } from 'node:http';
import { ClientOptions } from '@lightsparkdev/grid';
import { McpOptions } from './options';

export const parseClientAuthHeaders = (req: IncomingMessage, required?: boolean): Partial<ClientOptions> => {
  if (req.headers.authorization) {
    const scheme = req.headers.authorization.split(' ')[0]!;
    const value = req.headers.authorization.slice(scheme.length + 1);
    switch (scheme) {
      case 'Basic':
        const rawValue = Buffer.from(value, 'base64').toString();
        return {
          username: rawValue.slice(0, rawValue.search(':')),
          password: rawValue.slice(rawValue.search(':') + 1),
        };
      default:
        throw new Error(
          'Unsupported authorization scheme. Expected the "Authorization" header to be a supported scheme (Basic).',
        );
    }
  } else if (required) {
    throw new Error('Missing required Authorization header; see WWW-Authenticate header for details.');
  }

  const username =
    Array.isArray(req.headers['x-grid-client-id']) ?
      req.headers['x-grid-client-id'][0]
    : req.headers['x-grid-client-id'];
  const password =
    Array.isArray(req.headers['x-grid-client-secret']) ?
      req.headers['x-grid-client-secret'][0]
    : req.headers['x-grid-client-secret'];
  const webhookSignature =
    Array.isArray(req.headers['x-grid-signature']) ?
      req.headers['x-grid-signature'][0]
    : req.headers['x-grid-signature'];
  return { username, password, webhookSignature };
};

export const getStainlessApiKey = (req: IncomingMessage, mcpOptions: McpOptions): string | undefined => {
  // Try to get the key from the x-stainless-api-key header
  const headerKey =
    Array.isArray(req.headers['x-stainless-api-key']) ?
      req.headers['x-stainless-api-key'][0]
    : req.headers['x-stainless-api-key'];
  if (headerKey && typeof headerKey === 'string') {
    return headerKey;
  }

  // Fall back to value set in the mcpOptions (e.g. from environment variable), if provided
  return mcpOptions.stainlessApiKey;
};
