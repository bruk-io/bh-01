import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import './bh-select.js';

const defaultOptions = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
  { value: 'lit', label: 'Lit' },
  { value: 'svelte', label: 'Svelte' },
];

const meta: Meta = {
  title: 'Atoms/Select',
  component: 'bh-select',
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    disabled: { control: 'boolean' },
    error: { control: 'boolean' },
    placeholder: { control: 'text' },
  },
  args: {
    size: 'md',
    disabled: false,
    error: false,
    placeholder: 'Choose a framework...',
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: (args) => html`
    <bh-select
      size=${args.size}
      ?disabled=${args.disabled}
      ?error=${args.error}
      placeholder=${args.placeholder}
      .options=${defaultOptions}
    ></bh-select>
  `,
};

export const Sizes: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem; max-width: 300px;">
      <bh-select size="sm" placeholder="Small" .options=${defaultOptions}></bh-select>
      <bh-select size="md" placeholder="Medium" .options=${defaultOptions}></bh-select>
      <bh-select size="lg" placeholder="Large" .options=${defaultOptions}></bh-select>
    </div>
  `,
};

export const States: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem; max-width: 300px;">
      <bh-select placeholder="Default" .options=${defaultOptions}></bh-select>
      <bh-select disabled placeholder="Disabled" .options=${defaultOptions}></bh-select>
      <bh-select error placeholder="Error" .options=${defaultOptions}></bh-select>
    </div>
  `,
};

export const WithOptionGroups: Story = {
  render: () => html`
    <bh-select
      placeholder="Select a language..."
      style="max-width: 300px;"
      .optionGroups=${[
        { label: 'Frontend', options: [
          { value: 'js', label: 'JavaScript' },
          { value: 'ts', label: 'TypeScript' },
        ]},
        { label: 'Backend', options: [
          { value: 'py', label: 'Python' },
          { value: 'go', label: 'Go' },
          { value: 'rs', label: 'Rust' },
        ]},
      ]}
    ></bh-select>
  `,
};

export const PreSelected: Story = {
  render: () => html`
    <bh-select
      value="lit"
      .options=${defaultOptions}
      style="max-width: 300px;"
    ></bh-select>
  `,
};
