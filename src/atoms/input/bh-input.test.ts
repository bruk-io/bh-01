import { html } from 'lit';
import { fixture, expect, oneEvent } from '@open-wc/testing';
import type { BhInput } from './bh-input.js';
import './bh-input.js';

describe('bh-input', () => {
  it('renders with default props', async () => {
    const el = await fixture<BhInput>(html`<bh-input></bh-input>`);
    expect(el.size).to.equal('md');
    expect(el.type).to.equal('text');
    expect(el.value).to.equal('');
    expect(el.disabled).to.equal(false);
  });

  it('sets placeholder', async () => {
    const el = await fixture<BhInput>(
      html`<bh-input placeholder="Enter text"></bh-input>`
    );
    const input = el.shadowRoot!.querySelector('input')!;
    expect(input.placeholder).to.equal('Enter text');
  });

  it('reflects size attribute', async () => {
    const el = await fixture<BhInput>(
      html`<bh-input size="lg"></bh-input>`
    );
    expect(el.getAttribute('size')).to.equal('lg');
  });

  it('sets disabled state', async () => {
    const el = await fixture<BhInput>(
      html`<bh-input disabled></bh-input>`
    );
    const input = el.shadowRoot!.querySelector('input')!;
    expect(input.disabled).to.equal(true);
  });

  it('sets readonly state', async () => {
    const el = await fixture<BhInput>(
      html`<bh-input readonly></bh-input>`
    );
    const input = el.shadowRoot!.querySelector('input')!;
    expect(input.readOnly).to.equal(true);
  });

  it('sets required state', async () => {
    const el = await fixture<BhInput>(
      html`<bh-input required></bh-input>`
    );
    const input = el.shadowRoot!.querySelector('input')!;
    expect(input.required).to.equal(true);
  });

  it('sets aria-invalid when error is true', async () => {
    const el = await fixture<BhInput>(
      html`<bh-input error></bh-input>`
    );
    const input = el.shadowRoot!.querySelector('input')!;
    expect(input.getAttribute('aria-invalid')).to.equal('true');
  });

  it('uses label as aria-label', async () => {
    const el = await fixture<BhInput>(
      html`<bh-input label="Email address"></bh-input>`
    );
    const input = el.shadowRoot!.querySelector('input')!;
    expect(input.getAttribute('aria-label')).to.equal('Email address');
  });

  it('fires bh-input event on input', async () => {
    const el = await fixture<BhInput>(html`<bh-input></bh-input>`);
    const input = el.shadowRoot!.querySelector('input')!;

    setTimeout(() => {
      input.value = 'hello';
      input.dispatchEvent(new InputEvent('input', { bubbles: true }));
    });

    const event = await oneEvent(el, 'bh-input');
    expect(event.detail.value).to.equal('hello');
  });

  it('fires bh-change event on change', async () => {
    const el = await fixture<BhInput>(html`<bh-input></bh-input>`);
    const input = el.shadowRoot!.querySelector('input')!;

    setTimeout(() => {
      input.value = 'world';
      input.dispatchEvent(new Event('change', { bubbles: true }));
    });

    const event = await oneEvent(el, 'bh-change');
    expect(event.detail.value).to.equal('world');
  });

  it('exposes input CSS part', async () => {
    const el = await fixture<BhInput>(html`<bh-input></bh-input>`);
    const input = el.shadowRoot!.querySelector('[part="input"]');
    expect(input).to.exist;
  });

  it('sets input type', async () => {
    const el = await fixture<BhInput>(
      html`<bh-input type="password"></bh-input>`
    );
    const input = el.shadowRoot!.querySelector('input')!;
    expect(input.type).to.equal('password');
  });

  it('renders prefix slot content', async () => {
    const el = await fixture<BhInput>(html`
      <bh-input>
        <span slot="prefix">P</span>
      </bh-input>
    `);
    const slot = el.shadowRoot!.querySelector('slot[name="prefix"]') as HTMLSlotElement;
    expect(slot).to.exist;
    expect(slot.assignedElements().length).to.equal(1);
  });

  it('renders suffix slot content', async () => {
    const el = await fixture<BhInput>(html`
      <bh-input>
        <span slot="suffix">S</span>
      </bh-input>
    `);
    const slot = el.shadowRoot!.querySelector('slot[name="suffix"]') as HTMLSlotElement;
    expect(slot).to.exist;
    expect(slot.assignedElements().length).to.equal(1);
  });

  it('exposes wrapper CSS part', async () => {
    const el = await fixture<BhInput>(html`<bh-input></bh-input>`);
    const wrapper = el.shadowRoot!.querySelector('[part="wrapper"]');
    expect(wrapper).to.exist;
  });
});
