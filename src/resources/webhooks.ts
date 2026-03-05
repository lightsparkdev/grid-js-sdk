// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as InvitationsAPI from './invitations';
import * as QuotesAPI from './quotes';
import * as ReceiverAPI from './receiver';
import * as TransactionsAPI from './transactions';
import * as TransferInAPI from './transfer-in';
import * as CustomersAPI from './customers/customers';
import * as ExternalAccountsAPI from './customers/external-accounts';

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

  data: OutgoingPaymentWebhookEvent.Data;

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
    | 'INTERNAL_ACCOUNT.BALANCE_UPDATED'
    | 'INVITATION.CLAIMED'
    | 'BULK_UPLOAD.COMPLETED'
    | 'BULK_UPLOAD.FAILED'
    | 'TEST';
}

export namespace OutgoingPaymentWebhookEvent {
  export interface Data extends Omit<TransferInAPI.Transaction, 'status' | 'type'> {
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
    refund?: Data.Refund;

    /**
     * Status of an outgoing payment transaction.
     *
     * | Status       | Description                                             |
     * | ------------ | ------------------------------------------------------- |
     * | `PENDING`    | Quote is pending confirmation                           |
     * | `EXPIRED`    | Quote wasn't executed before expiry window              |
     * | `PROCESSING` | Executing the quote after receiving funds               |
     * | `COMPLETED`  | Payout successfully reached the destination             |
     * | `FAILED`     | Something went wrong — accompanied by a `failureReason` |
     */
    status?: 'PENDING' | 'EXPIRED' | 'PROCESSING' | 'COMPLETED' | 'FAILED';
  }

  export namespace Data {
    /**
     * The refund if transaction was refunded.
     */
    export interface Refund {
      /**
       * When the refund was initiated
       */
      initiatedAt: string;

      /**
       * The unique reference ID of the refund
       */
      reference: string;

      /**
       * Current status of the refund
       */
      status: 'PENDING' | 'COMPLETED' | 'FAILED';

      /**
       * Reason for the refund
       */
      reason?: 'TRANSACTION_FAILED' | 'USER_CANCELLATION';

      /**
       * When the refund was settled
       */
      settledAt?: string;
    }
  }
}

export interface TestWebhookWebhookEvent {
  /**
   * Unique identifier for this webhook delivery (can be used for idempotency)
   */
  id: string;

  /**
   * The resource object. Contains the full resource as the corresponding GET
   * endpoint would return it.
   */
  data: unknown;

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
    errors?: Array<Data.Error>;
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
  /**
   * Unique identifier for this webhook delivery (can be used for idempotency)
   */
  id: string;

  data: InvitationClaimedWebhookEvent.Data;

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
    | 'INTERNAL_ACCOUNT.BALANCE_UPDATED'
    | 'BULK_UPLOAD.COMPLETED'
    | 'BULK_UPLOAD.FAILED'
    | 'TEST';
}

export namespace InvitationClaimedWebhookEvent {
  export interface Data {
    /**
     * The unique code of the invitation
     */
    code: string;

    /**
     * When the invitation was created
     */
    createdAt: string;

    /**
     * The UMA address of the inviter
     */
    inviterUma: string;

    /**
     * The status of the invitation
     */
    status: 'PENDING' | 'CLAIMED' | 'EXPIRED' | 'CANCELLED';

    /**
     * The URL where this invitation can be claimed.
     */
    url: string;

    /**
     * The amount to send to the invitee when the invitation is claimed. This is
     * optional and if not provided, the invitee will not receive any amount. Note that
     * the actual sending of the amount must be done by the inviter platform once the
     * INVITATION_CLAIMED webhook is received. If the inviter platform either does not
     * send the payment or the payment fails, the invitee will not receive this amount.
     * This field is primarily used for display purposes on the claiming side of the
     * invitation. This field is useful for "send-by-link" style customer flows where
     * an inviter can send a payment simply by sharing a link without knowing the
     * receiver's UMA address. Note that these sends can only be sender-locked, meaning
     * that the sender will not know ahead of time how much the receiver will receive
     * in the receiving currency.
     */
    amountToSend?: InvitationsAPI.CurrencyAmount;

    /**
     * When the invitation was claimed if it has been claimed
     */
    claimedAt?: string;

    /**
     * When the invitation expires (if at all)
     */
    expiresAt?: string;

    /**
     * The inviter's first name. Will be displayed when the recipient clicks the invite
     * link
     */
    firstName?: string;

    /**
     * The UMA address of the invitee
     */
    inviteeUma?: string;
  }
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
    | 'INTERNAL_ACCOUNT.BALANCE_UPDATED'
    | 'INVITATION.CLAIMED'
    | 'BULK_UPLOAD.COMPLETED'
    | 'BULK_UPLOAD.FAILED'
    | 'TEST';
}

export namespace KYCStatusWebhookEvent {
  export interface Data extends CustomersAPI.Customer {
    customerType: 'INDIVIDUAL';

    address?: ExternalAccountsAPI.Address;

    /**
     * Date of birth in ISO 8601 format (YYYY-MM-DD)
     */
    birthDate?: string;

    /**
     * Individual's full name
     */
    fullName?: string;

    /**
     * Country code (ISO 3166-1 alpha-2)
     */
    nationality?: string;
  }
}

export interface InternalAccountStatusWebhookEvent {
  /**
   * Unique identifier for this webhook delivery (can be used for idempotency)
   */
  id: string;

  data: InternalAccountStatusWebhookEvent.Data;

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
    | 'INVITATION.CLAIMED'
    | 'BULK_UPLOAD.COMPLETED'
    | 'BULK_UPLOAD.FAILED'
    | 'TEST';
}

export namespace InternalAccountStatusWebhookEvent {
  export interface Data {
    /**
     * The ID of the internal account
     */
    id: string;

    balance: InvitationsAPI.CurrencyAmount;

    /**
     * Timestamp when the internal account was created
     */
    createdAt: string;

    /**
     * Payment instructions for funding the account
     */
    fundingPaymentInstructions: Array<QuotesAPI.PaymentInstructions>;

    /**
     * Timestamp when the internal account was last updated
     */
    updatedAt: string;

    /**
     * The ID of the customer associated with the internal account. If this field is
     * empty, the internal account belongs to the platform.
     */
    customerId?: string;
  }
}

export type UnwrapWebhookEvent =
  | IncomingPaymentWebhookEvent
  | OutgoingPaymentWebhookEvent
  | TestWebhookWebhookEvent
  | BulkUploadWebhookEvent
  | InvitationClaimedWebhookEvent
  | KYCStatusWebhookEvent
  | InternalAccountStatusWebhookEvent;

export declare namespace Webhooks {
  export {
    type IncomingPaymentWebhookEvent as IncomingPaymentWebhookEvent,
    type OutgoingPaymentWebhookEvent as OutgoingPaymentWebhookEvent,
    type TestWebhookWebhookEvent as TestWebhookWebhookEvent,
    type BulkUploadWebhookEvent as BulkUploadWebhookEvent,
    type InvitationClaimedWebhookEvent as InvitationClaimedWebhookEvent,
    type KYCStatusWebhookEvent as KYCStatusWebhookEvent,
    type InternalAccountStatusWebhookEvent as InternalAccountStatusWebhookEvent,
    type UnwrapWebhookEvent as UnwrapWebhookEvent,
  };
}
