// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as CredentialsAPI from './credentials';
import {
  CredentialCreateParams,
  CredentialCreateResponse,
  CredentialListParams,
  CredentialListResponse,
  CredentialResendChallengeResponse,
  CredentialRevokeParams,
  CredentialRevokeResponse,
  CredentialVerifyParams,
  CredentialVerifyResponse,
  Credentials,
} from './credentials';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';

/**
 * Endpoints for registering and verifying end-user authentication credentials (email OTP, OAuth, passkey) used to sign Embedded Wallet actions.
 */
export class Auth extends APIResource {
  credentials: CredentialsAPI.Credentials = new CredentialsAPI.Credentials(this._client);

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
   * const response = await client.auth.listSessions({
   *   accountId: 'accountId',
   * });
   * ```
   */
  listSessions(
    query: AuthListSessionsParams,
    options?: RequestOptions,
  ): APIPromise<AuthListSessionsResponse> {
    return this._client.get('/auth/sessions', { query, ...options });
  }
}

export interface AuthListSessionsResponse {
  /**
   * List of active authentication sessions for the internal account.
   */
  data: Array<AuthListSessionsResponse.Data>;
}

export namespace AuthListSessionsResponse {
  /**
   * An authentication session on an Embedded Wallet internal account. Returned from
   * `GET /auth/sessions` (list) and `POST /auth/credentials/{id}/verify` (on
   * credential verification). Only the verify response includes
   * `encryptedSessionSigningKey` — it is delivered exactly once at the moment the
   * session is issued and is never returned by the list endpoint.
   */
  export interface Data {
    /**
     * System-generated unique identifier for the session. Pass this value to
     * `DELETE /auth/sessions/{id}` to revoke the session before `expiresAt`. Overrides
     * the `id` inherited from `AuthMethod` so this response identifies the session
     * rather than the authenticating credential.
     */
    id: string;

    /**
     * Identifier of the internal account that this credential authenticates.
     */
    accountId: string;

    /**
     * Creation timestamp.
     */
    createdAt: string;

    /**
     * Timestamp after which the session is no longer valid and the
     * `encryptedSessionSigningKey` must not be used to sign further requests.
     */
    expiresAt: string;

    /**
     * Human-readable identifier for this credential. For EMAIL_OTP credentials this is
     * the email address; for OAUTH credentials it is typically the email claim from
     * the OIDC token; for PASSKEY credentials it is the nickname provided at
     * registration time.
     */
    nickname: string;

    /**
     * The type of authentication credential.
     *
     * - `OAUTH`: OpenID Connect (OIDC) token issued by an identity provider such as
     *   Google or Apple.
     * - `EMAIL_OTP`: A one-time password delivered to the user's email address.
     * - `PASSKEY`: A WebAuthn passkey bound to the user's device.
     */
    type: 'OAUTH' | 'EMAIL_OTP' | 'PASSKEY';

    /**
     * Last update timestamp.
     */
    updatedAt: string;

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

export interface AuthListSessionsParams {
  /**
   * Internal account id whose sessions to list.
   */
  accountId: string;
}

Auth.Credentials = Credentials;

export declare namespace Auth {
  export {
    type AuthListSessionsResponse as AuthListSessionsResponse,
    type AuthListSessionsParams as AuthListSessionsParams,
  };

  export {
    Credentials as Credentials,
    type CredentialCreateResponse as CredentialCreateResponse,
    type CredentialListResponse as CredentialListResponse,
    type CredentialResendChallengeResponse as CredentialResendChallengeResponse,
    type CredentialRevokeResponse as CredentialRevokeResponse,
    type CredentialVerifyResponse as CredentialVerifyResponse,
    type CredentialCreateParams as CredentialCreateParams,
    type CredentialListParams as CredentialListParams,
    type CredentialRevokeParams as CredentialRevokeParams,
    type CredentialVerifyParams as CredentialVerifyParams,
  };
}
