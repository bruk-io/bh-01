import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { BaseElement } from '../../primitives/base-element.js';

export type CursorShape = 'block' | 'line' | 'underline';

/**
 * A blinking terminal cursor.
 *
 * @csspart cursor - The cursor element
 *
 * @cssprop [--bh-cursor-color=var(--bh-color-primary)] - Cursor color
 * @cssprop [--bh-cursor-width=8px] - Cursor width (block/underline)
 * @cssprop [--bh-cursor-height=1.2em] - Cursor height
 */
@customElement('bh-terminal-cursor')
export class BhTerminalCursor extends BaseElement {
  static styles = [
    ...([BaseElement.styles].flat()),
    css`
      :host {
        display: inline-block;
      }

      span {
        display: inline-block;
        background: var(--bh-cursor-color, var(--bh-color-primary));
      }

      /* Shapes */
      span,
      :host([shape='line']) span {
        width: 2px;
        height: var(--bh-cursor-height, 1.2em);
      }

      :host([shape='block']) span {
        width: var(--bh-cursor-width, 8px);
        height: var(--bh-cursor-height, 1.2em);
      }

      :host([shape='underline']) span {
        width: var(--bh-cursor-width, 8px);
        height: 2px;
        vertical-align: bottom;
      }

      /* Blink animation */
      :host([blink]) span {
        animation: cursor-blink 1s ease-in-out infinite;
      }

      @keyframes cursor-blink {
        0%, 100% {
          opacity: 1;
        }
        50% {
          opacity: 0.2;
        }
      }
    `,
  ];

  @property({ reflect: true }) shape: CursorShape = 'line';
  @property({ type: Boolean, reflect: true }) blink = true;

  render() {
    return html`<span part="cursor"></span>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bh-terminal-cursor': BhTerminalCursor;
  }
}
