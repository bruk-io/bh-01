import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import './bh-progress.js';

const meta: Meta = {
  title: 'Atoms/Progress',
  component: 'bh-progress',
  argTypes: {
    value: { control: { type: 'range', min: 0, max: 100, step: 1 } },
    max: { control: 'number' },
    indeterminate: { control: 'boolean' },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    variant: {
      control: 'select',
      options: ['default', 'success', 'warning', 'danger'],
    },
    label: { control: 'text' },
  },
  args: {
    value: 60,
    max: 100,
    indeterminate: false,
    size: 'md',
    variant: 'default',
    label: 'Progress',
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: (args) => html`
    <bh-progress
      value=${args.value}
      max=${args.max}
      ?indeterminate=${args.indeterminate}
      size=${args.size}
      variant=${args.variant}
      label=${args.label}
    ></bh-progress>
  `,
};

export const Variants: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem; max-width: 400px;">
      <bh-progress value="60" label="Default"></bh-progress>
      <bh-progress value="80" variant="success" label="Success"></bh-progress>
      <bh-progress value="45" variant="warning" label="Warning"></bh-progress>
      <bh-progress value="30" variant="danger" label="Danger"></bh-progress>
    </div>
  `,
};

export const Sizes: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1.5rem; max-width: 400px;">
      <div>
        <span style="font-size: 0.75rem; color: var(--bh-color-text-muted);">sm</span>
        <bh-progress value="70" size="sm"></bh-progress>
      </div>
      <div>
        <span style="font-size: 0.75rem; color: var(--bh-color-text-muted);">md</span>
        <bh-progress value="70" size="md"></bh-progress>
      </div>
      <div>
        <span style="font-size: 0.75rem; color: var(--bh-color-text-muted);">lg</span>
        <bh-progress value="70" size="lg"></bh-progress>
      </div>
    </div>
  `,
};

export const Indeterminate: Story = {
  render: () => html`
    <div style="max-width: 400px;">
      <bh-progress indeterminate label="Loading..."></bh-progress>
    </div>
  `,
};
