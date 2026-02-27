import { html } from 'lit';
import { fixture, expect } from '@open-wc/testing';
import type { BhTooltip } from './bh-tooltip.js';
import './bh-tooltip.js';

describe('bh-tooltip', () => {
  it('renders with default props', async () => {
    const el = await fixture<BhTooltip>(html`<bh-tooltip content="Help">Hover me</bh-tooltip>`);
    expect(el.placement).to.equal('top');
    expect(el.content).to.equal('Help');
  });

  it('renders tooltip text', async () => {
    const el = await fixture<BhTooltip>(html`<bh-tooltip content="Tooltip text">Trigger</bh-tooltip>`);
    const tooltip = el.shadowRoot!.querySelector('[role="tooltip"]')!;
    expect(tooltip.textContent).to.equal('Tooltip text');
  });

  it('exposes tooltip CSS part', async () => {
    const el = await fixture<BhTooltip>(html`<bh-tooltip content="Hi">Test</bh-tooltip>`);
    expect(el.shadowRoot!.querySelector('[part="tooltip"]')).to.exist;
  });

  it('has role="tooltip" on popup', async () => {
    const el = await fixture<BhTooltip>(html`<bh-tooltip content="Info">Test</bh-tooltip>`);
    expect(el.shadowRoot!.querySelector('[role="tooltip"]')).to.exist;
  });

  it('reflects placement attribute', async () => {
    const el = await fixture<BhTooltip>(html`<bh-tooltip content="Help" placement="bottom">Test</bh-tooltip>`);
    expect(el.placement).to.equal('bottom');
    expect(el.getAttribute('placement')).to.equal('bottom');
  });

  it('renders slot content as trigger', async () => {
    const el = await fixture<BhTooltip>(html`<bh-tooltip content="Help">Click me</bh-tooltip>`);
    expect(el.textContent!.trim()).to.equal('Click me');
  });

  it('supports all placement values', async () => {
    for (const placement of ['top', 'bottom', 'left', 'right']) {
      const el = await fixture<BhTooltip>(
        html`<bh-tooltip content="Test" placement=${placement}>T</bh-tooltip>`
      );
      expect(el.getAttribute('placement')).to.equal(placement);
    }
  });
});
