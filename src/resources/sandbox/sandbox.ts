// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as TransactionsAPI from '../transactions';
import * as InternalAccountsAPI from './internal-accounts';
import { InternalAccount, InternalAccountFundParams, InternalAccounts } from './internal-accounts';
import * as UmaAPI from './uma';
import { Uma, UmaReceivePaymentParams } from './uma';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';

export class Sandbox extends APIResource {
  uma: UmaAPI.Uma = new UmaAPI.Uma(this._client);
  internalAccounts: InternalAccountsAPI.InternalAccounts = new InternalAccountsAPI.InternalAccounts(
    this._client,
  );

  /**
   * Simulate sending funds to the bank account as instructed in the quote. This
   * endpoint is only for the sandbox environment and will fail for production
   * platforms/keys.
   *
   * @example
   * ```ts
   * const outgoingTransaction = await client.sandbox.sendFunds({
   *   currencyCode: 'USD',
   *   quoteId: 'Quote:019542f5-b3e7-1d02-0000-000000000006',
   * });
   * ```
   */
  sendFunds(
    body: SandboxSendFundsParams,
    options?: RequestOptions,
  ): APIPromise<TransactionsAPI.OutgoingTransaction> {
    return this._client.post('/sandbox/send', { body, ...options });
  }

  /**
   * Send a test webhook to the configured endpoint
   *
   * @example
   * ```ts
   * const response = await client.sandbox.sendTest();
   * ```
   */
  sendTest(options?: RequestOptions): APIPromise<SandboxSendTestResponse> {
    return this._client.post('/webhooks/test', options);
  }
}

export interface SandboxSendTestResponse {
  /**
   * The HTTP status code returned by the webhook endpoint
   */
  response_status: number;

  /**
   * The raw body content returned by the webhook endpoint in response to the request
   */
  response_body?: string;

  /**
   * URL where the webhook was sent
   */
  url?: string;
}

export interface SandboxSendFundsParams {
  /**
   * Currency code for the funds to be sent
   */
  currencyCode: string;

  /**
   * The unique identifier of the quote
   */
  quoteId: string;

  /**
   * The amount to send in the smallest unit of the currency (eg. cents). If not
   * provided, the amount will be derived from the quote.
   */
  currencyAmount?: number;
}

Sandbox.Uma = Uma;
Sandbox.InternalAccounts = InternalAccounts;

export declare namespace Sandbox {
  export {
    type SandboxSendTestResponse as SandboxSendTestResponse,
    type SandboxSendFundsParams as SandboxSendFundsParams,
  };

  export { Uma as Uma, type UmaReceivePaymentParams as UmaReceivePaymentParams };

  export {
    InternalAccounts as InternalAccounts,
    type InternalAccount as InternalAccount,
    type InternalAccountFundParams as InternalAccountFundParams,
  };
}
