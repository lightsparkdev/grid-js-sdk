// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as CardsAPI from './cards';
import * as TransactionsAPI from './transactions';
import { APIPromise } from '../core/api-promise';
import { DefaultPagination } from '../core/pagination';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';

/**
 * Deprecated endpoints for transferring funds between internal and external accounts with the same currency. Use the quote endpoints under Cross-Currency Transfers instead, which now serve same-currency transfers as well.
 */
export class TransferIn extends APIResource {
  /**
   * **Deprecated. Use `POST /quotes` instead.**
   *
   * Same-currency transfers are now served by the quote endpoint. Create a quote
   * with an external account source and an internal account destination and set
   * `immediatelyExecute: true` to move the funds in a single request, exactly as
   * this endpoint does. This endpoint continues to work and its request and response
   * shapes are unchanged.
   *
   * To migrate a request to `POST /quotes`:
   *
   * - add `sourceType: ACCOUNT` to `source` and `destinationType: ACCOUNT` to
   *   `destination`; the account IDs are unchanged
   * - rename `amount` to `lockedCurrencyAmount` and add
   *   `lockedCurrencySide: SENDING`
   * - add `immediatelyExecute: true` to keep the single-request behavior
   *
   * The quote response is a `Quote` rather than a `Transaction`; read
   * `transactionId` from it to track the resulting transaction.
   *
   * Transfer funds from an external account to an internal account for a specific
   * customer. This endpoint should only be used for external account sources with
   * pull functionality (e.g. ACH Pull). Otherwise, use the paymentInstructions on
   * the internal account to deposit funds.
   *
   * @deprecated
   */
  create(params: TransferInCreateParams, options?: RequestOptions): APIPromise<Transaction> {
    const { 'Idempotency-Key': idempotencyKey, ...body } = params;
    return this._client.post('/transfer-in', {
      body,
      ...options,
      headers: buildHeaders([
        { ...(idempotencyKey != null ? { 'Idempotency-Key': idempotencyKey } : undefined) },
        options?.headers,
      ]),
      __security: { basicAuth: true },
    });
  }
}

export type TransactionsDefaultPagination = DefaultPagination<Transaction>;

export interface BaseTransactionDestination {
  destinationType: unknown;

  /**
   * Currency code for the destination
   */
  currency?: string;
}

export interface ExternalAccountReference {
  /**
   * Reference to an external account ID
   */
  accountId: string;
}

export interface InternalAccountReference {
  /**
   * Reference to an internal account ID
   */
  accountId: string;
}

/**
 * Parent transaction row for a card authorization and all of the pulls /
 * settlements / refunds that reconcile against it. Child events are rolled up into
 * the `pullSummary`, `refundSummary`, and `settlementSummary` aggregates.
 * Delivered as the payload of the generic transaction webhook stream (extends the
 * Transaction model with a card destination type) on every transition.
 */
export type Transaction =
  | TransactionsAPI.IncomingTransaction
  | TransactionsAPI.OutgoingTransaction
  | CardsAPI.CardTransaction;

export interface TransferInRequest {
  /**
   * Destination internal account details
   */
  destination: InternalAccountReference;

  /**
   * Source external account details
   */
  source: ExternalAccountReference;

  /**
   * Amount in the smallest unit of the currency (e.g., cents for USD/EUR, satoshis
   * for BTC)
   */
  amount?: number;
}

export interface TransferInCreateParams {
  /**
   * Body param: Destination internal account details
   */
  destination: InternalAccountReference;

  /**
   * Body param: Source external account details
   */
  source: ExternalAccountReference;

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

export declare namespace TransferIn {
  export {
    type BaseTransactionDestination as BaseTransactionDestination,
    type ExternalAccountReference as ExternalAccountReference,
    type InternalAccountReference as InternalAccountReference,
    type Transaction as Transaction,
    type TransferInRequest as TransferInRequest,
    type TransferInCreateParams as TransferInCreateParams,
  };
}
