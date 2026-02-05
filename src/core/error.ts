// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { castToError } from '../internal/errors';

export class GridError extends Error {}

export class APIError<
  TStatus extends number | undefined = number | undefined,
  THeaders extends Headers | undefined = Headers | undefined,
  TError extends Object | undefined = Object | undefined,
> extends GridError {
  /** HTTP status for the response that caused the error */
  readonly status: TStatus;
  /** HTTP headers for the response that caused the error */
  readonly headers: THeaders;
  /** JSON body of the response that caused the error */
  readonly error: TError;

  constructor(status: TStatus, error: TError, message: string | undefined, headers: THeaders) {
    super(`${APIError.makeMessage(status, error, message)}`);
    this.status = status;
    this.headers = headers;
    this.error = error;
  }

  private static makeMessage(status: number | undefined, error: any, message: string | undefined) {
    const msg =
      error?.message ?
        typeof error.message === 'string' ?
          error.message
        : JSON.stringify(error.message)
      : error ? JSON.stringify(error)
      : message;

    if (status && msg) {
      return `${status} ${msg}`;
    }
    if (status) {
      return `${status} status code (no body)`;
    }
    if (msg) {
      return msg;
    }
    return '(no status code or body)';
  }

  static generate(
    status: number | undefined,
    errorResponse: Object | undefined,
    message: string | undefined,
    headers: Headers | undefined,
  ): APIError {
    if (!status || !headers) {
      return new APIConnectionError({ message, cause: castToError(errorResponse) });
    }

    const error = errorResponse as Record<string, any>;

    const code = error?.['code'];

    if (code === 'AMOUNT_OUT_OF_RANGE' && status === 400) {
      return new AmountOutOfRange(status, error, message, headers);
    }

    if (code === 'CERT_CHAIN_EXPIRED' && status === 400) {
      return new CertChainExpired(status, error, message, headers);
    }

    if (code === 'CERT_CHAIN_INVALID' && status === 400) {
      return new CertChainInvalid(status, error, message, headers);
    }

    if (code === 'INVALID_AMOUNT' && status === 400) {
      return new InvalidAmount(status, error, message, headers);
    }

    if (code === 'INVALID_BANK_ACCOUNT' && status === 400) {
      return new InvalidBankAccount(status, error, message, headers);
    }

    if (code === 'INVALID_CURRENCY' && status === 400) {
      return new InvalidCurrency(status, error, message, headers);
    }

    if (code === 'INVALID_INPUT' && status === 400) {
      return new InvalidInput(status, error, message, headers);
    }

    if (code === 'INVALID_NONCE' && status === 400) {
      return new InvalidNonce(status, error, message, headers);
    }

    if (code === 'INVALID_PAYREQ_RESPONSE' && status === 400) {
      return new InvalidPayreqResponse(status, error, message, headers);
    }

    if (code === 'INVALID_PUBKEY_FORMAT' && status === 400) {
      return new InvalidPubkeyFormat(status, error, message, headers);
    }

    if (code === 'INVALID_RECEIVER' && status === 400) {
      return new InvalidReceiver(status, error, message, headers);
    }

    if (code === 'INVALID_REQUEST_FORMAT' && status === 400) {
      return new InvalidRequestFormat(status, error, message, headers);
    }

    if (code === 'INVALID_TIMESTAMP' && status === 400) {
      return new InvalidTimestamp(status, error, message, headers);
    }

    if (code === 'INVALID_UMA_ADDRESS' && status === 400) {
      return new InvalidUmaAddress(status, error, message, headers);
    }

    if (code === 'INVITATION_ALREADY_CLAIMED' && status === 400) {
      return new InvitationAlreadyClaimed(status, error, message, headers);
    }

    if (code === 'INVITATION_CANCELLED' && status === 400) {
      return new InvitationCancelled(status, error, message, headers);
    }

    if (code === 'INVITATIONS_NOT_CONFIGURED' && status === 400) {
      return new InvitationsNotConfigured(status, error, message, headers);
    }

    if (code === 'LOOKUP_REQUEST_FAILED' && status === 400) {
      return new LookupRequestFailed(status, error, message, headers);
    }

    if (code === 'MISSING_MANDATORY_USER_INFO' && status === 400) {
      return new MissingMandatoryUserInfo(status, error, message, headers);
    }

    if (code === 'MISSING_REQUIRED_UMA_PARAMETERS' && status === 400) {
      return new MissingRequiredUmaParameters(status, error, message, headers);
    }

    if (code === 'PARSE_LNURLP_RESPONSE_ERROR' && status === 400) {
      return new ParseLnurlpResponseError(status, error, message, headers);
    }

    if (code === 'PARSE_PAYREQ_RESPONSE_ERROR' && status === 400) {
      return new ParsePayreqResponseError(status, error, message, headers);
    }

    if (code === 'QUOTE_REQUEST_FAILED' && status === 400) {
      return new QuoteRequestFailed(status, error, message, headers);
    }

    if (code === 'SELF_PAYMENT' && status === 400) {
      return new SelfPayment(status, error, message, headers);
    }

    if (code === 'SENDER_NOT_ACCEPTED' && status === 400) {
      return new SenderNotAccepted(status, error, message, headers);
    }

    if (code === 'WEBHOOK_DELIVERY_ERROR' && status === 400) {
      return new WebhookDeliveryError(status, error, message, headers);
    }

    if (code === 'WEBHOOK_ENDPOINT_NOT_SET' && status === 400) {
      return new WebhookEndpointNotSet(status, error, message, headers);
    }

    if (code === 'INVALID_SIGNATURE' && status === 401) {
      return new InvalidSignature(status, error, message, headers);
    }

    if (code === 'UNAUTHORIZED' && status === 401) {
      return new Unauthorized(status, error, message, headers);
    }

    if (code === 'COUNTERPARTY_NOT_ALLOWED' && status === 403) {
      return new CounterpartyNotAllowed(status, error, message, headers);
    }

    if (code === 'FORBIDDEN' && status === 403) {
      return new Forbidden(status, error, message, headers);
    }

    if (code === 'USER_NOT_READY' && status === 403) {
      return new UserNotReady(status, error, message, headers);
    }

    if (code === 'VELOCITY_LIMIT_EXCEEDED' && status === 403) {
      return new VelocityLimitExceeded(status, error, message, headers);
    }

    if (code === 'BULK_UPLOAD_JOB_NOT_FOUND' && status === 404) {
      return new BulkUploadJobNotFound(status, error, message, headers);
    }

    if (code === 'INVITATION_NOT_FOUND' && status === 404) {
      return new InvitationNotFound(status, error, message, headers);
    }

    if (code === 'LOOKUP_REQUEST_NOT_FOUND' && status === 404) {
      return new LookupRequestNotFound(status, error, message, headers);
    }

    if (code === 'QUOTE_NOT_FOUND' && status === 404) {
      return new QuoteNotFound(status, error, message, headers);
    }

    if (code === 'REFERENCE_NOT_FOUND' && status === 404) {
      return new ReferenceNotFound(status, error, message, headers);
    }

    if (code === 'TOKEN_NOT_FOUND' && status === 404) {
      return new TokenNotFound(status, error, message, headers);
    }

    if (code === 'TRANSACTION_NOT_FOUND' && status === 404) {
      return new TransactionNotFound(status, error, message, headers);
    }

    if (code === 'USER_NOT_FOUND' && status === 404) {
      return new UserNotFound(status, error, message, headers);
    }

    if (code === 'TRANSACTION_NOT_PENDING_PLATFORM_APPROVAL' && status === 409) {
      return new TransactionNotPendingPlatformApproval(status, error, message, headers);
    }

    if (code === 'UMA_ADDRESS_EXISTS' && status === 409) {
      return new UmaAddressExists(status, error, message, headers);
    }

    if (code === 'CUSTOMER_DELETED' && status === 410) {
      return new CustomerDeleted(status, error, message, headers);
    }

    if (code === 'UNSUPPORTED_UMA_VERSION' && status === 412) {
      return new UnsupportedUmaVersion(status, error, message, headers);
    }

    if (code === 'COUNTERPARTY_PUBKEY_FETCH_ERROR' && status === 424) {
      return new CounterpartyPubkeyFetchError(status, error, message, headers);
    }

    if (code === 'LNURLP_REQUEST_FAILED' && status === 424) {
      return new LnurlpRequestFailed(status, error, message, headers);
    }

    if (code === 'NO_COMPATIBLE_UMA_VERSION' && status === 424) {
      return new NoCompatibleUmaVersion(status, error, message, headers);
    }

    if (code === 'PAYREQ_REQUEST_FAILED' && status === 424) {
      return new PayreqRequestFailed(status, error, message, headers);
    }

    if (code === 'GRID_SWITCH_ERROR' && status === 500) {
      return new GridSwitchError(status, error, message, headers);
    }

    if (code === 'INTERNAL_ERROR' && status === 500) {
      return new InternalError(status, error, message, headers);
    }

    if (code === 'NOT_IMPLEMENTED' && status === 501) {
      return new NotImplemented(status, error, message, headers);
    }

    if (code === 'UNRECOGNIZED_MANDATORY_PAYEE_DATA_KEY' && status === 501) {
      return new UnrecognizedMandatoryPayeeDataKey(status, error, message, headers);
    }

    if (status === 400) {
      return new BadRequestError(status, error, message, headers);
    }

    if (status === 401) {
      return new AuthenticationError(status, error, message, headers);
    }

    if (status === 403) {
      return new PermissionDeniedError(status, error, message, headers);
    }

    if (status === 404) {
      return new NotFoundError(status, error, message, headers);
    }

    if (status === 409) {
      return new ConflictError(status, error, message, headers);
    }

    if (status === 422) {
      return new UnprocessableEntityError(status, error, message, headers);
    }

    if (status === 429) {
      return new RateLimitError(status, error, message, headers);
    }

    if (status >= 500) {
      return new InternalServerError(status, error, message, headers);
    }

    return new APIError(status, error, message, headers);
  }
}

export class APIUserAbortError extends APIError<undefined, undefined, undefined> {
  constructor({ message }: { message?: string } = {}) {
    super(undefined, undefined, message || 'Request was aborted.', undefined);
  }
}

export class APIConnectionError extends APIError<undefined, undefined, undefined> {
  constructor({ message, cause }: { message?: string | undefined; cause?: Error | undefined }) {
    super(undefined, undefined, message || 'Connection error.', undefined);
    // in some environments the 'cause' property is already declared
    // @ts-ignore
    if (cause) this.cause = cause;
  }
}

export class APIConnectionTimeoutError extends APIConnectionError {
  constructor({ message }: { message?: string } = {}) {
    super({ message: message ?? 'Request timed out.' });
  }
}

export class BadRequestError extends APIError<400, Headers> {}

export class AuthenticationError extends APIError<401, Headers> {}

export class PermissionDeniedError extends APIError<403, Headers> {}

export class NotFoundError extends APIError<404, Headers> {}

export class ConflictError extends APIError<409, Headers> {}

export class UnprocessableEntityError extends APIError<422, Headers> {}

export class RateLimitError extends APIError<429, Headers> {}

export class InternalServerError extends APIError<number, Headers> {}

export class AmountOutOfRange extends BadRequestError {
  /**
   * | Error Code                      | Description                                                   |
   * | ------------------------------- | ------------------------------------------------------------- |
   * | INVALID_INPUT                   | Invalid input provided                                        |
   * | MISSING_MANDATORY_USER_INFO     | Required customer information is missing                      |
   * | INVITATION_ALREADY_CLAIMED      | Invitation has already been claimed                           |
   * | INVITATIONS_NOT_CONFIGURED      | Invitations are not configured                                |
   * | INVALID_UMA_ADDRESS             | UMA address format is invalid                                 |
   * | INVITATION_CANCELLED            | Invitation has been cancelled                                 |
   * | QUOTE_REQUEST_FAILED            | An issue occurred during the quote process; this is retryable |
   * | INVALID_PAYREQ_RESPONSE         | Counterparty Payreq response was invalid                      |
   * | INVALID_RECEIVER                | Receiver is invalid                                           |
   * | PARSE_PAYREQ_RESPONSE_ERROR     | Error parsing receiver PayReq response                        |
   * | CERT_CHAIN_INVALID              | Counterparty certificate chain is invalid                     |
   * | CERT_CHAIN_EXPIRED              | Counterparty certificate chain has expired                    |
   * | INVALID_PUBKEY_FORMAT           | Counterparty Public key format is invalid                     |
   * | MISSING_REQUIRED_UMA_PARAMETERS | Counterparty required UMA parameters are missing              |
   * | SENDER_NOT_ACCEPTED             | Sender is not accepted                                        |
   * | AMOUNT_OUT_OF_RANGE             | Amount is out of range                                        |
   * | INVALID_CURRENCY                | Currency is invalid                                           |
   * | INVALID_TIMESTAMP               | Timestamp is invalid                                          |
   * | INVALID_NONCE                   | Nonce is invalid                                              |
   * | INVALID_REQUEST_FORMAT          | Request format is invalid                                     |
   * | INVALID_BANK_ACCOUNT            | Bank account is invalid                                       |
   * | SELF_PAYMENT                    | Self payment not allowed                                      |
   * | LOOKUP_REQUEST_FAILED           | Lookup request failed                                         |
   * | PARSE_LNURLP_RESPONSE_ERROR     | Error parsing LNURLP response                                 |
   * | INVALID_AMOUNT                  | Amount is invalid                                             |
   * | WEBHOOK_ENDPOINT_NOT_SET        | Webhook endpoint is not set                                   |
   * | WEBHOOK_DELIVERY_ERROR          | Webhook delivery error                                        |
   */
  code: 'AMOUNT_OUT_OF_RANGE';

  /**
   * Error message
   */
  override message: string;

  /**
   * HTTP status code
   */
  override status: 400;

  /**
   * Additional error details
   */
  details?: { [key: string]: unknown };

  constructor(status: 400, error: Object, message: string | undefined, headers: Headers) {
    const data = error as Record<string, any>;
    super(status, error, message, headers);

    this.code = data?.['code'];
    this.message = data?.['message'];
    this.status = data?.['status'];
    this.details = data?.['details'];
  }
}

export class CertChainExpired extends BadRequestError {
  /**
   * | Error Code                      | Description                                                   |
   * | ------------------------------- | ------------------------------------------------------------- |
   * | INVALID_INPUT                   | Invalid input provided                                        |
   * | MISSING_MANDATORY_USER_INFO     | Required customer information is missing                      |
   * | INVITATION_ALREADY_CLAIMED      | Invitation has already been claimed                           |
   * | INVITATIONS_NOT_CONFIGURED      | Invitations are not configured                                |
   * | INVALID_UMA_ADDRESS             | UMA address format is invalid                                 |
   * | INVITATION_CANCELLED            | Invitation has been cancelled                                 |
   * | QUOTE_REQUEST_FAILED            | An issue occurred during the quote process; this is retryable |
   * | INVALID_PAYREQ_RESPONSE         | Counterparty Payreq response was invalid                      |
   * | INVALID_RECEIVER                | Receiver is invalid                                           |
   * | PARSE_PAYREQ_RESPONSE_ERROR     | Error parsing receiver PayReq response                        |
   * | CERT_CHAIN_INVALID              | Counterparty certificate chain is invalid                     |
   * | CERT_CHAIN_EXPIRED              | Counterparty certificate chain has expired                    |
   * | INVALID_PUBKEY_FORMAT           | Counterparty Public key format is invalid                     |
   * | MISSING_REQUIRED_UMA_PARAMETERS | Counterparty required UMA parameters are missing              |
   * | SENDER_NOT_ACCEPTED             | Sender is not accepted                                        |
   * | AMOUNT_OUT_OF_RANGE             | Amount is out of range                                        |
   * | INVALID_CURRENCY                | Currency is invalid                                           |
   * | INVALID_TIMESTAMP               | Timestamp is invalid                                          |
   * | INVALID_NONCE                   | Nonce is invalid                                              |
   * | INVALID_REQUEST_FORMAT          | Request format is invalid                                     |
   * | INVALID_BANK_ACCOUNT            | Bank account is invalid                                       |
   * | SELF_PAYMENT                    | Self payment not allowed                                      |
   * | LOOKUP_REQUEST_FAILED           | Lookup request failed                                         |
   * | PARSE_LNURLP_RESPONSE_ERROR     | Error parsing LNURLP response                                 |
   * | INVALID_AMOUNT                  | Amount is invalid                                             |
   * | WEBHOOK_ENDPOINT_NOT_SET        | Webhook endpoint is not set                                   |
   * | WEBHOOK_DELIVERY_ERROR          | Webhook delivery error                                        |
   */
  code: 'CERT_CHAIN_EXPIRED';

  /**
   * Error message
   */
  override message: string;

  /**
   * HTTP status code
   */
  override status: 400;

  /**
   * Additional error details
   */
  details?: { [key: string]: unknown };

  constructor(status: 400, error: Object, message: string | undefined, headers: Headers) {
    const data = error as Record<string, any>;
    super(status, error, message, headers);

    this.code = data?.['code'];
    this.message = data?.['message'];
    this.status = data?.['status'];
    this.details = data?.['details'];
  }
}

export class CertChainInvalid extends BadRequestError {
  /**
   * | Error Code                      | Description                                                   |
   * | ------------------------------- | ------------------------------------------------------------- |
   * | INVALID_INPUT                   | Invalid input provided                                        |
   * | MISSING_MANDATORY_USER_INFO     | Required customer information is missing                      |
   * | INVITATION_ALREADY_CLAIMED      | Invitation has already been claimed                           |
   * | INVITATIONS_NOT_CONFIGURED      | Invitations are not configured                                |
   * | INVALID_UMA_ADDRESS             | UMA address format is invalid                                 |
   * | INVITATION_CANCELLED            | Invitation has been cancelled                                 |
   * | QUOTE_REQUEST_FAILED            | An issue occurred during the quote process; this is retryable |
   * | INVALID_PAYREQ_RESPONSE         | Counterparty Payreq response was invalid                      |
   * | INVALID_RECEIVER                | Receiver is invalid                                           |
   * | PARSE_PAYREQ_RESPONSE_ERROR     | Error parsing receiver PayReq response                        |
   * | CERT_CHAIN_INVALID              | Counterparty certificate chain is invalid                     |
   * | CERT_CHAIN_EXPIRED              | Counterparty certificate chain has expired                    |
   * | INVALID_PUBKEY_FORMAT           | Counterparty Public key format is invalid                     |
   * | MISSING_REQUIRED_UMA_PARAMETERS | Counterparty required UMA parameters are missing              |
   * | SENDER_NOT_ACCEPTED             | Sender is not accepted                                        |
   * | AMOUNT_OUT_OF_RANGE             | Amount is out of range                                        |
   * | INVALID_CURRENCY                | Currency is invalid                                           |
   * | INVALID_TIMESTAMP               | Timestamp is invalid                                          |
   * | INVALID_NONCE                   | Nonce is invalid                                              |
   * | INVALID_REQUEST_FORMAT          | Request format is invalid                                     |
   * | INVALID_BANK_ACCOUNT            | Bank account is invalid                                       |
   * | SELF_PAYMENT                    | Self payment not allowed                                      |
   * | LOOKUP_REQUEST_FAILED           | Lookup request failed                                         |
   * | PARSE_LNURLP_RESPONSE_ERROR     | Error parsing LNURLP response                                 |
   * | INVALID_AMOUNT                  | Amount is invalid                                             |
   * | WEBHOOK_ENDPOINT_NOT_SET        | Webhook endpoint is not set                                   |
   * | WEBHOOK_DELIVERY_ERROR          | Webhook delivery error                                        |
   */
  code: 'CERT_CHAIN_INVALID';

  /**
   * Error message
   */
  override message: string;

  /**
   * HTTP status code
   */
  override status: 400;

  /**
   * Additional error details
   */
  details?: { [key: string]: unknown };

  constructor(status: 400, error: Object, message: string | undefined, headers: Headers) {
    const data = error as Record<string, any>;
    super(status, error, message, headers);

    this.code = data?.['code'];
    this.message = data?.['message'];
    this.status = data?.['status'];
    this.details = data?.['details'];
  }
}

export class InvalidAmount extends BadRequestError {
  /**
   * | Error Code                      | Description                                                   |
   * | ------------------------------- | ------------------------------------------------------------- |
   * | INVALID_INPUT                   | Invalid input provided                                        |
   * | MISSING_MANDATORY_USER_INFO     | Required customer information is missing                      |
   * | INVITATION_ALREADY_CLAIMED      | Invitation has already been claimed                           |
   * | INVITATIONS_NOT_CONFIGURED      | Invitations are not configured                                |
   * | INVALID_UMA_ADDRESS             | UMA address format is invalid                                 |
   * | INVITATION_CANCELLED            | Invitation has been cancelled                                 |
   * | QUOTE_REQUEST_FAILED            | An issue occurred during the quote process; this is retryable |
   * | INVALID_PAYREQ_RESPONSE         | Counterparty Payreq response was invalid                      |
   * | INVALID_RECEIVER                | Receiver is invalid                                           |
   * | PARSE_PAYREQ_RESPONSE_ERROR     | Error parsing receiver PayReq response                        |
   * | CERT_CHAIN_INVALID              | Counterparty certificate chain is invalid                     |
   * | CERT_CHAIN_EXPIRED              | Counterparty certificate chain has expired                    |
   * | INVALID_PUBKEY_FORMAT           | Counterparty Public key format is invalid                     |
   * | MISSING_REQUIRED_UMA_PARAMETERS | Counterparty required UMA parameters are missing              |
   * | SENDER_NOT_ACCEPTED             | Sender is not accepted                                        |
   * | AMOUNT_OUT_OF_RANGE             | Amount is out of range                                        |
   * | INVALID_CURRENCY                | Currency is invalid                                           |
   * | INVALID_TIMESTAMP               | Timestamp is invalid                                          |
   * | INVALID_NONCE                   | Nonce is invalid                                              |
   * | INVALID_REQUEST_FORMAT          | Request format is invalid                                     |
   * | INVALID_BANK_ACCOUNT            | Bank account is invalid                                       |
   * | SELF_PAYMENT                    | Self payment not allowed                                      |
   * | LOOKUP_REQUEST_FAILED           | Lookup request failed                                         |
   * | PARSE_LNURLP_RESPONSE_ERROR     | Error parsing LNURLP response                                 |
   * | INVALID_AMOUNT                  | Amount is invalid                                             |
   * | WEBHOOK_ENDPOINT_NOT_SET        | Webhook endpoint is not set                                   |
   * | WEBHOOK_DELIVERY_ERROR          | Webhook delivery error                                        |
   */
  code: 'INVALID_AMOUNT';

  /**
   * Error message
   */
  override message: string;

  /**
   * HTTP status code
   */
  override status: 400;

  /**
   * Additional error details
   */
  details?: { [key: string]: unknown };

  constructor(status: 400, error: Object, message: string | undefined, headers: Headers) {
    const data = error as Record<string, any>;
    super(status, error, message, headers);

    this.code = data?.['code'];
    this.message = data?.['message'];
    this.status = data?.['status'];
    this.details = data?.['details'];
  }
}

export class InvalidBankAccount extends BadRequestError {
  /**
   * | Error Code                      | Description                                                   |
   * | ------------------------------- | ------------------------------------------------------------- |
   * | INVALID_INPUT                   | Invalid input provided                                        |
   * | MISSING_MANDATORY_USER_INFO     | Required customer information is missing                      |
   * | INVITATION_ALREADY_CLAIMED      | Invitation has already been claimed                           |
   * | INVITATIONS_NOT_CONFIGURED      | Invitations are not configured                                |
   * | INVALID_UMA_ADDRESS             | UMA address format is invalid                                 |
   * | INVITATION_CANCELLED            | Invitation has been cancelled                                 |
   * | QUOTE_REQUEST_FAILED            | An issue occurred during the quote process; this is retryable |
   * | INVALID_PAYREQ_RESPONSE         | Counterparty Payreq response was invalid                      |
   * | INVALID_RECEIVER                | Receiver is invalid                                           |
   * | PARSE_PAYREQ_RESPONSE_ERROR     | Error parsing receiver PayReq response                        |
   * | CERT_CHAIN_INVALID              | Counterparty certificate chain is invalid                     |
   * | CERT_CHAIN_EXPIRED              | Counterparty certificate chain has expired                    |
   * | INVALID_PUBKEY_FORMAT           | Counterparty Public key format is invalid                     |
   * | MISSING_REQUIRED_UMA_PARAMETERS | Counterparty required UMA parameters are missing              |
   * | SENDER_NOT_ACCEPTED             | Sender is not accepted                                        |
   * | AMOUNT_OUT_OF_RANGE             | Amount is out of range                                        |
   * | INVALID_CURRENCY                | Currency is invalid                                           |
   * | INVALID_TIMESTAMP               | Timestamp is invalid                                          |
   * | INVALID_NONCE                   | Nonce is invalid                                              |
   * | INVALID_REQUEST_FORMAT          | Request format is invalid                                     |
   * | INVALID_BANK_ACCOUNT            | Bank account is invalid                                       |
   * | SELF_PAYMENT                    | Self payment not allowed                                      |
   * | LOOKUP_REQUEST_FAILED           | Lookup request failed                                         |
   * | PARSE_LNURLP_RESPONSE_ERROR     | Error parsing LNURLP response                                 |
   * | INVALID_AMOUNT                  | Amount is invalid                                             |
   * | WEBHOOK_ENDPOINT_NOT_SET        | Webhook endpoint is not set                                   |
   * | WEBHOOK_DELIVERY_ERROR          | Webhook delivery error                                        |
   */
  code: 'INVALID_BANK_ACCOUNT';

  /**
   * Error message
   */
  override message: string;

  /**
   * HTTP status code
   */
  override status: 400;

  /**
   * Additional error details
   */
  details?: { [key: string]: unknown };

  constructor(status: 400, error: Object, message: string | undefined, headers: Headers) {
    const data = error as Record<string, any>;
    super(status, error, message, headers);

    this.code = data?.['code'];
    this.message = data?.['message'];
    this.status = data?.['status'];
    this.details = data?.['details'];
  }
}

export class InvalidCurrency extends BadRequestError {
  /**
   * | Error Code                      | Description                                                   |
   * | ------------------------------- | ------------------------------------------------------------- |
   * | INVALID_INPUT                   | Invalid input provided                                        |
   * | MISSING_MANDATORY_USER_INFO     | Required customer information is missing                      |
   * | INVITATION_ALREADY_CLAIMED      | Invitation has already been claimed                           |
   * | INVITATIONS_NOT_CONFIGURED      | Invitations are not configured                                |
   * | INVALID_UMA_ADDRESS             | UMA address format is invalid                                 |
   * | INVITATION_CANCELLED            | Invitation has been cancelled                                 |
   * | QUOTE_REQUEST_FAILED            | An issue occurred during the quote process; this is retryable |
   * | INVALID_PAYREQ_RESPONSE         | Counterparty Payreq response was invalid                      |
   * | INVALID_RECEIVER                | Receiver is invalid                                           |
   * | PARSE_PAYREQ_RESPONSE_ERROR     | Error parsing receiver PayReq response                        |
   * | CERT_CHAIN_INVALID              | Counterparty certificate chain is invalid                     |
   * | CERT_CHAIN_EXPIRED              | Counterparty certificate chain has expired                    |
   * | INVALID_PUBKEY_FORMAT           | Counterparty Public key format is invalid                     |
   * | MISSING_REQUIRED_UMA_PARAMETERS | Counterparty required UMA parameters are missing              |
   * | SENDER_NOT_ACCEPTED             | Sender is not accepted                                        |
   * | AMOUNT_OUT_OF_RANGE             | Amount is out of range                                        |
   * | INVALID_CURRENCY                | Currency is invalid                                           |
   * | INVALID_TIMESTAMP               | Timestamp is invalid                                          |
   * | INVALID_NONCE                   | Nonce is invalid                                              |
   * | INVALID_REQUEST_FORMAT          | Request format is invalid                                     |
   * | INVALID_BANK_ACCOUNT            | Bank account is invalid                                       |
   * | SELF_PAYMENT                    | Self payment not allowed                                      |
   * | LOOKUP_REQUEST_FAILED           | Lookup request failed                                         |
   * | PARSE_LNURLP_RESPONSE_ERROR     | Error parsing LNURLP response                                 |
   * | INVALID_AMOUNT                  | Amount is invalid                                             |
   * | WEBHOOK_ENDPOINT_NOT_SET        | Webhook endpoint is not set                                   |
   * | WEBHOOK_DELIVERY_ERROR          | Webhook delivery error                                        |
   */
  code: 'INVALID_CURRENCY';

  /**
   * Error message
   */
  override message: string;

  /**
   * HTTP status code
   */
  override status: 400;

  /**
   * Additional error details
   */
  details?: { [key: string]: unknown };

  constructor(status: 400, error: Object, message: string | undefined, headers: Headers) {
    const data = error as Record<string, any>;
    super(status, error, message, headers);

    this.code = data?.['code'];
    this.message = data?.['message'];
    this.status = data?.['status'];
    this.details = data?.['details'];
  }
}

export class InvalidInput extends BadRequestError {
  /**
   * | Error Code                      | Description                                                   |
   * | ------------------------------- | ------------------------------------------------------------- |
   * | INVALID_INPUT                   | Invalid input provided                                        |
   * | MISSING_MANDATORY_USER_INFO     | Required customer information is missing                      |
   * | INVITATION_ALREADY_CLAIMED      | Invitation has already been claimed                           |
   * | INVITATIONS_NOT_CONFIGURED      | Invitations are not configured                                |
   * | INVALID_UMA_ADDRESS             | UMA address format is invalid                                 |
   * | INVITATION_CANCELLED            | Invitation has been cancelled                                 |
   * | QUOTE_REQUEST_FAILED            | An issue occurred during the quote process; this is retryable |
   * | INVALID_PAYREQ_RESPONSE         | Counterparty Payreq response was invalid                      |
   * | INVALID_RECEIVER                | Receiver is invalid                                           |
   * | PARSE_PAYREQ_RESPONSE_ERROR     | Error parsing receiver PayReq response                        |
   * | CERT_CHAIN_INVALID              | Counterparty certificate chain is invalid                     |
   * | CERT_CHAIN_EXPIRED              | Counterparty certificate chain has expired                    |
   * | INVALID_PUBKEY_FORMAT           | Counterparty Public key format is invalid                     |
   * | MISSING_REQUIRED_UMA_PARAMETERS | Counterparty required UMA parameters are missing              |
   * | SENDER_NOT_ACCEPTED             | Sender is not accepted                                        |
   * | AMOUNT_OUT_OF_RANGE             | Amount is out of range                                        |
   * | INVALID_CURRENCY                | Currency is invalid                                           |
   * | INVALID_TIMESTAMP               | Timestamp is invalid                                          |
   * | INVALID_NONCE                   | Nonce is invalid                                              |
   * | INVALID_REQUEST_FORMAT          | Request format is invalid                                     |
   * | INVALID_BANK_ACCOUNT            | Bank account is invalid                                       |
   * | SELF_PAYMENT                    | Self payment not allowed                                      |
   * | LOOKUP_REQUEST_FAILED           | Lookup request failed                                         |
   * | PARSE_LNURLP_RESPONSE_ERROR     | Error parsing LNURLP response                                 |
   * | INVALID_AMOUNT                  | Amount is invalid                                             |
   * | WEBHOOK_ENDPOINT_NOT_SET        | Webhook endpoint is not set                                   |
   * | WEBHOOK_DELIVERY_ERROR          | Webhook delivery error                                        |
   */
  code: 'INVALID_INPUT';

  /**
   * Error message
   */
  override message: string;

  /**
   * HTTP status code
   */
  override status: 400;

  /**
   * Additional error details
   */
  details?: { [key: string]: unknown };

  constructor(status: 400, error: Object, message: string | undefined, headers: Headers) {
    const data = error as Record<string, any>;
    super(status, error, message, headers);

    this.code = data?.['code'];
    this.message = data?.['message'];
    this.status = data?.['status'];
    this.details = data?.['details'];
  }
}

export class InvalidNonce extends BadRequestError {
  /**
   * | Error Code                      | Description                                                   |
   * | ------------------------------- | ------------------------------------------------------------- |
   * | INVALID_INPUT                   | Invalid input provided                                        |
   * | MISSING_MANDATORY_USER_INFO     | Required customer information is missing                      |
   * | INVITATION_ALREADY_CLAIMED      | Invitation has already been claimed                           |
   * | INVITATIONS_NOT_CONFIGURED      | Invitations are not configured                                |
   * | INVALID_UMA_ADDRESS             | UMA address format is invalid                                 |
   * | INVITATION_CANCELLED            | Invitation has been cancelled                                 |
   * | QUOTE_REQUEST_FAILED            | An issue occurred during the quote process; this is retryable |
   * | INVALID_PAYREQ_RESPONSE         | Counterparty Payreq response was invalid                      |
   * | INVALID_RECEIVER                | Receiver is invalid                                           |
   * | PARSE_PAYREQ_RESPONSE_ERROR     | Error parsing receiver PayReq response                        |
   * | CERT_CHAIN_INVALID              | Counterparty certificate chain is invalid                     |
   * | CERT_CHAIN_EXPIRED              | Counterparty certificate chain has expired                    |
   * | INVALID_PUBKEY_FORMAT           | Counterparty Public key format is invalid                     |
   * | MISSING_REQUIRED_UMA_PARAMETERS | Counterparty required UMA parameters are missing              |
   * | SENDER_NOT_ACCEPTED             | Sender is not accepted                                        |
   * | AMOUNT_OUT_OF_RANGE             | Amount is out of range                                        |
   * | INVALID_CURRENCY                | Currency is invalid                                           |
   * | INVALID_TIMESTAMP               | Timestamp is invalid                                          |
   * | INVALID_NONCE                   | Nonce is invalid                                              |
   * | INVALID_REQUEST_FORMAT          | Request format is invalid                                     |
   * | INVALID_BANK_ACCOUNT            | Bank account is invalid                                       |
   * | SELF_PAYMENT                    | Self payment not allowed                                      |
   * | LOOKUP_REQUEST_FAILED           | Lookup request failed                                         |
   * | PARSE_LNURLP_RESPONSE_ERROR     | Error parsing LNURLP response                                 |
   * | INVALID_AMOUNT                  | Amount is invalid                                             |
   * | WEBHOOK_ENDPOINT_NOT_SET        | Webhook endpoint is not set                                   |
   * | WEBHOOK_DELIVERY_ERROR          | Webhook delivery error                                        |
   */
  code: 'INVALID_NONCE';

  /**
   * Error message
   */
  override message: string;

  /**
   * HTTP status code
   */
  override status: 400;

  /**
   * Additional error details
   */
  details?: { [key: string]: unknown };

  constructor(status: 400, error: Object, message: string | undefined, headers: Headers) {
    const data = error as Record<string, any>;
    super(status, error, message, headers);

    this.code = data?.['code'];
    this.message = data?.['message'];
    this.status = data?.['status'];
    this.details = data?.['details'];
  }
}

export class InvalidPayreqResponse extends BadRequestError {
  /**
   * | Error Code                      | Description                                                   |
   * | ------------------------------- | ------------------------------------------------------------- |
   * | INVALID_INPUT                   | Invalid input provided                                        |
   * | MISSING_MANDATORY_USER_INFO     | Required customer information is missing                      |
   * | INVITATION_ALREADY_CLAIMED      | Invitation has already been claimed                           |
   * | INVITATIONS_NOT_CONFIGURED      | Invitations are not configured                                |
   * | INVALID_UMA_ADDRESS             | UMA address format is invalid                                 |
   * | INVITATION_CANCELLED            | Invitation has been cancelled                                 |
   * | QUOTE_REQUEST_FAILED            | An issue occurred during the quote process; this is retryable |
   * | INVALID_PAYREQ_RESPONSE         | Counterparty Payreq response was invalid                      |
   * | INVALID_RECEIVER                | Receiver is invalid                                           |
   * | PARSE_PAYREQ_RESPONSE_ERROR     | Error parsing receiver PayReq response                        |
   * | CERT_CHAIN_INVALID              | Counterparty certificate chain is invalid                     |
   * | CERT_CHAIN_EXPIRED              | Counterparty certificate chain has expired                    |
   * | INVALID_PUBKEY_FORMAT           | Counterparty Public key format is invalid                     |
   * | MISSING_REQUIRED_UMA_PARAMETERS | Counterparty required UMA parameters are missing              |
   * | SENDER_NOT_ACCEPTED             | Sender is not accepted                                        |
   * | AMOUNT_OUT_OF_RANGE             | Amount is out of range                                        |
   * | INVALID_CURRENCY                | Currency is invalid                                           |
   * | INVALID_TIMESTAMP               | Timestamp is invalid                                          |
   * | INVALID_NONCE                   | Nonce is invalid                                              |
   * | INVALID_REQUEST_FORMAT          | Request format is invalid                                     |
   * | INVALID_BANK_ACCOUNT            | Bank account is invalid                                       |
   * | SELF_PAYMENT                    | Self payment not allowed                                      |
   * | LOOKUP_REQUEST_FAILED           | Lookup request failed                                         |
   * | PARSE_LNURLP_RESPONSE_ERROR     | Error parsing LNURLP response                                 |
   * | INVALID_AMOUNT                  | Amount is invalid                                             |
   * | WEBHOOK_ENDPOINT_NOT_SET        | Webhook endpoint is not set                                   |
   * | WEBHOOK_DELIVERY_ERROR          | Webhook delivery error                                        |
   */
  code: 'INVALID_PAYREQ_RESPONSE';

  /**
   * Error message
   */
  override message: string;

  /**
   * HTTP status code
   */
  override status: 400;

  /**
   * Additional error details
   */
  details?: { [key: string]: unknown };

  constructor(status: 400, error: Object, message: string | undefined, headers: Headers) {
    const data = error as Record<string, any>;
    super(status, error, message, headers);

    this.code = data?.['code'];
    this.message = data?.['message'];
    this.status = data?.['status'];
    this.details = data?.['details'];
  }
}

export class InvalidPubkeyFormat extends BadRequestError {
  /**
   * | Error Code                      | Description                                                   |
   * | ------------------------------- | ------------------------------------------------------------- |
   * | INVALID_INPUT                   | Invalid input provided                                        |
   * | MISSING_MANDATORY_USER_INFO     | Required customer information is missing                      |
   * | INVITATION_ALREADY_CLAIMED      | Invitation has already been claimed                           |
   * | INVITATIONS_NOT_CONFIGURED      | Invitations are not configured                                |
   * | INVALID_UMA_ADDRESS             | UMA address format is invalid                                 |
   * | INVITATION_CANCELLED            | Invitation has been cancelled                                 |
   * | QUOTE_REQUEST_FAILED            | An issue occurred during the quote process; this is retryable |
   * | INVALID_PAYREQ_RESPONSE         | Counterparty Payreq response was invalid                      |
   * | INVALID_RECEIVER                | Receiver is invalid                                           |
   * | PARSE_PAYREQ_RESPONSE_ERROR     | Error parsing receiver PayReq response                        |
   * | CERT_CHAIN_INVALID              | Counterparty certificate chain is invalid                     |
   * | CERT_CHAIN_EXPIRED              | Counterparty certificate chain has expired                    |
   * | INVALID_PUBKEY_FORMAT           | Counterparty Public key format is invalid                     |
   * | MISSING_REQUIRED_UMA_PARAMETERS | Counterparty required UMA parameters are missing              |
   * | SENDER_NOT_ACCEPTED             | Sender is not accepted                                        |
   * | AMOUNT_OUT_OF_RANGE             | Amount is out of range                                        |
   * | INVALID_CURRENCY                | Currency is invalid                                           |
   * | INVALID_TIMESTAMP               | Timestamp is invalid                                          |
   * | INVALID_NONCE                   | Nonce is invalid                                              |
   * | INVALID_REQUEST_FORMAT          | Request format is invalid                                     |
   * | INVALID_BANK_ACCOUNT            | Bank account is invalid                                       |
   * | SELF_PAYMENT                    | Self payment not allowed                                      |
   * | LOOKUP_REQUEST_FAILED           | Lookup request failed                                         |
   * | PARSE_LNURLP_RESPONSE_ERROR     | Error parsing LNURLP response                                 |
   * | INVALID_AMOUNT                  | Amount is invalid                                             |
   * | WEBHOOK_ENDPOINT_NOT_SET        | Webhook endpoint is not set                                   |
   * | WEBHOOK_DELIVERY_ERROR          | Webhook delivery error                                        |
   */
  code: 'INVALID_PUBKEY_FORMAT';

  /**
   * Error message
   */
  override message: string;

  /**
   * HTTP status code
   */
  override status: 400;

  /**
   * Additional error details
   */
  details?: { [key: string]: unknown };

  constructor(status: 400, error: Object, message: string | undefined, headers: Headers) {
    const data = error as Record<string, any>;
    super(status, error, message, headers);

    this.code = data?.['code'];
    this.message = data?.['message'];
    this.status = data?.['status'];
    this.details = data?.['details'];
  }
}

export class InvalidReceiver extends BadRequestError {
  /**
   * | Error Code                      | Description                                                   |
   * | ------------------------------- | ------------------------------------------------------------- |
   * | INVALID_INPUT                   | Invalid input provided                                        |
   * | MISSING_MANDATORY_USER_INFO     | Required customer information is missing                      |
   * | INVITATION_ALREADY_CLAIMED      | Invitation has already been claimed                           |
   * | INVITATIONS_NOT_CONFIGURED      | Invitations are not configured                                |
   * | INVALID_UMA_ADDRESS             | UMA address format is invalid                                 |
   * | INVITATION_CANCELLED            | Invitation has been cancelled                                 |
   * | QUOTE_REQUEST_FAILED            | An issue occurred during the quote process; this is retryable |
   * | INVALID_PAYREQ_RESPONSE         | Counterparty Payreq response was invalid                      |
   * | INVALID_RECEIVER                | Receiver is invalid                                           |
   * | PARSE_PAYREQ_RESPONSE_ERROR     | Error parsing receiver PayReq response                        |
   * | CERT_CHAIN_INVALID              | Counterparty certificate chain is invalid                     |
   * | CERT_CHAIN_EXPIRED              | Counterparty certificate chain has expired                    |
   * | INVALID_PUBKEY_FORMAT           | Counterparty Public key format is invalid                     |
   * | MISSING_REQUIRED_UMA_PARAMETERS | Counterparty required UMA parameters are missing              |
   * | SENDER_NOT_ACCEPTED             | Sender is not accepted                                        |
   * | AMOUNT_OUT_OF_RANGE             | Amount is out of range                                        |
   * | INVALID_CURRENCY                | Currency is invalid                                           |
   * | INVALID_TIMESTAMP               | Timestamp is invalid                                          |
   * | INVALID_NONCE                   | Nonce is invalid                                              |
   * | INVALID_REQUEST_FORMAT          | Request format is invalid                                     |
   * | INVALID_BANK_ACCOUNT            | Bank account is invalid                                       |
   * | SELF_PAYMENT                    | Self payment not allowed                                      |
   * | LOOKUP_REQUEST_FAILED           | Lookup request failed                                         |
   * | PARSE_LNURLP_RESPONSE_ERROR     | Error parsing LNURLP response                                 |
   * | INVALID_AMOUNT                  | Amount is invalid                                             |
   * | WEBHOOK_ENDPOINT_NOT_SET        | Webhook endpoint is not set                                   |
   * | WEBHOOK_DELIVERY_ERROR          | Webhook delivery error                                        |
   */
  code: 'INVALID_RECEIVER';

  /**
   * Error message
   */
  override message: string;

  /**
   * HTTP status code
   */
  override status: 400;

  /**
   * Additional error details
   */
  details?: { [key: string]: unknown };

  constructor(status: 400, error: Object, message: string | undefined, headers: Headers) {
    const data = error as Record<string, any>;
    super(status, error, message, headers);

    this.code = data?.['code'];
    this.message = data?.['message'];
    this.status = data?.['status'];
    this.details = data?.['details'];
  }
}

export class InvalidRequestFormat extends BadRequestError {
  /**
   * | Error Code                      | Description                                                   |
   * | ------------------------------- | ------------------------------------------------------------- |
   * | INVALID_INPUT                   | Invalid input provided                                        |
   * | MISSING_MANDATORY_USER_INFO     | Required customer information is missing                      |
   * | INVITATION_ALREADY_CLAIMED      | Invitation has already been claimed                           |
   * | INVITATIONS_NOT_CONFIGURED      | Invitations are not configured                                |
   * | INVALID_UMA_ADDRESS             | UMA address format is invalid                                 |
   * | INVITATION_CANCELLED            | Invitation has been cancelled                                 |
   * | QUOTE_REQUEST_FAILED            | An issue occurred during the quote process; this is retryable |
   * | INVALID_PAYREQ_RESPONSE         | Counterparty Payreq response was invalid                      |
   * | INVALID_RECEIVER                | Receiver is invalid                                           |
   * | PARSE_PAYREQ_RESPONSE_ERROR     | Error parsing receiver PayReq response                        |
   * | CERT_CHAIN_INVALID              | Counterparty certificate chain is invalid                     |
   * | CERT_CHAIN_EXPIRED              | Counterparty certificate chain has expired                    |
   * | INVALID_PUBKEY_FORMAT           | Counterparty Public key format is invalid                     |
   * | MISSING_REQUIRED_UMA_PARAMETERS | Counterparty required UMA parameters are missing              |
   * | SENDER_NOT_ACCEPTED             | Sender is not accepted                                        |
   * | AMOUNT_OUT_OF_RANGE             | Amount is out of range                                        |
   * | INVALID_CURRENCY                | Currency is invalid                                           |
   * | INVALID_TIMESTAMP               | Timestamp is invalid                                          |
   * | INVALID_NONCE                   | Nonce is invalid                                              |
   * | INVALID_REQUEST_FORMAT          | Request format is invalid                                     |
   * | INVALID_BANK_ACCOUNT            | Bank account is invalid                                       |
   * | SELF_PAYMENT                    | Self payment not allowed                                      |
   * | LOOKUP_REQUEST_FAILED           | Lookup request failed                                         |
   * | PARSE_LNURLP_RESPONSE_ERROR     | Error parsing LNURLP response                                 |
   * | INVALID_AMOUNT                  | Amount is invalid                                             |
   * | WEBHOOK_ENDPOINT_NOT_SET        | Webhook endpoint is not set                                   |
   * | WEBHOOK_DELIVERY_ERROR          | Webhook delivery error                                        |
   */
  code: 'INVALID_REQUEST_FORMAT';

  /**
   * Error message
   */
  override message: string;

  /**
   * HTTP status code
   */
  override status: 400;

  /**
   * Additional error details
   */
  details?: { [key: string]: unknown };

  constructor(status: 400, error: Object, message: string | undefined, headers: Headers) {
    const data = error as Record<string, any>;
    super(status, error, message, headers);

    this.code = data?.['code'];
    this.message = data?.['message'];
    this.status = data?.['status'];
    this.details = data?.['details'];
  }
}

export class InvalidTimestamp extends BadRequestError {
  /**
   * | Error Code                      | Description                                                   |
   * | ------------------------------- | ------------------------------------------------------------- |
   * | INVALID_INPUT                   | Invalid input provided                                        |
   * | MISSING_MANDATORY_USER_INFO     | Required customer information is missing                      |
   * | INVITATION_ALREADY_CLAIMED      | Invitation has already been claimed                           |
   * | INVITATIONS_NOT_CONFIGURED      | Invitations are not configured                                |
   * | INVALID_UMA_ADDRESS             | UMA address format is invalid                                 |
   * | INVITATION_CANCELLED            | Invitation has been cancelled                                 |
   * | QUOTE_REQUEST_FAILED            | An issue occurred during the quote process; this is retryable |
   * | INVALID_PAYREQ_RESPONSE         | Counterparty Payreq response was invalid                      |
   * | INVALID_RECEIVER                | Receiver is invalid                                           |
   * | PARSE_PAYREQ_RESPONSE_ERROR     | Error parsing receiver PayReq response                        |
   * | CERT_CHAIN_INVALID              | Counterparty certificate chain is invalid                     |
   * | CERT_CHAIN_EXPIRED              | Counterparty certificate chain has expired                    |
   * | INVALID_PUBKEY_FORMAT           | Counterparty Public key format is invalid                     |
   * | MISSING_REQUIRED_UMA_PARAMETERS | Counterparty required UMA parameters are missing              |
   * | SENDER_NOT_ACCEPTED             | Sender is not accepted                                        |
   * | AMOUNT_OUT_OF_RANGE             | Amount is out of range                                        |
   * | INVALID_CURRENCY                | Currency is invalid                                           |
   * | INVALID_TIMESTAMP               | Timestamp is invalid                                          |
   * | INVALID_NONCE                   | Nonce is invalid                                              |
   * | INVALID_REQUEST_FORMAT          | Request format is invalid                                     |
   * | INVALID_BANK_ACCOUNT            | Bank account is invalid                                       |
   * | SELF_PAYMENT                    | Self payment not allowed                                      |
   * | LOOKUP_REQUEST_FAILED           | Lookup request failed                                         |
   * | PARSE_LNURLP_RESPONSE_ERROR     | Error parsing LNURLP response                                 |
   * | INVALID_AMOUNT                  | Amount is invalid                                             |
   * | WEBHOOK_ENDPOINT_NOT_SET        | Webhook endpoint is not set                                   |
   * | WEBHOOK_DELIVERY_ERROR          | Webhook delivery error                                        |
   */
  code: 'INVALID_TIMESTAMP';

  /**
   * Error message
   */
  override message: string;

  /**
   * HTTP status code
   */
  override status: 400;

  /**
   * Additional error details
   */
  details?: { [key: string]: unknown };

  constructor(status: 400, error: Object, message: string | undefined, headers: Headers) {
    const data = error as Record<string, any>;
    super(status, error, message, headers);

    this.code = data?.['code'];
    this.message = data?.['message'];
    this.status = data?.['status'];
    this.details = data?.['details'];
  }
}

export class InvalidUmaAddress extends BadRequestError {
  /**
   * | Error Code                      | Description                                                   |
   * | ------------------------------- | ------------------------------------------------------------- |
   * | INVALID_INPUT                   | Invalid input provided                                        |
   * | MISSING_MANDATORY_USER_INFO     | Required customer information is missing                      |
   * | INVITATION_ALREADY_CLAIMED      | Invitation has already been claimed                           |
   * | INVITATIONS_NOT_CONFIGURED      | Invitations are not configured                                |
   * | INVALID_UMA_ADDRESS             | UMA address format is invalid                                 |
   * | INVITATION_CANCELLED            | Invitation has been cancelled                                 |
   * | QUOTE_REQUEST_FAILED            | An issue occurred during the quote process; this is retryable |
   * | INVALID_PAYREQ_RESPONSE         | Counterparty Payreq response was invalid                      |
   * | INVALID_RECEIVER                | Receiver is invalid                                           |
   * | PARSE_PAYREQ_RESPONSE_ERROR     | Error parsing receiver PayReq response                        |
   * | CERT_CHAIN_INVALID              | Counterparty certificate chain is invalid                     |
   * | CERT_CHAIN_EXPIRED              | Counterparty certificate chain has expired                    |
   * | INVALID_PUBKEY_FORMAT           | Counterparty Public key format is invalid                     |
   * | MISSING_REQUIRED_UMA_PARAMETERS | Counterparty required UMA parameters are missing              |
   * | SENDER_NOT_ACCEPTED             | Sender is not accepted                                        |
   * | AMOUNT_OUT_OF_RANGE             | Amount is out of range                                        |
   * | INVALID_CURRENCY                | Currency is invalid                                           |
   * | INVALID_TIMESTAMP               | Timestamp is invalid                                          |
   * | INVALID_NONCE                   | Nonce is invalid                                              |
   * | INVALID_REQUEST_FORMAT          | Request format is invalid                                     |
   * | INVALID_BANK_ACCOUNT            | Bank account is invalid                                       |
   * | SELF_PAYMENT                    | Self payment not allowed                                      |
   * | LOOKUP_REQUEST_FAILED           | Lookup request failed                                         |
   * | PARSE_LNURLP_RESPONSE_ERROR     | Error parsing LNURLP response                                 |
   * | INVALID_AMOUNT                  | Amount is invalid                                             |
   * | WEBHOOK_ENDPOINT_NOT_SET        | Webhook endpoint is not set                                   |
   * | WEBHOOK_DELIVERY_ERROR          | Webhook delivery error                                        |
   */
  code: 'INVALID_UMA_ADDRESS';

  /**
   * Error message
   */
  override message: string;

  /**
   * HTTP status code
   */
  override status: 400;

  /**
   * Additional error details
   */
  details?: { [key: string]: unknown };

  constructor(status: 400, error: Object, message: string | undefined, headers: Headers) {
    const data = error as Record<string, any>;
    super(status, error, message, headers);

    this.code = data?.['code'];
    this.message = data?.['message'];
    this.status = data?.['status'];
    this.details = data?.['details'];
  }
}

export class InvitationAlreadyClaimed extends BadRequestError {
  /**
   * | Error Code                      | Description                                                   |
   * | ------------------------------- | ------------------------------------------------------------- |
   * | INVALID_INPUT                   | Invalid input provided                                        |
   * | MISSING_MANDATORY_USER_INFO     | Required customer information is missing                      |
   * | INVITATION_ALREADY_CLAIMED      | Invitation has already been claimed                           |
   * | INVITATIONS_NOT_CONFIGURED      | Invitations are not configured                                |
   * | INVALID_UMA_ADDRESS             | UMA address format is invalid                                 |
   * | INVITATION_CANCELLED            | Invitation has been cancelled                                 |
   * | QUOTE_REQUEST_FAILED            | An issue occurred during the quote process; this is retryable |
   * | INVALID_PAYREQ_RESPONSE         | Counterparty Payreq response was invalid                      |
   * | INVALID_RECEIVER                | Receiver is invalid                                           |
   * | PARSE_PAYREQ_RESPONSE_ERROR     | Error parsing receiver PayReq response                        |
   * | CERT_CHAIN_INVALID              | Counterparty certificate chain is invalid                     |
   * | CERT_CHAIN_EXPIRED              | Counterparty certificate chain has expired                    |
   * | INVALID_PUBKEY_FORMAT           | Counterparty Public key format is invalid                     |
   * | MISSING_REQUIRED_UMA_PARAMETERS | Counterparty required UMA parameters are missing              |
   * | SENDER_NOT_ACCEPTED             | Sender is not accepted                                        |
   * | AMOUNT_OUT_OF_RANGE             | Amount is out of range                                        |
   * | INVALID_CURRENCY                | Currency is invalid                                           |
   * | INVALID_TIMESTAMP               | Timestamp is invalid                                          |
   * | INVALID_NONCE                   | Nonce is invalid                                              |
   * | INVALID_REQUEST_FORMAT          | Request format is invalid                                     |
   * | INVALID_BANK_ACCOUNT            | Bank account is invalid                                       |
   * | SELF_PAYMENT                    | Self payment not allowed                                      |
   * | LOOKUP_REQUEST_FAILED           | Lookup request failed                                         |
   * | PARSE_LNURLP_RESPONSE_ERROR     | Error parsing LNURLP response                                 |
   * | INVALID_AMOUNT                  | Amount is invalid                                             |
   * | WEBHOOK_ENDPOINT_NOT_SET        | Webhook endpoint is not set                                   |
   * | WEBHOOK_DELIVERY_ERROR          | Webhook delivery error                                        |
   */
  code: 'INVITATION_ALREADY_CLAIMED';

  /**
   * Error message
   */
  override message: string;

  /**
   * HTTP status code
   */
  override status: 400;

  /**
   * Additional error details
   */
  details?: { [key: string]: unknown };

  constructor(status: 400, error: Object, message: string | undefined, headers: Headers) {
    const data = error as Record<string, any>;
    super(status, error, message, headers);

    this.code = data?.['code'];
    this.message = data?.['message'];
    this.status = data?.['status'];
    this.details = data?.['details'];
  }
}

export class InvitationCancelled extends BadRequestError {
  /**
   * | Error Code                      | Description                                                   |
   * | ------------------------------- | ------------------------------------------------------------- |
   * | INVALID_INPUT                   | Invalid input provided                                        |
   * | MISSING_MANDATORY_USER_INFO     | Required customer information is missing                      |
   * | INVITATION_ALREADY_CLAIMED      | Invitation has already been claimed                           |
   * | INVITATIONS_NOT_CONFIGURED      | Invitations are not configured                                |
   * | INVALID_UMA_ADDRESS             | UMA address format is invalid                                 |
   * | INVITATION_CANCELLED            | Invitation has been cancelled                                 |
   * | QUOTE_REQUEST_FAILED            | An issue occurred during the quote process; this is retryable |
   * | INVALID_PAYREQ_RESPONSE         | Counterparty Payreq response was invalid                      |
   * | INVALID_RECEIVER                | Receiver is invalid                                           |
   * | PARSE_PAYREQ_RESPONSE_ERROR     | Error parsing receiver PayReq response                        |
   * | CERT_CHAIN_INVALID              | Counterparty certificate chain is invalid                     |
   * | CERT_CHAIN_EXPIRED              | Counterparty certificate chain has expired                    |
   * | INVALID_PUBKEY_FORMAT           | Counterparty Public key format is invalid                     |
   * | MISSING_REQUIRED_UMA_PARAMETERS | Counterparty required UMA parameters are missing              |
   * | SENDER_NOT_ACCEPTED             | Sender is not accepted                                        |
   * | AMOUNT_OUT_OF_RANGE             | Amount is out of range                                        |
   * | INVALID_CURRENCY                | Currency is invalid                                           |
   * | INVALID_TIMESTAMP               | Timestamp is invalid                                          |
   * | INVALID_NONCE                   | Nonce is invalid                                              |
   * | INVALID_REQUEST_FORMAT          | Request format is invalid                                     |
   * | INVALID_BANK_ACCOUNT            | Bank account is invalid                                       |
   * | SELF_PAYMENT                    | Self payment not allowed                                      |
   * | LOOKUP_REQUEST_FAILED           | Lookup request failed                                         |
   * | PARSE_LNURLP_RESPONSE_ERROR     | Error parsing LNURLP response                                 |
   * | INVALID_AMOUNT                  | Amount is invalid                                             |
   * | WEBHOOK_ENDPOINT_NOT_SET        | Webhook endpoint is not set                                   |
   * | WEBHOOK_DELIVERY_ERROR          | Webhook delivery error                                        |
   */
  code: 'INVITATION_CANCELLED';

  /**
   * Error message
   */
  override message: string;

  /**
   * HTTP status code
   */
  override status: 400;

  /**
   * Additional error details
   */
  details?: { [key: string]: unknown };

  constructor(status: 400, error: Object, message: string | undefined, headers: Headers) {
    const data = error as Record<string, any>;
    super(status, error, message, headers);

    this.code = data?.['code'];
    this.message = data?.['message'];
    this.status = data?.['status'];
    this.details = data?.['details'];
  }
}

export class InvitationsNotConfigured extends BadRequestError {
  /**
   * | Error Code                      | Description                                                   |
   * | ------------------------------- | ------------------------------------------------------------- |
   * | INVALID_INPUT                   | Invalid input provided                                        |
   * | MISSING_MANDATORY_USER_INFO     | Required customer information is missing                      |
   * | INVITATION_ALREADY_CLAIMED      | Invitation has already been claimed                           |
   * | INVITATIONS_NOT_CONFIGURED      | Invitations are not configured                                |
   * | INVALID_UMA_ADDRESS             | UMA address format is invalid                                 |
   * | INVITATION_CANCELLED            | Invitation has been cancelled                                 |
   * | QUOTE_REQUEST_FAILED            | An issue occurred during the quote process; this is retryable |
   * | INVALID_PAYREQ_RESPONSE         | Counterparty Payreq response was invalid                      |
   * | INVALID_RECEIVER                | Receiver is invalid                                           |
   * | PARSE_PAYREQ_RESPONSE_ERROR     | Error parsing receiver PayReq response                        |
   * | CERT_CHAIN_INVALID              | Counterparty certificate chain is invalid                     |
   * | CERT_CHAIN_EXPIRED              | Counterparty certificate chain has expired                    |
   * | INVALID_PUBKEY_FORMAT           | Counterparty Public key format is invalid                     |
   * | MISSING_REQUIRED_UMA_PARAMETERS | Counterparty required UMA parameters are missing              |
   * | SENDER_NOT_ACCEPTED             | Sender is not accepted                                        |
   * | AMOUNT_OUT_OF_RANGE             | Amount is out of range                                        |
   * | INVALID_CURRENCY                | Currency is invalid                                           |
   * | INVALID_TIMESTAMP               | Timestamp is invalid                                          |
   * | INVALID_NONCE                   | Nonce is invalid                                              |
   * | INVALID_REQUEST_FORMAT          | Request format is invalid                                     |
   * | INVALID_BANK_ACCOUNT            | Bank account is invalid                                       |
   * | SELF_PAYMENT                    | Self payment not allowed                                      |
   * | LOOKUP_REQUEST_FAILED           | Lookup request failed                                         |
   * | PARSE_LNURLP_RESPONSE_ERROR     | Error parsing LNURLP response                                 |
   * | INVALID_AMOUNT                  | Amount is invalid                                             |
   * | WEBHOOK_ENDPOINT_NOT_SET        | Webhook endpoint is not set                                   |
   * | WEBHOOK_DELIVERY_ERROR          | Webhook delivery error                                        |
   */
  code: 'INVITATIONS_NOT_CONFIGURED';

  /**
   * Error message
   */
  override message: string;

  /**
   * HTTP status code
   */
  override status: 400;

  /**
   * Additional error details
   */
  details?: { [key: string]: unknown };

  constructor(status: 400, error: Object, message: string | undefined, headers: Headers) {
    const data = error as Record<string, any>;
    super(status, error, message, headers);

    this.code = data?.['code'];
    this.message = data?.['message'];
    this.status = data?.['status'];
    this.details = data?.['details'];
  }
}

export class LookupRequestFailed extends BadRequestError {
  /**
   * | Error Code                      | Description                                                   |
   * | ------------------------------- | ------------------------------------------------------------- |
   * | INVALID_INPUT                   | Invalid input provided                                        |
   * | MISSING_MANDATORY_USER_INFO     | Required customer information is missing                      |
   * | INVITATION_ALREADY_CLAIMED      | Invitation has already been claimed                           |
   * | INVITATIONS_NOT_CONFIGURED      | Invitations are not configured                                |
   * | INVALID_UMA_ADDRESS             | UMA address format is invalid                                 |
   * | INVITATION_CANCELLED            | Invitation has been cancelled                                 |
   * | QUOTE_REQUEST_FAILED            | An issue occurred during the quote process; this is retryable |
   * | INVALID_PAYREQ_RESPONSE         | Counterparty Payreq response was invalid                      |
   * | INVALID_RECEIVER                | Receiver is invalid                                           |
   * | PARSE_PAYREQ_RESPONSE_ERROR     | Error parsing receiver PayReq response                        |
   * | CERT_CHAIN_INVALID              | Counterparty certificate chain is invalid                     |
   * | CERT_CHAIN_EXPIRED              | Counterparty certificate chain has expired                    |
   * | INVALID_PUBKEY_FORMAT           | Counterparty Public key format is invalid                     |
   * | MISSING_REQUIRED_UMA_PARAMETERS | Counterparty required UMA parameters are missing              |
   * | SENDER_NOT_ACCEPTED             | Sender is not accepted                                        |
   * | AMOUNT_OUT_OF_RANGE             | Amount is out of range                                        |
   * | INVALID_CURRENCY                | Currency is invalid                                           |
   * | INVALID_TIMESTAMP               | Timestamp is invalid                                          |
   * | INVALID_NONCE                   | Nonce is invalid                                              |
   * | INVALID_REQUEST_FORMAT          | Request format is invalid                                     |
   * | INVALID_BANK_ACCOUNT            | Bank account is invalid                                       |
   * | SELF_PAYMENT                    | Self payment not allowed                                      |
   * | LOOKUP_REQUEST_FAILED           | Lookup request failed                                         |
   * | PARSE_LNURLP_RESPONSE_ERROR     | Error parsing LNURLP response                                 |
   * | INVALID_AMOUNT                  | Amount is invalid                                             |
   * | WEBHOOK_ENDPOINT_NOT_SET        | Webhook endpoint is not set                                   |
   * | WEBHOOK_DELIVERY_ERROR          | Webhook delivery error                                        |
   */
  code: 'LOOKUP_REQUEST_FAILED';

  /**
   * Error message
   */
  override message: string;

  /**
   * HTTP status code
   */
  override status: 400;

  /**
   * Additional error details
   */
  details?: { [key: string]: unknown };

  constructor(status: 400, error: Object, message: string | undefined, headers: Headers) {
    const data = error as Record<string, any>;
    super(status, error, message, headers);

    this.code = data?.['code'];
    this.message = data?.['message'];
    this.status = data?.['status'];
    this.details = data?.['details'];
  }
}

export class MissingMandatoryUserInfo extends BadRequestError {
  /**
   * | Error Code                      | Description                                                   |
   * | ------------------------------- | ------------------------------------------------------------- |
   * | INVALID_INPUT                   | Invalid input provided                                        |
   * | MISSING_MANDATORY_USER_INFO     | Required customer information is missing                      |
   * | INVITATION_ALREADY_CLAIMED      | Invitation has already been claimed                           |
   * | INVITATIONS_NOT_CONFIGURED      | Invitations are not configured                                |
   * | INVALID_UMA_ADDRESS             | UMA address format is invalid                                 |
   * | INVITATION_CANCELLED            | Invitation has been cancelled                                 |
   * | QUOTE_REQUEST_FAILED            | An issue occurred during the quote process; this is retryable |
   * | INVALID_PAYREQ_RESPONSE         | Counterparty Payreq response was invalid                      |
   * | INVALID_RECEIVER                | Receiver is invalid                                           |
   * | PARSE_PAYREQ_RESPONSE_ERROR     | Error parsing receiver PayReq response                        |
   * | CERT_CHAIN_INVALID              | Counterparty certificate chain is invalid                     |
   * | CERT_CHAIN_EXPIRED              | Counterparty certificate chain has expired                    |
   * | INVALID_PUBKEY_FORMAT           | Counterparty Public key format is invalid                     |
   * | MISSING_REQUIRED_UMA_PARAMETERS | Counterparty required UMA parameters are missing              |
   * | SENDER_NOT_ACCEPTED             | Sender is not accepted                                        |
   * | AMOUNT_OUT_OF_RANGE             | Amount is out of range                                        |
   * | INVALID_CURRENCY                | Currency is invalid                                           |
   * | INVALID_TIMESTAMP               | Timestamp is invalid                                          |
   * | INVALID_NONCE                   | Nonce is invalid                                              |
   * | INVALID_REQUEST_FORMAT          | Request format is invalid                                     |
   * | INVALID_BANK_ACCOUNT            | Bank account is invalid                                       |
   * | SELF_PAYMENT                    | Self payment not allowed                                      |
   * | LOOKUP_REQUEST_FAILED           | Lookup request failed                                         |
   * | PARSE_LNURLP_RESPONSE_ERROR     | Error parsing LNURLP response                                 |
   * | INVALID_AMOUNT                  | Amount is invalid                                             |
   * | WEBHOOK_ENDPOINT_NOT_SET        | Webhook endpoint is not set                                   |
   * | WEBHOOK_DELIVERY_ERROR          | Webhook delivery error                                        |
   */
  code: 'MISSING_MANDATORY_USER_INFO';

  /**
   * Error message
   */
  override message: string;

  /**
   * HTTP status code
   */
  override status: 400;

  /**
   * Additional error details
   */
  details?: { [key: string]: unknown };

  constructor(status: 400, error: Object, message: string | undefined, headers: Headers) {
    const data = error as Record<string, any>;
    super(status, error, message, headers);

    this.code = data?.['code'];
    this.message = data?.['message'];
    this.status = data?.['status'];
    this.details = data?.['details'];
  }
}

export class MissingRequiredUmaParameters extends BadRequestError {
  /**
   * | Error Code                      | Description                                                   |
   * | ------------------------------- | ------------------------------------------------------------- |
   * | INVALID_INPUT                   | Invalid input provided                                        |
   * | MISSING_MANDATORY_USER_INFO     | Required customer information is missing                      |
   * | INVITATION_ALREADY_CLAIMED      | Invitation has already been claimed                           |
   * | INVITATIONS_NOT_CONFIGURED      | Invitations are not configured                                |
   * | INVALID_UMA_ADDRESS             | UMA address format is invalid                                 |
   * | INVITATION_CANCELLED            | Invitation has been cancelled                                 |
   * | QUOTE_REQUEST_FAILED            | An issue occurred during the quote process; this is retryable |
   * | INVALID_PAYREQ_RESPONSE         | Counterparty Payreq response was invalid                      |
   * | INVALID_RECEIVER                | Receiver is invalid                                           |
   * | PARSE_PAYREQ_RESPONSE_ERROR     | Error parsing receiver PayReq response                        |
   * | CERT_CHAIN_INVALID              | Counterparty certificate chain is invalid                     |
   * | CERT_CHAIN_EXPIRED              | Counterparty certificate chain has expired                    |
   * | INVALID_PUBKEY_FORMAT           | Counterparty Public key format is invalid                     |
   * | MISSING_REQUIRED_UMA_PARAMETERS | Counterparty required UMA parameters are missing              |
   * | SENDER_NOT_ACCEPTED             | Sender is not accepted                                        |
   * | AMOUNT_OUT_OF_RANGE             | Amount is out of range                                        |
   * | INVALID_CURRENCY                | Currency is invalid                                           |
   * | INVALID_TIMESTAMP               | Timestamp is invalid                                          |
   * | INVALID_NONCE                   | Nonce is invalid                                              |
   * | INVALID_REQUEST_FORMAT          | Request format is invalid                                     |
   * | INVALID_BANK_ACCOUNT            | Bank account is invalid                                       |
   * | SELF_PAYMENT                    | Self payment not allowed                                      |
   * | LOOKUP_REQUEST_FAILED           | Lookup request failed                                         |
   * | PARSE_LNURLP_RESPONSE_ERROR     | Error parsing LNURLP response                                 |
   * | INVALID_AMOUNT                  | Amount is invalid                                             |
   * | WEBHOOK_ENDPOINT_NOT_SET        | Webhook endpoint is not set                                   |
   * | WEBHOOK_DELIVERY_ERROR          | Webhook delivery error                                        |
   */
  code: 'MISSING_REQUIRED_UMA_PARAMETERS';

  /**
   * Error message
   */
  override message: string;

  /**
   * HTTP status code
   */
  override status: 400;

  /**
   * Additional error details
   */
  details?: { [key: string]: unknown };

  constructor(status: 400, error: Object, message: string | undefined, headers: Headers) {
    const data = error as Record<string, any>;
    super(status, error, message, headers);

    this.code = data?.['code'];
    this.message = data?.['message'];
    this.status = data?.['status'];
    this.details = data?.['details'];
  }
}

export class ParseLnurlpResponseError extends BadRequestError {
  /**
   * | Error Code                      | Description                                                   |
   * | ------------------------------- | ------------------------------------------------------------- |
   * | INVALID_INPUT                   | Invalid input provided                                        |
   * | MISSING_MANDATORY_USER_INFO     | Required customer information is missing                      |
   * | INVITATION_ALREADY_CLAIMED      | Invitation has already been claimed                           |
   * | INVITATIONS_NOT_CONFIGURED      | Invitations are not configured                                |
   * | INVALID_UMA_ADDRESS             | UMA address format is invalid                                 |
   * | INVITATION_CANCELLED            | Invitation has been cancelled                                 |
   * | QUOTE_REQUEST_FAILED            | An issue occurred during the quote process; this is retryable |
   * | INVALID_PAYREQ_RESPONSE         | Counterparty Payreq response was invalid                      |
   * | INVALID_RECEIVER                | Receiver is invalid                                           |
   * | PARSE_PAYREQ_RESPONSE_ERROR     | Error parsing receiver PayReq response                        |
   * | CERT_CHAIN_INVALID              | Counterparty certificate chain is invalid                     |
   * | CERT_CHAIN_EXPIRED              | Counterparty certificate chain has expired                    |
   * | INVALID_PUBKEY_FORMAT           | Counterparty Public key format is invalid                     |
   * | MISSING_REQUIRED_UMA_PARAMETERS | Counterparty required UMA parameters are missing              |
   * | SENDER_NOT_ACCEPTED             | Sender is not accepted                                        |
   * | AMOUNT_OUT_OF_RANGE             | Amount is out of range                                        |
   * | INVALID_CURRENCY                | Currency is invalid                                           |
   * | INVALID_TIMESTAMP               | Timestamp is invalid                                          |
   * | INVALID_NONCE                   | Nonce is invalid                                              |
   * | INVALID_REQUEST_FORMAT          | Request format is invalid                                     |
   * | INVALID_BANK_ACCOUNT            | Bank account is invalid                                       |
   * | SELF_PAYMENT                    | Self payment not allowed                                      |
   * | LOOKUP_REQUEST_FAILED           | Lookup request failed                                         |
   * | PARSE_LNURLP_RESPONSE_ERROR     | Error parsing LNURLP response                                 |
   * | INVALID_AMOUNT                  | Amount is invalid                                             |
   * | WEBHOOK_ENDPOINT_NOT_SET        | Webhook endpoint is not set                                   |
   * | WEBHOOK_DELIVERY_ERROR          | Webhook delivery error                                        |
   */
  code: 'PARSE_LNURLP_RESPONSE_ERROR';

  /**
   * Error message
   */
  override message: string;

  /**
   * HTTP status code
   */
  override status: 400;

  /**
   * Additional error details
   */
  details?: { [key: string]: unknown };

  constructor(status: 400, error: Object, message: string | undefined, headers: Headers) {
    const data = error as Record<string, any>;
    super(status, error, message, headers);

    this.code = data?.['code'];
    this.message = data?.['message'];
    this.status = data?.['status'];
    this.details = data?.['details'];
  }
}

export class ParsePayreqResponseError extends BadRequestError {
  /**
   * | Error Code                      | Description                                                   |
   * | ------------------------------- | ------------------------------------------------------------- |
   * | INVALID_INPUT                   | Invalid input provided                                        |
   * | MISSING_MANDATORY_USER_INFO     | Required customer information is missing                      |
   * | INVITATION_ALREADY_CLAIMED      | Invitation has already been claimed                           |
   * | INVITATIONS_NOT_CONFIGURED      | Invitations are not configured                                |
   * | INVALID_UMA_ADDRESS             | UMA address format is invalid                                 |
   * | INVITATION_CANCELLED            | Invitation has been cancelled                                 |
   * | QUOTE_REQUEST_FAILED            | An issue occurred during the quote process; this is retryable |
   * | INVALID_PAYREQ_RESPONSE         | Counterparty Payreq response was invalid                      |
   * | INVALID_RECEIVER                | Receiver is invalid                                           |
   * | PARSE_PAYREQ_RESPONSE_ERROR     | Error parsing receiver PayReq response                        |
   * | CERT_CHAIN_INVALID              | Counterparty certificate chain is invalid                     |
   * | CERT_CHAIN_EXPIRED              | Counterparty certificate chain has expired                    |
   * | INVALID_PUBKEY_FORMAT           | Counterparty Public key format is invalid                     |
   * | MISSING_REQUIRED_UMA_PARAMETERS | Counterparty required UMA parameters are missing              |
   * | SENDER_NOT_ACCEPTED             | Sender is not accepted                                        |
   * | AMOUNT_OUT_OF_RANGE             | Amount is out of range                                        |
   * | INVALID_CURRENCY                | Currency is invalid                                           |
   * | INVALID_TIMESTAMP               | Timestamp is invalid                                          |
   * | INVALID_NONCE                   | Nonce is invalid                                              |
   * | INVALID_REQUEST_FORMAT          | Request format is invalid                                     |
   * | INVALID_BANK_ACCOUNT            | Bank account is invalid                                       |
   * | SELF_PAYMENT                    | Self payment not allowed                                      |
   * | LOOKUP_REQUEST_FAILED           | Lookup request failed                                         |
   * | PARSE_LNURLP_RESPONSE_ERROR     | Error parsing LNURLP response                                 |
   * | INVALID_AMOUNT                  | Amount is invalid                                             |
   * | WEBHOOK_ENDPOINT_NOT_SET        | Webhook endpoint is not set                                   |
   * | WEBHOOK_DELIVERY_ERROR          | Webhook delivery error                                        |
   */
  code: 'PARSE_PAYREQ_RESPONSE_ERROR';

  /**
   * Error message
   */
  override message: string;

  /**
   * HTTP status code
   */
  override status: 400;

  /**
   * Additional error details
   */
  details?: { [key: string]: unknown };

  constructor(status: 400, error: Object, message: string | undefined, headers: Headers) {
    const data = error as Record<string, any>;
    super(status, error, message, headers);

    this.code = data?.['code'];
    this.message = data?.['message'];
    this.status = data?.['status'];
    this.details = data?.['details'];
  }
}

export class QuoteRequestFailed extends BadRequestError {
  /**
   * | Error Code                      | Description                                                   |
   * | ------------------------------- | ------------------------------------------------------------- |
   * | INVALID_INPUT                   | Invalid input provided                                        |
   * | MISSING_MANDATORY_USER_INFO     | Required customer information is missing                      |
   * | INVITATION_ALREADY_CLAIMED      | Invitation has already been claimed                           |
   * | INVITATIONS_NOT_CONFIGURED      | Invitations are not configured                                |
   * | INVALID_UMA_ADDRESS             | UMA address format is invalid                                 |
   * | INVITATION_CANCELLED            | Invitation has been cancelled                                 |
   * | QUOTE_REQUEST_FAILED            | An issue occurred during the quote process; this is retryable |
   * | INVALID_PAYREQ_RESPONSE         | Counterparty Payreq response was invalid                      |
   * | INVALID_RECEIVER                | Receiver is invalid                                           |
   * | PARSE_PAYREQ_RESPONSE_ERROR     | Error parsing receiver PayReq response                        |
   * | CERT_CHAIN_INVALID              | Counterparty certificate chain is invalid                     |
   * | CERT_CHAIN_EXPIRED              | Counterparty certificate chain has expired                    |
   * | INVALID_PUBKEY_FORMAT           | Counterparty Public key format is invalid                     |
   * | MISSING_REQUIRED_UMA_PARAMETERS | Counterparty required UMA parameters are missing              |
   * | SENDER_NOT_ACCEPTED             | Sender is not accepted                                        |
   * | AMOUNT_OUT_OF_RANGE             | Amount is out of range                                        |
   * | INVALID_CURRENCY                | Currency is invalid                                           |
   * | INVALID_TIMESTAMP               | Timestamp is invalid                                          |
   * | INVALID_NONCE                   | Nonce is invalid                                              |
   * | INVALID_REQUEST_FORMAT          | Request format is invalid                                     |
   * | INVALID_BANK_ACCOUNT            | Bank account is invalid                                       |
   * | SELF_PAYMENT                    | Self payment not allowed                                      |
   * | LOOKUP_REQUEST_FAILED           | Lookup request failed                                         |
   * | PARSE_LNURLP_RESPONSE_ERROR     | Error parsing LNURLP response                                 |
   * | INVALID_AMOUNT                  | Amount is invalid                                             |
   * | WEBHOOK_ENDPOINT_NOT_SET        | Webhook endpoint is not set                                   |
   * | WEBHOOK_DELIVERY_ERROR          | Webhook delivery error                                        |
   */
  code: 'QUOTE_REQUEST_FAILED';

  /**
   * Error message
   */
  override message: string;

  /**
   * HTTP status code
   */
  override status: 400;

  /**
   * Additional error details
   */
  details?: { [key: string]: unknown };

  constructor(status: 400, error: Object, message: string | undefined, headers: Headers) {
    const data = error as Record<string, any>;
    super(status, error, message, headers);

    this.code = data?.['code'];
    this.message = data?.['message'];
    this.status = data?.['status'];
    this.details = data?.['details'];
  }
}

export class SelfPayment extends BadRequestError {
  /**
   * | Error Code                      | Description                                                   |
   * | ------------------------------- | ------------------------------------------------------------- |
   * | INVALID_INPUT                   | Invalid input provided                                        |
   * | MISSING_MANDATORY_USER_INFO     | Required customer information is missing                      |
   * | INVITATION_ALREADY_CLAIMED      | Invitation has already been claimed                           |
   * | INVITATIONS_NOT_CONFIGURED      | Invitations are not configured                                |
   * | INVALID_UMA_ADDRESS             | UMA address format is invalid                                 |
   * | INVITATION_CANCELLED            | Invitation has been cancelled                                 |
   * | QUOTE_REQUEST_FAILED            | An issue occurred during the quote process; this is retryable |
   * | INVALID_PAYREQ_RESPONSE         | Counterparty Payreq response was invalid                      |
   * | INVALID_RECEIVER                | Receiver is invalid                                           |
   * | PARSE_PAYREQ_RESPONSE_ERROR     | Error parsing receiver PayReq response                        |
   * | CERT_CHAIN_INVALID              | Counterparty certificate chain is invalid                     |
   * | CERT_CHAIN_EXPIRED              | Counterparty certificate chain has expired                    |
   * | INVALID_PUBKEY_FORMAT           | Counterparty Public key format is invalid                     |
   * | MISSING_REQUIRED_UMA_PARAMETERS | Counterparty required UMA parameters are missing              |
   * | SENDER_NOT_ACCEPTED             | Sender is not accepted                                        |
   * | AMOUNT_OUT_OF_RANGE             | Amount is out of range                                        |
   * | INVALID_CURRENCY                | Currency is invalid                                           |
   * | INVALID_TIMESTAMP               | Timestamp is invalid                                          |
   * | INVALID_NONCE                   | Nonce is invalid                                              |
   * | INVALID_REQUEST_FORMAT          | Request format is invalid                                     |
   * | INVALID_BANK_ACCOUNT            | Bank account is invalid                                       |
   * | SELF_PAYMENT                    | Self payment not allowed                                      |
   * | LOOKUP_REQUEST_FAILED           | Lookup request failed                                         |
   * | PARSE_LNURLP_RESPONSE_ERROR     | Error parsing LNURLP response                                 |
   * | INVALID_AMOUNT                  | Amount is invalid                                             |
   * | WEBHOOK_ENDPOINT_NOT_SET        | Webhook endpoint is not set                                   |
   * | WEBHOOK_DELIVERY_ERROR          | Webhook delivery error                                        |
   */
  code: 'SELF_PAYMENT';

  /**
   * Error message
   */
  override message: string;

  /**
   * HTTP status code
   */
  override status: 400;

  /**
   * Additional error details
   */
  details?: { [key: string]: unknown };

  constructor(status: 400, error: Object, message: string | undefined, headers: Headers) {
    const data = error as Record<string, any>;
    super(status, error, message, headers);

    this.code = data?.['code'];
    this.message = data?.['message'];
    this.status = data?.['status'];
    this.details = data?.['details'];
  }
}

export class SenderNotAccepted extends BadRequestError {
  /**
   * | Error Code                      | Description                                                   |
   * | ------------------------------- | ------------------------------------------------------------- |
   * | INVALID_INPUT                   | Invalid input provided                                        |
   * | MISSING_MANDATORY_USER_INFO     | Required customer information is missing                      |
   * | INVITATION_ALREADY_CLAIMED      | Invitation has already been claimed                           |
   * | INVITATIONS_NOT_CONFIGURED      | Invitations are not configured                                |
   * | INVALID_UMA_ADDRESS             | UMA address format is invalid                                 |
   * | INVITATION_CANCELLED            | Invitation has been cancelled                                 |
   * | QUOTE_REQUEST_FAILED            | An issue occurred during the quote process; this is retryable |
   * | INVALID_PAYREQ_RESPONSE         | Counterparty Payreq response was invalid                      |
   * | INVALID_RECEIVER                | Receiver is invalid                                           |
   * | PARSE_PAYREQ_RESPONSE_ERROR     | Error parsing receiver PayReq response                        |
   * | CERT_CHAIN_INVALID              | Counterparty certificate chain is invalid                     |
   * | CERT_CHAIN_EXPIRED              | Counterparty certificate chain has expired                    |
   * | INVALID_PUBKEY_FORMAT           | Counterparty Public key format is invalid                     |
   * | MISSING_REQUIRED_UMA_PARAMETERS | Counterparty required UMA parameters are missing              |
   * | SENDER_NOT_ACCEPTED             | Sender is not accepted                                        |
   * | AMOUNT_OUT_OF_RANGE             | Amount is out of range                                        |
   * | INVALID_CURRENCY                | Currency is invalid                                           |
   * | INVALID_TIMESTAMP               | Timestamp is invalid                                          |
   * | INVALID_NONCE                   | Nonce is invalid                                              |
   * | INVALID_REQUEST_FORMAT          | Request format is invalid                                     |
   * | INVALID_BANK_ACCOUNT            | Bank account is invalid                                       |
   * | SELF_PAYMENT                    | Self payment not allowed                                      |
   * | LOOKUP_REQUEST_FAILED           | Lookup request failed                                         |
   * | PARSE_LNURLP_RESPONSE_ERROR     | Error parsing LNURLP response                                 |
   * | INVALID_AMOUNT                  | Amount is invalid                                             |
   * | WEBHOOK_ENDPOINT_NOT_SET        | Webhook endpoint is not set                                   |
   * | WEBHOOK_DELIVERY_ERROR          | Webhook delivery error                                        |
   */
  code: 'SENDER_NOT_ACCEPTED';

  /**
   * Error message
   */
  override message: string;

  /**
   * HTTP status code
   */
  override status: 400;

  /**
   * Additional error details
   */
  details?: { [key: string]: unknown };

  constructor(status: 400, error: Object, message: string | undefined, headers: Headers) {
    const data = error as Record<string, any>;
    super(status, error, message, headers);

    this.code = data?.['code'];
    this.message = data?.['message'];
    this.status = data?.['status'];
    this.details = data?.['details'];
  }
}

export class WebhookDeliveryError extends BadRequestError {
  /**
   * | Error Code                      | Description                                                   |
   * | ------------------------------- | ------------------------------------------------------------- |
   * | INVALID_INPUT                   | Invalid input provided                                        |
   * | MISSING_MANDATORY_USER_INFO     | Required customer information is missing                      |
   * | INVITATION_ALREADY_CLAIMED      | Invitation has already been claimed                           |
   * | INVITATIONS_NOT_CONFIGURED      | Invitations are not configured                                |
   * | INVALID_UMA_ADDRESS             | UMA address format is invalid                                 |
   * | INVITATION_CANCELLED            | Invitation has been cancelled                                 |
   * | QUOTE_REQUEST_FAILED            | An issue occurred during the quote process; this is retryable |
   * | INVALID_PAYREQ_RESPONSE         | Counterparty Payreq response was invalid                      |
   * | INVALID_RECEIVER                | Receiver is invalid                                           |
   * | PARSE_PAYREQ_RESPONSE_ERROR     | Error parsing receiver PayReq response                        |
   * | CERT_CHAIN_INVALID              | Counterparty certificate chain is invalid                     |
   * | CERT_CHAIN_EXPIRED              | Counterparty certificate chain has expired                    |
   * | INVALID_PUBKEY_FORMAT           | Counterparty Public key format is invalid                     |
   * | MISSING_REQUIRED_UMA_PARAMETERS | Counterparty required UMA parameters are missing              |
   * | SENDER_NOT_ACCEPTED             | Sender is not accepted                                        |
   * | AMOUNT_OUT_OF_RANGE             | Amount is out of range                                        |
   * | INVALID_CURRENCY                | Currency is invalid                                           |
   * | INVALID_TIMESTAMP               | Timestamp is invalid                                          |
   * | INVALID_NONCE                   | Nonce is invalid                                              |
   * | INVALID_REQUEST_FORMAT          | Request format is invalid                                     |
   * | INVALID_BANK_ACCOUNT            | Bank account is invalid                                       |
   * | SELF_PAYMENT                    | Self payment not allowed                                      |
   * | LOOKUP_REQUEST_FAILED           | Lookup request failed                                         |
   * | PARSE_LNURLP_RESPONSE_ERROR     | Error parsing LNURLP response                                 |
   * | INVALID_AMOUNT                  | Amount is invalid                                             |
   * | WEBHOOK_ENDPOINT_NOT_SET        | Webhook endpoint is not set                                   |
   * | WEBHOOK_DELIVERY_ERROR          | Webhook delivery error                                        |
   */
  code: 'WEBHOOK_DELIVERY_ERROR';

  /**
   * Error message
   */
  override message: string;

  /**
   * HTTP status code
   */
  override status: 400;

  /**
   * Additional error details
   */
  details?: { [key: string]: unknown };

  constructor(status: 400, error: Object, message: string | undefined, headers: Headers) {
    const data = error as Record<string, any>;
    super(status, error, message, headers);

    this.code = data?.['code'];
    this.message = data?.['message'];
    this.status = data?.['status'];
    this.details = data?.['details'];
  }
}

export class WebhookEndpointNotSet extends BadRequestError {
  /**
   * | Error Code                      | Description                                                   |
   * | ------------------------------- | ------------------------------------------------------------- |
   * | INVALID_INPUT                   | Invalid input provided                                        |
   * | MISSING_MANDATORY_USER_INFO     | Required customer information is missing                      |
   * | INVITATION_ALREADY_CLAIMED      | Invitation has already been claimed                           |
   * | INVITATIONS_NOT_CONFIGURED      | Invitations are not configured                                |
   * | INVALID_UMA_ADDRESS             | UMA address format is invalid                                 |
   * | INVITATION_CANCELLED            | Invitation has been cancelled                                 |
   * | QUOTE_REQUEST_FAILED            | An issue occurred during the quote process; this is retryable |
   * | INVALID_PAYREQ_RESPONSE         | Counterparty Payreq response was invalid                      |
   * | INVALID_RECEIVER                | Receiver is invalid                                           |
   * | PARSE_PAYREQ_RESPONSE_ERROR     | Error parsing receiver PayReq response                        |
   * | CERT_CHAIN_INVALID              | Counterparty certificate chain is invalid                     |
   * | CERT_CHAIN_EXPIRED              | Counterparty certificate chain has expired                    |
   * | INVALID_PUBKEY_FORMAT           | Counterparty Public key format is invalid                     |
   * | MISSING_REQUIRED_UMA_PARAMETERS | Counterparty required UMA parameters are missing              |
   * | SENDER_NOT_ACCEPTED             | Sender is not accepted                                        |
   * | AMOUNT_OUT_OF_RANGE             | Amount is out of range                                        |
   * | INVALID_CURRENCY                | Currency is invalid                                           |
   * | INVALID_TIMESTAMP               | Timestamp is invalid                                          |
   * | INVALID_NONCE                   | Nonce is invalid                                              |
   * | INVALID_REQUEST_FORMAT          | Request format is invalid                                     |
   * | INVALID_BANK_ACCOUNT            | Bank account is invalid                                       |
   * | SELF_PAYMENT                    | Self payment not allowed                                      |
   * | LOOKUP_REQUEST_FAILED           | Lookup request failed                                         |
   * | PARSE_LNURLP_RESPONSE_ERROR     | Error parsing LNURLP response                                 |
   * | INVALID_AMOUNT                  | Amount is invalid                                             |
   * | WEBHOOK_ENDPOINT_NOT_SET        | Webhook endpoint is not set                                   |
   * | WEBHOOK_DELIVERY_ERROR          | Webhook delivery error                                        |
   */
  code: 'WEBHOOK_ENDPOINT_NOT_SET';

  /**
   * Error message
   */
  override message: string;

  /**
   * HTTP status code
   */
  override status: 400;

  /**
   * Additional error details
   */
  details?: { [key: string]: unknown };

  constructor(status: 400, error: Object, message: string | undefined, headers: Headers) {
    const data = error as Record<string, any>;
    super(status, error, message, headers);

    this.code = data?.['code'];
    this.message = data?.['message'];
    this.status = data?.['status'];
    this.details = data?.['details'];
  }
}

export class InvalidSignature extends AuthenticationError {
  /**
   * | Error Code        | Description                 |
   * | ----------------- | --------------------------- |
   * | UNAUTHORIZED      | Issue with API credentials  |
   * | INVALID_SIGNATURE | Signature header is invalid |
   */
  code: 'INVALID_SIGNATURE';

  /**
   * Error message
   */
  override message: string;

  /**
   * HTTP status code
   */
  override status: 401;

  /**
   * Additional error details
   */
  details?: { [key: string]: unknown };

  constructor(status: 401, error: Object, message: string | undefined, headers: Headers) {
    const data = error as Record<string, any>;
    super(status, error, message, headers);

    this.code = data?.['code'];
    this.message = data?.['message'];
    this.status = data?.['status'];
    this.details = data?.['details'];
  }
}

export class Unauthorized extends AuthenticationError {
  /**
   * | Error Code        | Description                 |
   * | ----------------- | --------------------------- |
   * | UNAUTHORIZED      | Issue with API credentials  |
   * | INVALID_SIGNATURE | Signature header is invalid |
   */
  code: 'UNAUTHORIZED';

  /**
   * Error message
   */
  override message: string;

  /**
   * HTTP status code
   */
  override status: 401;

  /**
   * Additional error details
   */
  details?: { [key: string]: unknown };

  constructor(status: 401, error: Object, message: string | undefined, headers: Headers) {
    const data = error as Record<string, any>;
    super(status, error, message, headers);

    this.code = data?.['code'];
    this.message = data?.['message'];
    this.status = data?.['status'];
    this.details = data?.['details'];
  }
}

export class CounterpartyNotAllowed extends PermissionDeniedError {
  /**
   * | Error Code               | Description                                        |
   * | ------------------------ | -------------------------------------------------- |
   * | FORBIDDEN                | Insufficient permissions                           |
   * | USER_NOT_READY           | Customer exists but is not ready for operation     |
   * | COUNTERPARTY_NOT_ALLOWED | Counterparty has not been enabled for your account |
   * | VELOCITY_LIMIT_EXCEEDED  | Counterparty has exceeded velocity limits          |
   */
  code: 'COUNTERPARTY_NOT_ALLOWED';

  /**
   * Error message
   */
  override message: string;

  /**
   * HTTP status code
   */
  override status: 403;

  /**
   * Additional error details
   */
  details?: { [key: string]: unknown };

  constructor(status: 403, error: Object, message: string | undefined, headers: Headers) {
    const data = error as Record<string, any>;
    super(status, error, message, headers);

    this.code = data?.['code'];
    this.message = data?.['message'];
    this.status = data?.['status'];
    this.details = data?.['details'];
  }
}

export class Forbidden extends PermissionDeniedError {
  /**
   * | Error Code               | Description                                        |
   * | ------------------------ | -------------------------------------------------- |
   * | FORBIDDEN                | Insufficient permissions                           |
   * | USER_NOT_READY           | Customer exists but is not ready for operation     |
   * | COUNTERPARTY_NOT_ALLOWED | Counterparty has not been enabled for your account |
   * | VELOCITY_LIMIT_EXCEEDED  | Counterparty has exceeded velocity limits          |
   */
  code: 'FORBIDDEN';

  /**
   * Error message
   */
  override message: string;

  /**
   * HTTP status code
   */
  override status: 403;

  /**
   * Additional error details
   */
  details?: { [key: string]: unknown };

  constructor(status: 403, error: Object, message: string | undefined, headers: Headers) {
    const data = error as Record<string, any>;
    super(status, error, message, headers);

    this.code = data?.['code'];
    this.message = data?.['message'];
    this.status = data?.['status'];
    this.details = data?.['details'];
  }
}

export class UserNotReady extends PermissionDeniedError {
  /**
   * | Error Code               | Description                                        |
   * | ------------------------ | -------------------------------------------------- |
   * | FORBIDDEN                | Insufficient permissions                           |
   * | USER_NOT_READY           | Customer exists but is not ready for operation     |
   * | COUNTERPARTY_NOT_ALLOWED | Counterparty has not been enabled for your account |
   * | VELOCITY_LIMIT_EXCEEDED  | Counterparty has exceeded velocity limits          |
   */
  code: 'USER_NOT_READY';

  /**
   * Error message
   */
  override message: string;

  /**
   * HTTP status code
   */
  override status: 403;

  /**
   * Additional error details
   */
  details?: { [key: string]: unknown };

  constructor(status: 403, error: Object, message: string | undefined, headers: Headers) {
    const data = error as Record<string, any>;
    super(status, error, message, headers);

    this.code = data?.['code'];
    this.message = data?.['message'];
    this.status = data?.['status'];
    this.details = data?.['details'];
  }
}

export class VelocityLimitExceeded extends PermissionDeniedError {
  /**
   * | Error Code               | Description                                        |
   * | ------------------------ | -------------------------------------------------- |
   * | FORBIDDEN                | Insufficient permissions                           |
   * | USER_NOT_READY           | Customer exists but is not ready for operation     |
   * | COUNTERPARTY_NOT_ALLOWED | Counterparty has not been enabled for your account |
   * | VELOCITY_LIMIT_EXCEEDED  | Counterparty has exceeded velocity limits          |
   */
  code: 'VELOCITY_LIMIT_EXCEEDED';

  /**
   * Error message
   */
  override message: string;

  /**
   * HTTP status code
   */
  override status: 403;

  /**
   * Additional error details
   */
  details?: { [key: string]: unknown };

  constructor(status: 403, error: Object, message: string | undefined, headers: Headers) {
    const data = error as Record<string, any>;
    super(status, error, message, headers);

    this.code = data?.['code'];
    this.message = data?.['message'];
    this.status = data?.['status'];
    this.details = data?.['details'];
  }
}

export class BulkUploadJobNotFound extends NotFoundError {
  /**
   * | Error Code                | Description               |
   * | ------------------------- | ------------------------- |
   * | TRANSACTION_NOT_FOUND     | Transaction not found     |
   * | INVITATION_NOT_FOUND      | Invitation not found      |
   * | USER_NOT_FOUND            | Customer not found        |
   * | QUOTE_NOT_FOUND           | Quote not found           |
   * | LOOKUP_REQUEST_NOT_FOUND  | Lookup request not found  |
   * | TOKEN_NOT_FOUND           | Token not found           |
   * | BULK_UPLOAD_JOB_NOT_FOUND | Bulk upload job not found |
   * | REFERENCE_NOT_FOUND       | Reference not found       |
   */
  code: 'BULK_UPLOAD_JOB_NOT_FOUND';

  /**
   * Error message
   */
  override message: string;

  /**
   * HTTP status code
   */
  override status: 404;

  /**
   * Additional error details
   */
  details?: { [key: string]: unknown };

  constructor(status: 404, error: Object, message: string | undefined, headers: Headers) {
    const data = error as Record<string, any>;
    super(status, error, message, headers);

    this.code = data?.['code'];
    this.message = data?.['message'];
    this.status = data?.['status'];
    this.details = data?.['details'];
  }
}

export class InvitationNotFound extends NotFoundError {
  /**
   * | Error Code                | Description               |
   * | ------------------------- | ------------------------- |
   * | TRANSACTION_NOT_FOUND     | Transaction not found     |
   * | INVITATION_NOT_FOUND      | Invitation not found      |
   * | USER_NOT_FOUND            | Customer not found        |
   * | QUOTE_NOT_FOUND           | Quote not found           |
   * | LOOKUP_REQUEST_NOT_FOUND  | Lookup request not found  |
   * | TOKEN_NOT_FOUND           | Token not found           |
   * | BULK_UPLOAD_JOB_NOT_FOUND | Bulk upload job not found |
   * | REFERENCE_NOT_FOUND       | Reference not found       |
   */
  code: 'INVITATION_NOT_FOUND';

  /**
   * Error message
   */
  override message: string;

  /**
   * HTTP status code
   */
  override status: 404;

  /**
   * Additional error details
   */
  details?: { [key: string]: unknown };

  constructor(status: 404, error: Object, message: string | undefined, headers: Headers) {
    const data = error as Record<string, any>;
    super(status, error, message, headers);

    this.code = data?.['code'];
    this.message = data?.['message'];
    this.status = data?.['status'];
    this.details = data?.['details'];
  }
}

export class LookupRequestNotFound extends NotFoundError {
  /**
   * | Error Code                | Description               |
   * | ------------------------- | ------------------------- |
   * | TRANSACTION_NOT_FOUND     | Transaction not found     |
   * | INVITATION_NOT_FOUND      | Invitation not found      |
   * | USER_NOT_FOUND            | Customer not found        |
   * | QUOTE_NOT_FOUND           | Quote not found           |
   * | LOOKUP_REQUEST_NOT_FOUND  | Lookup request not found  |
   * | TOKEN_NOT_FOUND           | Token not found           |
   * | BULK_UPLOAD_JOB_NOT_FOUND | Bulk upload job not found |
   * | REFERENCE_NOT_FOUND       | Reference not found       |
   */
  code: 'LOOKUP_REQUEST_NOT_FOUND';

  /**
   * Error message
   */
  override message: string;

  /**
   * HTTP status code
   */
  override status: 404;

  /**
   * Additional error details
   */
  details?: { [key: string]: unknown };

  constructor(status: 404, error: Object, message: string | undefined, headers: Headers) {
    const data = error as Record<string, any>;
    super(status, error, message, headers);

    this.code = data?.['code'];
    this.message = data?.['message'];
    this.status = data?.['status'];
    this.details = data?.['details'];
  }
}

export class QuoteNotFound extends NotFoundError {
  /**
   * | Error Code                | Description               |
   * | ------------------------- | ------------------------- |
   * | TRANSACTION_NOT_FOUND     | Transaction not found     |
   * | INVITATION_NOT_FOUND      | Invitation not found      |
   * | USER_NOT_FOUND            | Customer not found        |
   * | QUOTE_NOT_FOUND           | Quote not found           |
   * | LOOKUP_REQUEST_NOT_FOUND  | Lookup request not found  |
   * | TOKEN_NOT_FOUND           | Token not found           |
   * | BULK_UPLOAD_JOB_NOT_FOUND | Bulk upload job not found |
   * | REFERENCE_NOT_FOUND       | Reference not found       |
   */
  code: 'QUOTE_NOT_FOUND';

  /**
   * Error message
   */
  override message: string;

  /**
   * HTTP status code
   */
  override status: 404;

  /**
   * Additional error details
   */
  details?: { [key: string]: unknown };

  constructor(status: 404, error: Object, message: string | undefined, headers: Headers) {
    const data = error as Record<string, any>;
    super(status, error, message, headers);

    this.code = data?.['code'];
    this.message = data?.['message'];
    this.status = data?.['status'];
    this.details = data?.['details'];
  }
}

export class ReferenceNotFound extends NotFoundError {
  /**
   * | Error Code                | Description               |
   * | ------------------------- | ------------------------- |
   * | TRANSACTION_NOT_FOUND     | Transaction not found     |
   * | INVITATION_NOT_FOUND      | Invitation not found      |
   * | USER_NOT_FOUND            | Customer not found        |
   * | QUOTE_NOT_FOUND           | Quote not found           |
   * | LOOKUP_REQUEST_NOT_FOUND  | Lookup request not found  |
   * | TOKEN_NOT_FOUND           | Token not found           |
   * | BULK_UPLOAD_JOB_NOT_FOUND | Bulk upload job not found |
   * | REFERENCE_NOT_FOUND       | Reference not found       |
   */
  code: 'REFERENCE_NOT_FOUND';

  /**
   * Error message
   */
  override message: string;

  /**
   * HTTP status code
   */
  override status: 404;

  /**
   * Additional error details
   */
  details?: { [key: string]: unknown };

  constructor(status: 404, error: Object, message: string | undefined, headers: Headers) {
    const data = error as Record<string, any>;
    super(status, error, message, headers);

    this.code = data?.['code'];
    this.message = data?.['message'];
    this.status = data?.['status'];
    this.details = data?.['details'];
  }
}

export class TokenNotFound extends NotFoundError {
  /**
   * | Error Code                | Description               |
   * | ------------------------- | ------------------------- |
   * | TRANSACTION_NOT_FOUND     | Transaction not found     |
   * | INVITATION_NOT_FOUND      | Invitation not found      |
   * | USER_NOT_FOUND            | Customer not found        |
   * | QUOTE_NOT_FOUND           | Quote not found           |
   * | LOOKUP_REQUEST_NOT_FOUND  | Lookup request not found  |
   * | TOKEN_NOT_FOUND           | Token not found           |
   * | BULK_UPLOAD_JOB_NOT_FOUND | Bulk upload job not found |
   * | REFERENCE_NOT_FOUND       | Reference not found       |
   */
  code: 'TOKEN_NOT_FOUND';

  /**
   * Error message
   */
  override message: string;

  /**
   * HTTP status code
   */
  override status: 404;

  /**
   * Additional error details
   */
  details?: { [key: string]: unknown };

  constructor(status: 404, error: Object, message: string | undefined, headers: Headers) {
    const data = error as Record<string, any>;
    super(status, error, message, headers);

    this.code = data?.['code'];
    this.message = data?.['message'];
    this.status = data?.['status'];
    this.details = data?.['details'];
  }
}

export class TransactionNotFound extends NotFoundError {
  /**
   * | Error Code                | Description               |
   * | ------------------------- | ------------------------- |
   * | TRANSACTION_NOT_FOUND     | Transaction not found     |
   * | INVITATION_NOT_FOUND      | Invitation not found      |
   * | USER_NOT_FOUND            | Customer not found        |
   * | QUOTE_NOT_FOUND           | Quote not found           |
   * | LOOKUP_REQUEST_NOT_FOUND  | Lookup request not found  |
   * | TOKEN_NOT_FOUND           | Token not found           |
   * | BULK_UPLOAD_JOB_NOT_FOUND | Bulk upload job not found |
   * | REFERENCE_NOT_FOUND       | Reference not found       |
   */
  code: 'TRANSACTION_NOT_FOUND';

  /**
   * Error message
   */
  override message: string;

  /**
   * HTTP status code
   */
  override status: 404;

  /**
   * Additional error details
   */
  details?: { [key: string]: unknown };

  constructor(status: 404, error: Object, message: string | undefined, headers: Headers) {
    const data = error as Record<string, any>;
    super(status, error, message, headers);

    this.code = data?.['code'];
    this.message = data?.['message'];
    this.status = data?.['status'];
    this.details = data?.['details'];
  }
}

export class UserNotFound extends NotFoundError {
  /**
   * | Error Code                | Description               |
   * | ------------------------- | ------------------------- |
   * | TRANSACTION_NOT_FOUND     | Transaction not found     |
   * | INVITATION_NOT_FOUND      | Invitation not found      |
   * | USER_NOT_FOUND            | Customer not found        |
   * | QUOTE_NOT_FOUND           | Quote not found           |
   * | LOOKUP_REQUEST_NOT_FOUND  | Lookup request not found  |
   * | TOKEN_NOT_FOUND           | Token not found           |
   * | BULK_UPLOAD_JOB_NOT_FOUND | Bulk upload job not found |
   * | REFERENCE_NOT_FOUND       | Reference not found       |
   */
  code: 'USER_NOT_FOUND';

  /**
   * Error message
   */
  override message: string;

  /**
   * HTTP status code
   */
  override status: 404;

  /**
   * Additional error details
   */
  details?: { [key: string]: unknown };

  constructor(status: 404, error: Object, message: string | undefined, headers: Headers) {
    const data = error as Record<string, any>;
    super(status, error, message, headers);

    this.code = data?.['code'];
    this.message = data?.['message'];
    this.status = data?.['status'];
    this.details = data?.['details'];
  }
}

export class TransactionNotPendingPlatformApproval extends ConflictError {
  /**
   * | Error Code                                | Description                                  |
   * | ----------------------------------------- | -------------------------------------------- |
   * | TRANSACTION_NOT_PENDING_PLATFORM_APPROVAL | Transaction is not pending platform approval |
   * | UMA_ADDRESS_EXISTS                        | UMA address already exists                   |
   */
  code: 'TRANSACTION_NOT_PENDING_PLATFORM_APPROVAL';

  /**
   * Error message
   */
  override message: string;

  /**
   * HTTP status code
   */
  override status: 409;

  /**
   * Additional error details
   */
  details?: { [key: string]: unknown };

  constructor(status: 409, error: Object, message: string | undefined, headers: Headers) {
    const data = error as Record<string, any>;
    super(status, error, message, headers);

    this.code = data?.['code'];
    this.message = data?.['message'];
    this.status = data?.['status'];
    this.details = data?.['details'];
  }
}

export class UmaAddressExists extends ConflictError {
  /**
   * | Error Code                                | Description                                  |
   * | ----------------------------------------- | -------------------------------------------- |
   * | TRANSACTION_NOT_PENDING_PLATFORM_APPROVAL | Transaction is not pending platform approval |
   * | UMA_ADDRESS_EXISTS                        | UMA address already exists                   |
   */
  code: 'UMA_ADDRESS_EXISTS';

  /**
   * Error message
   */
  override message: string;

  /**
   * HTTP status code
   */
  override status: 409;

  /**
   * Additional error details
   */
  details?: { [key: string]: unknown };

  constructor(status: 409, error: Object, message: string | undefined, headers: Headers) {
    const data = error as Record<string, any>;
    super(status, error, message, headers);

    this.code = data?.['code'];
    this.message = data?.['message'];
    this.status = data?.['status'];
    this.details = data?.['details'];
  }
}

export class CustomerDeleted extends APIError {
  /**
   * | Error Code       | Description                           |
   * | ---------------- | ------------------------------------- |
   * | CUSTOMER_DELETED | Customer has been permanently deleted |
   */
  code: 'CUSTOMER_DELETED';

  /**
   * Error message
   */
  override message: string;

  /**
   * HTTP status code
   */
  override status: 410;

  /**
   * Additional error details
   */
  details?: { [key: string]: unknown };

  constructor(status: 410, error: Object, message: string | undefined, headers: Headers) {
    const data = error as Record<string, any>;
    super(status, error, message, headers);

    this.code = data?.['code'];
    this.message = data?.['message'];
    this.status = data?.['status'];
    this.details = data?.['details'];
  }
}

export class UnsupportedUmaVersion extends APIError {
  /**
   * | Error Code              | Description                                       |
   * | ----------------------- | ------------------------------------------------- |
   * | UNSUPPORTED_UMA_VERSION | Counterparty doesn't support the Grid UMA version |
   */
  code: 'UNSUPPORTED_UMA_VERSION';

  /**
   * Error message
   */
  override message: string;

  /**
   * HTTP status code
   */
  override status: 412;

  /**
   * Additional error details
   */
  details?: { [key: string]: unknown };

  constructor(status: 412, error: Object, message: string | undefined, headers: Headers) {
    const data = error as Record<string, any>;
    super(status, error, message, headers);

    this.code = data?.['code'];
    this.message = data?.['message'];
    this.status = data?.['status'];
    this.details = data?.['details'];
  }
}

export class CounterpartyPubkeyFetchError extends APIError {
  /**
   * | Error Code                      | Description                            |
   * | ------------------------------- | -------------------------------------- |
   * | PAYREQ_REQUEST_FAILED           | Payment request failed                 |
   * | COUNTERPARTY_PUBKEY_FETCH_ERROR | Error fetching counterparty public key |
   * | NO_COMPATIBLE_UMA_VERSION       | No compatible UMA version              |
   * | LNURLP_REQUEST_FAILED           | LNURLP request failed                  |
   */
  code: 'COUNTERPARTY_PUBKEY_FETCH_ERROR';

  /**
   * Error message
   */
  override message: string;

  /**
   * HTTP status code
   */
  override status: 424;

  /**
   * Additional error details
   */
  details?: { [key: string]: unknown };

  constructor(status: 424, error: Object, message: string | undefined, headers: Headers) {
    const data = error as Record<string, any>;
    super(status, error, message, headers);

    this.code = data?.['code'];
    this.message = data?.['message'];
    this.status = data?.['status'];
    this.details = data?.['details'];
  }
}

export class LnurlpRequestFailed extends APIError {
  /**
   * | Error Code                      | Description                            |
   * | ------------------------------- | -------------------------------------- |
   * | PAYREQ_REQUEST_FAILED           | Payment request failed                 |
   * | COUNTERPARTY_PUBKEY_FETCH_ERROR | Error fetching counterparty public key |
   * | NO_COMPATIBLE_UMA_VERSION       | No compatible UMA version              |
   * | LNURLP_REQUEST_FAILED           | LNURLP request failed                  |
   */
  code: 'LNURLP_REQUEST_FAILED';

  /**
   * Error message
   */
  override message: string;

  /**
   * HTTP status code
   */
  override status: 424;

  /**
   * Additional error details
   */
  details?: { [key: string]: unknown };

  constructor(status: 424, error: Object, message: string | undefined, headers: Headers) {
    const data = error as Record<string, any>;
    super(status, error, message, headers);

    this.code = data?.['code'];
    this.message = data?.['message'];
    this.status = data?.['status'];
    this.details = data?.['details'];
  }
}

export class NoCompatibleUmaVersion extends APIError {
  /**
   * | Error Code                      | Description                            |
   * | ------------------------------- | -------------------------------------- |
   * | PAYREQ_REQUEST_FAILED           | Payment request failed                 |
   * | COUNTERPARTY_PUBKEY_FETCH_ERROR | Error fetching counterparty public key |
   * | NO_COMPATIBLE_UMA_VERSION       | No compatible UMA version              |
   * | LNURLP_REQUEST_FAILED           | LNURLP request failed                  |
   */
  code: 'NO_COMPATIBLE_UMA_VERSION';

  /**
   * Error message
   */
  override message: string;

  /**
   * HTTP status code
   */
  override status: 424;

  /**
   * Additional error details
   */
  details?: { [key: string]: unknown };

  constructor(status: 424, error: Object, message: string | undefined, headers: Headers) {
    const data = error as Record<string, any>;
    super(status, error, message, headers);

    this.code = data?.['code'];
    this.message = data?.['message'];
    this.status = data?.['status'];
    this.details = data?.['details'];
  }
}

export class PayreqRequestFailed extends APIError {
  /**
   * | Error Code                      | Description                            |
   * | ------------------------------- | -------------------------------------- |
   * | PAYREQ_REQUEST_FAILED           | Payment request failed                 |
   * | COUNTERPARTY_PUBKEY_FETCH_ERROR | Error fetching counterparty public key |
   * | NO_COMPATIBLE_UMA_VERSION       | No compatible UMA version              |
   * | LNURLP_REQUEST_FAILED           | LNURLP request failed                  |
   */
  code: 'PAYREQ_REQUEST_FAILED';

  /**
   * Error message
   */
  override message: string;

  /**
   * HTTP status code
   */
  override status: 424;

  /**
   * Additional error details
   */
  details?: { [key: string]: unknown };

  constructor(status: 424, error: Object, message: string | undefined, headers: Headers) {
    const data = error as Record<string, any>;
    super(status, error, message, headers);

    this.code = data?.['code'];
    this.message = data?.['message'];
    this.status = data?.['status'];
    this.details = data?.['details'];
  }
}

export class GridSwitchError extends InternalServerError {
  /**
   * | Error Code        | Description                  |
   * | ----------------- | ---------------------------- |
   * | GRID_SWITCH_ERROR | Grid switch error            |
   * | INTERNAL_ERROR    | Internal server or UMA error |
   */
  code: 'GRID_SWITCH_ERROR';

  /**
   * Error message
   */
  override message: string;

  /**
   * HTTP status code
   */
  override status: 500;

  /**
   * Additional error details
   */
  details?: { [key: string]: unknown };

  constructor(status: 500, error: Object, message: string | undefined, headers: Headers) {
    const data = error as Record<string, any>;
    super(status, error, message, headers);

    this.code = data?.['code'];
    this.message = data?.['message'];
    this.status = data?.['status'];
    this.details = data?.['details'];
  }
}

export class InternalError extends InternalServerError {
  /**
   * | Error Code        | Description                  |
   * | ----------------- | ---------------------------- |
   * | GRID_SWITCH_ERROR | Grid switch error            |
   * | INTERNAL_ERROR    | Internal server or UMA error |
   */
  code: 'INTERNAL_ERROR';

  /**
   * Error message
   */
  override message: string;

  /**
   * HTTP status code
   */
  override status: 500;

  /**
   * Additional error details
   */
  details?: { [key: string]: unknown };

  constructor(status: 500, error: Object, message: string | undefined, headers: Headers) {
    const data = error as Record<string, any>;
    super(status, error, message, headers);

    this.code = data?.['code'];
    this.message = data?.['message'];
    this.status = data?.['status'];
    this.details = data?.['details'];
  }
}

export class NotImplemented extends APIError {
  /**
   * | Error Code                            | Description                           |
   * | ------------------------------------- | ------------------------------------- |
   * | UNRECOGNIZED_MANDATORY_PAYEE_DATA_KEY | Unrecognized mandatory payee data key |
   * | NOT_IMPLEMENTED                       | Feature not implemented               |
   */
  code: 'NOT_IMPLEMENTED';

  /**
   * Error message
   */
  override message: string;

  /**
   * HTTP status code
   */
  override status: 501;

  /**
   * Additional error details
   */
  details?: { [key: string]: unknown };

  constructor(status: 501, error: Object, message: string | undefined, headers: Headers) {
    const data = error as Record<string, any>;
    super(status, error, message, headers);

    this.code = data?.['code'];
    this.message = data?.['message'];
    this.status = data?.['status'];
    this.details = data?.['details'];
  }
}

export class UnrecognizedMandatoryPayeeDataKey extends APIError {
  /**
   * | Error Code                            | Description                           |
   * | ------------------------------------- | ------------------------------------- |
   * | UNRECOGNIZED_MANDATORY_PAYEE_DATA_KEY | Unrecognized mandatory payee data key |
   * | NOT_IMPLEMENTED                       | Feature not implemented               |
   */
  code: 'UNRECOGNIZED_MANDATORY_PAYEE_DATA_KEY';

  /**
   * Error message
   */
  override message: string;

  /**
   * HTTP status code
   */
  override status: 501;

  /**
   * Additional error details
   */
  details?: { [key: string]: unknown };

  constructor(status: 501, error: Object, message: string | undefined, headers: Headers) {
    const data = error as Record<string, any>;
    super(status, error, message, headers);

    this.code = data?.['code'];
    this.message = data?.['message'];
    this.status = data?.['status'];
    this.details = data?.['details'];
  }
}
