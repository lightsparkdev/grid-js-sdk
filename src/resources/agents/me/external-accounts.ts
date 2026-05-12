// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as Shared from '../../shared';
import * as ExternalAccountsAPI from '../../customers/external-accounts';
import { ExternalAccountsDefaultPagination } from '../../customers/external-accounts';
import { APIPromise } from '../../../core/api-promise';
import { DefaultPagination, type DefaultPaginationParams, PagePromise } from '../../../core/pagination';
import { buildHeaders } from '../../../internal/headers';
import { RequestOptions } from '../../../internal/request-options';
import { path } from '../../../internal/utils/path';

/**
 * Endpoints called by the agent itself using its own credentials (obtained via device code redemption). Scoped to the agent's associated customer — all requests automatically operate on behalf of that customer and are subject to the agent's policy. When an action requires approval, the resulting transaction enters a pending state and must be approved by the platform via `POST /transactions/{transactionId}/approve`.
 */
export class ExternalAccounts extends APIResource {
  /**
   * Retrieve an external account belonging to the authenticated agent's customer.
   * Returns 404 if the account exists but belongs to a different customer. Requires
   * the MANAGE_EXTERNAL_ACCOUNTS permission in the agent's policy.
   *
   * @example
   * ```ts
   * const externalAccount =
   *   await client.agents.me.externalAccounts.retrieve(
   *     'externalAccountId',
   *   );
   * ```
   */
  retrieve(
    externalAccountID: string,
    options?: RequestOptions,
  ): APIPromise<ExternalAccountsAPI.ExternalAccount> {
    return this._client.get(path`/agents/me/external-accounts/${externalAccountID}`, options);
  }

  /**
   * Retrieve a paginated list of external accounts belonging to the authenticated
   * agent's customer. Requires the MANAGE_EXTERNAL_ACCOUNTS permission in the
   * agent's policy.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const externalAccount of client.agents.me.externalAccounts.list()) {
   *   // ...
   * }
   * ```
   */
  list(
    query: ExternalAccountListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<ExternalAccountsDefaultPagination, ExternalAccountsAPI.ExternalAccount> {
    return this._client.getAPIList(
      '/agents/me/external-accounts',
      DefaultPagination<ExternalAccountsAPI.ExternalAccount>,
      { query, ...options },
    );
  }

  /**
   * Delete an external account belonging to the authenticated agent's customer.
   * Requires the MANAGE_EXTERNAL_ACCOUNTS permission in the agent's policy.
   *
   * @example
   * ```ts
   * await client.agents.me.externalAccounts.delete(
   *   'externalAccountId',
   * );
   * ```
   */
  delete(externalAccountID: string, options?: RequestOptions): APIPromise<void> {
    return this._client.delete(path`/agents/me/external-accounts/${externalAccountID}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }

  /**
   * Register a new external bank account or wallet for the authenticated agent's
   * customer. Requires the MANAGE_EXTERNAL_ACCOUNTS permission in the agent's
   * policy. The `customerId` field is optional and will be inferred from the agent's
   * associated customer if omitted.
   *
   * @example
   * ```ts
   * const externalAccount =
   *   await client.agents.me.externalAccounts.add({
   *     accountInfo: {
   *       accountType: 'USD_ACCOUNT',
   *       accountNumber: '12345678901',
   *       routingNumber: '123456789',
   *       beneficiary: {
   *         beneficiaryType: 'INDIVIDUAL',
   *         fullName: 'John Doe',
   *         birthDate: '1990-01-15',
   *         nationality: 'US',
   *         address: {
   *           line1: '123 Main Street',
   *           city: 'San Francisco',
   *           state: 'CA',
   *           postalCode: '94105',
   *           country: 'US',
   *         },
   *       },
   *     },
   *     currency: 'USD',
   *   });
   * ```
   */
  add(
    body: ExternalAccountAddParams,
    options?: RequestOptions,
  ): APIPromise<ExternalAccountsAPI.ExternalAccount> {
    return this._client.post('/agents/me/external-accounts', { body, ...options });
  }
}

export interface ExternalAccountListParams extends DefaultPaginationParams {
  /**
   * Filter by currency code
   */
  currency?: string;

  /**
   * Maximum number of results to return (default 20, max 100)
   */
  limit?: number;
}

export interface ExternalAccountAddParams {
  /**
   * Lightning payment destination. Exactly one of `invoice`, `bolt12`, or
   * `lightningAddress` must be provided.
   */
  accountInfo:
    | Shared.AedExternalAccountCreateInfo
    | Shared.BrlExternalAccountCreateInfo
    | Shared.BwpExternalAccountCreateInfo
    | Shared.CadExternalAccountCreateInfo
    | Shared.DkkExternalAccountCreateInfo
    | Shared.EurExternalAccountCreateInfo
    | Shared.GbpExternalAccountCreateInfo
    | Shared.HkdExternalAccountCreateInfo
    | Shared.IdrExternalAccountCreateInfo
    | Shared.InrExternalAccountCreateInfo
    | Shared.KesExternalAccountCreateInfo
    | Shared.MwkExternalAccountCreateInfo
    | Shared.MxnExternalAccountCreateInfo
    | Shared.MyrExternalAccountCreateInfo
    | Shared.NgnExternalAccountCreateInfo
    | Shared.PhpExternalAccountCreateInfo
    | Shared.RwfExternalAccountCreateInfo
    | Shared.SgdExternalAccountCreateInfo
    | Shared.ThbExternalAccountCreateInfo
    | Shared.TzsExternalAccountCreateInfo
    | Shared.UgxExternalAccountCreateInfo
    | Shared.UsdExternalAccountCreateInfo
    | Shared.VndExternalAccountCreateInfo
    | Shared.XafExternalAccountCreateInfo
    | Shared.XofExternalAccountCreateInfo
    | Shared.ZarExternalAccountCreateInfo
    | Shared.ZmwExternalAccountCreateInfo
    | Shared.BdtExternalAccountCreateInfo
    | Shared.CopExternalAccountCreateInfo
    | Shared.EgpExternalAccountCreateInfo
    | Shared.GhsExternalAccountCreateInfo
    | Shared.GtqExternalAccountCreateInfo
    | Shared.HtgExternalAccountCreateInfo
    | Shared.JmdExternalAccountCreateInfo
    | Shared.PkrExternalAccountCreateInfo
    | ExternalAccountAddParams.SlvExternalAccountCreateInfo
    | ExternalAccountsAPI.SparkWalletInfo
    | ExternalAccountsAPI.LightningWalletInfo
    | ExternalAccountsAPI.SolanaWalletInfo
    | ExternalAccountsAPI.TronWalletInfo
    | ExternalAccountsAPI.PolygonWalletInfo
    | ExternalAccountsAPI.BaseWalletInfo
    | Shared.EthereumWalletExternalAccountInfo;

  /**
   * The ISO 4217 currency code
   */
  currency: string;

  /**
   * The ID of the customer for whom to create the external account. If not provided,
   * the external account will be created on behalf of the platform.
   */
  customerId?: string;

  /**
   * Whether to set the external account as the default UMA deposit account. When set
   * to true, incoming payments to this customer's UMA address will be automatically
   * deposited into this external account. False if not provided. Note that only one
   * external account can be set as the default UMA deposit account for a customer,
   * so if there is already a default UMA deposit account, this will override the
   * existing default UMA deposit account. If there is no default UMA deposit
   * account, incoming UMA payments will be deposited into the primary internal
   * account for the customer.
   */
  defaultUmaDepositAccount?: boolean;

  /**
   * Your platform's identifier for the account in your system. This can be used to
   * reference the account by your own identifier.
   */
  platformAccountId?: string;
}

export namespace ExternalAccountAddParams {
  export interface SlvExternalAccountCreateInfo {
    accountType: 'SLV_ACCOUNT';

    beneficiary: SlvExternalAccountCreateInfo.SlvBeneficiary | ExternalAccountsAPI.BusinessBeneficiary;

    /**
     * The account number of the bank (BANK_TRANSFER only)
     */
    accountNumber?: string;

    /**
     * The bank account type (BANK_TRANSFER only)
     */
    bankAccountType?: 'CHECKING' | 'SAVINGS';

    /**
     * The name of the bank (BANK_TRANSFER only)
     */
    bankName?: string;

    /**
     * The phone number in international format (MOBILE_MONEY only — e.g. Tigo Money)
     */
    phoneNumber?: string;
  }

  export namespace SlvExternalAccountCreateInfo {
    export interface SlvBeneficiary {
      beneficiaryType: 'INDIVIDUAL';

      /**
       * The full name of the beneficiary
       */
      fullName: string;

      address?: ExternalAccountsAPI.Address;

      /**
       * The birth date of the beneficiary
       */
      birthDate?: string;

      /**
       * The country of residence of the beneficiary
       */
      countryOfResidence?: string;

      /**
       * The email of the beneficiary
       */
      email?: string;

      /**
       * The nationality of the beneficiary
       */
      nationality?: string;

      /**
       * The phone number of the beneficiary
       */
      phoneNumber?: string;
    }
  }
}

export declare namespace ExternalAccounts {
  export {
    type ExternalAccountListParams as ExternalAccountListParams,
    type ExternalAccountAddParams as ExternalAccountAddParams,
  };
}

export { type ExternalAccountsDefaultPagination };
