// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Grid from 'grid';

const client = new Grid({
  username: 'My Username',
  password: 'My Password',
  webhookSignature: 'My Webhook Signature',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource uma', () => {
  // Prism tests are disabled
  test.skip('receivePayment: only required params', async () => {
    const responsePromise = client.sandbox.uma.receivePayment({
      receivingCurrencyAmount: 1000,
      receivingCurrencyCode: 'USD',
      senderUmaAddress: '$success.usd@sandbox.grid.uma.money',
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
  test.skip('receivePayment: required and optional params', async () => {
    const response = await client.sandbox.uma.receivePayment({
      receivingCurrencyAmount: 1000,
      receivingCurrencyCode: 'USD',
      senderUmaAddress: '$success.usd@sandbox.grid.uma.money',
      customerId: 'Customer:019542f5-b3e7-1d02-0000-000000000001',
      receiverUmaAddress: '$receiver@uma.domain',
    });
  });
});
