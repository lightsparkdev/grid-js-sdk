// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
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
  retrieve(verificationID: string, options?: RequestOptions): APIPromise<VerificationRetrieveResponse> {
    return this._client.get(path`/verifications/${verificationID}`, options);
  }

  /**
   * Retrieve a list of verifications with optional filtering by customer ID and
   * status.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const verificationListResponse of client.verifications.list()) {
   *   // ...
   * }
   * ```
   */
  list(
    query: VerificationListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<VerificationListResponsesDefaultPagination, VerificationListResponse> {
    return this._client.getAPIList('/verifications', DefaultPagination<VerificationListResponse>, {
      query,
      ...options,
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
   * const response = await client.verifications.submit({
   *   customerId:
   *     'Customer:019542f5-b3e7-1d02-0000-000000000001',
   * });
   * ```
   */
  submit(body: VerificationSubmitParams, options?: RequestOptions): APIPromise<VerificationSubmitResponse> {
    return this._client.post('/verifications', { body, ...options });
  }
}

export type VerificationListResponsesDefaultPagination = DefaultPagination<VerificationListResponse>;

export interface VerificationRetrieveResponse {
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
  errors: Array<VerificationRetrieveResponse.Error>;

  /**
   * Current status of the KYC/KYB verification
   */
  verificationStatus: 'RESOLVE_ERRORS' | 'PENDING_MANUAL_REVIEW' | 'IN_PROGRESS' | 'APPROVED' | 'REJECTED';

  /**
   * When this verification was last updated
   */
  updatedAt?: string;
}

export namespace VerificationRetrieveResponse {
  export interface Error {
    /**
     * Human-readable description of the issue
     */
    reason: string;

    /**
     * ID of the resource with the issue (Customer, BeneficialOwner, or Document)
     */
    resourceId: string;

    /**
     * Type of verification error. The category-specific MISSING\_\*\_DOCUMENT types
     * indicate which document category is needed and determine the accepted document
     * types returned in acceptedDocumentTypes.
     */
    type:
      | 'MISSING_FIELD'
      | 'INVALID_FIELD'
      | 'MISSING_LEGAL_PRESENCE_DOCUMENT'
      | 'MISSING_COMPANY_DETAILS_DOCUMENT'
      | 'MISSING_CONTROL_STRUCTURE_DOCUMENT'
      | 'MISSING_OWNERSHIP_STRUCTURE_DOCUMENT'
      | 'MISSING_PROOF_OF_ADDRESS_DOCUMENT'
      | 'MISSING_IDENTITY_DOCUMENT'
      | 'INVALID_DOCUMENT'
      | 'EXPIRED_DOCUMENT'
      | 'MISSING_BENEFICIAL_OWNER';

    /**
     * Document types that would satisfy this requirement. The integrator can upload
     * any one of the listed types. Present when type is
     * MISSING_LEGAL_PRESENCE_DOCUMENT, MISSING_COMPANY_DETAILS_DOCUMENT,
     * MISSING_CONTROL_STRUCTURE_DOCUMENT, MISSING_OWNERSHIP_STRUCTURE_DOCUMENT,
     * MISSING_PROOF_OF_ADDRESS_DOCUMENT, MISSING_IDENTITY_DOCUMENT, INVALID_DOCUMENT,
     * or EXPIRED_DOCUMENT.
     *
     * | Error Type                           | Accepted Document Types                                                                                                                                                            |
     * | ------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
     * | MISSING_LEGAL_PRESENCE_DOCUMENT      | CERTIFICATE_OF_INCORPORATION, ARTICLES_OF_INCORPORATION, ARTICLES_OF_ASSOCIATION, STATE_REGISTRY_EXCERPT                                                                           |
     * | MISSING_COMPANY_DETAILS_DOCUMENT     | INFORMATION_STATEMENT, STATE_REGISTRY_EXCERPT, ARTICLES_OF_INCORPORATION, ARTICLES_OF_ASSOCIATION, CERTIFICATE_OF_INCORPORATION, INCUMBENCY_CERTIFICATE, GOOD_STANDING_CERTIFICATE |
     * | MISSING_CONTROL_STRUCTURE_DOCUMENT   | ARTICLES_OF_INCORPORATION, ARTICLES_OF_ASSOCIATION, INCUMBENCY_CERTIFICATE, INFORMATION_STATEMENT, STATE_REGISTRY_EXCERPT                                                          |
     * | MISSING_OWNERSHIP_STRUCTURE_DOCUMENT | SHAREHOLDER_REGISTER, INFORMATION_STATEMENT, INCUMBENCY_CERTIFICATE, STATE_REGISTRY_EXCERPT, ARTICLES_OF_INCORPORATION, ARTICLES_OF_ASSOCIATION                                    |
     * | MISSING_PROOF_OF_ADDRESS_DOCUMENT    | PROOF_OF_ADDRESS                                                                                                                                                                   |
     * | MISSING_IDENTITY_DOCUMENT            | PASSPORT, DRIVERS_LICENSE, NATIONAL_ID                                                                                                                                             |
     */
    acceptedDocumentTypes?: Array<
      | 'PASSPORT'
      | 'DRIVERS_LICENSE'
      | 'NATIONAL_ID'
      | 'PROOF_OF_ADDRESS'
      | 'BANK_STATEMENT'
      | 'TAX_RETURN'
      | 'CERTIFICATE_OF_INCORPORATION'
      | 'ARTICLES_OF_INCORPORATION'
      | 'ARTICLES_OF_ASSOCIATION'
      | 'STATE_REGISTRY_EXCERPT'
      | 'GOOD_STANDING_CERTIFICATE'
      | 'INFORMATION_STATEMENT'
      | 'INCUMBENCY_CERTIFICATE'
      | 'BUSINESS_LICENSE'
      | 'SHAREHOLDER_REGISTER'
      | 'POWER_OF_ATTORNEY'
      | 'UTILITY_BILL'
      | 'SELFIE'
      | 'OTHER'
    >;

    /**
     * Dot-notation path to the field with the issue. Present when type is
     * MISSING_FIELD or INVALID_FIELD.
     */
    field?: string;
  }
}

export interface VerificationListResponse {
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
  errors: Array<VerificationListResponse.Error>;

  /**
   * Current status of the KYC/KYB verification
   */
  verificationStatus: 'RESOLVE_ERRORS' | 'PENDING_MANUAL_REVIEW' | 'IN_PROGRESS' | 'APPROVED' | 'REJECTED';

  /**
   * When this verification was last updated
   */
  updatedAt?: string;
}

export namespace VerificationListResponse {
  export interface Error {
    /**
     * Human-readable description of the issue
     */
    reason: string;

    /**
     * ID of the resource with the issue (Customer, BeneficialOwner, or Document)
     */
    resourceId: string;

    /**
     * Type of verification error. The category-specific MISSING\_\*\_DOCUMENT types
     * indicate which document category is needed and determine the accepted document
     * types returned in acceptedDocumentTypes.
     */
    type:
      | 'MISSING_FIELD'
      | 'INVALID_FIELD'
      | 'MISSING_LEGAL_PRESENCE_DOCUMENT'
      | 'MISSING_COMPANY_DETAILS_DOCUMENT'
      | 'MISSING_CONTROL_STRUCTURE_DOCUMENT'
      | 'MISSING_OWNERSHIP_STRUCTURE_DOCUMENT'
      | 'MISSING_PROOF_OF_ADDRESS_DOCUMENT'
      | 'MISSING_IDENTITY_DOCUMENT'
      | 'INVALID_DOCUMENT'
      | 'EXPIRED_DOCUMENT'
      | 'MISSING_BENEFICIAL_OWNER';

    /**
     * Document types that would satisfy this requirement. The integrator can upload
     * any one of the listed types. Present when type is
     * MISSING_LEGAL_PRESENCE_DOCUMENT, MISSING_COMPANY_DETAILS_DOCUMENT,
     * MISSING_CONTROL_STRUCTURE_DOCUMENT, MISSING_OWNERSHIP_STRUCTURE_DOCUMENT,
     * MISSING_PROOF_OF_ADDRESS_DOCUMENT, MISSING_IDENTITY_DOCUMENT, INVALID_DOCUMENT,
     * or EXPIRED_DOCUMENT.
     *
     * | Error Type                           | Accepted Document Types                                                                                                                                                            |
     * | ------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
     * | MISSING_LEGAL_PRESENCE_DOCUMENT      | CERTIFICATE_OF_INCORPORATION, ARTICLES_OF_INCORPORATION, ARTICLES_OF_ASSOCIATION, STATE_REGISTRY_EXCERPT                                                                           |
     * | MISSING_COMPANY_DETAILS_DOCUMENT     | INFORMATION_STATEMENT, STATE_REGISTRY_EXCERPT, ARTICLES_OF_INCORPORATION, ARTICLES_OF_ASSOCIATION, CERTIFICATE_OF_INCORPORATION, INCUMBENCY_CERTIFICATE, GOOD_STANDING_CERTIFICATE |
     * | MISSING_CONTROL_STRUCTURE_DOCUMENT   | ARTICLES_OF_INCORPORATION, ARTICLES_OF_ASSOCIATION, INCUMBENCY_CERTIFICATE, INFORMATION_STATEMENT, STATE_REGISTRY_EXCERPT                                                          |
     * | MISSING_OWNERSHIP_STRUCTURE_DOCUMENT | SHAREHOLDER_REGISTER, INFORMATION_STATEMENT, INCUMBENCY_CERTIFICATE, STATE_REGISTRY_EXCERPT, ARTICLES_OF_INCORPORATION, ARTICLES_OF_ASSOCIATION                                    |
     * | MISSING_PROOF_OF_ADDRESS_DOCUMENT    | PROOF_OF_ADDRESS                                                                                                                                                                   |
     * | MISSING_IDENTITY_DOCUMENT            | PASSPORT, DRIVERS_LICENSE, NATIONAL_ID                                                                                                                                             |
     */
    acceptedDocumentTypes?: Array<
      | 'PASSPORT'
      | 'DRIVERS_LICENSE'
      | 'NATIONAL_ID'
      | 'PROOF_OF_ADDRESS'
      | 'BANK_STATEMENT'
      | 'TAX_RETURN'
      | 'CERTIFICATE_OF_INCORPORATION'
      | 'ARTICLES_OF_INCORPORATION'
      | 'ARTICLES_OF_ASSOCIATION'
      | 'STATE_REGISTRY_EXCERPT'
      | 'GOOD_STANDING_CERTIFICATE'
      | 'INFORMATION_STATEMENT'
      | 'INCUMBENCY_CERTIFICATE'
      | 'BUSINESS_LICENSE'
      | 'SHAREHOLDER_REGISTER'
      | 'POWER_OF_ATTORNEY'
      | 'UTILITY_BILL'
      | 'SELFIE'
      | 'OTHER'
    >;

    /**
     * Dot-notation path to the field with the issue. Present when type is
     * MISSING_FIELD or INVALID_FIELD.
     */
    field?: string;
  }
}

export interface VerificationSubmitResponse {
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
  errors: Array<VerificationSubmitResponse.Error>;

  /**
   * Current status of the KYC/KYB verification
   */
  verificationStatus: 'RESOLVE_ERRORS' | 'PENDING_MANUAL_REVIEW' | 'IN_PROGRESS' | 'APPROVED' | 'REJECTED';

  /**
   * When this verification was last updated
   */
  updatedAt?: string;
}

export namespace VerificationSubmitResponse {
  export interface Error {
    /**
     * Human-readable description of the issue
     */
    reason: string;

    /**
     * ID of the resource with the issue (Customer, BeneficialOwner, or Document)
     */
    resourceId: string;

    /**
     * Type of verification error. The category-specific MISSING\_\*\_DOCUMENT types
     * indicate which document category is needed and determine the accepted document
     * types returned in acceptedDocumentTypes.
     */
    type:
      | 'MISSING_FIELD'
      | 'INVALID_FIELD'
      | 'MISSING_LEGAL_PRESENCE_DOCUMENT'
      | 'MISSING_COMPANY_DETAILS_DOCUMENT'
      | 'MISSING_CONTROL_STRUCTURE_DOCUMENT'
      | 'MISSING_OWNERSHIP_STRUCTURE_DOCUMENT'
      | 'MISSING_PROOF_OF_ADDRESS_DOCUMENT'
      | 'MISSING_IDENTITY_DOCUMENT'
      | 'INVALID_DOCUMENT'
      | 'EXPIRED_DOCUMENT'
      | 'MISSING_BENEFICIAL_OWNER';

    /**
     * Document types that would satisfy this requirement. The integrator can upload
     * any one of the listed types. Present when type is
     * MISSING_LEGAL_PRESENCE_DOCUMENT, MISSING_COMPANY_DETAILS_DOCUMENT,
     * MISSING_CONTROL_STRUCTURE_DOCUMENT, MISSING_OWNERSHIP_STRUCTURE_DOCUMENT,
     * MISSING_PROOF_OF_ADDRESS_DOCUMENT, MISSING_IDENTITY_DOCUMENT, INVALID_DOCUMENT,
     * or EXPIRED_DOCUMENT.
     *
     * | Error Type                           | Accepted Document Types                                                                                                                                                            |
     * | ------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
     * | MISSING_LEGAL_PRESENCE_DOCUMENT      | CERTIFICATE_OF_INCORPORATION, ARTICLES_OF_INCORPORATION, ARTICLES_OF_ASSOCIATION, STATE_REGISTRY_EXCERPT                                                                           |
     * | MISSING_COMPANY_DETAILS_DOCUMENT     | INFORMATION_STATEMENT, STATE_REGISTRY_EXCERPT, ARTICLES_OF_INCORPORATION, ARTICLES_OF_ASSOCIATION, CERTIFICATE_OF_INCORPORATION, INCUMBENCY_CERTIFICATE, GOOD_STANDING_CERTIFICATE |
     * | MISSING_CONTROL_STRUCTURE_DOCUMENT   | ARTICLES_OF_INCORPORATION, ARTICLES_OF_ASSOCIATION, INCUMBENCY_CERTIFICATE, INFORMATION_STATEMENT, STATE_REGISTRY_EXCERPT                                                          |
     * | MISSING_OWNERSHIP_STRUCTURE_DOCUMENT | SHAREHOLDER_REGISTER, INFORMATION_STATEMENT, INCUMBENCY_CERTIFICATE, STATE_REGISTRY_EXCERPT, ARTICLES_OF_INCORPORATION, ARTICLES_OF_ASSOCIATION                                    |
     * | MISSING_PROOF_OF_ADDRESS_DOCUMENT    | PROOF_OF_ADDRESS                                                                                                                                                                   |
     * | MISSING_IDENTITY_DOCUMENT            | PASSPORT, DRIVERS_LICENSE, NATIONAL_ID                                                                                                                                             |
     */
    acceptedDocumentTypes?: Array<
      | 'PASSPORT'
      | 'DRIVERS_LICENSE'
      | 'NATIONAL_ID'
      | 'PROOF_OF_ADDRESS'
      | 'BANK_STATEMENT'
      | 'TAX_RETURN'
      | 'CERTIFICATE_OF_INCORPORATION'
      | 'ARTICLES_OF_INCORPORATION'
      | 'ARTICLES_OF_ASSOCIATION'
      | 'STATE_REGISTRY_EXCERPT'
      | 'GOOD_STANDING_CERTIFICATE'
      | 'INFORMATION_STATEMENT'
      | 'INCUMBENCY_CERTIFICATE'
      | 'BUSINESS_LICENSE'
      | 'SHAREHOLDER_REGISTER'
      | 'POWER_OF_ATTORNEY'
      | 'UTILITY_BILL'
      | 'SELFIE'
      | 'OTHER'
    >;

    /**
     * Dot-notation path to the field with the issue. Present when type is
     * MISSING_FIELD or INVALID_FIELD.
     */
    field?: string;
  }
}

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
   * Filter by verification status
   */
  verificationStatus?: 'RESOLVE_ERRORS' | 'PENDING_MANUAL_REVIEW' | 'IN_PROGRESS' | 'APPROVED' | 'REJECTED';
}

export interface VerificationSubmitParams {
  /**
   * The ID of the customer to verify
   */
  customerId: string;
}

export declare namespace Verifications {
  export {
    type VerificationRetrieveResponse as VerificationRetrieveResponse,
    type VerificationListResponse as VerificationListResponse,
    type VerificationSubmitResponse as VerificationSubmitResponse,
    type VerificationListResponsesDefaultPagination as VerificationListResponsesDefaultPagination,
    type VerificationListParams as VerificationListParams,
    type VerificationSubmitParams as VerificationSubmitParams,
  };
}
