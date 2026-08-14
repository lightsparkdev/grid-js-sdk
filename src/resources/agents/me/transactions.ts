// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as TransactionsAPI from '../../transactions';
import * as TransferInAPI from '../../transfer-in';
import { TransactionsDefaultPagination } from '../../transfer-in';
import { APIPromise } from '../../../core/api-promise';
import { DefaultPagination, type DefaultPaginationParams, PagePromise } from '../../../core/pagination';
import { RequestOptions } from '../../../internal/request-options';
import { path } from '../../../internal/utils/path';

/**
 * Endpoints called by the agent itself using its own credentials (obtained via device code redemption). Scoped to the agent's associated customer — all requests automatically operate on behalf of that customer and are subject to the agent's policy. When an action requires approval, the resulting transaction enters a pending state and must be approved by the platform via `POST /transactions/{transactionId}/approve`.
 */
export class Transactions extends APIResource {
  /**
   * Retrieve a specific transaction belonging to the authenticated agent's customer.
   * Returns 404 if the transaction exists but belongs to a different customer.
   *
   * @example
   * ```ts
   * const transaction =
   *   await client.agents.me.transactions.retrieve(
   *     'transactionId',
   *   );
   * ```
   */
  retrieve(transactionID: string, options?: RequestOptions): APIPromise<TransferInAPI.Transaction> {
    return this._client.get(path`/agents/me/transactions/${transactionID}`, {
      ...options,
      __security: { agentAuth: true },
    });
  }

  /**
   * Retrieve a paginated list of transactions for the authenticated agent's
   * customer. Results are automatically scoped to the agent's associated customer —
   * no customer filter is needed or accepted.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const transaction of client.agents.me.transactions.list()) {
   *   // ...
   * }
   * ```
   */
  list(
    query: TransactionListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<TransactionsDefaultPagination, TransferInAPI.Transaction> {
    return this._client.getAPIList('/agents/me/transactions', DefaultPagination<TransferInAPI.Transaction>, {
      query,
      ...options,
      __security: { agentAuth: true },
    });
  }
}

export interface TransactionListParams extends DefaultPaginationParams {
  /**
   * Filter by account identifier (matches either sender or receiver)
   */
  accountIdentifier?: string;

  /**
   * Filter by end date (inclusive) in ISO 8601 format
   */
  endDate?: string;

  /**
   * Maximum number of results to return (default 20, max 100)
   */
  limit?: number;

  /**
   * Filter by receiver account identifier
   */
  receiverAccountIdentifier?: string;

  /**
   * Filter by reference
   */
  reference?: string;

  /**
   * Filter by sender account identifier
   */
  senderAccountIdentifier?: string;

  /**
   * Order to sort results in
   */
  sortOrder?: 'asc' | 'desc';

  /**
   * Filter by start date (inclusive) in ISO 8601 format
   */
  startDate?: string;

  /**
   * Status of a payment transaction.
   *
   * | Status                  | Description                                                                                                                                                                                                                                                                                                             |
   * | ----------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
   * | `CREATED`               | Initial lookup has been created                                                                                                                                                                                                                                                                                         |
   * | `PENDING`               | Quote has been created                                                                                                                                                                                                                                                                                                  |
   * | `PENDING_AUTHORIZATION` | Awaiting Strong Customer Authentication. Only occurs for customers in a region where SCA is required (e.g. EU). The challenge is carried by the quote, not the transaction — fetch `GET /quotes/{quoteId}` using the transaction's `quoteId`, then authorize its `scaChallenge` via `POST /quotes/{quoteId}/authorize`. |
   * | `PROCESSING`            | Funding has been received and payment initiated                                                                                                                                                                                                                                                                         |
   * | `COMPLETED`             | Cross border payment has been received, converted and payment has been sent to the offramp network                                                                                                                                                                                                                      |
   * | `REJECTED`              | Receiving institution or wallet rejected payment, payment has been refunded                                                                                                                                                                                                                                             |
   * | `FAILED`                | An error occurred during payment                                                                                                                                                                                                                                                                                        |
   * | `REFUNDED`              | Payment was unable to complete and refunded                                                                                                                                                                                                                                                                             |
   * | `EXPIRED`               | Quote has expired                                                                                                                                                                                                                                                                                                       |
   */
  status?: TransactionsAPI.TransactionStatus;

  /**
   * Type of transaction (incoming payment or outgoing payment)
   */
  type?: TransactionsAPI.TransactionType;
}

export declare namespace Transactions {
  export { type TransactionListParams as TransactionListParams };
}

export { type TransactionsDefaultPagination };
