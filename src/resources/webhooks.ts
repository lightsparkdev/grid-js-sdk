// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as InvitationsAPI from './invitations';
import * as ReceiverAPI from './receiver';
import * as Shared from './shared';
import * as TransactionsAPI from './transactions';
import * as CustomersAPI from './customers/customers';
import * as InternalAccountsAPI from './sandbox/internal-accounts';
import * as SandboxAPI from './sandbox/sandbox';

export class Webhooks extends APIResource {
  unwrap(body: string): UnwrapWebhookEvent {
    return JSON.parse(body) as UnwrapWebhookEvent;
  }
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
    | 'CUSTOMER.KYC_SUBMITTED'
    | 'CUSTOMER.KYC_MANUALLY_APPROVED'
    | 'CUSTOMER.KYC_MANUALLY_REJECTED'
    | 'CUSTOMER.KYB_APPROVED'
    | 'CUSTOMER.KYB_REJECTED'
    | 'CUSTOMER.KYB_SUBMITTED'
    | 'CUSTOMER.KYB_MANUALLY_APPROVED'
    | 'CUSTOMER.KYB_MANUALLY_REJECTED'
    | 'INTERNAL_ACCOUNT.BALANCE_UPDATED'
    | 'INVITATION.CLAIMED'
    | 'BULK_UPLOAD.COMPLETED'
    | 'BULK_UPLOAD.FAILED'
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

  data: SandboxAPI.OutgoingTransaction;

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
    | 'CUSTOMER.KYC_SUBMITTED'
    | 'CUSTOMER.KYC_MANUALLY_APPROVED'
    | 'CUSTOMER.KYC_MANUALLY_REJECTED'
    | 'CUSTOMER.KYB_APPROVED'
    | 'CUSTOMER.KYB_REJECTED'
    | 'CUSTOMER.KYB_SUBMITTED'
    | 'CUSTOMER.KYB_MANUALLY_APPROVED'
    | 'CUSTOMER.KYB_MANUALLY_REJECTED'
    | 'INTERNAL_ACCOUNT.BALANCE_UPDATED'
    | 'INVITATION.CLAIMED'
    | 'BULK_UPLOAD.COMPLETED'
    | 'BULK_UPLOAD.FAILED'
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
    | 'CUSTOMER.KYC_SUBMITTED'
    | 'CUSTOMER.KYC_MANUALLY_APPROVED'
    | 'CUSTOMER.KYC_MANUALLY_REJECTED'
    | 'CUSTOMER.KYB_APPROVED'
    | 'CUSTOMER.KYB_REJECTED'
    | 'CUSTOMER.KYB_SUBMITTED'
    | 'CUSTOMER.KYB_MANUALLY_APPROVED'
    | 'CUSTOMER.KYB_MANUALLY_REJECTED'
    | 'INTERNAL_ACCOUNT.BALANCE_UPDATED'
    | 'INVITATION.CLAIMED'
    | 'BULK_UPLOAD.COMPLETED'
    | 'BULK_UPLOAD.FAILED';
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
    | 'CUSTOMER.KYC_SUBMITTED'
    | 'CUSTOMER.KYC_MANUALLY_APPROVED'
    | 'CUSTOMER.KYC_MANUALLY_REJECTED'
    | 'CUSTOMER.KYB_APPROVED'
    | 'CUSTOMER.KYB_REJECTED'
    | 'CUSTOMER.KYB_SUBMITTED'
    | 'CUSTOMER.KYB_MANUALLY_APPROVED'
    | 'CUSTOMER.KYB_MANUALLY_REJECTED'
    | 'INTERNAL_ACCOUNT.BALANCE_UPDATED'
    | 'INVITATION.CLAIMED'
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
    | 'CUSTOMER.KYC_SUBMITTED'
    | 'CUSTOMER.KYC_MANUALLY_APPROVED'
    | 'CUSTOMER.KYC_MANUALLY_REJECTED'
    | 'CUSTOMER.KYB_APPROVED'
    | 'CUSTOMER.KYB_REJECTED'
    | 'CUSTOMER.KYB_SUBMITTED'
    | 'CUSTOMER.KYB_MANUALLY_APPROVED'
    | 'CUSTOMER.KYB_MANUALLY_REJECTED'
    | 'INTERNAL_ACCOUNT.BALANCE_UPDATED'
    | 'BULK_UPLOAD.COMPLETED'
    | 'BULK_UPLOAD.FAILED'
    | 'TEST';
}

export interface KYCStatusWebhookEvent {
  /**
   * Unique identifier for this webhook delivery (can be used for idempotency)
   */
  id: string;

  data: KYCStatusWebhookEvent.Data;

  /**
   * ISO 8601 timestamp of when the webhook was sent
   */
  timestamp: string;

  type:
    | 'CUSTOMER.KYC_APPROVED'
    | 'CUSTOMER.KYC_REJECTED'
    | 'CUSTOMER.KYC_SUBMITTED'
    | 'CUSTOMER.KYC_MANUALLY_APPROVED'
    | 'CUSTOMER.KYC_MANUALLY_REJECTED'
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
    | 'CUSTOMER.KYB_APPROVED'
    | 'CUSTOMER.KYB_REJECTED'
    | 'CUSTOMER.KYB_SUBMITTED'
    | 'CUSTOMER.KYB_MANUALLY_APPROVED'
    | 'CUSTOMER.KYB_MANUALLY_REJECTED'
    | 'INTERNAL_ACCOUNT.BALANCE_UPDATED'
    | 'INVITATION.CLAIMED'
    | 'BULK_UPLOAD.COMPLETED'
    | 'BULK_UPLOAD.FAILED'
    | 'TEST';
}

export namespace KYCStatusWebhookEvent {
  export interface Data extends CustomersAPI.Customer, CustomersAPI.IndividualCustomerFields {}
}

export interface KYBStatusWebhookEvent {
  /**
   * Unique identifier for this webhook delivery (can be used for idempotency)
   */
  id: string;

  data: KYBStatusWebhookEvent.Data;

  /**
   * ISO 8601 timestamp of when the webhook was sent
   */
  timestamp: string;

  type:
    | 'CUSTOMER.KYB_APPROVED'
    | 'CUSTOMER.KYB_REJECTED'
    | 'CUSTOMER.KYB_SUBMITTED'
    | 'CUSTOMER.KYB_MANUALLY_APPROVED'
    | 'CUSTOMER.KYB_MANUALLY_REJECTED'
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
    | 'CUSTOMER.KYC_SUBMITTED'
    | 'CUSTOMER.KYC_MANUALLY_APPROVED'
    | 'CUSTOMER.KYC_MANUALLY_REJECTED'
    | 'INTERNAL_ACCOUNT.BALANCE_UPDATED'
    | 'INVITATION.CLAIMED'
    | 'BULK_UPLOAD.COMPLETED'
    | 'BULK_UPLOAD.FAILED'
    | 'TEST';
}

export namespace KYBStatusWebhookEvent {
  export interface Data
    extends CustomersAPI.Customer,
      Omit<CustomersAPI.BusinessCustomerFields, 'businessInfo'> {
    /**
     * Additional information required for business entities
     */
    businessInfo?: CustomersAPI.BusinessInfo;
  }
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
    | 'CUSTOMER.KYC_SUBMITTED'
    | 'CUSTOMER.KYC_MANUALLY_APPROVED'
    | 'CUSTOMER.KYC_MANUALLY_REJECTED'
    | 'CUSTOMER.KYB_APPROVED'
    | 'CUSTOMER.KYB_REJECTED'
    | 'CUSTOMER.KYB_SUBMITTED'
    | 'CUSTOMER.KYB_MANUALLY_APPROVED'
    | 'CUSTOMER.KYB_MANUALLY_REJECTED'
    | 'INVITATION.CLAIMED'
    | 'BULK_UPLOAD.COMPLETED'
    | 'BULK_UPLOAD.FAILED'
    | 'TEST';
}

export type UnwrapWebhookEvent =
  | IncomingPaymentWebhookEvent
  | OutgoingPaymentWebhookEvent
  | TestWebhookWebhookEvent
  | BulkUploadWebhookEvent
  | InvitationClaimedWebhookEvent
  | KYCStatusWebhookEvent
  | KYBStatusWebhookEvent
  | InternalAccountStatusWebhookEvent;

export declare namespace Webhooks {
  export {
    type IncomingPaymentWebhookEvent as IncomingPaymentWebhookEvent,
    type OutgoingPaymentWebhookEvent as OutgoingPaymentWebhookEvent,
    type TestWebhookWebhookEvent as TestWebhookWebhookEvent,
    type BulkUploadWebhookEvent as BulkUploadWebhookEvent,
    type InvitationClaimedWebhookEvent as InvitationClaimedWebhookEvent,
    type KYCStatusWebhookEvent as KYCStatusWebhookEvent,
    type KYBStatusWebhookEvent as KYBStatusWebhookEvent,
    type InternalAccountStatusWebhookEvent as InternalAccountStatusWebhookEvent,
    type UnwrapWebhookEvent as UnwrapWebhookEvent,
  };
}
