import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import './bh-card.js';
import '../../atoms/button/bh-button.js';

const meta: Meta = {
  title: 'Molecules/Card',
  component: 'bh-card',
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'outlined', 'flat'],
    },
    padding: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg'],
    },
  },
  args: {
    variant: 'default',
    padding: 'md',
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: (args) => html`
    <bh-card variant=${args.variant} padding=${args.padding}>
      <p style="margin: 0;">This is a basic card with some content inside it.</p>
    </bh-card>
  `,
};

export const WithHeader: Story = {
  render: (args) => html`
    <bh-card variant=${args.variant} padding=${args.padding}>
      <span slot="header" style="font-weight: 600;">Card Title</span>
      <p style="margin: 0;">Card body content goes here.</p>
    </bh-card>
  `,
};

export const WithHeaderActions: Story = {
  render: (args) => html`
    <bh-card variant=${args.variant} padding=${args.padding}>
      <span slot="header" style="font-weight: 600;">Team Members</span>
      <div slot="header-actions" style="display: flex; gap: 0.5rem;">
        <bh-button variant="ghost" size="sm" icon-only label="Edit">E</bh-button>
        <bh-button size="sm">Add</bh-button>
      </div>
      <p style="margin: 0;">The header uses a flex layout with the title on the left and actions on the right.</p>
    </bh-card>
  `,
};

export const WithHeaderAndFooter: Story = {
  render: (args) => html`
    <bh-card variant=${args.variant} padding=${args.padding}>
      <span slot="header" style="font-weight: 600;">Card Title</span>
      <div slot="header-actions">
        <bh-button variant="ghost" size="sm">Options</bh-button>
      </div>
      <p style="margin: 0;">Card body content goes here. This card has a header with actions and a footer.</p>
      <div slot="footer" style="display: flex; gap: 0.5rem; justify-content: flex-end;">
        <bh-button variant="ghost" size="sm">Cancel</bh-button>
        <bh-button size="sm">Save</bh-button>
      </div>
    </bh-card>
  `,
};

export const Variants: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1.5rem; max-width: 400px;">
      <bh-card variant="default">
        <span slot="header" style="font-weight: 600;">Default (Shadow)</span>
        <p style="margin: 0;">Elevated with shadow, no border.</p>
      </bh-card>
      <bh-card variant="outlined">
        <span slot="header" style="font-weight: 600;">Outlined</span>
        <p style="margin: 0;">Border, no shadow.</p>
      </bh-card>
      <bh-card variant="flat">
        <span slot="header" style="font-weight: 600;">Flat</span>
        <p style="margin: 0;">No border, no shadow.</p>
      </bh-card>
    </div>
  `,
};

export const PaddingSizes: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1.5rem; max-width: 400px;">
      <bh-card variant="outlined" padding="none">
        <p style="margin: 0;">Padding: none</p>
      </bh-card>
      <bh-card variant="outlined" padding="sm">
        <p style="margin: 0;">Padding: sm</p>
      </bh-card>
      <bh-card variant="outlined" padding="md">
        <p style="margin: 0;">Padding: md (default)</p>
      </bh-card>
      <bh-card variant="outlined" padding="lg">
        <p style="margin: 0;">Padding: lg</p>
      </bh-card>
    </div>
  `,
};
