import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import './bh-app-shell.js';

const meta: Meta = {
  title: 'Organisms/Shell/AppShell',
  component: 'bh-app-shell',
  argTypes: {
    sidebarOpen: {
      control: 'boolean',
      description:
        'When true, the sidebar column expands to 250px. Maps to the `sidebar-open` attribute.',
    },
  },
  args: {
    sidebarOpen: true,
  },
  parameters: {
    layout: 'fullscreen',
  },
};
export default meta;
type Story = StoryObj;

const placeholderStyle = (bg: string, label: string) =>
  `background:${bg}; color:#fff; display:flex; align-items:center; justify-content:center;
   font-size:0.75rem; font-family:monospace; height:100%; width:100%; box-sizing:border-box;
   padding:0.25rem; opacity:0.85; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;
   label: "${label}";`;

export const Default: Story = {
  name: 'Default',
  render: (args) => html`
    <bh-app-shell
      style="height: 100vh; width: 100%;"
      ?sidebar-open=${args['sidebarOpen']}
    >
      <div slot="activity" style=${placeholderStyle('#3a3a5c', 'slot=activity')}>
        activity
      </div>
      <div slot="sidebar" style=${placeholderStyle('#2e4a3e', 'slot=sidebar')}>
        sidebar
      </div>
      <div style=${placeholderStyle('#1e2a3a', 'slot=(default)')}>
        main
      </div>
      <div slot="status" style=${placeholderStyle('#3a2a1e', 'slot=status')}>
        status
      </div>
    </bh-app-shell>
  `,
};

export const SidebarClosed: Story = {
  name: 'SidebarClosed',
  args: {
    sidebarOpen: false,
  },
  render: (args) => html`
    <bh-app-shell
      style="height: 100vh; width: 100%;"
      ?sidebar-open=${args['sidebarOpen']}
    >
      <div slot="activity" style=${placeholderStyle('#3a3a5c', 'slot=activity')}>
        activity
      </div>
      <div slot="sidebar" style=${placeholderStyle('#2e4a3e', 'slot=sidebar')}>
        sidebar (hidden)
      </div>
      <div style=${placeholderStyle('#1e2a3a', 'slot=(default)')}>
        main (sidebar collapsed — full width)
      </div>
      <div slot="status" style=${placeholderStyle('#3a2a1e', 'slot=status')}>
        status
      </div>
    </bh-app-shell>
  `,
};

export const FullLayout: Story = {
  name: 'FullLayout',
  args: {
    sidebarOpen: true,
  },
  render: (args) => html`
    <bh-app-shell
      style="height: 100vh; width: 100%;"
      ?sidebar-open=${args['sidebarOpen']}
    >
      <!-- Activity bar -->
      <div
        slot="activity"
        style="
          background: var(--bh-color-surface-recessed, #1e1e2e);
          border-right: 1px solid var(--bh-color-border, #333);
          display: flex;
          flex-direction: column;
          align-items: center;
          padding-top: 0.5rem;
          gap: 0.25rem;
          height: 100%;
        "
      >
        <button title="Explorer" style="background:none;border:none;color:var(--bh-color-text,#ccc);cursor:pointer;font-size:1.25rem;padding:0.5rem;border-left:2px solid var(--bh-color-primary,#7c6af7);">📁</button>
        <button title="Search" style="background:none;border:none;color:var(--bh-color-text-muted,#888);cursor:pointer;font-size:1.25rem;padding:0.5rem;border-left:2px solid transparent;">🔍</button>
        <button title="Source Control" style="background:none;border:none;color:var(--bh-color-text-muted,#888);cursor:pointer;font-size:1.25rem;padding:0.5rem;border-left:2px solid transparent;">🔀</button>
        <button title="Extensions" style="background:none;border:none;color:var(--bh-color-text-muted,#888);cursor:pointer;font-size:1.25rem;padding:0.5rem;border-left:2px solid transparent;">🧩</button>
      </div>

      <!-- Sidebar -->
      <div
        slot="sidebar"
        style="
          background: var(--bh-color-surface, #252535);
          border-right: 1px solid var(--bh-color-border, #333);
          height: 100%;
          overflow: hidden;
          font-size: 0.8125rem;
          color: var(--bh-color-text, #ccc);
        "
      >
        <div style="height:36px;display:flex;align-items:center;padding:0 0.75rem;border-bottom:1px solid var(--bh-color-border,#333);font-size:0.7rem;font-weight:600;text-transform:uppercase;letter-spacing:0.08em;color:var(--bh-color-text-muted,#888);">
          Explorer
        </div>
        <div style="padding:0.25rem 0.75rem;">
          <p style="margin:0.25rem 0;cursor:pointer;">📁 src</p>
          <p style="margin:0.25rem 0 0.25rem 1rem;cursor:pointer;">📁 organisms</p>
          <p style="margin:0.25rem 0 0.25rem 2rem;cursor:pointer;">📄 bh-app-shell.ts</p>
          <p style="margin:0.25rem 0 0.25rem 2rem;cursor:pointer;">📄 bh-activity-bar.ts</p>
          <p style="margin:0.25rem 0 0.25rem 2rem;cursor:pointer;">📄 bh-sidebar-panel.ts</p>
          <p style="margin:0.25rem 0 0.25rem 2rem;cursor:pointer;">📄 bh-status-bar.ts</p>
        </div>
      </div>

      <!-- Main content -->
      <div
        style="
          padding: 1.5rem;
          font-family: var(--bh-font-mono, monospace);
          font-size: 0.875rem;
          color: var(--bh-color-text, #ccc);
          background: var(--bh-color-bg, #13131f);
          height: 100%;
          box-sizing: border-box;
          overflow: auto;
        "
      >
        <p style="margin:0 0 0.5rem;color:var(--bh-color-text-muted,#888);">// bh-app-shell.ts</p>
        <p style="margin:0 0 0.25rem;"><span style="color:#7c6af7;">import</span> { html, css } <span style="color:#7c6af7;">from</span> <span style="color:#a8c7a0;">'lit'</span>;</p>
        <p style="margin:0 0 0.25rem;"><span style="color:#7c6af7;">import</span> { customElement, property } <span style="color:#7c6af7;">from</span> <span style="color:#a8c7a0;">'lit/decorators.js'</span>;</p>
        <br />
        <p style="margin:0 0 0.25rem;"><span style="color:#7c6af7;">@customElement</span>(<span style="color:#a8c7a0;">'bh-app-shell'</span>)</p>
        <p style="margin:0 0 0.25rem;"><span style="color:#7c6af7;">export class</span> <span style="color:#e0af68;">BhAppShell</span> <span style="color:#7c6af7;">extends</span> BaseElement { ... }</p>
      </div>

      <!-- Status bar -->
      <div
        slot="status"
        style="
          background: var(--bh-color-surface, #252535);
          border-top: 1px solid var(--bh-color-border, #333);
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 0.75rem;
          height: 100%;
          font-size: 0.7rem;
          color: var(--bh-color-text-muted, #888);
          box-sizing: border-box;
        "
      >
        <span>Ready</span>
        <div style="display:flex;gap:1rem;">
          <span>Ln 1, Col 1</span>
          <span>UTF-8</span>
          <span>TypeScript</span>
          <span>main ⎇</span>
        </div>
      </div>
    </bh-app-shell>
  `,
};
