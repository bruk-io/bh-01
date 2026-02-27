import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { BaseElement } from '../../primitives/base-element.js';
import './bh-tab.js';

/**
 * Horizontal tab bar that holds bh-tab items.
 *
 * @slot - Tab items (bh-tab elements)
 *
 * @cssprop [--bh-tab-bar-height=36px] - Bar height
 * @cssprop [--bh-tab-bar-bg=transparent] - Background color
 * @cssprop [--bh-tab-bar-border=var(--bh-color-border)] - Bottom border color
 *
 * @fires bh-tab-change - Fired when a tab is selected. `detail: { tabId: string }`
 */
@customElement('bh-tab-bar')
export class BhTabBar extends BaseElement {
  static styles = [
    ...([BaseElement.styles].flat()),
    css`
      :host {
        display: block;
      }

      .tabs {
        display: flex;
        align-items: center;
        height: var(--bh-tab-bar-height, 36px);
        background: var(--bh-tab-bar-bg, transparent);
        border-bottom: var(--bh-border-1) solid var(--bh-tab-bar-border, var(--bh-color-border));
        overflow-x: auto;
      }

      ::slotted(bh-tab) {
        height: 100%;
      }
    `,
  ];

  @property() active = '';

  render() {
    return html`
      <div class="tabs" role="tablist" @bh-tab-click=${this._handleTabClick}>
        <slot @slotchange=${this._syncActive}></slot>
      </div>
    `;
  }

  updated(changed: Map<string, unknown>) {
    if (changed.has('active')) {
      this._syncActive();
    }
  }

  private _syncActive() {
    const tabs = this._getTabs();
    for (const tab of tabs) {
      tab.active = tab.tabId === this.active;
    }
  }

  private _handleTabClick(e: CustomEvent<{ tabId: string }>) {
    e.stopPropagation();
    this.active = e.detail.tabId;
    this.dispatchEvent(
      new CustomEvent('bh-tab-change', {
        bubbles: true,
        composed: true,
        detail: { tabId: e.detail.tabId },
      })
    );
  }

  private _getTabs() {
    const slot = this.shadowRoot?.querySelector('slot');
    if (!slot) return [];
    return slot
      .assignedElements({ flatten: true })
      .filter((el): el is import('./bh-tab.js').BhTab => el.tagName === 'BH-TAB');
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bh-tab-bar': BhTabBar;
  }
}
