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
   * Export the wallet credentials of an Embedded Wallet internal account. Wallet
   * credentials are returned encrypted to the client public key that was supplied
   * when the authorizing session was verified.
   *
   * Export is a two-step signed-retry flow (same pattern as add-additional
   * credential, revoke credential, and revoke session):
   *
   * 1. Call `POST /internal-accounts/{id}/export` with no headers. The response is
   *    `202` with a `payloadToSign`, `requestId`, and `expiresAt`.
   *
   * 2. Sign the `payloadToSign` with the session private key of a verified
   *    authentication credential on the same internal account and retry with the
   *    signature as the `Grid-Wallet-Signature` header and the `requestId` echoed
   *    back as the `Request-Id` header. The signed retry returns `200` with
   *    `encryptedWalletCredentials`, which the client can decrypt with its local
   *    private key.
   *
   * @example
   * ```ts
   * const response = await client.internalAccounts.export('id');
   * ```
   */
  export(
    id: string,
    params: InternalAccountExportParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<InternalAccountExportResponse> {
    const { 'Grid-Wallet-Signature': gridWalletSignature, 'Request-Id': requestID } = params ?? {};
    return this._client.post(path`/internal-accounts/${id}/export`, {
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
   * Encrypted wallet mnemonic, sealed to the `clientPublicKey` supplied on the
   * verify request. Decrypt with the matching private key, then manage the mnemonic
   * securely — it is the master key of the self-custodial Embedded Wallet. Encoded
   * as base58check (same format as `AuthSession.encryptedSessionSigningKey`).
   */
  encryptedWalletCredentials: string;
}

export interface InternalAccountExportParams {
  /**
   * Signature over the `payloadToSign` returned in a prior `202` response, produced
   * with the session private key of a verified authentication credential on the
   * target internal account and base64-encoded. Required on the signed retry;
   * ignored on the initial call.
   */
  'Grid-Wallet-Signature'?: string;

  /**
   * The `requestId` returned in a prior `202` response, echoed back on the signed
   * retry so the server can correlate it with the issued challenge. Required on the
   * signed retry; must be paired with `Grid-Wallet-Signature`.
   */
  'Request-Id'?: string;
}

export declare namespace InternalAccounts {
  export {
    type InternalAccountExportResponse as InternalAccountExportResponse,
    type InternalAccountExportParams as InternalAccountExportParams,
  };
}
