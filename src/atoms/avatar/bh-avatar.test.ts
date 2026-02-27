import { html } from 'lit';
import { fixture, expect } from '@open-wc/testing';
import type { BhAvatar } from './bh-avatar.js';
import './bh-avatar.js';

describe('bh-avatar', () => {
  it('renders with default props', async () => {
    const el = await fixture<BhAvatar>(html`<bh-avatar></bh-avatar>`);
    expect(el.size).to.equal('md');
    expect(el.src).to.equal('');
    expect(el.initials).to.equal('');
  });

  it('renders initials when provided', async () => {
    const el = await fixture<BhAvatar>(html`<bh-avatar initials="AB"></bh-avatar>`);
    const initialsEl = el.shadowRoot!.querySelector('[part="initials"]')!;
    expect(initialsEl).to.exist;
    expect(initialsEl.textContent!.trim()).to.equal('AB');
  });

  it('limits initials to 2 characters', async () => {
    const el = await fixture<BhAvatar>(html`<bh-avatar initials="ABCD"></bh-avatar>`);
    const initialsEl = el.shadowRoot!.querySelector('[part="initials"]')!;
    expect(initialsEl.textContent!.trim()).to.equal('AB');
  });

  it('renders generic SVG fallback when no src or initials', async () => {
    const el = await fixture<BhAvatar>(html`<bh-avatar></bh-avatar>`);
    expect(el.shadowRoot!.querySelector('svg')).to.exist;
  });

  it('renders image when src is provided', async () => {
    const el = await fixture<BhAvatar>(html`<bh-avatar src="data:image/svg+xml,<svg/>"></bh-avatar>`);
    const img = el.shadowRoot!.querySelector('img');
    expect(img).to.exist;
    expect(img!.getAttribute('part')).to.equal('image');
  });

  it('falls back to initials on image error', async () => {
    const el = await fixture<BhAvatar>(html`<bh-avatar src="bad-url.png" initials="XY"></bh-avatar>`);
    // Trigger image error
    const img = el.shadowRoot!.querySelector('img')!;
    img.dispatchEvent(new Event('error'));
    await el.updateComplete;
    expect(el.shadowRoot!.querySelector('[part="initials"]')).to.exist;
  });

  it('reflects size attribute', async () => {
    const el = await fixture<BhAvatar>(html`<bh-avatar size="lg"></bh-avatar>`);
    expect(el.size).to.equal('lg');
    expect(el.hasAttribute('size')).to.equal(true);
  });

  it('sets aria-label on initials', async () => {
    const el = await fixture<BhAvatar>(html`<bh-avatar initials="JD" alt="John Doe"></bh-avatar>`);
    const initialsEl = el.shadowRoot!.querySelector('[part="initials"]')!;
    expect(initialsEl.getAttribute('aria-label')).to.equal('John Doe');
  });
});
