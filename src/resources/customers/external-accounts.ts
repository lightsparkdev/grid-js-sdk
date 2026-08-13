// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as ExternalAccountsAPI from './external-accounts';
import * as Shared from '../shared';
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
   *     customerId:
   *       'Customer:019542f5-b3e7-1d02-0000-000000000001',
   *   });
   * ```
   */
  create(body: ExternalAccountCreateParams, options?: RequestOptions): APIPromise<ExternalAccount> {
    return this._client.post('/customers/external-accounts', {
      body,
      ...options,
      __security: { basicAuth: true },
    });
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
    return this._client.get(path`/customers/external-accounts/${externalAccountID}`, {
      ...options,
      __security: { basicAuth: true },
    });
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
      __security: { basicAuth: true },
    });
  }

  /**
   * Delete a customer external account by its system-generated ID. An account that
   * is currently a trusted beneficiary for SCA cannot be deleted — untrust it first
   * via `POST /customers/external-accounts/{externalAccountId}/untrust` (and its
   * `/confirm`), then delete.
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
   *   await client.customers.externalAccounts.challenge(
   *     'externalAccountId',
   *     { method: 'WALLET_SIGNATURE' },
   *   );
   * ```
   */
  challenge(
    externalAccountID: string,
    body: ExternalAccountChallengeParams,
    options?: RequestOptions,
  ): APIPromise<OwnershipChallenge> {
    return this._client.post(path`/customers/external-accounts/${externalAccountID}/challenge`, {
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
   *   await client.customers.externalAccounts.verify(
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
  ): APIPromise<ExternalAccount> {
    return this._client.post(path`/customers/external-accounts/${externalAccountID}/verify`, {
      body,
      ...options,
      __security: { basicAuth: true },
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

export type AedExternalAccountInfo = unknown;

export type BaseWalletInfo = unknown;

/**
 * Required fields depend on the selected paymentRails:
 *
 * - BANK_TRANSFER: accountNumber, bankName
 * - MOBILE_MONEY: bankName, phoneNumber
 */
export type BdtExternalAccountInfo = unknown;

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

export type BrlExternalAccountInfo = unknown;

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

export type BwpExternalAccountInfo = unknown;

export type CadExternalAccountInfo = unknown;

/**
 * Required fields depend on the selected paymentRails:
 *
 * - BANK_TRANSFER: accountNumber, bankAccountType, bankName
 * - MOBILE_MONEY: bankName, phoneNumber
 */
export type CopExternalAccountInfo = unknown;

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

export type DkkExternalAccountInfo = unknown;

/**
 * Required fields depend on the selected paymentRails:
 *
 * - BANK_TRANSFER: bankName, iban
 * - MOBILE_MONEY: bankName, phoneNumber
 */
export type EgpExternalAccountInfo = unknown;

export type EurExternalAccountInfo = unknown;

export interface ExternalAccount {
  /**
   * The system generated identifier of this account
   */
  id: string;

  /**
   * Required fields depend on the selected paymentRails:
   *
   * - BANK_TRANSFER: bankAccountType, accountNumber
   * - MOBILE_MONEY: phoneNumber
   */
  accountInfo: ExternalAccountInfoOneOf;

  /**
   * The ISO 4217 currency code
   */
  currency: string;

  /**
   * Status of the external account
   */
  status:
    | 'PENDING'
    | 'ACTIVE'
    | 'PENDING_OWNERSHIP_VERIFICATION'
    | 'UNVERIFIED'
    | 'UNDER_REVIEW'
    | 'INACTIVE';

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
   * Whether the external account belongs to the customer themselves (`FIRST_PARTY`)
   * or to someone else (`THIRD_PARTY`). Required when creating self-custody crypto
   * wallet external accounts on platforms subject to counterparty requirements — for
   * example, under the EU Travel Rule or similar requirements in other regions;
   * recommended for all other accounts, where providing it can unlock additional
   * capabilities and smoother compliance handling.
   */
  ownershipType?: 'FIRST_PARTY' | 'THIRD_PARTY';

  /**
   * Optional platform-specific identifier for this account
   */
  platformAccountId?: string;
}

export interface ExternalAccountCreate {
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
    | ExternalAccountCreate.CnyAccount
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

export namespace ExternalAccountCreate {
  /**
   * Required fields depend on the selected paymentRails:
   *
   * - BANK_TRANSFER: accountNumber, bankName
   * - MOBILE_MONEY: bankName, phoneNumber
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

/**
 * Required fields depend on the selected paymentRails:
 *
 * - BANK_TRANSFER: bankAccountType, accountNumber
 * - MOBILE_MONEY: phoneNumber
 */
export type ExternalAccountInfoOneOf =
  | ExternalAccountInfoOneOf.SlvAccount
  | ExternalAccountInfoOneOf.SwiftAccount
  | ExternalAccountInfoOneOf.CnyAccount;

export namespace ExternalAccountInfoOneOf {
  /**
   * Required fields depend on the selected paymentRails:
   *
   * - BANK_TRANSFER: bankAccountType, accountNumber
   * - MOBILE_MONEY: phoneNumber
   */
  export interface SlvAccount {
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

  export interface SwiftAccount {
    accountType: 'SWIFT_ACCOUNT';

    /**
     * The name of the bank
     */
    bankName: string;

    beneficiary: Shared.SwiftBeneficiary | ExternalAccountsAPI.BusinessBeneficiary;

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

  /**
   * Required fields depend on the selected paymentRails:
   *
   * - BANK_TRANSFER: accountNumber, bankName
   * - MOBILE_MONEY: bankName, phoneNumber
   */
  export interface CnyAccount {
    accountType: 'CNY_ACCOUNT';

    /**
     * The name of the bank
     */
    bankName: string;

    beneficiary: CnyAccount.IndividualBeneficiary | ExternalAccountsAPI.BusinessBeneficiary;

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

export interface ExternalAccountListResponse {
  /**
   * List of external accounts matching the filter criteria
   */
  data: Array<ExternalAccount>;

  /**
   * Indicates if more results are available beyond this page
   */
  hasMore: boolean;

  /**
   * Cursor to retrieve the next page of results (only present if hasMore is true)
   */
  nextCursor?: string;

  /**
   * Total number of external accounts matching the criteria (excluding pagination)
   */
  totalCount?: number;
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

export type GbpExternalAccountInfo = unknown;

/**
 * Required fields depend on the selected paymentRails:
 *
 * - BANK_TRANSFER: accountNumber, bankName
 * - MOBILE_MONEY: bankName, phoneNumber
 */
export type GhsExternalAccountInfo = unknown;

export type GtqExternalAccountInfo = unknown;

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

export type HkdExternalAccountInfo = unknown;

export type HtgExternalAccountInfo = unknown;

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

export type IdrExternalAccountInfo = unknown;

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

/**
 * Required fields depend on the selected paymentRails:
 *
 * - NEFT: accountNumber, ifsc, rail
 * - RTGS: accountNumber, ifsc, rail
 * - UPI: vpa
 */
export type InrExternalAccountInfo = unknown;

export type JmdExternalAccountInfo = unknown;

export type KesExternalAccountInfo = unknown;

/**
 * Lightning payment destination. Exactly one of `invoice`, `bolt12`, or
 * `lightningAddress` must be provided.
 */
export type LightningWalletInfo = unknown;

export type MwkExternalAccountInfo = unknown;

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

export type MxnExternalAccountInfo = unknown;

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

export type MyrExternalAccountInfo = unknown;

export type NgnExternalAccountInfo = unknown;

/**
 * An ownership verification challenge for a crypto wallet external account. The
 * shape is determined by the challenge `method`.
 */
export type OwnershipChallenge =
  | OwnershipChallenge.WalletSignatureChallenge
  | OwnershipChallenge.LivenessChallenge;

export namespace OwnershipChallenge {
  /**
   * A challenge to prove ownership of the wallet by signing a message with the
   * wallet's key.
   */
  export interface WalletSignatureChallenge {
    /**
     * When this challenge expires. Prompt the user promptly; after expiry, start a new
     * challenge.
     */
    expiresAt: string;

    /**
     * The exact message the wallet must sign, character-for-character. Submit the
     * resulting signature via the verify endpoint.
     */
    messageToSign: string;

    /**
     * The verification method. Always `WALLET_SIGNATURE` for this shape.
     */
    method: 'WALLET_SIGNATURE';
  }

  /**
   * A challenge to prove ownership through a hosted biometric verification flow.
   * Completes asynchronously — the outcome is delivered via
   * `EXTERNAL_ACCOUNT.STATUS_UPDATED` webhooks or by polling the external account.
   */
  export interface LivenessChallenge {
    /**
     * When this challenge expires. Prompt the user promptly; after expiry, start a new
     * challenge.
     */
    expiresAt: string;

    /**
     * The verification method. Always `LIVENESS` for this shape.
     */
    method: 'LIVENESS';

    /**
     * Hosted verification URL to present to the user.
     */
    verificationLink: string;

    /**
     * Provider-specific token that can be used in place of `verificationLink` — for
     * example, to embed the provider's SDK directly in your application. Only returned
     * for providers that support direct SDK integration. Whether to use the hosted URL
     * or the embedded SDK is up to you; both flows result in the same verification
     * outcome.
     */
    token?: string;
  }
}

/**
 * Starts (or restarts) an ownership verification challenge for a crypto wallet
 * external account.
 */
export interface OwnershipChallengeRequest {
  /**
   * The verification method to use for this challenge.
   */
  method: OwnershipVerificationMethod;
}

/**
 * The method used to verify ownership of a self-custody crypto wallet.
 *
 * | Method             | Description                                                            |
 * | ------------------ | ---------------------------------------------------------------------- |
 * | `WALLET_SIGNATURE` | Prove control of the wallet by signing a message with the wallet's key |
 * | `LIVENESS`         | Prove identity via a hosted biometric verification flow                |
 */
export type OwnershipVerificationMethod = 'WALLET_SIGNATURE' | 'LIVENESS';

/**
 * Completes a `WALLET_SIGNATURE` challenge by submitting the signature the wallet
 * produced for the challenge's `messageToSign`.
 */
export interface OwnershipVerifyRequest {
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

export type PhpExternalAccountInfo = unknown;

/**
 * Required fields depend on the selected paymentRails:
 *
 * - BANK_TRANSFER: accountNumber, bankName
 * - MOBILE_MONEY: bankName, phoneNumber
 */
export type PkrExternalAccountInfo = unknown;

export type PlasmaWalletInfo = unknown;

export type PolygonWalletInfo = unknown;

export type RwfExternalAccountInfo = unknown;

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

export type SgdExternalAccountInfo = unknown;

export type SolanaWalletInfo = unknown;

export type SparkWalletInfo = unknown;

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

export type ThbExternalAccountInfo = unknown;

export type TronWalletInfo = unknown;

export type TzsExternalAccountInfo = unknown;

export type UgxExternalAccountInfo = unknown;

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

export type UsdExternalAccountInfo = unknown;

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

export type VndExternalAccountInfo = unknown;

export type XafExternalAccountInfo = unknown;

export type XofExternalAccountInfo = unknown;

export type ZarExternalAccountInfo = unknown;

export type ZmwExternalAccountInfo = unknown;

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
   * - BANK_TRANSFER: accountNumber, bankName
   * - MOBILE_MONEY: bankName, phoneNumber
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
   * Filter by external accounts associated with a specific customer
   */
  customerId?: string;

  /**
   * Maximum number of results to return (default 20, max 100)
   */
  limit?: number;
}

export interface ExternalAccountChallengeParams {
  /**
   * The verification method to use for this challenge.
   */
  method: OwnershipVerificationMethod;
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
    type ExternalAccountListResponse as ExternalAccountListResponse,
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
    type OwnershipChallenge as OwnershipChallenge,
    type OwnershipChallengeRequest as OwnershipChallengeRequest,
    type OwnershipVerificationMethod as OwnershipVerificationMethod,
    type OwnershipVerifyRequest as OwnershipVerifyRequest,
    type PhpBeneficiary as PhpBeneficiary,
    type PhpExternalAccountInfo as PhpExternalAccountInfo,
    type PkrExternalAccountInfo as PkrExternalAccountInfo,
    type PlasmaWalletInfo as PlasmaWalletInfo,
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
    type ExternalAccountChallengeParams as ExternalAccountChallengeParams,
    type ExternalAccountVerifyParams as ExternalAccountVerifyParams,
  };
}
