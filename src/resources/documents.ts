// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { DefaultPagination, type DefaultPaginationParams, PagePromise } from '../core/pagination';
import { type Uploadable } from '../core/uploads';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';
import { multipartFormRequestOptions } from '../internal/uploads';
import { path } from '../internal/utils/path';

/**
 * Endpoints for uploading and managing verification documents for customers and beneficial owners. Supports KYC and KYB document requirements.
 */
export class Documents extends APIResource {
  /**
   * Retrieve details and metadata of a specific document by ID.
   *
   * @example
   * ```ts
   * const document = await client.documents.retrieve(
   *   'documentId',
   * );
   * ```
   */
  retrieve(documentID: string, options?: RequestOptions): APIPromise<DocumentRetrieveResponse> {
    return this._client.get(path`/documents/${documentID}`, options);
  }

  /**
   * Retrieve a list of documents with optional filtering by document holder.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const documentListResponse of client.documents.list()) {
   *   // ...
   * }
   * ```
   */
  list(
    query: DocumentListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<DocumentListResponsesDefaultPagination, DocumentListResponse> {
    return this._client.getAPIList('/documents', DefaultPagination<DocumentListResponse>, {
      query,
      ...options,
    });
  }

  /**
   * Delete an uploaded document. This cannot be undone. Documents that have already
   * been submitted for verification may not be deletable.
   *
   * @example
   * ```ts
   * await client.documents.delete('documentId');
   * ```
   */
  delete(documentID: string, options?: RequestOptions): APIPromise<void> {
    return this._client.delete(path`/documents/${documentID}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }

  /**
   * Replace an existing document with a new file and/or updated metadata. This is
   * useful when a document was rejected and needs to be re-uploaded. The request
   * must use multipart/form-data.
   *
   * @example
   * ```ts
   * const response = await client.documents.replace(
   *   'documentId',
   *   {
   *     country: 'US',
   *     documentType: 'PASSPORT',
   *     file: fs.createReadStream('path/to/file'),
   *   },
   * );
   * ```
   */
  replace(
    documentID: string,
    body: DocumentReplaceParams,
    options?: RequestOptions,
  ): APIPromise<DocumentReplaceResponse> {
    return this._client.put(
      path`/documents/${documentID}`,
      multipartFormRequestOptions({ body, ...options }, this._client),
    );
  }

  /**
   * Upload a verification document for a customer or beneficial owner. The request
   * must use multipart/form-data with the file in the `file` field and metadata in
   * the remaining fields.
   *
   * Supported file types: PDF, JPEG, PNG. Maximum file size: 10 MB.
   *
   * @example
   * ```ts
   * const response = await client.documents.upload({
   *   country: 'US',
   *   documentHolder:
   *     'BeneficialOwner:019542f5-b3e7-1d02-0000-000000000001',
   *   documentType: 'PASSPORT',
   *   file: fs.createReadStream('path/to/file'),
   * });
   * ```
   */
  upload(body: DocumentUploadParams, options?: RequestOptions): APIPromise<DocumentUploadResponse> {
    return this._client.post('/documents', multipartFormRequestOptions({ body, ...options }, this._client));
  }
}

export type DocumentListResponsesDefaultPagination = DefaultPagination<DocumentListResponse>;

export interface DocumentRetrieveResponse {
  /**
   * Unique identifier for this document
   */
  id: string;

  /**
   * Country that issued the document (ISO 3166-1 alpha-2)
   */
  country: string;

  /**
   * When this document was uploaded
   */
  createdAt: string;

  /**
   * ID of the entity that owns this document. Can be a Customer ID or a
   * BeneficialOwner ID.
   */
  documentHolder: string;

  /**
   * Type of identity or business verification document
   */
  documentType:
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
    | 'OTHER';

  /**
   * Original file name of the uploaded document
   */
  fileName: string;

  /**
   * Document identification number (e.g., passport number)
   */
  documentNumber?: string;

  /**
   * Which side of the document this upload represents. Relevant for two-sided
   * documents like driver's licenses or national IDs.
   */
  side?: 'FRONT' | 'BACK';

  /**
   * When this document was last updated
   */
  updatedAt?: string;
}

export interface DocumentListResponse {
  /**
   * Unique identifier for this document
   */
  id: string;

  /**
   * Country that issued the document (ISO 3166-1 alpha-2)
   */
  country: string;

  /**
   * When this document was uploaded
   */
  createdAt: string;

  /**
   * ID of the entity that owns this document. Can be a Customer ID or a
   * BeneficialOwner ID.
   */
  documentHolder: string;

  /**
   * Type of identity or business verification document
   */
  documentType:
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
    | 'OTHER';

  /**
   * Original file name of the uploaded document
   */
  fileName: string;

  /**
   * Document identification number (e.g., passport number)
   */
  documentNumber?: string;

  /**
   * Which side of the document this upload represents. Relevant for two-sided
   * documents like driver's licenses or national IDs.
   */
  side?: 'FRONT' | 'BACK';

  /**
   * When this document was last updated
   */
  updatedAt?: string;
}

export interface DocumentReplaceResponse {
  /**
   * Unique identifier for this document
   */
  id: string;

  /**
   * Country that issued the document (ISO 3166-1 alpha-2)
   */
  country: string;

  /**
   * When this document was uploaded
   */
  createdAt: string;

  /**
   * ID of the entity that owns this document. Can be a Customer ID or a
   * BeneficialOwner ID.
   */
  documentHolder: string;

  /**
   * Type of identity or business verification document
   */
  documentType:
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
    | 'OTHER';

  /**
   * Original file name of the uploaded document
   */
  fileName: string;

  /**
   * Document identification number (e.g., passport number)
   */
  documentNumber?: string;

  /**
   * Which side of the document this upload represents. Relevant for two-sided
   * documents like driver's licenses or national IDs.
   */
  side?: 'FRONT' | 'BACK';

  /**
   * When this document was last updated
   */
  updatedAt?: string;
}

export interface DocumentUploadResponse {
  /**
   * Unique identifier for this document
   */
  id: string;

  /**
   * Country that issued the document (ISO 3166-1 alpha-2)
   */
  country: string;

  /**
   * When this document was uploaded
   */
  createdAt: string;

  /**
   * ID of the entity that owns this document. Can be a Customer ID or a
   * BeneficialOwner ID.
   */
  documentHolder: string;

  /**
   * Type of identity or business verification document
   */
  documentType:
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
    | 'OTHER';

  /**
   * Original file name of the uploaded document
   */
  fileName: string;

  /**
   * Document identification number (e.g., passport number)
   */
  documentNumber?: string;

  /**
   * Which side of the document this upload represents. Relevant for two-sided
   * documents like driver's licenses or national IDs.
   */
  side?: 'FRONT' | 'BACK';

  /**
   * When this document was last updated
   */
  updatedAt?: string;
}

export interface DocumentListParams extends DefaultPaginationParams {
  /**
   * Filter by document holder ID (Customer or BeneficialOwner)
   */
  documentHolder?: string;

  /**
   * Maximum number of results to return (default 20, max 100)
   */
  limit?: number;
}

export interface DocumentReplaceParams {
  /**
   * Country that issued the document (ISO 3166-1 alpha-2)
   */
  country: string;

  /**
   * Type of identity or business verification document
   */
  documentType:
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
    | 'OTHER';

  /**
   * The document file (PDF, JPEG, or PNG, max 10 MB)
   */
  file: Uploadable;

  /**
   * Document identification number (e.g., passport number)
   */
  documentNumber?: string;

  /**
   * Which side of the document (for two-sided documents like driver's licenses)
   */
  side?: 'FRONT' | 'BACK';
}

export interface DocumentUploadParams {
  /**
   * Country that issued the document (ISO 3166-1 alpha-2)
   */
  country: string;

  /**
   * ID of the entity that owns this document. Can be a Customer ID or a
   * BeneficialOwner ID.
   */
  documentHolder: string;

  /**
   * Type of identity or business verification document
   */
  documentType:
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
    | 'OTHER';

  /**
   * The document file (PDF, JPEG, or PNG, max 10 MB)
   */
  file: Uploadable;

  /**
   * Document identification number (e.g., passport number)
   */
  documentNumber?: string;

  /**
   * Which side of the document (for two-sided documents like driver's licenses)
   */
  side?: 'FRONT' | 'BACK';
}

export declare namespace Documents {
  export {
    type DocumentRetrieveResponse as DocumentRetrieveResponse,
    type DocumentListResponse as DocumentListResponse,
    type DocumentReplaceResponse as DocumentReplaceResponse,
    type DocumentUploadResponse as DocumentUploadResponse,
    type DocumentListResponsesDefaultPagination as DocumentListResponsesDefaultPagination,
    type DocumentListParams as DocumentListParams,
    type DocumentReplaceParams as DocumentReplaceParams,
    type DocumentUploadParams as DocumentUploadParams,
  };
}
