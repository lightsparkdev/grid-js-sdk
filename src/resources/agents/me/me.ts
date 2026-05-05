// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as QuotesAPI from '../../quotes';
import * as TransferInAPI from '../../transfer-in';
import * as InternalAccountsAPI from '../../sandbox/internal-accounts';
import * as ActionsAPI from './actions';
import {
  ActionListParams,
  ActionListResponse,
  ActionListResponsesDefaultPagination,
  ActionRetrieveResponse,
  Actions,
} from './actions';
import * as ExternalAccountsAPI from './external-accounts';
import {
  ExternalAccountExternalAccountsParams,
  ExternalAccountRetrieveExternalAccountsParams,
  ExternalAccountRetrieveExternalAccountsResponse,
  ExternalAccounts,
} from './external-accounts';
import * as MeQuotesAPI from './quotes';
import { QuoteCreateParams, QuoteExecuteParams, QuoteExecuteResponse, Quotes } from './quotes';
import * as TransactionsAPI from './transactions';
import { TransactionListParams, Transactions } from './transactions';
import { APIPromise } from '../../../core/api-promise';
import { buildHeaders } from '../../../internal/headers';
import { RequestOptions } from '../../../internal/request-options';

/**
 * Endpoints called by the agent itself using its own credentials (obtained via device code redemption). Scoped to the agent's associated customer — all requests automatically operate on behalf of that customer and are subject to the agent's policy. When an action requires approval, the resulting transaction enters a pending state and must be approved by the platform via `POST /transactions/{transactionId}/approve`.
 */
export class Me extends APIResource {
  transactions: TransactionsAPI.Transactions = new TransactionsAPI.Transactions(this._client);
  quotes: MeQuotesAPI.Quotes = new MeQuotesAPI.Quotes(this._client);
  actions: ActionsAPI.Actions = new ActionsAPI.Actions(this._client);
  externalAccounts: ExternalAccountsAPI.ExternalAccounts = new ExternalAccountsAPI.ExternalAccounts(
    this._client,
  );

  /**
   * Retrieve the authenticated agent's own profile, policy, and current usage. This
   * endpoint is called by the agent software itself using its own credentials
   * (obtained via device code redemption) rather than platform credentials.
   *
   * @example
   * ```ts
   * const mes = await client.agents.me.list();
   * ```
   */
  list(options?: RequestOptions): APIPromise<MeListResponse> {
    return this._client.get('/agents/me', options);
  }

  /**
   * Retrieve the internal accounts belonging to the customer this agent operates on
   * behalf of. Use this to discover available source accounts for transfers and
   * quotes, and to verify which accounts are accessible under the agent's
   * `accountRestrictions` policy.
   *
   * @example
   * ```ts
   * const response =
   *   await client.agents.me.retrieveInternalAccounts();
   * ```
   */
  retrieveInternalAccounts(
    query: MeRetrieveInternalAccountsParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<MeRetrieveInternalAccountsResponse> {
    return this._client.get('/agents/me/internal-accounts', { query, ...options });
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
   * const response = await client.agents.me.transferIn({
   *   destination: {
   *     accountId:
   *       'InternalAccount:a12dcbd6-dced-4ec4-b756-3c3a9ea3d123',
   *   },
   *   source: {
   *     accountId:
   *       'ExternalAccount:e85dcbd6-dced-4ec4-b756-3c3a9ea3d965',
   *   },
   *   amount: 12550,
   * });
   * ```
   */
  transferIn(params: MeTransferInParams, options?: RequestOptions): APIPromise<MeTransferInResponse> {
    const { 'Idempotency-Key': idempotencyKey, ...body } = params;
    return this._client.post('/agents/me/transfer-in', {
      body,
      ...options,
      headers: buildHeaders([
        { ...(idempotencyKey != null ? { 'Idempotency-Key': idempotencyKey } : undefined) },
        options?.headers,
      ]),
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
   * const response = await client.agents.me.transferOut({
   *   destination: {
   *     accountId:
   *       'ExternalAccount:e85dcbd6-dced-4ec4-b756-3c3a9ea3d965',
   *   },
   *   source: {
   *     accountId:
   *       'InternalAccount:a12dcbd6-dced-4ec4-b756-3c3a9ea3d123',
   *   },
   *   amount: 12550,
   * });
   * ```
   */
  transferOut(params: MeTransferOutParams, options?: RequestOptions): APIPromise<MeTransferOutResponse> {
    const { 'Idempotency-Key': idempotencyKey, ...body } = params;
    return this._client.post('/agents/me/transfer-out', {
      body,
      ...options,
      headers: buildHeaders([
        { ...(idempotencyKey != null ? { 'Idempotency-Key': idempotencyKey } : undefined) },
        options?.headers,
      ]),
    });
  }
}

/**
 * A programmatic agent with scoped permissions and a spending policy, used to
 * automate payment workflows.
 */
export interface MeListResponse {
  /**
   * System-generated unique identifier for the agent.
   */
  id: string;

  /**
   * Creation timestamp.
   */
  createdAt: string;

  /**
   * The ID of the customer this agent operates on behalf of.
   */
  customerId: string;

  /**
   * Whether the agent has been installed and connected (i.e., its device code has
   * been redeemed).
   */
  isConnected: boolean;

  /**
   * Whether the agent is currently paused. Paused agents cannot initiate any
   * actions.
   */
  isPaused: boolean;

  /**
   * Human-readable name for the agent.
   */
  name: string;

  /**
   * Policy governing what an agent can do, how it executes actions, and its spending
   * boundaries.
   */
  policy: MeListResponse.Policy;

  /**
   * Last update timestamp.
   */
  updatedAt: string;

  /**
   * Real-time counters tracking the agent's spending and transaction activity
   * against its policy limits.
   */
  usage: MeListResponse.Usage;
}

export namespace MeListResponse {
  /**
   * Policy governing what an agent can do, how it executes actions, and its spending
   * boundaries.
   */
  export interface Policy {
    /**
     * Execution mode controlling whether agent actions require human approval. AUTO:
     * The agent can execute actions autonomously without explicit approval.
     * APPROVAL_REQUIRED: All agent actions require explicit human approval before
     * execution.
     */
    defaultExecutionMode: 'AUTO' | 'APPROVAL_REQUIRED';

    /**
     * List of permissions granted to the agent.
     */
    permissions: Array<
      | 'VIEW_TRANSACTIONS'
      | 'CREATE_TRANSFERS'
      | 'CREATE_QUOTES'
      | 'EXECUTE_QUOTES'
      | 'MANAGE_EXTERNAL_ACCOUNTS'
    >;

    /**
     * Spending limits that cap the agent's transaction amounts and frequency. All
     * amount fields are integers in the smallest unit of the specified currency. When
     * a transaction is denominated in a different currency, Grid converts using the
     * exchange rate at evaluation time.
     */
    spendingLimits: Policy.SpendingLimits;

    /**
     * Optional restrictions that limit the agent to specific accounts or override
     * policy per account.
     */
    accountRestrictions?: Policy.AccountRestrictions;

    /**
     * Thresholds that force approval for high-value transactions, overriding the
     * default execution mode. When a transaction is denominated in a different
     * currency than the threshold, Grid converts using the exchange rate at evaluation
     * time.
     */
    approvalThresholds?: Policy.ApprovalThresholds;
  }

  export namespace Policy {
    /**
     * Spending limits that cap the agent's transaction amounts and frequency. All
     * amount fields are integers in the smallest unit of the specified currency. When
     * a transaction is denominated in a different currency, Grid converts using the
     * exchange rate at evaluation time.
     */
    export interface SpendingLimits {
      /**
       * ISO 4217 currency code that all amount limits are denominated in.
       */
      currency: string;

      /**
       * Maximum amount the agent can transfer in a single transaction.
       */
      perTransactionLimit: number;

      /**
       * Maximum total amount the agent can transfer per day. Null means no daily limit.
       */
      dailyLimit?: number | null;

      /**
       * Maximum number of transactions the agent can initiate per day.
       */
      dailyTransactionLimit?: number;

      /**
       * Maximum total amount the agent can transfer per month. Null means no monthly
       * limit.
       */
      monthlyLimit?: number | null;
    }

    /**
     * Optional restrictions that limit the agent to specific accounts or override
     * policy per account.
     */
    export interface AccountRestrictions {
      /**
       * Per-account rules that override the agent's default policy for specific
       * accounts.
       */
      accountRules?: Array<AccountRestrictions.AccountRule>;

      /**
       * If set, restricts the agent to operate only on the specified internal account
       * IDs. Null means the agent can access all accounts.
       */
      allowedAccountIds?: Array<string> | null;
    }

    export namespace AccountRestrictions {
      /**
       * Per-account policy override that takes precedence over the agent's default
       * policy for a specific account.
       */
      export interface AccountRule {
        /**
         * The internal account ID this rule applies to.
         */
        accountId: string;

        /**
         * Execution mode controlling whether agent actions require human approval. AUTO:
         * The agent can execute actions autonomously without explicit approval.
         * APPROVAL_REQUIRED: All agent actions require explicit human approval before
         * execution.
         */
        executionMode?: 'AUTO' | 'APPROVAL_REQUIRED';

        /**
         * Per-transaction limit override, in the smallest unit of the relevant currency.
         * Null inherits from the agent's spending limits.
         */
        perTransactionLimit?: number | null;
      }
    }

    /**
     * Thresholds that force approval for high-value transactions, overriding the
     * default execution mode. When a transaction is denominated in a different
     * currency than the threshold, Grid converts using the exchange rate at evaluation
     * time.
     */
    export interface ApprovalThresholds {
      /**
       * If set, any transaction above this amount (in the smallest unit of the specified
       * currency) will require explicit approval even when the agent's
       * defaultExecutionMode is AUTO. Null means no threshold override.
       */
      amount?: number | null;

      /**
       * ISO 4217 currency code that the amount threshold is denominated in. Required
       * when amount is set.
       */
      currency?: string;
    }
  }

  /**
   * Real-time counters tracking the agent's spending and transaction activity
   * against its policy limits.
   */
  export interface Usage {
    /**
     * Total amount spent by the agent today, in the smallest unit of the policy's
     * `spendingLimits.currency`.
     */
    dailySpend: number;

    /**
     * Number of transactions initiated by the agent today.
     */
    dailyTransactionCount: number;

    /**
     * Total amount spent by the agent this month, in the smallest unit of the policy's
     * `spendingLimits.currency`.
     */
    monthlySpend: number;

    /**
     * The date when daily usage counters will reset.
     */
    dailyResetDate?: string;

    /**
     * The year-month (YYYY-MM) when monthly usage counters will reset.
     */
    monthlyResetMonth?: string;
  }
}

export interface MeRetrieveInternalAccountsResponse {
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
 * An action submitted by an agent that may require platform approval before
 * execution. All agent-initiated operations (quote execution, transfers) are
 * represented as AgentActions, giving the platform a consistent object to approve,
 * reject, and audit regardless of the underlying operation type.
 */
export interface MeTransferInResponse {
  /**
   * System-generated unique identifier for this action.
   */
  id: string;

  /**
   * The agent that submitted this action.
   */
  agentId: string;

  /**
   * When the action was submitted by the agent.
   */
  createdAt: string;

  /**
   * The customer on whose behalf the action was submitted.
   */
  customerId: string;

  /**
   * Platform-specific ID of the customer.
   */
  platformCustomerId: string;

  /**
   * Status of an agent action.
   *
   * | Status             | Description                                                            |
   * | ------------------ | ---------------------------------------------------------------------- |
   * | `PENDING_APPROVAL` | Submitted by the agent, awaiting platform approval before execution    |
   * | `APPROVED`         | Approved by the platform; execution is in progress or completed        |
   * | `REJECTED`         | Rejected by the platform; the underlying transaction was not executed  |
   * | `FAILED`           | Approved but execution failed (e.g. quote expired, insufficient funds) |
   */
  status: 'PENDING_APPROVAL' | 'APPROVED' | 'REJECTED' | 'FAILED';

  /**
   * The type of action the agent is requesting.
   *
   * | Type            | Description                                              |
   * | --------------- | -------------------------------------------------------- |
   * | `EXECUTE_QUOTE` | Execute a cross-currency quote                           |
   * | `TRANSFER_OUT`  | Transfer from an internal account to an external account |
   * | `TRANSFER_IN`   | Transfer from an external account to an internal account |
   */
  type: 'EXECUTE_QUOTE' | 'TRANSFER_OUT' | 'TRANSFER_IN';

  /**
   * When the action was last updated.
   */
  updatedAt: string;

  /**
   * The quote being executed. Populated for `EXECUTE_QUOTE` actions; absent for
   * transfer actions. Contains the full amount, currency, destination, and rate
   * details needed to present an approval decision to the user.
   */
  quote?: QuotesAPI.Quote;

  /**
   * Human-readable reason provided by the platform when rejecting the action. Only
   * present when status is `REJECTED`.
   */
  rejectionReason?: string;

  /**
   * The resulting transaction, populated once the action has been approved and
   * execution has begun. Absent while the action is `PENDING_APPROVAL` or
   * `REJECTED`.
   */
  transaction?: TransferInAPI.Transaction;

  /**
   * Details of a transfer-type agent action (TRANSFER_OUT or TRANSFER_IN).
   */
  transferDetails?: MeTransferInResponse.TransferDetails;
}

export namespace MeTransferInResponse {
  /**
   * Details of a transfer-type agent action (TRANSFER_OUT or TRANSFER_IN).
   */
  export interface TransferDetails {
    /**
     * Transfer amount in the smallest unit of the specified currency.
     */
    amount: number;

    /**
     * ISO 4217 currency code for the transfer amount.
     */
    currency: string;

    /**
     * ID of the destination account (internal or external).
     */
    destinationAccountId: string;

    /**
     * ID of the source account (internal or external).
     */
    sourceAccountId: string;
  }
}

/**
 * An action submitted by an agent that may require platform approval before
 * execution. All agent-initiated operations (quote execution, transfers) are
 * represented as AgentActions, giving the platform a consistent object to approve,
 * reject, and audit regardless of the underlying operation type.
 */
export interface MeTransferOutResponse {
  /**
   * System-generated unique identifier for this action.
   */
  id: string;

  /**
   * The agent that submitted this action.
   */
  agentId: string;

  /**
   * When the action was submitted by the agent.
   */
  createdAt: string;

  /**
   * The customer on whose behalf the action was submitted.
   */
  customerId: string;

  /**
   * Platform-specific ID of the customer.
   */
  platformCustomerId: string;

  /**
   * Status of an agent action.
   *
   * | Status             | Description                                                            |
   * | ------------------ | ---------------------------------------------------------------------- |
   * | `PENDING_APPROVAL` | Submitted by the agent, awaiting platform approval before execution    |
   * | `APPROVED`         | Approved by the platform; execution is in progress or completed        |
   * | `REJECTED`         | Rejected by the platform; the underlying transaction was not executed  |
   * | `FAILED`           | Approved but execution failed (e.g. quote expired, insufficient funds) |
   */
  status: 'PENDING_APPROVAL' | 'APPROVED' | 'REJECTED' | 'FAILED';

  /**
   * The type of action the agent is requesting.
   *
   * | Type            | Description                                              |
   * | --------------- | -------------------------------------------------------- |
   * | `EXECUTE_QUOTE` | Execute a cross-currency quote                           |
   * | `TRANSFER_OUT`  | Transfer from an internal account to an external account |
   * | `TRANSFER_IN`   | Transfer from an external account to an internal account |
   */
  type: 'EXECUTE_QUOTE' | 'TRANSFER_OUT' | 'TRANSFER_IN';

  /**
   * When the action was last updated.
   */
  updatedAt: string;

  /**
   * The quote being executed. Populated for `EXECUTE_QUOTE` actions; absent for
   * transfer actions. Contains the full amount, currency, destination, and rate
   * details needed to present an approval decision to the user.
   */
  quote?: QuotesAPI.Quote;

  /**
   * Human-readable reason provided by the platform when rejecting the action. Only
   * present when status is `REJECTED`.
   */
  rejectionReason?: string;

  /**
   * The resulting transaction, populated once the action has been approved and
   * execution has begun. Absent while the action is `PENDING_APPROVAL` or
   * `REJECTED`.
   */
  transaction?: TransferInAPI.Transaction;

  /**
   * Details of a transfer-type agent action (TRANSFER_OUT or TRANSFER_IN).
   */
  transferDetails?: MeTransferOutResponse.TransferDetails;
}

export namespace MeTransferOutResponse {
  /**
   * Details of a transfer-type agent action (TRANSFER_OUT or TRANSFER_IN).
   */
  export interface TransferDetails {
    /**
     * Transfer amount in the smallest unit of the specified currency.
     */
    amount: number;

    /**
     * ISO 4217 currency code for the transfer amount.
     */
    currency: string;

    /**
     * ID of the destination account (internal or external).
     */
    destinationAccountId: string;

    /**
     * ID of the source account (internal or external).
     */
    sourceAccountId: string;
  }
}

export interface MeRetrieveInternalAccountsParams {
  /**
   * Filter by currency code
   */
  currency?: string;

  /**
   * Cursor for pagination (returned from previous request)
   */
  cursor?: string;

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

export interface MeTransferInParams {
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

export interface MeTransferOutParams {
  /**
   * Body param: Destination external account details
   */
  destination: TransferInAPI.ExternalAccountReference;

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

Me.Transactions = Transactions;
Me.Quotes = Quotes;
Me.Actions = Actions;
Me.ExternalAccounts = ExternalAccounts;

export declare namespace Me {
  export {
    type MeListResponse as MeListResponse,
    type MeRetrieveInternalAccountsResponse as MeRetrieveInternalAccountsResponse,
    type MeTransferInResponse as MeTransferInResponse,
    type MeTransferOutResponse as MeTransferOutResponse,
    type MeRetrieveInternalAccountsParams as MeRetrieveInternalAccountsParams,
    type MeTransferInParams as MeTransferInParams,
    type MeTransferOutParams as MeTransferOutParams,
  };

  export { Transactions as Transactions, type TransactionListParams as TransactionListParams };

  export {
    Quotes as Quotes,
    type QuoteExecuteResponse as QuoteExecuteResponse,
    type QuoteCreateParams as QuoteCreateParams,
    type QuoteExecuteParams as QuoteExecuteParams,
  };

  export {
    Actions as Actions,
    type ActionRetrieveResponse as ActionRetrieveResponse,
    type ActionListResponse as ActionListResponse,
    type ActionListResponsesDefaultPagination as ActionListResponsesDefaultPagination,
    type ActionListParams as ActionListParams,
  };

  export {
    ExternalAccounts as ExternalAccounts,
    type ExternalAccountRetrieveExternalAccountsResponse as ExternalAccountRetrieveExternalAccountsResponse,
    type ExternalAccountExternalAccountsParams as ExternalAccountExternalAccountsParams,
    type ExternalAccountRetrieveExternalAccountsParams as ExternalAccountRetrieveExternalAccountsParams,
  };
}
