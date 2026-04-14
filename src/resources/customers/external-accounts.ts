// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as ExternalAccountsAPI from './external-accounts';
import * as Shared from '../shared';
import * as PlatformExternalAccountsAPI from '../platform/external-accounts';
import { APIPromise } from '../../core/api-promise';
import { DefaultPagination, type DefaultPaginationParams, PagePromise } from '../../core/pagination';
import { RequestOptions } from '../../internal/request-options';

/**
 * External account management endpoints for creating and managing external bank accounts
 */
export class ExternalAccounts extends APIResource {
  /**
   * Register a new external bank account for a customer.
   *
   * @example
   * ```ts
   * const externalAccount =
   *   await client.customers.externalAccounts.create({
   *     accountInfo: {
   *       accountType: 'USD_ACCOUNT',
   *       accountNumber: '12345678901',
   *       routingNumber: '123456789',
   *       beneficiary: {
   *         beneficiaryType: 'INDIVIDUAL',
   *         fullName: 'John Doe',
   *         birthDate: '1990-01-15',
   *         nationality: 'US',
   *         address: {
   *           line1: '123 Main Street',
   *           city: 'San Francisco',
   *           state: 'CA',
   *           postalCode: '94105',
   *           country: 'US',
   *         },
   *       },
   *     },
   *     currency: 'USD',
   *     customerId:
   *       'Customer:019542f5-b3e7-1d02-0000-000000000001',
   *   });
   * ```
   */
  create(body: ExternalAccountCreateParams, options?: RequestOptions): APIPromise<ExternalAccount> {
    return this._client.post('/customers/external-accounts', { body, ...options });
  }

  /**
   * Retrieve a list of external accounts with optional filtering parameters. Returns
   * all external accounts that match the specified filters. If no filters are
   * provided, returns all external accounts (paginated).
   *
   * External accounts are bank accounts, cryptocurrency wallets, or other payment
   * destinations that customers can use to receive funds from the platform.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const externalAccount of client.customers.externalAccounts.list()) {
   *   // ...
   * }
   * ```
   */
  list(
    query: ExternalAccountListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<ExternalAccountsDefaultPagination, ExternalAccount> {
    return this._client.getAPIList('/customers/external-accounts', DefaultPagination<ExternalAccount>, {
      query,
      ...options,
    });
  }
}

export type ExternalAccountsDefaultPagination = DefaultPagination<ExternalAccount>;

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

export interface BaseWalletInfo {
  accountType: 'BASE_WALLET';

  /**
   * Base eth wallet address
   */
  address: string;
}

export interface BeneficiaryVerifiedData {
  /**
   * The verified full name of the account holder as returned by the payment rail
   */
  fullName?: string;
}

export interface BrlBeneficiary {
  beneficiaryType: 'INDIVIDUAL';

  /**
   * The full name of the beneficiary
   */
  fullName: string;

  address?: Address;

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

export interface BrlExternalAccountInfo extends PlatformExternalAccountsAPI.BrlAccountInfo {}

export interface BusinessBeneficiary {
  beneficiaryType: 'BUSINESS';

  /**
   * The legal name of the business
   */
  legalName: string;

  address?: Address;

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
   * The registration number of the business
   */
  registrationNumber?: string;

  /**
   * The tax identification number of the business
   */
  taxId?: string;
}

export interface DkkBeneficiary {
  beneficiaryType: 'INDIVIDUAL';

  /**
   * The full name of the beneficiary
   */
  fullName: string;

  address?: Address;

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

export interface DkkExternalAccountInfo extends PlatformExternalAccountsAPI.DkkAccountInfo {}

export interface ExternalAccount {
  /**
   * The system generated identifier of this account
   */
  id: string;

  /**
   * Lightning payment destination. Exactly one of `invoice`, `bolt12`, or
   * `lightningAddress` must be provided.
   */
  accountInfo: ExternalAccountInfoOneOf;

  /**
   * The ISO 4217 currency code
   */
  currency: string;

  /**
   * Status of the external account
   */
  status: 'PENDING' | 'ACTIVE' | 'UNDER_REVIEW' | 'INACTIVE';

  /**
   * The result of verifying the beneficiary name against the account holder name
   */
  beneficiaryVerificationStatus?:
    | 'MATCHED'
    | 'PARTIAL_MATCH'
    | 'NOT_MATCHED'
    | 'UNSUPPORTED'
    | 'CHECKED_BY_RECEIVING_FI'
    | 'PENDING';

  /**
   * Verified beneficiary data returned by the payment rail, if available
   */
  beneficiaryVerifiedData?: BeneficiaryVerifiedData;

  /**
   * The blockchain network for this external account, if applicable. Present when
   * the account is a cryptocurrency wallet. Example values: SOLANA_MAINNET,
   * SOLANA_DEVNET, ETHEREUM_MAINNET, ETHEREUM_TESTNET, BASE_MAINNET, BASE_TESTNET,
   * SPARK_MAINNET, SPARK_TESTNET, LIGHTNING_MAINNET, LIGHTNING_REGTEST.
   */
  cryptoNetwork?: string;

  /**
   * The customer this account is tied to, or null if the account is on behalf of the
   * platform.
   */
  customerId?: string;

  /**
   * Whether this account is the default UMA deposit account for the customer. If
   * true, incoming UMA payments to this customer's UMA address will be automatically
   * deposited into this account instead of the primary internal account. False if
   * not provided. Note that at most, one external account can be set as the default
   * UMA deposit account for a customer. If there is no default UMA deposit account,
   * incoming UMA payments will be deposited into the primary internal account for
   * the customer.
   */
  defaultUmaDepositAccount?: boolean;

  /**
   * Optional platform-specific identifier for this account
   */
  platformAccountId?: string;
}

export interface ExternalAccountCreate {
  /**
   * Lightning payment destination. Exactly one of `invoice`, `bolt12`, or
   * `lightningAddress` must be provided.
   */
  accountInfo:
    | Shared.AedExternalAccountCreateInfo
    | Shared.BrlExternalAccountCreateInfo
    | Shared.BwpExternalAccountCreateInfo
    | Shared.CadExternalAccountCreateInfo
    | Shared.DkkExternalAccountCreateInfo
    | Shared.EurExternalAccountCreateInfo
    | Shared.GbpExternalAccountCreateInfo
    | Shared.HkdExternalAccountCreateInfo
    | Shared.IdrExternalAccountCreateInfo
    | Shared.InrExternalAccountCreateInfo
    | Shared.KesExternalAccountCreateInfo
    | Shared.MwkExternalAccountCreateInfo
    | Shared.MxnExternalAccountCreateInfo
    | Shared.MyrExternalAccountCreateInfo
    | Shared.NgnExternalAccountCreateInfo
    | Shared.PhpExternalAccountCreateInfo
    | Shared.RwfExternalAccountCreateInfo
    | Shared.SgdExternalAccountCreateInfo
    | Shared.ThbExternalAccountCreateInfo
    | Shared.TzsExternalAccountCreateInfo
    | Shared.UgxExternalAccountCreateInfo
    | Shared.UsdExternalAccountCreateInfo
    | Shared.VndExternalAccountCreateInfo
    | Shared.XafExternalAccountCreateInfo
    | Shared.XofExternalAccountCreateInfo
    | Shared.ZarExternalAccountCreateInfo
    | Shared.ZmwExternalAccountCreateInfo
    | Shared.BdtExternalAccountCreateInfo
    | Shared.CopExternalAccountCreateInfo
    | Shared.EgpExternalAccountCreateInfo
    | Shared.GhsExternalAccountCreateInfo
    | Shared.GtqExternalAccountCreateInfo
    | Shared.HtgExternalAccountCreateInfo
    | Shared.JmdExternalAccountCreateInfo
    | Shared.PkrExternalAccountCreateInfo
    | SparkWalletInfo
    | LightningWalletInfo
    | SolanaWalletInfo
    | TronWalletInfo
    | PolygonWalletInfo
    | BaseWalletInfo
    | Shared.EthereumWalletExternalAccountInfo;

  /**
   * The ISO 4217 currency code
   */
  currency: string;

  /**
   * The blockchain network for this external account. Required when the account is a
   * cryptocurrency wallet. Specifies which network the wallet is on. Example values:
   * SOLANA_MAINNET, SOLANA_DEVNET, ETHEREUM_MAINNET, ETHEREUM_TESTNET, BASE_MAINNET,
   * BASE_TESTNET, SPARK_MAINNET, SPARK_TESTNET, LIGHTNING_MAINNET,
   * LIGHTNING_REGTEST.
   */
  cryptoNetwork?: string;

  /**
   * The ID of the customer for whom to create the external account. If not provided,
   * the external account will be created on behalf of the platform.
   */
  customerId?: string;

  /**
   * Whether to set the external account as the default UMA deposit account. When set
   * to true, incoming payments to this customer's UMA address will be automatically
   * deposited into this external account. False if not provided. Note that only one
   * external account can be set as the default UMA deposit account for a customer,
   * so if there is already a default UMA deposit account, this will override the
   * existing default UMA deposit account. If there is no default UMA deposit
   * account, incoming UMA payments will be deposited into the primary internal
   * account for the customer.
   */
  defaultUmaDepositAccount?: boolean;

  /**
   * Your platform's identifier for the account in your system. This can be used to
   * reference the account by your own identifier.
   */
  platformAccountId?: string;
}

/**
 * Lightning payment destination. Exactly one of `invoice`, `bolt12`, or
 * `lightningAddress` must be provided.
 */
export type ExternalAccountInfoOneOf =
  | BrlExternalAccountInfo
  | ExternalAccountInfoOneOf.CadExternalAccountInfo
  | DkkExternalAccountInfo
  | ExternalAccountInfoOneOf.EurExternalAccountInfo
  | GbpExternalAccountInfo
  | HkdExternalAccountInfo
  | IdrExternalAccountInfo
  | InrExternalAccountInfo
  | ExternalAccountInfoOneOf.KesExternalAccountInfo
  | ExternalAccountInfoOneOf.MwkExternalAccountInfo
  | MxnExternalAccountInfo
  | MyrExternalAccountInfo
  | ExternalAccountInfoOneOf.NgnExternalAccountInfo
  | PhpExternalAccountInfo
  | ExternalAccountInfoOneOf.RwfExternalAccountInfo
  | SgdExternalAccountInfo
  | ThbExternalAccountInfo
  | ExternalAccountInfoOneOf.TzsExternalAccountInfo
  | ExternalAccountInfoOneOf.UgxExternalAccountInfo
  | UsdExternalAccountInfo
  | VndExternalAccountInfo
  | ExternalAccountInfoOneOf.XofExternalAccountInfo
  | ExternalAccountInfoOneOf.ZarExternalAccountInfo
  | ExternalAccountInfoOneOf.ZmwExternalAccountInfo
  | SparkWalletInfo
  | LightningWalletInfo
  | SolanaWalletInfo
  | TronWalletInfo
  | PolygonWalletInfo
  | BaseWalletInfo
  | Shared.EthereumWalletExternalAccountInfo
  | ExternalAccountInfoOneOf.AedExternalAccountInfo
  | ExternalAccountInfoOneOf.BwpExternalAccountInfo
  | ExternalAccountInfoOneOf.XafExternalAccountInfo
  | ExternalAccountInfoOneOf.BdtExternalAccountInfo
  | ExternalAccountInfoOneOf.CopExternalAccountInfo
  | ExternalAccountInfoOneOf.EgpExternalAccountInfo
  | ExternalAccountInfoOneOf.GhsExternalAccountInfo
  | ExternalAccountInfoOneOf.GtqExternalAccountInfo
  | ExternalAccountInfoOneOf.HtgExternalAccountInfo
  | ExternalAccountInfoOneOf.JmdExternalAccountInfo
  | ExternalAccountInfoOneOf.PkrExternalAccountInfo;

export namespace ExternalAccountInfoOneOf {
  export interface CadExternalAccountInfo extends PlatformExternalAccountsAPI.CadAccountInfo {}

  export interface EurExternalAccountInfo extends PlatformExternalAccountsAPI.EurAccountInfo {}

  export interface KesExternalAccountInfo {
    accountType: 'KES_ACCOUNT';

    beneficiary: Shared.KesBeneficiary | ExternalAccountsAPI.BusinessBeneficiary;

    paymentRails: Array<'MOBILE_MONEY'>;

    /**
     * Kenyan mobile money phone number
     */
    phoneNumber: string;

    /**
     * The mobile money provider name
     */
    provider: string;
  }

  export interface MwkExternalAccountInfo {
    accountType: 'MWK_ACCOUNT';

    beneficiary: Shared.MwkBeneficiary | ExternalAccountsAPI.BusinessBeneficiary;

    paymentRails: Array<'MOBILE_MONEY'>;

    /**
     * The phone number in international format
     */
    phoneNumber: string;

    /**
     * The mobile money provider name
     */
    provider: string;
  }

  export interface NgnExternalAccountInfo extends PlatformExternalAccountsAPI.NgnAccountInfo {}

  export interface RwfExternalAccountInfo {
    accountType: 'RWF_ACCOUNT';

    beneficiary: Shared.RwfBeneficiary | ExternalAccountsAPI.BusinessBeneficiary;

    paymentRails: Array<'MOBILE_MONEY'>;

    /**
     * Rwandan mobile money phone number
     */
    phoneNumber: string;

    /**
     * The mobile money provider name
     */
    provider: string;
  }

  export interface TzsExternalAccountInfo {
    accountType: 'TZS_ACCOUNT';

    beneficiary: Shared.TzsBeneficiary | ExternalAccountsAPI.BusinessBeneficiary;

    paymentRails: Array<'MOBILE_MONEY'>;

    /**
     * Tanzanian mobile money phone number
     */
    phoneNumber: string;

    /**
     * The mobile money provider name
     */
    provider: string;
  }

  export interface UgxExternalAccountInfo {
    accountType: 'UGX_ACCOUNT';

    beneficiary: Shared.UgxBeneficiary | ExternalAccountsAPI.BusinessBeneficiary;

    paymentRails: Array<'MOBILE_MONEY'>;

    /**
     * The phone number in international format
     */
    phoneNumber: string;

    /**
     * The mobile money provider name
     */
    provider: string;
  }

  export interface XofExternalAccountInfo {
    accountType: 'XOF_ACCOUNT';

    beneficiary: Shared.XofBeneficiary | ExternalAccountsAPI.BusinessBeneficiary;

    paymentRails: Array<'MOBILE_MONEY'>;

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

  export interface ZarExternalAccountInfo {
    /**
     * South African bank account number
     */
    accountNumber: string;

    accountType: 'ZAR_ACCOUNT';

    /**
     * The name of the bank
     */
    bankName: string;

    beneficiary: Shared.ZarBeneficiary | ExternalAccountsAPI.BusinessBeneficiary;

    paymentRails: Array<'BANK_TRANSFER'>;
  }

  export interface ZmwExternalAccountInfo {
    accountType: 'ZMW_ACCOUNT';

    beneficiary: Shared.ZmwBeneficiary | ExternalAccountsAPI.BusinessBeneficiary;

    paymentRails: Array<'MOBILE_MONEY'>;

    /**
     * Zambian mobile money phone number
     */
    phoneNumber: string;

    /**
     * The mobile money provider name
     */
    provider: string;
  }

  export interface AedExternalAccountInfo {
    accountType: 'AED_ACCOUNT';

    beneficiary: Shared.AedBeneficiary | ExternalAccountsAPI.BusinessBeneficiary;

    /**
     * UAE IBAN (23 characters, starting with AE)
     */
    iban: string;

    paymentRails: Array<'BANK_TRANSFER'>;

    /**
     * The SWIFT/BIC code of the bank
     */
    swiftCode?: string;
  }

  export interface BwpExternalAccountInfo {
    accountType: 'BWP_ACCOUNT';

    beneficiary: Shared.BwpBeneficiary | ExternalAccountsAPI.BusinessBeneficiary;

    paymentRails: Array<'MOBILE_MONEY'>;

    /**
     * The phone number in international format
     */
    phoneNumber: string;

    /**
     * The mobile money provider name
     */
    provider: string;
  }

  export interface XafExternalAccountInfo {
    accountType: 'XAF_ACCOUNT';

    beneficiary: Shared.XafBeneficiary | ExternalAccountsAPI.BusinessBeneficiary;

    paymentRails: Array<'MOBILE_MONEY'>;

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

  export interface BdtExternalAccountInfo {
    /**
     * The account number of the bank
     */
    accountNumber: string;

    accountType: 'BDT_ACCOUNT';

    beneficiary: Shared.BdtBeneficiary | ExternalAccountsAPI.BusinessBeneficiary;

    /**
     * The branch code
     */
    branchCode: string;

    paymentRails: Array<'BANK_TRANSFER' | 'MOBILE_MONEY'>;

    /**
     * The phone number in international format
     */
    phoneNumber: string;

    /**
     * The SWIFT/BIC code of the bank
     */
    swiftCode?: string;
  }

  export interface CopExternalAccountInfo {
    /**
     * The account number of the bank
     */
    accountNumber: string;

    accountType: 'COP_ACCOUNT';

    /**
     * The bank account type
     */
    bankAccountType: 'CHECKING' | 'SAVINGS';

    beneficiary: Shared.CopBeneficiary | ExternalAccountsAPI.BusinessBeneficiary;

    paymentRails: Array<'BANK_TRANSFER' | 'MOBILE_MONEY'>;

    /**
     * The phone number in international format
     */
    phoneNumber: string;
  }

  export interface EgpExternalAccountInfo {
    /**
     * The account number of the bank
     */
    accountNumber: string;

    accountType: 'EGP_ACCOUNT';

    beneficiary: Shared.EgpBeneficiary | ExternalAccountsAPI.BusinessBeneficiary;

    paymentRails: Array<'BANK_TRANSFER'>;

    /**
     * The IBAN of the bank account
     */
    iban?: string;

    /**
     * The SWIFT/BIC code of the bank
     */
    swiftCode?: string;
  }

  export interface GhsExternalAccountInfo {
    /**
     * The account number of the bank
     */
    accountNumber: string;

    accountType: 'GHS_ACCOUNT';

    beneficiary: Shared.GhsBeneficiary | ExternalAccountsAPI.BusinessBeneficiary;

    paymentRails: Array<'BANK_TRANSFER' | 'MOBILE_MONEY'>;

    /**
     * The phone number in international format
     */
    phoneNumber: string;
  }

  export interface GtqExternalAccountInfo {
    /**
     * The account number of the bank
     */
    accountNumber: string;

    accountType: 'GTQ_ACCOUNT';

    beneficiary: Shared.GtqBeneficiary | ExternalAccountsAPI.BusinessBeneficiary;

    paymentRails: Array<'BANK_TRANSFER' | 'MOBILE_MONEY'>;

    /**
     * The phone number in international format
     */
    phoneNumber: string;
  }

  export interface HtgExternalAccountInfo {
    accountType: 'HTG_ACCOUNT';

    beneficiary: Shared.HtgBeneficiary | ExternalAccountsAPI.BusinessBeneficiary;

    paymentRails: Array<'MOBILE_MONEY'>;

    /**
     * The phone number in international format
     */
    phoneNumber: string;
  }

  export interface JmdExternalAccountInfo {
    /**
     * The account number of the bank
     */
    accountNumber: string;

    accountType: 'JMD_ACCOUNT';

    /**
     * The bank account type
     */
    bankAccountType: 'CHECKING' | 'SAVINGS';

    beneficiary: Shared.JmdBeneficiary | ExternalAccountsAPI.BusinessBeneficiary;

    /**
     * The branch code
     */
    branchCode: string;

    paymentRails: Array<'BANK_TRANSFER'>;
  }

  export interface PkrExternalAccountInfo {
    /**
     * The account number of the bank
     */
    accountNumber: string;

    accountType: 'PKR_ACCOUNT';

    beneficiary: Shared.PkrBeneficiary | ExternalAccountsAPI.BusinessBeneficiary;

    paymentRails: Array<'BANK_TRANSFER' | 'MOBILE_MONEY'>;

    /**
     * The phone number in international format
     */
    phoneNumber: string;

    /**
     * The IBAN of the bank account
     */
    iban?: string;
  }
}

export interface GbpBeneficiary {
  beneficiaryType: 'INDIVIDUAL';

  /**
   * The full name of the beneficiary
   */
  fullName: string;

  address?: Address;

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

export interface GbpExternalAccountInfo extends PlatformExternalAccountsAPI.GbpAccountInfo {}

export interface HkdBeneficiary {
  beneficiaryType: 'INDIVIDUAL';

  /**
   * The full name of the beneficiary
   */
  fullName: string;

  address?: Address;

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

export interface HkdExternalAccountInfo extends PlatformExternalAccountsAPI.HkdAccountInfo {}

export interface IdrBeneficiary {
  beneficiaryType: 'INDIVIDUAL';

  /**
   * The full name of the beneficiary
   */
  fullName: string;

  address?: Address;

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

export interface IdrExternalAccountInfo extends PlatformExternalAccountsAPI.IdrAccountInfo {}

export interface InrBeneficiary {
  beneficiaryType: 'INDIVIDUAL';

  /**
   * The full name of the beneficiary
   */
  fullName: string;

  address?: Address;

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

export interface InrExternalAccountInfo extends PlatformExternalAccountsAPI.InrAccountInfo {}

/**
 * Lightning payment destination. Exactly one of `invoice`, `bolt12`, or
 * `lightningAddress` must be provided.
 */
export interface LightningWalletInfo {
  accountType: 'LIGHTNING';

  /**
   * A bolt12 offer which can be reused as a payment destination
   */
  bolt12?: string;

  /**
   * 1-time use lightning bolt11 invoice payout destination
   */
  invoice?: string;

  /**
   * A lightning address which can be used as a payment destination. Note that for
   * UMA addresses, no external account is needed. You can use the UMA address
   * directly as a destination.
   */
  lightningAddress?: string;
}

export interface MxnBeneficiary {
  beneficiaryType: 'INDIVIDUAL';

  /**
   * The full name of the beneficiary
   */
  fullName: string;

  address?: Address;

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

export interface MxnExternalAccountInfo extends PlatformExternalAccountsAPI.MxnAccountInfo {}

export interface MyrBeneficiary {
  beneficiaryType: 'INDIVIDUAL';

  /**
   * The full name of the beneficiary
   */
  fullName: string;

  address?: Address;

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

export interface MyrExternalAccountInfo extends PlatformExternalAccountsAPI.MyrAccountInfo {}

export interface PhpBeneficiary {
  beneficiaryType: 'INDIVIDUAL';

  /**
   * The full name of the beneficiary
   */
  fullName: string;

  address?: Address;

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

export interface PhpExternalAccountInfo extends PlatformExternalAccountsAPI.PhpAccountInfo {}

export interface PolygonWalletInfo {
  accountType: 'POLYGON_WALLET';

  /**
   * Polygon eth wallet address
   */
  address: string;
}

export interface SgdBeneficiary {
  beneficiaryType: 'INDIVIDUAL';

  /**
   * The full name of the beneficiary
   */
  fullName: string;

  address?: Address;

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

export interface SgdExternalAccountInfo extends PlatformExternalAccountsAPI.SgdAccountInfo {}

export interface SolanaWalletInfo {
  accountType: 'SOLANA_WALLET';

  /**
   * Solana wallet address
   */
  address: string;
}

export interface SparkWalletInfo {
  accountType: 'SPARK_WALLET';

  /**
   * Spark wallet address
   */
  address: string;
}

export interface ThbBeneficiary {
  beneficiaryType: 'INDIVIDUAL';

  /**
   * The full name of the beneficiary
   */
  fullName: string;

  address?: Address;

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

export interface ThbExternalAccountInfo extends PlatformExternalAccountsAPI.ThbAccountInfo {}

export interface TronWalletInfo {
  accountType: 'TRON_WALLET';

  /**
   * Tron wallet address
   */
  address: string;
}

export interface UsdBeneficiary {
  beneficiaryType: 'INDIVIDUAL';

  /**
   * The full name of the beneficiary
   */
  fullName: string;

  address?: Address;

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

export interface UsdExternalAccountInfo extends PlatformExternalAccountsAPI.UsdAccountInfo {}

export interface VndBeneficiary {
  beneficiaryType: 'INDIVIDUAL';

  /**
   * The full name of the beneficiary
   */
  fullName: string;

  address?: Address;

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

export interface VndExternalAccountInfo extends PlatformExternalAccountsAPI.VndAccountInfo {}

export interface ExternalAccountCreateParams {
  /**
   * Lightning payment destination. Exactly one of `invoice`, `bolt12`, or
   * `lightningAddress` must be provided.
   */
  accountInfo:
    | Shared.AedExternalAccountCreateInfo
    | Shared.BrlExternalAccountCreateInfo
    | Shared.BwpExternalAccountCreateInfo
    | Shared.CadExternalAccountCreateInfo
    | Shared.DkkExternalAccountCreateInfo
    | Shared.EurExternalAccountCreateInfo
    | Shared.GbpExternalAccountCreateInfo
    | Shared.HkdExternalAccountCreateInfo
    | Shared.IdrExternalAccountCreateInfo
    | Shared.InrExternalAccountCreateInfo
    | Shared.KesExternalAccountCreateInfo
    | Shared.MwkExternalAccountCreateInfo
    | Shared.MxnExternalAccountCreateInfo
    | Shared.MyrExternalAccountCreateInfo
    | Shared.NgnExternalAccountCreateInfo
    | Shared.PhpExternalAccountCreateInfo
    | Shared.RwfExternalAccountCreateInfo
    | Shared.SgdExternalAccountCreateInfo
    | Shared.ThbExternalAccountCreateInfo
    | Shared.TzsExternalAccountCreateInfo
    | Shared.UgxExternalAccountCreateInfo
    | Shared.UsdExternalAccountCreateInfo
    | Shared.VndExternalAccountCreateInfo
    | Shared.XafExternalAccountCreateInfo
    | Shared.XofExternalAccountCreateInfo
    | Shared.ZarExternalAccountCreateInfo
    | Shared.ZmwExternalAccountCreateInfo
    | Shared.BdtExternalAccountCreateInfo
    | Shared.CopExternalAccountCreateInfo
    | Shared.EgpExternalAccountCreateInfo
    | Shared.GhsExternalAccountCreateInfo
    | Shared.GtqExternalAccountCreateInfo
    | Shared.HtgExternalAccountCreateInfo
    | Shared.JmdExternalAccountCreateInfo
    | Shared.PkrExternalAccountCreateInfo
    | SparkWalletInfo
    | LightningWalletInfo
    | SolanaWalletInfo
    | TronWalletInfo
    | PolygonWalletInfo
    | BaseWalletInfo
    | Shared.EthereumWalletExternalAccountInfo;

  /**
   * The ISO 4217 currency code
   */
  currency: string;

  /**
   * The blockchain network for this external account. Required when the account is a
   * cryptocurrency wallet. Specifies which network the wallet is on. Example values:
   * SOLANA_MAINNET, SOLANA_DEVNET, ETHEREUM_MAINNET, ETHEREUM_TESTNET, BASE_MAINNET,
   * BASE_TESTNET, SPARK_MAINNET, SPARK_TESTNET, LIGHTNING_MAINNET,
   * LIGHTNING_REGTEST.
   */
  cryptoNetwork?: string;

  /**
   * The ID of the customer for whom to create the external account. If not provided,
   * the external account will be created on behalf of the platform.
   */
  customerId?: string;

  /**
   * Whether to set the external account as the default UMA deposit account. When set
   * to true, incoming payments to this customer's UMA address will be automatically
   * deposited into this external account. False if not provided. Note that only one
   * external account can be set as the default UMA deposit account for a customer,
   * so if there is already a default UMA deposit account, this will override the
   * existing default UMA deposit account. If there is no default UMA deposit
   * account, incoming UMA payments will be deposited into the primary internal
   * account for the customer.
   */
  defaultUmaDepositAccount?: boolean;

  /**
   * Your platform's identifier for the account in your system. This can be used to
   * reference the account by your own identifier.
   */
  platformAccountId?: string;
}

export interface ExternalAccountListParams extends DefaultPaginationParams {
  /**
   * Filter by currency code
   */
  currency?: string;

  /**
   * Filter by external accounts associated with a specific customer
   */
  customerId?: string;

  /**
   * Maximum number of results to return (default 20, max 100)
   */
  limit?: number;
}

export declare namespace ExternalAccounts {
  export {
    type Address as Address,
    type BaseWalletInfo as BaseWalletInfo,
    type BeneficiaryVerifiedData as BeneficiaryVerifiedData,
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
}
