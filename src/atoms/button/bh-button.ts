import { html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { BaseElement } from '../../primitives/base-element.js';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

/**
 * A button component with multiple variants and sizes.
 *
 * @slot - Button label text
 * @slot prefix - Content before the label (e.g. `<bh-icon>`)
 * @slot suffix - Content after the label (e.g. `<bh-icon>`)
 *
 * @csspart button - The native `<button>` element
 *
 * @cssprop [--bh-button-bg] - Button background color
 * @cssprop [--bh-button-color] - Button text color
 * @cssprop [--bh-button-border=transparent] - Button border color
 * @cssprop [--bh-button-radius=var(--bh-radius-md)] - Button border radius
 *
 * @fires bh-click - Fired on click. `detail: { originalEvent: MouseEvent }`
 */
@customElement('bh-button')
export class BhButton extends BaseElement {
  static styles = [
    ...([BaseElement.styles].flat()),
    css`
      :host {
        display: inline-block;
      }

      button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: var(--bh-spacing-2);
        border: var(--bh-border-1) solid transparent;
        cursor: pointer;
        font-family: var(--bh-font-sans);
        font-weight: var(--bh-font-medium);
        line-height: var(--bh-leading-none);
        text-decoration: none;
        transition: all var(--bh-transition-fast);
        border-radius: var(--bh-button-radius, var(--bh-radius-md));
        background: var(--bh-button-bg);
        color: var(--bh-button-color);
        border-color: var(--bh-button-border, transparent);
      }

      /* Sizes */
      :host([size='sm']) button {
        font-size: var(--bh-text-sm);
        padding: var(--bh-spacing-1-5) var(--bh-spacing-3);
      }

      button,
      :host([size='md']) button {
        font-size: var(--bh-text-base);
        padding: var(--bh-spacing-2) var(--bh-spacing-4);
      }

      :host([size='lg']) button {
        font-size: var(--bh-text-lg);
        padding: var(--bh-spacing-2-5) var(--bh-spacing-6);
      }

      /* Primary */
      :host([variant='primary']) button,
      button {
        --bh-button-bg: var(--bh-color-primary);
        --bh-button-color: var(--bh-color-primary-text);
      }

      :host([variant='primary']) button:hover:not(:disabled),
      button:hover:not(:disabled) {
        --bh-button-bg: var(--bh-color-primary-hover);
        transform: translateY(-1px);
      }

      :host([variant='primary']) button:active:not(:disabled),
      button:active:not(:disabled) {
        --bh-button-bg: var(--bh-color-primary-active);
        transform: translateY(0);
      }

      /* Secondary */
      :host([variant='secondary']) button {
        --bh-button-bg: var(--bh-color-secondary);
        --bh-button-color: var(--bh-color-secondary-text);
      }

      :host([variant='secondary']) button:hover:not(:disabled) {
        --bh-button-bg: var(--bh-color-secondary-hover);
        transform: translateY(-1px);
      }

      :host([variant='secondary']) button:active:not(:disabled) {
        --bh-button-bg: var(--bh-color-secondary-active);
        transform: translateY(0);
      }

      /* Ghost */
      :host([variant='ghost']) button {
        --bh-button-bg: transparent;
        --bh-button-color: var(--bh-color-text);
      }

      :host([variant='ghost']) button:hover:not(:disabled) {
        --bh-button-bg: var(--bh-color-secondary);
        transform: translateY(-1px);
      }

      :host([variant='ghost']) button:active:not(:disabled) {
        --bh-button-bg: var(--bh-color-secondary-hover);
        transform: translateY(0);
      }

      /* Danger */
      :host([variant='danger']) button {
        --bh-button-bg: var(--bh-color-danger);
        --bh-button-color: var(--bh-color-danger-text);
      }

      :host([variant='danger']) button:hover:not(:disabled) {
        --bh-button-bg: var(--bh-color-danger-hover);
        transform: translateY(-1px);
      }

      :host([variant='danger']) button:active:not(:disabled) {
        --bh-button-bg: var(--bh-color-danger-active);
        transform: translateY(0);
      }

      /* Focus */
      button:focus-visible {
        outline: 2px solid var(--bh-color-ring);
        outline-offset: 2px;
      }

      /* Icon-only */
      :host([icon-only]) button {
        gap: 0;
      }

      :host([icon-only][size='sm']) button {
        padding: var(--bh-spacing-1-5);
      }

      :host([icon-only]) button,
      :host([icon-only][size='md']) button {
        padding: var(--bh-spacing-2);
      }

      :host([icon-only][size='lg']) button {
        padding: var(--bh-spacing-2-5);
      }

      :host([icon-only]) .label {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border-width: 0;
      }

      /* Disabled */
      :host([disabled]) button {
        opacity: 0.5;
        cursor: not-allowed;
        pointer-events: none;
        transform: none;
      }
    `,
  ];

  @property({ reflect: true }) variant: ButtonVariant = 'primary';
  @property({ reflect: true }) size: ButtonSize = 'md';
  @property({ type: Boolean, reflect: true }) disabled = false;
  @property({ type: Boolean, reflect: true, attribute: 'icon-only' }) iconOnly = false;
  @property() label = '';
  @property() type: 'button' | 'submit' | 'reset' = 'button';

  render() {
    return html`
      <button
        part="button"
        type=${this.type}
        ?disabled=${this.disabled}
        aria-disabled=${this.disabled ? 'true' : nothing}
        aria-label=${this.label || nothing}
        @click=${this._handleClick}
      >
        <slot name="prefix"></slot>
        <span class="label"><slot>${this.label}</slot></span>
        <slot name="suffix"></slot>
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
}

declare global {
  interface HTMLElementTagNameMap {
    'bh-button': BhButton;
  }
}
