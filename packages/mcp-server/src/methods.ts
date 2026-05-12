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
    clientCallName: 'client.customers.export',
    fullyQualifiedName: 'customers.export',
    httpMethod: 'post',
    httpPath: '/internal-accounts/{id}/export',
  },
  {
    clientCallName: 'client.customers.generateKYCLink',
    fullyQualifiedName: 'customers.generateKYCLink',
    httpMethod: 'post',
    httpPath: '/customers/{customerId}/kyc-link',
  },
  {
    clientCallName: 'client.customers.listInternalAccounts',
    fullyQualifiedName: 'customers.listInternalAccounts',
    httpMethod: 'get',
    httpPath: '/customers/internal-accounts',
  },
  {
    clientCallName: 'client.customers.updateInternalAccount',
    fullyQualifiedName: 'customers.updateInternalAccount',
    httpMethod: 'patch',
    httpPath: '/internal-accounts/{id}',
  },
  {
    clientCallName: 'client.customers.externalAccounts.create',
    fullyQualifiedName: 'customers.externalAccounts.create',
    httpMethod: 'post',
    httpPath: '/customers/external-accounts',
  },
  {
    clientCallName: 'client.customers.externalAccounts.retrieve',
    fullyQualifiedName: 'customers.externalAccounts.retrieve',
    httpMethod: 'get',
    httpPath: '/customers/external-accounts/{externalAccountId}',
  },
  {
    clientCallName: 'client.customers.externalAccounts.list',
    fullyQualifiedName: 'customers.externalAccounts.list',
    httpMethod: 'get',
    httpPath: '/customers/external-accounts',
  },
  {
    clientCallName: 'client.customers.externalAccounts.delete',
    fullyQualifiedName: 'customers.externalAccounts.delete',
    httpMethod: 'delete',
    httpPath: '/customers/external-accounts/{externalAccountId}',
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
    clientCallName: 'client.platform.externalAccounts.retrieve',
    fullyQualifiedName: 'platform.externalAccounts.retrieve',
    httpMethod: 'get',
    httpPath: '/platform/external-accounts/{externalAccountId}',
  },
  {
    clientCallName: 'client.platform.externalAccounts.list',
    fullyQualifiedName: 'platform.externalAccounts.list',
    httpMethod: 'get',
    httpPath: '/platform/external-accounts',
  },
  {
    clientCallName: 'client.platform.externalAccounts.delete',
    fullyQualifiedName: 'platform.externalAccounts.delete',
    httpMethod: 'delete',
    httpPath: '/platform/external-accounts/{externalAccountId}',
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
    clientCallName: 'client.sandbox.webhooks.sendTest',
    fullyQualifiedName: 'sandbox.webhooks.sendTest',
    httpMethod: 'post',
    httpPath: '/sandbox/webhooks/test',
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
  { clientCallName: 'client.webhooks.unwrap', fullyQualifiedName: 'webhooks.unwrap' },
  {
    clientCallName: 'client.crypto.estimateWithdrawalFee',
    fullyQualifiedName: 'crypto.estimateWithdrawalFee',
    httpMethod: 'post',
    httpPath: '/crypto/estimate-withdrawal-fee',
  },
  {
    clientCallName: 'client.beneficialOwners.create',
    fullyQualifiedName: 'beneficialOwners.create',
    httpMethod: 'post',
    httpPath: '/beneficial-owners',
  },
  {
    clientCallName: 'client.beneficialOwners.retrieve',
    fullyQualifiedName: 'beneficialOwners.retrieve',
    httpMethod: 'get',
    httpPath: '/beneficial-owners/{beneficialOwnerId}',
  },
  {
    clientCallName: 'client.beneficialOwners.update',
    fullyQualifiedName: 'beneficialOwners.update',
    httpMethod: 'patch',
    httpPath: '/beneficial-owners/{beneficialOwnerId}',
  },
  {
    clientCallName: 'client.beneficialOwners.list',
    fullyQualifiedName: 'beneficialOwners.list',
    httpMethod: 'get',
    httpPath: '/beneficial-owners',
  },
  {
    clientCallName: 'client.documents.retrieve',
    fullyQualifiedName: 'documents.retrieve',
    httpMethod: 'get',
    httpPath: '/documents/{documentId}',
  },
  {
    clientCallName: 'client.documents.list',
    fullyQualifiedName: 'documents.list',
    httpMethod: 'get',
    httpPath: '/documents',
  },
  {
    clientCallName: 'client.documents.delete',
    fullyQualifiedName: 'documents.delete',
    httpMethod: 'delete',
    httpPath: '/documents/{documentId}',
  },
  {
    clientCallName: 'client.documents.replace',
    fullyQualifiedName: 'documents.replace',
    httpMethod: 'put',
    httpPath: '/documents/{documentId}',
  },
  {
    clientCallName: 'client.documents.upload',
    fullyQualifiedName: 'documents.upload',
    httpMethod: 'post',
    httpPath: '/documents',
  },
  {
    clientCallName: 'client.verifications.retrieve',
    fullyQualifiedName: 'verifications.retrieve',
    httpMethod: 'get',
    httpPath: '/verifications/{verificationId}',
  },
  {
    clientCallName: 'client.verifications.list',
    fullyQualifiedName: 'verifications.list',
    httpMethod: 'get',
    httpPath: '/verifications',
  },
  {
    clientCallName: 'client.verifications.submit',
    fullyQualifiedName: 'verifications.submit',
    httpMethod: 'post',
    httpPath: '/verifications',
  },
  {
    clientCallName: 'client.discoveries.list',
    fullyQualifiedName: 'discoveries.list',
    httpMethod: 'get',
    httpPath: '/discoveries',
  },
  {
    clientCallName: 'client.auth.credentials.create',
    fullyQualifiedName: 'auth.credentials.create',
    httpMethod: 'post',
    httpPath: '/auth/credentials',
  },
  {
    clientCallName: 'client.auth.credentials.update',
    fullyQualifiedName: 'auth.credentials.update',
    httpMethod: 'patch',
    httpPath: '/auth/credentials/{id}',
  },
  {
    clientCallName: 'client.auth.credentials.list',
    fullyQualifiedName: 'auth.credentials.list',
    httpMethod: 'get',
    httpPath: '/auth/credentials',
  },
  {
    clientCallName: 'client.auth.credentials.delete',
    fullyQualifiedName: 'auth.credentials.delete',
    httpMethod: 'delete',
    httpPath: '/auth/credentials/{id}',
  },
  {
    clientCallName: 'client.auth.credentials.challenge',
    fullyQualifiedName: 'auth.credentials.challenge',
    httpMethod: 'post',
    httpPath: '/auth/credentials/{id}/challenge',
  },
  {
    clientCallName: 'client.auth.credentials.verify',
    fullyQualifiedName: 'auth.credentials.verify',
    httpMethod: 'post',
    httpPath: '/auth/credentials/{id}/verify',
  },
  {
    clientCallName: 'client.auth.sessions.list',
    fullyQualifiedName: 'auth.sessions.list',
    httpMethod: 'get',
    httpPath: '/auth/sessions',
  },
  {
    clientCallName: 'client.auth.sessions.delete',
    fullyQualifiedName: 'auth.sessions.delete',
    httpMethod: 'delete',
    httpPath: '/auth/sessions/{id}',
  },
  {
    clientCallName: 'client.auth.sessions.refresh',
    fullyQualifiedName: 'auth.sessions.refresh',
    httpMethod: 'post',
    httpPath: '/auth/sessions/{id}/refresh',
  },
  {
    clientCallName: 'client.agents.create',
    fullyQualifiedName: 'agents.create',
    httpMethod: 'post',
    httpPath: '/agents',
  },
  {
    clientCallName: 'client.agents.retrieve',
    fullyQualifiedName: 'agents.retrieve',
    httpMethod: 'get',
    httpPath: '/agents/{agentId}',
  },
  {
    clientCallName: 'client.agents.update',
    fullyQualifiedName: 'agents.update',
    httpMethod: 'patch',
    httpPath: '/agents/{agentId}',
  },
  {
    clientCallName: 'client.agents.list',
    fullyQualifiedName: 'agents.list',
    httpMethod: 'get',
    httpPath: '/agents',
  },
  {
    clientCallName: 'client.agents.delete',
    fullyQualifiedName: 'agents.delete',
    httpMethod: 'delete',
    httpPath: '/agents/{agentId}',
  },
  {
    clientCallName: 'client.agents.listApprovals',
    fullyQualifiedName: 'agents.listApprovals',
    httpMethod: 'get',
    httpPath: '/agents/approvals',
  },
  {
    clientCallName: 'client.agents.updatePolicy',
    fullyQualifiedName: 'agents.updatePolicy',
    httpMethod: 'patch',
    httpPath: '/agents/{agentId}/policy',
  },
  {
    clientCallName: 'client.agents.me.retrieve',
    fullyQualifiedName: 'agents.me.retrieve',
    httpMethod: 'get',
    httpPath: '/agents/me',
  },
  {
    clientCallName: 'client.agents.me.createTransferIn',
    fullyQualifiedName: 'agents.me.createTransferIn',
    httpMethod: 'post',
    httpPath: '/agents/me/transfer-in',
  },
  {
    clientCallName: 'client.agents.me.createTransferOut',
    fullyQualifiedName: 'agents.me.createTransferOut',
    httpMethod: 'post',
    httpPath: '/agents/me/transfer-out',
  },
  {
    clientCallName: 'client.agents.me.listInternalAccounts',
    fullyQualifiedName: 'agents.me.listInternalAccounts',
    httpMethod: 'get',
    httpPath: '/agents/me/internal-accounts',
  },
  {
    clientCallName: 'client.agents.me.transactions.retrieve',
    fullyQualifiedName: 'agents.me.transactions.retrieve',
    httpMethod: 'get',
    httpPath: '/agents/me/transactions/{transactionId}',
  },
  {
    clientCallName: 'client.agents.me.transactions.list',
    fullyQualifiedName: 'agents.me.transactions.list',
    httpMethod: 'get',
    httpPath: '/agents/me/transactions',
  },
  {
    clientCallName: 'client.agents.me.quotes.create',
    fullyQualifiedName: 'agents.me.quotes.create',
    httpMethod: 'post',
    httpPath: '/agents/me/quotes',
  },
  {
    clientCallName: 'client.agents.me.quotes.retrieve',
    fullyQualifiedName: 'agents.me.quotes.retrieve',
    httpMethod: 'get',
    httpPath: '/agents/me/quotes/{quoteId}',
  },
  {
    clientCallName: 'client.agents.me.quotes.execute',
    fullyQualifiedName: 'agents.me.quotes.execute',
    httpMethod: 'post',
    httpPath: '/agents/me/quotes/{quoteId}/execute',
  },
  {
    clientCallName: 'client.agents.me.externalAccounts.retrieve',
    fullyQualifiedName: 'agents.me.externalAccounts.retrieve',
    httpMethod: 'get',
    httpPath: '/agents/me/external-accounts/{externalAccountId}',
  },
  {
    clientCallName: 'client.agents.me.externalAccounts.list',
    fullyQualifiedName: 'agents.me.externalAccounts.list',
    httpMethod: 'get',
    httpPath: '/agents/me/external-accounts',
  },
  {
    clientCallName: 'client.agents.me.externalAccounts.delete',
    fullyQualifiedName: 'agents.me.externalAccounts.delete',
    httpMethod: 'delete',
    httpPath: '/agents/me/external-accounts/{externalAccountId}',
  },
  {
    clientCallName: 'client.agents.me.externalAccounts.add',
    fullyQualifiedName: 'agents.me.externalAccounts.add',
    httpMethod: 'post',
    httpPath: '/agents/me/external-accounts',
  },
  {
    clientCallName: 'client.agents.me.actions.retrieve',
    fullyQualifiedName: 'agents.me.actions.retrieve',
    httpMethod: 'get',
    httpPath: '/agents/me/actions/{actionId}',
  },
  {
    clientCallName: 'client.agents.me.actions.list',
    fullyQualifiedName: 'agents.me.actions.list',
    httpMethod: 'get',
    httpPath: '/agents/me/actions',
  },
  {
    clientCallName: 'client.agents.deviceCodes.getStatus',
    fullyQualifiedName: 'agents.deviceCodes.getStatus',
    httpMethod: 'get',
    httpPath: '/agents/device-codes/{code}/status',
  },
  {
    clientCallName: 'client.agents.deviceCodes.redeem',
    fullyQualifiedName: 'agents.deviceCodes.redeem',
    httpMethod: 'post',
    httpPath: '/agents/device-codes/{code}/redeem',
  },
  {
    clientCallName: 'client.agents.deviceCodes.regenerate',
    fullyQualifiedName: 'agents.deviceCodes.regenerate',
    httpMethod: 'post',
    httpPath: '/agents/{agentId}/device-codes',
  },
  {
    clientCallName: 'client.agents.transactions.approve',
    fullyQualifiedName: 'agents.transactions.approve',
    httpMethod: 'post',
    httpPath: '/agents/{agentId}/actions/{actionId}/approve',
  },
  {
    clientCallName: 'client.agents.transactions.reject',
    fullyQualifiedName: 'agents.transactions.reject',
    httpMethod: 'post',
    httpPath: '/agents/{agentId}/actions/{actionId}/reject',
  },
  {
    clientCallName: 'client.agents.actions.approve',
    fullyQualifiedName: 'agents.actions.approve',
    httpMethod: 'post',
    httpPath: '/agents/{agentId}/actions/{actionId}/approve',
  },
  {
    clientCallName: 'client.agents.actions.reject',
    fullyQualifiedName: 'agents.actions.reject',
    httpMethod: 'post',
    httpPath: '/agents/{agentId}/actions/{actionId}/reject',
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
