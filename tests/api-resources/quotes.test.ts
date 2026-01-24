// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Grid from 'grid';

const client = new Grid({
  username: 'My Username',
  password: 'My Password',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource quotes', () => {
  // Prism tests are disabled
  test.skip('create: only required params', async () => {
    const responsePromise = client.quotes.create({
      destination: {
        accountId: 'a12dcbd6-dced-4ec4-b756-3c3a9ea3d123',
        currency: 'EUR',
        destinationType: 'ACCOUNT',
      },
      lockedCurrencyAmount: 1000,
      lockedCurrencySide: 'SENDING',
      source: { accountId: 'InternalAccount:85dcbd6-dced-4ec4-b756-3c3a9ea3d965', sourceType: 'ACCOUNT' },
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('create: required and optional params', async () => {
    const response = await client.quotes.create({
      destination: {
        accountId: 'a12dcbd6-dced-4ec4-b756-3c3a9ea3d123',
        currency: 'EUR',
        destinationType: 'ACCOUNT',
      },
      lockedCurrencyAmount: 1000,
      lockedCurrencySide: 'SENDING',
      source: { accountId: 'InternalAccount:85dcbd6-dced-4ec4-b756-3c3a9ea3d965', sourceType: 'ACCOUNT' },
      description: 'Invoice #1234 payment',
      immediatelyExecute: false,
      lookupId: 'Lookup:019542f5-b3e7-1d02-0000-000000000009',
      senderCustomerInfo: { FULL_NAME: 'bar', NATIONALITY: 'bar' },
    });
  });

  // Prism tests are disabled
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

  // Prism tests are disabled
  test.skip('list', async () => {
    const responsePromise = client.quotes.list();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('list: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.quotes.list(
        {
          createdAfter: '2019-12-27T18:11:19.117Z',
          createdBefore: '2019-12-27T18:11:19.117Z',
          cursor: 'cursor',
          customerId: 'customerId',
          limit: 1,
          receivingAccountId: 'receivingAccountId',
          receivingUmaAddress: 'receivingUmaAddress',
          sendingAccountId: 'sendingAccountId',
          sendingUmaAddress: 'sendingUmaAddress',
          status: 'PENDING',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Grid.NotFoundError);
  });

  // Prism tests are disabled
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

  // Prism tests are disabled
  test.skip('retry: only required params', async () => {
    const responsePromise = client.quotes.retry('quoteId', {
      lookupId: 'Lookup:019542f5-b3e7-1d02-0000-000000000009',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('retry: required and optional params', async () => {
    const response = await client.quotes.retry('quoteId', {
      lookupId: 'Lookup:019542f5-b3e7-1d02-0000-000000000009',
      senderCustomerInfo: { FULL_NAME: 'bar', NATIONALITY: 'bar' },
    });
  });
});
