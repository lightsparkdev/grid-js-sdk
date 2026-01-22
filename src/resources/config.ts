// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as ReceiverAPI from './receiver';
import * as TransactionsAPI from './transactions';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class Config extends APIResource {
  /**
   * Retrieve the current platform configuration
   *
   * @example
   * ```ts
   * const platformConfig = await client.config.retrieve();
   * ```
   */
  retrieve(options?: RequestOptions): APIPromise<PlatformConfig> {
    return this._client.get('/config', options);
  }

  /**
   * Update the platform configuration settings
   *
   * @example
   * ```ts
   * const platformConfig = await client.config.update({
   *   supportedCurrencies: [
   *     {
   *       currencyCode: 'USD',
   *       minAmount: 100,
   *       maxAmount: 1000000,
   *       enabledTransactionTypes: ['OUTGOING', 'INCOMING'],
   *       requiredCounterpartyFields: [
   *         { name: 'FULL_NAME', mandatory: true },
   *         { name: 'NATIONALITY', mandatory: true },
   *         { name: 'BIRTH_DATE', mandatory: true },
   *       ],
   *     },
   *   ],
   *   umaDomain: 'mycompany.com',
   *   webhookEndpoint: 'https://api.mycompany.com/webhooks/uma',
   * });
   * ```
   */
  update(body: ConfigUpdateParams, options?: RequestOptions): APIPromise<PlatformConfig> {
    return this._client.patch('/config', { body, ...options });
  }
}

/**
 * Name of a type of field containing info about a platform's customer or
 * counterparty customer.
 */
export type CustomerInfoFieldName =
  | 'FULL_NAME'
  | 'BIRTH_DATE'
  | 'NATIONALITY'
  | 'PHONE_NUMBER'
  | 'EMAIL'
  | 'POSTAL_ADDRESS'
  | 'TAX_ID'
  | 'REGISTRATION_NUMBER'
  | 'USER_TYPE'
  | 'COUNTRY_OF_RESIDENCE'
  | 'ACCOUNT_IDENTIFIER'
  | 'FI_LEGAL_ENTITY_NAME'
  | 'FI_ADDRESS'
  | 'PURPOSE_OF_PAYMENT'
  | 'ULTIMATE_INSTITUTION_COUNTRY'
  | 'IDENTIFIER';

export interface PlatformConfig {
  /**
   * System-generated unique identifier
   */
  id?: string;

  /**
   * Creation timestamp
   */
  createdAt?: string;

  /**
   * Whether the platform is a regulated financial institution. This is used to
   * determine if the platform's customers must be KYC/KYB'd by Lightspark via the
   * KYC link flow. This can only be set by Lightspark during platform creation.
   */
  isRegulatedFinancialInstitution?: boolean;

  /**
   * The subdomain that incoming requests will be proxied to
   */
  proxyUmaSubdomain?: string;

  /**
   * List of currencies supported by the platform. This is what the platform's
   * customers are able to hold, send, and receive.
   */
  supportedCurrencies?: Array<PlatformCurrencyConfig>;

  /**
   * UMA domain for this platform
   */
  umaDomain?: string;

  /**
   * Last update timestamp
   */
  updatedAt?: string;

  /**
   * URL where webhook notifications will be sent
   */
  webhookEndpoint?: string;
}

export interface PlatformCurrencyConfig {
  /**
   * Three-letter currency code (ISO 4217)
   */
  currencyCode: string;

  /**
   * List of transaction types that are enabled for this currency.
   */
  enabledTransactionTypes: Array<TransactionsAPI.TransactionType>;

  /**
   * Maximum amount that can be sent in the smallest unit of this currency
   */
  maxAmount: number;

  /**
   * Minimum amount that can be sent in the smallest unit of this currency
   */
  minAmount: number;

  /**
   * List of fields which the platform requires from the counterparty institutions
   * about counterparty customers. Platforms can set mandatory to false if the
   * platform does not require the field, but would like to have it available. Some
   * fields may be required by the underlying UMA provider.
   */
  requiredCounterpartyFields: Array<ReceiverAPI.CounterpartyFieldDefinition>;

  /**
   * List of fields that are required by the underlying UMA provider for this
   * currency. If the counterparty does not provide these fields, quote requests will
   * fail.
   */
  providerRequiredCounterpartyCustomerFields?: Array<CustomerInfoFieldName>;

  /**
   * List of customer info field names that are required by the underlying UMA
   * provider when creating a customer for this currency. These fields must be
   * supplied when creating or updating a customer if this currency is intended to be
   * used by that customer. If no fields are required, this field is omitted.
   */
  providerRequiredCustomerFields?: Array<CustomerInfoFieldName>;
}

export interface ConfigUpdateParams {
  supportedCurrencies?: Array<PlatformCurrencyConfig>;

  umaDomain?: string;

  webhookEndpoint?: string;
}

export declare namespace Config {
  export {
    type CustomerInfoFieldName as CustomerInfoFieldName,
    type PlatformConfig as PlatformConfig,
    type PlatformCurrencyConfig as PlatformCurrencyConfig,
    type ConfigUpdateParams as ConfigUpdateParams,
  };
}
