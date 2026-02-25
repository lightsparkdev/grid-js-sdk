// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as QuotesAPI from './quotes';
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
    | PaymentInstructions.PaymentUsdAccountInfo
    | PaymentInstructions.PaymentBrlAccountInfo
    | PaymentInstructions.PaymentMxnAccountInfo
    | PaymentInstructions.PaymentDkkAccountInfo
    | PaymentInstructions.PaymentEurAccountInfo
    | PaymentInstructions.PaymentInrAccountInfo
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
  export interface PaymentUsdAccountInfo extends QuotesAPI.BasePaymentAccountInfo {
    /**
     * The account number of the bank
     */
    accountNumber: string;

    accountType: 'USD_ACCOUNT';

    countries: Array<'US'>;

    paymentRails: Array<'ACH' | 'WIRE' | 'RTP' | 'FEDNOW'>;

    /**
     * Unique reference code that must be included with the payment to properly credit
     * it
     */
    reference: string;

    /**
     * The routing number of the bank
     */
    routingNumber: string;
  }

  export interface PaymentBrlAccountInfo extends QuotesAPI.BasePaymentAccountInfo {
    accountType: 'BRL_ACCOUNT';

    countries: Array<'BR'>;

    paymentRails: Array<'PIX'>;

    /**
     * The PIX key of the bank
     */
    pixKey: string;

    /**
     * The type of PIX key of the bank
     */
    pixKeyType: string;

    /**
     * The tax ID of the bank account
     */
    taxId: string;
  }

  export interface PaymentMxnAccountInfo extends QuotesAPI.BasePaymentAccountInfo {
    accountType: 'MXN_ACCOUNT';

    /**
     * The CLABE number of the bank
     */
    clabeNumber: string;

    countries: Array<'MX'>;

    paymentRails: Array<'SPEI'>;

    /**
     * Unique reference code that must be included with the payment to properly credit
     * it
     */
    reference: string;
  }

  export interface PaymentDkkAccountInfo extends QuotesAPI.BasePaymentAccountInfo {
    accountType: 'DKK_ACCOUNT';

    countries: Array<'DK'>;

    /**
     * The IBAN of the bank
     */
    iban: string;

    paymentRails: Array<'SEPA' | 'SEPA_INSTANT'>;

    /**
     * Unique reference code that must be included with the payment to properly credit
     * it
     */
    reference: string;

    /**
     * The SWIFT BIC of the bank
     */
    swiftBic?: string;
  }

  export interface PaymentEurAccountInfo extends QuotesAPI.BasePaymentAccountInfo {
    accountType: 'EUR_ACCOUNT';

    countries: Array<
      | 'AT'
      | 'BE'
      | 'CY'
      | 'DE'
      | 'EE'
      | 'ES'
      | 'FI'
      | 'FR'
      | 'GR'
      | 'HR'
      | 'IE'
      | 'IT'
      | 'LT'
      | 'LU'
      | 'LV'
      | 'MT'
      | 'NL'
      | 'PT'
      | 'SI'
      | 'SK'
    >;

    /**
     * The IBAN of the bank
     */
    iban: string;

    paymentRails: Array<'SEPA' | 'SEPA_INSTANT'>;

    /**
     * Unique reference code that must be included with the payment to properly credit
     * it
     */
    reference: string;

    /**
     * The SWIFT BIC of the bank
     */
    swiftBic?: string;
  }

  export interface PaymentInrAccountInfo extends QuotesAPI.BasePaymentAccountInfo {
    accountType: 'INR_ACCOUNT';

    countries: Array<'IN'>;

    paymentRails: Array<'UPI' | 'IMPS'>;

    /**
     * The VPA of the bank
     */
    vpa: string;
  }

  export interface PaymentNgnAccountInfo {
    /**
     * Nigerian bank account number
     */
    accountNumber: string;

    accountType: 'NGN_ACCOUNT';

    /**
     * Name of the bank
     */
    bankName: string;

    countries: Array<'NG'>;

    paymentRails: Array<'BANK_TRANSFER'>;

    /**
     * Unique reference code that must be included with the payment to properly credit
     * it
     */
    reference: string;
  }

  export interface PaymentCadAccountInfo extends QuotesAPI.BasePaymentAccountInfo {
    /**
     * Bank account number (7-12 digits)
     */
    accountNumber: string;

    accountType: 'CAD_ACCOUNT';

    /**
     * Canadian financial institution number (3 digits)
     */
    bankCode: string;

    /**
     * Transit number identifying the branch (5 digits)
     */
    branchCode: string;

    countries: Array<'CA'>;

    paymentRails: Array<'BANK_TRANSFER'>;

    /**
     * Unique reference code that must be included with the payment to properly credit
     * it
     */
    reference: string;
  }

  export interface PaymentGbpAccountInfo extends QuotesAPI.BasePaymentAccountInfo {
    /**
     * UK bank account number (8 digits)
     */
    accountNumber: string;

    accountType: 'GBP_ACCOUNT';

    countries: Array<'GB'>;

    paymentRails: Array<'FASTER_PAYMENTS'>;

    /**
     * Unique reference code that must be included with the payment to properly credit
     * it
     */
    reference: string;

    /**
     * UK bank sort code (6 digits, may include hyphens)
     */
    sortCode: string;
  }

  export interface PaymentHkdAccountInfo extends QuotesAPI.BasePaymentAccountInfo {
    /**
     * The account number of the bank
     */
    accountNumber: string;

    accountType: 'HKD_ACCOUNT';

    /**
     * The bank name of the bank
     */
    bankName: string;

    countries: Array<'HK'>;

    paymentRails: Array<'BANK_TRANSFER'>;

    /**
     * Unique reference code that must be included with the payment to properly credit
     * it
     */
    reference: string;
  }

  export interface PaymentIdrAccountInfo extends QuotesAPI.BasePaymentAccountInfo {
    /**
     * The account number of the bank
     */
    accountNumber: string;

    accountType: 'IDR_ACCOUNT';

    countries: Array<'ID'>;

    paymentRails: Array<'BANK_TRANSFER'>;

    /**
     * Unique reference code that must be included with the payment to properly credit
     * it
     */
    reference: string;

    /**
     * The sort code of the bank
     */
    sortCode: string;
  }

  export interface PaymentMyrAccountInfo extends QuotesAPI.BasePaymentAccountInfo {
    /**
     * The account number of the bank
     */
    accountNumber: string;

    accountType: 'MYR_ACCOUNT';

    /**
     * The bank name of the bank
     */
    bankName: string;

    countries: Array<'MY'>;

    paymentRails: Array<'BANK_TRANSFER'>;

    /**
     * Unique reference code that must be included with the payment to properly credit
     * it
     */
    reference: string;
  }

  export interface PaymentPhpAccountInfo extends QuotesAPI.BasePaymentAccountInfo {
    /**
     * Bank account number
     */
    accountNumber: string;

    accountType: 'PHP_ACCOUNT';

    /**
     * Name of the beneficiary's bank
     */
    bankName: string;

    countries: Array<'PH'>;

    paymentRails: Array<'BANK_TRANSFER'>;

    /**
     * Unique reference code that must be included with the payment to properly credit
     * it
     */
    reference: string;
  }

  export interface PaymentSgdAccountInfo extends QuotesAPI.BasePaymentAccountInfo {
    /**
     * Bank account number
     */
    accountNumber: string;

    accountType: 'SGD_ACCOUNT';

    /**
     * Name of the beneficiary's bank
     */
    bankName: string;

    countries: Array<'SG'>;

    paymentRails: Array<'PAYNOW' | 'FAST' | 'BANK_TRANSFER'>;

    /**
     * Unique reference code that must be included with the payment to properly credit
     * it
     */
    reference: string;

    /**
     * SWIFT/BIC code (8 or 11 characters)
     */
    swiftCode: string;
  }

  export interface PaymentThbAccountInfo extends QuotesAPI.BasePaymentAccountInfo {
    /**
     * The account number of the bank
     */
    accountNumber: string;

    accountType: 'THB_ACCOUNT';

    /**
     * The bank name of the bank
     */
    bankName: string;

    countries: Array<'TH'>;

    paymentRails: Array<'BANK_TRANSFER'>;

    /**
     * Unique reference code that must be included with the payment to properly credit
     * it
     */
    reference: string;
  }

  export interface PaymentVndAccountInfo extends QuotesAPI.BasePaymentAccountInfo {
    /**
     * The account number of the bank
     */
    accountNumber: string;

    accountType: 'VND_ACCOUNT';

    /**
     * The bank name of the bank
     */
    bankName: string;

    countries: Array<'VN'>;

    paymentRails: Array<'BANK_TRANSFER'>;

    /**
     * Unique reference code that must be included with the payment to properly credit
     * it
     */
    reference: string;
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
   * (eg. cents).
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
   * `/quotes/{quoteId}/execute` endpoint instead. This is false by default. This can
   * only be used for quotes with a `source` which is either an internal account, or
   * has direct pull functionality (e.g. ACH pull with an external account).
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
   * The purpose of the payment. This may be required when sending to certain
   * geographies such as India.
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
