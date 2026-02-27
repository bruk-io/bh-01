import { html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { BaseElement } from '../../primitives/base-element.js';

export type AvatarSize = 'sm' | 'md' | 'lg';

/**
 * A user/entity avatar with image, initials fallback, and generic icon fallback.
 *
 * Fallback order: image (src) -> initials -> generic user icon.
 *
 * @csspart image - The `<img>` element (when src is used)
 * @csspart initials - The initials text container
 *
 * @cssprop [--bh-avatar-size] - Avatar width and height (overrides size prop)
 * @cssprop [--bh-avatar-bg=var(--bh-color-secondary)] - Background color for initials/fallback
 * @cssprop [--bh-avatar-color=var(--bh-color-secondary-text)] - Text/icon color
 */
@customElement('bh-avatar')
export class BhAvatar extends BaseElement {
  static styles = [
    ...([BaseElement.styles].flat()),
    css`
      :host {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border-radius: var(--bh-radius-full);
        overflow: hidden;
        background: var(--bh-avatar-bg, var(--bh-color-secondary));
        color: var(--bh-avatar-color, var(--bh-color-secondary-text));
        font-family: var(--bh-font-sans);
        font-weight: var(--bh-font-semibold);
        flex-shrink: 0;
      }

      :host([size='sm']) {
        width: var(--bh-avatar-size, 2rem);
        height: var(--bh-avatar-size, 2rem);
        font-size: var(--bh-text-xs);
      }

      :host,
      :host([size='md']) {
        width: var(--bh-avatar-size, 2.5rem);
        height: var(--bh-avatar-size, 2.5rem);
        font-size: var(--bh-text-sm);
      }

      :host([size='lg']) {
        width: var(--bh-avatar-size, 3rem);
        height: var(--bh-avatar-size, 3rem);
        font-size: var(--bh-text-base);
      }

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .initials {
        line-height: var(--bh-leading-none);
        text-transform: uppercase;
        user-select: none;
      }

      svg {
        width: 60%;
        height: 60%;
        fill: currentColor;
      }
    `,
  ];

  @property({ reflect: true }) size: AvatarSize = 'md';
  @property() src = '';
  @property() alt = '';
  @property() initials = '';

  @state() private _imgFailed = false;

  render() {
    if (this.src && !this._imgFailed) {
      return html`
        <img
          part="image"
          src=${this.src}
          alt=${this.alt || nothing}
          @error=${this._onImgError}
        />
      `;
    }

    if (this.initials) {
      return html`
        <span class="initials" part="initials" aria-label=${this.alt || nothing}>
          ${this.initials.slice(0, 2)}
        </span>
      `;
    }

    // Generic user fallback
    return html`
      <svg viewBox="0 0 24 24" aria-label=${this.alt || 'User'}>
        <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/>
      </svg>
    `;
  }

  private _onImgError() {
    this._imgFailed = true;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bh-avatar': BhAvatar;
  }
}
