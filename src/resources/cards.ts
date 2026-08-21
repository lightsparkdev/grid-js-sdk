// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as InvitationsAPI from './invitations';
import * as SimulateAPI from './sandbox/cards/simulate';
import { APIPromise } from '../core/api-promise';
import { DefaultPagination, type DefaultPaginationParams, PagePromise } from '../core/pagination';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

/**
 * Card management endpoints. Issue debit cards against an internal account, freeze / unfreeze, close, manage card funding sources, and list card transactions.
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
   * Update a card's `state`, bound `fundingSources`, and / or
   * `maxSpendPerTransaction`. At least one field must be supplied.
   *
   * - `state` transitions are limited to `ACTIVE ⇄ FROZEN` and
   *   `ACTIVE | FROZEN → CLOSED`. `CLOSED` is terminal and irreversible. Any other
   *   transition returns `409 INVALID_STATE_TRANSITION`.
   * - `fundingSources`, when supplied, fully replaces the card's bound funding
   *   sources. Array order determines the priority Authorization Decisioning tries
   *   them in. Each id must belong to the cardholder and be denominated in the
   *   card's currency; the list must contain at least one source. `fundingSources`
   *   cannot be supplied alongside `state: CLOSED`.
   * - `maxSpendPerTransaction`, when supplied, replaces the card's
   *   application-enforced per-transaction limit. Supply a positive integer in the
   *   smallest unit of the card's currency to set it or null to clear it. Limits are
   *   supported only for card programs where Grid makes the authorization decision.
   *   `maxSpendPerTransaction` cannot be supplied alongside `state: CLOSED`.
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
   * - `state: FROZEN`: Authorization Decisioning declines new auths with
   *   `CARD_PAUSED`. Existing pulls and in-flight reconciliation continue — freezing
   *   does not pause the lifecycle of authorizations that already passed.
   * - `state: ACTIVE`: normal authorization behavior resumes.
   * - `state: CLOSED`: terminal close. The card transitions to `state: "CLOSED"`
   *   with `stateReason: "CLOSED_BY_PLATFORM"` and stays in the system for audit and
   *   reconciliation. All pending auths reconcile to a terminal state via the
   *   existing reconcile primitive. Inbound clearings received after close follow
   *   the standard force-post / late-presentment path — Lightspark absorbs the loss
   *   if a post-hoc pull on the now-unbound source fails. Funding-source bindings
   *   are detached. Refunds already in flight still complete because Lightspark
   *   holds the card-reserve keys.
   * - `fundingSources` change: emits `card.funding_source_change` reflecting the new
   *   ordered binding.
   *
   * The `card.state_change` webhook fires on every successful `state` transition;
   * the `card.funding_source_change` webhook fires whenever `fundingSources` is
   * updated.
   *
   * @example
   * ```ts
   * const card = await client.cards.update('id', {
   *   state: 'FROZEN',
   * });
   * ```
   */
  update(id: string, body: CardUpdateParams, options?: RequestOptions): APIPromise<Card> {
    return this._client.patch(path`/cards/${id}`, { body, ...options, __security: { basicAuth: true } });
  }

  /**
   * Retrieve a paginated list of cards. Cards can be filtered by cardholder, bound
   * funding-source internal account, state, and platform-specific card identifier.
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
   * Issue a new card for a cardholder. Every card must be bound to at least one
   * funding source at create time. The cardholder must have KYC status `APPROVED`
   * before a card can be issued; otherwise the request is rejected with
   * `CARDHOLDER_KYC_NOT_APPROVED`.
   *
   * An optional `maxSpendPerTransaction` value sets the largest amount a single card
   * transaction may authorize. The limit is enforced by Grid for card programs where
   * Grid makes the authorization decision, whether the card is funded by an Embedded
   * Wallet account or custodial fiat. Omit it for no limit. The value is in the
   * smallest unit of the card's currency.
   *
   * If any funding source is an Embedded Wallet internal account, the cardholder
   * must authorize Grid to sign Spark token transactions for that card funding
   * source by completing the delegated-key creation flow with
   * `POST /auth/delegated-keys`. Until an active delegated key exists for that
   * funding source, Authorization Decisioning cannot use it to fund card
   * transactions.
   *
   * New cards start in `state: "PROCESSING"` while the card issuer provisions the
   * card. The `card.state_change` webhook fires on each state transition, including
   * the transition to `ACTIVE` (or to `CLOSED` with `stateReason: "ISSUER_REJECTED"`
   * if provisioning fails).
   *
   * @example
   * ```ts
   * const card = await client.cards.issue({
   *   cardholderId:
   *     'Customer:019542f5-b3e7-1d02-0000-000000000001',
   *   form: 'VIRTUAL',
   *   fundingSources: [
   *     'InternalAccount:019542f5-b3e7-1d02-0000-000000000002',
   *   ],
   *   maxSpendPerTransaction: 5000,
   *   platformCardId: 'card-emp-aary-001',
   * });
   * ```
   */
  issue(body: CardIssueParams, options?: RequestOptions): APIPromise<Card> {
    return this._client.post('/cards', { body, ...options, __security: { basicAuth: true } });
  }
}

export type CardsDefaultPagination = DefaultPagination<Card>;

export interface Card {
  /**
   * System-generated unique card identifier
   */
  id: string;

  /**
   * The id of the `Customer` who holds this card.
   */
  cardholderId: string;

  /**
   * Creation timestamp
   */
  createdAt: string;

  /**
   * Physical form factor of the card. Only `VIRTUAL` is supported in v1; `PHYSICAL`
   * will be added in a later release.
   */
  form: 'VIRTUAL';

  /**
   * Internal account ids bound to this card as funding sources, in priority order —
   * the first entry is tried first by Authorization Decisioning. Every card has at
   * least one funding source.
   */
  fundingSources: Array<string>;

  /**
   * Largest amount a single card transaction may authorize, in the smallest unit of
   * the card's `currency`. Null means the card has no application-enforced
   * per-transaction limit. A transaction for exactly this amount is allowed.
   */
  maxSpendPerTransaction: number | null;

  /**
   * Lifecycle state of a card.
   *
   * | State         | Description                                                                                                                                                   |
   * | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
   * | `PENDING_KYC` | The cardholder has not yet completed KYC. Cards in this state cannot transact.                                                                                |
   * | `PROCESSING`  | The card has been requested and is being provisioned with the issuer.                                                                                         |
   * | `ACTIVE`      | The card is live and can authorize transactions.                                                                                                              |
   * | `FROZEN`      | The card is temporarily disabled by the platform. New authorizations are declined with `CARD_PAUSED`. Existing settlements and refunds continue to reconcile. |
   * | `CLOSED`      | The card is permanently closed. Terminal, irreversible state.                                                                                                 |
   */
  state: 'PENDING_KYC' | 'PROCESSING' | 'ACTIVE' | 'FROZEN' | 'CLOSED';

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
   * Currency the card transacts in (ISO 4217 for fiat, tickers for crypto). Derived
   * from the funding sources at issue time — all funding sources bound to a card
   * must be denominated in the same card-eligible currency.
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
   * Platform-specific card identifier. Optional on create — system-generated if
   * omitted, mirroring `platformCustomerId` semantics.
   */
  platformCardId?: string;

  /**
   * Opaque processor-side reference for the card (e.g. the Lithic card token).
   * Useful for cross-referencing in the processor's dashboards; not used for any
   * Grid request routing.
   */
  processorRef?: string;

  /**
   * Reason associated with the current `state`. Populated when the card is `CLOSED`
   * or when provisioning was rejected; otherwise null.
   */
  stateReason?: 'ISSUER_REJECTED' | 'CLOSED_BY_PLATFORM' | 'CLOSED_BY_GRID' | null;
}

export interface CardCreateRequest {
  /**
   * The id of the `Customer` to issue the card to. The customer must have KYC status
   * `APPROVED`; otherwise the request is rejected with
   * `CARDHOLDER_KYC_NOT_APPROVED`.
   */
  cardholderId: string;

  /**
   * Physical form factor of the card. Only `VIRTUAL` is supported in v1; `PHYSICAL`
   * will be added in a later release.
   */
  form: 'VIRTUAL';

  /**
   * Internal account ids to bind as funding sources, in priority order. The first
   * entry is tried first by Authorization Decisioning. Every card must be bound to
   * at least one source, and every source must belong to the cardholder and be
   * denominated in a card-eligible currency; otherwise the request is rejected with
   * `FUNDING_SOURCE_INELIGIBLE`.
   */
  fundingSources: Array<string>;

  /**
   * Optional largest amount a single card transaction may authorize, in the smallest
   * unit of the card currency derived from its funding sources. Omit this field for
   * no limit. Supported only for card programs whose authorization decisions are
   * made by Grid. A transaction for exactly this amount is allowed.
   */
  maxSpendPerTransaction?: number;

  /**
   * Optional platform-specific card identifier. System-generated when omitted,
   * mirroring `platformCustomerId` semantics.
   */
  platformCardId?: string;

  /**
   * Optional static password used as the card's 3-D Secure factor. Only accepted for
   * card programs whose issuer supports a static-password factor (EU cards today);
   * supplying it for a program that does not is rejected with `INVALID_INPUT`. When
   * omitted, one is generated on the cardholder's behalf. Grid does not retain the
   * value: it is forwarded to the issuer and discarded, so it cannot be read back
   * afterwards.
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
 * Parent transaction row for a card authorization and all of the pulls /
 * settlements / refunds that reconcile against it. Child events are rolled up into
 * the `pullSummary`, `refundSummary`, and `settlementSummary` aggregates.
 * Delivered as the payload of the generic transaction webhook stream (extends the
 * Transaction model with a card destination type) on every transition.
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
   * Card transactions debit the customer's account.
   */
  direction: 'CREDIT' | 'DEBIT';

  merchant: SimulateAPI.CardMerchant;

  /**
   * Platform-specific ID of the customer (cardholder) this transaction belongs to.
   */
  platformCustomerId: string;

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
   * Opaque identifier for the transaction on the underlying issuer. Used to
   * cross-reference Grid records against issuer dashboards and webhooks.
   */
  issuerTransactionToken?: string;

  /**
   * Timestamp of the most recent reconcile event (pull / clearing / refund) against
   * this transaction.
   */
  lastEventAt?: string;

  pullSummary?: SimulateAPI.CardPullSummary;

  refundedAmount?: InvitationsAPI.CurrencyAmount;

  refundSummary?: SimulateAPI.CardRefundSummary;

  settledAmount?: InvitationsAPI.CurrencyAmount;

  settlementSummary?: SimulateAPI.CardSettlementSummary;
}

/**
 * Update request for `PATCH /cards/{id}`. At least one of `state`,
 * `fundingSources`, or `maxSpendPerTransaction` must be supplied. `state`
 * transitions are limited to `ACTIVE ⇄ FROZEN` and `ACTIVE | FROZEN → CLOSED`; any
 * other transition returns `409 INVALID_STATE_TRANSITION`. `CLOSED` is terminal
 * and irreversible and cannot be combined with `fundingSources` or
 * `maxSpendPerTransaction`. `fundingSources`, when supplied, fully replaces the
 * card's bound funding sources — the array order determines the priority
 * Authorization Decisioning tries them in.
 */
export interface CardUpdateRequest {
  /**
   * New ordered list of internal account ids to bind as funding sources. Fully
   * replaces the previous binding. Each id must belong to the cardholder and be
   * denominated in the card's currency. The list must contain at least one source —
   * to stop a card from spending without removing all sources, transition it to
   * `FROZEN` instead. Cannot be supplied alongside `state: CLOSED`.
   */
  fundingSources?: Array<string>;

  /**
   * Replacement per-transaction spending limit for the card, in the smallest unit of
   * its currency. Omit this field to leave the current limit unchanged, supply null
   * to clear it, or supply a positive integer to set it. Supported only for card
   * programs whose authorization decisions are made by Grid. Cannot be supplied
   * alongside `state: CLOSED`.
   */
  maxSpendPerTransaction?: number | null;

  /**
   * Target state for the card. Permitted transitions are `ACTIVE ⇄ FROZEN` and
   * `ACTIVE | FROZEN → CLOSED`. `CLOSED` is terminal and irreversible; once closed,
   * the card stays in the system for audit and reconciliation but cannot transact
   * again.
   */
  state?: 'ACTIVE' | 'FROZEN' | 'CLOSED';
}

export interface CardUpdateParams {
  /**
   * New ordered list of internal account ids to bind as funding sources. Fully
   * replaces the previous binding. Each id must belong to the cardholder and be
   * denominated in the card's currency. The list must contain at least one source —
   * to stop a card from spending without removing all sources, transition it to
   * `FROZEN` instead. Cannot be supplied alongside `state: CLOSED`.
   */
  fundingSources?: Array<string>;

  /**
   * Replacement per-transaction spending limit for the card, in the smallest unit of
   * its currency. Omit this field to leave the current limit unchanged, supply null
   * to clear it, or supply a positive integer to set it. Supported only for card
   * programs whose authorization decisions are made by Grid. Cannot be supplied
   * alongside `state: CLOSED`.
   */
  maxSpendPerTransaction?: number | null;

  /**
   * Target state for the card. Permitted transitions are `ACTIVE ⇄ FROZEN` and
   * `ACTIVE | FROZEN → CLOSED`. `CLOSED` is terminal and irreversible; once closed,
   * the card stays in the system for audit and reconciliation but cannot transact
   * again.
   */
  state?: 'ACTIVE' | 'FROZEN' | 'CLOSED';
}

export interface CardListParams extends DefaultPaginationParams {
  /**
   * Filter by internal account id. Returns cards whose `fundingSources` array
   * contains the given internal account id.
   */
  accountId?: string;

  /**
   * Filter by cardholder (customer) id.
   */
  cardholderId?: string;

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
   * Filter by card state.
   */
  state?: 'PENDING_KYC' | 'PROCESSING' | 'ACTIVE' | 'FROZEN' | 'CLOSED';
}

export interface CardIssueParams {
  /**
   * The id of the `Customer` to issue the card to. The customer must have KYC status
   * `APPROVED`; otherwise the request is rejected with
   * `CARDHOLDER_KYC_NOT_APPROVED`.
   */
  cardholderId: string;

  /**
   * Physical form factor of the card. Only `VIRTUAL` is supported in v1; `PHYSICAL`
   * will be added in a later release.
   */
  form: 'VIRTUAL';

  /**
   * Internal account ids to bind as funding sources, in priority order. The first
   * entry is tried first by Authorization Decisioning. Every card must be bound to
   * at least one source, and every source must belong to the cardholder and be
   * denominated in a card-eligible currency; otherwise the request is rejected with
   * `FUNDING_SOURCE_INELIGIBLE`.
   */
  fundingSources: Array<string>;

  /**
   * Optional largest amount a single card transaction may authorize, in the smallest
   * unit of the card currency derived from its funding sources. Omit this field for
   * no limit. Supported only for card programs whose authorization decisions are
   * made by Grid. A transaction for exactly this amount is allowed.
   */
  maxSpendPerTransaction?: number;

  /**
   * Optional platform-specific card identifier. System-generated when omitted,
   * mirroring `platformCustomerId` semantics.
   */
  platformCardId?: string;

  /**
   * Optional static password used as the card's 3-D Secure factor. Only accepted for
   * card programs whose issuer supports a static-password factor (EU cards today);
   * supplying it for a program that does not is rejected with `INVALID_INPUT`. When
   * omitted, one is generated on the cardholder's behalf. Grid does not retain the
   * value: it is forwarded to the issuer and discarded, so it cannot be read back
   * afterwards.
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
