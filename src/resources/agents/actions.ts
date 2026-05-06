// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as QuotesAPI from '../quotes';
import * as Shared from '../shared';
import * as TransferInAPI from '../transfer-in';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

/**
 * Endpoints for creating and managing agents (experimental), called by the partner's backend using platform credentials. Covers the full agent lifecycle: creation, policy configuration, pausing, deletion, the device code installation flow, and approving or rejecting transactions initiated by agents.
 */
export class Actions extends APIResource {
  /**
   * Approve a pending agent action, allowing Grid to proceed with execution. The
   * action must have status `PENDING_APPROVAL`. Once approved, Grid executes the
   * underlying operation (quote execution or transfer) and the action transitions to
   * `APPROVED`. For `EXECUTE_QUOTE` actions, note that the underlying quote may have
   * expired between submission and approval — in that case the action will
   * transition to `FAILED` instead. This endpoint is called by the platform's
   * backend using platform credentials, not by the agent itself.
   *
   * @example
   * ```ts
   * const response = await client.agents.actions.approve(
   *   'actionId',
   *   { agentId: 'agentId' },
   * );
   * ```
   */
  approve(
    actionID: string,
    params: ActionApproveParams,
    options?: RequestOptions,
  ): APIPromise<ActionApproveResponse> {
    const { agentId } = params;
    return this._client.post(path`/agents/${agentId}/actions/${actionID}/approve`, options);
  }

  /**
   * Reject a pending agent action, preventing execution. The action must have status
   * `PENDING_APPROVAL`. Once rejected, the action transitions to `REJECTED` and the
   * underlying operation is not executed. This endpoint is called by the platform's
   * backend using platform credentials, not by the agent itself.
   *
   * @example
   * ```ts
   * const response = await client.agents.actions.reject(
   *   'actionId',
   *   { agentId: 'agentId' },
   * );
   * ```
   */
  reject(
    actionID: string,
    params: ActionRejectParams,
    options?: RequestOptions,
  ): APIPromise<ActionRejectResponse> {
    const { agentId, ...body } = params;
    return this._client.post(path`/agents/${agentId}/actions/${actionID}/reject`, { body, ...options });
  }
}

/**
 * An action submitted by an agent that may require platform approval before
 * execution. All agent-initiated operations (quote execution, transfers) are
 * represented as AgentActions, giving the platform a consistent object to approve,
 * reject, and audit regardless of the underlying operation type.
 */
export interface ActionApproveResponse {
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
export interface ActionRejectResponse {
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

export interface ActionApproveParams {
  /**
   * System-generated unique agent identifier
   */
  agentId: string;
}

export interface ActionRejectParams {
  /**
   * Path param: System-generated unique agent identifier
   */
  agentId: string;

  /**
   * Body param: Optional human-readable reason for the rejection, stored on the
   * action and visible to the platform.
   */
  reason?: string;
}

export declare namespace Actions {
  export {
    type ActionApproveResponse as ActionApproveResponse,
    type ActionRejectResponse as ActionRejectResponse,
    type ActionApproveParams as ActionApproveParams,
    type ActionRejectParams as ActionRejectParams,
  };
}
