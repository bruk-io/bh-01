import { html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { BaseElement } from '../../primitives/base-element.js';

/**
 * An individual item in the activity bar.
 *
 * @slot - Icon content (e.g. `<bh-icon>`)
 *
 * @csspart button - The native `<button>` element
 *
 * @cssprop [--bh-activity-item-size=40px] - Item width and height
 * @cssprop [--bh-activity-item-active-border=var(--bh-color-primary)] - Active indicator color
 */
@customElement('bh-activity-item')
export class BhActivityItem extends BaseElement {
  static styles = [
    ...([BaseElement.styles].flat()),
    css`
      :host {
        display: block;
      }

      button {
        display: flex;
        align-items: center;
        justify-content: center;
        width: var(--bh-activity-item-size, 40px);
        height: var(--bh-activity-item-size, 40px);
        background: none;
        border: none;
        border-left: var(--bh-border-2) solid transparent;
        border-radius: 0;
        color: var(--bh-color-text-muted);
        cursor: pointer;
        padding: 0;
        transition: color var(--bh-transition-fast), background var(--bh-transition-fast);
      }

      button:hover {
        color: var(--bh-color-text);
      }

      button:focus-visible {
        outline: 2px solid var(--bh-color-ring);
        outline-offset: -2px;
      }

      :host([active]) button {
        color: var(--bh-color-text);
        border-left-color: var(--bh-activity-item-active-border, var(--bh-color-primary));
        background: var(--bh-color-surface);
      }
    `,
  ];

  @property({ type: Boolean, reflect: true }) active = false;
  @property() label = '';
  @property({ attribute: 'item-id' }) itemId = '';

  render() {
    return html`
      <button
        part="button"
        title=${this.label || nothing}
        aria-label=${this.label || nothing}
        aria-pressed=${this.active ? 'true' : 'false'}
        @click=${this._handleClick}
      >
        <slot></slot>
      </button>
    `;
  }

  private _handleClick() {
    this.dispatchEvent(
      new CustomEvent('bh-activity-item-click', {
        bubbles: true,
        composed: true,
        detail: { id: this.itemId, label: this.label },
      })
    );
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bh-activity-item': BhActivityItem;
  }
}
