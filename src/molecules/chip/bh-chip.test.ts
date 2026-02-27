import { html } from 'lit';
import { fixture, expect, oneEvent } from '@open-wc/testing';
import type { BhChip } from './bh-chip.js';
import './bh-chip.js';

describe('bh-chip', () => {
  it('renders with default props', async () => {
    const el = await fixture<BhChip>(html`<bh-chip>Tag</bh-chip>`);
    expect(el.variant).to.equal('default');
    expect(el.size).to.equal('md');
    expect(el.dismissible).to.equal(false);
    expect(el.selected).to.equal(false);
    expect(el.disabled).to.equal(false);
  });

  it('reflects variant attribute', async () => {
    const el = await fixture<BhChip>(
      html`<bh-chip variant="primary">Tag</bh-chip>`
    );
    expect(el.getAttribute('variant')).to.equal('primary');
    expect(el.variant).to.equal('primary');
  });

  it('reflects size attribute', async () => {
    const el = await fixture<BhChip>(
      html`<bh-chip size="sm">Tag</bh-chip>`
    );
    expect(el.getAttribute('size')).to.equal('sm');
  });

  it('renders as a button element', async () => {
    const el = await fixture<BhChip>(html`<bh-chip>Tag</bh-chip>`);
    const button = el.shadowRoot!.querySelector('button[part="chip"]');
    expect(button).to.exist;
  });

  it('fires bh-click event', async () => {
    const el = await fixture<BhChip>(html`<bh-chip>Tag</bh-chip>`);
    const button = el.shadowRoot!.querySelector('button[part="chip"]')!;

    setTimeout(() => button.click());
    const event = await oneEvent(el, 'bh-click');
    expect(event).to.exist;
    expect(event.detail.originalEvent).to.be.instanceOf(MouseEvent);
  });

  it('does not fire bh-click when disabled', async () => {
    const el = await fixture<BhChip>(
      html`<bh-chip disabled>Tag</bh-chip>`
    );
    let fired = false;
    el.addEventListener('bh-click', () => { fired = true; });

    const button = el.shadowRoot!.querySelector('button[part="chip"]')!;
    button.click();

    await new Promise((r) => setTimeout(r, 0));
    expect(fired).to.equal(false);
  });

  it('sets aria-pressed when selected', async () => {
    const el = await fixture<BhChip>(
      html`<bh-chip selected>Tag</bh-chip>`
    );
    const button = el.shadowRoot!.querySelector('button[part="chip"]')!;
    expect(button.getAttribute('aria-pressed')).to.equal('true');
  });

  it('does not set aria-pressed when not selected', async () => {
    const el = await fixture<BhChip>(html`<bh-chip>Tag</bh-chip>`);
    const button = el.shadowRoot!.querySelector('button[part="chip"]')!;
    expect(button.hasAttribute('aria-pressed')).to.equal(false);
  });

  it('renders dismiss button when dismissible', async () => {
    const el = await fixture<BhChip>(
      html`<bh-chip dismissible>Tag</bh-chip>`
    );
    const dismiss = el.shadowRoot!.querySelector('.dismiss');
    expect(dismiss).to.exist;
    expect(dismiss!.getAttribute('aria-label')).to.equal('Remove');
  });

  it('does not render dismiss button when not dismissible', async () => {
    const el = await fixture<BhChip>(html`<bh-chip>Tag</bh-chip>`);
    const dismiss = el.shadowRoot!.querySelector('.dismiss');
    expect(dismiss).to.not.exist;
  });

  it('fires bh-dismiss event on dismiss click', async () => {
    const el = await fixture<BhChip>(
      html`<bh-chip dismissible>Tag</bh-chip>`
    );
    const dismiss = el.shadowRoot!.querySelector('.dismiss') as HTMLElement;

    setTimeout(() => dismiss.click());
    const event = await oneEvent(el, 'bh-dismiss');
    expect(event).to.exist;
  });

  it('dismiss click does not fire bh-click', async () => {
    const el = await fixture<BhChip>(
      html`<bh-chip dismissible>Tag</bh-chip>`
    );
    let clickFired = false;
    el.addEventListener('bh-click', () => { clickFired = true; });

    const dismiss = el.shadowRoot!.querySelector('.dismiss') as HTMLElement;
    dismiss.click();

    await new Promise((r) => setTimeout(r, 0));
    expect(clickFired).to.equal(false);
  });

  it('disables the button when disabled', async () => {
    const el = await fixture<BhChip>(
      html`<bh-chip disabled>Tag</bh-chip>`
    );
    const button = el.shadowRoot!.querySelector('button[part="chip"]') as HTMLButtonElement;
    expect(button.disabled).to.equal(true);
  });

  it('renders prefix slot', async () => {
    const el = await fixture<BhChip>(html`
      <bh-chip>
        <span slot="prefix">*</span>
        Tag
      </bh-chip>
    `);
    const slot = el.shadowRoot!.querySelector('slot[name="prefix"]') as HTMLSlotElement;
    expect(slot).to.exist;
    expect(slot.assignedElements().length).to.equal(1);
  });

  it('exposes chip CSS part', async () => {
    const el = await fixture<BhChip>(html`<bh-chip>Tag</bh-chip>`);
    const chip = el.shadowRoot!.querySelector('[part="chip"]');
    expect(chip).to.exist;
  });

  it('exposes dismiss CSS part', async () => {
    const el = await fixture<BhChip>(
      html`<bh-chip dismissible>Tag</bh-chip>`
    );
    const dismiss = el.shadowRoot!.querySelector('[part="dismiss"]');
    expect(dismiss).to.exist;
  });
});
