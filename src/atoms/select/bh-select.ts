import { html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { BaseElement } from '../../primitives/base-element.js';

export type SelectSize = 'sm' | 'md' | 'lg';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectOptionGroup {
  label: string;
  options: SelectOption[];
}

/**
 * A styled native select dropdown. Uses a real `<select>` under the hood
 * for full accessibility and mobile support.
 *
 * Pass options via the `options` property (array of `{ value, label }` objects).
 * For grouped options, use `optionGroups`.
 *
 * @slot prefix - Content before the select (e.g. icon)
 *
 * @csspart wrapper - The outer container with border and background
 * @csspart select - The native `<select>` element
 *
 * @cssprop [--bh-select-bg=var(--bh-color-surface-raised)] - Select background
 * @cssprop [--bh-select-color=var(--bh-color-text)] - Select text color
 * @cssprop [--bh-select-border=var(--bh-color-border)] - Select border color
 * @cssprop [--bh-select-radius=var(--bh-radius-md)] - Select border radius
 *
 * @fires bh-change - Fired when selection changes. `detail: { value: string }`
 */
@customElement('bh-select')
export class BhSelect extends BaseElement {
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
        background: var(--bh-select-bg, var(--bh-color-surface-raised));
        border: var(--bh-border-1) solid var(--bh-select-border, var(--bh-color-border));
        border-radius: var(--bh-select-radius, var(--bh-radius-md));
        box-shadow: var(--bh-shadow-inset);
        transition: all var(--bh-transition-fast);
        cursor: pointer;
      }

      select {
        flex: 1;
        min-width: 0;
        font-family: var(--bh-font-sans);
        line-height: var(--bh-leading-normal);
        color: var(--bh-select-color, var(--bh-color-text));
        background: transparent;
        border: none;
        outline: none;
        cursor: pointer;
        appearance: none;
        -webkit-appearance: none;
      }

      /* Prefix slot */
      .prefix {
        display: flex;
        align-items: center;
        flex-shrink: 0;
        color: var(--bh-color-text-muted);
      }

      /* Chevron indicator */
      .chevron {
        display: flex;
        align-items: center;
        flex-shrink: 0;
        color: var(--bh-color-text-muted);
        pointer-events: none;
      }

      .chevron svg {
        width: 1em;
        height: 1em;
        fill: none;
        stroke: currentColor;
        stroke-width: 2;
        stroke-linecap: round;
        stroke-linejoin: round;
      }

      /* Sizes */
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

      select {
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

      :host([disabled]) select {
        cursor: not-allowed;
      }

      /* Placeholder styling */
      select:invalid {
        color: var(--bh-color-text-muted);
      }
    `,
  ];

  @property({ reflect: true }) size: SelectSize = 'md';
  @property() value = '';
  @property() name = '';
  @property() label = '';
  @property() placeholder = '';
  @property({ type: Array }) options: SelectOption[] = [];
  @property({ type: Array, attribute: 'option-groups' }) optionGroups: SelectOptionGroup[] = [];
  @property({ type: Boolean, reflect: true }) disabled = false;
  @property({ type: Boolean, reflect: true }) required = false;
  @property({ type: Boolean, reflect: true }) error = false;

  render() {
    return html`
      <div class="wrapper" part="wrapper">
        <span class="prefix"><slot name="prefix"></slot></span>
        <select
          part="select"
          name=${this.name || nothing}
          aria-label=${this.label || nothing}
          ?disabled=${this.disabled}
          ?required=${this.required}
          aria-invalid=${this.error ? 'true' : nothing}
          @change=${this._handleChange}
        >
          ${this.placeholder ? html`<option value="" disabled ?selected=${!this.value}>${this.placeholder}</option>` : nothing}
          ${this.optionGroups.length > 0
            ? this.optionGroups.map(
                (group) => html`
                  <optgroup label=${group.label}>
                    ${group.options.map(
                      (opt) => html`
                        <option
                          value=${opt.value}
                          ?disabled=${opt.disabled}
                          ?selected=${opt.value === this.value}
                        >${opt.label}</option>
                      `
                    )}
                  </optgroup>
                `
              )
            : this.options.map(
                (opt) => html`
                  <option
                    value=${opt.value}
                    ?disabled=${opt.disabled}
                    ?selected=${opt.value === this.value}
                  >${opt.label}</option>
                `
              )}
        </select>
        <span class="chevron">
          <svg viewBox="0 0 16 16"><path d="M4 6l4 4 4-4"/></svg>
        </span>
      </div>
    `;
  }

  private _handleChange(e: Event) {
    const select = e.target as HTMLSelectElement;
    this.value = select.value;
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
    'bh-select': BhSelect;
  }
}
