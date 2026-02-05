// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
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
   * const transaction = await client.transferOut.create({
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
  create(params: TransferOutCreateParams, options?: RequestOptions): APIPromise<TransferInAPI.Transaction> {
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
  export { type TransferOutCreateParams as TransferOutCreateParams };
}
