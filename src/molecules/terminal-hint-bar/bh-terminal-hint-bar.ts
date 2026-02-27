import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { BaseElement } from '../../primitives/base-element.js';

export interface TerminalHint {
  key: string;
  label: string;
}

/**
 * A bottom hint strip for the terminal showing keyboard shortcuts.
 *
 * @csspart bar - The outer bar container
 *
 * @cssprop [--bh-color-surface-recessed] - Bar background color
 * @cssprop [--bh-color-border] - Top border color
 * @cssprop [--bh-color-text-tertiary] - Hint label text color
 * @cssprop [--bh-color-primary] - Key highlight color
 * @cssprop [--bh-font-mono] - Monospace font family
 */
@customElement('bh-terminal-hint-bar')
export class BhTerminalHintBar extends BaseElement {
  static styles = [
    ...([BaseElement.styles].flat()),
    css`
      :host {
        display: block;
      }

      .bar {
        display: flex;
        align-items: center;
        height: 24px;
        padding: 0 12px;
        gap: 16px;
        background: var(--bh-color-surface-recessed);
        border-top: 1px solid var(--bh-color-border);
      }

      .hint {
        font-family: var(--bh-font-mono);
        font-size: 8px;
        letter-spacing: 1px;
        text-transform: uppercase;
        color: var(--bh-color-text-tertiary);
      }

      kbd {
        color: var(--bh-color-primary);
        font-family: inherit;
      }

      @media (hover: none) and (pointer: coarse) {
        :host {
          display: none;
        }
      }
    `,
  ];

  @property({ attribute: false }) hints: TerminalHint[] = [];

  render() {
    return html`
      <div class="bar" part="bar">
        ${this.hints.map(
          (h) => html`
            <span class="hint">
              <kbd>${h.key}</kbd> ${h.label}
            </span>
          `
        )}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bh-terminal-hint-bar': BhTerminalHintBar;
  }
}
