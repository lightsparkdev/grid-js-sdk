// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as TransactionsAPI from '../transactions';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';

export class Uma extends APIResource {
  /**
   * Simulate sending payment from an sandbox uma address to a platform customer to
   * test payment receive. This endpoint is only for the sandbox environment and will
   * fail for production platforms/keys.
   *
   * @example
   * ```ts
   * const incomingTransaction =
   *   await client.sandbox.uma.receivePayment({
   *     receivingCurrencyAmount: 1000,
   *     receivingCurrencyCode: 'USD',
   *     senderUmaAddress: '$success.usd@sandbox.grid.uma.money',
   *   });
   * ```
   */
  receivePayment(
    body: UmaReceivePaymentParams,
    options?: RequestOptions,
  ): APIPromise<TransactionsAPI.IncomingTransaction> {
    return this._client.post('/sandbox/uma/receive', { body, ...options });
  }
}

export interface UmaReceivePaymentParams {
  /**
   * The amount to be received in the smallest unit of the currency (eg. cents)
   */
  receivingCurrencyAmount: number;

  /**
   * The currency code for the receiving amount
   */
  receivingCurrencyCode: string;

  /**
   * UMA address of the sender from the sandbox
   */
  senderUmaAddress: string;

  /**
   * System ID of the receiver (optional if receiverUmaAddress is provided)
   */
  customerId?: string;

  /**
   * UMA address of the receiver (optional if customerId is provided)
   */
  receiverUmaAddress?: string;
}

export declare namespace Uma {
  export { type UmaReceivePaymentParams as UmaReceivePaymentParams };
}
