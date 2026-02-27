import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import './bh-context-menu.js';
import type { ContextMenuItem } from './bh-context-menu.js';

const defaultItems: ContextMenuItem[] = [
  { id: 'open', label: 'Open' },
  { id: 'open-with', label: 'Open With...' },
  { id: 'copy', label: 'Copy' },
  { id: 'paste', label: 'Paste' },
  { id: 'rename', label: 'Rename' },
  { id: 'delete', label: 'Delete' },
];

const itemsWithDisabled: ContextMenuItem[] = [
  { id: 'cut', label: 'Cut' },
  { id: 'copy', label: 'Copy' },
  { id: 'paste', label: 'Paste', disabled: true },
  { id: 'select-all', label: 'Select All' },
  { id: 'undo', label: 'Undo', disabled: true },
  { id: 'redo', label: 'Redo', disabled: true },
];

const itemsWithSeparators: ContextMenuItem[] = [
  { id: 'new-file', label: 'New File' },
  { id: 'new-folder', label: 'New Folder' },
  { id: 'sep-1', label: '', separator: true },
  { id: 'cut', label: 'Cut' },
  { id: 'copy', label: 'Copy' },
  { id: 'paste', label: 'Paste' },
  { id: 'sep-2', label: '', separator: true },
  { id: 'rename', label: 'Rename' },
  { id: 'delete', label: 'Delete' },
];

const triggerAreaStyle = `
  display: flex;
  align-items: center;
  justify-content: center;
  width: 400px;
  height: 200px;
  border: 2px dashed var(--bh-color-border);
  border-radius: var(--bh-radius-md);
  color: var(--bh-color-text-muted);
  font-size: 0.875rem;
  user-select: none;
  cursor: context-menu;
`;

const meta: Meta = {
  title: 'Organisms/ContextMenu',
  component: 'bh-context-menu',
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => html`
    <div
      style=${triggerAreaStyle}
      @contextmenu=${(e: MouseEvent) => {
        e.preventDefault();
        const menu = document.querySelector('bh-context-menu#ctx-default') as HTMLElement & {
          show(x: number, y: number, items?: ContextMenuItem[]): void;
        };
        menu?.show(e.clientX, e.clientY, defaultItems);
      }}
    >
      Right-click anywhere in this area
    </div>
    <bh-context-menu
      id="ctx-default"
      @bh-select=${(e: CustomEvent) => console.log('Selected:', e.detail)}
    ></bh-context-menu>
  `,
};

export const WithDisabledItems: Story = {
  render: () => html`
    <div
      style=${triggerAreaStyle}
      @contextmenu=${(e: MouseEvent) => {
        e.preventDefault();
        const menu = document.querySelector('bh-context-menu#ctx-disabled') as HTMLElement & {
          show(x: number, y: number, items?: ContextMenuItem[]): void;
        };
        menu?.show(e.clientX, e.clientY, itemsWithDisabled);
      }}
    >
      Right-click to see menu with disabled items
    </div>
    <bh-context-menu
      id="ctx-disabled"
      @bh-select=${(e: CustomEvent) => console.log('Selected:', e.detail)}
    ></bh-context-menu>
  `,
};

export const WithSeparators: Story = {
  render: () => html`
    <div
      style=${triggerAreaStyle}
      @contextmenu=${(e: MouseEvent) => {
        e.preventDefault();
        const menu = document.querySelector('bh-context-menu#ctx-separators') as HTMLElement & {
          show(x: number, y: number, items?: ContextMenuItem[]): void;
        };
        menu?.show(e.clientX, e.clientY, itemsWithSeparators);
      }}
    >
      Right-click to see menu with separators
    </div>
    <bh-context-menu
      id="ctx-separators"
      @bh-select=${(e: CustomEvent) => console.log('Selected:', e.detail)}
    ></bh-context-menu>
  `,
};
