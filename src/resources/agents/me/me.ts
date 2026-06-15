// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as TransferInAPI from '../../transfer-in';
import * as AgentsAPI from '../agents';
import * as InternalAccountsAPI from '../../sandbox/internal-accounts';
import { InternalAccountsDefaultPagination } from '../../sandbox/internal-accounts';
import * as ActionsAPI from './actions';
import { ActionListParams, Actions } from './actions';
import * as ExternalAccountsAPI from './external-accounts';
import { ExternalAccountAddParams, ExternalAccountListParams, ExternalAccounts } from './external-accounts';
import * as QuotesAPI from './quotes';
import { QuoteCreateParams, QuoteExecuteParams, Quotes } from './quotes';
import * as TransactionsAPI from './transactions';
import { TransactionListParams, Transactions } from './transactions';
import { APIPromise } from '../../../core/api-promise';
import { DefaultPagination, type DefaultPaginationParams, PagePromise } from '../../../core/pagination';
import { buildHeaders } from '../../../internal/headers';
import { RequestOptions } from '../../../internal/request-options';

/**
 * Endpoints called by the agent itself using its own credentials (obtained via device code redemption). Scoped to the agent's associated customer — all requests automatically operate on behalf of that customer and are subject to the agent's policy. When an action requires approval, the resulting transaction enters a pending state and must be approved by the platform via `POST /transactions/{transactionId}/approve`.
 */
export class Me extends APIResource {
  transactions: TransactionsAPI.Transactions = new TransactionsAPI.Transactions(this._client);
  quotes: QuotesAPI.Quotes = new QuotesAPI.Quotes(this._client);
  externalAccounts: ExternalAccountsAPI.ExternalAccounts = new ExternalAccountsAPI.ExternalAccounts(
    this._client,
  );
  actions: ActionsAPI.Actions = new ActionsAPI.Actions(this._client);

  /**
   * Retrieve the authenticated agent's own profile, policy, and current usage. This
   * endpoint is called by the agent software itself using its own credentials
   * (obtained via device code redemption) rather than platform credentials.
   *
   * @example
   * ```ts
   * const agent = await client.agents.me.retrieve();
   * ```
   */
  retrieve(options?: RequestOptions): APIPromise<AgentsAPI.Agent> {
    return this._client.get('/agents/me', { ...options, __security: { agentAuth: true } });
  }

  /**
   * Transfer funds from an external account to an internal account for the
   * authenticated agent's customer. Accounts must belong to the agent's customer.
   * Requires the CREATE_TRANSFERS permission in the agent's policy. If the agent's
   * policy requires approval for this amount, the transaction will be created in a
   * pending state and must be approved by the platform via
   * `POST /agents/{agentId}/actions/{actionId}/approve`. This endpoint should only
   * be used for external account sources with pull functionality (e.g. ACH Pull).
   * Otherwise, use the payment instructions on the internal account to deposit
   * funds.
   *
   * @example
   * ```ts
   * const agentAction = await client.agents.me.createTransferIn(
   *   {
   *     destination: {
   *       accountId:
   *         'InternalAccount:a12dcbd6-dced-4ec4-b756-3c3a9ea3d123',
   *     },
   *     source: {
   *       accountId:
   *         'ExternalAccount:e85dcbd6-dced-4ec4-b756-3c3a9ea3d965',
   *     },
   *     amount: 12550,
   *   },
   * );
   * ```
   */
  createTransferIn(
    params: MeCreateTransferInParams,
    options?: RequestOptions,
  ): APIPromise<AgentsAPI.AgentAction> {
    const { 'Idempotency-Key': idempotencyKey, ...body } = params;
    return this._client.post('/agents/me/transfer-in', {
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
   * Transfer funds from an internal account to an external account for the
   * authenticated agent's customer. Accounts must belong to the agent's customer.
   * Requires the CREATE_TRANSFERS permission in the agent's policy. If the agent's
   * policy requires approval for this amount, the transaction will be created in a
   * pending state and must be approved by the platform via
   * `POST /agents/{agentId}/actions/{actionId}/approve`.
   *
   * @example
   * ```ts
   * const agentAction =
   *   await client.agents.me.createTransferOut({
   *     destination: {
   *       accountId:
   *         'ExternalAccount:e85dcbd6-dced-4ec4-b756-3c3a9ea3d965',
   *     },
   *     source: {
   *       accountId:
   *         'InternalAccount:a12dcbd6-dced-4ec4-b756-3c3a9ea3d123',
   *     },
   *     amount: 12550,
   *   });
   * ```
   */
  createTransferOut(
    params: MeCreateTransferOutParams,
    options?: RequestOptions,
  ): APIPromise<AgentsAPI.AgentAction> {
    const { 'Idempotency-Key': idempotencyKey, ...body } = params;
    return this._client.post('/agents/me/transfer-out', {
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
   * Retrieve the internal accounts belonging to the customer this agent operates on
   * behalf of. Use this to discover available source accounts for transfers and
   * quotes, and to verify which accounts are accessible under the agent's
   * `accountRestrictions` policy.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const internalAccount of client.agents.me.listInternalAccounts()) {
   *   // ...
   * }
   * ```
   */
  listInternalAccounts(
    query: MeListInternalAccountsParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<InternalAccountsDefaultPagination, InternalAccountsAPI.InternalAccount> {
    return this._client.getAPIList(
      '/agents/me/internal-accounts',
      DefaultPagination<InternalAccountsAPI.InternalAccount>,
      { query, ...options, __security: { agentAuth: true } },
    );
  }
}

export interface MeCreateTransferInParams {
  /**
   * Body param: Destination internal account details
   */
  destination: TransferInAPI.InternalAccountReference;

  /**
   * Body param: Source external account details
   */
  source: TransferInAPI.ExternalAccountReference;

  /**
   * Body param: Amount in the smallest unit of the currency (e.g., cents for
   * USD/EUR, satoshis for BTC)
   */
  amount?: number;

  /**
   * Header param: A unique identifier for the request. If the same key is sent
   * multiple times, the server will return the same response as the first request.
   */
  'Idempotency-Key'?: string;
}

export interface MeCreateTransferOutParams {
  /**
   * Body param: Destination external account details
   */
  destination: MeCreateTransferOutParams.Destination;

  /**
   * Body param: Source internal account details
   */
  source: TransferInAPI.InternalAccountReference;

  /**
   * Body param: Amount in the smallest unit of the currency (e.g., cents for
   * USD/EUR, satoshis for BTC)
   */
  amount?: number;

  /**
   * Header param: A unique identifier for the request. If the same key is sent
   * multiple times, the server will return the same response as the first request.
   */
  'Idempotency-Key'?: string;
}

export namespace MeCreateTransferOutParams {
  /**
   * Destination external account details
   */
  export interface Destination {
    /**
     * Reference to an external account ID
     */
    accountId: string;

    /**
     * The payment rail to use for the transfer. Must be one of the rails supported by
     * the destination account. If not specified, the system will select a default
     * rail.
     */
    paymentRail?:
      | 'ACH'
      | 'ACH_COLOMBIA'
      | 'BANK_TRANSFER'
      | 'BRE_B'
      | 'CIPS'
      | 'FAST'
      | 'FASTER_PAYMENTS'
      | 'FEDNOW'
      | 'INSTAPAY'
      | 'MOBILE_MONEY'
      | 'NEFT'
      | 'PAYNOW'
      | 'PESONET'
      | 'PIX'
      | 'RTGS'
      | 'RTP'
      | 'SEPA'
      | 'SEPA_INSTANT'
      | 'SPEI'
      | 'SWIFT'
      | 'UNIONPAY'
      | 'UPI'
      | 'WIRE';
  }
}

export interface MeListInternalAccountsParams extends DefaultPaginationParams {
  /**
   * Filter by currency code
   */
  currency?: string;

  /**
   * Maximum number of results to return (default 20, max 100)
   */
  limit?: number;

  /**
   * Filter by internal account type. Use `EMBEDDED_WALLET` to find the
   * self-custodial wallet provisioned for the customer, or `INTERNAL_FIAT` /
   * `INTERNAL_CRYPTO` for platform-managed holding accounts.
   */
  type?: 'INTERNAL_FIAT' | 'INTERNAL_CRYPTO' | 'EMBEDDED_WALLET';
}

Me.Transactions = Transactions;
Me.Quotes = Quotes;
Me.ExternalAccounts = ExternalAccounts;
Me.Actions = Actions;

export declare namespace Me {
  export {
    type MeCreateTransferInParams as MeCreateTransferInParams,
    type MeCreateTransferOutParams as MeCreateTransferOutParams,
    type MeListInternalAccountsParams as MeListInternalAccountsParams,
  };

  export { Transactions as Transactions, type TransactionListParams as TransactionListParams };

  export {
    Quotes as Quotes,
    type QuoteCreateParams as QuoteCreateParams,
    type QuoteExecuteParams as QuoteExecuteParams,
  };

  export {
    ExternalAccounts as ExternalAccounts,
    type ExternalAccountListParams as ExternalAccountListParams,
    type ExternalAccountAddParams as ExternalAccountAddParams,
  };

  export { Actions as Actions, type ActionListParams as ActionListParams };
}

export { type InternalAccountsDefaultPagination };
