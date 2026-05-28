// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as InvitationsAPI from '../../invitations';
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
    return this._client.post(path`/sandbox/cards/${id}/simulate/authorization`, { body, ...options });
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
    return this._client.post(path`/sandbox/cards/${id}/simulate/clearing`, { body, ...options });
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
    return this._client.post(path`/sandbox/cards/${id}/simulate/return`, { body, ...options });
  }
}

/**
 * Parent transaction row for a card authorization and all of the pulls /
 * settlements / refunds that reconcile against it. Child events are rolled up into
 * the `pullSummary`, `refundSummary`, and `settlementSummary` aggregates.
 * Delivered as the payload of the generic transaction webhook stream (extends the
 * Transaction model with a card destination type) on every transition.
 */
export interface SimulateAuthorizationResponse {
  /**
   * System-generated unique card transaction identifier
   */
  id: string;

  /**
   * Internal account id that funded this transaction (the funding source selected by
   * Authorization Decisioning at auth time).
   */
  accountId: string;

  authorizedAmount: InvitationsAPI.CurrencyAmount;

  /**
   * When the auth was approved.
   */
  authorizedAt: string;

  /**
   * The id of the `Card` this transaction was made on.
   */
  cardId: string;

  /**
   * Creation timestamp (same as `authorizedAt` for card transactions).
   */
  createdAt: string;

  merchant: SimulateAuthorizationResponse.Merchant;

  pullSummary: SimulateAuthorizationResponse.PullSummary;

  refundSummary: SimulateAuthorizationResponse.RefundSummary;

  settlementSummary: SimulateAuthorizationResponse.SettlementSummary;

  /**
   * Lifecycle status of a card transaction.
   *
   * | Status              | Description                                                                                                                                                                                                                                     |
   * | ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
   * | `AUTHORIZED`        | The auth has been approved and a hold placed on the funding source; no clearing has arrived yet.                                                                                                                                                |
   * | `PARTIALLY_SETTLED` | At least one clearing has arrived and posted, but more clearings are still expected (split shipments, tips, multi-leg trips).                                                                                                                   |
   * | `SETTLED`           | All clearings for the auth have posted and the transaction is closed against the funding source.                                                                                                                                                |
   * | `REFUNDED`          | A `RETURN` was received from the merchant; the net settled amount has been refunded in part or whole.                                                                                                                                           |
   * | `EXCEPTION`         | The transaction settled to the card network but the corresponding pull from the funding source failed (e.g. balance no longer covers the post-hoc clearing). Surfaces high-urgency alerts and is the dashboard query for stuck reconciliations. |
   */
  status: 'AUTHORIZED' | 'PARTIALLY_SETTLED' | 'SETTLED' | 'REFUNDED' | 'EXCEPTION';

  /**
   * Last update timestamp.
   */
  updatedAt: string;

  /**
   * Opaque identifier for the transaction on the underlying issuer. Used to
   * cross-reference Grid records against issuer dashboards and webhooks.
   */
  issuerTransactionToken?: string;

  /**
   * Timestamp of the most recent reconcile event (pull / clearing / refund) against
   * this transaction.
   */
  lastEventAt?: string;

  refundedAmount?: InvitationsAPI.CurrencyAmount;

  settledAmount?: InvitationsAPI.CurrencyAmount;
}

export namespace SimulateAuthorizationResponse {
  export interface Merchant {
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

  export interface PullSummary {
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

  export interface RefundSummary {
    /**
     * Number of refund (return) events received for this transaction.
     */
    count: number;

    /**
     * Sum of all refund amounts in the smallest unit of the funding source's currency.
     */
    totalAmount: number;
  }

  export interface SettlementSummary {
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
}

/**
 * Parent transaction row for a card authorization and all of the pulls /
 * settlements / refunds that reconcile against it. Child events are rolled up into
 * the `pullSummary`, `refundSummary`, and `settlementSummary` aggregates.
 * Delivered as the payload of the generic transaction webhook stream (extends the
 * Transaction model with a card destination type) on every transition.
 */
export interface SimulateClearingResponse {
  /**
   * System-generated unique card transaction identifier
   */
  id: string;

  /**
   * Internal account id that funded this transaction (the funding source selected by
   * Authorization Decisioning at auth time).
   */
  accountId: string;

  authorizedAmount: InvitationsAPI.CurrencyAmount;

  /**
   * When the auth was approved.
   */
  authorizedAt: string;

  /**
   * The id of the `Card` this transaction was made on.
   */
  cardId: string;

  /**
   * Creation timestamp (same as `authorizedAt` for card transactions).
   */
  createdAt: string;

  merchant: SimulateClearingResponse.Merchant;

  pullSummary: SimulateClearingResponse.PullSummary;

  refundSummary: SimulateClearingResponse.RefundSummary;

  settlementSummary: SimulateClearingResponse.SettlementSummary;

  /**
   * Lifecycle status of a card transaction.
   *
   * | Status              | Description                                                                                                                                                                                                                                     |
   * | ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
   * | `AUTHORIZED`        | The auth has been approved and a hold placed on the funding source; no clearing has arrived yet.                                                                                                                                                |
   * | `PARTIALLY_SETTLED` | At least one clearing has arrived and posted, but more clearings are still expected (split shipments, tips, multi-leg trips).                                                                                                                   |
   * | `SETTLED`           | All clearings for the auth have posted and the transaction is closed against the funding source.                                                                                                                                                |
   * | `REFUNDED`          | A `RETURN` was received from the merchant; the net settled amount has been refunded in part or whole.                                                                                                                                           |
   * | `EXCEPTION`         | The transaction settled to the card network but the corresponding pull from the funding source failed (e.g. balance no longer covers the post-hoc clearing). Surfaces high-urgency alerts and is the dashboard query for stuck reconciliations. |
   */
  status: 'AUTHORIZED' | 'PARTIALLY_SETTLED' | 'SETTLED' | 'REFUNDED' | 'EXCEPTION';

  /**
   * Last update timestamp.
   */
  updatedAt: string;

  /**
   * Opaque identifier for the transaction on the underlying issuer. Used to
   * cross-reference Grid records against issuer dashboards and webhooks.
   */
  issuerTransactionToken?: string;

  /**
   * Timestamp of the most recent reconcile event (pull / clearing / refund) against
   * this transaction.
   */
  lastEventAt?: string;

  refundedAmount?: InvitationsAPI.CurrencyAmount;

  settledAmount?: InvitationsAPI.CurrencyAmount;
}

export namespace SimulateClearingResponse {
  export interface Merchant {
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

  export interface PullSummary {
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

  export interface RefundSummary {
    /**
     * Number of refund (return) events received for this transaction.
     */
    count: number;

    /**
     * Sum of all refund amounts in the smallest unit of the funding source's currency.
     */
    totalAmount: number;
  }

  export interface SettlementSummary {
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
}

/**
 * Parent transaction row for a card authorization and all of the pulls /
 * settlements / refunds that reconcile against it. Child events are rolled up into
 * the `pullSummary`, `refundSummary`, and `settlementSummary` aggregates.
 * Delivered as the payload of the generic transaction webhook stream (extends the
 * Transaction model with a card destination type) on every transition.
 */
export interface SimulateReturnResponse {
  /**
   * System-generated unique card transaction identifier
   */
  id: string;

  /**
   * Internal account id that funded this transaction (the funding source selected by
   * Authorization Decisioning at auth time).
   */
  accountId: string;

  authorizedAmount: InvitationsAPI.CurrencyAmount;

  /**
   * When the auth was approved.
   */
  authorizedAt: string;

  /**
   * The id of the `Card` this transaction was made on.
   */
  cardId: string;

  /**
   * Creation timestamp (same as `authorizedAt` for card transactions).
   */
  createdAt: string;

  merchant: SimulateReturnResponse.Merchant;

  pullSummary: SimulateReturnResponse.PullSummary;

  refundSummary: SimulateReturnResponse.RefundSummary;

  settlementSummary: SimulateReturnResponse.SettlementSummary;

  /**
   * Lifecycle status of a card transaction.
   *
   * | Status              | Description                                                                                                                                                                                                                                     |
   * | ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
   * | `AUTHORIZED`        | The auth has been approved and a hold placed on the funding source; no clearing has arrived yet.                                                                                                                                                |
   * | `PARTIALLY_SETTLED` | At least one clearing has arrived and posted, but more clearings are still expected (split shipments, tips, multi-leg trips).                                                                                                                   |
   * | `SETTLED`           | All clearings for the auth have posted and the transaction is closed against the funding source.                                                                                                                                                |
   * | `REFUNDED`          | A `RETURN` was received from the merchant; the net settled amount has been refunded in part or whole.                                                                                                                                           |
   * | `EXCEPTION`         | The transaction settled to the card network but the corresponding pull from the funding source failed (e.g. balance no longer covers the post-hoc clearing). Surfaces high-urgency alerts and is the dashboard query for stuck reconciliations. |
   */
  status: 'AUTHORIZED' | 'PARTIALLY_SETTLED' | 'SETTLED' | 'REFUNDED' | 'EXCEPTION';

  /**
   * Last update timestamp.
   */
  updatedAt: string;

  /**
   * Opaque identifier for the transaction on the underlying issuer. Used to
   * cross-reference Grid records against issuer dashboards and webhooks.
   */
  issuerTransactionToken?: string;

  /**
   * Timestamp of the most recent reconcile event (pull / clearing / refund) against
   * this transaction.
   */
  lastEventAt?: string;

  refundedAmount?: InvitationsAPI.CurrencyAmount;

  settledAmount?: InvitationsAPI.CurrencyAmount;
}

export namespace SimulateReturnResponse {
  export interface Merchant {
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

  export interface PullSummary {
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

  export interface RefundSummary {
    /**
     * Number of refund (return) events received for this transaction.
     */
    count: number;

    /**
     * Sum of all refund amounts in the smallest unit of the funding source's currency.
     */
    totalAmount: number;
  }

  export interface SettlementSummary {
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
}

export interface SimulateAuthorizationParams {
  /**
   * Authorization amount in the smallest unit of `currency` (e.g. cents for USD).
   */
  amount: number;

  currency: QuotesAPI.Currency;

  merchant: SimulateAuthorizationParams.Merchant;
}

export namespace SimulateAuthorizationParams {
  export interface Merchant {
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
    type SimulateAuthorizationResponse as SimulateAuthorizationResponse,
    type SimulateClearingResponse as SimulateClearingResponse,
    type SimulateReturnResponse as SimulateReturnResponse,
    type SimulateAuthorizationParams as SimulateAuthorizationParams,
    type SimulateClearingParams as SimulateClearingParams,
    type SimulateReturnParams as SimulateReturnParams,
  };
}
