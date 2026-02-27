import { html } from 'lit';
import { fixture, expect } from '@open-wc/testing';
import type { BhDivider } from './bh-divider.js';
import './bh-divider.js';

describe('bh-divider', () => {
  it('renders with default props', async () => {
    const el = await fixture<BhDivider>(html`<bh-divider></bh-divider>`);
    expect(el.vertical).to.equal(false);
    expect(el.spacing).to.equal('md');
  });

  it('renders horizontal rule by default', async () => {
    const el = await fixture<BhDivider>(html`<bh-divider></bh-divider>`);
    const hr = el.shadowRoot!.querySelector('hr');
    expect(hr).to.exist;
  });

  it('reflects spacing attribute', async () => {
    const el = await fixture<BhDivider>(
      html`<bh-divider spacing="lg"></bh-divider>`
    );
    expect(el.getAttribute('spacing')).to.equal('lg');
  });

  it('reflects vertical attribute', async () => {
    const el = await fixture<BhDivider>(
      html`<bh-divider vertical></bh-divider>`
    );
    expect(el.hasAttribute('vertical')).to.be.true;
    expect(el.vertical).to.be.true;
  });

  it('has aria-hidden on the rule', async () => {
    const el = await fixture<BhDivider>(html`<bh-divider></bh-divider>`);
    const hr = el.shadowRoot!.querySelector('hr');
    expect(hr!.getAttribute('aria-hidden')).to.equal('true');
  });

  it('exposes divider CSS part on hr', async () => {
    const el = await fixture<BhDivider>(html`<bh-divider></bh-divider>`);
    const hr = el.shadowRoot!.querySelector('[part="divider"]');
    expect(hr).to.exist;
  });

  it('renders small spacing', async () => {
    const el = await fixture<BhDivider>(
      html`<bh-divider spacing="sm"></bh-divider>`
    );
    expect(el.spacing).to.equal('sm');
  });

  it('renders vertical divider element', async () => {
    const el = await fixture<BhDivider>(
      html`<bh-divider vertical></bh-divider>`
    );
    const div = el.shadowRoot!.querySelector('.vertical');
    expect(div).to.exist;
  });

  it('defaults gradient to false', async () => {
    const el = await fixture<BhDivider>(html`<bh-divider></bh-divider>`);
    expect(el.gradient).to.be.false;
    expect(el.hasAttribute('gradient')).to.be.false;
  });

  it('reflects gradient attribute', async () => {
    const el = await fixture<BhDivider>(
      html`<bh-divider gradient></bh-divider>`
    );
    expect(el.gradient).to.be.true;
    expect(el.hasAttribute('gradient')).to.be.true;
  });

  it('sets gradient property via attribute', async () => {
    const el = await fixture<BhDivider>(
      html`<bh-divider gradient></bh-divider>`
    );
    expect(el.gradient).to.be.true;
  });
});
