import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import './bh-input.js';
import '../icon/bh-icon.js';

const meta: Meta = {
  title: 'Atoms/Input',
  component: 'bh-input',
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    type: {
      control: 'select',
      options: ['text', 'password', 'email', 'number', 'search', 'url', 'tel'],
    },
    disabled: { control: 'boolean' },
    readonly: { control: 'boolean' },
    required: { control: 'boolean' },
    error: { control: 'boolean' },
    placeholder: { control: 'text' },
    value: { control: 'text' },
  },
  args: {
    size: 'md',
    type: 'text',
    disabled: false,
    readonly: false,
    required: false,
    error: false,
    placeholder: 'Enter text...',
    value: '',
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: (args) => html`
    <bh-input
      size=${args.size}
      type=${args.type}
      placeholder=${args.placeholder}
      value=${args.value}
      ?disabled=${args.disabled}
      ?readonly=${args.readonly}
      ?required=${args.required}
      ?error=${args.error}
      label="Default input"
    ></bh-input>
  `,
};

export const Sizes: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem; max-width: 320px;">
      <bh-input size="sm" placeholder="Small" label="Small input"></bh-input>
      <bh-input size="md" placeholder="Medium" label="Medium input"></bh-input>
      <bh-input size="lg" placeholder="Large" label="Large input"></bh-input>
    </div>
  `,
};

export const States: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem; max-width: 320px;">
      <bh-input placeholder="Default" label="Default"></bh-input>
      <bh-input disabled placeholder="Disabled" label="Disabled"></bh-input>
      <bh-input readonly value="Read only value" label="Readonly"></bh-input>
      <bh-input error placeholder="Error state" label="Error"></bh-input>
    </div>
  `,
};

export const Types: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem; max-width: 320px;">
      <bh-input type="text" placeholder="Text" label="Text"></bh-input>
      <bh-input type="password" placeholder="Password" label="Password"></bh-input>
      <bh-input type="email" placeholder="email@example.com" label="Email"></bh-input>
      <bh-input type="number" placeholder="0" label="Number"></bh-input>
    </div>
  `,
};

export const WithPrefixIcon: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem; max-width: 320px;">
      <bh-input placeholder="Search..." label="Search">
        <bh-icon slot="prefix" name="search" size="sm"></bh-icon>
      </bh-input>
      <bh-input placeholder="Email" label="Email" type="email">
        <bh-icon slot="prefix" name="menu" size="sm"></bh-icon>
      </bh-input>
    </div>
  `,
};

export const WithSuffixIcon: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem; max-width: 320px;">
      <bh-input placeholder="Search..." label="Search">
        <bh-icon slot="suffix" name="search" size="sm"></bh-icon>
      </bh-input>
      <bh-input error placeholder="Invalid value" label="Error with icon">
        <bh-icon slot="suffix" name="x" size="sm"></bh-icon>
      </bh-input>
    </div>
  `,
};

export const WithBothIcons: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem; max-width: 320px;">
      <bh-input placeholder="Search..." label="Search">
        <bh-icon slot="prefix" name="search" size="sm"></bh-icon>
        <bh-icon slot="suffix" name="x" size="sm"></bh-icon>
      </bh-input>
    </div>
  `,
};

export const IconSizes: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem; max-width: 360px;">
      <bh-input size="sm" placeholder="Small" label="Small">
        <bh-icon slot="prefix" name="search" size="sm"></bh-icon>
      </bh-input>
      <bh-input size="md" placeholder="Medium" label="Medium">
        <bh-icon slot="prefix" name="search" size="sm"></bh-icon>
      </bh-input>
      <bh-input size="lg" placeholder="Large" label="Large">
        <bh-icon slot="prefix" name="search" size="md"></bh-icon>
      </bh-input>
    </div>
  `,
};
