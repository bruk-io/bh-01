import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { BaseElement } from '../../primitives/base-element.js';

export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right';

/**
 * A tooltip that shows contextual text on hover/focus of its trigger content.
 * Pure CSS positioning — no floating-ui dependency.
 *
 * @slot - The trigger element that activates the tooltip
 *
 * @csspart tooltip - The tooltip popup element
 *
 * @cssprop [--bh-tooltip-bg=var(--bh-color-cod)] - Tooltip background
 * @cssprop [--bh-tooltip-color=var(--bh-color-white)] - Tooltip text color
 */
@customElement('bh-tooltip')
export class BhTooltip extends BaseElement {
  static styles = [
    ...([BaseElement.styles].flat()),
    css`
      :host {
        display: inline-flex;
        position: relative;
      }

      .trigger {
        display: inline-flex;
      }

      .tooltip {
        position: absolute;
        z-index: var(--bh-z-tooltip);
        padding: var(--bh-spacing-1-5) var(--bh-spacing-3);
        font-family: var(--bh-font-sans);
        font-size: var(--bh-text-sm);
        line-height: var(--bh-leading-normal);
        white-space: nowrap;
        border-radius: var(--bh-radius-md);
        background: var(--bh-tooltip-bg, var(--bh-color-cod));
        color: var(--bh-tooltip-color, var(--bh-color-white));
        pointer-events: none;
        opacity: 0;
        transition: opacity var(--bh-transition-fast);
      }

      :host(:hover) .tooltip,
      :host(:focus-within) .tooltip {
        opacity: 1;
      }

      /* Placements */
      :host([placement='top']) .tooltip,
      .tooltip {
        bottom: 100%;
        left: 50%;
        transform: translateX(-50%);
        margin-bottom: var(--bh-spacing-1-5);
      }

      :host([placement='bottom']) .tooltip {
        top: 100%;
        left: 50%;
        transform: translateX(-50%);
        margin-top: var(--bh-spacing-1-5);
      }

      :host([placement='left']) .tooltip {
        right: 100%;
        top: 50%;
        transform: translateY(-50%);
        margin-right: var(--bh-spacing-1-5);
      }

      :host([placement='right']) .tooltip {
        left: 100%;
        top: 50%;
        transform: translateY(-50%);
        margin-left: var(--bh-spacing-1-5);
      }
    `,
  ];

  @property() content = '';
  @property({ reflect: true }) placement: TooltipPlacement = 'top';

  render() {
    return html`
      <span class="trigger">
        <slot></slot>
      </span>
      <span class="tooltip" part="tooltip" role="tooltip">${this.content}</span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bh-tooltip': BhTooltip;
  }
}
