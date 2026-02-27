import { html } from 'lit';
import { fixture, expect } from '@open-wc/testing';
import type { BhPanelHeader } from './bh-panel-header.js';
import './bh-panel-header.js';

describe('bh-panel-header', () => {
  it('renders with default props', async () => {
    const el = await fixture<BhPanelHeader>(html`<bh-panel-header></bh-panel-header>`);
    expect(el.label).to.equal('');
  });

  it('renders label text', async () => {
    const el = await fixture<BhPanelHeader>(
      html`<bh-panel-header label="Explorer"></bh-panel-header>`
    );
    const label = el.shadowRoot!.querySelector('.label');
    expect(label).to.exist;
    expect(label!.textContent).to.equal('Explorer');
  });

  it('exposes header CSS part', async () => {
    const el = await fixture<BhPanelHeader>(html`<bh-panel-header></bh-panel-header>`);
    const header = el.shadowRoot!.querySelector('[part="header"]');
    expect(header).to.exist;
  });

  it('exposes label CSS part', async () => {
    const el = await fixture<BhPanelHeader>(
      html`<bh-panel-header label="Test"></bh-panel-header>`
    );
    const label = el.shadowRoot!.querySelector('[part="label"]');
    expect(label).to.exist;
  });

  it('renders end slot for actions', async () => {
    const el = await fixture<BhPanelHeader>(
      html`<bh-panel-header label="Files"><button slot="end">+</button></bh-panel-header>`
    );
    const endSlot = el.shadowRoot!.querySelector('slot[name="end"]') as HTMLSlotElement;
    expect(endSlot).to.exist;
    expect(endSlot.assignedElements().length).to.equal(1);
  });
});
