import { html } from 'lit';
import { fixture, expect } from '@open-wc/testing';
import type { BhSectionHeader } from './bh-section-header.js';
import './bh-section-header.js';
import '../../atoms/divider/bh-divider.js';

describe('bh-section-header', () => {
  it('renders with default props', async () => {
    const el = await fixture<BhSectionHeader>(
      html`<bh-section-header></bh-section-header>`
    );
    expect(el.heading).to.equal('');
    expect(el.count).to.be.undefined;
  });

  it('renders heading text', async () => {
    const el = await fixture<BhSectionHeader>(
      html`<bh-section-header heading="Services"></bh-section-header>`
    );
    const title = el.shadowRoot!.querySelector('.title')!;
    expect(title.textContent).to.contain('Services');
  });

  it('renders count badge when count is set', async () => {
    const el = await fixture<BhSectionHeader>(
      html`<bh-section-header heading="Services" count="5"></bh-section-header>`
    );
    const badge = el.shadowRoot!.querySelector('bh-badge');
    expect(badge).to.exist;
    expect(badge!.textContent).to.contain('5');
  });

  it('does not render badge when count is not set', async () => {
    const el = await fixture<BhSectionHeader>(
      html`<bh-section-header heading="Services"></bh-section-header>`
    );
    const badge = el.shadowRoot!.querySelector('bh-badge');
    expect(badge).to.not.exist;
  });

  it('renders divider', async () => {
    const el = await fixture<BhSectionHeader>(
      html`<bh-section-header></bh-section-header>`
    );
    const divider = el.shadowRoot!.querySelector('bh-divider');
    expect(divider).to.exist;
  });

  it('divider is aria-hidden (handled by bh-divider)', async () => {
    const el = await fixture<BhSectionHeader>(
      html`<bh-section-header></bh-section-header>`
    );
    const divider = el.shadowRoot!.querySelector('bh-divider')!;
    expect(divider).to.exist;
    // aria-hidden is handled internally by bh-divider on its <hr>
    const hr = divider.shadowRoot!.querySelector('hr')!;
    expect(hr.getAttribute('aria-hidden')).to.equal('true');
  });

  it('title has role="heading" aria-level="3"', async () => {
    const el = await fixture<BhSectionHeader>(
      html`<bh-section-header heading="Test"></bh-section-header>`
    );
    const title = el.shadowRoot!.querySelector('.title')!;
    expect(title.getAttribute('role')).to.equal('heading');
    expect(title.getAttribute('aria-level')).to.equal('3');
  });

  it('exposes header CSS part', async () => {
    const el = await fixture<BhSectionHeader>(
      html`<bh-section-header></bh-section-header>`
    );
    expect(el.shadowRoot!.querySelector('[part="header"]')).to.exist;
  });

  it('exposes title CSS part', async () => {
    const el = await fixture<BhSectionHeader>(
      html`<bh-section-header></bh-section-header>`
    );
    expect(el.shadowRoot!.querySelector('[part="title"]')).to.exist;
  });

  it('exposes line CSS part', async () => {
    const el = await fixture<BhSectionHeader>(
      html`<bh-section-header></bh-section-header>`
    );
    expect(el.shadowRoot!.querySelector('[part="line"]')).to.exist;
  });

  it('exposes badge CSS part when count present', async () => {
    const el = await fixture<BhSectionHeader>(
      html`<bh-section-header count="3"></bh-section-header>`
    );
    expect(el.shadowRoot!.querySelector('[part="badge"]')).to.exist;
  });

  it('renders slotted heading content', async () => {
    const el = await fixture<BhSectionHeader>(html`
      <bh-section-header>
        <strong>Custom Title</strong>
      </bh-section-header>
    `);
    const slotted = el.querySelector('strong');
    expect(slotted).to.exist;
    expect(slotted!.textContent).to.equal('Custom Title');
  });

  it('renders end slot content', async () => {
    const el = await fixture<BhSectionHeader>(html`
      <bh-section-header heading="Test">
        <span slot="end">Extra</span>
      </bh-section-header>
    `);
    const slotted = el.querySelector('[slot="end"]');
    expect(slotted).to.exist;
  });

  it('renders count of 0', async () => {
    const el = await fixture<BhSectionHeader>(
      html`<bh-section-header heading="Empty" count="0"></bh-section-header>`
    );
    const badge = el.shadowRoot!.querySelector('bh-badge');
    expect(badge).to.exist;
    expect(badge!.textContent).to.contain('0');
  });
});
