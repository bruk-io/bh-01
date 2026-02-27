import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import './bh-divider.js';

const meta: Meta = {
  title: 'Atoms/Divider',
  component: 'bh-divider',
  argTypes: {
    vertical: { control: 'boolean' },
    spacing: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
  args: {
    vertical: false,
    spacing: 'md',
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: (args) => html`
    <bh-divider ?vertical=${args.vertical} spacing=${args.spacing}></bh-divider>
  `,
};

export const Spacings: Story = {
  render: () => html`
    <div>
      <p>Small spacing</p>
      <bh-divider spacing="sm"></bh-divider>
      <p>Medium spacing (default)</p>
      <bh-divider spacing="md"></bh-divider>
      <p>Large spacing</p>
      <bh-divider spacing="lg"></bh-divider>
      <p>End</p>
    </div>
  `,
};

export const Vertical: Story = {
  render: () => html`
    <div style="display: flex; align-items: center; height: 48px;">
      <span>Left</span>
      <bh-divider vertical spacing="sm"></bh-divider>
      <span>Center</span>
      <bh-divider vertical spacing="sm"></bh-divider>
      <span>Right</span>
    </div>
  `,
};
