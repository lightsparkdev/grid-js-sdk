// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

/**
 * Endpoints for creating and managing agents (experimental), called by the partner's backend using platform credentials. Covers the full agent lifecycle: creation, policy configuration, pausing, deletion, the device code installation flow, and approving or rejecting transactions initiated by agents.
 */
export class DeviceCodes extends APIResource {
  /**
   * Generate a new device code for an existing agent. Use this when the original
   * device code has expired before being redeemed, or when the agent software needs
   * to be reinstalled. Any previously issued unredeemed device codes for this agent
   * are invalidated.
   *
   * @example
   * ```ts
   * const response =
   *   await client.agents.deviceCodes.deviceCodes('agentId');
   * ```
   */
  deviceCodes(agentID: string, options?: RequestOptions): APIPromise<DeviceCodeDeviceCodesResponse> {
    return this._client.post(path`/agents/${agentID}/device-codes`, options);
  }

  /**
   * Redeem a device code to obtain agent credentials. This endpoint is called by the
   * agent software during installation. On success, returns a Bearer access token
   * that the agent uses for all subsequent API calls. The token is returned only
   * once and must be stored securely. This endpoint does not require platform
   * authentication — the device code itself serves as proof of authorization.
   *
   * @example
   * ```ts
   * const response = await client.agents.deviceCodes.redeem(
   *   'code',
   * );
   * ```
   */
  redeem(code: string, options?: RequestOptions): APIPromise<DeviceCodeRedeemResponse> {
    return this._client.post(path`/agents/device-codes/${code}/redeem`, options);
  }

  /**
   * Check whether a device code has been redeemed. Use this to poll for agent
   * installation completion after creating an agent.
   *
   * @example
   * ```ts
   * const response =
   *   await client.agents.deviceCodes.retrieveStatus('code');
   * ```
   */
  retrieveStatus(code: string, options?: RequestOptions): APIPromise<DeviceCodeRetrieveStatusResponse> {
    return this._client.get(path`/agents/device-codes/${code}/status`, options);
  }
}

export interface DeviceCodeDeviceCodesResponse {
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

export interface DeviceCodeRedeemResponse {
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
  policy: DeviceCodeRedeemResponse.Policy;
}

export namespace DeviceCodeRedeemResponse {
  /**
   * Policy governing what an agent can do, how it executes actions, and its spending
   * boundaries.
   */
  export interface Policy {
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
    permissions: Array<
      | 'VIEW_TRANSACTIONS'
      | 'CREATE_TRANSFERS'
      | 'CREATE_QUOTES'
      | 'EXECUTE_QUOTES'
      | 'MANAGE_EXTERNAL_ACCOUNTS'
    >;

    /**
     * Spending limits that cap the agent's transaction amounts and frequency. All
     * amount fields are integers in the smallest unit of the specified currency. When
     * a transaction is denominated in a different currency, Grid converts using the
     * exchange rate at evaluation time.
     */
    spendingLimits: Policy.SpendingLimits;

    /**
     * Optional restrictions that limit the agent to specific accounts or override
     * policy per account.
     */
    accountRestrictions?: Policy.AccountRestrictions;

    /**
     * Thresholds that force approval for high-value transactions, overriding the
     * default execution mode. When a transaction is denominated in a different
     * currency than the threshold, Grid converts using the exchange rate at evaluation
     * time.
     */
    approvalThresholds?: Policy.ApprovalThresholds;
  }

  export namespace Policy {
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

    /**
     * Optional restrictions that limit the agent to specific accounts or override
     * policy per account.
     */
    export interface AccountRestrictions {
      /**
       * Per-account rules that override the agent's default policy for specific
       * accounts.
       */
      accountRules?: Array<AccountRestrictions.AccountRule>;

      /**
       * If set, restricts the agent to operate only on the specified internal account
       * IDs. Null means the agent can access all accounts.
       */
      allowedAccountIds?: Array<string> | null;
    }

    export namespace AccountRestrictions {
      /**
       * Per-account policy override that takes precedence over the agent's default
       * policy for a specific account.
       */
      export interface AccountRule {
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
    }

    /**
     * Thresholds that force approval for high-value transactions, overriding the
     * default execution mode. When a transaction is denominated in a different
     * currency than the threshold, Grid converts using the exchange rate at evaluation
     * time.
     */
    export interface ApprovalThresholds {
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
  }
}

export interface DeviceCodeRetrieveStatusResponse {
  /**
   * The device code.
   */
  code: string;

  /**
   * Whether this device code has been redeemed.
   */
  redeemed: boolean;
}

export declare namespace DeviceCodes {
  export {
    type DeviceCodeDeviceCodesResponse as DeviceCodeDeviceCodesResponse,
    type DeviceCodeRedeemResponse as DeviceCodeRedeemResponse,
    type DeviceCodeRetrieveStatusResponse as DeviceCodeRetrieveStatusResponse,
  };
}
