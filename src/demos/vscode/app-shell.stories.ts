import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { fullscreenDecorator, vsStyles } from './_helpers.js';

// Side-effect import — registers bh-vscode-demo custom element
import './_helpers.js';

const meta: Meta = {
  title: 'Demos/VSCode/App Shell',
  parameters: { layout: 'fullscreen' },
  decorators: [fullscreenDecorator],
};

export default meta;
type Story = StoryObj;

// ---------------------------------------------------------------------------
// Default — fully interactive: click activity items to switch sidebar panels
// ---------------------------------------------------------------------------

export const Default: Story = {
  name: 'Interactive editor',
  render: () => html`<bh-vscode-demo></bh-vscode-demo>`,
};

// ---------------------------------------------------------------------------
// Welcome screen — no file open, keyboard shortcut reference
// ---------------------------------------------------------------------------

export const WelcomeScreen: Story = {
  name: 'Welcome screen',
  render: () => html`
    ${vsStyles}
    <bh-app-shell sidebar-open class="vs-shell">

      <bh-activity-bar slot="activity">
        <bh-activity-item item-id="explorer" label="Explorer" active>
          <bh-icon name="files"></bh-icon>
        </bh-activity-item>
        <bh-activity-item item-id="search" label="Search">
          <bh-icon name="search"></bh-icon>
        </bh-activity-item>
        <bh-activity-item item-id="git" label="Source Control">
          <bh-icon name="git-branch"></bh-icon>
        </bh-activity-item>
        <bh-activity-item item-id="extensions" label="Extensions">
          <bh-icon name="extensions"></bh-icon>
        </bh-activity-item>
      </bh-activity-bar>

      <div slot="sidebar" class="vs-sidebar-slot">
        <bh-sidebar-panel style="height:100%">
          <bh-panel-header slot="header" label="Explorer"></bh-panel-header>
          <bh-text variant="small" style="padding:var(--bh-spacing-4);color:var(--bh-color-text-muted)">
            No folder opened
          </bh-text>
        </bh-sidebar-panel>
      </div>

      <div class="vs-welcome">
        <span class="vs-welcome-title">bh-01</span>
        <bh-text variant="small">A Lit 3 web component library</bh-text>
        <div class="vs-welcome-shortcuts">
          <div class="vs-shortcut-row">
            <bh-text variant="small">Command Palette</bh-text>
            <span class="vs-kbd"><kbd>⌘</kbd><kbd>K</kbd></span>
          </div>
          <div class="vs-shortcut-row">
            <bh-text variant="small">Toggle sidebar</bh-text>
            <span class="vs-kbd"><kbd>⌘</kbd><kbd>B</kbd></span>
          </div>
          <div class="vs-shortcut-row">
            <bh-text variant="small">Open file</bh-text>
            <span class="vs-kbd"><kbd>⌘</kbd><kbd>P</kbd></span>
          </div>
          <div class="vs-shortcut-row">
            <bh-text variant="small">New file</bh-text>
            <span class="vs-kbd"><kbd>⌘</kbd><kbd>N</kbd></span>
          </div>
        </div>
      </div>

      <bh-status-bar slot="status" message="Ready"></bh-status-bar>

    </bh-app-shell>
  `,
};

// ---------------------------------------------------------------------------
// Error state
// ---------------------------------------------------------------------------

export const WithError: Story = {
  name: 'Editor with error',
  render: () => html`
    ${vsStyles}
    <bh-vscode-demo-error></bh-vscode-demo-error>
  `,
};
