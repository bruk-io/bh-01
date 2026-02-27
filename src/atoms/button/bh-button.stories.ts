import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import './bh-button.js';
import '../icon/bh-icon.js';

const meta: Meta = {
  title: 'Atoms/Button',
  component: 'bh-button',
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost', 'danger'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    disabled: { control: 'boolean' },
    iconOnly: { control: 'boolean' },
    label: { control: 'text' },
  },
  args: {
    variant: 'primary',
    size: 'md',
    disabled: false,
    iconOnly: false,
    label: '',
  },
};

export default meta;
type Story = StoryObj;

export const Primary: Story = {
  render: (args) => html`
    <bh-button
      variant=${args.variant}
      size=${args.size}
      ?disabled=${args.disabled}
      ?icon-only=${args.iconOnly}
      label=${args.label}
    >
      Button
    </bh-button>
  `,
};

export const Secondary: Story = {
  args: { variant: 'secondary' },
  render: (args) => html`
    <bh-button variant=${args.variant} size=${args.size}>Button</bh-button>
  `,
};

export const Ghost: Story = {
  args: { variant: 'ghost' },
  render: (args) => html`
    <bh-button variant=${args.variant} size=${args.size}>Button</bh-button>
  `,
};

export const Danger: Story = {
  args: { variant: 'danger' },
  render: (args) => html`
    <bh-button variant=${args.variant} size=${args.size}>Button</bh-button>
  `,
};

export const Sizes: Story = {
  render: () => html`
    <div style="display: flex; gap: 1rem; align-items: center;">
      <bh-button size="sm">Small</bh-button>
      <bh-button size="md">Medium</bh-button>
      <bh-button size="lg">Large</bh-button>
    </div>
  `,
};

export const Disabled: Story = {
  render: () => html`
    <div style="display: flex; gap: 1rem; align-items: center;">
      <bh-button disabled variant="primary">Primary</bh-button>
      <bh-button disabled variant="secondary">Secondary</bh-button>
      <bh-button disabled variant="ghost">Ghost</bh-button>
      <bh-button disabled variant="danger">Danger</bh-button>
    </div>
  `,
};

export const WithPrefixIcon: Story = {
  render: () => html`
    <div style="display: flex; gap: 1rem; align-items: center;">
      <bh-button>
        <bh-icon slot="prefix" name="search"></bh-icon>
        Search
      </bh-button>
      <bh-button variant="danger">
        <bh-icon slot="prefix" name="x"></bh-icon>
        Delete
      </bh-button>
      <bh-button variant="secondary">
        <bh-icon slot="prefix" name="plus"></bh-icon>
        Add Item
      </bh-button>
    </div>
  `,
};

export const WithSuffixIcon: Story = {
  render: () => html`
    <div style="display: flex; gap: 1rem; align-items: center;">
      <bh-button variant="secondary">
        Options
        <bh-icon slot="suffix" name="chevron-down"></bh-icon>
      </bh-button>
      <bh-button>
        Next
        <bh-icon slot="suffix" name="chevron-right"></bh-icon>
      </bh-button>
    </div>
  `,
};

export const IconOnly: Story = {
  render: () => html`
    <div style="display: flex; gap: 1rem; align-items: center;">
      <bh-button icon-only label="Close" variant="ghost">
        <bh-icon slot="prefix" name="x"></bh-icon>
      </bh-button>
      <bh-button icon-only label="Add">
        <bh-icon slot="prefix" name="plus"></bh-icon>
      </bh-button>
      <bh-button icon-only label="Search" variant="secondary">
        <bh-icon slot="prefix" name="search"></bh-icon>
      </bh-button>
      <bh-button icon-only label="Menu" variant="ghost" size="lg">
        <bh-icon slot="prefix" name="menu"></bh-icon>
      </bh-button>
    </div>
  `,
};

export const AllVariants: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <div style="display: flex; gap: 1rem; align-items: center;">
        <bh-button variant="primary">Primary</bh-button>
        <bh-button variant="secondary">Secondary</bh-button>
        <bh-button variant="ghost">Ghost</bh-button>
        <bh-button variant="danger">Danger</bh-button>
      </div>
      <div style="display: flex; gap: 1rem; align-items: center;">
        <bh-button variant="primary">
          <bh-icon slot="prefix" name="check"></bh-icon>
          Confirm
        </bh-button>
        <bh-button variant="secondary">
          Settings
          <bh-icon slot="suffix" name="chevron-down"></bh-icon>
        </bh-button>
        <bh-button variant="ghost" icon-only label="Close">
          <bh-icon slot="prefix" name="x"></bh-icon>
        </bh-button>
        <bh-button variant="danger">
          <bh-icon slot="prefix" name="x"></bh-icon>
          Delete
        </bh-button>
      </div>
    </div>
  `,
};
