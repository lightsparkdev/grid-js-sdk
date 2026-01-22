// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as ExternalAccountsAPI from './customers/external-accounts';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Plaid extends APIResource {
  /**
   * Creates a Plaid Link token that can be used to initialize Plaid Link in your
   * application. The Link token is used to authenticate the customer and allow them
   * to select their bank account.
   *
   * **Async Flow:**
   *
   * 1. Platform calls this endpoint to get a link_token and callbackUrl
   * 2. Platform displays Plaid Link UI to the end customer using the link_token
   * 3. End customer authenticates with their bank and selects an account
   * 4. Plaid returns a public_token to the platform
   * 5. Platform POSTs the public_token to the callbackUrl
   * 6. Lightspark exchanges the public_token with Plaid and creates the external
   *    account asynchronously
   * 7. Platform receives a webhook notification when the external account is ready
   *
   * @example
   * ```ts
   * const response = await client.plaid.createLinkToken({
   *   customerId:
   *     'Customer:019542f5-b3e7-1d02-0000-000000000001',
   * });
   * ```
   */
  createLinkToken(
    body: PlaidCreateLinkTokenParams,
    options?: RequestOptions,
  ): APIPromise<PlaidCreateLinkTokenResponse> {
    return this._client.post('/plaid/link-tokens', { body, ...options });
  }

  /**
   * After the customer completes Plaid Link authentication, the platform should POST
   * the public_token to this callback URL (provided in the link token response).
   *
   * This will trigger asynchronous processing:
   *
   * 1. Lightspark exchanges the public_token for an access_token with Plaid
   * 2. Lightspark retrieves and verifies the account details
   * 3. An external account is created
   * 4. A webhook notification is sent to the platform when complete
   *
   * @example
   * ```ts
   * const externalAccount =
   *   await client.plaid.submitPublicToken(
   *     'link-sandbox-abc123xyz-1234-5678',
   *     {
   *       publicToken:
   *         'public-sandbox-12345678-1234-1234-1234-123456789012',
   *       accountId: 'plaid_account_id_123',
   *     },
   *   );
   * ```
   */
  submitPublicToken(
    plaidLinkToken: string,
    body: PlaidSubmitPublicTokenParams,
    options?: RequestOptions,
  ): APIPromise<ExternalAccountsAPI.ExternalAccount> {
    return this._client.post(path`/plaid/callback/${plaidLinkToken}`, { body, ...options });
  }
}

export interface PlaidCreateLinkTokenResponse {
  /**
   * The URL where the platform should POST the public_token after the customer
   * completes Plaid Link authentication. This will trigger asynchronous external
   * account creation. The URL includes the linkToken as the path parameter.
   */
  callbackUrl: string;

  /**
   * The ISO 8601 timestamp when this link token expires. Link tokens typically
   * expire after 4 hours.
   */
  expiration: string;

  /**
   * The Plaid Link token to be used to initialize Plaid Link in your application.
   * This token is single-use and expires after the specified expiration time.
   */
  linkToken: string;

  /**
   * A unique identifier for this request, useful for debugging
   */
  requestId?: string;
}

export interface PlaidCreateLinkTokenParams {
  /**
   * The ID of the customer for whom to create the Plaid Link token and external
   * account
   */
  customerId: string;
}

export interface PlaidSubmitPublicTokenParams {
  /**
   * The public token returned by Plaid Link after the customer successfully
   * authenticates and selects an account.
   */
  publicToken: string;

  /**
   * Optional Plaid account ID if the customer selected a specific account. If not
   * provided, the default account will be used.
   */
  accountId?: string;
}

export declare namespace Plaid {
  export {
    type PlaidCreateLinkTokenResponse as PlaidCreateLinkTokenResponse,
    type PlaidCreateLinkTokenParams as PlaidCreateLinkTokenParams,
    type PlaidSubmitPublicTokenParams as PlaidSubmitPublicTokenParams,
  };
}
