// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as InvitationsAPI from './invitations';
import * as QuotesAPI from './quotes';
import * as ReceiverAPI from './receiver';
import * as TransactionsAPI from './transactions';
import * as TransferInAPI from './transfer-in';

export class Webhooks extends APIResource {
  unwrap(body: string): UnwrapWebhookEvent {
    return JSON.parse(body) as UnwrapWebhookEvent;
  }
}

export interface IncomingPaymentWebhookEvent {
  /**
   * ISO8601 timestamp when the webhook was sent (can be used to prevent replay
   * attacks)
   */
  timestamp: string;

  transaction: TransactionsAPI.IncomingTransaction;

  /**
   * Type of webhook event
   */
  type:
    | 'INCOMING_PAYMENT'
    | 'OUTGOING_PAYMENT'
    | 'TEST'
    | 'BULK_UPLOAD'
    | 'INVITATION_CLAIMED'
    | 'KYC_STATUS'
    | 'ACCOUNT_STATUS';

  /**
   * Unique identifier for this webhook delivery (can be used for idempotency)
   */
  webhookId: string;

  /**
   * Information required by the sender's VASP about the recipient. Platform must
   * provide these in the 200 OK response if approving. Note that this only includes
   * fields which Grid does not already have from initial customer registration.
   */
  requestedReceiverCustomerInfoFields?: Array<ReceiverAPI.CounterpartyFieldDefinition>;
}

export interface OutgoingPaymentWebhookEvent {
  /**
   * ISO8601 timestamp when the webhook was sent (can be used to prevent replay
   * attacks)
   */
  timestamp: string;

  transaction: OutgoingPaymentWebhookEvent.Transaction;

  /**
   * Type of webhook event
   */
  type:
    | 'INCOMING_PAYMENT'
    | 'OUTGOING_PAYMENT'
    | 'TEST'
    | 'BULK_UPLOAD'
    | 'INVITATION_CLAIMED'
    | 'KYC_STATUS'
    | 'ACCOUNT_STATUS';

  /**
   * Unique identifier for this webhook delivery (can be used for idempotency)
   */
  webhookId: string;
}

export namespace OutgoingPaymentWebhookEvent {
  export interface Transaction extends Omit<TransferInAPI.Transaction, 'type'> {
    /**
     * Amount sent in the sender's currency
     */
    sentAmount: InvitationsAPI.CurrencyAmount;

    /**
     * Source account details
     */
    source: TransactionsAPI.TransactionSourceOneOf;

    type: 'OUTGOING';

    /**
     * Number of sending currency units per receiving currency unit.
     */
    exchangeRate?: number;

    /**
     * If the transaction failed, this field provides the reason for failure.
     */
    failureReason?:
      | 'QUOTE_EXPIRED'
      | 'QUOTE_EXECUTION_FAILED'
      | 'LIGHTNING_PAYMENT_FAILED'
      | 'FUNDING_AMOUNT_MISMATCH'
      | 'COUNTERPARTY_POST_TX_FAILED'
      | 'TIMEOUT';

    /**
     * The fees associated with the quote in the smallest unit of the sending currency
     * (eg. cents).
     */
    fees?: number;

    /**
     * Payment instructions for executing the payment.
     */
    paymentInstructions?: Array<QuotesAPI.PaymentInstructions>;

    /**
     * The ID of the quote that was used to trigger this payment
     */
    quoteId?: string;

    /**
     * Details about the rate and fees for the transaction.
     */
    rateDetails?: QuotesAPI.OutgoingRateDetails;

    /**
     * Amount to be received by recipient in the recipient's currency
     */
    receivedAmount?: InvitationsAPI.CurrencyAmount;

    /**
     * The refund if transaction was refunded.
     */
    refund?: Transaction.Refund;
  }

  export namespace Transaction {
    /**
     * The refund if transaction was refunded.
     */
    export interface Refund {
      /**
       * When the refund was initiated
       */
      initiatedAt: string;

      /**
       * The unique reference code of the refund
       */
      reference: string;

      /**
       * When the refund was or will be settled
       */
      settledAt?: string;
    }
  }
}

export interface TestWebhookWebhookEvent {
  /**
   * ISO8601 timestamp when the webhook was sent (can be used to prevent replay
   * attacks)
   */
  timestamp: string;

  /**
   * Type of webhook event
   */
  type:
    | 'INCOMING_PAYMENT'
    | 'OUTGOING_PAYMENT'
    | 'TEST'
    | 'BULK_UPLOAD'
    | 'INVITATION_CLAIMED'
    | 'KYC_STATUS'
    | 'ACCOUNT_STATUS';

  /**
   * Unique identifier for this webhook delivery (can be used for idempotency)
   */
  webhookId: string;
}

export interface BulkUploadWebhookEvent {
  bulkCustomerImportJob: BulkUploadWebhookEvent.BulkCustomerImportJob;

  /**
   * ISO8601 timestamp when the webhook was sent (can be used to prevent replay
   * attacks)
   */
  timestamp: string;

  /**
   * Type of webhook event
   */
  type:
    | 'INCOMING_PAYMENT'
    | 'OUTGOING_PAYMENT'
    | 'TEST'
    | 'BULK_UPLOAD'
    | 'INVITATION_CLAIMED'
    | 'KYC_STATUS'
    | 'ACCOUNT_STATUS';

  /**
   * Unique identifier for this webhook delivery (can be used for idempotency)
   */
  webhookId: string;
}

export namespace BulkUploadWebhookEvent {
  export interface BulkCustomerImportJob {
    /**
     * Unique identifier for the bulk import job
     */
    jobId: string;

    progress: BulkCustomerImportJob.Progress;

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
    errors?: Array<BulkCustomerImportJob.Error>;
  }

  export namespace BulkCustomerImportJob {
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

    export interface Error {
      /**
       * Platform customer ID or row number for the failed entry
       */
      correlationId: string;

      /**
       * Error code
       */
      code?: string;

      /**
       * Additional error details
       */
      details?: { [key: string]: unknown };

      /**
       * Error message
       */
      message?: string;
    }
  }
}

export interface InvitationClaimedWebhookEvent {
  invitation: InvitationsAPI.UmaInvitation;

  /**
   * ISO8601 timestamp when the webhook was sent (can be used to prevent replay
   * attacks)
   */
  timestamp: string;

  /**
   * Type of webhook event
   */
  type:
    | 'INVITATION_CLAIMED'
    | 'INCOMING_PAYMENT'
    | 'OUTGOING_PAYMENT'
    | 'TEST'
    | 'BULK_UPLOAD'
    | 'KYC_STATUS'
    | 'ACCOUNT_STATUS';

  /**
   * Unique identifier for this webhook delivery (can be used for idempotency)
   */
  webhookId: string;
}

export interface KYCStatusWebhookEvent {
  /**
   * System generated id of the customer
   */
  customerId: string;

  /**
   * The current KYC status of a customer
   */
  kycStatus:
    | 'APPROVED'
    | 'REJECTED'
    | 'PENDING_REVIEW'
    | 'EXPIRED'
    | 'CANCELED'
    | 'MANUALLY_APPROVED'
    | 'MANUALLY_REJECTED';

  /**
   * ISO8601 timestamp when the webhook was sent (can be used to prevent replay
   * attacks)
   */
  timestamp: string;

  /**
   * Type of webhook event
   */
  type:
    | 'INCOMING_PAYMENT'
    | 'OUTGOING_PAYMENT'
    | 'TEST'
    | 'BULK_UPLOAD'
    | 'INVITATION_CLAIMED'
    | 'KYC_STATUS'
    | 'ACCOUNT_STATUS';

  /**
   * Unique identifier for this webhook delivery (can be used for idempotency)
   */
  webhookId: string;
}

export interface AccountStatusWebhookEvent {
  /**
   * The id of the account whose balance has changed
   */
  accountId: string;

  /**
   * ISO8601 timestamp when the webhook was sent (can be used to prevent replay
   * attacks)
   */
  timestamp: string;

  /**
   * Type of webhook event
   */
  type:
    | 'INCOMING_PAYMENT'
    | 'OUTGOING_PAYMENT'
    | 'TEST'
    | 'BULK_UPLOAD'
    | 'INVITATION_CLAIMED'
    | 'KYC_STATUS'
    | 'ACCOUNT_STATUS';

  /**
   * Unique identifier for this webhook delivery (can be used for idempotency)
   */
  webhookId: string;

  /**
   * The ID of the customer associated with the internal account
   */
  customerId?: string;

  newBalance?: InvitationsAPI.CurrencyAmount;

  oldBalance?: InvitationsAPI.CurrencyAmount;

  /**
   * The ID of the customer as associated in your platform
   */
  platformCustomerId?: string;
}

export type UnwrapWebhookEvent =
  | IncomingPaymentWebhookEvent
  | OutgoingPaymentWebhookEvent
  | TestWebhookWebhookEvent
  | BulkUploadWebhookEvent
  | InvitationClaimedWebhookEvent
  | KYCStatusWebhookEvent
  | AccountStatusWebhookEvent;

export declare namespace Webhooks {
  export {
    type IncomingPaymentWebhookEvent as IncomingPaymentWebhookEvent,
    type OutgoingPaymentWebhookEvent as OutgoingPaymentWebhookEvent,
    type TestWebhookWebhookEvent as TestWebhookWebhookEvent,
    type BulkUploadWebhookEvent as BulkUploadWebhookEvent,
    type InvitationClaimedWebhookEvent as InvitationClaimedWebhookEvent,
    type KYCStatusWebhookEvent as KYCStatusWebhookEvent,
    type AccountStatusWebhookEvent as AccountStatusWebhookEvent,
    type UnwrapWebhookEvent as UnwrapWebhookEvent,
  };
}
