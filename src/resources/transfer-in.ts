// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as TransferInAPI from './transfer-in';
import * as TransactionsAPI from './transactions';
import { APIPromise } from '../core/api-promise';
import { DefaultPagination } from '../core/pagination';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';

export class TransferIn extends APIResource {
  /**
   * Transfer funds from an external account to an internal account for a specific
   * customer. This endpoint should only be used for external account sources with
   * pull functionality (e.g. ACH Pull). Otherwise, use the paymentInstructions on
   * the internal account to deposit funds.
   *
   * @example
   * ```ts
   * const transaction = await client.transferIn.create({
   *   destination: {
   *     accountId:
   *       'InternalAccount:a12dcbd6-dced-4ec4-b756-3c3a9ea3d123',
   *   },
   *   source: {
   *     accountId:
   *       'ExternalAccount:e85dcbd6-dced-4ec4-b756-3c3a9ea3d965',
   *   },
   *   amount: 12550,
   * });
   * ```
   */
  create(params: TransferInCreateParams, options?: RequestOptions): APIPromise<Transaction> {
    const { 'Idempotency-Key': idempotencyKey, ...body } = params;
    return this._client.post('/transfer-in', {
      body,
      ...options,
      headers: buildHeaders([
        { ...(idempotencyKey != null ? { 'Idempotency-Key': idempotencyKey } : undefined) },
        options?.headers,
      ]),
    });
  }
}

export type TransactionsDefaultPagination = DefaultPagination<Transaction>;

export interface BaseTransactionDestination {
  /**
   * Currency code for the destination
   */
  currency?: string;
}

export interface Transaction {
  /**
   * Unique identifier for the transaction
   */
  id: string;

  /**
   * System ID of the customer (sender for outgoing, recipient for incoming)
   */
  customerId: string;

  /**
   * Destination account details
   */
  destination: Transaction.AccountTransactionDestination | Transaction.UmaAddressTransactionDestination;

  /**
   * Platform-specific ID of the customer (sender for outgoing, recipient for
   * incoming)
   */
  platformCustomerId: string;

  /**
   * Status of a payment transaction
   */
  status: TransactionsAPI.TransactionStatus;

  /**
   * Type of transaction (incoming payment or outgoing payment)
   */
  type: TransactionsAPI.TransactionType;

  /**
   * Additional information about the counterparty, if available and relevant to the
   * transaction and platform. Only applicable for transactions to/from UMA
   * addresses.
   */
  counterpartyInformation?: { [key: string]: unknown };

  /**
   * When the transaction was created
   */
  createdAt?: string;

  /**
   * Optional memo or description for the payment
   */
  description?: string;

  /**
   * When the payment was or will be settled
   */
  settledAt?: string;

  /**
   * When the transaction was last updated
   */
  updatedAt?: string;
}

export namespace Transaction {
  /**
   * Destination account details
   */
  export interface AccountTransactionDestination extends TransferInAPI.BaseTransactionDestination {
    /**
     * Destination account identifier
     */
    accountId: string;

    destinationType: 'ACCOUNT';
  }

  /**
   * UMA address destination details
   */
  export interface UmaAddressTransactionDestination extends TransferInAPI.BaseTransactionDestination {
    destinationType: 'UMA_ADDRESS';

    /**
     * UMA address of the recipient
     */
    umaAddress: string;
  }
}

export interface TransferInCreateParams {
  /**
   * Body param: Destination internal account details
   */
  destination: TransferInCreateParams.Destination;

  /**
   * Body param: Source external account details
   */
  source: TransferInCreateParams.Source;

  /**
   * Body param: Amount in the smallest unit of the currency (e.g., cents for
   * USD/EUR, satoshis for BTC)
   */
  amount?: number;

  /**
   * Header param: A unique identifier for the request. If the same key is sent
   * multiple times, the server will return the same response as the first request.
   */
  'Idempotency-Key'?: string;
}

export namespace TransferInCreateParams {
  /**
   * Destination internal account details
   */
  export interface Destination {
    /**
     * Reference to an internal account ID
     */
    accountId: string;
  }

  /**
   * Source external account details
   */
  export interface Source {
    /**
     * Reference to an external account ID
     */
    accountId: string;
  }
}

export declare namespace TransferIn {
  export {
    type BaseTransactionDestination as BaseTransactionDestination,
    type Transaction as Transaction,
    type TransferInCreateParams as TransferInCreateParams,
  };
}
