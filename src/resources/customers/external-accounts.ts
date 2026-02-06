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

export type BeneficiaryOneOf = BeneficiaryOneOf.IndividualBeneficiary | BeneficiaryOneOf.BusinessBeneficiary;

export namespace BeneficiaryOneOf {
  export interface IndividualBeneficiary {
    beneficiaryType: 'INDIVIDUAL' | 'BUSINESS';

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

    address?: CustomersAPI.Address;
  }

  export interface BusinessBeneficiary {
    beneficiaryType: 'BUSINESS' | 'INDIVIDUAL';

    /**
     * Legal name of the business
     */
    legalName: string;

    address?: CustomersAPI.Address;

    /**
     * Business registration number
     */
    registrationNumber?: string;

    /**
     * Tax identification number
     */
    taxId?: string;
  }
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
  | ExternalAccountInfoOneOf.UsAccountExternalAccountInfo
  | ExternalAccountInfoOneOf.ClabeAccountExternalAccountInfo
  | ExternalAccountInfoOneOf.PixAccountExternalAccountInfo
  | ExternalAccountInfoOneOf.IbanAccountExternalAccountInfo
  | ExternalAccountInfoOneOf.UpiAccountExternalAccountInfo
  | ExternalAccountInfoOneOf.NgnAccountExternalAccountInfo
  | ExternalAccountInfoOneOf.CadAccountExternalAccountInfo
  | ExternalAccountInfoOneOf.GbpAccountExternalAccountInfo
  | ExternalAccountInfoOneOf.PhpAccountExternalAccountInfo
  | ExternalAccountInfoOneOf.SgdAccountExternalAccountInfo
  | ExternalAccountInfoOneOf.SparkWalletExternalAccountInfo
  | ExternalAccountInfoOneOf.LightningExternalAccountInfo
  | ExternalAccountInfoOneOf.SolanaWalletExternalAccountInfo
  | ExternalAccountInfoOneOf.TronWalletExternalAccountInfo
  | ExternalAccountInfoOneOf.PolygonWalletExternalAccountInfo
  | ExternalAccountInfoOneOf.BaseWalletExternalAccountInfo;

export namespace ExternalAccountInfoOneOf {
  export interface UsAccountExternalAccountInfo {
    /**
     * Type of account (checking or savings)
     */
    accountCategory: 'CHECKING' | 'SAVINGS';

    /**
     * US bank account number
     */
    accountNumber: string;

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

    beneficiary: ExternalAccountsAPI.BeneficiaryOneOf;

    /**
     * ACH routing number (9 digits)
     */
    routingNumber: string;

    /**
     * Name of the bank
     */
    bankName?: string;
  }

  export interface ClabeAccountExternalAccountInfo {
    accountType:
      | 'CLABE'
      | 'US_ACCOUNT'
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

    beneficiary: ExternalAccountsAPI.BeneficiaryOneOf;

    /**
     * 18-digit CLABE number (Mexican banking standard)
     */
    clabeNumber: string;
  }

  export interface PixAccountExternalAccountInfo {
    accountType:
      | 'PIX'
      | 'US_ACCOUNT'
      | 'CLABE'
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

    beneficiary: ExternalAccountsAPI.BeneficiaryOneOf;

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

  export interface IbanAccountExternalAccountInfo {
    accountType:
      | 'IBAN'
      | 'US_ACCOUNT'
      | 'CLABE'
      | 'PIX'
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

    beneficiary: ExternalAccountsAPI.BeneficiaryOneOf;

    /**
     * International Bank Account Number
     */
    iban: string;

    /**
     * SWIFT/BIC code (8 or 11 characters)
     */
    swiftBic: string;
  }

  export interface UpiAccountExternalAccountInfo {
    accountType:
      | 'UPI'
      | 'US_ACCOUNT'
      | 'CLABE'
      | 'PIX'
      | 'IBAN'
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

    beneficiary: ExternalAccountsAPI.BeneficiaryOneOf;

    /**
     * Virtual Payment Address for UPI payments
     */
    vpa: string;
  }

  export interface NgnAccountExternalAccountInfo {
    /**
     * Nigerian bank account number
     */
    accountNumber: string;

    accountType:
      | 'NGN_ACCOUNT'
      | 'US_ACCOUNT'
      | 'CLABE'
      | 'PIX'
      | 'IBAN'
      | 'UPI'
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

    /**
     * Name of the bank
     */
    bankName: string;

    beneficiary: ExternalAccountsAPI.BeneficiaryOneOf;

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

  export interface CadAccountExternalAccountInfo {
    /**
     * Bank account number (7-12 digits)
     */
    accountNumber: string;

    accountType:
      | 'CAD_ACCOUNT'
      | 'US_ACCOUNT'
      | 'CLABE'
      | 'PIX'
      | 'IBAN'
      | 'UPI'
      | 'NGN_ACCOUNT'
      | 'GBP_ACCOUNT'
      | 'PHP_ACCOUNT'
      | 'SGD_ACCOUNT'
      | 'SPARK_WALLET'
      | 'LIGHTNING'
      | 'SOLANA_WALLET'
      | 'TRON_WALLET'
      | 'POLYGON_WALLET'
      | 'BASE_WALLET';

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

  export interface GbpAccountExternalAccountInfo {
    /**
     * UK bank account number (8 digits)
     */
    accountNumber: string;

    accountType:
      | 'GBP_ACCOUNT'
      | 'US_ACCOUNT'
      | 'CLABE'
      | 'PIX'
      | 'IBAN'
      | 'UPI'
      | 'NGN_ACCOUNT'
      | 'CAD_ACCOUNT'
      | 'PHP_ACCOUNT'
      | 'SGD_ACCOUNT'
      | 'SPARK_WALLET'
      | 'LIGHTNING'
      | 'SOLANA_WALLET'
      | 'TRON_WALLET'
      | 'POLYGON_WALLET'
      | 'BASE_WALLET';

    beneficiary: ExternalAccountsAPI.BeneficiaryOneOf;

    /**
     * UK bank sort code (6 digits, may include hyphens)
     */
    sortCode: string;
  }

  export interface PhpAccountExternalAccountInfo {
    /**
     * Bank account number
     */
    accountNumber: string;

    accountType:
      | 'PHP_ACCOUNT'
      | 'US_ACCOUNT'
      | 'CLABE'
      | 'PIX'
      | 'IBAN'
      | 'UPI'
      | 'NGN_ACCOUNT'
      | 'CAD_ACCOUNT'
      | 'GBP_ACCOUNT'
      | 'SGD_ACCOUNT'
      | 'SPARK_WALLET'
      | 'LIGHTNING'
      | 'SOLANA_WALLET'
      | 'TRON_WALLET'
      | 'POLYGON_WALLET'
      | 'BASE_WALLET';

    /**
     * Name of the beneficiary's bank
     */
    bankName: string;

    beneficiary: ExternalAccountsAPI.BeneficiaryOneOf;
  }

  export interface SgdAccountExternalAccountInfo {
    /**
     * Bank account number
     */
    accountNumber: string;

    accountType:
      | 'SGD_ACCOUNT'
      | 'US_ACCOUNT'
      | 'CLABE'
      | 'PIX'
      | 'IBAN'
      | 'UPI'
      | 'NGN_ACCOUNT'
      | 'CAD_ACCOUNT'
      | 'GBP_ACCOUNT'
      | 'PHP_ACCOUNT'
      | 'SPARK_WALLET'
      | 'LIGHTNING'
      | 'SOLANA_WALLET'
      | 'TRON_WALLET'
      | 'POLYGON_WALLET'
      | 'BASE_WALLET';

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

  export interface SparkWalletExternalAccountInfo {
    accountType:
      | 'SPARK_WALLET'
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
      | 'LIGHTNING'
      | 'SOLANA_WALLET'
      | 'TRON_WALLET'
      | 'POLYGON_WALLET'
      | 'BASE_WALLET';

    /**
     * Spark wallet address
     */
    address: string;
  }

  export interface LightningExternalAccountInfo {
    accountType:
      | 'LIGHTNING'
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
      | 'SOLANA_WALLET'
      | 'TRON_WALLET'
      | 'POLYGON_WALLET'
      | 'BASE_WALLET';

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

  export interface SolanaWalletExternalAccountInfo {
    accountType:
      | 'SOLANA_WALLET'
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
      | 'TRON_WALLET'
      | 'POLYGON_WALLET'
      | 'BASE_WALLET';

    /**
     * Solana wallet address
     */
    address: string;
  }

  export interface TronWalletExternalAccountInfo {
    accountType:
      | 'TRON_WALLET'
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
      | 'POLYGON_WALLET'
      | 'BASE_WALLET';

    /**
     * Tron wallet address
     */
    address: string;
  }

  export interface PolygonWalletExternalAccountInfo {
    accountType:
      | 'POLYGON_WALLET'
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
      | 'BASE_WALLET';

    /**
     * Polygon eth wallet address
     */
    address: string;
  }

  export interface BaseWalletExternalAccountInfo {
    accountType:
      | 'BASE_WALLET'
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
      | 'POLYGON_WALLET';

    /**
     * Base eth wallet address
     */
    address: string;
  }
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
    type BeneficiaryOneOf as BeneficiaryOneOf,
    type ExternalAccount as ExternalAccount,
    type ExternalAccountCreate as ExternalAccountCreate,
    type ExternalAccountInfoOneOf as ExternalAccountInfoOneOf,
    type ExternalAccountsDefaultPagination as ExternalAccountsDefaultPagination,
    type ExternalAccountCreateParams as ExternalAccountCreateParams,
    type ExternalAccountListParams as ExternalAccountListParams,
  };
}
