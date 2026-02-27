import { html } from 'lit';
import { fixture, expect, oneEvent } from '@open-wc/testing';
import type { BhAppShell } from './bh-app-shell.js';
import type { BhActivityBar } from './bh-activity-bar.js';
import type { BhActivityItem } from './bh-activity-item.js';
import './bh-app-shell.js';
import './bh-activity-bar.js';
import './bh-activity-item.js';

describe('bh-activity-item', () => {
  it('renders with default props', async () => {
    const el = await fixture<BhActivityItem>(
      html`<bh-activity-item item-id="test" label="Test">X</bh-activity-item>`
    );
    expect(el.active).to.equal(false);
    expect(el.itemId).to.equal('test');
    expect(el.label).to.equal('Test');
  });

  it('reflects active attribute', async () => {
    const el = await fixture<BhActivityItem>(
      html`<bh-activity-item active item-id="test" label="Test">X</bh-activity-item>`
    );
    expect(el.active).to.equal(true);
    expect(el.hasAttribute('active')).to.equal(true);
  });

  it('sets aria-pressed based on active state', async () => {
    const el = await fixture<BhActivityItem>(
      html`<bh-activity-item active item-id="test" label="Test">X</bh-activity-item>`
    );
    const button = el.shadowRoot!.querySelector('button')!;
    expect(button.getAttribute('aria-pressed')).to.equal('true');
  });

  it('sets title from label', async () => {
    const el = await fixture<BhActivityItem>(
      html`<bh-activity-item item-id="test" label="Explorer">X</bh-activity-item>`
    );
    const button = el.shadowRoot!.querySelector('button')!;
    expect(button.title).to.equal('Explorer');
  });

  it('fires bh-activity-item-click on click', async () => {
    const el = await fixture<BhActivityItem>(
      html`<bh-activity-item item-id="files" label="Explorer">X</bh-activity-item>`
    );
    const button = el.shadowRoot!.querySelector('button')!;

    setTimeout(() => button.click());
    const event = await oneEvent(el, 'bh-activity-item-click');
    expect(event.detail.id).to.equal('files');
    expect(event.detail.label).to.equal('Explorer');
  });

  it('exposes button CSS part', async () => {
    const el = await fixture<BhActivityItem>(
      html`<bh-activity-item item-id="test" label="Test">X</bh-activity-item>`
    );
    const button = el.shadowRoot!.querySelector('[part="button"]');
    expect(button).to.exist;
  });
});

describe('bh-activity-bar', () => {
  it('renders with default props', async () => {
    const el = await fixture<BhActivityBar>(html`<bh-activity-bar></bh-activity-bar>`);
    expect(el.activeId).to.equal('');
  });

  it('renders slotted items', async () => {
    const el = await fixture<BhActivityBar>(html`
      <bh-activity-bar>
        <bh-activity-item item-id="files" label="Explorer">F</bh-activity-item>
        <bh-activity-item item-id="search" label="Search">S</bh-activity-item>
      </bh-activity-bar>
    `);
    const items = el.querySelectorAll('bh-activity-item');
    expect(items.length).to.equal(2);
  });

  it('fires bh-activity-change when item clicked', async () => {
    const el = await fixture<BhActivityBar>(html`
      <bh-activity-bar>
        <bh-activity-item item-id="files" label="Explorer">F</bh-activity-item>
      </bh-activity-bar>
    `);

    const item = el.querySelector('bh-activity-item')!;
    const button = item.shadowRoot!.querySelector('button')!;

    setTimeout(() => button.click());
    const event = await oneEvent(el, 'bh-activity-change');
    expect(event.detail.id).to.equal('files');
    expect(event.detail.label).to.equal('Explorer');
  });

  it('toggles active item off when clicked again', async () => {
    const el = await fixture<BhActivityBar>(html`
      <bh-activity-bar>
        <bh-activity-item item-id="files" label="Explorer">F</bh-activity-item>
      </bh-activity-bar>
    `);

    const item = el.querySelector('bh-activity-item')!;
    const button = item.shadowRoot!.querySelector('button')!;

    // First click activates
    setTimeout(() => button.click());
    await oneEvent(el, 'bh-activity-change');
    expect(el.activeId).to.equal('files');

    // Second click deactivates
    setTimeout(() => button.click());
    const event = await oneEvent(el, 'bh-activity-change');
    expect(event.detail.id).to.equal('');
    expect(el.activeId).to.equal('');
  });

  it('sets active via setActive method', async () => {
    const el = await fixture<BhActivityBar>(html`
      <bh-activity-bar>
        <bh-activity-item item-id="files" label="Explorer">F</bh-activity-item>
        <bh-activity-item item-id="search" label="Search">S</bh-activity-item>
      </bh-activity-bar>
    `);

    el.setActive('search');
    expect(el.activeId).to.equal('search');
  });

  it('exposes container CSS part', async () => {
    const el = await fixture<BhActivityBar>(html`<bh-activity-bar></bh-activity-bar>`);
    const container = el.shadowRoot!.querySelector('[part="container"]');
    expect(container).to.exist;
  });
});

describe('bh-app-shell', () => {
  it('renders with default props', async () => {
    const el = await fixture<BhAppShell>(html`<bh-app-shell></bh-app-shell>`);
    expect(el.sidebarOpen).to.equal(false);
  });

  it('reflects sidebar-open attribute', async () => {
    const el = await fixture<BhAppShell>(
      html`<bh-app-shell sidebar-open></bh-app-shell>`
    );
    expect(el.sidebarOpen).to.equal(true);
    expect(el.hasAttribute('sidebar-open')).to.equal(true);
  });

  it('renders named slots', async () => {
    const el = await fixture<BhAppShell>(html`
      <bh-app-shell>
        <div slot="activity">Activity</div>
        <div slot="sidebar">Sidebar</div>
        <div>Main</div>
        <div slot="status">Status</div>
      </bh-app-shell>
    `);

    const activitySlot = el.shadowRoot!.querySelector('slot[name="activity"]') as HTMLSlotElement;
    const sidebarSlot = el.shadowRoot!.querySelector('slot[name="sidebar"]') as HTMLSlotElement;
    const mainSlot = el.shadowRoot!.querySelector('slot:not([name])') as HTMLSlotElement;
    const statusSlot = el.shadowRoot!.querySelector('slot[name="status"]') as HTMLSlotElement;

    expect(activitySlot).to.exist;
    expect(sidebarSlot).to.exist;
    expect(mainSlot).to.exist;
    expect(statusSlot).to.exist;

    expect(activitySlot.assignedElements().length).to.equal(1);
    expect(sidebarSlot.assignedElements().length).to.equal(1);
    expect(mainSlot.assignedElements().length).to.equal(1);
    expect(statusSlot.assignedElements().length).to.equal(1);
  });

  it('uses CSS grid layout', async () => {
    const el = await fixture<BhAppShell>(html`<bh-app-shell></bh-app-shell>`);
    const grid = el.shadowRoot!.querySelector('.grid')!;
    const style = getComputedStyle(grid);
    expect(style.display).to.equal('grid');
  });

  it('exposes grid CSS part', async () => {
    const el = await fixture<BhAppShell>(html`<bh-app-shell></bh-app-shell>`);
    const grid = el.shadowRoot!.querySelector('[part="grid"]');
    expect(grid).to.exist;
  });
});
