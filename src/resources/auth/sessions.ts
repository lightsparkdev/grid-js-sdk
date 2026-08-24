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
    return this._client.get('/auth/sessions', { query, ...options, __security: { basicAuth: true } });
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
   * Sessions also expire on their own. `404` is returned whenever the `id` does not
   * match an active session — whether the session was never issued, was already
   * revoked by a prior call, or has expired past its `expiresAt`. The response code
   * reflects the resource state, not an error in the client's flow: re-revoking an
   * already-revoked or expired session is safe and idempotent at the user intent
   * level.
   *
   * @example
   * ```ts
   * const session = await client.auth.sessions.delete('id');
   * ```
   */
  delete(
    id: string,
    params: SessionDeleteParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<SessionDeleteResponse> {
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
      __security: { basicAuth: true },
    });
  }

  /**
   * Refresh an active Embedded Wallet auth session and create a new session signing
   * key. Session refresh is a two-step signed-retry flow:
   *
   * 1. Call `POST /auth/sessions/{id}/refresh` with the request body
   *    `{ "clientPublicKey": "02..." }` and no signature headers. Send a freshly
   *    generated client public key and retain its private key. Grid binds the
   *    supplied `clientPublicKey` into the session-refresh payload, persists it as a
   *    pending request, and returns `202` with `payloadToSign`, `requestId`, and
   *    `expiresAt`.
   *
   * 2. Sign `payloadToSign` with the current session signing key, then retry the
   *    same request with the full API-key stamp as `Grid-Wallet-Signature`, the
   *    `requestId` echoed back as `Request-Id`, and the same `clientPublicKey` in
   *    the request body. On success, Grid returns a new `AuthSession`. Sending a
   *    compressed `clientPublicKey` selects the recommended client-held-key model,
   *    where the client retains the new session signing key and no key material is
   *    returned; sending an uncompressed key selects the deprecated legacy flow,
   *    where the new key is sealed to it and returned as
   *    `encryptedSessionSigningKey`.
   *
   * The original session must still be active on both steps so it can authorize the
   * refresh. If the session has already expired, use the credential reauthentication
   * flow instead.
   *
   * @example
   * ```ts
   * const response = await client.auth.sessions.refresh(
   *   'Session:019542f5-b3e7-1d02-0000-000000000003',
   *   {
   *     AuthSessionRefreshRequest: {
   *       clientPublicKey:
   *         '02f45f2a22c908b9ce09a7150e514afd24627c401c38a4afc164e1ea783adaaa31',
   *     },
   *   },
   * );
   * ```
   */
  refresh(
    id: string,
    params: SessionRefreshParams,
    options?: RequestOptions,
  ): APIPromise<SessionRefreshResponse> {
    const {
      AuthSessionRefreshRequest,
      'Grid-Wallet-Signature': gridWalletSignature,
      'Request-Id': requestID,
    } = params;
    return this._client.post(path`/auth/sessions/${id}/refresh`, {
      body: AuthSessionRefreshRequest,
      ...options,
      headers: buildHeaders([
        {
          ...(gridWalletSignature != null ? { 'Grid-Wallet-Signature': gridWalletSignature } : undefined),
          ...(requestID != null ? { 'Request-Id': requestID } : undefined),
        },
        options?.headers,
      ]),
      __security: { basicAuth: true },
    });
  }
}

/**
 * Request body for refreshing an active authentication session. The
 * `clientPublicKey` is required on both steps of the signed-retry flow and must
 * match on both. Its SEC1 encoding selects how the refreshed session signing key
 * is delivered: a compressed key gets the recommended client-held-key model, where
 * the client retains the new signing key itself; an uncompressed key gets the
 * deprecated legacy flow, where Grid returns the new key as
 * `encryptedSessionSigningKey` sealed to it. On the initial call, Grid binds the
 * supplied key into the session-creation payload returned as `payloadToSign`.
 */
export interface AuthSessionRefreshRequest {
  /**
   * Client-generated P-256 public key; the matching private key is retained on the
   * client. Send a compressed SEC1 key (`02`/`03` prefix followed by the 32-byte X
   * coordinate; 66 hex characters) for the recommended client-held-key model, where
   * that private key becomes the new session signing key. Send an uncompressed SEC1
   * key (`04` prefix followed by the 32-byte X and 32-byte Y coordinates; 130 hex
   * characters) for the deprecated legacy flow, where Grid seals the new session
   * signing key to it and returns it as `encryptedSessionSigningKey` on the signed
   * retry.
   */
  clientPublicKey: string;
}

export interface SessionListResponse {
  /**
   * List of active authentication sessions for the internal account.
   */
  data: Array<CredentialsAPI.AuthSession>;
}

/**
 * `200` response returned by an Embedded Wallet operation that the wallet provider
 * has accepted but not yet settled — a consensus- or approval-gated activity that
 * is still in flight. It is not an error and needs no client action beyond
 * patience: the backend reconciles the operation to its terminal state on its own.
 * The client MAY re-send the byte-identical request to converge sooner; the
 * request is idempotent and returns the settled success response once the
 * operation completes.
 */
export interface SessionDeleteResponse {
  /**
   * Always `PROCESSING`. Marks a still-in-flight operation whose terminal result is
   * not yet available.
   */
  status: 'PROCESSING';

  /**
   * Human-readable explanation that the operation is still being processed and the
   * same request may be retried.
   */
  message?: string;
}

/**
 * `200` response returned by an Embedded Wallet operation that the wallet provider
 * has accepted but not yet settled — a consensus- or approval-gated activity that
 * is still in flight. It is not an error and needs no client action beyond
 * patience: the backend reconciles the operation to its terminal state on its own.
 * The client MAY re-send the byte-identical request to converge sooner; the
 * request is idempotent and returns the settled success response once the
 * operation completes.
 */
export interface SessionRefreshResponse {
  /**
   * Always `PROCESSING`. Marks a still-in-flight operation whose terminal result is
   * not yet available.
   */
  status: 'PROCESSING';

  /**
   * Human-readable explanation that the operation is still being processed and the
   * same request may be retried.
   */
  message?: string;
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
   * The `requestId` returned in a prior `202` response, echoed back exactly on the
   * signed retry so the server can correlate it with the issued challenge. Required
   * on the signed retry; must be paired with `Grid-Wallet-Signature`.
   */
  'Request-Id'?: string;
}

export interface SessionRefreshParams {
  /**
   * Body param: Request body for refreshing an active authentication session. The
   * `clientPublicKey` is required on both steps of the signed-retry flow and must
   * match on both. Its SEC1 encoding selects how the refreshed session signing key
   * is delivered: a compressed key gets the recommended client-held-key model, where
   * the client retains the new signing key itself; an uncompressed key gets the
   * deprecated legacy flow, where Grid returns the new key as
   * `encryptedSessionSigningKey` sealed to it. On the initial call, Grid binds the
   * supplied key into the session-creation payload returned as `payloadToSign`.
   */
  AuthSessionRefreshRequest: AuthSessionRefreshRequest;

  /**
   * Header param: Full API-key stamp built over the prior `payloadToSign` with the
   * current session API keypair. Required on the signed retry; ignored on the
   * initial call.
   */
  'Grid-Wallet-Signature'?: string;

  /**
   * Header param: The `requestId` returned in the prior `202` response, echoed back
   * on the signed retry so the server can correlate it with the issued challenge.
   * Required on the signed retry; must be paired with `Grid-Wallet-Signature`.
   */
  'Request-Id'?: string;
}

export declare namespace Sessions {
  export {
    type AuthSessionRefreshRequest as AuthSessionRefreshRequest,
    type SessionListResponse as SessionListResponse,
    type SessionDeleteResponse as SessionDeleteResponse,
    type SessionRefreshResponse as SessionRefreshResponse,
    type SessionListParams as SessionListParams,
    type SessionDeleteParams as SessionDeleteParams,
    type SessionRefreshParams as SessionRefreshParams,
  };
}
