import { html } from 'lit';
import { fixture, expect } from '@open-wc/testing';
import type { BhRepel } from './bh-repel.js';
import './bh-repel.js';

describe('bh-repel', () => {
  it('renders with default props', async () => {
    const el = await fixture<BhRepel>(html`<bh-repel></bh-repel>`);
    expect(el.gap).to.equal('md');
    expect(el.align).to.equal('center');
  });

  it('reflects gap attribute', async () => {
    const el = await fixture<BhRepel>(html`<bh-repel gap="lg"></bh-repel>`);
    expect(el.getAttribute('gap')).to.equal('lg');
    expect(el.gap).to.equal('lg');
  });

  it('reflects align attribute', async () => {
    const el = await fixture<BhRepel>(
      html`<bh-repel align="start"></bh-repel>`
    );
    expect(el.getAttribute('align')).to.equal('start');
    expect(el.align).to.equal('start');
  });

  it('projects slot content', async () => {
    const el = await fixture<BhRepel>(
      html`<bh-repel><div>Child</div></bh-repel>`
    );
    const slot = el.shadowRoot!.querySelector('slot');
    expect(slot).to.exist;
    const assigned = slot!.assignedElements();
    expect(assigned.length).to.equal(1);
  });

  it('has flex display', async () => {
    const el = await fixture<BhRepel>(html`<bh-repel></bh-repel>`);
    const style = getComputedStyle(el);
    expect(style.display).to.equal('flex');
  });

  it('has space-between justification', async () => {
    const el = await fixture<BhRepel>(html`<bh-repel></bh-repel>`);
    const style = getComputedStyle(el);
    expect(style.justifyContent).to.equal('space-between');
  });

  it('accepts all gap values', async () => {
    for (const gap of ['none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl']) {
      const el = await fixture<BhRepel>(
        html`<bh-repel gap="${gap}"></bh-repel>`
      );
      expect(el.gap).to.equal(gap);
    }
  });
});
