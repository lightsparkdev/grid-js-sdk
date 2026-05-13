import type { Request, Response, NextFunction } from 'express';
import { originSecretMiddleware } from '../src/http';
import { configureLogger, getLogger } from '../src/logger';

beforeAll(() => {
  try {
    getLogger();
  } catch {
    configureLogger({ level: 'silent', pretty: false });
  }
});

const mockReq = (headers: Record<string, string | undefined> = {}): Request =>
  ({ headers }) as unknown as Request;

const mockRes = () => {
  const res: Partial<Response> & { _status?: number; _body?: unknown } = {};
  res.status = ((code: number) => {
    res._status = code;
    return res as Response;
  }) as Response['status'];
  res.json = ((body: unknown) => {
    res._body = body;
    return res as Response;
  }) as Response['json'];
  return res as Response & { _status?: number; _body?: unknown };
};

describe('originSecretMiddleware', () => {
  it('no-ops when expectedSecret is undefined (stdio / local dev)', () => {
    const mw = originSecretMiddleware(undefined);
    const req = mockReq({});
    const res = mockRes();
    const next = jest.fn() as unknown as NextFunction;
    mw(req, res, next);
    expect(next).toHaveBeenCalledTimes(1);
    expect(res._status).toBeUndefined();
  });

  it('no-ops when expectedSecret is empty string', () => {
    const mw = originSecretMiddleware('');
    const req = mockReq({});
    const res = mockRes();
    const next = jest.fn() as unknown as NextFunction;
    mw(req, res, next);
    expect(next).toHaveBeenCalledTimes(1);
  });

  it('rejects with 403 when expected set but header missing', () => {
    const mw = originSecretMiddleware('expected-secret-value');
    const req = mockReq({});
    const res = mockRes();
    const next = jest.fn() as unknown as NextFunction;
    mw(req, res, next);
    expect(res._status).toBe(403);
    expect(next).not.toHaveBeenCalled();
  });

  it('rejects with 403 when header value does not match', () => {
    const mw = originSecretMiddleware('expected-secret-value');
    const req = mockReq({ 'x-origin-secret': 'wrong-value' });
    const res = mockRes();
    const next = jest.fn() as unknown as NextFunction;
    mw(req, res, next);
    expect(res._status).toBe(403);
    expect(next).not.toHaveBeenCalled();
  });

  it('rejects with 403 when header length matches but value differs', () => {
    const expected = 'a'.repeat(32);
    const provided = 'b'.repeat(32);
    const mw = originSecretMiddleware(expected);
    const req = mockReq({ 'x-origin-secret': provided });
    const res = mockRes();
    const next = jest.fn() as unknown as NextFunction;
    mw(req, res, next);
    expect(res._status).toBe(403);
    expect(next).not.toHaveBeenCalled();
  });

  it('calls next when header matches expected', () => {
    const mw = originSecretMiddleware('expected-secret-value');
    const req = mockReq({ 'x-origin-secret': 'expected-secret-value' });
    const res = mockRes();
    const next = jest.fn() as unknown as NextFunction;
    mw(req, res, next);
    expect(next).toHaveBeenCalledTimes(1);
    expect(res._status).toBeUndefined();
  });

  it('logs a warning on rejection (without leaking the secret value)', () => {
    const logger = getLogger();
    const warnSpy = jest.spyOn(logger, 'warn');
    try {
      const mw = originSecretMiddleware('expected-secret-value');
      const req = mockReq({ 'x-origin-secret': 'wrong' });
      const res = mockRes();
      const next = jest.fn() as unknown as NextFunction;
      mw(req, res, next);
      expect(warnSpy).toHaveBeenCalled();
      const serialized = JSON.stringify(warnSpy.mock.calls);
      expect(serialized).not.toContain('expected-secret-value');
    } finally {
      warnSpy.mockRestore();
    }
  });

  it('rejects when x-origin-secret arrives as an array (header injection)', () => {
    const mw = originSecretMiddleware('expected-secret-value');
    const req = mockReq({ 'x-origin-secret': ['expected-secret-value', 'also'] as unknown as string });
    const res = mockRes();
    const next = jest.fn() as unknown as NextFunction;
    mw(req, res, next);
    expect(res._status).toBe(403);
    expect(next).not.toHaveBeenCalled();
  });
});

import type { AddressInfo } from 'net';
import type { McpOptions } from '../src/options';
import { streamableHTTPApp } from '../src/http';

describe('streamableHTTPApp /health bypass', () => {
  const minimalMcpOptions = {
    transport: 'http',
    port: 0,
    code: { allowHttpGets: false, allowedMethods: [], blockedMethods: [] },
  } as unknown as McpOptions;

  afterEach(() => {
    delete process.env.ORIGIN_SECRET;
  });

  it('returns 200 on /health without origin secret when ORIGIN_SECRET is set', async () => {
    process.env.ORIGIN_SECRET = 'an-irrelevant-secret-value';
    const app = streamableHTTPApp({ mcpOptions: minimalMcpOptions });
    const server = app.listen(0);
    try {
      const addr = server.address() as AddressInfo;
      const res = await fetch(`http://127.0.0.1:${addr.port}/health`);
      expect(res.status).toBe(200);
      expect(await res.text()).toBe('OK');
    } finally {
      await new Promise<void>((resolve) => server.close(() => resolve()));
    }
  });

  it('returns 403 on /mcp without origin secret when ORIGIN_SECRET is set', async () => {
    process.env.ORIGIN_SECRET = 'an-irrelevant-secret-value';
    const app = streamableHTTPApp({ mcpOptions: minimalMcpOptions });
    const server = app.listen(0);
    try {
      const addr = server.address() as AddressInfo;
      const res = await fetch(`http://127.0.0.1:${addr.port}/mcp`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: '{}',
      });
      expect(res.status).toBe(403);
    } finally {
      await new Promise<void>((resolve) => server.close(() => resolve()));
    }
  });
});
