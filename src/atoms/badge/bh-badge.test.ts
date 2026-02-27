import { html } from 'lit';
import { fixture, expect } from '@open-wc/testing';
import type { BhBadge } from './bh-badge.js';
import './bh-badge.js';

describe('bh-badge', () => {
  it('renders with default props', async () => {
    const el = await fixture<BhBadge>(html`<bh-badge>New</bh-badge>`);
    expect(el.variant).to.equal('default');
    expect(el.size).to.equal('md');
  });

  it('reflects variant attribute', async () => {
    const el = await fixture<BhBadge>(
      html`<bh-badge variant="success">Active</bh-badge>`
    );
    expect(el.getAttribute('variant')).to.equal('success');
  });

  it('reflects size attribute', async () => {
    const el = await fixture<BhBadge>(
      html`<bh-badge size="sm">3</bh-badge>`
    );
    expect(el.getAttribute('size')).to.equal('sm');
  });

  it('renders slot content', async () => {
    const el = await fixture<BhBadge>(html`<bh-badge>Status</bh-badge>`);
    expect(el.textContent!.trim()).to.equal('Status');
  });

  it('exposes badge CSS part', async () => {
    const el = await fixture<BhBadge>(html`<bh-badge>Test</bh-badge>`);
    const span = el.shadowRoot!.querySelector('[part="badge"]');
    expect(span).to.exist;
  });

  it('renders primary variant', async () => {
    const el = await fixture<BhBadge>(
      html`<bh-badge variant="primary">Primary</bh-badge>`
    );
    expect(el.variant).to.equal('primary');
  });

  it('renders danger variant', async () => {
    const el = await fixture<BhBadge>(
      html`<bh-badge variant="danger">Error</bh-badge>`
    );
    expect(el.variant).to.equal('danger');
  });

  it('renders warning variant', async () => {
    const el = await fixture<BhBadge>(
      html`<bh-badge variant="warning">Caution</bh-badge>`
    );
    expect(el.variant).to.equal('warning');
  });
});
