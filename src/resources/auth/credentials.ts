// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as SessionsAPI from './sessions';
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
   * Embedded Wallet internal accounts are initialized with an `EMAIL_OTP` credential
   * tied to the customer email on the account. Use this endpoint to add another
   * credential (`OAUTH` or `PASSKEY`), or to add `EMAIL_OTP` back after it has been
   * removed. Only one `EMAIL_OTP` credential and one `PASSKEY` credential are
   * supported per internal account.
   *
   * Adding a credential requires a signature from an existing verified credential on
   * the same account. Call this endpoint with the new credential's details to
   * receive `202` with `payloadToSign` and `requestId`. Use the session API keypair
   * of an existing verified credential (decrypted client-side from its
   * `encryptedSessionSigningKey`) to build an API-key stamp over `payloadToSign`,
   * then retry the same request with that full stamp as the `Grid-Wallet-Signature`
   * header and the `requestId` echoed back as the `Request-Id` header. The signed
   * retry returns `201` with the created `AuthMethod`. For `EMAIL_OTP`, the OTP
   * email is triggered on the signed retry, and the credential must then be
   * activated via `POST /auth/credentials/{id}/verify`.
   *
   * @example
   * ```ts
   * const authMethodResponse =
   *   await client.auth.credentials.create({
   *     AuthCredentialCreateRequest: {
   *       accountId:
   *         'InternalAccount:019542f5-b3e7-1d02-0000-000000000002',
   *       type: 'EMAIL_OTP',
   *     },
   *   });
   * ```
   */
  create(params: CredentialCreateParams, options?: RequestOptions): APIPromise<AuthMethodResponse> {
    const {
      AuthCredentialCreateRequest,
      'Grid-Wallet-Signature': gridWalletSignature,
      'Request-Id': requestID,
    } = params;
    return this._client.post('/auth/credentials', {
      body: AuthCredentialCreateRequest,
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
   * Retrieve all authentication credentials registered on an Embedded Wallet
   * internal account.
   *
   * The response is not paginated: an internal account is expected to have a small,
   * bounded number of credentials (typically 1–5), so all results are returned
   * inline. Additional per-credential detail (such as active session expiry) is
   * available on `GET /auth/sessions`.
   *
   * @example
   * ```ts
   * const authCredentialListResponse =
   *   await client.auth.credentials.list({
   *     accountId: 'accountId',
   *   });
   * ```
   */
  list(query: CredentialListParams, options?: RequestOptions): APIPromise<AuthCredentialListResponse> {
    return this._client.get('/auth/credentials', { query, ...options });
  }

  /**
   * Revoke an authentication credential on an Embedded Wallet internal account.
   *
   * Revocation is a two-step flow because it must be authorized by a session on a
   * _different_ credential on the same internal account:
   *
   * 1. Call `DELETE /auth/credentials/{id}` with no headers. The response is `202`
   *    with a `payloadToSign`, `requestId`, and `expiresAt`.
   *
   * 2. Use the session API keypair of an existing verified credential on the same
   *    internal account — other than the one being revoked — to build an API-key
   *    stamp over `payloadToSign`, then retry the same `DELETE` request with that
   *    full stamp as the `Grid-Wallet-Signature` header and the `requestId` echoed
   *    back as the `Request-Id` header. The signed retry returns `204`.
   *
   * The account must retain at least one authentication credential; an account with
   * only a single credential cannot use this endpoint to revoke it.
   *
   * @example
   * ```ts
   * const authSignedRequestChallenge =
   *   await client.auth.credentials.delete('id');
   * ```
   */
  delete(
    id: string,
    params: CredentialDeleteParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<AuthSignedRequestChallenge> {
    const { 'Grid-Wallet-Signature': gridWalletSignature, 'Request-Id': requestID } = params ?? {};
    return this._client.delete(path`/auth/credentials/${id}`, {
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
   * address on file. The response is a plain `AuthMethod`; there is no challenge
   * body to surface because the OTP is delivered out-of-band via email. After the
   * user receives the new OTP, call `POST /auth/credentials/{id}/verify` to complete
   * verification and issue a session.
   *
   * `OAUTH` credentials do not have a challenge step. To authenticate or
   * reauthenticate an OAuth credential, call `POST /auth/credentials/{id}/verify`
   * with a fresh OIDC token and a `clientPublicKey`.
   *
   * For `PASSKEY` credentials, this issues a fresh Grid-generated WebAuthn challenge
   * for reauthentication. The request body must carry the client's ephemeral
   * `clientPublicKey` so Grid can bake it into the Turnkey session-creation payload
   * the returned challenge is computed from — this seals the resulting session
   * signing key to the client. The response is a `PasskeyAuthChallenge` — the
   * passkey auth method fields plus the WebAuthn `credentialId`, new `challenge`,
   * `requestId`, and `expiresAt`. The client passes `credentialId` as
   * `allowCredentials[].id` and `challenge` as the WebAuthn challenge in
   * `navigator.credentials.get()`, then submits the resulting assertion to
   * `POST /auth/credentials/{id}/verify` with `Request-Id: <requestId>` to receive a
   * session.
   *
   * @example
   * ```ts
   * const authCredentialResponseOneOf =
   *   await client.auth.credentials.challenge('id', {
   *     clientPublicKey:
   *       '04f45f2a22c908b9ce09a7150e514afd24627c401c38a4afc164e1ea783adaaa31d4245acfb88c2ebd42b47628d63ecabf345484f0a9f665b63c54c897d5578be2',
   *   });
   * ```
   */
  challenge(
    id: string,
    body: CredentialChallengeParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<AuthCredentialResponseOneOf> {
    return this._client.post(path`/auth/credentials/${id}/challenge`, { body, ...options });
  }

  /**
   * Complete the verification step for a previously created authentication
   * credential and issue a session signing key.
   *
   * For `EMAIL_OTP` credentials, supply the one-time password that was emailed to
   * the user along with a client-generated public key. For `OAUTH` credentials,
   * supply a fresh OIDC token (`iat` must be less than 60 seconds before the
   * request) along with the client-generated public key; this is also the
   * reauthentication path after a prior session expired. For `PASSKEY` credentials,
   * the client completes a WebAuthn assertion (`navigator.credentials.get()`)
   * against the Grid-issued `challenge` returned from
   * `POST /auth/credentials/{id}/challenge`, and submits the resulting `assertion`
   * with the `Request-Id` header. The `clientPublicKey` for `PASSKEY` credentials is
   * supplied on the challenge call, where it is bound into the pending
   * session-creation request.
   *
   * On success, the response contains an `encryptedSessionSigningKey` that is
   * encrypted to the supplied `clientPublicKey`, along with an `expiresAt` timestamp
   * marking when the session expires. The `clientPublicKey` is ephemeral and
   * one-time-use per verification request.
   *
   * @example
   * ```ts
   * const authSession = await client.auth.credentials.verify(
   *   'id',
   *   {
   *     AuthCredentialVerifyRequest: {
   *       clientPublicKey:
   *         '04f45f2a22c908b9ce09a7150e514afd24627c401c38a4afc164e1ea783adaaa31d4245acfb88c2ebd42b47628d63ecabf345484f0a9f665b63c54c897d5578be2',
   *       otp: '123456',
   *       type: 'EMAIL_OTP',
   *     },
   *   },
   * );
   * ```
   */
  verify(
    id: string,
    params: CredentialVerifyParams,
    options?: RequestOptions,
  ): APIPromise<SessionsAPI.AuthSession> {
    const { AuthCredentialVerifyRequest, 'Request-Id': requestID } = params;
    return this._client.post(path`/auth/credentials/${id}/verify`, {
      body: AuthCredentialVerifyRequest,
      ...options,
      headers: buildHeaders([
        { ...(requestID != null ? { 'Request-Id': requestID } : undefined) },
        options?.headers,
      ]),
    });
  }
}

export interface AuthCredentialCreateRequest {
  /**
   * Identifier of the internal account that this credential will authenticate.
   */
  accountId: string;
}

export type AuthCredentialCreateRequestOneOf =
  | EmailOtpCredentialCreateRequest
  | OAuthCredentialCreateRequest
  | PasskeyCredentialCreateRequest;

export interface AuthCredentialListResponse {
  /**
   * List of authentication credentials registered on the internal account.
   */
  data: Array<AuthMethod>;
}

/**
 * Discriminated response shape returned from
 * `POST /auth/credentials/{id}/challenge`. For `EMAIL_OTP` credentials the body is
 * a plain `AuthMethod` (wrapped as `AuthMethodResponse` to disambiguate the
 * oneOf). For `PASSKEY` credentials the body is a `PasskeyAuthChallenge` — the
 * passkey auth method fields plus the WebAuthn `credentialId`, Grid-issued
 * `challenge`, `requestId`, and `expiresAt` that drive the subsequent assertion.
 * OAuth credentials do not use the challenge endpoint. Registration responses from
 * `POST /auth/credentials` use the simpler `AuthMethodResponse` shape directly for
 * all three credential types.
 */
export type AuthCredentialResponseOneOf = AuthMethodResponse | PasskeyAuthChallenge;

export type AuthCredentialVerifyRequest = unknown;

export type AuthCredentialVerifyRequestOneOf =
  | EmailOtpCredentialVerifyRequestFields
  | OAuthCredentialVerifyRequestFields
  | PasskeyCredentialVerifyRequestFields;

export interface AuthMethod {
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
   * the OIDC token; for PASSKEY credentials it is the validated nickname provided at
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
  type: AuthMethodType;

  /**
   * Last update timestamp.
   */
  updatedAt: string;

  /**
   * Base64url-encoded WebAuthn credential identifier for this passkey. Present only
   * for `PASSKEY` authentication credentials. Corresponds to
   * `PublicKeyCredential.rawId`; pass this value as `allowCredentials[].id` when
   * requesting a passkey assertion for this auth method.
   */
  credentialId?: string;
}

/**
 * Strict wrapper around `AuthMethod`. Used directly as the registration response
 * on `POST /auth/credentials` (all three credential types) and inside
 * `AuthCredentialResponseOneOf` for the `EMAIL_OTP` branch of
 * `POST /auth/credentials/{id}/challenge`. The only difference from `AuthMethod`
 * is `unevaluatedProperties: false`, which disambiguates the oneOf against
 * `PasskeyAuthChallenge` — without the strictness, an `AuthMethod` with extra
 * fields would ambiguously match both branches.
 */
export interface AuthMethodResponse {
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
   * the OIDC token; for PASSKEY credentials it is the validated nickname provided at
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
  type: AuthMethodType;

  /**
   * Last update timestamp.
   */
  updatedAt: string;

  /**
   * Base64url-encoded WebAuthn credential identifier for this passkey. Present only
   * for `PASSKEY` authentication credentials. Corresponds to
   * `PublicKeyCredential.rawId`; pass this value as `allowCredentials[].id` when
   * requesting a passkey assertion for this auth method.
   */
  credentialId?: string;
}

/**
 * The type of authentication credential.
 *
 * - `OAUTH`: OpenID Connect (OIDC) token issued by an identity provider such as
 *   Google or Apple.
 * - `EMAIL_OTP`: A one-time password delivered to the user's email address.
 * - `PASSKEY`: A WebAuthn passkey bound to the user's device.
 */
export type AuthMethodType = 'OAUTH' | 'EMAIL_OTP' | 'PASSKEY';

/**
 * 202 response returned from Embedded Wallet Auth endpoints that require a signed
 * retry — `POST /auth/credentials` (adding an additional credential),
 * `DELETE /auth/credentials/{id}` (revoking a credential), and
 * `DELETE /auth/sessions/{id}` (revoking a session). Carries the signing fields
 * from `SignedRequestChallenge` plus the `type` of the authentication credential
 * involved (being added, revoked, or that issued the session being revoked). The
 * client already knows the target resource id from the request path / body it just
 * sent, so nothing beyond `type` is echoed in the response.
 */
export interface AuthSignedRequestChallenge extends SignedRequestChallenge {
  /**
   * Credential type relevant to this challenge: the credential type being added
   * (`POST /auth/credentials`) or revoked (`DELETE /auth/credentials/{id}`). For
   * session revocation, this is the type of credential that issued the session
   * (`DELETE /auth/sessions/{id}`).
   */
  type: AuthMethodType;
}

export interface EmailOtpCredentialCreateRequest
  extends AuthCredentialCreateRequest,
    EmailOtpCredentialCreateRequestFields {}

export interface EmailOtpCredentialCreateRequestFields {
  /**
   * Discriminator value identifying this as an email OTP credential.
   */
  type: 'EMAIL_OTP';
}

export interface EmailOtpCredentialVerifyRequestFields {
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
  type: 'EMAIL_OTP';
}

export interface OAuthCredentialCreateRequest
  extends AuthCredentialCreateRequest,
    OAuthCredentialCreateRequestFields {}

export interface OAuthCredentialCreateRequestFields {
  /**
   * OIDC ID token issued by the identity provider (e.g. Google, Apple). Grid fetches
   * the issuer's signing key from the `iss` claim's `.well-known` OpenID
   * configuration and verifies the token signature. The token's `iat` claim must be
   * less than 60 seconds before the request timestamp.
   */
  oidcToken: string;

  /**
   * Discriminator value identifying this as an OAuth credential.
   */
  type: 'OAUTH';
}

export interface OAuthCredentialVerifyRequestFields {
  /**
   * Client-generated P-256 public key, hex-encoded in uncompressed SEC1 format (0x04
   * prefix followed by the 32-byte X and 32-byte Y coordinates; 130 hex characters
   * total). The matching private key must remain on the client. Grid encrypts the
   * session signing key returned in the response to this public key. The key is
   * ephemeral and one-time-use per verification request.
   */
  clientPublicKey: string;

  /**
   * OIDC ID token issued by the identity provider. For reauthentication after a
   * prior session expired, supply a fresh token — the token's `iat` claim must be
   * less than 60 seconds before the request timestamp. Grid fetches the issuer's
   * signing key from the `iss` claim's `.well-known` OpenID configuration and
   * verifies the token signature.
   */
  oidcToken: string;

  /**
   * Discriminator value identifying this as an OAuth verification.
   */
  type: 'OAUTH';
}

export interface PasskeyAssertion {
  /**
   * Base64url-encoded authenticator data returned by the authenticator during the
   * assertion. Corresponds to `AuthenticatorAssertionResponse.authenticatorData`.
   */
  authenticatorData: string;

  /**
   * Base64url-encoded JSON client data collected by the browser during the WebAuthn
   * `navigator.credentials.get()` call. Corresponds to
   * `AuthenticatorAssertionResponse.clientDataJSON` from the WebAuthn spec — Grid's
   * field name is intentionally camelCased as `clientDataJson` (lowercase JSON) for
   * consistency with the rest of the API; the value is the same bytes the browser
   * returns. Contains the challenge, origin, and `type: "webauthn.get"`.
   */
  clientDataJson: string;

  /**
   * Base64url-encoded credential identifier returned during the WebAuthn assertion.
   * Corresponds to `PublicKeyCredential.rawId`.
   */
  credentialId: string;

  /**
   * Base64url-encoded signature produced by the authenticator over
   * `authenticatorData || SHA-256(clientDataJSON)`. Corresponds to
   * `AuthenticatorAssertionResponse.signature`. The signature byte format is
   * determined by the credential's public-key algorithm — DER-encoded ECDSA for
   * ES256 (P-256, typical for passkeys), PKCS#1 v1.5 for RS256, or a raw 64-byte
   * signature for EdDSA.
   */
  signature: string;

  /**
   * Base64url-encoded user handle returned by the authenticator. Corresponds to
   * `AuthenticatorAssertionResponse.userHandle`. Populated (and required by the
   * WebAuthn spec) for discoverable credentials — resident keys used in the "Sign in
   * with passkey" autofill flow — and typically present for passkey registrations.
   * Omit this field entirely for non-discoverable credentials specified via
   * `allowCredentials` where the authenticator returns no user handle.
   */
  userHandle?: string;
}

export interface PasskeyAttestation {
  /**
   * Base64url-encoded CBOR attestation object produced by the authenticator during
   * registration. Corresponds to
   * `AuthenticatorAttestationResponse.attestationObject`.
   */
  attestationObject: string;

  /**
   * Base64url-encoded JSON client data collected by the browser during the WebAuthn
   * `navigator.credentials.create()` call. Corresponds to
   * `AuthenticatorAttestationResponse.clientDataJSON` from the WebAuthn spec —
   * Grid's field name is intentionally camelCased as `clientDataJson` (lowercase
   * JSON) for consistency with the rest of the API; the value is the same bytes the
   * browser returns. Contains the challenge, origin, and `type: "webauthn.create"`.
   */
  clientDataJson: string;

  /**
   * Base64url-encoded credential identifier produced by the authenticator at
   * registration time. Typically the base64url of `PublicKeyCredential.rawId`.
   */
  credentialId: string;

  /**
   * Optional. WebAuthn transports as returned by
   * `AuthenticatorAttestationResponse.getTransports()`. Values follow the W3C
   * `AuthenticatorTransport` enum — pass the raw values through to Grid;
   * provider-specific translation is handled server-side. Some authenticators return
   * an empty array; omit the field or send `[]` in that case.
   */
  transports?: Array<'usb' | 'nfc' | 'ble' | 'internal' | 'hybrid'>;
}

/**
 * Extended `AuthMethod` shape returned for `PASSKEY` credentials from
 * `POST /auth/credentials/{id}/challenge`. Includes the WebAuthn `credentialId`
 * needed to target the passkey, plus the Grid-issued `challenge`, corresponding
 * `requestId`, and challenge `expiresAt`. The client signs the challenge with the
 * passkey to produce the assertion submitted to
 * `POST /auth/credentials/{id}/verify`.
 */
export interface PasskeyAuthChallenge extends AuthMethod {
  /**
   * Base64url-encoded challenge issued by Grid for the pending passkey
   * authentication. The client passes it into `navigator.credentials.get()` as the
   * WebAuthn challenge; the resulting assertion is submitted to
   * `POST /auth/credentials/{id}/verify`. Single-use; a new challenge is issued on
   * the next call to `POST /auth/credentials/{id}/challenge`.
   */
  challenge: string;

  /**
   * Base64url-encoded WebAuthn credential identifier for this passkey. Corresponds
   * to `PublicKeyCredential.rawId`; pass this value as `allowCredentials[].id` when
   * requesting a passkey assertion for this auth method.
   */
  credentialId: string;

  /**
   * Timestamp after which the issued challenge is no longer valid. The assertion
   * must reach `POST /auth/credentials/{id}/verify` before this time; otherwise the
   * client must request a fresh challenge via
   * `POST /auth/credentials/{id}/challenge`.
   */
  expiresAt: string;

  /**
   * Grid-issued `Request:<uuid>` identifier for this pending passkey authentication
   * request. Echo this value exactly as the `Request-Id` header on the subsequent
   * `POST /auth/credentials/{id}/verify` call so Grid can correlate the assertion
   * with the issued challenge.
   */
  requestId: string;
}

export interface PasskeyCredentialCreateRequest
  extends AuthCredentialCreateRequest,
    PasskeyCredentialCreateRequestFields {}

export interface PasskeyCredentialCreateRequestFields {
  attestation: PasskeyAttestation;

  /**
   * Base64url-encoded WebAuthn challenge issued by the platform backend and passed
   * to the client before `navigator.credentials.create()`. Grid verifies it matches
   * the challenge embedded in the attestation's `clientDataJson`, binding the
   * attestation to this registration. Must be single-use.
   */
  challenge: string;

  /**
   * Human-readable identifier for the passkey, chosen by the user at registration
   * time (e.g. "iPhone Face-ID", "YubiKey 5C"). Leading and trailing whitespace is
   * ignored. Must be 1-100 characters and may contain Unicode letters, numbers,
   * spaces, and the following separators: period, underscore, hyphen, apostrophe,
   * and parentheses. Shown back on AuthMethod responses and in credential listings.
   */
  nickname: string;

  /**
   * Discriminator value identifying this as a passkey credential.
   */
  type: 'PASSKEY';
}

export interface PasskeyCredentialVerifyRequestFields {
  assertion: PasskeyAssertion;

  /**
   * Discriminator value identifying this as a passkey verification.
   */
  type: 'PASSKEY';
}

/**
 * Common base for two-step signed-retry challenge responses on Embedded Wallet
 * endpoints (credential registration or revocation, session refresh or revocation,
 * wallet export, customer email updates, and similar). Holds the signing fields
 * shared across every challenge shape; each variant composes this base via `allOf`
 * and adds its own resource `id` (and `type`, when applicable) with
 * variant-specific description and example.
 */
export interface SignedRequestChallenge {
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
   * Grid-issued `Request:<uuid>` identifier for this pending request. Echo this
   * value exactly in the `Request-Id` header on the signed retry so the server can
   * correlate the retry with the issued challenge.
   */
  requestId: string;
}

export interface CredentialCreateParams {
  /**
   * Body param
   */
  AuthCredentialCreateRequest: AuthCredentialCreateRequestOneOf;

  /**
   * Header param: Full API-key stamp built over the prior `payloadToSign` with the
   * session API keypair of an existing verified authentication credential on the
   * target internal account. Required on the signed retry.
   */
  'Grid-Wallet-Signature'?: string;

  /**
   * Header param: The `requestId` returned in a prior `202` response, echoed back
   * exactly on the signed retry so the server can correlate it with the issued
   * challenge. Required on the signed retry when registering a credential; must be
   * paired with `Grid-Wallet-Signature`.
   */
  'Request-Id'?: string;
}

export interface CredentialListParams {
  /**
   * Internal account id whose authentication credentials to list.
   */
  accountId: string;
}

export interface CredentialDeleteParams {
  /**
   * Full API-key stamp built over the prior `payloadToSign` with the session API
   * keypair of an existing verified authentication credential on the same internal
   * account (other than the one being revoked). Required on the signed retry;
   * ignored on the initial call.
   */
  'Grid-Wallet-Signature'?: string;

  /**
   * The `requestId` returned in a prior `202` response, echoed back exactly on the
   * signed retry so the server can correlate it with the issued challenge. Required
   * on the signed retry; must be paired with `Grid-Wallet-Signature`.
   */
  'Request-Id'?: string;
}

export interface CredentialChallengeParams {
  /**
   * Required for `PASSKEY` credentials. Client-generated P-256 public key,
   * hex-encoded in uncompressed SEC1 format (`04` prefix followed by the 32-byte X
   * and 32-byte Y coordinates; 130 hex characters total). The matching private key
   * must remain on the client. Grid bakes this key into the Turnkey session-creation
   * payload that the returned `challenge` is computed from, so the resulting session
   * signing key is sealed to the client. Ignored for `EMAIL_OTP`.
   */
  clientPublicKey?: string;
}

export interface CredentialVerifyParams {
  /**
   * Body param
   */
  AuthCredentialVerifyRequest: AuthCredentialVerifyRequestOneOf;

  /**
   * Header param: The `requestId` returned alongside the Grid-issued `challenge`
   * from `POST /auth/credentials/{id}/challenge`, echoed back exactly here so Grid
   * can correlate the assertion with the pending challenge.
   */
  'Request-Id'?: string;
}

export declare namespace Credentials {
  export {
    type AuthCredentialCreateRequest as AuthCredentialCreateRequest,
    type AuthCredentialCreateRequestOneOf as AuthCredentialCreateRequestOneOf,
    type AuthCredentialListResponse as AuthCredentialListResponse,
    type AuthCredentialResponseOneOf as AuthCredentialResponseOneOf,
    type AuthCredentialVerifyRequest as AuthCredentialVerifyRequest,
    type AuthCredentialVerifyRequestOneOf as AuthCredentialVerifyRequestOneOf,
    type AuthMethod as AuthMethod,
    type AuthMethodResponse as AuthMethodResponse,
    type AuthMethodType as AuthMethodType,
    type AuthSignedRequestChallenge as AuthSignedRequestChallenge,
    type EmailOtpCredentialCreateRequest as EmailOtpCredentialCreateRequest,
    type EmailOtpCredentialCreateRequestFields as EmailOtpCredentialCreateRequestFields,
    type EmailOtpCredentialVerifyRequestFields as EmailOtpCredentialVerifyRequestFields,
    type OAuthCredentialCreateRequest as OAuthCredentialCreateRequest,
    type OAuthCredentialCreateRequestFields as OAuthCredentialCreateRequestFields,
    type OAuthCredentialVerifyRequestFields as OAuthCredentialVerifyRequestFields,
    type PasskeyAssertion as PasskeyAssertion,
    type PasskeyAttestation as PasskeyAttestation,
    type PasskeyAuthChallenge as PasskeyAuthChallenge,
    type PasskeyCredentialCreateRequest as PasskeyCredentialCreateRequest,
    type PasskeyCredentialCreateRequestFields as PasskeyCredentialCreateRequestFields,
    type PasskeyCredentialVerifyRequestFields as PasskeyCredentialVerifyRequestFields,
    type SignedRequestChallenge as SignedRequestChallenge,
    type CredentialCreateParams as CredentialCreateParams,
    type CredentialListParams as CredentialListParams,
    type CredentialDeleteParams as CredentialDeleteParams,
    type CredentialChallengeParams as CredentialChallengeParams,
    type CredentialVerifyParams as CredentialVerifyParams,
  };
}
