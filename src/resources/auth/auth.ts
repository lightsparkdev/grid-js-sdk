// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as CredentialsAPI from './credentials';
import {
  AuthMethod,
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
import * as SessionsAPI from './sessions';
import {
  SessionListParams,
  SessionListResponse,
  SessionRevokeParams,
  SessionRevokeResponse,
  Sessions,
} from './sessions';

export class Auth extends APIResource {
  credentials: CredentialsAPI.Credentials = new CredentialsAPI.Credentials(this._client);
  sessions: SessionsAPI.Sessions = new SessionsAPI.Sessions(this._client);
}

Auth.Credentials = Credentials;
Auth.Sessions = Sessions;

export declare namespace Auth {
  export {
    Credentials as Credentials,
    type AuthMethod as AuthMethod,
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

  export {
    Sessions as Sessions,
    type SessionListResponse as SessionListResponse,
    type SessionRevokeResponse as SessionRevokeResponse,
    type SessionListParams as SessionListParams,
    type SessionRevokeParams as SessionRevokeParams,
  };
}
