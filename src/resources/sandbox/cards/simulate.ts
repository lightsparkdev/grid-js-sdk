// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as QuotesAPI from '../../quotes';
import { APIPromise } from '../../../core/api-promise';
import { RequestOptions } from '../../../internal/request-options';
import { path } from '../../../internal/utils/path';

/**
 * Endpoints to trigger test cases in sandbox
 */
export class Simulate extends APIResource {
  /**
   * Simulate an inbound card authorization in the sandbox environment. Drives the
   * same internal `authorize` + `reconcile` paths the card issuer would call in
   * production, so platforms can exercise Grid's decisioning + funding-source pull
   * behavior end-to-end without an external network round-trip.
   *
   * The decisioning outcome is controlled by the last three characters of
   * `merchant.descriptor`:
   *
   * | Suffix | Outcome | | ------ | ------- | | `002` | Decline —
   * `INSUFFICIENT_FUNDS` (the pull on the funding source fails) | | `003` | Decline
   * — `CARD_PAUSED` (intended to verify a frozen card refuses auths) | | `005` |
   * Delayed pull (~30s) — exercises the `PENDING → CONFIRMED` path | | `006` | Pull
   * succeeds but the confirmation event reports `FAILED` — exercises the
   * high-urgency `EXCEPTION` alert | | any other | Approved |
   *
   * Production returns `404` on this path.
   *
   * @example
   * ```ts
   * const response =
   *   await client.sandbox.cards.simulate.authorization(
   *     'Card:019542f5-b3e7-1d02-0000-000000000010',
   *     {
   *       amount: 1250,
   *       currency: { code: 'USD' },
   *       merchant: {
   *         descriptor: 'BLUE BOTTLE COFFEE SF',
   *         mcc: '5814',
   *         country: 'US',
   *       },
   *     },
   *   );
   * ```
   */
  authorization(
    id: string,
    body: SimulateAuthorizationParams,
    options?: RequestOptions,
  ): APIPromise<SimulateAuthorizationResponse> {
    return this._client.post(path`/sandbox/cards/${id}/simulate/authorization`, {
      body,
      ...options,
      __security: { basicAuth: true },
    });
  }

  /**
   * Simulate a clearing (settlement) event against an existing `CardTransaction` in
   * the sandbox environment.
   *
   * - A clearing `amount` greater than the authorized amount exercises the over-auth
   *   post-hoc-pull path (e.g. restaurant tip on top of a 20% over-auth).
   * - A clearing `amount` of `0` exercises the `AUTHORIZATION_EXPIRY` path — the
   *   auth expires with no clearing posted.
   * - Suffix-driven outcomes on the parent transaction's id govern whether the
   *   post-hoc pull succeeds (use the suffix table from `simulate/authorization` to
   *   construct deterministic test cases).
   *
   * Production returns `404` on this path.
   *
   * @example
   * ```ts
   * const response =
   *   await client.sandbox.cards.simulate.clearing(
   *     'Card:019542f5-b3e7-1d02-0000-000000000010',
   *     {
   *       amount: 1500,
   *       cardTransactionId:
   *         'CardTransaction:019542f5-b3e7-1d02-0000-000000000100',
   *     },
   *   );
   * ```
   */
  clearing(
    id: string,
    body: SimulateClearingParams,
    options?: RequestOptions,
  ): APIPromise<SimulateClearingResponse> {
    return this._client.post(path`/sandbox/cards/${id}/simulate/clearing`, {
      body,
      ...options,
      __security: { basicAuth: true },
    });
  }

  /**
   * Simulate a merchant-initiated `RETURN` against an existing settled card
   * transaction in the sandbox environment. Creates a `CardRefund` on the parent and
   * either flips the parent to `REFUNDED` (full refund) or keeps it `SETTLED` with a
   * non-zero `refundedAmount` (partial refund).
   *
   * Production returns `404` on this path.
   *
   * @example
   * ```ts
   * const response = await client.sandbox.cards.simulate.return(
   *   'Card:019542f5-b3e7-1d02-0000-000000000010',
   *   {
   *     amount: 1500,
   *     cardTransactionId:
   *       'CardTransaction:019542f5-b3e7-1d02-0000-000000000100',
   *   },
   * );
   * ```
   */
  return(
    id: string,
    body: SimulateReturnParams,
    options?: RequestOptions,
  ): APIPromise<SimulateReturnResponse> {
    return this._client.post(path`/sandbox/cards/${id}/simulate/return`, {
      body,
      ...options,
      __security: { basicAuth: true },
    });
  }
}

/**
 * Sandbox-only request body shared by the card authorization-family simulate
 * endpoints: `simulate/authorization`, `simulate/credit_authorization`,
 * `simulate/financial_authorization`, `simulate/financial_credit_authorization`,
 * and `simulate/credit_authorization_advice`. Drives the same internal
 * authorization + reconcile paths that the issuer would call in production. The
 * decisioning outcome is controlled by the last three characters of
 * `merchant.descriptor` — see the `simulate/authorization` documentation for the
 * suffix table.
 */
export interface AuthorizationRequest {
  /**
   * Authorization amount in the smallest unit of `currency` (e.g. cents for USD).
   */
  amount: number;

  currency: QuotesAPI.Currency;

  merchant: CardMerchant;
}

export interface CardMerchant {
  /**
   * Merchant descriptor string captured from the card network at authorization time.
   */
  descriptor: string;

  /**
   * Two-letter ISO 3166-1 alpha-2 country code of the merchant.
   */
  country?: string;

  /**
   * Merchant Category Code (ISO 18245) — four-digit numeric string.
   */
  mcc?: string;
}

export interface CardPullSummary {
  /**
   * Total number of pulls (debits) executed against the funding source for this
   * transaction. `> 1` indicates one or more post-hoc pulls — e.g. restaurant tip /
   * over-auth clearings.
   */
  count: number;

  /**
   * Sum of all pull amounts in the smallest unit of the funding source's currency.
   */
  totalAmount: number;

  /**
   * Number of pulls still in the `PENDING` state. Drops to zero when every pull has
   * reached a terminal state. Non-zero values that persist beyond the expected
   * settlement window are an early signal for the `EXCEPTION` path.
   */
  pendingCount?: number;
}

export interface CardRefundSummary {
  /**
   * Number of refund (return) events received for this transaction.
   */
  count: number;

  /**
   * Sum of all refund amounts in the smallest unit of the funding source's currency.
   */
  totalAmount: number;
}

export interface CardSettlementSummary {
  /**
   * Number of settlement (clearing) events received for this transaction.
   */
  count: number;

  /**
   * Sum of all settled amounts in the smallest unit of the funding source's
   * currency.
   */
  totalAmount: number;
}

/**
 * Sandbox-only request body for `POST /sandbox/cards/{id}/simulate/clearing`.
 * Drives a clearing event against an existing `CardTransaction`. Pass an `amount`
 * greater than the authorized amount to exercise the over-auth / restaurant-tip
 * post-hoc-pull path; pass `0` to exercise `AUTHORIZATION_EXPIRY`. Suffix-driven
 * outcomes on the parent transaction's id govern whether the post-hoc pull
 * succeeds.
 */
export interface ClearingRequest {
  /**
   * Clearing amount in the smallest unit of the transaction's currency. Set to `0`
   * to simulate an authorization expiry with no clearing.
   */
  amount: number;

  /**
   * The id of the `CardTransaction` to clear against. Must be in `AUTHORIZED` or
   * `PARTIALLY_SETTLED` state.
   */
  cardTransactionId: string;
}

export interface Refund {
  /**
   * When the refund was initiated
   */
  initiatedAt: string;

  /**
   * The unique reference ID of the refund
   */
  reference: string;

  /**
   * Current status of the refund
   */
  status: 'PENDING' | 'COMPLETED' | 'FAILED';

  /**
   * Reason for the refund
   */
  reason?: 'TRANSACTION_FAILED' | 'USER_CANCELLATION' | 'TIMEOUT';

  /**
   * When the refund was settled
   */
  settledAt?: string;
}

/**
 * Sandbox-only request body for `POST /sandbox/cards/{id}/simulate/return`. Drives
 * a `RETURN` event against an existing settled `CardTransaction`, which creates a
 * `CardRefund` and pushes the parent transaction towards `REFUNDED` (full) or
 * keeps it `SETTLED` (partial).
 */
export interface RefundRequest {
  /**
   * Return amount in the smallest unit of the transaction's currency. Must be less
   * than or equal to the net settled amount (settled minus previously-refunded).
   */
  amount: number;

  /**
   * The id of the `CardTransaction` to refund against. Must have at least one
   * settled clearing.
   */
  cardTransactionId: string;
}

/**
 * Response body for the sandbox card-event simulators. The simulate call pokes the
 * card issuer's sandbox; the resulting card operation is delivered asynchronously
 * via the issuer's events webhook, never synchronously in this response.
 */
export interface SimulateAuthorizationResponse {
  /**
   * The card issuer's transaction token for the simulated event. Correlates the
   * eventual webhook-delivered card operation back to this simulate call.
   */
  issuerTransactionToken: string;
}

/**
 * Response body for the sandbox card-event simulators. The simulate call pokes the
 * card issuer's sandbox; the resulting card operation is delivered asynchronously
 * via the issuer's events webhook, never synchronously in this response.
 */
export interface SimulateClearingResponse {
  /**
   * The card issuer's transaction token for the simulated event. Correlates the
   * eventual webhook-delivered card operation back to this simulate call.
   */
  issuerTransactionToken: string;
}

/**
 * Response body for the sandbox card-event simulators. The simulate call pokes the
 * card issuer's sandbox; the resulting card operation is delivered asynchronously
 * via the issuer's events webhook, never synchronously in this response.
 */
export interface SimulateReturnResponse {
  /**
   * The card issuer's transaction token for the simulated event. Correlates the
   * eventual webhook-delivered card operation back to this simulate call.
   */
  issuerTransactionToken: string;
}

export interface SimulateAuthorizationParams {
  /**
   * Authorization amount in the smallest unit of `currency` (e.g. cents for USD).
   */
  amount: number;

  currency: QuotesAPI.Currency;

  merchant: CardMerchant;
}

export interface SimulateClearingParams {
  /**
   * Clearing amount in the smallest unit of the transaction's currency. Set to `0`
   * to simulate an authorization expiry with no clearing.
   */
  amount: number;

  /**
   * The id of the `CardTransaction` to clear against. Must be in `AUTHORIZED` or
   * `PARTIALLY_SETTLED` state.
   */
  cardTransactionId: string;
}

export interface SimulateReturnParams {
  /**
   * Return amount in the smallest unit of the transaction's currency. Must be less
   * than or equal to the net settled amount (settled minus previously-refunded).
   */
  amount: number;

  /**
   * The id of the `CardTransaction` to refund against. Must have at least one
   * settled clearing.
   */
  cardTransactionId: string;
}

export declare namespace Simulate {
  export {
    type AuthorizationRequest as AuthorizationRequest,
    type CardMerchant as CardMerchant,
    type CardPullSummary as CardPullSummary,
    type CardRefundSummary as CardRefundSummary,
    type CardSettlementSummary as CardSettlementSummary,
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
