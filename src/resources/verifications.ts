// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as Shared from './shared';
import { APIPromise } from '../core/api-promise';
import { DefaultPagination, type DefaultPaginationParams, PagePromise } from '../core/pagination';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

/**
 * Endpoints for Know Your Customer (KYC) and Know Your Business (KYB) verification, including managing beneficial owners and triggering verification for customers.
 */
export class Verifications extends APIResource {
  /**
   * Retrieve details of a specific verification by ID.
   *
   * @example
   * ```ts
   * const verification = await client.verifications.retrieve(
   *   'verificationId',
   * );
   * ```
   */
  retrieve(verificationID: string, options?: RequestOptions): APIPromise<Verification> {
    return this._client.get(path`/verifications/${verificationID}`, {
      ...options,
      __security: { basicAuth: true },
    });
  }

  /**
   * Retrieve a list of verifications with optional filtering by customer ID and
   * status.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const verification of client.verifications.list()) {
   *   // ...
   * }
   * ```
   */
  list(
    query: VerificationListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<VerificationsDefaultPagination, Verification> {
    return this._client.getAPIList('/verifications', DefaultPagination<Verification>, {
      query,
      ...options,
      __security: { basicAuth: true },
    });
  }

  /**
   * Trigger KYC (individual) or KYB (business) verification for a customer. The
   * response indicates whether all required information has been provided. If data
   * is missing, the `errors` array describes exactly what needs to be supplied
   * before verification can proceed.
   *
   * Call this endpoint again after resolving errors to re-submit.
   *
   * @example
   * ```ts
   * const verification = await client.verifications.submit({
   *   customerId:
   *     'Customer:019542f5-b3e7-1d02-0000-000000000001',
   * });
   * ```
   */
  submit(body: VerificationSubmitParams, options?: RequestOptions): APIPromise<Verification> {
    return this._client.post('/verifications', { body, ...options, __security: { basicAuth: true } });
  }
}

export type VerificationsDefaultPagination = DefaultPagination<Verification>;

export interface Verification {
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
  verificationStatus: VerificationStatus;

  /**
   * When this verification was last updated
   */
  updatedAt?: string;
}

/**
 * Type of verification error. The category-specific MISSING*\*\_DOCUMENT types
 * indicate which document category is needed. Document quality types
 * (POOR_QUALITY_DOCUMENT, SUSPECTED_FRAUD_DOCUMENT, etc.) indicate specific issues
 * with uploaded documents. APPLICANT*\* types indicate issues with the applicant
 * themselves (sanctions, fraud, criminal records).
 */
export type VerificationErrorType =
  | 'MISSING_FIELD'
  | 'INVALID_FIELD'
  | 'MISSING_LEGAL_PRESENCE_DOCUMENT'
  | 'MISSING_CONTROL_STRUCTURE_DOCUMENT'
  | 'MISSING_OWNERSHIP_STRUCTURE_DOCUMENT'
  | 'MISSING_PROOF_OF_ADDRESS_DOCUMENT'
  | 'MISSING_IDENTITY_DOCUMENT'
  | 'INVALID_DOCUMENT'
  | 'EXPIRED_DOCUMENT'
  | 'POOR_QUALITY_DOCUMENT'
  | 'SUSPECTED_FRAUD_DOCUMENT'
  | 'WRONG_DOCUMENT_TYPE'
  | 'INCOMPLETE_DOCUMENT'
  | 'UNREADABLE_DOCUMENT'
  | 'DOCUMENT_VERIFICATION_FAILED'
  | 'APPLICANT_SANCTIONED'
  | 'APPLICANT_FRAUD'
  | 'APPLICANT_CRIMINAL_RECORD'
  | 'APPLICANT_REJECTED'
  | 'MISSING_BENEFICIAL_OWNER';

export interface VerificationListResponse {
  /**
   * List of verifications matching the filter criteria
   */
  data: Array<Verification>;

  /**
   * Indicates if more results are available beyond this page
   */
  hasMore: boolean;

  /**
   * Cursor to retrieve the next page of results (only present if hasMore is true)
   */
  nextCursor?: string;

  /**
   * Total number of results matching the criteria
   */
  totalCount?: number;
}

export interface VerificationRequest {
  /**
   * The ID of the customer to verify
   */
  customerId: string;
}

/**
 * Current status of the KYC/KYB verification
 */
export type VerificationStatus =
  | 'RESOLVE_ERRORS'
  | 'PENDING_MANUAL_REVIEW'
  | 'IN_PROGRESS'
  | 'APPROVED'
  | 'REJECTED'
  | 'READY_FOR_VERIFICATION';

export interface VerificationListParams extends DefaultPaginationParams {
  /**
   * Filter by customer ID
   */
  customerId?: string;

  /**
   * Maximum number of results to return (default 20, max 100)
   */
  limit?: number;

  /**
   * Current status of the KYC/KYB verification
   */
  verificationStatus?: VerificationStatus;
}

export interface VerificationSubmitParams {
  /**
   * The ID of the customer to verify
   */
  customerId: string;
}

export declare namespace Verifications {
  export {
    type Verification as Verification,
    type VerificationErrorType as VerificationErrorType,
    type VerificationListResponse as VerificationListResponse,
    type VerificationRequest as VerificationRequest,
    type VerificationStatus as VerificationStatus,
    type VerificationsDefaultPagination as VerificationsDefaultPagination,
    type VerificationListParams as VerificationListParams,
    type VerificationSubmitParams as VerificationSubmitParams,
  };
}
