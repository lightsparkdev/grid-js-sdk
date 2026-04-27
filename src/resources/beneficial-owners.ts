// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as ExternalAccountsAPI from './customers/external-accounts';
import { APIPromise } from '../core/api-promise';
import { DefaultPagination, type DefaultPaginationParams, PagePromise } from '../core/pagination';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

/**
 * Endpoints for Know Your Customer (KYC) and Know Your Business (KYB) verification, including managing beneficial owners and triggering verification for customers.
 */
export class BeneficialOwners extends APIResource {
  /**
   * Add a beneficial owner, director, or company officer to a business customer. The
   * beneficial owner will go through KYC verification automatically.
   *
   * @example
   * ```ts
   * const beneficialOwner =
   *   await client.beneficialOwners.create({
   *     customerId:
   *       'Customer:019542f5-b3e7-1d02-0000-000000000001',
   *     ownershipPercentage: 51,
   *     personalInfo: {
   *       address: {
   *         country: 'US',
   *         line1: '123 Main Street',
   *         postalCode: '94105',
   *       },
   *       birthDate: '1978-06-15',
   *       firstName: 'Jane',
   *       identifier: '123-45-6789',
   *       idType: 'SSN',
   *       lastName: 'Smith',
   *       nationality: 'US',
   *     },
   *     roles: ['UBO', 'DIRECTOR'],
   *   });
   * ```
   */
  create(
    body: BeneficialOwnerCreateParams,
    options?: RequestOptions,
  ): APIPromise<BeneficialOwnerCreateResponse> {
    return this._client.post('/beneficial-owners', { body, ...options });
  }

  /**
   * Retrieve details of a specific beneficial owner by ID.
   *
   * @example
   * ```ts
   * const beneficialOwner =
   *   await client.beneficialOwners.retrieve(
   *     'beneficialOwnerId',
   *   );
   * ```
   */
  retrieve(beneficialOwnerID: string, options?: RequestOptions): APIPromise<BeneficialOwnerRetrieveResponse> {
    return this._client.get(path`/beneficial-owners/${beneficialOwnerID}`, options);
  }

  /**
   * Update details of a specific beneficial owner. Only provided fields are updated.
   *
   * @example
   * ```ts
   * const beneficialOwner =
   *   await client.beneficialOwners.update('beneficialOwnerId');
   * ```
   */
  update(
    beneficialOwnerID: string,
    body: BeneficialOwnerUpdateParams,
    options?: RequestOptions,
  ): APIPromise<BeneficialOwnerUpdateResponse> {
    return this._client.patch(path`/beneficial-owners/${beneficialOwnerID}`, { body, ...options });
  }

  /**
   * Retrieve a list of beneficial owners for a business customer.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const beneficialOwnerListResponse of client.beneficialOwners.list(
   *   { customerId: 'customerId' },
   * )) {
   *   // ...
   * }
   * ```
   */
  list(
    query: BeneficialOwnerListParams,
    options?: RequestOptions,
  ): PagePromise<BeneficialOwnerListResponsesDefaultPagination, BeneficialOwnerListResponse> {
    return this._client.getAPIList('/beneficial-owners', DefaultPagination<BeneficialOwnerListResponse>, {
      query,
      ...options,
    });
  }
}

export type BeneficialOwnerListResponsesDefaultPagination = DefaultPagination<BeneficialOwnerListResponse>;

export interface BeneficialOwnerPersonalInfo {
  address: ExternalAccountsAPI.Address;

  /**
   * Date of birth in ISO 8601 format (YYYY-MM-DD)
   */
  birthDate: string;

  /**
   * First name of the individual
   */
  firstName: string;

  /**
   * The identification number or value
   */
  identifier: string;

  /**
   * Type of tax identification
   */
  idType: 'SSN' | 'ITIN' | 'EIN' | 'NON_US_TAX_ID';

  /**
   * Last name of the individual
   */
  lastName: string;

  /**
   * Country of nationality (ISO 3166-1 alpha-2)
   */
  nationality: string;

  /**
   * Country that issued the identification (ISO 3166-1 alpha-2)
   */
  countryOfIssuance?: string;

  /**
   * Email address of the individual
   */
  email?: string;

  /**
   * Middle name of the individual
   */
  middleName?: string;

  /**
   * Phone number in E.164 format
   */
  phoneNumber?: string;
}

export interface BeneficialOwnerCreateResponse {
  /**
   * Unique identifier for this beneficial owner
   */
  id: string;

  /**
   * When this beneficial owner was created
   */
  createdAt: string;

  /**
   * The ID of the business customer this beneficial owner is associated with
   */
  customerId: string;

  /**
   * The current KYC status of a customer
   */
  kycStatus: 'UNVERIFIED' | 'PENDING' | 'APPROVED' | 'REJECTED';

  /**
   * Percentage of ownership in the business (0-100)
   */
  ownershipPercentage: number;

  personalInfo: BeneficialOwnerPersonalInfo;

  /**
   * Roles of this person within the business
   */
  roles: Array<'UBO' | 'DIRECTOR' | 'COMPANY_OFFICER' | 'CONTROL_PERSON' | 'TRUSTEE' | 'GENERAL_PARTNER'>;

  /**
   * When this beneficial owner was last updated
   */
  updatedAt?: string;
}

export interface BeneficialOwnerRetrieveResponse {
  /**
   * Unique identifier for this beneficial owner
   */
  id: string;

  /**
   * When this beneficial owner was created
   */
  createdAt: string;

  /**
   * The ID of the business customer this beneficial owner is associated with
   */
  customerId: string;

  /**
   * The current KYC status of a customer
   */
  kycStatus: 'UNVERIFIED' | 'PENDING' | 'APPROVED' | 'REJECTED';

  /**
   * Percentage of ownership in the business (0-100)
   */
  ownershipPercentage: number;

  personalInfo: BeneficialOwnerPersonalInfo;

  /**
   * Roles of this person within the business
   */
  roles: Array<'UBO' | 'DIRECTOR' | 'COMPANY_OFFICER' | 'CONTROL_PERSON' | 'TRUSTEE' | 'GENERAL_PARTNER'>;

  /**
   * When this beneficial owner was last updated
   */
  updatedAt?: string;
}

export interface BeneficialOwnerUpdateResponse {
  /**
   * Unique identifier for this beneficial owner
   */
  id: string;

  /**
   * When this beneficial owner was created
   */
  createdAt: string;

  /**
   * The ID of the business customer this beneficial owner is associated with
   */
  customerId: string;

  /**
   * The current KYC status of a customer
   */
  kycStatus: 'UNVERIFIED' | 'PENDING' | 'APPROVED' | 'REJECTED';

  /**
   * Percentage of ownership in the business (0-100)
   */
  ownershipPercentage: number;

  personalInfo: BeneficialOwnerPersonalInfo;

  /**
   * Roles of this person within the business
   */
  roles: Array<'UBO' | 'DIRECTOR' | 'COMPANY_OFFICER' | 'CONTROL_PERSON' | 'TRUSTEE' | 'GENERAL_PARTNER'>;

  /**
   * When this beneficial owner was last updated
   */
  updatedAt?: string;
}

export interface BeneficialOwnerListResponse {
  /**
   * Unique identifier for this beneficial owner
   */
  id: string;

  /**
   * When this beneficial owner was created
   */
  createdAt: string;

  /**
   * The ID of the business customer this beneficial owner is associated with
   */
  customerId: string;

  /**
   * The current KYC status of a customer
   */
  kycStatus: 'UNVERIFIED' | 'PENDING' | 'APPROVED' | 'REJECTED';

  /**
   * Percentage of ownership in the business (0-100)
   */
  ownershipPercentage: number;

  personalInfo: BeneficialOwnerPersonalInfo;

  /**
   * Roles of this person within the business
   */
  roles: Array<'UBO' | 'DIRECTOR' | 'COMPANY_OFFICER' | 'CONTROL_PERSON' | 'TRUSTEE' | 'GENERAL_PARTNER'>;

  /**
   * When this beneficial owner was last updated
   */
  updatedAt?: string;
}

export interface BeneficialOwnerCreateParams {
  /**
   * The ID of the business customer this beneficial owner is associated with
   */
  customerId: string;

  /**
   * Percentage of ownership in the business (0-100). Relevant when role includes
   * UBO.
   */
  ownershipPercentage: number;

  personalInfo: BeneficialOwnerPersonalInfo;

  /**
   * Roles of this person within the business
   */
  roles: Array<'UBO' | 'DIRECTOR' | 'COMPANY_OFFICER' | 'CONTROL_PERSON' | 'TRUSTEE' | 'GENERAL_PARTNER'>;
}

export interface BeneficialOwnerUpdateParams {
  /**
   * Percentage of ownership in the business (0-100)
   */
  ownershipPercentage?: number;

  /**
   * Partial update for beneficial owner personal information. Only provided fields
   * are updated.
   */
  personalInfo?: BeneficialOwnerUpdateParams.PersonalInfo;

  /**
   * Roles of this person within the business
   */
  roles?: Array<'UBO' | 'DIRECTOR' | 'COMPANY_OFFICER' | 'CONTROL_PERSON' | 'TRUSTEE' | 'GENERAL_PARTNER'>;
}

export namespace BeneficialOwnerUpdateParams {
  /**
   * Partial update for beneficial owner personal information. Only provided fields
   * are updated.
   */
  export interface PersonalInfo {
    address?: ExternalAccountsAPI.Address;

    /**
     * Date of birth in ISO 8601 format (YYYY-MM-DD)
     */
    birthDate?: string;

    /**
     * Country that issued the identification (ISO 3166-1 alpha-2)
     */
    countryOfIssuance?: string;

    /**
     * Email address of the individual
     */
    email?: string;

    /**
     * First name of the individual
     */
    firstName?: string;

    /**
     * The identification number or value
     */
    identifier?: string;

    /**
     * Type of tax identification
     */
    idType?: 'SSN' | 'ITIN' | 'EIN' | 'NON_US_TAX_ID';

    /**
     * Last name of the individual
     */
    lastName?: string;

    /**
     * Middle name of the individual
     */
    middleName?: string;

    /**
     * Country of nationality (ISO 3166-1 alpha-2)
     */
    nationality?: string;

    /**
     * Phone number in E.164 format
     */
    phoneNumber?: string;
  }
}

export interface BeneficialOwnerListParams extends DefaultPaginationParams {
  /**
   * The business customer ID
   */
  customerId: string;

  /**
   * Maximum number of results to return (default 20, max 100)
   */
  limit?: number;
}

export declare namespace BeneficialOwners {
  export {
    type BeneficialOwnerPersonalInfo as BeneficialOwnerPersonalInfo,
    type BeneficialOwnerCreateResponse as BeneficialOwnerCreateResponse,
    type BeneficialOwnerRetrieveResponse as BeneficialOwnerRetrieveResponse,
    type BeneficialOwnerUpdateResponse as BeneficialOwnerUpdateResponse,
    type BeneficialOwnerListResponse as BeneficialOwnerListResponse,
    type BeneficialOwnerListResponsesDefaultPagination as BeneficialOwnerListResponsesDefaultPagination,
    type BeneficialOwnerCreateParams as BeneficialOwnerCreateParams,
    type BeneficialOwnerUpdateParams as BeneficialOwnerUpdateParams,
    type BeneficialOwnerListParams as BeneficialOwnerListParams,
  };
}
