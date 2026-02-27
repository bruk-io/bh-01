import { html } from 'lit';
import { fixture, expect } from '@open-wc/testing';
import type { BhToolbar } from './bh-toolbar.js';
import './bh-toolbar.js';

describe('bh-toolbar', () => {
  it('renders with default props', async () => {
    const el = await fixture<BhToolbar>(html`<bh-toolbar></bh-toolbar>`);
    expect(el.gap).to.equal('sm');
    expect(el.variant).to.equal('default');
    expect(el.sticky).to.equal(false);
  });

  it('renders toolbar with role', async () => {
    const el = await fixture<BhToolbar>(html`<bh-toolbar></bh-toolbar>`);
    const toolbar = el.shadowRoot!.querySelector('[role="toolbar"]');
    expect(toolbar).to.exist;
  });

  it('reflects gap attribute', async () => {
    const el = await fixture<BhToolbar>(
      html`<bh-toolbar gap="md"></bh-toolbar>`
    );
    expect(el.getAttribute('gap')).to.equal('md');
  });

  it('reflects variant attribute', async () => {
    const el = await fixture<BhToolbar>(
      html`<bh-toolbar variant="surface"></bh-toolbar>`
    );
    expect(el.getAttribute('variant')).to.equal('surface');
  });

  it('reflects sticky attribute', async () => {
    const el = await fixture<BhToolbar>(
      html`<bh-toolbar sticky></bh-toolbar>`
    );
    expect(el.hasAttribute('sticky')).to.be.true;
  });

  it('has start slot', async () => {
    const el = await fixture<BhToolbar>(html`
      <bh-toolbar>
        <span slot="start">Start</span>
      </bh-toolbar>
    `);
    const slot = el.shadowRoot!.querySelector('slot[name="start"]') as HTMLSlotElement;
    expect(slot).to.exist;
    expect(slot.assignedElements().length).to.equal(1);
  });

  it('has end slot', async () => {
    const el = await fixture<BhToolbar>(html`
      <bh-toolbar>
        <span slot="end">End</span>
      </bh-toolbar>
    `);
    const slot = el.shadowRoot!.querySelector('slot[name="end"]') as HTMLSlotElement;
    expect(slot).to.exist;
    expect(slot.assignedElements().length).to.equal(1);
  });

  it('has default (center) slot', async () => {
    const el = await fixture<BhToolbar>(html`
      <bh-toolbar>
        <span>Center</span>
      </bh-toolbar>
    `);
    const slot = el.shadowRoot!.querySelector('.center slot:not([name])') as HTMLSlotElement;
    expect(slot).to.exist;
    expect(slot.assignedElements().length).to.equal(1);
  });

  it('exposes toolbar CSS part', async () => {
    const el = await fixture<BhToolbar>(html`<bh-toolbar></bh-toolbar>`);
    const toolbar = el.shadowRoot!.querySelector('[part="toolbar"]');
    expect(toolbar).to.exist;
  });
});
