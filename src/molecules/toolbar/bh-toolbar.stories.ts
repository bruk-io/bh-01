import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import './bh-toolbar.js';
import '../../atoms/button/bh-button.js';

const meta: Meta = {
  title: 'Molecules/Toolbar',
  component: 'bh-toolbar',
  argTypes: {
    gap: {
      control: 'select',
      options: ['xs', 'sm', 'md'],
    },
    variant: {
      control: 'select',
      options: ['default', 'surface'],
    },
    sticky: { control: 'boolean' },
  },
  args: {
    gap: 'sm',
    variant: 'default',
    sticky: false,
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: (args) => html`
    <bh-toolbar gap=${args.gap} variant=${args.variant} ?sticky=${args.sticky}>
      <bh-button slot="start" variant="ghost" size="sm">File</bh-button>
      <bh-button slot="start" variant="ghost" size="sm">Edit</bh-button>
      <bh-button slot="start" variant="ghost" size="sm">View</bh-button>
      <bh-button slot="end" variant="ghost" size="sm">Share</bh-button>
      <bh-button slot="end" size="sm">Save</bh-button>
    </bh-toolbar>
  `,
};

export const WithCenterContent: Story = {
  render: () => html`
    <bh-toolbar variant="surface">
      <bh-button slot="start" variant="ghost" size="sm">Back</bh-button>
      <bh-button slot="start" variant="ghost" size="sm">Forward</bh-button>
      <bh-button size="sm">Page 1 of 12</bh-button>
      <bh-button slot="end" variant="ghost" size="sm">Zoom Out</bh-button>
      <bh-button slot="end" variant="ghost" size="sm">Zoom In</bh-button>
    </bh-toolbar>
  `,
};

export const Minimal: Story = {
  render: () => html`
    <bh-toolbar>
      <bh-button slot="start" variant="ghost" size="sm">New</bh-button>
      <bh-button slot="start" variant="ghost" size="sm">Open</bh-button>
    </bh-toolbar>
  `,
};
