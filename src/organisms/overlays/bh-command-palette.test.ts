import { html } from 'lit';
import { fixture, expect, oneEvent } from '@open-wc/testing';
import type { BhCommandPalette, CommandPaletteItem } from './bh-command-palette.js';
import './bh-command-palette.js';

const sampleItems: CommandPaletteItem[] = [
  { id: 'file.open', label: 'Open File', category: 'File', keybinding: 'Cmd+O' },
  { id: 'file.save', label: 'Save', category: 'File', keybinding: 'Cmd+S' },
  { id: 'edit.copy', label: 'Copy', category: 'Edit', keybinding: 'Cmd+C' },
  { id: 'view.zoom', label: 'Zoom In', category: 'View' },
];

describe('bh-command-palette', () => {
  it('renders with default props', async () => {
    const el = await fixture<BhCommandPalette>(
      html`<bh-command-palette></bh-command-palette>`
    );
    expect(el.open).to.equal(false);
    expect(el.placeholder).to.equal('Type a command...');
    expect(el.items).to.deep.equal([]);
  });

  it('is hidden when not open', async () => {
    const el = await fixture<BhCommandPalette>(
      html`<bh-command-palette></bh-command-palette>`
    );
    expect(el.shadowRoot!.querySelector('.palette')).to.not.exist;
  });

  it('shows palette when open', async () => {
    const el = await fixture<BhCommandPalette>(
      html`<bh-command-palette .items=${sampleItems} open></bh-command-palette>`
    );
    expect(el.shadowRoot!.querySelector('.palette')).to.exist;
    expect(el.shadowRoot!.querySelector('input')).to.exist;
  });

  it('reflects open attribute', async () => {
    const el = await fixture<BhCommandPalette>(
      html`<bh-command-palette open></bh-command-palette>`
    );
    expect(el.hasAttribute('open')).to.be.true;
  });

  it('renders all items when no query', async () => {
    const el = await fixture<BhCommandPalette>(
      html`<bh-command-palette .items=${sampleItems} open></bh-command-palette>`
    );
    const items = el.shadowRoot!.querySelectorAll('.item');
    expect(items.length).to.equal(4);
  });

  it('renders category prefix', async () => {
    const el = await fixture<BhCommandPalette>(
      html`<bh-command-palette .items=${sampleItems} open></bh-command-palette>`
    );
    const category = el.shadowRoot!.querySelector('.item-category');
    expect(category).to.exist;
    expect(category!.textContent).to.contain('File');
  });

  it('renders keybinding', async () => {
    const el = await fixture<BhCommandPalette>(
      html`<bh-command-palette .items=${sampleItems} open></bh-command-palette>`
    );
    const keybinding = el.shadowRoot!.querySelector('.item-keybinding');
    expect(keybinding).to.exist;
    expect(keybinding!.textContent).to.contain('Cmd+O');
  });

  it('fires bh-execute on item click', async () => {
    const el = await fixture<BhCommandPalette>(
      html`<bh-command-palette .items=${sampleItems} open></bh-command-palette>`
    );
    const item = el.shadowRoot!.querySelector('.item') as HTMLElement;

    setTimeout(() => item.click());
    const event = await oneEvent(el, 'bh-execute');
    expect(event.detail.id).to.equal('file.open');
    expect(event.detail.label).to.equal('Open File');
  });

  it('fires bh-open when show() is called', async () => {
    const el = await fixture<BhCommandPalette>(
      html`<bh-command-palette .items=${sampleItems}></bh-command-palette>`
    );

    setTimeout(() => el.show());
    const event = await oneEvent(el, 'bh-open');
    expect(event).to.exist;
    expect(el.open).to.be.true;
  });

  it('fires bh-close when close() is called', async () => {
    const el = await fixture<BhCommandPalette>(
      html`<bh-command-palette .items=${sampleItems} open></bh-command-palette>`
    );

    setTimeout(() => el.close());
    const event = await oneEvent(el, 'bh-close');
    expect(event).to.exist;
    expect(el.open).to.be.false;
  });

  it('closes on backdrop click', async () => {
    const el = await fixture<BhCommandPalette>(
      html`<bh-command-palette .items=${sampleItems} open></bh-command-palette>`
    );

    const backdrop = el.shadowRoot!.querySelector('.backdrop') as HTMLElement;
    setTimeout(() => backdrop.click());
    await oneEvent(el, 'bh-close');
    expect(el.open).to.be.false;
  });

  it('closes on Escape key', async () => {
    const el = await fixture<BhCommandPalette>(
      html`<bh-command-palette .items=${sampleItems} open></bh-command-palette>`
    );
    await el.updateComplete;

    const input = el.shadowRoot!.querySelector('input')!;
    setTimeout(() =>
      input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))
    );
    await oneEvent(el, 'bh-close');
    expect(el.open).to.be.false;
  });

  it('selects next item on ArrowDown', async () => {
    const el = await fixture<BhCommandPalette>(
      html`<bh-command-palette .items=${sampleItems} open></bh-command-palette>`
    );
    await el.updateComplete;

    const input = el.shadowRoot!.querySelector('input')!;
    input.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true })
    );
    await el.updateComplete;

    const selected = el.shadowRoot!.querySelectorAll('.item');
    expect(selected[1].getAttribute('aria-selected')).to.equal('true');
  });

  it('toggle() opens when closed', async () => {
    const el = await fixture<BhCommandPalette>(
      html`<bh-command-palette .items=${sampleItems}></bh-command-palette>`
    );

    el.toggle();
    expect(el.open).to.be.true;
  });

  it('toggle() closes when open', async () => {
    const el = await fixture<BhCommandPalette>(
      html`<bh-command-palette .items=${sampleItems} open></bh-command-palette>`
    );

    el.toggle();
    expect(el.open).to.be.false;
  });

  it('shows empty state when no matches', async () => {
    const el = await fixture<BhCommandPalette>(
      html`<bh-command-palette .items=${sampleItems} open></bh-command-palette>`
    );
    await el.updateComplete;

    const input = el.shadowRoot!.querySelector('input')!;
    input.value = 'xyznotfound';
    input.dispatchEvent(new Event('input', { bubbles: true }));
    await el.updateComplete;

    const empty = el.shadowRoot!.querySelector('.empty');
    expect(empty).to.exist;
    expect(empty!.textContent).to.contain('No matching commands');
  });

  it('uses custom placeholder', async () => {
    const el = await fixture<BhCommandPalette>(
      html`<bh-command-palette placeholder="Search..." open></bh-command-palette>`
    );
    const input = el.shadowRoot!.querySelector('input')!;
    expect(input.placeholder).to.equal('Search...');
  });
});
