// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as InvitationsAPI from './invitations';
import * as QuotesAPI from './quotes';
import * as ReceiverAPI from './receiver';
import * as Shared from './shared';
import * as TransactionsAPI from './transactions';
import * as TransferInAPI from './transfer-in';
import * as CustomersAPI from './customers/customers';
import * as ExternalAccountsAPI from './customers/external-accounts';
import * as InternalAccountsAPI from './sandbox/internal-accounts';

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
     * The current KYC status of a customer
     */
    kycStatus?:
      | 'APPROVED'
      | 'REJECTED'
      | 'PENDING_REVIEW'
      | 'EXPIRED'
      | 'CANCELED'
      | 'MANUALLY_APPROVED'
      | 'MANUALLY_REJECTED';

    /**
     * Country code (ISO 3166-1 alpha-2)
     */
    nationality?: string;
  }
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
  export interface Data extends CustomersAPI.Customer {
    customerType: 'BUSINESS';

    address?: ExternalAccountsAPI.Address;

    beneficialOwners?: Array<Data.BeneficialOwner>;

    businessInfo?: Data.BusinessInfo;

    /**
     * The current KYB status of a business customer
     */
    kybStatus?:
      | 'AWAITING_SUBMISSION'
      | 'APPROVED'
      | 'REJECTED'
      | 'PENDING_REVIEW'
      | 'EXPIRED'
      | 'CANCELED'
      | 'MANUALLY_APPROVED'
      | 'MANUALLY_REJECTED';
  }

  export namespace Data {
    export interface BeneficialOwner {
      /**
       * Individual's full name
       */
      fullName: string;

      /**
       * Type of individual in the corporation
       */
      individualType:
        | 'DIRECTOR'
        | 'CONTROL_PERSON'
        | 'BUSINESS_POINT_OF_CONTACT'
        | 'TRUSTEE'
        | 'SETTLOR'
        | 'GENERAL_PARTNER';

      address?: ExternalAccountsAPI.Address;

      /**
       * Date of birth in ISO 8601 format (YYYY-MM-DD)
       */
      birthDate?: string;

      /**
       * Email address of the individual
       */
      emailAddress?: string;

      /**
       * Country code (ISO 3166-1 alpha-2)
       */
      nationality?: string;

      /**
       * Percent of ownership when individual type is beneficial owner
       */
      percentageOwnership?: number;

      /**
       * Phone number of the individual in E.164 format
       */
      phoneNumber?: string;

      /**
       * Tax identification number of the individual. This could be a Social Security
       * Number (SSN) for US individuals, Tax Identification Number (TIN) for non-US
       * individuals, or a Passport Number.
       */
      taxId?: string;

      /**
       * Title at company
       */
      title?: string;
    }

    export interface BusinessInfo {
      /**
       * Legal name of the business
       */
      legalName: string;

      /**
       * Business registration number
       */
      registrationNumber?: string;

      /**
       * Tax identification number
       */
      taxId?: string;
    }
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
