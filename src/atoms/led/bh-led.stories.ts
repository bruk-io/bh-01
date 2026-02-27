import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import './bh-led.js';

const meta: Meta = {
  title: 'Atoms/LED',
  component: 'bh-led',
  argTypes: {
    color: {
      control: 'select',
      options: ['success', 'warning', 'danger', 'primary'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md'],
    },
    pulse: { control: 'boolean' },
    label: { control: 'text' },
  },
  args: {
    color: 'success',
    size: 'md',
    pulse: false,
    label: 'Status',
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: (args) => html`
    <bh-led
      color=${args.color}
      size=${args.size}
      ?pulse=${args.pulse}
      label=${args.label}
    ></bh-led>
  `,
};

export const AllColors: Story = {
  render: () => html`
    <div style="display: flex; gap: 1rem; align-items: center;">
      <bh-led color="success" label="Online"></bh-led>
      <bh-led color="warning" label="Degraded"></bh-led>
      <bh-led color="danger" label="Offline"></bh-led>
      <bh-led color="primary" label="Active"></bh-led>
    </div>
  `,
};

export const Pulsing: Story = {
  render: () => html`
    <div style="display: flex; gap: 1rem; align-items: center;">
      <bh-led color="success" pulse label="System active"></bh-led>
      <bh-led color="danger" pulse label="Alert"></bh-led>
      <bh-led color="primary" pulse label="Processing"></bh-led>
    </div>
  `,
};

export const Sizes: Story = {
  render: () => html`
    <div style="display: flex; gap: 1rem; align-items: center;">
      <bh-led size="sm" label="Small"></bh-led>
      <bh-led size="md" label="Medium"></bh-led>
    </div>
  `,
};

export const StatusPanel: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 0.5rem; font-family: system-ui;">
      <div style="display: flex; align-items: center; gap: 0.5rem;">
        <bh-led color="success" pulse label="API online"></bh-led>
        <span style="font-size: 0.875rem;">API Server</span>
      </div>
      <div style="display: flex; align-items: center; gap: 0.5rem;">
        <bh-led color="success" label="Database online"></bh-led>
        <span style="font-size: 0.875rem;">Database</span>
      </div>
      <div style="display: flex; align-items: center; gap: 0.5rem;">
        <bh-led color="warning" pulse label="Cache degraded"></bh-led>
        <span style="font-size: 0.875rem;">Cache</span>
      </div>
      <div style="display: flex; align-items: center; gap: 0.5rem;">
        <bh-led color="danger" label="CDN offline"></bh-led>
        <span style="font-size: 0.875rem;">CDN</span>
      </div>
    </div>
  `,
};
