// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import LightsparkGrid from '@lightsparkdev/grid';

const client = new LightsparkGrid({
  username: 'My Username',
  password: 'My Password',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource plaid', () => {
  // Mock server tests are disabled
  test.skip('createLinkToken: only required params', async () => {
    const responsePromise = client.plaid.createLinkToken({
      customerId: 'Customer:019542f5-b3e7-1d02-0000-000000000001',
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
  test.skip('createLinkToken: required and optional params', async () => {
    const response = await client.plaid.createLinkToken({
      customerId: 'Customer:019542f5-b3e7-1d02-0000-000000000001',
    });
  });

  // Mock server tests are disabled
  test.skip('submitPublicToken: only required params', async () => {
    const responsePromise = client.plaid.submitPublicToken('link-sandbox-abc123xyz-1234-5678', {
      publicToken: 'public-sandbox-12345678-1234-1234-1234-123456789012',
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
  test.skip('submitPublicToken: required and optional params', async () => {
    const response = await client.plaid.submitPublicToken('link-sandbox-abc123xyz-1234-5678', {
      publicToken: 'public-sandbox-12345678-1234-1234-1234-123456789012',
      accountId: 'plaid_account_id_123',
    });
  });
});
