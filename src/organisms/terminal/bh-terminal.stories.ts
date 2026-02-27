import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import type { BhTerminal } from './bh-terminal.js';
import './bh-terminal.js';

const meta: Meta = {
  title: 'Organisms/Terminal',
  component: 'bh-terminal',
  argTypes: {
    title: { control: 'text' },
    status: { control: 'text' },
    statusColor: {
      control: 'select',
      options: ['success', 'warning', 'danger', 'primary'],
    },
    prompt: { control: 'text' },
    promptUser: { control: 'text' },
    promptPath: { control: 'text' },
    scanlines: { control: 'boolean' },
  },
  args: {
    title: 'Terminal',
    status: '',
    statusColor: 'success',
    prompt: '\u25B8 ',
    promptUser: '',
    promptPath: '~',
    scanlines: false,
  },
  decorators: [
    (story) => html`
      <div style="height: 400px; background: #1a1a1a; padding: 16px;" data-theme="dark">
        ${story()}
      </div>
    `,
  ],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: (args) => html`
    <bh-terminal
      title=${args.title}
      status=${args.status}
      status-color=${args.statusColor}
      prompt=${args.prompt}
      prompt-user=${args.promptUser}
      prompt-path=${args.promptPath}
      ?scanlines=${args.scanlines}
      .hints=${[
        { key: 'Ctrl+C', label: 'Interrupt' },
        { key: 'Ctrl+L', label: 'Clear' },
        { key: 'Tab', label: 'Complete' },
      ]}
    ></bh-terminal>
  `,
};

export const WithOutput: Story = {
  render: () => {
    const write = (el: BhTerminal) => {
      el.writeLine('{bright}bh-01 terminal v1.0.0{/}');
      el.writeLine('{muted}Type "help" for available commands.{/}');
      el.writeLine('');
      el.writeLine('{success}System status:{/} All services operational');
      el.writeLine('{primary}Uptime:{/} 14d 6h 32m');
      el.writeLine('{warning}Warning:{/} Disk usage at 82%');
      el.writeLine('{danger}Error:{/} Failed to reach node-03');
    };

    return html`
      <bh-terminal
        title="bh-01"
        status="connected"
        status-color="success"
        prompt-user="bh-01"
        prompt-path="~/src"
        .hints=${[
          { key: 'Ctrl+C', label: 'Interrupt' },
          { key: 'Ctrl+L', label: 'Clear' },
        ]}
        @firstUpdated=${(e: Event) => write(e.target as BhTerminal)}
        ${/* Use ref callback to write after render */ ''}
      ></bh-terminal>
    `;
  },
  play: async ({ canvasElement }) => {
    // Write demo output after the component mounts
    await new Promise((r) => setTimeout(r, 100));
    const terminal = canvasElement.querySelector('bh-terminal') as BhTerminal;
    if (terminal) {
      terminal.writeLine('{bright}bh-01 terminal v1.0.0{/}');
      terminal.writeLine('{muted}Type "help" for available commands.{/}');
      terminal.writeLine('');
      terminal.writeLine('{success}System status:{/} All services operational');
      terminal.writeLine('{primary}Uptime:{/} 14d 6h 32m');
      terminal.writeLine('{warning}Warning:{/} Disk usage at 82%');
      terminal.writeLine('{danger}Error:{/} Failed to reach node-03');
    }
  },
};

export const WithScanlines: Story = {
  render: () => html`
    <bh-terminal
      title="CRT Mode"
      status="retro"
      status-color="success"
      scanlines
      .hints=${[{ key: 'Ctrl+C', label: 'Interrupt' }]}
    ></bh-terminal>
  `,
  play: async ({ canvasElement }) => {
    await new Promise((r) => setTimeout(r, 100));
    const terminal = canvasElement.querySelector('bh-terminal') as BhTerminal;
    if (terminal) {
      terminal.writeLine('{success}> INITIALIZING SYSTEM...{/}');
      terminal.writeLine('{muted}Loading kernel modules...{/}');
      terminal.writeLine('{success}[OK]{/} Network interface eth0');
      terminal.writeLine('{success}[OK]{/} Filesystem mounted');
      terminal.writeLine('{bright}System ready.{/}');
    }
  },
};

export const Interactive: Story = {
  render: () => html`
    <bh-terminal
      title="Interactive"
      prompt-user="demo"
      prompt-path="~"
      .hints=${[
        { key: 'Enter', label: 'Execute' },
        { key: 'Ctrl+C', label: 'Interrupt' },
        { key: 'Ctrl+L', label: 'Clear' },
      ]}
      @bh-command=${(e: CustomEvent<string>) => {
        const terminal = e.target as BhTerminal;
        const cmd = e.detail;
        if (cmd === 'help') {
          terminal.writeLine('{bright}Available commands:{/}');
          terminal.writeLine('  {primary}help{/}    — Show this message');
          terminal.writeLine('  {primary}echo{/}    — Echo arguments back');
          terminal.writeLine('  {primary}date{/}    — Show current date');
          terminal.writeLine('  {primary}clear{/}   — Clear the screen');
        } else if (cmd === 'clear') {
          terminal.clear();
        } else if (cmd === 'date') {
          terminal.writeLine(new Date().toLocaleString());
        } else if (cmd.startsWith('echo ')) {
          terminal.writeLine(cmd.slice(5));
        } else {
          terminal.writeError(`command not found: ${cmd.split(/\s+/)[0]}`);
        }
      }}
    ></bh-terminal>
  `,
  play: async ({ canvasElement }) => {
    await new Promise((r) => setTimeout(r, 100));
    const terminal = canvasElement.querySelector('bh-terminal') as BhTerminal;
    if (terminal) {
      terminal.writeLine('{muted}Type "help" to see available commands.{/}');
    }
  },
};
