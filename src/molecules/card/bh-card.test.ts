import { html } from 'lit';
import { fixture, expect } from '@open-wc/testing';
import type { BhCard } from './bh-card.js';
import './bh-card.js';

describe('bh-card', () => {
  it('renders with default props', async () => {
    const el = await fixture<BhCard>(html`<bh-card>Content</bh-card>`);
    expect(el.variant).to.equal('default');
    expect(el.padding).to.equal('md');
  });

  it('reflects variant attribute', async () => {
    const el = await fixture<BhCard>(
      html`<bh-card variant="outlined">Content</bh-card>`
    );
    expect(el.getAttribute('variant')).to.equal('outlined');
    expect(el.variant).to.equal('outlined');
  });

  it('reflects padding attribute', async () => {
    const el = await fixture<BhCard>(
      html`<bh-card padding="lg">Content</bh-card>`
    );
    expect(el.getAttribute('padding')).to.equal('lg');
  });

  it('renders body content in default slot', async () => {
    const el = await fixture<BhCard>(
      html`<bh-card>Body text</bh-card>`
    );
    expect(el.textContent!.trim()).to.equal('Body text');
  });

  it('renders header slot when content provided', async () => {
    const el = await fixture<BhCard>(html`
      <bh-card>
        <span slot="header">Title</span>
        Body
      </bh-card>
    `);
    await el.updateComplete;
    const header = el.shadowRoot!.querySelector('.header');
    expect(header).to.exist;
  });

  it('does not render header wrapper when no header content', async () => {
    const el = await fixture<BhCard>(html`<bh-card>Body</bh-card>`);
    await el.updateComplete;
    const header = el.shadowRoot!.querySelector('.header');
    expect(header).to.not.exist;
  });

  it('renders footer slot when content provided', async () => {
    const el = await fixture<BhCard>(html`
      <bh-card>
        Body
        <span slot="footer">Actions</span>
      </bh-card>
    `);
    await el.updateComplete;
    const footer = el.shadowRoot!.querySelector('.footer');
    expect(footer).to.exist;
  });

  it('does not render footer wrapper when no footer content', async () => {
    const el = await fixture<BhCard>(html`<bh-card>Body</bh-card>`);
    await el.updateComplete;
    const footer = el.shadowRoot!.querySelector('.footer');
    expect(footer).to.not.exist;
  });

  it('exposes card CSS part', async () => {
    const el = await fixture<BhCard>(html`<bh-card>Content</bh-card>`);
    const card = el.shadowRoot!.querySelector('[part="card"]');
    expect(card).to.exist;
  });

  it('exposes body CSS part', async () => {
    const el = await fixture<BhCard>(html`<bh-card>Content</bh-card>`);
    const body = el.shadowRoot!.querySelector('[part="body"]');
    expect(body).to.exist;
  });

  it('exposes header CSS part when header present', async () => {
    const el = await fixture<BhCard>(html`
      <bh-card><span slot="header">Title</span>Body</bh-card>
    `);
    await el.updateComplete;
    const header = el.shadowRoot!.querySelector('[part="header"]');
    expect(header).to.exist;
  });

  it('exposes footer CSS part when footer present', async () => {
    const el = await fixture<BhCard>(html`
      <bh-card>Body<span slot="footer">Actions</span></bh-card>
    `);
    await el.updateComplete;
    const footer = el.shadowRoot!.querySelector('[part="footer"]');
    expect(footer).to.exist;
  });

  it('renders all three sections together', async () => {
    const el = await fixture<BhCard>(html`
      <bh-card>
        <span slot="header">Header</span>
        Body Content
        <span slot="footer">Footer</span>
      </bh-card>
    `);
    await el.updateComplete;
    expect(el.shadowRoot!.querySelector('.header')).to.exist;
    expect(el.shadowRoot!.querySelector('.body')).to.exist;
    expect(el.shadowRoot!.querySelector('.footer')).to.exist;
  });

  it('renders header when only header-actions has content', async () => {
    const el = await fixture<BhCard>(html`
      <bh-card>
        <span slot="header-actions">Action</span>
        Body
      </bh-card>
    `);
    await el.updateComplete;
    const header = el.shadowRoot!.querySelector('.header');
    expect(header).to.exist;
  });

  it('renders header-actions slot content', async () => {
    const el = await fixture<BhCard>(html`
      <bh-card>
        <span slot="header">Title</span>
        <span slot="header-actions">Edit</span>
        Body
      </bh-card>
    `);
    await el.updateComplete;
    const actionsSlot = el.shadowRoot!.querySelector('slot[name="header-actions"]') as HTMLSlotElement;
    expect(actionsSlot).to.exist;
    expect(actionsSlot.assignedElements().length).to.equal(1);
  });

  it('header uses flex layout with space-between', async () => {
    const el = await fixture<BhCard>(html`
      <bh-card>
        <span slot="header">Title</span>
        <span slot="header-actions">Action</span>
        Body
      </bh-card>
    `);
    await el.updateComplete;
    const header = el.shadowRoot!.querySelector('.header') as HTMLElement;
    const style = getComputedStyle(header);
    expect(style.display).to.equal('flex');
    expect(style.justifyContent).to.equal('space-between');
  });

  it('defaults cornerAccents to false', async () => {
    const el = await fixture<BhCard>(html`<bh-card>Content</bh-card>`);
    expect(el.cornerAccents).to.be.false;
    expect(el.hasAttribute('corner-accents')).to.be.false;
  });

  it('reflects corner-accents attribute', async () => {
    const el = await fixture<BhCard>(
      html`<bh-card corner-accents>Content</bh-card>`
    );
    expect(el.cornerAccents).to.be.true;
    expect(el.hasAttribute('corner-accents')).to.be.true;
  });

  it('card has position relative for accent pseudo-elements', async () => {
    const el = await fixture<BhCard>(
      html`<bh-card corner-accents>Content</bh-card>`
    );
    const card = el.shadowRoot!.querySelector('.card') as HTMLElement;
    const style = getComputedStyle(card);
    expect(style.position).to.equal('relative');
  });
});
