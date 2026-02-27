import { html } from 'lit';
import { fixture, expect } from '@open-wc/testing';
import type { BhSidebarPanel } from './bh-sidebar-panel.js';
import './bh-sidebar-panel.js';

describe('bh-sidebar-panel', () => {
  it('renders with default props', async () => {
    const el = await fixture<BhSidebarPanel>(html`<bh-sidebar-panel></bh-sidebar-panel>`);
    expect(el.collapsed).to.equal(false);
  });

  it('reflects collapsed attribute', async () => {
    const el = await fixture<BhSidebarPanel>(
      html`<bh-sidebar-panel collapsed></bh-sidebar-panel>`
    );
    expect(el.collapsed).to.equal(true);
    expect(el.hasAttribute('collapsed')).to.be.true;
  });

  it('exposes header CSS part', async () => {
    const el = await fixture<BhSidebarPanel>(html`<bh-sidebar-panel></bh-sidebar-panel>`);
    const header = el.shadowRoot!.querySelector('[part="header"]');
    expect(header).to.exist;
  });

  it('exposes body CSS part', async () => {
    const el = await fixture<BhSidebarPanel>(html`<bh-sidebar-panel></bh-sidebar-panel>`);
    const body = el.shadowRoot!.querySelector('[part="body"]');
    expect(body).to.exist;
  });

  it('renders slot content', async () => {
    const el = await fixture<BhSidebarPanel>(
      html`<bh-sidebar-panel><p>Body content</p></bh-sidebar-panel>`
    );
    expect(el.textContent!.trim()).to.equal('Body content');
  });

  it('renders header slot', async () => {
    const el = await fixture<BhSidebarPanel>(
      html`<bh-sidebar-panel><span slot="header">Title</span></bh-sidebar-panel>`
    );
    const headerSlot = el.shadowRoot!.querySelector('slot[name="header"]') as HTMLSlotElement;
    expect(headerSlot).to.exist;
    expect(headerSlot.assignedElements().length).to.equal(1);
  });

  it('fires bh-sidebar-collapse event when collapsed changes', async () => {
    const el = await fixture<BhSidebarPanel>(html`<bh-sidebar-panel></bh-sidebar-panel>`);
    let detail: { collapsed: boolean } | null = null;
    el.addEventListener('bh-sidebar-collapse', ((e: CustomEvent) => {
      detail = e.detail;
    }) as EventListener);

    el.collapsed = true;
    await el.updateComplete;

    expect(detail).to.not.be.null;
    expect(detail!.collapsed).to.be.true;
  });
});
