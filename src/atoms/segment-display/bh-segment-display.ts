import { html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { BaseElement } from '../../primitives/base-element.js';

export type SegmentColor = 'primary' | 'success' | 'warning' | 'danger' | 'default';
export type SegmentSize = 'sm' | 'md' | 'lg' | 'xl';

/**
 * A 14-segment LED display using the DSEG14 font for that Teenage Engineering /
 * Braun aesthetic.  Renders uppercase text and digits in glowing segment style.
 *
 * The DSEG14 font supports: A-Z, 0-9, and common symbols (+, -, ., :, etc.).
 * Text is automatically uppercased.
 *
 * @csspart display - The inner `<span>` element
 *
 * @cssprop [--bh-segment-color=var(--bh-color-primary)] - Segment fill color
 * @cssprop [--bh-segment-glow=var(--bh-color-primary-glow)] - Segment glow color
 * @cssprop [--bh-segment-off=var(--bh-color-surface-recessed)] - Ghost segment color
 * @cssprop [--bh-segment-size=14px] - Font size
 * @cssprop [--bh-segment-tracking=1px] - Letter spacing
 */
@customElement('bh-segment-display')
export class BhSegmentDisplay extends BaseElement {
  static styles = [
    ...([BaseElement.styles].flat()),
    css`
      :host {
        display: inline-block;
        font-family: 'DSEG14Classic', 'DSEG14', var(--bh-font-mono);
        text-transform: uppercase;
      }

      .display {
        font-size: var(--bh-segment-size, 14px);
        font-weight: normal;
        letter-spacing: var(--bh-segment-tracking, 1px);
        color: var(--bh-segment-color);
        text-shadow: 0 0 8px var(--bh-segment-glow);
        line-height: var(--bh-leading-none);
      }

      /* Ghost segments behind the lit text */
      :host([ghost]) .ghost {
        position: absolute;
        inset: 0;
        color: var(--bh-segment-off, var(--bh-color-surface-recessed));
        text-shadow: none;
        pointer-events: none;
        user-select: none;
      }

      :host([ghost]) .wrapper {
        position: relative;
        display: inline-block;
      }

      /* Sizes */
      :host([size='sm']) .display,
      :host([size='sm']) .ghost {
        --bh-segment-size: 10px;
        --bh-segment-tracking: 0.5px;
      }

      .display,
      .ghost,
      :host([size='md']) .display,
      :host([size='md']) .ghost {
        --bh-segment-size: 14px;
        --bh-segment-tracking: 1px;
      }

      :host([size='lg']) .display,
      :host([size='lg']) .ghost {
        --bh-segment-size: 20px;
        --bh-segment-tracking: 1.5px;
      }

      :host([size='xl']) .display,
      :host([size='xl']) .ghost {
        --bh-segment-size: 28px;
        --bh-segment-tracking: 2px;
      }

      /* Colors */
      :host,
      :host([color='primary']) {
        --bh-segment-color: var(--bh-color-primary);
        --bh-segment-glow: var(--bh-color-primary-glow, rgba(255, 107, 53, 0.25));
      }

      :host([color='success']) {
        --bh-segment-color: var(--bh-color-success);
        --bh-segment-glow: var(--bh-color-success-dim, rgba(42, 157, 78, 0.25));
      }

      :host([color='warning']) {
        --bh-segment-color: var(--bh-color-warning);
        --bh-segment-glow: rgba(245, 158, 11, 0.25);
      }

      :host([color='danger']) {
        --bh-segment-color: var(--bh-color-danger);
        --bh-segment-glow: rgba(220, 38, 38, 0.25);
      }

      :host([color='default']) {
        --bh-segment-color: var(--bh-color-text);
        --bh-segment-glow: transparent;
      }
    `,
  ];

  /** The text to display. Automatically uppercased. */
  @property() value = '';

  @property({ reflect: true }) color: SegmentColor = 'primary';
  @property({ reflect: true }) size: SegmentSize = 'md';

  /** Show ghost (unlit) segments behind the active ones for the classic LCD look. */
  @property({ type: Boolean, reflect: true }) ghost = false;

  @property() label = '';

  /** Character used for ghost segments. Defaults to '8' for digits, '~' for alpha. */
  private get _ghostText(): string {
    return this.value
      .toUpperCase()
      .split('')
      .map(ch => (/[0-9]/.test(ch) ? '8' : /[A-Z]/.test(ch) ? '~' : ch))
      .join('');
  }

  render() {
    const upper = this.value.toUpperCase();

    if (this.ghost) {
      return html`
        <span class="wrapper">
          <span
            class="display ghost"
            aria-hidden="true"
          >${this._ghostText}</span>
          <span
            class="display"
            part="display"
            role="status"
            aria-label=${this.label || nothing}
          >${upper}</span>
        </span>
      `;
    }

    return html`
      <span
        class="display"
        part="display"
        role="status"
        aria-label=${this.label || nothing}
      >${upper}</span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bh-segment-display': BhSegmentDisplay;
  }
}
