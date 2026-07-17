// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as QuotesAPI from '../../quotes';
import * as AgentsAPI from '../agents';
import { APIPromise } from '../../../core/api-promise';
import { buildHeaders } from '../../../internal/headers';
import { RequestOptions } from '../../../internal/request-options';
import { path } from '../../../internal/utils/path';

/**
 * Endpoints called by the agent itself using its own credentials (obtained via device code redemption). Scoped to the agent's associated customer — all requests automatically operate on behalf of that customer and are subject to the agent's policy. When an action requires approval, the resulting transaction enters a pending state and must be approved by the platform via `POST /transactions/{transactionId}/approve`.
 */
export class Quotes extends APIResource {
  /**
   * Generate a quote for a cross-currency transfer on behalf of the authenticated
   * agent's customer. Accounts referenced in the request must belong to the agent's
   * customer. Requires the CREATE_QUOTES permission in the agent's policy. If the
   * agent's defaultExecutionMode is APPROVAL_REQUIRED, or the quote amount exceeds
   * the agent's approvalThresholds, the resulting transaction will require explicit
   * approval before funds move.
   *
   * @example
   * ```ts
   * const quote = await client.agents.me.quotes.create({
   *   destination: {},
   *   lockedCurrencyAmount: 1000,
   *   lockedCurrencySide: 'SENDING',
   *   source: {},
   * });
   * ```
   */
  create(params: QuoteCreateParams, options?: RequestOptions): APIPromise<QuotesAPI.Quote> {
    const { 'Idempotency-Key': idempotencyKey, ...body } = params;
    return this._client.post('/agents/me/quotes', {
      body,
      ...options,
      headers: buildHeaders([
        { ...(idempotencyKey != null ? { 'Idempotency-Key': idempotencyKey } : undefined) },
        options?.headers,
      ]),
      __security: { agentAuth: true },
    });
  }

  /**
   * Retrieve a quote created by the authenticated agent. Returns 404 if the quote
   * exists but was not created by this agent.
   *
   * @example
   * ```ts
   * const quote = await client.agents.me.quotes.retrieve(
   *   'quoteId',
   * );
   * ```
   */
  retrieve(quoteID: string, options?: RequestOptions): APIPromise<QuotesAPI.Quote> {
    return this._client.get(path`/agents/me/quotes/${quoteID}`, {
      ...options,
      __security: { agentAuth: true },
    });
  }

  /**
   * Execute a quote created by the authenticated agent. Requires the EXECUTE_QUOTES
   * permission in the agent's policy. If the agent's policy requires approval for
   * this amount (based on execution mode or approval thresholds), the transaction
   * will be created in a pending state and must be approved by the platform via
   * `POST /agents/{agentId}/actions/{actionId}/approve`. Once executed, the quote
   * cannot be cancelled.
   *
   * @example
   * ```ts
   * const agentAction = await client.agents.me.quotes.execute(
   *   'Quote:019542f5-b3e7-1d02-0000-000000000001',
   * );
   * ```
   */
  execute(
    quoteID: string,
    params: QuoteExecuteParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<AgentsAPI.AgentAction> {
    const { 'Grid-Wallet-Signature': gridWalletSignature, 'Idempotency-Key': idempotencyKey } = params ?? {};
    return this._client.post(path`/agents/me/quotes/${quoteID}/execute`, {
      ...options,
      headers: buildHeaders([
        {
          ...(gridWalletSignature != null ? { 'Grid-Wallet-Signature': gridWalletSignature } : undefined),
          ...(idempotencyKey != null ? { 'Idempotency-Key': idempotencyKey } : undefined),
        },
        options?.headers,
      ]),
      __security: { agentAuth: true },
    });
  }
}

export interface QuoteCreateParams {
  /**
   * Body param
   */
  destination: QuotesAPI.QuoteDestinationOneOf;

  /**
   * Body param: The amount to send/receive in the smallest unit of the locked
   * currency (eg. cents). See `lockedCurrencySide` for more information.
   */
  lockedCurrencyAmount: number;

  /**
   * Body param: The side of the quote which should be locked and specified in the
   * `lockedCurrencyAmount`. For example, if I want to send exactly $5 MXN from my
   * wallet, I would set this to "sending", and the `lockedCurrencyAmount` to 500 (in
   * cents). If I want the receiver to receive exactly $10 USD, I would set this to
   * "receiving" and the `lockedCurrencyAmount` to 10000 (in cents).
   */
  lockedCurrencySide: 'SENDING' | 'RECEIVING';

  /**
   * Body param
   */
  source: QuotesAPI.QuoteSourceOneOf;

  /**
   * Body param: Optional description/memo for the transfer
   */
  description?: string;

  /**
   * Body param: Whether to immediately execute the quote after creation. If true,
   * the quote will be executed and the transaction will be created at the current
   * exchange rate. It should only be used if you don't want to lock and view rate
   * details before executing the quote. If you are executing a pre-existing quote,
   * use the `/quotes/{quoteId}/execute` endpoint instead. This is false by default.
   * This can only be used for quotes with a `source` which is either an internal
   * account, or has direct pull functionality (e.g. ACH pull with an external
   * account). Not supported when the `source` is an internal account of type
   * `EMBEDDED_WALLET`: those transfers require a `Grid-Wallet-Signature` over the
   * `payloadToSign` returned in the quote response, which is not available in a
   * combined create-and-execute call. Create the quote first with
   * `immediatelyExecute: false` and then call `POST /quotes/{quoteId}/execute` with
   * the `Grid-Wallet-Signature` stamp header.
   */
  immediatelyExecute?: boolean;

  /**
   * Body param: Lookup ID from a previous receiver lookup request. If provided, this
   * can make the quote creation more efficient by reusing cached lookup data. NOTE:
   * This is required for UMA destinations due to counterparty institution
   * requirements. See `senderCustomerInfo` for more information.
   */
  lookupId?: string;

  /**
   * Body param: The purpose of the payment. This may be required when sending to
   * certain geographies (e.g. India).
   */
  purposeOfPayment?:
    | 'GIFT'
    | 'SELF'
    | 'GOODS_OR_SERVICES'
    | 'EDUCATION'
    | 'HEALTH_OR_MEDICAL'
    | 'REAL_ESTATE_PURCHASE'
    | 'TAX_PAYMENT'
    | 'LOAN_PAYMENT'
    | 'UTILITY_BILL'
    | 'DONATION'
    | 'TRAVEL'
    | 'FAMILY_SUPPORT'
    | 'SALARY_PAYMENT'
    | 'OTHER';

  /**
   * Body param: Free-form information about the payment that travels with it to the
   * recipient. The field this populates depends on the payment rail: for ACH it
   * populates the Addenda record, for FedNow and RTP it populates the
   * remittanceInformation field, and for wires it populates the OBI (Originator to
   * Beneficiary Information) / beneficiary information.
   */
  remittanceInformation?: string;

  /**
   * Body param: Optional preferred factor for a Strong Customer Authentication
   * challenge issued at quote creation. Only relevant for a realtime-funding source
   * in a region where SCA is required (e.g. EU); ignored otherwise. Valid values are
   * `SMS_OTP` (default) and `PASSKEY` — `TOTP` cannot carry the required dynamic
   * linking and is rejected. When the quote is returned in `PENDING_AUTHORIZATION`,
   * authorize it via `POST /quotes/{quoteId}/authorize`.
   */
  scaFactor?: 'SMS_OTP' | 'TOTP' | 'PASSKEY';

  /**
   * Body param: Key-value pairs of additional information about the sender which was
   * requested by the destination. This is relevant when the destination requires
   * more sender info than was provided during customer creation. Any fields
   * specified in `requiredPayerDataFields` from the response of the
   * `/receiver/uma/{receiverUmaAddress}` (lookupUma) or
   * `/receiver/external-account/{accountId}` (lookupExternalAccount) endpoints MUST
   * be provided here if they were requested. If the destination did not request any
   * additional information, this field can be omitted.
   */
  senderCustomerInfo?: { [key: string]: unknown };

  /**
   * Header param: A unique identifier for the request. If the same key is sent
   * multiple times, the server will return the same response as the first request.
   */
  'Idempotency-Key'?: string;
}

export interface QuoteExecuteParams {
  /**
   * Full Grid wallet signature over the `payloadToSign` returned in the quote's
   * `paymentInstructions[].accountOrWalletInfo` entry, produced with the session
   * private key of a verified authentication credential on the source Embedded
   * Wallet. Required when the quote's source is an internal account of type
   * `EMBEDDED_WALLET`; ignored for other source types.
   */
  'Grid-Wallet-Signature'?: string;

  /**
   * A unique identifier for the request. If the same key is sent multiple times, the
   * server will return the same response as the first request.
   */
  'Idempotency-Key'?: string;
}

export declare namespace Quotes {
  export { type QuoteCreateParams as QuoteCreateParams, type QuoteExecuteParams as QuoteExecuteParams };
}
