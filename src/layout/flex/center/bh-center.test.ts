import { html } from 'lit';
import { fixture, expect } from '@open-wc/testing';
import type { BhCenter } from './bh-center.js';
import './bh-center.js';

describe('bh-center', () => {
  it('renders with default props', async () => {
    const el = await fixture<BhCenter>(html`<bh-center></bh-center>`);
    expect(el.max).to.equal('none');
    expect(el.gutters).to.equal('none');
    expect(el.intrinsic).to.equal(false);
  });

  it('reflects max attribute', async () => {
    const el = await fixture<BhCenter>(
      html`<bh-center max="600px"></bh-center>`
    );
    expect(el.getAttribute('max')).to.equal('600px');
    expect(el.max).to.equal('600px');
  });

  it('reflects gutters attribute', async () => {
    const el = await fixture<BhCenter>(
      html`<bh-center gutters="lg"></bh-center>`
    );
    expect(el.getAttribute('gutters')).to.equal('lg');
    expect(el.gutters).to.equal('lg');
  });

  it('reflects intrinsic attribute', async () => {
    const el = await fixture<BhCenter>(
      html`<bh-center intrinsic></bh-center>`
    );
    expect(el.hasAttribute('intrinsic')).to.be.true;
    expect(el.intrinsic).to.be.true;
  });

  it('projects slot content', async () => {
    const el = await fixture<BhCenter>(
      html`<bh-center><div>Child</div></bh-center>`
    );
    const slot = el.shadowRoot!.querySelector('slot');
    expect(slot).to.exist;
    const assigned = slot!.assignedElements();
    expect(assigned.length).to.equal(1);
  });

  it('has flex display', async () => {
    const el = await fixture<BhCenter>(html`<bh-center></bh-center>`);
    const style = getComputedStyle(el);
    expect(style.display).to.equal('flex');
  });

  it('has column direction', async () => {
    const el = await fixture<BhCenter>(html`<bh-center></bh-center>`);
    const style = getComputedStyle(el);
    expect(style.flexDirection).to.equal('column');
  });

  it('accepts all gutters values', async () => {
    for (const gutters of ['none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl']) {
      const el = await fixture<BhCenter>(
        html`<bh-center gutters="${gutters}"></bh-center>`
      );
      expect(el.gutters).to.equal(gutters);
    }
  });
});
