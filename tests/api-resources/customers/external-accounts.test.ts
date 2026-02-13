// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import LightsparkGrid from '@lightsparkdev/grid';

const client = new LightsparkGrid({
  username: 'My Username',
  password: 'My Password',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource externalAccounts', () => {
  // Prism tests are disabled
  test.skip('create: only required params', async () => {
    const responsePromise = client.customers.externalAccounts.create({
      accountInfo: {
        accountType: 'BRL_ACCOUNT',
        beneficiary: { beneficiaryType: 'INDIVIDUAL', fullName: 'John Doe' },
        pixKey: 'pixKey',
        pixKeyType: 'pixKeyType',
        taxId: 'taxId',
      },
      currency: 'USD',
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
    const response = await client.customers.externalAccounts.create({
      accountInfo: {
        accountType: 'BRL_ACCOUNT',
        beneficiary: {
          beneficiaryType: 'INDIVIDUAL',
          fullName: 'John Doe',
          address: {
            country: 'US',
            line1: '123 Main Street',
            postalCode: '94105',
            city: 'San Francisco',
            line2: 'line2',
            state: 'CA',
          },
          birthDate: '1990-01-15',
          countryOfResidence: 'countryOfResidence',
          email: 'email',
          nationality: 'US',
          phoneNumber: 'phoneNumber',
          registrationNumber: 'registrationNumber',
        },
        pixKey: 'pixKey',
        pixKeyType: 'pixKeyType',
        taxId: 'taxId',
      },
      currency: 'USD',
      customerId: 'Customer:019542f5-b3e7-1d02-0000-000000000001',
      defaultUmaDepositAccount: true,
      platformAccountId: 'ext_acc_123456',
    });
  });

  // Prism tests are disabled
  test.skip('list', async () => {
    const responsePromise = client.customers.externalAccounts.list();
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
      client.customers.externalAccounts.list(
        {
          currency: 'currency',
          cursor: 'cursor',
          customerId: 'customerId',
          limit: 1,
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(LightsparkGrid.NotFoundError);
  });
});
