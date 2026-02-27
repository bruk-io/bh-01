import { html } from 'lit';
import { fixture, expect } from '@open-wc/testing';
import type { BhStatusBar } from './bh-status-bar.js';
import './bh-status-bar.js';

describe('bh-status-bar', () => {
  it('renders with default props', async () => {
    const el = await fixture<BhStatusBar>(html`<bh-status-bar></bh-status-bar>`);
    expect(el.message).to.equal('');
    expect(el.error).to.equal(false);
  });

  it('renders message text', async () => {
    const el = await fixture<BhStatusBar>(
      html`<bh-status-bar message="Ready"></bh-status-bar>`
    );
    const msg = el.shadowRoot!.querySelector('.message');
    expect(msg).to.exist;
    expect(msg!.textContent).to.equal('Ready');
  });

  it('reflects error attribute', async () => {
    const el = await fixture<BhStatusBar>(
      html`<bh-status-bar error></bh-status-bar>`
    );
    expect(el.error).to.equal(true);
    expect(el.hasAttribute('error')).to.be.true;
  });

  it('exposes bar CSS part', async () => {
    const el = await fixture<BhStatusBar>(html`<bh-status-bar></bh-status-bar>`);
    const bar = el.shadowRoot!.querySelector('[part="bar"]');
    expect(bar).to.exist;
  });

  it('renders end slot', async () => {
    const el = await fixture<BhStatusBar>(
      html`<bh-status-bar><span slot="end">Ln 42</span></bh-status-bar>`
    );
    const endSlot = el.shadowRoot!.querySelector('slot[name="end"]') as HTMLSlotElement;
    expect(endSlot).to.exist;
    expect(endSlot.assignedElements().length).to.equal(1);
  });

  it('renders default slot content', async () => {
    const el = await fixture<BhStatusBar>(
      html`<bh-status-bar><span>Status item</span></bh-status-bar>`
    );
    expect(el.textContent!.trim()).to.equal('Status item');
  });
});
