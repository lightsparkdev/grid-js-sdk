// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as QuotesAPI from './quotes';
import { DefaultPagination, type DefaultPaginationParams, PagePromise } from '../core/pagination';
import { RequestOptions } from '../internal/request-options';

export class UmaProviders extends APIResource {
  /**
   * Retrieve a list of available Counterparty Providers. The response includes basic
   * information about each provider, such as its UMA address, name, and supported
   * currencies.
   */
  list(
    query: UmaProviderListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<UmaProviderListResponsesDefaultPagination, UmaProviderListResponse> {
    return this._client.getAPIList('/uma-providers', DefaultPagination<UmaProviderListResponse>, {
      query,
      ...options,
    });
  }
}

export type UmaProviderListResponsesDefaultPagination = DefaultPagination<UmaProviderListResponse>;

export interface UmaProviderListResponse {
  /**
   * Whether this UMA Provider is on your allow list
   */
  allowListStatus?: boolean;

  /**
   * Domain this VASP uses for UMA addresses
   */
  domain?: string;

  /**
   * Legal Entity Identifier for the UMA Provider
   */
  lei?: string;

  /**
   * Logo URL for the VASP
   */
  logoUrl?: string;

  /**
   * Name of the UMA Provider
   */
  name?: string;

  /**
   * List of currencies supported by this UMA Provider
   */
  supportedCurrencies?: Array<QuotesAPI.Currency>;

  /**
   * Region(s) this UMA Provider operates in
   */
  supportedRegions?: Array<string>;
}

export interface UmaProviderListParams extends DefaultPaginationParams {
  /**
   * The alpha-2 representation of a country, as defined by the ISO 3166-1 standard.
   */
  countryCode?: string;

  /**
   * The ISO 4217 currency code to filter providers by supported currency.
   */
  currencyCode?: string;

  /**
   * Whether to include providers which are not on your allowlist in the response. By
   * default the response will include blocked providers.
   */
  hasBlockedProviders?: boolean;

  /**
   * Maximum number of results to return (default 20, max 100)
   */
  limit?: number;

  /**
   * Order to sort results in
   */
  sortOrder?: 'asc' | 'desc';
}

export declare namespace UmaProviders {
  export {
    type UmaProviderListResponse as UmaProviderListResponse,
    type UmaProviderListResponsesDefaultPagination as UmaProviderListResponsesDefaultPagination,
    type UmaProviderListParams as UmaProviderListParams,
  };
}
