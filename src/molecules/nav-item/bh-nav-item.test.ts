import { html } from 'lit';
import { fixture, expect, oneEvent } from '@open-wc/testing';
import type { BhNavItem } from './bh-nav-item.js';
import './bh-nav-item.js';

describe('bh-nav-item', () => {
  it('renders with default props', async () => {
    const el = await fixture<BhNavItem>(html`<bh-nav-item>Home</bh-nav-item>`);
    expect(el.active).to.equal(false);
    expect(el.disabled).to.equal(false);
    expect(el.href).to.equal('');
  });

  it('renders as button when no href', async () => {
    const el = await fixture<BhNavItem>(html`<bh-nav-item>Home</bh-nav-item>`);
    const button = el.shadowRoot!.querySelector('button');
    const link = el.shadowRoot!.querySelector('a');
    expect(button).to.exist;
    expect(link).to.not.exist;
  });

  it('renders as anchor when href provided', async () => {
    const el = await fixture<BhNavItem>(
      html`<bh-nav-item href="/home">Home</bh-nav-item>`
    );
    const link = el.shadowRoot!.querySelector('a');
    const button = el.shadowRoot!.querySelector('button');
    expect(link).to.exist;
    expect(button).to.not.exist;
    expect(link!.getAttribute('href')).to.equal('/home');
  });

  it('sets target on anchor', async () => {
    const el = await fixture<BhNavItem>(
      html`<bh-nav-item href="/home" target="_blank">Home</bh-nav-item>`
    );
    const link = el.shadowRoot!.querySelector('a')!;
    expect(link.getAttribute('target')).to.equal('_blank');
  });

  it('sets aria-current="page" when active on link', async () => {
    const el = await fixture<BhNavItem>(
      html`<bh-nav-item href="/home" active>Home</bh-nav-item>`
    );
    const link = el.shadowRoot!.querySelector('a')!;
    expect(link.getAttribute('aria-current')).to.equal('page');
  });

  it('sets aria-current="page" when active on button', async () => {
    const el = await fixture<BhNavItem>(
      html`<bh-nav-item active>Home</bh-nav-item>`
    );
    const button = el.shadowRoot!.querySelector('button')!;
    expect(button.getAttribute('aria-current')).to.equal('page');
  });

  it('does not set aria-current when not active', async () => {
    const el = await fixture<BhNavItem>(html`<bh-nav-item>Home</bh-nav-item>`);
    const button = el.shadowRoot!.querySelector('button')!;
    expect(button.hasAttribute('aria-current')).to.equal(false);
  });

  it('disables the button', async () => {
    const el = await fixture<BhNavItem>(
      html`<bh-nav-item disabled>Home</bh-nav-item>`
    );
    const button = el.shadowRoot!.querySelector('button') as HTMLButtonElement;
    expect(button.disabled).to.equal(true);
  });

  it('sets aria-disabled on link when disabled', async () => {
    const el = await fixture<BhNavItem>(
      html`<bh-nav-item href="/home" disabled>Home</bh-nav-item>`
    );
    const link = el.shadowRoot!.querySelector('a')!;
    expect(link.getAttribute('aria-disabled')).to.equal('true');
  });

  it('fires bh-click event', async () => {
    const el = await fixture<BhNavItem>(html`<bh-nav-item>Home</bh-nav-item>`);
    const button = el.shadowRoot!.querySelector('button')!;

    setTimeout(() => button.click());
    const event = await oneEvent(el, 'bh-click');
    expect(event).to.exist;
    expect(event.detail.originalEvent).to.be.instanceOf(MouseEvent);
  });

  it('does not fire bh-click when disabled', async () => {
    const el = await fixture<BhNavItem>(
      html`<bh-nav-item disabled>Home</bh-nav-item>`
    );
    let fired = false;
    el.addEventListener('bh-click', () => { fired = true; });

    const button = el.shadowRoot!.querySelector('button')!;
    button.click();

    await new Promise((r) => setTimeout(r, 0));
    expect(fired).to.equal(false);
  });

  it('renders prefix slot', async () => {
    const el = await fixture<BhNavItem>(html`
      <bh-nav-item>
        <span slot="prefix">I</span>
        Home
      </bh-nav-item>
    `);
    const slot = el.shadowRoot!.querySelector('slot[name="prefix"]') as HTMLSlotElement;
    expect(slot).to.exist;
    expect(slot.assignedElements().length).to.equal(1);
  });

  it('renders suffix slot', async () => {
    const el = await fixture<BhNavItem>(html`
      <bh-nav-item>
        Home
        <span slot="suffix">3</span>
      </bh-nav-item>
    `);
    const slot = el.shadowRoot!.querySelector('slot[name="suffix"]') as HTMLSlotElement;
    expect(slot).to.exist;
    expect(slot.assignedElements().length).to.equal(1);
  });

  it('exposes item CSS part on button', async () => {
    const el = await fixture<BhNavItem>(html`<bh-nav-item>Home</bh-nav-item>`);
    const part = el.shadowRoot!.querySelector('[part="item"]');
    expect(part).to.exist;
    expect(part!.tagName.toLowerCase()).to.equal('button');
  });

  it('exposes item CSS part on anchor', async () => {
    const el = await fixture<BhNavItem>(
      html`<bh-nav-item href="/home">Home</bh-nav-item>`
    );
    const part = el.shadowRoot!.querySelector('[part="item"]');
    expect(part).to.exist;
    expect(part!.tagName.toLowerCase()).to.equal('a');
  });
});
