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
    | 'AGENT_ACTION.PENDING_APPROVAL';
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

export type UnwrapWebhookEvent =
  | AgentActionWebhookEvent
  | IncomingPaymentWebhookEvent
  | OutgoingPaymentWebhookEvent
  | TestWebhookWebhookEvent
  | BulkUploadWebhookEvent
  | InvitationClaimedWebhookEvent
  | CustomerUpdateWebhookEvent
  | InternalAccountStatusWebhookEvent
  | VerificationUpdateWebhookEvent;

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
    type UnwrapWebhookEvent as UnwrapWebhookEvent,
  };
}
