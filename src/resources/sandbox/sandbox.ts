// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as TransactionsAPI from '../transactions';
import * as InternalAccountsAPI from './internal-accounts';
import { InternalAccount, InternalAccountFundParams, InternalAccounts } from './internal-accounts';
import * as UmaAPI from './uma';
import { Uma, UmaReceivePaymentParams } from './uma';
import * as WebhooksAPI from './webhooks';
import { WebhookSendTestResponse, Webhooks } from './webhooks';
import * as CardsAPI from './cards/cards';
import { Cards } from './cards/cards';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';

/**
 * Endpoints to trigger test cases in sandbox
 */
export class Sandbox extends APIResource {
  uma: UmaAPI.Uma = new UmaAPI.Uma(this._client);
  internalAccounts: InternalAccountsAPI.InternalAccounts = new InternalAccountsAPI.InternalAccounts(
    this._client,
  );
  webhooks: WebhooksAPI.Webhooks = new WebhooksAPI.Webhooks(this._client);
  cards: CardsAPI.Cards = new CardsAPI.Cards(this._client);

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
    return this._client.post('/sandbox/send', { body, ...options, __security: { basicAuth: true } });
  }
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
Sandbox.Webhooks = Webhooks;
Sandbox.Cards = Cards;

export declare namespace Sandbox {
  export { type SandboxSendFundsParams as SandboxSendFundsParams };

  export { Uma as Uma, type UmaReceivePaymentParams as UmaReceivePaymentParams };

  export {
    InternalAccounts as InternalAccounts,
    type InternalAccount as InternalAccount,
    type InternalAccountFundParams as InternalAccountFundParams,
  };

  export { Webhooks as Webhooks, type WebhookSendTestResponse as WebhookSendTestResponse };

  export { Cards as Cards };
}
