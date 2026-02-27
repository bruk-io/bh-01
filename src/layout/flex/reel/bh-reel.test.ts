import { html } from 'lit';
import { fixture, expect } from '@open-wc/testing';
import type { BhReel } from './bh-reel.js';
import './bh-reel.js';

describe('bh-reel', () => {
  it('renders with default props', async () => {
    const el = await fixture<BhReel>(html`<bh-reel></bh-reel>`);
    expect(el.gap).to.equal('md');
    expect(el.itemWidth).to.equal('auto');
    expect(el.snap).to.equal(false);
  });

  it('reflects gap attribute', async () => {
    const el = await fixture<BhReel>(html`<bh-reel gap="lg"></bh-reel>`);
    expect(el.getAttribute('gap')).to.equal('lg');
    expect(el.gap).to.equal('lg');
  });

  it('reflects item-width attribute', async () => {
    const el = await fixture<BhReel>(
      html`<bh-reel item-width="200px"></bh-reel>`
    );
    expect(el.getAttribute('item-width')).to.equal('200px');
    expect(el.itemWidth).to.equal('200px');
  });

  it('reflects snap attribute', async () => {
    const el = await fixture<BhReel>(html`<bh-reel snap></bh-reel>`);
    expect(el.hasAttribute('snap')).to.be.true;
    expect(el.snap).to.be.true;
  });

  it('projects slot content', async () => {
    const el = await fixture<BhReel>(
      html`<bh-reel><div>Child</div></bh-reel>`
    );
    const slot = el.shadowRoot!.querySelector('slot');
    expect(slot).to.exist;
    const assigned = slot!.assignedElements();
    expect(assigned.length).to.equal(1);
  });

  it('has flex display', async () => {
    const el = await fixture<BhReel>(html`<bh-reel></bh-reel>`);
    const style = getComputedStyle(el);
    expect(style.display).to.equal('flex');
  });

  it('has overflow-x auto', async () => {
    const el = await fixture<BhReel>(html`<bh-reel></bh-reel>`);
    const style = getComputedStyle(el);
    expect(style.overflowX).to.equal('auto');
  });

  it('accepts all gap values', async () => {
    for (const gap of ['none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl']) {
      const el = await fixture<BhReel>(
        html`<bh-reel gap="${gap}"></bh-reel>`
      );
      expect(el.gap).to.equal(gap);
    }
  });

  it('snap attribute reflected', async () => {
    const el = await fixture<BhReel>(html`<bh-reel></bh-reel>`);
    expect(el.hasAttribute('snap')).to.be.false;
    el.snap = true;
    await el.updateComplete;
    expect(el.hasAttribute('snap')).to.be.true;
  });
});
