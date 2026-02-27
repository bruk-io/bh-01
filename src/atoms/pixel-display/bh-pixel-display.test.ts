import { html } from 'lit';
import { fixture, expect } from '@open-wc/testing';
import type { BhPixelDisplay } from './bh-pixel-display.js';
import './bh-pixel-display.js';

describe('bh-pixel-display', () => {
  it('renders with default props', async () => {
    const el = await fixture<BhPixelDisplay>(
      html`<bh-pixel-display></bh-pixel-display>`
    );
    expect(el.cols).to.equal(20);
    expect(el.rows).to.equal(5);
    expect(el.label).to.equal('');
  });

  it('creates correct number of pixel divs', async () => {
    const el = await fixture<BhPixelDisplay>(
      html`<bh-pixel-display cols="4" rows="3"></bh-pixel-display>`
    );
    const pixels = el.shadowRoot!.querySelectorAll('.px');
    expect(pixels.length).to.equal(12);
  });

  it('sets grid CSS custom properties', async () => {
    const el = await fixture<BhPixelDisplay>(
      html`<bh-pixel-display cols="10" rows="7"></bh-pixel-display>`
    );
    const grid = el.shadowRoot!.querySelector('.grid') as HTMLElement;
    expect(grid.style.getPropertyValue('--_cols')).to.equal('10');
    expect(grid.style.getPropertyValue('--_rows')).to.equal('7');
  });

  it('applies palette classes from data', async () => {
    const data = new Uint8Array([0, 1, 2, 3, 4, 0]);
    const el = await fixture<BhPixelDisplay>(
      html`<bh-pixel-display cols="3" rows="2" .data=${data}></bh-pixel-display>`
    );
    await el.updateComplete;
    const pixels = el.shadowRoot!.querySelectorAll('.px');
    expect(pixels[0].classList.contains('primary')).to.be.false;
    expect(pixels[1].classList.contains('primary')).to.be.true;
    expect(pixels[2].classList.contains('success')).to.be.true;
    expect(pixels[3].classList.contains('warning')).to.be.true;
    expect(pixels[4].classList.contains('danger')).to.be.true;
    expect(pixels[5].classList.contains('primary')).to.be.false;
  });

  it('exposes grid CSS part', async () => {
    const el = await fixture<BhPixelDisplay>(
      html`<bh-pixel-display></bh-pixel-display>`
    );
    const grid = el.shadowRoot!.querySelector('[part="grid"]');
    expect(grid).to.exist;
  });

  it('exposes pixel CSS parts', async () => {
    const el = await fixture<BhPixelDisplay>(
      html`<bh-pixel-display cols="2" rows="2"></bh-pixel-display>`
    );
    const pixels = el.shadowRoot!.querySelectorAll('[part="pixel"]');
    expect(pixels.length).to.equal(4);
  });

  it('sets role="img" and aria-label when label is provided', async () => {
    const el = await fixture<BhPixelDisplay>(
      html`<bh-pixel-display label="CPU usage"></bh-pixel-display>`
    );
    const grid = el.shadowRoot!.querySelector('.grid')!;
    expect(grid.getAttribute('role')).to.equal('img');
    expect(grid.getAttribute('aria-label')).to.equal('CPU usage');
  });

  it('sets aria-hidden when no label', async () => {
    const el = await fixture<BhPixelDisplay>(
      html`<bh-pixel-display></bh-pixel-display>`
    );
    const grid = el.shadowRoot!.querySelector('.grid')!;
    expect(grid.getAttribute('aria-hidden')).to.equal('true');
  });

  it('marks individual pixels as aria-hidden', async () => {
    const el = await fixture<BhPixelDisplay>(
      html`<bh-pixel-display cols="2" rows="1"></bh-pixel-display>`
    );
    const pixel = el.shadowRoot!.querySelector('.px')!;
    expect(pixel.getAttribute('aria-hidden')).to.equal('true');
  });

  it('updates pixels when data reference changes', async () => {
    const el = await fixture<BhPixelDisplay>(
      html`<bh-pixel-display cols="2" rows="1" .data=${new Uint8Array([0, 0])}></bh-pixel-display>`
    );
    await el.updateComplete;
    let pixels = el.shadowRoot!.querySelectorAll('.px');
    expect(pixels[0].classList.contains('primary')).to.be.false;

    el.data = new Uint8Array([1, 0]);
    await el.updateComplete;
    pixels = el.shadowRoot!.querySelectorAll('.px');
    expect(pixels[0].classList.contains('primary')).to.be.true;
  });

  it('handles data shorter than grid', async () => {
    const data = new Uint8Array([1]);
    const el = await fixture<BhPixelDisplay>(
      html`<bh-pixel-display cols="3" rows="2" .data=${data}></bh-pixel-display>`
    );
    await el.updateComplete;
    const pixels = el.shadowRoot!.querySelectorAll('.px');
    expect(pixels[0].classList.contains('primary')).to.be.true;
    expect(pixels[1].classList.contains('primary')).to.be.false;
  });

  it('handles no data gracefully', async () => {
    const el = await fixture<BhPixelDisplay>(
      html`<bh-pixel-display cols="3" rows="2"></bh-pixel-display>`
    );
    await el.updateComplete;
    const pixels = el.shadowRoot!.querySelectorAll('.px');
    for (const px of pixels) {
      expect(px.className.trim()).to.equal('px');
    }
  });
});
