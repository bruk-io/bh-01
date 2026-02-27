import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import './bh-radio.js';

const meta: Meta = {
  title: 'Atoms/Radio',
  component: 'bh-radio',
  argTypes: {
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
    value: { control: 'text' },
    name: { control: 'text' },
  },
  args: {
    checked: false,
    disabled: false,
    value: '',
    name: '',
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: (args) => html`
    <bh-radio
      ?checked=${args.checked}
      ?disabled=${args.disabled}
      value=${args.value}
      name=${args.name}
    >Option A</bh-radio>
  `,
};

export const Group: Story = {
  render: () => html`
    <fieldset style="border: none; padding: 0; display: flex; flex-direction: column; gap: 0.75rem;">
      <legend style="font-weight: 600; margin-bottom: 0.5rem;">Select a plan</legend>
      <bh-radio name="plan" value="free" checked>Free</bh-radio>
      <bh-radio name="plan" value="pro">Pro</bh-radio>
      <bh-radio name="plan" value="enterprise">Enterprise</bh-radio>
    </fieldset>
  `,
};

export const States: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <bh-radio>Unchecked</bh-radio>
      <bh-radio checked>Checked</bh-radio>
      <bh-radio disabled>Disabled</bh-radio>
      <bh-radio checked disabled>Checked & Disabled</bh-radio>
    </div>
  `,
};
