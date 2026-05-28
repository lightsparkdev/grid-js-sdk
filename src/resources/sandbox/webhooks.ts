// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';

/**
 * Endpoints to trigger test cases in sandbox
 */
export class Webhooks extends APIResource {
  /**
   * Send a test webhook to the configured endpoint
   *
   * @example
   * ```ts
   * const response = await client.sandbox.webhooks.sendTest();
   * ```
   */
  sendTest(options?: RequestOptions): APIPromise<WebhookSendTestResponse> {
    return this._client.post('/sandbox/webhooks/test', options);
  }
}

export interface WebhookSendTestResponse {
  /**
   * The HTTP status code returned by the webhook endpoint
   */
  response_status: number;

  /**
   * The raw body content returned by the webhook endpoint in response to the request
   */
  response_body?: string;

  /**
   * URL where the webhook was sent
   */
  url?: string;
}

export declare namespace Webhooks {
  export { type WebhookSendTestResponse as WebhookSendTestResponse };
}
