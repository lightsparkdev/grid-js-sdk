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
   *     accountId:
   *       'ExternalAccount:a12dcbd6-dced-4ec4-b756-3c3a9ea3d123',
   *     currency: 'EUR',
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

  /**
   * In the case where a customer is debited but the Lightning payment fails to
   * complete, integrators can retry the payment using this endpoint.
   *
   * Payments retried with this endpoint will debit from the sender and deliver to
   * the recipient the same amount as the original quote. As the Grid API does not
   * persist customer PII, retries need to start with a lookup request to retrieve
   * the original quote's recipient counter party data requirements then pass that
   * sender information in the request body. Before calling this endpoint, you should
   * reach out to the Lightspark team to investigate the underlying issue. As part of
   * resolution, they'll update the transaction to the appropriate state. The quote /
   * transaction to retry must be in a `FAILED` or `REFUNDED` state.
   *
   * @example
   * ```ts
   * const quote = await client.quotes.retry('quoteId', {
   *   lookupId: 'Lookup:019542f5-b3e7-1d02-0000-000000000009',
   * });
   * ```
   */
  retry(quoteID: string, body: QuoteRetryParams, options?: RequestOptions): APIPromise<Quote> {
    return this._client.post(path`/quotes/${quoteID}/retry`, { body, ...options });
  }
}

export type QuotesDefaultPagination = DefaultPagination<Quote>;

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

export interface PaymentAccountOrWalletInfo {
  /**
   * Type of account or wallet information
   */
  accountType:
    | 'CLABE'
    | 'US_ACCOUNT'
    | 'PIX'
    | 'IBAN'
    | 'FBO'
    | 'UPI'
    | 'NGN_ACCOUNT'
    | 'SPARK_WALLET'
    | 'LIGHTNING'
    | 'SOLANA_WALLET'
    | 'TRON_WALLET'
    | 'POLYGON_WALLET'
    | 'BASE_WALLET';
}

export interface PaymentInstructions {
  accountOrWalletInfo:
    | PaymentInstructions.PaymentClabeAccountInfo
    | PaymentInstructions.PaymentUsAccountInfo
    | ExternalAccountsAPI.PixAccountInfo
    | PaymentInstructions.PaymentIbanAccountInfo
    | PaymentInstructions.PaymentFboAccountInfo
    | ExternalAccountsAPI.UpiAccountInfo
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
}

export namespace PaymentInstructions {
  export interface PaymentClabeAccountInfo extends ExternalAccountsAPI.ClabeAccountInfo {
    /**
     * Unique reference code that must be included with the payment to properly credit
     * it
     */
    reference: string;
  }

  export interface PaymentUsAccountInfo extends ExternalAccountsAPI.UsAccountInfo {
    /**
     * Unique reference code that must be included with the payment to properly credit
     * it
     */
    reference: string;
  }

  export interface PaymentIbanAccountInfo extends ExternalAccountsAPI.IbanAccountInfo {
    /**
     * Unique reference code that must be included with the payment to properly credit
     * it
     */
    reference: string;
  }

  export interface PaymentFboAccountInfo {
    accountType: 'FBO';

    /**
     * The HTTP method to use for confirming the payment
     */
    paymentMethod: 'POST' | 'GET';

    /**
     * The URL to make a request to in order to confirm payment
     */
    paymentUrl: string;
  }

  export interface PaymentSparkWalletInfo extends ExternalAccountsAPI.SparkWalletInfo {
    /**
     * Type of asset
     */
    assetType: 'BTC' | 'USDB';

    /**
     * Invoice for the payment
     */
    invoice?: string;
  }

  export interface PaymentLightningInvoiceInfo
    extends Omit<QuotesAPI.PaymentAccountOrWalletInfo, 'accountType'> {
    accountType: 'LIGHTNING';

    /**
     * Invoice for the payment
     */
    invoice: string;
  }

  export interface PaymentSolanaWalletInfo extends ExternalAccountsAPI.SolanaWalletInfo {
    /**
     * Type of asset
     */
    assetType?: 'USDC' | 'USDT';
  }

  export interface PaymentTronWalletInfo extends ExternalAccountsAPI.TronWalletInfo {
    /**
     * Type of asset
     */
    assetType?: 'USDT';
  }

  export interface PaymentPolygonWalletInfo extends ExternalAccountsAPI.PolygonWalletInfo {
    /**
     * Type of asset
     */
    assetType?: 'USDC';
  }

  export interface PaymentBaseWalletInfo extends ExternalAccountsAPI.BaseWalletInfo {
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
  destination: Quote.QuoteAccountDestination | Quote.QuoteUmaAddressDestination;

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
  source: QuoteSource;

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

export namespace Quote {
  /**
   * Destination account details
   */
  export interface QuoteAccountDestination {
    /**
     * Destination account identifier
     */
    accountId: string;

    /**
     * Destination type identifier
     */
    destinationType: 'ACCOUNT';

    /**
     * Currency code for the destination account
     */
    currency?: string;
  }

  /**
   * UMA address destination details
   */
  export interface QuoteUmaAddressDestination {
    /**
     * Destination type identifier
     */
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
     * Currency code for the destination
     */
    currency?: string;
  }
}

/**
 * Source account details
 */
export type QuoteSource = QuoteSource.QuoteAccountSource | QuoteSource.QuoteRealtimeFundingSource;

export namespace QuoteSource {
  /**
   * Source account details
   */
  export interface QuoteAccountSource {
    /**
     * Source account identifier
     */
    accountId: string;

    /**
     * Source type identifier
     */
    sourceType: 'ACCOUNT';

    /**
     * Currency code for the funding source. See
     * [Supported Currencies](https://grid.lightspark.com/platform-overview/core-concepts/currencies-and-rails)
     * for the full list of supported fiat and crypto currencies.
     */
    currency?: string;
  }

  /**
   * Fund the quote using a real-time funding source (RTP, SEPA Instant, Spark,
   * Stables, etc.). This will require manual just-in-time funding using
   * `paymentInstructions` in the response. Because quotes expire quickly, this
   * option is only valid for instant payment methods. Do not try to fund a quote
   * with a non-instant payment method (ACH, etc.).
   */
  export interface QuoteRealtimeFundingSource {
    /**
     * Currency code for the funding source. See
     * [Supported Currencies](https://grid.lightspark.com/platform-overview/core-concepts/currencies-and-rails)
     * for the full list of supported fiat and crypto currencies.
     */
    currency: string;

    /**
     * Source customer ID. If this transaction is being initiated on behalf of a
     * customer, this is required. If customerId is not provided, the quote will be
     * created on behalf of the platform itself.
     */
    customerId: string;

    /**
     * Source type identifier
     */
    sourceType: 'REALTIME_FUNDING';
  }
}

export interface QuoteCreateParams {
  /**
   * Destination account details
   */
  destination:
    | QuoteCreateParams.Account
    | QuoteCreateParams.UmaAddress
    | QuoteCreateParams.ExternalAccountDetails;

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
  source: QuoteSource;

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

export namespace QuoteCreateParams {
  /**
   * Destination account details
   */
  export interface Account {
    /**
     * Destination account identifier
     */
    accountId: string;

    /**
     * Currency code for the destination account. See
     * [Supported Currencies](https://grid.lightspark.com/platform-overview/core-concepts/currencies-and-rails)
     * for the full list of supported fiat and crypto currencies.
     */
    currency: string;
  }

  /**
   * UMA address destination details
   */
  export interface UmaAddress {
    /**
     * Currency code for the destination. See
     * [Supported Currencies](https://grid.lightspark.com/platform-overview/core-concepts/currencies-and-rails)
     * for the full list of supported fiat and crypto currencies.
     */
    currency: string;

    /**
     * UMA address of the recipient
     */
    umaAddress: string;
  }

  /**
   * A convenient destination option which adds the external account and creates the
   * quote in one step rather than first needing to call /external-accounts to add
   * the account. Useful for one-off payments to some destination. See the external
   * accounts endpoints for test values in sandbox mode.
   */
  export interface ExternalAccountDetails {
    externalAccountDetails: ExternalAccountsAPI.ExternalAccountCreate;
  }
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

export interface QuoteRetryParams {
  /**
   * Unique identifier for the prior receiver uma address lookup request.
   */
  lookupId: string;

  /**
   * Key-value pairs of information about the sender which was requested by the
   * counterparty (recipient) institution. Any fields specified in
   * `requiredPayerDataFields` from the response of the
   * `/receiver/{receiverUmaAddress}` (lookupUma) endpoint MUST be provided here if
   * they were requested. If the counterparty (recipient) institution did not request
   * any information, this field can be omitted.
   */
  senderCustomerInfo?: { [key: string]: unknown };
}

export declare namespace Quotes {
  export {
    type Currency as Currency,
    type OutgoingRateDetails as OutgoingRateDetails,
    type PaymentAccountOrWalletInfo as PaymentAccountOrWalletInfo,
    type PaymentInstructions as PaymentInstructions,
    type Quote as Quote,
    type QuoteSource as QuoteSource,
    type QuotesDefaultPagination as QuotesDefaultPagination,
    type QuoteCreateParams as QuoteCreateParams,
    type QuoteListParams as QuoteListParams,
    type QuoteRetryParams as QuoteRetryParams,
  };
}
