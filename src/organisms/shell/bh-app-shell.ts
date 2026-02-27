import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { BaseElement } from '../../primitives/base-element.js';

/**
 * A CSS Grid application shell with named areas: activity, sidebar, main, status.
 *
 * @slot activity - The activity bar area (left icon strip)
 * @slot sidebar - The sidebar area (collapsible panel)
 * @slot - The main content area
 * @slot status - The status bar area (bottom strip)
 *
 * @csspart grid - The grid container
 *
 * @cssprop [--bh-shell-activity-width=48px] - Activity bar column width
 * @cssprop [--bh-shell-sidebar-width=0px] - Sidebar column width (0 when collapsed)
 * @cssprop [--bh-shell-status-height=24px] - Status bar row height
 * @cssprop [--bh-shell-bg=var(--bh-color-bg)] - Shell background color
 */
@customElement('bh-app-shell')
export class BhAppShell extends BaseElement {
  static styles = [
    ...([BaseElement.styles].flat()),
    css`
      :host {
        display: block;
        height: 100vh;
        width: 100vw;
        background: var(--bh-shell-bg, var(--bh-color-bg));
      }

      .grid {
        display: grid;
        grid-template-columns:
          var(--bh-shell-activity-width, 48px)
          var(--bh-shell-sidebar-width, 0px)
          1fr;
        grid-template-rows: 1fr var(--bh-shell-status-height, 24px);
        grid-template-areas:
          "activity sidebar main"
          "status   status  status";
        height: 100%;
        width: 100%;
        transition: grid-template-columns var(--bh-transition-normal);
      }

      :host([sidebar-open]) .grid {
        --bh-shell-sidebar-width: 250px;
      }

      .activity {
        grid-area: activity;
        min-width: 0;
      }

      .sidebar {
        grid-area: sidebar;
        min-width: 0;
        overflow: hidden;
      }

      .main {
        grid-area: main;
        min-width: 0;
        overflow: auto;
      }

      .status {
        grid-area: status;
        min-width: 0;
      }
    `,
  ];

  @property({ type: Boolean, reflect: true, attribute: 'sidebar-open' }) sidebarOpen = false;

  render() {
    return html`
      <div class="grid" part="grid">
        <div class="activity">
          <slot name="activity"></slot>
        </div>
        <div class="sidebar">
          <slot name="sidebar"></slot>
        </div>
        <div class="main">
          <slot></slot>
        </div>
        <div class="status">
          <slot name="status"></slot>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bh-app-shell': BhAppShell;
  }
}
