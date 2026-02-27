import { html } from 'lit';
import { fixture, expect, oneEvent } from '@open-wc/testing';
import type { BhDataTable, DataTableColumn } from './bh-data-table.js';
import './bh-data-table.js';
import '../../atoms/icon/bh-icon.js';

const sampleColumns: DataTableColumn[] = [
  { key: 'name', label: 'Name', sortable: true },
  { key: 'email', label: 'Email', sortable: true },
  { key: 'role', label: 'Role' },
];

const sampleRows = [
  { name: 'Carol', email: 'carol@example.com', role: 'Editor' },
  { name: 'Alice', email: 'alice@example.com', role: 'Admin' },
  { name: 'Bob', email: 'bob@example.com', role: 'User' },
];

describe('bh-data-table', () => {
  it('renders with default props', async () => {
    const el = await fixture<BhDataTable>(html`<bh-data-table></bh-data-table>`);
    expect(el.variant).to.equal('default');
    expect(el.density).to.equal('default');
    expect(el.stickyHeader).to.equal(false);
  });

  it('renders column headers', async () => {
    const el = await fixture<BhDataTable>(html`
      <bh-data-table .columns=${sampleColumns} .rows=${sampleRows}></bh-data-table>
    `);
    const headers = el.shadowRoot!.querySelectorAll('th');
    expect(headers.length).to.equal(3);
  });

  it('renders rows from data', async () => {
    const el = await fixture<BhDataTable>(html`
      <bh-data-table .columns=${sampleColumns} .rows=${sampleRows}></bh-data-table>
    `);
    const rows = el.shadowRoot!.querySelectorAll('tbody tr');
    expect(rows.length).to.equal(3);
  });

  it('renders sort button for sortable columns', async () => {
    const el = await fixture<BhDataTable>(html`
      <bh-data-table .columns=${sampleColumns} .rows=${sampleRows}></bh-data-table>
    `);
    const sortButtons = el.shadowRoot!.querySelectorAll('.sort-button');
    expect(sortButtons.length).to.equal(2); // name and email are sortable
  });

  it('does not render sort button for non-sortable columns', async () => {
    const el = await fixture<BhDataTable>(html`
      <bh-data-table .columns=${sampleColumns} .rows=${sampleRows}></bh-data-table>
    `);
    // Role column (3rd header) should not have a sort button
    const thirdHeader = el.shadowRoot!.querySelectorAll('th')[2];
    const sortButton = thirdHeader.querySelector('.sort-button');
    expect(sortButton).to.not.exist;
  });

  it('fires bh-sort event when sortable header clicked', async () => {
    const el = await fixture<BhDataTable>(html`
      <bh-data-table .columns=${sampleColumns} .rows=${sampleRows}></bh-data-table>
    `);
    const sortButton = el.shadowRoot!.querySelector('.sort-button') as HTMLElement;

    setTimeout(() => sortButton.click());
    const event = await oneEvent(el, 'bh-sort');
    expect(event.detail.column).to.equal('name');
    expect(event.detail.direction).to.equal('asc');
  });

  it('sorts rows ascending on first click', async () => {
    const el = await fixture<BhDataTable>(html`
      <bh-data-table .columns=${sampleColumns} .rows=${sampleRows}></bh-data-table>
    `);
    const sortButton = el.shadowRoot!.querySelector('.sort-button') as HTMLElement;
    sortButton.click();
    await el.updateComplete;

    const firstCell = el.shadowRoot!.querySelector('tbody tr td')!;
    expect(firstCell.textContent!.trim()).to.equal('Alice');
  });

  it('sorts rows descending on second click', async () => {
    const el = await fixture<BhDataTable>(html`
      <bh-data-table .columns=${sampleColumns} .rows=${sampleRows}></bh-data-table>
    `);
    const sortButton = el.shadowRoot!.querySelector('.sort-button') as HTMLElement;
    sortButton.click();
    await el.updateComplete;
    sortButton.click();
    await el.updateComplete;

    const firstCell = el.shadowRoot!.querySelector('tbody tr td')!;
    expect(firstCell.textContent!.trim()).to.equal('Carol');
  });

  it('resets sort on third click', async () => {
    const el = await fixture<BhDataTable>(html`
      <bh-data-table .columns=${sampleColumns} .rows=${sampleRows}></bh-data-table>
    `);
    const sortButton = el.shadowRoot!.querySelector('.sort-button') as HTMLElement;
    sortButton.click();
    await el.updateComplete;
    sortButton.click();
    await el.updateComplete;
    sortButton.click();
    await el.updateComplete;

    // Back to original order
    const firstCell = el.shadowRoot!.querySelector('tbody tr td')!;
    expect(firstCell.textContent!.trim()).to.equal('Carol');
  });

  it('sets aria-sort on sorted column', async () => {
    const el = await fixture<BhDataTable>(html`
      <bh-data-table .columns=${sampleColumns} .rows=${sampleRows}></bh-data-table>
    `);
    const sortButton = el.shadowRoot!.querySelector('.sort-button') as HTMLElement;
    sortButton.click();
    await el.updateComplete;

    const firstHeader = el.shadowRoot!.querySelector('th')!;
    expect(firstHeader.getAttribute('aria-sort')).to.equal('ascending');
  });

  it('sets aria-sort to descending', async () => {
    const el = await fixture<BhDataTable>(html`
      <bh-data-table .columns=${sampleColumns} .rows=${sampleRows}></bh-data-table>
    `);
    const sortButton = el.shadowRoot!.querySelector('.sort-button') as HTMLElement;
    sortButton.click();
    await el.updateComplete;
    sortButton.click();
    await el.updateComplete;

    const firstHeader = el.shadowRoot!.querySelector('th')!;
    expect(firstHeader.getAttribute('aria-sort')).to.equal('descending');
  });

  it('removes aria-sort when sort reset', async () => {
    const el = await fixture<BhDataTable>(html`
      <bh-data-table .columns=${sampleColumns} .rows=${sampleRows}></bh-data-table>
    `);
    const sortButton = el.shadowRoot!.querySelector('.sort-button') as HTMLElement;
    sortButton.click();
    await el.updateComplete;
    sortButton.click();
    await el.updateComplete;
    sortButton.click();
    await el.updateComplete;

    const firstHeader = el.shadowRoot!.querySelector('th')!;
    expect(firstHeader.hasAttribute('aria-sort')).to.equal(false);
  });

  it('sorts numeric values correctly', async () => {
    const cols: DataTableColumn[] = [
      { key: 'name', label: 'Name' },
      { key: 'count', label: 'Count', sortable: true },
    ];
    const data = [
      { name: 'A', count: 10 },
      { name: 'B', count: 2 },
      { name: 'C', count: 100 },
    ];
    const el = await fixture<BhDataTable>(html`
      <bh-data-table .columns=${cols} .rows=${data}></bh-data-table>
    `);
    const sortButton = el.shadowRoot!.querySelector('.sort-button') as HTMLElement;
    sortButton.click();
    await el.updateComplete;

    const cells = el.shadowRoot!.querySelectorAll('tbody tr td:nth-child(2)');
    expect(cells[0].textContent!.trim()).to.equal('2');
    expect(cells[1].textContent!.trim()).to.equal('10');
    expect(cells[2].textContent!.trim()).to.equal('100');
  });

  it('handles null values in sort', async () => {
    const cols: DataTableColumn[] = [
      { key: 'name', label: 'Name', sortable: true },
    ];
    const data = [
      { name: 'Bob' },
      { name: null },
      { name: 'Alice' },
    ];
    const el = await fixture<BhDataTable>(html`
      <bh-data-table .columns=${cols} .rows=${data}></bh-data-table>
    `);
    const sortButton = el.shadowRoot!.querySelector('.sort-button') as HTMLElement;
    sortButton.click();
    await el.updateComplete;

    const cells = el.shadowRoot!.querySelectorAll('tbody tr td');
    expect(cells[0].textContent!.trim()).to.equal('Alice');
    expect(cells[1].textContent!.trim()).to.equal('Bob');
    // null sorts last
    expect(cells[2].textContent!.trim()).to.equal('');
  });

  it('resets sort when clicking a different column', async () => {
    const el = await fixture<BhDataTable>(html`
      <bh-data-table .columns=${sampleColumns} .rows=${sampleRows}></bh-data-table>
    `);
    const sortButtons = el.shadowRoot!.querySelectorAll('.sort-button');
    const nameSort = sortButtons[0] as HTMLElement;
    const emailSort = sortButtons[1] as HTMLElement;

    // Sort by name ascending
    nameSort.click();
    await el.updateComplete;

    // Click email — should start fresh at asc
    setTimeout(() => emailSort.click());
    const event = await oneEvent(el, 'bh-sort');
    expect(event.detail.column).to.equal('email');
    expect(event.detail.direction).to.equal('asc');
  });

  it('reflects variant attribute', async () => {
    const el = await fixture<BhDataTable>(html`
      <bh-data-table variant="striped"></bh-data-table>
    `);
    expect(el.getAttribute('variant')).to.equal('striped');
  });

  it('reflects density attribute', async () => {
    const el = await fixture<BhDataTable>(html`
      <bh-data-table density="compact"></bh-data-table>
    `);
    expect(el.getAttribute('density')).to.equal('compact');
  });

  it('exposes table CSS part', async () => {
    const el = await fixture<BhDataTable>(html`<bh-data-table></bh-data-table>`);
    expect(el.shadowRoot!.querySelector('[part="table"]')).to.exist;
  });

  it('exposes sort-button CSS part', async () => {
    const el = await fixture<BhDataTable>(html`
      <bh-data-table .columns=${sampleColumns} .rows=${sampleRows}></bh-data-table>
    `);
    expect(el.shadowRoot!.querySelector('[part="sort-button"]')).to.exist;
  });
});
