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
  retrieve(verificationID: string, options?: RequestOptions): APIPromise<VerificationRetrieveResponse> {
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
   * const response = await client.verifications.submit({
   *   customerId:
   *     'Customer:019542f5-b3e7-1d02-0000-000000000001',
   * });
   * ```
   */
  submit(body: VerificationSubmitParams, options?: RequestOptions): APIPromise<VerificationSubmitResponse> {
    return this._client.post('/verifications', { body, ...options, __security: { basicAuth: true } });
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
  verificationStatus?:
    | 'RESOLVE_ERRORS'
    | 'PENDING_MANUAL_REVIEW'
    | 'IN_PROGRESS'
    | 'APPROVED'
    | 'REJECTED'
    | 'READY_FOR_VERIFICATION';
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
