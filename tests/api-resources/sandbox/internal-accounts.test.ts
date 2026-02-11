// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import LightsparkGrid from '@lightsparkdev/grid';

const client = new LightsparkGrid({
  username: 'My Username',
  password: 'My Password',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource internalAccounts', () => {
  // Prism tests are disabled
  test.skip('fund: only required params', async () => {
    const responsePromise = client.sandbox.internalAccounts.fund(
      'InternalAccount:a12dcbd6-dced-4ec4-b756-3c3a9ea3d123',
      { amount: 100000 },
    );
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('fund: required and optional params', async () => {
    const response = await client.sandbox.internalAccounts.fund(
      'InternalAccount:a12dcbd6-dced-4ec4-b756-3c3a9ea3d123',
      { amount: 100000 },
    );
  });
});
