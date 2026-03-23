// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import LightsparkGrid from '@lightsparkdev/grid';

const client = new LightsparkGrid({
  username: 'My Username',
  password: 'My Password',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource beneficialOwners', () => {
  // Mock server tests are disabled
  test.skip('create: only required params', async () => {
    const responsePromise = client.beneficialOwners.create({
      customerId: 'Customer:019542f5-b3e7-1d02-0000-000000000001',
      ownershipPercentage: 51,
      personalInfo: {
        address: {
          country: 'US',
          line1: '123 Main Street',
          postalCode: '94105',
        },
        birthDate: '1978-06-15',
        firstName: 'Jane',
        identifier: '123-45-6789',
        idType: 'SSN',
        lastName: 'Smith',
        nationality: 'US',
      },
      roles: ['UBO', 'DIRECTOR'],
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
    const response = await client.beneficialOwners.create({
      customerId: 'Customer:019542f5-b3e7-1d02-0000-000000000001',
      ownershipPercentage: 51,
      personalInfo: {
        address: {
          country: 'US',
          line1: '123 Main Street',
          postalCode: '94105',
          city: 'San Francisco',
          line2: 'Apt 4B',
          state: 'CA',
        },
        birthDate: '1978-06-15',
        firstName: 'Jane',
        identifier: '123-45-6789',
        idType: 'SSN',
        lastName: 'Smith',
        nationality: 'US',
        countryOfIssuance: 'US',
        email: 'jane.smith@acmecorp.com',
        middleName: 'Marie',
        phoneNumber: '+14155550192',
      },
      roles: ['UBO', 'DIRECTOR'],
    });
  });

  // Mock server tests are disabled
  test.skip('retrieve', async () => {
    const responsePromise = client.beneficialOwners.retrieve('beneficialOwnerId');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('update', async () => {
    const responsePromise = client.beneficialOwners.update('beneficialOwnerId', {});
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
    const responsePromise = client.beneficialOwners.list();
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
      client.beneficialOwners.list(
        {
          cursor: 'cursor',
          customerId: 'customerId',
          limit: 1,
          role: 'UBO',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(LightsparkGrid.NotFoundError);
  });
});
