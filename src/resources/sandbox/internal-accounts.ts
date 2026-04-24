// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as InvitationsAPI from '../invitations';
import * as QuotesAPI from '../quotes';
import { APIPromise } from '../../core/api-promise';
import { DefaultPagination } from '../../core/pagination';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

/**
 * Endpoints to trigger test cases in sandbox
 */
export class InternalAccounts extends APIResource {
  /**
   * Simulate receiving funds into an internal account in the sandbox environment.
   * This is useful for testing scenarios where you need to add funds to a customer's
   * or platform's internal account without going through a real bank transfer or
   * following payment instructions. This endpoint is only for the sandbox
   * environment and will fail for production platforms/keys.
   *
   * @example
   * ```ts
   * const internalAccount =
   *   await client.sandbox.internalAccounts.fund(
   *     'InternalAccount:a12dcbd6-dced-4ec4-b756-3c3a9ea3d123',
   *     { amount: 100000 },
   *   );
   * ```
   */
  fund(
    accountID: string,
    body: InternalAccountFundParams,
    options?: RequestOptions,
  ): APIPromise<InternalAccount> {
    return this._client.post(path`/sandbox/internal-accounts/${accountID}/fund`, { body, ...options });
  }
}

export type InternalAccountsDefaultPagination = DefaultPagination<InternalAccount>;

export interface InternalAccount {
  /**
   * The ID of the internal account
   */
  id: string;

  balance: InvitationsAPI.CurrencyAmount;

  /**
   * Timestamp when the internal account was created
   */
  createdAt: string;

  /**
   * Payment instructions for funding the account
   */
  fundingPaymentInstructions: Array<QuotesAPI.PaymentInstructions>;

  /**
   * Classification of an internal account.
   *
   * - `INTERNAL_FIAT`: A Grid-managed fiat holding account (for example, the USD
   *   holding account used as the source for Payouts flows).
   * - `INTERNAL_CRYPTO`: A Grid-managed crypto holding account denominated in a
   *   stablecoin such as USDC.
   * - `EMBEDDED_WALLET`: A self-custodial Embedded Wallet provisioned for the
   *   customer. Outbound transfers require a session signature produced by the
   *   customer's device — see the Embedded Wallets guide.
   */
  type: 'INTERNAL_FIAT' | 'INTERNAL_CRYPTO' | 'EMBEDDED_WALLET';

  /**
   * Timestamp when the internal account was last updated
   */
  updatedAt: string;

  /**
   * The ID of the customer associated with the internal account. If this field is
   * empty, the internal account belongs to the platform.
   */
  customerId?: string;
}

export interface InternalAccountFundParams {
  /**
   * Amount to add in the smallest unit of the account's currency (e.g., cents for
   * USD/EUR, satoshis for BTC)
   */
  amount: number;
}

export declare namespace InternalAccounts {
  export {
    type InternalAccount as InternalAccount,
    type InternalAccountFundParams as InternalAccountFundParams,
  };
}
