// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { DefaultPagination, type DefaultPaginationParams, PagePromise } from '../../core/pagination';
import { RequestOptions } from '../../internal/request-options';

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
   *       accountType: 'US_ACCOUNT',
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

export interface BaseWalletInfo {
  accountType: 'BASE_WALLET';

  /**
   * Base eth wallet address
   */
  address: string;
}

export interface ExternalAccount {
  /**
   * The system generated identifier of this account
   */
  id: string;

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

export type ExternalAccountInfoOneOf =
  | ExternalAccountInfoOneOf.BrlExternalAccountInfo
  | ExternalAccountInfoOneOf.DkkExternalAccountInfo
  | ExternalAccountInfoOneOf.EurExternalAccountInfo
  | ExternalAccountInfoOneOf.GbpExternalAccountInfo
  | ExternalAccountInfoOneOf.HkdExternalAccountInfo
  | ExternalAccountInfoOneOf.IdrExternalAccountInfo
  | ExternalAccountInfoOneOf.InrExternalAccountInfo
  | ExternalAccountInfoOneOf.MxnExternalAccountInfo
  | ExternalAccountInfoOneOf.MyrExternalAccountInfo
  | ExternalAccountInfoOneOf.PhpExternalAccountInfo
  | ExternalAccountInfoOneOf.SgdExternalAccountInfo
  | ExternalAccountInfoOneOf.ThbExternalAccountInfo
  | ExternalAccountInfoOneOf.UsdExternalAccountInfo
  | ExternalAccountInfoOneOf.VndExternalAccountInfo
  | SparkWalletInfo
  | LightningWalletInfo
  | SolanaWalletInfo
  | TronWalletInfo
  | PolygonWalletInfo
  | BaseWalletInfo;

export namespace ExternalAccountInfoOneOf {
  export interface BrlExternalAccountInfo {
    accountType: 'BRL_ACCOUNT';

    beneficiary: BrlExternalAccountInfo.BrlBeneficiary | BrlExternalAccountInfo.BusinessBeneficiary;

    countries: Array<'BR'>;

    paymentRails: Array<'PIX'>;

    /**
     * The PIX key of the bank
     */
    pixKey: string;

    /**
     * The type of PIX key of the bank
     */
    pixKeyType: string;

    /**
     * The tax ID of the bank account
     */
    taxId: string;
  }

  export namespace BrlExternalAccountInfo {
    export interface BrlBeneficiary {
      beneficiaryType: 'INDIVIDUAL';

      /**
       * The full name of the beneficiary
       */
      fullName: string;

      address?: BrlBeneficiary.Address;

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

    export namespace BrlBeneficiary {
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
    }

    export interface BusinessBeneficiary {
      beneficiaryType: 'BUSINESS';

      /**
       * The legal name of the business
       */
      legalName: string;

      address?: BusinessBeneficiary.Address;

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

    export namespace BusinessBeneficiary {
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
    }
  }

  export interface DkkExternalAccountInfo {
    accountType: 'DKK_ACCOUNT';

    beneficiary: DkkExternalAccountInfo.DkkBeneficiary | DkkExternalAccountInfo.BusinessBeneficiary;

    countries: Array<'DK'>;

    /**
     * The IBAN of the bank
     */
    iban: string;

    paymentRails: Array<'SEPA' | 'SEPA_INSTANT'>;

    /**
     * The SWIFT BIC of the bank
     */
    swiftBic?: string;
  }

  export namespace DkkExternalAccountInfo {
    export interface DkkBeneficiary {
      beneficiaryType: 'INDIVIDUAL';

      /**
       * The full name of the beneficiary
       */
      fullName: string;

      address?: DkkBeneficiary.Address;

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

    export namespace DkkBeneficiary {
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
    }

    export interface BusinessBeneficiary {
      beneficiaryType: 'BUSINESS';

      /**
       * The legal name of the business
       */
      legalName: string;

      address?: BusinessBeneficiary.Address;

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

    export namespace BusinessBeneficiary {
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
    }
  }

  export interface EurExternalAccountInfo {
    accountType: 'EUR_ACCOUNT';

    beneficiary: EurExternalAccountInfo.EurBeneficiary | EurExternalAccountInfo.BusinessBeneficiary;

    countries: Array<
      | 'AT'
      | 'BE'
      | 'CY'
      | 'DE'
      | 'EE'
      | 'ES'
      | 'FI'
      | 'FR'
      | 'GR'
      | 'HR'
      | 'IE'
      | 'IT'
      | 'LT'
      | 'LU'
      | 'LV'
      | 'MT'
      | 'NL'
      | 'PT'
      | 'SI'
      | 'SK'
    >;

    /**
     * The IBAN of the bank
     */
    iban: string;

    paymentRails: Array<'SEPA' | 'SEPA_INSTANT'>;

    /**
     * The SWIFT BIC of the bank
     */
    swiftBic?: string;
  }

  export namespace EurExternalAccountInfo {
    export interface EurBeneficiary {
      beneficiaryType: 'INDIVIDUAL';

      /**
       * The full name of the beneficiary
       */
      fullName: string;

      address?: EurBeneficiary.Address;

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

    export namespace EurBeneficiary {
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
    }

    export interface BusinessBeneficiary {
      beneficiaryType: 'BUSINESS';

      /**
       * The legal name of the business
       */
      legalName: string;

      address?: BusinessBeneficiary.Address;

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

    export namespace BusinessBeneficiary {
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
    }
  }

  export interface GbpExternalAccountInfo {
    /**
     * UK bank account number (8 digits)
     */
    accountNumber: string;

    accountType: 'GBP_ACCOUNT';

    beneficiary: GbpExternalAccountInfo.GbpBeneficiary | GbpExternalAccountInfo.BusinessBeneficiary;

    countries: Array<'GB'>;

    paymentRails: Array<'FASTER_PAYMENTS'>;

    /**
     * UK bank sort code (6 digits, may include hyphens)
     */
    sortCode: string;
  }

  export namespace GbpExternalAccountInfo {
    export interface GbpBeneficiary {
      beneficiaryType: 'INDIVIDUAL';

      /**
       * The full name of the beneficiary
       */
      fullName: string;

      address?: GbpBeneficiary.Address;

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

    export namespace GbpBeneficiary {
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
    }

    export interface BusinessBeneficiary {
      beneficiaryType: 'BUSINESS';

      /**
       * The legal name of the business
       */
      legalName: string;

      address?: BusinessBeneficiary.Address;

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

    export namespace BusinessBeneficiary {
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
    }
  }

  export interface HkdExternalAccountInfo {
    /**
     * The account number of the bank
     */
    accountNumber: string;

    accountType: 'HKD_ACCOUNT';

    /**
     * The bank name of the bank
     */
    bankName: string;

    beneficiary: HkdExternalAccountInfo.HkdBeneficiary | HkdExternalAccountInfo.BusinessBeneficiary;

    countries: Array<'HK'>;

    paymentRails: Array<'BANK_TRANSFER'>;
  }

  export namespace HkdExternalAccountInfo {
    export interface HkdBeneficiary {
      beneficiaryType: 'INDIVIDUAL';

      /**
       * The full name of the beneficiary
       */
      fullName: string;

      address?: HkdBeneficiary.Address;

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

    export namespace HkdBeneficiary {
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
    }

    export interface BusinessBeneficiary {
      beneficiaryType: 'BUSINESS';

      /**
       * The legal name of the business
       */
      legalName: string;

      address?: BusinessBeneficiary.Address;

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

    export namespace BusinessBeneficiary {
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
    }
  }

  export interface IdrExternalAccountInfo {
    /**
     * The account number of the bank
     */
    accountNumber: string;

    accountType: 'IDR_ACCOUNT';

    beneficiary: IdrExternalAccountInfo.IdrBeneficiary | IdrExternalAccountInfo.BusinessBeneficiary;

    countries: Array<'ID'>;

    paymentRails: Array<'BANK_TRANSFER'>;

    /**
     * The sort code of the bank
     */
    sortCode: string;
  }

  export namespace IdrExternalAccountInfo {
    export interface IdrBeneficiary {
      beneficiaryType: 'INDIVIDUAL';

      /**
       * The full name of the beneficiary
       */
      fullName: string;

      address?: IdrBeneficiary.Address;

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

    export namespace IdrBeneficiary {
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
    }

    export interface BusinessBeneficiary {
      beneficiaryType: 'BUSINESS';

      /**
       * The legal name of the business
       */
      legalName: string;

      address?: BusinessBeneficiary.Address;

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

    export namespace BusinessBeneficiary {
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
    }
  }

  export interface InrExternalAccountInfo {
    accountType: 'INR_ACCOUNT';

    beneficiary: InrExternalAccountInfo.InrBeneficiary | InrExternalAccountInfo.BusinessBeneficiary;

    countries: Array<'IN'>;

    paymentRails: Array<'UPI' | 'IMPS'>;

    /**
     * The VPA of the bank
     */
    vpa: string;
  }

  export namespace InrExternalAccountInfo {
    export interface InrBeneficiary {
      beneficiaryType: 'INDIVIDUAL';

      /**
       * The full name of the beneficiary
       */
      fullName: string;

      address?: InrBeneficiary.Address;

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

    export namespace InrBeneficiary {
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
    }

    export interface BusinessBeneficiary {
      beneficiaryType: 'BUSINESS';

      /**
       * The legal name of the business
       */
      legalName: string;

      address?: BusinessBeneficiary.Address;

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

    export namespace BusinessBeneficiary {
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
    }
  }

  export interface MxnExternalAccountInfo {
    accountType: 'MXN_ACCOUNT';

    beneficiary: MxnExternalAccountInfo.MxnBeneficiary | MxnExternalAccountInfo.BusinessBeneficiary;

    /**
     * The CLABE number of the bank
     */
    clabeNumber: string;

    countries: Array<'MX'>;

    paymentRails: Array<'SPEI'>;
  }

  export namespace MxnExternalAccountInfo {
    export interface MxnBeneficiary {
      beneficiaryType: 'INDIVIDUAL';

      /**
       * The full name of the beneficiary
       */
      fullName: string;

      address?: MxnBeneficiary.Address;

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

    export namespace MxnBeneficiary {
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
    }

    export interface BusinessBeneficiary {
      beneficiaryType: 'BUSINESS';

      /**
       * The legal name of the business
       */
      legalName: string;

      address?: BusinessBeneficiary.Address;

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

    export namespace BusinessBeneficiary {
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
    }
  }

  export interface MyrExternalAccountInfo {
    /**
     * The account number of the bank
     */
    accountNumber: string;

    accountType: 'MYR_ACCOUNT';

    /**
     * The bank name of the bank
     */
    bankName: string;

    beneficiary: MyrExternalAccountInfo.MyrBeneficiary | MyrExternalAccountInfo.BusinessBeneficiary;

    countries: Array<'MY'>;

    paymentRails: Array<'BANK_TRANSFER'>;
  }

  export namespace MyrExternalAccountInfo {
    export interface MyrBeneficiary {
      beneficiaryType: 'INDIVIDUAL';

      /**
       * The full name of the beneficiary
       */
      fullName: string;

      address?: MyrBeneficiary.Address;

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

    export namespace MyrBeneficiary {
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
    }

    export interface BusinessBeneficiary {
      beneficiaryType: 'BUSINESS';

      /**
       * The legal name of the business
       */
      legalName: string;

      address?: BusinessBeneficiary.Address;

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

    export namespace BusinessBeneficiary {
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
    }
  }

  export interface PhpExternalAccountInfo {
    /**
     * Bank account number
     */
    accountNumber: string;

    accountType: 'PHP_ACCOUNT';

    /**
     * Name of the beneficiary's bank
     */
    bankName: string;

    beneficiary: PhpExternalAccountInfo.PhpBeneficiary | PhpExternalAccountInfo.BusinessBeneficiary;

    countries: Array<'PH'>;

    paymentRails: Array<'BANK_TRANSFER'>;
  }

  export namespace PhpExternalAccountInfo {
    export interface PhpBeneficiary {
      beneficiaryType: 'INDIVIDUAL';

      /**
       * The full name of the beneficiary
       */
      fullName: string;

      address?: PhpBeneficiary.Address;

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

    export namespace PhpBeneficiary {
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
    }

    export interface BusinessBeneficiary {
      beneficiaryType: 'BUSINESS';

      /**
       * The legal name of the business
       */
      legalName: string;

      address?: BusinessBeneficiary.Address;

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

    export namespace BusinessBeneficiary {
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
    }
  }

  export interface SgdExternalAccountInfo {
    /**
     * Bank account number
     */
    accountNumber: string;

    accountType: 'SGD_ACCOUNT';

    /**
     * Name of the beneficiary's bank
     */
    bankName: string;

    beneficiary: SgdExternalAccountInfo.SgdBeneficiary | SgdExternalAccountInfo.BusinessBeneficiary;

    countries: Array<'SG'>;

    paymentRails: Array<'PAYNOW' | 'FAST' | 'BANK_TRANSFER'>;

    /**
     * SWIFT/BIC code (8 or 11 characters)
     */
    swiftCode: string;
  }

  export namespace SgdExternalAccountInfo {
    export interface SgdBeneficiary {
      beneficiaryType: 'INDIVIDUAL';

      /**
       * The full name of the beneficiary
       */
      fullName: string;

      address?: SgdBeneficiary.Address;

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

    export namespace SgdBeneficiary {
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
    }

    export interface BusinessBeneficiary {
      beneficiaryType: 'BUSINESS';

      /**
       * The legal name of the business
       */
      legalName: string;

      address?: BusinessBeneficiary.Address;

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

    export namespace BusinessBeneficiary {
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
    }
  }

  export interface ThbExternalAccountInfo {
    /**
     * The account number of the bank
     */
    accountNumber: string;

    accountType: 'THB_ACCOUNT';

    /**
     * The bank name of the bank
     */
    bankName: string;

    beneficiary: ThbExternalAccountInfo.ThbBeneficiary | ThbExternalAccountInfo.BusinessBeneficiary;

    countries: Array<'TH'>;

    paymentRails: Array<'BANK_TRANSFER'>;
  }

  export namespace ThbExternalAccountInfo {
    export interface ThbBeneficiary {
      beneficiaryType: 'INDIVIDUAL';

      /**
       * The full name of the beneficiary
       */
      fullName: string;

      address?: ThbBeneficiary.Address;

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

    export namespace ThbBeneficiary {
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
    }

    export interface BusinessBeneficiary {
      beneficiaryType: 'BUSINESS';

      /**
       * The legal name of the business
       */
      legalName: string;

      address?: BusinessBeneficiary.Address;

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

    export namespace BusinessBeneficiary {
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
    }
  }

  export interface UsdExternalAccountInfo {
    /**
     * The account number of the bank
     */
    accountNumber: string;

    accountType: 'USD_ACCOUNT';

    beneficiary: UsdExternalAccountInfo.UsdBeneficiary | UsdExternalAccountInfo.BusinessBeneficiary;

    countries: Array<'US'>;

    paymentRails: Array<'ACH' | 'WIRE' | 'RTP' | 'FEDNOW'>;

    /**
     * The routing number of the bank
     */
    routingNumber: string;
  }

  export namespace UsdExternalAccountInfo {
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

      address?: UsdBeneficiary.Address;

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

    export namespace UsdBeneficiary {
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
    }

    export interface BusinessBeneficiary {
      beneficiaryType: 'BUSINESS';

      /**
       * The legal name of the business
       */
      legalName: string;

      address?: BusinessBeneficiary.Address;

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

    export namespace BusinessBeneficiary {
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
    }
  }

  export interface VndExternalAccountInfo {
    /**
     * The account number of the bank
     */
    accountNumber: string;

    accountType: 'VND_ACCOUNT';

    /**
     * The bank name of the bank
     */
    bankName: string;

    beneficiary: VndExternalAccountInfo.VndBeneficiary | VndExternalAccountInfo.BusinessBeneficiary;

    countries: Array<'VN'>;

    paymentRails: Array<'BANK_TRANSFER'>;
  }

  export namespace VndExternalAccountInfo {
    export interface VndBeneficiary {
      beneficiaryType: 'INDIVIDUAL';

      /**
       * The full name of the beneficiary
       */
      fullName: string;

      address?: VndBeneficiary.Address;

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

    export namespace VndBeneficiary {
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
    }

    export interface BusinessBeneficiary {
      beneficiaryType: 'BUSINESS';

      /**
       * The legal name of the business
       */
      legalName: string;

      address?: BusinessBeneficiary.Address;

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

    export namespace BusinessBeneficiary {
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
    }
  }
}

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

export interface PolygonWalletInfo {
  accountType: 'POLYGON_WALLET';

  /**
   * Polygon eth wallet address
   */
  address: string;
}

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

export interface TronWalletInfo {
  accountType: 'TRON_WALLET';

  /**
   * Tron wallet address
   */
  address: string;
}

export interface ExternalAccountCreateParams {
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
    type BaseWalletInfo as BaseWalletInfo,
    type ExternalAccount as ExternalAccount,
    type ExternalAccountCreate as ExternalAccountCreate,
    type ExternalAccountInfoOneOf as ExternalAccountInfoOneOf,
    type LightningWalletInfo as LightningWalletInfo,
    type PolygonWalletInfo as PolygonWalletInfo,
    type SolanaWalletInfo as SolanaWalletInfo,
    type SparkWalletInfo as SparkWalletInfo,
    type TronWalletInfo as TronWalletInfo,
    type ExternalAccountsDefaultPagination as ExternalAccountsDefaultPagination,
    type ExternalAccountCreateParams as ExternalAccountCreateParams,
    type ExternalAccountListParams as ExternalAccountListParams,
  };
}
