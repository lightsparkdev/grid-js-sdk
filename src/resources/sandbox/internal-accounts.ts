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
    return this._client.post(path`/sandbox/internal-accounts/${accountID}/fund`, {
      body,
      ...options,
      __security: { basicAuth: true },
    });
  }
}

export type InternalAccountsDefaultPagination = DefaultPagination<InternalAccount>;

export interface FundRequest {
  /**
   * Amount to add in the smallest unit of the account's currency (e.g., cents for
   * USD/EUR, satoshis for BTC)
   */
  amount: number;
}

export interface InternalAccount {
  /**
   * The ID of the internal account
   */
  id: string;

  /**
   * The balance available to spend, excluding pending and held funds
   */
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
   * Status of a Grid internal account. The status determines whether the account can
   * send or receive payments.
   *
   * - `PENDING`: The account is under review and is being provisioned. The account
   *   cannot send or receive payments until provisioning completes.
   * - `ACTIVE`: The account is ready to send and receive payments.
   * - `CLOSED`: The account cannot send or receive payments. A customer can initiate
   *   the closing of an internal account, after which the account transitions to
   *   this status.
   * - `FROZEN`: The account cannot send or receive payments. Grid may freeze an
   *   account in response to compliance or fraud signals; payments are blocked while
   *   the account remains frozen.
   * - `FAILED`: The account could not be provisioned. Grid was unable to create the
   *   underlying account, so it cannot send or receive payments and requires
   *   remediation.
   */
  status: 'PENDING' | 'ACTIVE' | 'CLOSED' | 'FROZEN' | 'FAILED';

  /**
   * The total balance, including pending and held funds
   */
  totalBalance: InvitationsAPI.CurrencyAmount;

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
   * - `RULE_BASED`: An additional account number for an existing account holder,
   *   with a routing rule attached, so incoming payments can be attributed to a
   *   specific payer and swept automatically. Created with
   *   `POST /internal-accounts`.
   */
  type: 'INTERNAL_FIAT' | 'INTERNAL_CRYPTO' | 'EMBEDDED_WALLET' | 'RULE_BASED';

  /**
   * Timestamp when the internal account was last updated
   */
  updatedAt: string;

  /**
   * The ID of the customer associated with the internal account. If this field is
   * empty, the internal account belongs to the platform.
   */
  customerId?: string;

  /**
   * The platform-supplied label recorded when the account was created. Null for
   * accounts that carry none.
   */
  label?: string;

  /**
   * Whether wallet privacy is enabled for the Embedded Wallet. Only present for
   * `EMBEDDED_WALLET` internal accounts.
   */
  privateEnabled?: boolean;

  /**
   * The routing rule attached to this account. Null for accounts that carry no rule,
   * which is every account other than a `RULE_BASED` one.
   */
  sweepRule?: InternalAccount.SweepRule;
}

export namespace InternalAccount {
  /**
   * The routing rule attached to this account. Null for accounts that carry no rule,
   * which is every account other than a `RULE_BASED` one.
   */
  export interface SweepRule {
    /**
     * Where funds that settle into this account are swept.
     */
    destination: SweepRule.Destination;

    /**
     * Free-form description recorded on each sweep. Not delivered to the recipient.
     */
    description?: string;

    /**
     * **In this rule-based account's currency, not the destination's.** The largest
     * balance the corridor to the destination can carry; a settled balance above it is
     * not swept. Null means no ceiling.
     */
    maximumAmount?: InvitationsAPI.CurrencyAmount;

    /**
     * **In this rule-based account's currency, not the destination's.** The smallest
     * balance the corridor to the destination can carry; a settled balance below it is
     * not swept. Zero means no floor, which is the case for a same-currency internal
     * destination — a book transfer with no rail, fee or conversion to justify one.
     * Configuration rather than a moving estimate, so there is nothing to re-poll.
     */
    minimumAmount?: InvitationsAPI.CurrencyAmount;

    /**
     * Fee terms applied to every sweep this rule drives. Null when the platform's
     * configured fees apply.
     */
    platformFeeOverride?: SweepRule.PlatformFeeOverride;

    /**
     * The purpose of payment applied to each sweep.
     */
    purposeOfPayment?:
      | 'GIFT'
      | 'SELF'
      | 'GOODS_OR_SERVICES'
      | 'EDUCATION'
      | 'HEALTH_OR_MEDICAL'
      | 'REAL_ESTATE_PURCHASE'
      | 'TAX_PAYMENT'
      | 'LOAN_PAYMENT'
      | 'UTILITY_BILL'
      | 'DONATION'
      | 'TRAVEL'
      | 'FAMILY_SUPPORT'
      | 'SALARY_PAYMENT'
      | 'OTHER';

    /**
     * Free-form information that travels with each sweep to the recipient.
     */
    remittanceInformation?: string;
  }

  export namespace SweepRule {
    /**
     * Where funds that settle into this account are swept.
     */
    export interface Destination {
      /**
       * The account that receives the swept funds.
       */
      accountId: string;

      /**
       * The rail each sweep is sent over. Null when a rail is selected automatically per
       * sweep, in which case none is resolved ahead of time.
       */
      paymentRail?:
        | 'ACH'
        | 'ACH_COLOMBIA'
        | 'BANK_TRANSFER'
        | 'BRE_B'
        | 'CIPS'
        | 'FAST'
        | 'FASTER_PAYMENTS'
        | 'FEDNOW'
        | 'INSTAPAY'
        | 'MOBILE_MONEY'
        | 'NEFT'
        | 'PAYNOW'
        | 'PESONET'
        | 'PIX'
        | 'RTGS'
        | 'RTP'
        | 'SEPA'
        | 'SEPA_INSTANT'
        | 'SPEI'
        | 'SWIFT'
        | 'UNIONPAY'
        | 'UPI'
        | 'WIRE';
    }

    /**
     * Fee terms applied to every sweep this rule drives. Null when the platform's
     * configured fees apply.
     */
    export interface PlatformFeeOverride {
      /**
       * Fixed fee charged for this transaction. Must be denominated in the quote's
       * source currency (USD today).
       */
      platformFixedFee: PlatformFeeOverride.PlatformFixedFee;

      /**
       * Variable fee in basis points (1 bps = 0.01%) to apply to the transaction's
       * source-currency amount.
       */
      platformVariableFeeBps: number;
    }

    export namespace PlatformFeeOverride {
      /**
       * Fixed fee charged for this transaction. Must be denominated in the quote's
       * source currency (USD today).
       */
      export interface PlatformFixedFee {
        /**
         * Fee amount in the smallest unit of the fixed fee's `currency` (e.g., cents for
         * USD).
         */
        amount: number;

        /**
         * Three-letter currency code (ISO 4217) the fixed fee is denominated in. Some
         * cryptocurrencies may use their own ticker symbols (e.g. "BTC" for Bitcoin,
         * "USDC" for USDC, etc.)
         */
        currency: string;
      }
    }
  }
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
    type FundRequest as FundRequest,
    type InternalAccount as InternalAccount,
    type InternalAccountFundParams as InternalAccountFundParams,
  };
}
