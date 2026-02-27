import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import './bh-badge.js';

const meta: Meta = {
  title: 'Atoms/Badge',
  component: 'bh-badge',
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'primary', 'success', 'warning', 'danger'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md'],
    },
  },
  args: {
    variant: 'default',
    size: 'md',
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: (args) => html`
    <bh-badge variant=${args.variant} size=${args.size}>Badge</bh-badge>
  `,
};

export const AllVariants: Story = {
  render: () => html`
    <div style="display: flex; gap: 0.75rem; align-items: center; flex-wrap: wrap;">
      <bh-badge variant="default">Default</bh-badge>
      <bh-badge variant="primary">Primary</bh-badge>
      <bh-badge variant="success">Success</bh-badge>
      <bh-badge variant="warning">Warning</bh-badge>
      <bh-badge variant="danger">Danger</bh-badge>
    </div>
  `,
};

export const Sizes: Story = {
  render: () => html`
    <div style="display: flex; gap: 0.75rem; align-items: center;">
      <bh-badge size="sm">Small</bh-badge>
      <bh-badge size="md">Medium</bh-badge>
    </div>
  `,
};

export const StatusExamples: Story = {
  render: () => html`
    <div style="display: flex; gap: 0.75rem; align-items: center; flex-wrap: wrap;">
      <bh-badge variant="success">Active</bh-badge>
      <bh-badge variant="warning">Pending</bh-badge>
      <bh-badge variant="danger">Offline</bh-badge>
      <bh-badge variant="primary">New</bh-badge>
      <bh-badge variant="default">Draft</bh-badge>
    </div>
  `,
};

export const Counts: Story = {
  render: () => html`
    <div style="display: flex; gap: 0.75rem; align-items: center;">
      <bh-badge variant="primary" size="sm">3</bh-badge>
      <bh-badge variant="danger" size="sm">99+</bh-badge>
      <bh-badge variant="default" size="sm">0</bh-badge>
    </div>
  `,
};
