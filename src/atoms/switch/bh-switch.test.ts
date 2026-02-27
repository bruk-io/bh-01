import { html } from 'lit';
import { fixture, expect, oneEvent } from '@open-wc/testing';
import type { BhSwitch } from './bh-switch.js';
import './bh-switch.js';

describe('bh-switch', () => {
  it('renders with default props', async () => {
    const el = await fixture<BhSwitch>(html`<bh-switch>Dark mode</bh-switch>`);
    expect(el.checked).to.equal(false);
    expect(el.disabled).to.equal(false);
  });

  it('reflects checked attribute', async () => {
    const el = await fixture<BhSwitch>(html`<bh-switch checked>On</bh-switch>`);
    expect(el.checked).to.equal(true);
    expect(el.hasAttribute('checked')).to.equal(true);
  });

  it('reflects disabled attribute', async () => {
    const el = await fixture<BhSwitch>(html`<bh-switch disabled>Off</bh-switch>`);
    const input = el.shadowRoot!.querySelector('input')!;
    expect(input.disabled).to.equal(true);
  });

  it('uses role="switch" on input', async () => {
    const el = await fixture<BhSwitch>(html`<bh-switch>Toggle</bh-switch>`);
    const input = el.shadowRoot!.querySelector('input')!;
    expect(input.getAttribute('role')).to.equal('switch');
  });

  it('fires bh-change on toggle', async () => {
    const el = await fixture<BhSwitch>(html`<bh-switch>Toggle</bh-switch>`);
    const input = el.shadowRoot!.querySelector('input')!;

    setTimeout(() => {
      input.checked = true;
      input.dispatchEvent(new Event('change', { bubbles: true }));
    });

    const event = await oneEvent(el, 'bh-change');
    expect(event.detail.checked).to.equal(true);
  });

  it('updates checked state on toggle', async () => {
    const el = await fixture<BhSwitch>(html`<bh-switch>Toggle</bh-switch>`);
    const input = el.shadowRoot!.querySelector('input')!;
    input.checked = true;
    input.dispatchEvent(new Event('change', { bubbles: true }));
    expect(el.checked).to.equal(true);
  });

  it('exposes track CSS part', async () => {
    const el = await fixture<BhSwitch>(html`<bh-switch>Test</bh-switch>`);
    expect(el.shadowRoot!.querySelector('[part="track"]')).to.exist;
  });

  it('exposes thumb CSS part', async () => {
    const el = await fixture<BhSwitch>(html`<bh-switch>Test</bh-switch>`);
    expect(el.shadowRoot!.querySelector('[part="thumb"]')).to.exist;
  });

  it('exposes label CSS part', async () => {
    const el = await fixture<BhSwitch>(html`<bh-switch>Test</bh-switch>`);
    expect(el.shadowRoot!.querySelector('[part="label"]')).to.exist;
  });
});
