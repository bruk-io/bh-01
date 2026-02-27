import { html } from 'lit';
import { fixture, expect, oneEvent } from '@open-wc/testing';
import type { BhTree } from './bh-tree.js';
import type { BhTreeItem } from './bh-tree-item.js';
import './bh-tree.js';
import './bh-tree-item.js';

describe('bh-tree-item', () => {
  it('renders with default props', async () => {
    const el = await fixture<BhTreeItem>(
      html`<bh-tree-item value="file1" label="File 1"></bh-tree-item>`
    );
    expect(el.value).to.equal('file1');
    expect(el.label).to.equal('File 1');
    expect(el.selected).to.be.false;
    expect(el.expanded).to.be.false;
    expect(el.indent).to.equal(0);
  });

  it('reflects selected attribute', async () => {
    const el = await fixture<BhTreeItem>(
      html`<bh-tree-item value="file1" label="File 1" selected></bh-tree-item>`
    );
    expect(el.hasAttribute('selected')).to.be.true;
  });

  it('reflects expanded attribute', async () => {
    const el = await fixture<BhTreeItem>(
      html`<bh-tree-item value="folder1" label="Folder 1" expanded>
        <bh-tree-item slot="children" value="child1" label="Child 1"></bh-tree-item>
      </bh-tree-item>`
    );
    expect(el.hasAttribute('expanded')).to.be.true;
  });

  it('renders label text', async () => {
    const el = await fixture<BhTreeItem>(
      html`<bh-tree-item value="file1" label="My File"></bh-tree-item>`
    );
    const label = el.shadowRoot!.querySelector('.label');
    expect(label!.textContent).to.equal('My File');
  });

  it('emits bh-tree-item-click on click', async () => {
    const el = await fixture<BhTreeItem>(
      html`<bh-tree-item value="file1" label="File 1"></bh-tree-item>`
    );
    const listener = oneEvent(el, 'bh-tree-item-click');
    el.shadowRoot!.querySelector<HTMLElement>('.row')!.click();
    const event = await listener;
    expect(event.detail.value).to.equal('file1');
    expect(event.detail.label).to.equal('File 1');
  });

  it('exposes row CSS part', async () => {
    const el = await fixture<BhTreeItem>(
      html`<bh-tree-item value="file1" label="File 1"></bh-tree-item>`
    );
    const row = el.shadowRoot!.querySelector('[part="row"]');
    expect(row).to.exist;
  });

  it('sets indent level via style', async () => {
    const el = await fixture<BhTreeItem>(
      html`<bh-tree-item value="file1" label="File 1" .indent=${2}></bh-tree-item>`
    );
    const row = el.shadowRoot!.querySelector<HTMLElement>('.row');
    expect(row!.style.getPropertyValue('--indent-level')).to.equal('2');
  });
});

describe('bh-tree', () => {
  it('renders with default props', async () => {
    const el = await fixture<BhTree>(html`<bh-tree></bh-tree>`);
    expect(el.selected).to.equal('');
  });

  it('has tree role', async () => {
    const el = await fixture<BhTree>(html`<bh-tree></bh-tree>`);
    expect(el.getAttribute('role')).to.equal('tree');
  });

  it('emits bh-select when a tree item is clicked', async () => {
    const el = await fixture<BhTree>(html`
      <bh-tree>
        <bh-tree-item value="file1" label="File 1"></bh-tree-item>
        <bh-tree-item value="file2" label="File 2"></bh-tree-item>
      </bh-tree>
    `);
    const listener = oneEvent(el, 'bh-select');
    const item = el.querySelector<BhTreeItem>('bh-tree-item[value="file1"]')!;
    item.shadowRoot!.querySelector<HTMLElement>('.row')!.click();
    const event = await listener;
    expect(event.detail.value).to.equal('file1');
    expect(event.detail.label).to.equal('File 1');
  });

  it('updates selected attribute on tree items', async () => {
    const el = await fixture<BhTree>(html`
      <bh-tree selected="file2">
        <bh-tree-item value="file1" label="File 1"></bh-tree-item>
        <bh-tree-item value="file2" label="File 2"></bh-tree-item>
      </bh-tree>
    `);
    await el.updateComplete;
    const item1 = el.querySelector<BhTreeItem>('bh-tree-item[value="file1"]')!;
    const item2 = el.querySelector<BhTreeItem>('bh-tree-item[value="file2"]')!;
    expect(item1.selected).to.be.false;
    expect(item2.selected).to.be.true;
  });

  it('changes selection when clicking a different item', async () => {
    const el = await fixture<BhTree>(html`
      <bh-tree selected="file1">
        <bh-tree-item value="file1" label="File 1"></bh-tree-item>
        <bh-tree-item value="file2" label="File 2"></bh-tree-item>
      </bh-tree>
    `);
    await el.updateComplete;
    const item2 = el.querySelector<BhTreeItem>('bh-tree-item[value="file2"]')!;
    item2.shadowRoot!.querySelector<HTMLElement>('.row')!.click();
    await el.updateComplete;
    expect(el.selected).to.equal('file2');
  });
});
