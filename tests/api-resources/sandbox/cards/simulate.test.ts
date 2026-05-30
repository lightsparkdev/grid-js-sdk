// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import LightsparkGrid from '@lightsparkdev/grid';

const client = new LightsparkGrid({
  username: 'My Username',
  password: 'My Password',
  agentAccessToken: 'My Agent Access Token',
  webhookSignature: 'My Webhook Signature',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource simulate', () => {
  // Mock server tests are disabled
  test.skip('authorization: only required params', async () => {
    const responsePromise = client.sandbox.cards.simulate.authorization(
      'Card:019542f5-b3e7-1d02-0000-000000000010',
      {
        amount: 1250,
        currency: {},
        merchant: { descriptor: 'BLUE BOTTLE COFFEE SF' },
      },
    );
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('authorization: required and optional params', async () => {
    const response = await client.sandbox.cards.simulate.authorization(
      'Card:019542f5-b3e7-1d02-0000-000000000010',
      {
        amount: 1250,
        currency: {
          code: 'USD',
          decimals: 2,
          name: 'United States Dollar',
          symbol: '$',
        },
        merchant: {
          descriptor: 'BLUE BOTTLE COFFEE SF',
          country: 'US',
          mcc: '5814',
        },
      },
    );
  });

  // Mock server tests are disabled
  test.skip('clearing: only required params', async () => {
    const responsePromise = client.sandbox.cards.simulate.clearing(
      'Card:019542f5-b3e7-1d02-0000-000000000010',
      { amount: 1500, cardTransactionId: 'CardTransaction:019542f5-b3e7-1d02-0000-000000000100' },
    );
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('clearing: required and optional params', async () => {
    const response = await client.sandbox.cards.simulate.clearing(
      'Card:019542f5-b3e7-1d02-0000-000000000010',
      { amount: 1500, cardTransactionId: 'CardTransaction:019542f5-b3e7-1d02-0000-000000000100' },
    );
  });

  // Mock server tests are disabled
  test.skip('return: only required params', async () => {
    const responsePromise = client.sandbox.cards.simulate.return(
      'Card:019542f5-b3e7-1d02-0000-000000000010',
      { amount: 1500, cardTransactionId: 'CardTransaction:019542f5-b3e7-1d02-0000-000000000100' },
    );
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('return: required and optional params', async () => {
    const response = await client.sandbox.cards.simulate.return('Card:019542f5-b3e7-1d02-0000-000000000010', {
      amount: 1500,
      cardTransactionId: 'CardTransaction:019542f5-b3e7-1d02-0000-000000000100',
    });
  });
});
