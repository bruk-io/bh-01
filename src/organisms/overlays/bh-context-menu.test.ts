import { html } from 'lit';
import { fixture, expect, oneEvent } from '@open-wc/testing';
import type { BhContextMenu, ContextMenuItem } from './bh-context-menu.js';
import './bh-context-menu.js';

const sampleItems: ContextMenuItem[] = [
  { id: 'cut', label: 'Cut' },
  { id: 'copy', label: 'Copy' },
  { id: 'sep1', label: '', separator: true },
  { id: 'delete', label: 'Delete', disabled: true },
];

describe('bh-context-menu', () => {
  it('renders with default props', async () => {
    const el = await fixture<BhContextMenu>(
      html`<bh-context-menu></bh-context-menu>`
    );
    expect(el.open).to.equal(false);
    expect(el.x).to.equal(0);
    expect(el.y).to.equal(0);
    expect(el.items).to.deep.equal([]);
  });

  it('is hidden when not open', async () => {
    const el = await fixture<BhContextMenu>(
      html`<bh-context-menu></bh-context-menu>`
    );
    expect(el.shadowRoot!.querySelector('.menu')).to.not.exist;
  });

  it('shows menu when open', async () => {
    const el = await fixture<BhContextMenu>(
      html`<bh-context-menu .items=${sampleItems} open></bh-context-menu>`
    );
    expect(el.shadowRoot!.querySelector('.menu')).to.exist;
  });

  it('reflects open attribute', async () => {
    const el = await fixture<BhContextMenu>(
      html`<bh-context-menu open></bh-context-menu>`
    );
    expect(el.hasAttribute('open')).to.be.true;
  });

  it('renders menu items', async () => {
    const el = await fixture<BhContextMenu>(
      html`<bh-context-menu .items=${sampleItems} open></bh-context-menu>`
    );
    const items = el.shadowRoot!.querySelectorAll('.item');
    expect(items.length).to.equal(3); // 3 non-separator items
  });

  it('renders separator', async () => {
    const el = await fixture<BhContextMenu>(
      html`<bh-context-menu .items=${sampleItems} open></bh-context-menu>`
    );
    const separator = el.shadowRoot!.querySelector('.separator');
    expect(separator).to.exist;
  });

  it('renders disabled items', async () => {
    const el = await fixture<BhContextMenu>(
      html`<bh-context-menu .items=${sampleItems} open></bh-context-menu>`
    );
    const disabled = el.shadowRoot!.querySelector('.item.disabled');
    expect(disabled).to.exist;
    expect(disabled!.textContent).to.contain('Delete');
  });

  it('fires bh-select on item click', async () => {
    const el = await fixture<BhContextMenu>(
      html`<bh-context-menu .items=${sampleItems} open></bh-context-menu>`
    );
    const item = el.shadowRoot!.querySelector('.item') as HTMLElement;

    setTimeout(() => item.click());
    const event = await oneEvent(el, 'bh-select');
    expect(event.detail.id).to.equal('cut');
    expect(event.detail.label).to.equal('Cut');
  });

  it('hides on backdrop click', async () => {
    const el = await fixture<BhContextMenu>(
      html`<bh-context-menu .items=${sampleItems} open></bh-context-menu>`
    );

    const backdrop = el.shadowRoot!.querySelector('.backdrop') as HTMLElement;
    backdrop.click();
    expect(el.open).to.be.false;
  });

  it('positions menu at x/y', async () => {
    const el = await fixture<BhContextMenu>(
      html`<bh-context-menu .items=${sampleItems} .x=${100} .y=${200} open></bh-context-menu>`
    );
    const menu = el.shadowRoot!.querySelector('.menu') as HTMLElement;
    expect(menu.style.left).to.equal('100px');
    expect(menu.style.top).to.equal('200px');
  });

  it('show() opens the menu at coordinates', async () => {
    const el = await fixture<BhContextMenu>(
      html`<bh-context-menu></bh-context-menu>`
    );
    el.show(150, 250, sampleItems);
    expect(el.open).to.be.true;
    expect(el.x).to.equal(150);
    expect(el.y).to.equal(250);
  });

  it('hide() closes the menu', async () => {
    const el = await fixture<BhContextMenu>(
      html`<bh-context-menu .items=${sampleItems} open></bh-context-menu>`
    );
    el.hide();
    expect(el.open).to.be.false;
  });

  it('does not fire bh-select for disabled items', async () => {
    const el = await fixture<BhContextMenu>(
      html`<bh-context-menu .items=${sampleItems} open></bh-context-menu>`
    );
    let fired = false;
    el.addEventListener('bh-select', () => {
      fired = true;
    });

    const disabledItem = el.shadowRoot!.querySelector('.item.disabled') as HTMLElement;
    disabledItem.click();
    expect(fired).to.be.false;
  });
});
