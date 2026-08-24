// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as QuotesAPI from '../quotes';
import * as TransferInAPI from '../transfer-in';
import * as ActionsAPI from './actions';
import { ActionApproveParams, ActionRejectParams, Actions } from './actions';
import * as DeviceCodesAPI from './device-codes';
import { DeviceCodes } from './device-codes';
import * as TransactionsAPI from './transactions';
import { TransactionApproveParams, TransactionRejectParams, Transactions } from './transactions';
import * as MeAPI from './me/me';
import { Me, MeListInternalAccountsParams } from './me/me';
import { APIPromise } from '../../core/api-promise';
import { DefaultPagination, type DefaultPaginationParams, PagePromise } from '../../core/pagination';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

/**
 * Endpoints for creating and managing agents (experimental), called by the partner's backend using platform credentials. Covers the full agent lifecycle: creation, policy configuration, pausing, deletion, the device code installation flow, and approving or rejecting transactions initiated by agents.
 */
export class Agents extends APIResource {
  me: MeAPI.Me = new MeAPI.Me(this._client);
  deviceCodes: DeviceCodesAPI.DeviceCodes = new DeviceCodesAPI.DeviceCodes(this._client);
  transactions: TransactionsAPI.Transactions = new TransactionsAPI.Transactions(this._client);
  actions: ActionsAPI.Actions = new ActionsAPI.Actions(this._client);

  /**
   * Create a new agent with a specified policy. Returns the created agent and a
   * device code that must be redeemed by the agent software to complete
   * installation.
   *
   * @example
   * ```ts
   * const agentCreateResponse = await client.agents.create({
   *   customerId:
   *     'Customer:019542f5-b3e7-1d02-0000-000000000001',
   *   name: 'Payroll Automation Agent',
   *   policy: {
   *     defaultExecutionMode: 'AUTO',
   *     permissions: ['VIEW_TRANSACTIONS'],
   *     spendingLimits: {
   *       currency: 'USD',
   *       perTransactionLimit: 50000,
   *     },
   *   },
   * });
   * ```
   */
  create(body: AgentCreateParams, options?: RequestOptions): APIPromise<AgentCreateResponse> {
    return this._client.post('/agents', { body, ...options, __security: { basicAuth: true } });
  }

  /**
   * Retrieve an agent by its system-generated ID.
   *
   * @example
   * ```ts
   * const agent = await client.agents.retrieve('agentId');
   * ```
   */
  retrieve(agentID: string, options?: RequestOptions): APIPromise<Agent> {
    return this._client.get(path`/agents/${agentID}`, { ...options, __security: { basicAuth: true } });
  }

  /**
   * Update an agent's name or paused state.
   *
   * @example
   * ```ts
   * const agent = await client.agents.update('agentId');
   * ```
   */
  update(agentID: string, body: AgentUpdateParams, options?: RequestOptions): APIPromise<Agent> {
    return this._client.patch(path`/agents/${agentID}`, {
      body,
      ...options,
      __security: { basicAuth: true },
    });
  }

  /**
   * Retrieve a paginated list of agents for the authenticated platform.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const agent of client.agents.list()) {
   *   // ...
   * }
   * ```
   */
  list(
    query: AgentListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<AgentsDefaultPagination, Agent> {
    return this._client.getAPIList('/agents', DefaultPagination<Agent>, {
      query,
      ...options,
      __security: { basicAuth: true },
    });
  }

  /**
   * Permanently delete an agent. Connected agent software will lose access
   * immediately.
   *
   * @example
   * ```ts
   * await client.agents.delete('agentId');
   * ```
   */
  delete(agentID: string, options?: RequestOptions): APIPromise<void> {
    return this._client.delete(path`/agents/${agentID}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
      __security: { basicAuth: true },
    });
  }

  /**
   * Retrieve a paginated list of agent actions that require platform approval.
   * Filter by `agentId` or `customerId` to scope results to a specific agent or
   * customer. Approve or reject individual actions via
   * `POST /agents/{agentId}/actions/{actionId}/approve` or
   * `POST /agents/{agentId}/actions/{actionId}/reject`.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const agentAction of client.agents.listApprovals()) {
   *   // ...
   * }
   * ```
   */
  listApprovals(
    query: AgentListApprovalsParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<AgentActionsDefaultPagination, AgentAction> {
    return this._client.getAPIList('/agents/approvals', DefaultPagination<AgentAction>, {
      query,
      ...options,
      __security: { basicAuth: true },
    });
  }

  /**
   * Partially update an agent's policy. Only provided fields will be updated;
   * omitted fields retain their current values. Policy changes take effect
   * immediately.
   *
   * @example
   * ```ts
   * const agent = await client.agents.updatePolicy('agentId');
   * ```
   */
  updatePolicy(agentID: string, body: AgentUpdatePolicyParams, options?: RequestOptions): APIPromise<Agent> {
    return this._client.patch(path`/agents/${agentID}/policy`, {
      body,
      ...options,
      __security: { basicAuth: true },
    });
  }
}

export type AgentsDefaultPagination = DefaultPagination<Agent>;

export type AgentActionsDefaultPagination = DefaultPagination<AgentAction>;

/**
 * A programmatic agent with scoped permissions and a spending policy, used to
 * automate payment workflows.
 */
export interface Agent {
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
  policy: AgentPolicy;

  /**
   * Last update timestamp.
   */
  updatedAt: string;

  /**
   * Real-time counters tracking the agent's spending and transaction activity
   * against its policy limits.
   */
  usage: AgentUsage;
}

/**
 * Optional restrictions that limit the agent to specific accounts or override
 * policy per account.
 */
export interface AgentAccountRestrictions {
  /**
   * Per-account rules that override the agent's default policy for specific
   * accounts.
   */
  accountRules?: Array<AgentAccountRule>;

  /**
   * If set, restricts the agent to operate only on the specified internal account
   * IDs. Null means the agent can access all accounts.
   */
  allowedAccountIds?: Array<string>;
}

/**
 * Per-account policy override that takes precedence over the agent's default
 * policy for a specific account.
 */
export interface AgentAccountRule {
  /**
   * The internal account ID this rule applies to.
   */
  accountId: string;

  /**
   * Execution mode controlling whether agent actions require human approval. AUTO:
   * The agent can execute actions autonomously without explicit approval.
   * APPROVAL_REQUIRED: All agent actions require explicit human approval before
   * execution.
   */
  executionMode?: 'AUTO' | 'APPROVAL_REQUIRED';

  /**
   * Per-transaction limit override, in the smallest unit of the relevant currency.
   * Null inherits from the agent's spending limits.
   */
  perTransactionLimit?: number | null;
}

/**
 * An action submitted by an agent that may require platform approval before
 * execution. All agent-initiated operations (quote execution, transfers) are
 * represented as AgentActions, giving the platform a consistent object to approve,
 * reject, and audit regardless of the underlying operation type.
 */
export interface AgentAction {
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
   * | Type            | Description     |
   * | --------------- | --------------- |
   * | `EXECUTE_QUOTE` | Execute a quote |
   */
  type: 'EXECUTE_QUOTE';

  /**
   * When the action was last updated.
   */
  updatedAt: string;

  /**
   * The quote being executed. Contains the full amount, currency, destination, and
   * rate details needed to present an approval decision to the user.
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
}

export interface AgentActionListResponse {
  /**
   * List of agent actions matching the filter criteria.
   */
  data: Array<AgentAction>;

  /**
   * Indicates if more results are available beyond this page.
   */
  hasMore: boolean;

  /**
   * Cursor to retrieve the next page of results (only present if hasMore is true).
   */
  nextCursor?: string;

  /**
   * Total number of actions matching the criteria (excluding pagination).
   */
  totalCount?: number;
}

export interface AgentActionRejectRequest {
  /**
   * Optional human-readable reason for the rejection, stored on the action and
   * visible to the platform.
   */
  reason?: string;
}

/**
 * Thresholds that force approval for high-value transactions, overriding the
 * default execution mode. When a transaction is denominated in a different
 * currency than the threshold, Grid converts using the exchange rate at evaluation
 * time.
 */
export interface AgentApprovalThresholds {
  /**
   * If set, any transaction above this amount (in the smallest unit of the specified
   * currency) will require explicit approval even when the agent's
   * defaultExecutionMode is AUTO. Null means no threshold override.
   */
  amount?: number | null;

  /**
   * ISO 4217 currency code that the amount threshold is denominated in. Required
   * when amount is set.
   */
  currency?: string;
}

export interface AgentCreateRequest {
  /**
   * The ID of the customer this agent will operate on behalf of.
   */
  customerId: string;

  /**
   * Human-readable name to identify the agent.
   */
  name: string;

  /**
   * Policy governing what an agent can do, how it executes actions, and its spending
   * boundaries.
   */
  policy: AgentPolicy;
}

/**
 * Response returned when an agent is created, including the agent and a device
 * code for installation.
 */
export interface AgentCreateResponse {
  /**
   * A programmatic agent with scoped permissions and a spending policy, used to
   * automate payment workflows.
   */
  agent: Agent;

  deviceCode: AgentDeviceCode;
}

export interface AgentDeviceCode {
  /**
   * The agent this device code belongs to.
   */
  agentId: string;

  /**
   * Human-readable device code used to install and connect the agent software.
   */
  code: string;

  /**
   * Timestamp when this device code expires.
   */
  expiresAt: string;

  /**
   * Whether this device code has already been redeemed by the agent.
   */
  redeemed: boolean;
}

export interface AgentDeviceCodeRedeemResponse {
  /**
   * Bearer token used to authenticate all subsequent API calls as this agent. Pass
   * as `Authorization: Bearer <accessToken>`. This token is returned only once and
   * must be stored securely — it cannot be retrieved again.
   */
  accessToken: string;

  /**
   * The agent's system-generated ID.
   */
  agentId: string;

  /**
   * The agent's name.
   */
  agentName: string;

  /**
   * Policy governing what an agent can do, how it executes actions, and its spending
   * boundaries.
   */
  policy: AgentPolicy;
}

export interface AgentDeviceCodeStatusResponse {
  /**
   * The device code.
   */
  code: string;

  /**
   * Whether this device code has been redeemed.
   */
  redeemed: boolean;
}

export interface AgentListResponse {
  /**
   * List of agents matching the filter criteria.
   */
  data: Array<Agent>;

  /**
   * Indicates if more results are available beyond this page.
   */
  hasMore: boolean;

  /**
   * Cursor to retrieve the next page of results (only present if hasMore is true).
   */
  nextCursor?: string;

  /**
   * Total number of agents matching the criteria (excluding pagination).
   */
  totalCount?: number;
}

/**
 * Policy governing what an agent can do, how it executes actions, and its spending
 * boundaries.
 */
export interface AgentPolicy {
  /**
   * Execution mode controlling whether agent actions require human approval. AUTO:
   * The agent can execute actions autonomously without explicit approval.
   * APPROVAL_REQUIRED: All agent actions require explicit human approval before
   * execution.
   */
  defaultExecutionMode: 'AUTO' | 'APPROVAL_REQUIRED';

  /**
   * List of permissions granted to the agent.
   */
  permissions: Array<'VIEW_TRANSACTIONS' | 'CREATE_QUOTES' | 'EXECUTE_QUOTES' | 'MANAGE_EXTERNAL_ACCOUNTS'>;

  /**
   * Spending limits that cap the agent's transaction amounts and frequency. All
   * amount fields are integers in the smallest unit of the specified currency. When
   * a transaction is denominated in a different currency, Grid converts using the
   * exchange rate at evaluation time.
   */
  spendingLimits: AgentPolicy.SpendingLimits;

  /**
   * Optional restrictions that limit the agent to specific accounts or override
   * policy per account.
   */
  accountRestrictions?: AgentAccountRestrictions;

  /**
   * Thresholds that force approval for high-value transactions, overriding the
   * default execution mode. When a transaction is denominated in a different
   * currency than the threshold, Grid converts using the exchange rate at evaluation
   * time.
   */
  approvalThresholds?: AgentApprovalThresholds;
}

export namespace AgentPolicy {
  /**
   * Spending limits that cap the agent's transaction amounts and frequency. All
   * amount fields are integers in the smallest unit of the specified currency. When
   * a transaction is denominated in a different currency, Grid converts using the
   * exchange rate at evaluation time.
   */
  export interface SpendingLimits {
    /**
     * ISO 4217 currency code that all amount limits are denominated in.
     */
    currency: string;

    /**
     * Maximum amount the agent can transfer in a single transaction.
     */
    perTransactionLimit: number;

    /**
     * Maximum total amount the agent can transfer per day. Null means no daily limit.
     */
    dailyLimit?: number | null;

    /**
     * Maximum number of transactions the agent can initiate per day.
     */
    dailyTransactionLimit?: number;

    /**
     * Maximum total amount the agent can transfer per month. Null means no monthly
     * limit.
     */
    monthlyLimit?: number | null;
  }
}

/**
 * Partial update to an agent's policy. Only provided fields will be updated;
 * omitted fields retain their current values.
 */
export interface AgentPolicyUpdateRequest {
  /**
   * Optional restrictions that limit the agent to specific accounts or override
   * policy per account.
   */
  accountRestrictions?: AgentAccountRestrictions;

  /**
   * Thresholds that force approval for high-value transactions, overriding the
   * default execution mode. When a transaction is denominated in a different
   * currency than the threshold, Grid converts using the exchange rate at evaluation
   * time.
   */
  approvalThresholds?: AgentApprovalThresholds;

  /**
   * Execution mode controlling whether agent actions require human approval. AUTO:
   * The agent can execute actions autonomously without explicit approval.
   * APPROVAL_REQUIRED: All agent actions require explicit human approval before
   * execution.
   */
  defaultExecutionMode?: 'AUTO' | 'APPROVAL_REQUIRED';

  /**
   * Updated list of permissions. Replaces the entire permissions list when provided.
   */
  permissions?: Array<'VIEW_TRANSACTIONS' | 'CREATE_QUOTES' | 'EXECUTE_QUOTES' | 'MANAGE_EXTERNAL_ACCOUNTS'>;

  /**
   * Partial update to spending limits. Only provided fields will be updated; omitted
   * fields retain their current values.
   */
  spendingLimits?: AgentPolicyUpdateRequest.SpendingLimits;
}

export namespace AgentPolicyUpdateRequest {
  /**
   * Partial update to spending limits. Only provided fields will be updated; omitted
   * fields retain their current values.
   */
  export interface SpendingLimits {
    /**
     * ISO 4217 currency code that all amount limits are denominated in. Updating this
     * recasts all existing limits into the new currency denomination.
     */
    currency?: string;

    /**
     * Maximum daily spend. Set to null to remove the daily limit.
     */
    dailyLimit?: number | null;

    /**
     * Maximum number of transactions per day.
     */
    dailyTransactionLimit?: number;

    /**
     * Maximum monthly spend. Set to null to remove the monthly limit.
     */
    monthlyLimit?: number | null;

    /**
     * Maximum amount per transaction.
     */
    perTransactionLimit?: number;
  }
}

/**
 * Partial update to an agent's basic fields. At least one field must be provided.
 */
export interface AgentUpdateRequest {
  /**
   * Set to true to pause the agent or false to resume it.
   */
  isPaused?: boolean;

  /**
   * Updated name for the agent.
   */
  name?: string;
}

/**
 * Real-time counters tracking the agent's spending and transaction activity
 * against its policy limits.
 */
export interface AgentUsage {
  /**
   * Total amount spent by the agent today, in the smallest unit of the policy's
   * `spendingLimits.currency`.
   */
  dailySpend: number;

  /**
   * Number of transactions initiated by the agent today.
   */
  dailyTransactionCount: number;

  /**
   * Total amount spent by the agent this month, in the smallest unit of the policy's
   * `spendingLimits.currency`.
   */
  monthlySpend: number;

  /**
   * The date when daily usage counters will reset.
   */
  dailyResetDate?: string;

  /**
   * The year-month (YYYY-MM) when monthly usage counters will reset.
   */
  monthlyResetMonth?: string;
}

export interface AgentCreateParams {
  /**
   * The ID of the customer this agent will operate on behalf of.
   */
  customerId: string;

  /**
   * Human-readable name to identify the agent.
   */
  name: string;

  /**
   * Policy governing what an agent can do, how it executes actions, and its spending
   * boundaries.
   */
  policy: AgentPolicy;
}

export interface AgentUpdateParams {
  /**
   * Set to true to pause the agent or false to resume it.
   */
  isPaused?: boolean;

  /**
   * Updated name for the agent.
   */
  name?: string;
}

export interface AgentListParams extends DefaultPaginationParams {
  /**
   * Filter agents created after this timestamp (inclusive)
   */
  createdAfter?: string;

  /**
   * Filter agents created before this timestamp (inclusive)
   */
  createdBefore?: string;

  /**
   * Filter by customer ID
   */
  customerId?: string;

  /**
   * Filter by connection status (whether the device code has been redeemed)
   */
  isConnected?: boolean;

  /**
   * Filter by paused status
   */
  isPaused?: boolean;

  /**
   * Maximum number of results to return (default 20, max 100)
   */
  limit?: number;

  /**
   * Filter agents updated after this timestamp (inclusive)
   */
  updatedAfter?: string;

  /**
   * Filter agents updated before this timestamp (inclusive)
   */
  updatedBefore?: string;
}

export interface AgentListApprovalsParams extends DefaultPaginationParams {
  /**
   * Filter by agent ID
   */
  agentId?: string;

  /**
   * Filter by customer ID
   */
  customerId?: string;

  /**
   * Filter by end date (inclusive) in ISO 8601 format
   */
  endDate?: string;

  /**
   * Maximum number of results to return (default 20, max 100)
   */
  limit?: number;

  /**
   * Order to sort results in
   */
  sortOrder?: 'asc' | 'desc';

  /**
   * Filter by start date (inclusive) in ISO 8601 format
   */
  startDate?: string;
}

export interface AgentUpdatePolicyParams {
  /**
   * Optional restrictions that limit the agent to specific accounts or override
   * policy per account.
   */
  accountRestrictions?: AgentAccountRestrictions;

  /**
   * Thresholds that force approval for high-value transactions, overriding the
   * default execution mode. When a transaction is denominated in a different
   * currency than the threshold, Grid converts using the exchange rate at evaluation
   * time.
   */
  approvalThresholds?: AgentApprovalThresholds;

  /**
   * Execution mode controlling whether agent actions require human approval. AUTO:
   * The agent can execute actions autonomously without explicit approval.
   * APPROVAL_REQUIRED: All agent actions require explicit human approval before
   * execution.
   */
  defaultExecutionMode?: 'AUTO' | 'APPROVAL_REQUIRED';

  /**
   * Updated list of permissions. Replaces the entire permissions list when provided.
   */
  permissions?: Array<'VIEW_TRANSACTIONS' | 'CREATE_QUOTES' | 'EXECUTE_QUOTES' | 'MANAGE_EXTERNAL_ACCOUNTS'>;

  /**
   * Partial update to spending limits. Only provided fields will be updated; omitted
   * fields retain their current values.
   */
  spendingLimits?: AgentUpdatePolicyParams.SpendingLimits;
}

export namespace AgentUpdatePolicyParams {
  /**
   * Partial update to spending limits. Only provided fields will be updated; omitted
   * fields retain their current values.
   */
  export interface SpendingLimits {
    /**
     * ISO 4217 currency code that all amount limits are denominated in. Updating this
     * recasts all existing limits into the new currency denomination.
     */
    currency?: string;

    /**
     * Maximum daily spend. Set to null to remove the daily limit.
     */
    dailyLimit?: number | null;

    /**
     * Maximum number of transactions per day.
     */
    dailyTransactionLimit?: number;

    /**
     * Maximum monthly spend. Set to null to remove the monthly limit.
     */
    monthlyLimit?: number | null;

    /**
     * Maximum amount per transaction.
     */
    perTransactionLimit?: number;
  }
}

Agents.Me = Me;
Agents.DeviceCodes = DeviceCodes;
Agents.Transactions = Transactions;
Agents.Actions = Actions;

export declare namespace Agents {
  export {
    type Agent as Agent,
    type AgentAccountRestrictions as AgentAccountRestrictions,
    type AgentAccountRule as AgentAccountRule,
    type AgentAction as AgentAction,
    type AgentActionListResponse as AgentActionListResponse,
    type AgentActionRejectRequest as AgentActionRejectRequest,
    type AgentApprovalThresholds as AgentApprovalThresholds,
    type AgentCreateRequest as AgentCreateRequest,
    type AgentCreateResponse as AgentCreateResponse,
    type AgentDeviceCode as AgentDeviceCode,
    type AgentDeviceCodeRedeemResponse as AgentDeviceCodeRedeemResponse,
    type AgentDeviceCodeStatusResponse as AgentDeviceCodeStatusResponse,
    type AgentListResponse as AgentListResponse,
    type AgentPolicy as AgentPolicy,
    type AgentPolicyUpdateRequest as AgentPolicyUpdateRequest,
    type AgentUpdateRequest as AgentUpdateRequest,
    type AgentUsage as AgentUsage,
    type AgentsDefaultPagination as AgentsDefaultPagination,
    type AgentActionsDefaultPagination as AgentActionsDefaultPagination,
    type AgentCreateParams as AgentCreateParams,
    type AgentUpdateParams as AgentUpdateParams,
    type AgentListParams as AgentListParams,
    type AgentListApprovalsParams as AgentListApprovalsParams,
    type AgentUpdatePolicyParams as AgentUpdatePolicyParams,
  };

  export { Me as Me, type MeListInternalAccountsParams as MeListInternalAccountsParams };

  export { DeviceCodes as DeviceCodes };

  export {
    Transactions as Transactions,
    type TransactionApproveParams as TransactionApproveParams,
    type TransactionRejectParams as TransactionRejectParams,
  };

  export {
    Actions as Actions,
    type ActionApproveParams as ActionApproveParams,
    type ActionRejectParams as ActionRejectParams,
  };
}
