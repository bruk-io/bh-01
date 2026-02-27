import { html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import { BaseElement } from '../../primitives/base-element.js';

export interface CommandPaletteItem {
  id: string;
  label: string;
  category?: string;
  keybinding?: string;
}

/**
 * A VSCode-style command palette overlay.
 *
 * @cssprop [--bh-command-palette-width=min(500px, 90vw)] - Palette width
 * @cssprop [--bh-command-palette-max-height=300px] - Max height for results list
 * @cssprop [--bh-command-palette-backdrop=var(--bh-color-overlay, rgba(0,0,0,0.4))] - Backdrop color
 *
 * @fires bh-execute - Fired when an item is selected. `detail: { id: string, label: string }`
 * @fires bh-open - Fired when the palette opens
 * @fires bh-close - Fired when the palette closes
 */
@customElement('bh-command-palette')
export class BhCommandPalette extends BaseElement {
  static styles = [
    ...([BaseElement.styles].flat()),
    css`
      :host {
        display: none;
        position: fixed;
        inset: 0;
        z-index: var(--bh-z-modal);
      }

      :host([open]) {
        display: flex;
        align-items: flex-start;
        justify-content: center;
        padding-top: 15vh;
      }

      .backdrop {
        position: fixed;
        inset: 0;
        background: var(--bh-command-palette-backdrop, var(--bh-color-overlay));
      }

      .palette {
        position: relative;
        width: var(--bh-command-palette-width, min(500px, 90vw));
        background: var(--bh-color-surface);
        border: var(--bh-border-1) solid var(--bh-color-border);
        border-radius: var(--bh-radius-lg);
        box-shadow: var(--bh-shadow-xl);
        overflow: hidden;
      }

      input {
        width: 100%;
        padding: var(--bh-spacing-2) var(--bh-spacing-3);
        background: var(--bh-color-surface-recessed);
        border: none;
        border-bottom: var(--bh-border-1) solid var(--bh-color-border);
        color: var(--bh-color-text);
        font-size: var(--bh-text-sm);
        font-family: inherit;
        outline: none;
      }

      input::placeholder {
        color: var(--bh-color-text-muted);
      }

      .results {
        max-height: var(--bh-command-palette-max-height, 300px);
        overflow-y: auto;
      }

      .item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: var(--bh-spacing-2) var(--bh-spacing-3);
        cursor: pointer;
        transition: background var(--bh-transition-fast);
      }

      .item:hover,
      .item[aria-selected='true'] {
        background: var(--bh-color-surface-raised);
      }

      .item-label {
        font-size: var(--bh-text-sm);
        color: var(--bh-color-text);
      }

      .item-category {
        font-size: var(--bh-text-xs);
        color: var(--bh-color-text-muted);
        margin-right: var(--bh-spacing-2);
      }

      .item-keybinding {
        font-family: var(--bh-font-mono);
        font-size: var(--bh-text-xs);
        color: var(--bh-color-text-muted);
        background: var(--bh-color-surface-recessed);
        padding: var(--bh-spacing-0-5) var(--bh-spacing-1-5);
        border-radius: var(--bh-radius-sm);
      }

      .empty {
        padding: var(--bh-spacing-3);
        font-size: var(--bh-text-sm);
        color: var(--bh-color-text-muted);
      }
    `,
  ];

  @property({ type: Boolean, reflect: true }) open = false;
  @property({ type: String }) placeholder = 'Type a command...';
  @property({ type: Array }) items: CommandPaletteItem[] = [];

  @state() private _query = '';
  @state() private _selectedIndex = 0;

  private get _filteredItems(): CommandPaletteItem[] {
    if (!this._query) return this.items;
    return this.items
      .map((item) => ({
        item,
        score: this._fuzzyScore(item.label, this._query),
      }))
      .filter((r) => r.score > 0)
      .sort((a, b) => b.score - a.score)
      .map((r) => r.item);
  }

  private _fuzzyScore(text: string, query: string): number {
    const lower = text.toLowerCase();
    const q = query.toLowerCase();
    let score = 0;
    let j = 0;
    let consecutive = 0;

    for (let i = 0; i < lower.length && j < q.length; i++) {
      if (lower[i] === q[j]) {
        score += 1 + consecutive;
        consecutive++;
        j++;
      } else {
        consecutive = 0;
      }
    }

    return j === q.length ? score : 0;
  }

  toggle(): void {
    if (this.open) {
      this.close();
    } else {
      this.show();
    }
  }

  show(): void {
    this.open = true;
    this._query = '';
    this._selectedIndex = 0;
    this.dispatchEvent(
      new CustomEvent('bh-open', { bubbles: true, composed: true })
    );
    // Query the shadow DOM directly after update to avoid @query caching issues
    // when render() previously returned nothing.
    this.updateComplete.then(() => {
      (this.shadowRoot?.querySelector('input') as HTMLInputElement | null)?.focus();
    });
  }

  close(): void {
    this.open = false;
    this.dispatchEvent(
      new CustomEvent('bh-close', { bubbles: true, composed: true })
    );
  }

  private _onInput(e: InputEvent) {
    this._query = (e.target as HTMLInputElement).value;
    this._selectedIndex = 0;
  }

  private _onKeydown(e: KeyboardEvent) {
    const items = this._filteredItems;
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        this._selectedIndex = Math.min(
          this._selectedIndex + 1,
          items.length - 1
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        this._selectedIndex = Math.max(this._selectedIndex - 1, 0);
        break;
      case 'Enter':
        e.preventDefault();
        this._executeItem(items[this._selectedIndex]);
        break;
      case 'Escape':
        this.close();
        break;
    }
  }

  private _executeItem(item: CommandPaletteItem | undefined) {
    if (!item) return;
    this.close();
    this.dispatchEvent(
      new CustomEvent('bh-execute', {
        bubbles: true,
        composed: true,
        detail: { id: item.id, label: item.label },
      })
    );
  }

  private _onItemClick(item: CommandPaletteItem) {
    this._executeItem(item);
  }

  protected override render() {
    if (!this.open) return nothing;

    const items = this._filteredItems;
    const selectedId = items.length > 0 ? `cp-item-${this._selectedIndex}` : undefined;

    return html`
      <div class="backdrop" @click=${this.close}></div>
      <div class="palette" role="combobox" aria-expanded="true" aria-haspopup="listbox">
        <input
          type="text"
          .placeholder=${this.placeholder}
          .value=${this._query}
          @input=${this._onInput}
          @keydown=${this._onKeydown}
          aria-label=${this.placeholder || 'Search commands'}
          aria-autocomplete="list"
          aria-controls="cp-results"
          aria-activedescendant=${selectedId ?? nothing}
        />
        <div class="results" id="cp-results" role="listbox" aria-live="polite">
          ${items.length === 0
            ? html`<div class="empty">No matching commands</div>`
            : repeat(
                items,
                (item) => item.id,
                (item, i) => html`
                  <div
                    id="cp-item-${i}"
                    class="item"
                    role="option"
                    aria-selected=${String(i === this._selectedIndex)}
                    @click=${() => this._onItemClick(item)}
                  >
                    <span class="item-label">
                      ${item.category
                        ? html`<span class="item-category">${item.category}:</span>`
                        : nothing}
                      ${item.label}
                    </span>
                    ${item.keybinding
                      ? html`<span class="item-keybinding">${item.keybinding}</span>`
                      : nothing}
                  </div>
                `
              )}
        </div>
      </div>
    `;
  }

  protected override updated() {
    // Scroll selected item into view after keyboard navigation
    const selected = this.shadowRoot?.querySelector('.item[aria-selected="true"]');
    selected?.scrollIntoView({ block: 'nearest' });
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bh-command-palette': BhCommandPalette;
  }
}
