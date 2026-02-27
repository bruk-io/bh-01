import { html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import { classMap } from 'lit/directives/class-map.js';
import { BaseElement } from '../../primitives/base-element.js';
import '../../atoms/icon/bh-icon.js';

export interface ContextMenuItem {
  id: string;
  label: string;
  icon?: string;
  disabled?: boolean;
  separator?: boolean;
}

/**
 * A right-click context menu overlay.
 *
 * @cssprop [--bh-context-menu-min-width=160px] - Minimum menu width
 *
 * @fires bh-select - Fired when a menu item is selected. `detail: { id: string, label: string }`
 */
@customElement('bh-context-menu')
export class BhContextMenu extends BaseElement {
  static styles = [
    ...([BaseElement.styles].flat()),
    css`
      :host {
        display: none;
        position: fixed;
        inset: 0;
        z-index: var(--bh-z-popover);
      }

      :host([open]) {
        display: block;
      }

      .backdrop {
        position: fixed;
        inset: 0;
      }

      .menu {
        position: fixed;
        min-width: var(--bh-context-menu-min-width, 160px);
        background: var(--bh-color-surface-raised);
        border: var(--bh-border-1) solid var(--bh-color-border);
        border-radius: var(--bh-radius-md);
        box-shadow: var(--bh-shadow-md);
        padding: var(--bh-spacing-1) 0;
        overflow: hidden;
      }

      .item {
        display: flex;
        align-items: center;
        gap: var(--bh-spacing-2);
        padding: var(--bh-spacing-1-5) var(--bh-spacing-3);
        cursor: pointer;
        font-size: var(--bh-text-sm);
        color: var(--bh-color-text);
        transition: background var(--bh-transition-fast);
      }

      .item:hover,
      .item[aria-selected='true'] {
        background: var(--bh-color-surface-overlay);
      }

      .item.disabled {
        color: var(--bh-color-text-muted);
        cursor: default;
        pointer-events: none;
      }

      .separator {
        height: 1px;
        margin: var(--bh-spacing-1) 0;
        background: var(--bh-color-border-muted);
      }
    `,
  ];

  @property({ type: Boolean, reflect: true }) open = false;
  @property({ type: Number }) x = 0;
  @property({ type: Number }) y = 0;
  @property({ type: Array }) items: ContextMenuItem[] = [];

  @state() private _selectedIndex = -1;

  private get _actionableItems(): ContextMenuItem[] {
    return this.items.filter((i) => !i.separator && !i.disabled);
  }

  show(x: number, y: number, items?: ContextMenuItem[]): void {
    if (items) this.items = items;
    this.x = x;
    this.y = y;
    this.open = true;
    this._selectedIndex = -1;
  }

  hide(): void {
    this.open = false;
    this._selectedIndex = -1;
  }

  private _onBackdropClick() {
    this.hide();
  }

  private _onKeydown(e: KeyboardEvent) {
    const actionable = this._actionableItems;
    switch (e.key) {
      case 'Escape':
        this.hide();
        break;
      case 'ArrowDown': {
        e.preventDefault();
        const nextIdx = this._selectedIndex + 1;
        if (nextIdx < actionable.length) {
          this._selectedIndex = nextIdx;
        }
        break;
      }
      case 'ArrowUp': {
        e.preventDefault();
        const prevIdx = this._selectedIndex - 1;
        if (prevIdx >= 0) {
          this._selectedIndex = prevIdx;
        }
        break;
      }
      case 'Enter': {
        e.preventDefault();
        const item = actionable[this._selectedIndex];
        if (item) this._selectItem(item);
        break;
      }
    }
  }

  private _selectItem(item: ContextMenuItem) {
    if (item.disabled) return;
    this.hide();
    this.dispatchEvent(
      new CustomEvent('bh-select', {
        bubbles: true,
        composed: true,
        detail: { id: item.id, label: item.label },
      })
    );
  }

  private _isSelected(item: ContextMenuItem): boolean {
    const actionable = this._actionableItems;
    return actionable[this._selectedIndex] === item;
  }

  protected override render() {
    if (!this.open) return nothing;

    // Build a stable id for the active item so aria-activedescendant can reference it.
    const actionable = this._actionableItems;
    const activeItem = actionable[this._selectedIndex];
    const activeId = activeItem ? `ctx-item-${this.items.indexOf(activeItem)}` : undefined;

    return html`
      <div class="backdrop" @click=${this._onBackdropClick}></div>
      <div
        class="menu"
        role="menu"
        tabindex="-1"
        aria-activedescendant=${activeId ?? nothing}
        style="left: ${this.x}px; top: ${this.y}px"
        @keydown=${this._onKeydown}
      >
        ${repeat(
          this.items,
          (item) => item.id,
          (item, i) =>
            item.separator
              ? html`<div class="separator" role="separator"></div>`
              : html`
                  <div
                    id="ctx-item-${i}"
                    class=${classMap({
                      item: true,
                      disabled: !!item.disabled,
                    })}
                    role="menuitem"
                    aria-disabled=${item.disabled ? 'true' : 'false'}
                    aria-selected=${String(this._isSelected(item))}
                    @click=${() => this._selectItem(item)}
                  >
                    ${item.icon ? html`<bh-icon name=${item.icon} size="sm" aria-hidden="true"></bh-icon>` : nothing}
                    ${item.label}
                  </div>
                `
        )}
      </div>
    `;
  }

  protected override updated() {
    if (this.open) {
      const menu = this.shadowRoot?.querySelector('.menu') as HTMLElement;
      menu?.focus();
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bh-context-menu': BhContextMenu;
  }
}
