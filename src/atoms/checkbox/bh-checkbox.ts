import { html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { BaseElement } from '../../primitives/base-element.js';

/**
 * A checkbox input for boolean or multi-select choices.
 *
 * @slot - Label text displayed next to the checkbox
 *
 * @csspart checkbox - The visual checkbox indicator
 * @csspart label - The label text container
 *
 * @cssprop [--bh-checkbox-size=1.25rem] - Checkbox width and height
 * @cssprop [--bh-checkbox-radius=var(--bh-radius-sm)] - Checkbox border radius
 *
 * @fires bh-change - Fired when checked state changes. `detail: { checked: boolean }`
 */
@customElement('bh-checkbox')
export class BhCheckbox extends BaseElement {
  static styles = [
    ...([BaseElement.styles].flat()),
    css`
      :host {
        display: inline-flex;
        align-items: center;
        gap: var(--bh-spacing-2);
        cursor: pointer;
      }

      :host([disabled]) {
        opacity: 0.5;
        cursor: not-allowed;
      }

      input {
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

      .checkbox {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: var(--bh-checkbox-size, 1.25rem);
        height: var(--bh-checkbox-size, 1.25rem);
        border: var(--bh-border-2) solid var(--bh-color-border);
        border-radius: var(--bh-checkbox-radius, var(--bh-radius-sm));
        background: var(--bh-color-surface-raised);
        transition: background var(--bh-transition-fast),
                    border-color var(--bh-transition-fast);
        flex-shrink: 0;
      }

      .checkbox svg {
        width: 0.75rem;
        height: 0.75rem;
        stroke: var(--bh-color-primary-text);
        stroke-width: 3;
        fill: none;
        opacity: 0;
        transition: opacity var(--bh-transition-fast);
      }

      /* Checked */
      :host([checked]) .checkbox {
        background: var(--bh-color-primary);
        border-color: var(--bh-color-primary);
      }

      :host([checked]) .checkbox svg {
        opacity: 1;
      }

      /* Indeterminate */
      :host([indeterminate]) .checkbox {
        background: var(--bh-color-primary);
        border-color: var(--bh-color-primary);
      }

      :host([indeterminate]) .checkbox svg {
        opacity: 1;
      }

      /* Focus */
      input:focus-visible ~ .checkbox {
        outline: 2px solid var(--bh-color-ring);
        outline-offset: 2px;
      }

      /* Label */
      .label {
        font-family: var(--bh-font-sans);
        font-size: var(--bh-text-base);
        line-height: var(--bh-leading-normal);
        color: var(--bh-color-text);
        user-select: none;
      }
    `,
  ];

  @property({ type: Boolean, reflect: true }) checked = false;
  @property({ type: Boolean, reflect: true }) indeterminate = false;
  @property({ type: Boolean, reflect: true }) disabled = false;
  @property() value = '';
  @property() name = '';
  @property() label = '';

  render() {
    const checkIcon = this.indeterminate
      ? html`<svg viewBox="0 0 16 16"><path d="M3 8h10" stroke-linecap="round"/></svg>`
      : html`<svg viewBox="0 0 16 16"><path d="M3 8l3.5 3.5L13 5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

    return html`
      <label>
        <input
          type="checkbox"
          .checked=${this.checked}
          .indeterminate=${this.indeterminate}
          ?disabled=${this.disabled}
          name=${this.name || nothing}
          value=${this.value || nothing}
          aria-label=${this.label || nothing}
          @change=${this._handleChange}
        />
        <span class="checkbox" part="checkbox">${checkIcon}</span>
        <span class="label" part="label"><slot>${this.label}</slot></span>
      </label>
    `;
  }

  private _handleChange(e: Event) {
    const input = e.target as HTMLInputElement;
    this.checked = input.checked;
    this.indeterminate = false;
    this.dispatchEvent(
      new CustomEvent('bh-change', {
        bubbles: true,
        composed: true,
        detail: { checked: this.checked },
      })
    );
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bh-checkbox': BhCheckbox;
  }
}
