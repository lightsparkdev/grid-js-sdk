// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as InvitationsAPI from './invitations';
import * as ReceiverAPI from './receiver';
import * as Shared from './shared';
import * as TransactionsAPI from './transactions';
import * as AgentsAPI from './agents/agents';
import * as CustomersAPI from './customers/customers';
import * as InternalAccountsAPI from './sandbox/internal-accounts';

export class Webhooks extends APIResource {
  unwrap(body: string): UnwrapWebhookEvent {
    return JSON.parse(body) as UnwrapWebhookEvent;
  }
}

export interface AgentActionWebhookEvent {
  /**
   * Unique identifier for this webhook delivery (can be used for idempotency)
   */
  id: string;

  /**
   * An action submitted by an agent that may require platform approval before
   * execution. All agent-initiated operations (quote execution, transfers) are
   * represented as AgentActions, giving the platform a consistent object to approve,
   * reject, and audit regardless of the underlying operation type.
   */
  data: AgentsAPI.AgentAction;

  /**
   * ISO 8601 timestamp of when the webhook was sent
   */
  timestamp: string;

  type:
    | 'AGENT_ACTION.PENDING_APPROVAL'
    | 'OUTGOING_PAYMENT.PENDING'
    | 'OUTGOING_PAYMENT.PROCESSING'
    | 'OUTGOING_PAYMENT.COMPLETED'
    | 'OUTGOING_PAYMENT.FAILED'
    | 'OUTGOING_PAYMENT.EXPIRED'
    | 'OUTGOING_PAYMENT.REFUND_PENDING'
    | 'OUTGOING_PAYMENT.REFUND_COMPLETED'
    | 'OUTGOING_PAYMENT.REFUND_FAILED'
    | 'INCOMING_PAYMENT.PENDING'
    | 'INCOMING_PAYMENT.COMPLETED'
    | 'INCOMING_PAYMENT.FAILED'
    | 'CUSTOMER.KYC_APPROVED'
    | 'CUSTOMER.KYC_REJECTED'
    | 'CUSTOMER.KYC_PENDING'
    | 'CUSTOMER.KYB_APPROVED'
    | 'CUSTOMER.KYB_REJECTED'
    | 'CUSTOMER.KYB_PENDING'
    | 'VERIFICATION.APPROVED'
    | 'VERIFICATION.REJECTED'
    | 'VERIFICATION.RESOLVE_ERRORS'
    | 'VERIFICATION.IN_PROGRESS'
    | 'VERIFICATION.PENDING_MANUAL_REVIEW'
    | 'VERIFICATION.READY_FOR_VERIFICATION'
    | 'INTERNAL_ACCOUNT.BALANCE_UPDATED'
    | 'INTERNAL_ACCOUNT.STATUS_UPDATED'
    | 'INVITATION.CLAIMED'
    | 'BULK_UPLOAD.COMPLETED'
    | 'BULK_UPLOAD.FAILED'
    | 'CARD.STATE_CHANGE'
    | 'CARD.FUNDING_SOURCE_CHANGE'
    | 'TEST';
}

export interface IncomingPaymentWebhookEvent {
  /**
   * Unique identifier for this webhook delivery (can be used for idempotency)
   */
  id: string;

  data: IncomingPaymentWebhookEvent.Data;

  /**
   * ISO 8601 timestamp of when the webhook was sent
   */
  timestamp: string;

  type:
    | 'INCOMING_PAYMENT.PENDING'
    | 'INCOMING_PAYMENT.COMPLETED'
    | 'INCOMING_PAYMENT.FAILED'
    | 'OUTGOING_PAYMENT.PENDING'
    | 'OUTGOING_PAYMENT.PROCESSING'
    | 'OUTGOING_PAYMENT.COMPLETED'
    | 'OUTGOING_PAYMENT.FAILED'
    | 'OUTGOING_PAYMENT.EXPIRED'
    | 'OUTGOING_PAYMENT.REFUND_PENDING'
    | 'OUTGOING_PAYMENT.REFUND_COMPLETED'
    | 'OUTGOING_PAYMENT.REFUND_FAILED'
    | 'CUSTOMER.KYC_APPROVED'
    | 'CUSTOMER.KYC_REJECTED'
    | 'CUSTOMER.KYC_PENDING'
    | 'CUSTOMER.KYB_APPROVED'
    | 'CUSTOMER.KYB_REJECTED'
    | 'CUSTOMER.KYB_PENDING'
    | 'VERIFICATION.APPROVED'
    | 'VERIFICATION.REJECTED'
    | 'VERIFICATION.RESOLVE_ERRORS'
    | 'VERIFICATION.IN_PROGRESS'
    | 'VERIFICATION.PENDING_MANUAL_REVIEW'
    | 'VERIFICATION.READY_FOR_VERIFICATION'
    | 'INTERNAL_ACCOUNT.BALANCE_UPDATED'
    | 'INTERNAL_ACCOUNT.STATUS_UPDATED'
    | 'INVITATION.CLAIMED'
    | 'BULK_UPLOAD.COMPLETED'
    | 'BULK_UPLOAD.FAILED'
    | 'AGENT_ACTION.PENDING_APPROVAL'
    | 'CARD.STATE_CHANGE'
    | 'CARD.FUNDING_SOURCE_CHANGE'
    | 'TEST';
}

export namespace IncomingPaymentWebhookEvent {
  export interface Data extends TransactionsAPI.IncomingTransaction {
    /**
     * Information required by the sender's VASP about the recipient. Platform must
     * provide these in the 200 OK response if approving. Note that this only includes
     * fields which Grid does not already have from initial customer registration.
     */
    requestedReceiverCustomerInfoFields?: Array<ReceiverAPI.CounterpartyFieldDefinition>;
  }
}

export interface OutgoingPaymentWebhookEvent {
  /**
   * Unique identifier for this webhook delivery (can be used for idempotency)
   */
  id: string;

  data: TransactionsAPI.OutgoingTransaction;

  /**
   * ISO 8601 timestamp of when the webhook was sent
   */
  timestamp: string;

  type:
    | 'OUTGOING_PAYMENT.PENDING'
    | 'OUTGOING_PAYMENT.PROCESSING'
    | 'OUTGOING_PAYMENT.COMPLETED'
    | 'OUTGOING_PAYMENT.FAILED'
    | 'OUTGOING_PAYMENT.EXPIRED'
    | 'OUTGOING_PAYMENT.REFUND_PENDING'
    | 'OUTGOING_PAYMENT.REFUND_COMPLETED'
    | 'OUTGOING_PAYMENT.REFUND_FAILED'
    | 'INCOMING_PAYMENT.PENDING'
    | 'INCOMING_PAYMENT.COMPLETED'
    | 'INCOMING_PAYMENT.FAILED'
    | 'CUSTOMER.KYC_APPROVED'
    | 'CUSTOMER.KYC_REJECTED'
    | 'CUSTOMER.KYC_PENDING'
    | 'CUSTOMER.KYB_APPROVED'
    | 'CUSTOMER.KYB_REJECTED'
    | 'CUSTOMER.KYB_PENDING'
    | 'VERIFICATION.APPROVED'
    | 'VERIFICATION.REJECTED'
    | 'VERIFICATION.RESOLVE_ERRORS'
    | 'VERIFICATION.IN_PROGRESS'
    | 'VERIFICATION.PENDING_MANUAL_REVIEW'
    | 'VERIFICATION.READY_FOR_VERIFICATION'
    | 'INTERNAL_ACCOUNT.BALANCE_UPDATED'
    | 'INTERNAL_ACCOUNT.STATUS_UPDATED'
    | 'INVITATION.CLAIMED'
    | 'BULK_UPLOAD.COMPLETED'
    | 'BULK_UPLOAD.FAILED'
    | 'AGENT_ACTION.PENDING_APPROVAL'
    | 'CARD.STATE_CHANGE'
    | 'CARD.FUNDING_SOURCE_CHANGE'
    | 'TEST';
}

export interface TestWebhookWebhookEvent {
  /**
   * Unique identifier for this webhook delivery (can be used for idempotency)
   */
  id: string;

  /**
   * ISO 8601 timestamp of when the webhook was sent
   */
  timestamp: string;

  type:
    | 'TEST'
    | 'OUTGOING_PAYMENT.PENDING'
    | 'OUTGOING_PAYMENT.PROCESSING'
    | 'OUTGOING_PAYMENT.COMPLETED'
    | 'OUTGOING_PAYMENT.FAILED'
    | 'OUTGOING_PAYMENT.EXPIRED'
    | 'OUTGOING_PAYMENT.REFUND_PENDING'
    | 'OUTGOING_PAYMENT.REFUND_COMPLETED'
    | 'OUTGOING_PAYMENT.REFUND_FAILED'
    | 'INCOMING_PAYMENT.PENDING'
    | 'INCOMING_PAYMENT.COMPLETED'
    | 'INCOMING_PAYMENT.FAILED'
    | 'CUSTOMER.KYC_APPROVED'
    | 'CUSTOMER.KYC_REJECTED'
    | 'CUSTOMER.KYC_PENDING'
    | 'CUSTOMER.KYB_APPROVED'
    | 'CUSTOMER.KYB_REJECTED'
    | 'CUSTOMER.KYB_PENDING'
    | 'VERIFICATION.APPROVED'
    | 'VERIFICATION.REJECTED'
    | 'VERIFICATION.RESOLVE_ERRORS'
    | 'VERIFICATION.IN_PROGRESS'
    | 'VERIFICATION.PENDING_MANUAL_REVIEW'
    | 'VERIFICATION.READY_FOR_VERIFICATION'
    | 'INTERNAL_ACCOUNT.BALANCE_UPDATED'
    | 'INTERNAL_ACCOUNT.STATUS_UPDATED'
    | 'INVITATION.CLAIMED'
    | 'BULK_UPLOAD.COMPLETED'
    | 'BULK_UPLOAD.FAILED'
    | 'AGENT_ACTION.PENDING_APPROVAL'
    | 'CARD.STATE_CHANGE'
    | 'CARD.FUNDING_SOURCE_CHANGE';
}

export interface BulkUploadWebhookEvent {
  /**
   * Unique identifier for this webhook delivery (can be used for idempotency)
   */
  id: string;

  data: BulkUploadWebhookEvent.Data;

  /**
   * ISO 8601 timestamp of when the webhook was sent
   */
  timestamp: string;

  type:
    | 'BULK_UPLOAD.COMPLETED'
    | 'BULK_UPLOAD.FAILED'
    | 'OUTGOING_PAYMENT.PENDING'
    | 'OUTGOING_PAYMENT.PROCESSING'
    | 'OUTGOING_PAYMENT.COMPLETED'
    | 'OUTGOING_PAYMENT.FAILED'
    | 'OUTGOING_PAYMENT.EXPIRED'
    | 'OUTGOING_PAYMENT.REFUND_PENDING'
    | 'OUTGOING_PAYMENT.REFUND_COMPLETED'
    | 'OUTGOING_PAYMENT.REFUND_FAILED'
    | 'INCOMING_PAYMENT.PENDING'
    | 'INCOMING_PAYMENT.COMPLETED'
    | 'INCOMING_PAYMENT.FAILED'
    | 'CUSTOMER.KYC_APPROVED'
    | 'CUSTOMER.KYC_REJECTED'
    | 'CUSTOMER.KYC_PENDING'
    | 'CUSTOMER.KYB_APPROVED'
    | 'CUSTOMER.KYB_REJECTED'
    | 'CUSTOMER.KYB_PENDING'
    | 'VERIFICATION.APPROVED'
    | 'VERIFICATION.REJECTED'
    | 'VERIFICATION.RESOLVE_ERRORS'
    | 'VERIFICATION.IN_PROGRESS'
    | 'VERIFICATION.PENDING_MANUAL_REVIEW'
    | 'VERIFICATION.READY_FOR_VERIFICATION'
    | 'INTERNAL_ACCOUNT.BALANCE_UPDATED'
    | 'INTERNAL_ACCOUNT.STATUS_UPDATED'
    | 'INVITATION.CLAIMED'
    | 'AGENT_ACTION.PENDING_APPROVAL'
    | 'CARD.STATE_CHANGE'
    | 'CARD.FUNDING_SOURCE_CHANGE'
    | 'TEST';
}

export namespace BulkUploadWebhookEvent {
  export interface Data {
    /**
     * Unique identifier for the bulk import job
     */
    id: string;

    progress: Data.Progress;

    /**
     * Current status of the job
     */
    status: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED';

    /**
     * Timestamp when the job completed (only present for COMPLETED or FAILED status)
     */
    completedAt?: string;

    /**
     * Detailed error information for failed entries
     */
    errors?: Array<Shared.BulkCustomerImportErrorEntry>;
  }

  export namespace Data {
    export interface Progress {
      /**
       * Number of customers that failed to create
       */
      failed: number;

      /**
       * Number of customers processed so far
       */
      processed: number;

      /**
       * Number of customers successfully created
       */
      successful: number;

      /**
       * Total number of customers to process
       */
      total: number;
    }
  }
}

export interface InvitationClaimedWebhookEvent {
  /**
   * Unique identifier for this webhook delivery (can be used for idempotency)
   */
  id: string;

  data: InvitationsAPI.UmaInvitation;

  /**
   * ISO 8601 timestamp of when the webhook was sent
   */
  timestamp: string;

  type:
    | 'INVITATION.CLAIMED'
    | 'OUTGOING_PAYMENT.PENDING'
    | 'OUTGOING_PAYMENT.PROCESSING'
    | 'OUTGOING_PAYMENT.COMPLETED'
    | 'OUTGOING_PAYMENT.FAILED'
    | 'OUTGOING_PAYMENT.EXPIRED'
    | 'OUTGOING_PAYMENT.REFUND_PENDING'
    | 'OUTGOING_PAYMENT.REFUND_COMPLETED'
    | 'OUTGOING_PAYMENT.REFUND_FAILED'
    | 'INCOMING_PAYMENT.PENDING'
    | 'INCOMING_PAYMENT.COMPLETED'
    | 'INCOMING_PAYMENT.FAILED'
    | 'CUSTOMER.KYC_APPROVED'
    | 'CUSTOMER.KYC_REJECTED'
    | 'CUSTOMER.KYC_PENDING'
    | 'CUSTOMER.KYB_APPROVED'
    | 'CUSTOMER.KYB_REJECTED'
    | 'CUSTOMER.KYB_PENDING'
    | 'VERIFICATION.APPROVED'
    | 'VERIFICATION.REJECTED'
    | 'VERIFICATION.RESOLVE_ERRORS'
    | 'VERIFICATION.IN_PROGRESS'
    | 'VERIFICATION.PENDING_MANUAL_REVIEW'
    | 'VERIFICATION.READY_FOR_VERIFICATION'
    | 'INTERNAL_ACCOUNT.BALANCE_UPDATED'
    | 'INTERNAL_ACCOUNT.STATUS_UPDATED'
    | 'BULK_UPLOAD.COMPLETED'
    | 'BULK_UPLOAD.FAILED'
    | 'AGENT_ACTION.PENDING_APPROVAL'
    | 'CARD.STATE_CHANGE'
    | 'CARD.FUNDING_SOURCE_CHANGE'
    | 'TEST';
}

export interface CustomerUpdateWebhookEvent {
  /**
   * Unique identifier for this webhook delivery (can be used for idempotency)
   */
  id: string;

  data: CustomersAPI.CustomerOneOf;

  /**
   * ISO 8601 timestamp of when the webhook was sent
   */
  timestamp: string;

  type:
    | 'CUSTOMER.KYC_APPROVED'
    | 'CUSTOMER.KYC_REJECTED'
    | 'CUSTOMER.KYC_PENDING'
    | 'CUSTOMER.KYB_APPROVED'
    | 'CUSTOMER.KYB_REJECTED'
    | 'CUSTOMER.KYB_PENDING'
    | 'OUTGOING_PAYMENT.PENDING'
    | 'OUTGOING_PAYMENT.PROCESSING'
    | 'OUTGOING_PAYMENT.COMPLETED'
    | 'OUTGOING_PAYMENT.FAILED'
    | 'OUTGOING_PAYMENT.EXPIRED'
    | 'OUTGOING_PAYMENT.REFUND_PENDING'
    | 'OUTGOING_PAYMENT.REFUND_COMPLETED'
    | 'OUTGOING_PAYMENT.REFUND_FAILED'
    | 'INCOMING_PAYMENT.PENDING'
    | 'INCOMING_PAYMENT.COMPLETED'
    | 'INCOMING_PAYMENT.FAILED'
    | 'VERIFICATION.APPROVED'
    | 'VERIFICATION.REJECTED'
    | 'VERIFICATION.RESOLVE_ERRORS'
    | 'VERIFICATION.IN_PROGRESS'
    | 'VERIFICATION.PENDING_MANUAL_REVIEW'
    | 'VERIFICATION.READY_FOR_VERIFICATION'
    | 'INTERNAL_ACCOUNT.BALANCE_UPDATED'
    | 'INTERNAL_ACCOUNT.STATUS_UPDATED'
    | 'INVITATION.CLAIMED'
    | 'BULK_UPLOAD.COMPLETED'
    | 'BULK_UPLOAD.FAILED'
    | 'AGENT_ACTION.PENDING_APPROVAL'
    | 'CARD.STATE_CHANGE'
    | 'CARD.FUNDING_SOURCE_CHANGE'
    | 'TEST';
}

export interface InternalAccountStatusWebhookEvent {
  /**
   * Unique identifier for this webhook delivery (can be used for idempotency)
   */
  id: string;

  data: InternalAccountsAPI.InternalAccount;

  /**
   * ISO 8601 timestamp of when the webhook was sent
   */
  timestamp: string;

  type:
    | 'INTERNAL_ACCOUNT.BALANCE_UPDATED'
    | 'INTERNAL_ACCOUNT.STATUS_UPDATED'
    | 'OUTGOING_PAYMENT.PENDING'
    | 'OUTGOING_PAYMENT.PROCESSING'
    | 'OUTGOING_PAYMENT.COMPLETED'
    | 'OUTGOING_PAYMENT.FAILED'
    | 'OUTGOING_PAYMENT.EXPIRED'
    | 'OUTGOING_PAYMENT.REFUND_PENDING'
    | 'OUTGOING_PAYMENT.REFUND_COMPLETED'
    | 'OUTGOING_PAYMENT.REFUND_FAILED'
    | 'INCOMING_PAYMENT.PENDING'
    | 'INCOMING_PAYMENT.COMPLETED'
    | 'INCOMING_PAYMENT.FAILED'
    | 'CUSTOMER.KYC_APPROVED'
    | 'CUSTOMER.KYC_REJECTED'
    | 'CUSTOMER.KYC_PENDING'
    | 'CUSTOMER.KYB_APPROVED'
    | 'CUSTOMER.KYB_REJECTED'
    | 'CUSTOMER.KYB_PENDING'
    | 'VERIFICATION.APPROVED'
    | 'VERIFICATION.REJECTED'
    | 'VERIFICATION.RESOLVE_ERRORS'
    | 'VERIFICATION.IN_PROGRESS'
    | 'VERIFICATION.PENDING_MANUAL_REVIEW'
    | 'VERIFICATION.READY_FOR_VERIFICATION'
    | 'INVITATION.CLAIMED'
    | 'BULK_UPLOAD.COMPLETED'
    | 'BULK_UPLOAD.FAILED'
    | 'AGENT_ACTION.PENDING_APPROVAL'
    | 'CARD.STATE_CHANGE'
    | 'CARD.FUNDING_SOURCE_CHANGE'
    | 'TEST';
}

export interface VerificationUpdateWebhookEvent {
  /**
   * Unique identifier for this webhook delivery (can be used for idempotency)
   */
  id: string;

  data: VerificationUpdateWebhookEvent.Data;

  /**
   * ISO 8601 timestamp of when the webhook was sent
   */
  timestamp: string;

  type:
    | 'VERIFICATION.APPROVED'
    | 'VERIFICATION.REJECTED'
    | 'VERIFICATION.RESOLVE_ERRORS'
    | 'VERIFICATION.IN_PROGRESS'
    | 'VERIFICATION.PENDING_MANUAL_REVIEW'
    | 'OUTGOING_PAYMENT.PENDING'
    | 'OUTGOING_PAYMENT.PROCESSING'
    | 'OUTGOING_PAYMENT.COMPLETED'
    | 'OUTGOING_PAYMENT.FAILED'
    | 'OUTGOING_PAYMENT.EXPIRED'
    | 'OUTGOING_PAYMENT.REFUND_PENDING'
    | 'OUTGOING_PAYMENT.REFUND_COMPLETED'
    | 'OUTGOING_PAYMENT.REFUND_FAILED'
    | 'INCOMING_PAYMENT.PENDING'
    | 'INCOMING_PAYMENT.COMPLETED'
    | 'INCOMING_PAYMENT.FAILED'
    | 'CUSTOMER.KYC_APPROVED'
    | 'CUSTOMER.KYC_REJECTED'
    | 'CUSTOMER.KYC_PENDING'
    | 'CUSTOMER.KYB_APPROVED'
    | 'CUSTOMER.KYB_REJECTED'
    | 'CUSTOMER.KYB_PENDING'
    | 'VERIFICATION.READY_FOR_VERIFICATION'
    | 'INTERNAL_ACCOUNT.BALANCE_UPDATED'
    | 'INTERNAL_ACCOUNT.STATUS_UPDATED'
    | 'INVITATION.CLAIMED'
    | 'BULK_UPLOAD.COMPLETED'
    | 'BULK_UPLOAD.FAILED'
    | 'AGENT_ACTION.PENDING_APPROVAL'
    | 'CARD.STATE_CHANGE'
    | 'CARD.FUNDING_SOURCE_CHANGE'
    | 'TEST';
}

export namespace VerificationUpdateWebhookEvent {
  export interface Data {
    /**
     * Unique identifier for this verification
     */
    id: string;

    /**
     * When this verification was created
     */
    createdAt: string;

    /**
     * The ID of the customer being verified
     */
    customerId: string;

    /**
     * List of issues preventing verification from proceeding. Empty when
     * verificationStatus is APPROVED or IN_PROGRESS.
     */
    errors: Array<Shared.VerificationError>;

    /**
     * Current status of the KYC/KYB verification
     */
    verificationStatus:
      | 'RESOLVE_ERRORS'
      | 'PENDING_MANUAL_REVIEW'
      | 'IN_PROGRESS'
      | 'APPROVED'
      | 'REJECTED'
      | 'READY_FOR_VERIFICATION';

    /**
     * When this verification was last updated
     */
    updatedAt?: string;
  }
}

export interface CardStateChangeWebhookEvent {
  /**
   * Unique identifier for this webhook delivery (can be used for idempotency)
   */
  id: string;

  data: CardStateChangeWebhookEvent.Data;

  /**
   * ISO 8601 timestamp of when the webhook was sent
   */
  timestamp: string;

  type:
    | 'CARD.STATE_CHANGE'
    | 'OUTGOING_PAYMENT.PENDING'
    | 'OUTGOING_PAYMENT.PROCESSING'
    | 'OUTGOING_PAYMENT.COMPLETED'
    | 'OUTGOING_PAYMENT.FAILED'
    | 'OUTGOING_PAYMENT.EXPIRED'
    | 'OUTGOING_PAYMENT.REFUND_PENDING'
    | 'OUTGOING_PAYMENT.REFUND_COMPLETED'
    | 'OUTGOING_PAYMENT.REFUND_FAILED'
    | 'INCOMING_PAYMENT.PENDING'
    | 'INCOMING_PAYMENT.COMPLETED'
    | 'INCOMING_PAYMENT.FAILED'
    | 'CUSTOMER.KYC_APPROVED'
    | 'CUSTOMER.KYC_REJECTED'
    | 'CUSTOMER.KYC_PENDING'
    | 'CUSTOMER.KYB_APPROVED'
    | 'CUSTOMER.KYB_REJECTED'
    | 'CUSTOMER.KYB_PENDING'
    | 'VERIFICATION.APPROVED'
    | 'VERIFICATION.REJECTED'
    | 'VERIFICATION.RESOLVE_ERRORS'
    | 'VERIFICATION.IN_PROGRESS'
    | 'VERIFICATION.PENDING_MANUAL_REVIEW'
    | 'VERIFICATION.READY_FOR_VERIFICATION'
    | 'INTERNAL_ACCOUNT.BALANCE_UPDATED'
    | 'INTERNAL_ACCOUNT.STATUS_UPDATED'
    | 'INVITATION.CLAIMED'
    | 'BULK_UPLOAD.COMPLETED'
    | 'BULK_UPLOAD.FAILED'
    | 'AGENT_ACTION.PENDING_APPROVAL'
    | 'CARD.FUNDING_SOURCE_CHANGE'
    | 'TEST';
}

export namespace CardStateChangeWebhookEvent {
  export interface Data {
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
     * Reason a card reached a terminal or non-active state. Present on `CLOSED` cards,
     * and on cards that fail provisioning before reaching `ACTIVE`.
     *
     * | Reason               | Description                                                                    |
     * | -------------------- | ------------------------------------------------------------------------------ |
     * | `ISSUER_REJECTED`    | The card issuer rejected provisioning during `PENDING_ISSUE`.                  |
     * | `CLOSED_BY_PLATFORM` | The card was closed via `PATCH /cards/{id}` (`state: CLOSED`) by the platform. |
     * | `CLOSED_BY_GRID`     | The card was closed by Grid (e.g. compliance or risk action).                  |
     */
    stateReason?: 'ISSUER_REJECTED' | 'CLOSED_BY_PLATFORM' | 'CLOSED_BY_GRID' | null;
  }
}

export interface CardFundingSourceChangeWebhookEvent {
  /**
   * Unique identifier for this webhook delivery (can be used for idempotency)
   */
  id: string;

  data: CardFundingSourceChangeWebhookEvent.Data;

  /**
   * ISO 8601 timestamp of when the webhook was sent
   */
  timestamp: string;

  type:
    | 'CARD.FUNDING_SOURCE_CHANGE'
    | 'OUTGOING_PAYMENT.PENDING'
    | 'OUTGOING_PAYMENT.PROCESSING'
    | 'OUTGOING_PAYMENT.COMPLETED'
    | 'OUTGOING_PAYMENT.FAILED'
    | 'OUTGOING_PAYMENT.EXPIRED'
    | 'OUTGOING_PAYMENT.REFUND_PENDING'
    | 'OUTGOING_PAYMENT.REFUND_COMPLETED'
    | 'OUTGOING_PAYMENT.REFUND_FAILED'
    | 'INCOMING_PAYMENT.PENDING'
    | 'INCOMING_PAYMENT.COMPLETED'
    | 'INCOMING_PAYMENT.FAILED'
    | 'CUSTOMER.KYC_APPROVED'
    | 'CUSTOMER.KYC_REJECTED'
    | 'CUSTOMER.KYC_PENDING'
    | 'CUSTOMER.KYB_APPROVED'
    | 'CUSTOMER.KYB_REJECTED'
    | 'CUSTOMER.KYB_PENDING'
    | 'VERIFICATION.APPROVED'
    | 'VERIFICATION.REJECTED'
    | 'VERIFICATION.RESOLVE_ERRORS'
    | 'VERIFICATION.IN_PROGRESS'
    | 'VERIFICATION.PENDING_MANUAL_REVIEW'
    | 'VERIFICATION.READY_FOR_VERIFICATION'
    | 'INTERNAL_ACCOUNT.BALANCE_UPDATED'
    | 'INTERNAL_ACCOUNT.STATUS_UPDATED'
    | 'INVITATION.CLAIMED'
    | 'BULK_UPLOAD.COMPLETED'
    | 'BULK_UPLOAD.FAILED'
    | 'AGENT_ACTION.PENDING_APPROVAL'
    | 'CARD.STATE_CHANGE'
    | 'TEST';
}

export namespace CardFundingSourceChangeWebhookEvent {
  export interface Data {
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
     * Reason a card reached a terminal or non-active state. Present on `CLOSED` cards,
     * and on cards that fail provisioning before reaching `ACTIVE`.
     *
     * | Reason               | Description                                                                    |
     * | -------------------- | ------------------------------------------------------------------------------ |
     * | `ISSUER_REJECTED`    | The card issuer rejected provisioning during `PENDING_ISSUE`.                  |
     * | `CLOSED_BY_PLATFORM` | The card was closed via `PATCH /cards/{id}` (`state: CLOSED`) by the platform. |
     * | `CLOSED_BY_GRID`     | The card was closed by Grid (e.g. compliance or risk action).                  |
     */
    stateReason?: 'ISSUER_REJECTED' | 'CLOSED_BY_PLATFORM' | 'CLOSED_BY_GRID' | null;
  }
}

export type UnwrapWebhookEvent =
  | AgentActionWebhookEvent
  | IncomingPaymentWebhookEvent
  | OutgoingPaymentWebhookEvent
  | TestWebhookWebhookEvent
  | BulkUploadWebhookEvent
  | InvitationClaimedWebhookEvent
  | CustomerUpdateWebhookEvent
  | InternalAccountStatusWebhookEvent
  | VerificationUpdateWebhookEvent
  | CardStateChangeWebhookEvent
  | CardFundingSourceChangeWebhookEvent;

export declare namespace Webhooks {
  export {
    type AgentActionWebhookEvent as AgentActionWebhookEvent,
    type IncomingPaymentWebhookEvent as IncomingPaymentWebhookEvent,
    type OutgoingPaymentWebhookEvent as OutgoingPaymentWebhookEvent,
    type TestWebhookWebhookEvent as TestWebhookWebhookEvent,
    type BulkUploadWebhookEvent as BulkUploadWebhookEvent,
    type InvitationClaimedWebhookEvent as InvitationClaimedWebhookEvent,
    type CustomerUpdateWebhookEvent as CustomerUpdateWebhookEvent,
    type InternalAccountStatusWebhookEvent as InternalAccountStatusWebhookEvent,
    type VerificationUpdateWebhookEvent as VerificationUpdateWebhookEvent,
    type CardStateChangeWebhookEvent as CardStateChangeWebhookEvent,
    type CardFundingSourceChangeWebhookEvent as CardFundingSourceChangeWebhookEvent,
    type UnwrapWebhookEvent as UnwrapWebhookEvent,
  };
}
