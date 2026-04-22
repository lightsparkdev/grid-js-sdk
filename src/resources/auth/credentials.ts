// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

/**
 * Endpoints for registering and verifying end-user authentication credentials (email OTP, OAuth, passkey) used to sign Embedded Wallet actions.
 */
export class Credentials extends APIResource {
  /**
   * Register an authentication credential for an Embedded Wallet customer.
   *
   * **First credential on an internal account**
   *
   * If the target internal account does not yet have any authentication credential
   * registered, call this endpoint with the credential details. The response is
   * `201` with the created `AuthMethod`. For `EMAIL_OTP` credentials, this call also
   * triggers a one-time password email to the address on the customer record tied to
   * the internal account; the credential must be activated via
   * `POST /auth/credentials/{id}/verify` before it can sign requests. For `OAUTH`
   * credentials, the supplied `oidcToken` is validated inline against the issuer's
   * `.well-known` OpenID configuration (the token's `iat` must be less than 60
   * seconds before the request); activation still happens via
   * `POST /auth/credentials/{id}/verify`.
   *
   * **Adding an additional credential**
   *
   * Registering an additional credential against an internal account that already
   * has one requires a signature from an existing verified credential. Call this
   * endpoint with the new credential's details; if an existing credential is already
   * registered on the internal account the response is `202` with a `payloadToSign`
   * and a `requestId`. Sign the payload with the session private key of an existing
   * verified credential on the same internal account (decrypted client-side from its
   * `encryptedSessionSigningKey`) and retry the same request with the signature
   * supplied as the `Grid-Wallet-Signature` header and the `requestId` echoed back
   * as the `Request-Id` header. The signed retry returns `201` with the created
   * `AuthMethod`. For `EMAIL_OTP`, the OTP email is triggered on the signed retry,
   * and the credential must then be activated via
   * `POST /auth/credentials/{id}/verify`.
   *
   * @example
   * ```ts
   * const credential = await client.auth.credentials.create({
   *   accountId:
   *     'InternalAccount:019542f5-b3e7-1d02-0000-000000000002',
   *   type: 'EMAIL_OTP',
   * });
   * ```
   */
  create(params: CredentialCreateParams, options?: RequestOptions): APIPromise<CredentialCreateResponse> {
    const { 'Grid-Wallet-Signature': gridWalletSignature, 'Request-Id': requestID, ...body } = params;
    return this._client.post('/auth/credentials', {
      body,
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
   * Re-issue the challenge for an existing authentication credential.
   *
   * For `EMAIL_OTP` credentials, this triggers a new one-time password email to the
   * address on file. After the user receives the new OTP, call
   * `POST /auth/credentials/{id}/verify` to complete verification and issue a
   * session.
   *
   * @example
   * ```ts
   * const response =
   *   await client.auth.credentials.resendChallenge('id');
   * ```
   */
  resendChallenge(id: string, options?: RequestOptions): APIPromise<CredentialResendChallengeResponse> {
    return this._client.post(path`/auth/credentials/${id}/challenge`, options);
  }

  /**
   * Complete the verification step for a previously created authentication
   * credential and issue a session signing key.
   *
   * For `EMAIL_OTP` credentials, supply the one-time password that was emailed to
   * the user along with a client-generated public key. On success, the response
   * contains an `encryptedSessionSigningKey` that is encrypted to the supplied
   * `clientPublicKey`, along with an `expiresAt` timestamp marking when the session
   * expires. The `clientPublicKey` is ephemeral and one-time-use per verification
   * request.
   *
   * @example
   * ```ts
   * const response = await client.auth.credentials.verify(
   *   'id',
   *   {
   *     clientPublicKey:
   *       '04f45f2a22c908b9ce09a7150e514afd24627c401c38a4afc164e1ea783adaaa31d4245acfb88c2ebd42b47628d63ecabf345484f0a9f665b63c54c897d5578be2',
   *     otp: '123456',
   *     type: 'EMAIL_OTP',
   *   },
   * );
   * ```
   */
  verify(
    id: string,
    body: CredentialVerifyParams,
    options?: RequestOptions,
  ): APIPromise<CredentialVerifyResponse> {
    return this._client.post(path`/auth/credentials/${id}/verify`, { body, ...options });
  }
}

export interface CredentialCreateResponse {
  /**
   * System-generated unique identifier for the authentication credential.
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
}

export interface CredentialResendChallengeResponse {
  /**
   * System-generated unique identifier for the authentication credential.
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
}

export interface CredentialVerifyResponse {
  /**
   * System-generated unique identifier for the authentication credential.
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
   * HPKE-encrypted session signing key, sealed to the `clientPublicKey` supplied
   * when the credential was created. Encoded as a base58check string: the decoded
   * payload is a 33-byte compressed P-256 encapsulated public key followed by
   * AES-256-GCM ciphertext. The client decrypts this key with its private key and
   * uses it to sign subsequent Embedded Wallet requests until `expiresAt`.
   */
  encryptedSessionSigningKey: string;

  /**
   * Timestamp after which the session signing key is no longer valid.
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
}

export type CredentialCreateParams =
  | CredentialCreateParams.EmailOtpCredentialCreateRequest
  | CredentialCreateParams.OAuthCredentialCreateRequest;

export declare namespace CredentialCreateParams {
  export interface EmailOtpCredentialCreateRequest {
    /**
     * Body param: Identifier of the internal account that this credential will
     * authenticate.
     */
    accountId: string;

    /**
     * Body param: Discriminator value identifying this as an email OTP credential.
     */
    type: 'EMAIL_OTP' | 'OAUTH' | 'PASSKEY';

    /**
     * Header param: Signature over the `payloadToSign` returned in a prior `202`
     * response, produced with the session private key of an existing verified
     * authentication credential on the target internal account and base64-encoded.
     * Required when registering an additional credential on an internal account that
     * already has one; ignored when the internal account has no existing credentials.
     */
    'Grid-Wallet-Signature'?: string;

    /**
     * Header param: The `requestId` returned in a prior `202` response, echoed back on
     * the signed retry so the server can correlate it with the issued challenge.
     * Required on the signed retry when registering an additional credential; must be
     * paired with `Grid-Wallet-Signature`.
     */
    'Request-Id'?: string;
  }

  export interface OAuthCredentialCreateRequest {
    /**
     * Body param: Identifier of the internal account that this credential will
     * authenticate.
     */
    accountId: string;

    /**
     * Body param: OIDC ID token issued by the identity provider (e.g. Google, Apple).
     * Grid fetches the issuer's signing key from the `iss` claim's `.well-known`
     * OpenID configuration and verifies the token signature. The token's `iat` claim
     * must be less than 60 seconds before the request timestamp.
     */
    oidcToken: string;

    /**
     * Body param: Discriminator value identifying this as an OAuth credential.
     */
    type: 'OAUTH' | 'EMAIL_OTP' | 'PASSKEY';

    /**
     * Header param: Signature over the `payloadToSign` returned in a prior `202`
     * response, produced with the session private key of an existing verified
     * authentication credential on the target internal account and base64-encoded.
     * Required when registering an additional credential on an internal account that
     * already has one; ignored when the internal account has no existing credentials.
     */
    'Grid-Wallet-Signature'?: string;

    /**
     * Header param: The `requestId` returned in a prior `202` response, echoed back on
     * the signed retry so the server can correlate it with the issued challenge.
     * Required on the signed retry when registering an additional credential; must be
     * paired with `Grid-Wallet-Signature`.
     */
    'Request-Id'?: string;
  }
}

export interface CredentialVerifyParams {
  /**
   * Client-generated P-256 public key, hex-encoded in uncompressed SEC1 format (0x04
   * prefix followed by the 32-byte X and 32-byte Y coordinates; 130 hex characters
   * total). The matching private key must remain on the client. Grid encrypts the
   * session signing key returned in the response to this public key. The key is
   * ephemeral and one-time-use per verification request.
   */
  clientPublicKey: string;

  /**
   * The one-time password received by the user via email.
   */
  otp: string;

  /**
   * Discriminator value identifying this as an email OTP verification.
   */
  type: 'EMAIL_OTP' | 'OAUTH' | 'PASSKEY';
}

export declare namespace Credentials {
  export {
    type CredentialCreateResponse as CredentialCreateResponse,
    type CredentialResendChallengeResponse as CredentialResendChallengeResponse,
    type CredentialVerifyResponse as CredentialVerifyResponse,
    type CredentialCreateParams as CredentialCreateParams,
    type CredentialVerifyParams as CredentialVerifyParams,
  };
}
