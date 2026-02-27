import { html } from 'lit';
import { fixture, expect, oneEvent } from '@open-wc/testing';
import type { BhCheckbox } from './bh-checkbox.js';
import './bh-checkbox.js';

describe('bh-checkbox', () => {
  it('renders with default props', async () => {
    const el = await fixture<BhCheckbox>(html`<bh-checkbox>Accept</bh-checkbox>`);
    expect(el.checked).to.equal(false);
    expect(el.disabled).to.equal(false);
    expect(el.indeterminate).to.equal(false);
  });

  it('reflects checked attribute', async () => {
    const el = await fixture<BhCheckbox>(html`<bh-checkbox checked>Yes</bh-checkbox>`);
    expect(el.checked).to.equal(true);
    expect(el.hasAttribute('checked')).to.equal(true);
  });

  it('reflects disabled attribute', async () => {
    const el = await fixture<BhCheckbox>(html`<bh-checkbox disabled>No</bh-checkbox>`);
    const input = el.shadowRoot!.querySelector('input')!;
    expect(input.disabled).to.equal(true);
  });

  it('fires bh-change on toggle', async () => {
    const el = await fixture<BhCheckbox>(html`<bh-checkbox>Toggle</bh-checkbox>`);
    const input = el.shadowRoot!.querySelector('input')!;

    setTimeout(() => {
      input.checked = true;
      input.dispatchEvent(new Event('change', { bubbles: true }));
    });

    const event = await oneEvent(el, 'bh-change');
    expect(event.detail.checked).to.equal(true);
  });

  it('clears indeterminate on change', async () => {
    const el = await fixture<BhCheckbox>(html`<bh-checkbox indeterminate>Mixed</bh-checkbox>`);
    expect(el.indeterminate).to.equal(true);

    const input = el.shadowRoot!.querySelector('input')!;
    input.checked = true;
    input.dispatchEvent(new Event('change', { bubbles: true }));

    expect(el.indeterminate).to.equal(false);
  });

  it('exposes checkbox CSS part', async () => {
    const el = await fixture<BhCheckbox>(html`<bh-checkbox>Test</bh-checkbox>`);
    expect(el.shadowRoot!.querySelector('[part="checkbox"]')).to.exist;
  });

  it('exposes label CSS part', async () => {
    const el = await fixture<BhCheckbox>(html`<bh-checkbox>Test</bh-checkbox>`);
    expect(el.shadowRoot!.querySelector('[part="label"]')).to.exist;
  });

  it('renders slot content as label', async () => {
    const el = await fixture<BhCheckbox>(html`<bh-checkbox>Accept terms</bh-checkbox>`);
    expect(el.textContent!.trim()).to.equal('Accept terms');
  });
});
