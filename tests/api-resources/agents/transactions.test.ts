// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import LightsparkGrid from '@lightsparkdev/grid';

const client = new LightsparkGrid({
  username: 'My Username',
  password: 'My Password',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource transactions', () => {
  // Mock server tests are disabled
  test.skip('approve: only required params', async () => {
    const responsePromise = client.agents.transactions.approve('actionId', { agentId: 'agentId' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('approve: required and optional params', async () => {
    const response = await client.agents.transactions.approve('actionId', { agentId: 'agentId' });
  });

  // Mock server tests are disabled
  test.skip('reject: only required params', async () => {
    const responsePromise = client.agents.transactions.reject('actionId', { agentId: 'agentId' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('reject: required and optional params', async () => {
    const response = await client.agents.transactions.reject('actionId', {
      agentId: 'agentId',
      reason: "Transaction amount exceeds customer's current risk limit.",
    });
  });
});
