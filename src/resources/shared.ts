// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import * as BeneficialOwnersAPI from './beneficial-owners';
import * as CustomersAPI from './customers/customers';
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

  beneficiary: AedBeneficiary | AedExternalAccountCreateInfo.BusinessBeneficiary;

  /**
   * UAE IBAN (23 characters, starting with AE)
   */
  iban: string;

  /**
   * The SWIFT/BIC code of the bank
   */
  swiftCode?: string;
}

export namespace AedExternalAccountCreateInfo {
  export interface BusinessBeneficiary {
    address: ExternalAccountsAPI.Address;

    beneficiaryType: 'BUSINESS';

    /**
     * The legal name of the business
     */
    legalName: string;

    /**
     * The country of residence of the beneficiary
     */
    countryOfResidence?: string;

    /**
     * The email of the beneficiary
     */
    email?: string;

    /**
     * The phone number of the beneficiary
     */
    phoneNumber?: string;

    /**
     * The company registration number of the business
     */
    registrationNumber?: string;

    /**
     * The tax identification number of the business
     */
    taxId?: string;
  }
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
 * - BANK_TRANSFER: accountNumber, bankName
 * - MOBILE_MONEY: bankName, phoneNumber
 */
export interface BdtExternalAccountCreateInfo {
  accountType: 'BDT_ACCOUNT';

  /**
   * The name of the bank
   */
  bankName: string;

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
   * The current KYC status of a customer. `HOLD` means the customer is placed on
   * hold and may be required to update or provide more information.
   */
  kycStatus: 'UNVERIFIED' | 'PENDING' | 'APPROVED' | 'REJECTED' | 'HOLD';

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

  beneficiary: ExternalAccountsAPI.BrlBeneficiary | BrlExternalAccountCreateInfo.BusinessBeneficiary;

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

export namespace BrlExternalAccountCreateInfo {
  export interface BusinessBeneficiary {
    beneficiaryType: 'BUSINESS';

    /**
     * The legal name of the business
     */
    legalName: string;

    address?: ExternalAccountsAPI.Address;

    /**
     * The country of residence of the beneficiary
     */
    countryOfResidence?: string;

    /**
     * The email of the beneficiary
     */
    email?: string;

    /**
     * The phone number of the beneficiary
     */
    phoneNumber?: string;

    /**
     * The company registration number of the business
     */
    registrationNumber?: string;

    /**
     * The tax identification number of the business
     */
    taxId?: string;
  }
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

export interface BusinessCustomer extends CustomersAPI.Customer {
  customerType: 'BUSINESS';

  address?: ExternalAccountsAPI.Address;

  beneficialOwners?: Array<BeneficialOwner>;

  /**
   * Business information returned on a customer. `taxId` and `incorporatedOn` are
   * required on creation but may be absent on legacy customers that pre-date the
   * requirement, so both are optional in responses.
   */
  businessInfo?: BusinessCustomer.BusinessInfo;

  /**
   * The current KYB status of a business customer. `HOLD` means the customer is
   * placed on hold and may be required to update or provide more information.
   */
  kybStatus?: 'UNVERIFIED' | 'PENDING' | 'APPROVED' | 'REJECTED' | 'HOLD';
}

export namespace BusinessCustomer {
  /**
   * Business information returned on a customer. `taxId` and `incorporatedOn` are
   * required on creation but may be absent on legacy customers that pre-date the
   * requirement, so both are optional in responses.
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
      | 'PUBLICLY_LISTED_COMPANY'
      | 'TRUST'
      | 'PRIVATE_FOUNDATION'
      | 'CHARITY'
      | 'OTHER';

    /**
     * List of countries of the business's expected transaction counterparties (ISO
     * 3166-1 alpha-2)
     */
    expectedCounterpartyCountries?: Array<string>;

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
     * NAICS code describing the nature of the business (2-6 digits)
     */
    naicsCode?: string;

    /**
     * First name of the business's primary contact — a registered director or
     * authorised representative of the business. Required in regions where a named
     * individual is verified against the business during onboarding (e.g. the EU). The
     * customer's `email` and `phoneNumber` are this person's contact details.
     */
    primaryContactFirstName?: string;

    /**
     * Last name of the business's primary contact.
     */
    primaryContactLastName?: string;

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
     * Description of the account purpose when OTHER is selected
     */
    purposeOfAccountOtherDescription?: string;

    /**
     * Business registration number
     */
    registrationNumber?: string;

    /**
     * The primary source of funds for the business
     */
    sourceOfFunds?: string;

    /**
     * Structured source-of-funds categories for the business
     */
    sourceOfFundsCategories?: Array<unknown>;

    /**
     * Description of the source of funds when OTHER is selected
     */
    sourceOfFundsOtherDescription?: string;

    /**
     * Tax identification number
     */
    taxId?: string;
  }
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

  beneficiary: BwpBeneficiary | BwpExternalAccountCreateInfo.BusinessBeneficiary;

  /**
   * The phone number in international format
   */
  phoneNumber: string;

  /**
   * The mobile money provider name
   */
  provider: string;
}

export namespace BwpExternalAccountCreateInfo {
  export interface BusinessBeneficiary {
    beneficiaryType: 'BUSINESS';

    /**
     * The legal name of the business
     */
    legalName: string;

    /**
     * The company registration number of the business
     */
    registrationNumber: string;

    /**
     * The tax identification number of the business
     */
    taxId: string;

    address?: ExternalAccountsAPI.Address;

    /**
     * The country of residence of the beneficiary
     */
    countryOfResidence?: string;

    /**
     * The email of the beneficiary
     */
    email?: string;

    /**
     * The phone number of the beneficiary
     */
    phoneNumber?: string;
  }
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
   * The identity document number
   */
  documentNumber?: string;

  /**
   * Identity document type (Colombia)
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
 * - BANK_TRANSFER: accountNumber, bankAccountType, bankName
 * - MOBILE_MONEY: bankName, phoneNumber
 */
export interface CopExternalAccountCreateInfo {
  accountType: 'COP_ACCOUNT';

  /**
   * The name of the bank
   */
  bankName: string;

  beneficiary: CopBeneficiary | ExternalAccountsAPI.BusinessBeneficiary;

  /**
   * The account number of the bank
   */
  accountNumber?: string;

  /**
   * The bank account type
   */
  bankAccountType?: 'CHECKING' | 'SAVINGS';

  /**
   * The phone number in international format
   */
  phoneNumber?: string;
}

export interface DkkExternalAccountCreateInfo {
  accountType: 'DKK_ACCOUNT';

  beneficiary: ExternalAccountsAPI.DkkBeneficiary | DkkExternalAccountCreateInfo.BusinessBeneficiary;

  /**
   * Danish IBAN (18 characters, starting with DK)
   */
  iban: string;

  /**
   * The SWIFT/BIC code of the bank
   */
  swiftCode?: string;
}

export namespace DkkExternalAccountCreateInfo {
  export interface BusinessBeneficiary {
    beneficiaryType: 'BUSINESS';

    /**
     * The legal name of the business
     */
    legalName: string;

    address?: ExternalAccountsAPI.Address;

    /**
     * The country of residence of the beneficiary
     */
    countryOfResidence?: string;

    /**
     * The email of the beneficiary
     */
    email?: string;

    /**
     * The phone number of the beneficiary
     */
    phoneNumber?: string;

    /**
     * The company registration number of the business
     */
    registrationNumber?: string;

    /**
     * The tax identification number of the business
     */
    taxId?: string;
  }
}

export interface EgpBeneficiary {
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
 * - BANK_TRANSFER: bankName, iban
 * - MOBILE_MONEY: bankName, phoneNumber
 */
export interface EgpExternalAccountCreateInfo {
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
   * The phone number in international format
   */
  phoneNumber?: string;
}

export type EthereumWalletExternalAccountInfo = unknown;

export interface EurBeneficiary {
  beneficiaryType: 'INDIVIDUAL';

  /**
   * The country of residence of the beneficiary
   */
  countryOfResidence: string;

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

  beneficiary: EurBeneficiary | EurExternalAccountCreateInfo.BusinessBeneficiary;

  /**
   * The IBAN of the bank account
   */
  iban: string;

  /**
   * The SWIFT/BIC code of the bank
   */
  swiftCode?: string;
}

export namespace EurExternalAccountCreateInfo {
  export interface BusinessBeneficiary {
    beneficiaryType: 'BUSINESS';

    /**
     * The country of residence of the beneficiary
     */
    countryOfResidence: string;

    /**
     * The legal name of the business
     */
    legalName: string;

    /**
     * The company registration number of the business
     */
    registrationNumber: string;

    /**
     * The tax identification number of the business
     */
    taxId: string;

    address?: ExternalAccountsAPI.Address;

    /**
     * The email of the beneficiary
     */
    email?: string;

    /**
     * The phone number of the beneficiary
     */
    phoneNumber?: string;
  }
}

export interface GbpExternalAccountCreateInfo {
  /**
   * UK bank account number (8 digits)
   */
  accountNumber: string;

  accountType: 'GBP_ACCOUNT';

  beneficiary: ExternalAccountsAPI.GbpBeneficiary | GbpExternalAccountCreateInfo.BusinessBeneficiary;

  /**
   * The UK sort code
   */
  sortCode: string;
}

export namespace GbpExternalAccountCreateInfo {
  export interface BusinessBeneficiary {
    beneficiaryType: 'BUSINESS';

    /**
     * The legal name of the business
     */
    legalName: string;

    address?: ExternalAccountsAPI.Address;

    /**
     * The country of residence of the beneficiary
     */
    countryOfResidence?: string;

    /**
     * The email of the beneficiary
     */
    email?: string;

    /**
     * The phone number of the beneficiary
     */
    phoneNumber?: string;

    /**
     * The company registration number of the business
     */
    registrationNumber?: string;

    /**
     * The tax identification number of the business
     */
    taxId?: string;
  }
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
 * - BANK_TRANSFER: accountNumber, bankName
 * - MOBILE_MONEY: bankName, phoneNumber
 */
export interface GhsExternalAccountCreateInfo {
  accountType: 'GHS_ACCOUNT';

  /**
   * The name of the bank
   */
  bankName: string;

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

  /**
   * The name of the beneficiary's bank
   */
  bankName: string;

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

  beneficiary: ExternalAccountsAPI.HkdBeneficiary | HkdExternalAccountCreateInfo.BusinessBeneficiary;

  /**
   * The SWIFT/BIC code of the bank
   */
  swiftCode: string;
}

export namespace HkdExternalAccountCreateInfo {
  export interface BusinessBeneficiary {
    beneficiaryType: 'BUSINESS';

    /**
     * The legal name of the business
     */
    legalName: string;

    address?: ExternalAccountsAPI.Address;

    /**
     * The country of residence of the beneficiary
     */
    countryOfResidence?: string;

    /**
     * The email of the beneficiary
     */
    email?: string;

    /**
     * The phone number of the beneficiary
     */
    phoneNumber?: string;

    /**
     * The company registration number of the business
     */
    registrationNumber?: string;

    /**
     * The tax identification number of the business
     */
    taxId?: string;
  }
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

  beneficiary: ExternalAccountsAPI.IdrBeneficiary | IdrExternalAccountCreateInfo.BusinessBeneficiary;

  /**
   * Indonesian phone number for e-wallet payments
   */
  phoneNumber: string;

  /**
   * The SWIFT/BIC code of the bank
   */
  swiftCode: string;
}

export namespace IdrExternalAccountCreateInfo {
  export interface BusinessBeneficiary {
    beneficiaryType: 'BUSINESS';

    /**
     * The legal name of the business
     */
    legalName: string;

    address?: ExternalAccountsAPI.Address;

    /**
     * The country of residence of the beneficiary
     */
    countryOfResidence?: string;

    /**
     * The email of the beneficiary
     */
    email?: string;

    /**
     * The phone number of the beneficiary
     */
    phoneNumber?: string;

    /**
     * The company registration number of the business
     */
    registrationNumber?: string;

    /**
     * The tax identification number of the business
     */
    taxId?: string;
  }
}

/**
 * Enhanced-due-diligence (EDD) fields available as optional patchable attributes
 * on an individual customer. Referenced via `allOf` from
 * `IndividualCustomerFields`, so these appear as top-level optional fields on the
 * customer resource itself; there is no separate EDD resource. The specific set
 * required for a given customer is driven by the KYC provider's per-jurisdiction /
 * per-flow / per-volume-tier rules (surfaced through `MISSING_FIELD` errors on
 * `POST /verifications`).
 */
export interface IndividualCustomer extends CustomersAPI.Customer {
  customerType: 'INDIVIDUAL';

  address?: ExternalAccountsAPI.Address;

  /**
   * Bucketed annual income (USD equivalent). Used for enhanced due diligence on
   * higher-risk profiles.
   */
  annualIncomeRange?: 'UNDER_50K' | 'RANGE_50K_100K' | 'RANGE_100K_250K' | 'RANGE_250K_1M' | 'OVER_1M';

  /**
   * Date of birth in ISO 8601 format (YYYY-MM-DD)
   */
  birthDate?: string;

  /**
   * Country that issued the identification (ISO 3166-1 alpha-2). Optional for an
   * individual account holder: SSN and ITIN are US-issued, so this defaults to `US`
   * and is rejected if set to anything else.
   */
  countryOfIssuance?: string;

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
   * Individual's full name
   */
  fullName?: string;

  /**
   * Type of tax identification
   */
  idType?: 'SSN' | 'ITIN' | 'EIN' | 'NON_US_TAX_ID';

  /**
   * The current KYC status of a customer. `HOLD` means the customer is placed on
   * hold and may be required to update or provide more information.
   */
  kycStatus?: 'UNVERIFIED' | 'PENDING' | 'APPROVED' | 'REJECTED' | 'HOLD';

  /**
   * Country code (ISO 3166-1 alpha-2)
   */
  nationality?: string;

  /**
   * Bucketed total net worth (USD equivalent). Used for enhanced due diligence on
   * higher-risk profiles.
   */
  netWorthRange?:
    | 'UNDER_100K'
    | 'RANGE_100K_500K'
    | 'RANGE_500K_1M'
    | 'RANGE_1M_5M'
    | 'RANGE_5M_25M'
    | 'OVER_25M';

  /**
   * Political exposure declaration (Politically Exposed Person status). `HIO` = head
   * of an international organization. `FAMILY_OR_ASSOCIATE` covers close family
   * members and known close associates of a PEP.
   */
  pepStatus?: 'NONE' | 'DOMESTIC' | 'FOREIGN' | 'HIO' | 'FAMILY_OR_ASSOCIATE';

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
   * Free-form description of the customer's intended purpose for the Grid account.
   * Required when `purposeOfAccount` is `OTHER`; otherwise omitted.
   */
  purposeOfAccountOtherDescription?: string;

  /**
   * Structured source-of-funds categories (FLOW of funds for this account).
   */
  sourceOfFundsCategories?: Array<
    | 'SALARY'
    | 'SELF_EMPLOYMENT_INCOME'
    | 'INVESTMENT_INCOME'
    | 'PENSION'
    | 'RENTAL_INCOME'
    | 'GIFT'
    | 'INHERITANCE'
    | 'LOAN'
    | 'SAVINGS'
    | 'SALE_OF_ASSETS'
    | 'OTHER'
  >;

  /**
   * Free-form description of the customer's source of funds. Required when
   * `sourceOfFundsCategories` includes `OTHER`; otherwise omitted.
   */
  sourceOfFundsOtherDescription?: string;

  /**
   * Structured source-of-wealth categories (STOCK — origin of accumulated wealth).
   */
  sourceOfWealthCategories?: Array<
    | 'SALARY'
    | 'BUSINESS_INCOME'
    | 'INVESTMENTS'
    | 'INHERITANCE'
    | 'PROPERTY_SALE'
    | 'GIFT'
    | 'RETIREMENT'
    | 'SAVINGS'
    | 'OTHER'
  >;

  /**
   * Free-form description of the customer's source of wealth. Required when
   * `sourceOfWealthCategories` includes `OTHER`; otherwise omitted.
   */
  sourceOfWealthOtherDescription?: string;
}

/**
 * Required fields depend on the selected paymentRails:
 *
 * - NEFT: accountNumber, ifsc, rail
 * - RTGS: accountNumber, ifsc, rail
 * - UPI: vpa
 */
export interface InrExternalAccountCreateInfo {
  accountType: 'INR_ACCOUNT';

  beneficiary: ExternalAccountsAPI.InrBeneficiary | InrExternalAccountCreateInfo.BusinessBeneficiary;

  /**
   * Indian bank account number (9–18 digits)
   */
  accountNumber?: string;

  /**
   * The name of the bank
   */
  bankName?: string;

  /**
   * The Indian Financial System Code (IFSC) of the beneficiary's bank branch
   * (NEFT/RTGS)
   */
  ifsc?: string;

  /**
   * The payment rail to route the payout over: NEFT or RTGS. Omitted, the payout
   * resolves it by amount.
   */
  rail?: string;

  /**
   * The UPI Virtual Payment Address
   */
  vpa?: string;
}

export namespace InrExternalAccountCreateInfo {
  export interface BusinessBeneficiary {
    beneficiaryType: 'BUSINESS';

    /**
     * The legal name of the business
     */
    legalName: string;

    address?: ExternalAccountsAPI.Address;

    /**
     * The country of residence of the beneficiary
     */
    countryOfResidence?: string;

    /**
     * The email of the beneficiary
     */
    email?: string;

    /**
     * The phone number of the beneficiary
     */
    phoneNumber?: string;

    /**
     * The company registration number of the business
     */
    registrationNumber?: string;

    /**
     * The tax identification number of the business
     */
    taxId?: string;
  }
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

  /**
   * The name of the bank
   */
  bankName: string;

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

  beneficiary: KesBeneficiary | KesExternalAccountCreateInfo.BusinessBeneficiary;

  /**
   * Kenyan mobile money phone number
   */
  phoneNumber: string;

  /**
   * The mobile money provider name
   */
  provider: string;
}

export namespace KesExternalAccountCreateInfo {
  export interface BusinessBeneficiary {
    beneficiaryType: 'BUSINESS';

    /**
     * The legal name of the business
     */
    legalName: string;

    /**
     * The company registration number of the business
     */
    registrationNumber: string;

    /**
     * The tax identification number of the business
     */
    taxId: string;

    address?: ExternalAccountsAPI.Address;

    /**
     * The country of residence of the beneficiary
     */
    countryOfResidence?: string;

    /**
     * The email of the beneficiary
     */
    email?: string;

    /**
     * The phone number of the beneficiary
     */
    phoneNumber?: string;
  }
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

  beneficiary: MwkBeneficiary | MwkExternalAccountCreateInfo.BusinessBeneficiary;

  /**
   * The phone number in international format
   */
  phoneNumber: string;

  /**
   * The mobile money provider name
   */
  provider: string;
}

export namespace MwkExternalAccountCreateInfo {
  export interface BusinessBeneficiary {
    beneficiaryType: 'BUSINESS';

    /**
     * The legal name of the business
     */
    legalName: string;

    /**
     * The company registration number of the business
     */
    registrationNumber: string;

    /**
     * The tax identification number of the business
     */
    taxId: string;

    address?: ExternalAccountsAPI.Address;

    /**
     * The country of residence of the beneficiary
     */
    countryOfResidence?: string;

    /**
     * The email of the beneficiary
     */
    email?: string;

    /**
     * The phone number of the beneficiary
     */
    phoneNumber?: string;
  }
}

export interface MxnExternalAccountCreateInfo {
  accountType: 'MXN_ACCOUNT';

  beneficiary: ExternalAccountsAPI.MxnBeneficiary | MxnExternalAccountCreateInfo.BusinessBeneficiary;

  /**
   * The CLABE number of the bank
   */
  clabeNumber: string;
}

export namespace MxnExternalAccountCreateInfo {
  export interface BusinessBeneficiary {
    beneficiaryType: 'BUSINESS';

    /**
     * The legal name of the business
     */
    legalName: string;

    address?: ExternalAccountsAPI.Address;

    /**
     * The country of residence of the beneficiary
     */
    countryOfResidence?: string;

    /**
     * The email of the beneficiary
     */
    email?: string;

    /**
     * The phone number of the beneficiary
     */
    phoneNumber?: string;

    /**
     * The company registration number of the business
     */
    registrationNumber?: string;

    /**
     * The tax identification number of the business
     */
    taxId?: string;
  }
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

  beneficiary: ExternalAccountsAPI.MyrBeneficiary | MyrExternalAccountCreateInfo.BusinessBeneficiary;

  /**
   * The SWIFT/BIC code of the bank
   */
  swiftCode: string;
}

export namespace MyrExternalAccountCreateInfo {
  export interface BusinessBeneficiary {
    beneficiaryType: 'BUSINESS';

    /**
     * The legal name of the business
     */
    legalName: string;

    address?: ExternalAccountsAPI.Address;

    /**
     * The country of residence of the beneficiary
     */
    countryOfResidence?: string;

    /**
     * The email of the beneficiary
     */
    email?: string;

    /**
     * The phone number of the beneficiary
     */
    phoneNumber?: string;

    /**
     * The company registration number of the business
     */
    registrationNumber?: string;

    /**
     * The tax identification number of the business
     */
    taxId?: string;
  }
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

  beneficiary: NgnBeneficiary | NgnExternalAccountCreateInfo.BusinessBeneficiary;
}

export namespace NgnExternalAccountCreateInfo {
  export interface BusinessBeneficiary {
    beneficiaryType: 'BUSINESS';

    /**
     * The legal name of the business
     */
    legalName: string;

    /**
     * The company registration number of the business
     */
    registrationNumber: string;

    /**
     * The tax identification number of the business
     */
    taxId: string;

    address?: ExternalAccountsAPI.Address;

    /**
     * The country of residence of the beneficiary
     */
    countryOfResidence?: string;

    /**
     * The email of the beneficiary
     */
    email?: string;

    /**
     * The phone number of the beneficiary
     */
    phoneNumber?: string;
  }
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

  beneficiary: ExternalAccountsAPI.PhpBeneficiary | PhpExternalAccountCreateInfo.BusinessBeneficiary;

  /**
   * The payment rail to route the payout over: INSTAPAY or PESONET. Omitted, the
   * payout resolves it by amount.
   */
  rail?: string;
}

export namespace PhpExternalAccountCreateInfo {
  export interface BusinessBeneficiary {
    beneficiaryType: 'BUSINESS';

    /**
     * The legal name of the business
     */
    legalName: string;

    address?: ExternalAccountsAPI.Address;

    /**
     * The country of residence of the beneficiary
     */
    countryOfResidence?: string;

    /**
     * The email of the beneficiary
     */
    email?: string;

    /**
     * The phone number of the beneficiary
     */
    phoneNumber?: string;

    /**
     * The company registration number of the business
     */
    registrationNumber?: string;

    /**
     * The tax identification number of the business
     */
    taxId?: string;
  }
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
 * - BANK_TRANSFER: accountNumber, bankName
 * - MOBILE_MONEY: bankName, phoneNumber
 */
export interface PkrExternalAccountCreateInfo {
  accountType: 'PKR_ACCOUNT';

  /**
   * The name of the bank
   */
  bankName: string;

  beneficiary: PkrBeneficiary | ExternalAccountsAPI.BusinessBeneficiary;

  /**
   * The account number of the bank
   */
  accountNumber?: string;

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

  beneficiary: RwfBeneficiary | RwfExternalAccountCreateInfo.BusinessBeneficiary;

  /**
   * Rwandan mobile money phone number
   */
  phoneNumber: string;

  /**
   * The mobile money provider name
   */
  provider: string;
}

export namespace RwfExternalAccountCreateInfo {
  export interface BusinessBeneficiary {
    beneficiaryType: 'BUSINESS';

    /**
     * The legal name of the business
     */
    legalName: string;

    /**
     * The company registration number of the business
     */
    registrationNumber: string;

    /**
     * The tax identification number of the business
     */
    taxId: string;

    address?: ExternalAccountsAPI.Address;

    /**
     * The country of residence of the beneficiary
     */
    countryOfResidence?: string;

    /**
     * The email of the beneficiary
     */
    email?: string;

    /**
     * The phone number of the beneficiary
     */
    phoneNumber?: string;
  }
}

export interface SgdExternalAccountCreateInfo {
  /**
   * Bank account number
   */
  accountNumber: string;

  accountType: 'SGD_ACCOUNT';

  beneficiary: ExternalAccountsAPI.SgdBeneficiary | SgdExternalAccountCreateInfo.BusinessBeneficiary;

  /**
   * The SWIFT/BIC code of the bank
   */
  swiftCode: string;

  /**
   * Name of the beneficiary's bank. When omitted, resolved from swiftCode via the
   * payout partner bank directory at account creation.
   */
  bankName?: string;
}

export namespace SgdExternalAccountCreateInfo {
  export interface BusinessBeneficiary {
    beneficiaryType: 'BUSINESS';

    /**
     * The legal name of the business
     */
    legalName: string;

    address?: ExternalAccountsAPI.Address;

    /**
     * The country of residence of the beneficiary
     */
    countryOfResidence?: string;

    /**
     * The email of the beneficiary
     */
    email?: string;

    /**
     * The phone number of the beneficiary
     */
    phoneNumber?: string;

    /**
     * The company registration number of the business
     */
    registrationNumber?: string;

    /**
     * The tax identification number of the business
     */
    taxId?: string;
  }
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

/**
 * At least one of accountNumber or iban is always present: IBAN-only corridors
 * (e.g. BR, GB) use iban, other corridors use accountNumber, and both appear when
 * the bank exposes both identifiers for the same account.
 */
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

  beneficiary: ExternalAccountsAPI.ThbBeneficiary | ThbExternalAccountCreateInfo.BusinessBeneficiary;

  /**
   * The SWIFT/BIC code of the bank
   */
  swiftCode: string;
}

export namespace ThbExternalAccountCreateInfo {
  export interface BusinessBeneficiary {
    beneficiaryType: 'BUSINESS';

    /**
     * The legal name of the business
     */
    legalName: string;

    address?: ExternalAccountsAPI.Address;

    /**
     * The country of residence of the beneficiary
     */
    countryOfResidence?: string;

    /**
     * The email of the beneficiary
     */
    email?: string;

    /**
     * The phone number of the beneficiary
     */
    phoneNumber?: string;

    /**
     * The company registration number of the business
     */
    registrationNumber?: string;

    /**
     * The tax identification number of the business
     */
    taxId?: string;
  }
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

  beneficiary: TzsBeneficiary | TzsExternalAccountCreateInfo.BusinessBeneficiary;

  /**
   * Tanzanian mobile money phone number
   */
  phoneNumber: string;

  /**
   * The mobile money provider name
   */
  provider: string;
}

export namespace TzsExternalAccountCreateInfo {
  export interface BusinessBeneficiary {
    beneficiaryType: 'BUSINESS';

    /**
     * The legal name of the business
     */
    legalName: string;

    /**
     * The company registration number of the business
     */
    registrationNumber: string;

    /**
     * The tax identification number of the business
     */
    taxId: string;

    address?: ExternalAccountsAPI.Address;

    /**
     * The country of residence of the beneficiary
     */
    countryOfResidence?: string;

    /**
     * The email of the beneficiary
     */
    email?: string;

    /**
     * The phone number of the beneficiary
     */
    phoneNumber?: string;
  }
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

  beneficiary: UgxBeneficiary | UgxExternalAccountCreateInfo.BusinessBeneficiary;

  /**
   * The phone number in international format
   */
  phoneNumber: string;

  /**
   * The mobile money provider name
   */
  provider: string;
}

export namespace UgxExternalAccountCreateInfo {
  export interface BusinessBeneficiary {
    beneficiaryType: 'BUSINESS';

    /**
     * The legal name of the business
     */
    legalName: string;

    /**
     * The company registration number of the business
     */
    registrationNumber: string;

    /**
     * The tax identification number of the business
     */
    taxId: string;

    address?: ExternalAccountsAPI.Address;

    /**
     * The country of residence of the beneficiary
     */
    countryOfResidence?: string;

    /**
     * The email of the beneficiary
     */
    email?: string;

    /**
     * The phone number of the beneficiary
     */
    phoneNumber?: string;
  }
}

export interface UsdExternalAccountCreateInfo {
  /**
   * The account number of the bank
   */
  accountNumber: string;

  accountType: 'USD_ACCOUNT';

  beneficiary: ExternalAccountsAPI.UsdBeneficiary | UsdExternalAccountCreateInfo.BusinessBeneficiary;

  /**
   * The ABA routing number
   */
  routingNumber: string;

  /**
   * Whether the account is a checking or a savings account. Optional on every rail;
   * when omitted, the account is treated as a checking account.
   */
  bankAccountType?: 'CHECKING' | 'SAVINGS';

  /**
   * The name of the financial institution holding the account. Optional on every
   * rail, and recommended for wires, where it identifies the beneficiary's
   * institution on the payment message.
   */
  bankName?: string;

  /**
   * Bank-to-bank instructions carried alongside the payment. Used on the WIRE rail;
   * ignored on ACH, RTP and FEDNOW.
   */
  fiToFiInformation?: string;

  /**
   * The name of the intermediary financial institution, for accounts reachable only
   * through a correspondent bank. Used on the WIRE rail; ignored on ACH, RTP and
   * FEDNOW.
   */
  intermediaryBankName?: string;

  /**
   * The ABA routing number of the intermediary financial institution. Used on the
   * WIRE rail; ignored on ACH, RTP and FEDNOW.
   */
  intermediaryRoutingNumber?: string;
}

export namespace UsdExternalAccountCreateInfo {
  export interface BusinessBeneficiary {
    beneficiaryType: 'BUSINESS';

    /**
     * The legal name of the business
     */
    legalName: string;

    address?: ExternalAccountsAPI.Address;

    /**
     * The country of residence of the beneficiary
     */
    countryOfResidence?: string;

    /**
     * The email of the beneficiary
     */
    email?: string;

    /**
     * The phone number of the beneficiary
     */
    phoneNumber?: string;

    /**
     * The company registration number of the business
     */
    registrationNumber?: string;

    /**
     * The tax identification number of the business
     */
    taxId?: string;
  }
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
    | 'MISSING_BENEFICIAL_OWNER'
    | 'MISSING_CONTROL_PERSON'
    | 'MISSING_GOOD_STANDING_DOCUMENT';

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

  beneficiary: ExternalAccountsAPI.VndBeneficiary | VndExternalAccountCreateInfo.BusinessBeneficiary;

  /**
   * The SWIFT/BIC code of the bank
   */
  swiftCode: string;
}

export namespace VndExternalAccountCreateInfo {
  export interface BusinessBeneficiary {
    beneficiaryType: 'BUSINESS';

    /**
     * The legal name of the business
     */
    legalName: string;

    address?: ExternalAccountsAPI.Address;

    /**
     * The country of residence of the beneficiary
     */
    countryOfResidence?: string;

    /**
     * The email of the beneficiary
     */
    email?: string;

    /**
     * The phone number of the beneficiary
     */
    phoneNumber?: string;

    /**
     * The company registration number of the business
     */
    registrationNumber?: string;

    /**
     * The tax identification number of the business
     */
    taxId?: string;
  }
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

  beneficiary: XafBeneficiary | XafExternalAccountCreateInfo.BusinessBeneficiary;

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

export namespace XafExternalAccountCreateInfo {
  export interface BusinessBeneficiary {
    beneficiaryType: 'BUSINESS';

    /**
     * The legal name of the business
     */
    legalName: string;

    /**
     * The company registration number of the business
     */
    registrationNumber: string;

    /**
     * The tax identification number of the business
     */
    taxId: string;

    address?: ExternalAccountsAPI.Address;

    /**
     * The country of residence of the beneficiary
     */
    countryOfResidence?: string;

    /**
     * The email of the beneficiary
     */
    email?: string;

    /**
     * The phone number of the beneficiary
     */
    phoneNumber?: string;
  }
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

  beneficiary: XofBeneficiary | XofExternalAccountCreateInfo.BusinessBeneficiary;

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

export namespace XofExternalAccountCreateInfo {
  export interface BusinessBeneficiary {
    beneficiaryType: 'BUSINESS';

    /**
     * The legal name of the business
     */
    legalName: string;

    /**
     * The company registration number of the business
     */
    registrationNumber: string;

    /**
     * The tax identification number of the business
     */
    taxId: string;

    address?: ExternalAccountsAPI.Address;

    /**
     * The country of residence of the beneficiary
     */
    countryOfResidence?: string;

    /**
     * The email of the beneficiary
     */
    email?: string;

    /**
     * The phone number of the beneficiary
     */
    phoneNumber?: string;
  }
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

  beneficiary: ZarBeneficiary | ZarExternalAccountCreateInfo.BusinessBeneficiary;
}

export namespace ZarExternalAccountCreateInfo {
  export interface BusinessBeneficiary {
    beneficiaryType: 'BUSINESS';

    /**
     * The legal name of the business
     */
    legalName: string;

    /**
     * The company registration number of the business
     */
    registrationNumber: string;

    /**
     * The tax identification number of the business
     */
    taxId: string;

    address?: ExternalAccountsAPI.Address;

    /**
     * The country of residence of the beneficiary
     */
    countryOfResidence?: string;

    /**
     * The email of the beneficiary
     */
    email?: string;

    /**
     * The phone number of the beneficiary
     */
    phoneNumber?: string;
  }
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

  beneficiary: ZmwBeneficiary | ZmwExternalAccountCreateInfo.BusinessBeneficiary;

  /**
   * Zambian mobile money phone number
   */
  phoneNumber: string;

  /**
   * The mobile money provider name
   */
  provider: string;
}

export namespace ZmwExternalAccountCreateInfo {
  export interface BusinessBeneficiary {
    beneficiaryType: 'BUSINESS';

    /**
     * The legal name of the business
     */
    legalName: string;

    /**
     * The company registration number of the business
     */
    registrationNumber: string;

    /**
     * The tax identification number of the business
     */
    taxId: string;

    address?: ExternalAccountsAPI.Address;

    /**
     * The country of residence of the beneficiary
     */
    countryOfResidence?: string;

    /**
     * The email of the beneficiary
     */
    email?: string;

    /**
     * The phone number of the beneficiary
     */
    phoneNumber?: string;
  }
}

export type BeneficialOwnersDefaultPagination = DefaultPagination<BeneficialOwner>;
