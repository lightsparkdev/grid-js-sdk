// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

/**
 * Internal account management endpoints for creating and managing internal accounts
 */
export class InternalAccounts extends APIResource {
  /**
   * Export the wallet credentials of an Embedded Wallet internal account. The
   * returned wallet credentials are HPKE-encrypted to the `clientPublicKey` supplied
   * in the request body.
   *
   * Export is a two-step signed-retry flow (same pattern as add-additional
   * credential, revoke credential, and revoke session):
   *
   * 1. Call `POST /internal-accounts/{id}/export` with the request body
   *    `{ "clientPublicKey": "..." }` and no signature headers. Grid binds the
   *    `clientPublicKey` into the `payloadToSign` it returns, so the subsequent
   *    stamp in `Grid-Wallet-Signature` commits to the target encryption key. The
   *    response is `202` with `payloadToSign`, `requestId`, and `expiresAt`.
   *
   * 2. Use the session API keypair of a verified authentication credential on the
   *    same internal account to build an API-key stamp over `payloadToSign`, then
   *    retry with that full stamp as the `Grid-Wallet-Signature` header and the
   *    `requestId` echoed back as the `Request-Id` header. The retry body must carry
   *    the **same** `clientPublicKey` submitted in step 1 — Grid rejects the retry
   *    with `401` if it disagrees with what was bound into `payloadToSign`. The
   *    signed retry returns `200` with `encryptedWalletCredentials`, which the
   *    client decrypts with the matching private key.
   *
   * The `clientPublicKey` is ephemeral: generate a fresh P-256 keypair for this
   * export and discard the private key after decrypting. Do not reuse the keypair
   * from any prior verify call — that private key was already discarded after
   * decrypting the session signing key it was issued against.
   *
   * @example
   * ```ts
   * const response = await client.internalAccounts.export(
   *   'id',
   *   {
   *     clientPublicKey:
   *       '04f45f2a22c908b9ce09a7150e514afd24627c401c38a4afc164e1ea783adaaa31d4245acfb88c2ebd42b47628d63ecabf345484f0a9f665b63c54c897d5578be2',
   *   },
   * );
   * ```
   */
  export(
    id: string,
    params: InternalAccountExportParams,
    options?: RequestOptions,
  ): APIPromise<InternalAccountExportResponse> {
    const { 'Grid-Wallet-Signature': gridWalletSignature, 'Request-Id': requestID, ...body } = params;
    return this._client.post(path`/internal-accounts/${id}/export`, {
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
}

export interface InternalAccountExportResponse {
  /**
   * The id of the internal account that was exported.
   */
  id: string;

  /**
   * Encrypted wallet mnemonic, sealed to the `clientPublicKey` from the request body
   * using HPKE: DHKEM(P-256, HKDF-SHA256) + HKDF-SHA256 + AES-256-GCM. Decrypt with
   * the matching private key, then manage the mnemonic securely because it is the
   * master key of the self-custodial Embedded Wallet. The value is a JSON string of
   * the form
   * `{"version": "v1.0.0", "data": "<hex>", "dataSignature": "<hex>", "enclaveQuorumPublic": "<hex>"}`.
   * `data` hex-decodes to JSON
   * `{"encappedPublic": "<hex>", "ciphertext": "<hex>", "organizationId": "<id>"}`,
   * where `encappedPublic` is the uncompressed SEC1 ephemeral public key.
   * `dataSignature` is an ECDSA-P256-SHA256 signature over the `data` bytes produced
   * by the issuer key in `enclaveQuorumPublic`; verify before decrypting. In
   * sandbox, `dataSignature` and `enclaveQuorumPublic` are empty strings. Clients
   * should bypass attestation verification when calling against sandbox.
   */
  encryptedWalletCredentials: string;
}

export interface InternalAccountExportParams {
  /**
   * Body param: Fresh P-256 public key, uncompressed SEC1 hex — 130 hex chars where
   * the first two are `04` (the uncompressed-point indicator). Generate a new
   * keypair for each export and discard the private key after decrypting the
   * response.
   */
  clientPublicKey: string;

  /**
   * Header param: Full API-key stamp built over the prior `payloadToSign` with the
   * session API keypair of a verified authentication credential on the target
   * internal account. Required on the signed retry; ignored on the initial call.
   */
  'Grid-Wallet-Signature'?: string;

  /**
   * Header param: The `requestId` returned in a prior `202` response, echoed back on
   * the signed retry so the server can correlate it with the issued challenge.
   * Required on the signed retry; must be paired with `Grid-Wallet-Signature`.
   */
  'Request-Id'?: string;
}

export declare namespace InternalAccounts {
  export {
    type InternalAccountExportResponse as InternalAccountExportResponse,
    type InternalAccountExportParams as InternalAccountExportParams,
  };
}
