import { html, css, nothing } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { BhTable } from '../../molecules/table/bh-table.js';
import type { TableColumn, TableVariant, TableDensity } from '../../molecules/table/bh-table.js';
import { BhIcon } from '../../atoms/icon/bh-icon.js';
import '../../atoms/icon/bh-icon.js';

export type DataTableVariant = TableVariant;
export type DataTableDensity = TableDensity;
export type SortDirection = 'asc' | 'desc' | 'none';

export interface DataTableColumn extends TableColumn {
  sortable?: boolean;
}

BhIcon.register('sort-asc', '<path d="M12 19V5"/><path d="m5 12 7-7 7 7"/>');
BhIcon.register('sort-desc', '<path d="M12 5v14"/><path d="m5 12 7 7 7-7"/>');

/**
 * An interactive data table with sorting support.
 *
 * @csspart table - The `<table>` element
 * @csspart thead - The `<thead>` element
 * @csspart tbody - The `<tbody>` element
 * @csspart th - A header cell
 * @csspart td - A body cell
 * @csspart row - A body `<tr>` row
 * @csspart sort-button - A sortable header button
 *
 * @cssprop [--bh-table-bg=var(--bh-color-surface-raised)] - Table background
 * @cssprop [--bh-table-border=var(--bh-color-border)] - Table border color
 * @cssprop [--bh-table-header-bg=var(--bh-color-surface)] - Header background
 * @cssprop [--bh-table-stripe-bg=var(--bh-color-surface)] - Striped row background
 * @cssprop [--bh-table-hover-bg=var(--bh-color-secondary)] - Row hover background
 * @cssprop [--bh-table-radius=var(--bh-radius-lg)] - Table border radius
 *
 * @fires bh-sort - Fired when a sortable column header is clicked. `detail: { column: string, direction: SortDirection }`
 */
@customElement('bh-data-table')
export class BhDataTable extends BhTable {
  static override styles = [
    ...([BhTable.styles].flat()),
    css`
      /* Sort button */
      .sort-button {
        display: inline-flex;
        align-items: center;
        gap: var(--bh-spacing-1);
        padding: 0;
        border: none;
        background: none;
        color: inherit;
        font: inherit;
        font-weight: inherit;
        cursor: pointer;
        white-space: nowrap;
      }

      .sort-button:hover {
        color: var(--bh-color-text);
      }

      .sort-button:focus-visible {
        outline: 2px solid var(--bh-color-ring);
        outline-offset: 2px;
        border-radius: var(--bh-radius-sm);
      }

      /* Sort icons */
      .sort-icon {
        display: inline-flex;
        flex-shrink: 0;
        opacity: 0.3;
        transition: opacity var(--bh-transition-fast);
      }

      .sort-icon.active {
        opacity: 1;
      }

      .sort-icon bh-icon {
        --bh-icon-size: 1em;
      }
    `,
  ];

  declare columns: DataTableColumn[];

  @state() private _sortColumn = '';
  @state() private _sortDirection: SortDirection = 'none';

  private get _sortedRows(): Record<string, unknown>[] {
    if (this._sortDirection === 'none' || !this._sortColumn) {
      return this.rows;
    }

    const col = this._sortColumn;
    const dir = this._sortDirection === 'asc' ? 1 : -1;

    return [...this.rows].sort((a, b) => {
      const aVal = a[col];
      const bVal = b[col];

      if (aVal == null && bVal == null) return 0;
      if (aVal == null) return 1;
      if (bVal == null) return -1;

      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return (aVal - bVal) * dir;
      }

      return String(aVal).localeCompare(String(bVal)) * dir;
    });
  }

  protected override get _displayRows(): Record<string, unknown>[] {
    return this._sortedRows;
  }

  protected override _renderHeaderCell(col: TableColumn) {
    const dataCol = col as DataTableColumn;
    if (!dataCol.sortable) {
      return super._renderHeaderCell(col);
    }

    const isSorted = this._sortColumn === col.key && this._sortDirection !== 'none';

    return html`
      <th
        part="th"
        class=${col.align ? `align-${col.align}` : ''}
        style=${col.width ? `width: ${col.width}` : ''}
        aria-sort=${isSorted
          ? this._sortDirection === 'asc'
            ? 'ascending'
            : 'descending'
          : nothing}
      >
        <button
          class="sort-button"
          part="sort-button"
          @click=${() => this._onSortClick(col.key)}
        >
          ${col.label}
          <span class="sort-icon ${isSorted ? 'active' : ''}">
            <bh-icon name=${isSorted && this._sortDirection === 'desc' ? 'sort-desc' : 'sort-asc'}></bh-icon>
          </span>
        </button>
      </th>
    `;
  }

  private _onSortClick(columnKey: string) {
    let direction: SortDirection;

    if (this._sortColumn === columnKey) {
      // Cycle: none -> asc -> desc -> none
      if (this._sortDirection === 'none') direction = 'asc';
      else if (this._sortDirection === 'asc') direction = 'desc';
      else direction = 'none';
    } else {
      direction = 'asc';
    }

    this._sortColumn = columnKey;
    this._sortDirection = direction;

    this.dispatchEvent(
      new CustomEvent('bh-sort', {
        bubbles: true,
        composed: true,
        detail: { column: columnKey, direction },
      })
    );
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bh-data-table': BhDataTable;
  }
}
