// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

/**
 * Endpoints for creating and confirming quotes for cross-currency transfers
 */
export class Quotes extends APIResource {
  /**
   * Generate a quote for a cross-currency transfer between any combination of
   * accounts and UMA addresses. This endpoint handles currency exchange and provides
   * the necessary instructions to execute the transfer.
   *
   * **Transfer Types Supported:**
   *
   * - **Account to Account**: Transfer between internal/external accounts with
   *   currency exchange.
   * - **Account to UMA**: Transfer from an internal account to an UMA address.
   * - **UMA to Account or UMA to UMA**: This transfer type will only be funded by
   *   payment instructions, not from an internal account.
   *
   * **Key Features:**
   *
   * - **Flexible Amount Locking**: Always specify whether you want to lock the
   *   sending amount or receiving amount
   * - **Currency Exchange**: Handles all cross-currency transfers with real-time
   *   exchange rates
   * - **Payment Instructions**: For UMA or customer ID sources, provides banking
   *   details needed for execution
   *
   * **Important:** If you are transferring funds in the same currency (no exchange
   * required), use the `/transfer-in` or `/transfer-out` endpoints instead.
   *
   * @example
   * ```ts
   * const quote = await client.quotes.create({
   *   destination: {
   *     destinationType: 'ACCOUNT',
   *     accountId:
   *       'ExternalAccount:a12dcbd6-dced-4ec4-b756-3c3a9ea3d123',
   *   },
   *   lockedCurrencyAmount: 10000,
   *   lockedCurrencySide: 'SENDING',
   *   source: {
   *     sourceType: 'ACCOUNT',
   *     accountId:
   *       'InternalAccount:e85dcbd6-dced-4ec4-b756-3c3a9ea3d965',
   *   },
   *   description:
   *     'Transfer between accounts, either internal or external.',
   * });
   * ```
   */
  create(params: QuoteCreateParams, options?: RequestOptions): APIPromise<Quote> {
    const { 'Idempotency-Key': idempotencyKey, ...body } = params;
    return this._client.post('/quotes', {
      body,
      ...options,
      headers: buildHeaders([
        { ...(idempotencyKey != null ? { 'Idempotency-Key': idempotencyKey } : undefined) },
        options?.headers,
      ]),
      __security: { basicAuth: true },
    });
  }

  /**
   * Retrieve a quote by its ID. If the quote has been settled, it will include the
   * transaction ID. This allows clients to track the full lifecycle of a payment
   * from quote creation to settlement.
   *
   * @example
   * ```ts
   * const quote = await client.quotes.retrieve('quoteId');
   * ```
   */
  retrieve(quoteID: string, options?: RequestOptions): APIPromise<Quote> {
    return this._client.get(path`/quotes/${quoteID}`, { ...options, __security: { basicAuth: true } });
  }

  /**
   * Execute a quote by its ID. This endpoint initiates the transfer between the
   * source and destination accounts.
   *
   * This endpoint can only be used for quotes with a `source` which is either an
   * internal account, or has direct pull functionality (e.g. ACH pull with an
   * external account).
   *
   * When the quote's `source` is an internal account of type `EMBEDDED_WALLET`, the
   * request must include a `Grid-Wallet-Signature` header. The header value is the
   * full Grid wallet signature built over the `payloadToSign` value from the quote's
   * `paymentInstructions[].accountOrWalletInfo` entry with the session private key
   * of a verified authentication credential on the source Embedded Wallet.
   *
   * Once executed, the quote cannot be cancelled and the transfer will be processed.
   *
   * @example
   * ```ts
   * const quote = await client.quotes.execute(
   *   'Quote:019542f5-b3e7-1d02-0000-000000000001',
   * );
   * ```
   */
  execute(
    quoteID: string,
    params: QuoteExecuteParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<Quote> {
    const {
      'Grid-Wallet-Signature': gridWalletSignature,
      'Idempotency-Key': idempotencyKey,
      ...body
    } = params ?? {};
    return this._client.post(path`/quotes/${quoteID}/execute`, {
      body,
      ...options,
      headers: buildHeaders([
        {
          ...(gridWalletSignature != null ? { 'Grid-Wallet-Signature': gridWalletSignature } : undefined),
          ...(idempotencyKey != null ? { 'Idempotency-Key': idempotencyKey } : undefined),
        },
        options?.headers,
      ]),
      __security: { basicAuth: true },
    });
  }
}

export interface BaseDestination {
  destinationType: unknown;
}

export interface BaseQuoteSource {
  sourceType: unknown;
}

export interface Currency {
  /**
   * Three-letter currency code (ISO 4217) for fiat currencies. Some cryptocurrencies
   * may use their own ticker symbols (e.g. "BTC" for Bitcoin, "USDC" for USDC, etc.)
   */
  code?: string;

  /**
   * Number of decimal places for the currency
   */
  decimals?: number;

  /**
   * Full name of the currency
   */
  name?: string;

  /**
   * Symbol of the currency
   */
  symbol?: string;
}

/**
 * Details about the rate and fees for an outgoing transaction or quote. Note:
 * `counterpartyFixedFee` is denominated in the receiving currency, so its
 * equivalent value in the sending currency fluctuates with the FX rate. As a
 * result, the total fee on a subsequent quote for the same transfer may differ
 * even if the underlying fee structure is unchanged.
 */
export interface OutgoingRateDetails {
  /**
   * The fixed fee charged by the counterparty institution to execute the quote in
   * the smallest unit of the receiving currency (eg. cents).
   */
  counterpartyFixedFee: number;

  /**
   * The underlying multiplier from mSATs to the receiving currency as returned by
   * the counterparty institution.
   */
  counterpartyMultiplier: number;

  /**
   * The fixed fee charged by the Grid product to execute the quote in the smallest
   * unit of the sending currency (eg. cents).
   */
  gridApiFixedFee: number;

  /**
   * The underlying multiplier from the sending currency to mSATS, including variable
   * fees.
   */
  gridApiMultiplier: number;

  /**
   * The variable fee amount charged by the Grid product to execute the quote in the
   * smallest unit of the sending currency (eg. cents). This is the sending amount
   * times gridApiVariableFeeRate.
   */
  gridApiVariableFeeAmount: number;

  /**
   * The variable fee rate charged by the Grid product to execute the quote as a
   * percentage of the sending currency amount.
   */
  gridApiVariableFeeRate: number;
}

export interface PaymentInstructions {
  /**
   * Required fields depend on the selected paymentRails:
   *
   * - BANK_TRANSFER: bankAccountType, accountNumber
   * - MOBILE_MONEY: phoneNumber
   */
  accountOrWalletInfo:
    | PaymentInstructions.ArsAccount
    | PaymentInstructions.SlvAccount
    | PaymentInstructions.SwiftAccount
    | PaymentInstructions.CnyAccount
    | PaymentInstructions.BitcoinL1DepositAddress
    | PaymentInstructions.EmbeddedWallet;

  /**
   * Additional human-readable instructions for making the payment
   */
  instructionsNotes?: string;

  /**
   * Indicates whether the account is a platform account or a customer account.
   */
  isPlatformAccount?: boolean;
}

export namespace PaymentInstructions {
  export interface ArsAccount {
    /**
     * The static CVU (Clave Virtual Uniforme) bank account number to pay to.
     */
    accountNumber: string;

    accountType: 'ARS_ACCOUNT';
  }

  /**
   * Required fields depend on the selected paymentRails:
   *
   * - BANK_TRANSFER: bankAccountType, accountNumber
   * - MOBILE_MONEY: phoneNumber
   */
  export interface SlvAccount {
    accountType: 'SLV_ACCOUNT';

    paymentRails: Array<'BANK_TRANSFER' | 'MOBILE_MONEY'>;

    /**
     * Unique reference code that must be included with the payment to properly credit
     * it
     */
    reference: string;

    /**
     * The account number of the bank (BANK_TRANSFER only)
     */
    accountNumber?: string;

    /**
     * The bank account type (BANK_TRANSFER only)
     */
    bankAccountType?: 'CHECKING' | 'SAVINGS';

    /**
     * The name of the bank (BANK_TRANSFER only)
     */
    bankName?: string;

    /**
     * The phone number in international format (MOBILE_MONEY only — e.g. Tigo Money)
     */
    phoneNumber?: string;
  }

  export interface SwiftAccount {
    accountType: 'SWIFT_ACCOUNT';

    /**
     * The name of the bank
     */
    bankName: string;

    /**
     * The ISO 3166-1 alpha-2 country code of the bank account
     */
    country: string;

    paymentRails: Array<'SWIFT'>;

    /**
     * Unique reference code that must be included with the payment to properly credit
     * it
     */
    reference: string;

    /**
     * The SWIFT/BIC code of the bank
     */
    swiftCode: string;

    /**
     * The bank account number. Required for most corridors. Use iban instead for
     * IBAN-only corridors (e.g. BR, GB).
     */
    accountNumber?: string;

    /**
     * The IBAN of the bank account. Required for IBAN-only corridors (e.g. BR, GB).
     * Use accountNumber for all other corridors.
     */
    iban?: string;
  }

  /**
   * Required fields depend on the selected paymentRails:
   *
   * - BANK_TRANSFER: accountNumber, bankName. Business-to-business only, so the
   *   beneficiary must be a business.
   * - MOBILE_MONEY: bankName, phoneNumber. Pays an AliPay or WeChat Pay wallet;
   *   bankName selects the wallet.
   */
  export interface CnyAccount {
    accountType: 'CNY_ACCOUNT';

    /**
     * The name of the bank
     */
    bankName: string;

    paymentRails: Array<'BANK_TRANSFER' | 'MOBILE_MONEY'>;

    /**
     * Unique reference code that must be included with the payment to properly credit
     * it
     */
    reference: string;

    /**
     * The account number of the bank
     */
    accountNumber?: string;

    /**
     * The phone number in international format
     */
    phoneNumber?: string;
  }

  export interface BitcoinL1DepositAddress {
    accountType: 'BITCOIN_L1';

    /**
     * On-chain Bitcoin (L1) deposit address to send funds to
     */
    address: string;

    /**
     * The blockchain network for the deposit address.
     */
    network?: 'BITCOIN';
  }

  export interface EmbeddedWallet {
    /**
     * Discriminator value identifying this as Embedded Wallet payment instructions.
     */
    accountType: 'EMBEDDED_WALLET';

    /**
     * JSON-encoded transaction signing payload that must be stamped, as-is
     * (byte-for-byte, without re-serialization), with the session private key of a
     * verified authentication credential on the source Embedded Wallet. The resulting
     * Grid wallet signature is passed as the `Grid-Wallet-Signature` header on
     * `POST /quotes/{quoteId}/execute` to authorize the outbound transfer from the
     * wallet.
     */
    payloadToSign: string;
  }
}

export interface Quote {
  /**
   * Unique identifier for this quote
   */
  id: string;

  /**
   * When this quote was created
   */
  createdAt: string;

  destination: QuoteDestinationOneOf;

  /**
   * Number of sending currency units per receiving currency unit.
   */
  exchangeRate: number;

  /**
   * Absolute UTC timestamp when the rate locked in this quote becomes invalid and
   * the quote can no longer be executed. The window depends on the rail and
   * corridor: instant rails (Lightning, Spark, USDC on Solana/Base/Polygon, RTP,
   * SEPA Instant) typically expire in 1–5 minutes; corridors with longer settlement
   * guarantees may have longer windows. Always rely on this timestamp rather than
   * assuming a fixed window.
   */
  expiresAt: string;

  /**
   * The fees associated with the quote in the smallest unit of the sending currency
   * (eg. cents). Note: this value may fluctuate between quotes — some underlying fee
   * components are defined in the receiving currency, so their equivalent in the
   * sending currency moves with the FX rate. The fees shown here are locked only for
   * the lifetime of this quote.
   */
  feesIncluded: number;

  /**
   * Currency for the receiving amount
   */
  receivingCurrency: Currency;

  /**
   * Currency for the sending amount
   */
  sendingCurrency: Currency;

  source: QuoteSourceOneOf;

  /**
   * Current status of the quote. `PENDING_AUTHORIZATION` occurs only for customers
   * in a region where Strong Customer Authentication is required (e.g. EU): the
   * quote carries an `scaChallenge` that must be authorized before execution, and
   * for realtime-funding sources `paymentInstructions` are withheld until it is
   * satisfied.
   */
  status: 'PENDING' | 'PENDING_AUTHORIZATION' | 'PROCESSING' | 'COMPLETED' | 'FAILED' | 'EXPIRED';

  /**
   * The total amount that will be received in the smallest unit of the receiving
   * currency (eg. cents).
   */
  totalReceivingAmount: number;

  /**
   * The total amount that will be sent in the smallest unit of the sending currency
   * (eg. cents).
   */
  totalSendingAmount: number;

  /**
   * The ID of the transaction created from this quote.
   */
  transactionId: string;

  /**
   * Additional information about the counterparty, if available and required by the
   * platform in their configuration.
   */
  counterpartyInformation?: { [key: string]: unknown };

  /**
   * Payment instructions for executing the payment. This is not required when using
   * an internal account source.
   */
  paymentInstructions?: Array<PaymentInstructions>;

  /**
   * The portion of `feesIncluded` collected by the platform (platform-configured
   * transaction fees), in the smallest unit of the sending currency. 0 when the
   * platform has no applicable fee configured. Already included in `feesIncluded`.
   * May be omitted from payloads produced before platform fees existed.
   */
  platformFeesIncluded?: number;

  /**
   * Details about the rate and fees for the transaction.
   */
  rateDetails?: OutgoingRateDetails;

  /**
   * Present only while `status` is `PENDING_AUTHORIZATION`: the Strong Customer
   * Authentication challenge to satisfy before this quote can be executed (or, for
   * realtime-funding sources, before `paymentInstructions` are issued). Omitted for
   * customers outside SCA-regulated regions (non-EU).
   */
  scaChallenge?: Quote.ScaChallenge;
}

export namespace Quote {
  /**
   * Present only while `status` is `PENDING_AUTHORIZATION`: the Strong Customer
   * Authentication challenge to satisfy before this quote can be executed (or, for
   * realtime-funding sources, before `paymentInstructions` are issued). Omitted for
   * customers outside SCA-regulated regions (non-EU).
   */
  export interface ScaChallenge {
    /**
     * Unique identifier for this challenge. The server resolves the active challenge
     * from the quote or transaction being authorized, so this field need not be
     * supplied back; it is informational (e.g. for logging or correlation).
     */
    id: string;

    /**
     * The factors the customer may use to satisfy this challenge.
     */
    availableFactors: Array<'SMS_OTP' | 'TOTP' | 'PASSKEY'>;

    /**
     * Absolute UTC timestamp after which this challenge can no longer be authorized.
     */
    expiresAt: string;

    /**
     * The factor this challenge was issued for. Defaults to `SMS_OTP`.
     */
    factor: 'SMS_OTP' | 'TOTP' | 'PASSKEY';

    /**
     * The origins the WebAuthn ceremony may run against. Populated for enrollment and
     * login passkey challenges; the origin the assertion is produced against must be
     * one of these and echoed back as `ScaAuthorization.origin`. Per-transaction
     * passkey challenges omit this (they carry `passkeyAssertionOptions` only) — see
     * `ScaAuthorization.origin` for how to source the origin in that case.
     */
    passkeyAllowedOrigins?: Array<string>;

    /**
     * Opaque WebAuthn assertion request options (including the relying-party id,
     * challenge, and allowed credentials), present only when `factor` is `PASSKEY`.
     * Pass to the device's WebAuthn API to produce the assertion submitted back in
     * `ScaAuthorization.passkeyAssertion`.
     */
    passkeyAssertionOptions?: { [key: string]: unknown };

    /**
     * Optional, informational label for what this particular challenge in the sequence
     * authorizes — useful for step UX (e.g. "Authorize the currency conversion" vs
     * "Authorize the payout"). Known values include `CURRENCY_CONVERSION`, `PAYOUT`,
     * and `TRANSFER`, but the set is **non-exhaustive and may grow** — treat
     * unrecognized values as a generic authorization step and do not branch program
     * logic on it. Omitted when steps are not distinguished (e.g. a
     * single-authorization flow).
     */
    purpose?: string | null;
  }
}

export type QuoteDestinationOneOf = unknown;

export interface QuoteRequest {
  destination: QuoteDestinationOneOf;

  /**
   * The amount to send/receive in the smallest unit of the locked currency (eg.
   * cents). See `lockedCurrencySide` for more information.
   */
  lockedCurrencyAmount: number;

  /**
   * The side of the quote which should be locked and specified in the
   * `lockedCurrencyAmount`. For example, if I want to send exactly $5 MXN from my
   * wallet, I would set this to "sending", and the `lockedCurrencyAmount` to 500 (in
   * cents). If I want the receiver to receive exactly $10 USD, I would set this to
   * "receiving" and the `lockedCurrencyAmount` to 10000 (in cents).
   */
  lockedCurrencySide: 'SENDING' | 'RECEIVING';

  source: QuoteSourceOneOf;

  /**
   * Optional description/memo for the transfer
   */
  description?: string;

  /**
   * Whether to immediately execute the quote after creation. If true, the quote will
   * be executed and the transaction will be created at the current exchange rate. It
   * should only be used if you don't want to lock and view rate details before
   * executing the quote. If you are executing a pre-existing quote, use the
   * `/quotes/{quoteId}/execute` endpoint instead. This is false by default. This can
   * only be used for quotes with a `source` which is either an internal account, or
   * has direct pull functionality (e.g. ACH pull with an external account). Not
   * supported when the `source` is an internal account of type `EMBEDDED_WALLET`:
   * those transfers require a `Grid-Wallet-Signature` over the `payloadToSign`
   * returned in the quote response, which is not available in a combined
   * create-and-execute call. Create the quote first with `immediatelyExecute: false`
   * and then call `POST /quotes/{quoteId}/execute` with the `Grid-Wallet-Signature`
   * stamp header.
   */
  immediatelyExecute?: boolean;

  /**
   * Lookup ID from a previous receiver lookup request. If provided, this can make
   * the quote creation more efficient by reusing cached lookup data. NOTE: This is
   * required for UMA destinations due to counterparty institution requirements. See
   * `senderCustomerInfo` for more information.
   */
  lookupId?: string;

  /**
   * Overrides the platform-collected fee for this transaction. When present, it
   * replaces any configured platform-collected fees that would otherwise apply to
   * the transaction. Currently only supported when the quote's source currency is
   * USD; the fixed fee must be denominated in the source currency.
   */
  platformFeeOverride?: QuoteRequest.PlatformFeeOverride;

  /**
   * The purpose of the payment. This may be required when sending to certain
   * geographies (e.g. India).
   */
  purposeOfPayment?:
    | 'GIFT'
    | 'SELF'
    | 'GOODS_OR_SERVICES'
    | 'EDUCATION'
    | 'HEALTH_OR_MEDICAL'
    | 'REAL_ESTATE_PURCHASE'
    | 'TAX_PAYMENT'
    | 'LOAN_PAYMENT'
    | 'UTILITY_BILL'
    | 'DONATION'
    | 'TRAVEL'
    | 'FAMILY_SUPPORT'
    | 'SALARY_PAYMENT'
    | 'OTHER';

  /**
   * Free-form information about the payment that travels with it to the recipient.
   * The field this populates depends on the payment rail: for ACH it populates the
   * Addenda record, for FedNow and RTP it populates the remittanceInformation field,
   * and for wires it populates the OBI (Originator to Beneficiary Information) /
   * beneficiary information.
   */
  remittanceInformation?: string;

  /**
   * Optional preferred factor for a Strong Customer Authentication challenge issued
   * at quote creation. Only relevant for a realtime-funding source in a region where
   * SCA is required (e.g. EU); ignored otherwise. Valid values are `SMS_OTP`
   * (default) and `PASSKEY` — `TOTP` cannot carry the required dynamic linking and
   * is rejected. When the quote is returned in `PENDING_AUTHORIZATION`, authorize it
   * via `POST /quotes/{quoteId}/authorize`.
   */
  scaFactor?: 'SMS_OTP' | 'TOTP' | 'PASSKEY';

  /**
   * Key-value pairs of additional information about the sender which was requested
   * by the destination. This is relevant when the destination requires more sender
   * info than was provided during customer creation. Any fields specified in
   * `requiredPayerDataFields` from the response of the
   * `/receiver/uma/{receiverUmaAddress}` (lookupUma) or
   * `/receiver/external-account/{accountId}` (lookupExternalAccount) endpoints MUST
   * be provided here if they were requested. If the destination did not request any
   * additional information, this field can be omitted.
   */
  senderCustomerInfo?: { [key: string]: unknown };
}

export namespace QuoteRequest {
  /**
   * Overrides the platform-collected fee for this transaction. When present, it
   * replaces any configured platform-collected fees that would otherwise apply to
   * the transaction. Currently only supported when the quote's source currency is
   * USD; the fixed fee must be denominated in the source currency.
   */
  export interface PlatformFeeOverride {
    /**
     * Fixed fee charged for this transaction. Must be denominated in the quote's
     * source currency (USD today).
     */
    platformFixedFee: PlatformFeeOverride.PlatformFixedFee;

    /**
     * Variable fee in basis points (1 bps = 0.01%) to apply to the transaction's
     * source-currency amount.
     */
    platformVariableFeeBps: number;
  }

  export namespace PlatformFeeOverride {
    /**
     * Fixed fee charged for this transaction. Must be denominated in the quote's
     * source currency (USD today).
     */
    export interface PlatformFixedFee {
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

export type QuoteSourceOneOf = unknown;

export interface QuoteCreateParams {
  /**
   * Body param
   */
  destination: QuoteDestinationOneOf;

  /**
   * Body param: The amount to send/receive in the smallest unit of the locked
   * currency (eg. cents). See `lockedCurrencySide` for more information.
   */
  lockedCurrencyAmount: number;

  /**
   * Body param: The side of the quote which should be locked and specified in the
   * `lockedCurrencyAmount`. For example, if I want to send exactly $5 MXN from my
   * wallet, I would set this to "sending", and the `lockedCurrencyAmount` to 500 (in
   * cents). If I want the receiver to receive exactly $10 USD, I would set this to
   * "receiving" and the `lockedCurrencyAmount` to 10000 (in cents).
   */
  lockedCurrencySide: 'SENDING' | 'RECEIVING';

  /**
   * Body param
   */
  source: QuoteSourceOneOf;

  /**
   * Body param: Optional description/memo for the transfer
   */
  description?: string;

  /**
   * Body param: Whether to immediately execute the quote after creation. If true,
   * the quote will be executed and the transaction will be created at the current
   * exchange rate. It should only be used if you don't want to lock and view rate
   * details before executing the quote. If you are executing a pre-existing quote,
   * use the `/quotes/{quoteId}/execute` endpoint instead. This is false by default.
   * This can only be used for quotes with a `source` which is either an internal
   * account, or has direct pull functionality (e.g. ACH pull with an external
   * account). Not supported when the `source` is an internal account of type
   * `EMBEDDED_WALLET`: those transfers require a `Grid-Wallet-Signature` over the
   * `payloadToSign` returned in the quote response, which is not available in a
   * combined create-and-execute call. Create the quote first with
   * `immediatelyExecute: false` and then call `POST /quotes/{quoteId}/execute` with
   * the `Grid-Wallet-Signature` stamp header.
   */
  immediatelyExecute?: boolean;

  /**
   * Body param: Lookup ID from a previous receiver lookup request. If provided, this
   * can make the quote creation more efficient by reusing cached lookup data. NOTE:
   * This is required for UMA destinations due to counterparty institution
   * requirements. See `senderCustomerInfo` for more information.
   */
  lookupId?: string;

  /**
   * Body param: Overrides the platform-collected fee for this transaction. When
   * present, it replaces any configured platform-collected fees that would otherwise
   * apply to the transaction. Currently only supported when the quote's source
   * currency is USD; the fixed fee must be denominated in the source currency.
   */
  platformFeeOverride?: QuoteCreateParams.PlatformFeeOverride;

  /**
   * Body param: The purpose of the payment. This may be required when sending to
   * certain geographies (e.g. India).
   */
  purposeOfPayment?:
    | 'GIFT'
    | 'SELF'
    | 'GOODS_OR_SERVICES'
    | 'EDUCATION'
    | 'HEALTH_OR_MEDICAL'
    | 'REAL_ESTATE_PURCHASE'
    | 'TAX_PAYMENT'
    | 'LOAN_PAYMENT'
    | 'UTILITY_BILL'
    | 'DONATION'
    | 'TRAVEL'
    | 'FAMILY_SUPPORT'
    | 'SALARY_PAYMENT'
    | 'OTHER';

  /**
   * Body param: Free-form information about the payment that travels with it to the
   * recipient. The field this populates depends on the payment rail: for ACH it
   * populates the Addenda record, for FedNow and RTP it populates the
   * remittanceInformation field, and for wires it populates the OBI (Originator to
   * Beneficiary Information) / beneficiary information.
   */
  remittanceInformation?: string;

  /**
   * Body param: Optional preferred factor for a Strong Customer Authentication
   * challenge issued at quote creation. Only relevant for a realtime-funding source
   * in a region where SCA is required (e.g. EU); ignored otherwise. Valid values are
   * `SMS_OTP` (default) and `PASSKEY` — `TOTP` cannot carry the required dynamic
   * linking and is rejected. When the quote is returned in `PENDING_AUTHORIZATION`,
   * authorize it via `POST /quotes/{quoteId}/authorize`.
   */
  scaFactor?: 'SMS_OTP' | 'TOTP' | 'PASSKEY';

  /**
   * Body param: Key-value pairs of additional information about the sender which was
   * requested by the destination. This is relevant when the destination requires
   * more sender info than was provided during customer creation. Any fields
   * specified in `requiredPayerDataFields` from the response of the
   * `/receiver/uma/{receiverUmaAddress}` (lookupUma) or
   * `/receiver/external-account/{accountId}` (lookupExternalAccount) endpoints MUST
   * be provided here if they were requested. If the destination did not request any
   * additional information, this field can be omitted.
   */
  senderCustomerInfo?: { [key: string]: unknown };

  /**
   * Header param: A unique identifier for the request. If the same key is sent
   * multiple times, the server will return the same response as the first request.
   */
  'Idempotency-Key'?: string;
}

export namespace QuoteCreateParams {
  /**
   * Overrides the platform-collected fee for this transaction. When present, it
   * replaces any configured platform-collected fees that would otherwise apply to
   * the transaction. Currently only supported when the quote's source currency is
   * USD; the fixed fee must be denominated in the source currency.
   */
  export interface PlatformFeeOverride {
    /**
     * Fixed fee charged for this transaction. Must be denominated in the quote's
     * source currency (USD today).
     */
    platformFixedFee: PlatformFeeOverride.PlatformFixedFee;

    /**
     * Variable fee in basis points (1 bps = 0.01%) to apply to the transaction's
     * source-currency amount.
     */
    platformVariableFeeBps: number;
  }

  export namespace PlatformFeeOverride {
    /**
     * Fixed fee charged for this transaction. Must be denominated in the quote's
     * source currency (USD today).
     */
    export interface PlatformFixedFee {
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

export interface QuoteExecuteParams {
  /**
   * Body param: Optional preferred factor for the Strong Customer Authentication
   * challenge this call issues. Only relevant for customers in a region where SCA is
   * required (e.g. EU); ignored otherwise. Valid values for a per-transaction
   * challenge are `SMS_OTP` (default) and `PASSKEY` — `TOTP` cannot carry the
   * required dynamic linking and is rejected here. Omit to default to `SMS_OTP`.
   */
  scaFactor?: 'SMS_OTP' | 'TOTP' | 'PASSKEY';

  /**
   * Header param: Full Grid wallet signature over the `payloadToSign` returned in
   * the quote's `paymentInstructions[].accountOrWalletInfo` entry, produced with the
   * session private key of a verified authentication credential on the source
   * Embedded Wallet. Required when the quote's source is an internal account of type
   * `EMBEDDED_WALLET`; ignored for other source types.
   */
  'Grid-Wallet-Signature'?: string;

  /**
   * Header param: A unique identifier for the request. If the same key is sent
   * multiple times, the server will return the same response as the first request.
   */
  'Idempotency-Key'?: string;
}

export declare namespace Quotes {
  export {
    type BaseDestination as BaseDestination,
    type BaseQuoteSource as BaseQuoteSource,
    type Currency as Currency,
    type OutgoingRateDetails as OutgoingRateDetails,
    type PaymentInstructions as PaymentInstructions,
    type Quote as Quote,
    type QuoteDestinationOneOf as QuoteDestinationOneOf,
    type QuoteRequest as QuoteRequest,
    type QuoteSourceOneOf as QuoteSourceOneOf,
    type QuoteCreateParams as QuoteCreateParams,
    type QuoteExecuteParams as QuoteExecuteParams,
  };
}
