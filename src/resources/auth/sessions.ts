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
   * const sessions = await client.auth.sessions.list({
   *   accountId: 'accountId',
   * });
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
   * const response = await client.auth.sessions.revoke('id');
   * ```
   */
  revoke(
    id: string,
    params: SessionRevokeParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<SessionRevokeResponse> {
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
  data: Array<SessionListResponse.Data>;
}

export namespace SessionListResponse {
  /**
   * An authentication session on an Embedded Wallet internal account. Returned from
   * `GET /auth/sessions` (list) and `POST /auth/credentials/{id}/verify` (on
   * credential verification). Only the verify response includes
   * `encryptedSessionSigningKey` — it is delivered exactly once at the moment the
   * session is issued and is never returned by the list endpoint.
   */
  export interface Data extends CredentialsAPI.AuthMethod {
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
     * the verify request. Encoded as a base58check string: the decoded payload is a
     * 33-byte compressed P-256 encapsulated public key followed by AES-256-GCM
     * ciphertext. The client decrypts this key with its private key and uses it to
     * sign subsequent Embedded Wallet requests until `expiresAt`.
     *
     * Only returned from `POST /auth/credentials/{id}/verify` (where the session is
     * first issued). Omitted from responses that simply surface existing sessions
     * (e.g. `GET /auth/sessions`) — Grid does not retain the plaintext key after the
     * client has decrypted it.
     */
    encryptedSessionSigningKey?: string;
  }
}

/**
 * 202 response returned from Embedded Wallet Auth endpoints that require a signed
 * retry — `POST /auth/credentials` (adding an additional credential),
 * `DELETE /auth/credentials/{id}` (revoking a credential), and
 * `DELETE /auth/sessions/{id}` (revoking a session). Carries the signing fields
 * from `SignedRequestChallenge` plus the `type` of the authentication credential
 * involved (being added, being revoked, or that issued the session being revoked).
 * The client already knows the target resource id from the request path / body it
 * just sent, so nothing beyond `type` is echoed in the response.
 */
export interface SessionRevokeResponse {
  /**
   * Timestamp after which this challenge is no longer valid. The signed retry must
   * be submitted before this time.
   */
  expiresAt: string;

  /**
   * Canonical payload for the retry authorization stamp. Build an API-key stamp over
   * this exact value with the session API keypair, then send the full
   * base64url-encoded stamp in `Grid-Wallet-Signature` on the retry that completes
   * the original request.
   */
  payloadToSign: string;

  /**
   * Unique identifier for this request. Must be echoed in the `Request-Id` header on
   * the signed retry so the server can correlate the retry with the issued
   * challenge.
   */
  requestId: string;

  /**
   * Credential type relevant to this challenge: the credential type being added
   * (`POST /auth/credentials`), the credential type being revoked
   * (`DELETE /auth/credentials/{id}`), or the type of credential that issued the
   * session being revoked (`DELETE /auth/sessions/{id}`).
   */
  type: 'OAUTH' | 'EMAIL_OTP' | 'PASSKEY';
}

export interface SessionListParams {
  /**
   * Internal account id whose sessions to list.
   */
  accountId: string;
}

export interface SessionRevokeParams {
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
    type SessionRevokeResponse as SessionRevokeResponse,
    type SessionListParams as SessionListParams,
    type SessionRevokeParams as SessionRevokeParams,
  };
}
