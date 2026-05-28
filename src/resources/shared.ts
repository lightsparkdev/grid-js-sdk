// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import * as Shared from './shared';
import * as BeneficialOwnersAPI from './beneficial-owners';
import * as ExternalAccountsAPI from './customers/external-accounts';
import { DefaultPagination } from '../core/pagination';

export interface AedBeneficiary {
  address: ExternalAccountsAPI.Address;

  beneficiaryType: 'INDIVIDUAL';

  /**
   * The full name of the beneficiary
   */
  fullName: string;

  /**
   * The birth date of the beneficiary
   */
  birthDate?: string;

  /**
   * The country of residence of the beneficiary
   */
  countryOfResidence?: string;

  /**
   * The email of the beneficiary
   */
  email?: string;

  /**
   * The nationality of the beneficiary
   */
  nationality?: string;

  /**
   * The phone number of the beneficiary
   */
  phoneNumber?: string;
}

export interface AedExternalAccountCreateInfo {
  accountType: 'AED_ACCOUNT';

  beneficiary: AedBeneficiary | ExternalAccountsAPI.BusinessBeneficiary;

  /**
   * UAE IBAN (23 characters, starting with AE)
   */
  iban: string;

  /**
   * The SWIFT/BIC code of the bank
   */
  swiftCode?: string;
}

/**
 * Details of a transfer-type agent action (TRANSFER_OUT or TRANSFER_IN).
 */
export interface AgentTransferDetails {
  /**
   * Transfer amount in the smallest unit of the specified currency.
   */
  amount: number;

  /**
   * ISO 4217 currency code for the transfer amount.
   */
  currency: string;

  /**
   * ID of the destination account (internal or external).
   */
  destinationAccountId: string;

  /**
   * ID of the source account (internal or external).
   */
  sourceAccountId: string;
}

export interface BdtBeneficiary {
  beneficiaryType: 'INDIVIDUAL';

  /**
   * The full name of the beneficiary
   */
  fullName: string;

  address?: ExternalAccountsAPI.Address;

  /**
   * The birth date of the beneficiary
   */
  birthDate?: string;

  /**
   * The country of residence of the beneficiary
   */
  countryOfResidence?: string;

  /**
   * The email of the beneficiary
   */
  email?: string;

  /**
   * The nationality of the beneficiary
   */
  nationality?: string;

  /**
   * The phone number of the beneficiary
   */
  phoneNumber?: string;
}

/**
 * Required fields depend on the selected paymentRails:
 *
 * - BANK_TRANSFER: accountNumber
 * - MOBILE_MONEY: phoneNumber
 */
export interface BdtExternalAccountCreateInfo {
  accountType: 'BDT_ACCOUNT';

  beneficiary: BdtBeneficiary | ExternalAccountsAPI.BusinessBeneficiary;

  /**
   * The account number of the bank
   */
  accountNumber?: string;

  /**
   * The branch code
   */
  branchCode?: string;

  /**
   * The phone number in international format
   */
  phoneNumber?: string;

  /**
   * The SWIFT/BIC code of the bank
   */
  swiftCode?: string;
}

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

export interface BrlExternalAccountCreateInfo {
  accountType: 'BRL_ACCOUNT';

  beneficiary: ExternalAccountsAPI.BrlBeneficiary | ExternalAccountsAPI.BusinessBeneficiary;

  /**
   * The PIX key (email, phone, CPF, CNPJ, or random)
   */
  pixKey: string;

  /**
   * The type of PIX key
   */
  pixKeyType: 'CPF' | 'CNPJ' | 'EMAIL' | 'PHONE' | 'RANDOM';

  /**
   * The tax ID (CPF or CNPJ)
   */
  taxId: string;
}

/**
 * Error information for a failed bulk import entry
 */
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

export interface BusinessCustomer {
  customerType: 'BUSINESS';

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

  address?: ExternalAccountsAPI.Address;

  beneficialOwners?: Array<BeneficialOwner>;

  /**
   * Additional information for business entities
   */
  businessInfo?: BusinessCustomer.BusinessInfo;

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
   * The current KYB status of a business customer
   */
  kybStatus?: 'UNVERIFIED' | 'PENDING' | 'APPROVED' | 'REJECTED';

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

export namespace BusinessCustomer {
  /**
   * Additional information for business entities
   */
  export interface BusinessInfo extends Shared.BusinessInfoUpdate {
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
}

/**
 * Additional information for business entities
 */
export interface BusinessInfoUpdate {
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

export interface BwpBeneficiary {
  beneficiaryType: 'INDIVIDUAL';

  /**
   * The full name of the beneficiary
   */
  fullName: string;

  address?: ExternalAccountsAPI.Address;

  /**
   * The birth date of the beneficiary
   */
  birthDate?: string;

  /**
   * The country of residence of the beneficiary
   */
  countryOfResidence?: string;

  /**
   * The email of the beneficiary
   */
  email?: string;

  /**
   * The nationality of the beneficiary
   */
  nationality?: string;

  /**
   * The phone number of the beneficiary
   */
  phoneNumber?: string;
}

export interface BwpExternalAccountCreateInfo {
  accountType: 'BWP_ACCOUNT';

  beneficiary: BwpBeneficiary | ExternalAccountsAPI.BusinessBeneficiary;

  /**
   * The phone number in international format
   */
  phoneNumber: string;

  /**
   * The mobile money provider name
   */
  provider: string;
}

export interface CadBeneficiary {
  beneficiaryType: 'INDIVIDUAL';

  /**
   * The full name of the beneficiary
   */
  fullName: string;

  address?: ExternalAccountsAPI.Address;

  /**
   * The birth date of the beneficiary
   */
  birthDate?: string;

  /**
   * The country of residence of the beneficiary
   */
  countryOfResidence?: string;

  /**
   * The email of the beneficiary
   */
  email?: string;

  /**
   * The nationality of the beneficiary
   */
  nationality?: string;

  /**
   * The phone number of the beneficiary
   */
  phoneNumber?: string;

  /**
   * The registration number of the beneficiary
   */
  registrationNumber?: string;
}

export interface CadExternalAccountCreateInfo {
  /**
   * Bank account number (7-12 digits)
   */
  accountNumber: string;

  accountType: 'CAD_ACCOUNT';

  /**
   * Canadian financial institution number (3 digits)
   */
  bankCode: string;

  beneficiary: CadBeneficiary | ExternalAccountsAPI.BusinessBeneficiary;

  /**
   * Transit number identifying the branch (5 digits)
   */
  branchCode: string;
}

export interface CopBeneficiary {
  beneficiaryType: 'INDIVIDUAL';

  /**
   * The full name of the beneficiary
   */
  fullName: string;

  address?: ExternalAccountsAPI.Address;

  /**
   * The birth date of the beneficiary
   */
  birthDate?: string;

  /**
   * The country of residence of the beneficiary
   */
  countryOfResidence?: string;

  /**
   * Identity document number — required by most Colombian banks
   */
  documentNumber?: string;

  /**
   * Identity document type — required by most Colombian banks. CC: Cédula de
   * Ciudadanía, CE: Cédula de Extranjería, TI: Tarjeta de Identidad, NIT: Número de
   * Identificación Tributaria, PP: Passport
   */
  documentType?: 'CC' | 'CE' | 'TI' | 'NIT' | 'PP';

  /**
   * The email of the beneficiary
   */
  email?: string;

  /**
   * The nationality of the beneficiary
   */
  nationality?: string;

  /**
   * The phone number of the beneficiary
   */
  phoneNumber?: string;
}

/**
 * Required fields depend on the selected paymentRails:
 *
 * - BANK_TRANSFER: bankName, accountNumber, bankAccountType
 * - MOBILE_MONEY: phoneNumber
 */
export interface CopExternalAccountCreateInfo {
  accountType: 'COP_ACCOUNT';

  beneficiary: CopBeneficiary | ExternalAccountsAPI.BusinessBeneficiary;

  /**
   * The account number of the bank (BANK_TRANSFER only)
   */
  accountNumber?: string;

  /**
   * The bank account type (BANK_TRANSFER only)
   */
  bankAccountType?: 'CHECKING' | 'SAVINGS';

  /**
   * The name of the bank (BANK_TRANSFER only)
   */
  bankName?: string;

  /**
   * The phone number in international format (MOBILE_MONEY only — Nequi, Daviplata)
   */
  phoneNumber?: string;
}

export interface DkkExternalAccountCreateInfo {
  accountType: 'DKK_ACCOUNT';

  beneficiary: ExternalAccountsAPI.DkkBeneficiary | ExternalAccountsAPI.BusinessBeneficiary;

  /**
   * Danish IBAN (18 characters, starting with DK)
   */
  iban: string;

  /**
   * The SWIFT/BIC code of the bank
   */
  swiftCode?: string;
}

export interface EgpBeneficiary {
  address: ExternalAccountsAPI.Address;

  beneficiaryType: 'INDIVIDUAL';

  /**
   * The country of residence of the beneficiary
   */
  countryOfResidence: string;

  /**
   * The full name of the beneficiary
   */
  fullName: string;

  /**
   * The phone number of the beneficiary
   */
  phoneNumber: string;

  /**
   * The birth date of the beneficiary
   */
  birthDate?: string;

  /**
   * The email of the beneficiary
   */
  email?: string;

  /**
   * The nationality of the beneficiary
   */
  nationality?: string;
}

export interface EgpExternalAccountCreateInfo {
  /**
   * The account number of the bank
   */
  accountNumber: string;

  accountType: 'EGP_ACCOUNT';

  /**
   * The name of the bank
   */
  bankName: string;

  beneficiary: EgpBeneficiary | ExternalAccountsAPI.BusinessBeneficiary;

  /**
   * Egyptian IBAN (29 characters, starting with EG)
   */
  iban?: string;

  /**
   * The SWIFT/BIC code of the bank
   */
  swiftCode?: string;
}

export type EthereumWalletExternalAccountInfo = unknown;

export interface EurBeneficiary {
  address: ExternalAccountsAPI.Address;

  beneficiaryType: 'INDIVIDUAL';

  /**
   * The full name of the beneficiary
   */
  fullName: string;

  /**
   * The birth date of the beneficiary
   */
  birthDate?: string;

  /**
   * The country of residence of the beneficiary
   */
  countryOfResidence?: string;

  /**
   * The email of the beneficiary
   */
  email?: string;

  /**
   * The nationality of the beneficiary
   */
  nationality?: string;

  /**
   * The phone number of the beneficiary
   */
  phoneNumber?: string;
}

export interface EurExternalAccountCreateInfo {
  accountType: 'EUR_ACCOUNT';

  beneficiary: EurBeneficiary | ExternalAccountsAPI.BusinessBeneficiary;

  /**
   * The IBAN of the bank account
   */
  iban: string;

  /**
   * The SWIFT/BIC code of the bank
   */
  swiftCode?: string;
}

export interface GbpExternalAccountCreateInfo {
  /**
   * UK bank account number (8 digits)
   */
  accountNumber: string;

  accountType: 'GBP_ACCOUNT';

  beneficiary: ExternalAccountsAPI.GbpBeneficiary | ExternalAccountsAPI.BusinessBeneficiary;

  /**
   * The UK sort code
   */
  sortCode: string;
}

export interface GhsBeneficiary {
  beneficiaryType: 'INDIVIDUAL';

  /**
   * The full name of the beneficiary
   */
  fullName: string;

  address?: ExternalAccountsAPI.Address;

  /**
   * The birth date of the beneficiary
   */
  birthDate?: string;

  /**
   * The country of residence of the beneficiary
   */
  countryOfResidence?: string;

  /**
   * The email of the beneficiary
   */
  email?: string;

  /**
   * The nationality of the beneficiary
   */
  nationality?: string;

  /**
   * The phone number of the beneficiary
   */
  phoneNumber?: string;
}

/**
 * Required fields depend on the selected paymentRails:
 *
 * - BANK_TRANSFER: accountNumber
 * - MOBILE_MONEY: phoneNumber
 */
export interface GhsExternalAccountCreateInfo {
  accountType: 'GHS_ACCOUNT';

  beneficiary: GhsBeneficiary | ExternalAccountsAPI.BusinessBeneficiary;

  /**
   * The account number of the bank
   */
  accountNumber?: string;

  /**
   * The phone number in international format
   */
  phoneNumber?: string;
}

export interface GtqBeneficiary {
  beneficiaryType: 'INDIVIDUAL';

  /**
   * The country of residence of the beneficiary
   */
  countryOfResidence: string;

  /**
   * The full name of the beneficiary
   */
  fullName: string;

  /**
   * The phone number of the beneficiary
   */
  phoneNumber: string;

  address?: ExternalAccountsAPI.Address;

  /**
   * The birth date of the beneficiary
   */
  birthDate?: string;

  /**
   * The email of the beneficiary
   */
  email?: string;

  /**
   * The nationality of the beneficiary
   */
  nationality?: string;
}

export interface GtqExternalAccountCreateInfo {
  /**
   * The account number of the bank
   */
  accountNumber: string;

  accountType: 'GTQ_ACCOUNT';

  /**
   * The bank account type
   */
  bankAccountType: 'CHECKING' | 'SAVINGS';

  beneficiary: GtqBeneficiary | ExternalAccountsAPI.BusinessBeneficiary;
}

export interface HkdExternalAccountCreateInfo {
  /**
   * Hong Kong bank account number
   */
  accountNumber: string;

  accountType: 'HKD_ACCOUNT';

  /**
   * The name of the bank
   */
  bankName: string;

  beneficiary: ExternalAccountsAPI.HkdBeneficiary | ExternalAccountsAPI.BusinessBeneficiary;

  /**
   * The SWIFT/BIC code of the bank
   */
  swiftCode: string;
}

export interface HtgBeneficiary {
  beneficiaryType: 'INDIVIDUAL';

  /**
   * The full name of the beneficiary
   */
  fullName: string;

  address?: ExternalAccountsAPI.Address;

  /**
   * The birth date of the beneficiary
   */
  birthDate?: string;

  /**
   * The country of residence of the beneficiary
   */
  countryOfResidence?: string;

  /**
   * The email of the beneficiary
   */
  email?: string;

  /**
   * The nationality of the beneficiary
   */
  nationality?: string;

  /**
   * The phone number of the beneficiary
   */
  phoneNumber?: string;
}

export interface HtgExternalAccountCreateInfo {
  accountType: 'HTG_ACCOUNT';

  beneficiary: HtgBeneficiary | ExternalAccountsAPI.BusinessBeneficiary;

  /**
   * The phone number in international format
   */
  phoneNumber: string;
}

export interface IdrExternalAccountCreateInfo {
  /**
   * Indonesian bank account number
   */
  accountNumber: string;

  accountType: 'IDR_ACCOUNT';

  /**
   * The name of the bank
   */
  bankName: string;

  beneficiary: ExternalAccountsAPI.IdrBeneficiary | ExternalAccountsAPI.BusinessBeneficiary;

  /**
   * Indonesian phone number for e-wallet payments
   */
  phoneNumber: string;

  /**
   * The SWIFT/BIC code of the bank
   */
  swiftCode: string;
}

export interface IndividualCustomer {
  customerType: 'INDIVIDUAL';

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

  address?: ExternalAccountsAPI.Address;

  /**
   * Date of birth in ISO 8601 format (YYYY-MM-DD)
   */
  birthDate?: string;

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
   * Individual's full name
   */
  fullName?: string;

  /**
   * Whether the customer is marked as deleted
   */
  isDeleted?: boolean;

  /**
   * The current KYC status of a customer
   */
  kycStatus?: 'UNVERIFIED' | 'PENDING' | 'APPROVED' | 'REJECTED';

  /**
   * Country code (ISO 3166-1 alpha-2)
   */
  nationality?: string;

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

export interface InrExternalAccountCreateInfo {
  accountType: 'INR_ACCOUNT';

  beneficiary: ExternalAccountsAPI.InrBeneficiary | ExternalAccountsAPI.BusinessBeneficiary;

  /**
   * The UPI Virtual Payment Address
   */
  vpa: string;
}

export interface JmdBeneficiary {
  address: ExternalAccountsAPI.Address;

  beneficiaryType: 'INDIVIDUAL';

  /**
   * The full name of the beneficiary
   */
  fullName: string;

  /**
   * The phone number of the beneficiary
   */
  phoneNumber: string;

  /**
   * The birth date of the beneficiary
   */
  birthDate?: string;

  /**
   * The country of residence of the beneficiary
   */
  countryOfResidence?: string;

  /**
   * The email of the beneficiary
   */
  email?: string;

  /**
   * The nationality of the beneficiary
   */
  nationality?: string;
}

export interface JmdExternalAccountCreateInfo {
  /**
   * The account number of the bank
   */
  accountNumber: string;

  accountType: 'JMD_ACCOUNT';

  /**
   * The bank account type
   */
  bankAccountType: 'CHECKING' | 'SAVINGS';

  beneficiary: JmdBeneficiary | ExternalAccountsAPI.BusinessBeneficiary;

  /**
   * The branch code
   */
  branchCode: string;
}

export interface KesBeneficiary {
  beneficiaryType: 'INDIVIDUAL';

  /**
   * The full name of the beneficiary
   */
  fullName: string;

  address?: ExternalAccountsAPI.Address;

  /**
   * The birth date of the beneficiary
   */
  birthDate?: string;

  /**
   * The country of residence of the beneficiary
   */
  countryOfResidence?: string;

  /**
   * The email of the beneficiary
   */
  email?: string;

  /**
   * The nationality of the beneficiary
   */
  nationality?: string;

  /**
   * The phone number of the beneficiary
   */
  phoneNumber?: string;
}

export interface KesExternalAccountCreateInfo {
  accountType: 'KES_ACCOUNT';

  beneficiary: KesBeneficiary | ExternalAccountsAPI.BusinessBeneficiary;

  /**
   * Kenyan mobile money phone number
   */
  phoneNumber: string;

  /**
   * The mobile money provider name
   */
  provider: string;
}

export interface MwkBeneficiary {
  beneficiaryType: 'INDIVIDUAL';

  /**
   * The full name of the beneficiary
   */
  fullName: string;

  address?: ExternalAccountsAPI.Address;

  /**
   * The birth date of the beneficiary
   */
  birthDate?: string;

  /**
   * The country of residence of the beneficiary
   */
  countryOfResidence?: string;

  /**
   * The email of the beneficiary
   */
  email?: string;

  /**
   * The nationality of the beneficiary
   */
  nationality?: string;

  /**
   * The phone number of the beneficiary
   */
  phoneNumber?: string;
}

export interface MwkExternalAccountCreateInfo {
  accountType: 'MWK_ACCOUNT';

  beneficiary: MwkBeneficiary | ExternalAccountsAPI.BusinessBeneficiary;

  /**
   * The phone number in international format
   */
  phoneNumber: string;

  /**
   * The mobile money provider name
   */
  provider: string;
}

export interface MxnExternalAccountCreateInfo {
  accountType: 'MXN_ACCOUNT';

  beneficiary: ExternalAccountsAPI.MxnBeneficiary | ExternalAccountsAPI.BusinessBeneficiary;

  /**
   * The CLABE number of the bank
   */
  clabeNumber: string;
}

export interface MyrExternalAccountCreateInfo {
  /**
   * Malaysian bank account number
   */
  accountNumber: string;

  accountType: 'MYR_ACCOUNT';

  /**
   * The name of the bank
   */
  bankName: string;

  beneficiary: ExternalAccountsAPI.MyrBeneficiary | ExternalAccountsAPI.BusinessBeneficiary;

  /**
   * The SWIFT/BIC code of the bank
   */
  swiftCode: string;
}

export interface NgnBeneficiary {
  beneficiaryType: 'INDIVIDUAL';

  /**
   * The full name of the beneficiary
   */
  fullName: string;

  address?: ExternalAccountsAPI.Address;

  /**
   * The birth date of the beneficiary
   */
  birthDate?: string;

  /**
   * The country of residence of the beneficiary
   */
  countryOfResidence?: string;

  /**
   * The email of the beneficiary
   */
  email?: string;

  /**
   * The nationality of the beneficiary
   */
  nationality?: string;

  /**
   * The phone number of the beneficiary
   */
  phoneNumber?: string;
}

export interface NgnExternalAccountCreateInfo {
  /**
   * Nigerian bank account number
   */
  accountNumber: string;

  accountType: 'NGN_ACCOUNT';

  /**
   * The name of the bank
   */
  bankName: string;

  beneficiary: NgnBeneficiary | ExternalAccountsAPI.BusinessBeneficiary;
}

export interface PhpExternalAccountCreateInfo {
  /**
   * Bank account number
   */
  accountNumber: string;

  accountType: 'PHP_ACCOUNT';

  /**
   * Name of the beneficiary's bank
   */
  bankName: string;

  beneficiary: ExternalAccountsAPI.PhpBeneficiary | ExternalAccountsAPI.BusinessBeneficiary;
}

export interface PkrBeneficiary {
  beneficiaryType: 'INDIVIDUAL';

  /**
   * The full name of the beneficiary
   */
  fullName: string;

  address?: ExternalAccountsAPI.Address;

  /**
   * The birth date of the beneficiary
   */
  birthDate?: string;

  /**
   * The country of residence of the beneficiary
   */
  countryOfResidence?: string;

  /**
   * The email of the beneficiary
   */
  email?: string;

  /**
   * The nationality of the beneficiary
   */
  nationality?: string;

  /**
   * The phone number of the beneficiary
   */
  phoneNumber?: string;
}

/**
 * Required fields depend on the selected paymentRails:
 *
 * - BANK_TRANSFER: accountNumber
 * - MOBILE_MONEY: bankName, phoneNumber
 */
export interface PkrExternalAccountCreateInfo {
  accountType: 'PKR_ACCOUNT';

  beneficiary: PkrBeneficiary | ExternalAccountsAPI.BusinessBeneficiary;

  /**
   * The account number of the bank
   */
  accountNumber?: string;

  /**
   * The name of the bank
   */
  bankName?: string;

  /**
   * Pakistani IBAN (24 characters, starting with PK)
   */
  iban?: string;

  /**
   * The phone number in international format
   */
  phoneNumber?: string;
}

export interface RwfBeneficiary {
  beneficiaryType: 'INDIVIDUAL';

  /**
   * The full name of the beneficiary
   */
  fullName: string;

  address?: ExternalAccountsAPI.Address;

  /**
   * The birth date of the beneficiary
   */
  birthDate?: string;

  /**
   * The country of residence of the beneficiary
   */
  countryOfResidence?: string;

  /**
   * The email of the beneficiary
   */
  email?: string;

  /**
   * The nationality of the beneficiary
   */
  nationality?: string;

  /**
   * The phone number of the beneficiary
   */
  phoneNumber?: string;
}

export interface RwfExternalAccountCreateInfo {
  accountType: 'RWF_ACCOUNT';

  beneficiary: RwfBeneficiary | ExternalAccountsAPI.BusinessBeneficiary;

  /**
   * Rwandan mobile money phone number
   */
  phoneNumber: string;

  /**
   * The mobile money provider name
   */
  provider: string;
}

export interface SgdExternalAccountCreateInfo {
  /**
   * Bank account number
   */
  accountNumber: string;

  accountType: 'SGD_ACCOUNT';

  /**
   * Name of the beneficiary's bank
   */
  bankName: string;

  beneficiary: ExternalAccountsAPI.SgdBeneficiary | ExternalAccountsAPI.BusinessBeneficiary;

  /**
   * The SWIFT/BIC code of the bank
   */
  swiftCode: string;
}

export interface SlvBeneficiary {
  beneficiaryType: 'INDIVIDUAL';

  /**
   * The full name of the beneficiary
   */
  fullName: string;

  address?: ExternalAccountsAPI.Address;

  /**
   * The birth date of the beneficiary
   */
  birthDate?: string;

  /**
   * The country of residence of the beneficiary
   */
  countryOfResidence?: string;

  /**
   * The email of the beneficiary
   */
  email?: string;

  /**
   * The nationality of the beneficiary
   */
  nationality?: string;

  /**
   * The phone number of the beneficiary
   */
  phoneNumber?: string;
}

/**
 * Required fields depend on the selected paymentRails:
 *
 * - BANK_TRANSFER: bankAccountType, accountNumber
 * - MOBILE_MONEY: phoneNumber
 */
export interface SlvExternalAccountCreateInfo {
  accountType: 'SLV_ACCOUNT';

  beneficiary: SlvBeneficiary | ExternalAccountsAPI.BusinessBeneficiary;

  /**
   * The account number of the bank (BANK_TRANSFER only)
   */
  accountNumber?: string;

  /**
   * The bank account type (BANK_TRANSFER only)
   */
  bankAccountType?: 'CHECKING' | 'SAVINGS';

  /**
   * The name of the bank (BANK_TRANSFER only)
   */
  bankName?: string;

  /**
   * The phone number in international format (MOBILE_MONEY only — e.g. Tigo Money)
   */
  phoneNumber?: string;
}

export interface SwiftBeneficiary {
  beneficiaryType: 'INDIVIDUAL';

  /**
   * The full name of the beneficiary
   */
  fullName: string;

  address?: ExternalAccountsAPI.Address;

  /**
   * The birth date of the beneficiary
   */
  birthDate?: string;

  /**
   * The country of residence of the beneficiary
   */
  countryOfResidence?: string;

  /**
   * The email of the beneficiary
   */
  email?: string;

  /**
   * The nationality of the beneficiary
   */
  nationality?: string;

  /**
   * The phone number of the beneficiary
   */
  phoneNumber?: string;
}

export interface SwiftExternalAccountCreateInfo {
  accountType: 'SWIFT_ACCOUNT';

  /**
   * The name of the bank
   */
  bankName: string;

  beneficiary: SwiftBeneficiary | ExternalAccountsAPI.BusinessBeneficiary;

  /**
   * The ISO 3166-1 alpha-2 country code of the bank account
   */
  country: string;

  /**
   * The SWIFT/BIC code of the bank
   */
  swiftCode: string;

  /**
   * The bank account number. Required for most corridors. Use iban instead for
   * IBAN-only corridors (e.g. BR, GB).
   */
  accountNumber?: string;

  /**
   * The IBAN of the bank account. Required for IBAN-only corridors (e.g. BR, GB).
   * Use accountNumber for all other corridors.
   */
  iban?: string;
}

export interface ThbExternalAccountCreateInfo {
  /**
   * Thai bank account number
   */
  accountNumber: string;

  accountType: 'THB_ACCOUNT';

  /**
   * The name of the bank
   */
  bankName: string;

  beneficiary: ExternalAccountsAPI.ThbBeneficiary | ExternalAccountsAPI.BusinessBeneficiary;

  /**
   * The SWIFT/BIC code of the bank
   */
  swiftCode: string;
}

export interface TzsBeneficiary {
  beneficiaryType: 'INDIVIDUAL';

  /**
   * The full name of the beneficiary
   */
  fullName: string;

  address?: ExternalAccountsAPI.Address;

  /**
   * The birth date of the beneficiary
   */
  birthDate?: string;

  /**
   * The country of residence of the beneficiary
   */
  countryOfResidence?: string;

  /**
   * The email of the beneficiary
   */
  email?: string;

  /**
   * The nationality of the beneficiary
   */
  nationality?: string;

  /**
   * The phone number of the beneficiary
   */
  phoneNumber?: string;
}

export interface TzsExternalAccountCreateInfo {
  accountType: 'TZS_ACCOUNT';

  beneficiary: TzsBeneficiary | ExternalAccountsAPI.BusinessBeneficiary;

  /**
   * Tanzanian mobile money phone number
   */
  phoneNumber: string;

  /**
   * The mobile money provider name
   */
  provider: string;
}

export interface UgxBeneficiary {
  beneficiaryType: 'INDIVIDUAL';

  /**
   * The full name of the beneficiary
   */
  fullName: string;

  address?: ExternalAccountsAPI.Address;

  /**
   * The birth date of the beneficiary
   */
  birthDate?: string;

  /**
   * The country of residence of the beneficiary
   */
  countryOfResidence?: string;

  /**
   * The email of the beneficiary
   */
  email?: string;

  /**
   * The nationality of the beneficiary
   */
  nationality?: string;

  /**
   * The phone number of the beneficiary
   */
  phoneNumber?: string;
}

export interface UgxExternalAccountCreateInfo {
  accountType: 'UGX_ACCOUNT';

  beneficiary: UgxBeneficiary | ExternalAccountsAPI.BusinessBeneficiary;

  /**
   * The phone number in international format
   */
  phoneNumber: string;

  /**
   * The mobile money provider name
   */
  provider: string;
}

export interface UsdExternalAccountCreateInfo {
  /**
   * The account number of the bank
   */
  accountNumber: string;

  accountType: 'USD_ACCOUNT';

  beneficiary: ExternalAccountsAPI.UsdBeneficiary | ExternalAccountsAPI.BusinessBeneficiary;

  /**
   * The ABA routing number
   */
  routingNumber: string;
}

export interface VerificationError {
  /**
   * Human-readable description of the issue
   */
  reason: string;

  /**
   * ID of the resource with the issue (Customer, BeneficialOwner, or Document)
   */
  resourceId: string;

  /**
   * Type of verification error. The category-specific MISSING*\*\_DOCUMENT types
   * indicate which document category is needed. Document quality types
   * (POOR_QUALITY_DOCUMENT, SUSPECTED_FRAUD_DOCUMENT, etc.) indicate specific issues
   * with uploaded documents. APPLICANT*\* types indicate issues with the applicant
   * themselves (sanctions, fraud, criminal records).
   */
  type:
    | 'MISSING_FIELD'
    | 'INVALID_FIELD'
    | 'MISSING_LEGAL_PRESENCE_DOCUMENT'
    | 'MISSING_CONTROL_STRUCTURE_DOCUMENT'
    | 'MISSING_OWNERSHIP_STRUCTURE_DOCUMENT'
    | 'MISSING_PROOF_OF_ADDRESS_DOCUMENT'
    | 'MISSING_IDENTITY_DOCUMENT'
    | 'INVALID_DOCUMENT'
    | 'EXPIRED_DOCUMENT'
    | 'POOR_QUALITY_DOCUMENT'
    | 'SUSPECTED_FRAUD_DOCUMENT'
    | 'WRONG_DOCUMENT_TYPE'
    | 'INCOMPLETE_DOCUMENT'
    | 'UNREADABLE_DOCUMENT'
    | 'DOCUMENT_VERIFICATION_FAILED'
    | 'APPLICANT_SANCTIONED'
    | 'APPLICANT_FRAUD'
    | 'APPLICANT_CRIMINAL_RECORD'
    | 'APPLICANT_REJECTED'
    | 'MISSING_BENEFICIAL_OWNER';

  /**
   * Document types that would satisfy this requirement. The integrator can upload
   * any one of the listed types. Present when type is
   * MISSING_LEGAL_PRESENCE_DOCUMENT, MISSING_CONTROL_STRUCTURE_DOCUMENT,
   * MISSING_OWNERSHIP_STRUCTURE_DOCUMENT, MISSING_PROOF_OF_ADDRESS_DOCUMENT,
   * MISSING_IDENTITY_DOCUMENT, INVALID_DOCUMENT, or EXPIRED_DOCUMENT.
   *
   * | Error Type                           | Accepted Document Types                                                                                  |
   * | ------------------------------------ | -------------------------------------------------------------------------------------------------------- |
   * | MISSING_LEGAL_PRESENCE_DOCUMENT      | CERTIFICATE_OF_INCORPORATION, ARTICLES_OF_INCORPORATION, ARTICLES_OF_ASSOCIATION, STATE_REGISTRY_EXCERPT |
   * | MISSING_CONTROL_STRUCTURE_DOCUMENT   | DIRECTOR_REGISTRY, TRUST_AGREEMENT, STATE_COMPANY_REGISTRY, PARTNERSHIP_CONTROL_AGREEMENT                |
   * | MISSING_OWNERSHIP_STRUCTURE_DOCUMENT | SHAREHOLDER_REGISTER, TRUST_AGREEMENT, PARTNERSHIP_AGREEMENT                                             |
   * | MISSING_PROOF_OF_ADDRESS_DOCUMENT    | UTILITY_BILL, RENT_OR_LEASE_AGREEMENT, ELECTRICITY_BILL, BANK_STATEMENT, TAX_RETURN                      |
   * | MISSING_IDENTITY_DOCUMENT            | PASSPORT, DRIVERS_LICENSE, NATIONAL_ID                                                                   |
   */
  acceptedDocumentTypes?: Array<
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
    | 'OTHER'
  >;

  /**
   * Dot-notation path to the field with the issue. Present when type is
   * MISSING_FIELD or INVALID_FIELD.
   */
  field?: string;
}

export interface VndExternalAccountCreateInfo {
  /**
   * Vietnamese bank account number
   */
  accountNumber: string;

  accountType: 'VND_ACCOUNT';

  /**
   * The name of the bank
   */
  bankName: string;

  beneficiary: ExternalAccountsAPI.VndBeneficiary | ExternalAccountsAPI.BusinessBeneficiary;

  /**
   * The SWIFT/BIC code of the bank
   */
  swiftCode: string;
}

export interface XafBeneficiary {
  beneficiaryType: 'INDIVIDUAL';

  /**
   * The full name of the beneficiary
   */
  fullName: string;

  address?: ExternalAccountsAPI.Address;

  /**
   * The birth date of the beneficiary
   */
  birthDate?: string;

  /**
   * The country of residence of the beneficiary
   */
  countryOfResidence?: string;

  /**
   * The email of the beneficiary
   */
  email?: string;

  /**
   * The nationality of the beneficiary
   */
  nationality?: string;

  /**
   * The phone number of the beneficiary
   */
  phoneNumber?: string;
}

export interface XafExternalAccountCreateInfo {
  accountType: 'XAF_ACCOUNT';

  beneficiary: XafBeneficiary | ExternalAccountsAPI.BusinessBeneficiary;

  /**
   * The phone number in international format
   */
  phoneNumber: string;

  /**
   * The mobile money provider name
   */
  provider: string;

  /**
   * Country code within the Central African CFA franc zone
   */
  region: 'CM' | 'CG';
}

export interface XofBeneficiary {
  beneficiaryType: 'INDIVIDUAL';

  /**
   * The full name of the beneficiary
   */
  fullName: string;

  address?: ExternalAccountsAPI.Address;

  /**
   * The birth date of the beneficiary
   */
  birthDate?: string;

  /**
   * The country of residence of the beneficiary
   */
  countryOfResidence?: string;

  /**
   * The email of the beneficiary
   */
  email?: string;

  /**
   * The nationality of the beneficiary
   */
  nationality?: string;

  /**
   * The phone number of the beneficiary
   */
  phoneNumber?: string;
}

export interface XofExternalAccountCreateInfo {
  accountType: 'XOF_ACCOUNT';

  beneficiary: XofBeneficiary | ExternalAccountsAPI.BusinessBeneficiary;

  /**
   * The phone number in international format
   */
  phoneNumber: string;

  /**
   * The mobile money provider name
   */
  provider: string;

  /**
   * Country code within the West African CFA franc zone
   */
  region: 'BJ' | 'CI' | 'SN' | 'TG';
}

export interface ZarBeneficiary {
  beneficiaryType: 'INDIVIDUAL';

  /**
   * The full name of the beneficiary
   */
  fullName: string;

  address?: ExternalAccountsAPI.Address;

  /**
   * The birth date of the beneficiary
   */
  birthDate?: string;

  /**
   * The country of residence of the beneficiary
   */
  countryOfResidence?: string;

  /**
   * The email of the beneficiary
   */
  email?: string;

  /**
   * The nationality of the beneficiary
   */
  nationality?: string;

  /**
   * The phone number of the beneficiary
   */
  phoneNumber?: string;
}

export interface ZarExternalAccountCreateInfo {
  /**
   * South African bank account number
   */
  accountNumber: string;

  accountType: 'ZAR_ACCOUNT';

  /**
   * The name of the bank
   */
  bankName: string;

  beneficiary: ZarBeneficiary | ExternalAccountsAPI.BusinessBeneficiary;
}

export interface ZmwBeneficiary {
  beneficiaryType: 'INDIVIDUAL';

  /**
   * The full name of the beneficiary
   */
  fullName: string;

  address?: ExternalAccountsAPI.Address;

  /**
   * The birth date of the beneficiary
   */
  birthDate?: string;

  /**
   * The country of residence of the beneficiary
   */
  countryOfResidence?: string;

  /**
   * The email of the beneficiary
   */
  email?: string;

  /**
   * The nationality of the beneficiary
   */
  nationality?: string;

  /**
   * The phone number of the beneficiary
   */
  phoneNumber?: string;
}

export interface ZmwExternalAccountCreateInfo {
  accountType: 'ZMW_ACCOUNT';

  beneficiary: ZmwBeneficiary | ExternalAccountsAPI.BusinessBeneficiary;

  /**
   * Zambian mobile money phone number
   */
  phoneNumber: string;

  /**
   * The mobile money provider name
   */
  provider: string;
}

export type BeneficialOwnersDefaultPagination = DefaultPagination<BeneficialOwner>;
