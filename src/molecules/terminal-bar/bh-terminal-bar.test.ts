import { html } from 'lit';
import { fixture, expect } from '@open-wc/testing';
import type { BhTerminalBar } from './bh-terminal-bar.js';
import './bh-terminal-bar.js';

describe('bh-terminal-bar', () => {
  it('renders with default props', async () => {
    const el = await fixture<BhTerminalBar>(html`<bh-terminal-bar></bh-terminal-bar>`);
    expect(el.title).to.equal('Terminal');
    expect(el.status).to.equal('');
    expect(el.statusColor).to.equal('success');
  });

  it('displays title text', async () => {
    const el = await fixture<BhTerminalBar>(
      html`<bh-terminal-bar title="My Shell"></bh-terminal-bar>`
    );
    const title = el.shadowRoot!.querySelector('.title');
    expect(title).to.exist;
    expect(title!.textContent).to.equal('My Shell');
  });

  it('shows status when provided', async () => {
    const el = await fixture<BhTerminalBar>(
      html`<bh-terminal-bar status="connected"></bh-terminal-bar>`
    );
    const status = el.shadowRoot!.querySelector('.status');
    expect(status).to.exist;
    expect(status!.textContent!.trim()).to.equal('connected');
  });

  it('hides status when empty', async () => {
    const el = await fixture<BhTerminalBar>(html`<bh-terminal-bar></bh-terminal-bar>`);
    const status = el.shadowRoot!.querySelector('.status');
    expect(status).to.not.exist;
  });

  it('renders three LED dots', async () => {
    const el = await fixture<BhTerminalBar>(html`<bh-terminal-bar></bh-terminal-bar>`);
    const leds = el.shadowRoot!.querySelectorAll('.bar-left bh-led');
    expect(leds.length).to.equal(3);
    expect(leds[0].getAttribute('color')).to.equal('danger');
    expect(leds[1].getAttribute('color')).to.equal('warning');
    expect(leds[2].getAttribute('color')).to.equal('success');
  });

  it('reflects statusColor attribute', async () => {
    const el = await fixture<BhTerminalBar>(
      html`<bh-terminal-bar status-color="danger"></bh-terminal-bar>`
    );
    expect(el.getAttribute('status-color')).to.equal('danger');
    expect(el.statusColor).to.equal('danger');
  });

  it('exposes bar and title CSS parts', async () => {
    const el = await fixture<BhTerminalBar>(html`<bh-terminal-bar></bh-terminal-bar>`);
    const bar = el.shadowRoot!.querySelector('[part="bar"]');
    const title = el.shadowRoot!.querySelector('[part="title"]');
    expect(bar).to.exist;
    expect(title).to.exist;
  });
});
