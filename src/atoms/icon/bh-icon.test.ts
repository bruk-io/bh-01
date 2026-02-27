import { html } from 'lit';
import { fixture, expect } from '@open-wc/testing';
import { BhIcon } from './bh-icon.js';
import type { BhIcon as BhIconType } from './bh-icon.js';

describe('bh-icon', () => {
  it('renders with default props', async () => {
    const el = await fixture<BhIconType>(html`<bh-icon name="x"></bh-icon>`);
    expect(el.name).to.equal('x');
    expect(el.size).to.equal('md');
  });

  it('renders a built-in icon', async () => {
    const el = await fixture<BhIconType>(html`<bh-icon name="check"></bh-icon>`);
    const svg = el.shadowRoot!.querySelector('svg')!;
    const path = svg.querySelector('path');
    expect(path).to.exist;
  });

  it('renders nothing for an unregistered icon', async () => {
    const el = await fixture<BhIconType>(
      html`<bh-icon name="nonexistent"></bh-icon>`
    );
    const svg = el.shadowRoot!.querySelector('svg')!;
    expect(svg.children.length).to.equal(0);
  });

  it('registers custom icons', async () => {
    BhIcon.register('custom-star', '<polygon points="12 2 15 8.5 22 9.3 17 14 18.2 21 12 17.8 5.8 21 7 14 2 9.3 9 8.5"/>');
    const el = await fixture<BhIconType>(
      html`<bh-icon name="custom-star"></bh-icon>`
    );
    const svg = el.shadowRoot!.querySelector('svg')!;
    const polygon = svg.querySelector('polygon');
    expect(polygon).to.exist;
  });

  it('is aria-hidden by default', async () => {
    const el = await fixture<BhIconType>(html`<bh-icon name="x"></bh-icon>`);
    const svg = el.shadowRoot!.querySelector('svg')!;
    expect(svg.getAttribute('aria-hidden')).to.equal('true');
  });

  it('uses role=img and aria-label when label is set', async () => {
    const el = await fixture<BhIconType>(
      html`<bh-icon name="x" label="Close"></bh-icon>`
    );
    const svg = el.shadowRoot!.querySelector('svg')!;
    expect(svg.getAttribute('role')).to.equal('img');
    expect(svg.getAttribute('aria-label')).to.equal('Close');
    expect(svg.hasAttribute('aria-hidden')).to.equal(false);
  });

  it('reflects size attribute', async () => {
    const el = await fixture<BhIconType>(
      html`<bh-icon name="x" size="lg"></bh-icon>`
    );
    expect(el.getAttribute('size')).to.equal('lg');
  });

  it('exposes svg CSS part', async () => {
    const el = await fixture<BhIconType>(html`<bh-icon name="x"></bh-icon>`);
    const svg = el.shadowRoot!.querySelector('[part="svg"]');
    expect(svg).to.exist;
  });

  it('getIcon returns registered SVG', () => {
    const svg = BhIcon.getIcon('x');
    expect(svg).to.be.a('string');
    expect(svg).to.include('path');
  });

  it('getIcon returns undefined for unregistered', () => {
    expect(BhIcon.getIcon('nope')).to.be.undefined;
  });

  it('inherits color from parent', async () => {
    const el = await fixture<BhIconType>(
      html`<bh-icon name="x" style="color: rgb(255, 0, 0)"></bh-icon>`
    );
    const style = getComputedStyle(el);
    expect(style.color).to.equal('rgb(255, 0, 0)');
  });
});
