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
   * const agentDeviceCodeStatusResponse =
   *   await client.agents.deviceCodes.getStatus('code');
   * ```
   */
  getStatus(code: string, options?: RequestOptions): APIPromise<AgentsAPI.AgentDeviceCodeStatusResponse> {
    return this._client.get(path`/agents/device-codes/${code}/status`, {
      ...options,
      __security: { basicAuth: true },
    });
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
   * const agentDeviceCodeRedeemResponse =
   *   await client.agents.deviceCodes.redeem('code');
   * ```
   */
  redeem(code: string, options?: RequestOptions): APIPromise<AgentsAPI.AgentDeviceCodeRedeemResponse> {
    return this._client.post(path`/agents/device-codes/${code}/redeem`, { ...options, __security: {} });
  }

  /**
   * Generate a new device code for an existing agent. Use this when the original
   * device code has expired before being redeemed, or when the agent software needs
   * to be reinstalled. Any previously issued unredeemed device codes for this agent
   * are invalidated.
   *
   * @example
   * ```ts
   * const agentDeviceCode =
   *   await client.agents.deviceCodes.regenerate('agentId');
   * ```
   */
  regenerate(agentID: string, options?: RequestOptions): APIPromise<AgentsAPI.AgentDeviceCode> {
    return this._client.post(path`/agents/${agentID}/device-codes`, {
      ...options,
      __security: { basicAuth: true },
    });
  }
}
