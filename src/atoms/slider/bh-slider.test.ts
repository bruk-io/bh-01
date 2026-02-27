import { html } from 'lit';
import { fixture, expect, oneEvent } from '@open-wc/testing';
import type { BhSlider } from './bh-slider.js';
import './bh-slider.js';

describe('bh-slider', () => {
  it('renders with default props', async () => {
    const el = await fixture<BhSlider>(html`<bh-slider></bh-slider>`);
    expect(el.min).to.equal(0);
    expect(el.max).to.equal(100);
    expect(el.step).to.equal(1);
    expect(el.value).to.equal(0);
    expect(el.disabled).to.equal(false);
    expect(el.showValue).to.equal(false);
  });

  it('renders a range input', async () => {
    const el = await fixture<BhSlider>(html`<bh-slider></bh-slider>`);
    const input = el.shadowRoot!.querySelector('input[type="range"]');
    expect(input).to.exist;
  });

  it('sets min, max, step on the input', async () => {
    const el = await fixture<BhSlider>(
      html`<bh-slider min="10" max="50" step="5" value="20"></bh-slider>`
    );
    const input = el.shadowRoot!.querySelector('input')!;
    expect(input.min).to.equal('10');
    expect(input.max).to.equal('50');
    expect(input.step).to.equal('5');
    expect(input.value).to.equal('20');
  });

  it('shows value when show-value is set', async () => {
    const el = await fixture<BhSlider>(
      html`<bh-slider value="42" show-value></bh-slider>`
    );
    const valueEl = el.shadowRoot!.querySelector('.value');
    expect(valueEl).to.exist;
    expect(valueEl!.textContent).to.equal('42');
  });

  it('hides value display by default', async () => {
    const el = await fixture<BhSlider>(html`<bh-slider></bh-slider>`);
    const valueEl = el.shadowRoot!.querySelector('.value');
    expect(valueEl).to.not.exist;
  });

  it('sets disabled state', async () => {
    const el = await fixture<BhSlider>(
      html`<bh-slider disabled></bh-slider>`
    );
    const input = el.shadowRoot!.querySelector('input')!;
    expect(input.disabled).to.equal(true);
  });

  it('fires bh-input event on input', async () => {
    const el = await fixture<BhSlider>(html`<bh-slider></bh-slider>`);
    const input = el.shadowRoot!.querySelector('input')!;

    setTimeout(() => {
      input.value = '50';
      input.dispatchEvent(new InputEvent('input', { bubbles: true }));
    });

    const event = await oneEvent(el, 'bh-input');
    expect(event.detail.value).to.equal(50);
  });

  it('fires bh-change event on change', async () => {
    const el = await fixture<BhSlider>(html`<bh-slider></bh-slider>`);
    const input = el.shadowRoot!.querySelector('input')!;

    setTimeout(() => {
      input.value = '75';
      input.dispatchEvent(new Event('change', { bubbles: true }));
    });

    const event = await oneEvent(el, 'bh-change');
    expect(event.detail.value).to.equal(75);
  });

  it('exposes track CSS part', async () => {
    const el = await fixture<BhSlider>(html`<bh-slider></bh-slider>`);
    const track = el.shadowRoot!.querySelector('[part="track"]');
    expect(track).to.exist;
  });
});
