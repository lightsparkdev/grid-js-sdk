// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as CustomersAPI from './customers';
import * as BulkAPI from './bulk';
import { Bulk, BulkGetJobStatusResponse, BulkUploadCsvParams, BulkUploadCsvResponse } from './bulk';
import * as ExternalAccountsAPI from './external-accounts';
import {
  Address,
  BaseWalletInfo,
  BrlBeneficiary,
  BrlExternalAccountInfo,
  BusinessBeneficiary,
  DkkBeneficiary,
  DkkExternalAccountInfo,
  ExternalAccount,
  ExternalAccountCreate,
  ExternalAccountCreateParams,
  ExternalAccountInfoOneOf,
  ExternalAccountListParams,
  ExternalAccounts,
  ExternalAccountsDefaultPagination,
  GbpBeneficiary,
  GbpExternalAccountInfo,
  HkdBeneficiary,
  HkdExternalAccountInfo,
  IdrBeneficiary,
  IdrExternalAccountInfo,
  InrBeneficiary,
  InrExternalAccountInfo,
  LightningWalletInfo,
  MxnBeneficiary,
  MxnExternalAccountInfo,
  MyrBeneficiary,
  MyrExternalAccountInfo,
  PhpBeneficiary,
  PhpExternalAccountInfo,
  PolygonWalletInfo,
  SgdBeneficiary,
  SgdExternalAccountInfo,
  SolanaWalletInfo,
  SparkWalletInfo,
  ThbBeneficiary,
  ThbExternalAccountInfo,
  TronWalletInfo,
  UsdBeneficiary,
  UsdExternalAccountInfo,
  VndBeneficiary,
  VndExternalAccountInfo,
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
   *     platformCustomerId: '9f84e0c2a72c4fa',
   *     customerType: 'INDIVIDUAL',
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
   * const customerOneOf = await client.customers.retrieve(
   *   'customerId',
   * );
   * ```
   */
  retrieve(customerID: string, options?: RequestOptions): APIPromise<CustomerOneOf> {
    return this._client.get(path`/customers/${customerID}`, options);
  }

  /**
   * Update a customer's metadata by their system-generated ID
   *
   * @example
   * ```ts
   * const customerOneOf = await client.customers.update(
   *   'customerId',
   *   { UpdateCustomerRequest: { customerType: 'INDIVIDUAL' } },
   * );
   * ```
   */
  update(
    customerID: string,
    params: CustomerUpdateParams,
    options?: RequestOptions,
  ): APIPromise<CustomerOneOf> {
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
   * const customerOneOf = await client.customers.delete(
   *   'customerId',
   * );
   * ```
   */
  delete(customerID: string, options?: RequestOptions): APIPromise<CustomerOneOf> {
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

export interface Customer {
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
  umaAddress?: string;
}

export type CustomerOneOf = CustomerOneOf.IndividualCustomer | CustomerOneOf.BusinessCustomer;

export namespace CustomerOneOf {
  export interface IndividualCustomer extends CustomersAPI.Customer {
    customerType: 'INDIVIDUAL';

    address?: ExternalAccountsAPI.Address;

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

  export interface BusinessCustomer extends CustomersAPI.Customer {
    customerType: 'BUSINESS';

    address?: ExternalAccountsAPI.Address;

    beneficialOwners?: Array<BusinessCustomer.BeneficialOwner>;

    businessInfo?: BusinessCustomer.BusinessInfo;
  }

  export namespace BusinessCustomer {
    export interface BeneficialOwner {
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

      address?: ExternalAccountsAPI.Address;

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

export interface CustomerUpdate {
  /**
   * Optional UMA address identifier. If provided, the customer's UMA address will be
   * updated. This is an optional identifier to route payments to the customer.
   */
  umaAddress?: string;
}

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
  export interface IndividualCustomerCreateRequest extends CustomersAPI.CustomerCreate {
    customerType: 'INDIVIDUAL';

    address?: ExternalAccountsAPI.Address;

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

  export interface BusinessCustomerCreateRequest extends CustomersAPI.CustomerCreate {
    customerType: 'BUSINESS';

    address?: ExternalAccountsAPI.Address;

    beneficialOwners?: Array<BusinessCustomerCreateRequest.BeneficialOwner>;

    businessInfo?: BusinessCustomerCreateRequest.BusinessInfo;
  }

  export namespace BusinessCustomerCreateRequest {
    export interface BeneficialOwner {
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

      address?: ExternalAccountsAPI.Address;

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

export interface CustomerUpdateParams {
  UpdateCustomerRequest:
    | CustomerUpdateParams.IndividualCustomerUpdateRequest
    | CustomerUpdateParams.BusinessCustomerUpdateRequest;
}

export namespace CustomerUpdateParams {
  export interface IndividualCustomerUpdateRequest extends CustomersAPI.CustomerUpdate {
    customerType: 'INDIVIDUAL';

    address?: ExternalAccountsAPI.Address;

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

  export interface BusinessCustomerUpdateRequest extends CustomersAPI.CustomerUpdate {
    customerType: 'BUSINESS';

    address?: ExternalAccountsAPI.Address;

    beneficialOwners?: Array<BusinessCustomerUpdateRequest.BeneficialOwner>;

    /**
     * Additional information for business entities
     */
    businessInfo?: BusinessCustomerUpdateRequest.BusinessInfo;
  }

  export namespace BusinessCustomerUpdateRequest {
    export interface BeneficialOwner {
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

      address?: ExternalAccountsAPI.Address;

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
  customerType?: 'INDIVIDUAL' | 'BUSINESS';

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
    type Customer as Customer,
    type CustomerCreate as CustomerCreate,
    type CustomerOneOf as CustomerOneOf,
    type CustomerUpdate as CustomerUpdate,
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
    type Address as Address,
    type BaseWalletInfo as BaseWalletInfo,
    type BrlBeneficiary as BrlBeneficiary,
    type BrlExternalAccountInfo as BrlExternalAccountInfo,
    type BusinessBeneficiary as BusinessBeneficiary,
    type DkkBeneficiary as DkkBeneficiary,
    type DkkExternalAccountInfo as DkkExternalAccountInfo,
    type ExternalAccount as ExternalAccount,
    type ExternalAccountCreate as ExternalAccountCreate,
    type ExternalAccountInfoOneOf as ExternalAccountInfoOneOf,
    type GbpBeneficiary as GbpBeneficiary,
    type GbpExternalAccountInfo as GbpExternalAccountInfo,
    type HkdBeneficiary as HkdBeneficiary,
    type HkdExternalAccountInfo as HkdExternalAccountInfo,
    type IdrBeneficiary as IdrBeneficiary,
    type IdrExternalAccountInfo as IdrExternalAccountInfo,
    type InrBeneficiary as InrBeneficiary,
    type InrExternalAccountInfo as InrExternalAccountInfo,
    type LightningWalletInfo as LightningWalletInfo,
    type MxnBeneficiary as MxnBeneficiary,
    type MxnExternalAccountInfo as MxnExternalAccountInfo,
    type MyrBeneficiary as MyrBeneficiary,
    type MyrExternalAccountInfo as MyrExternalAccountInfo,
    type PhpBeneficiary as PhpBeneficiary,
    type PhpExternalAccountInfo as PhpExternalAccountInfo,
    type PolygonWalletInfo as PolygonWalletInfo,
    type SgdBeneficiary as SgdBeneficiary,
    type SgdExternalAccountInfo as SgdExternalAccountInfo,
    type SolanaWalletInfo as SolanaWalletInfo,
    type SparkWalletInfo as SparkWalletInfo,
    type ThbBeneficiary as ThbBeneficiary,
    type ThbExternalAccountInfo as ThbExternalAccountInfo,
    type TronWalletInfo as TronWalletInfo,
    type UsdBeneficiary as UsdBeneficiary,
    type UsdExternalAccountInfo as UsdExternalAccountInfo,
    type VndBeneficiary as VndBeneficiary,
    type VndExternalAccountInfo as VndExternalAccountInfo,
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
