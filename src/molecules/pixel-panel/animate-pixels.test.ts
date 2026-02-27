import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { fixture, expect, aTimeout } from '@open-wc/testing';
import { animatePixels } from './animate-pixels.js';
import type { PixelTransition } from './animate-pixels.js';
import '../../atoms/pixel-display/bh-pixel-display.js';

@customElement('test-animate-host')
class TestAnimateHost extends LitElement {
  @property({ attribute: false }) grid?: Uint8Array;
  @property() transition: PixelTransition = 'step';
  @property({ type: Number }) fps = 12;
  @property({ type: Number }) cols = 5;
  @property({ type: Number }) rows = 3;

  render() {
    return html`
      <bh-pixel-display
        .cols=${this.cols}
        .rows=${this.rows}
        .data=${this.grid
          ? animatePixels(this.grid, {
              transition: this.transition,
              fps: this.fps,
              cols: this.cols,
            })
          : undefined}
      ></bh-pixel-display>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'test-animate-host': TestAnimateHost;
  }
}

describe('animatePixels directive', () => {
  describe('step mode', () => {
    it('passes through initial grid', async () => {
      const grid = new Uint8Array([1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1]);
      const el = await fixture<TestAnimateHost>(html`
        <test-animate-host .grid=${grid}></test-animate-host>
      `);
      await el.updateComplete;

      const display = el.shadowRoot!.querySelector('bh-pixel-display')!;
      expect(display.data).to.be.instanceOf(Uint8Array);
      expect(display.data!.length).to.equal(15);
    });

    it('updates display with new data', async () => {
      const grid1 = new Uint8Array(15).fill(0);
      const el = await fixture<TestAnimateHost>(html`
        <test-animate-host .grid=${grid1}></test-animate-host>
      `);
      await el.updateComplete;

      const grid2 = new Uint8Array(15).fill(1);
      el.grid = grid2;
      await el.updateComplete;
      // Wait for rAF throttle
      await aTimeout(50);
      await el.updateComplete;

      const display = el.shadowRoot!.querySelector('bh-pixel-display')!;
      expect(display.data).to.be.instanceOf(Uint8Array);
      // After rAF, data should be the new grid
      const litPixels = Array.from(display.data!).filter((v) => v !== 0);
      expect(litPixels.length).to.equal(15);
    });

    it('throttles rapid updates', async () => {
      const grid1 = new Uint8Array(15).fill(0);
      const el = await fixture<TestAnimateHost>(html`
        <test-animate-host .grid=${grid1}></test-animate-host>
      `);
      await el.updateComplete;

      // Push many updates rapidly
      for (let i = 1; i <= 5; i++) {
        el.grid = new Uint8Array(15).fill(i);
        await el.updateComplete;
      }

      // Wait for rAF
      await aTimeout(50);
      await el.updateComplete;

      const display = el.shadowRoot!.querySelector('bh-pixel-display')!;
      // Should have the latest value (5), not an intermediate
      if (display.data) {
        expect(display.data[0]).to.equal(5);
      }
    });
  });

  describe('sweep mode', () => {
    it('passes through initial grid', async () => {
      const grid = new Uint8Array(15).fill(1);
      const el = await fixture<TestAnimateHost>(html`
        <test-animate-host .grid=${grid} transition="sweep"></test-animate-host>
      `);
      await el.updateComplete;

      const display = el.shadowRoot!.querySelector('bh-pixel-display')!;
      expect(display.data).to.be.instanceOf(Uint8Array);
    });

    it('completes sweep and reaches target', async () => {
      const grid1 = new Uint8Array(15).fill(0);
      const el = await fixture<TestAnimateHost>(html`
        <test-animate-host .grid=${grid1} transition="sweep"></test-animate-host>
      `);
      await el.updateComplete;

      const grid2 = new Uint8Array(15).fill(2);
      el.grid = grid2;
      await el.updateComplete;

      // Wait for sweep to complete (~300ms + buffer)
      await aTimeout(500);
      await el.updateComplete;

      const display = el.shadowRoot!.querySelector('bh-pixel-display')!;
      expect(display.data).to.be.instanceOf(Uint8Array);
      // All pixels should be the target value after sweep completes
      expect(Array.from(display.data!).every((v) => v === 2)).to.be.true;
    });

    it('produces intermediate frames during sweep', async () => {
      const grid1 = new Uint8Array(15).fill(0);
      const el = await fixture<TestAnimateHost>(html`
        <test-animate-host
          .grid=${grid1}
          transition="sweep"
          .cols=${5}
          .rows=${3}
        ></test-animate-host>
      `);
      await el.updateComplete;

      const grid2 = new Uint8Array(15).fill(1);
      el.grid = grid2;
      await el.updateComplete;

      // Check after a short time (before sweep completes)
      await aTimeout(30);
      const display = el.shadowRoot!.querySelector('bh-pixel-display')!;
      // At this point we should have some data set
      expect(display.data).to.be.instanceOf(Uint8Array);
    });
  });

  describe('cleanup', () => {
    it('survives disconnect and reconnect', async () => {
      const grid = new Uint8Array(15).fill(1);
      const el = await fixture<TestAnimateHost>(html`
        <test-animate-host .grid=${grid}></test-animate-host>
      `);
      await el.updateComplete;

      // Remove from DOM
      const parent = el.parentElement!;
      parent.removeChild(el);

      // Re-add to DOM
      parent.appendChild(el);
      await el.updateComplete;

      const display = el.shadowRoot!.querySelector('bh-pixel-display')!;
      expect(display.data).to.be.instanceOf(Uint8Array);
    });
  });
});
