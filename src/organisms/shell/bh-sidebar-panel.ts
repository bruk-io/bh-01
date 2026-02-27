import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { BaseElement } from '../../primitives/base-element.js';

/**
 * A collapsible side panel with header and body slots.
 *
 * @slot header - Panel header content (36px tall)
 * @slot - Panel body content (overflow auto)
 *
 * @csspart header - The header wrapper
 * @csspart body - The scrollable body wrapper
 *
 * @cssprop [--bh-sidebar-panel-width=250px] - Panel width
 * @cssprop [--bh-sidebar-panel-bg=var(--bh-color-surface)] - Panel background
 * @cssprop [--bh-sidebar-panel-border=var(--bh-color-border)] - Panel border color
 *
 * @fires bh-sidebar-collapse - Fired when the panel collapses or expands. `detail: { collapsed: boolean }`
 */
@customElement('bh-sidebar-panel')
export class BhSidebarPanel extends BaseElement {
  static styles = [
    ...([BaseElement.styles].flat()),
    css`
      :host {
        display: block;
        width: var(--bh-sidebar-panel-width, 250px);
        background: var(--bh-sidebar-panel-bg, var(--bh-color-surface));
        border-right: var(--bh-border-1) solid var(--bh-sidebar-panel-border, var(--bh-color-border));
        overflow: hidden;
        transition: width var(--bh-transition-normal);
      }

      :host([collapsed]) {
        width: 0;
      }

      .header {
        display: flex;
        align-items: center;
        height: var(--bh-spacing-9);
        padding: 0 var(--bh-spacing-3);
        border-bottom: var(--bh-border-1) solid var(--bh-sidebar-panel-border, var(--bh-color-border));
        flex-shrink: 0;
      }

      .body {
        overflow-y: auto;
        height: calc(100% - var(--bh-spacing-9));
      }
    `,
  ];

  @property({ type: Boolean, reflect: true }) collapsed = false;

  // Suppress the event on initial render — only fire on user-driven changes.
  private _firstUpdate = true;

  render() {
    return html`
      <div class="header" part="header">
        <slot name="header"></slot>
      </div>
      <div class="body" part="body">
        <slot></slot>
      </div>
    `;
  }

  updated(changed: Map<string, unknown>) {
    if (this._firstUpdate) {
      this._firstUpdate = false;
      return;
    }
    if (changed.has('collapsed')) {
      this.dispatchEvent(
        new CustomEvent('bh-sidebar-collapse', {
          bubbles: true,
          composed: true,
          detail: { collapsed: this.collapsed },
        })
      );
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bh-sidebar-panel': BhSidebarPanel;
  }
}
