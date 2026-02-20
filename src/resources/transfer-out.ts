// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as InvitationsAPI from './invitations';
import * as QuotesAPI from './quotes';
import * as TransactionsAPI from './transactions';
import * as TransferInAPI from './transfer-in';
import { APIPromise } from '../core/api-promise';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';

export class TransferOut extends APIResource {
  /**
   * Transfer funds from an internal account to an external account for a specific
   * customer.
   *
   * @example
   * ```ts
   * const transferOut = await client.transferOut.create({
   *   destination: {
   *     accountId:
   *       'ExternalAccount:e85dcbd6-dced-4ec4-b756-3c3a9ea3d965',
   *   },
   *   source: {
   *     accountId:
   *       'InternalAccount:a12dcbd6-dced-4ec4-b756-3c3a9ea3d123',
   *   },
   *   amount: 12550,
   * });
   * ```
   */
  create(params: TransferOutCreateParams, options?: RequestOptions): APIPromise<TransferOutCreateResponse> {
    const { 'Idempotency-Key': idempotencyKey, ...body } = params;
    return this._client.post('/transfer-out', {
      body,
      ...options,
      headers: buildHeaders([
        { ...(idempotencyKey != null ? { 'Idempotency-Key': idempotencyKey } : undefined) },
        options?.headers,
      ]),
    });
  }
}

export type TransferOutCreateResponse =
  | TransactionsAPI.IncomingTransaction
  | TransferOutCreateResponse.OutgoingTransaction;

export namespace TransferOutCreateResponse {
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

export interface TransferOutCreateParams {
  /**
   * Body param: Destination external account details
   */
  destination: TransferOutCreateParams.Destination;

  /**
   * Body param: Source internal account details
   */
  source: TransferOutCreateParams.Source;

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

export namespace TransferOutCreateParams {
  /**
   * Destination external account details
   */
  export interface Destination {
    /**
     * Reference to an external account ID
     */
    accountId: string;
  }

  /**
   * Source internal account details
   */
  export interface Source {
    /**
     * Reference to an internal account ID
     */
    accountId: string;
  }
}

export declare namespace TransferOut {
  export {
    type TransferOutCreateResponse as TransferOutCreateResponse,
    type TransferOutCreateParams as TransferOutCreateParams,
  };
}
