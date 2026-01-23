// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { type Uploadable } from '../../core/uploads';
import { RequestOptions } from '../../internal/request-options';
import { multipartFormRequestOptions } from '../../internal/uploads';
import { path } from '../../internal/utils/path';

export class Bulk extends APIResource {
  /**
   * Retrieve the current status and results of a bulk customer import job. This
   * endpoint can be used to track the progress of both CSV uploads.
   *
   * The response includes:
   *
   * - Overall job status
   * - Progress statistics
   * - Detailed error information for failed entries
   * - Completion timestamp when finished
   *
   * @example
   * ```ts
   * const response = await client.customers.bulk.getJobStatus(
   *   'jobId',
   * );
   * ```
   */
  getJobStatus(jobID: string, options?: RequestOptions): APIPromise<BulkGetJobStatusResponse> {
    return this._client.get(path`/customers/bulk/jobs/${jobID}`, options);
  }

  /**
   * Upload a CSV file containing customer information for bulk creation. The CSV
   * file should follow a specific format with required and optional columns based on
   * customer type.
   *
   * ### CSV Format
   *
   * The CSV file should have the following columns:
   *
   * Required columns for all customers:
   *
   * - umaAddress: The customer's UMA address (e.g., $john.doe@uma.domain.com)
   * - platformCustomerId: Your platform's unique identifier for the customer
   * - customerType: Either "INDIVIDUAL" or "BUSINESS"
   *
   * Required columns for individual customers:
   *
   * - fullName: Individual's full name
   * - birthDate: Date of birth in YYYY-MM-DD format
   * - addressLine1: Street address line 1
   * - city: City
   * - state: State/Province/Region
   * - postalCode: Postal/ZIP code
   * - country: Country code (ISO 3166-1 alpha-2)
   *
   * Required columns for business customers:
   *
   * - businessLegalName: Legal name of the business
   * - addressLine1: Street address line 1
   * - city: City
   * - state: State/Province/Region
   * - postalCode: Postal/ZIP code
   * - country: Country code (ISO 3166-1 alpha-2)
   *
   * Optional columns for all customers:
   *
   * - addressLine2: Street address line 2
   * - platformAccountId: Your platform's identifier for the bank account
   * - description: Optional description for the customer
   *
   * Optional columns for individual customers:
   *
   * - email: Customer's email address
   *
   * Optional columns for business customers:
   *
   * - businessRegistrationNumber: Business registration number
   * - businessTaxId: Tax identification number
   *
   * ### Example CSV
   *
   * ```csv
   * umaAddress,platformCustomerId,customerType,fullName,birthDate,addressLine1,city,state,postalCode,country,platformAccountId,businessLegalName
   * john.doe@uma.domain.com,customer123,INDIVIDUAL,John Doe,1990-01-15,123 Main St,San Francisco,CA,94105,US
   * acme@uma.domain.com,biz456,BUSINESS,,,400 Commerce Way,Austin,TX,78701,US
   * ```
   *
   * The upload process is asynchronous and will return a job ID that can be used to
   * track progress. You can monitor the job status using the
   * `/customers/bulk/jobs/{jobId}` endpoint.
   *
   * @example
   * ```ts
   * const response = await client.customers.bulk.uploadCsv({
   *   file: fs.createReadStream('path/to/file'),
   * });
   * ```
   */
  uploadCsv(body: BulkUploadCsvParams, options?: RequestOptions): APIPromise<BulkUploadCsvResponse> {
    return this._client.post(
      '/customers/bulk/csv',
      multipartFormRequestOptions({ body, ...options }, this._client),
    );
  }
}

export interface BulkGetJobStatusResponse {
  /**
   * Unique identifier for the bulk import job
   */
  jobId: string;

  progress: BulkGetJobStatusResponse.Progress;

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
  errors?: Array<BulkGetJobStatusResponse.Error>;
}

export namespace BulkGetJobStatusResponse {
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
    details?: unknown;

    /**
     * Error message
     */
    message?: string;
  }
}

export interface BulkUploadCsvResponse {
  /**
   * Unique identifier for the bulk import job
   */
  jobId: string;

  status: 'PENDING' | 'PROCESSING';
}

export interface BulkUploadCsvParams {
  /**
   * CSV file containing customer information
   */
  file: Uploadable;
}

export declare namespace Bulk {
  export {
    type BulkGetJobStatusResponse as BulkGetJobStatusResponse,
    type BulkUploadCsvResponse as BulkUploadCsvResponse,
    type BulkUploadCsvParams as BulkUploadCsvParams,
  };
}
