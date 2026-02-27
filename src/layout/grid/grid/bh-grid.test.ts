import { html } from 'lit';
import { fixture, expect } from '@open-wc/testing';
import type { BhGrid } from './bh-grid.js';
import './bh-grid.js';

describe('bh-grid', () => {
  it('renders with default props', async () => {
    const el = await fixture<BhGrid>(html`<bh-grid></bh-grid>`);
    expect(el.gap).to.equal('md');
    expect(el.min).to.equal('250px');
  });

  it('reflects gap attribute', async () => {
    const el = await fixture<BhGrid>(html`<bh-grid gap="lg"></bh-grid>`);
    expect(el.getAttribute('gap')).to.equal('lg');
    expect(el.gap).to.equal('lg');
  });

  it('reflects min attribute', async () => {
    const el = await fixture<BhGrid>(html`<bh-grid min="300px"></bh-grid>`);
    expect(el.getAttribute('min')).to.equal('300px');
    expect(el.min).to.equal('300px');
  });

  it('projects slot content', async () => {
    const el = await fixture<BhGrid>(
      html`<bh-grid><div>Child</div></bh-grid>`
    );
    const slot = el.shadowRoot!.querySelector('slot');
    expect(slot).to.exist;
    const assigned = slot!.assignedElements();
    expect(assigned.length).to.equal(1);
  });

  it('has grid display', async () => {
    const el = await fixture<BhGrid>(html`<bh-grid></bh-grid>`);
    const style = getComputedStyle(el);
    expect(style.display).to.equal('grid');
  });

  it('accepts all gap values', async () => {
    for (const gap of ['none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl']) {
      const el = await fixture<BhGrid>(
        html`<bh-grid gap="${gap}"></bh-grid>`
      );
      expect(el.gap).to.equal(gap);
    }
  });
});
