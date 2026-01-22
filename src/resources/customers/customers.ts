// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as BulkAPI from './bulk';
import { Bulk, BulkGetJobStatusResponse, BulkUploadCsvParams, BulkUploadCsvResponse } from './bulk';
import * as ExternalAccountsAPI from './external-accounts';
import {
  BaseWalletInfo,
  BusinessBeneficiary,
  ClabeAccountInfo,
  ExternalAccount,
  ExternalAccountCreate,
  ExternalAccountCreateParams,
  ExternalAccountInfo,
  ExternalAccountListParams,
  ExternalAccounts,
  ExternalAccountsDefaultPagination,
  IbanAccountInfo,
  IndividualBeneficiary,
  PixAccountInfo,
  PolygonWalletInfo,
  SolanaWalletInfo,
  SparkWalletInfo,
  TronWalletInfo,
  UpiAccountInfo,
  UsAccountInfo,
} from './external-accounts';
import * as InternalAccountsAPI from '../sandbox/internal-accounts';
import { InternalAccountsDefaultPagination } from '../sandbox/internal-accounts';
import { APIPromise } from '../../core/api-promise';
import { DefaultPagination, type DefaultPaginationParams, PagePromise } from '../../core/pagination';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Customers extends APIResource {
  externalAccounts: ExternalAccountsAPI.ExternalAccounts = new ExternalAccountsAPI.ExternalAccounts(
    this._client,
  );
  bulk: BulkAPI.Bulk = new BulkAPI.Bulk(this._client);

  /**
   * Register a new customer in the system with an account identifier and bank
   * account information
   *
   * @example
   * ```ts
   * const customer = await client.customers.create({
   *   customerType: 'INDIVIDUAL',
   *   platformCustomerId: '7b3c5a89d2f1e0',
   *   address: {
   *     line1: '123 Pine Street',
   *     line2: 'Unit 501',
   *     city: 'Seattle',
   *     state: 'WA',
   *     postalCode: '98101',
   *     country: 'US',
   *   },
   *   birthDate: '1992-03-25',
   *   fullName: 'Jane Doe',
   *   umaAddress: '$jane.doe@uma.domain.com',
   * });
   * ```
   */
  create(body: CustomerCreateParams, options?: RequestOptions): APIPromise<CustomerCreateResponse> {
    return this._client.post('/customers', { body, ...options });
  }

  /**
   * Retrieve a customer by their system-generated ID
   *
   * @example
   * ```ts
   * const customer = await client.customers.retrieve(
   *   'customerId',
   * );
   * ```
   */
  retrieve(customerID: string, options?: RequestOptions): APIPromise<CustomerRetrieveResponse> {
    return this._client.get(path`/customers/${customerID}`, options);
  }

  /**
   * Update a customer's metadata by their system-generated ID
   *
   * @example
   * ```ts
   * const customer = await client.customers.update(
   *   'customerId',
   *   {
   *     customerType: 'INDIVIDUAL',
   *     address: {
   *       line1: '456 Market St',
   *       city: 'San Francisco',
   *       state: 'CA',
   *       postalCode: '94103',
   *       country: 'US',
   *     },
   *     birthDate: '1985-06-15',
   *     fullName: 'John Smith',
   *   },
   * );
   * ```
   */
  update(
    customerID: string,
    body: CustomerUpdateParams,
    options?: RequestOptions,
  ): APIPromise<CustomerUpdateResponse> {
    return this._client.patch(path`/customers/${customerID}`, { body, ...options });
  }

  /**
   * Retrieve a list of customers with optional filtering parameters. Returns all
   * customers that match the specified filters. If no filters are provided, returns
   * all customers (paginated).
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const customerListResponse of client.customers.list()) {
   *   // ...
   * }
   * ```
   */
  list(
    query: CustomerListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<CustomerListResponsesDefaultPagination, CustomerListResponse> {
    return this._client.getAPIList('/customers', DefaultPagination<CustomerListResponse>, {
      query,
      ...options,
    });
  }

  /**
   * Delete a customer by their system-generated ID
   *
   * @example
   * ```ts
   * const customer = await client.customers.delete(
   *   'customerId',
   * );
   * ```
   */
  delete(customerID: string, options?: RequestOptions): APIPromise<CustomerDeleteResponse> {
    return this._client.delete(path`/customers/${customerID}`, options);
  }

  /**
   * Generate a hosted KYC link to onboard a customer
   *
   * @example
   * ```ts
   * const response = await client.customers.getKYCLink({
   *   platformCustomerId: 'platformCustomerId',
   * });
   * ```
   */
  getKYCLink(
    query: CustomerGetKYCLinkParams,
    options?: RequestOptions,
  ): APIPromise<CustomerGetKYCLinkResponse> {
    return this._client.get('/customers/kyc-link', { query, ...options });
  }

  /**
   * Retrieve a list of internal accounts with optional filtering parameters. Returns
   * all internal accounts that match the specified filters. If no filters are
   * provided, returns all internal accounts (paginated).
   *
   * Internal accounts are created automatically when a customer is created based on
   * the platform configuration.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const internalAccount of client.customers.listInternalAccounts()) {
   *   // ...
   * }
   * ```
   */
  listInternalAccounts(
    query: CustomerListInternalAccountsParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<InternalAccountsDefaultPagination, InternalAccountsAPI.InternalAccount> {
    return this._client.getAPIList(
      '/customers/internal-accounts',
      DefaultPagination<InternalAccountsAPI.InternalAccount>,
      { query, ...options },
    );
  }
}

export type CustomerListResponsesDefaultPagination = DefaultPagination<CustomerListResponse>;

export interface Address {
  /**
   * Country code (ISO 3166-1 alpha-2)
   */
  country: string;

  /**
   * Street address line 1
   */
  line1: string;

  /**
   * Postal/ZIP code
   */
  postalCode: string;

  /**
   * City
   */
  city?: string;

  /**
   * Street address line 2
   */
  line2?: string;

  /**
   * State/Province/Region
   */
  state?: string;
}

export interface BusinessCustomer extends Customer {
  address?: Address;

  beneficialOwners?: Array<UltimateBeneficialOwner>;

  /**
   * Additional information required for business entities
   */
  businessInfo?: BusinessCustomer.BusinessInfo;
}

export namespace BusinessCustomer {
  /**
   * Additional information required for business entities
   */
  export interface BusinessInfo {
    /**
     * Legal name of the business
     */
    legalName: string;

    /**
     * Business registration number
     */
    registrationNumber?: string;

    /**
     * Tax identification number
     */
    taxId?: string;
  }
}

export interface BusinessCustomerUpdate {
  /**
   * Customer type
   */
  customerType: 'BUSINESS';

  address?: Address;

  beneficialOwners?: Array<UltimateBeneficialOwner>;

  businessInfo?: BusinessCustomerUpdate.BusinessInfo;

  /**
   * Optional UMA address identifier. If not provided, will be generated by the
   * system.
   */
  umaAddress?: string;
}

export namespace BusinessCustomerUpdate {
  export interface BusinessInfo {
    /**
     * Legal name of the business
     */
    legalName?: string;

    /**
     * Business registration number
     */
    registrationNumber?: string;

    /**
     * Tax identification number
     */
    taxId?: string;
  }
}

export interface Customer {
  /**
   * Whether the customer is an individual or a business entity
   */
  customerType: CustomerType;

  /**
   * Platform-specific customer identifier
   */
  platformCustomerId: string;

  /**
   * Full UMA address (always present in responses, even if system-generated). This
   * is an optional identifier to route payments to the customer.
   */
  umaAddress: string;

  /**
   * System-generated unique identifier
   */
  id?: string;

  /**
   * Creation timestamp
   */
  createdAt?: string;

  /**
   * Whether the customer is marked as deleted
   */
  isDeleted?: boolean;

  /**
   * The current KYC status of a customer
   */
  kycStatus?:
    | 'APPROVED'
    | 'REJECTED'
    | 'PENDING_REVIEW'
    | 'EXPIRED'
    | 'CANCELED'
    | 'MANUALLY_APPROVED'
    | 'MANUALLY_REJECTED';

  /**
   * Last update timestamp
   */
  updatedAt?: string;
}

/**
 * Whether the customer is an individual or a business entity
 */
export type CustomerType = 'INDIVIDUAL' | 'BUSINESS';

export interface IndividualCustomer extends Customer {
  address?: Address;

  /**
   * Date of birth in ISO 8601 format (YYYY-MM-DD)
   */
  birthDate?: string;

  /**
   * Individual's full name
   */
  fullName?: string;

  /**
   * Country code (ISO 3166-1 alpha-2)
   */
  nationality?: string;
}

export interface IndividualCustomerUpdate {
  /**
   * Customer type
   */
  customerType: 'INDIVIDUAL';

  address?: Address;

  /**
   * Date of birth in ISO 8601 format (YYYY-MM-DD)
   */
  birthDate?: string;

  /**
   * Individual's full name
   */
  fullName?: string;

  /**
   * Country code (ISO 3166-1 alpha-2)
   */
  nationality?: string;

  /**
   * Optional UMA address identifier. If not provided during customer creation, one
   * will be generated by the system. If provided during customer update, the UMA
   * address will be updated to the provided value. This is an optional identifier to
   * route payments to the customer.
   */
  umaAddress?: string;
}

export interface UltimateBeneficialOwner {
  /**
   * Individual's full name
   */
  fullName: string;

  /**
   * Type of individual in the corporation
   */
  individualType:
    | 'DIRECTOR'
    | 'CONTROL_PERSON'
    | 'BUSINESS_POINT_OF_CONTACT'
    | 'TRUSTEE'
    | 'SETTLOR'
    | 'GENERAL_PARTNER';

  address?: Address;

  /**
   * Date of birth in ISO 8601 format (YYYY-MM-DD)
   */
  birthDate?: string;

  /**
   * Email address of the individual
   */
  emailAddress?: string;

  /**
   * Country code (ISO 3166-1 alpha-2)
   */
  nationality?: string;

  /**
   * Percent of ownership when individual type is beneficial owner
   */
  percentageOwnership?: number;

  /**
   * Phone number of the individual in E.164 format
   */
  phoneNumber?: string;

  /**
   * Tax identification number of the individual. This could be a Social Security
   * Number (SSN) for US individuals, Tax Identification Number (TIN) for non-US
   * individuals, or a Passport Number.
   */
  taxId?: string;

  /**
   * Title at company
   */
  title?: string;
}

export type CustomerCreateResponse = IndividualCustomer | BusinessCustomer;

export type CustomerRetrieveResponse = IndividualCustomer | BusinessCustomer;

export type CustomerUpdateResponse = IndividualCustomer | BusinessCustomer;

export type CustomerListResponse = IndividualCustomer | BusinessCustomer;

export type CustomerDeleteResponse = IndividualCustomer | BusinessCustomer;

export interface CustomerGetKYCLinkResponse {
  /**
   * The customer id of the newly created customer on the system
   */
  customerId?: string;

  /**
   * A hosted KYC link for your customer to complete KYC
   */
  kycUrl?: string;

  /**
   * The platform id of the customer to onboard
   */
  platformCustomerId?: string;
}

export type CustomerCreateParams =
  | CustomerCreateParams.NewIndividualCustomer
  | CustomerCreateParams.NewBusinessCustomer;

export declare namespace CustomerCreateParams {
  export interface NewIndividualCustomer {
    /**
     * Customer type
     */
    customerType: 'INDIVIDUAL';

    /**
     * Platform-specific customer identifier
     */
    platformCustomerId: string;

    address?: Address;

    /**
     * Date of birth in ISO 8601 format (YYYY-MM-DD)
     */
    birthDate?: string;

    /**
     * Individual's full name
     */
    fullName?: string;

    /**
     * A KYC URL to be shared with your individual customer if KYC needs to be
     * completed
     */
    kycUrl?: string;

    /**
     * Country code (ISO 3166-1 alpha-2)
     */
    nationality?: string;

    /**
     * Optional UMA address identifier. If not provided during customer creation, one
     * will be generated by the system. If provided during customer update, the UMA
     * address will be updated to the provided value. This is an optional identifier to
     * route payments to the customer.
     */
    umaAddress?: string;
  }

  export interface NewBusinessCustomer {
    businessInfo: NewBusinessCustomer.BusinessInfo;

    /**
     * Customer type
     */
    customerType: 'BUSINESS';

    /**
     * Platform-specific customer identifier
     */
    platformCustomerId: string;

    address?: Address;

    beneficialOwners?: Array<UltimateBeneficialOwner>;

    /**
     * A KYC URL to be shared with your business customer if KYC needs to be completed
     */
    kycUrl?: string;

    /**
     * Optional UMA address identifier. If not provided, will be generated by the
     * system.
     */
    umaAddress?: string;
  }

  export namespace NewBusinessCustomer {
    export interface BusinessInfo {
      /**
       * Legal name of the business
       */
      legalName: string;

      /**
       * Business registration number
       */
      registrationNumber?: string;

      /**
       * Tax identification number
       */
      taxId?: string;
    }
  }
}

export type CustomerUpdateParams =
  | CustomerUpdateParams.IndividualCustomerUpdate
  | CustomerUpdateParams.BusinessCustomerUpdate;

export declare namespace CustomerUpdateParams {
  export interface IndividualCustomerUpdate {
    /**
     * Customer type
     */
    customerType: 'INDIVIDUAL';

    address?: Address;

    /**
     * Date of birth in ISO 8601 format (YYYY-MM-DD)
     */
    birthDate?: string;

    /**
     * Individual's full name
     */
    fullName?: string;

    /**
     * Country code (ISO 3166-1 alpha-2)
     */
    nationality?: string;

    /**
     * Optional UMA address identifier. If not provided during customer creation, one
     * will be generated by the system. If provided during customer update, the UMA
     * address will be updated to the provided value. This is an optional identifier to
     * route payments to the customer.
     */
    umaAddress?: string;
  }

  export interface BusinessCustomerUpdate {
    /**
     * Customer type
     */
    customerType: 'BUSINESS';

    address?: Address;

    beneficialOwners?: Array<UltimateBeneficialOwner>;

    businessInfo?: BusinessCustomerUpdate.BusinessInfo;

    /**
     * Optional UMA address identifier. If not provided, will be generated by the
     * system.
     */
    umaAddress?: string;
  }

  export namespace BusinessCustomerUpdate {
    export interface BusinessInfo {
      /**
       * Legal name of the business
       */
      legalName?: string;

      /**
       * Business registration number
       */
      registrationNumber?: string;

      /**
       * Tax identification number
       */
      taxId?: string;
    }
  }
}

export interface CustomerListParams extends DefaultPaginationParams {
  /**
   * Filter customers created after this timestamp (inclusive)
   */
  createdAfter?: string;

  /**
   * Filter customers created before this timestamp (inclusive)
   */
  createdBefore?: string;

  /**
   * Filter by customer type
   */
  customerType?: CustomerType;

  /**
   * Whether to include deleted customers in the results. Default is false.
   */
  isIncludingDeleted?: boolean;

  /**
   * Maximum number of results to return (default 20, max 100)
   */
  limit?: number;

  /**
   * Filter by platform-specific customer identifier
   */
  platformCustomerId?: string;

  /**
   * Filter by uma address
   */
  umaAddress?: string;

  /**
   * Filter customers updated after this timestamp (inclusive)
   */
  updatedAfter?: string;

  /**
   * Filter customers updated before this timestamp (inclusive)
   */
  updatedBefore?: string;
}

export interface CustomerGetKYCLinkParams {
  /**
   * The platform id of the customer to onboard
   */
  platformCustomerId: string;

  /**
   * An optional uri a customer will be redirected to after completing the hosted KYC
   * flow
   */
  redirectUri?: string;
}

export interface CustomerListInternalAccountsParams extends DefaultPaginationParams {
  /**
   * Filter by currency code
   */
  currency?: string;

  /**
   * Filter by internal accounts associated with a specific customer
   */
  customerId?: string;

  /**
   * Maximum number of results to return (default 20, max 100)
   */
  limit?: number;
}

Customers.ExternalAccounts = ExternalAccounts;
Customers.Bulk = Bulk;

export declare namespace Customers {
  export {
    type Address as Address,
    type BusinessCustomer as BusinessCustomer,
    type BusinessCustomerUpdate as BusinessCustomerUpdate,
    type Customer as Customer,
    type CustomerType as CustomerType,
    type IndividualCustomer as IndividualCustomer,
    type IndividualCustomerUpdate as IndividualCustomerUpdate,
    type UltimateBeneficialOwner as UltimateBeneficialOwner,
    type CustomerCreateResponse as CustomerCreateResponse,
    type CustomerRetrieveResponse as CustomerRetrieveResponse,
    type CustomerUpdateResponse as CustomerUpdateResponse,
    type CustomerListResponse as CustomerListResponse,
    type CustomerDeleteResponse as CustomerDeleteResponse,
    type CustomerGetKYCLinkResponse as CustomerGetKYCLinkResponse,
    type CustomerListResponsesDefaultPagination as CustomerListResponsesDefaultPagination,
    type CustomerCreateParams as CustomerCreateParams,
    type CustomerUpdateParams as CustomerUpdateParams,
    type CustomerListParams as CustomerListParams,
    type CustomerGetKYCLinkParams as CustomerGetKYCLinkParams,
    type CustomerListInternalAccountsParams as CustomerListInternalAccountsParams,
  };

  export {
    ExternalAccounts as ExternalAccounts,
    type BaseWalletInfo as BaseWalletInfo,
    type BusinessBeneficiary as BusinessBeneficiary,
    type ClabeAccountInfo as ClabeAccountInfo,
    type ExternalAccount as ExternalAccount,
    type ExternalAccountCreate as ExternalAccountCreate,
    type ExternalAccountInfo as ExternalAccountInfo,
    type IbanAccountInfo as IbanAccountInfo,
    type IndividualBeneficiary as IndividualBeneficiary,
    type PixAccountInfo as PixAccountInfo,
    type PolygonWalletInfo as PolygonWalletInfo,
    type SolanaWalletInfo as SolanaWalletInfo,
    type SparkWalletInfo as SparkWalletInfo,
    type TronWalletInfo as TronWalletInfo,
    type UpiAccountInfo as UpiAccountInfo,
    type UsAccountInfo as UsAccountInfo,
    type ExternalAccountsDefaultPagination as ExternalAccountsDefaultPagination,
    type ExternalAccountCreateParams as ExternalAccountCreateParams,
    type ExternalAccountListParams as ExternalAccountListParams,
  };

  export {
    Bulk as Bulk,
    type BulkGetJobStatusResponse as BulkGetJobStatusResponse,
    type BulkUploadCsvResponse as BulkUploadCsvResponse,
    type BulkUploadCsvParams as BulkUploadCsvParams,
  };
}

export { type InternalAccountsDefaultPagination };
