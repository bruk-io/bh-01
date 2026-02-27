import { html } from 'lit';
import { fixture, expect } from '@open-wc/testing';
import type { BhCover } from './bh-cover.js';
import './bh-cover.js';

describe('bh-cover', () => {
  it('renders with default props', async () => {
    const el = await fixture<BhCover>(html`<bh-cover></bh-cover>`);
    expect(el.gap).to.equal('md');
    expect(el.minHeight).to.equal('100vh');
  });

  it('reflects gap attribute', async () => {
    const el = await fixture<BhCover>(html`<bh-cover gap="lg"></bh-cover>`);
    expect(el.getAttribute('gap')).to.equal('lg');
    expect(el.gap).to.equal('lg');
  });

  it('reflects min-height attribute', async () => {
    const el = await fixture<BhCover>(
      html`<bh-cover min-height="50vh"></bh-cover>`
    );
    expect(el.getAttribute('min-height')).to.equal('50vh');
    expect(el.minHeight).to.equal('50vh');
  });

  it('projects default slot content', async () => {
    const el = await fixture<BhCover>(
      html`<bh-cover><div>Top</div></bh-cover>`
    );
    const slot = el.shadowRoot!.querySelector('slot:not([name])');
    expect(slot).to.exist;
    const assigned = slot!.assignedElements();
    expect(assigned.length).to.equal(1);
  });

  it('has center named slot', async () => {
    const el = await fixture<BhCover>(html`<bh-cover></bh-cover>`);
    const slot = el.shadowRoot!.querySelector('slot[name="center"]');
    expect(slot).to.exist;
  });

  it('has bottom named slot', async () => {
    const el = await fixture<BhCover>(html`<bh-cover></bh-cover>`);
    const slot = el.shadowRoot!.querySelector('slot[name="bottom"]');
    expect(slot).to.exist;
  });

  it('has flex display', async () => {
    const el = await fixture<BhCover>(html`<bh-cover></bh-cover>`);
    const style = getComputedStyle(el);
    expect(style.display).to.equal('flex');
  });

  it('has column direction', async () => {
    const el = await fixture<BhCover>(html`<bh-cover></bh-cover>`);
    const style = getComputedStyle(el);
    expect(style.flexDirection).to.equal('column');
  });

  it('accepts all gap values', async () => {
    for (const gap of ['none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl']) {
      const el = await fixture<BhCover>(
        html`<bh-cover gap="${gap}"></bh-cover>`
      );
      expect(el.gap).to.equal(gap);
    }
  });
});
