import { html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { BaseElement } from '../../primitives/base-element.js';
import '../../atoms/icon/bh-icon.js';

/**
 * An individual tree node that supports nesting, expand/collapse, and selection.
 *
 * @slot icon - Icon slot (before label)
 * @slot end - Trailing content slot (badges, actions)
 * @slot children - Nested tree items
 *
 * @csspart row - The clickable row element
 * @csspart chevron - The expand/collapse chevron
 * @csspart label - The label text
 *
 * @cssprop [--bh-tree-item-hover-bg=var(--bh-color-secondary)] - Hover background
 * @cssprop [--bh-tree-item-selected-bg=var(--bh-color-surface-raised)] - Selected background
 * @cssprop [--bh-tree-item-selected-color=var(--bh-color-primary)] - Selected text color
 *
 * @fires bh-tree-item-click - Fired on click. `detail: { value: string, label: string }`
 */
@customElement('bh-tree-item')
export class BhTreeItem extends BaseElement {
  static styles = [
    ...([BaseElement.styles].flat()),
    css`
      :host {
        display: block;
      }

      .row {
        display: flex;
        align-items: center;
        gap: var(--bh-spacing-2);
        width: 100%;
        padding: var(--bh-spacing-1) var(--bh-spacing-2);
        padding-left: calc(var(--bh-spacing-4) + var(--indent-level) * var(--bh-spacing-4));
        border: none;
        border-left: var(--bh-border-2) solid transparent;
        border-radius: 0;
        background: none;
        color: var(--bh-color-text);
        font-family: var(--bh-font-sans);
        font-size: var(--bh-text-sm);
        line-height: var(--bh-leading-normal);
        text-align: left;
        cursor: pointer;
        transition: background var(--bh-transition-fast),
                    color var(--bh-transition-fast);
      }

      .row:hover {
        background: var(--bh-tree-item-hover-bg, var(--bh-color-secondary));
      }

      .row:focus-visible {
        outline: var(--bh-border-2) solid var(--bh-color-ring);
        outline-offset: -2px;
      }

      :host([selected]) .row {
        background: var(--bh-tree-item-selected-bg, var(--bh-color-surface-raised));
        color: var(--bh-tree-item-selected-color, var(--bh-color-primary));
        border-left-color: var(--bh-color-primary);
      }

      .chevron {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: var(--bh-spacing-4);
        height: var(--bh-spacing-4);
        flex-shrink: 0;
        transition: transform var(--bh-transition-fast);
      }

      :host([expanded]) .chevron {
        transform: rotate(90deg);
      }

      .chevron-placeholder {
        width: var(--bh-spacing-4);
        height: var(--bh-spacing-4);
        flex-shrink: 0;
      }

      .label {
        flex: 1;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .end {
        margin-left: auto;
        flex-shrink: 0;
      }

      .children {
        display: none;
      }

      :host([expanded]) .children {
        display: block;
      }
    `,
  ];

  @property() value = '';
  @property() label = '';
  @property({ type: Boolean, reflect: true }) selected = false;
  @property({ type: Boolean, reflect: true }) expanded = false;
  @property({ type: Number }) indent = 0;
  /**
   * @internal - managed by bh-tree for roving tabindex.
   * When true this item is the keyboard entry point into the tree.
   */
  @property({ type: Boolean }) roving = false;

  @state() private _hasChildren = false;

  render() {
    return html`
      <div
        class="row"
        part="row"
        role="treeitem"
        aria-level=${this.indent + 1}
        aria-expanded=${this._hasChildren ? String(this.expanded) : nothing}
        aria-selected=${String(this.selected)}
        tabindex=${this.selected || this.roving ? '0' : '-1'}
        style="--indent-level: ${this.indent}"
        @click=${this._handleClick}
        @keydown=${this._handleKeydown}
      >
        ${this._hasChildren
          ? html`<bh-icon class="chevron" part="chevron" name="chevron-right" size="sm" aria-hidden="true"></bh-icon>`
          : html`<span class="chevron-placeholder"></span>`}
        <slot name="icon"></slot>
        <span class="label" part="label">${this.label}</span>
        <span class="end"><slot name="end"></slot></span>
      </div>
      <div class="children" role="group">
        <slot name="children" @slotchange=${this._onChildrenSlotChange}></slot>
      </div>
    `;
  }

  private _onChildrenSlotChange(e: Event) {
    const slot = e.target as HTMLSlotElement;
    this._hasChildren = slot.assignedElements().length > 0;
  }

  private _handleClick() {
    if (this._hasChildren) {
      this.expanded = !this.expanded;
    }
    this.dispatchEvent(
      new CustomEvent('bh-tree-item-click', {
        bubbles: true,
        composed: true,
        detail: { value: this.value, label: this.label },
      })
    );
  }

  private _handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      this._handleClick();
    } else if (e.key === 'ArrowRight' && this._hasChildren && !this.expanded) {
      e.preventDefault();
      this.expanded = true;
    } else if (e.key === 'ArrowLeft' && this.expanded) {
      e.preventDefault();
      this.expanded = false;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bh-tree-item': BhTreeItem;
  }
}
