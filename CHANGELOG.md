# Changelog

## 0.8.0 (2026-02-27)

Full Changelog: [v0.7.0...v0.8.0](https://github.com/lightsparkdev/grid-js-sdk/compare/v0.7.0...v0.8.0)

### Features

* **api:** add KES/RWF/TZS/ZAR/ZMW account types to external-accounts ([8752928](https://github.com/lightsparkdev/grid-js-sdk/commit/8752928d5772fd7302e4612de7650a271d4cbb35))
* **api:** add swiftCode to HKD/IDR/MYR/THB/VND, bankName/phoneNumber to IDR, remove sortCode ([87f0c96](https://github.com/lightsparkdev/grid-js-sdk/commit/87f0c966797c82e08c70b36a0058bbb64eab0175))
* **mcp:** add an option to disable code tool ([fee8724](https://github.com/lightsparkdev/grid-js-sdk/commit/fee87243739a77e26c6f6b38206386ab024af081))


### Bug Fixes

* **mcp:** update prompt ([dd2714f](https://github.com/lightsparkdev/grid-js-sdk/commit/dd2714f04c8c625a1fbd196fd85c868842c46df7))
* **types:** remove countries field from external account types ([efe76f8](https://github.com/lightsparkdev/grid-js-sdk/commit/efe76f84e0f6be34b880c14b59dfc8e25977e55e))


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
