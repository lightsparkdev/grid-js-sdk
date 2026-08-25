// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as CardsAPI from './cards';
import * as InvitationsAPI from './invitations';
import * as ReceiverAPI from './receiver';
import * as Shared from './shared';
import * as TransactionsAPI from './transactions';
import * as VerificationsAPI from './verifications';
import * as AgentsAPI from './agents/agents';
import * as CustomersAPI from './customers/customers';
import * as ExternalAccountsAPI from './customers/external-accounts';
import * as InternalAccountsAPI from './sandbox/internal-accounts';
import * as SandboxWebhooksAPI from './sandbox/webhooks';

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

  type: 'AGENT_ACTION.PENDING_APPROVAL';
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
    | 'INCOMING_PAYMENT.PROCESSING'
    | 'INCOMING_PAYMENT.COMPLETED'
    | 'INCOMING_PAYMENT.FAILED'
    | 'INCOMING_PAYMENT.REFUND_PENDING'
    | 'INCOMING_PAYMENT.REFUND_COMPLETED'
    | 'INCOMING_PAYMENT.REFUND_FAILED';
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
    | 'OUTGOING_PAYMENT.PENDING_AUTHORIZATION'
    | 'OUTGOING_PAYMENT.PROCESSING'
    | 'OUTGOING_PAYMENT.COMPLETED'
    | 'OUTGOING_PAYMENT.FAILED'
    | 'OUTGOING_PAYMENT.EXPIRED'
    | 'OUTGOING_PAYMENT.REFUND_PENDING'
    | 'OUTGOING_PAYMENT.REFUND_COMPLETED'
    | 'OUTGOING_PAYMENT.REFUND_FAILED';
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

  type: 'BULK_UPLOAD.COMPLETED' | 'BULK_UPLOAD.FAILED';
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

  type: 'INVITATION.CLAIMED';
}

export interface CustomerUpdateWebhookEvent {
  /**
   * Unique identifier for this webhook delivery (can be used for idempotency)
   */
  id: string;

  /**
   * Enhanced-due-diligence (EDD) fields available as optional patchable attributes
   * on an individual customer. Referenced via `allOf` from
   * `IndividualCustomerFields`, so these appear as top-level optional fields on the
   * customer resource itself; there is no separate EDD resource. The specific set
   * required for a given customer is driven by the KYC provider's per-jurisdiction /
   * per-flow / per-volume-tier rules (surfaced through `MISSING_FIELD` errors on
   * `POST /verifications`).
   */
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
    | 'CUSTOMER.KYB_PENDING';
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
    | 'INTERNAL_ACCOUNT.FUNDING_INSTRUCTIONS_UPDATED';
}

export interface ExternalAccountStatusWebhookEvent {
  /**
   * Unique identifier for this webhook delivery (can be used for idempotency)
   */
  id: string;

  data: ExternalAccountsAPI.ExternalAccount;

  /**
   * ISO 8601 timestamp of when the webhook was sent
   */
  timestamp: string;

  type: 'EXTERNAL_ACCOUNT.STATUS_UPDATED';
}

export interface VerificationUpdateWebhookEvent {
  /**
   * Unique identifier for this webhook delivery (can be used for idempotency)
   */
  id: string;

  data: VerificationsAPI.Verification;

  /**
   * ISO 8601 timestamp of when the webhook was sent
   */
  timestamp: string;

  type:
    | 'VERIFICATION.APPROVED'
    | 'VERIFICATION.REJECTED'
    | 'VERIFICATION.RESOLVE_ERRORS'
    | 'VERIFICATION.IN_PROGRESS'
    | 'VERIFICATION.PENDING_MANUAL_REVIEW';
}

export interface CardStateChangeWebhookEvent {
  /**
   * Unique identifier for this webhook delivery (can be used for idempotency)
   */
  id: string;

  data: CardsAPI.Card;

  /**
   * ISO 8601 timestamp of when the webhook was sent
   */
  timestamp: string;

  type: 'CARD.STATE_CHANGE';
}

export interface CardFundingSourceChangeWebhookEvent {
  /**
   * Unique identifier for this webhook delivery (can be used for idempotency)
   */
  id: string;

  data: CardsAPI.Card;

  /**
   * ISO 8601 timestamp of when the webhook was sent
   */
  timestamp: string;

  type: 'CARD.FUNDING_SOURCE_CHANGE';
}

export interface CardTransactionWebhookEvent {
  /**
   * Unique identifier for this webhook delivery (can be used for idempotency)
   */
  id: string;

  /**
   * Parent transaction row for a card authorization and all of the pulls /
   * settlements / refunds that reconcile against it. Child events are rolled up into
   * the `pullSummary`, `refundSummary`, and `settlementSummary` aggregates.
   * Delivered as the payload of the generic transaction webhook stream (extends the
   * Transaction model with a card destination type) on every transition.
   */
  data: CardsAPI.CardTransaction;

  /**
   * ISO 8601 timestamp of when the webhook was sent
   */
  timestamp: string;

  type:
    | 'CARD_TRANSACTION.AUTHORIZED'
    | 'CARD_TRANSACTION.PARTIALLY_SETTLED'
    | 'CARD_TRANSACTION.SETTLED'
    | 'CARD_TRANSACTION.REFUNDED'
    | 'CARD_TRANSACTION.EXCEPTION';
}

export interface WalletOperationWebhookEvent {
  /**
   * Unique identifier for this webhook delivery (can be used for idempotency)
   */
  id: string;

  data:
    | WalletOperationWebhookEvent.WalletOperationCompletedData
    | WalletOperationWebhookEvent.WalletOperationFailedData;

  /**
   * ISO 8601 timestamp of when the webhook was sent
   */
  timestamp: string;

  type: 'WALLET_OPERATION.COMPLETED' | 'WALLET_OPERATION.FAILED';
}

export namespace WalletOperationWebhookEvent {
  export interface WalletOperationCompletedData {
    /**
     * Grid-internal identifier for this operation. Useful when contacting support
     * about a specific operation; not a correlation key — use `requestId` to match
     * this webhook to the request you made.
     */
    operationId: string;

    /**
     * The kind of operation that reached a terminal state.
     */
    operationType: 'auth_credential.create' | 'auth_credential.delete' | 'session.revoke' | 'wallet.export';

    /**
     * The `Request-Id` you supplied on the signed retry that produced this terminal
     * result — the same value you would have echoed on every retry had you received a
     * `200 { status: "PROCESSING" }` response while it was settling. This is the
     * primary way to correlate this webhook to the request you made.
     */
    requestId: string;

    /**
     * LSID of the business resource this operation affected. For
     * `auth_credential.create`, this is the **primary way to learn the new
     * credential's id** — the request that created it can't have supplied one in
     * advance. For `auth_credential.delete` and `session.revoke` it echoes the
     * `AuthMethod:<uuid>` / `Session:<uuid>` you already knew and referenced in the
     * request; for `wallet.export` it's the `InternalAccount:<uuid>` whose wallet was
     * exported.
     */
    resourceId: string;

    /**
     * The kind of business resource `resourceId` identifies. Determined by
     * `operationType`: `auth_credential.create` and `auth_credential.delete` →
     * `AUTH_METHOD`, `session.revoke` → `SESSION`, `wallet.export` →
     * `INTERNAL_ACCOUNT`.
     */
    resourceType: 'AUTH_METHOD' | 'SESSION' | 'INTERNAL_ACCOUNT';

    /**
     * Terminal status of the operation.
     */
    status: 'completed';
  }

  export interface WalletOperationFailedData {
    /**
     * Failure details for a terminally failed operation.
     */
    error: WalletOperationFailedData.Error;

    /**
     * Grid-internal identifier for this operation. Useful when contacting support
     * about a specific operation; not a correlation key — use `requestId` to match
     * this webhook to the request you made.
     */
    operationId: string;

    /**
     * The kind of operation that reached a terminal state.
     */
    operationType: 'auth_credential.create' | 'auth_credential.delete' | 'session.revoke' | 'wallet.export';

    /**
     * The `Request-Id` you supplied on the signed retry that produced this terminal
     * result — the same value you would have echoed on every retry had you received a
     * `200 { status: "PROCESSING" }` response while it was settling. This is the
     * primary way to correlate this webhook to the request you made.
     */
    requestId: string;

    /**
     * LSID of the business resource this operation affected. For
     * `auth_credential.create`, this is the **primary way to learn the new
     * credential's id** — the request that created it can't have supplied one in
     * advance. For `auth_credential.delete` and `session.revoke` it echoes the
     * `AuthMethod:<uuid>` / `Session:<uuid>` you already knew and referenced in the
     * request; for `wallet.export` it's the `InternalAccount:<uuid>` whose wallet was
     * exported.
     */
    resourceId: string;

    /**
     * The kind of business resource `resourceId` identifies. Determined by
     * `operationType`: `auth_credential.create` and `auth_credential.delete` →
     * `AUTH_METHOD`, `session.revoke` → `SESSION`, `wallet.export` →
     * `INTERNAL_ACCOUNT`.
     */
    resourceType: 'AUTH_METHOD' | 'SESSION' | 'INTERNAL_ACCOUNT';

    /**
     * Terminal status of the operation.
     */
    status: 'failed';
  }

  export namespace WalletOperationFailedData {
    /**
     * Failure details for a terminally failed operation.
     */
    export interface Error {
      /**
       * Machine-readable failure code for a `FAILED` operation. Codes are Grid-defined
       * and stable regardless of which vendor Grid uses under the hood for a given
       * operation.
       */
      code: string;
    }
  }
}

export type UnwrapWebhookEvent =
  | AgentActionWebhookEvent
  | IncomingPaymentWebhookEvent
  | OutgoingPaymentWebhookEvent
  | SandboxWebhooksAPI.TestWebhookRequest
  | BulkUploadWebhookEvent
  | InvitationClaimedWebhookEvent
  | CustomerUpdateWebhookEvent
  | InternalAccountStatusWebhookEvent
  | ExternalAccountStatusWebhookEvent
  | VerificationUpdateWebhookEvent
  | CardStateChangeWebhookEvent
  | CardFundingSourceChangeWebhookEvent
  | CardTransactionWebhookEvent
  | WalletOperationWebhookEvent;

export declare namespace Webhooks {
  export {
    type AgentActionWebhookEvent as AgentActionWebhookEvent,
    type IncomingPaymentWebhookEvent as IncomingPaymentWebhookEvent,
    type OutgoingPaymentWebhookEvent as OutgoingPaymentWebhookEvent,
    type BulkUploadWebhookEvent as BulkUploadWebhookEvent,
    type InvitationClaimedWebhookEvent as InvitationClaimedWebhookEvent,
    type CustomerUpdateWebhookEvent as CustomerUpdateWebhookEvent,
    type InternalAccountStatusWebhookEvent as InternalAccountStatusWebhookEvent,
    type ExternalAccountStatusWebhookEvent as ExternalAccountStatusWebhookEvent,
    type VerificationUpdateWebhookEvent as VerificationUpdateWebhookEvent,
    type CardStateChangeWebhookEvent as CardStateChangeWebhookEvent,
    type CardFundingSourceChangeWebhookEvent as CardFundingSourceChangeWebhookEvent,
    type CardTransactionWebhookEvent as CardTransactionWebhookEvent,
    type WalletOperationWebhookEvent as WalletOperationWebhookEvent,
    type UnwrapWebhookEvent as UnwrapWebhookEvent,
  };
}
