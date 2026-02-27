import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import './bh-tabs.js';
import './bh-tab-bar.js';
import './bh-tab.js';
import './bh-tab-panel.js';

const meta: Meta = {
  title: 'Organisms/Tabs',
  component: 'bh-tabs',
  argTypes: {
    active: { control: 'text' },
  },
  args: {
    active: 'tab-1',
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: (args) => html`
    <bh-tabs active=${args.active} style="height: 300px;" @bh-tab-change=${(e: CustomEvent) => console.log('bh-tab-change:', e.detail)}>
      <bh-tab-bar slot="tab-bar" active=${args.active}>
        <bh-tab tab-id="tab-1" label="Overview"></bh-tab>
        <bh-tab tab-id="tab-2" label="Settings"></bh-tab>
        <bh-tab tab-id="tab-3" label="Activity"></bh-tab>
      </bh-tab-bar>

      <bh-tab-panel tab-id="tab-1">
        <div style="padding: 1rem;">
          <h3 style="margin: 0 0 0.5rem;">Overview</h3>
          <p style="color: var(--bh-color-text-muted); margin: 0;">
            This is the overview panel. It shows a high-level summary of the content.
          </p>
        </div>
      </bh-tab-panel>

      <bh-tab-panel tab-id="tab-2">
        <div style="padding: 1rem;">
          <h3 style="margin: 0 0 0.5rem;">Settings</h3>
          <p style="color: var(--bh-color-text-muted); margin: 0;">
            Configure your preferences and account settings here.
          </p>
        </div>
      </bh-tab-panel>

      <bh-tab-panel tab-id="tab-3">
        <div style="padding: 1rem;">
          <h3 style="margin: 0 0 0.5rem;">Activity</h3>
          <p style="color: var(--bh-color-text-muted); margin: 0;">
            Recent activity and event log will appear in this panel.
          </p>
        </div>
      </bh-tab-panel>
    </bh-tabs>
  `,
};

export const ManyTabs: Story = {
  render: () => html`
    <bh-tabs active="tab-1" style="height: 300px;">
      <bh-tab-bar slot="tab-bar" active="tab-1">
        <bh-tab tab-id="tab-1" label="General"></bh-tab>
        <bh-tab tab-id="tab-2" label="Security"></bh-tab>
        <bh-tab tab-id="tab-3" label="Billing"></bh-tab>
        <bh-tab tab-id="tab-4" label="Notifications"></bh-tab>
        <bh-tab tab-id="tab-5" label="Integrations"></bh-tab>
        <bh-tab tab-id="tab-6" label="Advanced"></bh-tab>
      </bh-tab-bar>

      <bh-tab-panel tab-id="tab-1">
        <div style="padding: 1rem;">
          <h3 style="margin: 0 0 0.5rem;">General Settings</h3>
          <p style="color: var(--bh-color-text-muted); margin: 0;">
            Manage your general account and profile settings.
          </p>
        </div>
      </bh-tab-panel>

      <bh-tab-panel tab-id="tab-2">
        <div style="padding: 1rem;">
          <h3 style="margin: 0 0 0.5rem;">Security</h3>
          <p style="color: var(--bh-color-text-muted); margin: 0;">
            Two-factor authentication, password, and session management.
          </p>
        </div>
      </bh-tab-panel>

      <bh-tab-panel tab-id="tab-3">
        <div style="padding: 1rem;">
          <h3 style="margin: 0 0 0.5rem;">Billing</h3>
          <p style="color: var(--bh-color-text-muted); margin: 0;">
            Manage your subscription plan and payment methods.
          </p>
        </div>
      </bh-tab-panel>

      <bh-tab-panel tab-id="tab-4">
        <div style="padding: 1rem;">
          <h3 style="margin: 0 0 0.5rem;">Notifications</h3>
          <p style="color: var(--bh-color-text-muted); margin: 0;">
            Configure email, push, and in-app notification preferences.
          </p>
        </div>
      </bh-tab-panel>

      <bh-tab-panel tab-id="tab-5">
        <div style="padding: 1rem;">
          <h3 style="margin: 0 0 0.5rem;">Integrations</h3>
          <p style="color: var(--bh-color-text-muted); margin: 0;">
            Connect third-party services and manage API tokens.
          </p>
        </div>
      </bh-tab-panel>

      <bh-tab-panel tab-id="tab-6">
        <div style="padding: 1rem;">
          <h3 style="margin: 0 0 0.5rem;">Advanced</h3>
          <p style="color: var(--bh-color-text-muted); margin: 0;">
            Danger zone, data export, and experimental features.
          </p>
        </div>
      </bh-tab-panel>
    </bh-tabs>
  `,
};
