// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as TransferInAPI from './transfer-in';
import * as InvitationsAPI from './invitations';
import * as QuotesAPI from './quotes';
import * as TransactionsAPI from './transactions';
import { APIPromise } from '../core/api-promise';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';

export class TransferIn extends APIResource {
  /**
   * Transfer funds from an external account to an internal account for a specific
   * customer. This endpoint should only be used for external account sources with
   * pull functionality (e.g. ACH Pull). Otherwise, use the paymentInstructions on
   * the internal account to deposit funds.
   *
   * @example
   * ```ts
   * const transferIn = await client.transferIn.create({
   *   destination: {
   *     accountId:
   *       'InternalAccount:a12dcbd6-dced-4ec4-b756-3c3a9ea3d123',
   *   },
   *   source: {
   *     accountId:
   *       'ExternalAccount:e85dcbd6-dced-4ec4-b756-3c3a9ea3d965',
   *   },
   *   amount: 12550,
   * });
   * ```
   */
  create(params: TransferInCreateParams, options?: RequestOptions): APIPromise<TransferInCreateResponse> {
    const { 'Idempotency-Key': idempotencyKey, ...body } = params;
    return this._client.post('/transfer-in', {
      body,
      ...options,
      headers: buildHeaders([
        { ...(idempotencyKey != null ? { 'Idempotency-Key': idempotencyKey } : undefined) },
        options?.headers,
      ]),
    });
  }
}

export interface BaseTransactionDestination {
  /**
   * Currency code for the destination
   */
  currency?: string;
}

export interface Transaction {
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
  destination: TransactionsAPI.TransactionDestinationOneOf;

  /**
   * Platform-specific ID of the customer (sender for outgoing, recipient for
   * incoming)
   */
  platformCustomerId: string;

  /**
   * Status of a payment transaction.
   *
   * | Status       | Description                                                                                        |
   * | ------------ | -------------------------------------------------------------------------------------------------- |
   * | `CREATED`    | Initial lookup has been created                                                                    |
   * | `PENDING`    | Quote has been created                                                                             |
   * | `PROCESSING` | Funding has been received and payment initiated                                                    |
   * | `SENT`       | Cross border settlement has been initiated                                                         |
   * | `COMPLETED`  | Cross border payment has been received, converted and payment has been sent to the offramp network |
   * | `REJECTED`   | Receiving institution or wallet rejected payment, payment has been refunded                        |
   * | `FAILED`     | An error occurred during payment                                                                   |
   * | `REFUNDED`   | Payment was unable to complete and refunded                                                        |
   * | `EXPIRED`    | Quote has expired                                                                                  |
   */
  status: TransactionsAPI.TransactionStatus;

  /**
   * Type of transaction (incoming payment or outgoing payment)
   */
  type: TransactionsAPI.TransactionType;

  /**
   * Additional information about the counterparty, if available and relevant to the
   * transaction and platform. Only applicable for transactions to/from UMA
   * addresses.
   */
  counterpartyInformation?: TransactionsAPI.CounterpartyInformation;

  /**
   * When the transaction was created
   */
  createdAt?: string;

  /**
   * Optional memo or description for the payment
   */
  description?: string;

  /**
   * When the payment was or will be settled
   */
  settledAt?: string;

  /**
   * When the transaction was last updated
   */
  updatedAt?: string;
}

export type TransferInCreateResponse =
  | TransactionsAPI.IncomingTransaction
  | TransferInCreateResponse.OutgoingTransaction;

export namespace TransferInCreateResponse {
  export interface OutgoingTransaction extends Omit<TransferInAPI.Transaction, 'type'> {
    /**
     * Amount sent in the sender's currency
     */
    sentAmount: InvitationsAPI.CurrencyAmount;

    /**
     * Source account details
     */
    source: TransactionsAPI.TransactionSourceOneOf;

    type: 'OUTGOING';

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
  }

  export namespace OutgoingTransaction {
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
}

export interface TransferInCreateParams {
  /**
   * Body param: Destination internal account details
   */
  destination: TransferInCreateParams.Destination;

  /**
   * Body param: Source external account details
   */
  source: TransferInCreateParams.Source;

  /**
   * Body param: Amount in the smallest unit of the currency (e.g., cents for
   * USD/EUR, satoshis for BTC)
   */
  amount?: number;

  /**
   * Header param: A unique identifier for the request. If the same key is sent
   * multiple times, the server will return the same response as the first request.
   */
  'Idempotency-Key'?: string;
}

export namespace TransferInCreateParams {
  /**
   * Destination internal account details
   */
  export interface Destination {
    /**
     * Reference to an internal account ID
     */
    accountId: string;
  }

  /**
   * Source external account details
   */
  export interface Source {
    /**
     * Reference to an external account ID
     */
    accountId: string;
  }
}

export declare namespace TransferIn {
  export {
    type BaseTransactionDestination as BaseTransactionDestination,
    type Transaction as Transaction,
    type TransferInCreateResponse as TransferInCreateResponse,
    type TransferInCreateParams as TransferInCreateParams,
  };
}
