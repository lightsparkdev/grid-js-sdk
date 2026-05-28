// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as CredentialsAPI from './credentials';
import {
  AuthCredentialCreateRequest,
  AuthCredentialCreateRequestOneOf,
  AuthCredentialListResponse,
  AuthCredentialResponseOneOf,
  AuthCredentialVerifyRequest,
  AuthCredentialVerifyRequestOneOf,
  AuthMethod,
  AuthMethodResponse,
  AuthMethodType,
  AuthSession,
  AuthSignedRequestChallenge,
  CredentialChallengeParams,
  CredentialCreateParams,
  CredentialDeleteParams,
  CredentialListParams,
  CredentialVerifyParams,
  Credentials,
  EmailOtpCredentialCreateRequest,
  EmailOtpCredentialVerifyRequest,
  OAuthCredentialCreateRequest,
  OAuthCredentialVerifyRequest,
  PasskeyAssertion,
  PasskeyAttestation,
  PasskeyAuthChallenge,
  PasskeyCredentialCreateRequest,
  PasskeyCredentialVerifyRequest,
  SignedRequestChallenge,
} from './credentials';
import * as SessionsAPI from './sessions';
import {
  SessionDeleteParams,
  SessionListParams,
  SessionListResponse,
  SessionRefreshParams,
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
    type AuthCredentialCreateRequest as AuthCredentialCreateRequest,
    type AuthCredentialCreateRequestOneOf as AuthCredentialCreateRequestOneOf,
    type AuthCredentialListResponse as AuthCredentialListResponse,
    type AuthCredentialResponseOneOf as AuthCredentialResponseOneOf,
    type AuthCredentialVerifyRequest as AuthCredentialVerifyRequest,
    type AuthCredentialVerifyRequestOneOf as AuthCredentialVerifyRequestOneOf,
    type AuthMethod as AuthMethod,
    type AuthMethodResponse as AuthMethodResponse,
    type AuthMethodType as AuthMethodType,
    type AuthSession as AuthSession,
    type AuthSignedRequestChallenge as AuthSignedRequestChallenge,
    type EmailOtpCredentialCreateRequest as EmailOtpCredentialCreateRequest,
    type EmailOtpCredentialVerifyRequest as EmailOtpCredentialVerifyRequest,
    type OAuthCredentialCreateRequest as OAuthCredentialCreateRequest,
    type OAuthCredentialVerifyRequest as OAuthCredentialVerifyRequest,
    type PasskeyAssertion as PasskeyAssertion,
    type PasskeyAttestation as PasskeyAttestation,
    type PasskeyAuthChallenge as PasskeyAuthChallenge,
    type PasskeyCredentialCreateRequest as PasskeyCredentialCreateRequest,
    type PasskeyCredentialVerifyRequest as PasskeyCredentialVerifyRequest,
    type SignedRequestChallenge as SignedRequestChallenge,
    type CredentialCreateParams as CredentialCreateParams,
    type CredentialListParams as CredentialListParams,
    type CredentialDeleteParams as CredentialDeleteParams,
    type CredentialChallengeParams as CredentialChallengeParams,
    type CredentialVerifyParams as CredentialVerifyParams,
  };

  export {
    Sessions as Sessions,
    type SessionListResponse as SessionListResponse,
    type SessionListParams as SessionListParams,
    type SessionDeleteParams as SessionDeleteParams,
    type SessionRefreshParams as SessionRefreshParams,
  };
}
