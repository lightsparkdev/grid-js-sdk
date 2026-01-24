// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as InvitationsAPI from '../invitations';
import * as QuotesAPI from '../quotes';
import * as TransactionsAPI from '../transactions';
import * as TransferInAPI from '../transfer-in';
import * as InternalAccountsAPI from './internal-accounts';
import { InternalAccount, InternalAccountFundParams, InternalAccounts } from './internal-accounts';
import * as UmaAPI from './uma';
import { Uma, UmaReceivePaymentParams } from './uma';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';

export class Sandbox extends APIResource {
  uma: UmaAPI.Uma = new UmaAPI.Uma(this._client);
  internalAccounts: InternalAccountsAPI.InternalAccounts = new InternalAccountsAPI.InternalAccounts(
    this._client,
  );

  /**
   * Simulate sending funds to the bank account as instructed in the quote. This
   * endpoint is only for the sandbox environment and will fail for production
   * platforms/keys.
   *
   * @example
   * ```ts
   * const response = await client.sandbox.sendFunds({
   *   currencyCode: 'USD',
   *   quoteId: 'Quote:019542f5-b3e7-1d02-0000-000000000006',
   * });
   * ```
   */
  sendFunds(body: SandboxSendFundsParams, options?: RequestOptions): APIPromise<SandboxSendFundsResponse> {
    return this._client.post('/sandbox/send', { body, ...options });
  }
}

export interface SandboxSendFundsResponse extends TransferInAPI.Transaction {
  /**
   * Payment instructions for executing the payment.
   */
  paymentInstructions: Array<QuotesAPI.PaymentInstructions>;

  /**
   * Amount sent in the sender's currency
   */
  sentAmount: InvitationsAPI.CurrencyAmount;

  /**
   * Source account details
   */
  source: TransactionsAPI.AccountSource | TransactionsAPI.UmaAddressSource;

  /**
   * Number of sending currency units per receiving currency unit.
   */
  exchangeRate?: number;

  /**
   * If the transaction failed, this field provides the reason for failure.
   */
  failureReason?:
    | 'QUOTE_EXPIRED'
    | 'QUOTE_EXECUTION_FAILED'
    | 'LIGHTNING_PAYMENT_FAILED'
    | 'FUNDING_AMOUNT_MISMATCH'
    | 'COUNTERPARTY_POST_TX_FAILED'
    | 'TIMEOUT';

  /**
   * The fees associated with the quote in the smallest unit of the sending currency
   * (eg. cents).
   */
  fees?: number;

  /**
   * ID of the original transaction that this transaction is retrying, if applicable
   */
  originalTransactionId?: string;

  /**
   * The ID of the quote that was used to trigger this payment
   */
  quoteId?: string;

  /**
   * Details about the rate and fees for the transaction.
   */
  rateDetails?: QuotesAPI.OutgoingRateDetails;

  /**
   * Amount to be received by recipient in the recipient's currency
   */
  receivedAmount?: InvitationsAPI.CurrencyAmount;

  /**
   * The refund if transaction was refunded.
   */
  refund?: SandboxSendFundsResponse.Refund;
}

export namespace SandboxSendFundsResponse {
  /**
   * The refund if transaction was refunded.
   */
  export interface Refund {
    /**
     * When the refund was initiated
     */
    initiatedAt: string;

    /**
     * The unique reference code of the refund
     */
    reference: string;

    /**
     * When the refund was or will be settled
     */
    settledAt?: string;
  }
}

export interface SandboxSendFundsParams {
  /**
   * Currency code for the funds to be sent
   */
  currencyCode: string;

  /**
   * The unique identifier of the quote
   */
  quoteId: string;

  /**
   * The amount to send in the smallest unit of the currency (eg. cents). If not
   * provided, the amount will be derived from the quote.
   */
  currencyAmount?: number;
}

Sandbox.Uma = Uma;
Sandbox.InternalAccounts = InternalAccounts;

export declare namespace Sandbox {
  export {
    type SandboxSendFundsResponse as SandboxSendFundsResponse,
    type SandboxSendFundsParams as SandboxSendFundsParams,
  };

  export { Uma as Uma, type UmaReceivePaymentParams as UmaReceivePaymentParams };

  export {
    InternalAccounts as InternalAccounts,
    type InternalAccount as InternalAccount,
    type InternalAccountFundParams as InternalAccountFundParams,
  };
}
