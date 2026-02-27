import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import './bh-status-bar.js';

const meta: Meta = {
  title: 'Organisms/Shell/StatusBar',
  component: 'bh-status-bar',
  argTypes: {
    message: {
      control: 'text',
      description: 'Status message displayed on the left side of the bar',
    },
    error: {
      control: 'boolean',
      description: 'When true, renders the bar in error/danger text color',
    },
  },
  args: {
    message: 'Ready',
    error: false,
  },
  parameters: {
    layout: 'fullscreen',
  },
};
export default meta;
type Story = StoryObj;

export const Default: Story = {
  name: 'Default',
  render: (args) => html`
    <bh-status-bar
      message=${args['message'] as string}
      ?error=${args['error']}
    ></bh-status-bar>
  `,
};

export const WithError: Story = {
  name: 'WithError',
  args: {
    message: '2 errors, 1 warning',
    error: true,
  },
  render: (args) => html`
    <bh-status-bar
      message=${args['message'] as string}
      ?error=${args['error']}
    ></bh-status-bar>
  `,
};

export const WithSlots: Story = {
  name: 'WithSlots',
  args: {
    message: 'Ln 42, Col 8',
    error: false,
  },
  render: (args) => html`
    <bh-status-bar
      message=${args['message'] as string}
      ?error=${args['error']}
    >
      <span slot="end" style="opacity: 0.8;">UTF-8</span>
      <span slot="end" style="opacity: 0.8;">TypeScript</span>
      <span slot="end" style="opacity: 0.8;">main ⎇</span>
    </bh-status-bar>
  `,
};
