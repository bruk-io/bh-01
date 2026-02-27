import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import './bh-segment-display.js';

const meta: Meta = {
  title: 'Atoms/SegmentDisplay',
  component: 'bh-segment-display',
  argTypes: {
    value: { control: 'text' },
    color: {
      control: 'select',
      options: ['primary', 'success', 'warning', 'danger', 'default'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
    },
    ghost: { control: 'boolean' },
    label: { control: 'text' },
  },
  args: {
    value: 'OPEN',
    color: 'primary',
    size: 'md',
    ghost: false,
    label: '',
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: (args) => html`
    <bh-segment-display
      value=${args.value}
      color=${args.color}
      size=${args.size}
      ?ghost=${args.ghost}
      label=${args.label}
    ></bh-segment-display>
  `,
};

export const WithGhost: Story = {
  args: { value: '42', ghost: true },
  render: (args) => html`
    <bh-segment-display
      value=${args.value}
      color=${args.color}
      size=${args.size}
      ghost
      label=${args.label}
    ></bh-segment-display>
  `,
};

export const AllColors: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 12px; background: var(--bh-color-surface-recessed); padding: 20px; border-radius: 8px;">
      <bh-segment-display value="PRIMARY" color="primary" size="lg"></bh-segment-display>
      <bh-segment-display value="SUCCESS" color="success" size="lg"></bh-segment-display>
      <bh-segment-display value="WARNING" color="warning" size="lg"></bh-segment-display>
      <bh-segment-display value="DANGER" color="danger" size="lg"></bh-segment-display>
      <bh-segment-display value="DEFAULT" color="default" size="lg"></bh-segment-display>
    </div>
  `,
};

export const AllSizes: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 12px;">
      <bh-segment-display value="SM" size="sm"></bh-segment-display>
      <bh-segment-display value="MD" size="md"></bh-segment-display>
      <bh-segment-display value="LG" size="lg"></bh-segment-display>
      <bh-segment-display value="XL" size="xl"></bh-segment-display>
    </div>
  `,
};

export const StatusPanel: Story = {
  render: () => html`
    <div style="display: flex; align-items: center; gap: 24px; background: var(--bh-color-surface-recessed); padding: 16px 20px; border-radius: 8px;">
      <div style="display: flex; flex-direction: column; gap: 4px;">
        <span style="font-family: var(--bh-font-mono); font-size: 9px; letter-spacing: 2px; text-transform: uppercase; color: var(--bh-color-text-tertiary);">Status</span>
        <bh-segment-display value="OPEN" color="success" ghost></bh-segment-display>
      </div>
      <div style="display: flex; flex-direction: column; gap: 4px;">
        <span style="font-family: var(--bh-font-mono); font-size: 9px; letter-spacing: 2px; text-transform: uppercase; color: var(--bh-color-text-tertiary);">Exp</span>
        <bh-segment-display value="12" ghost></bh-segment-display>
      </div>
      <div style="display: flex; flex-direction: column; gap: 4px;">
        <span style="font-family: var(--bh-font-mono); font-size: 9px; letter-spacing: 2px; text-transform: uppercase; color: var(--bh-color-text-tertiary);">Temp</span>
        <bh-segment-display value="23.4" color="warning" ghost></bh-segment-display>
      </div>
    </div>
  `,
};
