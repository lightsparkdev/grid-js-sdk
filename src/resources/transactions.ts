// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as TransactionsAPI from './transactions';
import * as InvitationsAPI from './invitations';
import * as QuotesAPI from './quotes';
import * as TransferInAPI from './transfer-in';
import { APIPromise } from '../core/api-promise';
import { DefaultPagination, type DefaultPaginationParams, PagePromise } from '../core/pagination';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Transactions extends APIResource {
  /**
   * Retrieve detailed information about a specific transaction.
   *
   * @example
   * ```ts
   * const transaction = await client.transactions.retrieve(
   *   'transactionId',
   * );
   * ```
   */
  retrieve(transactionID: string, options?: RequestOptions): APIPromise<TransactionRetrieveResponse> {
    return this._client.get(path`/transactions/${transactionID}`, options);
  }

  /**
   * Retrieve a paginated list of transactions with optional filtering. The
   * transactions can be filtered by customer ID, platform customer ID, UMA address,
   * date range, status, and transaction type.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const transactionListResponse of client.transactions.list()) {
   *   // ...
   * }
   * ```
   */
  list(
    query: TransactionListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<TransactionListResponsesDefaultPagination, TransactionListResponse> {
    return this._client.getAPIList('/transactions', DefaultPagination<TransactionListResponse>, {
      query,
      ...options,
    });
  }

  /**
   * Approve a pending incoming payment that was previously acknowledged with a 202
   * response. This endpoint allows platforms to asynchronously approve payments
   * after async processing.
   *
   * @example
   * ```ts
   * const incomingTransaction =
   *   await client.transactions.approve('transactionId');
   * ```
   */
  approve(
    transactionID: string,
    body: TransactionApproveParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<IncomingTransaction> {
    return this._client.post(path`/transactions/${transactionID}/approve`, { body, ...options });
  }

  /**
   * Reject a pending incoming payment that was previously acknowledged with a 202
   * response. This endpoint allows platforms to asynchronously reject payments after
   * additional processing.
   *
   * @example
   * ```ts
   * const incomingTransaction =
   *   await client.transactions.reject('transactionId');
   * ```
   */
  reject(
    transactionID: string,
    body: TransactionRejectParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<IncomingTransaction> {
    return this._client.post(path`/transactions/${transactionID}/reject`, { body, ...options });
  }
}

export type TransactionListResponsesDefaultPagination = DefaultPagination<TransactionListResponse>;

export interface BaseTransactionSource {
  /**
   * Currency code for the source
   */
  currency?: string;
}

export interface IncomingTransaction extends Omit<TransferInAPI.Transaction, 'type'> {
  /**
   * Amount received in the recipient's currency
   */
  receivedAmount: InvitationsAPI.CurrencyAmount;

  type: 'INCOMING';

  /**
   * If the transaction failed, this field provides the reason for failure.
   */
  failureReason?:
    | 'LNURLP_FAILED'
    | 'PAY_REQUEST_FAILED'
    | 'PAYMENT_APPROVAL_WEBHOOK_ERROR'
    | 'PAYMENT_APPROVAL_TIMED_OUT'
    | 'OFFRAMP_FAILED'
    | 'MISSING_MANDATORY_PAYEE_DATA'
    | 'QUOTE_EXPIRED'
    | 'QUOTE_EXECUTION_FAILED';

  /**
   * Details about the rate and fees for the transaction.
   */
  rateDetails?: IncomingTransaction.RateDetails;

  /**
   * Included for all transactions except those with "CREATED" status
   */
  reconciliationInstructions?: IncomingTransaction.ReconciliationInstructions;

  /**
   * Source account details
   */
  source?: TransactionSourceOneOf;
}

export namespace IncomingTransaction {
  /**
   * Details about the rate and fees for the transaction.
   */
  export interface RateDetails {
    /**
     * The fixed fee charged by the Grid product to execute the quote in the smallest
     * unit of the receiving currency (eg. cents).
     */
    gridApiFixedFee: number;

    /**
     * The underlying multiplier from the mSATS to the receiving currency, including
     * variable fees.
     */
    gridApiMultiplier: number;

    /**
     * The variable fee amount charged by the Grid product to execute the quote in the
     * smallest unit of the receiving currency (eg. cents). This is the receiving
     * amount times gridApiVariableFeeRate.
     */
    gridApiVariableFeeAmount: number;

    /**
     * The variable fee rate charged by the Grid product to execute the quote as a
     * percentage of the receiving currency amount.
     */
    gridApiVariableFeeRate: number;
  }

  /**
   * Included for all transactions except those with "CREATED" status
   */
  export interface ReconciliationInstructions {
    /**
     * Unique reference code that must be included with the payment to match it with
     * the correct incoming transaction
     */
    reference: string;
  }
}

/**
 * Source account details
 */
export type TransactionSourceOneOf =
  | TransactionSourceOneOf.AccountTransactionSource
  | TransactionSourceOneOf.UmaAddressTransactionSource
  | TransactionSourceOneOf.RealtimeFundingTransactionSource;

export namespace TransactionSourceOneOf {
  /**
   * Source account details
   */
  export interface AccountTransactionSource extends TransactionsAPI.BaseTransactionSource {
    /**
     * Source account identifier
     */
    accountId: string;

    sourceType: 'ACCOUNT';
  }

  /**
   * UMA address source details
   */
  export interface UmaAddressTransactionSource extends TransactionsAPI.BaseTransactionSource {
    sourceType: 'UMA_ADDRESS';

    /**
     * UMA address of the sender
     */
    umaAddress: string;
  }

  /**
   * Transaction was funded using a real-time funding source (RTP, SEPA Instant,
   * Spark, Stables, etc.).
   */
  export interface RealtimeFundingTransactionSource extends TransactionsAPI.BaseTransactionSource {
    /**
     * Currency code for the funding source
     */
    currency: string;

    sourceType: 'REALTIME_FUNDING';

    /**
     * The customer on whose behalf the transaction was initiated.
     */
    customerId?: string;
  }
}

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
export type TransactionStatus =
  | 'CREATED'
  | 'PENDING'
  | 'PROCESSING'
  | 'SENT'
  | 'COMPLETED'
  | 'REJECTED'
  | 'FAILED'
  | 'REFUNDED'
  | 'EXPIRED';

/**
 * Type of transaction (incoming payment or outgoing payment)
 */
export type TransactionType = 'INCOMING' | 'OUTGOING';

export type TransactionRetrieveResponse =
  | IncomingTransaction
  | TransactionRetrieveResponse.OutgoingTransaction;

export namespace TransactionRetrieveResponse {
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

export type TransactionListResponse = IncomingTransaction | TransactionListResponse.OutgoingTransaction;

export namespace TransactionListResponse {
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

export interface TransactionListParams extends DefaultPaginationParams {
  /**
   * Filter by system customer ID
   */
  customerId?: string;

  /**
   * Filter by end date (inclusive) in ISO 8601 format
   */
  endDate?: string;

  /**
   * Maximum number of results to return (default 20, max 100)
   */
  limit?: number;

  /**
   * Filter by platform-specific customer ID
   */
  platformCustomerId?: string;

  /**
   * Filter by receiver account identifier
   */
  receiverAccountIdentifier?: string;

  /**
   * Filter by reference
   */
  reference?: string;

  /**
   * Filter by sender account identifier
   */
  senderAccountIdentifier?: string;

  /**
   * Order to sort results in
   */
  sortOrder?: 'asc' | 'desc';

  /**
   * Filter by start date (inclusive) in ISO 8601 format
   */
  startDate?: string;

  /**
   * Filter by transaction status
   */
  status?: TransactionStatus;

  /**
   * Filter by transaction type
   */
  type?: TransactionType;
}

export interface TransactionApproveParams {
  /**
   * Information about the recipient, provided by the platform if requested in the
   * original webhook via `requestedReceiverCustomerInfoFields`.
   */
  receiverCustomerInfo?: { [key: string]: unknown };
}

export interface TransactionRejectParams {
  /**
   * Optional reason for rejecting the payment. This is just for debugging purposes
   * or can be used for a platform's own purposes.
   */
  reason?: string;
}

export declare namespace Transactions {
  export {
    type BaseTransactionSource as BaseTransactionSource,
    type IncomingTransaction as IncomingTransaction,
    type TransactionSourceOneOf as TransactionSourceOneOf,
    type TransactionStatus as TransactionStatus,
    type TransactionType as TransactionType,
    type TransactionRetrieveResponse as TransactionRetrieveResponse,
    type TransactionListResponse as TransactionListResponse,
    type TransactionListResponsesDefaultPagination as TransactionListResponsesDefaultPagination,
    type TransactionListParams as TransactionListParams,
    type TransactionApproveParams as TransactionApproveParams,
    type TransactionRejectParams as TransactionRejectParams,
  };
}
