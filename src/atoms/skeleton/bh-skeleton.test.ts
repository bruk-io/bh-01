import { html } from 'lit';
import { fixture, expect } from '@open-wc/testing';
import type { BhSkeleton } from './bh-skeleton.js';
import './bh-skeleton.js';

describe('bh-skeleton', () => {
  it('renders with default props', async () => {
    const el = await fixture<BhSkeleton>(html`<bh-skeleton></bh-skeleton>`);
    expect(el.variant).to.equal('text');
    expect(el.width).to.equal('');
    expect(el.height).to.equal('');
  });

  it('has aria-busy attribute', async () => {
    const el = await fixture<BhSkeleton>(html`<bh-skeleton></bh-skeleton>`);
    const skeleton = el.shadowRoot!.querySelector('.skeleton')!;
    expect(skeleton.getAttribute('aria-busy')).to.equal('true');
  });

  it('has aria-label for accessibility', async () => {
    const el = await fixture<BhSkeleton>(html`<bh-skeleton></bh-skeleton>`);
    const skeleton = el.shadowRoot!.querySelector('.skeleton')!;
    expect(skeleton.getAttribute('aria-label')).to.equal('Loading');
  });

  it('exposes skeleton CSS part', async () => {
    const el = await fixture<BhSkeleton>(html`<bh-skeleton></bh-skeleton>`);
    expect(el.shadowRoot!.querySelector('[part="skeleton"]')).to.exist;
  });

  it('reflects variant attribute', async () => {
    const el = await fixture<BhSkeleton>(html`<bh-skeleton variant="circle"></bh-skeleton>`);
    expect(el.variant).to.equal('circle');
    expect(el.getAttribute('variant')).to.equal('circle');
  });

  it('applies custom width', async () => {
    const el = await fixture<BhSkeleton>(html`<bh-skeleton width="200px"></bh-skeleton>`);
    const skeleton = el.shadowRoot!.querySelector('.skeleton') as HTMLElement;
    expect(skeleton.style.cssText).to.contain('width: 200px');
  });

  it('applies custom height', async () => {
    const el = await fixture<BhSkeleton>(html`<bh-skeleton height="3rem"></bh-skeleton>`);
    const skeleton = el.shadowRoot!.querySelector('.skeleton') as HTMLElement;
    expect(skeleton.style.cssText).to.contain('height: 3rem');
  });

  it('supports all variant values', async () => {
    for (const variant of ['text', 'circle', 'rect']) {
      const el = await fixture<BhSkeleton>(
        html`<bh-skeleton variant=${variant}></bh-skeleton>`
      );
      expect(el.getAttribute('variant')).to.equal(variant);
    }
  });
});
