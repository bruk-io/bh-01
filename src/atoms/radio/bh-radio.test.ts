import { html } from 'lit';
import { fixture, expect, oneEvent } from '@open-wc/testing';
import type { BhRadio } from './bh-radio.js';
import './bh-radio.js';

describe('bh-radio', () => {
  it('renders with default props', async () => {
    const el = await fixture<BhRadio>(html`<bh-radio>Option A</bh-radio>`);
    expect(el.checked).to.equal(false);
    expect(el.disabled).to.equal(false);
  });

  it('reflects checked attribute', async () => {
    const el = await fixture<BhRadio>(html`<bh-radio checked>Yes</bh-radio>`);
    expect(el.checked).to.equal(true);
    expect(el.hasAttribute('checked')).to.equal(true);
  });

  it('reflects disabled attribute', async () => {
    const el = await fixture<BhRadio>(html`<bh-radio disabled>No</bh-radio>`);
    const input = el.shadowRoot!.querySelector('input')!;
    expect(input.disabled).to.equal(true);
  });

  it('fires bh-change on selection', async () => {
    const el = await fixture<BhRadio>(html`<bh-radio value="a">A</bh-radio>`);
    const input = el.shadowRoot!.querySelector('input')!;

    setTimeout(() => {
      input.checked = true;
      input.dispatchEvent(new Event('change', { bubbles: true }));
    });

    const event = await oneEvent(el, 'bh-change');
    expect(event.detail.checked).to.equal(true);
    expect(event.detail.value).to.equal('a');
  });

  it('sets checked to true on change', async () => {
    const el = await fixture<BhRadio>(html`<bh-radio>A</bh-radio>`);
    const input = el.shadowRoot!.querySelector('input')!;
    input.checked = true;
    input.dispatchEvent(new Event('change', { bubbles: true }));
    expect(el.checked).to.equal(true);
  });

  it('exposes radio CSS part', async () => {
    const el = await fixture<BhRadio>(html`<bh-radio>Test</bh-radio>`);
    expect(el.shadowRoot!.querySelector('[part="radio"]')).to.exist;
  });

  it('exposes label CSS part', async () => {
    const el = await fixture<BhRadio>(html`<bh-radio>Test</bh-radio>`);
    expect(el.shadowRoot!.querySelector('[part="label"]')).to.exist;
  });

  it('renders slot content as label', async () => {
    const el = await fixture<BhRadio>(html`<bh-radio>Option B</bh-radio>`);
    expect(el.textContent!.trim()).to.equal('Option B');
  });
});
