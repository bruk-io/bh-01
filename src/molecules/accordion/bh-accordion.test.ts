import { html } from 'lit';
import { fixture, expect, oneEvent } from '@open-wc/testing';
import type { BhAccordion, BhAccordionItem } from './bh-accordion.js';
import './bh-accordion.js';

describe('bh-accordion', () => {
  it('renders with default props', async () => {
    const el = await fixture<BhAccordion>(
      html`<bh-accordion></bh-accordion>`
    );
    expect(el.multiple).to.equal(false);
  });

  it('reflects multiple attribute', async () => {
    const el = await fixture<BhAccordion>(
      html`<bh-accordion multiple></bh-accordion>`
    );
    expect(el.hasAttribute('multiple')).to.be.true;
  });
});

describe('bh-accordion-item', () => {
  it('renders with default props', async () => {
    const el = await fixture<BhAccordionItem>(
      html`<bh-accordion-item label="Section 1"></bh-accordion-item>`
    );
    expect(el.label).to.equal('Section 1');
    expect(el.open).to.equal(false);
  });

  it('displays label text', async () => {
    const el = await fixture<BhAccordionItem>(
      html`<bh-accordion-item label="Test Label"></bh-accordion-item>`
    );
    const header = el.shadowRoot!.querySelector('.header')!;
    expect(header.textContent).to.contain('Test Label');
  });

  it('reflects open attribute', async () => {
    const el = await fixture<BhAccordionItem>(
      html`<bh-accordion-item open label="Open"></bh-accordion-item>`
    );
    expect(el.hasAttribute('open')).to.be.true;
  });

  it('sets aria-expanded', async () => {
    const el = await fixture<BhAccordionItem>(
      html`<bh-accordion-item label="Test"></bh-accordion-item>`
    );
    const header = el.shadowRoot!.querySelector('.header')!;
    expect(header.getAttribute('aria-expanded')).to.equal('false');
  });

  it('sets aria-expanded to true when open', async () => {
    const el = await fixture<BhAccordionItem>(
      html`<bh-accordion-item open label="Test"></bh-accordion-item>`
    );
    const header = el.shadowRoot!.querySelector('.header')!;
    expect(header.getAttribute('aria-expanded')).to.equal('true');
  });

  it('fires bh-toggle event on click', async () => {
    const el = await fixture<BhAccordionItem>(
      html`<bh-accordion-item label="Click me"></bh-accordion-item>`
    );
    const header = el.shadowRoot!.querySelector('.header') as HTMLElement;

    setTimeout(() => header.click());

    const event = await oneEvent(el, 'bh-toggle');
    expect(event.detail.open).to.equal(true);
    expect(event.detail.label).to.equal('Click me');
  });

  it('toggles open state on click', async () => {
    const el = await fixture<BhAccordionItem>(
      html`<bh-accordion-item label="Toggle"></bh-accordion-item>`
    );
    const header = el.shadowRoot!.querySelector('.header') as HTMLElement;

    header.click();
    expect(el.open).to.equal(true);

    header.click();
    expect(el.open).to.equal(false);
  });

  it('exposes header CSS part', async () => {
    const el = await fixture<BhAccordionItem>(
      html`<bh-accordion-item label="Test"></bh-accordion-item>`
    );
    const header = el.shadowRoot!.querySelector('[part="header"]');
    expect(header).to.exist;
  });

  it('exposes content CSS part', async () => {
    const el = await fixture<BhAccordionItem>(
      html`<bh-accordion-item label="Test"></bh-accordion-item>`
    );
    const content = el.shadowRoot!.querySelector('[part="content"]');
    expect(content).to.exist;
  });

  it('renders chevron', async () => {
    const el = await fixture<BhAccordionItem>(
      html`<bh-accordion-item label="Test"></bh-accordion-item>`
    );
    const chevron = el.shadowRoot!.querySelector('.chevron');
    expect(chevron).to.exist;
  });
});

describe('bh-accordion single mode', () => {
  it('closes other items when one is opened', async () => {
    const el = await fixture<BhAccordion>(html`
      <bh-accordion>
        <bh-accordion-item label="A" open></bh-accordion-item>
        <bh-accordion-item label="B"></bh-accordion-item>
      </bh-accordion>
    `);

    const items = el.querySelectorAll('bh-accordion-item');
    const headerB = items[1].shadowRoot!.querySelector('.header') as HTMLElement;

    headerB.click();
    await el.updateComplete;

    expect(items[0].open).to.equal(false);
    expect(items[1].open).to.equal(true);
  });

  it('allows multiple open when multiple is set', async () => {
    const el = await fixture<BhAccordion>(html`
      <bh-accordion multiple>
        <bh-accordion-item label="A" open></bh-accordion-item>
        <bh-accordion-item label="B"></bh-accordion-item>
      </bh-accordion>
    `);

    const items = el.querySelectorAll('bh-accordion-item');
    const headerB = items[1].shadowRoot!.querySelector('.header') as HTMLElement;

    headerB.click();
    await el.updateComplete;

    expect(items[0].open).to.equal(true);
    expect(items[1].open).to.equal(true);
  });
});
