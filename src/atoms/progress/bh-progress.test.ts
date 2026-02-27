import { html } from 'lit';
import { fixture, expect } from '@open-wc/testing';
import type { BhProgress } from './bh-progress.js';
import './bh-progress.js';

describe('bh-progress', () => {
  it('renders with default props', async () => {
    const el = await fixture<BhProgress>(html`<bh-progress></bh-progress>`);
    expect(el.value).to.equal(0);
    expect(el.max).to.equal(100);
    expect(el.indeterminate).to.equal(false);
    expect(el.size).to.equal('md');
    expect(el.variant).to.equal('default');
  });

  it('has progressbar role', async () => {
    const el = await fixture<BhProgress>(html`<bh-progress></bh-progress>`);
    expect(el.shadowRoot!.querySelector('[role="progressbar"]')).to.exist;
  });

  it('sets aria-valuenow from value', async () => {
    const el = await fixture<BhProgress>(html`<bh-progress value="42"></bh-progress>`);
    const track = el.shadowRoot!.querySelector('[role="progressbar"]')!;
    expect(track.getAttribute('aria-valuenow')).to.equal('42');
  });

  it('sets aria-valuemax from max', async () => {
    const el = await fixture<BhProgress>(html`<bh-progress max="200"></bh-progress>`);
    const track = el.shadowRoot!.querySelector('[role="progressbar"]')!;
    expect(track.getAttribute('aria-valuemax')).to.equal('200');
  });

  it('calculates bar width as percentage', async () => {
    const el = await fixture<BhProgress>(html`<bh-progress value="50" max="100"></bh-progress>`);
    const bar = el.shadowRoot!.querySelector('.bar') as HTMLElement;
    expect(bar.style.width).to.equal('50%');
  });

  it('clamps percentage to 0-100', async () => {
    const el = await fixture<BhProgress>(html`<bh-progress value="150" max="100"></bh-progress>`);
    const bar = el.shadowRoot!.querySelector('.bar') as HTMLElement;
    expect(bar.style.width).to.equal('100%');
  });

  it('reflects indeterminate attribute', async () => {
    const el = await fixture<BhProgress>(html`<bh-progress indeterminate></bh-progress>`);
    expect(el.indeterminate).to.equal(true);
    expect(el.hasAttribute('indeterminate')).to.equal(true);
  });

  it('exposes track CSS part', async () => {
    const el = await fixture<BhProgress>(html`<bh-progress></bh-progress>`);
    expect(el.shadowRoot!.querySelector('[part="track"]')).to.exist;
  });

  it('exposes bar CSS part', async () => {
    const el = await fixture<BhProgress>(html`<bh-progress></bh-progress>`);
    expect(el.shadowRoot!.querySelector('[part="bar"]')).to.exist;
  });

  it('reflects variant attribute', async () => {
    const el = await fixture<BhProgress>(html`<bh-progress variant="success"></bh-progress>`);
    expect(el.getAttribute('variant')).to.equal('success');
  });

  it('reflects size attribute', async () => {
    const el = await fixture<BhProgress>(html`<bh-progress size="lg"></bh-progress>`);
    expect(el.getAttribute('size')).to.equal('lg');
  });
});
