// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as TransferInAPI from './transfer-in';
import { APIPromise } from '../core/api-promise';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';

/**
 * Endpoints for transferring funds between internal and external accounts with the same currency
 */
export class TransferOut extends APIResource {
  /**
   * Transfer funds from an internal account to an external account for a specific
   * customer.
   *
   * @example
   * ```ts
   * const transaction = await client.transferOut.create({
   *   destination: {
   *     accountId:
   *       'ExternalAccount:e85dcbd6-dced-4ec4-b756-3c3a9ea3d965',
   *     paymentRail: 'ACH',
   *   },
   *   source: {
   *     accountId:
   *       'InternalAccount:a12dcbd6-dced-4ec4-b756-3c3a9ea3d123',
   *   },
   *   amount: 12550,
   *   remittanceInformation: '12345',
   * });
   * ```
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
