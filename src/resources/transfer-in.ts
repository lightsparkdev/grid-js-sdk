// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as TransactionsAPI from './transactions';
import { APIPromise } from '../core/api-promise';
import { DefaultPagination } from '../core/pagination';
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
  create(body: TransferInCreateParams, options?: RequestOptions): APIPromise<Transaction> {
    return this._client.post('/transfer-in', { body, ...options });
  }
}

export type TransactionsDefaultPagination = DefaultPagination<Transaction>;

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
  destination: Transaction.AccountDestination | Transaction.UmaAddressDestination;

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
  export interface AccountDestination {
    /**
     * Destination account identifier
     */
    accountId: string;

    /**
     * Currency code for the destination account
     */
    currency: string;

    /**
     * Destination type identifier
     */
    destinationType: 'ACCOUNT';
  }

  /**
   * UMA address destination details
   */
  export interface UmaAddressDestination {
    /**
     * Destination type identifier
     */
    destinationType: 'UMA_ADDRESS';

    /**
     * UMA address of the recipient
     */
    umaAddress: string;

    /**
     * Currency code for the destination
     */
    currency?: string;
  }
}

export interface TransferInCreateParams {
  /**
   * Destination internal account details
   */
  destination: TransferInCreateParams.Destination;

  /**
   * Source external account details
   */
  source: TransferInCreateParams.Source;

  /**
   * Amount in the smallest unit of the currency (e.g., cents for USD/EUR, satoshis
   * for BTC)
   */
  amount?: number;
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
  export { type Transaction as Transaction, type TransferInCreateParams as TransferInCreateParams };
}
