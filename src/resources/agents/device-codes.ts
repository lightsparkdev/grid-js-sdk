// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as AgentsAPI from './agents';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

/**
 * Endpoints for creating and managing agents (experimental), called by the partner's backend using platform credentials. Covers the full agent lifecycle: creation, policy configuration, pausing, deletion, the device code installation flow, and approving or rejecting transactions initiated by agents.
 */
export class DeviceCodes extends APIResource {
  /**
   * Check whether a device code has been redeemed. Use this to poll for agent
   * installation completion after creating an agent.
   *
   * @example
   * ```ts
   * const response = await client.agents.deviceCodes.getStatus(
   *   'code',
   * );
   * ```
   */
  getStatus(code: string, options?: RequestOptions): APIPromise<DeviceCodeGetStatusResponse> {
    return this._client.get(path`/agents/device-codes/${code}/status`, options);
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
   * Generate a new device code for an existing agent. Use this when the original
   * device code has expired before being redeemed, or when the agent software needs
   * to be reinstalled. Any previously issued unredeemed device codes for this agent
   * are invalidated.
   *
   * @example
   * ```ts
   * const response = await client.agents.deviceCodes.regenerate(
   *   'agentId',
   * );
   * ```
   */
  regenerate(agentID: string, options?: RequestOptions): APIPromise<DeviceCodeRegenerateResponse> {
    return this._client.post(path`/agents/${agentID}/device-codes`, options);
  }
}

export interface DeviceCodeGetStatusResponse {
  /**
   * The device code.
   */
  code: string;

  /**
   * Whether this device code has been redeemed.
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
  policy: AgentsAPI.AgentPolicy;
}

export interface DeviceCodeRegenerateResponse {
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

export declare namespace DeviceCodes {
  export {
    type DeviceCodeGetStatusResponse as DeviceCodeGetStatusResponse,
    type DeviceCodeRedeemResponse as DeviceCodeRedeemResponse,
    type DeviceCodeRegenerateResponse as DeviceCodeRegenerateResponse,
  };
}
