// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as AgentsAPI from './agents';
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
   * const agentAction = await client.agents.actions.approve(
   *   'actionId',
   *   { agentId: 'agentId' },
   * );
   * ```
   */
  approve(
    actionID: string,
    params: ActionApproveParams,
    options?: RequestOptions,
  ): APIPromise<AgentsAPI.AgentAction> {
    const { agentId } = params;
    return this._client.post(path`/agents/${agentId}/actions/${actionID}/approve`, {
      ...options,
      __security: { basicAuth: true },
    });
  }

  /**
   * Reject a pending agent action, preventing execution. The action must have status
   * `PENDING_APPROVAL`. Once rejected, the action transitions to `REJECTED` and the
   * underlying operation is not executed. This endpoint is called by the platform's
   * backend using platform credentials, not by the agent itself.
   *
   * @example
   * ```ts
   * const agentAction = await client.agents.actions.reject(
   *   'actionId',
   *   { agentId: 'agentId' },
   * );
   * ```
   */
  reject(
    actionID: string,
    params: ActionRejectParams,
    options?: RequestOptions,
  ): APIPromise<AgentsAPI.AgentAction> {
    const { agentId, ...body } = params;
    return this._client.post(path`/agents/${agentId}/actions/${actionID}/reject`, {
      body,
      ...options,
      __security: { basicAuth: true },
    });
  }
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
  export { type ActionApproveParams as ActionApproveParams, type ActionRejectParams as ActionRejectParams };
}
