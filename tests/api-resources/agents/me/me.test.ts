// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import LightsparkGrid from '@lightsparkdev/grid';

const client = new LightsparkGrid({
  username: 'My Username',
  password: 'My Password',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource me', () => {
  // Mock server tests are disabled
  test.skip('list', async () => {
    const responsePromise = client.agents.me.list();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('retrieveInternalAccounts', async () => {
    const responsePromise = client.agents.me.retrieveInternalAccounts();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('retrieveInternalAccounts: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.agents.me.retrieveInternalAccounts(
        {
          currency: 'currency',
          cursor: 'cursor',
          limit: 1,
          type: 'INTERNAL_FIAT',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(LightsparkGrid.NotFoundError);
  });

  // Mock server tests are disabled
  test.skip('transferIn: only required params', async () => {
    const responsePromise = client.agents.me.transferIn({
      destination: { accountId: 'InternalAccount:a12dcbd6-dced-4ec4-b756-3c3a9ea3d123' },
      source: { accountId: 'ExternalAccount:e85dcbd6-dced-4ec4-b756-3c3a9ea3d965' },
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
  test.skip('transferIn: required and optional params', async () => {
    const response = await client.agents.me.transferIn({
      destination: { accountId: 'InternalAccount:a12dcbd6-dced-4ec4-b756-3c3a9ea3d123' },
      source: { accountId: 'ExternalAccount:e85dcbd6-dced-4ec4-b756-3c3a9ea3d965' },
      amount: 12550,
      'Idempotency-Key': '550e8400-e29b-41d4-a716-446655440000',
    });
  });

  // Mock server tests are disabled
  test.skip('transferOut: only required params', async () => {
    const responsePromise = client.agents.me.transferOut({
      destination: { accountId: 'ExternalAccount:e85dcbd6-dced-4ec4-b756-3c3a9ea3d965' },
      source: { accountId: 'InternalAccount:a12dcbd6-dced-4ec4-b756-3c3a9ea3d123' },
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
  test.skip('transferOut: required and optional params', async () => {
    const response = await client.agents.me.transferOut({
      destination: { accountId: 'ExternalAccount:e85dcbd6-dced-4ec4-b756-3c3a9ea3d965' },
      source: { accountId: 'InternalAccount:a12dcbd6-dced-4ec4-b756-3c3a9ea3d123' },
      amount: 12550,
      'Idempotency-Key': '550e8400-e29b-41d4-a716-446655440000',
    });
  });
});
