import { html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { live } from 'lit/directives/live.js';
import { BaseElement } from '../../primitives/base-element.js';

export type InputSize = 'sm' | 'md' | 'lg';

/**
 * A text input component with support for inset prefix/suffix content.
 *
 * @slot prefix - Content inside the input, before the text (e.g. `<bh-icon name="search">`)
 * @slot suffix - Content inside the input, after the text (e.g. `<bh-icon name="x">`)
 *
 * @csspart wrapper - The outer container with border and background
 * @csspart input - The native `<input>` element
 *
 * @cssprop [--bh-input-bg=var(--bh-color-surface-raised)] - Input background
 * @cssprop [--bh-input-color=var(--bh-color-text)] - Input text color
 * @cssprop [--bh-input-border=var(--bh-color-border)] - Input border color
 * @cssprop [--bh-input-radius=var(--bh-radius-md)] - Input border radius
 *
 * @fires bh-input - Fired on each keystroke. `detail: { value: string }`
 * @fires bh-change - Fired on blur/commit. `detail: { value: string }`
 */
@customElement('bh-input')
export class BhInput extends BaseElement {
  static styles = [
    ...([BaseElement.styles].flat()),
    css`
      :host {
        display: block;
      }

      .wrapper {
        display: flex;
        align-items: center;
        width: 100%;
        background: var(--bh-input-bg, var(--bh-color-surface-raised));
        border: var(--bh-border-1) solid var(--bh-input-border, var(--bh-color-border));
        border-radius: var(--bh-input-radius, var(--bh-radius-md));
        box-shadow: var(--bh-shadow-inset);
        transition: all var(--bh-transition-fast);
      }

      input {
        flex: 1;
        min-width: 0;
        font-family: var(--bh-font-sans);
        line-height: var(--bh-leading-normal);
        color: var(--bh-input-color, var(--bh-color-text));
        background: transparent;
        border: none;
        outline: none;
      }

      input::placeholder {
        color: var(--bh-color-text-muted);
      }

      /* Slots */
      .prefix,
      .suffix {
        display: flex;
        align-items: center;
        flex-shrink: 0;
        color: var(--bh-color-text-muted);
      }

      /* Sizes — wrapper padding */
      :host([size='sm']) .wrapper {
        font-size: var(--bh-text-sm);
        gap: var(--bh-spacing-1-5);
        padding: var(--bh-spacing-1-5) var(--bh-spacing-3);
      }

      .wrapper,
      :host([size='md']) .wrapper {
        font-size: var(--bh-text-base);
        gap: var(--bh-spacing-2);
        padding: var(--bh-spacing-2) var(--bh-spacing-4);
      }

      :host([size='lg']) .wrapper {
        font-size: var(--bh-text-lg);
        gap: var(--bh-spacing-2);
        padding: var(--bh-spacing-2-5) var(--bh-spacing-6);
      }

      /* Sizes — input font inherits from wrapper */
      input {
        font-size: inherit;
      }

      /* Focus */
      .wrapper:focus-within {
        border-color: var(--bh-color-ring);
        box-shadow: 0 0 0 1px var(--bh-color-ring);
      }

      /* Error */
      :host([error]) .wrapper {
        border-color: var(--bh-color-danger);
      }

      :host([error]) .wrapper:focus-within {
        border-color: var(--bh-color-danger);
        box-shadow: 0 0 0 1px var(--bh-color-danger);
      }

      /* Disabled */
      :host([disabled]) .wrapper {
        opacity: 0.5;
        cursor: not-allowed;
      }

      :host([disabled]) input {
        cursor: not-allowed;
      }

      /* Readonly */
      :host([readonly]) .wrapper {
        background: var(--bh-color-surface);
      }
    `,
  ];

  @property({ reflect: true }) size: InputSize = 'md';
  @property() type = 'text';
  @property() value = '';
  @property() placeholder = '';
  @property() name = '';
  @property() label = '';
  @property({ type: Boolean, reflect: true }) disabled = false;
  @property({ type: Boolean, reflect: true }) readonly = false;
  @property({ type: Boolean, reflect: true }) required = false;
  @property({ type: Boolean, reflect: true }) error = false;

  render() {
    return html`
      <div class="wrapper" part="wrapper">
        <span class="prefix"><slot name="prefix"></slot></span>
        <input
          part="input"
          type=${this.type}
          .value=${live(this.value)}
          placeholder=${this.placeholder || nothing}
          name=${this.name || nothing}
          aria-label=${this.label || nothing}
          ?disabled=${this.disabled}
          ?readonly=${this.readonly}
          ?required=${this.required}
          aria-invalid=${this.error ? 'true' : nothing}
          @input=${this._handleInput}
          @change=${this._handleChange}
        />
        <span class="suffix"><slot name="suffix"></slot></span>
      </div>
    `;
  }

  private _handleInput(e: InputEvent) {
    const input = e.target as HTMLInputElement;
    this.value = input.value;
    this.dispatchEvent(
      new CustomEvent('bh-input', {
        bubbles: true,
        composed: true,
        detail: { value: this.value },
      })
    );
  }

  private _handleChange(e: Event) {
    const input = e.target as HTMLInputElement;
    this.value = input.value;
    this.dispatchEvent(
      new CustomEvent('bh-change', {
        bubbles: true,
        composed: true,
        detail: { value: this.value },
      })
    );
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bh-input': BhInput;
  }
}
