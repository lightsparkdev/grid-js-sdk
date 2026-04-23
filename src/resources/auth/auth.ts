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

export class Auth extends APIResource {
  credentials: CredentialsAPI.Credentials = new CredentialsAPI.Credentials(this._client);
}

Auth.Credentials = Credentials;

export declare namespace Auth {
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
