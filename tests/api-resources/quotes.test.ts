// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import LightsparkGrid from '@lightsparkdev/grid';

const client = new LightsparkGrid({
  username: 'My Username',
  password: 'My Password',
  agentAccessToken: 'My Agent Access Token',
  webhookSignature: 'My Webhook Signature',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource quotes', () => {
  // Mock server tests are disabled
  test.skip('create: only required params', async () => {
    const responsePromise = client.quotes.create({
      destination: {
        destinationType: 'ACCOUNT',
        accountId: 'ExternalAccount:a12dcbd6-dced-4ec4-b756-3c3a9ea3d123',
      },
      lockedCurrencyAmount: 10000,
      lockedCurrencySide: 'SENDING',
      source: { sourceType: 'ACCOUNT', accountId: 'InternalAccount:e85dcbd6-dced-4ec4-b756-3c3a9ea3d965' },
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('create: required and optional params', async () => {
    const response = await client.quotes.create({
      destination: {
        destinationType: 'ACCOUNT',
        accountId: 'ExternalAccount:a12dcbd6-dced-4ec4-b756-3c3a9ea3d123',
      },
      lockedCurrencyAmount: 10000,
      lockedCurrencySide: 'SENDING',
      source: { sourceType: 'ACCOUNT', accountId: 'InternalAccount:e85dcbd6-dced-4ec4-b756-3c3a9ea3d965' },
      description: 'Transfer between accounts, either internal or external.',
      immediatelyExecute: false,
      lookupId: 'Lookup:019542f5-b3e7-1d02-0000-000000000009',
      purposeOfPayment: 'GIFT',
      senderCustomerInfo: { FULL_NAME: 'bar', NATIONALITY: 'bar' },
      'Idempotency-Key': '<uuid>',
    });
  });

  // Mock server tests are disabled
  test.skip('retrieve', async () => {
    const responsePromise = client.quotes.retrieve('quoteId');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('execute', async () => {
    const responsePromise = client.quotes.execute('Quote:019542f5-b3e7-1d02-0000-000000000001');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('execute: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.quotes.execute(
        'Quote:019542f5-b3e7-1d02-0000-000000000001',
        {
          'Grid-Wallet-Signature':
            'MEUCIQDx7k2N0aK4p8f3vR9J6yT5wL1mB0sXnG2hQ4vJ8zYkCgIgZ4rP9dT7eWfU3oM6KjR1qSpNvBwL0tXyA2iG8fH5dE=',
          'Idempotency-Key': '<uuid>',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(LightsparkGrid.NotFoundError);
  });
});
