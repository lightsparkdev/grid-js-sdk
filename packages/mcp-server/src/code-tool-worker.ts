// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import path from 'node:path';
import util from 'node:util';
import Fuse from 'fuse.js';
import ts from 'typescript';
import { WorkerOutput } from './code-tool-types';
import { LightsparkGrid, ClientOptions } from '@lightsparkdev/grid';

async function tseval(code: string) {
  return import('data:application/typescript;charset=utf-8;base64,' + Buffer.from(code).toString('base64'));
}

function getRunFunctionSource(code: string): {
  type: 'declaration' | 'expression';
  client: string | undefined;
  code: string;
} | null {
  const sourceFile = ts.createSourceFile('code.ts', code, ts.ScriptTarget.Latest, true);
  const printer = ts.createPrinter();

  for (const statement of sourceFile.statements) {
    // Check for top-level function declarations
    if (ts.isFunctionDeclaration(statement)) {
      if (statement.name?.text === 'run') {
        return {
          type: 'declaration',
          client: statement.parameters[0]?.name.getText(),
          code: printer.printNode(ts.EmitHint.Unspecified, statement.body!, sourceFile),
        };
      }
    }

    // Check for variable declarations: const run = () => {} or const run = function() {}
    if (ts.isVariableStatement(statement)) {
      for (const declaration of statement.declarationList.declarations) {
        if (
          ts.isIdentifier(declaration.name) &&
          declaration.name.text === 'run' &&
          // Check if it's initialized with a function
          declaration.initializer &&
          (ts.isFunctionExpression(declaration.initializer) || ts.isArrowFunction(declaration.initializer))
        ) {
          return {
            type: 'expression',
            client: declaration.initializer.parameters[0]?.name.getText(),
            code: printer.printNode(ts.EmitHint.Unspecified, declaration.initializer, sourceFile),
          };
        }
      }
    }
  }

  return null;
}

function getTSDiagnostics(code: string): string[] {
  const functionSource = getRunFunctionSource(code)!;
  const codeWithImport = [
    'import { LightsparkGrid } from "@lightsparkdev/grid";',
    functionSource.type === 'declaration' ?
      `async function run(${functionSource.client}: LightsparkGrid)`
    : `const run: (${functionSource.client}: LightsparkGrid) => Promise<unknown> =`,
    functionSource.code,
  ].join('\n');
  const sourcePath = path.resolve('code.ts');
  const ast = ts.createSourceFile(sourcePath, codeWithImport, ts.ScriptTarget.Latest, true);
  const options = ts.getDefaultCompilerOptions();
  options.target = ts.ScriptTarget.Latest;
  options.module = ts.ModuleKind.NodeNext;
  options.moduleResolution = ts.ModuleResolutionKind.NodeNext;
  const host = ts.createCompilerHost(options, true);
  const newHost: typeof host = {
    ...host,
    getSourceFile: (...args) => {
      if (path.resolve(args[0]) === sourcePath) {
        return ast;
      }
      return host.getSourceFile(...args);
    },
    readFile: (...args) => {
      if (path.resolve(args[0]) === sourcePath) {
        return codeWithImport;
      }
      return host.readFile(...args);
    },
    fileExists: (...args) => {
      if (path.resolve(args[0]) === sourcePath) {
        return true;
      }
      return host.fileExists(...args);
    },
  };
  const program = ts.createProgram({
    options,
    rootNames: [sourcePath],
    host: newHost,
  });
  const diagnostics = ts.getPreEmitDiagnostics(program, ast);
  return diagnostics.map((d) => {
    const message = ts.flattenDiagnosticMessageText(d.messageText, '\n');
    if (!d.file || !d.start) return `- ${message}`;
    const { line: lineNumber } = ts.getLineAndCharacterOfPosition(d.file, d.start);
    const line = codeWithImport.split('\n').at(lineNumber)?.trim();
    return line ? `- ${message}\n    ${line}` : `- ${message}`;
  });
}

const fuse = new Fuse(
  [
    'client.config.retrieve',
    'client.config.update',
    'client.customers.create',
    'client.customers.createKYCLink',
    'client.customers.delete',
    'client.customers.export',
    'client.customers.list',
    'client.customers.listInternalAccounts',
    'client.customers.retrieve',
    'client.customers.update',
    'client.customers.updateInternalAccount',
    'client.customers.externalAccounts.create',
    'client.customers.externalAccounts.delete',
    'client.customers.externalAccounts.list',
    'client.customers.externalAccounts.retrieve',
    'client.customers.bulk.getJobStatus',
    'client.customers.bulk.uploadCsv',
    'client.platform.listInternalAccounts',
    'client.platform.externalAccounts.create',
    'client.platform.externalAccounts.delete',
    'client.platform.externalAccounts.list',
    'client.platform.externalAccounts.retrieve',
    'client.transferIn.create',
    'client.transferOut.create',
    'client.receiver.lookupExternalAccount',
    'client.receiver.lookupUma',
    'client.quotes.create',
    'client.quotes.execute',
    'client.quotes.retrieve',
    'client.transactions.approve',
    'client.transactions.list',
    'client.transactions.reject',
    'client.transactions.retrieve',
    'client.invitations.cancel',
    'client.invitations.claim',
    'client.invitations.create',
    'client.invitations.retrieve',
    'client.sandbox.sendFunds',
    'client.sandbox.uma.receivePayment',
    'client.sandbox.internalAccounts.fund',
    'client.sandbox.webhooks.sendTest',
    'client.sandbox.cards.simulate.authorization',
    'client.sandbox.cards.simulate.clearing',
    'client.sandbox.cards.simulate.return',
    'client.umaProviders.list',
    'client.tokens.create',
    'client.tokens.delete',
    'client.tokens.list',
    'client.tokens.retrieve',
    'client.exchangeRates.list',
    'client.webhooks.unwrap',
    'client.crypto.estimateWithdrawalFee',
    'client.beneficialOwners.create',
    'client.beneficialOwners.list',
    'client.beneficialOwners.retrieve',
    'client.beneficialOwners.update',
    'client.documents.delete',
    'client.documents.list',
    'client.documents.replace',
    'client.documents.retrieve',
    'client.documents.upload',
    'client.verifications.list',
    'client.verifications.retrieve',
    'client.verifications.submit',
    'client.discoveries.list',
    'client.auth.credentials.challenge',
    'client.auth.credentials.create',
    'client.auth.credentials.delete',
    'client.auth.credentials.list',
    'client.auth.credentials.verify',
    'client.auth.sessions.delete',
    'client.auth.sessions.list',
    'client.auth.sessions.refresh',
    'client.agents.create',
    'client.agents.delete',
    'client.agents.list',
    'client.agents.listApprovals',
    'client.agents.retrieve',
    'client.agents.update',
    'client.agents.updatePolicy',
    'client.agents.me.createTransferIn',
    'client.agents.me.createTransferOut',
    'client.agents.me.listInternalAccounts',
    'client.agents.me.retrieve',
    'client.agents.me.transactions.list',
    'client.agents.me.transactions.retrieve',
    'client.agents.me.quotes.create',
    'client.agents.me.quotes.execute',
    'client.agents.me.quotes.retrieve',
    'client.agents.me.externalAccounts.add',
    'client.agents.me.externalAccounts.delete',
    'client.agents.me.externalAccounts.list',
    'client.agents.me.externalAccounts.retrieve',
    'client.agents.me.actions.list',
    'client.agents.me.actions.retrieve',
    'client.agents.deviceCodes.getStatus',
    'client.agents.deviceCodes.redeem',
    'client.agents.deviceCodes.regenerate',
    'client.agents.transactions.approve',
    'client.agents.transactions.reject',
    'client.agents.actions.approve',
    'client.agents.actions.reject',
    'client.cards.issue',
    'client.cards.list',
    'client.cards.retrieve',
    'client.cards.update',
  ],
  { threshold: 1, shouldSort: true },
);

function getMethodSuggestions(fullyQualifiedMethodName: string): string[] {
  return fuse
    .search(fullyQualifiedMethodName)
    .map(({ item }) => item)
    .slice(0, 5);
}

const proxyToObj = new WeakMap<any, any>();
const objToProxy = new WeakMap<any, any>();

type ClientProxyConfig = {
  path: string[];
  isBelievedBad?: boolean;
};

function makeSdkProxy<T extends object>(obj: T, { path, isBelievedBad = false }: ClientProxyConfig): T {
  let proxy: T = objToProxy.get(obj);

  if (!proxy) {
    proxy = new Proxy(obj, {
      get(target, prop, receiver) {
        const propPath = [...path, String(prop)];
        const value = Reflect.get(target, prop, receiver);

        if (isBelievedBad || (!(prop in target) && value === undefined)) {
          // If we're accessing a path that doesn't exist, it will probably eventually error.
          // Let's proxy it and mark it bad so that we can control the error message.
          // We proxy an empty class so that an invocation or construction attempt is possible.
          return makeSdkProxy(class {}, { path: propPath, isBelievedBad: true });
        }

        if (value !== null && (typeof value === 'object' || typeof value === 'function')) {
          return makeSdkProxy(value, { path: propPath, isBelievedBad });
        }

        return value;
      },

      apply(target, thisArg, args) {
        if (isBelievedBad || typeof target !== 'function') {
          const fullyQualifiedMethodName = path.join('.');
          const suggestions = getMethodSuggestions(fullyQualifiedMethodName);
          throw new Error(
            `${fullyQualifiedMethodName} is not a function. Did you mean: ${suggestions.join(', ')}`,
          );
        }

        return Reflect.apply(target, proxyToObj.get(thisArg) ?? thisArg, args);
      },

      construct(target, args, newTarget) {
        if (isBelievedBad || typeof target !== 'function') {
          const fullyQualifiedMethodName = path.join('.');
          const suggestions = getMethodSuggestions(fullyQualifiedMethodName);
          throw new Error(
            `${fullyQualifiedMethodName} is not a constructor. Did you mean: ${suggestions.join(', ')}`,
          );
        }

        return Reflect.construct(target, args, newTarget);
      },
    });

    objToProxy.set(obj, proxy);
    proxyToObj.set(proxy, obj);
  }

  return proxy;
}

function parseError(code: string, error: unknown): string | undefined {
  if (!(error instanceof Error)) return;
  const cause = error.cause instanceof Error ? `: ${error.cause.message}` : '';
  const message = error.name ? `${error.name}: ${error.message}${cause}` : `${error.message}${cause}`;
  try {
    // Deno uses V8; the first "<anonymous>:LINE:COLUMN" is the top of stack.
    const lineNumber = error.stack?.match(/<anonymous>:([0-9]+):[0-9]+/)?.[1];
    // -1 for the zero-based indexing
    const line =
      lineNumber &&
      code
        .split('\n')
        .at(parseInt(lineNumber, 10) - 1)
        ?.trim();
    return line ? `${message}\n  at line ${lineNumber}\n    ${line}` : message;
  } catch {
    return message;
  }
}

const fetch = async (req: Request): Promise<Response> => {
  const { opts, code } = (await req.json()) as { opts: ClientOptions; code: string };

  const runFunctionSource = code ? getRunFunctionSource(code) : null;
  if (!runFunctionSource) {
    const message =
      code ?
        'The code is missing a top-level `run` function.'
      : 'The code argument is missing. Provide one containing a top-level `run` function.';
    return Response.json(
      {
        is_error: true,
        result: `${message} Write code within this template:\n\n\`\`\`\nasync function run(client) {\n  // Fill this out\n}\n\`\`\``,
        log_lines: [],
        err_lines: [],
      } satisfies WorkerOutput,
      { status: 400, statusText: 'Code execution error' },
    );
  }

  const diagnostics = getTSDiagnostics(code);
  if (diagnostics.length > 0) {
    return Response.json(
      {
        is_error: true,
        result: `The code contains TypeScript diagnostics:\n${diagnostics.join('\n')}`,
        log_lines: [],
        err_lines: [],
      } satisfies WorkerOutput,
      { status: 400, statusText: 'Code execution error' },
    );
  }

  const client = new LightsparkGrid({
    ...opts,
  });

  const log_lines: string[] = [];
  const err_lines: string[] = [];
  const originalConsole = globalThis.console;
  globalThis.console = {
    ...originalConsole,
    log: (...args: unknown[]) => {
      log_lines.push(util.format(...args));
    },
    error: (...args: unknown[]) => {
      err_lines.push(util.format(...args));
    },
  };
  try {
    let run_ = async (client: any) => {};
    run_ = (await tseval(`${code}\nexport default run;`)).default;
    const result = await run_(makeSdkProxy(client, { path: ['client'] }));
    return Response.json({
      is_error: false,
      result,
      log_lines,
      err_lines,
    } satisfies WorkerOutput);
  } catch (e) {
    return Response.json(
      {
        is_error: true,
        result: parseError(code, e),
        log_lines,
        err_lines,
      } satisfies WorkerOutput,
      { status: 400, statusText: 'Code execution error' },
    );
  } finally {
    globalThis.console = originalConsole;
  }
};

export default { fetch };
