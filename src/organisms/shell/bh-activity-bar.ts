import { html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { BaseElement } from '../../primitives/base-element.js';
import type { BhActivityItem } from './bh-activity-item.js';
import './bh-activity-item.js';

/**
 * A vertical activity bar with icon items, similar to VS Code.
 *
 * @slot - Activity items (`<bh-activity-item>`)
 *
 * @csspart container - The items container
 *
 * @cssprop [--bh-activity-bar-width=48px] - Bar width
 * @cssprop [--bh-activity-bar-bg=var(--bh-color-surface-recessed)] - Background color
 * @cssprop [--bh-activity-bar-border=var(--bh-color-border)] - Right border color
 *
 * @fires bh-activity-change - Fired when the active item changes. `detail: { id: string, label: string }`
 */
@customElement('bh-activity-bar')
export class BhActivityBar extends BaseElement {
  static styles = [
    ...([BaseElement.styles].flat()),
    css`
      :host {
        display: flex;
        flex-direction: column;
        width: var(--bh-activity-bar-width, 48px);
        background: var(--bh-activity-bar-bg, var(--bh-color-surface-recessed));
        border-right: var(--bh-border-1) solid var(--bh-activity-bar-border, var(--bh-color-border));
        padding-top: var(--bh-spacing-2);
      }

      .items {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: var(--bh-spacing-1);
      }
    `,
  ];

  @state() private _activeId = '';

  render() {
    return html`
      <div class="items" part="container" @bh-activity-item-click=${this._handleItemClick}>
        <slot></slot>
      </div>
    `;
  }

  get activeId(): string {
    return this._activeId;
  }

  setActive(id: string) {
    this._activeId = id;
    this._updateItems();
  }

  private _handleItemClick(e: CustomEvent<{ id: string; label: string }>) {
    const { id, label } = e.detail;
    const wasActive = this._activeId === id;
    this._activeId = wasActive ? '' : id;
    this._updateItems();

    this.dispatchEvent(
      new CustomEvent('bh-activity-change', {
        bubbles: true,
        composed: true,
        detail: {
          id: this._activeId,
          label: this._activeId ? label : '',
        },
      })
    );
  }

  private _updateItems() {
    const slot = this.shadowRoot?.querySelector('slot');
    if (!slot) return;

    const items = slot.assignedElements({ flatten: true }).filter(
      (el): el is BhActivityItem => el.tagName === 'BH-ACTIVITY-ITEM'
    );

    for (const item of items) {
      item.active = item.itemId === this._activeId;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bh-activity-bar': BhActivityBar;
  }
}
