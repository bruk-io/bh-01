import { html } from 'lit';
import { fixture, expect, oneEvent } from '@open-wc/testing';
import type { BhTab } from './bh-tab.js';
import type { BhTabBar } from './bh-tab-bar.js';
import type { BhTabPanel } from './bh-tab-panel.js';
import type { BhTabs } from './bh-tabs.js';
import './bh-tab.js';
import './bh-tab-bar.js';
import './bh-tab-panel.js';
import './bh-tabs.js';

describe('bh-tab', () => {
  it('renders with default props', async () => {
    const el = await fixture<BhTab>(html`<bh-tab tab-id="t1" label="Tab 1"></bh-tab>`);
    expect(el.tabId).to.equal('t1');
    expect(el.label).to.equal('Tab 1');
    expect(el.active).to.equal(false);
  });

  it('reflects active attribute', async () => {
    const el = await fixture<BhTab>(html`<bh-tab tab-id="t1" active></bh-tab>`);
    expect(el.active).to.equal(true);
    expect(el.hasAttribute('active')).to.equal(true);
  });

  it('fires bh-tab-click event', async () => {
    const el = await fixture<BhTab>(html`<bh-tab tab-id="t1" label="Tab 1"></bh-tab>`);
    const button = el.shadowRoot!.querySelector('button')!;

    setTimeout(() => button.click());
    const event = await oneEvent(el, 'bh-tab-click');
    expect(event).to.exist;
    expect(event.detail.tabId).to.equal('t1');
  });

  it('sets aria-selected based on active state', async () => {
    const el = await fixture<BhTab>(html`<bh-tab tab-id="t1" active></bh-tab>`);
    const button = el.shadowRoot!.querySelector('button')!;
    expect(button.getAttribute('aria-selected')).to.equal('true');
  });
});

describe('bh-tab-bar', () => {
  it('renders with default props', async () => {
    const el = await fixture<BhTabBar>(html`
      <bh-tab-bar>
        <bh-tab tab-id="t1" label="Tab 1"></bh-tab>
        <bh-tab tab-id="t2" label="Tab 2"></bh-tab>
      </bh-tab-bar>
    `);
    expect(el.active).to.equal('');
  });

  it('syncs active state to child tabs', async () => {
    const el = await fixture<BhTabBar>(html`
      <bh-tab-bar active="t2">
        <bh-tab tab-id="t1" label="Tab 1"></bh-tab>
        <bh-tab tab-id="t2" label="Tab 2"></bh-tab>
      </bh-tab-bar>
    `);
    const tabs = el.querySelectorAll('bh-tab');
    expect(tabs[0].active).to.equal(false);
    expect(tabs[1].active).to.equal(true);
  });

  it('fires bh-tab-change on tab click', async () => {
    const el = await fixture<BhTabBar>(html`
      <bh-tab-bar>
        <bh-tab tab-id="t1" label="Tab 1"></bh-tab>
      </bh-tab-bar>
    `);
    const tab = el.querySelector('bh-tab')!;
    const button = tab.shadowRoot!.querySelector('button')!;

    setTimeout(() => button.click());
    const event = await oneEvent(el, 'bh-tab-change');
    expect(event.detail.tabId).to.equal('t1');
  });
});

describe('bh-tab-panel', () => {
  it('is hidden when not active', async () => {
    const el = await fixture<BhTabPanel>(html`
      <bh-tab-panel tab-id="t1">Content</bh-tab-panel>
    `);
    expect(el.active).to.equal(false);
    expect(getComputedStyle(el).display).to.equal('none');
  });

  it('is visible when active', async () => {
    const el = await fixture<BhTabPanel>(html`
      <bh-tab-panel tab-id="t1" active>Content</bh-tab-panel>
    `);
    expect(el.active).to.equal(true);
    expect(getComputedStyle(el).display).to.not.equal('none');
  });
});

describe('bh-tabs', () => {
  it('renders with tab-bar and panels', async () => {
    const el = await fixture<BhTabs>(html`
      <bh-tabs active="t1">
        <bh-tab-bar slot="tab-bar">
          <bh-tab tab-id="t1" label="Tab 1"></bh-tab>
          <bh-tab tab-id="t2" label="Tab 2"></bh-tab>
        </bh-tab-bar>
        <bh-tab-panel tab-id="t1">Panel 1</bh-tab-panel>
        <bh-tab-panel tab-id="t2">Panel 2</bh-tab-panel>
      </bh-tabs>
    `);
    expect(el.active).to.equal('t1');
  });

  it('activates the correct panel', async () => {
    const el = await fixture<BhTabs>(html`
      <bh-tabs active="t2">
        <bh-tab-bar slot="tab-bar">
          <bh-tab tab-id="t1" label="Tab 1"></bh-tab>
          <bh-tab tab-id="t2" label="Tab 2"></bh-tab>
        </bh-tab-bar>
        <bh-tab-panel tab-id="t1">Panel 1</bh-tab-panel>
        <bh-tab-panel tab-id="t2">Panel 2</bh-tab-panel>
      </bh-tabs>
    `);
    const panels = el.querySelectorAll('bh-tab-panel');
    expect(panels[0].active).to.equal(false);
    expect(panels[1].active).to.equal(true);
  });

  it('fires bh-tab-change when tab is clicked', async () => {
    const el = await fixture<BhTabs>(html`
      <bh-tabs active="t1">
        <bh-tab-bar slot="tab-bar">
          <bh-tab tab-id="t1" label="Tab 1"></bh-tab>
          <bh-tab tab-id="t2" label="Tab 2"></bh-tab>
        </bh-tab-bar>
        <bh-tab-panel tab-id="t1">Panel 1</bh-tab-panel>
        <bh-tab-panel tab-id="t2">Panel 2</bh-tab-panel>
      </bh-tabs>
    `);
    const tab2 = el.querySelectorAll('bh-tab')[1];
    const button = tab2.shadowRoot!.querySelector('button')!;

    setTimeout(() => button.click());
    const event = await oneEvent(el, 'bh-tab-change');
    expect(event.detail.tabId).to.equal('t2');
  });

  it('switches panels when active property changes', async () => {
    const el = await fixture<BhTabs>(html`
      <bh-tabs active="t1">
        <bh-tab-bar slot="tab-bar">
          <bh-tab tab-id="t1" label="Tab 1"></bh-tab>
          <bh-tab tab-id="t2" label="Tab 2"></bh-tab>
        </bh-tab-bar>
        <bh-tab-panel tab-id="t1">Panel 1</bh-tab-panel>
        <bh-tab-panel tab-id="t2">Panel 2</bh-tab-panel>
      </bh-tabs>
    `);

    el.active = 't2';
    await el.updateComplete;

    const panels = el.querySelectorAll('bh-tab-panel');
    expect(panels[0].active).to.equal(false);
    expect(panels[1].active).to.equal(true);
  });
});
