// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { McpOptions } from './options';

export type SdkMethod = {
  clientCallName: string;
  fullyQualifiedName: string;
  httpMethod?: 'get' | 'post' | 'put' | 'patch' | 'delete' | 'query';
  httpPath?: string;
};

export const sdkMethods: SdkMethod[] = [
  {
    clientCallName: 'client.config.retrieve',
    fullyQualifiedName: 'config.retrieve',
    httpMethod: 'get',
    httpPath: '/config',
  },
  {
    clientCallName: 'client.config.update',
    fullyQualifiedName: 'config.update',
    httpMethod: 'patch',
    httpPath: '/config',
  },
  {
    clientCallName: 'client.customers.create',
    fullyQualifiedName: 'customers.create',
    httpMethod: 'post',
    httpPath: '/customers',
  },
  {
    clientCallName: 'client.customers.retrieve',
    fullyQualifiedName: 'customers.retrieve',
    httpMethod: 'get',
    httpPath: '/customers/{customerId}',
  },
  {
    clientCallName: 'client.customers.update',
    fullyQualifiedName: 'customers.update',
    httpMethod: 'patch',
    httpPath: '/customers/{customerId}',
  },
  {
    clientCallName: 'client.customers.list',
    fullyQualifiedName: 'customers.list',
    httpMethod: 'get',
    httpPath: '/customers',
  },
  {
    clientCallName: 'client.customers.delete',
    fullyQualifiedName: 'customers.delete',
    httpMethod: 'delete',
    httpPath: '/customers/{customerId}',
  },
  {
    clientCallName: 'client.customers.getKYCLink',
    fullyQualifiedName: 'customers.getKYCLink',
    httpMethod: 'get',
    httpPath: '/customers/kyc-link',
  },
  {
    clientCallName: 'client.customers.listInternalAccounts',
    fullyQualifiedName: 'customers.listInternalAccounts',
    httpMethod: 'get',
    httpPath: '/customers/internal-accounts',
  },
  {
    clientCallName: 'client.customers.externalAccounts.create',
    fullyQualifiedName: 'customers.externalAccounts.create',
    httpMethod: 'post',
    httpPath: '/customers/external-accounts',
  },
  {
    clientCallName: 'client.customers.externalAccounts.list',
    fullyQualifiedName: 'customers.externalAccounts.list',
    httpMethod: 'get',
    httpPath: '/customers/external-accounts',
  },
  {
    clientCallName: 'client.customers.bulk.getJobStatus',
    fullyQualifiedName: 'customers.bulk.getJobStatus',
    httpMethod: 'get',
    httpPath: '/customers/bulk/jobs/{jobId}',
  },
  {
    clientCallName: 'client.customers.bulk.uploadCsv',
    fullyQualifiedName: 'customers.bulk.uploadCsv',
    httpMethod: 'post',
    httpPath: '/customers/bulk/csv',
  },
  {
    clientCallName: 'client.platform.listInternalAccounts',
    fullyQualifiedName: 'platform.listInternalAccounts',
    httpMethod: 'get',
    httpPath: '/platform/internal-accounts',
  },
  {
    clientCallName: 'client.platform.externalAccounts.create',
    fullyQualifiedName: 'platform.externalAccounts.create',
    httpMethod: 'post',
    httpPath: '/platform/external-accounts',
  },
  {
    clientCallName: 'client.platform.externalAccounts.list',
    fullyQualifiedName: 'platform.externalAccounts.list',
    httpMethod: 'get',
    httpPath: '/platform/external-accounts',
  },
  {
    clientCallName: 'client.plaid.createLinkToken',
    fullyQualifiedName: 'plaid.createLinkToken',
    httpMethod: 'post',
    httpPath: '/plaid/link-tokens',
  },
  {
    clientCallName: 'client.plaid.submitPublicToken',
    fullyQualifiedName: 'plaid.submitPublicToken',
    httpMethod: 'post',
    httpPath: '/plaid/callback/{plaid_link_token}',
  },
  {
    clientCallName: 'client.transferIn.create',
    fullyQualifiedName: 'transferIn.create',
    httpMethod: 'post',
    httpPath: '/transfer-in',
  },
  {
    clientCallName: 'client.transferOut.create',
    fullyQualifiedName: 'transferOut.create',
    httpMethod: 'post',
    httpPath: '/transfer-out',
  },
  {
    clientCallName: 'client.receiver.lookupExternalAccount',
    fullyQualifiedName: 'receiver.lookupExternalAccount',
    httpMethod: 'get',
    httpPath: '/receiver/external-account/{accountId}',
  },
  {
    clientCallName: 'client.receiver.lookupUma',
    fullyQualifiedName: 'receiver.lookupUma',
    httpMethod: 'get',
    httpPath: '/receiver/uma/{receiverUmaAddress}',
  },
  {
    clientCallName: 'client.quotes.create',
    fullyQualifiedName: 'quotes.create',
    httpMethod: 'post',
    httpPath: '/quotes',
  },
  {
    clientCallName: 'client.quotes.retrieve',
    fullyQualifiedName: 'quotes.retrieve',
    httpMethod: 'get',
    httpPath: '/quotes/{quoteId}',
  },
  {
    clientCallName: 'client.quotes.list',
    fullyQualifiedName: 'quotes.list',
    httpMethod: 'get',
    httpPath: '/quotes',
  },
  {
    clientCallName: 'client.quotes.execute',
    fullyQualifiedName: 'quotes.execute',
    httpMethod: 'post',
    httpPath: '/quotes/{quoteId}/execute',
  },
  {
    clientCallName: 'client.transactions.retrieve',
    fullyQualifiedName: 'transactions.retrieve',
    httpMethod: 'get',
    httpPath: '/transactions/{transactionId}',
  },
  {
    clientCallName: 'client.transactions.list',
    fullyQualifiedName: 'transactions.list',
    httpMethod: 'get',
    httpPath: '/transactions',
  },
  {
    clientCallName: 'client.transactions.approve',
    fullyQualifiedName: 'transactions.approve',
    httpMethod: 'post',
    httpPath: '/transactions/{transactionId}/approve',
  },
  {
    clientCallName: 'client.transactions.reject',
    fullyQualifiedName: 'transactions.reject',
    httpMethod: 'post',
    httpPath: '/transactions/{transactionId}/reject',
  },
  { clientCallName: 'client.webhooks.unwrap', fullyQualifiedName: 'webhooks.unwrap' },
  {
    clientCallName: 'client.invitations.create',
    fullyQualifiedName: 'invitations.create',
    httpMethod: 'post',
    httpPath: '/invitations',
  },
  {
    clientCallName: 'client.invitations.retrieve',
    fullyQualifiedName: 'invitations.retrieve',
    httpMethod: 'get',
    httpPath: '/invitations/{invitationCode}',
  },
  {
    clientCallName: 'client.invitations.cancel',
    fullyQualifiedName: 'invitations.cancel',
    httpMethod: 'post',
    httpPath: '/invitations/{invitationCode}/cancel',
  },
  {
    clientCallName: 'client.invitations.claim',
    fullyQualifiedName: 'invitations.claim',
    httpMethod: 'post',
    httpPath: '/invitations/{invitationCode}/claim',
  },
  {
    clientCallName: 'client.sandbox.sendFunds',
    fullyQualifiedName: 'sandbox.sendFunds',
    httpMethod: 'post',
    httpPath: '/sandbox/send',
  },
  {
    clientCallName: 'client.sandbox.sendTestWebhook',
    fullyQualifiedName: 'sandbox.sendTestWebhook',
    httpMethod: 'post',
    httpPath: '/webhooks/test',
  },
  {
    clientCallName: 'client.sandbox.uma.receivePayment',
    fullyQualifiedName: 'sandbox.uma.receivePayment',
    httpMethod: 'post',
    httpPath: '/sandbox/uma/receive',
  },
  {
    clientCallName: 'client.sandbox.internalAccounts.fund',
    fullyQualifiedName: 'sandbox.internalAccounts.fund',
    httpMethod: 'post',
    httpPath: '/sandbox/internal-accounts/{accountId}/fund',
  },
  {
    clientCallName: 'client.umaProviders.list',
    fullyQualifiedName: 'umaProviders.list',
    httpMethod: 'get',
    httpPath: '/uma-providers',
  },
  {
    clientCallName: 'client.tokens.create',
    fullyQualifiedName: 'tokens.create',
    httpMethod: 'post',
    httpPath: '/tokens',
  },
  {
    clientCallName: 'client.tokens.retrieve',
    fullyQualifiedName: 'tokens.retrieve',
    httpMethod: 'get',
    httpPath: '/tokens/{tokenId}',
  },
  {
    clientCallName: 'client.tokens.list',
    fullyQualifiedName: 'tokens.list',
    httpMethod: 'get',
    httpPath: '/tokens',
  },
  {
    clientCallName: 'client.tokens.delete',
    fullyQualifiedName: 'tokens.delete',
    httpMethod: 'delete',
    httpPath: '/tokens/{tokenId}',
  },
  {
    clientCallName: 'client.exchangeRates.list',
    fullyQualifiedName: 'exchangeRates.list',
    httpMethod: 'get',
    httpPath: '/exchange-rates',
  },
];

function allowedMethodsForCodeTool(options: McpOptions | undefined): SdkMethod[] | undefined {
  if (!options) {
    return undefined;
  }

  let allowedMethods: SdkMethod[];

  if (options.codeAllowHttpGets || options.codeAllowedMethods) {
    // Start with nothing allowed and then add into it from options
    let allowedMethodsSet = new Set<SdkMethod>();

    if (options.codeAllowHttpGets) {
      // Add all methods that map to an HTTP GET
      sdkMethods
        .filter((method) => method.httpMethod === 'get')
        .forEach((method) => allowedMethodsSet.add(method));
    }

    if (options.codeAllowedMethods) {
      // Add all methods that match any of the allowed regexps
      const allowedRegexps = options.codeAllowedMethods.map((pattern) => {
        try {
          return new RegExp(pattern);
        } catch (e) {
          throw new Error(
            `Invalid regex pattern for allowed method: "${pattern}": ${e instanceof Error ? e.message : e}`,
          );
        }
      });

      sdkMethods
        .filter((method) => allowedRegexps.some((regexp) => regexp.test(method.fullyQualifiedName)))
        .forEach((method) => allowedMethodsSet.add(method));
    }

    allowedMethods = Array.from(allowedMethodsSet);
  } else {
    // Start with everything allowed
    allowedMethods = [...sdkMethods];
  }

  if (options.codeBlockedMethods) {
    // Filter down based on blocked regexps
    const blockedRegexps = options.codeBlockedMethods.map((pattern) => {
      try {
        return new RegExp(pattern);
      } catch (e) {
        throw new Error(
          `Invalid regex pattern for blocked method: "${pattern}": ${e instanceof Error ? e.message : e}`,
        );
      }
    });

    allowedMethods = allowedMethods.filter(
      (method) => !blockedRegexps.some((regexp) => regexp.test(method.fullyQualifiedName)),
    );
  }

  return allowedMethods;
}

export function blockedMethodsForCodeTool(options: McpOptions | undefined): SdkMethod[] | undefined {
  const allowedMethods = allowedMethodsForCodeTool(options);
  if (!allowedMethods) {
    return undefined;
  }

  const allowedSet = new Set(allowedMethods.map((method) => method.fullyQualifiedName));

  // Return any methods that are not explicitly allowed
  return sdkMethods.filter((method) => !allowedSet.has(method.fullyQualifiedName));
}
