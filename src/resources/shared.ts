// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import * as ExternalAccountsAPI from './customers/external-accounts';

export interface AedBeneficiary {
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

export interface BdtExternalAccountCreateInfo {
  /**
   * The account number of the bank
   */
  accountNumber: string;

  accountType: 'BDT_ACCOUNT';

  /**
   * The name of the bank
   */
  bankName: string;

  beneficiary: BdtBeneficiary | ExternalAccountsAPI.BusinessBeneficiary;

  /**
   * The branch code
   */
  branchCode: string;

  /**
   * The phone number in international format
   */
  phoneNumber: string;

  /**
   * The SWIFT/BIC code of the bank
   */
  swiftCode?: string;
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
   * The identity document number
   */
  documentNumber: string;

  /**
   * The type of identity document (e.g., national ID, passport)
   */
  documentType: string;

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

export interface CopExternalAccountCreateInfo {
  /**
   * The account number of the bank
   */
  accountNumber: string;

  accountType: 'COP_ACCOUNT';

  /**
   * The bank account type
   */
  bankAccountType: 'CHECKING' | 'SAVINGS';

  /**
   * The name of the bank
   */
  bankName: string;

  beneficiary: CopBeneficiary | ExternalAccountsAPI.BusinessBeneficiary;
}

export interface DkkExternalAccountCreateInfo {
  accountType: 'DKK_ACCOUNT';

  beneficiary: ExternalAccountsAPI.DkkBeneficiary | ExternalAccountsAPI.BusinessBeneficiary;

  /**
   * The IBAN of the bank account
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
   * The IBAN of the bank account
   */
  iban?: string;

  /**
   * The SWIFT/BIC code of the bank
   */
  swiftCode?: string;
}

export interface EthereumWalletExternalAccountInfo {
  accountType: 'ETHEREUM_WALLET';

  /**
   * Ethereum L1 wallet address
   */
  address: string;
}

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

export interface GhsExternalAccountCreateInfo {
  /**
   * The account number of the bank
   */
  accountNumber: string;

  accountType: 'GHS_ACCOUNT';

  /**
   * The name of the bank
   */
  bankName: string;

  beneficiary: GhsBeneficiary | ExternalAccountsAPI.BusinessBeneficiary;

  /**
   * The phone number in international format
   */
  phoneNumber: string;
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
   * The name of the bank
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

export interface PkrExternalAccountCreateInfo {
  /**
   * The account number of the bank
   */
  accountNumber: string;

  accountType: 'PKR_ACCOUNT';

  /**
   * The name of the bank
   */
  bankName: string;

  beneficiary: PkrBeneficiary | ExternalAccountsAPI.BusinessBeneficiary;

  /**
   * The phone number in international format
   */
  phoneNumber: string;

  /**
   * The IBAN of the bank account
   */
  iban?: string;
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
    | 'MISSING_COMPANY_DETAILS_DOCUMENT'
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
   * MISSING_LEGAL_PRESENCE_DOCUMENT, MISSING_COMPANY_DETAILS_DOCUMENT,
   * MISSING_CONTROL_STRUCTURE_DOCUMENT, MISSING_OWNERSHIP_STRUCTURE_DOCUMENT,
   * MISSING_PROOF_OF_ADDRESS_DOCUMENT, MISSING_IDENTITY_DOCUMENT, INVALID_DOCUMENT,
   * or EXPIRED_DOCUMENT.
   *
   * | Error Type                           | Accepted Document Types                                                                                                                                                            |
   * | ------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
   * | MISSING_LEGAL_PRESENCE_DOCUMENT      | CERTIFICATE_OF_INCORPORATION, ARTICLES_OF_INCORPORATION, ARTICLES_OF_ASSOCIATION, STATE_REGISTRY_EXCERPT                                                                           |
   * | MISSING_COMPANY_DETAILS_DOCUMENT     | INFORMATION_STATEMENT, STATE_REGISTRY_EXCERPT, ARTICLES_OF_INCORPORATION, ARTICLES_OF_ASSOCIATION, CERTIFICATE_OF_INCORPORATION, INCUMBENCY_CERTIFICATE, GOOD_STANDING_CERTIFICATE |
   * | MISSING_CONTROL_STRUCTURE_DOCUMENT   | ARTICLES_OF_INCORPORATION, ARTICLES_OF_ASSOCIATION, INCUMBENCY_CERTIFICATE, INFORMATION_STATEMENT, STATE_REGISTRY_EXCERPT                                                          |
   * | MISSING_OWNERSHIP_STRUCTURE_DOCUMENT | SHAREHOLDER_REGISTER, INFORMATION_STATEMENT, INCUMBENCY_CERTIFICATE, STATE_REGISTRY_EXCERPT, ARTICLES_OF_INCORPORATION, ARTICLES_OF_ASSOCIATION                                    |
   * | MISSING_PROOF_OF_ADDRESS_DOCUMENT    | PROOF_OF_ADDRESS                                                                                                                                                                   |
   * | MISSING_IDENTITY_DOCUMENT            | PASSPORT, DRIVERS_LICENSE, NATIONAL_ID                                                                                                                                             |
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
