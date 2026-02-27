import { html } from 'lit';
import { fixture, expect } from '@open-wc/testing';
import type { BhLed } from './bh-led.js';
import './bh-led.js';

describe('bh-led', () => {
  it('renders with default props', async () => {
    const el = await fixture<BhLed>(html`<bh-led></bh-led>`);
    expect(el.color).to.equal('success');
    expect(el.pulse).to.equal(false);
    expect(el.size).to.equal('md');
    expect(el.label).to.equal('');
  });

  it('reflects color attribute', async () => {
    const el = await fixture<BhLed>(html`<bh-led color="danger"></bh-led>`);
    expect(el.getAttribute('color')).to.equal('danger');
  });

  it('reflects size attribute', async () => {
    const el = await fixture<BhLed>(html`<bh-led size="sm"></bh-led>`);
    expect(el.getAttribute('size')).to.equal('sm');
  });

  it('reflects pulse attribute', async () => {
    const el = await fixture<BhLed>(html`<bh-led pulse></bh-led>`);
    expect(el.hasAttribute('pulse')).to.be.true;
    expect(el.pulse).to.be.true;
  });

  it('has role="status" on the LED span', async () => {
    const el = await fixture<BhLed>(html`<bh-led></bh-led>`);
    const span = el.shadowRoot!.querySelector('span');
    expect(span!.getAttribute('role')).to.equal('status');
  });

  it('sets aria-label from label property', async () => {
    const el = await fixture<BhLed>(
      html`<bh-led label="System online"></bh-led>`
    );
    const span = el.shadowRoot!.querySelector('span');
    expect(span!.getAttribute('aria-label')).to.equal('System online');
  });

  it('omits aria-label when label is empty', async () => {
    const el = await fixture<BhLed>(html`<bh-led></bh-led>`);
    const span = el.shadowRoot!.querySelector('span');
    expect(span!.hasAttribute('aria-label')).to.be.false;
  });

  it('exposes led CSS part', async () => {
    const el = await fixture<BhLed>(html`<bh-led></bh-led>`);
    const span = el.shadowRoot!.querySelector('[part="led"]');
    expect(span).to.exist;
  });

  it('renders warning color', async () => {
    const el = await fixture<BhLed>(html`<bh-led color="warning"></bh-led>`);
    expect(el.color).to.equal('warning');
  });

  it('renders primary color', async () => {
    const el = await fixture<BhLed>(html`<bh-led color="primary"></bh-led>`);
    expect(el.color).to.equal('primary');
  });
});
