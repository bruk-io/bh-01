import { html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { BaseElement } from '../../primitives/base-element.js';

/**
 * A radio input for single-selection from a group. Group radios by giving them
 * the same `name` attribute.
 *
 * @slot - Label text displayed next to the radio
 *
 * @csspart radio - The visual radio indicator
 * @csspart label - The label text container
 *
 * @cssprop [--bh-radio-size=1.25rem] - Radio width and height
 *
 * @fires bh-change - Fired when selected. `detail: { checked: boolean, value: string }`
 */
@customElement('bh-radio')
export class BhRadio extends BaseElement {
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

      .radio {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: var(--bh-radio-size, 1.25rem);
        height: var(--bh-radio-size, 1.25rem);
        border: var(--bh-border-2) solid var(--bh-color-border);
        border-radius: var(--bh-radius-full);
        background: var(--bh-color-surface-raised);
        transition: border-color var(--bh-transition-fast);
        flex-shrink: 0;
      }

      .dot {
        width: 0.5rem;
        height: 0.5rem;
        border-radius: var(--bh-radius-full);
        background: var(--bh-color-primary-text);
        opacity: 0;
        transform: scale(0);
        transition: opacity var(--bh-transition-fast),
                    transform var(--bh-transition-fast);
      }

      /* Checked */
      :host([checked]) .radio {
        background: var(--bh-color-primary);
        border-color: var(--bh-color-primary);
      }

      :host([checked]) .dot {
        opacity: 1;
        transform: scale(1);
      }

      /* Focus */
      input:focus-visible ~ .radio {
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
  @property({ type: Boolean, reflect: true }) disabled = false;
  @property() value = '';
  @property() name = '';
  @property() label = '';

  render() {
    return html`
      <label>
        <input
          type="radio"
          .checked=${this.checked}
          ?disabled=${this.disabled}
          name=${this.name || nothing}
          value=${this.value || nothing}
          aria-label=${this.label || nothing}
          @change=${this._handleChange}
        />
        <span class="radio" part="radio">
          <span class="dot"></span>
        </span>
        <span class="label" part="label"><slot>${this.label}</slot></span>
      </label>
    `;
  }

  private _handleChange() {
    this.checked = true;
    this.dispatchEvent(
      new CustomEvent('bh-change', {
        bubbles: true,
        composed: true,
        detail: { checked: true, value: this.value },
      })
    );
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bh-radio': BhRadio;
  }
}
