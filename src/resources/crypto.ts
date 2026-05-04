// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

/**
 * Endpoints for creating and confirming quotes for cross-currency transfers
 */
export class Crypto extends APIResource {
  /**
   * Estimate the network and application fees for a cryptocurrency withdrawal from a
   * crypto internal account to an external blockchain address. Use this to show fee
   * information to customers before they initiate a withdrawal.
   *
   * @example
   * ```ts
   * const response = await client.crypto.estimateWithdrawalFee({
   *   amount: 1000000,
   *   cryptoNetwork: 'SOLANA',
   *   currency: 'USDC',
   *   destinationAddress:
   *     '7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU',
   *   internalAccountId:
   *     'InternalAccount:a12dcbd6-dced-4ec4-b756-3c3a9ea3d123',
   * });
   * ```
   */
  estimateWithdrawalFee(
    body: CryptoEstimateWithdrawalFeeParams,
    options?: RequestOptions,
  ): APIPromise<CryptoEstimateWithdrawalFeeResponse> {
    return this._client.post('/crypto/estimate-withdrawal-fee', { body, ...options });
  }
}

export interface CryptoEstimateWithdrawalFeeResponse {
  /**
   * The application fee charged by the platform in the smallest unit of the
   * withdrawal currency. Zero if no application fee applies.
   */
  applicationFee: number;

  /**
   * The net amount the recipient will receive after fees, in the smallest unit of
   * the withdrawal currency.
   */
  netAmount: number;

  /**
   * The estimated network (gas) fee in the smallest unit of the network fee asset
   * (e.g. lamports for SOL). This is provided for informational purposes to show the
   * raw on-chain cost. Note that this value is denominated in networkFeeAsset, not
   * in the withdrawal currency — it cannot be directly added to applicationFee or
   * compared to totalFee.
   */
  networkFee: number;

  /**
   * The asset used to pay the network fee (e.g. SOL for Solana transactions).
   */
  networkFeeAsset: string;

  /**
   * The total cost of the withdrawal in the smallest unit of the withdrawal
   * currency. This equals the network fee converted to the withdrawal currency at
   * current rates plus the application fee. This is the amount deducted from the
   * withdrawal in addition to netAmount.
   */
  totalFee: number;
}

export interface CryptoEstimateWithdrawalFeeParams {
  /**
   * The amount to withdraw in the smallest unit of the currency.
   */
  amount: number;

  /**
   * The blockchain network for the withdrawal. Example values: SOLANA, ETHEREUM,
   * BASE, POLYGON, SPARK, LIGHTNING, BITCOIN.
   */
  cryptoNetwork: string;

  /**
   * The currency code of the asset to withdraw (e.g. USDC).
   */
  currency: string;

  /**
   * The blockchain address to withdraw funds to.
   */
  destinationAddress: string;

  /**
   * The ID of the crypto internal account to withdraw from.
   */
  internalAccountId: string;
}

export declare namespace Crypto {
  export {
    type CryptoEstimateWithdrawalFeeResponse as CryptoEstimateWithdrawalFeeResponse,
    type CryptoEstimateWithdrawalFeeParams as CryptoEstimateWithdrawalFeeParams,
  };
}
