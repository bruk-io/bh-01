import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { BaseElement } from '../../primitives/base-element.js';
import type { BhTreeItem } from './bh-tree-item.js';
import './bh-tree-item.js';

/**
 * A tree container that manages selection across nested bh-tree-items.
 *
 * @slot - Tree items (bh-tree-item elements)
 *
 * @fires bh-select - Fired when a tree item is selected. `detail: { value: string, label: string }`
 */
@customElement('bh-tree')
export class BhTree extends BaseElement {
  static styles = [
    ...([BaseElement.styles].flat()),
    css`
      :host {
        display: block;
      }
    `,
  ];

  @property() selected = '';

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('bh-tree-item-click', this._onItemClick as EventListener);
    this.setAttribute('role', 'tree');
    this._updateSelection();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('bh-tree-item-click', this._onItemClick as EventListener);
  }

  updated(changed: Map<string, unknown>) {
    if (changed.has('selected')) {
      this._updateSelection();
    }
  }

  render() {
    return html`<slot></slot>`;
  }

  private _onItemClick = (e: CustomEvent<{ value: string; label: string }>) => {
    const { value, label } = e.detail;
    this.selected = value;
    this.dispatchEvent(
      new CustomEvent('bh-select', {
        bubbles: true,
        composed: true,
        detail: { value, label },
      })
    );
  };

  private _updateSelection() {
    const items = this.querySelectorAll('bh-tree-item') as NodeListOf<BhTreeItem>;
    let hasSelected = false;
    items.forEach((item) => {
      item.selected = item.value === this.selected;
      item.roving = false;
      if (item.selected) hasSelected = true;
    });
    // Roving tabindex: if nothing is selected, make the first item keyboard-reachable
    // so the tree is always accessible via Tab.
    if (!hasSelected && items.length > 0) {
      items[0].roving = true;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bh-tree': BhTree;
  }
}
