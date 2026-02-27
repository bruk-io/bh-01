import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import './bh-sidebar-panel.js';

const meta: Meta = {
  title: 'Organisms/Shell/SidebarPanel',
  component: 'bh-sidebar-panel',
  argTypes: {
    collapsed: {
      control: 'boolean',
      description: 'Whether the panel is collapsed (width animates to 0)',
    },
  },
  args: {
    collapsed: false,
  },
  parameters: {
    layout: 'centered',
  },
};
export default meta;
type Story = StoryObj;

export const Default: Story = {
  name: 'Default',
  render: (args) => html`
    <bh-sidebar-panel
      style="height: 400px;"
      ?collapsed=${args['collapsed']}
      @bh-sidebar-collapse=${(e: CustomEvent) => console.log('bh-sidebar-collapse:', e.detail)}
    >
      <span slot="header" style="font-size: 0.75rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em;">
        Explorer
      </span>
      <div style="padding: 0.5rem 0.75rem; font-size: 0.875rem; color: var(--bh-color-text-muted, #888);">
        <p style="margin: 0 0 0.5rem;">Open Editors</p>
        <p style="margin: 0 0 0.5rem;">bh-sidebar-panel.ts</p>
        <p style="margin: 0 0 0.5rem;">bh-activity-bar.ts</p>
        <p style="margin: 0;">bh-app-shell.ts</p>
      </div>
    </bh-sidebar-panel>
  `,
};

export const Collapsed: Story = {
  name: 'Collapsed',
  args: {
    collapsed: true,
  },
  render: (args) => html`
    <div style="display: flex; height: 400px;">
      <bh-sidebar-panel ?collapsed=${args['collapsed']}>
        <span slot="header" style="font-size: 0.75rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em;">
          Explorer
        </span>
        <div style="padding: 0.5rem 0.75rem; font-size: 0.875rem;">
          <p style="margin: 0;">Panel content hidden when collapsed</p>
        </div>
      </bh-sidebar-panel>
      <div style="padding: 1rem; font-size: 0.875rem; color: var(--bh-color-text-muted, #888);">
        Main content area (panel is collapsed to 0 width)
      </div>
    </div>
  `,
};

export const WithTree: Story = {
  name: 'WithTree',
  render: () => html`
    <bh-sidebar-panel style="height: 400px;">
      <span slot="header" style="font-size: 0.75rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em;">
        Explorer
      </span>
      <div style="padding: 0.25rem 0; font-size: 0.875rem;">
        <ul style="list-style: none; margin: 0; padding: 0;">
          <li style="padding: 0.25rem 0.75rem; cursor: pointer;">
            <details open>
              <summary style="cursor: pointer; user-select: none; font-weight: 500;">📁 src</summary>
              <ul style="list-style: none; margin: 0; padding-left: 1.25rem;">
                <li style="padding: 0.2rem 0; cursor: pointer;">
                  <details open>
                    <summary style="cursor: pointer; user-select: none; font-weight: 500;">📁 organisms</summary>
                    <ul style="list-style: none; margin: 0; padding-left: 1.25rem;">
                      <li style="padding: 0.2rem 0; cursor: pointer;">
                        <details>
                          <summary style="cursor: pointer; user-select: none; font-weight: 500;">📁 shell</summary>
                          <ul style="list-style: none; margin: 0; padding-left: 1.25rem;">
                            <li style="padding: 0.2rem 0;">📄 bh-app-shell.ts</li>
                            <li style="padding: 0.2rem 0;">📄 bh-activity-bar.ts</li>
                            <li style="padding: 0.2rem 0;">📄 bh-sidebar-panel.ts</li>
                            <li style="padding: 0.2rem 0;">📄 bh-status-bar.ts</li>
                          </ul>
                        </details>
                      </li>
                    </ul>
                  </details>
                </li>
                <li style="padding: 0.2rem 0; cursor: pointer;">
                  <details>
                    <summary style="cursor: pointer; user-select: none; font-weight: 500;">📁 atoms</summary>
                    <ul style="list-style: none; margin: 0; padding-left: 1.25rem;">
                      <li style="padding: 0.2rem 0;">📄 bh-button.ts</li>
                      <li style="padding: 0.2rem 0;">📄 bh-input.ts</li>
                    </ul>
                  </details>
                </li>
              </ul>
            </details>
          </li>
        </ul>
      </div>
    </bh-sidebar-panel>
  `,
};
