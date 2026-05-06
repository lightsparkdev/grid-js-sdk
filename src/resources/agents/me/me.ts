// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as QuotesAPI from '../../quotes';
import * as Shared from '../../shared';
import * as TransferInAPI from '../../transfer-in';
import * as AgentsAPI from '../agents';
import * as InternalAccountsAPI from '../../sandbox/internal-accounts';
import { InternalAccountsDefaultPagination } from '../../sandbox/internal-accounts';
import * as ActionsAPI from './actions';
import {
  ActionListParams,
  ActionListResponse,
  ActionListResponsesDefaultPagination,
  ActionRetrieveResponse,
  Actions,
} from './actions';
import * as ExternalAccountsAPI from './external-accounts';
import { ExternalAccountAddParams, ExternalAccountListParams, ExternalAccounts } from './external-accounts';
import * as MeQuotesAPI from './quotes';
import { QuoteCreateParams, QuoteExecuteParams, QuoteExecuteResponse, Quotes } from './quotes';
import * as TransactionsAPI from './transactions';
import { TransactionListParams, Transactions } from './transactions';
import { APIPromise } from '../../../core/api-promise';
import { DefaultPagination, type DefaultPaginationParams, PagePromise } from '../../../core/pagination';
import { buildHeaders } from '../../../internal/headers';
import { RequestOptions } from '../../../internal/request-options';

/**
 * Endpoints called by the agent itself using its own credentials (obtained via device code redemption). Scoped to the agent's associated customer — all requests automatically operate on behalf of that customer and are subject to the agent's policy. When an action requires approval, the resulting transaction enters a pending state and must be approved by the platform via `POST /transactions/{transactionId}/approve`.
 */
export class Me extends APIResource {
  transactions: TransactionsAPI.Transactions = new TransactionsAPI.Transactions(this._client);
  quotes: MeQuotesAPI.Quotes = new MeQuotesAPI.Quotes(this._client);
  externalAccounts: ExternalAccountsAPI.ExternalAccounts = new ExternalAccountsAPI.ExternalAccounts(
    this._client,
  );
  actions: ActionsAPI.Actions = new ActionsAPI.Actions(this._client);

  /**
   * Retrieve the authenticated agent's own profile, policy, and current usage. This
   * endpoint is called by the agent software itself using its own credentials
   * (obtained via device code redemption) rather than platform credentials.
   *
   * @example
   * ```ts
   * const me = await client.agents.me.retrieve();
   * ```
   */
  retrieve(options?: RequestOptions): APIPromise<MeRetrieveResponse> {
    return this._client.get('/agents/me', options);
  }

  /**
   * Transfer funds from an external account to an internal account for the
   * authenticated agent's customer. Accounts must belong to the agent's customer.
   * Requires the CREATE_TRANSFERS permission in the agent's policy. If the agent's
   * policy requires approval for this amount, the transaction will be created in a
   * pending state and must be approved by the platform via
   * `POST /agents/{agentId}/actions/{actionId}/approve`. This endpoint should only
   * be used for external account sources with pull functionality (e.g. ACH Pull).
   * Otherwise, use the payment instructions on the internal account to deposit
   * funds.
   *
   * @example
   * ```ts
   * const response = await client.agents.me.createTransferIn({
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
  createTransferIn(
    params: MeCreateTransferInParams,
    options?: RequestOptions,
  ): APIPromise<MeCreateTransferInResponse> {
    const { 'Idempotency-Key': idempotencyKey, ...body } = params;
    return this._client.post('/agents/me/transfer-in', {
      body,
      ...options,
      headers: buildHeaders([
        { ...(idempotencyKey != null ? { 'Idempotency-Key': idempotencyKey } : undefined) },
        options?.headers,
      ]),
    });
  }

  /**
   * Transfer funds from an internal account to an external account for the
   * authenticated agent's customer. Accounts must belong to the agent's customer.
   * Requires the CREATE_TRANSFERS permission in the agent's policy. If the agent's
   * policy requires approval for this amount, the transaction will be created in a
   * pending state and must be approved by the platform via
   * `POST /agents/{agentId}/actions/{actionId}/approve`.
   *
   * @example
   * ```ts
   * const response = await client.agents.me.createTransferOut({
   *   destination: {
   *     accountId:
   *       'ExternalAccount:e85dcbd6-dced-4ec4-b756-3c3a9ea3d965',
   *   },
   *   source: {
   *     accountId:
   *       'InternalAccount:a12dcbd6-dced-4ec4-b756-3c3a9ea3d123',
   *   },
   *   amount: 12550,
   * });
   * ```
   */
  createTransferOut(
    params: MeCreateTransferOutParams,
    options?: RequestOptions,
  ): APIPromise<MeCreateTransferOutResponse> {
    const { 'Idempotency-Key': idempotencyKey, ...body } = params;
    return this._client.post('/agents/me/transfer-out', {
      body,
      ...options,
      headers: buildHeaders([
        { ...(idempotencyKey != null ? { 'Idempotency-Key': idempotencyKey } : undefined) },
        options?.headers,
      ]),
    });
  }

  /**
   * Retrieve the internal accounts belonging to the customer this agent operates on
   * behalf of. Use this to discover available source accounts for transfers and
   * quotes, and to verify which accounts are accessible under the agent's
   * `accountRestrictions` policy.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const internalAccount of client.agents.me.listInternalAccounts()) {
   *   // ...
   * }
   * ```
   */
  listInternalAccounts(
    query: MeListInternalAccountsParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<InternalAccountsDefaultPagination, InternalAccountsAPI.InternalAccount> {
    return this._client.getAPIList(
      '/agents/me/internal-accounts',
      DefaultPagination<InternalAccountsAPI.InternalAccount>,
      { query, ...options },
    );
  }
}

/**
 * A programmatic agent with scoped permissions and a spending policy, used to
 * automate payment workflows.
 */
export interface MeRetrieveResponse {
  /**
   * System-generated unique identifier for the agent.
   */
  id: string;

  /**
   * Creation timestamp.
   */
  createdAt: string;

  /**
   * The ID of the customer this agent operates on behalf of.
   */
  customerId: string;

  /**
   * Whether the agent has been installed and connected (i.e., its device code has
   * been redeemed).
   */
  isConnected: boolean;

  /**
   * Whether the agent is currently paused. Paused agents cannot initiate any
   * actions.
   */
  isPaused: boolean;

  /**
   * Human-readable name for the agent.
   */
  name: string;

  /**
   * Policy governing what an agent can do, how it executes actions, and its spending
   * boundaries.
   */
  policy: AgentsAPI.AgentPolicy;

  /**
   * Last update timestamp.
   */
  updatedAt: string;

  /**
   * Real-time counters tracking the agent's spending and transaction activity
   * against its policy limits.
   */
  usage: AgentsAPI.AgentUsage;
}

/**
 * An action submitted by an agent that may require platform approval before
 * execution. All agent-initiated operations (quote execution, transfers) are
 * represented as AgentActions, giving the platform a consistent object to approve,
 * reject, and audit regardless of the underlying operation type.
 */
export interface MeCreateTransferInResponse {
  /**
   * System-generated unique identifier for this action.
   */
  id: string;

  /**
   * The agent that submitted this action.
   */
  agentId: string;

  /**
   * When the action was submitted by the agent.
   */
  createdAt: string;

  /**
   * The customer on whose behalf the action was submitted.
   */
  customerId: string;

  /**
   * Platform-specific ID of the customer.
   */
  platformCustomerId: string;

  /**
   * Status of an agent action.
   *
   * | Status             | Description                                                            |
   * | ------------------ | ---------------------------------------------------------------------- |
   * | `PENDING_APPROVAL` | Submitted by the agent, awaiting platform approval before execution    |
   * | `APPROVED`         | Approved by the platform; execution is in progress or completed        |
   * | `REJECTED`         | Rejected by the platform; the underlying transaction was not executed  |
   * | `FAILED`           | Approved but execution failed (e.g. quote expired, insufficient funds) |
   */
  status: 'PENDING_APPROVAL' | 'APPROVED' | 'REJECTED' | 'FAILED';

  /**
   * The type of action the agent is requesting.
   *
   * | Type            | Description                                              |
   * | --------------- | -------------------------------------------------------- |
   * | `EXECUTE_QUOTE` | Execute a cross-currency quote                           |
   * | `TRANSFER_OUT`  | Transfer from an internal account to an external account |
   * | `TRANSFER_IN`   | Transfer from an external account to an internal account |
   */
  type: 'EXECUTE_QUOTE' | 'TRANSFER_OUT' | 'TRANSFER_IN';

  /**
   * When the action was last updated.
   */
  updatedAt: string;

  /**
   * The quote being executed. Populated for `EXECUTE_QUOTE` actions; absent for
   * transfer actions. Contains the full amount, currency, destination, and rate
   * details needed to present an approval decision to the user.
   */
  quote?: QuotesAPI.Quote;

  /**
   * Human-readable reason provided by the platform when rejecting the action. Only
   * present when status is `REJECTED`.
   */
  rejectionReason?: string;

  /**
   * The resulting transaction, populated once the action has been approved and
   * execution has begun. Absent while the action is `PENDING_APPROVAL` or
   * `REJECTED`.
   */
  transaction?: TransferInAPI.Transaction;

  /**
   * Details of a transfer-type agent action (TRANSFER_OUT or TRANSFER_IN).
   */
  transferDetails?: Shared.AgentTransferDetails;
}

/**
 * An action submitted by an agent that may require platform approval before
 * execution. All agent-initiated operations (quote execution, transfers) are
 * represented as AgentActions, giving the platform a consistent object to approve,
 * reject, and audit regardless of the underlying operation type.
 */
export interface MeCreateTransferOutResponse {
  /**
   * System-generated unique identifier for this action.
   */
  id: string;

  /**
   * The agent that submitted this action.
   */
  agentId: string;

  /**
   * When the action was submitted by the agent.
   */
  createdAt: string;

  /**
   * The customer on whose behalf the action was submitted.
   */
  customerId: string;

  /**
   * Platform-specific ID of the customer.
   */
  platformCustomerId: string;

  /**
   * Status of an agent action.
   *
   * | Status             | Description                                                            |
   * | ------------------ | ---------------------------------------------------------------------- |
   * | `PENDING_APPROVAL` | Submitted by the agent, awaiting platform approval before execution    |
   * | `APPROVED`         | Approved by the platform; execution is in progress or completed        |
   * | `REJECTED`         | Rejected by the platform; the underlying transaction was not executed  |
   * | `FAILED`           | Approved but execution failed (e.g. quote expired, insufficient funds) |
   */
  status: 'PENDING_APPROVAL' | 'APPROVED' | 'REJECTED' | 'FAILED';

  /**
   * The type of action the agent is requesting.
   *
   * | Type            | Description                                              |
   * | --------------- | -------------------------------------------------------- |
   * | `EXECUTE_QUOTE` | Execute a cross-currency quote                           |
   * | `TRANSFER_OUT`  | Transfer from an internal account to an external account |
   * | `TRANSFER_IN`   | Transfer from an external account to an internal account |
   */
  type: 'EXECUTE_QUOTE' | 'TRANSFER_OUT' | 'TRANSFER_IN';

  /**
   * When the action was last updated.
   */
  updatedAt: string;

  /**
   * The quote being executed. Populated for `EXECUTE_QUOTE` actions; absent for
   * transfer actions. Contains the full amount, currency, destination, and rate
   * details needed to present an approval decision to the user.
   */
  quote?: QuotesAPI.Quote;

  /**
   * Human-readable reason provided by the platform when rejecting the action. Only
   * present when status is `REJECTED`.
   */
  rejectionReason?: string;

  /**
   * The resulting transaction, populated once the action has been approved and
   * execution has begun. Absent while the action is `PENDING_APPROVAL` or
   * `REJECTED`.
   */
  transaction?: TransferInAPI.Transaction;

  /**
   * Details of a transfer-type agent action (TRANSFER_OUT or TRANSFER_IN).
   */
  transferDetails?: Shared.AgentTransferDetails;
}

export interface MeCreateTransferInParams {
  /**
   * Body param: Destination internal account details
   */
  destination: TransferInAPI.InternalAccountReference;

  /**
   * Body param: Source external account details
   */
  source: TransferInAPI.ExternalAccountReference;

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

export interface MeCreateTransferOutParams {
  /**
   * Body param: Destination external account details
   */
  destination: TransferInAPI.ExternalAccountReference;

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
   * Header param: A unique identifier for the request. If the same key is sent
   * multiple times, the server will return the same response as the first request.
   */
  'Idempotency-Key'?: string;
}

export interface MeListInternalAccountsParams extends DefaultPaginationParams {
  /**
   * Filter by currency code
   */
  currency?: string;

  /**
   * Maximum number of results to return (default 20, max 100)
   */
  limit?: number;

  /**
   * Filter by internal account type. Use `EMBEDDED_WALLET` to find the
   * self-custodial wallet provisioned for the customer, or `INTERNAL_FIAT` /
   * `INTERNAL_CRYPTO` for platform-managed holding accounts.
   */
  type?: 'INTERNAL_FIAT' | 'INTERNAL_CRYPTO' | 'EMBEDDED_WALLET';
}

Me.Transactions = Transactions;
Me.Quotes = Quotes;
Me.ExternalAccounts = ExternalAccounts;
Me.Actions = Actions;

export declare namespace Me {
  export {
    type MeRetrieveResponse as MeRetrieveResponse,
    type MeCreateTransferInResponse as MeCreateTransferInResponse,
    type MeCreateTransferOutResponse as MeCreateTransferOutResponse,
    type MeCreateTransferInParams as MeCreateTransferInParams,
    type MeCreateTransferOutParams as MeCreateTransferOutParams,
    type MeListInternalAccountsParams as MeListInternalAccountsParams,
  };

  export { Transactions as Transactions, type TransactionListParams as TransactionListParams };

  export {
    Quotes as Quotes,
    type QuoteExecuteResponse as QuoteExecuteResponse,
    type QuoteCreateParams as QuoteCreateParams,
    type QuoteExecuteParams as QuoteExecuteParams,
  };

  export {
    ExternalAccounts as ExternalAccounts,
    type ExternalAccountListParams as ExternalAccountListParams,
    type ExternalAccountAddParams as ExternalAccountAddParams,
  };

  export {
    Actions as Actions,
    type ActionRetrieveResponse as ActionRetrieveResponse,
    type ActionListResponse as ActionListResponse,
    type ActionListResponsesDefaultPagination as ActionListResponsesDefaultPagination,
    type ActionListParams as ActionListParams,
  };
}

export { type InternalAccountsDefaultPagination };
