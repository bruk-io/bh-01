import { html } from 'lit';
import { fixture, expect, oneEvent } from '@open-wc/testing';
import type { BhButton } from './bh-button.js';
import './bh-button.js';

describe('bh-button', () => {
  it('renders with default props', async () => {
    const el = await fixture<BhButton>(html`<bh-button>Click me</bh-button>`);
    expect(el.variant).to.equal('primary');
    expect(el.size).to.equal('md');
    expect(el.disabled).to.equal(false);
  });

  it('reflects variant attribute', async () => {
    const el = await fixture<BhButton>(
      html`<bh-button variant="secondary">Click</bh-button>`
    );
    expect(el.getAttribute('variant')).to.equal('secondary');
    expect(el.variant).to.equal('secondary');
  });

  it('reflects size attribute', async () => {
    const el = await fixture<BhButton>(
      html`<bh-button size="lg">Click</bh-button>`
    );
    expect(el.getAttribute('size')).to.equal('lg');
  });

  it('sets disabled state', async () => {
    const el = await fixture<BhButton>(
      html`<bh-button disabled>Click</bh-button>`
    );
    const button = el.shadowRoot!.querySelector('button')!;
    expect(button.disabled).to.equal(true);
    expect(button.getAttribute('aria-disabled')).to.equal('true');
  });

  it('uses label as aria-label', async () => {
    const el = await fixture<BhButton>(
      html`<bh-button label="Close dialog">X</bh-button>`
    );
    const button = el.shadowRoot!.querySelector('button')!;
    expect(button.getAttribute('aria-label')).to.equal('Close dialog');
  });

  it('fires bh-click event', async () => {
    const el = await fixture<BhButton>(html`<bh-button>Click</bh-button>`);
    const button = el.shadowRoot!.querySelector('button')!;

    setTimeout(() => button.click());
    const event = await oneEvent(el, 'bh-click');
    expect(event).to.exist;
    expect(event.detail.originalEvent).to.be.instanceOf(MouseEvent);
  });

  it('does not fire bh-click when disabled', async () => {
    const el = await fixture<BhButton>(
      html`<bh-button disabled>Click</bh-button>`
    );
    let fired = false;
    el.addEventListener('bh-click', () => { fired = true; });

    const button = el.shadowRoot!.querySelector('button')!;
    button.click();

    // Wait a tick to ensure event would have fired
    await new Promise((r) => setTimeout(r, 0));
    expect(fired).to.equal(false);
  });

  it('renders default slot content', async () => {
    const el = await fixture<BhButton>(
      html`<bh-button>Hello</bh-button>`
    );
    expect(el.textContent!.trim()).to.equal('Hello');
  });

  it('renders prefix and suffix slots', async () => {
    const el = await fixture<BhButton>(html`
      <bh-button>
        <span slot="prefix">P</span>
        Main
        <span slot="suffix">S</span>
      </bh-button>
    `);
    const prefixSlot = el.shadowRoot!.querySelector('slot[name="prefix"]') as HTMLSlotElement;
    const suffixSlot = el.shadowRoot!.querySelector('slot[name="suffix"]') as HTMLSlotElement;
    expect(prefixSlot).to.exist;
    expect(suffixSlot).to.exist;
    expect(prefixSlot.assignedElements().length).to.equal(1);
    expect(suffixSlot.assignedElements().length).to.equal(1);
  });

  it('exposes button CSS part', async () => {
    const el = await fixture<BhButton>(html`<bh-button>Click</bh-button>`);
    const button = el.shadowRoot!.querySelector('[part="button"]');
    expect(button).to.exist;
  });

  it('sets button type attribute', async () => {
    const el = await fixture<BhButton>(
      html`<bh-button type="submit">Submit</bh-button>`
    );
    const button = el.shadowRoot!.querySelector('button')!;
    expect(button.type).to.equal('submit');
  });

  it('reflects icon-only attribute', async () => {
    const el = await fixture<BhButton>(
      html`<bh-button icon-only label="Close">X</bh-button>`
    );
    expect(el.iconOnly).to.equal(true);
    expect(el.hasAttribute('icon-only')).to.equal(true);
  });

  it('visually hides label text in icon-only mode', async () => {
    const el = await fixture<BhButton>(
      html`<bh-button icon-only label="Close">X</bh-button>`
    );
    const labelSpan = el.shadowRoot!.querySelector('.label') as HTMLElement;
    const style = getComputedStyle(labelSpan);
    expect(style.position).to.equal('absolute');
    expect(style.width).to.equal('1px');
    expect(style.overflow).to.equal('hidden');
  });

  it('applies equal padding in icon-only mode', async () => {
    const el = await fixture<BhButton>(
      html`<bh-button icon-only label="Close">X</bh-button>`
    );
    const button = el.shadowRoot!.querySelector('button')!;
    const style = getComputedStyle(button);
    expect(style.paddingLeft).to.equal(style.paddingTop);
  });
});
