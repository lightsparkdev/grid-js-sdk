// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as ExternalAccountsAPI from './external-accounts';
import * as Shared from '../shared';
import * as PlatformExternalAccountsAPI from '../platform/external-accounts';
import { APIPromise } from '../../core/api-promise';
import { DefaultPagination, type DefaultPaginationParams, PagePromise } from '../../core/pagination';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

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
   * Retrieve a customer external account by its system-generated ID
   *
   * @example
   * ```ts
   * const externalAccount =
   *   await client.customers.externalAccounts.retrieve(
   *     'externalAccountId',
   *   );
   * ```
   */
  retrieve(externalAccountID: string, options?: RequestOptions): APIPromise<ExternalAccount> {
    return this._client.get(path`/customers/external-accounts/${externalAccountID}`, options);
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

  /**
   * Delete a customer external account by its system-generated ID
   *
   * @example
   * ```ts
   * await client.customers.externalAccounts.delete(
   *   'externalAccountId',
   * );
   * ```
   */
  delete(externalAccountID: string, options?: RequestOptions): APIPromise<void> {
    return this._client.delete(path`/customers/external-accounts/${externalAccountID}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
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

export interface AedExternalAccountInfo extends PlatformExternalAccountsAPI.AedAccountInfo {}

export interface BaseWalletInfo {
  accountType: 'BASE_WALLET';

  /**
   * Base eth wallet address
   */
  address: string;
}

export interface BdtExternalAccountInfo extends PlatformExternalAccountsAPI.BdtAccountInfo {}

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

export interface BwpExternalAccountInfo extends PlatformExternalAccountsAPI.BwpAccountInfo {}

export interface CadExternalAccountInfo extends PlatformExternalAccountsAPI.CadAccountInfo {}

export interface CopExternalAccountInfo extends PlatformExternalAccountsAPI.CopAccountInfo {}

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

export interface EgpExternalAccountInfo extends PlatformExternalAccountsAPI.EgpAccountInfo {}

export interface EurExternalAccountInfo extends PlatformExternalAccountsAPI.EurAccountInfo {}

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
    | Shared.BdtExternalAccountCreateInfo
    | Shared.BrlExternalAccountCreateInfo
    | Shared.BwpExternalAccountCreateInfo
    | Shared.CadExternalAccountCreateInfo
    | Shared.CopExternalAccountCreateInfo
    | Shared.DkkExternalAccountCreateInfo
    | Shared.EgpExternalAccountCreateInfo
    | Shared.EurExternalAccountCreateInfo
    | Shared.GbpExternalAccountCreateInfo
    | Shared.GhsExternalAccountCreateInfo
    | Shared.GtqExternalAccountCreateInfo
    | Shared.HkdExternalAccountCreateInfo
    | Shared.HtgExternalAccountCreateInfo
    | Shared.IdrExternalAccountCreateInfo
    | Shared.InrExternalAccountCreateInfo
    | Shared.JmdExternalAccountCreateInfo
    | Shared.KesExternalAccountCreateInfo
    | Shared.MwkExternalAccountCreateInfo
    | Shared.MxnExternalAccountCreateInfo
    | Shared.MyrExternalAccountCreateInfo
    | Shared.NgnExternalAccountCreateInfo
    | Shared.PhpExternalAccountCreateInfo
    | Shared.PkrExternalAccountCreateInfo
    | Shared.RwfExternalAccountCreateInfo
    | Shared.SgdExternalAccountCreateInfo
    | Shared.SlvExternalAccountCreateInfo
    | Shared.ThbExternalAccountCreateInfo
    | Shared.TzsExternalAccountCreateInfo
    | Shared.UgxExternalAccountCreateInfo
    | Shared.UsdExternalAccountCreateInfo
    | Shared.VndExternalAccountCreateInfo
    | Shared.XafExternalAccountCreateInfo
    | Shared.XofExternalAccountCreateInfo
    | Shared.ZarExternalAccountCreateInfo
    | Shared.ZmwExternalAccountCreateInfo
    | ExternalAccountCreate.SwiftExternalAccountCreateInfo
    | BaseWalletInfo
    | Shared.EthereumWalletExternalAccountInfo
    | LightningWalletInfo
    | PolygonWalletInfo
    | SolanaWalletInfo
    | SparkWalletInfo
    | TronWalletInfo;

  /**
   * The ISO 4217 currency code
   */
  currency: string;

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
  export interface SwiftExternalAccountCreateInfo {
    accountType: 'SWIFT_ACCOUNT';

    /**
     * The name of the bank
     */
    bankName: string;

    beneficiary: SwiftExternalAccountCreateInfo.SwiftBeneficiary | ExternalAccountsAPI.BusinessBeneficiary;

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

  export namespace SwiftExternalAccountCreateInfo {
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
  }
}

/**
 * Lightning payment destination. Exactly one of `invoice`, `bolt12`, or
 * `lightningAddress` must be provided.
 */
export type ExternalAccountInfoOneOf =
  | AedExternalAccountInfo
  | BdtExternalAccountInfo
  | BrlExternalAccountInfo
  | BwpExternalAccountInfo
  | CadExternalAccountInfo
  | CopExternalAccountInfo
  | DkkExternalAccountInfo
  | EgpExternalAccountInfo
  | EurExternalAccountInfo
  | GbpExternalAccountInfo
  | GhsExternalAccountInfo
  | GtqExternalAccountInfo
  | HkdExternalAccountInfo
  | HtgExternalAccountInfo
  | IdrExternalAccountInfo
  | InrExternalAccountInfo
  | JmdExternalAccountInfo
  | KesExternalAccountInfo
  | MwkExternalAccountInfo
  | MxnExternalAccountInfo
  | MyrExternalAccountInfo
  | NgnExternalAccountInfo
  | PhpExternalAccountInfo
  | PkrExternalAccountInfo
  | RwfExternalAccountInfo
  | SgdExternalAccountInfo
  | ExternalAccountInfoOneOf.SlvExternalAccountInfo
  | ThbExternalAccountInfo
  | TzsExternalAccountInfo
  | UgxExternalAccountInfo
  | UsdExternalAccountInfo
  | VndExternalAccountInfo
  | XafExternalAccountInfo
  | XofExternalAccountInfo
  | ZarExternalAccountInfo
  | ZmwExternalAccountInfo
  | ExternalAccountInfoOneOf.SwiftExternalAccountInfo
  | BaseWalletInfo
  | Shared.EthereumWalletExternalAccountInfo
  | LightningWalletInfo
  | PolygonWalletInfo
  | SolanaWalletInfo
  | SparkWalletInfo
  | TronWalletInfo;

export namespace ExternalAccountInfoOneOf {
  export interface SlvExternalAccountInfo {
    accountType: 'SLV_ACCOUNT';

    beneficiary: Shared.SlvBeneficiary | ExternalAccountsAPI.BusinessBeneficiary;

    paymentRails: Array<'BANK_TRANSFER' | 'MOBILE_MONEY'>;

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

  export interface SwiftExternalAccountInfo {
    accountType: 'SWIFT_ACCOUNT';

    /**
     * The name of the bank
     */
    bankName: string;

    beneficiary: SwiftExternalAccountInfo.SwiftBeneficiary | ExternalAccountsAPI.BusinessBeneficiary;

    /**
     * The ISO 3166-1 alpha-2 country code of the bank account
     */
    country: string;

    paymentRails: Array<'SWIFT'>;

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

  export namespace SwiftExternalAccountInfo {
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

export interface GhsExternalAccountInfo extends PlatformExternalAccountsAPI.GhsAccountInfo {}

export interface GtqExternalAccountInfo extends PlatformExternalAccountsAPI.GtqAccountInfo {}

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

export interface HtgExternalAccountInfo extends PlatformExternalAccountsAPI.HtgAccountInfo {}

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

export interface JmdExternalAccountInfo extends PlatformExternalAccountsAPI.JmdAccountInfo {}

export interface KesExternalAccountInfo extends PlatformExternalAccountsAPI.KesAccountInfo {}

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

export interface MwkExternalAccountInfo extends PlatformExternalAccountsAPI.MwkAccountInfo {}

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

export interface NgnExternalAccountInfo extends PlatformExternalAccountsAPI.NgnAccountInfo {}

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

export interface PkrExternalAccountInfo extends PlatformExternalAccountsAPI.PkrAccountInfo {}

export interface PolygonWalletInfo {
  accountType: 'POLYGON_WALLET';

  /**
   * Polygon eth wallet address
   */
  address: string;
}

export interface RwfExternalAccountInfo extends PlatformExternalAccountsAPI.RwfAccountInfo {}

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

export interface TzsExternalAccountInfo extends PlatformExternalAccountsAPI.TzsAccountInfo {}

export interface UgxExternalAccountInfo extends PlatformExternalAccountsAPI.UgxAccountInfo {}

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

export interface XafExternalAccountInfo extends PlatformExternalAccountsAPI.XafAccountInfo {}

export interface XofExternalAccountInfo extends PlatformExternalAccountsAPI.XofAccountInfo {}

export interface ZarExternalAccountInfo extends PlatformExternalAccountsAPI.ZarAccountInfo {}

export interface ZmwExternalAccountInfo extends PlatformExternalAccountsAPI.ZmwAccountInfo {}

export interface ExternalAccountCreateParams {
  /**
   * Lightning payment destination. Exactly one of `invoice`, `bolt12`, or
   * `lightningAddress` must be provided.
   */
  accountInfo:
    | Shared.AedExternalAccountCreateInfo
    | Shared.BdtExternalAccountCreateInfo
    | Shared.BrlExternalAccountCreateInfo
    | Shared.BwpExternalAccountCreateInfo
    | Shared.CadExternalAccountCreateInfo
    | Shared.CopExternalAccountCreateInfo
    | Shared.DkkExternalAccountCreateInfo
    | Shared.EgpExternalAccountCreateInfo
    | Shared.EurExternalAccountCreateInfo
    | Shared.GbpExternalAccountCreateInfo
    | Shared.GhsExternalAccountCreateInfo
    | Shared.GtqExternalAccountCreateInfo
    | Shared.HkdExternalAccountCreateInfo
    | Shared.HtgExternalAccountCreateInfo
    | Shared.IdrExternalAccountCreateInfo
    | Shared.InrExternalAccountCreateInfo
    | Shared.JmdExternalAccountCreateInfo
    | Shared.KesExternalAccountCreateInfo
    | Shared.MwkExternalAccountCreateInfo
    | Shared.MxnExternalAccountCreateInfo
    | Shared.MyrExternalAccountCreateInfo
    | Shared.NgnExternalAccountCreateInfo
    | Shared.PhpExternalAccountCreateInfo
    | Shared.PkrExternalAccountCreateInfo
    | Shared.RwfExternalAccountCreateInfo
    | Shared.SgdExternalAccountCreateInfo
    | Shared.SlvExternalAccountCreateInfo
    | Shared.ThbExternalAccountCreateInfo
    | Shared.TzsExternalAccountCreateInfo
    | Shared.UgxExternalAccountCreateInfo
    | Shared.UsdExternalAccountCreateInfo
    | Shared.VndExternalAccountCreateInfo
    | Shared.XafExternalAccountCreateInfo
    | Shared.XofExternalAccountCreateInfo
    | Shared.ZarExternalAccountCreateInfo
    | Shared.ZmwExternalAccountCreateInfo
    | ExternalAccountCreateParams.SwiftExternalAccountCreateInfo
    | BaseWalletInfo
    | Shared.EthereumWalletExternalAccountInfo
    | LightningWalletInfo
    | PolygonWalletInfo
    | SolanaWalletInfo
    | SparkWalletInfo
    | TronWalletInfo;

  /**
   * The ISO 4217 currency code
   */
  currency: string;

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
  export interface SwiftExternalAccountCreateInfo {
    accountType: 'SWIFT_ACCOUNT';

    /**
     * The name of the bank
     */
    bankName: string;

    beneficiary: SwiftExternalAccountCreateInfo.SwiftBeneficiary | ExternalAccountsAPI.BusinessBeneficiary;

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

  export namespace SwiftExternalAccountCreateInfo {
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
}
