// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

export interface BulkCustomerImportErrorEntry {
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
