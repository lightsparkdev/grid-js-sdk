// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

/**
 * Directory of Virtual Asset Service Providers (exchanges and other custodial platforms) recognized for counterparty declarations.
 */
export class Vasps extends APIResource {
  /**
   * Retrieve the directory of Virtual Asset Service Providers (exchanges and other
   * custodial platforms) recognized for counterparty declarations.
   *
   * The `vaspName` field in each result is the value to pass as `vaspName` when
   * declaring a VASP-hosted counterparty.
   */
  list(
    query: VaspListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<VaspListResponse> {
    return this._client.get('/vasps', { query, ...options, __security: { basicAuth: true } });
  }
}

/**
 * A Virtual Asset Service Provider (VASP) — an exchange or other custodial
 * platform — recognized for counterparty declarations.
 */
export interface Vasp {
  /**
   * The VASP's website.
   */
  url: string;

  /**
   * Name of this VASP. Pass this value as `vaspName` when declaring a VASP-hosted
   * counterparty.
   */
  vaspName: string;
}

export interface VaspListResponse {
  /**
   * List of VASPs in the directory
   */
  data: Array<Vasp>;

  /**
   * Indicates if more results are available beyond this page
   */
  hasMore: boolean;

  /**
   * Cursor to retrieve the next page of results (only present if hasMore is true)
   */
  nextCursor?: string;
}

export interface VaspListParams {
  /**
   * Cursor for pagination (returned from previous request)
   */
  cursor?: string;

  /**
   * Maximum number of results to return (default 20, max 100)
   */
  limit?: number;
}

export declare namespace Vasps {
  export {
    type Vasp as Vasp,
    type VaspListResponse as VaspListResponse,
    type VaspListParams as VaspListParams,
  };
}
