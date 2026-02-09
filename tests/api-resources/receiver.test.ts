// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import LightsparkGrid from 'lightspark-grid';

const client = new LightsparkGrid({
  username: 'My Username',
  password: 'My Password',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource receiver', () => {
  // Prism tests are disabled
  test.skip('lookupExternalAccount', async () => {
    const responsePromise = client.receiver.lookupExternalAccount(
      'ExternalAccount:e85dcbd6-dced-4ec4-b756-3c3a9ea3d965',
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
  test.skip('lookupExternalAccount: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.receiver.lookupExternalAccount(
        'ExternalAccount:e85dcbd6-dced-4ec4-b756-3c3a9ea3d965',
        { customerId: 'customerId', senderUmaAddress: 'senderUmaAddress' },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(LightsparkGrid.NotFoundError);
  });

  // Prism tests are disabled
  test.skip('lookupUma', async () => {
    const responsePromise = client.receiver.lookupUma('receiverUmaAddress');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('lookupUma: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.receiver.lookupUma(
        'receiverUmaAddress',
        { customerId: 'customerId', senderUmaAddress: 'senderUmaAddress' },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(LightsparkGrid.NotFoundError);
  });
});
