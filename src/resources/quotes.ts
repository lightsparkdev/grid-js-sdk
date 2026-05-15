// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as ExternalAccountsAPI from './platform/external-accounts';
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
    return this._client.get(path`/quotes/${quoteID}`, options);
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
   * request must include a `Grid-Wallet-Signature` header. The signature is produced
   * by signing the `payloadToSign` value from the quote's
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
    const { 'Grid-Wallet-Signature': gridWalletSignature, 'Idempotency-Key': idempotencyKey } = params ?? {};
    return this._client.post(path`/quotes/${quoteID}/execute`, {
      ...options,
      headers: buildHeaders([
        {
          ...(gridWalletSignature != null ? { 'Grid-Wallet-Signature': gridWalletSignature } : undefined),
          ...(idempotencyKey != null ? { 'Idempotency-Key': idempotencyKey } : undefined),
        },
        options?.headers,
      ]),
    });
  }
}

export type BaseDestination = unknown;

export type BaseQuoteSource = unknown;

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
  accountOrWalletInfo:
    | PaymentInstructions.PaymentUsdAccountInfo
    | PaymentInstructions.PaymentBrlAccountInfo
    | PaymentInstructions.PaymentMxnAccountInfo
    | PaymentInstructions.PaymentDkkAccountInfo
    | PaymentInstructions.PaymentEurAccountInfo
    | ExternalAccountsAPI.InrAccountInfo
    | PaymentInstructions.PaymentNgnAccountInfo
    | PaymentInstructions.PaymentCadAccountInfo
    | PaymentInstructions.PaymentGbpAccountInfo
    | PaymentInstructions.PaymentHkdAccountInfo
    | PaymentInstructions.PaymentIdrAccountInfo
    | PaymentInstructions.PaymentMyrAccountInfo
    | PaymentInstructions.PaymentPhpAccountInfo
    | PaymentInstructions.PaymentSgdAccountInfo
    | PaymentInstructions.PaymentThbAccountInfo
    | PaymentInstructions.PaymentVndAccountInfo
    | PaymentInstructions.PaymentAedAccountInfo
    | PaymentInstructions.PaymentKesAccountInfo
    | PaymentInstructions.PaymentMwkAccountInfo
    | PaymentInstructions.PaymentRwfAccountInfo
    | PaymentInstructions.PaymentTzsAccountInfo
    | PaymentInstructions.PaymentUgxAccountInfo
    | PaymentInstructions.PaymentXofAccountInfo
    | PaymentInstructions.PaymentZarAccountInfo
    | PaymentInstructions.PaymentZmwAccountInfo
    | PaymentInstructions.PaymentBwpAccountInfo
    | PaymentInstructions.PaymentXafAccountInfo
    | PaymentInstructions.PaymentBdtAccountInfo
    | PaymentInstructions.PaymentArsAccountInfo
    | PaymentInstructions.PaymentCopAccountInfo
    | PaymentInstructions.PaymentEgpAccountInfo
    | PaymentInstructions.PaymentGhsAccountInfo
    | PaymentInstructions.PaymentGtqAccountInfo
    | PaymentInstructions.PaymentHtgAccountInfo
    | PaymentInstructions.PaymentJmdAccountInfo
    | PaymentInstructions.PaymentPkrAccountInfo
    | PaymentInstructions.PaymentSlvAccountInfo
    | PaymentInstructions.PaymentSparkWalletInfo
    | PaymentInstructions.PaymentLightningInvoiceInfo
    | PaymentInstructions.PaymentSolanaWalletInfo
    | PaymentInstructions.PaymentTronWalletInfo
    | PaymentInstructions.PaymentPolygonWalletInfo
    | PaymentInstructions.PaymentBaseWalletInfo
    | PaymentInstructions.PaymentEthereumWalletInfo
    | PaymentInstructions.PaymentEmbeddedWalletInfo;

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
  export interface PaymentUsdAccountInfo extends ExternalAccountsAPI.UsdAccountInfo {}

  export interface PaymentBrlAccountInfo {
    /**
     * A PIX QR code payload that can be used to fund the transaction. This can be
     * rendered as a QR code image or pasted into a PIX-compatible banking app.
     */
    qrCode: string;

    accountType?: 'BRL_ACCOUNT';
  }

  export interface PaymentMxnAccountInfo extends ExternalAccountsAPI.MxnAccountInfo {}

  export interface PaymentDkkAccountInfo extends ExternalAccountsAPI.DkkAccountInfo {}

  export interface PaymentEurAccountInfo extends ExternalAccountsAPI.EurAccountInfo {}

  export interface PaymentNgnAccountInfo extends ExternalAccountsAPI.NgnAccountInfo {}

  export interface PaymentCadAccountInfo extends ExternalAccountsAPI.CadAccountInfo {}

  export interface PaymentGbpAccountInfo extends ExternalAccountsAPI.GbpAccountInfo {}

  export interface PaymentHkdAccountInfo extends ExternalAccountsAPI.HkdAccountInfo {}

  export interface PaymentIdrAccountInfo extends ExternalAccountsAPI.IdrAccountInfo {}

  export interface PaymentMyrAccountInfo extends ExternalAccountsAPI.MyrAccountInfo {}

  export interface PaymentPhpAccountInfo extends ExternalAccountsAPI.PhpAccountInfo {}

  export interface PaymentSgdAccountInfo extends ExternalAccountsAPI.SgdAccountInfo {}

  export interface PaymentThbAccountInfo extends ExternalAccountsAPI.ThbAccountInfo {}

  export interface PaymentVndAccountInfo extends ExternalAccountsAPI.VndAccountInfo {}

  export interface PaymentAedAccountInfo extends ExternalAccountsAPI.AedAccountInfo {}

  export interface PaymentKesAccountInfo extends ExternalAccountsAPI.KesAccountInfo {}

  export interface PaymentMwkAccountInfo extends ExternalAccountsAPI.MwkAccountInfo {}

  export interface PaymentRwfAccountInfo extends ExternalAccountsAPI.RwfAccountInfo {}

  export interface PaymentTzsAccountInfo extends ExternalAccountsAPI.TzsAccountInfo {}

  export interface PaymentUgxAccountInfo extends ExternalAccountsAPI.UgxAccountInfo {}

  export interface PaymentXofAccountInfo extends ExternalAccountsAPI.XofAccountInfo {}

  export interface PaymentZarAccountInfo extends ExternalAccountsAPI.ZarAccountInfo {}

  export interface PaymentZmwAccountInfo extends ExternalAccountsAPI.ZmwAccountInfo {}

  export interface PaymentBwpAccountInfo extends ExternalAccountsAPI.BwpAccountInfo {}

  export interface PaymentXafAccountInfo extends ExternalAccountsAPI.XafAccountInfo {}

  export interface PaymentBdtAccountInfo extends ExternalAccountsAPI.BdtAccountInfo {}

  export interface PaymentArsAccountInfo {
    /**
     * The static CVU (Clave Virtual Uniforme) bank account number to pay to.
     */
    accountNumber: string;

    accountType: 'ARS_ACCOUNT';
  }

  export interface PaymentCopAccountInfo {
    /**
     * A payment URL where the customer can complete their COP deposit.
     */
    paymentUrl: string;

    accountType?: 'COP_ACCOUNT';
  }

  export interface PaymentEgpAccountInfo extends ExternalAccountsAPI.EgpAccountInfo {}

  export interface PaymentGhsAccountInfo extends ExternalAccountsAPI.GhsAccountInfo {}

  export interface PaymentGtqAccountInfo extends ExternalAccountsAPI.GtqAccountInfo {}

  export interface PaymentHtgAccountInfo extends ExternalAccountsAPI.HtgAccountInfo {}

  export interface PaymentJmdAccountInfo extends ExternalAccountsAPI.JmdAccountInfo {}

  export interface PaymentPkrAccountInfo extends ExternalAccountsAPI.PkrAccountInfo {}

  export interface PaymentSlvAccountInfo {
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

  export interface PaymentSparkWalletInfo {
    accountType: 'SPARK_WALLET';

    /**
     * Spark wallet address
     */
    address: string;

    /**
     * Type of asset
     */
    assetType: 'BTC' | 'USDB';

    /**
     * Invoice for the payment
     */
    invoice?: string;
  }

  export interface PaymentLightningInvoiceInfo {
    /**
     * Invoice for the payment
     */
    invoice: string;

    accountType?: 'LIGHTNING';
  }

  export interface PaymentSolanaWalletInfo {
    accountType: 'SOLANA_WALLET';

    /**
     * Solana wallet address
     */
    address: string;

    /**
     * Type of asset
     */
    assetType?: 'USDC' | 'USDT';
  }

  export interface PaymentTronWalletInfo {
    accountType: 'TRON_WALLET';

    /**
     * Tron wallet address
     */
    address: string;

    /**
     * Type of asset
     */
    assetType?: 'USDT';
  }

  export interface PaymentPolygonWalletInfo {
    accountType: 'POLYGON_WALLET';

    /**
     * Polygon eth wallet address
     */
    address: string;

    /**
     * Type of asset
     */
    assetType?: 'USDC';
  }

  export interface PaymentBaseWalletInfo {
    accountType: 'BASE_WALLET';

    /**
     * Base eth wallet address
     */
    address: string;

    /**
     * Type of asset
     */
    assetType?: 'USDC';
  }

  export interface PaymentEthereumWalletInfo {
    accountType: 'ETHEREUM_WALLET';

    /**
     * Ethereum L1 wallet address
     */
    address: string;

    /**
     * Type of asset
     */
    assetType?: 'USDC';
  }

  export interface PaymentEmbeddedWalletInfo {
    /**
     * Discriminator value identifying this as Embedded Wallet payment instructions.
     */
    accountType: 'EMBEDDED_WALLET';

    /**
     * JSON-encoded transaction signing payload that must be signed, as-is
     * (byte-for-byte, without re-serialization), with the session private key of a
     * verified authentication credential on the source Embedded Wallet. The resulting
     * signature is base64-encoded and passed as the `Grid-Wallet-Signature` header on
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

  /**
   * Destination account details
   */
  destination: QuoteDestinationOneOf;

  /**
   * Number of sending currency units per receiving currency unit.
   */
  exchangeRate: number;

  /**
   * When this quote expires (typically 1-5 minutes after creation)
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

  /**
   * Source account details
   */
  source: QuoteSourceOneOf;

  /**
   * Current status of the quote
   */
  status: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED' | 'EXPIRED';

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
   * Details about the rate and fees for the transaction.
   */
  rateDetails?: OutgoingRateDetails;
}

/**
 * Destination account details
 */
export type QuoteDestinationOneOf =
  | QuoteDestinationOneOf.AccountDestination
  | QuoteDestinationOneOf.UmaAddressDestination;

export namespace QuoteDestinationOneOf {
  /**
   * Destination account details
   */
  export interface AccountDestination {
    /**
     * Destination account identifier
     */
    accountId: string;

    destinationType: 'ACCOUNT';

    /**
     * The payment rail used for the transfer. Payment rails represent the underlying
     * payment network or system used to move funds between accounts.
     */
    paymentRail?:
      | 'ACH'
      | 'BANK_TRANSFER'
      | 'FAST'
      | 'FASTER_PAYMENTS'
      | 'FEDNOW'
      | 'MOBILE_MONEY'
      | 'PAYNOW'
      | 'PIX'
      | 'RTP'
      | 'SEPA'
      | 'SEPA_INSTANT'
      | 'SPEI'
      | 'UPI'
      | 'WIRE';
  }

  /**
   * UMA address destination details
   */
  export interface UmaAddressDestination {
    destinationType: 'UMA_ADDRESS';

    /**
     * UMA address of the recipient
     */
    umaAddress: string;

    /**
     * Currency code for the destination. See
     * [Supported Currencies](https://grid.lightspark.com/platform-overview/core-concepts/currencies-and-rails)
     * for the full list of supported fiat and crypto currencies.
     */
    currency?: string;
  }
}

/**
 * Source account details
 */
export type QuoteSourceOneOf =
  | QuoteSourceOneOf.AccountQuoteSource
  | QuoteSourceOneOf.RealtimeFundingQuoteSource;

export namespace QuoteSourceOneOf {
  /**
   * Source account details
   */
  export interface AccountQuoteSource {
    /**
     * Source account identifier
     */
    accountId: string;

    sourceType: 'ACCOUNT';

    /**
     * Required when funding from an FBO account to identify the customer on whose
     * behalf the transaction is being initiated. Otherwise, will default to the
     * customerId of the account owner.
     */
    customerId?: string;
  }

  /**
   * Fund the quote using a real-time funding source (RTP, SEPA Instant, Spark,
   * Stables, etc.). This will require manual just-in-time funding using
   * `paymentInstructions` in the response. Because quotes expire quickly, this
   * option is only valid for instant payment methods. Do not try to fund a quote
   * with a non-instant payment method (ACH, etc.).
   */
  export interface RealtimeFundingQuoteSource {
    /**
     * Currency code for the funding source. See
     * [Supported Currencies](https://grid.lightspark.com/platform-overview/core-concepts/currencies-and-rails)
     * for the full list of supported fiat and crypto currencies.
     */
    currency: string;

    sourceType: 'REALTIME_FUNDING';

    /**
     * The crypto network to use for the funding source. Required when `currency` is a
     * stablecoin (e.g. USDC, USDT). Specifies which network the customer will deposit
     * on, so the correct deposit address can be generated. Example values: `SOLANA`,
     * `ETHEREUM`, `BASE`, `POLYGON`, `SPARK`, `LIGHTNING`, `BITCOIN`.
     */
    cryptoNetwork?: string;

    /**
     * Source customer ID. If this transaction is being initiated on behalf of a
     * customer, this is required. If customerId is not provided, the quote will be
     * created on behalf of the platform itself.
     */
    customerId?: string;
  }
}

export interface QuoteCreateParams {
  /**
   * Body param: Destination account details
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
   * Body param: Source account details
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
   * the signature header.
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
    | 'OTHER';

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

export interface QuoteExecuteParams {
  /**
   * Signature over the `payloadToSign` returned in the quote's
   * `paymentInstructions[].accountOrWalletInfo` entry, produced with the session
   * private key of a verified authentication credential on the source Embedded
   * Wallet and base64-encoded. Required when the quote's source is an internal
   * account of type `EMBEDDED_WALLET`; ignored for other source types.
   */
  'Grid-Wallet-Signature'?: string;

  /**
   * A unique identifier for the request. If the same key is sent multiple times, the
   * server will return the same response as the first request.
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
    type QuoteSourceOneOf as QuoteSourceOneOf,
    type QuoteCreateParams as QuoteCreateParams,
    type QuoteExecuteParams as QuoteExecuteParams,
  };
}
