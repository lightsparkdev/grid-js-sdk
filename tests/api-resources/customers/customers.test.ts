// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import LightsparkGrid from '@lightsparkdev/grid';

const client = new LightsparkGrid({
  username: 'My Username',
  password: 'My Password',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource customers', () => {
  // Mock server tests are disabled
  test.skip('create: only required params', async () => {
    const responsePromise = client.customers.create({
      CreateCustomerRequest: { customerType: 'INDIVIDUAL' },
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
  test.skip('create: required and optional params', async () => {
    const response = await client.customers.create({
      CreateCustomerRequest: {
        currencies: ['USD', 'USDC'],
        email: 'john.doe@example.com',
        platformCustomerId: 'ind-9f84e0c2',
        region: 'US',
        umaAddress: '$john.doe@uma.domain.com',
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
        fullName: 'Jane Smith',
        kycStatus: 'APPROVED',
        nationality: 'US',
      },
    });
  });

  // Mock server tests are disabled
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

  // Mock server tests are disabled
  test.skip('update: only required params', async () => {
    const responsePromise = client.customers.update('customerId', {
      UpdateCustomerRequest: { customerType: 'INDIVIDUAL' },
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
  test.skip('update: required and optional params', async () => {
    const response = await client.customers.update('customerId', {
      UpdateCustomerRequest: {
        currencies: ['USD', 'EUR', 'USDC'],
        email: 'john.doe@example.com',
        umaAddress: '$john.doe@uma.domain.com',
        customerType: 'INDIVIDUAL',
        address: {
          country: 'US',
          line1: '456 Market St',
          postalCode: '94103',
          city: 'San Francisco',
          line2: 'Apt 4B',
          state: 'CA',
        },
        birthDate: '1985-06-15',
        fullName: 'John Smith',
        kycStatus: 'APPROVED',
        nationality: 'US',
      },
    });
  });

  // Mock server tests are disabled
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

  // Mock server tests are disabled
  test.skip('list: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.customers.list(
        {
          createdAfter: '2019-12-27T18:11:19.117Z',
          createdBefore: '2019-12-27T18:11:19.117Z',
          currency: 'currency',
          cursor: 'cursor',
          customerType: 'INDIVIDUAL',
          isIncludingDeleted: true,
          limit: 1,
          platformCustomerId: 'platformCustomerId',
          region: 'region',
          umaAddress: 'umaAddress',
          updatedAfter: '2019-12-27T18:11:19.117Z',
          updatedBefore: '2019-12-27T18:11:19.117Z',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(LightsparkGrid.NotFoundError);
  });

  // Mock server tests are disabled
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

  // Mock server tests are disabled
  test.skip('export: only required params', async () => {
    const responsePromise = client.customers.export('id', {
      clientPublicKey:
        '04f45f2a22c908b9ce09a7150e514afd24627c401c38a4afc164e1ea783adaaa31d4245acfb88c2ebd42b47628d63ecabf345484f0a9f665b63c54c897d5578be2',
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
  test.skip('export: required and optional params', async () => {
    const response = await client.customers.export('id', {
      clientPublicKey:
        '04f45f2a22c908b9ce09a7150e514afd24627c401c38a4afc164e1ea783adaaa31d4245acfb88c2ebd42b47628d63ecabf345484f0a9f665b63c54c897d5578be2',
      'Grid-Wallet-Signature':
        'eyJwdWJsaWNLZXkiOiIwMmExYjIuLi4iLCJzaWduYXR1cmUiOiIzMDQ1MDIyMTAwLi4uIiwic2NoZW1lIjoiUDI1Nl9FQ0RTQV9TSEEyNTYifQ',
      'Request-Id': 'Request:7c4a8d09-ca37-4e3e-9e0d-8c2b3e9a1f21',
    });
  });

  // Mock server tests are disabled
  test.skip('generateKYCLink', async () => {
    const responsePromise = client.customers.generateKYCLink('customerId');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('generateKYCLink: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.customers.generateKYCLink(
        'customerId',
        { redirectUri: 'https://app.example.com/onboarding/completed', 'Idempotency-Key': '<uuid>' },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(LightsparkGrid.NotFoundError);
  });

  // Mock server tests are disabled
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

  // Mock server tests are disabled
  test.skip('listInternalAccounts: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.customers.listInternalAccounts(
        {
          currency: 'currency',
          cursor: 'cursor',
          customerId: 'customerId',
          limit: 1,
          type: 'INTERNAL_FIAT',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(LightsparkGrid.NotFoundError);
  });

  // Mock server tests are disabled
  test.skip('updateInternalAccount', async () => {
    const responsePromise = client.customers.updateInternalAccount(
      'InternalAccount:019542f5-b3e7-1d02-0000-000000000002',
      {},
    );
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });
});
