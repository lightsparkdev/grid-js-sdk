// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as SimulateAPI from './simulate';
import {
  AuthorizationRequest,
  CardMerchant,
  ClearingRequest,
  Refund,
  RefundRequest,
  Simulate,
  SimulateAuthorizationParams,
  SimulateAuthorizationResponse,
  SimulateClearingParams,
  SimulateClearingResponse,
  SimulateReturnParams,
  SimulateReturnResponse,
} from './simulate';

export class Cards extends APIResource {
  simulate: SimulateAPI.Simulate = new SimulateAPI.Simulate(this._client);
}

Cards.Simulate = Simulate;

export declare namespace Cards {
  export {
    Simulate as Simulate,
    type AuthorizationRequest as AuthorizationRequest,
    type CardMerchant as CardMerchant,
    type ClearingRequest as ClearingRequest,
    type Refund as Refund,
    type RefundRequest as RefundRequest,
    type SimulateAuthorizationResponse as SimulateAuthorizationResponse,
    type SimulateClearingResponse as SimulateClearingResponse,
    type SimulateReturnResponse as SimulateReturnResponse,
    type SimulateAuthorizationParams as SimulateAuthorizationParams,
    type SimulateClearingParams as SimulateClearingParams,
    type SimulateReturnParams as SimulateReturnParams,
  };
}
