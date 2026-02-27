import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { BaseElement } from '../../primitives/base-element.js';

/**
 * Individual tab item for use inside bh-tab-bar.
 *
 * @slot - Tab label content
 *
 * @csspart button - The inner button element
 *
 * @cssprop [--bh-tab-color=var(--bh-color-text-muted)] - Default text color
 * @cssprop [--bh-tab-active-color=var(--bh-color-text)] - Active text color
 * @cssprop [--bh-tab-active-border=var(--bh-color-primary)] - Active bottom border color
 *
 * @fires bh-tab-click - Fired on click. `detail: { tabId: string }`
 */
@customElement('bh-tab')
export class BhTab extends BaseElement {
  static styles = [
    ...([BaseElement.styles].flat()),
    css`
      :host {
        display: block;
      }

      button {
        display: flex;
        align-items: center;
        padding: 0 var(--bh-spacing-4);
        height: 100%;
        background: transparent;
        border: none;
        border-bottom: var(--bh-border-2) solid transparent;
        color: var(--bh-tab-color, var(--bh-color-text-muted));
        font-family: var(--bh-font-sans);
        font-size: var(--bh-text-sm);
        cursor: pointer;
        white-space: nowrap;
        transition: color var(--bh-transition-fast);
      }

      button:hover {
        color: var(--bh-tab-active-color, var(--bh-color-text));
      }

      button:focus-visible {
        outline: 2px solid var(--bh-color-ring);
        outline-offset: -2px;
      }

      :host([active]) button {
        color: var(--bh-tab-active-color, var(--bh-color-text));
        border-bottom-color: var(--bh-tab-active-border, var(--bh-color-primary));
      }
    `,
  ];

  @property({ attribute: 'tab-id' }) tabId = '';
  @property() label = '';
  @property({ type: Boolean, reflect: true }) active = false;

  render() {
    return html`
      <button
        part="button"
        role="tab"
        aria-selected=${this.active ? 'true' : 'false'}
        @click=${this._handleClick}
      >
        <slot>${this.label}</slot>
      </button>
    `;
  }

  private _handleClick() {
    this.dispatchEvent(
      new CustomEvent('bh-tab-click', {
        bubbles: true,
        composed: true,
        detail: { tabId: this.tabId },
      })
    );
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bh-tab': BhTab;
  }
}
