// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as QuotesAPI from './quotes';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Invitations extends APIResource {
  /**
   * Create an UMA invitation from a given platform customer.
   *
   * @example
   * ```ts
   * const umaInvitation = await client.invitations.create({
   *   inviterUma: '$inviter@uma.domain',
   * });
   * ```
   */
  create(body: InvitationCreateParams, options?: RequestOptions): APIPromise<UmaInvitation> {
    return this._client.post('/invitations', { body, ...options });
  }

  /**
   * Get a specific UMA invitation by code.
   *
   * @example
   * ```ts
   * const umaInvitation = await client.invitations.retrieve(
   *   'invitationCode',
   * );
   * ```
   */
  retrieve(invitationCode: string, options?: RequestOptions): APIPromise<UmaInvitation> {
    return this._client.get(path`/invitations/${invitationCode}`, options);
  }

  /**
   * Cancel a pending UMA invitation. Only the inviter or platform can cancel an
   * invitation.
   *
   * When an invitation is cancelled:
   *
   * 1. The invitation status changes from PENDING to CANCELLED
   * 2. The invitation can no longer be claimed
   * 3. The invitation URL will show as cancelled when accessed
   *
   * Only pending invitations can be cancelled. Attempting to cancel an invitation
   * that is already claimed, expired, or cancelled will result in an error.
   *
   * @example
   * ```ts
   * const umaInvitation = await client.invitations.cancel(
   *   'invitationCode',
   * );
   * ```
   */
  cancel(invitationCode: string, options?: RequestOptions): APIPromise<UmaInvitation> {
    return this._client.post(path`/invitations/${invitationCode}/cancel`, options);
  }

  /**
   * Claim an UMA invitation by associating it with an invitee UMA address.
   *
   * When an invitation is successfully claimed:
   *
   * 1. The invitation status changes from PENDING to CLAIMED
   * 2. The invitee UMA address is associated with the invitation
   * 3. An INVITATION_CLAIMED webhook is triggered to notify the platform that
   *    created the invitation
   *
   * This endpoint allows customers to accept invitations sent to them by other UMA
   * customers.
   *
   * @example
   * ```ts
   * const umaInvitation = await client.invitations.claim(
   *   'invitationCode',
   *   { inviteeUma: '$invitee@uma.domain' },
   * );
   * ```
   */
  claim(
    invitationCode: string,
    body: InvitationClaimParams,
    options?: RequestOptions,
  ): APIPromise<UmaInvitation> {
    return this._client.post(path`/invitations/${invitationCode}/claim`, { body, ...options });
  }
}

export interface CurrencyAmount {
  /**
   * Amount in the smallest unit of the currency (e.g., cents for USD/EUR, satoshis
   * for BTC)
   */
  amount: number;

  currency: QuotesAPI.Currency;
}

export interface UmaInvitation {
  /**
   * The unique code of the invitation
   */
  code: string;

  /**
   * When the invitation was created
   */
  createdAt: string;

  /**
   * The UMA address of the inviter
   */
  inviterUma: string;

  /**
   * The status of the invitation
   */
  status: 'PENDING' | 'CLAIMED' | 'EXPIRED' | 'CANCELLED';

  /**
   * The URL where this invitation can be claimed.
   */
  url: string;

  /**
   * The amount to send to the invitee when the invitation is claimed. This is
   * optional and if not provided, the invitee will not receive any amount. Note that
   * the actual sending of the amount must be done by the inviter platform once the
   * INVITATION_CLAIMED webhook is received. If the inviter platform either does not
   * send the payment or the payment fails, the invitee will not receive this amount.
   * This field is primarily used for display purposes on the claiming side of the
   * invitation. This field is useful for "send-by-link" style customer flows where
   * an inviter can send a payment simply by sharing a link without knowing the
   * receiver's UMA address. Note that these sends can only be sender-locked, meaning
   * that the sender will not know ahead of time how much the receiver will receive
   * in the receiving currency.
   */
  amountToSend?: CurrencyAmount;

  /**
   * When the invitation was claimed if it has been claimed
   */
  claimedAt?: string;

  /**
   * When the invitation expires (if at all)
   */
  expiresAt?: string;

  /**
   * The inviter's first name. Will be displayed when the recipient clicks the invite
   * link
   */
  firstName?: string;

  /**
   * The UMA address of the invitee
   */
  inviteeUma?: string;
}

export interface InvitationCreateParams {
  /**
   * The UMA address of the customer creating the invitation
   */
  inviterUma: string;

  /**
   * An amount to send (in the smallest unit of the customer's currency) to the
   * invitee when the invitation is claimed. This is optional and if not provided,
   * the invitee will not receive any amount. Note that the actual sending of the
   * amount must be done by the inviter platform once the INVITATION_CLAIMED webhook
   * is received. If the inviter platform either does not send the payment or the
   * payment fails, the invitee will not receive this amount. This field is primarily
   * used for display purposes on the claiming side of the invitation.
   */
  amountToSend?: number;

  /**
   * When the invitation expires (if at all)
   */
  expiresAt?: string;

  /**
   * First name of the invitee to show as part of the invite
   */
  firstName?: string;
}

export interface InvitationClaimParams {
  /**
   * The UMA address of the customer claiming the invitation
   */
  inviteeUma: string;
}

export declare namespace Invitations {
  export {
    type CurrencyAmount as CurrencyAmount,
    type UmaInvitation as UmaInvitation,
    type InvitationCreateParams as InvitationCreateParams,
    type InvitationClaimParams as InvitationClaimParams,
  };
}
