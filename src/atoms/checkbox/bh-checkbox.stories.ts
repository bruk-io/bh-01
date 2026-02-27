import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import './bh-checkbox.js';

const meta: Meta = {
  title: 'Atoms/Checkbox',
  component: 'bh-checkbox',
  argTypes: {
    checked: { control: 'boolean' },
    indeterminate: { control: 'boolean' },
    disabled: { control: 'boolean' },
    value: { control: 'text' },
  },
  args: {
    checked: false,
    indeterminate: false,
    disabled: false,
    value: '',
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: (args) => html`
    <bh-checkbox
      ?checked=${args.checked}
      ?indeterminate=${args.indeterminate}
      ?disabled=${args.disabled}
      value=${args.value}
    >Accept terms and conditions</bh-checkbox>
  `,
};

export const States: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <bh-checkbox>Unchecked</bh-checkbox>
      <bh-checkbox checked>Checked</bh-checkbox>
      <bh-checkbox indeterminate>Indeterminate</bh-checkbox>
      <bh-checkbox disabled>Disabled</bh-checkbox>
      <bh-checkbox checked disabled>Checked & Disabled</bh-checkbox>
    </div>
  `,
};

export const Group: Story = {
  render: () => html`
    <fieldset style="border: none; padding: 0; display: flex; flex-direction: column; gap: 0.75rem;">
      <legend style="font-weight: 600; margin-bottom: 0.5rem;">Select your interests</legend>
      <bh-checkbox value="music" checked>Music</bh-checkbox>
      <bh-checkbox value="sports">Sports</bh-checkbox>
      <bh-checkbox value="reading">Reading</bh-checkbox>
      <bh-checkbox value="gaming">Gaming</bh-checkbox>
    </fieldset>
  `,
};
