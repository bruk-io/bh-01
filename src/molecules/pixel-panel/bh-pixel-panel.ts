import { html, css, type PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { BaseElement } from '../../primitives/base-element.js';
import { PixelDataController } from './pixel-data-controller.js';
import { animatePixels } from './animate-pixels.js';
import type { PixelDataType } from './pixel-data-controller.js';
import type { PixelTransition } from './animate-pixels.js';
import '../../atoms/pixel-display/bh-pixel-display.js';
import '../../molecules/card/bh-card.js';

/**
 * Panel chrome that wraps a pixel display with header (label + value) and footer.
 *
 * **Dual mode:**
 * - **Slot mode** (default): Set `cols` and `rows` to 0. Slot a `<bh-pixel-display>` yourself.
 * - **Managed mode**: Set `cols` and `rows` > 0. The panel renders its own display,
 *   handles buffering, grid generation, and visual transitions.
 *
 * @slot - Display area (slot mode only; hidden in managed mode)
 * @slot label - Custom label content (overrides `label` prop)
 * @slot value - Custom value content (overrides `value` prop)
 * @slot footer-start - Custom footer-start content (overrides `footerStart` prop)
 * @slot footer-end - Custom footer-end content (overrides `footerEnd` prop)
 *
 * @csspart panel - The outer panel container
 * @csspart header - The header row
 * @csspart label - The label text
 * @csspart value - The value text
 * @csspart body - The display area wrapper
 * @csspart footer - The footer row
 *
 * @cssprop [--bh-pixel-panel-bg=var(--bh-color-surface)] - Panel background
 * @cssprop [--bh-pixel-panel-border=var(--bh-color-border)] - Panel border color
 * @cssprop [--bh-pixel-panel-radius=var(--bh-radius-lg)] - Panel border-radius
 */
@customElement('bh-pixel-panel')
export class BhPixelPanel extends BaseElement {
  static styles = [
    ...([BaseElement.styles].flat()),
    css`
      :host {
        display: inline-block;
      }

      bh-card {
        --bh-card-bg: var(--bh-pixel-panel-bg, var(--bh-color-surface));
        --bh-card-border: var(--bh-pixel-panel-border, var(--bh-color-border));
        --bh-card-radius: var(--bh-pixel-panel-radius, var(--bh-radius-lg));
        --bh-card-shadow: none;
      }

      .header {
        display: flex;
        align-items: baseline;
        justify-content: space-between;
        gap: var(--bh-spacing-2);
        padding: var(--bh-spacing-2) var(--bh-spacing-3);
      }

      .label {
        font-family: var(--bh-font-mono);
        font-size: var(--bh-text-2xs);
        font-weight: var(--bh-font-semibold);
        letter-spacing: var(--bh-tracking-wider);
        text-transform: uppercase;
        color: var(--bh-color-text-muted);
      }

      .value {
        font-family: var(--bh-font-mono);
        font-size: var(--bh-text-2xs);
        font-weight: var(--bh-font-semibold);
        color: var(--bh-color-text);
      }

      .body {
        padding: 0 var(--bh-spacing-3) var(--bh-spacing-2);
      }

      .footer {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: var(--bh-spacing-2);
        padding: var(--bh-spacing-1-5) var(--bh-spacing-3);
        border-top: var(--bh-border-1) solid var(--bh-color-border-muted);
        font-family: var(--bh-font-mono);
        font-size: var(--bh-text-2xs);
        color: var(--bh-color-text-muted);
      }
    `,
  ];

  @property() label = '';
  @property() value = '';
  @property({ attribute: 'footer-start' }) footerStart = '';
  @property({ attribute: 'footer-end' }) footerEnd = '';

  /** Grid width. Set > 0 along with `rows` to enable managed mode. */
  @property({ type: Number }) cols = 0;

  /** Grid height. Set > 0 along with `cols` to enable managed mode. */
  @property({ type: Number }) rows = 0;

  /** Data visualization type (managed mode). */
  @property() type: PixelDataType = 'sparkline';

  /** Visual transition mode (managed mode). */
  @property() transition: PixelTransition = 'step';

  /** Max frames per second for the transition directive (managed mode). */
  @property({ type: Number }) fps = 12;

  /** Palette index for lit pixels (managed mode). */
  @property({ type: Number }) color = 1;

  /** Rolling buffer size. Defaults to `cols` when 0. */
  @property({ type: Number, attribute: 'buffer-size' }) bufferSize = 0;

  private _ctrl?: PixelDataController;

  private get _managed(): boolean {
    return this.cols > 0 && this.rows > 0;
  }

  protected willUpdate(changed: PropertyValues): void {
    if (!this._managed) return;

    if (!this._ctrl) {
      this._ctrl = new PixelDataController(this, {
        cols: this.cols,
        rows: this.rows,
        type: this.type,
        color: this.color,
        bufferSize: this.bufferSize || this.cols,
      });
    } else if (
      changed.has('cols') ||
      changed.has('rows') ||
      changed.has('type') ||
      changed.has('color') ||
      changed.has('bufferSize')
    ) {
      this._ctrl.configure({
        cols: this.cols,
        rows: this.rows,
        type: this.type,
        color: this.color,
        bufferSize: this.bufferSize || this.cols,
      });
    }
  }

  push(value: number): void {
    this._ctrl?.push(value);
  }

  set(values: number[]): void {
    this._ctrl?.set(values);
  }

  setText(text: string): void {
    this._ctrl?.setText(text);
  }

  setGrid(grid: Uint8Array): void {
    this._ctrl?.setGrid(grid);
  }

  private _renderDisplay() {
    return html`
      <bh-pixel-display
        .cols=${this.cols}
        .rows=${this.rows}
        .data=${animatePixels(this._ctrl!.grid, {
          transition: this.transition,
          fps: this.fps,
          cols: this.cols,
        })}
        label=${this.label}
      ></bh-pixel-display>
    `;
  }

  render() {
    return html`
      <bh-card class="panel" part="panel" variant="outlined" padding="none" role="group" aria-label=${this.label || 'panel'}>
        <div class="header" part="header">
          <span class="label" part="label"><slot name="label">${this.label}</slot></span>
          <span class="value" part="value"><slot name="value">${this.value}</slot></span>
        </div>
        <div class="body" part="body">
          ${this._managed ? this._renderDisplay() : html`<slot></slot>`}
        </div>
        <div class="footer" part="footer">
          <span><slot name="footer-start">${this.footerStart}</slot></span>
          <span><slot name="footer-end">${this.footerEnd}</slot></span>
        </div>
      </bh-card>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bh-pixel-panel': BhPixelPanel;
  }
}
