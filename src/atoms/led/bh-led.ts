import { html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { BaseElement } from '../../primitives/base-element.js';

export type LedColor = 'success' | 'warning' | 'danger' | 'primary';
export type LedSize = 'sm' | 'md';

/**
 * A status LED indicator with optional pulse animation.
 *
 * @csspart led - The LED `<span>` element
 *
 * @cssprop [--bh-led-color] - LED fill color
 * @cssprop [--bh-led-size] - LED diameter
 * @cssprop [--bh-led-glow] - LED glow box-shadow color
 */
@customElement('bh-led')
export class BhLed extends BaseElement {
  static styles = [
    ...([BaseElement.styles].flat()),
    css`
      :host {
        display: inline-flex;
        align-items: center;
        justify-content: center;
      }

      span {
        display: block;
        width: var(--bh-led-size, 8px);
        height: var(--bh-led-size, 8px);
        border-radius: var(--bh-radius-full);
        background: var(--bh-led-color);
        box-shadow: 0 0 6px var(--bh-led-glow);
      }

      /* Sizes */
      :host([size='sm']) span {
        --bh-led-size: 6px;
      }

      span,
      :host([size='md']) span {
        --bh-led-size: 8px;
      }

      /* Colors */
      span,
      :host([color='success']) span {
        --bh-led-color: var(--bh-color-success);
        --bh-led-glow: var(--bh-color-success-dim, rgba(42, 157, 78, 0.15));
      }

      :host([color='warning']) span {
        --bh-led-color: var(--bh-color-warning);
        --bh-led-glow: rgba(245, 158, 11, 0.25);
      }

      :host([color='danger']) span {
        --bh-led-color: var(--bh-color-danger);
        --bh-led-glow: rgba(220, 38, 38, 0.25);
      }

      :host([color='primary']) span {
        --bh-led-color: var(--bh-color-primary);
        --bh-led-glow: var(--bh-color-primary-glow, rgba(255, 107, 53, 0.12));
      }

      /* Pulse animation */
      :host([pulse]) span {
        animation: led-pulse 2s ease-in-out infinite;
      }

      @keyframes led-pulse {
        0%, 100% {
          opacity: 1;
          box-shadow: 0 0 6px var(--bh-led-glow);
        }
        50% {
          opacity: 0.6;
          box-shadow: 0 0 12px var(--bh-led-glow);
        }
      }
    `,
  ];

  @property({ reflect: true }) color: LedColor = 'success';
  @property({ type: Boolean, reflect: true }) pulse = false;
  @property({ reflect: true }) size: LedSize = 'md';
  @property() label = '';

  render() {
    return html`
      <span
        part="led"
        role="status"
        aria-label=${this.label || nothing}
      ></span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bh-led': BhLed;
  }
}
