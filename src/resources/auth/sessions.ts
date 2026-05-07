// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as CredentialsAPI from './credentials';
import { APIPromise } from '../../core/api-promise';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

/**
 * Endpoints for registering and verifying end-user authentication credentials (email OTP, OAuth, passkey) used to sign Embedded Wallet actions.
 */
export class Sessions extends APIResource {
  /**
   * Retrieve all active authentication sessions on an Embedded Wallet internal
   * account. A session is created each time a credential is verified via
   * `POST /auth/credentials/{id}/verify`, and remains active until its `expiresAt`
   * passes or it is revoked via `DELETE /auth/sessions/{id}`.
   *
   * The response is not paginated: an internal account is expected to have a small,
   * bounded number of concurrent sessions (one per signed-in device, typically 1–4),
   * so all results are returned inline.
   *
   * @example
   * ```ts
   * const sessionListResponse = await client.auth.sessions.list(
   *   { accountId: 'accountId' },
   * );
   * ```
   */
  list(query: SessionListParams, options?: RequestOptions): APIPromise<SessionListResponse> {
    return this._client.get('/auth/sessions', { query, ...options });
  }

  /**
   * Revoke an authentication session on an Embedded Wallet internal account.
   * Revocation is a two-step signed-retry flow:
   *
   * 1. Call `DELETE /auth/sessions/{id}` with no headers. The response is `202` with
   *    a `payloadToSign`, `requestId`, and `expiresAt`.
   *
   * 2. Use the session API keypair of a verified session on the same internal
   *    account (this can be the session being revoked, for self-logout) to build an
   *    API-key stamp over `payloadToSign`, then retry the same `DELETE` request with
   *    that full stamp as the `Grid-Wallet-Signature` header and the `requestId`
   *    echoed back as the `Request-Id` header. The signed retry returns `204`.
   *
   * @example
   * ```ts
   * const authSignedRequestChallenge =
   *   await client.auth.sessions.delete('id');
   * ```
   */
  delete(
    id: string,
    params: SessionDeleteParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<CredentialsAPI.AuthSignedRequestChallenge> {
    const { 'Grid-Wallet-Signature': gridWalletSignature, 'Request-Id': requestID } = params ?? {};
    return this._client.delete(path`/auth/sessions/${id}`, {
      ...options,
      headers: buildHeaders([
        {
          ...(gridWalletSignature != null ? { 'Grid-Wallet-Signature': gridWalletSignature } : undefined),
          ...(requestID != null ? { 'Request-Id': requestID } : undefined),
        },
        options?.headers,
      ]),
    });
  }
}

export interface SessionListResponse {
  /**
   * List of active authentication sessions for the internal account.
   */
  data: Array<CredentialsAPI.AuthSession>;
}

export interface SessionListParams {
  /**
   * Internal account id whose sessions to list.
   */
  accountId: string;
}

export interface SessionDeleteParams {
  /**
   * Full API-key stamp built over the prior `payloadToSign` with the session API
   * keypair of a verified session on the same internal account. Required on the
   * signed retry; ignored on the initial call.
   */
  'Grid-Wallet-Signature'?: string;

  /**
   * The `requestId` returned in a prior `202` response, echoed back on the signed
   * retry so the server can correlate it with the issued challenge. Required on the
   * signed retry; must be paired with `Grid-Wallet-Signature`.
   */
  'Request-Id'?: string;
}

export declare namespace Sessions {
  export {
    type SessionListResponse as SessionListResponse,
    type SessionListParams as SessionListParams,
    type SessionDeleteParams as SessionDeleteParams,
  };
}
