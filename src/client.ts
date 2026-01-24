// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import type { RequestInit, RequestInfo, BodyInit } from './internal/builtin-types';
import type { HTTPMethod, PromiseOrValue, MergedRequestInit, FinalizedRequestInit } from './internal/types';
import { uuid4 } from './internal/utils/uuid';
import { validatePositiveInteger, isAbsoluteURL, safeJSON } from './internal/utils/values';
import { sleep } from './internal/utils/sleep';
export type { Logger, LogLevel } from './internal/utils/log';
import { castToError, isAbortError } from './internal/errors';
import type { APIResponseProps } from './internal/parse';
import { getPlatformHeaders } from './internal/detect-platform';
import * as Shims from './internal/shims';
import * as Opts from './internal/request-options';
import { VERSION } from './version';
import * as Errors from './core/error';
import * as Pagination from './core/pagination';
import { AbstractPage, type DefaultPaginationParams, DefaultPaginationResponse } from './core/pagination';
import * as Uploads from './core/uploads';
import * as API from './resources/index';
import { APIPromise } from './core/api-promise';
import {
  Config,
  ConfigUpdateParams,
  CustomerInfoFieldName,
  PlatformConfig,
  PlatformCurrencyConfig,
} from './resources/config';
import {
  CurrencyAmount,
  InvitationClaimParams,
  InvitationCreateParams,
  Invitations,
  UmaInvitation,
} from './resources/invitations';
import {
  Plaid,
  PlaidCreateLinkTokenParams,
  PlaidCreateLinkTokenResponse,
  PlaidSubmitPublicTokenParams,
} from './resources/plaid';
import {
  Currency,
  OutgoingRateDetails,
  PaymentInstructions,
  Quote,
  QuoteCreateParams,
  QuoteListParams,
  QuoteSource,
  Quotes,
  QuotesDefaultPagination,
} from './resources/quotes';
import {
  CounterpartyFieldDefinition,
  LookupResponse,
  Receiver,
  ReceiverLookupExternalAccountParams,
  ReceiverLookupExternalAccountResponse,
  ReceiverLookupUmaParams,
  ReceiverLookupUmaResponse,
} from './resources/receiver';
import {
  APIToken,
  APITokensDefaultPagination,
  Permission,
  TokenCreateParams,
  TokenListParams,
  Tokens,
} from './resources/tokens';
import {
  AccountSource,
  IncomingTransaction,
  TransactionApproveParams,
  TransactionListParams,
  TransactionRejectParams,
  TransactionStatus,
  TransactionType,
  Transactions,
  UmaAddressSource,
} from './resources/transactions';
import { Transaction, TransferIn, TransferInCreateParams } from './resources/transfer-in';
import { TransferOut, TransferOutCreateParams } from './resources/transfer-out';
import {
  UmaProviderListParams,
  UmaProviderListResponse,
  UmaProviderListResponsesDefaultPagination,
  UmaProviders,
} from './resources/uma-providers';
import { WebhookSendTestResponse, Webhooks } from './resources/webhooks';
import {
  Address,
  BusinessCustomer,
  BusinessCustomerUpdate,
  Customer,
  CustomerCreateParams,
  CustomerCreateResponse,
  CustomerDeleteResponse,
  CustomerGetKYCLinkParams,
  CustomerGetKYCLinkResponse,
  CustomerListInternalAccountsParams,
  CustomerListParams,
  CustomerListResponse,
  CustomerListResponsesDefaultPagination,
  CustomerRetrieveResponse,
  CustomerType,
  CustomerUpdateParams,
  CustomerUpdateResponse,
  Customers,
  IndividualCustomer,
  IndividualCustomerUpdate,
  UltimateBeneficialOwner,
} from './resources/customers/customers';
import {
  Platform,
  PlatformListInternalAccountsParams,
  PlatformListInternalAccountsResponse,
} from './resources/platform/platform';
import { Sandbox, SandboxSendFundsParams, SandboxSendFundsResponse } from './resources/sandbox/sandbox';
import { type Fetch } from './internal/builtin-types';
import { HeadersLike, NullableHeaders, buildHeaders } from './internal/headers';
import { FinalRequestOptions, RequestOptions } from './internal/request-options';
import { toBase64 } from './internal/utils/base64';
import { readEnv } from './internal/utils/env';
import {
  type LogLevel,
  type Logger,
  formatRequestDetails,
  loggerFor,
  parseLogLevel,
} from './internal/utils/log';
import { isEmptyObj } from './internal/utils/values';

export interface ClientOptions {
  /**
   * API token authentication using format `<api token id>:<api client secret>`
   */
  username?: string | undefined;

  /**
   * API token authentication using format `<api token id>:<api client secret>`
   */
  password?: string | undefined;

  /**
   * Secp256r1 (P-256) asymmetric signature of the webhook payload, which can be used to verify that the webhook was sent by Grid.
   *
   * To verify the signature:
   * 1. Get the Grid public key provided to you during integration
   * 2. Decode the base64 signature from the header
   * 3. Create a SHA-256 hash of the request body
   * 4. Verify the signature using the public key and the hash
   *
   * If the signature verification succeeds, the webhook is authentic. If not, it should be rejected.
   *
   */
  webhookSignature?: string | null | undefined;

  /**
   * Override the default base URL for the API, e.g., "https://api.example.com/v2/"
   *
   * Defaults to process.env['GRID_BASE_URL'].
   */
  baseURL?: string | null | undefined;

  /**
   * The maximum amount of time (in milliseconds) that the client should wait for a response
   * from the server before timing out a single request.
   *
   * Note that request timeouts are retried by default, so in a worst-case scenario you may wait
   * much longer than this timeout before the promise succeeds or fails.
   *
   * @unit milliseconds
   */
  timeout?: number | undefined;
  /**
   * Additional `RequestInit` options to be passed to `fetch` calls.
   * Properties will be overridden by per-request `fetchOptions`.
   */
  fetchOptions?: MergedRequestInit | undefined;

  /**
   * Specify a custom `fetch` function implementation.
   *
   * If not provided, we expect that `fetch` is defined globally.
   */
  fetch?: Fetch | undefined;

  /**
   * The maximum number of times that the client will retry a request in case of a
   * temporary failure, like a network error or a 5XX error from the server.
   *
   * @default 2
   */
  maxRetries?: number | undefined;

  /**
   * Default headers to include with every request to the API.
   *
   * These can be removed in individual requests by explicitly setting the
   * header to `null` in request options.
   */
  defaultHeaders?: HeadersLike | undefined;

  /**
   * Default query parameters to include with every request to the API.
   *
   * These can be removed in individual requests by explicitly setting the
   * param to `undefined` in request options.
   */
  defaultQuery?: Record<string, string | undefined> | undefined;

  /**
   * Set the log level.
   *
   * Defaults to process.env['GRID_LOG'] or 'warn' if it isn't set.
   */
  logLevel?: LogLevel | undefined;

  /**
   * Set the logger.
   *
   * Defaults to globalThis.console.
   */
  logger?: Logger | undefined;
}

/**
 * API Client for interfacing with the Grid API.
 */
export class Grid {
  username: string;
  password: string;
  webhookSignature: string | null;

  baseURL: string;
  maxRetries: number;
  timeout: number;
  logger: Logger;
  logLevel: LogLevel | undefined;
  fetchOptions: MergedRequestInit | undefined;

  private fetch: Fetch;
  #encoder: Opts.RequestEncoder;
  protected idempotencyHeader?: string;
  private _options: ClientOptions;

  /**
   * API Client for interfacing with the Grid API.
   *
   * @param {string | undefined} [opts.username=process.env['GRID_USERNAME'] ?? undefined]
   * @param {string | undefined} [opts.password=process.env['GRID_PASSWORD'] ?? undefined]
   * @param {string | null | undefined} [opts.webhookSignature=process.env['GRID_WEBHOOK_SIGNATURE'] ?? null]
   * @param {string} [opts.baseURL=process.env['GRID_BASE_URL'] ?? https://api.lightspark.com/grid/2025-10-13] - Override the default base URL for the API.
   * @param {number} [opts.timeout=1 minute] - The maximum amount of time (in milliseconds) the client will wait for a response before timing out.
   * @param {MergedRequestInit} [opts.fetchOptions] - Additional `RequestInit` options to be passed to `fetch` calls.
   * @param {Fetch} [opts.fetch] - Specify a custom `fetch` function implementation.
   * @param {number} [opts.maxRetries=2] - The maximum number of times the client will retry a request.
   * @param {HeadersLike} opts.defaultHeaders - Default headers to include with every request to the API.
   * @param {Record<string, string | undefined>} opts.defaultQuery - Default query parameters to include with every request to the API.
   */
  constructor({
    baseURL = readEnv('GRID_BASE_URL'),
    username = readEnv('GRID_USERNAME'),
    password = readEnv('GRID_PASSWORD'),
    webhookSignature = readEnv('GRID_WEBHOOK_SIGNATURE') ?? null,
    ...opts
  }: ClientOptions = {}) {
    if (username === undefined) {
      throw new Errors.GridError(
        "The GRID_USERNAME environment variable is missing or empty; either provide it, or instantiate the Grid client with an username option, like new Grid({ username: 'My Username' }).",
      );
    }
    if (password === undefined) {
      throw new Errors.GridError(
        "The GRID_PASSWORD environment variable is missing or empty; either provide it, or instantiate the Grid client with an password option, like new Grid({ password: 'My Password' }).",
      );
    }

    const options: ClientOptions = {
      username,
      password,
      webhookSignature,
      ...opts,
      baseURL: baseURL || `https://api.lightspark.com/grid/2025-10-13`,
    };

    this.baseURL = options.baseURL!;
    this.timeout = options.timeout ?? Grid.DEFAULT_TIMEOUT /* 1 minute */;
    this.logger = options.logger ?? console;
    const defaultLogLevel = 'warn';
    // Set default logLevel early so that we can log a warning in parseLogLevel.
    this.logLevel = defaultLogLevel;
    this.logLevel =
      parseLogLevel(options.logLevel, 'ClientOptions.logLevel', this) ??
      parseLogLevel(readEnv('GRID_LOG'), "process.env['GRID_LOG']", this) ??
      defaultLogLevel;
    this.fetchOptions = options.fetchOptions;
    this.maxRetries = options.maxRetries ?? 2;
    this.fetch = options.fetch ?? Shims.getDefaultFetch();
    this.#encoder = Opts.FallbackEncoder;

    this._options = options;

    this.username = username;
    this.password = password;
    this.webhookSignature = webhookSignature;
  }

  /**
   * Create a new client instance re-using the same options given to the current client with optional overriding.
   */
  withOptions(options: Partial<ClientOptions>): this {
    const client = new (this.constructor as any as new (props: ClientOptions) => typeof this)({
      ...this._options,
      baseURL: this.baseURL,
      maxRetries: this.maxRetries,
      timeout: this.timeout,
      logger: this.logger,
      logLevel: this.logLevel,
      fetch: this.fetch,
      fetchOptions: this.fetchOptions,
      username: this.username,
      password: this.password,
      webhookSignature: this.webhookSignature,
      ...options,
    });
    return client;
  }

  /**
   * Check whether the base URL is set to its default.
   */
  #baseURLOverridden(): boolean {
    return this.baseURL !== 'https://api.lightspark.com/grid/2025-10-13';
  }

  protected defaultQuery(): Record<string, string | undefined> | undefined {
    return this._options.defaultQuery;
  }

  protected validateHeaders({ values, nulls }: NullableHeaders) {
    return;
  }

  protected async authHeaders(opts: FinalRequestOptions): Promise<NullableHeaders | undefined> {
    return buildHeaders([await this.basicAuth(opts), await this.webhookSignatureAuth(opts)]);
  }

  protected async basicAuth(opts: FinalRequestOptions): Promise<NullableHeaders | undefined> {
    if (!this.username) {
      return undefined;
    }

    if (!this.password) {
      return undefined;
    }

    const credentials = `${this.username}:${this.password}`;
    const Authorization = `Basic ${toBase64(credentials)}`;
    return buildHeaders([{ Authorization }]);
  }

  protected async webhookSignatureAuth(opts: FinalRequestOptions): Promise<NullableHeaders | undefined> {
    if (this.webhookSignature == null) {
      return undefined;
    }
    return buildHeaders([{ 'X-Grid-Signature': this.webhookSignature }]);
  }

  /**
   * Basic re-implementation of `qs.stringify` for primitive types.
   */
  protected stringifyQuery(query: Record<string, unknown>): string {
    return Object.entries(query)
      .filter(([_, value]) => typeof value !== 'undefined')
      .map(([key, value]) => {
        if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
          return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
        }
        if (value === null) {
          return `${encodeURIComponent(key)}=`;
        }
        throw new Errors.GridError(
          `Cannot stringify type ${typeof value}; Expected string, number, boolean, or null. If you need to pass nested query parameters, you can manually encode them, e.g. { query: { 'foo[key1]': value1, 'foo[key2]': value2 } }, and please open a GitHub issue requesting better support for your use case.`,
        );
      })
      .join('&');
  }

  private getUserAgent(): string {
    return `${this.constructor.name}/JS ${VERSION}`;
  }

  protected defaultIdempotencyKey(): string {
    return `stainless-node-retry-${uuid4()}`;
  }

  protected makeStatusError(
    status: number,
    error: Object,
    message: string | undefined,
    headers: Headers,
  ): Errors.APIError {
    return Errors.APIError.generate(status, error, message, headers);
  }

  buildURL(
    path: string,
    query: Record<string, unknown> | null | undefined,
    defaultBaseURL?: string | undefined,
  ): string {
    const baseURL = (!this.#baseURLOverridden() && defaultBaseURL) || this.baseURL;
    const url =
      isAbsoluteURL(path) ?
        new URL(path)
      : new URL(baseURL + (baseURL.endsWith('/') && path.startsWith('/') ? path.slice(1) : path));

    const defaultQuery = this.defaultQuery();
    if (!isEmptyObj(defaultQuery)) {
      query = { ...defaultQuery, ...query };
    }

    if (typeof query === 'object' && query && !Array.isArray(query)) {
      url.search = this.stringifyQuery(query as Record<string, unknown>);
    }

    return url.toString();
  }

  /**
   * Used as a callback for mutating the given `FinalRequestOptions` object.
   */
  protected async prepareOptions(options: FinalRequestOptions): Promise<void> {}

  /**
   * Used as a callback for mutating the given `RequestInit` object.
   *
   * This is useful for cases where you want to add certain headers based off of
   * the request properties, e.g. `method` or `url`.
   */
  protected async prepareRequest(
    request: RequestInit,
    { url, options }: { url: string; options: FinalRequestOptions },
  ): Promise<void> {}

  get<Rsp>(path: string, opts?: PromiseOrValue<RequestOptions>): APIPromise<Rsp> {
    return this.methodRequest('get', path, opts);
  }

  post<Rsp>(path: string, opts?: PromiseOrValue<RequestOptions>): APIPromise<Rsp> {
    return this.methodRequest('post', path, opts);
  }

  patch<Rsp>(path: string, opts?: PromiseOrValue<RequestOptions>): APIPromise<Rsp> {
    return this.methodRequest('patch', path, opts);
  }

  put<Rsp>(path: string, opts?: PromiseOrValue<RequestOptions>): APIPromise<Rsp> {
    return this.methodRequest('put', path, opts);
  }

  delete<Rsp>(path: string, opts?: PromiseOrValue<RequestOptions>): APIPromise<Rsp> {
    return this.methodRequest('delete', path, opts);
  }

  private methodRequest<Rsp>(
    method: HTTPMethod,
    path: string,
    opts?: PromiseOrValue<RequestOptions>,
  ): APIPromise<Rsp> {
    return this.request(
      Promise.resolve(opts).then((opts) => {
        return { method, path, ...opts };
      }),
    );
  }

  request<Rsp>(
    options: PromiseOrValue<FinalRequestOptions>,
    remainingRetries: number | null = null,
  ): APIPromise<Rsp> {
    return new APIPromise(this, this.makeRequest(options, remainingRetries, undefined));
  }

  private async makeRequest(
    optionsInput: PromiseOrValue<FinalRequestOptions>,
    retriesRemaining: number | null,
    retryOfRequestLogID: string | undefined,
  ): Promise<APIResponseProps> {
    const options = await optionsInput;
    const maxRetries = options.maxRetries ?? this.maxRetries;
    if (retriesRemaining == null) {
      retriesRemaining = maxRetries;
    }

    await this.prepareOptions(options);

    const { req, url, timeout } = await this.buildRequest(options, {
      retryCount: maxRetries - retriesRemaining,
    });

    await this.prepareRequest(req, { url, options });

    /** Not an API request ID, just for correlating local log entries. */
    const requestLogID = 'log_' + ((Math.random() * (1 << 24)) | 0).toString(16).padStart(6, '0');
    const retryLogStr = retryOfRequestLogID === undefined ? '' : `, retryOf: ${retryOfRequestLogID}`;
    const startTime = Date.now();

    loggerFor(this).debug(
      `[${requestLogID}] sending request`,
      formatRequestDetails({
        retryOfRequestLogID,
        method: options.method,
        url,
        options,
        headers: req.headers,
      }),
    );

    if (options.signal?.aborted) {
      throw new Errors.APIUserAbortError();
    }

    const controller = new AbortController();
    const response = await this.fetchWithTimeout(url, req, timeout, controller).catch(castToError);
    const headersTime = Date.now();

    if (response instanceof globalThis.Error) {
      const retryMessage = `retrying, ${retriesRemaining} attempts remaining`;
      if (options.signal?.aborted) {
        throw new Errors.APIUserAbortError();
      }
      // detect native connection timeout errors
      // deno throws "TypeError: error sending request for url (https://example/): client error (Connect): tcp connect error: Operation timed out (os error 60): Operation timed out (os error 60)"
      // undici throws "TypeError: fetch failed" with cause "ConnectTimeoutError: Connect Timeout Error (attempted address: example:443, timeout: 1ms)"
      // others do not provide enough information to distinguish timeouts from other connection errors
      const isTimeout =
        isAbortError(response) ||
        /timed? ?out/i.test(String(response) + ('cause' in response ? String(response.cause) : ''));
      if (retriesRemaining) {
        loggerFor(this).info(
          `[${requestLogID}] connection ${isTimeout ? 'timed out' : 'failed'} - ${retryMessage}`,
        );
        loggerFor(this).debug(
          `[${requestLogID}] connection ${isTimeout ? 'timed out' : 'failed'} (${retryMessage})`,
          formatRequestDetails({
            retryOfRequestLogID,
            url,
            durationMs: headersTime - startTime,
            message: response.message,
          }),
        );
        return this.retryRequest(options, retriesRemaining, retryOfRequestLogID ?? requestLogID);
      }
      loggerFor(this).info(
        `[${requestLogID}] connection ${isTimeout ? 'timed out' : 'failed'} - error; no more retries left`,
      );
      loggerFor(this).debug(
        `[${requestLogID}] connection ${isTimeout ? 'timed out' : 'failed'} (error; no more retries left)`,
        formatRequestDetails({
          retryOfRequestLogID,
          url,
          durationMs: headersTime - startTime,
          message: response.message,
        }),
      );
      if (isTimeout) {
        throw new Errors.APIConnectionTimeoutError();
      }
      throw new Errors.APIConnectionError({ cause: response });
    }

    const responseInfo = `[${requestLogID}${retryLogStr}] ${req.method} ${url} ${
      response.ok ? 'succeeded' : 'failed'
    } with status ${response.status} in ${headersTime - startTime}ms`;

    if (!response.ok) {
      const shouldRetry = await this.shouldRetry(response);
      if (retriesRemaining && shouldRetry) {
        const retryMessage = `retrying, ${retriesRemaining} attempts remaining`;

        // We don't need the body of this response.
        await Shims.CancelReadableStream(response.body);
        loggerFor(this).info(`${responseInfo} - ${retryMessage}`);
        loggerFor(this).debug(
          `[${requestLogID}] response error (${retryMessage})`,
          formatRequestDetails({
            retryOfRequestLogID,
            url: response.url,
            status: response.status,
            headers: response.headers,
            durationMs: headersTime - startTime,
          }),
        );
        return this.retryRequest(
          options,
          retriesRemaining,
          retryOfRequestLogID ?? requestLogID,
          response.headers,
        );
      }

      const retryMessage = shouldRetry ? `error; no more retries left` : `error; not retryable`;

      loggerFor(this).info(`${responseInfo} - ${retryMessage}`);

      const errText = await response.text().catch((err: any) => castToError(err).message);
      const errJSON = safeJSON(errText);
      const errMessage = errJSON ? undefined : errText;

      loggerFor(this).debug(
        `[${requestLogID}] response error (${retryMessage})`,
        formatRequestDetails({
          retryOfRequestLogID,
          url: response.url,
          status: response.status,
          headers: response.headers,
          message: errMessage,
          durationMs: Date.now() - startTime,
        }),
      );

      const err = this.makeStatusError(response.status, errJSON, errMessage, response.headers);
      throw err;
    }

    loggerFor(this).info(responseInfo);
    loggerFor(this).debug(
      `[${requestLogID}] response start`,
      formatRequestDetails({
        retryOfRequestLogID,
        url: response.url,
        status: response.status,
        headers: response.headers,
        durationMs: headersTime - startTime,
      }),
    );

    return { response, options, controller, requestLogID, retryOfRequestLogID, startTime };
  }

  getAPIList<Item, PageClass extends Pagination.AbstractPage<Item> = Pagination.AbstractPage<Item>>(
    path: string,
    Page: new (...args: any[]) => PageClass,
    opts?: RequestOptions,
  ): Pagination.PagePromise<PageClass, Item> {
    return this.requestAPIList(Page, { method: 'get', path, ...opts });
  }

  requestAPIList<
    Item = unknown,
    PageClass extends Pagination.AbstractPage<Item> = Pagination.AbstractPage<Item>,
  >(
    Page: new (...args: ConstructorParameters<typeof Pagination.AbstractPage>) => PageClass,
    options: FinalRequestOptions,
  ): Pagination.PagePromise<PageClass, Item> {
    const request = this.makeRequest(options, null, undefined);
    return new Pagination.PagePromise<PageClass, Item>(this as any as Grid, request, Page);
  }

  async fetchWithTimeout(
    url: RequestInfo,
    init: RequestInit | undefined,
    ms: number,
    controller: AbortController,
  ): Promise<Response> {
    const { signal, method, ...options } = init || {};
    if (signal) signal.addEventListener('abort', () => controller.abort());

    const timeout = setTimeout(() => controller.abort(), ms);

    const isReadableBody =
      ((globalThis as any).ReadableStream && options.body instanceof (globalThis as any).ReadableStream) ||
      (typeof options.body === 'object' && options.body !== null && Symbol.asyncIterator in options.body);

    const fetchOptions: RequestInit = {
      signal: controller.signal as any,
      ...(isReadableBody ? { duplex: 'half' } : {}),
      method: 'GET',
      ...options,
    };
    if (method) {
      // Custom methods like 'patch' need to be uppercased
      // See https://github.com/nodejs/undici/issues/2294
      fetchOptions.method = method.toUpperCase();
    }

    try {
      // use undefined this binding; fetch errors if bound to something else in browser/cloudflare
      return await this.fetch.call(undefined, url, fetchOptions);
    } finally {
      clearTimeout(timeout);
    }
  }

  private async shouldRetry(response: Response): Promise<boolean> {
    // Note this is not a standard header.
    const shouldRetryHeader = response.headers.get('x-should-retry');

    // If the server explicitly says whether or not to retry, obey.
    if (shouldRetryHeader === 'true') return true;
    if (shouldRetryHeader === 'false') return false;

    // Retry on request timeouts.
    if (response.status === 408) return true;

    // Retry on lock timeouts.
    if (response.status === 409) return true;

    // Retry on rate limits.
    if (response.status === 429) return true;

    // Retry internal errors.
    if (response.status >= 500) return true;

    return false;
  }

  private async retryRequest(
    options: FinalRequestOptions,
    retriesRemaining: number,
    requestLogID: string,
    responseHeaders?: Headers | undefined,
  ): Promise<APIResponseProps> {
    let timeoutMillis: number | undefined;

    // Note the `retry-after-ms` header may not be standard, but is a good idea and we'd like proactive support for it.
    const retryAfterMillisHeader = responseHeaders?.get('retry-after-ms');
    if (retryAfterMillisHeader) {
      const timeoutMs = parseFloat(retryAfterMillisHeader);
      if (!Number.isNaN(timeoutMs)) {
        timeoutMillis = timeoutMs;
      }
    }

    // About the Retry-After header: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Retry-After
    const retryAfterHeader = responseHeaders?.get('retry-after');
    if (retryAfterHeader && !timeoutMillis) {
      const timeoutSeconds = parseFloat(retryAfterHeader);
      if (!Number.isNaN(timeoutSeconds)) {
        timeoutMillis = timeoutSeconds * 1000;
      } else {
        timeoutMillis = Date.parse(retryAfterHeader) - Date.now();
      }
    }

    // If the API asks us to wait a certain amount of time (and it's a reasonable amount),
    // just do what it says, but otherwise calculate a default
    if (!(timeoutMillis && 0 <= timeoutMillis && timeoutMillis < 60 * 1000)) {
      const maxRetries = options.maxRetries ?? this.maxRetries;
      timeoutMillis = this.calculateDefaultRetryTimeoutMillis(retriesRemaining, maxRetries);
    }
    await sleep(timeoutMillis);

    return this.makeRequest(options, retriesRemaining - 1, requestLogID);
  }

  private calculateDefaultRetryTimeoutMillis(retriesRemaining: number, maxRetries: number): number {
    const initialRetryDelay = 0.5;
    const maxRetryDelay = 8.0;

    const numRetries = maxRetries - retriesRemaining;

    // Apply exponential backoff, but not more than the max.
    const sleepSeconds = Math.min(initialRetryDelay * Math.pow(2, numRetries), maxRetryDelay);

    // Apply some jitter, take up to at most 25 percent of the retry time.
    const jitter = 1 - Math.random() * 0.25;

    return sleepSeconds * jitter * 1000;
  }

  async buildRequest(
    inputOptions: FinalRequestOptions,
    { retryCount = 0 }: { retryCount?: number } = {},
  ): Promise<{ req: FinalizedRequestInit; url: string; timeout: number }> {
    const options = { ...inputOptions };
    const { method, path, query, defaultBaseURL } = options;

    const url = this.buildURL(path!, query as Record<string, unknown>, defaultBaseURL);
    if ('timeout' in options) validatePositiveInteger('timeout', options.timeout);
    options.timeout = options.timeout ?? this.timeout;
    const { bodyHeaders, body } = this.buildBody({ options });
    const reqHeaders = await this.buildHeaders({ options: inputOptions, method, bodyHeaders, retryCount });

    const req: FinalizedRequestInit = {
      method,
      headers: reqHeaders,
      ...(options.signal && { signal: options.signal }),
      ...((globalThis as any).ReadableStream &&
        body instanceof (globalThis as any).ReadableStream && { duplex: 'half' }),
      ...(body && { body }),
      ...((this.fetchOptions as any) ?? {}),
      ...((options.fetchOptions as any) ?? {}),
    };

    return { req, url, timeout: options.timeout };
  }

  private async buildHeaders({
    options,
    method,
    bodyHeaders,
    retryCount,
  }: {
    options: FinalRequestOptions;
    method: HTTPMethod;
    bodyHeaders: HeadersLike;
    retryCount: number;
  }): Promise<Headers> {
    let idempotencyHeaders: HeadersLike = {};
    if (this.idempotencyHeader && method !== 'get') {
      if (!options.idempotencyKey) options.idempotencyKey = this.defaultIdempotencyKey();
      idempotencyHeaders[this.idempotencyHeader] = options.idempotencyKey;
    }

    const headers = buildHeaders([
      idempotencyHeaders,
      {
        Accept: 'application/json',
        'User-Agent': this.getUserAgent(),
        'X-Stainless-Retry-Count': String(retryCount),
        ...(options.timeout ? { 'X-Stainless-Timeout': String(Math.trunc(options.timeout / 1000)) } : {}),
        ...getPlatformHeaders(),
      },
      await this.authHeaders(options),
      this._options.defaultHeaders,
      bodyHeaders,
      options.headers,
    ]);

    this.validateHeaders(headers);

    return headers.values;
  }

  private buildBody({ options: { body, headers: rawHeaders } }: { options: FinalRequestOptions }): {
    bodyHeaders: HeadersLike;
    body: BodyInit | undefined;
  } {
    if (!body) {
      return { bodyHeaders: undefined, body: undefined };
    }
    const headers = buildHeaders([rawHeaders]);
    if (
      // Pass raw type verbatim
      ArrayBuffer.isView(body) ||
      body instanceof ArrayBuffer ||
      body instanceof DataView ||
      (typeof body === 'string' &&
        // Preserve legacy string encoding behavior for now
        headers.values.has('content-type')) ||
      // `Blob` is superset of `File`
      ((globalThis as any).Blob && body instanceof (globalThis as any).Blob) ||
      // `FormData` -> `multipart/form-data`
      body instanceof FormData ||
      // `URLSearchParams` -> `application/x-www-form-urlencoded`
      body instanceof URLSearchParams ||
      // Send chunked stream (each chunk has own `length`)
      ((globalThis as any).ReadableStream && body instanceof (globalThis as any).ReadableStream)
    ) {
      return { bodyHeaders: undefined, body: body as BodyInit };
    } else if (
      typeof body === 'object' &&
      (Symbol.asyncIterator in body ||
        (Symbol.iterator in body && 'next' in body && typeof body.next === 'function'))
    ) {
      return { bodyHeaders: undefined, body: Shims.ReadableStreamFrom(body as AsyncIterable<Uint8Array>) };
    } else {
      return this.#encoder({ body, headers });
    }
  }

  static Grid = this;
  static DEFAULT_TIMEOUT = 60000; // 1 minute

  static GridError = Errors.GridError;
  static APIError = Errors.APIError;
  static APIConnectionError = Errors.APIConnectionError;
  static APIConnectionTimeoutError = Errors.APIConnectionTimeoutError;
  static APIUserAbortError = Errors.APIUserAbortError;
  static Forbidden = Errors.Forbidden;
  static SelfPayment = Errors.SelfPayment;
  static InvalidInput = Errors.InvalidInput;
  static InvalidNonce = Errors.InvalidNonce;
  static Unauthorized = Errors.Unauthorized;
  static UserNotReady = Errors.UserNotReady;
  static UserNotFound = Errors.UserNotFound;
  static NotFoundError = Errors.NotFoundError;
  static ConflictError = Errors.ConflictError;
  static InvalidAmount = Errors.InvalidAmount;
  static QuoteNotFound = Errors.QuoteNotFound;
  static TokenNotFound = Errors.TokenNotFound;
  static InternalError = Errors.InternalError;
  static RateLimitError = Errors.RateLimitError;
  static NotImplemented = Errors.NotImplemented;
  static BadRequestError = Errors.BadRequestError;
  static InvalidReceiver = Errors.InvalidReceiver;
  static InvalidCurrency = Errors.InvalidCurrency;
  static GridSwitchError = Errors.GridSwitchError;
  static CertChainInvalid = Errors.CertChainInvalid;
  static CertChainExpired = Errors.CertChainExpired;
  static AmountOutOfRange = Errors.AmountOutOfRange;
  static InvalidTimestamp = Errors.InvalidTimestamp;
  static InvalidSignature = Errors.InvalidSignature;
  static UmaAddressExists = Errors.UmaAddressExists;
  static InvalidUmaAddress = Errors.InvalidUmaAddress;
  static SenderNotAccepted = Errors.SenderNotAccepted;
  static ReferenceNotFound = Errors.ReferenceNotFound;
  static QuoteRequestFailed = Errors.QuoteRequestFailed;
  static InvalidBankAccount = Errors.InvalidBankAccount;
  static InvitationNotFound = Errors.InvitationNotFound;
  static AuthenticationError = Errors.AuthenticationError;
  static InternalServerError = Errors.InternalServerError;
  static InvitationCancelled = Errors.InvitationCancelled;
  static InvalidPubkeyFormat = Errors.InvalidPubkeyFormat;
  static LookupRequestFailed = Errors.LookupRequestFailed;
  static TransactionNotFound = Errors.TransactionNotFound;
  static PayreqRequestFailed = Errors.PayreqRequestFailed;
  static LnurlpRequestFailed = Errors.LnurlpRequestFailed;
  static InvalidRequestFormat = Errors.InvalidRequestFormat;
  static WebhookDeliveryError = Errors.WebhookDeliveryError;
  static PermissionDeniedError = Errors.PermissionDeniedError;
  static InvalidPayreqResponse = Errors.InvalidPayreqResponse;
  static WebhookEndpointNotSet = Errors.WebhookEndpointNotSet;
  static VelocityLimitExceeded = Errors.VelocityLimitExceeded;
  static LookupRequestNotFound = Errors.LookupRequestNotFound;
  static BulkUploadJobNotFound = Errors.BulkUploadJobNotFound;
  static UnsupportedUmaVersion = Errors.UnsupportedUmaVersion;
  static CounterpartyNotAllowed = Errors.CounterpartyNotAllowed;
  static NoCompatibleUmaVersion = Errors.NoCompatibleUmaVersion;
  static UnprocessableEntityError = Errors.UnprocessableEntityError;
  static MissingMandatoryUserInfo = Errors.MissingMandatoryUserInfo;
  static InvitationAlreadyClaimed = Errors.InvitationAlreadyClaimed;
  static InvitationsNotConfigured = Errors.InvitationsNotConfigured;
  static ParsePayreqResponseError = Errors.ParsePayreqResponseError;
  static ParseLnurlpResponseError = Errors.ParseLnurlpResponseError;
  static MissingRequiredUmaParameters = Errors.MissingRequiredUmaParameters;
  static CounterpartyPubkeyFetchError = Errors.CounterpartyPubkeyFetchError;
  static UnrecognizedMandatoryPayeeDataKey = Errors.UnrecognizedMandatoryPayeeDataKey;
  static TransactionNotPendingPlatformApproval = Errors.TransactionNotPendingPlatformApproval;

  static toFile = Uploads.toFile;

  config: API.Config = new API.Config(this);
  customers: API.Customers = new API.Customers(this);
  platform: API.Platform = new API.Platform(this);
  plaid: API.Plaid = new API.Plaid(this);
  transferIn: API.TransferIn = new API.TransferIn(this);
  transferOut: API.TransferOut = new API.TransferOut(this);
  receiver: API.Receiver = new API.Receiver(this);
  quotes: API.Quotes = new API.Quotes(this);
  transactions: API.Transactions = new API.Transactions(this);
  webhooks: API.Webhooks = new API.Webhooks(this);
  invitations: API.Invitations = new API.Invitations(this);
  sandbox: API.Sandbox = new API.Sandbox(this);
  umaProviders: API.UmaProviders = new API.UmaProviders(this);
  tokens: API.Tokens = new API.Tokens(this);
}

Grid.Config = Config;
Grid.Customers = Customers;
Grid.Platform = Platform;
Grid.Plaid = Plaid;
Grid.TransferIn = TransferIn;
Grid.TransferOut = TransferOut;
Grid.Receiver = Receiver;
Grid.Quotes = Quotes;
Grid.Transactions = Transactions;
Grid.Webhooks = Webhooks;
Grid.Invitations = Invitations;
Grid.Sandbox = Sandbox;
Grid.UmaProviders = UmaProviders;
Grid.Tokens = Tokens;

export declare namespace Grid {
  export type RequestOptions = Opts.RequestOptions;

  export import DefaultPagination = Pagination.DefaultPagination;
  export {
    type DefaultPaginationParams as DefaultPaginationParams,
    type DefaultPaginationResponse as DefaultPaginationResponse,
  };

  export {
    Config as Config,
    type CustomerInfoFieldName as CustomerInfoFieldName,
    type PlatformConfig as PlatformConfig,
    type PlatformCurrencyConfig as PlatformCurrencyConfig,
    type ConfigUpdateParams as ConfigUpdateParams,
  };

  export {
    Customers as Customers,
    type Address as Address,
    type BusinessCustomer as BusinessCustomer,
    type BusinessCustomerUpdate as BusinessCustomerUpdate,
    type Customer as Customer,
    type CustomerType as CustomerType,
    type IndividualCustomer as IndividualCustomer,
    type IndividualCustomerUpdate as IndividualCustomerUpdate,
    type UltimateBeneficialOwner as UltimateBeneficialOwner,
    type CustomerCreateResponse as CustomerCreateResponse,
    type CustomerRetrieveResponse as CustomerRetrieveResponse,
    type CustomerUpdateResponse as CustomerUpdateResponse,
    type CustomerListResponse as CustomerListResponse,
    type CustomerDeleteResponse as CustomerDeleteResponse,
    type CustomerGetKYCLinkResponse as CustomerGetKYCLinkResponse,
    type CustomerListResponsesDefaultPagination as CustomerListResponsesDefaultPagination,
    type CustomerCreateParams as CustomerCreateParams,
    type CustomerUpdateParams as CustomerUpdateParams,
    type CustomerListParams as CustomerListParams,
    type CustomerGetKYCLinkParams as CustomerGetKYCLinkParams,
    type CustomerListInternalAccountsParams as CustomerListInternalAccountsParams,
  };

  export {
    Platform as Platform,
    type PlatformListInternalAccountsResponse as PlatformListInternalAccountsResponse,
    type PlatformListInternalAccountsParams as PlatformListInternalAccountsParams,
  };

  export {
    Plaid as Plaid,
    type PlaidCreateLinkTokenResponse as PlaidCreateLinkTokenResponse,
    type PlaidCreateLinkTokenParams as PlaidCreateLinkTokenParams,
    type PlaidSubmitPublicTokenParams as PlaidSubmitPublicTokenParams,
  };

  export {
    TransferIn as TransferIn,
    type Transaction as Transaction,
    type TransferInCreateParams as TransferInCreateParams,
  };

  export { TransferOut as TransferOut, type TransferOutCreateParams as TransferOutCreateParams };

  export {
    Receiver as Receiver,
    type CounterpartyFieldDefinition as CounterpartyFieldDefinition,
    type LookupResponse as LookupResponse,
    type ReceiverLookupExternalAccountResponse as ReceiverLookupExternalAccountResponse,
    type ReceiverLookupUmaResponse as ReceiverLookupUmaResponse,
    type ReceiverLookupExternalAccountParams as ReceiverLookupExternalAccountParams,
    type ReceiverLookupUmaParams as ReceiverLookupUmaParams,
  };

  export {
    Quotes as Quotes,
    type Currency as Currency,
    type OutgoingRateDetails as OutgoingRateDetails,
    type PaymentInstructions as PaymentInstructions,
    type Quote as Quote,
    type QuoteSource as QuoteSource,
    type QuotesDefaultPagination as QuotesDefaultPagination,
    type QuoteCreateParams as QuoteCreateParams,
    type QuoteListParams as QuoteListParams,
  };

  export {
    Transactions as Transactions,
    type AccountSource as AccountSource,
    type IncomingTransaction as IncomingTransaction,
    type TransactionStatus as TransactionStatus,
    type TransactionType as TransactionType,
    type UmaAddressSource as UmaAddressSource,
    type TransactionListParams as TransactionListParams,
    type TransactionApproveParams as TransactionApproveParams,
    type TransactionRejectParams as TransactionRejectParams,
  };

  export { Webhooks as Webhooks, type WebhookSendTestResponse as WebhookSendTestResponse };

  export {
    Invitations as Invitations,
    type CurrencyAmount as CurrencyAmount,
    type UmaInvitation as UmaInvitation,
    type InvitationCreateParams as InvitationCreateParams,
    type InvitationClaimParams as InvitationClaimParams,
  };

  export {
    Sandbox as Sandbox,
    type SandboxSendFundsResponse as SandboxSendFundsResponse,
    type SandboxSendFundsParams as SandboxSendFundsParams,
  };

  export {
    UmaProviders as UmaProviders,
    type UmaProviderListResponse as UmaProviderListResponse,
    type UmaProviderListResponsesDefaultPagination as UmaProviderListResponsesDefaultPagination,
    type UmaProviderListParams as UmaProviderListParams,
  };

  export {
    Tokens as Tokens,
    type APIToken as APIToken,
    type Permission as Permission,
    type APITokensDefaultPagination as APITokensDefaultPagination,
    type TokenCreateParams as TokenCreateParams,
    type TokenListParams as TokenListParams,
  };
}
