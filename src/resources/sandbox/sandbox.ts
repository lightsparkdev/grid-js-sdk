// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as InvitationsAPI from '../invitations';
import * as QuotesAPI from '../quotes';
import * as TransactionsAPI from '../transactions';
import * as TransferInAPI from '../transfer-in';
import * as ExternalAccountsAPI from '../customers/external-accounts';
import * as InternalAccountsAPI from './internal-accounts';
import { InternalAccount, InternalAccountFundParams, InternalAccounts } from './internal-accounts';
import * as UmaAPI from './uma';
import { Uma, UmaReceivePaymentParams } from './uma';
import * as WebhooksAPI from './webhooks';
import { WebhookSendTestResponse, Webhooks } from './webhooks';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';

/**
 * Endpoints to trigger test cases in sandbox
 */
export class Sandbox extends APIResource {
  uma: UmaAPI.Uma = new UmaAPI.Uma(this._client);
  internalAccounts: InternalAccountsAPI.InternalAccounts = new InternalAccountsAPI.InternalAccounts(
    this._client,
  );
  webhooks: WebhooksAPI.Webhooks = new WebhooksAPI.Webhooks(this._client);

  /**
   * Simulate sending funds to the bank account as instructed in the quote. This
   * endpoint is only for the sandbox environment and will fail for production
   * platforms/keys.
   *
   * @example
   * ```ts
   * const outgoingTransaction = await client.sandbox.sendFunds({
   *   currencyCode: 'USD',
   *   quoteId: 'Quote:019542f5-b3e7-1d02-0000-000000000006',
   * });
   * ```
   */
  sendFunds(body: SandboxSendFundsParams, options?: RequestOptions): APIPromise<OutgoingTransaction> {
    return this._client.post('/sandbox/send', { body, ...options });
  }
}

export interface OutgoingTransaction {
  /**
   * Unique identifier for the transaction
   */
  id: string;

  /**
   * System ID of the customer (sender for outgoing, recipient for incoming)
   */
  customerId: string;

  /**
   * Destination account details
   */
  destination:
    | OutgoingTransaction.AccountTransactionDestination
    | OutgoingTransaction.UmaAddressTransactionDestination
    | OutgoingTransaction.ExternalAccountDetailsTransactionDestination;

  /**
   * Platform-specific ID of the customer (sender for outgoing, recipient for
   * incoming)
   */
  platformCustomerId: string;

  /**
   * Amount sent in the sender's currency
   */
  sentAmount: InvitationsAPI.CurrencyAmount;

  /**
   * Source account details
   */
  source: TransactionsAPI.TransactionSourceOneOf;

  /**
   * Status of an outgoing payment transaction.
   *
   * | Status       | Description                                             |
   * | ------------ | ------------------------------------------------------- |
   * | `PENDING`    | Quote is pending confirmation                           |
   * | `EXPIRED`    | Quote wasn't executed before expiry window              |
   * | `PROCESSING` | Executing the quote after receiving funds               |
   * | `COMPLETED`  | Payout successfully reached the destination             |
   * | `FAILED`     | Something went wrong — accompanied by a `failureReason` |
   */
  status:
    | 'PENDING'
    | 'EXPIRED'
    | 'PROCESSING'
    | 'COMPLETED'
    | 'FAILED'
    | 'CREATED'
    | 'SENT'
    | 'REJECTED'
    | 'REFUNDED';

  type: 'OUTGOING' | 'INCOMING';

  /**
   * Additional information about the counterparty, if available and relevant to the
   * transaction and platform. Only applicable for transactions to/from UMA
   * addresses.
   */
  counterpartyInformation?: { [key: string]: unknown };

  /**
   * When the transaction was created
   */
  createdAt?: string;

  /**
   * Optional memo or description for the payment
   */
  description?: string;

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
   * Payment instructions for executing the payment.
   */
  paymentInstructions?: Array<QuotesAPI.PaymentInstructions>;

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
  refund?: OutgoingTransaction.Refund;

  /**
   * When the payment was or will be settled
   */
  settledAt?: string;

  /**
   * When the transaction was last updated
   */
  updatedAt?: string;
}

export namespace OutgoingTransaction {
  /**
   * Destination account details
   */
  export interface AccountTransactionDestination extends TransferInAPI.BaseTransactionDestination {
    /**
     * Destination account identifier
     */
    accountId: string;

    destinationType: 'ACCOUNT';
  }

  /**
   * UMA address destination details
   */
  export interface UmaAddressTransactionDestination extends TransferInAPI.BaseTransactionDestination {
    destinationType: 'UMA_ADDRESS';

    /**
     * UMA address of the recipient
     */
    umaAddress: string;
  }

  /**
   * Transaction destination where external account details were provided inline at
   * quote creation rather than using a pre-registered external account.
   */
  export interface ExternalAccountDetailsTransactionDestination
    extends TransferInAPI.BaseTransactionDestination {
    destinationType: 'EXTERNAL_ACCOUNT_DETAILS';

    externalAccountDetails: ExternalAccountsAPI.ExternalAccountCreate;
  }

  /**
   * The refund if transaction was refunded.
   */
  export interface Refund {
    /**
     * When the refund was initiated
     */
    initiatedAt: string;

    /**
     * The unique reference ID of the refund
     */
    reference: string;

    /**
     * Current status of the refund
     */
    status: 'PENDING' | 'COMPLETED' | 'FAILED';

    /**
     * Reason for the refund
     */
    reason?: 'TRANSACTION_FAILED' | 'USER_CANCELLATION';

    /**
     * When the refund was settled
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
Sandbox.Webhooks = Webhooks;

export declare namespace Sandbox {
  export {
    type OutgoingTransaction as OutgoingTransaction,
    type SandboxSendFundsParams as SandboxSendFundsParams,
  };

  export { Uma as Uma, type UmaReceivePaymentParams as UmaReceivePaymentParams };

  export {
    InternalAccounts as InternalAccounts,
    type InternalAccount as InternalAccount,
    type InternalAccountFundParams as InternalAccountFundParams,
  };

  export { Webhooks as Webhooks, type WebhookSendTestResponse as WebhookSendTestResponse };
}
