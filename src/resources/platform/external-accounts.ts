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
   *       bankAccountType: 'CHECKING',
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

  /**
   * Start (or restart) ownership verification for a `FIRST_PARTY` self-custody
   * crypto wallet external account in `PENDING_OWNERSHIP_VERIFICATION` or
   * `UNVERIFIED` status. The response carries the method-specific challenge
   * material:
   *
   * - `WALLET_SIGNATURE` — a `messageToSign`; have the wallet sign it exactly and
   *   submit the result to the verify endpoint to complete verification
   *   synchronously.
   * - `LIVENESS` — a hosted `verificationLink` (and possibly an embed `token`); the
   *   user completes a biometric flow and verification completes asynchronously. The
   *   outcome is delivered via `EXTERNAL_ACCOUNT.STATUS_UPDATED` webhooks or by
   *   polling the account.
   *
   * Calling this endpoint again abandons any in-flight challenge and issues a new
   * one with the requested method — use it to retry after a failed attempt, to
   * replace an expired challenge, or to switch methods. An `UNVERIFIED` account
   * returns to `PENDING_OWNERSHIP_VERIFICATION` when a new challenge is issued.
   *
   * Completing ownership verification moves the account to `ACTIVE`.
   *
   * @example
   * ```ts
   * const ownershipChallenge =
   *   await client.platform.externalAccounts.challenge(
   *     'externalAccountId',
   *     { method: 'WALLET_SIGNATURE' },
   *   );
   * ```
   */
  challenge(
    externalAccountID: string,
    body: ExternalAccountChallengeParams,
    options?: RequestOptions,
  ): APIPromise<ExternalAccountsAPI.OwnershipChallenge> {
    return this._client.post(path`/platform/external-accounts/${externalAccountID}/challenge`, {
      body,
      ...options,
      __security: { basicAuth: true },
    });
  }

  /**
   * Complete a `WALLET_SIGNATURE` challenge by submitting the signature the wallet
   * produced for the challenge's `messageToSign`. The message must be signed exactly
   * as returned, and the signature must be submitted before the challenge's
   * `expiresAt` — after expiry, start a new challenge.
   *
   * On success the account moves to `ACTIVE`; on an invalid signature it moves to
   * `UNVERIFIED` (start a new challenge to retry). `LIVENESS` challenges complete
   * asynchronously and never use this endpoint — their outcome is delivered via
   * `EXTERNAL_ACCOUNT.STATUS_UPDATED` webhooks or by polling the account.
   *
   * @example
   * ```ts
   * const externalAccount =
   *   await client.platform.externalAccounts.verify(
   *     'externalAccountId',
   *     {
   *       signature:
   *         '0x52d75f01c9e7b8b2ce2fbcbd21bfeeee7bcd1a2f01ce6b8ad9a67a45e83a8f5d1c',
   *     },
   *   );
   * ```
   */
  verify(
    externalAccountID: string,
    body: ExternalAccountVerifyParams,
    options?: RequestOptions,
  ): APIPromise<ExternalAccountsAPI.ExternalAccount> {
    return this._client.post(path`/platform/external-accounts/${externalAccountID}/verify`, {
      body,
      ...options,
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

  /**
   * The name of the beneficiary's bank
   */
  bankName: string;

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

/**
 * Required fields depend on the selected paymentRails:
 *
 * - NEFT: accountNumber, ifsc, rail
 * - RTGS: accountNumber, ifsc, rail
 * - UPI: vpa
 */
export interface InrAccountInfo {
  accountType: 'INR_ACCOUNT';

  paymentRails: Array<'UPI' | 'NEFT' | 'RTGS'>;

  /**
   * Indian bank account number (9–18 digits)
   */
  accountNumber?: string;

  /**
   * The name of the bank
   */
  bankName?: string;

  /**
   * The Indian Financial System Code (IFSC) of the beneficiary's bank branch
   * (NEFT/RTGS)
   */
  ifsc?: string;

  /**
   * The payment rail to route the payout over, for currencies that support more than
   * one (e.g. NEFT or RTGS for INR).
   */
  rail?: string;

  /**
   * The UPI Virtual Payment Address
   */
  vpa?: string;
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
   * The name of the bank
   */
  bankName: string;

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
   * Whether the external account belongs to the customer themselves (`FIRST_PARTY`)
   * or to someone else (`THIRD_PARTY`). Required when creating self-custody crypto
   * wallet external accounts on platforms subject to counterparty requirements — for
   * example, under the EU Travel Rule or similar requirements in other regions;
   * recommended for all other accounts, where providing it can unlock additional
   * capabilities and smoother compliance handling.
   */
  ownershipType?: 'FIRST_PARTY' | 'THIRD_PARTY';

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
   * - BANK_TRANSFER: accountNumber, bankName. Business-to-business only, so the
   *   beneficiary must be a business.
   * - MOBILE_MONEY: bankName, phoneNumber. Pays an AliPay or WeChat Pay wallet;
   *   bankName selects the wallet.
   */
  export interface CnyAccount {
    accountType: 'CNY_ACCOUNT';

    /**
     * The name of the bank
     */
    bankName: string;

    beneficiary: CnyAccount.IndividualBeneficiary | ExternalAccountsAPI.BusinessBeneficiary;

    /**
     * The account number of the bank
     */
    accountNumber?: string;

    /**
     * The phone number in international format
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

  paymentRails: Array<'PAYNOW' | 'FAST' | 'BANK_TRANSFER'>;

  /**
   * The SWIFT/BIC code of the bank
   */
  swiftCode: string;

  /**
   * Name of the beneficiary's bank. When omitted, resolved from swiftCode via the
   * payout partner bank directory at account creation.
   */
  bankName?: string;
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

  /**
   * Whether the account is a checking or a savings account. Optional on every rail;
   * when omitted, the account is treated as a checking account.
   */
  bankAccountType?: 'CHECKING' | 'SAVINGS';

  /**
   * The name of the financial institution holding the account. Optional on every
   * rail, and recommended for wires, where it identifies the beneficiary's
   * institution on the payment message.
   */
  bankName?: string;

  /**
   * Bank-to-bank instructions carried alongside the payment. Used on the WIRE rail;
   * ignored on ACH, RTP and FEDNOW.
   */
  fiToFiInformation?: string;

  /**
   * The name of the intermediary financial institution, for accounts reachable only
   * through a correspondent bank. Used on the WIRE rail; ignored on ACH, RTP and
   * FEDNOW.
   */
  intermediaryBankName?: string;

  /**
   * The ABA routing number of the intermediary financial institution. Used on the
   * WIRE rail; ignored on ACH, RTP and FEDNOW.
   */
  intermediaryRoutingNumber?: string;
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
   * Whether the external account belongs to the customer themselves (`FIRST_PARTY`)
   * or to someone else (`THIRD_PARTY`). Required when creating self-custody crypto
   * wallet external accounts on platforms subject to counterparty requirements — for
   * example, under the EU Travel Rule or similar requirements in other regions;
   * recommended for all other accounts, where providing it can unlock additional
   * capabilities and smoother compliance handling.
   */
  ownershipType?: 'FIRST_PARTY' | 'THIRD_PARTY';

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
   * - BANK_TRANSFER: accountNumber, bankName. Business-to-business only, so the
   *   beneficiary must be a business.
   * - MOBILE_MONEY: bankName, phoneNumber. Pays an AliPay or WeChat Pay wallet;
   *   bankName selects the wallet.
   */
  export interface CnyAccount {
    accountType: 'CNY_ACCOUNT';

    /**
     * The name of the bank
     */
    bankName: string;

    beneficiary: CnyAccount.IndividualBeneficiary | ExternalAccountsAPI.BusinessBeneficiary;

    /**
     * The account number of the bank
     */
    accountNumber?: string;

    /**
     * The phone number in international format
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

export interface ExternalAccountChallengeParams {
  /**
   * The verification method to use for this challenge.
   */
  method: ExternalAccountsAPI.OwnershipVerificationMethod;
}

export interface ExternalAccountVerifyParams {
  /**
   * The signature produced over the exact `messageToSign` — EIP-191 hex for EVM
   * chains, base64 for Bitcoin, base58-encoded Ed25519 for Solana.
   */
  signature: string;

  /**
   * Bitcoin message-signing format. Defaults to `bip137`; use `electrum` for
   * Electrum/Sparrow wallets. Ignored for non-Bitcoin chains.
   */
  signatureScheme?: 'bip137' | 'electrum';
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
    type ExternalAccountChallengeParams as ExternalAccountChallengeParams,
    type ExternalAccountVerifyParams as ExternalAccountVerifyParams,
  };
}

export { type ExternalAccountsDefaultPagination };
