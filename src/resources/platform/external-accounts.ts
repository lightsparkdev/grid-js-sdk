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
   *   await client.platform.externalAccounts.create({
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

export type BaseExternalAccountInfo = unknown;

export interface BrlAccountInfo {
  accountType: 'BRL_ACCOUNT';

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
   * The IBAN of the bank
   */
  iban: string;

  paymentRails: Array<'SEPA' | 'SEPA_INSTANT'>;

  /**
   * The SWIFT BIC of the bank
   */
  swiftBic?: string;
}

export interface EurAccountInfo {
  accountType: 'EUR_ACCOUNT';

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

export interface GbpAccountInfo {
  /**
   * UK bank account number (8 digits)
   */
  accountNumber: string;

  accountType: 'GBP_ACCOUNT';

  paymentRails: Array<'FASTER_PAYMENTS'>;

  /**
   * UK bank sort code (6 digits, may include hyphens)
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
   * Name of the bank
   */
  bankName: string;

  paymentRails: Array<'BANK_TRANSFER'>;

  /**
   * SWIFT/BIC code (8 or 11 characters)
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
   * Name of the bank
   */
  bankName: string;

  paymentRails: Array<'BANK_TRANSFER'>;

  /**
   * Indonesian phone number for e-wallet payments
   */
  phoneNumber: string;

  /**
   * SWIFT/BIC code (8 or 11 characters)
   */
  swiftCode: string;
}

export interface InrAccountInfo {
  accountType: 'INR_ACCOUNT';

  paymentRails: Array<'UPI'>;

  /**
   * The VPA of the bank
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
   * Name of the bank
   */
  bankName: string;

  paymentRails: Array<'BANK_TRANSFER'>;

  /**
   * SWIFT/BIC code (8 or 11 characters)
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
   * Name of the bank
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
   * SWIFT/BIC code (8 or 11 characters)
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
   * Name of the bank
   */
  bankName: string;

  paymentRails: Array<'BANK_TRANSFER'>;

  /**
   * SWIFT/BIC code (8 or 11 characters)
   */
  swiftCode: string;
}

export interface UsdAccountInfo {
  /**
   * The account number of the bank
   */
  accountNumber: string;

  accountType: 'USD_ACCOUNT';

  paymentRails: Array<'ACH' | 'WIRE' | 'RTP' | 'FEDNOW'>;

  /**
   * The routing number of the bank
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
   * Name of the bank
   */
  bankName: string;

  paymentRails: Array<'BANK_TRANSFER'>;

  /**
   * SWIFT/BIC code (8 or 11 characters)
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
  accountInfo: ExternalAccountsAPI.ExternalAccountInfoOneOf;

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

export interface ExternalAccountListParams {
  /**
   * Filter by currency code
   */
  currency?: string;
}

export declare namespace ExternalAccounts {
  export {
    type BaseExternalAccountInfo as BaseExternalAccountInfo,
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
