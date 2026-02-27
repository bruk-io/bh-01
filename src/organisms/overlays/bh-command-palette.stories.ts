import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import './bh-command-palette.js';
import type { CommandPaletteItem } from './bh-command-palette.js';
import '../../atoms/button/bh-button.js';

const allCommands: CommandPaletteItem[] = [
  { id: 'new-file', label: 'New File', category: 'File', keybinding: 'Ctrl+N' },
  { id: 'open-file', label: 'Open File', category: 'File', keybinding: 'Ctrl+O' },
  { id: 'save-file', label: 'Save File', category: 'File', keybinding: 'Ctrl+S' },
  { id: 'save-as', label: 'Save As...', category: 'File', keybinding: 'Ctrl+Shift+S' },
  { id: 'close-tab', label: 'Close Tab', category: 'File', keybinding: 'Ctrl+W' },
  { id: 'undo', label: 'Undo', category: 'Edit', keybinding: 'Ctrl+Z' },
  { id: 'redo', label: 'Redo', category: 'Edit', keybinding: 'Ctrl+Y' },
  { id: 'find', label: 'Find in File', category: 'Edit', keybinding: 'Ctrl+F' },
  { id: 'replace', label: 'Replace in File', category: 'Edit', keybinding: 'Ctrl+H' },
  { id: 'toggle-sidebar', label: 'Toggle Sidebar', category: 'View', keybinding: 'Ctrl+B' },
  { id: 'toggle-terminal', label: 'Toggle Terminal', category: 'View', keybinding: 'Ctrl+`' },
  { id: 'zoom-in', label: 'Zoom In', category: 'View', keybinding: 'Ctrl+=' },
];

const meta: Meta = {
  title: 'Organisms/CommandPalette',
  component: 'bh-command-palette',
  argTypes: {
    placeholder: { control: 'text' },
  },
  args: {
    placeholder: 'Type a command...',
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: (args) => html`
    <div style="padding: 1rem;">
      <p style="color: var(--bh-color-text-muted); font-size: 0.875rem; margin: 0 0 1rem;">
        Click the button below to open the command palette. Use arrow keys to navigate, Enter to execute, Escape to close.
      </p>
      <bh-button
        @click=${() => {
          const palette = document.querySelector('bh-command-palette') as HTMLElement & { show(): void };
          palette?.show();
        }}
      >
        Open Command Palette
      </bh-button>
      <bh-command-palette
        placeholder=${args.placeholder}
        .items=${allCommands}
        @bh-execute=${(e: CustomEvent) => console.log('Execute:', e.detail)}
      ></bh-command-palette>
    </div>
  `,
};

export const Filtered: Story = {
  render: () => html`
    <div style="padding: 1rem;">
      <p style="color: var(--bh-color-text-muted); font-size: 0.875rem; margin: 0 0 1rem;">
        Opens pre-filtered to show only "File" category commands.
      </p>
      <bh-button
        @click=${() => {
          type PaletteEl = HTMLElement & { show(): void; updateComplete: Promise<boolean> };
          const palette = document.querySelector('bh-command-palette') as PaletteEl | null;
          if (palette) {
            palette.show();
            // Pre-fill the query after the palette finishes rendering
            palette.updateComplete.then(() => {
              const input = palette.shadowRoot?.querySelector('input') as HTMLInputElement | null;
              if (input) {
                input.value = 'file';
                input.dispatchEvent(new InputEvent('input', { bubbles: true }));
              }
            });
          }
        }}
      >
        Open Filtered (File commands)
      </bh-button>
      <bh-command-palette
        placeholder="Filter commands..."
        .items=${allCommands}
        @bh-execute=${(e: CustomEvent) => console.log('Execute:', e.detail)}
      ></bh-command-palette>
    </div>
  `,
};
