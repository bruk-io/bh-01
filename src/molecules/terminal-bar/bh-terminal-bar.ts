import { html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { BaseElement } from '../../primitives/base-element.js';
import '../../atoms/led/bh-led.js';
import type { LedColor } from '../../atoms/led/bh-led.js';

export type TerminalBarStatusColor = LedColor;

/**
 * A terminal title bar with window dots, a title, and a status indicator.
 *
 * @csspart bar - The bar container
 * @csspart title - The title text
 * @csspart status - The status indicator area
 *
 * @cssprop [--bh-terminal-bar-height=32px] - Bar height
 * @cssprop [--bh-terminal-bar-bg=var(--bh-color-surface-recessed)] - Bar background
 */
@customElement('bh-terminal-bar')
export class BhTerminalBar extends BaseElement {
  static styles = [
    ...([BaseElement.styles].flat()),
    css`
      :host {
        display: block;
      }

      .bar {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: var(--bh-terminal-bar-height, 32px);
        padding: 0 12px;
        background: var(--bh-terminal-bar-bg, var(--bh-color-surface-recessed));
        border-bottom: 1px solid var(--bh-color-border);
        box-shadow: var(--bh-shadow-emboss);
        user-select: none;
      }

      .bar-left {
        display: flex;
        align-items: center;
        gap: 6px;
      }

      .title {
        font-family: var(--bh-font-mono);
        font-size: 10px;
        font-weight: var(--bh-font-medium);
        letter-spacing: 2px;
        text-transform: uppercase;
        color: var(--bh-color-text-tertiary);
        margin-left: 8px;
      }

      .bar-right {
        display: flex;
        align-items: center;
      }

      .status {
        display: flex;
        align-items: center;
        gap: 5px;
        font-family: var(--bh-font-mono);
        font-size: 8px;
        letter-spacing: 1.5px;
        text-transform: uppercase;
        color: var(--bh-color-text-tertiary);
      }
    `,
  ];

  @property() title = 'Terminal';
  @property() status = '';
  @property({ reflect: true, attribute: 'status-color' }) statusColor: TerminalBarStatusColor = 'success';

  render() {
    return html`
      <div class="bar" part="bar">
        <div class="bar-left">
          <bh-led color="danger" size="sm"></bh-led>
          <bh-led color="warning" size="sm"></bh-led>
          <bh-led color="success" size="sm"></bh-led>
          <span class="title" part="title">${this.title}</span>
        </div>
        <div class="bar-right">
          ${this.status
            ? html`
                <span class="status" part="status">
                  <bh-led color=${this.statusColor} size="sm" pulse></bh-led>
                  ${this.status}
                </span>
              `
            : nothing}
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bh-terminal-bar': BhTerminalBar;
  }
}
