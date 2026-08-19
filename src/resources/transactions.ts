// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as InvitationsAPI from './invitations';
import * as QuotesAPI from './quotes';
import * as TransferInAPI from './transfer-in';
import { TransactionsDefaultPagination } from './transfer-in';
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
   * Card transactions are included and identified by `type: CARD`. In Sandbox this
   * is how you discover a `CardTransaction` id after simulating an authorization —
   * list the transactions, take the card transaction's `id`, and pass it as the
   * `cardTransactionId` to the clearing and return simulate endpoints.
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
   * Request cancellation of a pending bank transfer — an ACH transfer (push or pull)
   * or a wire — before it has settled, for example a payment or collection initiated
   * outside of the receiving bank's processing window. Whether a transfer can still
   * be cancelled is determined by the banking partner that is settling it: the
   * request is forwarded to the partner's own cancellation facility, and a transfer
   * that the partner has already processed (or that is otherwise past its
   * cancellation window) cannot be cancelled. Cancellation applies to bank-rail
   * transfers; requests for transaction types that cannot be cancelled are rejected.
   *
   * @example
   * ```ts
   * const transaction = await client.transactions.cancel(
   *   'transactionId',
   * );
   * ```
   */
  cancel(
    transactionID: string,
    body: TransactionCancelParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<TransferInAPI.Transaction> {
    return this._client.post(path`/transactions/${transactionID}/cancel`, {
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

export interface CancelTransactionRequest {
  /**
   * Optional reason for cancelling the transaction. This is just for debugging
   * purposes or can be used for a platform's own purposes.
   */
  reason?: string;
}

export interface IncomingTransaction {
  /**
   * Unique identifier for the transaction
   */
  id: string;

  /**
   * System ID of the customer this transaction belongs to
   */
  customerId: string;

  destination: unknown;

  /**
   * Whether this transaction credits or debits the customer's account.
   */
  direction: 'CREDIT' | 'DEBIT';

  /**
   * Platform-specific ID of the customer this transaction belongs to
   */
  platformCustomerId: string;

  /**
   * Amount received in the recipient's currency
   */
  receivedAmount: InvitationsAPI.CurrencyAmount;

  /**
   * Status of a payment transaction.
   *
   * | Status                  | Description                                                                                                                                                                                                                                                                                                             |
   * | ----------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
   * | `CREATED`               | Initial lookup has been created                                                                                                                                                                                                                                                                                         |
   * | `PENDING`               | Quote has been created                                                                                                                                                                                                                                                                                                  |
   * | `PENDING_AUTHORIZATION` | Awaiting Strong Customer Authentication. Only occurs for customers in a region where SCA is required (e.g. EU). The challenge is carried by the quote, not the transaction — fetch `GET /quotes/{quoteId}` using the transaction's `quoteId`, then authorize its `scaChallenge` via `POST /quotes/{quoteId}/authorize`. |
   * | `PROCESSING`            | Funding has been received and payment initiated                                                                                                                                                                                                                                                                         |
   * | `COMPLETED`             | Cross border payment has been received, converted and payment has been sent to the offramp network                                                                                                                                                                                                                      |
   * | `REJECTED`              | Receiving institution or wallet rejected payment, payment has been refunded                                                                                                                                                                                                                                             |
   * | `FAILED`                | An error occurred during payment                                                                                                                                                                                                                                                                                        |
   * | `REFUNDED`              | Payment was unable to complete and refunded                                                                                                                                                                                                                                                                             |
   * | `EXPIRED`               | Quote has expired                                                                                                                                                                                                                                                                                                       |
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
    | 'LNURLP_FAILED'
    | 'PAY_REQUEST_FAILED'
    | 'PAYMENT_APPROVAL_WEBHOOK_ERROR'
    | 'PAYMENT_APPROVAL_TIMED_OUT'
    | 'OFFRAMP_FAILED'
    | 'MISSING_MANDATORY_PAYEE_DATA'
    | 'QUOTE_EXPIRED'
    | 'QUOTE_EXECUTION_FAILED'
    | 'COMPLIANCE_REJECTED'
    | 'COLLECTION_FAILED';

  /**
   * The total fees available from the receive quote in the smallest unit of the
   * sending currency (eg. cents).
   */
  fees?: number;

  /**
   * Present when compliance review or required customer action is delaying
   * settlement.
   */
  pendingReason?:
    | 'COUNTERPARTY_DECLARATION_REQUIRED'
    | 'WALLET_VERIFICATION_REQUIRED'
    | 'COUNTERPARTY_INFORMATION_REQUIRED'
    | 'COMPLIANCE_REVIEW';

  /**
   * The ID of the quote that was used to trigger this payment
   */
  quoteId?: string;

  /**
   * The time at which the platform confirmed delivery of the receipt to their
   * customer.
   */
  receiptDeliveryConfirmedAt?: string;

  /**
   * Included for all transactions except those with "CREATED" status
   */
  reconciliationInstructions?: ReconciliationInstructions;

  /**
   * The refund if transaction was refunded.
   */
  refund?: SimulateAPI.Refund;

  /**
   * Amount sent in the sender's currency
   */
  sentAmount?: InvitationsAPI.CurrencyAmount;

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

export interface OutgoingTransaction {
  /**
   * Unique identifier for the transaction
   */
  id: string;

  /**
   * System ID of the customer this transaction belongs to
   */
  customerId: string;

  destination: unknown;

  /**
   * Whether this transaction credits or debits the customer's account.
   */
  direction: 'CREDIT' | 'DEBIT';

  /**
   * Platform-specific ID of the customer this transaction belongs to
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
   * | Status                  | Description                                                                                                                                                                                                                                                                                                             |
   * | ----------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
   * | `PENDING`               | Quote is pending confirmation                                                                                                                                                                                                                                                                                           |
   * | `PENDING_AUTHORIZATION` | Awaiting Strong Customer Authentication. Only occurs for customers in a region where SCA is required (e.g. EU). The challenge is carried by the quote, not the transaction — fetch `GET /quotes/{quoteId}` using the transaction's `quoteId`, then authorize its `scaChallenge` via `POST /quotes/{quoteId}/authorize`. |
   * | `EXPIRED`               | Quote wasn't executed before expiry window                                                                                                                                                                                                                                                                              |
   * | `PROCESSING`            | Executing the quote after receiving funds                                                                                                                                                                                                                                                                               |
   * | `COMPLETED`             | Payout successfully reached the destination                                                                                                                                                                                                                                                                             |
   * | `FAILED`                | Something went wrong — accompanied by a `failureReason`                                                                                                                                                                                                                                                                 |
   */
  status: 'PENDING' | 'PENDING_AUTHORIZATION' | 'PROCESSING' | 'COMPLETED' | 'FAILED' | 'EXPIRED';

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
   * Expected settlement time at the beneficiary. Null for instant rails (settlement
   * is immediate) and before a rail with deferred settlement is resolved.
   */
  expectedSettlementAt?: string;

  /**
   * If the transaction failed, this field provides the reason for failure.
   */
  failureReason?:
    | 'QUOTE_EXPIRED'
    | 'QUOTE_EXECUTION_FAILED'
    | 'FUNDING_AMOUNT_MISMATCH'
    | 'SCA_NOT_COMPLETED'
    | 'PAYOUT_RETURNED'
    | 'LIMIT_EXCEEDED'
    | 'ACCOUNT_CANNOT_RECEIVE'
    | 'ACCOUNT_INVALID'
    | 'COMPLIANCE_REJECTED'
    | 'LIGHTNING_PAYMENT_FAILED'
    | 'COUNTERPARTY_POST_TX_FAILED';

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
   * The payment rail used to settle this transaction (e.g. ACH, WIRE, NEFT,
   * FASTER_PAYMENTS). Uses the same values as the PaymentRail sent on quote
   * requests. Null when no external rail is used (e.g. instant or intra-network
   * transfers, or non-direct-destination transactions) or before a rail is resolved.
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
    | 'WIRE'
    | null;

  /**
   * Present when compliance review or required customer action is delaying
   * settlement.
   */
  pendingReason?:
    | 'COUNTERPARTY_DECLARATION_REQUIRED'
    | 'WALLET_VERIFICATION_REQUIRED'
    | 'COUNTERPARTY_INFORMATION_REQUIRED'
    | 'COMPLIANCE_REVIEW';

  /**
   * The portion of `fees` collected by the platform (platform-configured transaction
   * fees), in the smallest unit of the sending currency. 0 when the platform has no
   * applicable fee configured. Already included in `fees`.
   */
  platformFees?: number;

  /**
   * The ID of the quote that was used to trigger this payment
   */
  quoteId?: string;

  /**
   * How the rail was chosen — MANUAL when the platform specified a paymentRail on
   * the destination, AUTO when Lightspark selects it. Null when no rail is resolved.
   */
  railSelectionMode?: 'AUTO' | 'MANUAL' | null;

  /**
   * Details about the rate and fees for the transaction.
   */
  rateDetails?: QuotesAPI.OutgoingRateDetails;

  /**
   * The time at which the platform confirmed delivery of the receipt to their
   * customer.
   */
  receiptDeliveryConfirmedAt?: string;

  /**
   * Amount to be received by recipient in the recipient's currency
   */
  receivedAmount?: InvitationsAPI.CurrencyAmount;

  /**
   * Reconciliation details for this transaction. For the on-chain hash of a crypto
   * payout to an external wallet, see the destination's `onChainTransaction`
   * instead.
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
   * Expected number of seconds from quote creation to settlement. Null when not yet
   * known.
   */
  settlementTimelineSeconds?: number | null;

  /**
   * When the transaction was last updated
   */
  updatedAt?: string;
}

/**
 * Status of an outgoing payment transaction.
 *
 * | Status                  | Description                                                                                                                                                                                                                                                                                                             |
 * | ----------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
 * | `PENDING`               | Quote is pending confirmation                                                                                                                                                                                                                                                                                           |
 * | `PENDING_AUTHORIZATION` | Awaiting Strong Customer Authentication. Only occurs for customers in a region where SCA is required (e.g. EU). The challenge is carried by the quote, not the transaction — fetch `GET /quotes/{quoteId}` using the transaction's `quoteId`, then authorize its `scaChallenge` via `POST /quotes/{quoteId}/authorize`. |
 * | `EXPIRED`               | Quote wasn't executed before expiry window                                                                                                                                                                                                                                                                              |
 * | `PROCESSING`            | Executing the quote after receiving funds                                                                                                                                                                                                                                                                               |
 * | `COMPLETED`             | Payout successfully reached the destination                                                                                                                                                                                                                                                                             |
 * | `FAILED`                | Something went wrong — accompanied by a `failureReason`                                                                                                                                                                                                                                                                 |
 */
export type OutgoingTransactionStatus =
  | 'PENDING'
  | 'PENDING_AUTHORIZATION'
  | 'EXPIRED'
  | 'PROCESSING'
  | 'COMPLETED'
  | 'FAILED';

/**
 * Instructions for reconciling a payment with this transaction. For the on-chain
 * transaction to or from an external crypto wallet that is the transaction's own
 * source or destination, use the `onChainTransaction` on the relevant source or
 * destination instead.
 */
export interface ReconciliationInstructions {
  /**
   * Unique reference code to include with the payment to match it with the correct
   * incoming transaction, when available.
   */
  reference?: string;

  /**
   * @deprecated Transaction hash of the settlement transfer, when available. This
   * field reports two different transfers, and only one of them has a replacement
   * today:
   *
   * For a crypto transfer to or from a customer's own external wallet, use the
   * `onChainTransaction` on the relevant source or destination instead — it names
   * the network alongside the hash. That is the transfer this field is deprecated
   * for.
   *
   * For the inter-VASP settlement leg of a UMA payment (e.g. USDC on Solana to the
   * receiving partner), this field remains the only place the hash is reported: a
   * UMA address is not a wallet you hold, so its source and destination carry no
   * `onChainTransaction`. The field will not be removed before that leg has a
   * replacement.
   */
  transactionHash?: string;
}

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
 * Status of a payment transaction.
 *
 * | Status                  | Description                                                                                                                                                                                                                                                                                                             |
 * | ----------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
 * | `CREATED`               | Initial lookup has been created                                                                                                                                                                                                                                                                                         |
 * | `PENDING`               | Quote has been created                                                                                                                                                                                                                                                                                                  |
 * | `PENDING_AUTHORIZATION` | Awaiting Strong Customer Authentication. Only occurs for customers in a region where SCA is required (e.g. EU). The challenge is carried by the quote, not the transaction — fetch `GET /quotes/{quoteId}` using the transaction's `quoteId`, then authorize its `scaChallenge` via `POST /quotes/{quoteId}/authorize`. |
 * | `PROCESSING`            | Funding has been received and payment initiated                                                                                                                                                                                                                                                                         |
 * | `COMPLETED`             | Cross border payment has been received, converted and payment has been sent to the offramp network                                                                                                                                                                                                                      |
 * | `REJECTED`              | Receiving institution or wallet rejected payment, payment has been refunded                                                                                                                                                                                                                                             |
 * | `FAILED`                | An error occurred during payment                                                                                                                                                                                                                                                                                        |
 * | `REFUNDED`              | Payment was unable to complete and refunded                                                                                                                                                                                                                                                                             |
 * | `EXPIRED`               | Quote has expired                                                                                                                                                                                                                                                                                                       |
 */
export type TransactionStatus =
  | 'CREATED'
  | 'PENDING'
  | 'PENDING_AUTHORIZATION'
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
   * | Status                  | Description                                                                                                                                                                                                                                                                                                             |
   * | ----------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
   * | `CREATED`               | Initial lookup has been created                                                                                                                                                                                                                                                                                         |
   * | `PENDING`               | Quote has been created                                                                                                                                                                                                                                                                                                  |
   * | `PENDING_AUTHORIZATION` | Awaiting Strong Customer Authentication. Only occurs for customers in a region where SCA is required (e.g. EU). The challenge is carried by the quote, not the transaction — fetch `GET /quotes/{quoteId}` using the transaction's `quoteId`, then authorize its `scaChallenge` via `POST /quotes/{quoteId}/authorize`. |
   * | `PROCESSING`            | Funding has been received and payment initiated                                                                                                                                                                                                                                                                         |
   * | `COMPLETED`             | Cross border payment has been received, converted and payment has been sent to the offramp network                                                                                                                                                                                                                      |
   * | `REJECTED`              | Receiving institution or wallet rejected payment, payment has been refunded                                                                                                                                                                                                                                             |
   * | `FAILED`                | An error occurred during payment                                                                                                                                                                                                                                                                                        |
   * | `REFUNDED`              | Payment was unable to complete and refunded                                                                                                                                                                                                                                                                             |
   * | `EXPIRED`               | Quote has expired                                                                                                                                                                                                                                                                                                       |
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

export interface TransactionCancelParams {
  /**
   * Optional reason for cancelling the transaction. This is just for debugging
   * purposes or can be used for a platform's own purposes.
   */
  reason?: string;
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
    type CancelTransactionRequest as CancelTransactionRequest,
    type IncomingTransaction as IncomingTransaction,
    type OutgoingTransaction as OutgoingTransaction,
    type OutgoingTransactionStatus as OutgoingTransactionStatus,
    type ReconciliationInstructions as ReconciliationInstructions,
    type TransactionListResponse as TransactionListResponse,
    type TransactionSourceOneOf as TransactionSourceOneOf,
    type TransactionStatus as TransactionStatus,
    type TransactionType as TransactionType,
    type TransactionListParams as TransactionListParams,
    type TransactionApproveParams as TransactionApproveParams,
    type TransactionCancelParams as TransactionCancelParams,
    type TransactionRejectParams as TransactionRejectParams,
  };
}

export { type TransactionsDefaultPagination };
