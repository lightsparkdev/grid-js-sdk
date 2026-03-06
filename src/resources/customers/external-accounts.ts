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
   * **Sandbox Testing:** In sandbox mode, use these account number patterns to test
   * different transfer scenarios. These patterns should be used with the primary
   * alias, address, or identifier of whatever account type you're testing. For
   * example, the US account number, a CLABE, an IBAN, a spark wallet address, etc.
   * The failure patterns are:
   *
   * - Account numbers ending in **002**: Insufficient funds (transfer-in will fail)
   * - Account numbers ending in **003**: Account closed/invalid (transfers will
   *   fail)
   * - Account numbers ending in **004**: Transfer rejected (bank rejects the
   *   transfer)
   * - Account numbers ending in **005**: Timeout/delayed failure (stays pending
   *   ~30s, then fails)
   * - Any other account number: Success (transfers complete normally)
   *
   * @example
   * ```ts
   * const externalAccount =
   *   await client.customers.externalAccounts.create({
   *     accountInfo: {
   *       accountType: 'USD_ACCOUNT',
   *       paymentRails: ['ACH'],
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

export interface BaseWalletInfo extends PlatformExternalAccountsAPI.BaseExternalAccountInfo {
  accountType: 'BASE_WALLET';

  /**
   * Base eth wallet address
   */
  address: string;
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

  /**
   * The registration number of the beneficiary
   */
  registrationNumber?: string;
}

export interface BrlExternalAccountInfo
  extends PlatformExternalAccountsAPI.BaseExternalAccountInfo,
    PlatformExternalAccountsAPI.BrlAccountInfo {
  beneficiary: BrlBeneficiary | BusinessBeneficiary;
}

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

  /**
   * The registration number of the beneficiary
   */
  registrationNumber?: string;
}

export interface DkkExternalAccountInfo
  extends PlatformExternalAccountsAPI.BaseExternalAccountInfo,
    PlatformExternalAccountsAPI.DkkAccountInfo {
  beneficiary: DkkBeneficiary | BusinessBeneficiary;
}

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
  beneficiaryVerifiedData?: ExternalAccount.BeneficiaryVerifiedData;

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

export namespace ExternalAccount {
  /**
   * Verified beneficiary data returned by the payment rail, if available
   */
  export interface BeneficiaryVerifiedData {
    /**
     * The verified full name of the account holder as returned by the payment rail
     */
    fullName?: string;
  }
}

export interface ExternalAccountCreate {
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
  | BaseWalletInfo;

export namespace ExternalAccountInfoOneOf {
  export interface CadExternalAccountInfo
    extends PlatformExternalAccountsAPI.BaseExternalAccountInfo,
      PlatformExternalAccountsAPI.CadAccountInfo {
    beneficiary: CadExternalAccountInfo.CadBeneficiary | ExternalAccountsAPI.BusinessBeneficiary;
  }

  export namespace CadExternalAccountInfo {
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

  export interface EurExternalAccountInfo
    extends PlatformExternalAccountsAPI.BaseExternalAccountInfo,
      PlatformExternalAccountsAPI.EurAccountInfo {
    beneficiary: EurExternalAccountInfo.EurBeneficiary | ExternalAccountsAPI.BusinessBeneficiary;
  }

  export namespace EurExternalAccountInfo {
    export interface EurBeneficiary {
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

  export interface KesExternalAccountInfo extends PlatformExternalAccountsAPI.BaseExternalAccountInfo {
    accountType: 'KES_ACCOUNT';

    beneficiary: KesExternalAccountInfo.KesBeneficiary | ExternalAccountsAPI.BusinessBeneficiary;

    paymentRails: Array<'MOBILE_MONEY'>;

    /**
     * Kenyan mobile money phone number
     */
    phoneNumber: string;

    /**
     * Mobile money provider
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

      /**
       * The registration number of the beneficiary
       */
      registrationNumber?: string;
    }
  }

  export interface MwkExternalAccountInfo extends PlatformExternalAccountsAPI.BaseExternalAccountInfo {
    accountType: 'MWK_ACCOUNT';

    beneficiary: MwkExternalAccountInfo.MwkBeneficiary | ExternalAccountsAPI.BusinessBeneficiary;

    countries: Array<'MW'>;

    paymentRails: Array<'MOBILE_MONEY'>;

    /**
     * Malawian mobile money phone number
     */
    phoneNumber: string;

    /**
     * Mobile money provider
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

      /**
       * The registration number of the beneficiary
       */
      registrationNumber?: string;
    }
  }

  export interface NgnExternalAccountInfo
    extends PlatformExternalAccountsAPI.BaseExternalAccountInfo,
      PlatformExternalAccountsAPI.NgnAccountInfo {
    beneficiary: NgnExternalAccountInfo.NgnBeneficiary | ExternalAccountsAPI.BusinessBeneficiary;
  }

  export namespace NgnExternalAccountInfo {
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

      /**
       * The registration number of the beneficiary
       */
      registrationNumber?: string;
    }
  }

  export interface RwfExternalAccountInfo extends PlatformExternalAccountsAPI.BaseExternalAccountInfo {
    accountType: 'RWF_ACCOUNT';

    beneficiary: RwfExternalAccountInfo.RwfBeneficiary | ExternalAccountsAPI.BusinessBeneficiary;

    paymentRails: Array<'MOBILE_MONEY'>;

    /**
     * Rwandan mobile money phone number
     */
    phoneNumber: string;

    /**
     * Mobile money provider
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

      /**
       * The registration number of the beneficiary
       */
      registrationNumber?: string;
    }
  }

  export interface TzsExternalAccountInfo extends PlatformExternalAccountsAPI.BaseExternalAccountInfo {
    accountType: 'TZS_ACCOUNT';

    beneficiary: TzsExternalAccountInfo.TzsBeneficiary | ExternalAccountsAPI.BusinessBeneficiary;

    paymentRails: Array<'MOBILE_MONEY'>;

    /**
     * Tanzanian mobile money phone number
     */
    phoneNumber: string;

    /**
     * Mobile money provider
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

      /**
       * The registration number of the beneficiary
       */
      registrationNumber?: string;
    }
  }

  export interface UgxExternalAccountInfo extends PlatformExternalAccountsAPI.BaseExternalAccountInfo {
    accountType: 'UGX_ACCOUNT';

    beneficiary: UgxExternalAccountInfo.UgxBeneficiary | ExternalAccountsAPI.BusinessBeneficiary;

    countries: Array<'UG'>;

    paymentRails: Array<'MOBILE_MONEY'>;

    /**
     * Ugandan mobile money phone number
     */
    phoneNumber: string;

    /**
     * Mobile money provider
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

      /**
       * The registration number of the beneficiary
       */
      registrationNumber?: string;
    }
  }

  export interface XofExternalAccountInfo extends PlatformExternalAccountsAPI.BaseExternalAccountInfo {
    accountType: 'XOF_ACCOUNT';

    beneficiary: XofExternalAccountInfo.XofBeneficiary | ExternalAccountsAPI.BusinessBeneficiary;

    countries: Array<'SN' | 'BJ' | 'CI'>;

    paymentRails: Array<'MOBILE_MONEY'>;

    /**
     * West African mobile money phone number (Senegal, Benin, or Ivory Coast)
     */
    phoneNumber: string;

    /**
     * Mobile money provider
     */
    provider: string;
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

      /**
       * The registration number of the beneficiary
       */
      registrationNumber?: string;
    }
  }

  export interface ZarExternalAccountInfo extends PlatformExternalAccountsAPI.BaseExternalAccountInfo {
    /**
     * South African bank account number
     */
    accountNumber: string;

    accountType: 'ZAR_ACCOUNT';

    /**
     * Name of the bank
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

      /**
       * The registration number of the beneficiary
       */
      registrationNumber?: string;
    }
  }

  export interface ZmwExternalAccountInfo extends PlatformExternalAccountsAPI.BaseExternalAccountInfo {
    accountType: 'ZMW_ACCOUNT';

    beneficiary: ZmwExternalAccountInfo.ZmwBeneficiary | ExternalAccountsAPI.BusinessBeneficiary;

    paymentRails: Array<'MOBILE_MONEY'>;

    /**
     * Zambian mobile money phone number
     */
    phoneNumber: string;

    /**
     * Mobile money provider
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

      /**
       * The registration number of the beneficiary
       */
      registrationNumber?: string;
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

  /**
   * The registration number of the beneficiary
   */
  registrationNumber?: string;
}

export interface GbpExternalAccountInfo
  extends PlatformExternalAccountsAPI.BaseExternalAccountInfo,
    PlatformExternalAccountsAPI.GbpAccountInfo {
  beneficiary: GbpBeneficiary | BusinessBeneficiary;
}

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

  /**
   * The registration number of the beneficiary
   */
  registrationNumber?: string;
}

export interface HkdExternalAccountInfo
  extends PlatformExternalAccountsAPI.BaseExternalAccountInfo,
    PlatformExternalAccountsAPI.HkdAccountInfo {
  beneficiary: HkdBeneficiary | BusinessBeneficiary;
}

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

  /**
   * The registration number of the beneficiary
   */
  registrationNumber?: string;
}

export interface IdrExternalAccountInfo
  extends PlatformExternalAccountsAPI.BaseExternalAccountInfo,
    PlatformExternalAccountsAPI.IdrAccountInfo {
  beneficiary: IdrBeneficiary | BusinessBeneficiary;
}

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

  /**
   * The registration number of the beneficiary
   */
  registrationNumber?: string;
}

export interface InrExternalAccountInfo
  extends PlatformExternalAccountsAPI.BaseExternalAccountInfo,
    PlatformExternalAccountsAPI.InrAccountInfo {
  beneficiary: InrBeneficiary | BusinessBeneficiary;
}

/**
 * Lightning payment destination. Exactly one of `invoice`, `bolt12`, or
 * `lightningAddress` must be provided.
 */
export interface LightningWalletInfo extends PlatformExternalAccountsAPI.BaseExternalAccountInfo {
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

  /**
   * The registration number of the beneficiary
   */
  registrationNumber?: string;
}

export interface MxnExternalAccountInfo
  extends PlatformExternalAccountsAPI.BaseExternalAccountInfo,
    PlatformExternalAccountsAPI.MxnAccountInfo {
  beneficiary: MxnBeneficiary | BusinessBeneficiary;
}

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

  /**
   * The registration number of the beneficiary
   */
  registrationNumber?: string;
}

export interface MyrExternalAccountInfo
  extends PlatformExternalAccountsAPI.BaseExternalAccountInfo,
    PlatformExternalAccountsAPI.MyrAccountInfo {
  beneficiary: MyrBeneficiary | BusinessBeneficiary;
}

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

  /**
   * The registration number of the beneficiary
   */
  registrationNumber?: string;
}

export interface PhpExternalAccountInfo
  extends PlatformExternalAccountsAPI.BaseExternalAccountInfo,
    PlatformExternalAccountsAPI.PhpAccountInfo {
  beneficiary: PhpBeneficiary | BusinessBeneficiary;
}

export interface PolygonWalletInfo extends PlatformExternalAccountsAPI.BaseExternalAccountInfo {
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

  /**
   * The registration number of the beneficiary
   */
  registrationNumber?: string;
}

export interface SgdExternalAccountInfo
  extends PlatformExternalAccountsAPI.BaseExternalAccountInfo,
    PlatformExternalAccountsAPI.SgdAccountInfo {
  beneficiary: SgdBeneficiary | BusinessBeneficiary;
}

export interface SolanaWalletInfo extends PlatformExternalAccountsAPI.BaseExternalAccountInfo {
  accountType: 'SOLANA_WALLET';

  /**
   * Solana wallet address
   */
  address: string;
}

export interface SparkWalletInfo extends PlatformExternalAccountsAPI.BaseExternalAccountInfo {
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

  /**
   * The registration number of the beneficiary
   */
  registrationNumber?: string;
}

export interface ThbExternalAccountInfo
  extends PlatformExternalAccountsAPI.BaseExternalAccountInfo,
    PlatformExternalAccountsAPI.ThbAccountInfo {
  beneficiary: ThbBeneficiary | BusinessBeneficiary;
}

export interface TronWalletInfo extends PlatformExternalAccountsAPI.BaseExternalAccountInfo {
  accountType: 'TRON_WALLET';

  /**
   * Tron wallet address
   */
  address: string;
}

export interface UsdBeneficiary {
  beneficiaryType: 'INDIVIDUAL';

  /**
   * The birth date of the beneficiary
   */
  birthDate: string;

  /**
   * The full name of the beneficiary
   */
  fullName: string;

  /**
   * The nationality of the beneficiary
   */
  nationality: string;

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
   * The registration number of the beneficiary
   */
  registrationNumber?: string;
}

export interface UsdExternalAccountInfo
  extends PlatformExternalAccountsAPI.BaseExternalAccountInfo,
    PlatformExternalAccountsAPI.UsdAccountInfo {
  beneficiary: UsdBeneficiary | BusinessBeneficiary;
}

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

  /**
   * The registration number of the beneficiary
   */
  registrationNumber?: string;
}

export interface VndExternalAccountInfo
  extends PlatformExternalAccountsAPI.BaseExternalAccountInfo,
    PlatformExternalAccountsAPI.VndAccountInfo {
  beneficiary: VndBeneficiary | BusinessBeneficiary;
}

export interface ExternalAccountCreateParams {
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
