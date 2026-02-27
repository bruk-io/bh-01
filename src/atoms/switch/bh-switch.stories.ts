import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import './bh-switch.js';

const meta: Meta = {
  title: 'Atoms/Switch',
  component: 'bh-switch',
  argTypes: {
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  args: {
    checked: false,
    disabled: false,
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: (args) => html`
    <bh-switch
      ?checked=${args.checked}
      ?disabled=${args.disabled}
    >Dark mode</bh-switch>
  `,
};

export const States: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <bh-switch>Off</bh-switch>
      <bh-switch checked>On</bh-switch>
      <bh-switch disabled>Disabled Off</bh-switch>
      <bh-switch checked disabled>Disabled On</bh-switch>
    </div>
  `,
};

export const Settings: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem; max-width: 300px;">
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <span>Notifications</span>
        <bh-switch checked></bh-switch>
      </div>
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <span>Dark mode</span>
        <bh-switch></bh-switch>
      </div>
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <span>Auto-update</span>
        <bh-switch checked></bh-switch>
      </div>
    </div>
  `,
};
