// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as Shared from '../shared';
import * as BulkAPI from './bulk';
import { Bulk, BulkGetJobStatusResponse, BulkUploadCsvParams, BulkUploadCsvResponse } from './bulk';
import * as ExternalAccountsAPI from './external-accounts';
import {
  Address,
  AedExternalAccountInfo,
  BaseWalletInfo,
  BdtExternalAccountInfo,
  BeneficiaryVerifiedData,
  BrlBeneficiary,
  BrlExternalAccountInfo,
  BusinessBeneficiary,
  BwpExternalAccountInfo,
  CadExternalAccountInfo,
  CopExternalAccountInfo,
  DkkBeneficiary,
  DkkExternalAccountInfo,
  EgpExternalAccountInfo,
  EurExternalAccountInfo,
  ExternalAccount,
  ExternalAccountCreate,
  ExternalAccountCreateParams,
  ExternalAccountInfoOneOf,
  ExternalAccountListParams,
  ExternalAccountListResponse,
  ExternalAccounts,
  ExternalAccountsDefaultPagination,
  GbpBeneficiary,
  GbpExternalAccountInfo,
  GhsExternalAccountInfo,
  GtqExternalAccountInfo,
  HkdBeneficiary,
  HkdExternalAccountInfo,
  HtgExternalAccountInfo,
  IdrBeneficiary,
  IdrExternalAccountInfo,
  InrBeneficiary,
  InrExternalAccountInfo,
  JmdExternalAccountInfo,
  KesExternalAccountInfo,
  LightningWalletInfo,
  MwkExternalAccountInfo,
  MxnBeneficiary,
  MxnExternalAccountInfo,
  MyrBeneficiary,
  MyrExternalAccountInfo,
  NgnExternalAccountInfo,
  PhpBeneficiary,
  PhpExternalAccountInfo,
  PkrExternalAccountInfo,
  PlasmaWalletInfo,
  PolygonWalletInfo,
  RwfExternalAccountInfo,
  SgdBeneficiary,
  SgdExternalAccountInfo,
  SolanaWalletInfo,
  SparkWalletInfo,
  ThbBeneficiary,
  ThbExternalAccountInfo,
  TronWalletInfo,
  TzsExternalAccountInfo,
  UgxExternalAccountInfo,
  UsdBeneficiary,
  UsdExternalAccountInfo,
  VndBeneficiary,
  VndExternalAccountInfo,
  XafExternalAccountInfo,
  XofExternalAccountInfo,
  ZarExternalAccountInfo,
  ZmwExternalAccountInfo,
} from './external-accounts';
import * as InternalAccountsAPI from '../sandbox/internal-accounts';
import { InternalAccountsDefaultPagination } from '../sandbox/internal-accounts';
import { APIPromise } from '../../core/api-promise';
import { DefaultPagination, type DefaultPaginationParams, PagePromise } from '../../core/pagination';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Customers extends APIResource {
  externalAccounts: ExternalAccountsAPI.ExternalAccounts = new ExternalAccountsAPI.ExternalAccounts(
    this._client,
  );
  bulk: BulkAPI.Bulk = new BulkAPI.Bulk(this._client);

  /**
   * Register a new customer in the system with an account identifier and bank
   * account information
   *
   * @example
   * ```ts
   * const customerOneOf = await client.customers.create({
   *   CreateCustomerRequest: { customerType: 'INDIVIDUAL' },
   * });
   * ```
   */
  create(params: CustomerCreateParams, options?: RequestOptions): APIPromise<CustomerOneOf> {
    const { CreateCustomerRequest } = params;
    return this._client.post('/customers', {
      body: CreateCustomerRequest,
      ...options,
      __security: { basicAuth: true },
    });
  }

  /**
   * Retrieve a customer by their system-generated ID
   *
   * @example
   * ```ts
   * const customerOneOf = await client.customers.retrieve(
   *   'customerId',
   * );
   * ```
   */
  retrieve(customerID: string, options?: RequestOptions): APIPromise<CustomerOneOf> {
    return this._client.get(path`/customers/${customerID}`, { ...options, __security: { basicAuth: true } });
  }

  /**
   * Update a customer's metadata by their system-generated ID.
   *
   * Most customer updates complete synchronously and return `200` with the updated
   * customer. If the request changes `email` for a customer that has one or more
   * tied Embedded Wallet internal accounts with `EMAIL_OTP` credentials, or changes
   * `phoneNumber` for a customer that has one or more tied Embedded Wallet internal
   * accounts with `SMS_OTP` credentials, the contact update uses the two-step
   * signed-retry flow so the customer's wallet session authorizes the authentication
   * credential update. On the signed retry, Grid updates the customer contact field
   * and every tied matching OTP credential across all tied Embedded Wallets as one
   * logical operation. If any tied credential cannot be updated, the customer
   * contact field is not changed.
   *
   * Update `email` and `phoneNumber` in separate PATCH calls. A request that
   * includes both fields is rejected.
   *
   * For an Embedded Wallet email or SMS auth phone update:
   *
   * 1. Call `PATCH /customers/{customerId}` with the full update body and no
   *    signature headers. Grid returns `202` with `payloadToSign`, `requestId`, and
   *    `expiresAt`. The pending challenge binds the submitted update fields and the
   *    set of tied Embedded Wallet OTP credentials that must be updated.
   *
   * 2. Use the session API keypair of a verified authentication credential on one of
   *    the customer's tied Embedded Wallets to build an API-key stamp over
   *    `payloadToSign`, then retry the same request with that full stamp as the
   *    `Grid-Wallet-Signature` header and the `requestId` echoed back as the
   *    `Request-Id` header. The retry body must carry the same update fields
   *    submitted in step 1. The signed retry returns `200` with the updated
   *    customer.
   *
   * @example
   * ```ts
   * const customerOneOf = await client.customers.update(
   *   'customerId',
   *   { UpdateCustomerRequest: { customerType: 'INDIVIDUAL' } },
   * );
   * ```
   */
  update(
    customerID: string,
    params: CustomerUpdateParams,
    options?: RequestOptions,
  ): APIPromise<CustomerOneOf> {
    const {
      UpdateCustomerRequest,
      'Grid-Wallet-Signature': gridWalletSignature,
      'Request-Id': requestID,
    } = params;
    return this._client.patch(path`/customers/${customerID}`, {
      body: UpdateCustomerRequest,
      ...options,
      headers: buildHeaders([
        {
          ...(gridWalletSignature != null ? { 'Grid-Wallet-Signature': gridWalletSignature } : undefined),
          ...(requestID != null ? { 'Request-Id': requestID } : undefined),
        },
        options?.headers,
      ]),
      __security: { basicAuth: true },
    });
  }

  /**
   * Retrieve a list of customers with optional filtering parameters. Returns all
   * customers that match the specified filters. If no filters are provided, returns
   * all customers (paginated).
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const customerOneOf of client.customers.list()) {
   *   // ...
   * }
   * ```
   */
  list(
    query: CustomerListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<CustomerOneovesDefaultPagination, CustomerOneOf> {
    return this._client.getAPIList('/customers', DefaultPagination<CustomerOneOf>, {
      query,
      ...options,
      __security: { basicAuth: true },
    });
  }

  /**
   * Delete a customer by their system-generated ID
   *
   * @example
   * ```ts
   * const customerOneOf = await client.customers.delete(
   *   'customerId',
   * );
   * ```
   */
  delete(customerID: string, options?: RequestOptions): APIPromise<CustomerOneOf> {
    return this._client.delete(path`/customers/${customerID}`, {
      ...options,
      __security: { basicAuth: true },
    });
  }

  /**
   * Generate a single-use hosted URL the customer can complete to verify their
   * identity, and (where supported) a provider-specific `token` for embedding the
   * verification flow directly via the provider's SDK.
   *
   * The customer must already exist — create them with `POST /customers` first.
   * Calling this endpoint does not change the customer's `kycStatus`; the customer
   * remains `PENDING` until they complete (or fail) the hosted flow.
   *
   * Each call returns a fresh link. Previously-issued links are not invalidated, but
   * they remain single-use and will expire on their own. For request-level retry
   * safety, include an `Idempotency-Key` header.
   *
   * @example
   * ```ts
   * const kycLinkResponse =
   *   await client.customers.createKYCLink('customerId');
   * ```
   */
  createKYCLink(
    customerID: string,
    params: CustomerCreateKYCLinkParams | null | undefined = undefined,
    options?: RequestOptions,
  ): APIPromise<KYCLinkResponse> {
    const { KycLinkCreateRequest, 'Idempotency-Key': idempotencyKey } = params ?? {};
    return this._client.post(path`/customers/${customerID}/kyc-link`, {
      body: KycLinkCreateRequest,
      ...options,
      headers: buildHeaders([
        { ...(idempotencyKey != null ? { 'Idempotency-Key': idempotencyKey } : undefined) },
        options?.headers,
      ]),
      __security: { basicAuth: true },
    });
  }

  /**
   * Export the wallet credentials of an Embedded Wallet internal account. The
   * returned wallet credentials are HPKE-encrypted to the `clientPublicKey` supplied
   * in the request body.
   *
   * Export is a two-step signed-retry flow (same pattern as add-additional
   * credential, revoke credential, and revoke session):
   *
   * 1. Call `POST /internal-accounts/{id}/export` with the request body
   *    `{ "clientPublicKey": "..." }` and no signature headers. Grid binds the
   *    `clientPublicKey` into the `payloadToSign` it returns, so the subsequent
   *    stamp in `Grid-Wallet-Signature` commits to the target encryption key. The
   *    response is `202` with `payloadToSign`, `requestId`, and `expiresAt`.
   *
   * 2. Use the session API keypair of a verified authentication credential on the
   *    same internal account to build an API-key stamp over `payloadToSign`, then
   *    retry with that full stamp as the `Grid-Wallet-Signature` header and the
   *    `requestId` echoed back as the `Request-Id` header. The retry body must carry
   *    the **same** `clientPublicKey` submitted in step 1 — Grid rejects the retry
   *    with `401` if it disagrees with what was bound into `payloadToSign`. The
   *    signed retry returns `200` with `encryptedWalletCredentials`, which the
   *    client decrypts with the matching private key.
   *
   * The `clientPublicKey` is ephemeral: generate a fresh P-256 keypair for this
   * export and discard the private key after decrypting. Do not reuse the keypair
   * from any prior verify call — that private key was already discarded after
   * decrypting the session signing key it was issued against.
   *
   * @example
   * ```ts
   * const internalAccountExportResponse =
   *   await client.customers.export('id', {
   *     clientPublicKey:
   *       '04f45f2a22c908b9ce09a7150e514afd24627c401c38a4afc164e1ea783adaaa31d4245acfb88c2ebd42b47628d63ecabf345484f0a9f665b63c54c897d5578be2',
   *   });
   * ```
   */
  export(
    id: string,
    params: CustomerExportParams,
    options?: RequestOptions,
  ): APIPromise<InternalAccountExportResponse> {
    const { 'Grid-Wallet-Signature': gridWalletSignature, 'Request-Id': requestID, ...body } = params;
    return this._client.post(path`/internal-accounts/${id}/export`, {
      body,
      ...options,
      headers: buildHeaders([
        {
          ...(gridWalletSignature != null ? { 'Grid-Wallet-Signature': gridWalletSignature } : undefined),
          ...(requestID != null ? { 'Request-Id': requestID } : undefined),
        },
        options?.headers,
      ]),
      __security: { basicAuth: true },
    });
  }

  /**
   * Retrieve a list of internal accounts with optional filtering parameters. Returns
   * all internal accounts that match the specified filters. If no filters are
   * provided, returns all internal accounts (paginated).
   *
   * Internal accounts are created automatically when a customer is created based on
   * the platform configuration.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const internalAccount of client.customers.listInternalAccounts()) {
   *   // ...
   * }
   * ```
   */
  listInternalAccounts(
    query: CustomerListInternalAccountsParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<InternalAccountsDefaultPagination, InternalAccountsAPI.InternalAccount> {
    return this._client.getAPIList(
      '/customers/internal-accounts',
      DefaultPagination<InternalAccountsAPI.InternalAccount>,
      { query, ...options, __security: { basicAuth: true } },
    );
  }

  /**
   * Update mutable fields on an internal account. Today this supports updating the
   * wallet privacy setting for an Embedded Wallet internal account.
   *
   * Updating wallet privacy is a two-step signed-retry flow:
   *
   * 1. Call `PATCH /internal-accounts/{id}` with the request body
   *    `{ "privateEnabled": true }` and no signature headers. Grid returns `202`
   *    with `payloadToSign`, `requestId`, and `expiresAt`.
   *
   * 2. Use the session API keypair of a verified authentication credential on the
   *    same internal account to build an API-key stamp over `payloadToSign`, then
   *    retry with that full stamp as the `Grid-Wallet-Signature` header and the
   *    `requestId` echoed back as the `Request-Id` header. The retry body must carry
   *    the same update fields submitted in step 1. The signed retry returns `200`
   *    with the updated internal account.
   *
   * @example
   * ```ts
   * const internalAccount =
   *   await client.customers.updateInternalAccount(
   *     'InternalAccount:019542f5-b3e7-1d02-0000-000000000002',
   *     { InternalAccountUpdateRequest: {} },
   *   );
   * ```
   */
  updateInternalAccount(
    id: string,
    params: CustomerUpdateInternalAccountParams,
    options?: RequestOptions,
  ): APIPromise<InternalAccountsAPI.InternalAccount> {
    const {
      InternalAccountUpdateRequest,
      'Grid-Wallet-Signature': gridWalletSignature,
      'Request-Id': requestID,
    } = params;
    return this._client.patch(path`/internal-accounts/${id}`, {
      body: InternalAccountUpdateRequest,
      ...options,
      headers: buildHeaders([
        {
          ...(gridWalletSignature != null ? { 'Grid-Wallet-Signature': gridWalletSignature } : undefined),
          ...(requestID != null ? { 'Request-Id': requestID } : undefined),
        },
        options?.headers,
      ]),
      __security: { basicAuth: true },
    });
  }
}

export type CustomerOneovesDefaultPagination = DefaultPagination<CustomerOneOf>;

export interface BusinessCustomerCreateRequest {
  /**
   * Additional information required for business entities
   */
  businessInfo: BusinessCustomerCreateRequest.BusinessInfo;

  customerType: 'BUSINESS';

  address?: ExternalAccountsAPI.Address;

  /**
   * List of currency codes the customer will use (ISO 4217 for fiat, e.g. "USD",
   * "EUR"; tickers for crypto, e.g. "BTC", "USDC"). Required if the customer will
   * use more than one sending currency, since the correct currencies cannot always
   * be inferred. If not provided, currencies will be inferred from the customer's
   * region. Some currency combinations may require separate customers — if so, the
   * request will be rejected with details.
   */
  currencies?: Array<string>;

  /**
   * Email address for the customer. **Required in regions that verify the email
   * address before identity verification** (e.g. the EU); optional otherwise.
   */
  email?: string;

  /**
   * The current KYB status of a business customer. `HOLD` means the customer is
   * placed on hold and may be required to update or provide more information.
   */
  kybStatus?: 'UNVERIFIED' | 'PENDING' | 'APPROVED' | 'REJECTED' | 'HOLD';

  /**
   * Phone number for the customer in strict E.164 format. **Required in regions that
   * verify the phone number before identity verification** (e.g. the EU); optional
   * otherwise.
   */
  phoneNumber?: string;

  /**
   * Platform-specific customer identifier. If not provided, one will be generated by
   * the system.
   */
  platformCustomerId?: string;

  /**
   * Country code (ISO 3166-1 alpha-2) representing the customer's regional identity.
   * This determines the regulatory jurisdiction and KYC requirements for the
   * customer. Required if the customer will use currencies with different KYC
   * requirements across regions. A customer with accounts in multiple regions should
   * be registered as separate customers. This field is immutable after creation.
   */
  region?: string;

  /**
   * Optional UMA address identifier. If not provided during customer creation, one
   * will be generated by the system. If provided during customer update, the UMA
   * address will be updated to the provided value. This is an optional identifier to
   * route payments to the customer. This is an optional identifier to route payments
   * to the customer.
   */
  umaAddress?: string;
}

export namespace BusinessCustomerCreateRequest {
  /**
   * Additional information required for business entities
   */
  export interface BusinessInfo {
    /**
     * Date of incorporation in ISO 8601 format (YYYY-MM-DD)
     */
    incorporatedOn: string;

    /**
     * Legal name of the business
     */
    legalName: string;

    /**
     * Tax identification number
     */
    taxId: string;

    /**
     * The high-level industry category of the business
     */
    businessType?:
      | 'AGRICULTURE_FORESTRY_FISHING_AND_HUNTING'
      | 'MINING_QUARRYING_AND_OIL_AND_GAS_EXTRACTION'
      | 'UTILITIES'
      | 'CONSTRUCTION'
      | 'MANUFACTURING'
      | 'WHOLESALE_TRADE'
      | 'RETAIL_TRADE'
      | 'TRANSPORTATION_AND_WAREHOUSING'
      | 'INFORMATION'
      | 'FINANCE_AND_INSURANCE'
      | 'REAL_ESTATE_AND_RENTAL_AND_LEASING'
      | 'PROFESSIONAL_SCIENTIFIC_AND_TECHNICAL_SERVICES'
      | 'MANAGEMENT_OF_COMPANIES_AND_ENTERPRISES'
      | 'ADMINISTRATIVE_AND_SUPPORT_AND_WASTE_MANAGEMENT_AND_REMEDIATION_SERVICES'
      | 'EDUCATIONAL_SERVICES'
      | 'HEALTH_CARE_AND_SOCIAL_ASSISTANCE'
      | 'ARTS_ENTERTAINMENT_AND_RECREATION'
      | 'ACCOMMODATION_AND_FOOD_SERVICES'
      | 'OTHER_SERVICES'
      | 'PUBLIC_ADMINISTRATION';

    /**
     * List of countries where the business operates (ISO 3166-1 alpha-2)
     */
    countriesOfOperation?: Array<string>;

    /**
     * Country of incorporation or registration (ISO 3166-1 alpha-2)
     */
    country?: string;

    /**
     * Trade name or DBA name of the business, if different from the legal name
     */
    doingBusinessAs?: string;

    /**
     * Legal entity type of the business
     */
    entityType?:
      | 'SOLE_PROPRIETORSHIP'
      | 'PARTNERSHIP'
      | 'LLC'
      | 'CORPORATION'
      | 'S_CORPORATION'
      | 'NON_PROFIT'
      | 'OTHER';

    /**
     * List of countries of the business's expected transaction counterparties (ISO
     * 3166-1 alpha-2)
     */
    expectedCounterpartyCountries?: Array<string>;

    /**
     * Expected number of transactions per month
     */
    expectedMonthlyTransactionCount?:
      | 'COUNT_UNDER_10'
      | 'COUNT_10_TO_100'
      | 'COUNT_100_TO_500'
      | 'COUNT_500_TO_1000'
      | 'COUNT_OVER_1000';

    /**
     * Expected total transaction volume per month in USD equivalent
     */
    expectedMonthlyTransactionVolume?:
      | 'VOLUME_UNDER_10K'
      | 'VOLUME_10K_TO_100K'
      | 'VOLUME_100K_TO_1M'
      | 'VOLUME_1M_TO_10M'
      | 'VOLUME_OVER_10M';

    /**
     * List of countries where the business expects to send payments (ISO 3166-1
     * alpha-2)
     */
    expectedRecipientJurisdictions?: Array<string>;

    /**
     * NAICS code describing the nature of the business (2-6 digits)
     */
    naicsCode?: string;

    /**
     * The intended purpose for using the Grid account
     */
    purposeOfAccount?:
      | 'CONTRACTOR_PAYOUTS'
      | 'CREATOR_PAYOUTS'
      | 'EMPLOYEE_PAYOUTS'
      | 'MARKETPLACE_SELLER_PAYOUTS'
      | 'SUPPLIER_PAYMENTS'
      | 'CROSS_BORDER_B2B'
      | 'AR_AUTOMATION'
      | 'AP_AUTOMATION'
      | 'EMBEDDED_PAYMENTS'
      | 'PLATFORM_FEE_COLLECTION'
      | 'P2P_TRANSFERS'
      | 'CHARITABLE_DONATIONS'
      | 'OTHER';

    /**
     * Description of the account purpose when OTHER is selected
     */
    purposeOfAccountOtherDescription?: string;

    /**
     * Business registration number
     */
    registrationNumber?: string;

    /**
     * The primary source of funds for the business
     */
    sourceOfFunds?: string;

    /**
     * Structured source-of-funds categories for the business
     */
    sourceOfFundsCategories?: Array<unknown>;

    /**
     * Description of the source of funds when OTHER is selected
     */
    sourceOfFundsOtherDescription?: string;
  }
}

/**
 * Request body for `PATCH /customers/{customerId}`. When `email` changes for a
 * customer with tied Embedded Wallet internal accounts, Grid updates the customer
 * email and every tied `EMAIL_OTP` credential through the endpoint's signed-retry
 * flow. When `phoneNumber` changes for a customer with tied Embedded Wallet
 * internal accounts, Grid updates the customer phone number and every tied
 * `SMS_OTP` credential through the same signed-retry flow. Update `email` and
 * `phoneNumber` in separate PATCH calls.
 */
export interface BusinessCustomerUpdateRequest {
  customerType: 'BUSINESS';

  address?: ExternalAccountsAPI.Address;

  /**
   * Additional information for business entities
   */
  businessInfo?: BusinessCustomerUpdateRequest.BusinessInfo;

  /**
   * Updated list of currency codes the customer will use (ISO 4217 for fiat, e.g.
   * "USD", "EUR"; tickers for crypto, e.g. "BTC", "USDC"). Replaces the existing
   * list. Some currency combinations may require separate customers — if so, the
   * request will be rejected with details.
   */
  currencies?: Array<string>;

  /**
   * Email address for the customer. For customers with tied Embedded Wallet internal
   * accounts, changing this value also updates every tied `EMAIL_OTP` credential
   * across all tied Embedded Wallets.
   */
  email?: string;

  /**
   * The current KYB status of a business customer. `HOLD` means the customer is
   * placed on hold and may be required to update or provide more information.
   */
  kybStatus?: 'UNVERIFIED' | 'PENDING' | 'APPROVED' | 'REJECTED' | 'HOLD';

  /**
   * Phone number for the customer in strict E.164 format. For customers with tied
   * Embedded Wallet internal accounts, changing this value also updates every tied
   * `SMS_OTP` credential across all tied Embedded Wallets. Send phone number and
   * email updates as separate PATCH calls.
   */
  phoneNumber?: string;

  /**
   * Optional UMA address identifier. If provided, the customer's UMA address will be
   * updated. This is an optional identifier to route payments to the customer.
   */
  umaAddress?: string;
}

export namespace BusinessCustomerUpdateRequest {
  /**
   * Additional information for business entities
   */
  export interface BusinessInfo {
    /**
     * The high-level industry category of the business
     */
    businessType?:
      | 'AGRICULTURE_FORESTRY_FISHING_AND_HUNTING'
      | 'MINING_QUARRYING_AND_OIL_AND_GAS_EXTRACTION'
      | 'UTILITIES'
      | 'CONSTRUCTION'
      | 'MANUFACTURING'
      | 'WHOLESALE_TRADE'
      | 'RETAIL_TRADE'
      | 'TRANSPORTATION_AND_WAREHOUSING'
      | 'INFORMATION'
      | 'FINANCE_AND_INSURANCE'
      | 'REAL_ESTATE_AND_RENTAL_AND_LEASING'
      | 'PROFESSIONAL_SCIENTIFIC_AND_TECHNICAL_SERVICES'
      | 'MANAGEMENT_OF_COMPANIES_AND_ENTERPRISES'
      | 'ADMINISTRATIVE_AND_SUPPORT_AND_WASTE_MANAGEMENT_AND_REMEDIATION_SERVICES'
      | 'EDUCATIONAL_SERVICES'
      | 'HEALTH_CARE_AND_SOCIAL_ASSISTANCE'
      | 'ARTS_ENTERTAINMENT_AND_RECREATION'
      | 'ACCOMMODATION_AND_FOOD_SERVICES'
      | 'OTHER_SERVICES'
      | 'PUBLIC_ADMINISTRATION';

    /**
     * List of countries where the business operates (ISO 3166-1 alpha-2)
     */
    countriesOfOperation?: Array<string>;

    /**
     * Country of incorporation or registration (ISO 3166-1 alpha-2)
     */
    country?: string;

    /**
     * Trade name or DBA name of the business, if different from the legal name
     */
    doingBusinessAs?: string;

    /**
     * Legal entity type of the business
     */
    entityType?:
      | 'SOLE_PROPRIETORSHIP'
      | 'PARTNERSHIP'
      | 'LLC'
      | 'CORPORATION'
      | 'S_CORPORATION'
      | 'NON_PROFIT'
      | 'OTHER';

    /**
     * List of countries of the business's expected transaction counterparties (ISO
     * 3166-1 alpha-2)
     */
    expectedCounterpartyCountries?: Array<string>;

    /**
     * Expected number of transactions per month
     */
    expectedMonthlyTransactionCount?:
      | 'COUNT_UNDER_10'
      | 'COUNT_10_TO_100'
      | 'COUNT_100_TO_500'
      | 'COUNT_500_TO_1000'
      | 'COUNT_OVER_1000';

    /**
     * Expected total transaction volume per month in USD equivalent
     */
    expectedMonthlyTransactionVolume?:
      | 'VOLUME_UNDER_10K'
      | 'VOLUME_10K_TO_100K'
      | 'VOLUME_100K_TO_1M'
      | 'VOLUME_1M_TO_10M'
      | 'VOLUME_OVER_10M';

    /**
     * List of countries where the business expects to send payments (ISO 3166-1
     * alpha-2)
     */
    expectedRecipientJurisdictions?: Array<string>;

    /**
     * Date of incorporation in ISO 8601 format (YYYY-MM-DD)
     */
    incorporatedOn?: string;

    /**
     * Legal name of the business
     */
    legalName?: string;

    /**
     * NAICS code describing the nature of the business (2-6 digits)
     */
    naicsCode?: string;

    /**
     * The intended purpose for using the Grid account
     */
    purposeOfAccount?:
      | 'CONTRACTOR_PAYOUTS'
      | 'CREATOR_PAYOUTS'
      | 'EMPLOYEE_PAYOUTS'
      | 'MARKETPLACE_SELLER_PAYOUTS'
      | 'SUPPLIER_PAYMENTS'
      | 'CROSS_BORDER_B2B'
      | 'AR_AUTOMATION'
      | 'AP_AUTOMATION'
      | 'EMBEDDED_PAYMENTS'
      | 'PLATFORM_FEE_COLLECTION'
      | 'P2P_TRANSFERS'
      | 'CHARITABLE_DONATIONS'
      | 'OTHER';

    /**
     * Description of the account purpose when OTHER is selected
     */
    purposeOfAccountOtherDescription?: string;

    /**
     * Business registration number
     */
    registrationNumber?: string;

    /**
     * The primary source of funds for the business
     */
    sourceOfFunds?: string;

    /**
     * Structured source-of-funds categories for the business
     */
    sourceOfFundsCategories?: Array<
      | 'OPERATING_REVENUE'
      | 'INVESTMENT_INCOME'
      | 'LOANS'
      | 'VENTURE_CAPITAL'
      | 'PERSONAL_SAVINGS'
      | 'DONATIONS'
      | 'OTHER'
    >;

    /**
     * Description of the source of funds when OTHER is selected
     */
    sourceOfFundsOtherDescription?: string;

    /**
     * Tax identification number
     */
    taxId?: string;
  }
}

export interface Customer {
  customerType: unknown;

  /**
   * Platform-specific customer identifier
   */
  platformCustomerId: string;

  /**
   * Full UMA address (always present in responses, even if system-generated). This
   * is an optional identifier to route payments to the customer.
   */
  umaAddress: string;

  /**
   * System-generated unique identifier
   */
  id?: string;

  /**
   * Email and phone verification state. **Only present when the customer's payment
   * provider requires it** (e.g. EU customers); omitted otherwise.
   */
  contactVerification?: Customer.ContactVerification;

  /**
   * Creation timestamp
   */
  createdAt?: string;

  /**
   * List of currency codes enabled for this customer.
   */
  currencies?: Array<string>;

  /**
   * Email address for the customer.
   */
  email?: string;

  /**
   * Whether the customer is marked as deleted
   */
  isDeleted?: boolean;

  /**
   * Phone number for the customer in strict E.164 format.
   */
  phoneNumber?: string;

  /**
   * Country code (ISO 3166-1 alpha-2) representing the customer's regional identity
   * and regulatory jurisdiction.
   */
  region?: string;

  /**
   * Last update timestamp
   */
  updatedAt?: string;
}

export namespace Customer {
  /**
   * Email and phone verification state. **Only present when the customer's payment
   * provider requires it** (e.g. EU customers); omitted otherwise.
   */
  export interface ContactVerification {
    /**
     * Verification status of the customer's email address. Present only when the
     * provider requires email verification.
     */
    email?: 'PENDING' | 'VERIFIED';

    /**
     * Verification status of the customer's phone number. Present only when the
     * provider requires phone verification.
     */
    phone?: 'PENDING' | 'VERIFIED';
  }
}

/**
 * Enhanced-due-diligence (EDD) fields available as optional patchable attributes
 * on an individual customer. Referenced via `allOf` from
 * `IndividualCustomerFields`, so these appear as top-level optional fields on the
 * customer resource itself; there is no separate EDD resource. The specific set
 * required for a given customer is driven by the KYC provider's per-jurisdiction /
 * per-flow / per-volume-tier rules (surfaced through `MISSING_FIELD` errors on
 * `POST /verifications`).
 */
export type CustomerCreateRequestOneOf = IndividualCustomerCreateRequest | BusinessCustomerCreateRequest;

export interface CustomerListResponse {
  /**
   * List of customers matching the filter criteria
   */
  data: Array<CustomerOneOf>;

  /**
   * Indicates if more results are available beyond this page
   */
  hasMore: boolean;

  /**
   * Cursor to retrieve the next page of results (only present if hasMore is true)
   */
  nextCursor?: string;

  /**
   * Total number of customers matching the criteria (excluding pagination)
   */
  totalCount?: number;
}

/**
 * Enhanced-due-diligence (EDD) fields available as optional patchable attributes
 * on an individual customer. Referenced via `allOf` from
 * `IndividualCustomerFields`, so these appear as top-level optional fields on the
 * customer resource itself; there is no separate EDD resource. The specific set
 * required for a given customer is driven by the KYC provider's per-jurisdiction /
 * per-flow / per-volume-tier rules (surfaced through `MISSING_FIELD` errors on
 * `POST /verifications`).
 */
export type CustomerOneOf = Shared.IndividualCustomer | Shared.BusinessCustomer;

/**
 * Enhanced-due-diligence (EDD) fields available as optional patchable attributes
 * on an individual customer. Referenced via `allOf` from
 * `IndividualCustomerFields`, so these appear as top-level optional fields on the
 * customer resource itself; there is no separate EDD resource. The specific set
 * required for a given customer is driven by the KYC provider's per-jurisdiction /
 * per-flow / per-volume-tier rules (surfaced through `MISSING_FIELD` errors on
 * `POST /verifications`).
 */
export type CustomerUpdateRequestOneOf = IndividualCustomerUpdateRequest | BusinessCustomerUpdateRequest;

/**
 * Enhanced-due-diligence (EDD) fields available as optional patchable attributes
 * on an individual customer. Referenced via `allOf` from
 * `IndividualCustomerFields`, so these appear as top-level optional fields on the
 * customer resource itself; there is no separate EDD resource. The specific set
 * required for a given customer is driven by the KYC provider's per-jurisdiction /
 * per-flow / per-volume-tier rules (surfaced through `MISSING_FIELD` errors on
 * `POST /verifications`).
 */
export interface IndividualCustomerCreateRequest {
  customerType: 'INDIVIDUAL';

  address?: ExternalAccountsAPI.Address;

  /**
   * Bucketed annual income (USD equivalent). Used for enhanced due diligence on
   * higher-risk profiles.
   */
  annualIncomeRange?: 'UNDER_50K' | 'RANGE_50K_100K' | 'RANGE_100K_250K' | 'RANGE_250K_1M' | 'OVER_1M';

  /**
   * Date of birth in ISO 8601 format (YYYY-MM-DD)
   */
  birthDate?: string;

  /**
   * List of currency codes the customer will use (ISO 4217 for fiat, e.g. "USD",
   * "EUR"; tickers for crypto, e.g. "BTC", "USDC"). Required if the customer will
   * use more than one sending currency, since the correct currencies cannot always
   * be inferred. If not provided, currencies will be inferred from the customer's
   * region. Some currency combinations may require separate customers — if so, the
   * request will be rejected with details.
   */
  currencies?: Array<string>;

  /**
   * Email address for the customer. **Required in regions that verify the email
   * address before identity verification** (e.g. the EU); optional otherwise.
   */
  email?: string;

  /**
   * Expected number of transactions per month
   */
  expectedMonthlyTransactionCount?:
    | 'COUNT_UNDER_10'
    | 'COUNT_10_TO_100'
    | 'COUNT_100_TO_500'
    | 'COUNT_500_TO_1000'
    | 'COUNT_OVER_1000';

  /**
   * Expected total transaction volume per month in USD equivalent
   */
  expectedMonthlyTransactionVolume?:
    | 'VOLUME_UNDER_10K'
    | 'VOLUME_10K_TO_100K'
    | 'VOLUME_100K_TO_1M'
    | 'VOLUME_1M_TO_10M'
    | 'VOLUME_OVER_10M';

  /**
   * Individual's full name
   */
  fullName?: string;

  /**
   * Type of tax identification
   */
  idType?: 'SSN' | 'ITIN' | 'EIN' | 'NON_US_TAX_ID';

  /**
   * The current KYC status of a customer. `HOLD` means the customer is placed on
   * hold and may be required to update or provide more information.
   */
  kycStatus?: 'UNVERIFIED' | 'PENDING' | 'APPROVED' | 'REJECTED' | 'HOLD';

  /**
   * Country code (ISO 3166-1 alpha-2)
   */
  nationality?: string;

  /**
   * Bucketed total net worth (USD equivalent). Used for enhanced due diligence on
   * higher-risk profiles.
   */
  netWorthRange?:
    | 'UNDER_100K'
    | 'RANGE_100K_500K'
    | 'RANGE_500K_1M'
    | 'RANGE_1M_5M'
    | 'RANGE_5M_25M'
    | 'OVER_25M';

  /**
   * Political exposure declaration (Politically Exposed Person status). `HIO` = head
   * of an international organization. `FAMILY_OR_ASSOCIATE` covers close family
   * members and known close associates of a PEP.
   */
  pepStatus?: 'NONE' | 'DOMESTIC' | 'FOREIGN' | 'HIO' | 'FAMILY_OR_ASSOCIATE';

  /**
   * Phone number for the customer in strict E.164 format. **Required in regions that
   * verify the phone number before identity verification** (e.g. the EU); optional
   * otherwise.
   */
  phoneNumber?: string;

  /**
   * Platform-specific customer identifier. If not provided, one will be generated by
   * the system.
   */
  platformCustomerId?: string;

  /**
   * The intended purpose for using the Grid account
   */
  purposeOfAccount?:
    | 'CONTRACTOR_PAYOUTS'
    | 'CREATOR_PAYOUTS'
    | 'EMPLOYEE_PAYOUTS'
    | 'MARKETPLACE_SELLER_PAYOUTS'
    | 'SUPPLIER_PAYMENTS'
    | 'CROSS_BORDER_B2B'
    | 'AR_AUTOMATION'
    | 'AP_AUTOMATION'
    | 'EMBEDDED_PAYMENTS'
    | 'PLATFORM_FEE_COLLECTION'
    | 'P2P_TRANSFERS'
    | 'CHARITABLE_DONATIONS'
    | 'OTHER';

  /**
   * Free-form description of the customer's intended purpose for the Grid account.
   * Required when `purposeOfAccount` is `OTHER`; otherwise omitted.
   */
  purposeOfAccountOtherDescription?: string;

  /**
   * Country code (ISO 3166-1 alpha-2) representing the customer's regional identity.
   * This determines the regulatory jurisdiction and KYC requirements for the
   * customer. Required if the customer will use currencies with different KYC
   * requirements across regions. A customer with accounts in multiple regions should
   * be registered as separate customers. This field is immutable after creation.
   */
  region?: string;

  /**
   * Structured source-of-funds categories (FLOW of funds for this account).
   */
  sourceOfFundsCategories?: Array<
    | 'SALARY'
    | 'SELF_EMPLOYMENT_INCOME'
    | 'INVESTMENT_INCOME'
    | 'PENSION'
    | 'RENTAL_INCOME'
    | 'GIFT'
    | 'INHERITANCE'
    | 'LOAN'
    | 'SAVINGS'
    | 'SALE_OF_ASSETS'
    | 'OTHER'
  >;

  /**
   * Free-form description of the customer's source of funds. Required when
   * `sourceOfFundsCategories` includes `OTHER`; otherwise omitted.
   */
  sourceOfFundsOtherDescription?: string;

  /**
   * Structured source-of-wealth categories (STOCK — origin of accumulated wealth).
   */
  sourceOfWealthCategories?: Array<
    | 'SALARY'
    | 'BUSINESS_INCOME'
    | 'INVESTMENTS'
    | 'INHERITANCE'
    | 'PROPERTY_SALE'
    | 'GIFT'
    | 'RETIREMENT'
    | 'SAVINGS'
    | 'OTHER'
  >;

  /**
   * Free-form description of the customer's source of wealth. Required when
   * `sourceOfWealthCategories` includes `OTHER`; otherwise omitted.
   */
  sourceOfWealthOtherDescription?: string;

  /**
   * Country that issued the tax identifier (ISO 3166-1 alpha-2). Required when
   * `taxIdType` is `NON_US_TAX_ID`.
   */
  taxIdCountryOfIssuance?: string;

  /**
   * Tax-identification number. For US persons this is the SSN (format `###-##-####`)
   * or ITIN. For non-US persons this is the tax number issued by
   * `taxIdCountryOfIssuance`.
   */
  taxIdentifier?: string;

  /**
   * Type of tax identification
   */
  taxIdType?: 'SSN' | 'ITIN' | 'EIN' | 'NON_US_TAX_ID';

  /**
   * Optional UMA address identifier. If not provided during customer creation, one
   * will be generated by the system. If provided during customer update, the UMA
   * address will be updated to the provided value. This is an optional identifier to
   * route payments to the customer. This is an optional identifier to route payments
   * to the customer.
   */
  umaAddress?: string;
}

/**
 * Enhanced-due-diligence (EDD) fields available as optional patchable attributes
 * on an individual customer. Referenced via `allOf` from
 * `IndividualCustomerFields`, so these appear as top-level optional fields on the
 * customer resource itself; there is no separate EDD resource. The specific set
 * required for a given customer is driven by the KYC provider's per-jurisdiction /
 * per-flow / per-volume-tier rules (surfaced through `MISSING_FIELD` errors on
 * `POST /verifications`).
 */
export interface IndividualCustomerUpdateRequest {
  customerType: 'INDIVIDUAL';

  address?: ExternalAccountsAPI.Address;

  /**
   * Bucketed annual income (USD equivalent). Used for enhanced due diligence on
   * higher-risk profiles.
   */
  annualIncomeRange?: 'UNDER_50K' | 'RANGE_50K_100K' | 'RANGE_100K_250K' | 'RANGE_250K_1M' | 'OVER_1M';

  /**
   * Date of birth in ISO 8601 format (YYYY-MM-DD)
   */
  birthDate?: string;

  /**
   * Updated list of currency codes the customer will use (ISO 4217 for fiat, e.g.
   * "USD", "EUR"; tickers for crypto, e.g. "BTC", "USDC"). Replaces the existing
   * list. Some currency combinations may require separate customers — if so, the
   * request will be rejected with details.
   */
  currencies?: Array<string>;

  /**
   * Email address for the customer. For customers with tied Embedded Wallet internal
   * accounts, changing this value also updates every tied `EMAIL_OTP` credential
   * across all tied Embedded Wallets.
   */
  email?: string;

  /**
   * Expected number of transactions per month
   */
  expectedMonthlyTransactionCount?:
    | 'COUNT_UNDER_10'
    | 'COUNT_10_TO_100'
    | 'COUNT_100_TO_500'
    | 'COUNT_500_TO_1000'
    | 'COUNT_OVER_1000';

  /**
   * Expected total transaction volume per month in USD equivalent
   */
  expectedMonthlyTransactionVolume?:
    | 'VOLUME_UNDER_10K'
    | 'VOLUME_10K_TO_100K'
    | 'VOLUME_100K_TO_1M'
    | 'VOLUME_1M_TO_10M'
    | 'VOLUME_OVER_10M';

  /**
   * Individual's full name
   */
  fullName?: string;

  /**
   * The current KYC status of a customer. `HOLD` means the customer is placed on
   * hold and may be required to update or provide more information.
   */
  kycStatus?: 'UNVERIFIED' | 'PENDING' | 'APPROVED' | 'REJECTED' | 'HOLD';

  /**
   * Country code (ISO 3166-1 alpha-2)
   */
  nationality?: string;

  /**
   * Bucketed total net worth (USD equivalent). Used for enhanced due diligence on
   * higher-risk profiles.
   */
  netWorthRange?:
    | 'UNDER_100K'
    | 'RANGE_100K_500K'
    | 'RANGE_500K_1M'
    | 'RANGE_1M_5M'
    | 'RANGE_5M_25M'
    | 'OVER_25M';

  /**
   * Political exposure declaration (Politically Exposed Person status). `HIO` = head
   * of an international organization. `FAMILY_OR_ASSOCIATE` covers close family
   * members and known close associates of a PEP.
   */
  pepStatus?: 'NONE' | 'DOMESTIC' | 'FOREIGN' | 'HIO' | 'FAMILY_OR_ASSOCIATE';

  /**
   * Phone number for the customer in strict E.164 format. For customers with tied
   * Embedded Wallet internal accounts, changing this value also updates every tied
   * `SMS_OTP` credential across all tied Embedded Wallets. Send phone number and
   * email updates as separate PATCH calls.
   */
  phoneNumber?: string;

  /**
   * The intended purpose for using the Grid account
   */
  purposeOfAccount?:
    | 'CONTRACTOR_PAYOUTS'
    | 'CREATOR_PAYOUTS'
    | 'EMPLOYEE_PAYOUTS'
    | 'MARKETPLACE_SELLER_PAYOUTS'
    | 'SUPPLIER_PAYMENTS'
    | 'CROSS_BORDER_B2B'
    | 'AR_AUTOMATION'
    | 'AP_AUTOMATION'
    | 'EMBEDDED_PAYMENTS'
    | 'PLATFORM_FEE_COLLECTION'
    | 'P2P_TRANSFERS'
    | 'CHARITABLE_DONATIONS'
    | 'OTHER';

  /**
   * Free-form description of the customer's intended purpose for the Grid account.
   * Required when `purposeOfAccount` is `OTHER`; otherwise omitted.
   */
  purposeOfAccountOtherDescription?: string;

  /**
   * Structured source-of-funds categories (FLOW of funds for this account).
   */
  sourceOfFundsCategories?: Array<
    | 'SALARY'
    | 'SELF_EMPLOYMENT_INCOME'
    | 'INVESTMENT_INCOME'
    | 'PENSION'
    | 'RENTAL_INCOME'
    | 'GIFT'
    | 'INHERITANCE'
    | 'LOAN'
    | 'SAVINGS'
    | 'SALE_OF_ASSETS'
    | 'OTHER'
  >;

  /**
   * Free-form description of the customer's source of funds. Required when
   * `sourceOfFundsCategories` includes `OTHER`; otherwise omitted.
   */
  sourceOfFundsOtherDescription?: string;

  /**
   * Structured source-of-wealth categories (STOCK — origin of accumulated wealth).
   */
  sourceOfWealthCategories?: Array<
    | 'SALARY'
    | 'BUSINESS_INCOME'
    | 'INVESTMENTS'
    | 'INHERITANCE'
    | 'PROPERTY_SALE'
    | 'GIFT'
    | 'RETIREMENT'
    | 'SAVINGS'
    | 'OTHER'
  >;

  /**
   * Free-form description of the customer's source of wealth. Required when
   * `sourceOfWealthCategories` includes `OTHER`; otherwise omitted.
   */
  sourceOfWealthOtherDescription?: string;

  /**
   * Country that issued the tax identifier (ISO 3166-1 alpha-2). Required when
   * `taxIdType` is `NON_US_TAX_ID`.
   */
  taxIdCountryOfIssuance?: string;

  /**
   * Tax-identification number. For US persons this is the SSN (format `###-##-####`)
   * or ITIN. For non-US persons this is the tax number issued by
   * `taxIdCountryOfIssuance`.
   */
  taxIdentifier?: string;

  /**
   * Type of tax identification
   */
  taxIdType?: 'SSN' | 'ITIN' | 'EIN' | 'NON_US_TAX_ID';

  /**
   * Optional UMA address identifier. If provided, the customer's UMA address will be
   * updated. This is an optional identifier to route payments to the customer.
   */
  umaAddress?: string;
}

/**
 * Request body for `POST /internal-accounts/{id}/export`. The `clientPublicKey` is
 * required on both steps of the signed-retry flow. On step 1 Grid binds it into
 * `payloadToSign` so the subsequent stamp in `Grid-Wallet-Signature` commits to
 * the target pubkey; on step 2 the client echoes the same `clientPublicKey` back
 * and Grid uses it to encrypt the wallet credentials returned in the `200`
 * response.
 */
export interface InternalAccountExportRequest {
  /**
   * Fresh P-256 public key, uncompressed SEC1 hex — 130 hex chars where the first
   * two are `04` (the uncompressed-point indicator). Generate a new keypair for each
   * export and discard the private key after decrypting the response.
   */
  clientPublicKey: string;
}

export interface InternalAccountExportResponse {
  /**
   * The id of the internal account that was exported.
   */
  id: string;

  /**
   * Encrypted wallet mnemonic, sealed to the `clientPublicKey` from the request body
   * using HPKE: DHKEM(P-256, HKDF-SHA256) + HKDF-SHA256 + AES-256-GCM. Decrypt with
   * the matching private key, then manage the mnemonic securely because it is the
   * master key of the self-custodial Embedded Wallet. The value is a JSON string of
   * the form
   * `{"version": "v1.0.0", "data": "<hex>", "dataSignature": "<hex>", "enclaveQuorumPublic": "<hex>"}`.
   * `data` hex-decodes to JSON
   * `{"encappedPublic": "<hex>", "ciphertext": "<hex>", "organizationId": "<id>"}`,
   * where `encappedPublic` is the uncompressed SEC1 ephemeral public key.
   * `dataSignature` is an ECDSA-P256-SHA256 signature over the `data` bytes produced
   * by the issuer key in `enclaveQuorumPublic`; verify before decrypting. In
   * sandbox, `dataSignature` and `enclaveQuorumPublic` are empty strings. Clients
   * should bypass attestation verification when calling against sandbox.
   */
  encryptedWalletCredentials: string;
}

export interface InternalAccountListResponse {
  /**
   * List of internal accounts matching the filter criteria
   */
  data: Array<InternalAccountsAPI.InternalAccount>;

  /**
   * Indicates if more results are available beyond this page
   */
  hasMore: boolean;

  /**
   * Cursor to retrieve the next page of results (only present if hasMore is true)
   */
  nextCursor?: string;

  /**
   * Total number of customers matching the criteria (excluding pagination)
   */
  totalCount?: number;
}

/**
 * Partial request body for `PATCH /internal-accounts/{id}`. At least one update
 * field must be provided. On step 1 of the signed-retry flow Grid binds the
 * submitted update fields into `payloadToSign`; on step 2 the client echoes the
 * same fields back and Grid applies the update to the internal account.
 */
export interface InternalAccountUpdateRequest {
  /**
   * Whether wallet privacy should be enabled for the Embedded Wallet.
   */
  privateEnabled?: boolean;
}

/**
 * Request body for generating a hosted KYC link for an existing customer.
 */
export interface KYCLinkCreateRequest {
  /**
   * URI the customer is redirected to after completing the hosted KYC flow. Must
   * start with `https://` (or `http://` for local development). Embedded in the
   * returned `kycUrl`.
   */
  redirectUri?: string;
}

/**
 * A hosted KYC link that the customer can complete to verify their identity.
 */
export interface KYCLinkResponse {
  /**
   * Time at which the hosted link expires and can no longer be used.
   */
  expiresAt: string;

  /**
   * Hosted URL the customer should be sent to in order to complete verification. The
   * URL is single-use and expires at `expiresAt`. To generate a new link (for
   * example, after the previous one expires or is abandoned), call this endpoint
   * again.
   */
  kycUrl: string;

  /**
   * The KYC provider that will perform identity verification for the customer. Grid
   * selects the provider based on the customer's region and platform configuration;
   * the value is informational for platforms that want to integrate directly with
   * the provider's SDK.
   */
  provider: 'SUMSUB';

  /**
   * Provider-specific token that can be used in place of the hosted URL — for
   * example, to embed the provider's SDK directly in your application. Only returned
   * for providers that support direct SDK integration. Whether to use the hosted URL
   * or the embedded SDK is up to you; both flows result in the same `kycStatus`
   * update on the customer.
   */
  token?: string;
}

export interface CustomerCreateParams {
  /**
   * Enhanced-due-diligence (EDD) fields available as optional patchable attributes
   * on an individual customer. Referenced via `allOf` from
   * `IndividualCustomerFields`, so these appear as top-level optional fields on the
   * customer resource itself; there is no separate EDD resource. The specific set
   * required for a given customer is driven by the KYC provider's per-jurisdiction /
   * per-flow / per-volume-tier rules (surfaced through `MISSING_FIELD` errors on
   * `POST /verifications`).
   */
  CreateCustomerRequest: CustomerCreateRequestOneOf;
}

export interface CustomerUpdateParams {
  /**
   * Body param: Enhanced-due-diligence (EDD) fields available as optional patchable
   * attributes on an individual customer. Referenced via `allOf` from
   * `IndividualCustomerFields`, so these appear as top-level optional fields on the
   * customer resource itself; there is no separate EDD resource. The specific set
   * required for a given customer is driven by the KYC provider's per-jurisdiction /
   * per-flow / per-volume-tier rules (surfaced through `MISSING_FIELD` errors on
   * `POST /verifications`).
   */
  UpdateCustomerRequest: CustomerUpdateRequestOneOf;

  /**
   * Header param: Full API-key stamp built over the prior `payloadToSign` with the
   * session API keypair of a verified authentication credential on one of the
   * customer's tied Embedded Wallets. Required on the signed retry for Embedded
   * Wallet email or SMS auth phone updates; ignored on the initial call and on
   * customer updates that complete synchronously.
   */
  'Grid-Wallet-Signature'?: string;

  /**
   * Header param: The `requestId` returned in a prior `202` response, echoed back on
   * the signed retry so the server can correlate it with the issued challenge.
   * Required on the signed retry for Embedded Wallet email or SMS auth phone
   * updates; must be paired with `Grid-Wallet-Signature`.
   */
  'Request-Id'?: string;
}

export interface CustomerListParams extends DefaultPaginationParams {
  /**
   * Filter customers created after this timestamp (inclusive)
   */
  createdAfter?: string;

  /**
   * Filter customers created before this timestamp (inclusive)
   */
  createdBefore?: string;

  /**
   * Filter by currency code. Returns customers that have this currency in their
   * enabled currencies list.
   */
  currency?: string;

  /**
   * Filter by customer type
   */
  customerType?: 'INDIVIDUAL' | 'BUSINESS';

  /**
   * Whether to include deleted customers in the results. Default is false.
   */
  isIncludingDeleted?: boolean;

  /**
   * Maximum number of results to return (default 20, max 100)
   */
  limit?: number;

  /**
   * Filter by platform-specific customer identifier
   */
  platformCustomerId?: string;

  /**
   * Filter by customer region (ISO 3166-1 alpha-2 country code)
   */
  region?: string;

  /**
   * Filter by uma address
   */
  umaAddress?: string;

  /**
   * Filter customers updated after this timestamp (inclusive)
   */
  updatedAfter?: string;

  /**
   * Filter customers updated before this timestamp (inclusive)
   */
  updatedBefore?: string;
}

export interface CustomerCreateKYCLinkParams {
  /**
   * Body param: Request body for generating a hosted KYC link for an existing
   * customer.
   */
  KycLinkCreateRequest?: KYCLinkCreateRequest;

  /**
   * Header param: A unique identifier for the request. If the same key is sent
   * multiple times, the server will return the same response as the first request.
   */
  'Idempotency-Key'?: string;
}

export interface CustomerExportParams {
  /**
   * Body param: Fresh P-256 public key, uncompressed SEC1 hex — 130 hex chars where
   * the first two are `04` (the uncompressed-point indicator). Generate a new
   * keypair for each export and discard the private key after decrypting the
   * response.
   */
  clientPublicKey: string;

  /**
   * Header param: Full API-key stamp built over the prior `payloadToSign` with the
   * session API keypair of a verified authentication credential on the target
   * internal account. Required on the signed retry; ignored on the initial call.
   */
  'Grid-Wallet-Signature'?: string;

  /**
   * Header param: The `requestId` returned in a prior `202` response, echoed back
   * exactly on the signed retry so the server can correlate it with the issued
   * challenge. Required on the signed retry; must be paired with
   * `Grid-Wallet-Signature`.
   */
  'Request-Id'?: string;
}

export interface CustomerListInternalAccountsParams extends DefaultPaginationParams {
  /**
   * Filter by currency code
   */
  currency?: string;

  /**
   * Filter by internal accounts associated with a specific customer
   */
  customerId?: string;

  /**
   * Maximum number of results to return (default 20, max 100)
   */
  limit?: number;

  /**
   * Filter by internal account type. Use `EMBEDDED_WALLET` to find the
   * self-custodial wallet provisioned for a customer, or `INTERNAL_FIAT` /
   * `INTERNAL_CRYPTO` for the platform-managed holding accounts.
   */
  type?: 'INTERNAL_FIAT' | 'INTERNAL_CRYPTO' | 'EMBEDDED_WALLET';
}

export interface CustomerUpdateInternalAccountParams {
  /**
   * Body param: Partial request body for `PATCH /internal-accounts/{id}`. At least
   * one update field must be provided. On step 1 of the signed-retry flow Grid binds
   * the submitted update fields into `payloadToSign`; on step 2 the client echoes
   * the same fields back and Grid applies the update to the internal account.
   */
  InternalAccountUpdateRequest: InternalAccountUpdateRequest;

  /**
   * Header param: Full API-key stamp built over the prior `payloadToSign` with the
   * session API keypair of a verified authentication credential on the target
   * internal account. Required on the signed retry; ignored on the initial call.
   */
  'Grid-Wallet-Signature'?: string;

  /**
   * Header param: The `requestId` returned in a prior `202` response, echoed back on
   * the signed retry so the server can correlate it with the issued challenge.
   * Required on the signed retry; must be paired with `Grid-Wallet-Signature`.
   */
  'Request-Id'?: string;
}

Customers.ExternalAccounts = ExternalAccounts;
Customers.Bulk = Bulk;

export declare namespace Customers {
  export {
    type BusinessCustomerCreateRequest as BusinessCustomerCreateRequest,
    type BusinessCustomerUpdateRequest as BusinessCustomerUpdateRequest,
    type Customer as Customer,
    type CustomerCreateRequestOneOf as CustomerCreateRequestOneOf,
    type CustomerListResponse as CustomerListResponse,
    type CustomerOneOf as CustomerOneOf,
    type CustomerUpdateRequestOneOf as CustomerUpdateRequestOneOf,
    type IndividualCustomerCreateRequest as IndividualCustomerCreateRequest,
    type IndividualCustomerUpdateRequest as IndividualCustomerUpdateRequest,
    type InternalAccountExportRequest as InternalAccountExportRequest,
    type InternalAccountExportResponse as InternalAccountExportResponse,
    type InternalAccountListResponse as InternalAccountListResponse,
    type InternalAccountUpdateRequest as InternalAccountUpdateRequest,
    type KYCLinkCreateRequest as KYCLinkCreateRequest,
    type KYCLinkResponse as KYCLinkResponse,
    type CustomerOneovesDefaultPagination as CustomerOneovesDefaultPagination,
    type CustomerCreateParams as CustomerCreateParams,
    type CustomerUpdateParams as CustomerUpdateParams,
    type CustomerListParams as CustomerListParams,
    type CustomerCreateKYCLinkParams as CustomerCreateKYCLinkParams,
    type CustomerExportParams as CustomerExportParams,
    type CustomerListInternalAccountsParams as CustomerListInternalAccountsParams,
    type CustomerUpdateInternalAccountParams as CustomerUpdateInternalAccountParams,
  };

  export {
    ExternalAccounts as ExternalAccounts,
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
  };

  export {
    Bulk as Bulk,
    type BulkGetJobStatusResponse as BulkGetJobStatusResponse,
    type BulkUploadCsvResponse as BulkUploadCsvResponse,
    type BulkUploadCsvParams as BulkUploadCsvParams,
  };
}

export { type InternalAccountsDefaultPagination };
