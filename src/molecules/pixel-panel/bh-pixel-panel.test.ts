import { html } from 'lit';
import { fixture, expect, aTimeout } from '@open-wc/testing';
import type { BhPixelPanel } from './bh-pixel-panel.js';
import './bh-pixel-panel.js';
import '../../atoms/pixel-display/bh-pixel-display.js';
import '../../molecules/card/bh-card.js';

describe('bh-pixel-panel', () => {
  it('renders with default props', async () => {
    const el = await fixture<BhPixelPanel>(
      html`<bh-pixel-panel></bh-pixel-panel>`
    );
    expect(el.label).to.equal('');
    expect(el.value).to.equal('');
    expect(el.footerStart).to.equal('');
    expect(el.footerEnd).to.equal('');
  });

  it('renders label text', async () => {
    const el = await fixture<BhPixelPanel>(
      html`<bh-pixel-panel label="CPU"></bh-pixel-panel>`
    );
    const label = el.shadowRoot!.querySelector('.label')!;
    expect(label.textContent).to.contain('CPU');
  });

  it('renders value text', async () => {
    const el = await fixture<BhPixelPanel>(
      html`<bh-pixel-panel value="23%"></bh-pixel-panel>`
    );
    const value = el.shadowRoot!.querySelector('.value')!;
    expect(value.textContent).to.contain('23%');
  });

  it('renders footer-start text from attribute', async () => {
    const el = await fixture<BhPixelPanel>(
      html`<bh-pixel-panel footer-start="8 cores"></bh-pixel-panel>`
    );
    expect(el.footerStart).to.equal('8 cores');
    const footer = el.shadowRoot!.querySelector('.footer')!;
    expect(footer.textContent).to.contain('8 cores');
  });

  it('renders footer-end text from attribute', async () => {
    const el = await fixture<BhPixelPanel>(
      html`<bh-pixel-panel footer-end="5s interval"></bh-pixel-panel>`
    );
    expect(el.footerEnd).to.equal('5s interval');
    const footer = el.shadowRoot!.querySelector('.footer')!;
    expect(footer.textContent).to.contain('5s interval');
  });

  it('exposes panel CSS part', async () => {
    const el = await fixture<BhPixelPanel>(
      html`<bh-pixel-panel></bh-pixel-panel>`
    );
    expect(el.shadowRoot!.querySelector('[part="panel"]')).to.exist;
  });

  it('exposes header CSS part', async () => {
    const el = await fixture<BhPixelPanel>(
      html`<bh-pixel-panel></bh-pixel-panel>`
    );
    expect(el.shadowRoot!.querySelector('[part="header"]')).to.exist;
  });

  it('exposes body CSS part', async () => {
    const el = await fixture<BhPixelPanel>(
      html`<bh-pixel-panel></bh-pixel-panel>`
    );
    expect(el.shadowRoot!.querySelector('[part="body"]')).to.exist;
  });

  it('exposes footer CSS part', async () => {
    const el = await fixture<BhPixelPanel>(
      html`<bh-pixel-panel></bh-pixel-panel>`
    );
    expect(el.shadowRoot!.querySelector('[part="footer"]')).to.exist;
  });

  it('sets role="group" with aria-label', async () => {
    const el = await fixture<BhPixelPanel>(
      html`<bh-pixel-panel label="Memory"></bh-pixel-panel>`
    );
    const panel = el.shadowRoot!.querySelector('.panel')!;
    expect(panel.getAttribute('role')).to.equal('group');
    expect(panel.getAttribute('aria-label')).to.equal('Memory');
  });

  it('renders slotted default content', async () => {
    const el = await fixture<BhPixelPanel>(html`
      <bh-pixel-panel>
        <div id="display">Display</div>
      </bh-pixel-panel>
    `);
    const slotted = el.querySelector('#display');
    expect(slotted).to.exist;
  });

  it('renders slotted label content', async () => {
    const el = await fixture<BhPixelPanel>(html`
      <bh-pixel-panel>
        <span slot="label">Custom Label</span>
      </bh-pixel-panel>
    `);
    const slotted = el.querySelector('[slot="label"]');
    expect(slotted).to.exist;
    expect(slotted!.textContent).to.equal('Custom Label');
  });
});

describe('bh-pixel-panel (managed mode)', () => {
  it('renders internal bh-pixel-display when cols and rows are set', async () => {
    const el = await fixture<BhPixelPanel>(html`
      <bh-pixel-panel cols="10" rows="5" label="CPU"></bh-pixel-panel>
    `);
    const display = el.shadowRoot!.querySelector('bh-pixel-display');
    expect(display).to.exist;
    expect(display!.cols).to.equal(10);
    expect(display!.rows).to.equal(5);
  });

  it('defaults to slot mode when cols/rows are 0', async () => {
    const el = await fixture<BhPixelPanel>(html`
      <bh-pixel-panel></bh-pixel-panel>
    `);
    const display = el.shadowRoot!.querySelector('bh-pixel-display');
    expect(display).to.not.exist;
    // Slot should exist
    const slot = el.shadowRoot!.querySelector('slot:not([name])');
    expect(slot).to.exist;
  });

  it('push updates the display data', async () => {
    const el = await fixture<BhPixelPanel>(html`
      <bh-pixel-panel cols="10" rows="5" type="sparkline"></bh-pixel-panel>
    `);
    el.push(100);
    await el.updateComplete;
    // Wait for directive rAF
    await aTimeout(50);
    await el.updateComplete;

    const display = el.shadowRoot!.querySelector('bh-pixel-display')!;
    expect(display.data).to.be.instanceOf(Uint8Array);
    const lit = Array.from(display.data!).filter((v) => v !== 0);
    expect(lit.length).to.be.greaterThan(0);
  });

  it('set replaces buffer and updates display', async () => {
    const el = await fixture<BhPixelPanel>(html`
      <bh-pixel-panel cols="10" rows="5" type="sparkline"></bh-pixel-panel>
    `);
    el.set([10, 50, 80, 100]);
    await el.updateComplete;
    await aTimeout(50);
    await el.updateComplete;

    const display = el.shadowRoot!.querySelector('bh-pixel-display')!;
    const lit = Array.from(display.data!).filter((v) => v !== 0);
    expect(lit.length).to.be.greaterThan(0);
  });

  it('setText renders text in the display', async () => {
    const el = await fixture<BhPixelPanel>(html`
      <bh-pixel-panel cols="20" rows="5" type="text"></bh-pixel-panel>
    `);
    el.setText('HI');
    await el.updateComplete;
    await aTimeout(50);
    await el.updateComplete;

    const display = el.shadowRoot!.querySelector('bh-pixel-display')!;
    const lit = Array.from(display.data!).filter((v) => v !== 0);
    expect(lit.length).to.be.greaterThan(0);
  });

  it('setGrid sets raw data', async () => {
    const el = await fixture<BhPixelPanel>(html`
      <bh-pixel-panel cols="3" rows="2" type="raw"></bh-pixel-panel>
    `);
    el.setGrid(new Uint8Array([1, 0, 2, 0, 3, 0]));
    await el.updateComplete;
    await aTimeout(50);
    await el.updateComplete;

    const display = el.shadowRoot!.querySelector('bh-pixel-display')!;
    expect(display.data).to.be.instanceOf(Uint8Array);
  });

  it('push is a no-op in slot mode', async () => {
    const el = await fixture<BhPixelPanel>(html`
      <bh-pixel-panel>
        <div>slotted</div>
      </bh-pixel-panel>
    `);
    // Should not throw
    el.push(42);
    el.set([1, 2, 3]);
    el.setText('test');
    el.setGrid(new Uint8Array(4));
    await el.updateComplete;
  });

  it('chrome still works in managed mode', async () => {
    const el = await fixture<BhPixelPanel>(html`
      <bh-pixel-panel
        cols="10" rows="5"
        label="Memory" value="64%"
        footer-start="16 GB" footer-end="5s"
      ></bh-pixel-panel>
    `);
    expect(el.shadowRoot!.querySelector('.label')!.textContent).to.contain('Memory');
    expect(el.shadowRoot!.querySelector('.value')!.textContent).to.contain('64%');
    expect(el.shadowRoot!.querySelector('.footer')!.textContent).to.contain('16 GB');
    expect(el.shadowRoot!.querySelector('.footer')!.textContent).to.contain('5s');
    expect(el.shadowRoot!.querySelector('[part="panel"]')).to.exist;
    expect(el.shadowRoot!.querySelector('[part="header"]')).to.exist;
    expect(el.shadowRoot!.querySelector('[part="body"]')).to.exist;
    expect(el.shadowRoot!.querySelector('[part="footer"]')).to.exist;
  });

  it('uses custom color', async () => {
    const el = await fixture<BhPixelPanel>(html`
      <bh-pixel-panel cols="5" rows="3" type="sparkline" color="2"></bh-pixel-panel>
    `);
    el.push(100);
    await el.updateComplete;
    await aTimeout(50);
    await el.updateComplete;

    const display = el.shadowRoot!.querySelector('bh-pixel-display')!;
    const lit = Array.from(display.data!).filter((v) => v !== 0);
    expect(lit.length).to.be.greaterThan(0);
    for (const px of lit) {
      expect(px).to.equal(2);
    }
  });

  it('passes label to pixel-display', async () => {
    const el = await fixture<BhPixelPanel>(html`
      <bh-pixel-panel cols="10" rows="5" label="CPU"></bh-pixel-panel>
    `);
    const display = el.shadowRoot!.querySelector('bh-pixel-display')!;
    expect(display.label).to.equal('CPU');
  });
});
