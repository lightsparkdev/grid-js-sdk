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
import * as InternalAccountsAPI from './sandbox/internal-accounts';
import * as SandboxWebhooksAPI from './sandbox/webhooks';

export class Webhooks extends APIResource {
  unwrap(body: string): UnwrapWebhookEvent {
    return JSON.parse(body) as UnwrapWebhookEvent;
  }
}

export interface AgentActionWebhook extends BaseWebhook {
  /**
   * An action submitted by an agent that may require platform approval before
   * execution. All agent-initiated operations (quote execution, transfers) are
   * represented as AgentActions, giving the platform a consistent object to approve,
   * reject, and audit regardless of the underlying operation type.
   */
  data: AgentsAPI.AgentAction;

  type: 'AGENT_ACTION.PENDING_APPROVAL';
}

export interface BaseWebhook {
  /**
   * Unique identifier for this webhook delivery (can be used for idempotency)
   */
  id: string;

  /**
   * ISO 8601 timestamp of when the webhook was sent
   */
  timestamp: string;

  type: unknown;
}

export interface BulkUploadWebhook extends BaseWebhook {
  data: BulkUploadWebhook.Data;

  type: 'BULK_UPLOAD.COMPLETED' | 'BULK_UPLOAD.FAILED';
}

export namespace BulkUploadWebhook {
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

export interface CardFundingSourceChangeWebhook extends BaseWebhook {
  data: CardsAPI.Card;

  type: 'CARD.FUNDING_SOURCE_CHANGE';
}

export interface CardStateChangeWebhook extends BaseWebhook {
  data: CardsAPI.Card;

  type: 'CARD.STATE_CHANGE';
}

export interface CustomerWebhook extends BaseWebhook {
  data: CustomersAPI.CustomerOneOf;

  type:
    | 'CUSTOMER.KYC_APPROVED'
    | 'CUSTOMER.KYC_REJECTED'
    | 'CUSTOMER.KYC_PENDING'
    | 'CUSTOMER.KYB_APPROVED'
    | 'CUSTOMER.KYB_REJECTED'
    | 'CUSTOMER.KYB_PENDING';
}

export interface IncomingPaymentWebhook extends BaseWebhook {
  data: IncomingPaymentWebhook.Data;

  type: 'INCOMING_PAYMENT.PENDING' | 'INCOMING_PAYMENT.COMPLETED' | 'INCOMING_PAYMENT.FAILED';
}

export namespace IncomingPaymentWebhook {
  export interface Data extends TransactionsAPI.IncomingTransaction {
    /**
     * Information required by the sender's VASP about the recipient. Platform must
     * provide these in the 200 OK response if approving. Note that this only includes
     * fields which Grid does not already have from initial customer registration.
     */
    requestedReceiverCustomerInfoFields?: Array<ReceiverAPI.CounterpartyFieldDefinition>;
  }
}

export interface InternalAccountStatusWebhook extends BaseWebhook {
  data: InternalAccountsAPI.InternalAccount;

  type: 'INTERNAL_ACCOUNT.BALANCE_UPDATED' | 'INTERNAL_ACCOUNT.STATUS_UPDATED';
}

export interface InvitationClaimedWebhook extends BaseWebhook {
  data: InvitationsAPI.UmaInvitation;

  type: 'INVITATION.CLAIMED';
}

export interface OutgoingPaymentWebhook extends BaseWebhook {
  data: TransactionsAPI.OutgoingTransaction;

  type:
    | 'OUTGOING_PAYMENT.PENDING'
    | 'OUTGOING_PAYMENT.PROCESSING'
    | 'OUTGOING_PAYMENT.COMPLETED'
    | 'OUTGOING_PAYMENT.FAILED'
    | 'OUTGOING_PAYMENT.EXPIRED'
    | 'OUTGOING_PAYMENT.REFUND_PENDING'
    | 'OUTGOING_PAYMENT.REFUND_COMPLETED'
    | 'OUTGOING_PAYMENT.REFUND_FAILED';
}

export interface VerificationWebhook extends BaseWebhook {
  data: VerificationsAPI.Verification;

  type:
    | 'VERIFICATION.APPROVED'
    | 'VERIFICATION.REJECTED'
    | 'VERIFICATION.RESOLVE_ERRORS'
    | 'VERIFICATION.IN_PROGRESS'
    | 'VERIFICATION.PENDING_MANUAL_REVIEW';
}

/**
 * Type of webhook event in OBJECT.EVENT dot-notation. The part before the dot
 * identifies the resource, the part after identifies the event. This lets
 * consumers route purely on type without inspecting data.status.
 */
export type WebhookType =
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

export type UnwrapWebhookEvent =
  | AgentActionWebhook
  | IncomingPaymentWebhook
  | OutgoingPaymentWebhook
  | SandboxWebhooksAPI.TestWebhookRequest
  | BulkUploadWebhook
  | InvitationClaimedWebhook
  | CustomerWebhook
  | InternalAccountStatusWebhook
  | VerificationWebhook
  | CardStateChangeWebhook
  | CardFundingSourceChangeWebhook;

export declare namespace Webhooks {
  export {
    type AgentActionWebhook as AgentActionWebhook,
    type BaseWebhook as BaseWebhook,
    type BulkUploadWebhook as BulkUploadWebhook,
    type CardFundingSourceChangeWebhook as CardFundingSourceChangeWebhook,
    type CardStateChangeWebhook as CardStateChangeWebhook,
    type CustomerWebhook as CustomerWebhook,
    type IncomingPaymentWebhook as IncomingPaymentWebhook,
    type InternalAccountStatusWebhook as InternalAccountStatusWebhook,
    type InvitationClaimedWebhook as InvitationClaimedWebhook,
    type OutgoingPaymentWebhook as OutgoingPaymentWebhook,
    type VerificationWebhook as VerificationWebhook,
    type WebhookType as WebhookType,
    type UnwrapWebhookEvent as UnwrapWebhookEvent,
  };
}
