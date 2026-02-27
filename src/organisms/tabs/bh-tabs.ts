import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { BaseElement } from '../../primitives/base-element.js';
import './bh-tab-bar.js';
import './bh-tab-panel.js';

/**
 * Orchestrator that wires a bh-tab-bar to bh-tab-panel children.
 *
 * @slot tab-bar - Slot for the bh-tab-bar element
 * @slot - Default slot for bh-tab-panel elements
 *
 * @fires bh-tab-change - Re-emitted when the active tab changes. `detail: { tabId: string }`
 */
@customElement('bh-tabs')
export class BhTabs extends BaseElement {
  static styles = [
    ...([BaseElement.styles].flat()),
    css`
      :host {
        display: flex;
        flex-direction: column;
      }

      .panels {
        flex: 1;
        min-height: 0;
        overflow: hidden;
      }
    `,
  ];

  @property() active = '';

  render() {
    return html`
      <slot name="tab-bar" @bh-tab-change=${this._handleTabChange}></slot>
      <div class="panels">
        <slot @slotchange=${this._syncPanels}></slot>
      </div>
    `;
  }

  updated(changed: Map<string, unknown>) {
    if (changed.has('active')) {
      this._syncPanels();
      this._syncTabBar();
    }
  }

  private _handleTabChange(e: CustomEvent<{ tabId: string }>) {
    e.stopPropagation();
    this.active = e.detail.tabId;
    // _syncPanels() is called via updated() when `active` changes — no need to call it here too.
    this.dispatchEvent(
      new CustomEvent('bh-tab-change', {
        bubbles: true,
        composed: true,
        detail: { tabId: e.detail.tabId },
      })
    );
  }

  private _syncPanels() {
    const panels = this._getPanels();
    for (const panel of panels) {
      panel.active = panel.tabId === this.active;
    }
  }

  private _syncTabBar() {
    const tabBar = this._getTabBar();
    if (tabBar) {
      tabBar.active = this.active;
    }
  }

  private _getPanels() {
    const slot = this.shadowRoot?.querySelector('slot:not([name])');
    if (!slot) return [];
    return (slot as HTMLSlotElement)
      .assignedElements({ flatten: true })
      .filter(
        (el): el is import('./bh-tab-panel.js').BhTabPanel =>
          el.tagName === 'BH-TAB-PANEL'
      );
  }

  private _getTabBar() {
    const slot = this.shadowRoot?.querySelector('slot[name="tab-bar"]');
    if (!slot) return null;
    const elements = (slot as HTMLSlotElement).assignedElements({ flatten: true });
    return elements.find(
      (el): el is import('./bh-tab-bar.js').BhTabBar =>
        el.tagName === 'BH-TAB-BAR'
    ) ?? null;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bh-tabs': BhTabs;
  }
}
