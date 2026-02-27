import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { BaseElement } from '../../primitives/base-element.js';

export type TableVariant = 'default' | 'striped' | 'bordered';
export type TableDensity = 'compact' | 'default' | 'comfortable';

export interface TableColumn {
  key: string;
  label: string;
  width?: string;
  align?: 'start' | 'center' | 'end';
}

/**
 * A data-driven table that renders columns and rows from properties.
 *
 * @csspart table - The `<table>` element
 * @csspart thead - The `<thead>` element
 * @csspart tbody - The `<tbody>` element
 * @csspart th - A header cell
 * @csspart td - A body cell
 * @csspart row - A body `<tr>` row
 *
 * @cssprop [--bh-table-bg=var(--bh-color-surface-raised)] - Table background
 * @cssprop [--bh-table-border=var(--bh-color-border)] - Table border color
 * @cssprop [--bh-table-header-bg=var(--bh-color-surface)] - Header background
 * @cssprop [--bh-table-stripe-bg=var(--bh-color-surface)] - Striped row background
 * @cssprop [--bh-table-hover-bg=var(--bh-color-secondary)] - Row hover background
 * @cssprop [--bh-table-radius=var(--bh-radius-lg)] - Table border radius
 */
@customElement('bh-table')
export class BhTable extends BaseElement {
  static styles = [
    ...([BaseElement.styles].flat()),
    css`
      :host {
        display: block;
      }

      .wrapper {
        overflow-x: auto;
        border-radius: var(--bh-table-radius, var(--bh-radius-lg));
        border: var(--bh-border-1) solid var(--bh-table-border, var(--bh-color-border));
      }

      table {
        width: 100%;
        border-collapse: collapse;
        background: var(--bh-table-bg, var(--bh-color-surface-raised));
        font-family: var(--bh-font-sans);
        font-size: var(--bh-text-sm);
        line-height: var(--bh-leading-normal);
      }

      /* Header */
      thead {
        background: var(--bh-table-header-bg, var(--bh-color-surface));
      }

      th {
        font-weight: var(--bh-font-semibold);
        color: var(--bh-color-text-muted);
        text-align: left;
        white-space: nowrap;
        border-bottom: var(--bh-border-1) solid var(--bh-table-border, var(--bh-color-border));
      }

      /* Body */
      td {
        color: var(--bh-color-text);
        border-bottom: var(--bh-border-1) solid var(--bh-table-border, var(--bh-color-border));
      }

      tbody tr:last-child td {
        border-bottom: none;
      }

      /* Hover */
      tbody tr:hover {
        background: var(--bh-table-hover-bg, var(--bh-color-secondary));
      }

      /* Density — default */
      th,
      td,
      :host([density='default']) th,
      :host([density='default']) td {
        padding: var(--bh-spacing-3) var(--bh-spacing-4);
      }

      /* Density — compact */
      :host([density='compact']) th,
      :host([density='compact']) td {
        padding: var(--bh-spacing-1-5) var(--bh-spacing-3);
        font-size: var(--bh-text-xs);
      }

      /* Density — comfortable */
      :host([density='comfortable']) th,
      :host([density='comfortable']) td {
        padding: var(--bh-spacing-4) var(--bh-spacing-6);
      }

      /* Striped */
      :host([variant='striped']) tbody tr:nth-child(even) {
        background: var(--bh-table-stripe-bg, var(--bh-color-surface));
      }

      /* Bordered */
      :host([variant='bordered']) th,
      :host([variant='bordered']) td {
        border: var(--bh-border-1) solid var(--bh-table-border, var(--bh-color-border));
      }

      /* Alignment */
      .align-center {
        text-align: center;
      }

      .align-end {
        text-align: right;
      }

      /* Sticky header */
      :host([sticky-header]) thead th {
        position: sticky;
        top: 0;
        z-index: 1;
        background: var(--bh-table-header-bg, var(--bh-color-surface));
      }
    `,
  ];

  @property({ reflect: true }) variant: TableVariant = 'default';
  @property({ reflect: true }) density: TableDensity = 'default';
  @property({ type: Boolean, reflect: true, attribute: 'sticky-header' }) stickyHeader = false;
  @property({ type: Array }) columns: TableColumn[] = [];
  @property({ type: Array }) rows: Record<string, unknown>[] = [];

  protected _renderHeaderCell(col: TableColumn) {
    return html`
      <th
        part="th"
        class=${col.align ? `align-${col.align}` : ''}
        style=${col.width ? `width: ${col.width}` : ''}
      >
        ${col.label}
      </th>
    `;
  }

  protected get _displayRows(): Record<string, unknown>[] {
    return this.rows;
  }

  render() {
    return html`
      <div class="wrapper">
        <table part="table">
          <thead part="thead">
            <tr>
              ${this.columns.map((col) => this._renderHeaderCell(col))}
            </tr>
          </thead>
          <tbody part="tbody">
            ${this._displayRows.map(
              (row) => html`
                <tr part="row">
                  ${this.columns.map(
                    (col) => html`
                      <td
                        part="td"
                        class=${col.align ? `align-${col.align}` : ''}
                      >
                        ${String(row[col.key] ?? '')}
                      </td>
                    `
                  )}
                </tr>
              `
            )}
          </tbody>
        </table>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bh-table': BhTable;
  }
}
