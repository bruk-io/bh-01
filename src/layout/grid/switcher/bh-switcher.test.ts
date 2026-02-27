import { html } from 'lit';
import { fixture, expect } from '@open-wc/testing';
import type { BhSwitcher } from './bh-switcher.js';
import './bh-switcher.js';

describe('bh-switcher', () => {
  it('renders with default props', async () => {
    const el = await fixture<BhSwitcher>(html`<bh-switcher></bh-switcher>`);
    expect(el.gap).to.equal('md');
    expect(el.threshold).to.equal('30rem');
    expect(el.limit).to.equal(4);
  });

  it('reflects gap attribute', async () => {
    const el = await fixture<BhSwitcher>(
      html`<bh-switcher gap="lg"></bh-switcher>`
    );
    expect(el.getAttribute('gap')).to.equal('lg');
    expect(el.gap).to.equal('lg');
  });

  it('reflects threshold attribute', async () => {
    const el = await fixture<BhSwitcher>(
      html`<bh-switcher threshold="20rem"></bh-switcher>`
    );
    expect(el.getAttribute('threshold')).to.equal('20rem');
    expect(el.threshold).to.equal('20rem');
  });

  it('reflects limit attribute', async () => {
    const el = await fixture<BhSwitcher>(
      html`<bh-switcher limit="3"></bh-switcher>`
    );
    expect(el.getAttribute('limit')).to.equal('3');
    expect(el.limit).to.equal(3);
  });

  it('projects slot content', async () => {
    const el = await fixture<BhSwitcher>(
      html`<bh-switcher><div>Child</div></bh-switcher>`
    );
    const slot = el.shadowRoot!.querySelector('slot');
    expect(slot).to.exist;
    const assigned = slot!.assignedElements();
    expect(assigned.length).to.equal(1);
  });

  it('has grid display', async () => {
    const el = await fixture<BhSwitcher>(html`<bh-switcher></bh-switcher>`);
    const style = getComputedStyle(el);
    expect(style.display).to.equal('grid');
  });

  it('accepts all gap values', async () => {
    for (const gap of ['none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl']) {
      const el = await fixture<BhSwitcher>(
        html`<bh-switcher gap="${gap}"></bh-switcher>`
      );
      expect(el.gap).to.equal(gap);
    }
  });
});
