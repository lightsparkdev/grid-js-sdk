// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as AgentsAPI from '../agents';
import { AgentActionsDefaultPagination } from '../agents';
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
   * const agentAction = await client.agents.me.actions.retrieve(
   *   'actionId',
   * );
   * ```
   */
  retrieve(actionID: string, options?: RequestOptions): APIPromise<AgentsAPI.AgentAction> {
    return this._client.get(path`/agents/me/actions/${actionID}`, {
      ...options,
      __security: { agentAuth: true },
    });
  }

  /**
   * Retrieve a paginated list of actions submitted by the authenticated agent. Use
   * this to poll for approval decisions after submitting an action that requires
   * approval.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const agentAction of client.agents.me.actions.list()) {
   *   // ...
   * }
   * ```
   */
  list(
    query: ActionListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<AgentActionsDefaultPagination, AgentsAPI.AgentAction> {
    return this._client.getAPIList('/agents/me/actions', DefaultPagination<AgentsAPI.AgentAction>, {
      query,
      ...options,
      __security: { agentAuth: true },
    });
  }
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
  export { type ActionListParams as ActionListParams };
}

export { type AgentActionsDefaultPagination };
