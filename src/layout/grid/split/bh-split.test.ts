import { html } from 'lit';
import { fixture, expect } from '@open-wc/testing';
import type { BhSplit } from './bh-split.js';
import './bh-split.js';

describe('bh-split', () => {
  it('renders with default props', async () => {
    const el = await fixture<BhSplit>(html`<bh-split></bh-split>`);
    expect(el.gap).to.equal('md');
    expect(el.ratio).to.equal('1/1');
  });

  it('reflects gap attribute', async () => {
    const el = await fixture<BhSplit>(html`<bh-split gap="lg"></bh-split>`);
    expect(el.getAttribute('gap')).to.equal('lg');
    expect(el.gap).to.equal('lg');
  });

  it('reflects ratio attribute', async () => {
    const el = await fixture<BhSplit>(
      html`<bh-split ratio="2/1"></bh-split>`
    );
    expect(el.getAttribute('ratio')).to.equal('2/1');
    expect(el.ratio).to.equal('2/1');
  });

  it('projects slot content', async () => {
    const el = await fixture<BhSplit>(
      html`<bh-split><div>Child</div></bh-split>`
    );
    const slot = el.shadowRoot!.querySelector('slot');
    expect(slot).to.exist;
    const assigned = slot!.assignedElements();
    expect(assigned.length).to.equal(1);
  });

  it('has grid display', async () => {
    const el = await fixture<BhSplit>(html`<bh-split></bh-split>`);
    const style = getComputedStyle(el);
    expect(style.display).to.equal('grid');
  });

  it('accepts all gap values', async () => {
    for (const gap of ['none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl']) {
      const el = await fixture<BhSplit>(
        html`<bh-split gap="${gap}"></bh-split>`
      );
      expect(el.gap).to.equal(gap);
    }
  });

  it('accepts different ratio values', async () => {
    for (const ratio of ['1/1', '2/1', '1/2/1', '1/3', '3/1/2']) {
      const el = await fixture<BhSplit>(
        html`<bh-split ratio="${ratio}"></bh-split>`
      );
      expect(el.ratio).to.equal(ratio);
    }
  });
});
