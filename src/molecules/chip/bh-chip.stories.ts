import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import './bh-chip.js';

const meta: Meta = {
  title: 'Molecules/Chip',
  component: 'bh-chip',
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'primary', 'success', 'warning', 'danger'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md'],
    },
    dismissible: { control: 'boolean' },
    selected: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  args: {
    variant: 'default',
    size: 'md',
    dismissible: false,
    selected: false,
    disabled: false,
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: (args) => html`
    <bh-chip
      variant=${args.variant}
      size=${args.size}
      ?dismissible=${args.dismissible}
      ?selected=${args.selected}
      ?disabled=${args.disabled}
    >
      Tag
    </bh-chip>
  `,
};

export const Variants: Story = {
  render: () => html`
    <div style="display: flex; gap: 0.5rem; align-items: center; flex-wrap: wrap;">
      <bh-chip variant="default">Default</bh-chip>
      <bh-chip variant="primary">Primary</bh-chip>
      <bh-chip variant="success">Success</bh-chip>
      <bh-chip variant="warning">Warning</bh-chip>
      <bh-chip variant="danger">Danger</bh-chip>
    </div>
  `,
};

export const Sizes: Story = {
  render: () => html`
    <div style="display: flex; gap: 0.5rem; align-items: center;">
      <bh-chip size="sm">Small</bh-chip>
      <bh-chip size="md">Medium</bh-chip>
    </div>
  `,
};

export const Dismissible: Story = {
  render: () => html`
    <div style="display: flex; gap: 0.5rem; align-items: center; flex-wrap: wrap;">
      <bh-chip dismissible variant="default">Default</bh-chip>
      <bh-chip dismissible variant="primary">Primary</bh-chip>
      <bh-chip dismissible variant="success">Success</bh-chip>
      <bh-chip dismissible variant="warning">Warning</bh-chip>
      <bh-chip dismissible variant="danger">Danger</bh-chip>
    </div>
  `,
};

export const Selected: Story = {
  render: () => html`
    <div style="display: flex; gap: 0.5rem; align-items: center; flex-wrap: wrap;">
      <bh-chip selected variant="default">Selected</bh-chip>
      <bh-chip variant="default">Not Selected</bh-chip>
      <bh-chip selected variant="primary">Selected</bh-chip>
      <bh-chip variant="primary">Not Selected</bh-chip>
    </div>
  `,
};

export const Disabled: Story = {
  render: () => html`
    <div style="display: flex; gap: 0.5rem; align-items: center; flex-wrap: wrap;">
      <bh-chip disabled variant="default">Disabled</bh-chip>
      <bh-chip disabled variant="primary">Disabled</bh-chip>
      <bh-chip disabled dismissible>Disabled Dismiss</bh-chip>
    </div>
  `,
};
