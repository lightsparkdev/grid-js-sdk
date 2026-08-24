// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as TransferInAPI from './transfer-in';
import { APIPromise } from '../core/api-promise';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';

/**
 * Deprecated endpoints for transferring funds between internal and external accounts with the same currency. Use the quote endpoints under Cross-Currency Transfers instead, which now serve same-currency transfers as well.
 */
export class TransferOut extends APIResource {
  /**
   * **Deprecated. Use `POST /quotes` instead.**
   *
   * Same-currency transfers are now served by the quote endpoint. Create a quote
   * with an internal account source and an external account destination and set
   * `immediatelyExecute: true` to move the funds in a single request, exactly as
   * this endpoint does. This endpoint continues to work and its request and response
   * shapes are unchanged.
   *
   * To migrate a request to `POST /quotes`:
   *
   * - add `sourceType: ACCOUNT` to `source` and `destinationType: ACCOUNT` to
   *   `destination`; the account IDs and `destination.paymentRail` are unchanged
   * - rename `amount` to `lockedCurrencyAmount` and add
   *   `lockedCurrencySide: SENDING`
   * - `remittanceInformation` and `purposeOfPayment` carry over unchanged
   * - add `immediatelyExecute: true` to keep the single-request behavior
   *
   * The quote response is a `Quote` rather than a `Transaction`; read
   * `transactionId` from it to track the resulting transaction.
   *
   * Transfer funds from an internal account to an external account for a specific
   * customer.
   *
   * @deprecated
   */
  create(params: TransferOutCreateParams, options?: RequestOptions): APIPromise<TransferInAPI.Transaction> {
    const { 'Idempotency-Key': idempotencyKey, ...body } = params;
    return this._client.post('/transfer-out', {
      body,
      ...options,
      headers: buildHeaders([
        { ...(idempotencyKey != null ? { 'Idempotency-Key': idempotencyKey } : undefined) },
        options?.headers,
      ]),
      __security: { basicAuth: true },
    });
  }
}

export interface TransferOutRequest {
  /**
   * Destination external account details
   */
  destination: TransferOutRequest.Destination;

  /**
   * Source internal account details
   */
  source: TransferInAPI.InternalAccountReference;

  /**
   * Amount in the smallest unit of the currency (e.g., cents for USD/EUR, satoshis
   * for BTC)
   */
  amount?: number;

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
}

export namespace TransferOutRequest {
  /**
   * Destination external account details
   */
  export interface Destination {
    /**
     * Reference to an external account ID
     */
    accountId: string;

    /**
     * The payment rail to use for the transfer. Must be one of the rails supported by
     * the destination account. If not specified, the system will select a default
     * rail.
     */
    paymentRail?:
      | 'ACH'
      | 'ACH_COLOMBIA'
      | 'BANK_TRANSFER'
      | 'BRE_B'
      | 'CIPS'
      | 'FAST'
      | 'FASTER_PAYMENTS'
      | 'FEDNOW'
      | 'INSTAPAY'
      | 'MOBILE_MONEY'
      | 'NEFT'
      | 'PAYNOW'
      | 'PESONET'
      | 'PIX'
      | 'RTGS'
      | 'RTP'
      | 'SEPA'
      | 'SEPA_INSTANT'
      | 'SPEI'
      | 'SWIFT'
      | 'UNIONPAY'
      | 'UPI'
      | 'WIRE';
  }
}

export interface TransferOutCreateParams {
  /**
   * Body param: Destination external account details
   */
  destination: TransferOutCreateParams.Destination;

  /**
   * Body param: Source internal account details
   */
  source: TransferInAPI.InternalAccountReference;

  /**
   * Body param: Amount in the smallest unit of the currency (e.g., cents for
   * USD/EUR, satoshis for BTC)
   */
  amount?: number;

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
   * Header param: A unique identifier for the request. If the same key is sent
   * multiple times, the server will return the same response as the first request.
   */
  'Idempotency-Key'?: string;
}

export namespace TransferOutCreateParams {
  /**
   * Destination external account details
   */
  export interface Destination {
    /**
     * Reference to an external account ID
     */
    accountId: string;

    /**
     * The payment rail to use for the transfer. Must be one of the rails supported by
     * the destination account. If not specified, the system will select a default
     * rail.
     */
    paymentRail?:
      | 'ACH'
      | 'ACH_COLOMBIA'
      | 'BANK_TRANSFER'
      | 'BRE_B'
      | 'CIPS'
      | 'FAST'
      | 'FASTER_PAYMENTS'
      | 'FEDNOW'
      | 'INSTAPAY'
      | 'MOBILE_MONEY'
      | 'NEFT'
      | 'PAYNOW'
      | 'PESONET'
      | 'PIX'
      | 'RTGS'
      | 'RTP'
      | 'SEPA'
      | 'SEPA_INSTANT'
      | 'SPEI'
      | 'SWIFT'
      | 'UNIONPAY'
      | 'UPI'
      | 'WIRE';
  }
}

export declare namespace TransferOut {
  export {
    type TransferOutRequest as TransferOutRequest,
    type TransferOutCreateParams as TransferOutCreateParams,
  };
}
