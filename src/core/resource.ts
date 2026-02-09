// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import type { LightsparkGrid } from '../client';

export abstract class APIResource {
  protected _client: LightsparkGrid;

  constructor(client: LightsparkGrid) {
    this._client = client;
  }
}
