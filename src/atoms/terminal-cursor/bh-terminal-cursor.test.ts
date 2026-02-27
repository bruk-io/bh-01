import { html } from 'lit';
import { fixture, expect } from '@open-wc/testing';
import type { BhTerminalCursor } from './bh-terminal-cursor.js';
import './bh-terminal-cursor.js';

describe('bh-terminal-cursor', () => {
  it('renders with default props', async () => {
    const el = await fixture<BhTerminalCursor>(
      html`<bh-terminal-cursor></bh-terminal-cursor>`
    );
    expect(el.shape).to.equal('line');
    expect(el.blink).to.equal(true);
  });

  it('reflects shape attribute', async () => {
    const el = await fixture<BhTerminalCursor>(
      html`<bh-terminal-cursor shape="block"></bh-terminal-cursor>`
    );
    expect(el.getAttribute('shape')).to.equal('block');
    expect(el.shape).to.equal('block');
  });

  it('reflects blink attribute', async () => {
    const el = await fixture<BhTerminalCursor>(
      html`<bh-terminal-cursor></bh-terminal-cursor>`
    );
    expect(el.hasAttribute('blink')).to.be.true;
    expect(el.blink).to.be.true;
  });

  it('exposes cursor CSS part', async () => {
    const el = await fixture<BhTerminalCursor>(
      html`<bh-terminal-cursor></bh-terminal-cursor>`
    );
    const span = el.shadowRoot!.querySelector('[part="cursor"]');
    expect(span).to.exist;
  });

  it('has animation when blink is true', async () => {
    const el = await fixture<BhTerminalCursor>(
      html`<bh-terminal-cursor blink></bh-terminal-cursor>`
    );
    const span = el.shadowRoot!.querySelector('span')!;
    const styles = getComputedStyle(span);
    expect(styles.animationName).to.not.equal('none');
  });

  it('removes animation when blink is false', async () => {
    const el = await fixture<BhTerminalCursor>(
      html`<bh-terminal-cursor .blink=${false}></bh-terminal-cursor>`
    );
    expect(el.hasAttribute('blink')).to.be.false;
    const span = el.shadowRoot!.querySelector('span')!;
    const styles = getComputedStyle(span);
    expect(styles.animationName).to.equal('none');
  });
});
