// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as ExternalAccountsAPI from './external-accounts';
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
    | ExternalAccountCreate.AedExternalAccountCreateInfo
    | ExternalAccountCreate.BrlExternalAccountCreateInfo
    | ExternalAccountCreate.BwpExternalAccountCreateInfo
    | ExternalAccountCreate.CadExternalAccountCreateInfo
    | ExternalAccountCreate.DkkExternalAccountCreateInfo
    | ExternalAccountCreate.EurExternalAccountCreateInfo
    | ExternalAccountCreate.GbpExternalAccountCreateInfo
    | ExternalAccountCreate.HkdExternalAccountCreateInfo
    | ExternalAccountCreate.IdrExternalAccountCreateInfo
    | ExternalAccountCreate.InrExternalAccountCreateInfo
    | ExternalAccountCreate.KesExternalAccountCreateInfo
    | ExternalAccountCreate.MwkExternalAccountCreateInfo
    | ExternalAccountCreate.MxnExternalAccountCreateInfo
    | ExternalAccountCreate.MyrExternalAccountCreateInfo
    | ExternalAccountCreate.NgnExternalAccountCreateInfo
    | ExternalAccountCreate.PhpExternalAccountCreateInfo
    | ExternalAccountCreate.RwfExternalAccountCreateInfo
    | ExternalAccountCreate.SgdExternalAccountCreateInfo
    | ExternalAccountCreate.ThbExternalAccountCreateInfo
    | ExternalAccountCreate.TzsExternalAccountCreateInfo
    | ExternalAccountCreate.UgxExternalAccountCreateInfo
    | ExternalAccountCreate.UsdExternalAccountCreateInfo
    | ExternalAccountCreate.VndExternalAccountCreateInfo
    | ExternalAccountCreate.XafExternalAccountCreateInfo
    | ExternalAccountCreate.XofExternalAccountCreateInfo
    | ExternalAccountCreate.ZarExternalAccountCreateInfo
    | ExternalAccountCreate.ZmwExternalAccountCreateInfo
    | ExternalAccountCreate.BdtExternalAccountCreateInfo
    | ExternalAccountCreate.CopExternalAccountCreateInfo
    | ExternalAccountCreate.EgpExternalAccountCreateInfo
    | ExternalAccountCreate.GhsExternalAccountCreateInfo
    | ExternalAccountCreate.GtqExternalAccountCreateInfo
    | ExternalAccountCreate.HtgExternalAccountCreateInfo
    | ExternalAccountCreate.JmdExternalAccountCreateInfo
    | ExternalAccountCreate.PkrExternalAccountCreateInfo
    | SparkWalletInfo
    | LightningWalletInfo
    | SolanaWalletInfo
    | TronWalletInfo
    | PolygonWalletInfo
    | BaseWalletInfo
    | ExternalAccountCreate.EthereumWalletExternalAccountInfo;

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

export namespace ExternalAccountCreate {
  export interface AedExternalAccountCreateInfo {
    accountType: 'AED_ACCOUNT';

    beneficiary: AedExternalAccountCreateInfo.AedBeneficiary | ExternalAccountsAPI.BusinessBeneficiary;

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

  export interface BwpExternalAccountCreateInfo {
    accountType: 'BWP_ACCOUNT';

    beneficiary: BwpExternalAccountCreateInfo.BwpBeneficiary | ExternalAccountsAPI.BusinessBeneficiary;

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

    beneficiary: CadExternalAccountCreateInfo.CadBeneficiary | ExternalAccountsAPI.BusinessBeneficiary;

    /**
     * Transit number identifying the branch (5 digits)
     */
    branchCode: string;
  }

  export namespace CadExternalAccountCreateInfo {
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

  export interface EurExternalAccountCreateInfo {
    accountType: 'EUR_ACCOUNT';

    beneficiary: EurExternalAccountCreateInfo.EurBeneficiary | ExternalAccountsAPI.BusinessBeneficiary;

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

  export interface KesExternalAccountCreateInfo {
    accountType: 'KES_ACCOUNT';

    beneficiary: KesExternalAccountCreateInfo.KesBeneficiary | ExternalAccountsAPI.BusinessBeneficiary;

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
  }

  export interface MwkExternalAccountCreateInfo {
    accountType: 'MWK_ACCOUNT';

    beneficiary: MwkExternalAccountCreateInfo.MwkBeneficiary | ExternalAccountsAPI.BusinessBeneficiary;

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

    beneficiary: NgnExternalAccountCreateInfo.NgnBeneficiary | ExternalAccountsAPI.BusinessBeneficiary;
  }

  export namespace NgnExternalAccountCreateInfo {
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

  export interface RwfExternalAccountCreateInfo {
    accountType: 'RWF_ACCOUNT';

    beneficiary: RwfExternalAccountCreateInfo.RwfBeneficiary | ExternalAccountsAPI.BusinessBeneficiary;

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

  export interface TzsExternalAccountCreateInfo {
    accountType: 'TZS_ACCOUNT';

    beneficiary: TzsExternalAccountCreateInfo.TzsBeneficiary | ExternalAccountsAPI.BusinessBeneficiary;

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
  }

  export interface UgxExternalAccountCreateInfo {
    accountType: 'UGX_ACCOUNT';

    beneficiary: UgxExternalAccountCreateInfo.UgxBeneficiary | ExternalAccountsAPI.BusinessBeneficiary;

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

  export interface XafExternalAccountCreateInfo {
    accountType: 'XAF_ACCOUNT';

    beneficiary: XafExternalAccountCreateInfo.XafBeneficiary | ExternalAccountsAPI.BusinessBeneficiary;

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
  }

  export interface XofExternalAccountCreateInfo {
    accountType: 'XOF_ACCOUNT';

    beneficiary: XofExternalAccountCreateInfo.XofBeneficiary | ExternalAccountsAPI.BusinessBeneficiary;

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

    beneficiary: ZarExternalAccountCreateInfo.ZarBeneficiary | ExternalAccountsAPI.BusinessBeneficiary;
  }

  export namespace ZarExternalAccountCreateInfo {
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
  }

  export interface ZmwExternalAccountCreateInfo {
    accountType: 'ZMW_ACCOUNT';

    beneficiary: ZmwExternalAccountCreateInfo.ZmwBeneficiary | ExternalAccountsAPI.BusinessBeneficiary;

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
  }

  export interface BdtExternalAccountCreateInfo {
    /**
     * The account number of the bank
     */
    accountNumber: string;

    accountType: 'BDT_ACCOUNT';

    beneficiary: BdtExternalAccountCreateInfo.BdtBeneficiary | ExternalAccountsAPI.BusinessBeneficiary;

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

  export namespace BdtExternalAccountCreateInfo {
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

    beneficiary: CopExternalAccountCreateInfo.CopBeneficiary | ExternalAccountsAPI.BusinessBeneficiary;

    /**
     * The phone number in international format
     */
    phoneNumber: string;
  }

  export namespace CopExternalAccountCreateInfo {
    export interface CopBeneficiary {
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
  }

  export interface EgpExternalAccountCreateInfo {
    /**
     * The account number of the bank
     */
    accountNumber: string;

    accountType: 'EGP_ACCOUNT';

    beneficiary: EgpExternalAccountCreateInfo.EgpBeneficiary | ExternalAccountsAPI.BusinessBeneficiary;

    /**
     * The IBAN of the bank account
     */
    iban?: string;

    /**
     * The SWIFT/BIC code of the bank
     */
    swiftCode?: string;
  }

  export namespace EgpExternalAccountCreateInfo {
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
  }

  export interface GhsExternalAccountCreateInfo {
    /**
     * The account number of the bank
     */
    accountNumber: string;

    accountType: 'GHS_ACCOUNT';

    beneficiary: GhsExternalAccountCreateInfo.GhsBeneficiary | ExternalAccountsAPI.BusinessBeneficiary;

    /**
     * The phone number in international format
     */
    phoneNumber: string;
  }

  export namespace GhsExternalAccountCreateInfo {
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
  }

  export interface GtqExternalAccountCreateInfo {
    /**
     * The account number of the bank
     */
    accountNumber: string;

    accountType: 'GTQ_ACCOUNT';

    beneficiary: GtqExternalAccountCreateInfo.GtqBeneficiary | ExternalAccountsAPI.BusinessBeneficiary;

    /**
     * The phone number in international format
     */
    phoneNumber: string;
  }

  export namespace GtqExternalAccountCreateInfo {
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
  }

  export interface HtgExternalAccountCreateInfo {
    accountType: 'HTG_ACCOUNT';

    beneficiary: HtgExternalAccountCreateInfo.HtgBeneficiary | ExternalAccountsAPI.BusinessBeneficiary;

    /**
     * The phone number in international format
     */
    phoneNumber: string;
  }

  export namespace HtgExternalAccountCreateInfo {
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

    beneficiary: JmdExternalAccountCreateInfo.JmdBeneficiary | ExternalAccountsAPI.BusinessBeneficiary;

    /**
     * The branch code
     */
    branchCode: string;
  }

  export namespace JmdExternalAccountCreateInfo {
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
  }

  export interface PkrExternalAccountCreateInfo {
    /**
     * The account number of the bank
     */
    accountNumber: string;

    accountType: 'PKR_ACCOUNT';

    beneficiary: PkrExternalAccountCreateInfo.PkrBeneficiary | ExternalAccountsAPI.BusinessBeneficiary;

    /**
     * The phone number in international format
     */
    phoneNumber: string;

    /**
     * The IBAN of the bank account
     */
    iban?: string;
  }

  export namespace PkrExternalAccountCreateInfo {
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
  }

  export interface EthereumWalletExternalAccountInfo {
    accountType: 'ETHEREUM_WALLET';

    /**
     * Ethereum L1 wallet address
     */
    address: string;
  }
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
  | ExternalAccountInfoOneOf.EthereumWalletExternalAccountInfo
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

    beneficiary: KesExternalAccountInfo.KesBeneficiary | ExternalAccountsAPI.BusinessBeneficiary;

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

  export namespace KesExternalAccountInfo {
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
  }

  export interface MwkExternalAccountInfo {
    accountType: 'MWK_ACCOUNT';

    beneficiary: MwkExternalAccountInfo.MwkBeneficiary | ExternalAccountsAPI.BusinessBeneficiary;

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

  export namespace MwkExternalAccountInfo {
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
  }

  export interface NgnExternalAccountInfo extends PlatformExternalAccountsAPI.NgnAccountInfo {}

  export interface RwfExternalAccountInfo {
    accountType: 'RWF_ACCOUNT';

    beneficiary: RwfExternalAccountInfo.RwfBeneficiary | ExternalAccountsAPI.BusinessBeneficiary;

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

  export namespace RwfExternalAccountInfo {
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
  }

  export interface TzsExternalAccountInfo {
    accountType: 'TZS_ACCOUNT';

    beneficiary: TzsExternalAccountInfo.TzsBeneficiary | ExternalAccountsAPI.BusinessBeneficiary;

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

  export namespace TzsExternalAccountInfo {
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
  }

  export interface UgxExternalAccountInfo {
    accountType: 'UGX_ACCOUNT';

    beneficiary: UgxExternalAccountInfo.UgxBeneficiary | ExternalAccountsAPI.BusinessBeneficiary;

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

  export namespace UgxExternalAccountInfo {
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
  }

  export interface XofExternalAccountInfo {
    accountType: 'XOF_ACCOUNT';

    beneficiary: XofExternalAccountInfo.XofBeneficiary | ExternalAccountsAPI.BusinessBeneficiary;

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

  export namespace XofExternalAccountInfo {
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

    beneficiary: ZarExternalAccountInfo.ZarBeneficiary | ExternalAccountsAPI.BusinessBeneficiary;

    paymentRails: Array<'BANK_TRANSFER'>;
  }

  export namespace ZarExternalAccountInfo {
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
  }

  export interface ZmwExternalAccountInfo {
    accountType: 'ZMW_ACCOUNT';

    beneficiary: ZmwExternalAccountInfo.ZmwBeneficiary | ExternalAccountsAPI.BusinessBeneficiary;

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

  export namespace ZmwExternalAccountInfo {
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
  }

  export interface EthereumWalletExternalAccountInfo {
    accountType: 'ETHEREUM_WALLET';

    /**
     * Ethereum L1 wallet address
     */
    address: string;
  }

  export interface AedExternalAccountInfo {
    accountType: 'AED_ACCOUNT';

    beneficiary: AedExternalAccountInfo.AedBeneficiary | ExternalAccountsAPI.BusinessBeneficiary;

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

  export namespace AedExternalAccountInfo {
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
  }

  export interface BwpExternalAccountInfo {
    accountType: 'BWP_ACCOUNT';

    beneficiary: BwpExternalAccountInfo.BwpBeneficiary | ExternalAccountsAPI.BusinessBeneficiary;

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

  export namespace BwpExternalAccountInfo {
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
  }

  export interface XafExternalAccountInfo {
    accountType: 'XAF_ACCOUNT';

    beneficiary: XafExternalAccountInfo.XafBeneficiary | ExternalAccountsAPI.BusinessBeneficiary;

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

  export namespace XafExternalAccountInfo {
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
  }

  export interface BdtExternalAccountInfo {
    /**
     * The account number of the bank
     */
    accountNumber: string;

    accountType: 'BDT_ACCOUNT';

    beneficiary: BdtExternalAccountInfo.BdtBeneficiary | ExternalAccountsAPI.BusinessBeneficiary;

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

  export namespace BdtExternalAccountInfo {
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

    beneficiary: CopExternalAccountInfo.CopBeneficiary | ExternalAccountsAPI.BusinessBeneficiary;

    paymentRails: Array<'BANK_TRANSFER' | 'MOBILE_MONEY'>;

    /**
     * The phone number in international format
     */
    phoneNumber: string;
  }

  export namespace CopExternalAccountInfo {
    export interface CopBeneficiary {
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
  }

  export interface EgpExternalAccountInfo {
    /**
     * The account number of the bank
     */
    accountNumber: string;

    accountType: 'EGP_ACCOUNT';

    beneficiary: EgpExternalAccountInfo.EgpBeneficiary | ExternalAccountsAPI.BusinessBeneficiary;

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

  export namespace EgpExternalAccountInfo {
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
  }

  export interface GhsExternalAccountInfo {
    /**
     * The account number of the bank
     */
    accountNumber: string;

    accountType: 'GHS_ACCOUNT';

    beneficiary: GhsExternalAccountInfo.GhsBeneficiary | ExternalAccountsAPI.BusinessBeneficiary;

    paymentRails: Array<'BANK_TRANSFER' | 'MOBILE_MONEY'>;

    /**
     * The phone number in international format
     */
    phoneNumber: string;
  }

  export namespace GhsExternalAccountInfo {
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
  }

  export interface GtqExternalAccountInfo {
    /**
     * The account number of the bank
     */
    accountNumber: string;

    accountType: 'GTQ_ACCOUNT';

    beneficiary: GtqExternalAccountInfo.GtqBeneficiary | ExternalAccountsAPI.BusinessBeneficiary;

    paymentRails: Array<'BANK_TRANSFER' | 'MOBILE_MONEY'>;

    /**
     * The phone number in international format
     */
    phoneNumber: string;
  }

  export namespace GtqExternalAccountInfo {
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
  }

  export interface HtgExternalAccountInfo {
    accountType: 'HTG_ACCOUNT';

    beneficiary: HtgExternalAccountInfo.HtgBeneficiary | ExternalAccountsAPI.BusinessBeneficiary;

    paymentRails: Array<'MOBILE_MONEY'>;

    /**
     * The phone number in international format
     */
    phoneNumber: string;
  }

  export namespace HtgExternalAccountInfo {
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

    beneficiary: JmdExternalAccountInfo.JmdBeneficiary | ExternalAccountsAPI.BusinessBeneficiary;

    /**
     * The branch code
     */
    branchCode: string;

    paymentRails: Array<'BANK_TRANSFER'>;
  }

  export namespace JmdExternalAccountInfo {
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
  }

  export interface PkrExternalAccountInfo {
    /**
     * The account number of the bank
     */
    accountNumber: string;

    accountType: 'PKR_ACCOUNT';

    beneficiary: PkrExternalAccountInfo.PkrBeneficiary | ExternalAccountsAPI.BusinessBeneficiary;

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

  export namespace PkrExternalAccountInfo {
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
    | ExternalAccountCreateParams.AedExternalAccountCreateInfo
    | ExternalAccountCreateParams.BrlExternalAccountCreateInfo
    | ExternalAccountCreateParams.BwpExternalAccountCreateInfo
    | ExternalAccountCreateParams.CadExternalAccountCreateInfo
    | ExternalAccountCreateParams.DkkExternalAccountCreateInfo
    | ExternalAccountCreateParams.EurExternalAccountCreateInfo
    | ExternalAccountCreateParams.GbpExternalAccountCreateInfo
    | ExternalAccountCreateParams.HkdExternalAccountCreateInfo
    | ExternalAccountCreateParams.IdrExternalAccountCreateInfo
    | ExternalAccountCreateParams.InrExternalAccountCreateInfo
    | ExternalAccountCreateParams.KesExternalAccountCreateInfo
    | ExternalAccountCreateParams.MwkExternalAccountCreateInfo
    | ExternalAccountCreateParams.MxnExternalAccountCreateInfo
    | ExternalAccountCreateParams.MyrExternalAccountCreateInfo
    | ExternalAccountCreateParams.NgnExternalAccountCreateInfo
    | ExternalAccountCreateParams.PhpExternalAccountCreateInfo
    | ExternalAccountCreateParams.RwfExternalAccountCreateInfo
    | ExternalAccountCreateParams.SgdExternalAccountCreateInfo
    | ExternalAccountCreateParams.ThbExternalAccountCreateInfo
    | ExternalAccountCreateParams.TzsExternalAccountCreateInfo
    | ExternalAccountCreateParams.UgxExternalAccountCreateInfo
    | ExternalAccountCreateParams.UsdExternalAccountCreateInfo
    | ExternalAccountCreateParams.VndExternalAccountCreateInfo
    | ExternalAccountCreateParams.XafExternalAccountCreateInfo
    | ExternalAccountCreateParams.XofExternalAccountCreateInfo
    | ExternalAccountCreateParams.ZarExternalAccountCreateInfo
    | ExternalAccountCreateParams.ZmwExternalAccountCreateInfo
    | ExternalAccountCreateParams.BdtExternalAccountCreateInfo
    | ExternalAccountCreateParams.CopExternalAccountCreateInfo
    | ExternalAccountCreateParams.EgpExternalAccountCreateInfo
    | ExternalAccountCreateParams.GhsExternalAccountCreateInfo
    | ExternalAccountCreateParams.GtqExternalAccountCreateInfo
    | ExternalAccountCreateParams.HtgExternalAccountCreateInfo
    | ExternalAccountCreateParams.JmdExternalAccountCreateInfo
    | ExternalAccountCreateParams.PkrExternalAccountCreateInfo
    | SparkWalletInfo
    | LightningWalletInfo
    | SolanaWalletInfo
    | TronWalletInfo
    | PolygonWalletInfo
    | BaseWalletInfo
    | ExternalAccountCreateParams.EthereumWalletExternalAccountInfo;

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

export namespace ExternalAccountCreateParams {
  export interface AedExternalAccountCreateInfo {
    accountType: 'AED_ACCOUNT';

    beneficiary: AedExternalAccountCreateInfo.AedBeneficiary | ExternalAccountsAPI.BusinessBeneficiary;

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

  export interface BwpExternalAccountCreateInfo {
    accountType: 'BWP_ACCOUNT';

    beneficiary: BwpExternalAccountCreateInfo.BwpBeneficiary | ExternalAccountsAPI.BusinessBeneficiary;

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

    beneficiary: CadExternalAccountCreateInfo.CadBeneficiary | ExternalAccountsAPI.BusinessBeneficiary;

    /**
     * Transit number identifying the branch (5 digits)
     */
    branchCode: string;
  }

  export namespace CadExternalAccountCreateInfo {
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

  export interface EurExternalAccountCreateInfo {
    accountType: 'EUR_ACCOUNT';

    beneficiary: EurExternalAccountCreateInfo.EurBeneficiary | ExternalAccountsAPI.BusinessBeneficiary;

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

  export interface KesExternalAccountCreateInfo {
    accountType: 'KES_ACCOUNT';

    beneficiary: KesExternalAccountCreateInfo.KesBeneficiary | ExternalAccountsAPI.BusinessBeneficiary;

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
  }

  export interface MwkExternalAccountCreateInfo {
    accountType: 'MWK_ACCOUNT';

    beneficiary: MwkExternalAccountCreateInfo.MwkBeneficiary | ExternalAccountsAPI.BusinessBeneficiary;

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

    beneficiary: NgnExternalAccountCreateInfo.NgnBeneficiary | ExternalAccountsAPI.BusinessBeneficiary;
  }

  export namespace NgnExternalAccountCreateInfo {
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

  export interface RwfExternalAccountCreateInfo {
    accountType: 'RWF_ACCOUNT';

    beneficiary: RwfExternalAccountCreateInfo.RwfBeneficiary | ExternalAccountsAPI.BusinessBeneficiary;

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

  export interface TzsExternalAccountCreateInfo {
    accountType: 'TZS_ACCOUNT';

    beneficiary: TzsExternalAccountCreateInfo.TzsBeneficiary | ExternalAccountsAPI.BusinessBeneficiary;

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
  }

  export interface UgxExternalAccountCreateInfo {
    accountType: 'UGX_ACCOUNT';

    beneficiary: UgxExternalAccountCreateInfo.UgxBeneficiary | ExternalAccountsAPI.BusinessBeneficiary;

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

  export interface XafExternalAccountCreateInfo {
    accountType: 'XAF_ACCOUNT';

    beneficiary: XafExternalAccountCreateInfo.XafBeneficiary | ExternalAccountsAPI.BusinessBeneficiary;

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
  }

  export interface XofExternalAccountCreateInfo {
    accountType: 'XOF_ACCOUNT';

    beneficiary: XofExternalAccountCreateInfo.XofBeneficiary | ExternalAccountsAPI.BusinessBeneficiary;

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

    beneficiary: ZarExternalAccountCreateInfo.ZarBeneficiary | ExternalAccountsAPI.BusinessBeneficiary;
  }

  export namespace ZarExternalAccountCreateInfo {
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
  }

  export interface ZmwExternalAccountCreateInfo {
    accountType: 'ZMW_ACCOUNT';

    beneficiary: ZmwExternalAccountCreateInfo.ZmwBeneficiary | ExternalAccountsAPI.BusinessBeneficiary;

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
  }

  export interface BdtExternalAccountCreateInfo {
    /**
     * The account number of the bank
     */
    accountNumber: string;

    accountType: 'BDT_ACCOUNT';

    beneficiary: BdtExternalAccountCreateInfo.BdtBeneficiary | ExternalAccountsAPI.BusinessBeneficiary;

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

  export namespace BdtExternalAccountCreateInfo {
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

    beneficiary: CopExternalAccountCreateInfo.CopBeneficiary | ExternalAccountsAPI.BusinessBeneficiary;

    /**
     * The phone number in international format
     */
    phoneNumber: string;
  }

  export namespace CopExternalAccountCreateInfo {
    export interface CopBeneficiary {
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
  }

  export interface EgpExternalAccountCreateInfo {
    /**
     * The account number of the bank
     */
    accountNumber: string;

    accountType: 'EGP_ACCOUNT';

    beneficiary: EgpExternalAccountCreateInfo.EgpBeneficiary | ExternalAccountsAPI.BusinessBeneficiary;

    /**
     * The IBAN of the bank account
     */
    iban?: string;

    /**
     * The SWIFT/BIC code of the bank
     */
    swiftCode?: string;
  }

  export namespace EgpExternalAccountCreateInfo {
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
  }

  export interface GhsExternalAccountCreateInfo {
    /**
     * The account number of the bank
     */
    accountNumber: string;

    accountType: 'GHS_ACCOUNT';

    beneficiary: GhsExternalAccountCreateInfo.GhsBeneficiary | ExternalAccountsAPI.BusinessBeneficiary;

    /**
     * The phone number in international format
     */
    phoneNumber: string;
  }

  export namespace GhsExternalAccountCreateInfo {
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
  }

  export interface GtqExternalAccountCreateInfo {
    /**
     * The account number of the bank
     */
    accountNumber: string;

    accountType: 'GTQ_ACCOUNT';

    beneficiary: GtqExternalAccountCreateInfo.GtqBeneficiary | ExternalAccountsAPI.BusinessBeneficiary;

    /**
     * The phone number in international format
     */
    phoneNumber: string;
  }

  export namespace GtqExternalAccountCreateInfo {
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
  }

  export interface HtgExternalAccountCreateInfo {
    accountType: 'HTG_ACCOUNT';

    beneficiary: HtgExternalAccountCreateInfo.HtgBeneficiary | ExternalAccountsAPI.BusinessBeneficiary;

    /**
     * The phone number in international format
     */
    phoneNumber: string;
  }

  export namespace HtgExternalAccountCreateInfo {
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

    beneficiary: JmdExternalAccountCreateInfo.JmdBeneficiary | ExternalAccountsAPI.BusinessBeneficiary;

    /**
     * The branch code
     */
    branchCode: string;
  }

  export namespace JmdExternalAccountCreateInfo {
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
  }

  export interface PkrExternalAccountCreateInfo {
    /**
     * The account number of the bank
     */
    accountNumber: string;

    accountType: 'PKR_ACCOUNT';

    beneficiary: PkrExternalAccountCreateInfo.PkrBeneficiary | ExternalAccountsAPI.BusinessBeneficiary;

    /**
     * The phone number in international format
     */
    phoneNumber: string;

    /**
     * The IBAN of the bank account
     */
    iban?: string;
  }

  export namespace PkrExternalAccountCreateInfo {
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
  }

  export interface EthereumWalletExternalAccountInfo {
    accountType: 'ETHEREUM_WALLET';

    /**
     * Ethereum L1 wallet address
     */
    address: string;
  }
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
