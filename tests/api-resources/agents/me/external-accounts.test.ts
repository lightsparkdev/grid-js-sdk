// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import LightsparkGrid from '@lightsparkdev/grid';

const client = new LightsparkGrid({
  username: 'My Username',
  password: 'My Password',
  agentAccessToken: 'My Agent Access Token',
  webhookSignature: 'My Webhook Signature',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource externalAccounts', () => {
  // Mock server tests are disabled
  test.skip('retrieve', async () => {
    const responsePromise = client.agents.me.externalAccounts.retrieve('externalAccountId');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('list', async () => {
    const responsePromise = client.agents.me.externalAccounts.list();
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
      client.agents.me.externalAccounts.list(
        {
          currency: 'currency',
          cursor: 'cursor',
          limit: 1,
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(LightsparkGrid.NotFoundError);
  });

  // Mock server tests are disabled
  test.skip('delete', async () => {
    const responsePromise = client.agents.me.externalAccounts.delete('externalAccountId');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('add: only required params', async () => {
    const responsePromise = client.agents.me.externalAccounts.add({
      accountInfo: {
        accountType: 'AED_ACCOUNT',
        beneficiary: {
          address: {
            country: 'US',
            line1: '123 Main Street',
            postalCode: '94105',
          },
          beneficiaryType: 'INDIVIDUAL',
          fullName: 'fullName',
        },
        iban: 'AE070331234567890123456',
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

  // Mock server tests are disabled
  test.skip('add: required and optional params', async () => {
    const response = await client.agents.me.externalAccounts.add({
      accountInfo: {
        accountType: 'AED_ACCOUNT',
        beneficiary: {
          address: {
            country: 'US',
            line1: '123 Main Street',
            postalCode: '94105',
            city: 'San Francisco',
            line2: 'Apt 4B',
            state: 'CA',
          },
          beneficiaryType: 'INDIVIDUAL',
          fullName: 'fullName',
          birthDate: 'birthDate',
          countryOfResidence: 'countryOfResidence',
          email: 'email',
          nationality: 'nationality',
          phoneNumber: 'phoneNumber',
        },
        iban: 'AE070331234567890123456',
        swiftCode: 'EBILAEAD',
      },
      currency: 'USD',
      customerId: 'Customer:019542f5-b3e7-1d02-0000-000000000001',
      defaultUmaDepositAccount: true,
      ownershipType: 'FIRST_PARTY',
      platformAccountId: 'ext_acc_123456',
    });
  });
});
