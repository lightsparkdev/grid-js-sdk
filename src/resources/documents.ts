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
   */
  retrieve(documentID: string, options?: RequestOptions): APIPromise<Document> {
    return this._client.get(path`/documents/${documentID}`, { ...options, __security: { basicAuth: true } });
  }

  /**
   * Retrieve a list of documents with optional filtering by document holder.
   */
  list(
    query: DocumentListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<DocumentsDefaultPagination, Document> {
    return this._client.getAPIList('/documents', DefaultPagination<Document>, {
      query,
      ...options,
      __security: { basicAuth: true },
    });
  }

  /**
   * Delete an uploaded document. This cannot be undone. Documents that have already
   * been submitted for verification may not be deletable.
   */
  delete(documentID: string, options?: RequestOptions): APIPromise<void> {
    return this._client.delete(path`/documents/${documentID}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
      __security: { basicAuth: true },
    });
  }

  /**
   * Replace an existing document with a new file and/or updated metadata. This is
   * useful when a document was rejected and needs to be re-uploaded. The request
   * must use multipart/form-data.
   */
  replace(documentID: string, params: DocumentReplaceParams, options?: RequestOptions): APIPromise<Document> {
    const { DocumentReplaceRequest } = params;
    return this._client.put(
      path`/documents/${documentID}`,
      multipartFormRequestOptions(
        { body: DocumentReplaceRequest, ...options, __security: { basicAuth: true } },
        this._client,
      ),
    );
  }

  /**
   * Upload a verification document for a customer or beneficial owner. The request
   * must use multipart/form-data with the file in the `file` field and metadata in
   * the remaining fields.
   *
   * Supported file types: PDF, JPEG, PNG. Maximum file size: 10 MB.
   */
  upload(params: DocumentUploadParams, options?: RequestOptions): APIPromise<Document> {
    const { DocumentUploadRequest } = params;
    return this._client.post(
      '/documents',
      multipartFormRequestOptions(
        { body: DocumentUploadRequest, ...options, __security: { basicAuth: true } },
        this._client,
      ),
    );
  }
}

export type DocumentsDefaultPagination = DefaultPagination<Document>;

export interface Document {
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
   * Type of identity or business verification document. Document types are grouped
   * by verification category: **Identity** — PASSPORT, DRIVERS_LICENSE, NATIONAL_ID
   * **Business — Legal presence** — CERTIFICATE_OF_INCORPORATION,
   * ARTICLES_OF_INCORPORATION, ARTICLES_OF_ASSOCIATION, STATE_REGISTRY_EXCERPT
   * **Business — Control structure** — DIRECTOR_REGISTRY, TRUST_AGREEMENT,
   * STATE_COMPANY_REGISTRY, PARTNERSHIP_CONTROL_AGREEMENT **Business — Ownership
   * structure** — SHAREHOLDER_REGISTER, TRUST_AGREEMENT, PARTNERSHIP_AGREEMENT
   * **Proof of address** — UTILITY_BILL, RENT_OR_LEASE_AGREEMENT, ELECTRICITY_BILL,
   * BANK_STATEMENT, TAX_RETURN
   */
  documentType: DocumentType;

  /**
   * Original file name of the uploaded document
   */
  fileName: string;

  /**
   * Document identification number (e.g., passport number)
   */
  documentNumber?: string;

  /**
   * Name of the government agency or organization that issued the document
   */
  issuingAuthority?: string;

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
   * List of documents matching the filter criteria
   */
  data: Array<Document>;

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

export interface DocumentReplaceRequest {
  /**
   * Country that issued the document (ISO 3166-1 alpha-2)
   */
  country: string;

  /**
   * Type of identity or business verification document. Document types are grouped
   * by verification category: **Identity** — PASSPORT, DRIVERS_LICENSE, NATIONAL_ID
   * **Business — Legal presence** — CERTIFICATE_OF_INCORPORATION,
   * ARTICLES_OF_INCORPORATION, ARTICLES_OF_ASSOCIATION, STATE_REGISTRY_EXCERPT
   * **Business — Control structure** — DIRECTOR_REGISTRY, TRUST_AGREEMENT,
   * STATE_COMPANY_REGISTRY, PARTNERSHIP_CONTROL_AGREEMENT **Business — Ownership
   * structure** — SHAREHOLDER_REGISTER, TRUST_AGREEMENT, PARTNERSHIP_AGREEMENT
   * **Proof of address** — UTILITY_BILL, RENT_OR_LEASE_AGREEMENT, ELECTRICITY_BILL,
   * BANK_STATEMENT, TAX_RETURN
   */
  documentType: DocumentType;

  /**
   * The document file (PDF, JPEG, or PNG, max 10 MB)
   */
  file: Uploadable;

  /**
   * Document identification number (e.g., passport number)
   */
  documentNumber?: string;

  /**
   * Name of the government agency or organization that issued the document
   */
  issuingAuthority?: string;

  /**
   * Which side of the document (for two-sided documents like driver's licenses)
   */
  side?: 'FRONT' | 'BACK';
}

/**
 * Type of identity or business verification document. Document types are grouped
 * by verification category: **Identity** — PASSPORT, DRIVERS_LICENSE, NATIONAL_ID
 * **Business — Legal presence** — CERTIFICATE_OF_INCORPORATION,
 * ARTICLES_OF_INCORPORATION, ARTICLES_OF_ASSOCIATION, STATE_REGISTRY_EXCERPT
 * **Business — Control structure** — DIRECTOR_REGISTRY, TRUST_AGREEMENT,
 * STATE_COMPANY_REGISTRY, PARTNERSHIP_CONTROL_AGREEMENT **Business — Ownership
 * structure** — SHAREHOLDER_REGISTER, TRUST_AGREEMENT, PARTNERSHIP_AGREEMENT
 * **Proof of address** — UTILITY_BILL, RENT_OR_LEASE_AGREEMENT, ELECTRICITY_BILL,
 * BANK_STATEMENT, TAX_RETURN
 */
export type DocumentType =
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
  | 'ELECTRICITY_BILL'
  | 'RENT_OR_LEASE_AGREEMENT'
  | 'DIRECTOR_REGISTRY'
  | 'TRUST_AGREEMENT'
  | 'STATE_COMPANY_REGISTRY'
  | 'PARTNERSHIP_CONTROL_AGREEMENT'
  | 'PARTNERSHIP_AGREEMENT'
  | 'SELFIE'
  | 'OTHER';

export interface DocumentUploadRequest {
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
   * Type of identity or business verification document. Document types are grouped
   * by verification category: **Identity** — PASSPORT, DRIVERS_LICENSE, NATIONAL_ID
   * **Business — Legal presence** — CERTIFICATE_OF_INCORPORATION,
   * ARTICLES_OF_INCORPORATION, ARTICLES_OF_ASSOCIATION, STATE_REGISTRY_EXCERPT
   * **Business — Control structure** — DIRECTOR_REGISTRY, TRUST_AGREEMENT,
   * STATE_COMPANY_REGISTRY, PARTNERSHIP_CONTROL_AGREEMENT **Business — Ownership
   * structure** — SHAREHOLDER_REGISTER, TRUST_AGREEMENT, PARTNERSHIP_AGREEMENT
   * **Proof of address** — UTILITY_BILL, RENT_OR_LEASE_AGREEMENT, ELECTRICITY_BILL,
   * BANK_STATEMENT, TAX_RETURN
   */
  documentType: DocumentType;

  /**
   * The document file (PDF, JPEG, or PNG, max 10 MB)
   */
  file: Uploadable;

  /**
   * Document identification number (e.g., passport number)
   */
  documentNumber?: string;

  /**
   * Name of the government agency or organization that issued the document
   */
  issuingAuthority?: string;

  /**
   * Which side of the document (for two-sided documents like driver's licenses)
   */
  side?: 'FRONT' | 'BACK';
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
  DocumentReplaceRequest: DocumentReplaceRequest;
}

export interface DocumentUploadParams {
  DocumentUploadRequest: DocumentUploadRequest;
}

export declare namespace Documents {
  export {
    type Document as Document,
    type DocumentListResponse as DocumentListResponse,
    type DocumentReplaceRequest as DocumentReplaceRequest,
    type DocumentType as DocumentType,
    type DocumentUploadRequest as DocumentUploadRequest,
    type DocumentsDefaultPagination as DocumentsDefaultPagination,
    type DocumentListParams as DocumentListParams,
    type DocumentReplaceParams as DocumentReplaceParams,
    type DocumentUploadParams as DocumentUploadParams,
  };
}
