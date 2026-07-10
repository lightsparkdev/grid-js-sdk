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
   * ### What to collect for KYB
   *
   * Before submitting a `BUSINESS` customer, collect the following via
   * `POST /customers`, `POST /beneficial-owners`, and `POST /documents`:
   *
   * **Business identifying information**
   *
   * - Entity full legal name
   * - Doing Business As (DBA) name, if applicable
   * - Physical address — principal place of business
   * - Countries of operation
   * - Identification number — U.S. taxpayer identification number, or, for a foreign
   *   business without one, alternative government-issued documentation certifying
   *   the existence of the business
   *
   * **Ownership and control structure** — collected for **one control person** (an
   * individual with significant responsibility to control, manage, or direct the
   * legal entity) **and all beneficial owners** (every individual who owns 25% or
   * more, directly or indirectly). For each, provide:
   *
   * - Full name
   * - Date of birth
   * - Address
   * - Identification number:
   *   - U.S. persons — SSN or ITIN
   *   - Non-U.S. persons — one or more of: ITIN, passport (with country of
   *     issuance), alien identification card, or another government-issued photo ID
   *     evidencing nationality or residence
   *
   * **Required documents**
   *
   * - Company formation and existence documents (certificate of incorporation,
   *   articles of association, etc.)
   * - Proof of ownership and control structure (organization and ownership chart,
   *   shareholder agreements, operating agreements, register of members, or
   *   certification of controlling person and beneficial owners)
   * - Proof of address dated within the last 3 months (utility bill, bank statement,
   *   lease agreement, or official correspondence)
   * - Tax ID or equivalent identifying-number documents
   * - For non-U.S. beneficial owners — passport plus one additional
   *   government-issued ID
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
    type Verification as Verification,
    type VerificationListResponse as VerificationListResponse,
    type VerificationRequest as VerificationRequest,
    type VerificationsDefaultPagination as VerificationsDefaultPagination,
    type VerificationListParams as VerificationListParams,
    type VerificationSubmitParams as VerificationSubmitParams,
  };
}
