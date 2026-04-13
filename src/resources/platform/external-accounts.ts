// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as ExternalAccountsAPI from '../customers/external-accounts';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';

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
    return this._client.post('/platform/external-accounts', { body, ...options });
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
   * const externalAccounts =
   *   await client.platform.externalAccounts.list();
   * ```
   */
  list(
    query: ExternalAccountListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<ExternalAccountListResponse> {
    return this._client.get('/platform/external-accounts', { query, ...options });
  }
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

export interface DkkAccountInfo {
  accountType: 'DKK_ACCOUNT';

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

export interface UsdAccountInfo {
  /**
   * The account number of the bank
   */
  accountNumber: string;

  accountType: 'USD_ACCOUNT';

  paymentRails: Array<'ACH' | 'WIRE' | 'RTP' | 'FEDNOW' | 'BANK_TRANSFER'>;

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

export interface ExternalAccountListResponse {
  /**
   * List of external accounts matching the filter criteria
   */
  data: Array<ExternalAccountsAPI.ExternalAccount>;
}

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
    | ExternalAccountsAPI.SparkWalletInfo
    | ExternalAccountsAPI.LightningWalletInfo
    | ExternalAccountsAPI.SolanaWalletInfo
    | ExternalAccountsAPI.TronWalletInfo
    | ExternalAccountsAPI.PolygonWalletInfo
    | ExternalAccountsAPI.BaseWalletInfo
    | ExternalAccountCreateParams.EthereumWalletExternalAccountInfo;

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

export interface ExternalAccountListParams {
  /**
   * Filter by currency code
   */
  currency?: string;
}

export declare namespace ExternalAccounts {
  export {
    type BrlAccountInfo as BrlAccountInfo,
    type CadAccountInfo as CadAccountInfo,
    type DkkAccountInfo as DkkAccountInfo,
    type EurAccountInfo as EurAccountInfo,
    type GbpAccountInfo as GbpAccountInfo,
    type HkdAccountInfo as HkdAccountInfo,
    type IdrAccountInfo as IdrAccountInfo,
    type InrAccountInfo as InrAccountInfo,
    type MxnAccountInfo as MxnAccountInfo,
    type MyrAccountInfo as MyrAccountInfo,
    type NgnAccountInfo as NgnAccountInfo,
    type PhpAccountInfo as PhpAccountInfo,
    type SgdAccountInfo as SgdAccountInfo,
    type ThbAccountInfo as ThbAccountInfo,
    type UsdAccountInfo as UsdAccountInfo,
    type VndAccountInfo as VndAccountInfo,
    type ExternalAccountListResponse as ExternalAccountListResponse,
    type ExternalAccountCreateParams as ExternalAccountCreateParams,
    type ExternalAccountListParams as ExternalAccountListParams,
  };
}
