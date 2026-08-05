// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import LightsparkGrid from '@lightsparkdev/grid';

const client = new LightsparkGrid({
  username: 'My Username',
  password: 'My Password',
  agentAccessToken: 'My Agent Access Token',
  webhookSignature: 'My Webhook Signature',
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
        customerType: 'INDIVIDUAL',
        address: {
          country: 'US',
          line1: '123 Main Street',
          postalCode: '94105',
          city: 'San Francisco',
          line2: 'Apt 4B',
          state: 'CA',
        },
        annualIncomeRange: 'RANGE_100K_250K',
        birthDate: '1990-01-15',
        currencies: ['USD', 'USDC'],
        email: 'john.doe@example.com',
        endUserTermsConsent: {
          acceptanceMethod: 'CHECKBOX',
          acceptedAt: '2019-12-27T18:11:19.117Z',
          ipAddress: '198.51.100.24',
          termsVersion: 'V1',
        },
        expectedMonthlyTransactionCount: 'COUNT_100_TO_500',
        expectedMonthlyTransactionVolume: 'VOLUME_100K_TO_1M',
        fullName: 'John Michael Doe',
        identifier: '123-45-6789',
        idType: 'SSN',
        kycStatus: 'APPROVED',
        nationality: 'US',
        netWorthRange: 'RANGE_500K_1M',
        pepStatus: 'NONE',
        phoneNumber: '+14155551234',
        platformCustomerId: '9f84e0c2a72c4fa',
        purposeOfAccount: 'CONTRACTOR_PAYOUTS',
        purposeOfAccountOtherDescription: 'Household budgeting between spouses',
        region: 'US',
        sourceOfFundsCategories: ['SALARY'],
        sourceOfFundsOtherDescription: 'Contest winnings',
        sourceOfWealthCategories: ['SALARY', 'INVESTMENTS'],
        sourceOfWealthOtherDescription: 'Royalty income from published works',
        taxIdCountryOfIssuance: 'US',
        taxIdentifier: '123-45-6789',
        taxIdType: 'SSN',
        umaAddress: '$john.doe@uma.domain.com',
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
        customerType: 'INDIVIDUAL',
        address: {
          country: 'US',
          line1: '123 Main Street',
          postalCode: '94105',
          city: 'San Francisco',
          line2: 'Apt 4B',
          state: 'CA',
        },
        annualIncomeRange: 'RANGE_100K_250K',
        birthDate: '1990-01-15',
        currencies: ['USD', 'EUR', 'USDC'],
        email: 'john.doe@example.com',
        endUserTermsConsent: {
          acceptanceMethod: 'CHECKBOX',
          acceptedAt: '2019-12-27T18:11:19.117Z',
          ipAddress: '198.51.100.24',
          termsVersion: 'V1',
        },
        expectedMonthlyTransactionCount: 'COUNT_100_TO_500',
        expectedMonthlyTransactionVolume: 'VOLUME_100K_TO_1M',
        fullName: 'John Michael Doe',
        kycStatus: 'APPROVED',
        nationality: 'US',
        netWorthRange: 'RANGE_500K_1M',
        pepStatus: 'NONE',
        phoneNumber: '+14155551234',
        purposeOfAccount: 'CONTRACTOR_PAYOUTS',
        purposeOfAccountOtherDescription: 'Household budgeting between spouses',
        sourceOfFundsCategories: ['SALARY'],
        sourceOfFundsOtherDescription: 'Contest winnings',
        sourceOfWealthCategories: ['SALARY', 'INVESTMENTS'],
        sourceOfWealthOtherDescription: 'Royalty income from published works',
        taxIdCountryOfIssuance: 'US',
        taxIdentifier: '123-45-6789',
        taxIdType: 'SSN',
        umaAddress: '$john.doe@uma.domain.com',
      },
      'Grid-Wallet-Signature':
        'eyJwdWJsaWNLZXkiOiIwMmExYjIuLi4iLCJzY2hlbWUiOiJTSUdOQVRVUkVfU0NIRU1FX1RLX0FQSV9QMjU2Iiwic2lnbmF0dXJlIjoiMzA0NTAyMjEwMC4uLiJ9',
      'Request-Id': 'Request:019542f5-b3e7-1d02-0000-000000000010',
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
  test.skip('createKYCLink', async () => {
    const responsePromise = client.customers.createKYCLink('customerId');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('createKYCLink: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.customers.createKYCLink(
        'customerId',
        {
          KycLinkCreateRequest: { redirectUri: 'https://app.example.com/onboarding/completed' },
          'Idempotency-Key': '<uuid>',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(LightsparkGrid.NotFoundError);
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
        'eyJwdWJsaWNLZXkiOiIwMmExYjIuLi4iLCJzY2hlbWUiOiJTSUdOQVRVUkVfU0NIRU1FX1RLX0FQSV9QMjU2Iiwic2lnbmF0dXJlIjoiMzA0NTAyMjEwMC4uLiJ9',
      'Request-Id': 'Request:7c4a8d09-ca37-4e3e-9e0d-8c2b3e9a1f21',
    });
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
  test.skip('retrieveEndUserTerms', async () => {
    const responsePromise = client.customers.retrieveEndUserTerms();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('updateInternalAccount: only required params', async () => {
    const responsePromise = client.customers.updateInternalAccount(
      'InternalAccount:019542f5-b3e7-1d02-0000-000000000002',
      { InternalAccountUpdateRequest: {} },
    );
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('updateInternalAccount: required and optional params', async () => {
    const response = await client.customers.updateInternalAccount(
      'InternalAccount:019542f5-b3e7-1d02-0000-000000000002',
      {
        InternalAccountUpdateRequest: { privateEnabled: true },
        'Grid-Wallet-Signature':
          'eyJwdWJsaWNLZXkiOiIwMmExYjIuLi4iLCJzY2hlbWUiOiJTSUdOQVRVUkVfU0NIRU1FX1RLX0FQSV9QMjU2Iiwic2lnbmF0dXJlIjoiMzA0NTAyMjEwMC4uLiJ9',
        'Request-Id': 'Request:019542f5-b3e7-1d02-0000-000000000010',
      },
    );
  });
});
