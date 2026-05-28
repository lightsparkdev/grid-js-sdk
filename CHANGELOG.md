# Changelog

## 1.8.0 (2026-05-28)

Full Changelog: [v1.7.1...v1.8.0](https://github.com/lightsparkdev/grid-js-sdk/compare/v1.7.1...v1.8.0)

### Features

* [kyb] require tax_id and incorporated_on for business customers ([0261b0b](https://github.com/lightsparkdev/grid-js-sdk/commit/0261b0bbde5f4cdfcbb290f509d0256514bbef52))
* Add SLV_ACCOUNT external-account type for El Salvador ([42d8f83](https://github.com/lightsparkdev/grid-js-sdk/commit/42d8f83a11aa0b7563e7a3640b36cf0619360893))
* Add swift as new payment rail option ([8a71441](https://github.com/lightsparkdev/grid-js-sdk/commit/8a7144166eb09c090a013876eedc7cb871836fa9))
* **api:** add agents resource, device codes, me namespace, agentId to transactions ([4e14ef7](https://github.com/lightsparkdev/grid-js-sdk/commit/4e14ef7e1df416ac9180ae56d64008e6af86d59d))
* **api:** add cards resource, sandbox card simulate, card webhooks ([6b671db](https://github.com/lightsparkdev/grid-js-sdk/commit/6b671db01e511eb1dd4d8a45c10f2d122bfabf4c))
* **api:** add credentialId and type fields to passkey auth challenge response ([6a31162](https://github.com/lightsparkdev/grid-js-sdk/commit/6a31162b60f8b1b9dce4096c4d48153b6e67f27d))
* **api:** add credentialId field to passkey response in auth.credentials.list ([e95b556](https://github.com/lightsparkdev/grid-js-sdk/commit/e95b556c67f554172372966ca0025517b00ac2b3))
* **api:** add document and bank fields to Colombian Peso external accounts ([bbbca1e](https://github.com/lightsparkdev/grid-js-sdk/commit/bbbca1e2f82cc08cae7684ee9abe6cb2319fe1e4))
* **api:** add document type enum values to documents resource ([be789de](https://github.com/lightsparkdev/grid-js-sdk/commit/be789de7b9b7b0349d9405ce3fb4241a4e0704dc))
* **api:** add embeddedWalletConfig parameter and field to config ([d8233c3](https://github.com/lightsparkdev/grid-js-sdk/commit/d8233c37bf022d496034b8a46e5462f18eae94dc))
* **api:** add Grid-Wallet-Signature and Request-Id headers to customers.update ([5c55afe](https://github.com/lightsparkdev/grid-js-sdk/commit/5c55afe84dce41244ce47c1851847b05230097b1))
* **api:** add issueChallenge/verifyChallenge to auth sessions ([2579159](https://github.com/lightsparkdev/grid-js-sdk/commit/25791596e062f6b298264705a2d9fba2ff57ba77))
* **api:** add issuingAuthority field to beneficial owners personalInfo ([bfb48fc](https://github.com/lightsparkdev/grid-js-sdk/commit/bfb48fc31901e3ad02620de3c58b4634d065a1db))
* **api:** add issuingAuthority parameter and field to documents ([d0b2e92](https://github.com/lightsparkdev/grid-js-sdk/commit/d0b2e9251ca2e97d693c327b73a103f8d9cdd143))
* **api:** add pagination to platform.externalAccounts.list ([9bf7e0e](https://github.com/lightsparkdev/grid-js-sdk/commit/9bf7e0eaf009aa3ac5e3eb2872190020a332a46e))
* **api:** add status field to internal account responses ([9bd1baa](https://github.com/lightsparkdev/grid-js-sdk/commit/9bd1baa6d9f026fc0f38c5d89f0cc13845c46bdc))
* **api:** add SWIFT account type to external accounts ([8ccd1b7](https://github.com/lightsparkdev/grid-js-sdk/commit/8ccd1b76d879a1611b486cc2f00ab0644ac38dcc))
* **api:** add updateEmail method to customers ([7be958f](https://github.com/lightsparkdev/grid-js-sdk/commit/7be958f1c6aecd2d0be49fb75c40279a57afcd31))
* **api:** add updateWalletPrivacy method to customers ([8ea8d04](https://github.com/lightsparkdev/grid-js-sdk/commit/8ea8d043672ddd53ac645740dc839de61524ed1a))
* **api:** manual updates ([53b4968](https://github.com/lightsparkdev/grid-js-sdk/commit/53b4968e2db73eee24191d9015f2f0b0fa0e3839))
* **api:** manual updates ([0927acc](https://github.com/lightsparkdev/grid-js-sdk/commit/0927accac0e1c5e21268df83f544c9c343934ddb))
* **api:** manual updates ([9256000](https://github.com/lightsparkdev/grid-js-sdk/commit/92560005cb24dc0c35e52d801c50941dbad85977))
* **api:** manual updates ([5a8cc62](https://github.com/lightsparkdev/grid-js-sdk/commit/5a8cc626f06dea4708ab542e81fec9c1038b4a8c))
* **api:** manual updates ([1c85ff8](https://github.com/lightsparkdev/grid-js-sdk/commit/1c85ff83e6625e78a47a4c916d8ae1e078a36fe4))
* **api:** manual updates ([b9bc604](https://github.com/lightsparkdev/grid-js-sdk/commit/b9bc6044e18e4c23d5a5e5090556421881723fe7))
* **api:** manual updates ([75b8b7b](https://github.com/lightsparkdev/grid-js-sdk/commit/75b8b7b501e166cb40cbd679fcb00e874542f04e))
* **api:** manual updates ([f2a9dd9](https://github.com/lightsparkdev/grid-js-sdk/commit/f2a9dd93a9ad1c84d55beb6a9039f1be58ec5d9d))
* **api:** manual updates ([0d59c22](https://github.com/lightsparkdev/grid-js-sdk/commit/0d59c223b8ac4d3b36dc668550ffb4e283d75a85))
* **api:** manual updates ([054bc41](https://github.com/lightsparkdev/grid-js-sdk/commit/054bc41732dab4d791b2ae981e790f3022593ca0))
* **api:** manual updates ([f9bf31f](https://github.com/lightsparkdev/grid-js-sdk/commit/f9bf31f92488b80c4a39dc2e7e55adf0ed57e8db))
* **api:** manual updates ([96f1271](https://github.com/lightsparkdev/grid-js-sdk/commit/96f12716736bfbda35e2348513ac35e1fab3c5b4))
* **api:** manual updates ([75b2ad9](https://github.com/lightsparkdev/grid-js-sdk/commit/75b2ad9ec64aa6496c6f2e158a371c67339d0ddf))
* **api:** manual updates ([b9a0cad](https://github.com/lightsparkdev/grid-js-sdk/commit/b9a0cad025b82396a7a8286f09d36e0cee3c6bf9))
* **api:** manual updates ([3793af3](https://github.com/lightsparkdev/grid-js-sdk/commit/3793af3229ccc1dc3750849c46563a379048a14a))
* Replace grid.lightspark.com with docs.lightspark.com ([dca9391](https://github.com/lightsparkdev/grid-js-sdk/commit/dca9391b3262ea667dea2b85525f84e5ecc63039))
* **types:** add BusinessInfo interface definition to customers ([8e18059](https://github.com/lightsparkdev/grid-js-sdk/commit/8e18059c8b7d20009a784b2e2cb222c11068c99f))
* Update cryptoNetwork values ([6908f84](https://github.com/lightsparkdev/grid-js-sdk/commit/6908f84f91dafb07202d0f29a9bac290aed89924))


### Bug Fixes

* **api:** remove cryptoNetwork field from external accounts ([64072cd](https://github.com/lightsparkdev/grid-js-sdk/commit/64072cdf999803c37e1c1061e2b8bcd888fb5a93))
* **types:** add mobile money to COP accounts, make AED address required ([1adbf8c](https://github.com/lightsparkdev/grid-js-sdk/commit/1adbf8c35aaf0a6fb11b000882f358fb09245da9))
* **types:** make clientPublicKey required in EmailOtpCredentialVerifyRequest ([a15ca2e](https://github.com/lightsparkdev/grid-js-sdk/commit/a15ca2e64a42a7e8271e61a9fdab81a196b444ae))
* **types:** make countryOfResidence optional, phoneNumber required in beneficiary types ([2fb820d](https://github.com/lightsparkdev/grid-js-sdk/commit/2fb820dba2d0b849fd47149d878a035e3f995153))
* **types:** make documentNumber/issuingAuthority optional, remove identity variants in documents ([36917b3](https://github.com/lightsparkdev/grid-js-sdk/commit/36917b39823d5098c3aef5ccfe44f017e7b061b5))
* **types:** make fields optional in BDT/GHS/PKR account types ([75b1675](https://github.com/lightsparkdev/grid-js-sdk/commit/75b1675f61d88b0657e36f8b4e3fe569dd0b1eda))
* **types:** remove issuingAuthority from beneficial owners ([4dd5d1f](https://github.com/lightsparkdev/grid-js-sdk/commit/4dd5d1f6f596a2e593a72dbc8e74efff9cefd2ef))
* **types:** update BDT/GHS/GTQ/HTG/JMD/PKR account and beneficiary types ([f21102a](https://github.com/lightsparkdev/grid-js-sdk/commit/f21102a8d02c768d927a02b67b82657cf9d27674))


### Chores

* **api:** remove update method from auth.credentials ([c50af96](https://github.com/lightsparkdev/grid-js-sdk/commit/c50af962fae54d9de5fbd1dedefbff81975bf3d6))
* avoid formatting file that gets changed during releases ([76ae105](https://github.com/lightsparkdev/grid-js-sdk/commit/76ae105e8416d30d5c19b8515552e52620bd04f2))
* configure new SDK language ([9ed5e41](https://github.com/lightsparkdev/grid-js-sdk/commit/9ed5e4172a69d2d8ff942b3f653a797665a77aae))
* configure new SDK language ([5646c8c](https://github.com/lightsparkdev/grid-js-sdk/commit/5646c8c96df0fdcf02214a05484d491535c90a96))
* configure new SDK language ([3ae1b50](https://github.com/lightsparkdev/grid-js-sdk/commit/3ae1b502122683a3255c3358498623bd3ea6e052))
* configure new SDK language ([f7809e7](https://github.com/lightsparkdev/grid-js-sdk/commit/f7809e7c28ae5e4c0cf50701bd56ebbed65d6279))
* configure new SDK language ([7d2d75d](https://github.com/lightsparkdev/grid-js-sdk/commit/7d2d75dd533ab942f88570991ab842373314a573))
* **format:** run eslint and prettier separately ([7f042f3](https://github.com/lightsparkdev/grid-js-sdk/commit/7f042f33f721a05e26f66da079892dc6b33994f3))
* **internal:** codegen related update ([db96399](https://github.com/lightsparkdev/grid-js-sdk/commit/db96399fa38625a48035b33625b3eda7192d6a98))
* **internal:** codegen related update ([e3444b4](https://github.com/lightsparkdev/grid-js-sdk/commit/e3444b43c1a0f8b04bc6a39b864ebac19012bc8a))
* **internal:** regenerate SDK with no functional changes ([9394744](https://github.com/lightsparkdev/grid-js-sdk/commit/9394744e44bdc46b27ecba3eb16189b421276849))
* **internal:** regenerate SDK with no functional changes ([d2499b2](https://github.com/lightsparkdev/grid-js-sdk/commit/d2499b22753caa666eb5b797160b5da2604f9051))
* redact api-key headers in debug logs ([5e0267e](https://github.com/lightsparkdev/grid-js-sdk/commit/5e0267e95919a5b6f6c765f21440b2dc9f4947fc))
* **tests:** update Request-Id header format in auth test fixtures ([986353c](https://github.com/lightsparkdev/grid-js-sdk/commit/986353c2e69ae3e03c2cc86464a6910b51b9a6cb))


### Documentation

* **api:** clarify nickname validation in auth credentials ([1eedd88](https://github.com/lightsparkdev/grid-js-sdk/commit/1eedd88be81fa1bbf8defcba7479d29afc6d430c))
* **api:** clarify OAUTH credential challenge behavior in auth.credentials ([21c1a37](https://github.com/lightsparkdev/grid-js-sdk/commit/21c1a37b08adf1791280d1352f3a2bbf1d6708fa))
* **api:** clarify passkey credential limits in auth.credentials ([7f7969a](https://github.com/lightsparkdev/grid-js-sdk/commit/7f7969ad8fa1c75c834ba524b4f64ab5390067e3))
* **api:** clarify Request-Id header format across auth and customers ([05ad798](https://github.com/lightsparkdev/grid-js-sdk/commit/05ad7983a8f6deff594224b2a1bd875ea99cd2d7))
* **api:** remove OTHER from documentType enum documentation in documents ([6bd7355](https://github.com/lightsparkdev/grid-js-sdk/commit/6bd7355fc324659f22a1001e91c83feb1e67521c))
* **api:** update auth credentials method descriptions ([0a252eb](https://github.com/lightsparkdev/grid-js-sdk/commit/0a252eb9a8bdef3280b3836407aabf214d0ed2eb))
* **api:** update auth.sessions.delete and Quote.expiresAt descriptions ([34bd3bc](https://github.com/lightsparkdev/grid-js-sdk/commit/34bd3bcbafa20e7f94e21edf47625f7cea61abd1))
* **api:** update endpoint references in agents.me transfer and quote methods ([8b42438](https://github.com/lightsparkdev/grid-js-sdk/commit/8b4243825baa545d8402b0b9b9a9d4d2e273d488))
* **api:** update Grid-Wallet-Signature documentation to clarify Turnkey stamp format ([c7cdf9f](https://github.com/lightsparkdev/grid-js-sdk/commit/c7cdf9f5b02bf3d346856ec99fe52459a47c9a01))
* **api:** update OAuth token requirements in auth credentials ([f74643f](https://github.com/lightsparkdev/grid-js-sdk/commit/f74643f521eaa49a026231cdbdd8dfb750670024))
* clarify forwards compat behavior ([e379a52](https://github.com/lightsparkdev/grid-js-sdk/commit/e379a52c805d530c1c1950594548a00ebb04438a))
* **documents:** split document upload by identity vs non-identity ([755b9d8](https://github.com/lightsparkdev/grid-js-sdk/commit/755b9d8d2fb0b4c667c860ba2b73866ad75da00a))
* sync country coverage with Grid Switch Corridor List ([8ee7c32](https://github.com/lightsparkdev/grid-js-sdk/commit/8ee7c320b09a1e1f33c983bfa2eb987029e6d5c5))
* update http mcp docs ([cb382bb](https://github.com/lightsparkdev/grid-js-sdk/commit/cb382bbd94722bba4c5c46059ad4563d5771e8d8))
* update logging docs ([e871d63](https://github.com/lightsparkdev/grid-js-sdk/commit/e871d634610ccf9046d02c5c553a2445595cc7da))
* update with proxy auth info ([b3e8864](https://github.com/lightsparkdev/grid-js-sdk/commit/b3e8864a570272cad87b73fd4bd4cb6dbed25b84))

## 1.7.1 (2026-04-28)

Full Changelog: [v1.7.0...v1.7.1](https://github.com/lightsparkdev/grid-js-sdk/compare/v1.7.0...v1.7.1)

### Features

* **api:** add clientPublicKey param to auth credentials resendChallenge ([a8144cd](https://github.com/lightsparkdev/grid-js-sdk/commit/a8144cd19d32e4c3e9470f62de7a76f8441944ea))
* support setting headers via env ([b51ca4e](https://github.com/lightsparkdev/grid-js-sdk/commit/b51ca4e0ea178ad63db2c542c7eb48493b779821))


### Bug Fixes

* **types:** make clientPublicKey optional in auth credential verify requests ([36100d4](https://github.com/lightsparkdev/grid-js-sdk/commit/36100d4c8ccd12747a993ac87fde845429c4a097))


### Chores

* **internal:** codegen related update ([0dbf593](https://github.com/lightsparkdev/grid-js-sdk/commit/0dbf593989f9f753c24312113b50cb16a417b9a4))
* restructure docs search code ([6ff3a06](https://github.com/lightsparkdev/grid-js-sdk/commit/6ff3a06166425bab7154ad5cba23ff36cd4f3d62))


### Documentation

* **api:** update signature docs to reference Turnkey API-key stamps ([2c939d2](https://github.com/lightsparkdev/grid-js-sdk/commit/2c939d211ae8a274113010fddf8be30285604a6a))
* **types:** update IBAN field descriptions for DKK/EGP/PKR account types ([b16d932](https://github.com/lightsparkdev/grid-js-sdk/commit/b16d93202fd0d1cc07bbd1bb5962234ae1abff81))

## 1.7.0 (2026-04-27)

Full Changelog: [v0.8.0...v1.7.0](https://github.com/lightsparkdev/grid-js-sdk/compare/v0.8.0...v1.7.0)

### Features

* add cryptoNetwork field to RealtimeFundingQuoteSource ([9ce712a](https://github.com/lightsparkdev/grid-js-sdk/commit/9ce712ae0affb9bba8af8c5476e8c4dd6916ecde))
* **api:** add accountIdentifier parameter to list transactions method ([8058f2a](https://github.com/lightsparkdev/grid-js-sdk/commit/8058f2a3e7f94d3c018dd8f6f69cf5b450aeb9f8))
* **api:** add AED/KES/MWK/RWF/TZS/UGX/XOF/ZAR/ZMW accounts, fix swiftBic→swiftCode ([f4ed6ea](https://github.com/lightsparkdev/grid-js-sdk/commit/f4ed6eaff277dfc7c863c1b1b4c02c140ccdeb04))
* **api:** add ARS account support to payment instructions ([e526cca](https://github.com/lightsparkdev/grid-js-sdk/commit/e526cca3dda14cc7870cc8c3611dbb5d544ca46a))
* **api:** add BDT/COP/EGP/GHS/GTQ/HTG/JMD/PKR accounts, remove registrationNumber, update USD types ([f6056c0](https://github.com/lightsparkdev/grid-js-sdk/commit/f6056c03a591f0f9578950b2ccabf9b2cd2dd9fc))
* **api:** add beneficialOwners/documents/verifications resources, update customer types ([b59117b](https://github.com/lightsparkdev/grid-js-sdk/commit/b59117b39c48747c930c489fe60aed81d615889d))
* **api:** add BWP/XAF account types, update XOF/MWK/UGX types in external-accounts/quotes ([95f0f00](https://github.com/lightsparkdev/grid-js-sdk/commit/95f0f006eb8b3aeafaf4155e078e0cab1ace9bcb))
* **api:** add category-specific verification error types to verifications/webhooks ([bbffd80](https://github.com/lightsparkdev/grid-js-sdk/commit/bbffd80baa89351a7d8385e3395abdeb43fa199c))
* **api:** add challenge/requestId/expiresAt to auth.credentials.resend_challenge response ([3eb5259](https://github.com/lightsparkdev/grid-js-sdk/commit/3eb52598a8323c901cf88f02abb747299d51af2e))
* **api:** add clientPublicKey parameter to internal_accounts export method ([84a0d4c](https://github.com/lightsparkdev/grid-js-sdk/commit/84a0d4cd6f28c75e2aa8745be0475a342f57a161))
* **api:** add COMPANY_LEGAL_NAME to CustomerInfoFieldName in config ([fec872f](https://github.com/lightsparkdev/grid-js-sdk/commit/fec872f2ba71d595e24c6b760ad152669b8e895d))
* **api:** add create/resendChallenge/verify methods to auth credentials ([8d13167](https://github.com/lightsparkdev/grid-js-sdk/commit/8d131671bfee7558b1e15fc9f316cd772345f21e))
* **api:** add create/verify methods to auth credentials ([a6d62d5](https://github.com/lightsparkdev/grid-js-sdk/commit/a6d62d52c7de7b39a08f980bbb82714a6a14a0ca))
* **api:** add crypto estimateWithdrawalFee endpoint and cryptoNetwork to external accounts ([f881d0d](https://github.com/lightsparkdev/grid-js-sdk/commit/f881d0de42a579ef6e198213e48d811a1a8a30da))
* **api:** add currencies and region fields/parameters to customers ([0e44244](https://github.com/lightsparkdev/grid-js-sdk/commit/0e442440e3c61b14b669328fd19dfe6d0c1fff52))
* **api:** add discoveries resource and list method ([b82f674](https://github.com/lightsparkdev/grid-js-sdk/commit/b82f67489d7ae0832838d6b4a21acd6890e2da4d))
* **api:** add email field to customers resource ([e1c2765](https://github.com/lightsparkdev/grid-js-sdk/commit/e1c276556f9e8c6574aeb5243119734c87577038))
* **api:** add Embedded Wallet payment type and signature parameter to quotes ([ac400cb](https://github.com/lightsparkdev/grid-js-sdk/commit/ac400cb379a259a4ecc57babc317914d99360a0b))
* **api:** add Ethereum wallet type to external-accounts and quotes ([edbd0fc](https://github.com/lightsparkdev/grid-js-sdk/commit/edbd0fcdedbcd982320b3f6a7c9653475c7accc6))
* **api:** add KYB webhooks/status, update webhook data types, restructure KYC status ([7785c66](https://github.com/lightsparkdev/grid-js-sdk/commit/7785c665c1799db72b721a1f6af75e0123629e0d))
* **api:** add list and revoke methods to auth credentials ([950f5e0](https://github.com/lightsparkdev/grid-js-sdk/commit/950f5e07690a3f11b5745209dd9c61a5a52bd384))
* **api:** add list method to auth.credentials ([ca77887](https://github.com/lightsparkdev/grid-js-sdk/commit/ca7788798ab6572fcedf0b7685eb04b9b3a30a7d))
* **api:** add list/revoke methods to credentials, sessions resource ([ab69ed4](https://github.com/lightsparkdev/grid-js-sdk/commit/ab69ed4851434b968d1ff66187b522a1390af1d2))
* **api:** add list/revoke to credentials, sessions resource, internalAccounts export ([ba1e083](https://github.com/lightsparkdev/grid-js-sdk/commit/ba1e0832fc91f47c9cc13bcd6abe0fa3a8a91c0f))
* **api:** add listSessions to auth, list/revoke to auth.credentials ([8ea73ff](https://github.com/lightsparkdev/grid-js-sdk/commit/8ea73ffc49bf76b29088b31b5c43cd30c3ceab50))
* **api:** add MWK/UGX/XOF account types, update RWF/TZS/ZMW providers in external accounts ([155de31](https://github.com/lightsparkdev/grid-js-sdk/commit/155de31295bb684078c264a27b37b6da5cd8ce4c))
* **api:** add oidcToken parameter to auth.credentials.create for OAuth ([df59965](https://github.com/lightsparkdev/grid-js-sdk/commit/df59965ae837306d26e223eb52674ffc2344eea4))
* **api:** add passkey credential type with attestation to auth credentials create ([cf45cd5](https://github.com/lightsparkdev/grid-js-sdk/commit/cf45cd5adad0165afa04920f9a9ca8ad71d69f4e))
* **api:** add passkey verification support to auth.credentials.verify ([7e5dd53](https://github.com/lightsparkdev/grid-js-sdk/commit/7e5dd532d394cc5ad8c5fbe7cdc9ee9d6e7ee9ae))
* **api:** add paymentRail field to quotes account destination ([4414787](https://github.com/lightsparkdev/grid-js-sdk/commit/4414787087f6c12ef1cbf772e7e3afe5fd930cee))
* **api:** add ready_for_verification status/event and error types to verifications ([391d5b9](https://github.com/lightsparkdev/grid-js-sdk/commit/391d5b9faec136f59c3b9df189ef6ce96c8b02bf))
* **api:** add resendChallenge method to auth.credentials ([56b243f](https://github.com/lightsparkdev/grid-js-sdk/commit/56b243fab3e8ef1d70625090ec7af48a066ce735))
* **api:** add retrieve/update/delete to customers/platform externalAccounts ([5f483e0](https://github.com/lightsparkdev/grid-js-sdk/commit/5f483e034919fc9a7e64cd42df8da5a7c2f19ee3))
* **api:** add session object to credential verify response ([0d45cdb](https://github.com/lightsparkdev/grid-js-sdk/commit/0d45cdb1e80f59f3a1e65ba851e4c018c6fb9854))
* **api:** add type field to InternalAccount ([b248988](https://github.com/lightsparkdev/grid-js-sdk/commit/b248988d4d4a1897c2e563c2354021a26d7abdb1))
* **api:** add type parameter to customers/platform listInternalAccounts ([1066d24](https://github.com/lightsparkdev/grid-js-sdk/commit/1066d24bec706855b88f46428e45adf52c3a9350))
* **api:** add VERTICAL value to CustomerInfoFieldName enum in config ([c7e278a](https://github.com/lightsparkdev/grid-js-sdk/commit/c7e278a2c9c5a017bbe552e8c7632e6e5fe57662))
* **api:** adding webhooks back in ([ee6500f](https://github.com/lightsparkdev/grid-js-sdk/commit/ee6500fa2e74780920067562b353e273afdc7af1))
* **api:** manual updates ([d3bf36a](https://github.com/lightsparkdev/grid-js-sdk/commit/d3bf36abf1e12471b083bb798df550625f1bd530))
* **api:** manual updates ([fb89985](https://github.com/lightsparkdev/grid-js-sdk/commit/fb89985e5bc517e3467706bdd93a5ecec17de85f))
* **api:** manual updates ([2b4f8f4](https://github.com/lightsparkdev/grid-js-sdk/commit/2b4f8f4d6013e511c884c35519d88e56db2f5c04))
* **api:** manual updates ([7d820e6](https://github.com/lightsparkdev/grid-js-sdk/commit/7d820e6afe955c3d6152eef5d3bda4cd491b7712))
* **api:** manual updates ([5dcbf19](https://github.com/lightsparkdev/grid-js-sdk/commit/5dcbf1937f2a78de72a055773bb2fdeba141e375))
* **api:** manual updates ([9c2e469](https://github.com/lightsparkdev/grid-js-sdk/commit/9c2e469dd87ab7d13bf47338e7afaea1cac0b0a0))
* **api:** manual updates ([195469c](https://github.com/lightsparkdev/grid-js-sdk/commit/195469c8b4a21a14391ea2d6d5e54f505b00ccb3))
* **api:** manual updates ([b823a95](https://github.com/lightsparkdev/grid-js-sdk/commit/b823a959b9d8ae2ed440200feff74dae995be224))
* **api:** manual updates ([f9c181c](https://github.com/lightsparkdev/grid-js-sdk/commit/f9c181c190611a9b639b49901be44a84c5e6dcb5))
* **api:** manual updates ([0bf0caf](https://github.com/lightsparkdev/grid-js-sdk/commit/0bf0caf7314b7a3951dedd1e4c89911a8a6ec690))
* **api:** manual updates ([b1ea625](https://github.com/lightsparkdev/grid-js-sdk/commit/b1ea6258fcd555bd5dee7f430acbba953a93008f))
* **api:** manual updates ([19d9bd9](https://github.com/lightsparkdev/grid-js-sdk/commit/19d9bd9b6b4350d533440279ce33bd410b90d0a5))
* **api:** manual updates ([9ed4efe](https://github.com/lightsparkdev/grid-js-sdk/commit/9ed4efe2877fd8bf5d2b57c71e0b82fa83d9c834))
* **api:** manual updates ([23517a4](https://github.com/lightsparkdev/grid-js-sdk/commit/23517a49b562f94fe623e48fcd2a62116bde9d6b))
* **api:** move counterpartyInformation to Quote from nested destination type ([02e9a14](https://github.com/lightsparkdev/grid-js-sdk/commit/02e9a146ffc03191814e10ae3ffb30d3259cee1d))
* **api:** move sendTest method from webhooks to sandbox.webhooks ([a7d4fa5](https://github.com/lightsparkdev/grid-js-sdk/commit/a7d4fa503f23864f097aa249fd9c6743a1ccfa6a))
* **api:** remove createLinkToken and submitPublicToken methods from plaid ([6dfe269](https://github.com/lightsparkdev/grid-js-sdk/commit/6dfe269b2989089c2b2d652bb2d3e26befe06c9c))
* **api:** remove list method from quotes ([3592f0c](https://github.com/lightsparkdev/grid-js-sdk/commit/3592f0ca3543330114b57d363b02f595321bd325))
* **api:** remove update method from customers/platform externalAccounts ([a2900af](https://github.com/lightsparkdev/grid-js-sdk/commit/a2900af2d5b8213e6635122c2962e4c07ac03b8c))
* **api:** restructure beneficial owner type in business customers ([fcd1b1a](https://github.com/lightsparkdev/grid-js-sdk/commit/fcd1b1a3645d581a5407ddcb95f14ff10bf5915e))
* **api:** update external account types for USD/COP/GTQ/BDT/EGP/GHS/JMD/PKR ([245d2a7](https://github.com/lightsparkdev/grid-js-sdk/commit/245d2a76ec85b3dd7c6be9b1360c2068c8bc8c64))
* fix mispelling of identification type enum ([2475930](https://github.com/lightsparkdev/grid-js-sdk/commit/24759305e81ca9788d2e399656f461748e0b5f87))
* Fix West African phone number validation pattern for Benin ([469ee04](https://github.com/lightsparkdev/grid-js-sdk/commit/469ee04f4e580fed150d2cd9ee20d3ac5dae87c4))
* Move timeout to refund reason ([9ba3d86](https://github.com/lightsparkdev/grid-js-sdk/commit/9ba3d863a71eb8e83291710c57a379a1809ef2a6))
* Split request and response schemas for external account paymentRails ([d0414f4](https://github.com/lightsparkdev/grid-js-sdk/commit/d0414f4069435889a2403ef1aeebe293fa0c5657))
* **types:** add PaymentBrlAccountInfo interface, update reference in PaymentInstructions ([20c547f](https://github.com/lightsparkdev/grid-js-sdk/commit/20c547fc69400db9aa5c1ad16f773bc89bb7e4d7))


### Bug Fixes

* **client:** preserve URL params already embedded in path ([8e2e01d](https://github.com/lightsparkdev/grid-js-sdk/commit/8e2e01d51f3abeaa61cca003f468ca39089b18d4))
* **internal:** gitignore generated `oidc` dir ([f1a47e6](https://github.com/lightsparkdev/grid-js-sdk/commit/f1a47e66b09b571fb49f301d23bfcd6b5fd0ffff))
* **types:** add bankName to BDT/EGP/GHS/GTQ/JMD/PKR, update USD/COP/GTQ requirements ([2bfab96](https://github.com/lightsparkdev/grid-js-sdk/commit/2bfab9677b43bb5b8c553c15d414ed4bd5f97618))
* **types:** correct field requirements in BDT/COP/EGP/GHS/GTQ/JMD/PKR/USD account types ([308496e](https://github.com/lightsparkdev/grid-js-sdk/commit/308496e03c1f85506a52d9768873c587c9103154))
* **types:** flatten personalIds, require ownershipPercentage in beneficial_owners ([1b8b8b2](https://github.com/lightsparkdev/grid-js-sdk/commit/1b8b8b2ae271bb9031429d69d2158a400cd0db72))
* **types:** make customerId required, remove role in beneficial_owners list ([bcde16a](https://github.com/lightsparkdev/grid-js-sdk/commit/bcde16a8ca487235f732aeeb3117d7c1378dcc5c))
* **types:** make platformCustomerId optional in customers ([9b479b1](https://github.com/lightsparkdev/grid-js-sdk/commit/9b479b153728bb10419c7430f3eec7b40dfc79c3))
* **types:** remove EXTERNAL_ACCOUNT_DETAILS destination from quote/transaction types ([7e95eea](https://github.com/lightsparkdev/grid-js-sdk/commit/7e95eea43bc91b0288cac23c8044afc9f8da314f))
* **types:** remove SENT status value from TransactionStatus ([9d98a5f](https://github.com/lightsparkdev/grid-js-sdk/commit/9d98a5fe95a05105b4b873022c3ead43f1d142ce))
* **types:** restructure beneficialOwners, flatten activity volumes, update field types in customers ([d8d1e77](https://github.com/lightsparkdev/grid-js-sdk/commit/d8d1e774a4f7710875c431a50a60e7f871042790))
* **types:** specify payment rail enum in exchange-rates and quotes ([967f37c](https://github.com/lightsparkdev/grid-js-sdk/commit/967f37c51f1b2f49387363aa6d222d8e2e0de681))
* **types:** specify purposeOfAccount enum values in customers ([3fd2bcb](https://github.com/lightsparkdev/grid-js-sdk/commit/3fd2bcb5f1f90fb69bb4f7217bb21918f8bb27f8))


### Chores

* **ci:** escape input path in publish-npm workflow ([861b105](https://github.com/lightsparkdev/grid-js-sdk/commit/861b1056c3b01c452fbbbcdffb60d5a74477fa6b))
* **ci:** remove release-doctor workflow ([1e473c4](https://github.com/lightsparkdev/grid-js-sdk/commit/1e473c4f244aa62abc62e049189e12364748ac1a))
* **ci:** skip lint on metadata-only changes ([f594608](https://github.com/lightsparkdev/grid-js-sdk/commit/f5946088f594c419613983d761375f990aaeddbf))
* **ci:** skip uploading artifacts on stainless-internal branches ([81114dc](https://github.com/lightsparkdev/grid-js-sdk/commit/81114dce0f691b366ba5ae15b4b140cbfc43c140))
* configure new SDK language ([92f1669](https://github.com/lightsparkdev/grid-js-sdk/commit/92f1669ec40f304e8238507292c8751743fb446f))
* fix example snippet imports ([9e58258](https://github.com/lightsparkdev/grid-js-sdk/commit/9e58258a9acae88d3e4361f875bb6eed260fd6b6))
* **internal:** codegen related update ([ca31af6](https://github.com/lightsparkdev/grid-js-sdk/commit/ca31af6af0c98e7a0a78f4529d09ab4b6bc6a889))
* **internal:** codegen related update ([d15ee32](https://github.com/lightsparkdev/grid-js-sdk/commit/d15ee32ff2476f10caf23487af5d1f0f7209dab2))
* **internal:** codegen related update ([3403e65](https://github.com/lightsparkdev/grid-js-sdk/commit/3403e6597674cf5277341a100ca9ade5837b30d5))
* **internal:** codegen related update ([fd034e2](https://github.com/lightsparkdev/grid-js-sdk/commit/fd034e2ffe1c50e255cabe1f33bb32357b01a5b1))
* **internal:** codegen related update ([04eefaa](https://github.com/lightsparkdev/grid-js-sdk/commit/04eefaa459c024189f77f8e64b5028b686ad181e))
* **internal:** codegen related update ([122e3e8](https://github.com/lightsparkdev/grid-js-sdk/commit/122e3e83d70eca01f97e6c26121828acb69bb508))
* **internal:** codegen related update ([e81b23e](https://github.com/lightsparkdev/grid-js-sdk/commit/e81b23e1140b389ad518d65e3fc41b7a15fcc4f4))
* **internal:** codegen related update ([d1202b4](https://github.com/lightsparkdev/grid-js-sdk/commit/d1202b4e53a422f8b3d01923b4f17ab2badd302f))
* **internal:** codegen related update ([06762bc](https://github.com/lightsparkdev/grid-js-sdk/commit/06762bc9e0b629802de20825d64966d913221494))
* **internal:** codegen related update ([2d87334](https://github.com/lightsparkdev/grid-js-sdk/commit/2d87334874ac4ef05b4af3a3716e3875f396a2ea))
* **internal:** codegen related update ([c2553aa](https://github.com/lightsparkdev/grid-js-sdk/commit/c2553aab24bd79d6aa137a0ae4565d74e144daa2))
* **internal:** codegen related update ([97a1c40](https://github.com/lightsparkdev/grid-js-sdk/commit/97a1c409277a721d8f5aebfe9ec9ee70e8578f14))
* **internal:** codegen related update ([031a0d8](https://github.com/lightsparkdev/grid-js-sdk/commit/031a0d84b238030bf8e705aa43fc6734e89a17bb))
* **internal:** codegen related update ([8d7af56](https://github.com/lightsparkdev/grid-js-sdk/commit/8d7af56898eb8f66771cfb125417f478fedd7451))
* **internal:** codegen related update ([3332f75](https://github.com/lightsparkdev/grid-js-sdk/commit/3332f753abb7555d5b7871277003b020ea95c4d2))
* **internal:** codegen related update ([a8a8f83](https://github.com/lightsparkdev/grid-js-sdk/commit/a8a8f83b0d59639c8c75dc54863ab2f5f94d599b))
* **internal:** fix MCP server import ordering ([c79932d](https://github.com/lightsparkdev/grid-js-sdk/commit/c79932d429e8f08d0f66e909266a488014787af4))
* **internal:** fix MCP server TS errors that occur with required client options ([4f35df3](https://github.com/lightsparkdev/grid-js-sdk/commit/4f35df365482950731320185765ffb6e9c90614e))
* **internal:** improve local docs search for MCP servers ([f2118f4](https://github.com/lightsparkdev/grid-js-sdk/commit/f2118f4e3cc7fa72f5e173f6176810cc7f9dce2e))
* **internal:** improve local docs search for MCP servers ([b31530e](https://github.com/lightsparkdev/grid-js-sdk/commit/b31530e2ce63471706ba04fe45abd47583e7066b))
* **internal:** make generated MCP servers compatible with Cloudflare worker environments ([111ee3c](https://github.com/lightsparkdev/grid-js-sdk/commit/111ee3cfba641868bbeecfd85387a28d4fcef1e9))
* **internal:** more robust bootstrap script ([ddf9d27](https://github.com/lightsparkdev/grid-js-sdk/commit/ddf9d27d2892d8b65c53c8504d239ed396ba950d))
* **internal:** regenerate SDK with no functional changes ([ee3c6bb](https://github.com/lightsparkdev/grid-js-sdk/commit/ee3c6bb12a943064c4a1ad9c82131571f49ffba2))
* **internal:** regenerate SDK with no functional changes ([8297725](https://github.com/lightsparkdev/grid-js-sdk/commit/829772532948c555ef5f49c5053cec5350a7693e))
* **internal:** show error causes in MCP servers when running in local mode ([1235748](https://github.com/lightsparkdev/grid-js-sdk/commit/123574843df0f8912051b23386632b33dacd07ba))
* **internal:** support custom-instructions-path flag in MCP servers ([8651ced](https://github.com/lightsparkdev/grid-js-sdk/commit/8651ced72229ab008cba4a5cffe81ca1e999f9c3))
* **internal:** support local docs search in MCP servers ([8e7c006](https://github.com/lightsparkdev/grid-js-sdk/commit/8e7c0069f2fdc0a994116f7c000fa4bd625e3149))
* **internal:** support type annotations when running MCP in local execution mode ([aa0cbc8](https://github.com/lightsparkdev/grid-js-sdk/commit/aa0cbc82203cdf0fbaa214864687d88717d86339))
* **internal:** support x-stainless-mcp-client-envs header in MCP servers ([8df665e](https://github.com/lightsparkdev/grid-js-sdk/commit/8df665e0aa96edfd17ca09e0ac0edc4b3614d9ed))
* **internal:** support x-stainless-mcp-client-permissions headers in MCP servers ([013c3b2](https://github.com/lightsparkdev/grid-js-sdk/commit/013c3b2d5918f3f1e3f6dcd5e41a81548c493710))
* **internal:** tweak CI branches ([14e8b1a](https://github.com/lightsparkdev/grid-js-sdk/commit/14e8b1ad8556519d03d5e52fd064791cc30af0e1))
* **internal:** update dependencies to address dependabot vulnerabilities ([418c8f4](https://github.com/lightsparkdev/grid-js-sdk/commit/418c8f4838886ba507cb3fa6db71ec3f850ac3e1))
* **internal:** update docs ordering ([3be4ec5](https://github.com/lightsparkdev/grid-js-sdk/commit/3be4ec5132e0474826a0c120d46a6a91209a4ec5))
* **internal:** update gitignore ([47bff76](https://github.com/lightsparkdev/grid-js-sdk/commit/47bff76ec01b2d76368c9348efa412c60525fa5c))
* **internal:** update lockfile ([bb35281](https://github.com/lightsparkdev/grid-js-sdk/commit/bb35281f7a3fd06a10eae9581e956c5a2c9fb7b0))
* **internal:** use x-stainless-mcp-client-envs header for MCP remote code tool calls ([804ab08](https://github.com/lightsparkdev/grid-js-sdk/commit/804ab0804b1f38eedd8af7eb5ef2fbd6a14885dd))
* **mcp-server:** add support for session id, forward client info ([1c3bc53](https://github.com/lightsparkdev/grid-js-sdk/commit/1c3bc53f189775e272ee7e1c3941a7b9f83578c1))
* **mcp-server:** improve instructions ([60ede05](https://github.com/lightsparkdev/grid-js-sdk/commit/60ede05d00f4a95c3bc5c9d548aea457b2af49bf))
* **mcp-server:** increase local docs search result count from 5 to 10 ([8c319e0](https://github.com/lightsparkdev/grid-js-sdk/commit/8c319e0d0e2e4e845d0b4a88cd61e7f36309b1e6))
* **mcp-server:** log client info ([48fb0eb](https://github.com/lightsparkdev/grid-js-sdk/commit/48fb0eb2475c30bcd7385361b68c8f414f790d5a))
* **mcp-server:** return access instructions for 404 without API key ([7866170](https://github.com/lightsparkdev/grid-js-sdk/commit/786617098d9e66f27148c54f0cf6ca36c5d12611))
* update placeholder string ([56cf258](https://github.com/lightsparkdev/grid-js-sdk/commit/56cf25816de04c068df9ffd795cc9c6cd70df2c8))


### Documentation

* **api:** clarify customerId parameter description in transactions.list ([d766012](https://github.com/lightsparkdev/grid-js-sdk/commit/d766012b8ad40358baba77c807e8a5a37ce35183))
* **api:** remove sandbox testing docs from external-accounts and quotes ([b9ce264](https://github.com/lightsparkdev/grid-js-sdk/commit/b9ce2643d237519ba6af5190ef3b685eacb7b2ba))
* **api:** update cryptoNetwork parameter docs in crypto/external-accounts/quotes ([1dbd588](https://github.com/lightsparkdev/grid-js-sdk/commit/1dbd588316f66feb9dd659059438ebbb52948efe))
* **api:** update senderCustomerInfo parameter documentation in quotes ([01d9ff9](https://github.com/lightsparkdev/grid-js-sdk/commit/01d9ff93dcfe3f746145662b79e2f72db4ef6fba))

## 0.8.0 (2026-03-03)

Full Changelog: [v0.7.0...v0.8.0](https://github.com/lightsparkdev/grid-js-sdk/compare/v0.7.0...v0.8.0)

### Features

* **api:** add KES/RWF/TZS/ZAR/ZMW account types to external-accounts ([8752928](https://github.com/lightsparkdev/grid-js-sdk/commit/8752928d5772fd7302e4612de7650a271d4cbb35))
* **api:** add swiftCode to HKD/IDR/MYR/THB/VND, bankName/phoneNumber to IDR, remove sortCode ([87f0c96](https://github.com/lightsparkdev/grid-js-sdk/commit/87f0c966797c82e08c70b36a0058bbb64eab0175))
* **api:** manual updates ([dc14920](https://github.com/lightsparkdev/grid-js-sdk/commit/dc1492033e34d6882d0c449e566817c2b3bf4d46))
* **api:** manual updates ([57ac800](https://github.com/lightsparkdev/grid-js-sdk/commit/57ac80086922934982bb66f6e9908286aeab8a71))
* **api:** manual updates ([f5d1c74](https://github.com/lightsparkdev/grid-js-sdk/commit/f5d1c74ea481ebfa2f5e4adf2c72e4a504c41d54))
* **api:** manual updates ([082433e](https://github.com/lightsparkdev/grid-js-sdk/commit/082433ea85b3b6806028958e62faae5bb84652a8))
* **mcp:** add an option to disable code tool ([fee8724](https://github.com/lightsparkdev/grid-js-sdk/commit/fee87243739a77e26c6f6b38206386ab024af081))


### Bug Fixes

* **mcp:** update prompt ([dd2714f](https://github.com/lightsparkdev/grid-js-sdk/commit/dd2714f04c8c625a1fbd196fd85c868842c46df7))
* **types:** remove countries field from external account types ([efe76f8](https://github.com/lightsparkdev/grid-js-sdk/commit/efe76f84e0f6be34b880c14b59dfc8e25977e55e))
* **types:** remove IMPS from paymentRails in external-accounts and quotes ([85a6d9c](https://github.com/lightsparkdev/grid-js-sdk/commit/85a6d9c66b1de6e631abc8514e213a54f43a52f6))


### Chores

* **internal:** fix MCP Dockerfiles so they can be built without buildkit ([f709aa8](https://github.com/lightsparkdev/grid-js-sdk/commit/f709aa8d3d6df14786141b4a6e1eeb8e8982e426))
* **internal:** fix MCP Dockerfiles so they can be built without buildkit ([ab62051](https://github.com/lightsparkdev/grid-js-sdk/commit/ab6205154401d6f229fca8825f4824b804ea27a4))
* **internal:** move stringifyQuery implementation to internal function ([6ca7335](https://github.com/lightsparkdev/grid-js-sdk/commit/6ca733599397fc30daf7415c4add396b3ada8f3b))
* **internal:** update external accounts examples and test fixtures ([56867d5](https://github.com/lightsparkdev/grid-js-sdk/commit/56867d5bc8af9d906f094b8abac549038811db34))

## 0.7.0 (2026-02-25)

Full Changelog: [v0.6.0...v0.7.0](https://github.com/lightsparkdev/grid-js-sdk/compare/v0.6.0...v0.7.0)

### Features

* **api:** add BRL/DKK/GBP/HKD/IDR/INR/MXN/MYR/PHP/SGD/THB/USD/VND account types ([ab875a8](https://github.com/lightsparkdev/grid-js-sdk/commit/ab875a8f7c2996eeb963511f37d2190782353498))
* **api:** add CAD and NGN account types to external accounts ([ec58891](https://github.com/lightsparkdev/grid-js-sdk/commit/ec58891a5b1855b44fcabbddc027c2f8dcef7abb))
* **api:** add purposeOfPayment parameter to quotes create ([276ab08](https://github.com/lightsparkdev/grid-js-sdk/commit/276ab08f050996fa228bca5fa61967cd173f099e))
* **api:** add response types to transferIn/transferOut/transactions methods ([4fc5674](https://github.com/lightsparkdev/grid-js-sdk/commit/4fc56740809d983455cf819dbffba458357fc8f5))


### Bug Fixes

* **api:** remove customerId, defaultUmaDepositAccount from external accounts create ([f75819a](https://github.com/lightsparkdev/grid-js-sdk/commit/f75819a102942478ec98ea24bf66c494e1ba6a43))
* **api:** rename ID fields to id in quotes, bulk status, and webhook events ([5bcd4c9](https://github.com/lightsparkdev/grid-js-sdk/commit/5bcd4c9b599445c2eaab628a780b76c0d2b7b463))
* **docs/contributing:** correct pnpm link command ([6c958b1](https://github.com/lightsparkdev/grid-js-sdk/commit/6c958b1ddd0843524cebe7f07f57561066425b2a))
* **mcp:** initialize SDK lazily to avoid failing the connection on init errors ([7f3dfba](https://github.com/lightsparkdev/grid-js-sdk/commit/7f3dfbade0657f27c165b94da44c078d7bc02fc0))
* **types:** standardize customers retrieve/update/delete return types to CustomerOneOf ([e8759c8](https://github.com/lightsparkdev/grid-js-sdk/commit/e8759c855de91ef8c39a22ed4fccaf399a716a34))


### Chores

* **internal:** cache fetch instruction calls in MCP server ([6f862a1](https://github.com/lightsparkdev/grid-js-sdk/commit/6f862a1fc663380572e5279f665a2c04c2c0c51c))
* **internal:** make MCP code execution location configurable via a flag ([4beed6a](https://github.com/lightsparkdev/grid-js-sdk/commit/4beed6a1f017b430667cb806acda404b3acaa0e6))
* **internal:** remove mock server code ([903ac44](https://github.com/lightsparkdev/grid-js-sdk/commit/903ac444c0c5100e4a6b92798ad5729a6ac66558))
* **internal:** upgrade @modelcontextprotocol/sdk and hono ([1a99495](https://github.com/lightsparkdev/grid-js-sdk/commit/1a994952a2e184c13e3cb032cec22ee5807b90f4))
* **internal:** upgrade pnpm version ([5ca7861](https://github.com/lightsparkdev/grid-js-sdk/commit/5ca78613e8ba357a685a85d2c1909a107c002581))
* **mcp:** correctly update version in sync with sdk ([37235f0](https://github.com/lightsparkdev/grid-js-sdk/commit/37235f0792d795a1826265b638660fe4095896d1))
* update mock server docs ([8d27681](https://github.com/lightsparkdev/grid-js-sdk/commit/8d276815e14d5e44e668ecf045f4e60acc833df4))


### Documentation

* **api:** clarify immediatelyExecute parameter requirements in quotes ([795e0b9](https://github.com/lightsparkdev/grid-js-sdk/commit/795e0b9493f11e9e63576b63095c8339f79f9f40))

## 0.6.0 (2026-02-19)

Full Changelog: [v0.5.0...v0.6.0](https://github.com/lightsparkdev/grid-js-sdk/compare/v0.5.0...v0.6.0)

### Features

* **api:** add beneficiary verification fields to ExternalAccount ([aa989be](https://github.com/lightsparkdev/grid-js-sdk/commit/aa989be100d6b6920ab11121b3ee55291e7c8c3f))
* **api:** manual updates ([b2465e3](https://github.com/lightsparkdev/grid-js-sdk/commit/b2465e34f18d64b79b5823a4b812f58a1403f20f))
* **api:** manual updates ([7fac5ee](https://github.com/lightsparkdev/grid-js-sdk/commit/7fac5ee05345d1dc003f53ed185ca21a2ea87cd9))
* **api:** manual updates ([66e96dd](https://github.com/lightsparkdev/grid-js-sdk/commit/66e96dd633c290f28e6750c9f11f2c40d6d461b0))
* **api:** manual updates ([a73f73f](https://github.com/lightsparkdev/grid-js-sdk/commit/a73f73fe3438683bb3dcfb295f7d86afebebac8a))
* Revert main to af3a51a ([bc6c9e5](https://github.com/lightsparkdev/grid-js-sdk/commit/bc6c9e56b7568a61c9fae20789a126b898d73896))


### Bug Fixes

* **api:** remove originalQuoteId field from Quote ([afdf12f](https://github.com/lightsparkdev/grid-js-sdk/commit/afdf12f9d0001062b021a2b93531b0c560389d31))
* **types:** remove counterpartyInformation field from quotes destination ([701e407](https://github.com/lightsparkdev/grid-js-sdk/commit/701e407c46d3d5101426afd436608a5db6d311da))
* **types:** remove originalTransactionId field from SandboxSendFundsResponse ([574282c](https://github.com/lightsparkdev/grid-js-sdk/commit/574282c2ecf511702336fbdebdb04fc799a1a312))


### Chores

* **internal/client:** fix form-urlencoded requests ([b239f07](https://github.com/lightsparkdev/grid-js-sdk/commit/b239f072ca1f07b4703fbc79b0c45ebf23d8f7b4))
* **internal:** allow setting x-stainless-api-key header on mcp server requests ([8f2913c](https://github.com/lightsparkdev/grid-js-sdk/commit/8f2913ceb2658836df222dd5697253b1569bf143))
* **internal:** improve layout of generated MCP server files ([37f0c7c](https://github.com/lightsparkdev/grid-js-sdk/commit/37f0c7c7495d20ab41a371d17d3ce49c8e15ff16))
* **internal:** improve reliability of MCP servers when using local code mode execution ([8773471](https://github.com/lightsparkdev/grid-js-sdk/commit/8773471c7db98972ee23262831b312ef5fae93a6))
* **mcp:** forward STAINLESS_API_KEY to docs search endpoint ([198f88d](https://github.com/lightsparkdev/grid-js-sdk/commit/198f88dab4010c91a871dc83be7d22781ac7cd57))
* remove custom code ([54b0242](https://github.com/lightsparkdev/grid-js-sdk/commit/54b02424fcf626d7ae3647a987caa6d0d23bc763))

## 0.5.0 (2026-02-13)

Full Changelog: [v0.4.0...v0.5.0](https://github.com/lightsparkdev/grid-js-sdk/compare/v0.4.0...v0.5.0)

### Features

* **api:** add webhook events/unwrap, move webhook test to sandbox, update transaction types ([2422746](https://github.com/lightsparkdev/grid-js-sdk/commit/2422746260e9329b23a055cf7dd3c38cf85416f3))


### Chores

* **internal:** avoid type checking errors with ts-reset ([7f0c7d2](https://github.com/lightsparkdev/grid-js-sdk/commit/7f0c7d239a1e73d80833e425348fcbf29d973c64))
* remove custom code ([f50afd6](https://github.com/lightsparkdev/grid-js-sdk/commit/f50afd6c3ae901b81e296f1ad3e195c62f5a144a))

## 0.4.0 (2026-02-12)

Full Changelog: [v0.3.1...v0.4.0](https://github.com/lightsparkdev/grid-js-sdk/compare/v0.3.1...v0.4.0)

### Features

* **api:** fix package names ([bdd4272](https://github.com/lightsparkdev/grid-js-sdk/commit/bdd4272f2dd2c317db39d40202b5e49ce0485b30))
* **api:** set release_environment to npm ([2dcf624](https://github.com/lightsparkdev/grid-js-sdk/commit/2dcf624388ee4ff25204e5ef49b330ca24d1432c))


### Chores

* update SDK settings ([f7cdb81](https://github.com/lightsparkdev/grid-js-sdk/commit/f7cdb81fc3bddcf986b11c0164e61d53ef1da30b))

## 0.3.1 (2026-02-12)

Full Changelog: [v0.3.0...v0.3.1](https://github.com/lightsparkdev/grid-js-sdk/compare/v0.3.0...v0.3.1)

### Chores

* update SDK settings ([e7d1376](https://github.com/lightsparkdev/grid-js-sdk/commit/e7d13766693b48c78d4bea6fab5980df7a2f8ad7))
* update SDK settings ([3fb0955](https://github.com/lightsparkdev/grid-js-sdk/commit/3fb0955aba8acca2fa3715d160de492b81cccbe1))

## 0.3.0 (2026-02-12)

Full Changelog: [v0.2.3...v0.3.0](https://github.com/lightsparkdev/grid-js-sdk/compare/v0.2.3...v0.3.0)

### Features

* **api:** manual updates ([692b68c](https://github.com/lightsparkdev/grid-js-sdk/commit/692b68c315cbc443bc5c36ff5fde3022d2f24f95))


### Chores

* **internal:** unconfigure MCP Server hosting ([c432380](https://github.com/lightsparkdev/grid-js-sdk/commit/c4323809c7a9d88917971c7da309e13c09016fbb))
* update SDK settings ([c63dfda](https://github.com/lightsparkdev/grid-js-sdk/commit/c63dfda61dfe159b170d18041969e0d35d32fdb8))
* update SDK settings ([0c23696](https://github.com/lightsparkdev/grid-js-sdk/commit/0c23696fbacb4c66598fd6ef6f03bcbae23a4d59))
* update SDK settings ([e72880d](https://github.com/lightsparkdev/grid-js-sdk/commit/e72880def0f4113f22a155cdd1448a0c0f7c3563))
* update SDK settings ([ffcd34d](https://github.com/lightsparkdev/grid-js-sdk/commit/ffcd34db5fdf948150a356af256a93b036ac66d1))
* update SDK settings ([3cc37ad](https://github.com/lightsparkdev/grid-js-sdk/commit/3cc37ad43c2f99ce077e59c717c0181bbd78eea4))
* update SDK settings ([a3cba95](https://github.com/lightsparkdev/grid-js-sdk/commit/a3cba95fcd8ab3ee853463c83721e81f593a2136))

## 0.2.3 (2026-02-12)

Full Changelog: [v0.2.2...v0.2.3](https://github.com/lightsparkdev/grid-js-sdk/compare/v0.2.2...v0.2.3)

### Chores

* update SDK settings ([922aff9](https://github.com/lightsparkdev/grid-js-sdk/commit/922aff9cbbe657b75b2fafd9030f016352cfc32c))
* update SDK settings ([ea82f35](https://github.com/lightsparkdev/grid-js-sdk/commit/ea82f35456111ef83b64842847f398c08bae8ee3))
* update SDK settings ([bc17a20](https://github.com/lightsparkdev/grid-js-sdk/commit/bc17a2039e559d2fc6b7b642f50302d251384172))

## 0.2.2 (2026-02-11)

Full Changelog: [v0.2.1...v0.2.2](https://github.com/lightsparkdev/grid-js-sdk/compare/v0.2.1...v0.2.2)

### Chores

* update SDK settings ([44ab01f](https://github.com/lightsparkdev/grid-js-sdk/commit/44ab01f25cd0664e183a2e99a3c3911371f63541))
* update SDK settings ([14ad16c](https://github.com/lightsparkdev/grid-js-sdk/commit/14ad16cc0ede8daa2700d6d2edba22954643f731))

## 0.2.1 (2026-02-11)

Full Changelog: [v0.2.0...v0.2.1](https://github.com/lightsparkdev/grid-js-sdk/compare/v0.2.0...v0.2.1)

### Chores

* **internal:** configure MCP Server hosting ([8402e1c](https://github.com/lightsparkdev/grid-js-sdk/commit/8402e1cfc30cdfc8e64379bbcb710b1f8bc1e826))
* update SDK settings ([0549cf9](https://github.com/lightsparkdev/grid-js-sdk/commit/0549cf9d7666bd508d4b33aaf5b8f2089d521877))

## 0.2.0 (2026-02-10)

Full Changelog: [v0.1.0...v0.2.0](https://github.com/lightsparkdev/grid-js-sdk/compare/v0.1.0...v0.2.0)

### Features

* **api:** add min/max sending amounts to exchange rates response ([a0d56be](https://github.com/lightsparkdev/grid-js-sdk/commit/a0d56be39f9b9ae4ff9bedb73fd640e53f8d06fd))
* **api:** Adding typescript publishing ([73d596e](https://github.com/lightsparkdev/grid-js-sdk/commit/73d596e63ea1ce0d232243758b4f67aec1699bb5))
* **api:** manual updates ([4546a50](https://github.com/lightsparkdev/grid-js-sdk/commit/4546a501f61fd5378871ff14c8314fee6de833cf))


### Chores

* configure new SDK language ([0acc81a](https://github.com/lightsparkdev/grid-js-sdk/commit/0acc81a02bf1ba36d26349c17ca00024c658b518))

## 0.1.0 (2026-02-10)

Full Changelog: [v0.0.1...v0.1.0](https://github.com/lightsparkdev/grid-js-sdk/compare/v0.0.1...v0.1.0)

### Features

* add Stainless SDK config and misc cleanups ([8074d69](https://github.com/lightsparkdev/grid-js-sdk/commit/8074d691f0dcf9eccade932e880f47919d4203d5))
* **api:** generated doc update ([d1055a1](https://github.com/lightsparkdev/grid-js-sdk/commit/d1055a1bc4f660d7edf6bef0db5835c0771bc1d3))
* **api:** manual updates ([6a207d0](https://github.com/lightsparkdev/grid-js-sdk/commit/6a207d01b87d3525f920e5a60df61b62bb59f1b4))
* **api:** manual updates ([ee43769](https://github.com/lightsparkdev/grid-js-sdk/commit/ee43769e38781d35cb971a44edab8f6dbe214e2c))
* **api:** manual updates ([dd34382](https://github.com/lightsparkdev/grid-js-sdk/commit/dd343821d26261be9c4417566a290e02228efc8d))
* **api:** manual updates ([ba7ce24](https://github.com/lightsparkdev/grid-js-sdk/commit/ba7ce2476a8c0f8fc0064a082dfff06f3087ea2b))
* **api:** manual updates ([7cbcb62](https://github.com/lightsparkdev/grid-js-sdk/commit/7cbcb629ab6eccaaef05db949a35b752c8439356))
* **api:** manual updates ([fb5a1dd](https://github.com/lightsparkdev/grid-js-sdk/commit/fb5a1dd28145d875e52602214037fd4aa01407cb))
* **api:** manual updates ([f876a47](https://github.com/lightsparkdev/grid-js-sdk/commit/f876a47852a0fdfba0aee529c19a928edc37f01f))
* **api:** manual updates ([cd6848d](https://github.com/lightsparkdev/grid-js-sdk/commit/cd6848df1bc170a6d256a05b6d946270d06fc76c))
* **api:** manual updates ([bfa336e](https://github.com/lightsparkdev/grid-js-sdk/commit/bfa336eda2be907b35a134eab58f3aa75fc602ea))
* **api:** manual updates ([b9182b6](https://github.com/lightsparkdev/grid-js-sdk/commit/b9182b6298b8500c73ae239e5b35c37dac1030a2))
* **api:** manual updates ([1d0055a](https://github.com/lightsparkdev/grid-js-sdk/commit/1d0055a0464c9efcca825c9b169922e8a6915134))
* **api:** manual updates ([3925c08](https://github.com/lightsparkdev/grid-js-sdk/commit/3925c08f5619aec0079762aba91b901c5e2e8c53))
* **api:** manual updates ([5d552af](https://github.com/lightsparkdev/grid-js-sdk/commit/5d552afd4e978745971ba65c5b1cdcff1e54aa79))
* **api:** manual updates ([0945cd7](https://github.com/lightsparkdev/grid-js-sdk/commit/0945cd73093c5a396b9fd86ed63bbb2dd8571f19))
* **api:** manual updates ([29173a7](https://github.com/lightsparkdev/grid-js-sdk/commit/29173a7ec18885f65b03f059b81382ab5f6f27d7))
* **api:** manual updates ([008e1c3](https://github.com/lightsparkdev/grid-js-sdk/commit/008e1c3f22036b5b624a2326f3bf69c4b51325b6))
* **api:** manual updates ([b473409](https://github.com/lightsparkdev/grid-js-sdk/commit/b4734093abf424f2c7de2f169c6e46be0753c047))
* **api:** manual updates ([9344bb7](https://github.com/lightsparkdev/grid-js-sdk/commit/9344bb70c4784904f2040636c30230058e101261))
* **api:** manual updates ([52f12c8](https://github.com/lightsparkdev/grid-js-sdk/commit/52f12c89d7299d29a3f004e07c9b3e1bb5537fac))
* **api:** manual updates ([d0c7b8b](https://github.com/lightsparkdev/grid-js-sdk/commit/d0c7b8b73358b7d03a1f4a8e6f961d70d164cf66))
* **api:** manual updates ([240223b](https://github.com/lightsparkdev/grid-js-sdk/commit/240223b52412a1affd008b366bbc86cbf2c94b16))
* **api:** manual updates ([c00994a](https://github.com/lightsparkdev/grid-js-sdk/commit/c00994a774e7065f212d1dfd11249c0de9571f6a))
* **api:** manual updates ([9277e4b](https://github.com/lightsparkdev/grid-js-sdk/commit/9277e4b997deb38609ef7f76a1100d2be23cef8a))
* **api:** manual updates ([271ad13](https://github.com/lightsparkdev/grid-js-sdk/commit/271ad13a5c206e38693fcb199cb1220f1d3806d7))
* **api:** manual updates ([0d190f9](https://github.com/lightsparkdev/grid-js-sdk/commit/0d190f9c44279f5ed9e9792bbb2c8f529c503c55))
* **api:** manual updates ([28fff33](https://github.com/lightsparkdev/grid-js-sdk/commit/28fff333d86f11d4c1cedfa71d311adad5a1b9b2))
* **api:** manual updates ([8a19e24](https://github.com/lightsparkdev/grid-js-sdk/commit/8a19e24af4be6395802bc2fee2b491696995c229))
* **api:** manual updates ([648213e](https://github.com/lightsparkdev/grid-js-sdk/commit/648213e1eaac173bb013f9d7c4644ceda50680bf))
* **api:** manual updates ([5ee96bf](https://github.com/lightsparkdev/grid-js-sdk/commit/5ee96bf6a0d50963bf0e1828e8ac1f4ac0a320c6))
* **api:** manual updates ([340f6b3](https://github.com/lightsparkdev/grid-js-sdk/commit/340f6b3a53c3dbdca76f13b9acdbd6ed4f5a141f))
* **api:** manual updates ([8fc26f6](https://github.com/lightsparkdev/grid-js-sdk/commit/8fc26f60884bd28e6082b5005672431b71c1a013))
* **api:** manual updates ([712964d](https://github.com/lightsparkdev/grid-js-sdk/commit/712964db39c9d6733b43831881b1568de0a702b0))
* **api:** manual updates ([b663a50](https://github.com/lightsparkdev/grid-js-sdk/commit/b663a504112ad477bf7568d1e388c93d8a6a2bdb))
* **api:** remove reference to empty base objects ([2ca9d4d](https://github.com/lightsparkdev/grid-js-sdk/commit/2ca9d4dc3d466d74c9fcfc4bac31d6ea7760e1b4))
* **api:** updating package names ([176a518](https://github.com/lightsparkdev/grid-js-sdk/commit/176a518664683343f43614c900afc39bb98dcfb8))
* Make summaries more consistent ([14e1297](https://github.com/lightsparkdev/grid-js-sdk/commit/14e12976a601b5f9ded6852df5b351d923d1f525))


### Bug Fixes

* **client:** avoid memory leak with abort signals ([2578895](https://github.com/lightsparkdev/grid-js-sdk/commit/257889555904079c5b3c4d4bea1d2dfc75f456b4))
* **client:** avoid removing abort listener too early ([2215608](https://github.com/lightsparkdev/grid-js-sdk/commit/2215608877716f410e90c29acdb1ad6aa756965a))


### Chores

* **ci:** upgrade `actions/github-script` ([60145f9](https://github.com/lightsparkdev/grid-js-sdk/commit/60145f927648acd87cdb77b79ffcfc3c1c9eebbe))
* **client:** do not parse responses with empty content-length ([2ca2b72](https://github.com/lightsparkdev/grid-js-sdk/commit/2ca2b725f50088bcf099eec9716ab0c6b9ae03f6))
* **client:** restructure abort controller binding ([ed0eba5](https://github.com/lightsparkdev/grid-js-sdk/commit/ed0eba5de86fa4a7d53c9d6b80193f2696cb4a36))
* **internal:** fix pagination internals not accepting option promises ([373708d](https://github.com/lightsparkdev/grid-js-sdk/commit/373708ddb7fc50bb06c401989636c8e27cbb775a))
* **internal:** upgrade pnpm ([f50e69e](https://github.com/lightsparkdev/grid-js-sdk/commit/f50e69efda0b59deb2d47b5dc12b6771a0c8fb52))
