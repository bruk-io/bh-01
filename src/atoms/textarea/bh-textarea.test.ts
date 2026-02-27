import { html } from 'lit';
import { fixture, expect, oneEvent } from '@open-wc/testing';
import type { BhTextarea } from './bh-textarea.js';
import './bh-textarea.js';

describe('bh-textarea', () => {
  it('renders with default props', async () => {
    const el = await fixture<BhTextarea>(html`<bh-textarea></bh-textarea>`);
    expect(el.value).to.equal('');
    expect(el.rows).to.equal(3);
    expect(el.resize).to.equal('vertical');
    expect(el.disabled).to.equal(false);
  });

  it('sets rows attribute on textarea', async () => {
    const el = await fixture<BhTextarea>(html`<bh-textarea rows="5"></bh-textarea>`);
    const textarea = el.shadowRoot!.querySelector('textarea')!;
    expect(textarea.rows).to.equal(5);
  });

  it('sets placeholder', async () => {
    const el = await fixture<BhTextarea>(html`<bh-textarea placeholder="Type here..."></bh-textarea>`);
    const textarea = el.shadowRoot!.querySelector('textarea')!;
    expect(textarea.placeholder).to.equal('Type here...');
  });

  it('reflects disabled attribute', async () => {
    const el = await fixture<BhTextarea>(html`<bh-textarea disabled></bh-textarea>`);
    const textarea = el.shadowRoot!.querySelector('textarea')!;
    expect(textarea.disabled).to.equal(true);
  });

  it('reflects readonly attribute', async () => {
    const el = await fixture<BhTextarea>(html`<bh-textarea readonly></bh-textarea>`);
    const textarea = el.shadowRoot!.querySelector('textarea')!;
    expect(textarea.readOnly).to.equal(true);
  });

  it('fires bh-input on keystroke', async () => {
    const el = await fixture<BhTextarea>(html`<bh-textarea></bh-textarea>`);
    const textarea = el.shadowRoot!.querySelector('textarea')!;

    setTimeout(() => {
      textarea.value = 'hello';
      textarea.dispatchEvent(new InputEvent('input', { bubbles: true }));
    });

    const event = await oneEvent(el, 'bh-input');
    expect(event.detail.value).to.equal('hello');
  });

  it('fires bh-change on blur', async () => {
    const el = await fixture<BhTextarea>(html`<bh-textarea></bh-textarea>`);
    const textarea = el.shadowRoot!.querySelector('textarea')!;

    setTimeout(() => {
      textarea.value = 'world';
      textarea.dispatchEvent(new Event('change', { bubbles: true }));
    });

    const event = await oneEvent(el, 'bh-change');
    expect(event.detail.value).to.equal('world');
  });

  it('exposes wrapper CSS part', async () => {
    const el = await fixture<BhTextarea>(html`<bh-textarea></bh-textarea>`);
    expect(el.shadowRoot!.querySelector('[part="wrapper"]')).to.exist;
  });

  it('exposes textarea CSS part', async () => {
    const el = await fixture<BhTextarea>(html`<bh-textarea></bh-textarea>`);
    expect(el.shadowRoot!.querySelector('[part="textarea"]')).to.exist;
  });

  it('reflects error attribute', async () => {
    const el = await fixture<BhTextarea>(html`<bh-textarea error></bh-textarea>`);
    const textarea = el.shadowRoot!.querySelector('textarea')!;
    expect(textarea.getAttribute('aria-invalid')).to.equal('true');
  });

  it('reflects resize attribute', async () => {
    const el = await fixture<BhTextarea>(html`<bh-textarea resize="none"></bh-textarea>`);
    expect(el.getAttribute('resize')).to.equal('none');
  });
});
