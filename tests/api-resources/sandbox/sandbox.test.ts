// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Grid from 'grid';

const client = new Grid({
  username: 'My Username',
  password: 'My Password',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource sandbox', () => {
  // Prism tests are disabled
  test.skip('sendFunds: only required params', async () => {
    const responsePromise = client.sandbox.sendFunds({
      currencyCode: 'USD',
      quoteId: 'Quote:019542f5-b3e7-1d02-0000-000000000006',
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
  test.skip('sendFunds: required and optional params', async () => {
    const response = await client.sandbox.sendFunds({
      currencyCode: 'USD',
      quoteId: 'Quote:019542f5-b3e7-1d02-0000-000000000006',
      currencyAmount: 1000,
    });
  });
});
