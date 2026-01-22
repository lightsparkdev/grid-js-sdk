// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as ConfigAPI from './config';
import * as QuotesAPI from './quotes';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

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
  ): APIPromise<ReceiverLookupExternalAccountResponse> {
    return this._client.get(path`/receiver/external-account/${accountID}`, { query, ...options });
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
  ): APIPromise<ReceiverLookupUmaResponse> {
    return this._client.get(path`/receiver/uma/${receiverUmaAddress}`, { query, ...options });
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

export interface LookupResponse {
  /**
   * Unique identifier for the lookup. Needed in the subsequent create quote request.
   */
  lookupId: string;

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
  }
}

export interface ReceiverLookupExternalAccountResponse extends LookupResponse {
  /**
   * The external account ID that was looked up
   */
  accountId: string;
}

export interface ReceiverLookupUmaResponse extends LookupResponse {
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
}

export declare namespace Receiver {
  export {
    type CounterpartyFieldDefinition as CounterpartyFieldDefinition,
    type LookupResponse as LookupResponse,
    type ReceiverLookupExternalAccountResponse as ReceiverLookupExternalAccountResponse,
    type ReceiverLookupUmaResponse as ReceiverLookupUmaResponse,
    type ReceiverLookupExternalAccountParams as ReceiverLookupExternalAccountParams,
    type ReceiverLookupUmaParams as ReceiverLookupUmaParams,
  };
}
