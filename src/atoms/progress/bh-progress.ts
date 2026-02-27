import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { BaseElement } from '../../primitives/base-element.js';

export type ProgressSize = 'sm' | 'md' | 'lg';
export type ProgressVariant = 'default' | 'success' | 'warning' | 'danger';

/**
 * A linear progress bar for loading states and completion tracking.
 * Set `indeterminate` for unknown duration, or `value` for determinate progress.
 *
 * @csspart track - The background track
 * @csspart bar - The filled progress bar
 *
 * @cssprop [--bh-progress-color=var(--bh-color-primary)] - Bar fill color
 * @cssprop [--bh-progress-track=var(--bh-color-secondary)] - Track background color
 */
@customElement('bh-progress')
export class BhProgress extends BaseElement {
  static styles = [
    ...([BaseElement.styles].flat()),
    css`
      :host {
        display: block;
        width: 100%;
      }

      .track {
        width: 100%;
        border-radius: var(--bh-radius-full);
        background: var(--bh-progress-track, var(--bh-color-secondary));
        overflow: hidden;
      }

      :host([size='sm']) .track { height: 0.25rem; }
      .track, :host([size='md']) .track { height: 0.5rem; }
      :host([size='lg']) .track { height: 0.75rem; }

      .bar {
        height: 100%;
        border-radius: var(--bh-radius-full);
        background: var(--bh-progress-color, var(--bh-color-primary));
        transition: width var(--bh-transition-normal);
      }

      /* Variants */
      :host([variant='success']) .bar { --bh-progress-color: var(--bh-color-success); }
      :host([variant='warning']) .bar { --bh-progress-color: var(--bh-color-warning); }
      :host([variant='danger']) .bar { --bh-progress-color: var(--bh-color-danger); }

      /* Indeterminate */
      :host([indeterminate]) .bar {
        width: 40% !important;
        animation: indeterminate 1.5s var(--bh-ease-in-out) infinite;
      }

      @keyframes indeterminate {
        0% { transform: translateX(-100%); }
        100% { transform: translateX(350%); }
      }
    `,
  ];

  @property({ type: Number }) value = 0;
  @property({ type: Number }) max = 100;
  @property({ type: Boolean, reflect: true }) indeterminate = false;
  @property({ reflect: true }) size: ProgressSize = 'md';
  @property({ reflect: true }) variant: ProgressVariant = 'default';
  @property() label = 'Progress';

  render() {
    const percent = this.indeterminate
      ? undefined
      : Math.min(100, Math.max(0, (this.value / this.max) * 100));

    return html`
      <div
        class="track"
        part="track"
        role="progressbar"
        aria-label=${this.label}
        aria-valuenow=${this.indeterminate ? '' : this.value}
        aria-valuemin="0"
        aria-valuemax=${this.max}
      >
        <div
          class="bar"
          part="bar"
          style=${this.indeterminate ? '' : `width: ${percent}%`}
        ></div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bh-progress': BhProgress;
  }
}
