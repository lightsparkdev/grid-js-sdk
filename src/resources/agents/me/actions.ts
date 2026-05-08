// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as QuotesAPI from '../../quotes';
import * as Shared from '../../shared';
import * as TransferInAPI from '../../transfer-in';
import { APIPromise } from '../../../core/api-promise';
import { DefaultPagination, type DefaultPaginationParams, PagePromise } from '../../../core/pagination';
import { RequestOptions } from '../../../internal/request-options';
import { path } from '../../../internal/utils/path';

/**
 * Endpoints called by the agent itself using its own credentials (obtained via device code redemption). Scoped to the agent's associated customer — all requests automatically operate on behalf of that customer and are subject to the agent's policy. When an action requires approval, the resulting transaction enters a pending state and must be approved by the platform via `POST /transactions/{transactionId}/approve`.
 */
export class Actions extends APIResource {
  /**
   * Retrieve a specific action submitted by the authenticated agent. Poll this
   * endpoint after submitting an action that requires approval to check whether it
   * has been approved, rejected, or has failed.
   *
   * @example
   * ```ts
   * const action = await client.agents.me.actions.retrieve(
   *   'actionId',
   * );
   * ```
   */
  retrieve(actionID: string, options?: RequestOptions): APIPromise<ActionRetrieveResponse> {
    return this._client.get(path`/agents/me/actions/${actionID}`, options);
  }

  /**
   * Retrieve a paginated list of actions submitted by the authenticated agent. Use
   * this to poll for approval decisions after submitting an action that requires
   * approval.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const actionListResponse of client.agents.me.actions.list()) {
   *   // ...
   * }
   * ```
   */
  list(
    query: ActionListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<ActionListResponsesDefaultPagination, ActionListResponse> {
    return this._client.getAPIList('/agents/me/actions', DefaultPagination<ActionListResponse>, {
      query,
      ...options,
    });
  }
}

export type ActionListResponsesDefaultPagination = DefaultPagination<ActionListResponse>;

/**
 * An action submitted by an agent that may require platform approval before
 * execution. All agent-initiated operations (quote execution, transfers) are
 * represented as AgentActions, giving the platform a consistent object to approve,
 * reject, and audit regardless of the underlying operation type.
 */
export interface ActionRetrieveResponse {
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
export interface ActionListResponse {
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

export interface ActionListParams extends DefaultPaginationParams {
  /**
   * Maximum number of results to return (default 20, max 100)
   */
  limit?: number;

  /**
   * Filter by action status
   */
  status?: 'PENDING_APPROVAL' | 'APPROVED' | 'REJECTED' | 'FAILED';
}

export declare namespace Actions {
  export {
    type ActionRetrieveResponse as ActionRetrieveResponse,
    type ActionListResponse as ActionListResponse,
    type ActionListResponsesDefaultPagination as ActionListResponsesDefaultPagination,
    type ActionListParams as ActionListParams,
  };
}
