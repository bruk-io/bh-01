import { html } from 'lit';
import { fixture, expect } from '@open-wc/testing';
import type { BhCluster } from './bh-cluster.js';
import './bh-cluster.js';

describe('bh-cluster', () => {
  it('renders with default props', async () => {
    const el = await fixture<BhCluster>(html`<bh-cluster></bh-cluster>`);
    expect(el.gap).to.equal('md');
    expect(el.justify).to.equal('start');
    expect(el.align).to.equal('center');
    expect(el.nowrap).to.equal(false);
  });

  it('reflects gap attribute', async () => {
    const el = await fixture<BhCluster>(
      html`<bh-cluster gap="lg"></bh-cluster>`
    );
    expect(el.getAttribute('gap')).to.equal('lg');
    expect(el.gap).to.equal('lg');
  });

  it('reflects justify attribute', async () => {
    const el = await fixture<BhCluster>(
      html`<bh-cluster justify="between"></bh-cluster>`
    );
    expect(el.getAttribute('justify')).to.equal('between');
    expect(el.justify).to.equal('between');
  });

  it('reflects align attribute', async () => {
    const el = await fixture<BhCluster>(
      html`<bh-cluster align="end"></bh-cluster>`
    );
    expect(el.getAttribute('align')).to.equal('end');
    expect(el.align).to.equal('end');
  });

  it('reflects nowrap attribute', async () => {
    const el = await fixture<BhCluster>(
      html`<bh-cluster nowrap></bh-cluster>`
    );
    expect(el.hasAttribute('nowrap')).to.be.true;
    expect(el.nowrap).to.be.true;
  });

  it('projects slot content', async () => {
    const el = await fixture<BhCluster>(
      html`<bh-cluster><div>Child</div></bh-cluster>`
    );
    const slot = el.shadowRoot!.querySelector('slot');
    expect(slot).to.exist;
    const assigned = slot!.assignedElements();
    expect(assigned.length).to.equal(1);
  });

  it('has flex display', async () => {
    const el = await fixture<BhCluster>(html`<bh-cluster></bh-cluster>`);
    const style = getComputedStyle(el);
    expect(style.display).to.equal('flex');
  });

  it('has wrap by default', async () => {
    const el = await fixture<BhCluster>(html`<bh-cluster></bh-cluster>`);
    const style = getComputedStyle(el);
    expect(style.flexWrap).to.equal('wrap');
  });

  it('accepts all gap values', async () => {
    for (const gap of ['none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl']) {
      const el = await fixture<BhCluster>(
        html`<bh-cluster gap="${gap}"></bh-cluster>`
      );
      expect(el.gap).to.equal(gap);
    }
  });

  it('nowrap changes flex-wrap', async () => {
    const el = await fixture<BhCluster>(
      html`<bh-cluster nowrap></bh-cluster>`
    );
    const style = getComputedStyle(el);
    expect(style.flexWrap).to.equal('nowrap');
  });
});
