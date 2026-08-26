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
   * Replace an existing document with a new file and/or updated metadata. The
   * request must use multipart/form-data.
   *
   * Use this when a stored document was rejected during review, which arrives as an
   * entry in the verification's `errors` array rather than as an error on upload.
   * Replacing marks the previously submitted file inactive, which a second
   * `POST /documents` would not do: that leaves the rejected file active alongside
   * the new one, and the rejection can carry. Call `POST /verifications` afterwards
   * to start a new review, since existing errors persist until a new review produces
   * a new verdict.
   *
   * A file rejected on upload with `422 DOCUMENT_REJECTED` never creates a document,
   * so there is nothing to replace. Retry those with `POST /documents`.
   *
   * Supported file types: `application/pdf`, `image/jpeg`, and `image/png`. Grid
   * matches on the `Content-Type` of the multipart part, not the file extension. Any
   * other type, and any file over 10 MB, returns `400 INVALID_INPUT`.
   *
   * Grid forwards the file to its verification provider, which screens it as the
   * request is handled and can reject it with `422 DOCUMENT_REJECTED`. To pass that
   * screen, a photo or scan of a document must:
   *
   * - show the whole document, with all four corners inside the frame and nothing
   *   overlapping an edge
   * - be in focus and free of glare, so every field and the machine-readable zone
   *   can be read
   * - be in color, not a black-and-white copy
   * - be a photo or scan of the physical document, not a screen capture, and not
   *   retouched in an image editor
   * - be unexpired
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
   * Supported file types: `application/pdf`, `image/jpeg`, and `image/png`. Grid
   * matches on the `Content-Type` of the multipart part, not the file extension. Any
   * other type, and any file over 10 MB, returns `400 INVALID_INPUT`.
   *
   * Grid forwards the file to its verification provider, which screens it as the
   * request is handled and can reject it with `422 DOCUMENT_REJECTED`. To pass that
   * screen, a photo or scan of a document must:
   *
   * - show the whole document, with all four corners inside the frame and nothing
   *   overlapping an edge
   * - be in focus and free of glare, so every field and the machine-readable zone
   *   can be read
   * - be in color, not a black-and-white copy
   * - be a photo or scan of the physical document, not a screen capture, and not
   *   retouched in an image editor
   * - be unexpired
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
    | 'ELECTRICITY_BILL'
    | 'RENT_OR_LEASE_AGREEMENT'
    | 'DIRECTOR_REGISTRY'
    | 'TRUST_AGREEMENT'
    | 'STATE_COMPANY_REGISTRY'
    | 'PARTNERSHIP_CONTROL_AGREEMENT'
    | 'PARTNERSHIP_AGREEMENT'
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
  DocumentReplaceRequest: DocumentReplaceParams.DocumentReplaceRequest;
}

export namespace DocumentReplaceParams {
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
      | 'ELECTRICITY_BILL'
      | 'RENT_OR_LEASE_AGREEMENT'
      | 'DIRECTOR_REGISTRY'
      | 'TRUST_AGREEMENT'
      | 'STATE_COMPANY_REGISTRY'
      | 'PARTNERSHIP_CONTROL_AGREEMENT'
      | 'PARTNERSHIP_AGREEMENT'
      | 'SELFIE'
      | 'OTHER';

    /**
     * The document file. Grid accepts three formats, matched on the `Content-Type` of
     * the multipart part rather than the file extension: `application/pdf`,
     * `image/jpeg`, and `image/png`. Any other type, including `image/heic`,
     * `image/webp`, and `image/tiff`, returns `400 INVALID_INPUT`. The file must be 10
     * MB or smaller.
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
}

export interface DocumentUploadParams {
  DocumentUploadRequest: DocumentUploadParams.DocumentUploadRequest;
}

export namespace DocumentUploadParams {
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
      | 'ELECTRICITY_BILL'
      | 'RENT_OR_LEASE_AGREEMENT'
      | 'DIRECTOR_REGISTRY'
      | 'TRUST_AGREEMENT'
      | 'STATE_COMPANY_REGISTRY'
      | 'PARTNERSHIP_CONTROL_AGREEMENT'
      | 'PARTNERSHIP_AGREEMENT'
      | 'SELFIE'
      | 'OTHER';

    /**
     * The document file. Grid accepts three formats, matched on the `Content-Type` of
     * the multipart part rather than the file extension: `application/pdf`,
     * `image/jpeg`, and `image/png`. Any other type, including `image/heic`,
     * `image/webp`, and `image/tiff`, returns `400 INVALID_INPUT`. The file must be 10
     * MB or smaller.
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
}

export declare namespace Documents {
  export {
    type Document as Document,
    type DocumentListResponse as DocumentListResponse,
    type DocumentsDefaultPagination as DocumentsDefaultPagination,
    type DocumentListParams as DocumentListParams,
    type DocumentReplaceParams as DocumentReplaceParams,
    type DocumentUploadParams as DocumentUploadParams,
  };
}
