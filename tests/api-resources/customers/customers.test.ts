// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Grid from 'grid';

const client = new Grid({
  username: 'My Username',
  password: 'My Password',
  webhookSignature: 'My Webhook Signature',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource customers', () => {
  // Prism tests are disabled
  test.skip('create: only required params', async () => {
    const responsePromise = client.customers.create({
      customerType: 'INDIVIDUAL',
      platformCustomerId: '9f84e0c2a72c4fa',
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
    const response = await client.customers.create({
      customerType: 'INDIVIDUAL',
      platformCustomerId: '9f84e0c2a72c4fa',
      address: {
        country: 'US',
        line1: '123 Main Street',
        postalCode: '94105',
        city: 'San Francisco',
        line2: 'Apt 4B',
        state: 'CA',
      },
      birthDate: '1990-01-15',
      fullName: 'John Michael Doe',
      kycUrl: 'https://example.com/kyc',
      nationality: 'US',
      umaAddress: '$john.doe@uma.domain.com',
    });
  });

  // Prism tests are disabled
  test.skip('retrieve', async () => {
    const responsePromise = client.customers.retrieve('customerId');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('update: only required params', async () => {
    const responsePromise = client.customers.update('customerId', { customerType: 'INDIVIDUAL' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('update: required and optional params', async () => {
    const response = await client.customers.update('customerId', {
      customerType: 'INDIVIDUAL',
      address: {
        country: 'US',
        line1: '123 Main Street',
        postalCode: '94105',
        city: 'San Francisco',
        line2: 'Apt 4B',
        state: 'CA',
      },
      birthDate: '1990-01-15',
      fullName: 'John Michael Doe',
      nationality: 'US',
      umaAddress: '$john.doe@uma.domain.com',
    });
  });

  // Prism tests are disabled
  test.skip('list', async () => {
    const responsePromise = client.customers.list();
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
      client.customers.list(
        {
          createdAfter: '2019-12-27T18:11:19.117Z',
          createdBefore: '2019-12-27T18:11:19.117Z',
          cursor: 'cursor',
          customerType: 'INDIVIDUAL',
          isIncludingDeleted: true,
          limit: 1,
          platformCustomerId: 'platformCustomerId',
          umaAddress: 'umaAddress',
          updatedAfter: '2019-12-27T18:11:19.117Z',
          updatedBefore: '2019-12-27T18:11:19.117Z',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Grid.NotFoundError);
  });

  // Prism tests are disabled
  test.skip('delete', async () => {
    const responsePromise = client.customers.delete('customerId');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('getKYCLink: only required params', async () => {
    const responsePromise = client.customers.getKYCLink({ platformCustomerId: 'platformCustomerId' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('getKYCLink: required and optional params', async () => {
    const response = await client.customers.getKYCLink({
      platformCustomerId: 'platformCustomerId',
      redirectUri: 'redirectUri',
    });
  });

  // Prism tests are disabled
  test.skip('listInternalAccounts', async () => {
    const responsePromise = client.customers.listInternalAccounts();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('listInternalAccounts: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.customers.listInternalAccounts(
        {
          currency: 'currency',
          cursor: 'cursor',
          customerId: 'customerId',
          limit: 1,
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Grid.NotFoundError);
  });
});
