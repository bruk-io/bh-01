import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import './bh-terminal-input.js';

const meta: Meta = {
  title: 'Molecules/TerminalInput',
  component: 'bh-terminal-input',
  argTypes: {
    prompt: { control: 'text' },
    promptUser: { control: 'text' },
    promptPath: { control: 'text' },
    disabled: { control: 'boolean' },
  },
  args: {
    prompt: '\u25B8 ',
    promptUser: '',
    promptPath: '~',
    disabled: false,
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: (args) => html`
    <bh-terminal-input
      prompt=${args.prompt}
      prompt-user=${args.promptUser}
      prompt-path=${args.promptPath}
      ?disabled=${args.disabled}
    ></bh-terminal-input>
  `,
};

export const WithUserPrompt: Story = {
  render: () => html`
    <bh-terminal-input
      prompt-user="bh-01"
      prompt-path="~/projects"
    ></bh-terminal-input>
  `,
};

export const Disabled: Story = {
  render: () => html`
    <bh-terminal-input
      prompt-user="bh-01"
      prompt-path="~"
      disabled
    ></bh-terminal-input>
  `,
};
