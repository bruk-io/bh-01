import { html } from 'lit';
import { fixture, expect } from '@open-wc/testing';
import type { BhTable } from './bh-table.js';
import './bh-table.js';

const sampleColumns = [
  { key: 'name', label: 'Name' },
  { key: 'email', label: 'Email' },
  { key: 'role', label: 'Role' },
];

const sampleRows = [
  { name: 'Alice', email: 'alice@example.com', role: 'Admin' },
  { name: 'Bob', email: 'bob@example.com', role: 'User' },
  { name: 'Carol', email: 'carol@example.com', role: 'Editor' },
];

describe('bh-table', () => {
  it('renders with default props', async () => {
    const el = await fixture<BhTable>(html`<bh-table></bh-table>`);
    expect(el.variant).to.equal('default');
    expect(el.density).to.equal('default');
    expect(el.stickyHeader).to.equal(false);
  });

  it('renders column headers', async () => {
    const el = await fixture<BhTable>(html`
      <bh-table .columns=${sampleColumns} .rows=${sampleRows}></bh-table>
    `);
    const headers = el.shadowRoot!.querySelectorAll('th');
    expect(headers.length).to.equal(3);
    expect(headers[0].textContent!.trim()).to.equal('Name');
    expect(headers[1].textContent!.trim()).to.equal('Email');
    expect(headers[2].textContent!.trim()).to.equal('Role');
  });

  it('renders rows from data', async () => {
    const el = await fixture<BhTable>(html`
      <bh-table .columns=${sampleColumns} .rows=${sampleRows}></bh-table>
    `);
    const rows = el.shadowRoot!.querySelectorAll('tbody tr');
    expect(rows.length).to.equal(3);
  });

  it('renders cell content correctly', async () => {
    const el = await fixture<BhTable>(html`
      <bh-table .columns=${sampleColumns} .rows=${sampleRows}></bh-table>
    `);
    const firstRow = el.shadowRoot!.querySelector('tbody tr')!;
    const cells = firstRow.querySelectorAll('td');
    expect(cells[0].textContent!.trim()).to.equal('Alice');
    expect(cells[1].textContent!.trim()).to.equal('alice@example.com');
    expect(cells[2].textContent!.trim()).to.equal('Admin');
  });

  it('handles missing cell values gracefully', async () => {
    const el = await fixture<BhTable>(html`
      <bh-table
        .columns=${sampleColumns}
        .rows=${[{ name: 'Alice' }]}
      ></bh-table>
    `);
    const cells = el.shadowRoot!.querySelectorAll('tbody td');
    expect(cells[0].textContent!.trim()).to.equal('Alice');
    expect(cells[1].textContent!.trim()).to.equal('');
    expect(cells[2].textContent!.trim()).to.equal('');
  });

  it('reflects variant attribute', async () => {
    const el = await fixture<BhTable>(html`
      <bh-table variant="striped"></bh-table>
    `);
    expect(el.getAttribute('variant')).to.equal('striped');
  });

  it('reflects density attribute', async () => {
    const el = await fixture<BhTable>(html`
      <bh-table density="compact"></bh-table>
    `);
    expect(el.getAttribute('density')).to.equal('compact');
  });

  it('reflects sticky-header attribute', async () => {
    const el = await fixture<BhTable>(html`
      <bh-table sticky-header></bh-table>
    `);
    expect(el.stickyHeader).to.equal(true);
    expect(el.hasAttribute('sticky-header')).to.equal(true);
  });

  it('applies column width', async () => {
    const cols = [
      { key: 'name', label: 'Name', width: '200px' },
      { key: 'role', label: 'Role' },
    ];
    const el = await fixture<BhTable>(html`
      <bh-table .columns=${cols} .rows=${[{ name: 'Alice', role: 'Admin' }]}></bh-table>
    `);
    const th = el.shadowRoot!.querySelector('th')!;
    expect(th.style.width).to.equal('200px');
  });

  it('applies column alignment class', async () => {
    const cols = [
      { key: 'name', label: 'Name' },
      { key: 'count', label: 'Count', align: 'end' as const },
    ];
    const el = await fixture<BhTable>(html`
      <bh-table .columns=${cols} .rows=${[{ name: 'Alice', count: 5 }]}></bh-table>
    `);
    const headers = el.shadowRoot!.querySelectorAll('th');
    expect(headers[1].classList.contains('align-end')).to.equal(true);
    const cells = el.shadowRoot!.querySelectorAll('td');
    expect(cells[1].classList.contains('align-end')).to.equal(true);
  });

  it('exposes table CSS part', async () => {
    const el = await fixture<BhTable>(html`<bh-table></bh-table>`);
    expect(el.shadowRoot!.querySelector('[part="table"]')).to.exist;
  });

  it('exposes thead CSS part', async () => {
    const el = await fixture<BhTable>(html`<bh-table></bh-table>`);
    expect(el.shadowRoot!.querySelector('[part="thead"]')).to.exist;
  });

  it('exposes tbody CSS part', async () => {
    const el = await fixture<BhTable>(html`<bh-table></bh-table>`);
    expect(el.shadowRoot!.querySelector('[part="tbody"]')).to.exist;
  });

  it('exposes th CSS parts', async () => {
    const el = await fixture<BhTable>(html`
      <bh-table .columns=${sampleColumns} .rows=${sampleRows}></bh-table>
    `);
    const ths = el.shadowRoot!.querySelectorAll('[part="th"]');
    expect(ths.length).to.equal(3);
  });

  it('exposes row and td CSS parts', async () => {
    const el = await fixture<BhTable>(html`
      <bh-table .columns=${sampleColumns} .rows=${sampleRows}></bh-table>
    `);
    const rows = el.shadowRoot!.querySelectorAll('[part="row"]');
    expect(rows.length).to.equal(3);
    const tds = el.shadowRoot!.querySelectorAll('[part="td"]');
    expect(tds.length).to.equal(9);
  });

  it('renders empty table when no rows', async () => {
    const el = await fixture<BhTable>(html`
      <bh-table .columns=${sampleColumns}></bh-table>
    `);
    const headers = el.shadowRoot!.querySelectorAll('th');
    const rows = el.shadowRoot!.querySelectorAll('tbody tr');
    expect(headers.length).to.equal(3);
    expect(rows.length).to.equal(0);
  });
});
