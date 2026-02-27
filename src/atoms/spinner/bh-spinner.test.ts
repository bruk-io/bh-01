import { html } from 'lit';
import { fixture, expect } from '@open-wc/testing';
import type { BhSpinner } from './bh-spinner.js';
import './bh-spinner.js';

describe('bh-spinner', () => {
  it('renders with default props', async () => {
    const el = await fixture<BhSpinner>(html`<bh-spinner></bh-spinner>`);
    expect(el.size).to.equal('md');
    expect(el.label).to.equal('Loading');
  });

  it('has role=status', async () => {
    const el = await fixture<BhSpinner>(html`<bh-spinner></bh-spinner>`);
    const svg = el.shadowRoot!.querySelector('svg')!;
    expect(svg.getAttribute('role')).to.equal('status');
  });

  it('uses label as aria-label', async () => {
    const el = await fixture<BhSpinner>(
      html`<bh-spinner label="Saving"></bh-spinner>`
    );
    const svg = el.shadowRoot!.querySelector('svg')!;
    expect(svg.getAttribute('aria-label')).to.equal('Saving');
  });

  it('defaults aria-label to Loading', async () => {
    const el = await fixture<BhSpinner>(html`<bh-spinner></bh-spinner>`);
    const svg = el.shadowRoot!.querySelector('svg')!;
    expect(svg.getAttribute('aria-label')).to.equal('Loading');
  });

  it('reflects size attribute', async () => {
    const el = await fixture<BhSpinner>(
      html`<bh-spinner size="lg"></bh-spinner>`
    );
    expect(el.getAttribute('size')).to.equal('lg');
  });

  it('exposes spinner CSS part', async () => {
    const el = await fixture<BhSpinner>(html`<bh-spinner></bh-spinner>`);
    const svg = el.shadowRoot!.querySelector('[part="spinner"]');
    expect(svg).to.exist;
  });

  it('contains animated svg', async () => {
    const el = await fixture<BhSpinner>(html`<bh-spinner></bh-spinner>`);
    const svg = el.shadowRoot!.querySelector('svg')!;
    expect(svg).to.exist;
    expect(svg.querySelector('circle')).to.exist;
    expect(svg.querySelector('path')).to.exist;
  });
});
