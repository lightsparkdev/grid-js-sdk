// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as ConfigAPI from './config';
import * as QuotesAPI from './quotes';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

/**
 * Endpoints for creating and confirming quotes for transfers, both same-currency and cross-currency
 */
export class Receiver extends APIResource {
  /**
   * Lookup an external account by ID to determine supported currencies and exchange
   * rates. This endpoint helps platforms determine what currencies they can send to
   * a given external account, along with the current estimated exchange rates and
   * minimum and maximum amounts that can be sent.
   */
  lookupExternalAccount(
    accountID: string,
    query: ReceiverLookupExternalAccountParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<ExternalAccountLookupResponse> {
    return this._client.get(path`/receiver/external-account/${accountID}`, {
      query,
      ...options,
      __security: { basicAuth: true },
    });
  }

  /**
   * Lookup a receiving UMA address to determine supported currencies and exchange
   * rates. This endpoint helps platforms determine what currencies they can send to
   * a given UMA address.
   */
  lookupUma(
    receiverUmaAddress: string,
    query: ReceiverLookupUmaParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<UmaLookupResponse> {
    return this._client.get(path`/receiver/uma/${receiverUmaAddress}`, {
      query,
      ...options,
      __security: { basicAuth: true },
    });
  }
}

export interface CounterpartyFieldDefinition {
  /**
   * Whether the field is mandatory
   */
  mandatory: boolean;

  /**
   * Name of a type of field containing info about a platform's customer or
   * counterparty customer.
   */
  name: ConfigAPI.CustomerInfoFieldName;
}

export interface ExternalAccountLookupResponse extends LookupResponse {
  /**
   * The external account ID that was looked up
   */
  accountId: string;
}

export interface LookupResponse {
  /**
   * Unique identifier for the lookup. Needed in the subsequent create quote request.
   */
  lookupId: string;

  /**
   * The currency the payment is sent from — the sender's default, or the one named
   * by the `sendingCurrency` query parameter. Every `estimatedExchangeRate` in
   * `supportedCurrencies` converts from this currency, and any
   * `minSendingAmount`/`maxSendingAmount` is denominated in its smallest unit.
   */
  sendingCurrency: unknown;

  /**
   * List of currencies supported by the receiving account
   */
  supportedCurrencies: Array<LookupResponse.SupportedCurrency>;

  /**
   * Fields required by the receiving institution about the payer before payment can
   * be completed
   */
  requiredPayerDataFields?: Array<CounterpartyFieldDefinition>;
}

export namespace LookupResponse {
  export interface SupportedCurrency {
    currency: QuotesAPI.Currency;

    /**
     * An estimated exchange rate from the sender's currency to this currency. This is
     * not a locked rate and is subject to change when calling the quotes endpoint.
     */
    estimatedExchangeRate: number;

    /**
     * The maximum amount that can be received in this currency.
     */
    max: number;

    /**
     * The minimum amount that can be received in this currency.
     */
    min: number;

    /**
     * The maximum amount that can be sent for this currency, in the smallest unit of
     * the sender's currency (e.g. cents for USD). Same semantics as `maxSendingAmount`
     * on the exchange rates endpoint. This is an estimate based on the current
     * exchange rate and is subject to change when calling the quotes endpoint. Omitted
     * when the sending-side bound cannot be resolved.
     */
    maxSendingAmount?: number;

    /**
     * The minimum amount that can be sent for this currency, in the smallest unit of
     * the sender's currency (e.g. cents for USD). Same semantics as `minSendingAmount`
     * on the exchange rates endpoint. This is an estimate based on the current
     * exchange rate and is subject to change when calling the quotes endpoint. Omitted
     * when the sending-side bound cannot be resolved.
     */
    minSendingAmount?: number;
  }
}

export interface UmaLookupResponse extends LookupResponse {
  /**
   * The UMA address that was looked up
   */
  receiverUmaAddress: string;
}

export interface ReceiverLookupExternalAccountParams {
  /**
   * System ID of the sender (optional if senderUmaAddress is provided)
   */
  customerId?: string;

  /**
   * UMA address of the sender (optional if customerId is provided)
   */
  senderUmaAddress?: string;

  /**
   * Currency code the sender will send from (e.g., USD). Selects which of the
   * sender's configured currencies the response is priced against: it is echoed back
   * as the response's `sendingCurrency`, and the
   * `minSendingAmount`/`maxSendingAmount` bounds are denominated in its smallest
   * unit. Defaults to the sender's default currency.
   */
  sendingCurrency?: string;
}

export interface ReceiverLookupUmaParams {
  /**
   * System ID of the sender (optional if senderUmaAddress is provided)
   */
  customerId?: string;

  /**
   * UMA address of the sender (optional if customerId is provided)
   */
  senderUmaAddress?: string;

  /**
   * Currency code the sender will send from (e.g., USD). Selects which of the
   * sender's configured currencies the response is priced against: it is echoed back
   * as the response's `sendingCurrency`, and the
   * `minSendingAmount`/`maxSendingAmount` bounds are denominated in its smallest
   * unit. Defaults to the sender's default currency.
   */
  sendingCurrency?: string;
}

export declare namespace Receiver {
  export {
    type CounterpartyFieldDefinition as CounterpartyFieldDefinition,
    type ExternalAccountLookupResponse as ExternalAccountLookupResponse,
    type LookupResponse as LookupResponse,
    type UmaLookupResponse as UmaLookupResponse,
    type ReceiverLookupExternalAccountParams as ReceiverLookupExternalAccountParams,
    type ReceiverLookupUmaParams as ReceiverLookupUmaParams,
  };
}
