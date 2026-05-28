// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as InvitationsAPI from './invitations';
import * as QuotesAPI from './quotes';
import * as TransferInAPI from './transfer-in';
import { TransactionsDefaultPagination } from './transfer-in';
import * as ExternalAccountsAPI from './customers/external-accounts';
import * as SimulateAPI from './sandbox/cards/simulate';
import { APIPromise } from '../core/api-promise';
import { DefaultPagination, type DefaultPaginationParams, PagePromise } from '../core/pagination';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

/**
 * Endpoints for retrieving transaction information
 */
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
  retrieve(transactionID: string, options?: RequestOptions): APIPromise<TransferInAPI.Transaction> {
    return this._client.get(path`/transactions/${transactionID}`, {
      ...options,
      __security: { basicAuth: true },
    });
  }

  /**
   * Retrieve a paginated list of transactions with optional filtering. The
   * transactions can be filtered by customer ID, platform customer ID, UMA address,
   * date range, status, and transaction type.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const transaction of client.transactions.list()) {
   *   // ...
   * }
   * ```
   */
  list(
    query: TransactionListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<TransactionsDefaultPagination, TransferInAPI.Transaction> {
    return this._client.getAPIList('/transactions', DefaultPagination<TransferInAPI.Transaction>, {
      query,
      ...options,
      __security: { basicAuth: true },
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
    return this._client.post(path`/transactions/${transactionID}/approve`, {
      body,
      ...options,
      __security: { basicAuth: true },
    });
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
    return this._client.post(path`/transactions/${transactionID}/reject`, {
      body,
      ...options,
      __security: { basicAuth: true },
    });
  }
}

export interface BaseTransactionSource {
  sourceType: unknown;

  /**
   * Currency code for the source
   */
  currency?: string;
}

/**
 * Details about the rate and fees for an incoming transaction. Note:
 * `gridApiFixedFee` is denominated in the receiving currency, so its equivalent
 * value in the sending currency fluctuates with the FX rate. As a result, the
 * total fee on a subsequent quote for the same transfer may differ even if the
 * underlying fee structure is unchanged.
 */
export interface IncomingRateDetails {
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

export interface IncomingTransaction {
  /**
   * Unique identifier for the transaction
   */
  id: string;

  /**
   * System ID of the customer (sender for outgoing, recipient for incoming)
   */
  customerId: string;

  destination: TransactionDestinationOneOf;

  /**
   * Platform-specific ID of the customer (sender for outgoing, recipient for
   * incoming)
   */
  platformCustomerId: string;

  /**
   * Amount received in the recipient's currency
   */
  receivedAmount: InvitationsAPI.CurrencyAmount;

  /**
   * Status of a payment transaction.
   *
   * | Status       | Description                                                                                        |
   * | ------------ | -------------------------------------------------------------------------------------------------- |
   * | `CREATED`    | Initial lookup has been created                                                                    |
   * | `PENDING`    | Quote has been created                                                                             |
   * | `PROCESSING` | Funding has been received and payment initiated                                                    |
   * | `COMPLETED`  | Cross border payment has been received, converted and payment has been sent to the offramp network |
   * | `REJECTED`   | Receiving institution or wallet rejected payment, payment has been refunded                        |
   * | `FAILED`     | An error occurred during payment                                                                   |
   * | `REFUNDED`   | Payment was unable to complete and refunded                                                        |
   * | `EXPIRED`    | Quote has expired                                                                                  |
   */
  status: TransactionStatus;

  /**
   * Type of transaction (incoming payment or outgoing payment)
   */
  type: 'INCOMING';

  /**
   * If this transaction was initiated by an agent, the system-generated ID of that
   * agent. Absent for platform-initiated transactions.
   */
  agentId?: string;

  /**
   * Additional information about the counterparty, if available and relevant to the
   * transaction and platform.
   */
  counterpartyInformation?: ExternalAccountsAPI.CounterpartyInformation;

  /**
   * When the transaction was created
   */
  createdAt?: string;

  /**
   * Optional memo or description for the payment
   */
  description?: string;

  /**
   * If the transaction failed, this field provides the reason for failure.
   */
  failureReason?: IncomingTransactionFailureReason;

  /**
   * The total fees available from the receive quote in the smallest unit of the
   * receiving currency (eg. cents).
   */
  fees?: number;

  /**
   * Details about the rate and fees for the transaction.
   */
  rateDetails?: IncomingRateDetails;

  /**
   * Included for all transactions except those with "CREATED" status
   */
  reconciliationInstructions?: ReconciliationInstructions;

  /**
   * When the payment was or will be settled
   */
  settledAt?: string;

  source?: TransactionSourceOneOf;

  /**
   * When the transaction was last updated
   */
  updatedAt?: string;
}

/**
 * Reason for failure of an incoming transaction. This is used to provide more
 * context on why a transaction failed. If the transaction is not in a failed
 * state, this field is omitted.
 */
export type IncomingTransactionFailureReason =
  | 'LNURLP_FAILED'
  | 'PAY_REQUEST_FAILED'
  | 'PAYMENT_APPROVAL_WEBHOOK_ERROR'
  | 'PAYMENT_APPROVAL_TIMED_OUT'
  | 'OFFRAMP_FAILED'
  | 'MISSING_MANDATORY_PAYEE_DATA'
  | 'QUOTE_EXPIRED'
  | 'QUOTE_EXECUTION_FAILED';

export interface OutgoingTransaction {
  /**
   * Unique identifier for the transaction
   */
  id: string;

  /**
   * System ID of the customer (sender for outgoing, recipient for incoming)
   */
  customerId: string;

  destination: TransactionDestinationOneOf;

  /**
   * Platform-specific ID of the customer (sender for outgoing, recipient for
   * incoming)
   */
  platformCustomerId: string;

  /**
   * Amount sent in the sender's currency
   */
  sentAmount: InvitationsAPI.CurrencyAmount;

  source: TransactionSourceOneOf;

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
  status: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED' | 'EXPIRED';

  /**
   * Type of transaction (incoming payment or outgoing payment)
   */
  type: 'OUTGOING';

  /**
   * If this transaction was initiated by an agent, the system-generated ID of that
   * agent. Absent for platform-initiated transactions.
   */
  agentId?: string;

  /**
   * Additional information about the counterparty, if available and relevant to the
   * transaction and platform.
   */
  counterpartyInformation?: ExternalAccountsAPI.CounterpartyInformation;

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
  failureReason?: OutgoingTransactionFailureReason;

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
   * Reconciliation details for this transaction, including crypto transaction hash
   * when available.
   */
  reconciliationInstructions?: ReconciliationInstructions;

  /**
   * The refund if transaction was refunded.
   */
  refund?: SimulateAPI.Refund;

  /**
   * When the payment was or will be settled
   */
  settledAt?: string;

  /**
   * When the transaction was last updated
   */
  updatedAt?: string;
}

/**
 * Reason for failure of an outgoing transaction. This is used to provide more
 * context on why a transaction failed. If the transaction is not in a failed
 * state, this field is omitted.
 */
export type OutgoingTransactionFailureReason =
  | 'QUOTE_EXPIRED'
  | 'QUOTE_EXECUTION_FAILED'
  | 'LIGHTNING_PAYMENT_FAILED'
  | 'FUNDING_AMOUNT_MISMATCH'
  | 'COUNTERPARTY_POST_TX_FAILED';

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
export type OutgoingTransactionStatus = 'PENDING' | 'EXPIRED' | 'PROCESSING' | 'COMPLETED' | 'FAILED';

export interface ReconciliationInstructions {
  /**
   * Unique reference code to include with the payment to match it with the correct
   * incoming transaction, when available.
   */
  reference?: string;

  /**
   * Transaction hash for the crypto transfer that delivered funds to the transaction
   * destination, when available.
   */
  transactionHash?: string;
}

export type TransactionDestinationOneOf = unknown;

/**
 * Type of transaction destination
 */
export type TransactionDestinationType = 'ACCOUNT' | 'UMA_ADDRESS';

export interface TransactionListResponse {
  /**
   * List of transactions matching the criteria
   */
  data: Array<TransferInAPI.Transaction>;

  /**
   * Indicates if more results are available beyond this page
   */
  hasMore: boolean;

  /**
   * Cursor to retrieve the next page of results (only present if hasMore is true)
   */
  nextCursor?: string;

  /**
   * Total number of transactions matching the criteria (excluding pagination)
   */
  totalCount?: number;
}

export type TransactionSourceOneOf = unknown;

/**
 * Type of transaction source
 */
export type TransactionSourceType = 'ACCOUNT' | 'UMA_ADDRESS' | 'REALTIME_FUNDING';

/**
 * Status of a payment transaction.
 *
 * | Status       | Description                                                                                        |
 * | ------------ | -------------------------------------------------------------------------------------------------- |
 * | `CREATED`    | Initial lookup has been created                                                                    |
 * | `PENDING`    | Quote has been created                                                                             |
 * | `PROCESSING` | Funding has been received and payment initiated                                                    |
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
  | 'COMPLETED'
  | 'REJECTED'
  | 'FAILED'
  | 'REFUNDED'
  | 'EXPIRED';

/**
 * Type of transaction (incoming payment or outgoing payment)
 */
export type TransactionType = 'INCOMING' | 'OUTGOING';

export interface TransactionListParams extends DefaultPaginationParams {
  /**
   * Filter by account identifier (matches either sender or receiver)
   */
  accountIdentifier?: string;

  /**
   * Filter by system customer ID. To filter to transactions made on behalf of the
   * platform, specify the platform ID as the customer ID.
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
   * Status of a payment transaction.
   *
   * | Status       | Description                                                                                        |
   * | ------------ | -------------------------------------------------------------------------------------------------- |
   * | `CREATED`    | Initial lookup has been created                                                                    |
   * | `PENDING`    | Quote has been created                                                                             |
   * | `PROCESSING` | Funding has been received and payment initiated                                                    |
   * | `COMPLETED`  | Cross border payment has been received, converted and payment has been sent to the offramp network |
   * | `REJECTED`   | Receiving institution or wallet rejected payment, payment has been refunded                        |
   * | `FAILED`     | An error occurred during payment                                                                   |
   * | `REFUNDED`   | Payment was unable to complete and refunded                                                        |
   * | `EXPIRED`    | Quote has expired                                                                                  |
   */
  status?: TransactionStatus;

  /**
   * Type of transaction (incoming payment or outgoing payment)
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
    type IncomingRateDetails as IncomingRateDetails,
    type IncomingTransaction as IncomingTransaction,
    type IncomingTransactionFailureReason as IncomingTransactionFailureReason,
    type OutgoingTransaction as OutgoingTransaction,
    type OutgoingTransactionFailureReason as OutgoingTransactionFailureReason,
    type OutgoingTransactionStatus as OutgoingTransactionStatus,
    type ReconciliationInstructions as ReconciliationInstructions,
    type TransactionDestinationOneOf as TransactionDestinationOneOf,
    type TransactionDestinationType as TransactionDestinationType,
    type TransactionListResponse as TransactionListResponse,
    type TransactionSourceOneOf as TransactionSourceOneOf,
    type TransactionSourceType as TransactionSourceType,
    type TransactionStatus as TransactionStatus,
    type TransactionType as TransactionType,
    type TransactionListParams as TransactionListParams,
    type TransactionApproveParams as TransactionApproveParams,
    type TransactionRejectParams as TransactionRejectParams,
  };
}

export { type TransactionsDefaultPagination };
