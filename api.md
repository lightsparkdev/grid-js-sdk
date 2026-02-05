# Config

Types:

- <code><a href="./src/resources/config.ts">CustomerInfoFieldName</a></code>
- <code><a href="./src/resources/config.ts">PlatformConfig</a></code>
- <code><a href="./src/resources/config.ts">PlatformCurrencyConfig</a></code>

Methods:

- <code title="get /config">client.config.<a href="./src/resources/config.ts">retrieve</a>() -> PlatformConfig</code>
- <code title="patch /config">client.config.<a href="./src/resources/config.ts">update</a>({ ...params }) -> PlatformConfig</code>

# Customers

Types:

- <code><a href="./src/resources/customers/customers.ts">Address</a></code>
- <code><a href="./src/resources/customers/customers.ts">BusinessCustomer</a></code>
- <code><a href="./src/resources/customers/customers.ts">BusinessCustomerFields</a></code>
- <code><a href="./src/resources/customers/customers.ts">BusinessInfo</a></code>
- <code><a href="./src/resources/customers/customers.ts">Customer</a></code>
- <code><a href="./src/resources/customers/customers.ts">CustomerCreate</a></code>
- <code><a href="./src/resources/customers/customers.ts">CustomerOneOf</a></code>
- <code><a href="./src/resources/customers/customers.ts">CustomerType</a></code>
- <code><a href="./src/resources/customers/customers.ts">CustomerUpdate</a></code>
- <code><a href="./src/resources/customers/customers.ts">IndividualCustomer</a></code>
- <code><a href="./src/resources/customers/customers.ts">IndividualCustomerFields</a></code>
- <code><a href="./src/resources/customers/customers.ts">UltimateBeneficialOwner</a></code>
- <code><a href="./src/resources/customers/customers.ts">CustomerRetrieveResponse</a></code>
- <code><a href="./src/resources/customers/customers.ts">CustomerUpdateResponse</a></code>
- <code><a href="./src/resources/customers/customers.ts">CustomerDeleteResponse</a></code>
- <code><a href="./src/resources/customers/customers.ts">CustomerGetKYCLinkResponse</a></code>

Methods:

- <code title="post /customers">client.customers.<a href="./src/resources/customers/customers.ts">create</a>({ ...params }) -> CustomerOneOf</code>
- <code title="get /customers/{customerId}">client.customers.<a href="./src/resources/customers/customers.ts">retrieve</a>(customerID) -> CustomerRetrieveResponse</code>
- <code title="patch /customers/{customerId}">client.customers.<a href="./src/resources/customers/customers.ts">update</a>(customerID, { ...params }) -> CustomerUpdateResponse</code>
- <code title="get /customers">client.customers.<a href="./src/resources/customers/customers.ts">list</a>({ ...params }) -> CustomerOneovesDefaultPagination</code>
- <code title="delete /customers/{customerId}">client.customers.<a href="./src/resources/customers/customers.ts">delete</a>(customerID) -> CustomerDeleteResponse</code>
- <code title="get /customers/kyc-link">client.customers.<a href="./src/resources/customers/customers.ts">getKYCLink</a>({ ...params }) -> CustomerGetKYCLinkResponse</code>
- <code title="get /customers/internal-accounts">client.customers.<a href="./src/resources/customers/customers.ts">listInternalAccounts</a>({ ...params }) -> InternalAccountsDefaultPagination</code>

## ExternalAccounts

Types:

- <code><a href="./src/resources/customers/external-accounts.ts">BaseBeneficiary</a></code>
- <code><a href="./src/resources/customers/external-accounts.ts">BaseExternalAccountInfo</a></code>
- <code><a href="./src/resources/customers/external-accounts.ts">BaseWalletInfo</a></code>
- <code><a href="./src/resources/customers/external-accounts.ts">BeneficiaryOneOf</a></code>
- <code><a href="./src/resources/customers/external-accounts.ts">BusinessBeneficiary</a></code>
- <code><a href="./src/resources/customers/external-accounts.ts">ClabeAccountInfo</a></code>
- <code><a href="./src/resources/customers/external-accounts.ts">ExternalAccount</a></code>
- <code><a href="./src/resources/customers/external-accounts.ts">ExternalAccountCreate</a></code>
- <code><a href="./src/resources/customers/external-accounts.ts">ExternalAccountInfoOneOf</a></code>
- <code><a href="./src/resources/customers/external-accounts.ts">IbanAccountInfo</a></code>
- <code><a href="./src/resources/customers/external-accounts.ts">IndividualBeneficiary</a></code>
- <code><a href="./src/resources/customers/external-accounts.ts">LightningExternalAccountInfo</a></code>
- <code><a href="./src/resources/customers/external-accounts.ts">NgnAccountExternalAccountInfo</a></code>
- <code><a href="./src/resources/customers/external-accounts.ts">PixAccountInfo</a></code>
- <code><a href="./src/resources/customers/external-accounts.ts">PolygonWalletInfo</a></code>
- <code><a href="./src/resources/customers/external-accounts.ts">SolanaWalletInfo</a></code>
- <code><a href="./src/resources/customers/external-accounts.ts">SparkWalletInfo</a></code>
- <code><a href="./src/resources/customers/external-accounts.ts">TronWalletInfo</a></code>
- <code><a href="./src/resources/customers/external-accounts.ts">UpiAccountInfo</a></code>
- <code><a href="./src/resources/customers/external-accounts.ts">UsAccountInfo</a></code>

Methods:

- <code title="post /customers/external-accounts">client.customers.externalAccounts.<a href="./src/resources/customers/external-accounts.ts">create</a>({ ...params }) -> ExternalAccount</code>
- <code title="get /customers/external-accounts">client.customers.externalAccounts.<a href="./src/resources/customers/external-accounts.ts">list</a>({ ...params }) -> ExternalAccountsDefaultPagination</code>

## Bulk

Types:

- <code><a href="./src/resources/customers/bulk.ts">BulkGetJobStatusResponse</a></code>
- <code><a href="./src/resources/customers/bulk.ts">BulkUploadCsvResponse</a></code>

Methods:

- <code title="get /customers/bulk/jobs/{jobId}">client.customers.bulk.<a href="./src/resources/customers/bulk.ts">getJobStatus</a>(jobID) -> BulkGetJobStatusResponse</code>
- <code title="post /customers/bulk/csv">client.customers.bulk.<a href="./src/resources/customers/bulk.ts">uploadCsv</a>({ ...params }) -> BulkUploadCsvResponse</code>

# Platform

Types:

- <code><a href="./src/resources/platform/platform.ts">PlatformListInternalAccountsResponse</a></code>

Methods:

- <code title="get /platform/internal-accounts">client.platform.<a href="./src/resources/platform/platform.ts">listInternalAccounts</a>({ ...params }) -> PlatformListInternalAccountsResponse</code>

## ExternalAccounts

Types:

- <code><a href="./src/resources/platform/external-accounts.ts">ExternalAccountListResponse</a></code>

Methods:

- <code title="post /platform/external-accounts">client.platform.externalAccounts.<a href="./src/resources/platform/external-accounts.ts">create</a>({ ...params }) -> ExternalAccount</code>
- <code title="get /platform/external-accounts">client.platform.externalAccounts.<a href="./src/resources/platform/external-accounts.ts">list</a>({ ...params }) -> ExternalAccountListResponse</code>

# Plaid

Types:

- <code><a href="./src/resources/plaid.ts">PlaidCreateLinkTokenResponse</a></code>

Methods:

- <code title="post /plaid/link-tokens">client.plaid.<a href="./src/resources/plaid.ts">createLinkToken</a>({ ...params }) -> PlaidCreateLinkTokenResponse</code>
- <code title="post /plaid/callback/{plaid_link_token}">client.plaid.<a href="./src/resources/plaid.ts">submitPublicToken</a>(plaidLinkToken, { ...params }) -> ExternalAccount</code>

# TransferIn

Types:

- <code><a href="./src/resources/transfer-in.ts">BaseTransactionDestination</a></code>
- <code><a href="./src/resources/transfer-in.ts">Transaction</a></code>

Methods:

- <code title="post /transfer-in">client.transferIn.<a href="./src/resources/transfer-in.ts">create</a>({ ...params }) -> Transaction</code>

# TransferOut

Methods:

- <code title="post /transfer-out">client.transferOut.<a href="./src/resources/transfer-out.ts">create</a>({ ...params }) -> Transaction</code>

# Receiver

Types:

- <code><a href="./src/resources/receiver.ts">CounterpartyFieldDefinition</a></code>
- <code><a href="./src/resources/receiver.ts">LookupResponse</a></code>
- <code><a href="./src/resources/receiver.ts">ReceiverLookupExternalAccountResponse</a></code>
- <code><a href="./src/resources/receiver.ts">ReceiverLookupUmaResponse</a></code>

Methods:

- <code title="get /receiver/external-account/{accountId}">client.receiver.<a href="./src/resources/receiver.ts">lookupExternalAccount</a>(accountID, { ...params }) -> ReceiverLookupExternalAccountResponse</code>
- <code title="get /receiver/uma/{receiverUmaAddress}">client.receiver.<a href="./src/resources/receiver.ts">lookupUma</a>(receiverUmaAddress, { ...params }) -> ReceiverLookupUmaResponse</code>

# Quotes

Types:

- <code><a href="./src/resources/quotes.ts">BaseDestination</a></code>
- <code><a href="./src/resources/quotes.ts">BasePaymentAccountInfo</a></code>
- <code><a href="./src/resources/quotes.ts">BaseQuoteSource</a></code>
- <code><a href="./src/resources/quotes.ts">Currency</a></code>
- <code><a href="./src/resources/quotes.ts">OutgoingRateDetails</a></code>
- <code><a href="./src/resources/quotes.ts">PaymentInstructions</a></code>
- <code><a href="./src/resources/quotes.ts">Quote</a></code>
- <code><a href="./src/resources/quotes.ts">QuoteDestinationOneOf</a></code>
- <code><a href="./src/resources/quotes.ts">QuoteSourceOneOf</a></code>

Methods:

- <code title="post /quotes">client.quotes.<a href="./src/resources/quotes.ts">create</a>({ ...params }) -> Quote</code>
- <code title="get /quotes/{quoteId}">client.quotes.<a href="./src/resources/quotes.ts">retrieve</a>(quoteID) -> Quote</code>
- <code title="get /quotes">client.quotes.<a href="./src/resources/quotes.ts">list</a>({ ...params }) -> QuotesDefaultPagination</code>
- <code title="post /quotes/{quoteId}/execute">client.quotes.<a href="./src/resources/quotes.ts">execute</a>(quoteID) -> Quote</code>

# Transactions

Types:

- <code><a href="./src/resources/transactions.ts">BaseTransactionSource</a></code>
- <code><a href="./src/resources/transactions.ts">IncomingTransaction</a></code>
- <code><a href="./src/resources/transactions.ts">TransactionSourceOneOf</a></code>
- <code><a href="./src/resources/transactions.ts">TransactionStatus</a></code>
- <code><a href="./src/resources/transactions.ts">TransactionType</a></code>

Methods:

- <code title="get /transactions/{transactionId}">client.transactions.<a href="./src/resources/transactions.ts">retrieve</a>(transactionID) -> Transaction</code>
- <code title="get /transactions">client.transactions.<a href="./src/resources/transactions.ts">list</a>({ ...params }) -> TransactionsDefaultPagination</code>
- <code title="post /transactions/{transactionId}/approve">client.transactions.<a href="./src/resources/transactions.ts">approve</a>(transactionID, { ...params }) -> IncomingTransaction</code>
- <code title="post /transactions/{transactionId}/reject">client.transactions.<a href="./src/resources/transactions.ts">reject</a>(transactionID, { ...params }) -> IncomingTransaction</code>

# Webhooks

Types:

- <code><a href="./src/resources/webhooks.ts">WebhookSendTestResponse</a></code>

Methods:

- <code title="post /webhooks/test">client.webhooks.<a href="./src/resources/webhooks.ts">sendTest</a>() -> WebhookSendTestResponse</code>

# Invitations

Types:

- <code><a href="./src/resources/invitations.ts">CurrencyAmount</a></code>
- <code><a href="./src/resources/invitations.ts">UmaInvitation</a></code>

Methods:

- <code title="post /invitations">client.invitations.<a href="./src/resources/invitations.ts">create</a>({ ...params }) -> UmaInvitation</code>
- <code title="get /invitations/{invitationCode}">client.invitations.<a href="./src/resources/invitations.ts">retrieve</a>(invitationCode) -> UmaInvitation</code>
- <code title="post /invitations/{invitationCode}/cancel">client.invitations.<a href="./src/resources/invitations.ts">cancel</a>(invitationCode) -> UmaInvitation</code>
- <code title="post /invitations/{invitationCode}/claim">client.invitations.<a href="./src/resources/invitations.ts">claim</a>(invitationCode, { ...params }) -> UmaInvitation</code>

# Sandbox

Types:

- <code><a href="./src/resources/sandbox/sandbox.ts">SandboxSendFundsResponse</a></code>

Methods:

- <code title="post /sandbox/send">client.sandbox.<a href="./src/resources/sandbox/sandbox.ts">sendFunds</a>({ ...params }) -> SandboxSendFundsResponse</code>

## Uma

Methods:

- <code title="post /sandbox/uma/receive">client.sandbox.uma.<a href="./src/resources/sandbox/uma.ts">receivePayment</a>({ ...params }) -> IncomingTransaction</code>

## InternalAccounts

Types:

- <code><a href="./src/resources/sandbox/internal-accounts.ts">InternalAccount</a></code>

Methods:

- <code title="post /sandbox/internal-accounts/{accountId}/fund">client.sandbox.internalAccounts.<a href="./src/resources/sandbox/internal-accounts.ts">fund</a>(accountID, { ...params }) -> InternalAccount</code>

# UmaProviders

Types:

- <code><a href="./src/resources/uma-providers.ts">UmaProviderListResponse</a></code>

Methods:

- <code title="get /uma-providers">client.umaProviders.<a href="./src/resources/uma-providers.ts">list</a>({ ...params }) -> UmaProviderListResponsesDefaultPagination</code>

# Tokens

Types:

- <code><a href="./src/resources/tokens.ts">APIToken</a></code>
- <code><a href="./src/resources/tokens.ts">Permission</a></code>

Methods:

- <code title="post /tokens">client.tokens.<a href="./src/resources/tokens.ts">create</a>({ ...params }) -> APIToken</code>
- <code title="get /tokens/{tokenId}">client.tokens.<a href="./src/resources/tokens.ts">retrieve</a>(tokenID) -> APIToken</code>
- <code title="get /tokens">client.tokens.<a href="./src/resources/tokens.ts">list</a>({ ...params }) -> APITokensDefaultPagination</code>
- <code title="delete /tokens/{tokenId}">client.tokens.<a href="./src/resources/tokens.ts">delete</a>(tokenID) -> void</code>
