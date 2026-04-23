// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as CustomersAPI from './customers';
import * as BeneficialOwnersAPI from '../beneficial-owners';
import * as BulkAPI from './bulk';
import { Bulk, BulkGetJobStatusResponse, BulkUploadCsvParams, BulkUploadCsvResponse } from './bulk';
import * as ExternalAccountsAPI from './external-accounts';
import {
  Address,
  AedExternalAccountInfo,
  BaseWalletInfo,
  BdtExternalAccountInfo,
  BeneficiaryVerifiedData,
  BrlBeneficiary,
  BrlExternalAccountInfo,
  BusinessBeneficiary,
  BwpExternalAccountInfo,
  CadExternalAccountInfo,
  CopExternalAccountInfo,
  DkkBeneficiary,
  DkkExternalAccountInfo,
  EgpExternalAccountInfo,
  EurExternalAccountInfo,
  ExternalAccount,
  ExternalAccountCreate,
  ExternalAccountCreateParams,
  ExternalAccountInfoOneOf,
  ExternalAccountListParams,
  ExternalAccounts,
  ExternalAccountsDefaultPagination,
  GbpBeneficiary,
  GbpExternalAccountInfo,
  GhsExternalAccountInfo,
  GtqExternalAccountInfo,
  HkdBeneficiary,
  HkdExternalAccountInfo,
  HtgExternalAccountInfo,
  IdrBeneficiary,
  IdrExternalAccountInfo,
  InrBeneficiary,
  InrExternalAccountInfo,
  JmdExternalAccountInfo,
  KesExternalAccountInfo,
  LightningWalletInfo,
  MwkExternalAccountInfo,
  MxnBeneficiary,
  MxnExternalAccountInfo,
  MyrBeneficiary,
  MyrExternalAccountInfo,
  NgnExternalAccountInfo,
  PhpBeneficiary,
  PhpExternalAccountInfo,
  PkrExternalAccountInfo,
  PolygonWalletInfo,
  RwfExternalAccountInfo,
  SgdBeneficiary,
  SgdExternalAccountInfo,
  SolanaWalletInfo,
  SparkWalletInfo,
  ThbBeneficiary,
  ThbExternalAccountInfo,
  TronWalletInfo,
  TzsExternalAccountInfo,
  UgxExternalAccountInfo,
  UsdBeneficiary,
  UsdExternalAccountInfo,
  VndBeneficiary,
  VndExternalAccountInfo,
  XafExternalAccountInfo,
  XofExternalAccountInfo,
  ZarExternalAccountInfo,
  ZmwExternalAccountInfo,
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
   *   CreateCustomerRequest: { customerType: 'INDIVIDUAL' },
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

export interface BusinessCustomerFields {
  customerType: 'BUSINESS';

  address?: ExternalAccountsAPI.Address;

  /**
   * Additional information for business entities
   */
  businessInfo?: BusinessCustomerFields.BusinessInfo;

  /**
   * The current KYB status of a business customer
   */
  kybStatus?: 'UNVERIFIED' | 'PENDING' | 'APPROVED' | 'REJECTED';
}

export namespace BusinessCustomerFields {
  /**
   * Additional information for business entities
   */
  export interface BusinessInfo {
    /**
     * The high-level industry category of the business
     */
    businessType?:
      | 'AGRICULTURE_FORESTRY_FISHING_AND_HUNTING'
      | 'MINING_QUARRYING_AND_OIL_AND_GAS_EXTRACTION'
      | 'UTILITIES'
      | 'CONSTRUCTION'
      | 'MANUFACTURING'
      | 'WHOLESALE_TRADE'
      | 'RETAIL_TRADE'
      | 'TRANSPORTATION_AND_WAREHOUSING'
      | 'INFORMATION'
      | 'FINANCE_AND_INSURANCE'
      | 'REAL_ESTATE_AND_RENTAL_AND_LEASING'
      | 'PROFESSIONAL_SCIENTIFIC_AND_TECHNICAL_SERVICES'
      | 'MANAGEMENT_OF_COMPANIES_AND_ENTERPRISES'
      | 'ADMINISTRATIVE_AND_SUPPORT_AND_WASTE_MANAGEMENT_AND_REMEDIATION_SERVICES'
      | 'EDUCATIONAL_SERVICES'
      | 'HEALTH_CARE_AND_SOCIAL_ASSISTANCE'
      | 'ARTS_ENTERTAINMENT_AND_RECREATION'
      | 'ACCOMMODATION_AND_FOOD_SERVICES'
      | 'OTHER_SERVICES'
      | 'PUBLIC_ADMINISTRATION';

    /**
     * List of countries where the business operates (ISO 3166-1 alpha-2)
     */
    countriesOfOperation?: Array<string>;

    /**
     * Country of incorporation or registration (ISO 3166-1 alpha-2)
     */
    country?: string;

    /**
     * Trade name or DBA name of the business, if different from the legal name
     */
    doingBusinessAs?: string;

    /**
     * Legal entity type of the business
     */
    entityType?:
      | 'SOLE_PROPRIETORSHIP'
      | 'PARTNERSHIP'
      | 'LLC'
      | 'CORPORATION'
      | 'S_CORPORATION'
      | 'NON_PROFIT'
      | 'OTHER';

    /**
     * Expected number of transactions per month
     */
    expectedMonthlyTransactionCount?:
      | 'COUNT_UNDER_10'
      | 'COUNT_10_TO_100'
      | 'COUNT_100_TO_500'
      | 'COUNT_500_TO_1000'
      | 'COUNT_OVER_1000';

    /**
     * Expected total transaction volume per month in USD equivalent
     */
    expectedMonthlyTransactionVolume?:
      | 'VOLUME_UNDER_10K'
      | 'VOLUME_10K_TO_100K'
      | 'VOLUME_100K_TO_1M'
      | 'VOLUME_1M_TO_10M'
      | 'VOLUME_OVER_10M';

    /**
     * List of countries where the business expects to send payments (ISO 3166-1
     * alpha-2)
     */
    expectedRecipientJurisdictions?: Array<string>;

    /**
     * Date of incorporation in ISO 8601 format (YYYY-MM-DD)
     */
    incorporatedOn?: string;

    /**
     * Legal name of the business
     */
    legalName?: string;

    /**
     * The intended purpose for using the Grid account
     */
    purposeOfAccount?:
      | 'CONTRACTOR_PAYOUTS'
      | 'CREATOR_PAYOUTS'
      | 'EMPLOYEE_PAYOUTS'
      | 'MARKETPLACE_SELLER_PAYOUTS'
      | 'SUPPLIER_PAYMENTS'
      | 'CROSS_BORDER_B2B'
      | 'AR_AUTOMATION'
      | 'AP_AUTOMATION'
      | 'EMBEDDED_PAYMENTS'
      | 'PLATFORM_FEE_COLLECTION'
      | 'P2P_TRANSFERS'
      | 'CHARITABLE_DONATIONS'
      | 'OTHER';

    /**
     * Business registration number
     */
    registrationNumber?: string;

    /**
     * The primary source of funds for the business
     */
    sourceOfFunds?: string;

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
   * The high-level industry category of the business
   */
  businessType?:
    | 'AGRICULTURE_FORESTRY_FISHING_AND_HUNTING'
    | 'MINING_QUARRYING_AND_OIL_AND_GAS_EXTRACTION'
    | 'UTILITIES'
    | 'CONSTRUCTION'
    | 'MANUFACTURING'
    | 'WHOLESALE_TRADE'
    | 'RETAIL_TRADE'
    | 'TRANSPORTATION_AND_WAREHOUSING'
    | 'INFORMATION'
    | 'FINANCE_AND_INSURANCE'
    | 'REAL_ESTATE_AND_RENTAL_AND_LEASING'
    | 'PROFESSIONAL_SCIENTIFIC_AND_TECHNICAL_SERVICES'
    | 'MANAGEMENT_OF_COMPANIES_AND_ENTERPRISES'
    | 'ADMINISTRATIVE_AND_SUPPORT_AND_WASTE_MANAGEMENT_AND_REMEDIATION_SERVICES'
    | 'EDUCATIONAL_SERVICES'
    | 'HEALTH_CARE_AND_SOCIAL_ASSISTANCE'
    | 'ARTS_ENTERTAINMENT_AND_RECREATION'
    | 'ACCOMMODATION_AND_FOOD_SERVICES'
    | 'OTHER_SERVICES'
    | 'PUBLIC_ADMINISTRATION';

  /**
   * List of countries where the business operates (ISO 3166-1 alpha-2)
   */
  countriesOfOperation?: Array<string>;

  /**
   * Country of incorporation or registration (ISO 3166-1 alpha-2)
   */
  country?: string;

  /**
   * Trade name or DBA name of the business, if different from the legal name
   */
  doingBusinessAs?: string;

  /**
   * Legal entity type of the business
   */
  entityType?:
    | 'SOLE_PROPRIETORSHIP'
    | 'PARTNERSHIP'
    | 'LLC'
    | 'CORPORATION'
    | 'S_CORPORATION'
    | 'NON_PROFIT'
    | 'OTHER';

  /**
   * Expected number of transactions per month
   */
  expectedMonthlyTransactionCount?:
    | 'COUNT_UNDER_10'
    | 'COUNT_10_TO_100'
    | 'COUNT_100_TO_500'
    | 'COUNT_500_TO_1000'
    | 'COUNT_OVER_1000';

  /**
   * Expected total transaction volume per month in USD equivalent
   */
  expectedMonthlyTransactionVolume?:
    | 'VOLUME_UNDER_10K'
    | 'VOLUME_10K_TO_100K'
    | 'VOLUME_100K_TO_1M'
    | 'VOLUME_1M_TO_10M'
    | 'VOLUME_OVER_10M';

  /**
   * List of countries where the business expects to send payments (ISO 3166-1
   * alpha-2)
   */
  expectedRecipientJurisdictions?: Array<string>;

  /**
   * Date of incorporation in ISO 8601 format (YYYY-MM-DD)
   */
  incorporatedOn?: string;

  /**
   * The intended purpose for using the Grid account
   */
  purposeOfAccount?:
    | 'CONTRACTOR_PAYOUTS'
    | 'CREATOR_PAYOUTS'
    | 'EMPLOYEE_PAYOUTS'
    | 'MARKETPLACE_SELLER_PAYOUTS'
    | 'SUPPLIER_PAYMENTS'
    | 'CROSS_BORDER_B2B'
    | 'AR_AUTOMATION'
    | 'AP_AUTOMATION'
    | 'EMBEDDED_PAYMENTS'
    | 'PLATFORM_FEE_COLLECTION'
    | 'P2P_TRANSFERS'
    | 'CHARITABLE_DONATIONS'
    | 'OTHER';

  /**
   * Business registration number
   */
  registrationNumber?: string;

  /**
   * The primary source of funds for the business
   */
  sourceOfFunds?: string;

  /**
   * Tax identification number
   */
  taxId?: string;
}

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
   * List of currency codes enabled for this customer.
   */
  currencies?: Array<string>;

  /**
   * Email address for the customer.
   */
  email?: string;

  /**
   * Whether the customer is marked as deleted
   */
  isDeleted?: boolean;

  /**
   * Country code (ISO 3166-1 alpha-2) representing the customer's regional identity
   * and regulatory jurisdiction.
   */
  region?: string;

  /**
   * Last update timestamp
   */
  updatedAt?: string;
}

export interface CustomerCreate {
  /**
   * List of currency codes the customer will use (ISO 4217 for fiat, e.g. "USD",
   * "EUR"; tickers for crypto, e.g. "BTC", "USDC"). Required if the customer will
   * use more than one sending currency, since the correct currencies cannot always
   * be inferred. If not provided, currencies will be inferred from the customer's
   * region. Some currency combinations may require separate customers — if so, the
   * request will be rejected with details.
   */
  currencies?: Array<string>;

  /**
   * Email address for the customer.
   */
  email?: string;

  /**
   * Platform-specific customer identifier. If not provided, one will be generated by
   * the system.
   */
  platformCustomerId?: string;

  /**
   * Country code (ISO 3166-1 alpha-2) representing the customer's regional identity.
   * This determines the regulatory jurisdiction and KYC requirements for the
   * customer. Required if the customer will use currencies with different KYC
   * requirements across regions. A customer with accounts in multiple regions should
   * be registered as separate customers. This field is immutable after creation.
   */
  region?: string;

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
  export interface IndividualCustomer extends CustomersAPI.Customer, CustomersAPI.IndividualCustomerFields {}

  export interface BusinessCustomer
    extends CustomersAPI.Customer,
      Omit<CustomersAPI.BusinessCustomerFields, 'businessInfo'> {
    beneficialOwners?: Array<BusinessCustomer.BeneficialOwner>;

    /**
     * Additional information required for business entities
     */
    businessInfo?: CustomersAPI.BusinessInfo;
  }

  export namespace BusinessCustomer {
    export interface BeneficialOwner {
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

      personalInfo: BeneficialOwnersAPI.BeneficialOwnerPersonalInfo;

      /**
       * Roles of this person within the business
       */
      roles: Array<'UBO' | 'DIRECTOR' | 'COMPANY_OFFICER' | 'CONTROL_PERSON' | 'TRUSTEE' | 'GENERAL_PARTNER'>;

      /**
       * When this beneficial owner was last updated
       */
      updatedAt?: string;
    }
  }
}

/**
 * Whether the customer is an individual or a business entity
 */
export type CustomerType = 'INDIVIDUAL' | 'BUSINESS';

export interface CustomerUpdate {
  /**
   * Updated list of currency codes the customer will use (ISO 4217 for fiat, e.g.
   * "USD", "EUR"; tickers for crypto, e.g. "BTC", "USDC"). Replaces the existing
   * list. Some currency combinations may require separate customers — if so, the
   * request will be rejected with details.
   */
  currencies?: Array<string>;

  /**
   * Email address for the customer.
   */
  email?: string;

  /**
   * Optional UMA address identifier. If provided, the customer's UMA address will be
   * updated. This is an optional identifier to route payments to the customer.
   */
  umaAddress?: string;
}

export interface IndividualCustomerFields {
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
   * The current KYC status of a customer
   */
  kycStatus?: 'UNVERIFIED' | 'PENDING' | 'APPROVED' | 'REJECTED';

  /**
   * Country code (ISO 3166-1 alpha-2)
   */
  nationality?: string;
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
   * Filter by currency code. Returns customers that have this currency in their
   * enabled currencies list.
   */
  currency?: string;

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
   * Filter by customer region (ISO 3166-1 alpha-2 country code)
   */
  region?: string;

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
    type BusinessCustomerFields as BusinessCustomerFields,
    type BusinessInfo as BusinessInfo,
    type Customer as Customer,
    type CustomerCreate as CustomerCreate,
    type CustomerOneOf as CustomerOneOf,
    type CustomerType as CustomerType,
    type CustomerUpdate as CustomerUpdate,
    type IndividualCustomerFields as IndividualCustomerFields,
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
    type AedExternalAccountInfo as AedExternalAccountInfo,
    type BaseWalletInfo as BaseWalletInfo,
    type BdtExternalAccountInfo as BdtExternalAccountInfo,
    type BeneficiaryVerifiedData as BeneficiaryVerifiedData,
    type BrlBeneficiary as BrlBeneficiary,
    type BrlExternalAccountInfo as BrlExternalAccountInfo,
    type BusinessBeneficiary as BusinessBeneficiary,
    type BwpExternalAccountInfo as BwpExternalAccountInfo,
    type CadExternalAccountInfo as CadExternalAccountInfo,
    type CopExternalAccountInfo as CopExternalAccountInfo,
    type DkkBeneficiary as DkkBeneficiary,
    type DkkExternalAccountInfo as DkkExternalAccountInfo,
    type EgpExternalAccountInfo as EgpExternalAccountInfo,
    type EurExternalAccountInfo as EurExternalAccountInfo,
    type ExternalAccount as ExternalAccount,
    type ExternalAccountCreate as ExternalAccountCreate,
    type ExternalAccountInfoOneOf as ExternalAccountInfoOneOf,
    type GbpBeneficiary as GbpBeneficiary,
    type GbpExternalAccountInfo as GbpExternalAccountInfo,
    type GhsExternalAccountInfo as GhsExternalAccountInfo,
    type GtqExternalAccountInfo as GtqExternalAccountInfo,
    type HkdBeneficiary as HkdBeneficiary,
    type HkdExternalAccountInfo as HkdExternalAccountInfo,
    type HtgExternalAccountInfo as HtgExternalAccountInfo,
    type IdrBeneficiary as IdrBeneficiary,
    type IdrExternalAccountInfo as IdrExternalAccountInfo,
    type InrBeneficiary as InrBeneficiary,
    type InrExternalAccountInfo as InrExternalAccountInfo,
    type JmdExternalAccountInfo as JmdExternalAccountInfo,
    type KesExternalAccountInfo as KesExternalAccountInfo,
    type LightningWalletInfo as LightningWalletInfo,
    type MwkExternalAccountInfo as MwkExternalAccountInfo,
    type MxnBeneficiary as MxnBeneficiary,
    type MxnExternalAccountInfo as MxnExternalAccountInfo,
    type MyrBeneficiary as MyrBeneficiary,
    type MyrExternalAccountInfo as MyrExternalAccountInfo,
    type NgnExternalAccountInfo as NgnExternalAccountInfo,
    type PhpBeneficiary as PhpBeneficiary,
    type PhpExternalAccountInfo as PhpExternalAccountInfo,
    type PkrExternalAccountInfo as PkrExternalAccountInfo,
    type PolygonWalletInfo as PolygonWalletInfo,
    type RwfExternalAccountInfo as RwfExternalAccountInfo,
    type SgdBeneficiary as SgdBeneficiary,
    type SgdExternalAccountInfo as SgdExternalAccountInfo,
    type SolanaWalletInfo as SolanaWalletInfo,
    type SparkWalletInfo as SparkWalletInfo,
    type ThbBeneficiary as ThbBeneficiary,
    type ThbExternalAccountInfo as ThbExternalAccountInfo,
    type TronWalletInfo as TronWalletInfo,
    type TzsExternalAccountInfo as TzsExternalAccountInfo,
    type UgxExternalAccountInfo as UgxExternalAccountInfo,
    type UsdBeneficiary as UsdBeneficiary,
    type UsdExternalAccountInfo as UsdExternalAccountInfo,
    type VndBeneficiary as VndBeneficiary,
    type VndExternalAccountInfo as VndExternalAccountInfo,
    type XafExternalAccountInfo as XafExternalAccountInfo,
    type XofExternalAccountInfo as XofExternalAccountInfo,
    type ZarExternalAccountInfo as ZarExternalAccountInfo,
    type ZmwExternalAccountInfo as ZmwExternalAccountInfo,
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
