import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { BaseElement } from '../../primitives/base-element.js';

/**
 * A small uppercase section header for sidebar panels.
 *
 * @slot end - Actions rendered at the end of the header
 *
 * @csspart header - The header container
 * @csspart label - The label text
 *
 * @cssprop [--bh-panel-header-height=36px] - Header height
 * @cssprop [--bh-panel-header-text=var(--bh-color-text-muted)] - Label color
 */
@customElement('bh-panel-header')
export class BhPanelHeader extends BaseElement {
  static styles = [
    ...([BaseElement.styles].flat()),
    css`
      :host {
        display: block;
      }

      .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: var(--bh-panel-header-height, 36px);
        padding: 0 var(--bh-spacing-3);
        gap: var(--bh-spacing-2);
      }

      .label {
        font-size: var(--bh-text-xs);
        font-weight: var(--bh-font-semibold);
        text-transform: uppercase;
        letter-spacing: 0.05em;
        color: var(--bh-panel-header-text, var(--bh-color-text-muted));
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        min-width: 0;
      }

      .end {
        display: flex;
        align-items: center;
        gap: var(--bh-spacing-1);
        flex-shrink: 0;
      }
    `,
  ];

  @property() label = '';

  render() {
    return html`
      <div class="header" part="header">
        <span class="label" part="label">${this.label}</span>
        <div class="end">
          <slot name="end"></slot>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bh-panel-header': BhPanelHeader;
  }
}
