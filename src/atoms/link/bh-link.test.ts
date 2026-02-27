import { html } from 'lit';
import { fixture, expect, oneEvent } from '@open-wc/testing';
import type { BhLink } from './bh-link.js';
import './bh-link.js';

describe('bh-link', () => {
  it('renders with default props', async () => {
    const el = await fixture<BhLink>(html`<bh-link href="/page">Go</bh-link>`);
    expect(el.variant).to.equal('default');
    expect(el.external).to.equal(false);
  });

  it('renders anchor with href', async () => {
    const el = await fixture<BhLink>(html`<bh-link href="/about">About</bh-link>`);
    const a = el.shadowRoot!.querySelector('a')!;
    expect(a.getAttribute('href')).to.equal('/about');
  });

  it('renders slot content', async () => {
    const el = await fixture<BhLink>(html`<bh-link href="/">Home</bh-link>`);
    expect(el.textContent!.trim()).to.equal('Home');
  });

  it('exposes link CSS part', async () => {
    const el = await fixture<BhLink>(html`<bh-link href="/">Test</bh-link>`);
    expect(el.shadowRoot!.querySelector('[part="link"]')).to.exist;
  });

  it('sets target="_blank" for external links', async () => {
    const el = await fixture<BhLink>(html`<bh-link href="https://example.com" external>Ext</bh-link>`);
    const a = el.shadowRoot!.querySelector('a')!;
    expect(a.getAttribute('target')).to.equal('_blank');
  });

  it('sets rel="noopener noreferrer" for external links', async () => {
    const el = await fixture<BhLink>(html`<bh-link href="https://example.com" external>Ext</bh-link>`);
    const a = el.shadowRoot!.querySelector('a')!;
    expect(a.getAttribute('rel')).to.equal('noopener noreferrer');
  });

  it('shows external icon for external links', async () => {
    const el = await fixture<BhLink>(html`<bh-link href="https://example.com" external>Ext</bh-link>`);
    expect(el.shadowRoot!.querySelector('.external-icon')).to.exist;
  });

  it('hides external icon for non-external links', async () => {
    const el = await fixture<BhLink>(html`<bh-link href="/about">About</bh-link>`);
    expect(el.shadowRoot!.querySelector('.external-icon')).to.not.exist;
  });

  it('reflects variant attribute', async () => {
    const el = await fixture<BhLink>(html`<bh-link href="/" variant="muted">Muted</bh-link>`);
    expect(el.getAttribute('variant')).to.equal('muted');
  });

  it('passes through target attribute', async () => {
    const el = await fixture<BhLink>(html`<bh-link href="/" target="_top">Top</bh-link>`);
    const a = el.shadowRoot!.querySelector('a')!;
    expect(a.getAttribute('target')).to.equal('_top');
  });

  it('fires bh-click on click', async () => {
    const el = await fixture<BhLink>(html`<bh-link href="#">Click</bh-link>`);
    const a = el.shadowRoot!.querySelector('a')!;

    setTimeout(() => a.click());

    const event = await oneEvent(el, 'bh-click');
    expect(event.detail.originalEvent).to.be.instanceOf(MouseEvent);
  });
});
