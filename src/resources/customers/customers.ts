// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as CustomersAPI from './customers';
import * as BulkAPI from './bulk';
import { Bulk, BulkGetJobStatusResponse, BulkUploadCsvParams, BulkUploadCsvResponse } from './bulk';
import * as ExternalAccountsAPI from './external-accounts';
import {
  BaseBeneficiary,
  BaseExternalAccountInfo,
  BaseWalletInfo,
  BeneficiaryOneOf,
  BusinessBeneficiary,
  ClabeAccountInfo,
  ExternalAccount,
  ExternalAccountCreate,
  ExternalAccountCreateParams,
  ExternalAccountInfoOneOf,
  ExternalAccountListParams,
  ExternalAccounts,
  ExternalAccountsDefaultPagination,
  IbanAccountInfo,
  IndividualBeneficiary,
  LightningExternalAccountInfo,
  NgnAccountExternalAccountInfo,
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
   * const customerOneOf = await client.customers.create({
   *   CreateCustomerRequest: {
   *     customerType: 'INDIVIDUAL',
   *     platformCustomerId: '9f84e0c2a72c4fa',
   *   },
   * });
   * ```
   */
  create(params: CustomerCreateParams, options?: RequestOptions): APIPromise<CustomerOneOf> {
    const { CreateCustomerRequest } = params;
    return this._client.post('/customers', { body: CreateCustomerRequest, ...options });
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
   *   { UpdateCustomerRequest: { customerType: 'INDIVIDUAL' } },
   * );
   * ```
   */
  update(
    customerID: string,
    params: CustomerUpdateParams,
    options?: RequestOptions,
  ): APIPromise<CustomerUpdateResponse> {
    const { UpdateCustomerRequest } = params;
    return this._client.patch(path`/customers/${customerID}`, { body: UpdateCustomerRequest, ...options });
  }

  /**
   * Retrieve a list of customers with optional filtering parameters. Returns all
   * customers that match the specified filters. If no filters are provided, returns
   * all customers (paginated).
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const customerOneOf of client.customers.list()) {
   *   // ...
   * }
   * ```
   */
  list(
    query: CustomerListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<CustomerOneovesDefaultPagination, CustomerOneOf> {
    return this._client.getAPIList('/customers', DefaultPagination<CustomerOneOf>, { query, ...options });
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

export type CustomerOneovesDefaultPagination = DefaultPagination<CustomerOneOf>;

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

export interface BusinessCustomer extends Customer, Omit<BusinessCustomerFields, 'businessInfo'> {
  /**
   * Additional information required for business entities
   */
  businessInfo?: BusinessInfo;
}

export interface BusinessCustomerFields {
  customerType: 'BUSINESS';

  address?: Address;

  beneficialOwners?: Array<UltimateBeneficialOwner>;

  /**
   * Additional information for business entities
   */
  businessInfo?: BusinessCustomerFields.BusinessInfo;
}

export namespace BusinessCustomerFields {
  /**
   * Additional information for business entities
   */
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

export interface CustomerCreate {
  /**
   * Whether the customer is an individual or a business entity
   */
  customerType: CustomerType;

  /**
   * Platform-specific customer identifier. If not provided, one will be generated by
   * the system.
   */
  platformCustomerId: string;

  /**
   * Optional UMA address identifier. If not provided during customer creation, one
   * will be generated by the system. If provided during customer update, the UMA
   * address will be updated to the provided value. This is an optional identifier to
   * route payments to the customer. This is an optional identifier to route payments
   * to the customer.
   */
  umaAddress?: unknown;
}

export type CustomerOneOf = IndividualCustomer | BusinessCustomer;

/**
 * Whether the customer is an individual or a business entity
 */
export type CustomerType = 'INDIVIDUAL' | 'BUSINESS';

export interface CustomerUpdate {
  /**
   * Whether the customer is an individual or a business entity
   */
  customerType: CustomerType;

  /**
   * Optional UMA address identifier. If provided, the customer's UMA address will be
   * updated. This is an optional identifier to route payments to the customer.
   */
  umaAddress?: string;
}

export interface IndividualCustomer extends Customer, IndividualCustomerFields {}

export interface IndividualCustomerFields {
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

export type CustomerRetrieveResponse = IndividualCustomer | BusinessCustomer;

export type CustomerUpdateResponse = IndividualCustomer | BusinessCustomer;

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

export interface CustomerCreateParams {
  CreateCustomerRequest:
    | CustomerCreateParams.IndividualCustomerCreateRequest
    | CustomerCreateParams.BusinessCustomerCreateRequest;
}

export namespace CustomerCreateParams {
  export interface IndividualCustomerCreateRequest
    extends CustomersAPI.CustomerCreate,
      CustomersAPI.IndividualCustomerFields {}

  export interface BusinessCustomerCreateRequest
    extends CustomersAPI.CustomerCreate,
      Omit<CustomersAPI.BusinessCustomerFields, 'businessInfo'> {
    /**
     * Additional information required for business entities
     */
    businessInfo?: CustomersAPI.BusinessInfo;
  }
}

export interface CustomerUpdateParams {
  UpdateCustomerRequest:
    | CustomerUpdateParams.IndividualCustomerUpdateRequest
    | CustomerUpdateParams.BusinessCustomerUpdateRequest;
}

export namespace CustomerUpdateParams {
  export interface IndividualCustomerUpdateRequest
    extends CustomersAPI.CustomerUpdate,
      CustomersAPI.IndividualCustomerFields {}

  export interface BusinessCustomerUpdateRequest
    extends CustomersAPI.CustomerUpdate,
      CustomersAPI.BusinessCustomerFields {}
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
    type BusinessCustomerFields as BusinessCustomerFields,
    type BusinessInfo as BusinessInfo,
    type Customer as Customer,
    type CustomerCreate as CustomerCreate,
    type CustomerOneOf as CustomerOneOf,
    type CustomerType as CustomerType,
    type CustomerUpdate as CustomerUpdate,
    type IndividualCustomer as IndividualCustomer,
    type IndividualCustomerFields as IndividualCustomerFields,
    type UltimateBeneficialOwner as UltimateBeneficialOwner,
    type CustomerRetrieveResponse as CustomerRetrieveResponse,
    type CustomerUpdateResponse as CustomerUpdateResponse,
    type CustomerDeleteResponse as CustomerDeleteResponse,
    type CustomerGetKYCLinkResponse as CustomerGetKYCLinkResponse,
    type CustomerOneovesDefaultPagination as CustomerOneovesDefaultPagination,
    type CustomerCreateParams as CustomerCreateParams,
    type CustomerUpdateParams as CustomerUpdateParams,
    type CustomerListParams as CustomerListParams,
    type CustomerGetKYCLinkParams as CustomerGetKYCLinkParams,
    type CustomerListInternalAccountsParams as CustomerListInternalAccountsParams,
  };

  export {
    ExternalAccounts as ExternalAccounts,
    type BaseBeneficiary as BaseBeneficiary,
    type BaseExternalAccountInfo as BaseExternalAccountInfo,
    type BaseWalletInfo as BaseWalletInfo,
    type BeneficiaryOneOf as BeneficiaryOneOf,
    type BusinessBeneficiary as BusinessBeneficiary,
    type ClabeAccountInfo as ClabeAccountInfo,
    type ExternalAccount as ExternalAccount,
    type ExternalAccountCreate as ExternalAccountCreate,
    type ExternalAccountInfoOneOf as ExternalAccountInfoOneOf,
    type IbanAccountInfo as IbanAccountInfo,
    type IndividualBeneficiary as IndividualBeneficiary,
    type LightningExternalAccountInfo as LightningExternalAccountInfo,
    type NgnAccountExternalAccountInfo as NgnAccountExternalAccountInfo,
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
