import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import './bh-terminal-bar.js';

const meta: Meta = {
  title: 'Molecules/TerminalBar',
  component: 'bh-terminal-bar',
  argTypes: {
    title: { control: 'text' },
    status: { control: 'text' },
    statusColor: {
      control: 'select',
      options: ['success', 'warning', 'danger', 'primary'],
    },
  },
  args: {
    title: 'Terminal',
    status: '',
    statusColor: 'success',
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: (args) => html`
    <bh-terminal-bar
      title=${args.title}
      status=${args.status}
      status-color=${args.statusColor}
    ></bh-terminal-bar>
  `,
};

export const WithStatus: Story = {
  render: () => html`
    <bh-terminal-bar
      title="zsh"
      status="connected"
      status-color="success"
    ></bh-terminal-bar>
  `,
};

export const DangerStatus: Story = {
  render: () => html`
    <bh-terminal-bar
      title="deploy.sh"
      status="error"
      status-color="danger"
    ></bh-terminal-bar>
  `,
};
