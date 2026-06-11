// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as Shared from '../shared';
import * as ExternalAccountsAPI from '../customers/external-accounts';
import { ExternalAccountsDefaultPagination } from '../customers/external-accounts';
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
   * Register a new external bank account for the platform.
   *
   * @example
   * ```ts
   * const externalAccount =
   *   await client.platform.externalAccounts.create({
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
   *   });
   * ```
   */
  create(
    body: ExternalAccountCreateParams,
    options?: RequestOptions,
  ): APIPromise<ExternalAccountsAPI.ExternalAccount> {
    return this._client.post('/platform/external-accounts', {
      body,
      ...options,
      __security: { basicAuth: true },
    });
  }

  /**
   * Retrieve a platform external account by its system-generated ID
   *
   * @example
   * ```ts
   * const externalAccount =
   *   await client.platform.externalAccounts.retrieve(
   *     'externalAccountId',
   *   );
   * ```
   */
  retrieve(
    externalAccountID: string,
    options?: RequestOptions,
  ): APIPromise<ExternalAccountsAPI.ExternalAccount> {
    return this._client.get(path`/platform/external-accounts/${externalAccountID}`, {
      ...options,
      __security: { basicAuth: true },
    });
  }

  /**
   * Retrieve a list of all external accounts that belong to the platform, as opposed
   * to an individual customer.
   *
   * These accounts are used for platform-wide operations such as receiving funds
   * from external sources or managing platform-level payment destinations.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const externalAccount of client.platform.externalAccounts.list()) {
   *   // ...
   * }
   * ```
   */
  list(
    query: ExternalAccountListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<ExternalAccountsDefaultPagination, ExternalAccountsAPI.ExternalAccount> {
    return this._client.getAPIList(
      '/platform/external-accounts',
      DefaultPagination<ExternalAccountsAPI.ExternalAccount>,
      { query, ...options, __security: { basicAuth: true } },
    );
  }

  /**
   * Delete a platform external account by its system-generated ID
   *
   * @example
   * ```ts
   * await client.platform.externalAccounts.delete(
   *   'externalAccountId',
   * );
   * ```
   */
  delete(externalAccountID: string, options?: RequestOptions): APIPromise<void> {
    return this._client.delete(path`/platform/external-accounts/${externalAccountID}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
      __security: { basicAuth: true },
    });
  }
}

export interface AedAccountInfo {
  accountType: 'AED_ACCOUNT';

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

/**
 * Required fields depend on the selected paymentRails:
 *
 * - BANK_TRANSFER: accountNumber, bankName
 * - MOBILE_MONEY: bankName, phoneNumber
 */
export interface BdtAccountInfo {
  accountType: 'BDT_ACCOUNT';

  /**
   * The name of the bank
   */
  bankName: string;

  paymentRails: Array<'BANK_TRANSFER' | 'MOBILE_MONEY'>;

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

export interface BrlAccountInfo {
  accountType: 'BRL_ACCOUNT';

  paymentRails: Array<'PIX'>;

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

export interface BwpAccountInfo {
  accountType: 'BWP_ACCOUNT';

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

export interface CadAccountInfo {
  /**
   * Bank account number (7-12 digits)
   */
  accountNumber: string;

  accountType: 'CAD_ACCOUNT';

  /**
   * Canadian financial institution number (3 digits)
   */
  bankCode: string;

  /**
   * Transit number identifying the branch (5 digits)
   */
  branchCode: string;

  paymentRails: Array<'BANK_TRANSFER'>;
}

/**
 * Required fields depend on the selected paymentRails:
 *
 * - BANK_TRANSFER: accountNumber, bankAccountType, bankName
 * - MOBILE_MONEY: bankName, phoneNumber
 */
export interface CopAccountInfo {
  accountType: 'COP_ACCOUNT';

  /**
   * The name of the bank
   */
  bankName: string;

  paymentRails: Array<'BANK_TRANSFER' | 'MOBILE_MONEY'>;

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

export interface DkkAccountInfo {
  accountType: 'DKK_ACCOUNT';

  /**
   * Danish IBAN (18 characters, starting with DK)
   */
  iban: string;

  paymentRails: Array<'SEPA' | 'SEPA_INSTANT'>;

  /**
   * The SWIFT/BIC code of the bank
   */
  swiftCode?: string;
}

/**
 * Required fields depend on the selected paymentRails:
 *
 * - BANK_TRANSFER: bankName, iban
 * - MOBILE_MONEY: bankName, phoneNumber
 */
export interface EgpAccountInfo {
  accountType: 'EGP_ACCOUNT';

  /**
   * The name of the bank
   */
  bankName: string;

  paymentRails: Array<'BANK_TRANSFER' | 'MOBILE_MONEY'>;

  /**
   * Egyptian IBAN (29 characters, starting with EG)
   */
  iban?: string;

  /**
   * The phone number in international format
   */
  phoneNumber?: string;
}

export interface EurAccountInfo {
  accountType: 'EUR_ACCOUNT';

  /**
   * The IBAN of the bank account
   */
  iban: string;

  paymentRails: Array<'SEPA' | 'SEPA_INSTANT'>;

  /**
   * The SWIFT/BIC code of the bank
   */
  swiftCode?: string;
}

export interface GbpAccountInfo {
  /**
   * UK bank account number (8 digits)
   */
  accountNumber: string;

  accountType: 'GBP_ACCOUNT';

  paymentRails: Array<'FASTER_PAYMENTS'>;

  /**
   * The UK sort code
   */
  sortCode: string;
}

/**
 * Required fields depend on the selected paymentRails:
 *
 * - BANK_TRANSFER: accountNumber, bankName
 * - MOBILE_MONEY: bankName, phoneNumber
 */
export interface GhsAccountInfo {
  accountType: 'GHS_ACCOUNT';

  /**
   * The name of the bank
   */
  bankName: string;

  paymentRails: Array<'BANK_TRANSFER' | 'MOBILE_MONEY'>;

  /**
   * The account number of the bank
   */
  accountNumber?: string;

  /**
   * The phone number in international format
   */
  phoneNumber?: string;
}

export interface GtqAccountInfo {
  /**
   * The account number of the bank
   */
  accountNumber: string;

  accountType: 'GTQ_ACCOUNT';

  /**
   * The bank account type
   */
  bankAccountType: 'CHECKING' | 'SAVINGS';

  paymentRails: Array<'BANK_TRANSFER'>;
}

export interface HkdAccountInfo {
  /**
   * Hong Kong bank account number
   */
  accountNumber: string;

  accountType: 'HKD_ACCOUNT';

  /**
   * The name of the bank
   */
  bankName: string;

  paymentRails: Array<'BANK_TRANSFER'>;

  /**
   * The SWIFT/BIC code of the bank
   */
  swiftCode: string;
}

export interface HtgAccountInfo {
  accountType: 'HTG_ACCOUNT';

  paymentRails: Array<'MOBILE_MONEY'>;

  /**
   * The phone number in international format
   */
  phoneNumber: string;
}

export interface IdrAccountInfo {
  /**
   * Indonesian bank account number
   */
  accountNumber: string;

  accountType: 'IDR_ACCOUNT';

  /**
   * The name of the bank
   */
  bankName: string;

  paymentRails: Array<'BANK_TRANSFER'>;

  /**
   * Indonesian phone number for e-wallet payments
   */
  phoneNumber: string;

  /**
   * The SWIFT/BIC code of the bank
   */
  swiftCode: string;
}

export interface InrAccountInfo {
  accountType: 'INR_ACCOUNT';

  paymentRails: Array<'UPI'>;

  /**
   * The UPI Virtual Payment Address
   */
  vpa: string;
}

export interface JmdAccountInfo {
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
   * The branch code
   */
  branchCode: string;

  paymentRails: Array<'BANK_TRANSFER'>;
}

export interface KesAccountInfo {
  accountType: 'KES_ACCOUNT';

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

export interface MwkAccountInfo {
  accountType: 'MWK_ACCOUNT';

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

export interface MxnAccountInfo {
  accountType: 'MXN_ACCOUNT';

  /**
   * The CLABE number of the bank
   */
  clabeNumber: string;

  paymentRails: Array<'SPEI'>;
}

export interface MyrAccountInfo {
  /**
   * Malaysian bank account number
   */
  accountNumber: string;

  accountType: 'MYR_ACCOUNT';

  /**
   * The name of the bank
   */
  bankName: string;

  paymentRails: Array<'BANK_TRANSFER'>;

  /**
   * The SWIFT/BIC code of the bank
   */
  swiftCode: string;
}

export interface NgnAccountInfo {
  /**
   * Nigerian bank account number
   */
  accountNumber: string;

  accountType: 'NGN_ACCOUNT';

  /**
   * The name of the bank
   */
  bankName: string;

  paymentRails: Array<'BANK_TRANSFER'>;
}

export interface PhpAccountInfo {
  /**
   * Bank account number
   */
  accountNumber: string;

  accountType: 'PHP_ACCOUNT';

  /**
   * Name of the beneficiary's bank
   */
  bankName: string;

  paymentRails: Array<'BANK_TRANSFER'>;
}

/**
 * Required fields depend on the selected paymentRails:
 *
 * - BANK_TRANSFER: accountNumber, bankName
 * - MOBILE_MONEY: bankName, phoneNumber
 */
export interface PkrAccountInfo {
  accountType: 'PKR_ACCOUNT';

  /**
   * The name of the bank
   */
  bankName: string;

  paymentRails: Array<'BANK_TRANSFER' | 'MOBILE_MONEY'>;

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

export interface PlatformExternalAccountCreateRequest {
  /**
   * Required fields depend on the selected paymentRails:
   *
   * - BANK_TRANSFER: accountNumber, bankName
   * - MOBILE_MONEY: bankName, phoneNumber
   */
  accountInfo:
    | Shared.AedExternalAccountCreateInfo
    | Shared.BdtExternalAccountCreateInfo
    | Shared.BrlExternalAccountCreateInfo
    | Shared.BwpExternalAccountCreateInfo
    | Shared.CadExternalAccountCreateInfo
    | PlatformExternalAccountCreateRequest.CnyAccount
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
    | Shared.SwiftExternalAccountCreateInfo;

  /**
   * The ISO 4217 currency code
   */
  currency: string;

  /**
   * Your platform's identifier for the account in your system. This can be used to
   * reference the account by your own identifier.
   */
  platformAccountId?: string;
}

export namespace PlatformExternalAccountCreateRequest {
  /**
   * Required fields depend on the selected paymentRails:
   *
   * - BANK_TRANSFER: accountNumber, bankName
   * - MOBILE_MONEY: phoneNumber, bankName
   */
  export interface CnyAccount {
    accountType: 'CNY_ACCOUNT';

    /**
     * The name of the bank or mobile-wallet provider
     */
    bankName: string;

    beneficiary: CnyAccount.IndividualBeneficiary | ExternalAccountsAPI.BusinessBeneficiary;

    /**
     * The destination bank account number (BANK_TRANSFER rail)
     */
    accountNumber?: string;

    /**
     * The phone number in international format (MOBILE_MONEY rail)
     */
    phoneNumber?: string;
  }

  export namespace CnyAccount {
    export interface IndividualBeneficiary {
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

export interface RwfAccountInfo {
  accountType: 'RWF_ACCOUNT';

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

export interface SgdAccountInfo {
  /**
   * Bank account number
   */
  accountNumber: string;

  accountType: 'SGD_ACCOUNT';

  /**
   * Name of the beneficiary's bank
   */
  bankName: string;

  paymentRails: Array<'PAYNOW' | 'FAST' | 'BANK_TRANSFER'>;

  /**
   * The SWIFT/BIC code of the bank
   */
  swiftCode: string;
}

export interface ThbAccountInfo {
  /**
   * Thai bank account number
   */
  accountNumber: string;

  accountType: 'THB_ACCOUNT';

  /**
   * The name of the bank
   */
  bankName: string;

  paymentRails: Array<'BANK_TRANSFER'>;

  /**
   * The SWIFT/BIC code of the bank
   */
  swiftCode: string;
}

export interface TzsAccountInfo {
  accountType: 'TZS_ACCOUNT';

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

export interface UgxAccountInfo {
  accountType: 'UGX_ACCOUNT';

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

export interface UsdAccountInfo {
  /**
   * The account number of the bank
   */
  accountNumber: string;

  accountType: 'USD_ACCOUNT';

  paymentRails: Array<'ACH' | 'WIRE' | 'RTP' | 'FEDNOW'>;

  /**
   * The ABA routing number
   */
  routingNumber: string;
}

export interface VndAccountInfo {
  /**
   * Vietnamese bank account number
   */
  accountNumber: string;

  accountType: 'VND_ACCOUNT';

  /**
   * The name of the bank
   */
  bankName: string;

  paymentRails: Array<'BANK_TRANSFER'>;

  /**
   * The SWIFT/BIC code of the bank
   */
  swiftCode: string;
}

export interface XafAccountInfo {
  accountType: 'XAF_ACCOUNT';

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

export interface XofAccountInfo {
  accountType: 'XOF_ACCOUNT';

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

export interface ZarAccountInfo {
  /**
   * South African bank account number
   */
  accountNumber: string;

  accountType: 'ZAR_ACCOUNT';

  /**
   * The name of the bank
   */
  bankName: string;

  paymentRails: Array<'BANK_TRANSFER'>;
}

export interface ZmwAccountInfo {
  accountType: 'ZMW_ACCOUNT';

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

export interface ExternalAccountCreateParams {
  /**
   * Required fields depend on the selected paymentRails:
   *
   * - BANK_TRANSFER: accountNumber, bankName
   * - MOBILE_MONEY: bankName, phoneNumber
   */
  accountInfo:
    | Shared.AedExternalAccountCreateInfo
    | Shared.BdtExternalAccountCreateInfo
    | Shared.BrlExternalAccountCreateInfo
    | Shared.BwpExternalAccountCreateInfo
    | Shared.CadExternalAccountCreateInfo
    | ExternalAccountCreateParams.CnyAccount
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
    | Shared.SwiftExternalAccountCreateInfo;

  /**
   * The ISO 4217 currency code
   */
  currency: string;

  /**
   * Your platform's identifier for the account in your system. This can be used to
   * reference the account by your own identifier.
   */
  platformAccountId?: string;
}

export namespace ExternalAccountCreateParams {
  /**
   * Required fields depend on the selected paymentRails:
   *
   * - BANK_TRANSFER: accountNumber, bankName
   * - MOBILE_MONEY: phoneNumber, bankName
   */
  export interface CnyAccount {
    accountType: 'CNY_ACCOUNT';

    /**
     * The name of the bank or mobile-wallet provider
     */
    bankName: string;

    beneficiary: CnyAccount.IndividualBeneficiary | ExternalAccountsAPI.BusinessBeneficiary;

    /**
     * The destination bank account number (BANK_TRANSFER rail)
     */
    accountNumber?: string;

    /**
     * The phone number in international format (MOBILE_MONEY rail)
     */
    phoneNumber?: string;
  }

  export namespace CnyAccount {
    export interface IndividualBeneficiary {
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
   * Maximum number of results to return (default 20, max 100)
   */
  limit?: number;
}

export declare namespace ExternalAccounts {
  export {
    type AedAccountInfo as AedAccountInfo,
    type BdtAccountInfo as BdtAccountInfo,
    type BrlAccountInfo as BrlAccountInfo,
    type BwpAccountInfo as BwpAccountInfo,
    type CadAccountInfo as CadAccountInfo,
    type CopAccountInfo as CopAccountInfo,
    type DkkAccountInfo as DkkAccountInfo,
    type EgpAccountInfo as EgpAccountInfo,
    type EurAccountInfo as EurAccountInfo,
    type GbpAccountInfo as GbpAccountInfo,
    type GhsAccountInfo as GhsAccountInfo,
    type GtqAccountInfo as GtqAccountInfo,
    type HkdAccountInfo as HkdAccountInfo,
    type HtgAccountInfo as HtgAccountInfo,
    type IdrAccountInfo as IdrAccountInfo,
    type InrAccountInfo as InrAccountInfo,
    type JmdAccountInfo as JmdAccountInfo,
    type KesAccountInfo as KesAccountInfo,
    type MwkAccountInfo as MwkAccountInfo,
    type MxnAccountInfo as MxnAccountInfo,
    type MyrAccountInfo as MyrAccountInfo,
    type NgnAccountInfo as NgnAccountInfo,
    type PhpAccountInfo as PhpAccountInfo,
    type PkrAccountInfo as PkrAccountInfo,
    type PlatformExternalAccountCreateRequest as PlatformExternalAccountCreateRequest,
    type RwfAccountInfo as RwfAccountInfo,
    type SgdAccountInfo as SgdAccountInfo,
    type ThbAccountInfo as ThbAccountInfo,
    type TzsAccountInfo as TzsAccountInfo,
    type UgxAccountInfo as UgxAccountInfo,
    type UsdAccountInfo as UsdAccountInfo,
    type VndAccountInfo as VndAccountInfo,
    type XafAccountInfo as XafAccountInfo,
    type XofAccountInfo as XofAccountInfo,
    type ZarAccountInfo as ZarAccountInfo,
    type ZmwAccountInfo as ZmwAccountInfo,
    type ExternalAccountCreateParams as ExternalAccountCreateParams,
    type ExternalAccountListParams as ExternalAccountListParams,
  };
}

export { type ExternalAccountsDefaultPagination };
