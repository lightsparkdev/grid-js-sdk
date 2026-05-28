// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { DefaultPagination, type DefaultPaginationParams, PagePromise } from '../core/pagination';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

/**
 * Card management endpoints. Issue debit cards against an internal account, freeze / unfreeze, close, manage card funding sources, and list card transactions.
 */
export class Cards extends APIResource {
  /**
   * Retrieve a card by its system-generated id.
   *
   * @example
   * ```ts
   * const card = await client.cards.retrieve('id');
   * ```
   */
  retrieve(id: string, options?: RequestOptions): APIPromise<CardRetrieveResponse> {
    return this._client.get(path`/cards/${id}`, { ...options, __security: { basicAuth: true } });
  }

  /**
   * Update a card's `state` and / or its bound `fundingSources`. At least one of the
   * two fields must be supplied.
   *
   * - `state` transitions are limited to `ACTIVE ⇄ FROZEN` and
   *   `ACTIVE | FROZEN → CLOSED`. `CLOSED` is terminal and irreversible. Any other
   *   transition returns `409 INVALID_STATE_TRANSITION`.
   * - `fundingSources`, when supplied, fully replaces the card's bound funding
   *   sources. Array order determines the priority Authorization Decisioning tries
   *   them in. Each id must belong to the cardholder and be denominated in the
   *   card's currency; the list must contain at least one source. `fundingSources`
   *   cannot be supplied alongside `state: CLOSED`.
   *
   * Because both updates are sensitive state changes, this endpoint uses Grid's 202
   * → signed-retry pattern (same shape as `DELETE /auth/credentials/{id}` and
   * `POST /internal-accounts/{id}/export`):
   *
   * 1. Call `PATCH /cards/{id}` with the target fields and no signing headers. The
   *    response is `202` with a `payloadToSign`, `requestId`, and `expiresAt`.
   *
   * 2. Sign the `payloadToSign` with the session private key of a verified
   *    authentication credential on the card's owning internal account and retry
   *    with the signature as the `Grid-Wallet-Signature` header and the `requestId`
   *    echoed back as the `Request-Id` header. The signed retry returns `200` with
   *    the updated `Card`.
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
  update(id: string, params: CardUpdateParams, options?: RequestOptions): APIPromise<CardUpdateResponse> {
    const { 'Grid-Wallet-Signature': gridWalletSignature, 'Request-Id': requestID, ...body } = params;
    return this._client.patch(path`/cards/${id}`, {
      body,
      ...options,
      headers: buildHeaders([
        {
          ...(gridWalletSignature != null ? { 'Grid-Wallet-Signature': gridWalletSignature } : undefined),
          ...(requestID != null ? { 'Request-Id': requestID } : undefined),
        },
        options?.headers,
      ]),
      __security: { basicAuth: true },
    });
  }

  /**
   * Retrieve a paginated list of cards. Cards can be filtered by cardholder, bound
   * funding-source internal account, state, and platform-specific card identifier.
   * If no filters are provided, returns all cards visible to the caller.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const cardListResponse of client.cards.list()) {
   *   // ...
   * }
   * ```
   */
  list(
    query: CardListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<CardListResponsesDefaultPagination, CardListResponse> {
    return this._client.getAPIList('/cards', DefaultPagination<CardListResponse>, {
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
   * New cards start in `state: "PENDING_ISSUE"` while the card issuer provisions the
   * card. The `card.state_change` webhook fires on the transition to `ACTIVE` (or to
   * `CLOSED` with `stateReason: "ISSUER_REJECTED"` if provisioning fails).
   *
   * @example
   * ```ts
   * const response = await client.cards.issue({
   *   cardholderId:
   *     'Customer:019542f5-b3e7-1d02-0000-000000000001',
   *   form: 'VIRTUAL',
   *   fundingSources: [
   *     'InternalAccount:019542f5-b3e7-1d02-0000-000000000002',
   *   ],
   *   platformCardId: 'card-emp-aary-001',
   * });
   * ```
   */
  issue(body: CardIssueParams, options?: RequestOptions): APIPromise<CardIssueResponse> {
    return this._client.post('/cards', { body, ...options, __security: { basicAuth: true } });
  }
}

export type CardListResponsesDefaultPagination = DefaultPagination<CardListResponse>;

export interface CardRetrieveResponse {
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
   * Lifecycle state of a card.
   *
   * | State           | Description                                                                                                                                                   |
   * | --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
   * | `PENDING_KYC`   | The cardholder has not yet completed KYC. Cards in this state cannot transact.                                                                                |
   * | `PENDING_ISSUE` | The card has been requested and is being provisioned with the issuer.                                                                                         |
   * | `ACTIVE`        | The card is live and can authorize transactions.                                                                                                              |
   * | `FROZEN`        | The card is temporarily disabled by the platform. New authorizations are declined with `CARD_PAUSED`. Existing settlements and refunds continue to reconcile. |
   * | `CLOSED`        | The card is permanently closed. Terminal, irreversible state.                                                                                                 |
   */
  state: 'PENDING_KYC' | 'PENDING_ISSUE' | 'ACTIVE' | 'FROZEN' | 'CLOSED';

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
   * Opaque identifier for the card on the underlying issuer. Useful for
   * cross-referencing in issuer dashboards; not used for any Grid request routing.
   */
  issuerRef?: string;

  /**
   * Last four digits of the card PAN.
   */
  last4?: string;

  /**
   * URL of the card issuer's iframe that securely displays the PAN, CVV, and expiry
   * to the cardholder. The full PAN and CVV never cross Grid's servers — render this
   * URL in an iframe in your client to reveal card details.
   */
  panEmbedUrl?: string;

  /**
   * Platform-specific card identifier. Optional on create — system-generated if
   * omitted, mirroring `platformCustomerId` semantics.
   */
  platformCardId?: string;

  /**
   * Reason associated with the current `state`. Populated when the card is `CLOSED`
   * or when provisioning was rejected; otherwise null.
   */
  stateReason?: 'ISSUER_REJECTED' | 'CLOSED_BY_PLATFORM' | 'CLOSED_BY_GRID' | null;
}

export interface CardUpdateResponse {
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
   * Lifecycle state of a card.
   *
   * | State           | Description                                                                                                                                                   |
   * | --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
   * | `PENDING_KYC`   | The cardholder has not yet completed KYC. Cards in this state cannot transact.                                                                                |
   * | `PENDING_ISSUE` | The card has been requested and is being provisioned with the issuer.                                                                                         |
   * | `ACTIVE`        | The card is live and can authorize transactions.                                                                                                              |
   * | `FROZEN`        | The card is temporarily disabled by the platform. New authorizations are declined with `CARD_PAUSED`. Existing settlements and refunds continue to reconcile. |
   * | `CLOSED`        | The card is permanently closed. Terminal, irreversible state.                                                                                                 |
   */
  state: 'PENDING_KYC' | 'PENDING_ISSUE' | 'ACTIVE' | 'FROZEN' | 'CLOSED';

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
   * Opaque identifier for the card on the underlying issuer. Useful for
   * cross-referencing in issuer dashboards; not used for any Grid request routing.
   */
  issuerRef?: string;

  /**
   * Last four digits of the card PAN.
   */
  last4?: string;

  /**
   * URL of the card issuer's iframe that securely displays the PAN, CVV, and expiry
   * to the cardholder. The full PAN and CVV never cross Grid's servers — render this
   * URL in an iframe in your client to reveal card details.
   */
  panEmbedUrl?: string;

  /**
   * Platform-specific card identifier. Optional on create — system-generated if
   * omitted, mirroring `platformCustomerId` semantics.
   */
  platformCardId?: string;

  /**
   * Reason associated with the current `state`. Populated when the card is `CLOSED`
   * or when provisioning was rejected; otherwise null.
   */
  stateReason?: 'ISSUER_REJECTED' | 'CLOSED_BY_PLATFORM' | 'CLOSED_BY_GRID' | null;
}

export interface CardListResponse {
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
   * Lifecycle state of a card.
   *
   * | State           | Description                                                                                                                                                   |
   * | --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
   * | `PENDING_KYC`   | The cardholder has not yet completed KYC. Cards in this state cannot transact.                                                                                |
   * | `PENDING_ISSUE` | The card has been requested and is being provisioned with the issuer.                                                                                         |
   * | `ACTIVE`        | The card is live and can authorize transactions.                                                                                                              |
   * | `FROZEN`        | The card is temporarily disabled by the platform. New authorizations are declined with `CARD_PAUSED`. Existing settlements and refunds continue to reconcile. |
   * | `CLOSED`        | The card is permanently closed. Terminal, irreversible state.                                                                                                 |
   */
  state: 'PENDING_KYC' | 'PENDING_ISSUE' | 'ACTIVE' | 'FROZEN' | 'CLOSED';

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
   * Opaque identifier for the card on the underlying issuer. Useful for
   * cross-referencing in issuer dashboards; not used for any Grid request routing.
   */
  issuerRef?: string;

  /**
   * Last four digits of the card PAN.
   */
  last4?: string;

  /**
   * URL of the card issuer's iframe that securely displays the PAN, CVV, and expiry
   * to the cardholder. The full PAN and CVV never cross Grid's servers — render this
   * URL in an iframe in your client to reveal card details.
   */
  panEmbedUrl?: string;

  /**
   * Platform-specific card identifier. Optional on create — system-generated if
   * omitted, mirroring `platformCustomerId` semantics.
   */
  platformCardId?: string;

  /**
   * Reason associated with the current `state`. Populated when the card is `CLOSED`
   * or when provisioning was rejected; otherwise null.
   */
  stateReason?: 'ISSUER_REJECTED' | 'CLOSED_BY_PLATFORM' | 'CLOSED_BY_GRID' | null;
}

export interface CardIssueResponse {
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
   * Lifecycle state of a card.
   *
   * | State           | Description                                                                                                                                                   |
   * | --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
   * | `PENDING_KYC`   | The cardholder has not yet completed KYC. Cards in this state cannot transact.                                                                                |
   * | `PENDING_ISSUE` | The card has been requested and is being provisioned with the issuer.                                                                                         |
   * | `ACTIVE`        | The card is live and can authorize transactions.                                                                                                              |
   * | `FROZEN`        | The card is temporarily disabled by the platform. New authorizations are declined with `CARD_PAUSED`. Existing settlements and refunds continue to reconcile. |
   * | `CLOSED`        | The card is permanently closed. Terminal, irreversible state.                                                                                                 |
   */
  state: 'PENDING_KYC' | 'PENDING_ISSUE' | 'ACTIVE' | 'FROZEN' | 'CLOSED';

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
   * Opaque identifier for the card on the underlying issuer. Useful for
   * cross-referencing in issuer dashboards; not used for any Grid request routing.
   */
  issuerRef?: string;

  /**
   * Last four digits of the card PAN.
   */
  last4?: string;

  /**
   * URL of the card issuer's iframe that securely displays the PAN, CVV, and expiry
   * to the cardholder. The full PAN and CVV never cross Grid's servers — render this
   * URL in an iframe in your client to reveal card details.
   */
  panEmbedUrl?: string;

  /**
   * Platform-specific card identifier. Optional on create — system-generated if
   * omitted, mirroring `platformCustomerId` semantics.
   */
  platformCardId?: string;

  /**
   * Reason associated with the current `state`. Populated when the card is `CLOSED`
   * or when provisioning was rejected; otherwise null.
   */
  stateReason?: 'ISSUER_REJECTED' | 'CLOSED_BY_PLATFORM' | 'CLOSED_BY_GRID' | null;
}

export interface CardUpdateParams {
  /**
   * Body param: New ordered list of internal account ids to bind as funding sources.
   * Fully replaces the previous binding. Each id must belong to the cardholder and
   * be denominated in the card's currency. The list must contain at least one source
   * — to stop a card from spending without removing all sources, transition it to
   * `FROZEN` instead. Cannot be supplied alongside `state: CLOSED`.
   */
  fundingSources?: Array<string>;

  /**
   * Body param: Target state for the card. Permitted transitions are
   * `ACTIVE ⇄ FROZEN` and `ACTIVE | FROZEN → CLOSED`. `CLOSED` is terminal and
   * irreversible; once closed, the card stays in the system for audit and
   * reconciliation but cannot transact again.
   */
  state?: 'ACTIVE' | 'FROZEN' | 'CLOSED';

  /**
   * Header param: Signature over the `payloadToSign` returned in a prior `202`
   * response, produced with the session private key of a verified authentication
   * credential on the card's owning internal account and base64-encoded. Required on
   * the signed retry; ignored on the initial call.
   */
  'Grid-Wallet-Signature'?: string;

  /**
   * Header param: The `requestId` returned in a prior `202` response, echoed back on
   * the signed retry so the server can correlate it with the issued challenge.
   * Required on the signed retry; must be paired with `Grid-Wallet-Signature`.
   */
  'Request-Id'?: string;
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
  state?: 'PENDING_KYC' | 'PENDING_ISSUE' | 'ACTIVE' | 'FROZEN' | 'CLOSED';
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
   * denominated in a card-eligible currency (USDB in v1); otherwise the request is
   * rejected with `FUNDING_SOURCE_INELIGIBLE`.
   */
  fundingSources: Array<string>;

  /**
   * Optional platform-specific card identifier. System-generated when omitted,
   * mirroring `platformCustomerId` semantics.
   */
  platformCardId?: string;
}

export declare namespace Cards {
  export {
    type CardRetrieveResponse as CardRetrieveResponse,
    type CardUpdateResponse as CardUpdateResponse,
    type CardListResponse as CardListResponse,
    type CardIssueResponse as CardIssueResponse,
    type CardListResponsesDefaultPagination as CardListResponsesDefaultPagination,
    type CardUpdateParams as CardUpdateParams,
    type CardListParams as CardListParams,
    type CardIssueParams as CardIssueParams,
  };
}
