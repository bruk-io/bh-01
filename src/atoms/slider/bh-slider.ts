import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { BaseElement } from '../../primitives/base-element.js';

/**
 * A range slider input component.
 *
 * @csspart track - The native range input element
 * @csspart value - The value display span
 *
 * @cssprop [--bh-slider-thumb-size=14px] - Thumb diameter
 * @cssprop [--bh-slider-thumb-color=var(--bh-color-primary)] - Thumb color
 * @cssprop [--bh-slider-track-height=4px] - Track height
 * @cssprop [--bh-slider-track-color=var(--bh-color-surface-raised)] - Track background
 *
 * @fires bh-input - Fired during drag. `detail: { value: number }`
 * @fires bh-change - Fired on release. `detail: { value: number }`
 */
@customElement('bh-slider')
export class BhSlider extends BaseElement {
  static styles = [
    ...([BaseElement.styles].flat()),
    css`
      :host {
        display: block;
      }

      .slider {
        display: flex;
        align-items: center;
        gap: var(--bh-spacing-3);
      }

      input[type='range'] {
        -webkit-appearance: none;
        appearance: none;
        flex: 1;
        height: var(--bh-slider-track-height, 4px);
        background: var(--bh-slider-track-color, var(--bh-color-surface-raised));
        border-radius: var(--bh-radius-full);
        outline: none;
        margin: 0;
      }

      input[type='range']::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: var(--bh-slider-thumb-size, 14px);
        height: var(--bh-slider-thumb-size, 14px);
        border-radius: 50%;
        background: var(--bh-slider-thumb-color, var(--bh-color-primary));
        cursor: pointer;
        transition: box-shadow var(--bh-transition-fast);
      }

      input[type='range']:focus-visible::-webkit-slider-thumb {
        box-shadow: 0 0 0 var(--bh-border-2) var(--bh-color-ring);
      }

      input[type='range']::-moz-range-thumb {
        width: var(--bh-slider-thumb-size, 14px);
        height: var(--bh-slider-thumb-size, 14px);
        border: none;
        border-radius: 50%;
        background: var(--bh-slider-thumb-color, var(--bh-color-primary));
        cursor: pointer;
      }

      input[type='range']:focus-visible::-moz-range-thumb {
        box-shadow: 0 0 0 var(--bh-border-2) var(--bh-color-ring);
      }

      .value {
        font-family: var(--bh-font-mono);
        font-size: var(--bh-text-sm);
        color: var(--bh-color-text-muted);
        font-variant-numeric: tabular-nums;
        min-width: 2ch;
        text-align: end;
      }

      /* Disabled */
      :host([disabled]) {
        opacity: 0.5;
        pointer-events: none;
      }
    `,
  ];

  @property({ type: Number }) min = 0;
  @property({ type: Number }) max = 100;
  @property({ type: Number }) step = 1;
  @property({ type: Number }) value = 0;
  @property({ type: Boolean, reflect: true }) disabled = false;
  @property({ type: Boolean, reflect: true, attribute: 'show-value' }) showValue = false;
  @property() label = '';

  render() {
    return html`
      <div class="slider">
        <input
          part="track"
          type="range"
          .min=${String(this.min)}
          .max=${String(this.max)}
          .step=${String(this.step)}
          .value=${String(this.value)}
          ?disabled=${this.disabled}
          aria-label=${this.label || 'Slider'}
          @input=${this._handleInput}
          @change=${this._handleChange}
        />
        ${this.showValue
          ? html`<span class="value" part="value">${this.value}</span>`
          : ''}
      </div>
    `;
  }

  private _handleInput(e: InputEvent) {
    const input = e.target as HTMLInputElement;
    this.value = Number(input.value);
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
    this.value = Number(input.value);
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
    'bh-slider': BhSlider;
  }
}
