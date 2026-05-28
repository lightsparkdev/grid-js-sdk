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
   * Sessions also expire on their own. `404` is returned whenever the `id` does not
   * match an active session — whether the session was never issued, was already
   * revoked by a prior call, or has expired past its `expiresAt`. The response code
   * reflects the resource state, not an error in the client's flow: re-revoking an
   * already-revoked or expired session is safe and idempotent at the user intent
   * level.
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

  /**
   * Refresh an active Embedded Wallet auth session and create a new session signing
   * key. Session refresh is a two-step signed-retry flow:
   *
   * 1. Call `POST /auth/sessions/{id}/refresh` with the request body
   *    `{ "clientPublicKey": "04..." }` and no signature headers. Grid builds a
   *    Turnkey create-read-write-session payload, binds the supplied
   *    `clientPublicKey` into that payload, persists it as a pending request, and
   *    returns `202` with `payloadToSign`, `requestId`, and `expiresAt`.
   *
   * 2. Sign `payloadToSign` with the current session signing key, then retry the
   *    same request with the full API-key stamp as `Grid-Wallet-Signature`, the
   *    `requestId` echoed back as `Request-Id`, and the same `clientPublicKey` in
   *    the request body. On success, Grid returns a new `AuthSession` with an
   *    `encryptedSessionSigningKey` sealed to that client public key.
   *
   * The original session must still be active on both steps so it can authorize the
   * refresh. If the session has already expired, use the credential reauthentication
   * flow instead.
   *
   * @example
   * ```ts
   * const authSession = await client.auth.sessions.refresh(
   *   'Session:019542f5-b3e7-1d02-0000-000000000003',
   *   {
   *     AuthSessionRefreshRequest: {
   *       clientPublicKey:
   *         '04f45f2a22c908b9ce09a7150e514afd24627c401c38a4afc164e1ea783adaaa31d4245acfb88c2ebd42b47628d63ecabf345484f0a9f665b63c54c897d5578be2',
   *     },
   *   },
   * );
   * ```
   */
  refresh(id: string, params: SessionRefreshParams, options?: RequestOptions): APIPromise<AuthSession> {
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
    });
  }
}

/**
 * An authentication session on an Embedded Wallet internal account. Returned from
 * `GET /auth/sessions` (list) and `POST /auth/credentials/{id}/verify` (on
 * credential verification) or `POST /auth/sessions/{id}/refresh` (on mid-session
 * refresh). Only session-issuing responses include `encryptedSessionSigningKey` —
 * it is delivered exactly once at the moment the session is issued and is never
 * returned by the list endpoint.
 */
export interface AuthSession extends CredentialsAPI.AuthMethod {
  /**
   * System-generated unique identifier for the session. Pass this value to
   * `DELETE /auth/sessions/{id}` to revoke the session before `expiresAt`. Overrides
   * the `id` inherited from `AuthMethod` so this response identifies the session
   * rather than the authenticating credential.
   */
  id: string;

  /**
   * Timestamp after which the session is no longer valid and the
   * `encryptedSessionSigningKey` must not be used to sign further requests.
   */
  expiresAt: string;

  /**
   * HPKE-encrypted session signing key, sealed to the `clientPublicKey` supplied on
   * the verification or refresh request. Encoded as a base58check string: the
   * decoded payload is a 33-byte compressed P-256 encapsulated public key followed
   * by AES-256-GCM ciphertext. The client decrypts this key with its private key and
   * uses it to sign subsequent Embedded Wallet requests until `expiresAt`.
   *
   * Only returned from session-issuing responses like
   * `POST /auth/credentials/{id}/verify` and `POST /auth/sessions/{id}/refresh`.
   * Omitted from responses that simply surface existing sessions (e.g.
   * `GET /auth/sessions`) — Grid does not retain the plaintext key after the client
   * has decrypted it.
   */
  encryptedSessionSigningKey?: string;
}

/**
 * Request body for refreshing an active authentication session. The
 * `clientPublicKey` is required on both steps of the signed-retry flow. On the
 * initial call, Grid binds this key into the Turnkey session-creation payload
 * returned as `payloadToSign`; on the signed retry, the client echoes the same key
 * back and Grid uses it to encrypt the newly issued session signing key.
 */
export interface AuthSessionRefreshRequest {
  /**
   * Client-generated P-256 public key, hex-encoded in uncompressed SEC1 format (`04`
   * prefix followed by the 32-byte X and 32-byte Y coordinates; 130 hex characters
   * total). The matching private key must remain on the client. Grid binds this key
   * into the session-creation payload on the initial call and seals the returned
   * `encryptedSessionSigningKey` to it on the signed retry.
   */
  clientPublicKey: string;
}

export interface SessionListResponse {
  /**
   * List of active authentication sessions for the internal account.
   */
  data: Array<AuthSession>;
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
   * `clientPublicKey` is required on both steps of the signed-retry flow. On the
   * initial call, Grid binds this key into the Turnkey session-creation payload
   * returned as `payloadToSign`; on the signed retry, the client echoes the same key
   * back and Grid uses it to encrypt the newly issued session signing key.
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
    type AuthSession as AuthSession,
    type AuthSessionRefreshRequest as AuthSessionRefreshRequest,
    type SessionListResponse as SessionListResponse,
    type SessionListParams as SessionListParams,
    type SessionDeleteParams as SessionDeleteParams,
    type SessionRefreshParams as SessionRefreshParams,
  };
}
