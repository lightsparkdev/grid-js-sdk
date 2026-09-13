// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as InvitationsAPI from './invitations';
import * as SimulateAPI from './sandbox/cards/simulate';
import { APIPromise } from '../core/api-promise';
import { DefaultPagination, type DefaultPaginationParams, PagePromise } from '../core/pagination';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

/**
 * Card management endpoints. Issue debit cards against an internal account, freeze / unfreeze, close, manage a card's funding source, and list card transactions.
 */
export class Cards extends APIResource {
  /**
   * Retrieve a card by its system-generated id. To display the card's full PAN, CVV,
   * and expiry to the cardholder, request a reveal with `POST /cards/{id}/reveal` —
   * the card resource itself never carries the reveal URL.
   *
   * @example
   * ```ts
   * const card = await client.cards.retrieve('id');
   * ```
   */
  retrieve(id: string, options?: RequestOptions): APIPromise<Card> {
    return this._client.get(path`/cards/${id}`, { ...options, __security: { basicAuth: true } });
  }

  /**
   * Update a card's `status`, bound `fundingSource`, and / or
   * `maxSpendPerTransaction`, `maxSpendPerDay`, or `maxTransactionsPerDay`. At least
   * one field must be supplied.
   *
   * - `status` transitions are limited to `ACTIVE ⇄ FROZEN` and
   *   `ACTIVE | FROZEN → CLOSED`. `CLOSED` is terminal and irreversible. Any other
   *   transition returns `409 INVALID_STATE_TRANSITION`.
   * - `fundingSource`, when supplied, replaces the card's bound internal account. It
   *   must belong to the customer and be denominated in the card's currency.
   *   `fundingSource` cannot be supplied alongside `status: CLOSED`. On card
   *   programs where the card issuer makes authorization decisions, `fundingSource`
   *   cannot be combined with any `status` change, so send the changes as separate
   *   requests. On card programs where Grid makes the authorization decision, the
   *   combination remains valid for `status` changes other than `CLOSED`.
   * - `maxSpendPerTransaction` sets the largest amount the card can authorize on a
   *   single transaction. An authorization for exactly the limit is allowed, and a
   *   later clearing can still settle above it — a restaurant tip, for example — so
   *   this caps the authorization, not the final settled amount. Send a positive
   *   integer in the smallest unit of the card's currency (cents for USD) to set the
   *   limit, or null to remove it. If your platform config sets
   *   `cardConfigs.maxSpendPerTransaction`, the lower of the two applies. You can
   *   only send this when the card's `cardCapabilities.supportsSpendLimits` is true,
   *   and not together with `status: CLOSED`.
   * - `maxSpendPerDay`, when supplied, replaces the card-specific cap on cumulative
   *   new spend during one UTC calendar day. Supply a positive integer in the
   *   smallest unit of the card's currency to set it or null to clear it. If the
   *   platform config sets `cardConfigs.maxSpendPerDay`, Grid enforces the lower of
   *   the card and platform values. Refunds, reversals, and authorization expiries
   *   do not restore capacity during the day. The card's
   *   `cardCapabilities.supportsSpendLimits` must be true. `maxSpendPerDay` cannot
   *   be supplied alongside `status: CLOSED`.
   * - `maxTransactionsPerDay`, when supplied, replaces the card-specific cap on the
   *   number of transactions the card may authorize during one UTC calendar day.
   *   Supply a positive integer to set it or null to clear it. If the platform
   *   config sets `cardConfigs.maxTransactionsPerDay`, Grid enforces the lower of
   *   the card and platform values. Refunds, reversals, and authorization expiries
   *   do not restore capacity during the day. `maxTransactionsPerDay` requires the
   *   card's `cardCapabilities.supportsTransactionCountLimit` to be true and cannot
   *   be supplied alongside `status: CLOSED`.
   *
   * This endpoint is authenticated by the platform credential alone and returns
   * `200` directly. It deliberately does not use Grid's 202 → signed-retry pattern:
   * that pattern signs with the session key of a credential on the owning internal
   * account, so it models actions taken _by_ the end user on their own credentials
   * or funds. Freezing or closing a card is routinely an action taken _about_ a user
   * and without them present - fraud response, offboarding, an ops-driven freeze -
   * and requiring the cardholder's signature would make exactly those cases
   * impossible. Operations that expose sensitive card data
   * (`POST /cards/{id}/reveal`, 3DS password retrieval) are SCA-railed instead,
   * because there the cardholder is the party being served.
   *
   * Effects:
   *
   * - `status: FROZEN`: Authorization Decisioning declines new auths with
   *   `CARD_PAUSED`. Existing pulls and in-flight reconciliation continue — freezing
   *   does not pause the lifecycle of authorizations that already passed.
   * - `status: ACTIVE`: normal authorization behavior resumes.
   * - `status: CLOSED`: terminal close. The card transitions to `status: "CLOSED"`
   *   with `statusReason: "CLOSED_BY_PLATFORM"` and stays in the system for audit
   *   and reconciliation. All pending auths reconcile to a terminal state via the
   *   existing reconcile primitive. Inbound clearings received after close follow
   *   the standard force-post / late-presentment path — Lightspark absorbs the loss
   *   if a post-hoc pull on the now-unbound source fails. The funding source is
   *   detached. Refunds already in flight still complete because Lightspark holds
   *   the card-reserve keys.
   * - `fundingSource` change: returns the updated card with the new binding and
   *   fires no webhook.
   *
   * The `card.state_change` webhook fires on every successful `status` transition.
   *
   * @example
   * ```ts
   * const card = await client.cards.update('id', {
   *   status: 'FROZEN',
   * });
   * ```
   */
  update(id: string, body: CardUpdateParams, options?: RequestOptions): APIPromise<Card> {
    return this._client.patch(path`/cards/${id}`, { body, ...options, __security: { basicAuth: true } });
  }

  /**
   * Retrieve a paginated list of cards. Cards can be filtered by cardholder, bound
   * funding-source internal account, status, and platform-specific card identifier.
   * If no filters are provided, returns all cards visible to the caller.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const card of client.cards.list()) {
   *   // ...
   * }
   * ```
   */
  list(
    query: CardListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<CardsDefaultPagination, Card> {
    return this._client.getAPIList('/cards', DefaultPagination<Card>, {
      query,
      ...options,
      __security: { basicAuth: true },
    });
  }

  /**
   * Issue a new card for a cardholder. Every card is bound to one internal account,
   * `fundingSource`, at create time. The cardholder must have KYC status `APPROVED`
   * before a card can be issued; otherwise the request is rejected with
   * `CARDHOLDER_KYC_NOT_APPROVED`.
   *
   * Card issuance is fee-bearing and cannot be reversed, so an `Idempotency-Key`
   * header is required. Retries must carry the same key.
   *
   * Optional `maxSpendPerTransaction`, `maxSpendPerDay`, and `maxTransactionsPerDay`
   * values set the card-specific caps on one transaction, on spend during one UTC
   * calendar day, and on the number of transactions during one UTC calendar day.
   * Check the funding-source internal account's
   * `cardCapabilities.supportsSpendLimits` before supplying either spend limit, and
   * `cardCapabilities.supportsTransactionCountLimit` before supplying the
   * transaction count limit. If the platform config sets the corresponding
   * `cardConfigs` value, Grid enforces the lower of the card and platform caps.
   * Amounts use the smallest unit of the card's currency.
   *
   * If the funding source is an Embedded Wallet internal account, the cardholder
   * must authorize Grid to sign Spark token transactions for that card funding
   * source by completing the delegated-key creation flow with
   * `POST /auth/delegated-keys`. Until an active delegated key exists for that
   * funding source, Authorization Decisioning cannot use it to fund card
   * transactions.
   *
   * A platform may be limited to a maximum number of live cards. Once that limit is
   * reached, further issuance is rejected with `CARD_LIMIT_REACHED` until a card is
   * closed or Lightspark raises the limit. Cards in `CLOSED` status do not count
   * toward the limit.
   *
   * New cards start in `status: "PROCESSING"` while the card issuer provisions the
   * card. The `card.state_change` webhook fires on each status transition, including
   * the transition to `ACTIVE` (or to `CLOSED` with
   * `statusReason: "ISSUER_REJECTED"` if provisioning fails).
   *
   * @example
   * ```ts
   * const card = await client.cards.issue({
   *   customerId:
   *     'Customer:019542f5-b3e7-1d02-0000-000000000001',
   *   form: 'VIRTUAL',
   *   fundingSource:
   *     'InternalAccount:019542f5-b3e7-1d02-0000-000000000002',
   *   'Idempotency-Key': '550e8400-e29b-41d4-a716-446655440000',
   *   maxSpendPerDay: 25000,
   *   maxSpendPerTransaction: 5000,
   *   maxTransactionsPerDay: 20,
   *   platformCardId: 'card-emp-001',
   * });
   * ```
   */
  issue(params: CardIssueParams, options?: RequestOptions): APIPromise<Card> {
    const { 'Idempotency-Key': idempotencyKey, ...body } = params;
    return this._client.post('/cards', {
      body,
      ...options,
      headers: buildHeaders([{ 'Idempotency-Key': idempotencyKey }, options?.headers]),
      __security: { basicAuth: true },
    });
  }
}

export type CardsDefaultPagination = DefaultPagination<Card>;

export interface Card {
  /**
   * System-generated unique card identifier
   */
  id: string;

  /**
   * Creation timestamp
   */
  createdAt: string;

  /**
   * The id of the `Customer` who holds this card.
   */
  customerId: string;

  /**
   * Physical form factor of the card. Only `VIRTUAL` is supported in v1; `PHYSICAL`
   * will be added in a later release.
   */
  form: 'VIRTUAL';

  /**
   * Internal account id that funds this card.
   */
  fundingSource: string;

  /**
   * Card-specific cap on cumulative new spend during one UTC calendar day, in the
   * smallest unit of the card's `currency`. The window resets at 00:00 UTC. Null
   * means the card has no card-specific daily cap. When the platform config also
   * supplies `cardConfigs.maxSpendPerDay`, Grid enforces the lower of the two values
   * without replacing this configured value. Refunds, reversals, and authorization
   * expiries do not restore capacity during the day. Spend exactly equal to the
   * effective limit is allowed.
   */
  maxSpendPerDay: number | null;

  /**
   * The largest amount this card can authorize on a single transaction, in the
   * smallest unit of its `currency` (cents for USD). An authorization for exactly
   * the limit is allowed. A later clearing can still settle above it — a restaurant
   * tip, for example — so this caps the authorization, not the final settled amount.
   * `null` means the card sets no limit of its own. If your platform config also
   * sets `cardConfigs.maxSpendPerTransaction` (the platform-level limit), the lower
   * of the two applies and this value stays as you set it.
   */
  maxSpendPerTransaction: number | null;

  /**
   * Card-specific cap on the number of transactions the card may authorize during
   * one UTC calendar day. The window resets at 00:00 UTC. Null means the card has no
   * card-specific daily transaction cap. When the platform config also supplies
   * `cardConfigs.maxTransactionsPerDay`, Grid enforces the lower of the two values
   * without replacing this configured value. Each approved authorization counts once
   * for the day it was authorized; refunds, reversals, and authorization expiries do
   * not restore capacity during the day. A transaction that brings the day's count
   * exactly to the effective limit is allowed.
   */
  maxTransactionsPerDay: number | null;

  /**
   * Lifecycle status of a card.
   *
   * | Status        | Description                                                                                                                                                   |
   * | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
   * | `PENDING_KYC` | The cardholder has not yet completed KYC. Cards in this status cannot transact.                                                                               |
   * | `PROCESSING`  | The card has been requested and is being provisioned with the issuer.                                                                                         |
   * | `ACTIVE`      | The card is live and can authorize transactions.                                                                                                              |
   * | `FROZEN`      | The card is temporarily disabled by the platform. New authorizations are declined with `CARD_PAUSED`. Existing settlements and refunds continue to reconcile. |
   * | `CLOSED`      | The card is permanently closed. Terminal, irreversible status.                                                                                                |
   */
  status: 'PENDING_KYC' | 'PROCESSING' | 'ACTIVE' | 'FROZEN' | 'CLOSED';

  /**
   * Last update timestamp
   */
  updatedAt: string;

  /**
   * Card network brand. Read-only — determined by Grid when the card is provisioned
   * with the issuer.
   */
  brand?: 'VISA' | 'MASTERCARD';

  /**
   * Actions supported for this card by the issuer selected at issuance. Present for
   * cards whose program has been resolved; absent otherwise. These capabilities are
   * fixed at issuance for the card's lifetime.
   */
  cardCapabilities?: Card.CardCapabilities;

  /**
   * Currency the card transacts in (ISO 4217 for fiat, tickers for crypto). Derived
   * from the funding source at issue time.
   */
  currency?: string;

  /**
   * Card expiration month (1–12).
   */
  expMonth?: number;

  /**
   * Card expiration year (four digits).
   */
  expYear?: number;

  /**
   * Opaque identifier for the card on the issuer of record (e.g. the Lead Bank
   * account/card identifier). Useful for cross-referencing in issuer dashboards; not
   * used for any Grid request routing.
   */
  issuerRef?: string;

  /**
   * Last four digits of the card PAN.
   */
  last4?: string;

  /**
   * Platform-specific card identifier generated by the server.
   */
  platformCardId?: string;

  /**
   * Opaque processor-side reference for the card (e.g. the Lithic card token).
   * Useful for cross-referencing in the processor's dashboards; not used for any
   * Grid request routing.
   */
  processorRef?: string;

  /**
   * Reason associated with the current `status`. Present when the card is `CLOSED`
   * or when provisioning was rejected; absent otherwise.
   */
  statusReason?: 'ISSUER_REJECTED' | 'CLOSED_BY_PLATFORM' | 'CLOSED_BY_GRID';
}

export namespace Card {
  /**
   * Actions supported for this card by the issuer selected at issuance. Present for
   * cards whose program has been resolved; absent otherwise. These capabilities are
   * fixed at issuance for the card's lifetime.
   */
  export interface CardCapabilities {
    /**
     * Whether cards in this program accept a caller-supplied `threeDSecurePassword`.
     */
    supports3dSecurePassword: boolean;

    /**
     * Whether cards in this program can be revealed through `POST /cards/{id}/reveal`.
     */
    supportsPanReveal: boolean;

    /**
     * Whether cards in this program accept `maxSpendPerTransaction` and
     * `maxSpendPerDay`.
     */
    supportsSpendLimits: boolean;

    /**
     * Whether cards in this program accept `maxTransactionsPerDay`.
     */
    supportsTransactionCountLimit: boolean;
  }
}

export interface CardCreateRequest {
  /**
   * The id of the `Customer` to issue the card to. The customer must have KYC status
   * `APPROVED`; otherwise the request is rejected with
   * `CARDHOLDER_KYC_NOT_APPROVED`.
   */
  customerId: string;

  /**
   * Physical form factor of the card. Only `VIRTUAL` is supported in v1; `PHYSICAL`
   * will be added in a later release.
   */
  form: 'VIRTUAL';

  /**
   * Internal account id that funds this card. The account must belong to the
   * customer and be denominated in a card-eligible currency; otherwise the request
   * is rejected with `FUNDING_SOURCE_INELIGIBLE`.
   */
  fundingSource: string;

  /**
   * Optional card-specific cap on cumulative new spend during one UTC calendar day,
   * in the smallest unit of the card currency derived from its funding source. Omit
   * this field for no card-specific daily cap. When the platform config also
   * supplies `cardConfigs.maxSpendPerDay`, Grid enforces the lower of the two
   * values. The window resets at 00:00 UTC, and refunds, reversals, and
   * authorization expiries do not restore capacity during the day. Accepted only
   * when the funding-source internal account's
   * `cardCapabilities.supportsSpendLimits` is true. Spend exactly equal to the
   * effective limit is allowed.
   */
  maxSpendPerDay?: number;

  /**
   * The largest amount this card can authorize on a single transaction, in the
   * smallest unit of its currency (cents for USD). An authorization for exactly the
   * limit is allowed. A later clearing can still settle above it — a restaurant tip,
   * for example — so this caps the authorization, not the final settled amount. Omit
   * the field to set no limit. If your platform config also sets
   * `cardConfigs.maxSpendPerTransaction`, the lower of the two applies. You can only
   * send this when the funding-source internal account's
   * `cardCapabilities.supportsSpendLimits` is true.
   */
  maxSpendPerTransaction?: number;

  /**
   * Optional card-specific cap on the number of transactions the card may authorize
   * during one UTC calendar day. Omit this field for no card-specific daily
   * transaction cap. When the platform config also supplies
   * `cardConfigs.maxTransactionsPerDay`, Grid enforces the lower of the two values.
   * The window resets at 00:00 UTC. Each approved authorization counts once;
   * refunds, reversals, and authorization expiries do not restore capacity during
   * the day. Accepted only when the funding-source internal account's
   * `cardCapabilities.supportsTransactionCountLimit` is true.
   */
  maxTransactionsPerDay?: number;

  /**
   * Platform-specific card identifier. Always generated by the server; any value
   * supplied in the request is ignored.
   */
  platformCardId?: string;

  /**
   * Static password used as the card's 3-D Secure factor. Required when the first
   * funding-source internal account's `cardCapabilities.supports3dSecurePassword` is
   * true; omitting it or supplying an empty or whitespace-only string is rejected
   * with `INVALID_INPUT`. When the capability is false, supplying this field is
   * rejected with `INVALID_INPUT` because cards in that program have no
   * static-password factor. Grid does not retain the value: it is forwarded to the
   * issuer and discarded, so it cannot be read back afterwards; a cardholder who
   * forgets it must set a new one through `PATCH /cards/{id}`.
   */
  threeDSecurePassword?: string;
}

export interface CardListResponse {
  /**
   * List of cards matching the filter criteria
   */
  data: Array<Card>;

  /**
   * Indicates if more results are available beyond this page
   */
  hasMore: boolean;

  /**
   * Cursor to retrieve the next page of results (only present if hasMore is true)
   */
  nextCursor?: string;

  /**
   * Total number of cards matching the criteria (excluding pagination)
   */
  totalCount?: number;
}

/**
 * One row per cardholder-visible card transaction. A purchase row rolls its
 * clearings up into `settledAmount`; a merchant return is its own dated `CREDIT`
 * row linked back to the purchase via `originalTransactionId` rather than a rollup
 * on the parent, so statements can list purchases and refunds as separate dated
 * lines. Delivered whole as the `data` payload of every `CARD_TRANSACTION.*`
 * webhook, and returned as the `CARD` variant of `Transaction` from
 * `GET /transactions`.
 */
export interface CardTransaction {
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
   * Creation timestamp (same as `authorizedAt` for card transactions).
   */
  createdAt: string;

  /**
   * System ID of the customer (cardholder) this transaction belongs to.
   */
  customerId: string;

  /**
   * A purchase is a `DEBIT`. A merchant refund is a `CREDIT` with the credited value
   * in `settledAmount`; when the refund returns against a known purchase,
   * `originalTransactionId` identifies it.
   */
  direction: 'CREDIT' | 'DEBIT';

  merchant: SimulateAPI.CardMerchant;

  /**
   * Platform-specific ID of the customer (cardholder) this transaction belongs to.
   */
  platformCustomerId: string;

  /**
   * Lifecycle status of a card transaction. The status tracks settlement only — a
   * return against a purchase is its own dated `CREDIT` row linked to the purchase
   * via `originalTransactionId`, not a status of its own.
   *
   * | Status              | Description                                                                                                                                                                                                                                     |
   * | ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
   * | `AUTHORIZED`        | The auth has been approved and a hold placed on the funding source; no clearing has arrived yet.                                                                                                                                                |
   * | `PARTIALLY_SETTLED` | At least one clearing has arrived and posted, but more clearings are still expected (split shipments, tips, multi-leg trips).                                                                                                                   |
   * | `SETTLED`           | All clearings for the auth have posted and the transaction is closed against the funding source. A `RETURN` received afterwards keeps the purchase `SETTLED`; the return appears as its own `CREDIT` transaction.                               |
   * | `DECLINED`          | The authorization was declined before any money moved. Declines carry no settlement and must be excluded from cardholder statements.                                                                                                            |
   * | `EXCEPTION`         | The transaction settled to the card network but the corresponding pull from the funding source failed (e.g. balance no longer covers the post-hoc clearing). Surfaces high-urgency alerts and is the dashboard query for stuck reconciliations. |
   */
  status: 'AUTHORIZED' | 'PARTIALLY_SETTLED' | 'SETTLED' | 'DECLINED' | 'EXCEPTION';

  /**
   * Discriminator identifying this transaction as a card transaction in the
   * `Transaction` list.
   */
  type: 'CARD';

  /**
   * Last update timestamp.
   */
  updatedAt: string;

  /**
   * The id of the `Card` this transaction was made on.
   */
  cardId?: string;

  /**
   * The merchant descriptor, repeated from `merchant.descriptor` so a transaction
   * list reads without expanding each card row. Unlike `description` on other
   * transaction types, this is set by Grid from the card network's descriptor, not
   * supplied by the platform.
   */
  description?: string;

  /**
   * Opaque identifier for the transaction on the underlying issuer. Used to
   * cross-reference Grid records against issuer dashboards and webhooks.
   */
  issuerTransactionToken?: string;

  /**
   * On a refund row (`direction: CREDIT`), the id of the purchase this return
   * credits back against. Absent on purchases and on standalone credits with no
   * matching purchase.
   */
  originalTransactionId?: string;

  refundedAmount?: InvitationsAPI.CurrencyAmount;

  settledAmount?: InvitationsAPI.CurrencyAmount;
}

/**
 * Update request for `PATCH /cards/{id}`. At least one of `status`,
 * `fundingSource`, `maxSpendPerTransaction`, `maxSpendPerDay`, or
 * `maxTransactionsPerDay` must be supplied. `status` transitions are limited to
 * `ACTIVE ⇄ FROZEN` and `ACTIVE | FROZEN → CLOSED`; any other transition returns
 * `409 INVALID_STATE_TRANSITION`. `CLOSED` is terminal and irreversible and cannot
 * be combined with `fundingSource`, `maxSpendPerTransaction`, `maxSpendPerDay`, or
 * `maxTransactionsPerDay`.
 */
export interface CardUpdateRequest {
  /**
   * Replaces the card's funding source. Must belong to the customer and be
   * denominated in the card's currency. Cannot be supplied alongside
   * `status: CLOSED`. To stop a card from spending, set `status: FROZEN` instead.
   */
  fundingSource?: string;

  /**
   * Replacement card-specific UTC-calendar-day cap, in the smallest unit of the
   * card's currency. Omit this field to leave the current cap unchanged, supply null
   * to clear it, or supply a positive integer to set it. When the platform config
   * also supplies `cardConfigs.maxSpendPerDay`, Grid enforces the lower of the two
   * values. Refunds, reversals, and authorization expiries do not restore capacity
   * during the day. Accepted only when the card's
   * `cardCapabilities.supportsSpendLimits` is true. Cannot be supplied alongside
   * `status: CLOSED`.
   */
  maxSpendPerDay?: number | null;

  /**
   * A new limit on the largest amount this card can authorize on a single
   * transaction, in the smallest unit of its currency (cents for USD). An
   * authorization for exactly the limit is allowed. A later clearing can still
   * settle above it — a restaurant tip, for example — so this caps the
   * authorization, not the final settled amount. Send a positive integer to set the
   * limit, `null` to remove it, or omit the field to leave it unchanged. If your
   * platform config also sets `cardConfigs.maxSpendPerTransaction`, the lower of the
   * two applies. You can only send this when the card's
   * `cardCapabilities.supportsSpendLimits` is true, and not together with
   * `status: CLOSED`.
   */
  maxSpendPerTransaction?: number | null;

  /**
   * Replacement card-specific cap on the number of transactions the card may
   * authorize during one UTC calendar day. Omit this field to leave the current cap
   * unchanged, supply null to clear it, or supply a positive integer to set it. When
   * the platform config also supplies `cardConfigs.maxTransactionsPerDay`, Grid
   * enforces the lower of the two values. Refunds, reversals, and authorization
   * expiries do not restore capacity during the day. Accepted only when the card's
   * `cardCapabilities.supportsTransactionCountLimit` is true. Cannot be supplied
   * alongside `status: CLOSED`.
   */
  maxTransactionsPerDay?: number | null;

  /**
   * Target status for the card. Permitted transitions are `ACTIVE ⇄ FROZEN` and
   * `ACTIVE | FROZEN → CLOSED`. `CLOSED` is terminal and irreversible; once closed,
   * the card stays in the system for audit and reconciliation but cannot transact
   * again.
   */
  status?: 'ACTIVE' | 'FROZEN' | 'CLOSED';
}

export interface CardUpdateParams {
  /**
   * Replaces the card's funding source. Must belong to the customer and be
   * denominated in the card's currency. Cannot be supplied alongside
   * `status: CLOSED`. To stop a card from spending, set `status: FROZEN` instead.
   */
  fundingSource?: string;

  /**
   * Replacement card-specific UTC-calendar-day cap, in the smallest unit of the
   * card's currency. Omit this field to leave the current cap unchanged, supply null
   * to clear it, or supply a positive integer to set it. When the platform config
   * also supplies `cardConfigs.maxSpendPerDay`, Grid enforces the lower of the two
   * values. Refunds, reversals, and authorization expiries do not restore capacity
   * during the day. Accepted only when the card's
   * `cardCapabilities.supportsSpendLimits` is true. Cannot be supplied alongside
   * `status: CLOSED`.
   */
  maxSpendPerDay?: number | null;

  /**
   * A new limit on the largest amount this card can authorize on a single
   * transaction, in the smallest unit of its currency (cents for USD). An
   * authorization for exactly the limit is allowed. A later clearing can still
   * settle above it — a restaurant tip, for example — so this caps the
   * authorization, not the final settled amount. Send a positive integer to set the
   * limit, `null` to remove it, or omit the field to leave it unchanged. If your
   * platform config also sets `cardConfigs.maxSpendPerTransaction`, the lower of the
   * two applies. You can only send this when the card's
   * `cardCapabilities.supportsSpendLimits` is true, and not together with
   * `status: CLOSED`.
   */
  maxSpendPerTransaction?: number | null;

  /**
   * Replacement card-specific cap on the number of transactions the card may
   * authorize during one UTC calendar day. Omit this field to leave the current cap
   * unchanged, supply null to clear it, or supply a positive integer to set it. When
   * the platform config also supplies `cardConfigs.maxTransactionsPerDay`, Grid
   * enforces the lower of the two values. Refunds, reversals, and authorization
   * expiries do not restore capacity during the day. Accepted only when the card's
   * `cardCapabilities.supportsTransactionCountLimit` is true. Cannot be supplied
   * alongside `status: CLOSED`.
   */
  maxTransactionsPerDay?: number | null;

  /**
   * Target status for the card. Permitted transitions are `ACTIVE ⇄ FROZEN` and
   * `ACTIVE | FROZEN → CLOSED`. `CLOSED` is terminal and irreversible; once closed,
   * the card stays in the system for audit and reconciliation but cannot transact
   * again.
   */
  status?: 'ACTIVE' | 'FROZEN' | 'CLOSED';
}

export interface CardListParams extends DefaultPaginationParams {
  /**
   * Filter by internal account id. Returns cards whose `fundingSource` is the given
   * internal account id.
   */
  accountId?: string;

  /**
   * Filter by customer id.
   */
  customerId?: string;

  /**
   * Maximum number of results to return (default 20, max 100)
   */
  limit?: number;

  /**
   * Filter by platform-specific card identifier.
   */
  platformCardId?: string;

  /**
   * Order to sort results in
   */
  sortOrder?: 'asc' | 'desc';

  /**
   * Filter by card status.
   */
  status?: 'PENDING_KYC' | 'PROCESSING' | 'ACTIVE' | 'FROZEN' | 'CLOSED';
}

export interface CardIssueParams {
  /**
   * Body param: The id of the `Customer` to issue the card to. The customer must
   * have KYC status `APPROVED`; otherwise the request is rejected with
   * `CARDHOLDER_KYC_NOT_APPROVED`.
   */
  customerId: string;

  /**
   * Body param: Physical form factor of the card. Only `VIRTUAL` is supported in v1;
   * `PHYSICAL` will be added in a later release.
   */
  form: 'VIRTUAL';

  /**
   * Body param: Internal account id that funds this card. The account must belong to
   * the customer and be denominated in a card-eligible currency; otherwise the
   * request is rejected with `FUNDING_SOURCE_INELIGIBLE`.
   */
  fundingSource: string;

  /**
   * Header param: A unique identifier for the request, up to 255 characters. A retry
   * carrying the same key returns the card created by the first request; reusing a
   * key for a materially different card request is rejected with `409`.
   */
  'Idempotency-Key': string;

  /**
   * Body param: Optional card-specific cap on cumulative new spend during one UTC
   * calendar day, in the smallest unit of the card currency derived from its funding
   * source. Omit this field for no card-specific daily cap. When the platform config
   * also supplies `cardConfigs.maxSpendPerDay`, Grid enforces the lower of the two
   * values. The window resets at 00:00 UTC, and refunds, reversals, and
   * authorization expiries do not restore capacity during the day. Accepted only
   * when the funding-source internal account's
   * `cardCapabilities.supportsSpendLimits` is true. Spend exactly equal to the
   * effective limit is allowed.
   */
  maxSpendPerDay?: number;

  /**
   * Body param: The largest amount this card can authorize on a single transaction,
   * in the smallest unit of its currency (cents for USD). An authorization for
   * exactly the limit is allowed. A later clearing can still settle above it — a
   * restaurant tip, for example — so this caps the authorization, not the final
   * settled amount. Omit the field to set no limit. If your platform config also
   * sets `cardConfigs.maxSpendPerTransaction`, the lower of the two applies. You can
   * only send this when the funding-source internal account's
   * `cardCapabilities.supportsSpendLimits` is true.
   */
  maxSpendPerTransaction?: number;

  /**
   * Body param: Optional card-specific cap on the number of transactions the card
   * may authorize during one UTC calendar day. Omit this field for no card-specific
   * daily transaction cap. When the platform config also supplies
   * `cardConfigs.maxTransactionsPerDay`, Grid enforces the lower of the two values.
   * The window resets at 00:00 UTC. Each approved authorization counts once;
   * refunds, reversals, and authorization expiries do not restore capacity during
   * the day. Accepted only when the funding-source internal account's
   * `cardCapabilities.supportsTransactionCountLimit` is true.
   */
  maxTransactionsPerDay?: number;

  /**
   * Body param: Platform-specific card identifier. Always generated by the server;
   * any value supplied in the request is ignored.
   */
  platformCardId?: string;

  /**
   * Body param: Static password used as the card's 3-D Secure factor. Required when
   * the first funding-source internal account's
   * `cardCapabilities.supports3dSecurePassword` is true; omitting it or supplying an
   * empty or whitespace-only string is rejected with `INVALID_INPUT`. When the
   * capability is false, supplying this field is rejected with `INVALID_INPUT`
   * because cards in that program have no static-password factor. Grid does not
   * retain the value: it is forwarded to the issuer and discarded, so it cannot be
   * read back afterwards; a cardholder who forgets it must set a new one through
   * `PATCH /cards/{id}`.
   */
  threeDSecurePassword?: string;
}

export declare namespace Cards {
  export {
    type Card as Card,
    type CardCreateRequest as CardCreateRequest,
    type CardListResponse as CardListResponse,
    type CardTransaction as CardTransaction,
    type CardUpdateRequest as CardUpdateRequest,
    type CardsDefaultPagination as CardsDefaultPagination,
    type CardUpdateParams as CardUpdateParams,
    type CardListParams as CardListParams,
    type CardIssueParams as CardIssueParams,
  };
}
