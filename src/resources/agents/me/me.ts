// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
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
   * self-custodial wallet provisioned for the customer, `INTERNAL_FIAT` /
   * `INTERNAL_CRYPTO` for platform-managed holding accounts, or `RULE_BASED` for the
   * additional account numbers issued with a sweep rule.
   */
  type?: 'INTERNAL_FIAT' | 'INTERNAL_CRYPTO' | 'EMBEDDED_WALLET' | 'RULE_BASED';
}

Me.Transactions = Transactions;
Me.Quotes = Quotes;
Me.ExternalAccounts = ExternalAccounts;
Me.Actions = Actions;

export declare namespace Me {
  export { type MeListInternalAccountsParams as MeListInternalAccountsParams };

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
