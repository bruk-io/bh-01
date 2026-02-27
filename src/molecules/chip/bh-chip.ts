import { html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { BaseElement } from '../../primitives/base-element.js';
import '../../atoms/icon/bh-icon.js';

export type ChipVariant = 'default' | 'primary' | 'success' | 'warning' | 'danger';
export type ChipSize = 'sm' | 'md';

/**
 * An interactive tag with optional dismiss button.
 *
 * @slot - Chip label text
 * @slot prefix - Content before the label (e.g. icon)
 *
 * @csspart chip - The outer `<button>` element
 * @csspart dismiss - The dismiss/remove button
 *
 * @cssprop [--bh-chip-bg] - Chip background color
 * @cssprop [--bh-chip-color] - Chip text color
 * @cssprop [--bh-chip-radius=var(--bh-radius-full)] - Chip border radius
 *
 * @fires bh-click - Fired on chip click. `detail: { originalEvent: MouseEvent }`
 * @fires bh-dismiss - Fired when dismiss button is clicked. `detail: {}`
 */
@customElement('bh-chip')
export class BhChip extends BaseElement {
  static styles = [
    ...([BaseElement.styles].flat()),
    css`
      :host {
        display: inline-block;
      }

      button {
        display: inline-flex;
        align-items: center;
        gap: var(--bh-spacing-1-5);
        border: var(--bh-border-1) solid transparent;
        cursor: pointer;
        font-family: var(--bh-font-sans);
        font-weight: var(--bh-font-medium);
        line-height: var(--bh-leading-none);
        border-radius: var(--bh-chip-radius, var(--bh-radius-full));
        background: var(--bh-chip-bg);
        color: var(--bh-chip-color);
        transition: all var(--bh-transition-fast);
      }

      /* Sizes */
      :host([size='sm']) button {
        font-size: var(--bh-text-xs);
        padding: var(--bh-spacing-0-5) var(--bh-spacing-2);
      }

      button,
      :host([size='md']) button {
        font-size: var(--bh-text-sm);
        padding: var(--bh-spacing-1) var(--bh-spacing-2-5);
      }

      /* Default */
      button,
      :host([variant='default']) button {
        --bh-chip-bg: var(--bh-color-secondary);
        --bh-chip-color: var(--bh-color-secondary-text);
      }

      :host([variant='default']) button:hover,
      button:hover {
        --bh-chip-bg: var(--bh-color-secondary-hover);
      }

      /* Primary */
      :host([variant='primary']) button {
        --bh-chip-bg: var(--bh-color-primary);
        --bh-chip-color: var(--bh-color-primary-text);
      }

      :host([variant='primary']) button:hover {
        --bh-chip-bg: var(--bh-color-primary-hover);
      }

      /* Success */
      :host([variant='success']) button {
        --bh-chip-bg: var(--bh-color-success);
        --bh-chip-color: var(--bh-color-text-inverse);
      }

      :host([variant='success']) button:hover {
        --bh-chip-bg: var(--bh-color-success-hover);
      }

      /* Warning */
      :host([variant='warning']) button {
        --bh-chip-bg: var(--bh-color-warning);
        --bh-chip-color: var(--bh-color-text);
      }

      :host([variant='warning']) button:hover {
        --bh-chip-bg: var(--bh-color-warning-hover);
      }

      /* Danger */
      :host([variant='danger']) button {
        --bh-chip-bg: var(--bh-color-danger);
        --bh-chip-color: var(--bh-color-danger-text);
      }

      :host([variant='danger']) button:hover {
        --bh-chip-bg: var(--bh-color-danger-hover);
      }

      /* Selected */
      :host([selected]) button {
        border-color: currentColor;
        box-shadow: 0 0 0 1px currentColor;
      }

      /* Focus */
      button:focus-visible {
        outline: 2px solid var(--bh-color-ring);
        outline-offset: 2px;
      }

      /* Disabled */
      :host([disabled]) button {
        opacity: 0.5;
        cursor: not-allowed;
        pointer-events: none;
      }

      /* Dismiss */
      .dismiss {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 0;
        margin: 0;
        margin-left: var(--bh-spacing-0-5);
        border: none;
        background: none;
        color: inherit;
        cursor: pointer;
        border-radius: var(--bh-radius-full);
        width: 1em;
        height: 1em;
        line-height: 1;
        opacity: 0.7;
        transition: opacity var(--bh-transition-fast);
      }

      .dismiss:hover {
        opacity: 1;
      }

      .dismiss:focus-visible {
        outline: 2px solid var(--bh-color-ring);
        outline-offset: 1px;
      }

      .dismiss bh-icon {
        --bh-icon-size: 1em;
        color: inherit;
      }
    `,
  ];

  @property({ reflect: true }) variant: ChipVariant = 'default';
  @property({ reflect: true }) size: ChipSize = 'md';
  @property({ type: Boolean, reflect: true }) dismissible = false;
  @property({ type: Boolean, reflect: true }) selected = false;
  @property({ type: Boolean, reflect: true }) disabled = false;

  render() {
    return html`
      <button
        part="chip"
        ?disabled=${this.disabled}
        aria-pressed=${this.selected ? 'true' : nothing}
        @click=${this._handleClick}
      >
        <slot name="prefix"></slot>
        <slot></slot>
        ${this.dismissible
          ? html`<button
              class="dismiss"
              part="dismiss"
              aria-label="Remove"
              tabindex="-1"
              @click=${this._handleDismiss}
            ><bh-icon name="x"></bh-icon></button>`
          : nothing}
      </button>
    `;
  }

  private _handleClick(e: MouseEvent) {
    if (this.disabled) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    this.dispatchEvent(
      new CustomEvent('bh-click', {
        bubbles: true,
        composed: true,
        detail: { originalEvent: e },
      })
    );
  }

  private _handleDismiss(e: MouseEvent) {
    e.stopPropagation();
    if (this.disabled) return;
    this.dispatchEvent(
      new CustomEvent('bh-dismiss', {
        bubbles: true,
        composed: true,
        detail: {},
      })
    );
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bh-chip': BhChip;
  }
}
