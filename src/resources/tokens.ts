// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Tokens extends APIResource {
  /**
   * Create a new API token to access the Grid APIs.
   *
   * @example
   * ```ts
   * const apiToken = await client.tokens.create({
   *   name: 'Sandbox read-only',
   *   permissions: ['VIEW'],
   * });
   * ```
   */
  create(body: TokenCreateParams, options?: RequestOptions): APIPromise<APIToken> {
    return this._client.post('/tokens', { body, ...options });
  }

  /**
   * Retrieve an API token by their system-generated ID
   *
   * @example
   * ```ts
   * const apiToken = await client.tokens.retrieve('tokenId');
   * ```
   */
  retrieve(tokenID: string, options?: RequestOptions): APIPromise<APIToken> {
    return this._client.get(path`/tokens/${tokenID}`, options);
  }

  /**
   * Retrieve a list of API tokens with optional filtering parameters. Returns all
   * tokens that match the specified filters. If no filters are provided, returns all
   * tokens (paginated).
   *
   * @example
   * ```ts
   * const tokens = await client.tokens.list();
   * ```
   */
  list(
    query: TokenListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<TokenListResponse> {
    return this._client.get('/tokens', { query, ...options });
  }

  /**
   * Delete an API token by their system-generated ID
   *
   * @example
   * ```ts
   * await client.tokens.delete('tokenId');
   * ```
   */
  delete(tokenID: string, options?: RequestOptions): APIPromise<void> {
    return this._client.delete(path`/tokens/${tokenID}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }
}

export interface APIToken {
  /**
   * System-generated unique identifier
   */
  id: string;

  /**
   * An opaque identifier that should be used as a client_id (or username) in the
   * HTTP Basic Authentication scheme when issuing http requests to Grid.
   */
  clientId: string;

  /**
   * Creation timestamp
   */
  createdAt: string;

  /**
   * Name of the token
   */
  name: string;

  /**
   * A list of permissions granted to the token
   */
  permissions: Array<Permission>;

  /**
   * Last update timestamp
   */
  updatedAt: string;

  /**
   * The secret that should be used to authenticate against Grid API. This secret is
   * not stored and will never be available again after creation. Platform must keep
   * this secret secure as it grants access to the account.
   */
  clientSecret?: string;
}

/**
 * Permission of an API token that determines what actions the token can perform:
 * VIEW: Can view all data, including platform config, customers and transactions
 * TRANSACT: Can send payments MANAGE: Can manage platform config, api tokens and
 * customers
 */
export type Permission = 'VIEW' | 'TRANSACT' | 'MANAGE';

export interface TokenListResponse {
  /**
   * List of tokens matching the filter criteria
   */
  data: Array<APIToken>;

  /**
   * Indicates if more results are available beyond this page
   */
  hasMore: boolean;

  /**
   * Cursor to retrieve the next page of results (only present if hasMore is true)
   */
  nextCursor?: string;

  /**
   * Total number of tokens matching the criteria (excluding pagination)
   */
  totalCount?: number;
}

export interface TokenCreateParams {
  /**
   * Name of the token to help identify it
   */
  name: string;

  /**
   * A list of permissions to grant to the token
   */
  permissions: Array<Permission>;
}

export interface TokenListParams {
  /**
   * Filter customers created after this timestamp (inclusive)
   */
  createdAfter?: string;

  /**
   * Filter customers created before this timestamp (inclusive)
   */
  createdBefore?: string;

  /**
   * Cursor for pagination (returned from previous request)
   */
  cursor?: string;

  /**
   * Maximum number of results to return (default 20, max 100)
   */
  limit?: number;

  /**
   * Filter by name of the token
   */
  name?: string;

  /**
   * Filter customers updated after this timestamp (inclusive)
   */
  updatedAfter?: string;

  /**
   * Filter customers updated before this timestamp (inclusive)
   */
  updatedBefore?: string;
}

export declare namespace Tokens {
  export {
    type APIToken as APIToken,
    type Permission as Permission,
    type TokenListResponse as TokenListResponse,
    type TokenCreateParams as TokenCreateParams,
    type TokenListParams as TokenListParams,
  };
}
