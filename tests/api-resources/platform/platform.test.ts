// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Grid from 'grid';

const client = new Grid({
  username: 'My Username',
  password: 'My Password',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource platform', () => {
  // Prism tests are disabled
  test.skip('internalAccounts', async () => {
    const responsePromise = client.platform.internalAccounts();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('internalAccounts: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.platform.internalAccounts({ currency: 'currency' }, { path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(Grid.NotFoundError);
  });
});
