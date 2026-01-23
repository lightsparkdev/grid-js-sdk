// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as ExternalAccountsAPI from './external-accounts';
import {
  ExternalAccountCreateParams,
  ExternalAccountListParams,
  ExternalAccountListResponse,
  ExternalAccounts,
} from './external-accounts';
import * as InternalAccountsAPI from '../sandbox/internal-accounts';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';

export class Platform extends APIResource {
  externalAccounts: ExternalAccountsAPI.ExternalAccounts = new ExternalAccountsAPI.ExternalAccounts(
    this._client,
  );

  /**
   * Retrieve a list of all internal accounts that belong to the platform, as opposed
   * to an individual customer.
   *
   * These accounts are created automatically when the platform is configured for
   * each supported currency. They can be used for things like distributing bitcoin
   * rewards to customers, or for other platform-wide purposes.
   *
   * @example
   * ```ts
   * const response =
   *   await client.platform.listInternalAccounts();
   * ```
   */
  listInternalAccounts(
    query: PlatformListInternalAccountsParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<PlatformListInternalAccountsResponse> {
    return this._client.get('/platform/internal-accounts', { query, ...options });
  }
}

export interface PlatformListInternalAccountsResponse {
  /**
   * List of internal accounts matching the filter criteria
   */
  data: Array<InternalAccountsAPI.InternalAccount>;
}

export interface PlatformListInternalAccountsParams {
  /**
   * Filter by currency code
   */
  currency?: string;
}

Platform.ExternalAccounts = ExternalAccounts;

export declare namespace Platform {
  export {
    type PlatformListInternalAccountsResponse as PlatformListInternalAccountsResponse,
    type PlatformListInternalAccountsParams as PlatformListInternalAccountsParams,
  };

  export {
    ExternalAccounts as ExternalAccounts,
    type ExternalAccountListResponse as ExternalAccountListResponse,
    type ExternalAccountCreateParams as ExternalAccountCreateParams,
    type ExternalAccountListParams as ExternalAccountListParams,
  };
}
