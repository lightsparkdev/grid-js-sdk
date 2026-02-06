// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as QuotesAPI from './quotes';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class ExchangeRates extends APIResource {
  /**
   * Retrieve cached exchange rates for currency corridors. Returns FX rates that are
   * cached for approximately 5 minutes. Rates include fees specific to your platform
   * for authenticated requests.
   *
   * **Filtering Options:**
   *
   * - Filter by source currency to get all available destination corridors
   * - Filter by specific destination currency or currencies
   * - Provide a sending amount to get calculated receiving amounts
   */
  list(
    query: ExchangeRateListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<ExchangeRateListResponse> {
    return this._client.get('/exchange-rates', { query, ...options });
  }
}

export interface ExchangeRateListResponse {
  /**
   * List of exchange rates matching the filter criteria
   */
  data: Array<ExchangeRateListResponse.Data>;
}

export namespace ExchangeRateListResponse {
  /**
   * Exchange rate information for a currency corridor
   */
  export interface Data {
    destinationCurrency: QuotesAPI.Currency;

    /**
     * The payment rail used for the destination (e.g., UPI, SEPA_INSTANT,
     * MOBILE_MONEY, FASTER_PAYMENTS)
     */
    destinationPaymentRail: string;

    /**
     * Number of destination currency units per sending currency unit
     */
    exchangeRate: number;

    /**
     * Fees associated with an exchange rate
     */
    fees: Data.Fees;

    /**
     * The receiving amount in the smallest unit of the destination currency
     */
    receivingAmount: number;

    sourceCurrency: QuotesAPI.Currency;

    /**
     * Timestamp when this exchange rate was last refreshed
     */
    updatedAt: string;

    /**
     * The sending amount in the smallest unit of the source currency (e.g., cents for
     * USD). Echoed back from the request if provided.
     */
    sendingAmount?: number;

    /**
     * The payment rail used for the source (e.g., ACCOUNT, RTP)
     */
    sourcePaymentRail?: string;
  }

  export namespace Data {
    /**
     * Fees associated with an exchange rate
     */
    export interface Fees {
      /**
       * Fixed fee in the smallest unit of the sending currency (e.g., cents for USD)
       */
      fixed?: number;
    }
  }
}

export interface ExchangeRateListParams {
  /**
   * Filter by destination currency code(s). Can be repeated for multiple currencies
   * (e.g., &destinationCurrency=INR&destinationCurrency=GBP)
   */
  destinationCurrency?: Array<string>;

  /**
   * Sending amount in the smallest unit of the source currency (e.g., cents for
   * USD). If no amount is provided, the default is 10000 in the sending currency
   * smallest unit.
   */
  sendingAmount?: number;

  /**
   * Filter by source currency code (e.g., USD)
   */
  sourceCurrency?: string;
}

export declare namespace ExchangeRates {
  export {
    type ExchangeRateListResponse as ExchangeRateListResponse,
    type ExchangeRateListParams as ExchangeRateListParams,
  };
}
