// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as SimulateAPI from './simulate';
import {
  CardMerchant,
  CardPullSummary,
  CardRefundSummary,
  CardSettlementSummary,
  Simulate,
  SimulateAuthorizationParams,
  SimulateAuthorizationResponse,
  SimulateClearingParams,
  SimulateClearingResponse,
  SimulateRefundParams,
  SimulateRefundResponse,
} from './simulate';

export class Cards extends APIResource {
  simulate: SimulateAPI.Simulate = new SimulateAPI.Simulate(this._client);
}

Cards.Simulate = Simulate;

export declare namespace Cards {
  export {
    Simulate as Simulate,
    type CardMerchant as CardMerchant,
    type CardPullSummary as CardPullSummary,
    type CardRefundSummary as CardRefundSummary,
    type CardSettlementSummary as CardSettlementSummary,
    type SimulateAuthorizationResponse as SimulateAuthorizationResponse,
    type SimulateClearingResponse as SimulateClearingResponse,
    type SimulateRefundResponse as SimulateRefundResponse,
    type SimulateAuthorizationParams as SimulateAuthorizationParams,
    type SimulateClearingParams as SimulateClearingParams,
    type SimulateRefundParams as SimulateRefundParams,
  };
}
