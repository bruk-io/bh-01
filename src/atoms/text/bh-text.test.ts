import { html } from 'lit';
import { fixture, expect } from '@open-wc/testing';
import type { BhText } from './bh-text.js';
import './bh-text.js';

describe('bh-text', () => {
  it('renders with default variant (body)', async () => {
    const el = await fixture<BhText>(html`<bh-text>Hello</bh-text>`);
    expect(el.variant).to.equal('body');
  });

  it('reflects variant attribute', async () => {
    const el = await fixture<BhText>(
      html`<bh-text variant="heading">Title</bh-text>`
    );
    expect(el.getAttribute('variant')).to.equal('heading');
  });

  it('renders heading variant with role and aria-level', async () => {
    const el = await fixture<BhText>(
      html`<bh-text variant="heading">Title</bh-text>`
    );
    const span = el.shadowRoot!.querySelector('span')!;
    expect(span.getAttribute('role')).to.equal('heading');
    expect(span.getAttribute('aria-level')).to.equal('2');
  });

  it('does not set role for non-heading variants', async () => {
    const el = await fixture<BhText>(
      html`<bh-text variant="body">Body text</bh-text>`
    );
    const span = el.shadowRoot!.querySelector('span')!;
    expect(span.hasAttribute('role')).to.equal(false);
  });

  it('applies truncation', async () => {
    const el = await fixture<BhText>(
      html`<bh-text truncate>Long text that should be truncated</bh-text>`
    );
    expect(el.hasAttribute('truncate')).to.equal(true);
    const style = getComputedStyle(el);
    expect(style.overflow).to.equal('hidden');
    expect(style.textOverflow).to.equal('ellipsis');
    expect(style.whiteSpace).to.equal('nowrap');
  });

  it('renders slot content', async () => {
    const el = await fixture<BhText>(html`<bh-text>Content here</bh-text>`);
    expect(el.textContent!.trim()).to.equal('Content here');
  });

  it('exposes text CSS part', async () => {
    const el = await fixture<BhText>(html`<bh-text>Text</bh-text>`);
    const span = el.shadowRoot!.querySelector('[part="text"]');
    expect(span).to.exist;
  });

  it('renders small variant', async () => {
    const el = await fixture<BhText>(
      html`<bh-text variant="small">Small text</bh-text>`
    );
    expect(el.variant).to.equal('small');
    expect(el.getAttribute('variant')).to.equal('small');
  });

  it('renders code variant', async () => {
    const el = await fixture<BhText>(
      html`<bh-text variant="code">code</bh-text>`
    );
    expect(el.variant).to.equal('code');
    expect(el.getAttribute('variant')).to.equal('code');
  });
});
