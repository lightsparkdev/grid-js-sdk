// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as ReceiverAPI from './receiver';
import * as TransactionsAPI from './transactions';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

/**
 * Platform configuration endpoints for managing global settings. You can also configure these settings in the Grid dashboard.
 */
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
    return this._client.get('/config', { ...options, __security: { basicAuth: true } });
  }

  /**
   * Update platform configuration settings. `cardConfigs` can establish
   * platform-level per-transaction and UTC-calendar-day card caps. Grid enforces the
   * lower of each platform cap and its corresponding card-specific value without
   * replacing the card-specific value. Daily limits reset at 00:00 UTC.
   *
   * @example
   * ```ts
   * const platformConfig = await client.config.update({
   *   cardConfigs: { maxSpendPerTransaction: 10000, maxSpendPerDay: 50000 },
   *   cardTokenization2faConfig: {
   *     displayName: 'Acme',
   *     logoUrl: 'https://acme.com/card-email-logo.png',
   *     email: { ... },
   *     sms: { ... },
   *   },
   *   embeddedWalletConfig: {
   *     appName: 'Acme Wallet',
   *     sendFromEmailAddress: 'noreply@acme.com',
   *     sendFromEmailSenderName: 'Acme Notifications',
   *     replyToEmailAddress: 'support@acme.com',
   *     logoUrl: 'https://acme.com/logo.png',
   *   },
   *   supportedCurrencies: [
   *     {
   *       currencyCode: 'USD',
   *       minAmount: 100,
   *       maxAmount: 1000000,
   *       enabledTransactionTypes: ['OUTGOING', 'INCOMING'],
   *       requiredCounterpartyFields: [
   *         { ... },
   *         { ... },
   *         { ... },
   *       ],
   *     },
   *   ],
   *   umaDomain: 'mycompany.com',
   *   webhookEndpoint: 'https://api.mycompany.com/webhooks/uma',
   * });
   * ```
   */
  update(body: ConfigUpdateParams, options?: RequestOptions): APIPromise<PlatformConfig> {
    return this._client.patch('/config', { body, ...options, __security: { basicAuth: true } });
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
  | 'IDENTIFIER'
  | 'BUSINESS_TYPE'
  | 'COMPANY_LEGAL_NAME'
  | 'ID_TYPE'
  | 'ID_NUMBER';

/**
 * Per-platform embedded-wallet configuration. Controls branding and OTP behavior
 * for the email sent when a customer authenticates with an EMAIL_OTP credential.
 * Fields omitted from a request are left unchanged.
 */
export interface EmbeddedWalletConfig {
  /**
   * If true, OTP includes letters in addition to digits. Defaults to numeric-only
   * when not set.
   */
  alphanumeric?: boolean;

  /**
   * App name displayed in the default OTP email template.
   */
  appName?: string;

  /**
   * OTP validity window in seconds. Defaults to 300 when not set.
   */
  expirationSeconds?: number;

  /**
   * URL to a PNG logo for the OTP email. Resized to 340x124px.
   */
  logoUrl?: string;

  /**
   * Number of digits / characters in the OTP code. Defaults to 6 when not set.
   */
  otpLength?: number;

  /**
   * Custom reply-to email address for OTP emails.
   */
  replyToEmailAddress?: string;

  /**
   * Custom sender email address for OTP emails.
   */
  sendFromEmailAddress?: string;

  /**
   * Custom sender display name. Defaults to "Notifications" when not set.
   */
  sendFromEmailSenderName?: string;
}

export interface PlatformConfig {
  /**
   * System-generated unique identifier
   */
  id?: string;

  /**
   * Platform-level settings for cards issued by this platform.
   */
  cardConfigs?: PlatformConfig.CardConfigs;

  /**
   * Branding and sender configuration for card-tokenization authentication messages.
   * This configuration is independent of embedded-wallet support.
   */
  cardTokenization2faConfig?: PlatformConfig.CardTokenization2faConfig;

  /**
   * Creation timestamp
   */
  createdAt?: string;

  /**
   * Embedded-wallet branding and OTP settings for this platform. Present only when
   * the platform has configured embedded-wallet support; omitted otherwise.
   */
  embeddedWalletConfig?: EmbeddedWalletConfig;

  /**
   * Platform-collected fees that should be added on top of Grid-collected fees.
   * Contains every currently-active fee config for the platform.
   */
  feeConfigs?: Array<PlatformConfig.FeeConfig>;

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

export namespace PlatformConfig {
  /**
   * Platform-level settings for cards issued by this platform.
   */
  export interface CardConfigs {
    /**
     * Platform-level cap on cumulative new spend during one UTC calendar day for every
     * card whose authorization decisions are made by Grid. The value is interpreted in
     * the smallest unit of each card's currency. Grid enforces the lower of this cap
     * and the card's configured `maxSpendPerDay`; null means no platform-level daily
     * cap. The window resets at 00:00 UTC. Refunds, reversals, and authorization
     * expiries do not restore capacity during the day. The cap applies to existing
     * cards and cards issued later. Provider-decided card programs are unaffected.
     */
    maxSpendPerDay?: number | null;

    /**
     * Platform-level cap on a single transaction for every card whose authorization
     * decisions are made by Grid. The value is interpreted in the smallest unit of
     * each card's currency. Grid enforces the lower of this cap and the card's
     * configured `maxSpendPerTransaction`; null means no platform-level cap. The cap
     * applies to existing cards and to cards issued later. Provider-decided card
     * programs are unaffected.
     */
    maxSpendPerTransaction?: number | null;
  }

  /**
   * Branding and sender configuration for card-tokenization authentication messages.
   * This configuration is independent of embedded-wallet support.
   */
  export interface CardTokenization2faConfig {
    /**
     * Platform name displayed in authentication messages.
     */
    displayName?: string;

    /**
     * Email branding and sender settings for card-tokenization authentication
     * messages. Invalid or unverified sender identities can cause delivery to fail.
     */
    email?: CardTokenization2faConfig.Email;

    /**
     * HTTPS URL of the logo displayed in email messages.
     */
    logoUrl?: string;

    /**
     * SMS settings for card-tokenization authentication messages delivered through a
     * Lightspark-managed Twilio sender.
     */
    sms?: CardTokenization2faConfig.SMS;
  }

  export namespace CardTokenization2faConfig {
    /**
     * Email branding and sender settings for card-tokenization authentication
     * messages. Invalid or unverified sender identities can cause delivery to fail.
     */
    export interface Email {
      /**
       * Plain-text message content. Lightspark inserts the authentication code into a
       * controlled text and HTML template; arbitrary HTML and template variables are not
       * supported.
       */
      bodyText?: string;

      /**
       * Sender address for card-tokenization authentication emails.
       */
      fromAddress?: string;

      /**
       * Sender display name.
       */
      fromName?: string;

      /**
       * Reply-to address for card-tokenization authentication emails.
       */
      replyToAddress?: string;

      /**
       * Subject for the authentication email.
       */
      subject?: string;
    }

    /**
     * SMS settings for card-tokenization authentication messages delivered through a
     * Lightspark-managed Twilio sender.
     */
    export interface SMS {
      /**
       * Plain-text fallback message used when Twilio Verify is unavailable for the
       * authentication code. Lightspark appends the code to this text.
       */
      bodyText?: string;

      /**
       * Twilio Verify template SID to use for this platform. An invalid or unavailable
       * template can cause delivery to fail.
       */
      templateSid?: string;
    }
  }

  /**
   * A platform-configured fee collected by Grid and settled to the platform internal
   * account. There can be at most one fee config for a given fee type and source
   * currency pair. The fee will apply to all transactions of the fee type that
   * originate in the source currency.
   */
  export interface FeeConfig {
    /**
     * The kind of activity this fee applies to.
     *
     * - `CROSS_CURRENCY_TRANSACTION` — fee charged on a cross-currency Grid
     *   transaction (source currency differs from destination currency).
     */
    feeType: 'CROSS_CURRENCY_TRANSACTION';

    /**
     * Fixed fee charged per transaction.
     */
    fixedFee: FeeConfig.FixedFee;

    /**
     * Currency code of the sending side this fee applies to. Only `USD` is accepted
     * today; other currencies return a `NOT_IMPLEMENTED` error.
     */
    sourceCurrency: string;

    /**
     * Variable fee in basis points (1 bps = 0.01%) to apply to a transaction's
     * source-currency amount.
     */
    variableFeeBps: number;
  }

  export namespace FeeConfig {
    /**
     * Fixed fee charged per transaction.
     */
    export interface FixedFee {
      /**
       * Fee amount in the smallest unit of the fixed fee's `currency` (e.g., cents for
       * USD).
       */
      amount: number;

      /**
       * Three-letter currency code (ISO 4217) the fixed fee is denominated in. Some
       * cryptocurrencies may use their own ticker symbols (e.g. "BTC" for Bitcoin,
       * "USDC" for USDC, etc.)
       */
      currency: string;
    }
  }
}

export interface PlatformConfigUpdateRequest {
  /**
   * Update platform-level card settings. Fields omitted from the nested object are
   * left unchanged. For either spending limit, supply null to clear the platform cap
   * or a positive integer to set it. Omit this field at the top level to leave all
   * card settings unchanged.
   */
  cardConfigs?: PlatformConfigUpdateRequest.CardConfigs;

  /**
   * Update card-tokenization authentication branding and delivery settings. Fields
   * omitted from the nested object are left unchanged. Changes apply to subsequent
   * delivery attempts.
   */
  cardTokenization2faConfig?: PlatformConfigUpdateRequest.CardTokenization2faConfig;

  /**
   * Update or create the embedded-wallet configuration for this platform. Fields
   * omitted from the nested object are left unchanged. Omit this field at the top
   * level to leave the embedded-wallet configuration unchanged entirely.
   */
  embeddedWalletConfig?: EmbeddedWalletConfig;

  /**
   * Merge-by-key upsert of platform fee configs, keyed by
   * `(feeType, sourceCurrency)`. Setting variable and fixed fees to 0 for an
   * existing fee config deactivates it. Only `sourceCurrency: USD` is accepted
   * today. Omit this field to leave fee configs unchanged.
   */
  feeConfigs?: Array<PlatformConfigUpdateRequest.FeeConfig>;

  supportedCurrencies?: Array<PlatformCurrencyConfig>;

  umaDomain?: string;

  webhookEndpoint?: string;
}

export namespace PlatformConfigUpdateRequest {
  /**
   * Update platform-level card settings. Fields omitted from the nested object are
   * left unchanged. For either spending limit, supply null to clear the platform cap
   * or a positive integer to set it. Omit this field at the top level to leave all
   * card settings unchanged.
   */
  export interface CardConfigs {
    /**
     * Platform-level cap on cumulative new spend during one UTC calendar day for every
     * card whose authorization decisions are made by Grid. The value is interpreted in
     * the smallest unit of each card's currency. Grid enforces the lower of this cap
     * and the card's configured `maxSpendPerDay`; null means no platform-level daily
     * cap. The window resets at 00:00 UTC. Refunds, reversals, and authorization
     * expiries do not restore capacity during the day. The cap applies to existing
     * cards and cards issued later. Provider-decided card programs are unaffected.
     */
    maxSpendPerDay?: number | null;

    /**
     * Platform-level cap on a single transaction for every card whose authorization
     * decisions are made by Grid. The value is interpreted in the smallest unit of
     * each card's currency. Grid enforces the lower of this cap and the card's
     * configured `maxSpendPerTransaction`; null means no platform-level cap. The cap
     * applies to existing cards and to cards issued later. Provider-decided card
     * programs are unaffected.
     */
    maxSpendPerTransaction?: number | null;
  }

  /**
   * Update card-tokenization authentication branding and delivery settings. Fields
   * omitted from the nested object are left unchanged. Changes apply to subsequent
   * delivery attempts.
   */
  export interface CardTokenization2faConfig {
    /**
     * Platform name displayed in authentication messages.
     */
    displayName?: string;

    /**
     * Email branding and sender settings for card-tokenization authentication
     * messages. Invalid or unverified sender identities can cause delivery to fail.
     */
    email?: CardTokenization2faConfig.Email;

    /**
     * HTTPS URL of the logo displayed in email messages.
     */
    logoUrl?: string;

    /**
     * SMS settings for card-tokenization authentication messages delivered through a
     * Lightspark-managed Twilio sender.
     */
    sms?: CardTokenization2faConfig.SMS;
  }

  export namespace CardTokenization2faConfig {
    /**
     * Email branding and sender settings for card-tokenization authentication
     * messages. Invalid or unverified sender identities can cause delivery to fail.
     */
    export interface Email {
      /**
       * Plain-text message content. Lightspark inserts the authentication code into a
       * controlled text and HTML template; arbitrary HTML and template variables are not
       * supported.
       */
      bodyText?: string;

      /**
       * Sender address for card-tokenization authentication emails.
       */
      fromAddress?: string;

      /**
       * Sender display name.
       */
      fromName?: string;

      /**
       * Reply-to address for card-tokenization authentication emails.
       */
      replyToAddress?: string;

      /**
       * Subject for the authentication email.
       */
      subject?: string;
    }

    /**
     * SMS settings for card-tokenization authentication messages delivered through a
     * Lightspark-managed Twilio sender.
     */
    export interface SMS {
      /**
       * Plain-text fallback message used when Twilio Verify is unavailable for the
       * authentication code. Lightspark appends the code to this text.
       */
      bodyText?: string;

      /**
       * Twilio Verify template SID to use for this platform. An invalid or unavailable
       * template can cause delivery to fail.
       */
      templateSid?: string;
    }
  }

  /**
   * A platform-configured fee collected by Grid and settled to the platform internal
   * account. There can be at most one fee config for a given fee type and source
   * currency pair. The fee will apply to all transactions of the fee type that
   * originate in the source currency.
   */
  export interface FeeConfig {
    /**
     * The kind of activity this fee applies to.
     *
     * - `CROSS_CURRENCY_TRANSACTION` — fee charged on a cross-currency Grid
     *   transaction (source currency differs from destination currency).
     */
    feeType: 'CROSS_CURRENCY_TRANSACTION';

    /**
     * Fixed fee charged per transaction.
     */
    fixedFee: FeeConfig.FixedFee;

    /**
     * Currency code of the sending side this fee applies to. Only `USD` is accepted
     * today; other currencies return a `NOT_IMPLEMENTED` error.
     */
    sourceCurrency: string;

    /**
     * Variable fee in basis points (1 bps = 0.01%) to apply to a transaction's
     * source-currency amount.
     */
    variableFeeBps: number;
  }

  export namespace FeeConfig {
    /**
     * Fixed fee charged per transaction.
     */
    export interface FixedFee {
      /**
       * Fee amount in the smallest unit of the fixed fee's `currency` (e.g., cents for
       * USD).
       */
      amount: number;

      /**
       * Three-letter currency code (ISO 4217) the fixed fee is denominated in. Some
       * cryptocurrencies may use their own ticker symbols (e.g. "BTC" for Bitcoin,
       * "USDC" for USDC, etc.)
       */
      currency: string;
    }
  }
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
  /**
   * Update platform-level card settings. Fields omitted from the nested object are
   * left unchanged. For either spending limit, supply null to clear the platform cap
   * or a positive integer to set it. Omit this field at the top level to leave all
   * card settings unchanged.
   */
  cardConfigs?: ConfigUpdateParams.CardConfigs;

  /**
   * Update card-tokenization authentication branding and delivery settings. Fields
   * omitted from the nested object are left unchanged. Changes apply to subsequent
   * delivery attempts.
   */
  cardTokenization2faConfig?: ConfigUpdateParams.CardTokenization2faConfig;

  /**
   * Update or create the embedded-wallet configuration for this platform. Fields
   * omitted from the nested object are left unchanged. Omit this field at the top
   * level to leave the embedded-wallet configuration unchanged entirely.
   */
  embeddedWalletConfig?: EmbeddedWalletConfig;

  /**
   * Merge-by-key upsert of platform fee configs, keyed by
   * `(feeType, sourceCurrency)`. Setting variable and fixed fees to 0 for an
   * existing fee config deactivates it. Only `sourceCurrency: USD` is accepted
   * today. Omit this field to leave fee configs unchanged.
   */
  feeConfigs?: Array<ConfigUpdateParams.FeeConfig>;

  supportedCurrencies?: Array<PlatformCurrencyConfig>;

  umaDomain?: string;

  webhookEndpoint?: string;
}

export namespace ConfigUpdateParams {
  /**
   * Update platform-level card settings. Fields omitted from the nested object are
   * left unchanged. For either spending limit, supply null to clear the platform cap
   * or a positive integer to set it. Omit this field at the top level to leave all
   * card settings unchanged.
   */
  export interface CardConfigs {
    /**
     * Platform-level cap on cumulative new spend during one UTC calendar day for every
     * card whose authorization decisions are made by Grid. The value is interpreted in
     * the smallest unit of each card's currency. Grid enforces the lower of this cap
     * and the card's configured `maxSpendPerDay`; null means no platform-level daily
     * cap. The window resets at 00:00 UTC. Refunds, reversals, and authorization
     * expiries do not restore capacity during the day. The cap applies to existing
     * cards and cards issued later. Provider-decided card programs are unaffected.
     */
    maxSpendPerDay?: number | null;

    /**
     * Platform-level cap on a single transaction for every card whose authorization
     * decisions are made by Grid. The value is interpreted in the smallest unit of
     * each card's currency. Grid enforces the lower of this cap and the card's
     * configured `maxSpendPerTransaction`; null means no platform-level cap. The cap
     * applies to existing cards and to cards issued later. Provider-decided card
     * programs are unaffected.
     */
    maxSpendPerTransaction?: number | null;
  }

  /**
   * Update card-tokenization authentication branding and delivery settings. Fields
   * omitted from the nested object are left unchanged. Changes apply to subsequent
   * delivery attempts.
   */
  export interface CardTokenization2faConfig {
    /**
     * Platform name displayed in authentication messages.
     */
    displayName?: string;

    /**
     * Email branding and sender settings for card-tokenization authentication
     * messages. Invalid or unverified sender identities can cause delivery to fail.
     */
    email?: CardTokenization2faConfig.Email;

    /**
     * HTTPS URL of the logo displayed in email messages.
     */
    logoUrl?: string;

    /**
     * SMS settings for card-tokenization authentication messages delivered through a
     * Lightspark-managed Twilio sender.
     */
    sms?: CardTokenization2faConfig.SMS;
  }

  export namespace CardTokenization2faConfig {
    /**
     * Email branding and sender settings for card-tokenization authentication
     * messages. Invalid or unverified sender identities can cause delivery to fail.
     */
    export interface Email {
      /**
       * Plain-text message content. Lightspark inserts the authentication code into a
       * controlled text and HTML template; arbitrary HTML and template variables are not
       * supported.
       */
      bodyText?: string;

      /**
       * Sender address for card-tokenization authentication emails.
       */
      fromAddress?: string;

      /**
       * Sender display name.
       */
      fromName?: string;

      /**
       * Reply-to address for card-tokenization authentication emails.
       */
      replyToAddress?: string;

      /**
       * Subject for the authentication email.
       */
      subject?: string;
    }

    /**
     * SMS settings for card-tokenization authentication messages delivered through a
     * Lightspark-managed Twilio sender.
     */
    export interface SMS {
      /**
       * Plain-text fallback message used when Twilio Verify is unavailable for the
       * authentication code. Lightspark appends the code to this text.
       */
      bodyText?: string;

      /**
       * Twilio Verify template SID to use for this platform. An invalid or unavailable
       * template can cause delivery to fail.
       */
      templateSid?: string;
    }
  }

  /**
   * A platform-configured fee collected by Grid and settled to the platform internal
   * account. There can be at most one fee config for a given fee type and source
   * currency pair. The fee will apply to all transactions of the fee type that
   * originate in the source currency.
   */
  export interface FeeConfig {
    /**
     * The kind of activity this fee applies to.
     *
     * - `CROSS_CURRENCY_TRANSACTION` — fee charged on a cross-currency Grid
     *   transaction (source currency differs from destination currency).
     */
    feeType: 'CROSS_CURRENCY_TRANSACTION';

    /**
     * Fixed fee charged per transaction.
     */
    fixedFee: FeeConfig.FixedFee;

    /**
     * Currency code of the sending side this fee applies to. Only `USD` is accepted
     * today; other currencies return a `NOT_IMPLEMENTED` error.
     */
    sourceCurrency: string;

    /**
     * Variable fee in basis points (1 bps = 0.01%) to apply to a transaction's
     * source-currency amount.
     */
    variableFeeBps: number;
  }

  export namespace FeeConfig {
    /**
     * Fixed fee charged per transaction.
     */
    export interface FixedFee {
      /**
       * Fee amount in the smallest unit of the fixed fee's `currency` (e.g., cents for
       * USD).
       */
      amount: number;

      /**
       * Three-letter currency code (ISO 4217) the fixed fee is denominated in. Some
       * cryptocurrencies may use their own ticker symbols (e.g. "BTC" for Bitcoin,
       * "USDC" for USDC, etc.)
       */
      currency: string;
    }
  }
}

export declare namespace Config {
  export {
    type CustomerInfoFieldName as CustomerInfoFieldName,
    type EmbeddedWalletConfig as EmbeddedWalletConfig,
    type PlatformConfig as PlatformConfig,
    type PlatformConfigUpdateRequest as PlatformConfigUpdateRequest,
    type PlatformCurrencyConfig as PlatformCurrencyConfig,
    type ConfigUpdateParams as ConfigUpdateParams,
  };
}
