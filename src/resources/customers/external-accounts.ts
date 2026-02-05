// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as ExternalAccountsAPI from './external-accounts';
import * as CustomersAPI from './customers';
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
   *       accountNumber: '12345678901',
   *       routingNumber: '123456789',
   *       accountCategory: 'CHECKING',
   *       bankName: 'Chase Bank',
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

export interface BaseBeneficiary {
  /**
   * Whether the beneficiary is an individual or a business entity
   */
  beneficiaryType: 'INDIVIDUAL' | 'BUSINESS';

  address?: CustomersAPI.Address;
}

export interface BaseExternalAccountInfo {
  /**
   * Type of external account or wallet
   */
  accountType:
    | 'US_ACCOUNT'
    | 'CLABE'
    | 'PIX'
    | 'IBAN'
    | 'UPI'
    | 'NGN_ACCOUNT'
    | 'CAD_ACCOUNT'
    | 'GBP_ACCOUNT'
    | 'PHP_ACCOUNT'
    | 'SGD_ACCOUNT'
    | 'SPARK_WALLET'
    | 'LIGHTNING'
    | 'SOLANA_WALLET'
    | 'TRON_WALLET'
    | 'POLYGON_WALLET'
    | 'BASE_WALLET';
}

export interface BaseWalletInfo {
  accountType: 'BASE_WALLET';

  /**
   * Base eth wallet address
   */
  address: string;
}

export type BeneficiaryOneOf = IndividualBeneficiary | BusinessBeneficiary;

export interface BusinessBeneficiary extends Omit<BaseBeneficiary, 'beneficiaryType'> {
  beneficiaryType: 'BUSINESS';

  /**
   * Legal name of the business
   */
  legalName: string;

  /**
   * Business registration number
   */
  registrationNumber?: string;

  /**
   * Tax identification number
   */
  taxId?: string;
}

export interface ClabeAccountInfo {
  accountType: 'CLABE';

  /**
   * 18-digit CLABE number (Mexican banking standard)
   */
  clabeNumber: string;
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
  | ExternalAccountInfoOneOf.UsAccountExternalAccountInfo
  | ExternalAccountInfoOneOf.ClabeAccountExternalAccountInfo
  | ExternalAccountInfoOneOf.PixAccountExternalAccountInfo
  | ExternalAccountInfoOneOf.IbanAccountExternalAccountInfo
  | ExternalAccountInfoOneOf.UpiAccountExternalAccountInfo
  | NgnAccountExternalAccountInfo
  | ExternalAccountInfoOneOf.CadAccountExternalAccountInfo
  | ExternalAccountInfoOneOf.GbpAccountExternalAccountInfo
  | ExternalAccountInfoOneOf.PhpAccountExternalAccountInfo
  | ExternalAccountInfoOneOf.SgdAccountExternalAccountInfo
  | ExternalAccountInfoOneOf.SparkWalletExternalAccountInfo
  | LightningExternalAccountInfo
  | ExternalAccountInfoOneOf.SolanaWalletExternalAccountInfo
  | ExternalAccountInfoOneOf.TronWalletExternalAccountInfo
  | ExternalAccountInfoOneOf.PolygonWalletExternalAccountInfo
  | ExternalAccountInfoOneOf.BaseWalletExternalAccountInfo;

export namespace ExternalAccountInfoOneOf {
  export interface UsAccountExternalAccountInfo
    extends ExternalAccountsAPI.BaseExternalAccountInfo,
      ExternalAccountsAPI.UsAccountInfo {
    beneficiary: ExternalAccountsAPI.BeneficiaryOneOf;
  }

  export interface ClabeAccountExternalAccountInfo
    extends ExternalAccountsAPI.BaseExternalAccountInfo,
      ExternalAccountsAPI.ClabeAccountInfo {
    beneficiary: ExternalAccountsAPI.BeneficiaryOneOf;
  }

  export interface PixAccountExternalAccountInfo
    extends ExternalAccountsAPI.BaseExternalAccountInfo,
      ExternalAccountsAPI.PixAccountInfo {
    beneficiary: ExternalAccountsAPI.BeneficiaryOneOf;
  }

  export interface IbanAccountExternalAccountInfo
    extends ExternalAccountsAPI.BaseExternalAccountInfo,
      ExternalAccountsAPI.IbanAccountInfo {
    beneficiary: ExternalAccountsAPI.BeneficiaryOneOf;
  }

  export interface UpiAccountExternalAccountInfo
    extends ExternalAccountsAPI.BaseExternalAccountInfo,
      ExternalAccountsAPI.UpiAccountInfo {
    beneficiary: ExternalAccountsAPI.BeneficiaryOneOf;
  }

  export interface CadAccountExternalAccountInfo
    extends Omit<ExternalAccountsAPI.BaseExternalAccountInfo, 'accountType'> {
    /**
     * Bank account number (7-12 digits)
     */
    accountNumber: string;

    accountType: 'CAD_ACCOUNT';

    /**
     * Canadian financial institution number (3 digits)
     */
    bankCode: string;

    beneficiary: ExternalAccountsAPI.BeneficiaryOneOf;

    /**
     * Transit number identifying the branch (5 digits)
     */
    branchCode: string;
  }

  export interface GbpAccountExternalAccountInfo
    extends Omit<ExternalAccountsAPI.BaseExternalAccountInfo, 'accountType'> {
    /**
     * UK bank account number (8 digits)
     */
    accountNumber: string;

    accountType: 'GBP_ACCOUNT';

    beneficiary: ExternalAccountsAPI.BeneficiaryOneOf;

    /**
     * UK bank sort code (6 digits, may include hyphens)
     */
    sortCode: string;
  }

  export interface PhpAccountExternalAccountInfo
    extends Omit<ExternalAccountsAPI.BaseExternalAccountInfo, 'accountType'> {
    /**
     * Bank account number
     */
    accountNumber: string;

    accountType: 'PHP_ACCOUNT';

    /**
     * Name of the beneficiary's bank
     */
    bankName: string;

    beneficiary: ExternalAccountsAPI.BeneficiaryOneOf;
  }

  export interface SgdAccountExternalAccountInfo
    extends Omit<ExternalAccountsAPI.BaseExternalAccountInfo, 'accountType'> {
    /**
     * Bank account number
     */
    accountNumber: string;

    accountType: 'SGD_ACCOUNT';

    /**
     * Name of the beneficiary's bank
     */
    bankName: string;

    beneficiary: ExternalAccountsAPI.BeneficiaryOneOf;

    /**
     * SWIFT/BIC code (8 or 11 characters)
     */
    swiftCode: string;
  }

  export interface SparkWalletExternalAccountInfo
    extends ExternalAccountsAPI.BaseExternalAccountInfo,
      ExternalAccountsAPI.SparkWalletInfo {}

  export interface SolanaWalletExternalAccountInfo
    extends ExternalAccountsAPI.BaseExternalAccountInfo,
      ExternalAccountsAPI.SolanaWalletInfo {}

  export interface TronWalletExternalAccountInfo
    extends ExternalAccountsAPI.BaseExternalAccountInfo,
      ExternalAccountsAPI.TronWalletInfo {}

  export interface PolygonWalletExternalAccountInfo
    extends ExternalAccountsAPI.BaseExternalAccountInfo,
      ExternalAccountsAPI.PolygonWalletInfo {}

  export interface BaseWalletExternalAccountInfo
    extends ExternalAccountsAPI.BaseExternalAccountInfo,
      ExternalAccountsAPI.BaseWalletInfo {}
}

export interface IbanAccountInfo {
  accountType: 'IBAN';

  /**
   * International Bank Account Number
   */
  iban: string;

  /**
   * SWIFT/BIC code (8 or 11 characters)
   */
  swiftBic: string;
}

export interface IndividualBeneficiary extends Omit<BaseBeneficiary, 'beneficiaryType'> {
  beneficiaryType: 'INDIVIDUAL';

  /**
   * Date of birth in ISO 8601 format (YYYY-MM-DD)
   */
  birthDate: string;

  /**
   * Individual's full name
   */
  fullName: string;

  /**
   * Country code (ISO 3166-1 alpha-2)
   */
  nationality: string;
}

/**
 * Lightning payment destination. Exactly one of `invoice`, `bolt12`, or
 * `lightningAddress` must be provided.
 */
export interface LightningExternalAccountInfo extends Omit<BaseExternalAccountInfo, 'accountType'> {
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

export interface NgnAccountExternalAccountInfo extends Omit<BaseExternalAccountInfo, 'accountType'> {
  /**
   * Nigerian bank account number
   */
  accountNumber: string;

  accountType: 'NGN_ACCOUNT';

  /**
   * Name of the bank
   */
  bankName: string;

  beneficiary: BeneficiaryOneOf;

  /**
   * Purpose of payment
   */
  purposeOfPayment:
    | 'GIFT'
    | 'SELF'
    | 'GOODS_OR_SERVICES'
    | 'EDUCATION'
    | 'HEALTH_OR_MEDICAL'
    | 'REAL_ESTATE_PURCHASE'
    | 'LOAN_PAYMENT'
    | 'TAX_PAYMENT'
    | 'UTILITY_BILL'
    | 'DONATION'
    | 'TRAVEL'
    | 'OTHER';
}

export interface PixAccountInfo {
  accountType: 'PIX';

  /**
   * PIX key for Brazilian instant payments
   */
  pixKey: string;

  /**
   * Type of PIX key being used
   */
  pixKeyType: 'CPF' | 'CNPJ' | 'EMAIL' | 'PHONE' | 'RANDOM';

  /**
   * Tax ID of the account holder
   */
  taxId: string;
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

export interface UpiAccountInfo {
  accountType: 'UPI';

  /**
   * Virtual Payment Address for UPI payments
   */
  vpa: string;
}

export interface UsAccountInfo {
  /**
   * Type of account (checking or savings)
   */
  accountCategory: 'CHECKING' | 'SAVINGS';

  /**
   * US bank account number
   */
  accountNumber: string;

  accountType: 'US_ACCOUNT';

  /**
   * ACH routing number (9 digits)
   */
  routingNumber: string;

  /**
   * Name of the bank
   */
  bankName?: string;
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
    type BaseBeneficiary as BaseBeneficiary,
    type BaseExternalAccountInfo as BaseExternalAccountInfo,
    type BaseWalletInfo as BaseWalletInfo,
    type BeneficiaryOneOf as BeneficiaryOneOf,
    type BusinessBeneficiary as BusinessBeneficiary,
    type ClabeAccountInfo as ClabeAccountInfo,
    type ExternalAccount as ExternalAccount,
    type ExternalAccountCreate as ExternalAccountCreate,
    type ExternalAccountInfoOneOf as ExternalAccountInfoOneOf,
    type IbanAccountInfo as IbanAccountInfo,
    type IndividualBeneficiary as IndividualBeneficiary,
    type LightningExternalAccountInfo as LightningExternalAccountInfo,
    type NgnAccountExternalAccountInfo as NgnAccountExternalAccountInfo,
    type PixAccountInfo as PixAccountInfo,
    type PolygonWalletInfo as PolygonWalletInfo,
    type SolanaWalletInfo as SolanaWalletInfo,
    type SparkWalletInfo as SparkWalletInfo,
    type TronWalletInfo as TronWalletInfo,
    type UpiAccountInfo as UpiAccountInfo,
    type UsAccountInfo as UsAccountInfo,
    type ExternalAccountsDefaultPagination as ExternalAccountsDefaultPagination,
    type ExternalAccountCreateParams as ExternalAccountCreateParams,
    type ExternalAccountListParams as ExternalAccountListParams,
  };
}
