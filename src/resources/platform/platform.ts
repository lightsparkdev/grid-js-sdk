// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as ExternalAccountsAPI from './external-accounts';
import {
  AedAccountInfo,
  BdtAccountInfo,
  BrlAccountInfo,
  BwpAccountInfo,
  CadAccountInfo,
  CopAccountInfo,
  DkkAccountInfo,
  EgpAccountInfo,
  EurAccountInfo,
  ExternalAccountChallengeParams,
  ExternalAccountCreateParams,
  ExternalAccountListParams,
  ExternalAccountVerifyParams,
  ExternalAccounts,
  GbpAccountInfo,
  GhsAccountInfo,
  GtqAccountInfo,
  HkdAccountInfo,
  HtgAccountInfo,
  IdrAccountInfo,
  InrAccountInfo,
  JmdAccountInfo,
  KesAccountInfo,
  MwkAccountInfo,
  MxnAccountInfo,
  MyrAccountInfo,
  NgnAccountInfo,
  PhpAccountInfo,
  PkrAccountInfo,
  PlatformExternalAccountCreateRequest,
  RwfAccountInfo,
  SgdAccountInfo,
  ThbAccountInfo,
  TzsAccountInfo,
  UgxAccountInfo,
  UsdAccountInfo,
  VndAccountInfo,
  XafAccountInfo,
  XofAccountInfo,
  ZarAccountInfo,
  ZmwAccountInfo,
} from './external-accounts';
import * as InternalAccountsAPI from '../sandbox/internal-accounts';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';

/**
 * Internal account management endpoints for creating and managing internal accounts
 */
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
   * const platformInternalAccountListResponse =
   *   await client.platform.listInternalAccounts();
   * ```
   */
  listInternalAccounts(
    query: PlatformListInternalAccountsParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<PlatformInternalAccountListResponse> {
    return this._client.get('/platform/internal-accounts', {
      query,
      ...options,
      __security: { basicAuth: true },
    });
  }
}

export interface PlatformInternalAccountListResponse {
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

  /**
   * Filter by internal account type. Use `EMBEDDED_WALLET` to find the
   * self-custodial wallet provisioned for a customer, `INTERNAL_FIAT` /
   * `INTERNAL_CRYPTO` for the platform-managed holding accounts, or `RULE_BASED` for
   * the additional account numbers issued with a sweep rule.
   */
  type?: 'INTERNAL_FIAT' | 'INTERNAL_CRYPTO' | 'EMBEDDED_WALLET' | 'RULE_BASED';
}

Platform.ExternalAccounts = ExternalAccounts;

export declare namespace Platform {
  export {
    type PlatformInternalAccountListResponse as PlatformInternalAccountListResponse,
    type PlatformListInternalAccountsParams as PlatformListInternalAccountsParams,
  };

  export {
    ExternalAccounts as ExternalAccounts,
    type AedAccountInfo as AedAccountInfo,
    type BdtAccountInfo as BdtAccountInfo,
    type BrlAccountInfo as BrlAccountInfo,
    type BwpAccountInfo as BwpAccountInfo,
    type CadAccountInfo as CadAccountInfo,
    type CopAccountInfo as CopAccountInfo,
    type DkkAccountInfo as DkkAccountInfo,
    type EgpAccountInfo as EgpAccountInfo,
    type EurAccountInfo as EurAccountInfo,
    type GbpAccountInfo as GbpAccountInfo,
    type GhsAccountInfo as GhsAccountInfo,
    type GtqAccountInfo as GtqAccountInfo,
    type HkdAccountInfo as HkdAccountInfo,
    type HtgAccountInfo as HtgAccountInfo,
    type IdrAccountInfo as IdrAccountInfo,
    type InrAccountInfo as InrAccountInfo,
    type JmdAccountInfo as JmdAccountInfo,
    type KesAccountInfo as KesAccountInfo,
    type MwkAccountInfo as MwkAccountInfo,
    type MxnAccountInfo as MxnAccountInfo,
    type MyrAccountInfo as MyrAccountInfo,
    type NgnAccountInfo as NgnAccountInfo,
    type PhpAccountInfo as PhpAccountInfo,
    type PkrAccountInfo as PkrAccountInfo,
    type PlatformExternalAccountCreateRequest as PlatformExternalAccountCreateRequest,
    type RwfAccountInfo as RwfAccountInfo,
    type SgdAccountInfo as SgdAccountInfo,
    type ThbAccountInfo as ThbAccountInfo,
    type TzsAccountInfo as TzsAccountInfo,
    type UgxAccountInfo as UgxAccountInfo,
    type UsdAccountInfo as UsdAccountInfo,
    type VndAccountInfo as VndAccountInfo,
    type XafAccountInfo as XafAccountInfo,
    type XofAccountInfo as XofAccountInfo,
    type ZarAccountInfo as ZarAccountInfo,
    type ZmwAccountInfo as ZmwAccountInfo,
    type ExternalAccountCreateParams as ExternalAccountCreateParams,
    type ExternalAccountListParams as ExternalAccountListParams,
    type ExternalAccountChallengeParams as ExternalAccountChallengeParams,
    type ExternalAccountVerifyParams as ExternalAccountVerifyParams,
  };
}
