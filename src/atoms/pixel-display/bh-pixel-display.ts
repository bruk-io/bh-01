import { html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { BaseElement } from '../../primitives/base-element.js';

const PALETTE_CLASSES = ['off', 'primary', 'success', 'warning', 'danger'] as const;

/**
 * An M×N grid of square pixels with on/off glow, used for LED-style displays.
 *
 * The `data` property is a flat row-major `Uint8Array` of length `cols * rows`.
 * Each byte is a palette index: 0 = off, 1 = primary, 2 = success, 3 = warning, 4 = danger.
 *
 * **Important:** Lit only triggers updates on reference change, not mutation.
 * Assign a new `Uint8Array` each time data changes.
 *
 * @csspart grid - The CSS Grid container
 * @csspart pixel - Each individual pixel div
 *
 * @cssprop [--bh-pixel-size=4px] - Pixel width and height
 * @cssprop [--bh-pixel-gap=1px] - Gap between pixels
 * @cssprop [--bh-pixel-off=var(--bh-color-surface-recessed)] - Off-state pixel color
 * @cssprop [--bh-pixel-radius=1px] - Pixel border-radius
 * @cssprop [--bh-pixel-glow=4px] - Glow spread on lit pixels
 */
@customElement('bh-pixel-display')
export class BhPixelDisplay extends BaseElement {
  static styles = [
    ...([BaseElement.styles].flat()),
    css`
      :host {
        display: inline-block;
      }

      .grid {
        display: grid;
        grid-template-columns: repeat(var(--_cols), var(--bh-pixel-size, 4px));
        grid-template-rows: repeat(var(--_rows), var(--bh-pixel-size, 4px));
        gap: var(--bh-pixel-gap, 1px);
      }

      .px {
        width: var(--bh-pixel-size, 4px);
        height: var(--bh-pixel-size, 4px);
        border-radius: var(--bh-pixel-radius, 1px);
        background: var(--bh-pixel-off, var(--bh-color-surface-recessed));
        transition: background 0.15s, box-shadow 0.15s;
      }

      .px.primary {
        background: var(--bh-color-primary);
        box-shadow: 0 0 var(--bh-pixel-glow, 4px) var(--bh-color-primary-glow);
      }

      .px.success {
        background: var(--bh-color-success);
        box-shadow: 0 0 var(--bh-pixel-glow, 4px) var(--bh-color-success-dim);
      }

      .px.warning {
        background: var(--bh-color-warning);
        box-shadow: 0 0 var(--bh-pixel-glow, 4px) var(--bh-color-warning-dim);
      }

      .px.danger {
        background: var(--bh-color-danger);
        box-shadow: 0 0 var(--bh-pixel-glow, 4px) rgba(239, 68, 68, 0.4);
      }
    `,
  ];

  @property({ type: Number }) cols = 20;
  @property({ type: Number }) rows = 5;
  @property({ attribute: false }) data?: Uint8Array;
  @property() label = '';

  private _prevData?: Uint8Array;
  private _pixelEls: HTMLDivElement[] = [];

  protected render() {
    const total = this.cols * this.rows;
    const hasLabel = this.label.length > 0;

    return html`
      <div
        class="grid"
        part="grid"
        role=${hasLabel ? 'img' : nothing}
        aria-label=${hasLabel ? this.label : nothing}
        aria-hidden=${!hasLabel ? 'true' : nothing}
        style="--_cols:${this.cols};--_rows:${this.rows}"
      >
        ${Array.from({ length: total }, () =>
          html`<div class="px" part="pixel" aria-hidden="true"></div>`
        )}
      </div>
    `;
  }

  protected updated() {
    const data = this.data;
    const prev = this._prevData;

    // Grab pixel elements after render
    const grid = this.shadowRoot!.querySelector('.grid');
    if (!grid) return;
    this._pixelEls = Array.from(grid.querySelectorAll('.px')) as HTMLDivElement[];

    const total = this.cols * this.rows;
    for (let i = 0; i < total && i < this._pixelEls.length; i++) {
      const newVal = data && i < data.length ? data[i] : 0;
      const oldVal = prev && i < prev.length ? prev[i] : -1;

      if (newVal !== oldVal) {
        const el = this._pixelEls[i];
        el.className = `px ${newVal > 0 && newVal < PALETTE_CLASSES.length ? PALETTE_CLASSES[newVal] : ''}`.trimEnd();
      }
    }

    // Store a copy for next diff
    if (data) {
      this._prevData = new Uint8Array(data);
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bh-pixel-display': BhPixelDisplay;
  }
}
