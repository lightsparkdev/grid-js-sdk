// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as ExternalAccountsAPI from './customers/external-accounts';
import { APIPromise } from '../core/api-promise';
import { DefaultPagination, type DefaultPaginationParams, PagePromise } from '../core/pagination';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

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
   * **Sandbox Testing:** When using the `externalAccountDetails` destination type in
   * sandbox mode, use account number patterns ending in specific digits to test
   * different scenarios. These patterns should be used with the primary alias,
   * address, or identifier of whatever account type you're testing. For example, the
   * US account number, a CLABE, an IBAN, a spark wallet address, etc. The failure
   * patterns are:
   *
   * - Account numbers ending in **002**: Insufficient funds (transfer-in will fail)
   * - Account numbers ending in **003**: Account closed/invalid (transfers will
   *   fail)
   * - Account numbers ending in **004**: Transfer rejected (bank rejects the
   *   transfer)
   * - Account numbers ending in **005**: Timeout/delayed failure (stays pending
   *   ~30s, then fails)
   * - Any other account number: Success (transfers complete normally)
   *
   * @example
   * ```ts
   * const quote = await client.quotes.create({
   *   destination: {
   *     accountId:
   *       'ExternalAccount:a12dcbd6-dced-4ec4-b756-3c3a9ea3d123',
   *   },
   *   lockedCurrencyAmount: 10000,
   *   lockedCurrencySide: 'SENDING',
   *   source: {
   *     accountId:
   *       'InternalAccount:e85dcbd6-dced-4ec4-b756-3c3a9ea3d965',
   *   },
   *   description:
   *     'Transfer between accounts, either internal or external.',
   * });
   * ```
   */
  create(body: QuoteCreateParams, options?: RequestOptions): APIPromise<Quote> {
    return this._client.post('/quotes', { body, ...options });
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
   * Retrieve a list of transfer quotes with optional filtering parameters. Returns
   * all quotes that match the specified filters. If no filters are provided, returns
   * all quotes (paginated).
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const quote of client.quotes.list()) {
   *   // ...
   * }
   * ```
   */
  list(
    query: QuoteListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<QuotesDefaultPagination, Quote> {
    return this._client.getAPIList('/quotes', DefaultPagination<Quote>, { query, ...options });
  }

  /**
   * Execute a quote by its ID. This endpoint initiates the transfer between the
   * source and destination accounts.
   *
   * This endpoint can only be used for quotes with a `source` which is either an
   * internal account, or has direct pull functionality (e.g. ACH pull with an
   * external account).
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
  execute(quoteID: string, options?: RequestOptions): APIPromise<Quote> {
    return this._client.post(path`/quotes/${quoteID}/execute`, options);
  }
}

export type QuotesDefaultPagination = DefaultPagination<Quote>;

export type BaseDestination = unknown;

export type BasePaymentAccountInfo = unknown;

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
 * Details about the rate and fees for an outgoing transaction or quote.
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
    | PaymentInstructions.PaymentClabeAccountInfo
    | PaymentInstructions.PaymentUsAccountInfo
    | PaymentInstructions.PixAccountInfo
    | PaymentInstructions.PaymentIbanAccountInfo
    | PaymentInstructions.UpiAccountInfo
    | PaymentInstructions.PaymentSparkWalletInfo
    | PaymentInstructions.PaymentLightningInvoiceInfo
    | PaymentInstructions.PaymentSolanaWalletInfo
    | PaymentInstructions.PaymentTronWalletInfo
    | PaymentInstructions.PaymentPolygonWalletInfo
    | PaymentInstructions.PaymentBaseWalletInfo;

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
  export interface PaymentClabeAccountInfo {
    accountType: 'CLABE';

    /**
     * 18-digit CLABE number (Mexican banking standard)
     */
    clabeNumber: string;

    /**
     * Unique reference code that must be included with the payment to properly credit
     * it
     */
    reference: string;
  }

  export interface PaymentUsAccountInfo {
    /**
     * Type of account (checking or savings)
     */
    accountCategory: 'CHECKING' | 'SAVINGS';

    /**
     * US bank account number
     */
    accountNumber: string;

    accountType: 'US_ACCOUNT';

    /**
     * Unique reference code that must be included with the payment to properly credit
     * it
     */
    reference: string;

    /**
     * ACH routing number (9 digits)
     */
    routingNumber: string;

    /**
     * Name of the bank
     */
    bankName?: string;
  }

  export interface PixAccountInfo {
    accountType: 'PIX';

    /**
     * PIX key for Brazilian instant payments
     */
    pixKey: string;

    /**
     * Type of PIX key being used
     */
    pixKeyType: 'CPF' | 'CNPJ' | 'EMAIL' | 'PHONE' | 'RANDOM';

    /**
     * Tax ID of the account holder
     */
    taxId: string;
  }

  export interface PaymentIbanAccountInfo {
    accountType: 'IBAN';

    /**
     * International Bank Account Number
     */
    iban: string;

    /**
     * Unique reference code that must be included with the payment to properly credit
     * it
     */
    reference: string;

    /**
     * SWIFT/BIC code (8 or 11 characters)
     */
    swiftBic: string;
  }

  export interface UpiAccountInfo {
    accountType: 'UPI';

    /**
     * Virtual Payment Address for UPI payments
     */
    vpa: string;
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
}

export interface Quote {
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
   * (eg. cents).
   */
  feesIncluded: number;

  /**
   * Unique identifier for this quote
   */
  quoteId: string;

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
   * ID of the quote that is being retried
   */
  originalQuoteId?: string;

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
  | QuoteDestinationOneOf.UmaAddressDestination
  | QuoteDestinationOneOf.ExternalAccountDetailsDestination;

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
     * Information about the recipient, as required by the platform in their
     * configuration.
     */
    counterpartyInformation?: { [key: string]: unknown };

    /**
     * Currency code for the destination. See
     * [Supported Currencies](https://grid.lightspark.com/platform-overview/core-concepts/currencies-and-rails)
     * for the full list of supported fiat and crypto currencies.
     */
    currency?: string;
  }

  /**
   * A convenient destination option which adds the external account and creates the
   * quote in one step rather than first needing to call /external-accounts to add
   * the account. Useful for one-off payments to some destination. See the external
   * accounts endpoints for test values in sandbox mode.
   */
  export interface ExternalAccountDetailsDestination {
    destinationType: 'EXTERNAL_ACCOUNT_DETAILS';

    externalAccountDetails: ExternalAccountsAPI.ExternalAccountCreate;
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
     * Source customer ID. If this transaction is being initiated on behalf of a
     * customer, this is required. If customerId is not provided, the quote will be
     * created on behalf of the platform itself.
     */
    customerId?: string;
  }
}

export interface QuoteCreateParams {
  /**
   * Destination account details
   */
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

  /**
   * Source account details
   */
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
   * `/quotes/{quoteId}/execute` endpoint instead. This is false by default.
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
   * Only relevant for UMA destinations. Key-value pairs of information about the
   * sender which was requested by the counterparty (recipient) institution. Any
   * fields specified in `requiredPayerDataFields` from the response of the
   * `/receiver/uma/{receiverUmaAddress}` (lookupUma) endpoint MUST be provided here
   * if they were requested. If the counterparty (recipient) institution did not
   * request any information, this field can be omitted.
   */
  senderCustomerInfo?: { [key: string]: unknown };
}

export interface QuoteListParams extends DefaultPaginationParams {
  /**
   * Filter quotes created after this timestamp (inclusive)
   */
  createdAfter?: string;

  /**
   * Filter quotes created before this timestamp (inclusive)
   */
  createdBefore?: string;

  /**
   * Filter by sending customer ID
   */
  customerId?: string;

  /**
   * Maximum number of results to return (default 20, max 100)
   */
  limit?: number;

  /**
   * Filter by receiving account ID
   */
  receivingAccountId?: string;

  /**
   * Filter by receiving UMA address
   */
  receivingUmaAddress?: string;

  /**
   * Filter by sending account ID
   */
  sendingAccountId?: string;

  /**
   * Filter by sending UMA address
   */
  sendingUmaAddress?: string;

  /**
   * Filter by quote status
   */
  status?: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED' | 'EXPIRED';
}

export declare namespace Quotes {
  export {
    type BaseDestination as BaseDestination,
    type BasePaymentAccountInfo as BasePaymentAccountInfo,
    type BaseQuoteSource as BaseQuoteSource,
    type Currency as Currency,
    type OutgoingRateDetails as OutgoingRateDetails,
    type PaymentInstructions as PaymentInstructions,
    type Quote as Quote,
    type QuoteDestinationOneOf as QuoteDestinationOneOf,
    type QuoteSourceOneOf as QuoteSourceOneOf,
    type QuotesDefaultPagination as QuotesDefaultPagination,
    type QuoteCreateParams as QuoteCreateParams,
    type QuoteListParams as QuoteListParams,
  };
}
