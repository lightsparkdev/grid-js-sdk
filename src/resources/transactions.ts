// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as TransactionsAPI from './transactions';
import * as InvitationsAPI from './invitations';
import * as TransferInAPI from './transfer-in';
import { TransactionsDefaultPagination } from './transfer-in';
import * as ExternalAccountsAPI from './customers/external-accounts';
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

export interface BaseTransactionSource {
  /**
   * Currency code for the source
   */
  currency?: string;
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

  /**
   * Destination account details
   */
  destination:
    | IncomingTransaction.AccountTransactionDestination
    | IncomingTransaction.UmaAddressTransactionDestination
    | IncomingTransaction.ExternalAccountDetailsTransactionDestination;

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
   * | `SENT`       | Cross border settlement has been initiated                                                         |
   * | `COMPLETED`  | Cross border payment has been received, converted and payment has been sent to the offramp network |
   * | `REJECTED`   | Receiving institution or wallet rejected payment, payment has been refunded                        |
   * | `FAILED`     | An error occurred during payment                                                                   |
   * | `REFUNDED`   | Payment was unable to complete and refunded                                                        |
   * | `EXPIRED`    | Quote has expired                                                                                  |
   */
  status: TransactionStatus;

  type: 'INCOMING' | 'OUTGOING';

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
   * When the payment was or will be settled
   */
  settledAt?: string;

  /**
   * Source account details
   */
  source?: TransactionSourceOneOf;

  /**
   * When the transaction was last updated
   */
  updatedAt?: string;
}

export namespace IncomingTransaction {
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
    type TransactionListParams as TransactionListParams,
    type TransactionApproveParams as TransactionApproveParams,
    type TransactionRejectParams as TransactionRejectParams,
  };
}

export { type TransactionsDefaultPagination };
