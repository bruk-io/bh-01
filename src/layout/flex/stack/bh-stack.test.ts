import { html } from 'lit';
import { fixture, expect } from '@open-wc/testing';
import type { BhStack } from './bh-stack.js';
import './bh-stack.js';

describe('bh-stack', () => {
  it('renders with default props', async () => {
    const el = await fixture<BhStack>(html`<bh-stack></bh-stack>`);
    expect(el.gap).to.equal('md');
    expect(el.align).to.equal('stretch');
    expect(el.wrap).to.equal(false);
  });

  it('reflects gap attribute', async () => {
    const el = await fixture<BhStack>(html`<bh-stack gap="lg"></bh-stack>`);
    expect(el.getAttribute('gap')).to.equal('lg');
    expect(el.gap).to.equal('lg');
  });

  it('reflects align attribute', async () => {
    const el = await fixture<BhStack>(
      html`<bh-stack align="center"></bh-stack>`
    );
    expect(el.getAttribute('align')).to.equal('center');
    expect(el.align).to.equal('center');
  });

  it('reflects wrap attribute', async () => {
    const el = await fixture<BhStack>(html`<bh-stack wrap></bh-stack>`);
    expect(el.hasAttribute('wrap')).to.be.true;
    expect(el.wrap).to.be.true;
  });

  it('projects slot content', async () => {
    const el = await fixture<BhStack>(
      html`<bh-stack><div>Child</div></bh-stack>`
    );
    const slot = el.shadowRoot!.querySelector('slot');
    expect(slot).to.exist;
    const assigned = slot!.assignedElements();
    expect(assigned.length).to.equal(1);
  });

  it('has flex display', async () => {
    const el = await fixture<BhStack>(html`<bh-stack></bh-stack>`);
    const style = getComputedStyle(el);
    expect(style.display).to.equal('flex');
  });

  it('has column direction', async () => {
    const el = await fixture<BhStack>(html`<bh-stack></bh-stack>`);
    const style = getComputedStyle(el);
    expect(style.flexDirection).to.equal('column');
  });

  it('accepts all gap values', async () => {
    for (const gap of ['none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl']) {
      const el = await fixture<BhStack>(
        html`<bh-stack gap="${gap}"></bh-stack>`
      );
      expect(el.gap).to.equal(gap);
    }
  });
});
