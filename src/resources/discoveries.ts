// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

/**
 * Endpoints for discovering available payment rails, banks, and providers for a given country and currency corridor.
 */
export class Discoveries extends APIResource {
  /**
   * Retrieve available payment institution names for a given country and currency.
   * Use this endpoint to look up supported banks and payment providers for a
   * specific corridor. If no country and currency parameter are provided, all
   * payment institutions will be returned
   *
   * The `bankName` field in each result is the value to pass as `bankName` when
   * creating an external account via `POST /customers/external-accounts`.
   */
  list(
    query: DiscoveryListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<DiscoveryListResponse> {
    return this._client.get('/discoveries', { query, ...options });
  }
}

export interface DiscoveryListResponse {
  /**
   * List of payment rails matching the filter criteria
   */
  data?: Array<DiscoveryListResponse.Data>;
}

export namespace DiscoveryListResponse {
  export interface Data {
    /**
     * Canonical name for this payment rail. Pass this value as `bankName` when
     * creating an external account.
     */
    bankName: string;

    /**
     * ISO 3166-1 alpha-2 country code.
     */
    country: string;

    /**
     * ISO 4217 currency code.
     */
    currency: string;

    /**
     * Human-friendly display name for this payment rail.
     */
    displayName: string;
  }
}

export interface DiscoveryListParams {
  /**
   * ISO 3166-1 alpha-2 country code (e.g. PH)
   */
  country?: string;

  /**
   * ISO 4217 currency code (e.g. PHP)
   */
  currency?: string;
}

export declare namespace Discoveries {
  export {
    type DiscoveryListResponse as DiscoveryListResponse,
    type DiscoveryListParams as DiscoveryListParams,
  };
}
