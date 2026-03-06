// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as TransactionsAPI from './transactions';
import * as SandboxAPI from './sandbox/sandbox';
import { APIPromise } from '../core/api-promise';
import { DefaultPagination } from '../core/pagination';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';

/**
 * Endpoints for transferring funds between internal and external accounts with the same currency
 */
export class TransferIn extends APIResource {
  /**
   * Transfer funds from an external account to an internal account for a specific
   * customer. This endpoint should only be used for external account sources with
   * pull functionality (e.g. ACH Pull). Otherwise, use the paymentInstructions on
   * the internal account to deposit funds.
   *
   * @example
   * ```ts
   * const transaction = await client.transferIn.create({
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
  create(params: TransferInCreateParams, options?: RequestOptions): APIPromise<Transaction> {
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

export type TransactionsDefaultPagination = DefaultPagination<Transaction>;

export interface BaseTransactionDestination {
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

export type Transaction = TransactionsAPI.IncomingTransaction | SandboxAPI.OutgoingTransaction;

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
    type TransferInCreateParams as TransferInCreateParams,
  };
}
