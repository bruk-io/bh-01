import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { BaseElement } from '../../primitives/base-element.js';

/**
 * A fixed-height status bar with left/right slots.
 *
 * @slot - Left-aligned status content
 * @slot end - Right-aligned status content
 *
 * @csspart bar - The status bar container
 *
 * @cssprop [--bh-status-bar-bg=var(--bh-color-surface)] - Bar background
 * @cssprop [--bh-status-bar-border=var(--bh-color-border)] - Bar border color
 * @cssprop [--bh-status-bar-text=var(--bh-color-text-muted)] - Text color
 * @cssprop [--bh-status-bar-error-text=var(--bh-color-danger)] - Error text color
 */
@customElement('bh-status-bar')
export class BhStatusBar extends BaseElement {
  static styles = [
    ...([BaseElement.styles].flat()),
    css`
      :host {
        display: block;
        height: var(--bh-spacing-6);
        background: var(--bh-status-bar-bg, var(--bh-color-surface));
        border-top: var(--bh-border-1) solid var(--bh-status-bar-border, var(--bh-color-border));
        color: var(--bh-status-bar-text, var(--bh-color-text-muted));
        font-size: var(--bh-text-xs);
        line-height: var(--bh-spacing-6);
      }

      .bar {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 100%;
        padding: 0 var(--bh-spacing-3);
        gap: var(--bh-spacing-2);
      }

      .start,
      .end {
        display: flex;
        align-items: center;
        gap: var(--bh-spacing-2);
        min-width: 0;
      }

      .start {
        flex: 1;
        overflow: hidden;
      }

      .end {
        flex-shrink: 0;
      }

      .message {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      :host([error]) {
        color: var(--bh-status-bar-error-text, var(--bh-color-danger));
      }
    `,
  ];

  @property() message = '';
  @property({ type: Boolean, reflect: true }) error = false;

  render() {
    return html`
      <div class="bar" part="bar" role="status" aria-live="polite">
        <div class="start">
          ${this.message ? html`<span class="message">${this.message}</span>` : ''}
          <slot></slot>
        </div>
        <div class="end">
          <slot name="end"></slot>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bh-status-bar': BhStatusBar;
  }
}
