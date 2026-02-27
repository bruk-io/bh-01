import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { renderAppShell, fullscreenDecorator, dashboardList } from './_helpers.js';

const meta: Meta = {
  title: 'Demos/Grafana/Dashboard Home',
  parameters: { layout: 'fullscreen' },
  decorators: [fullscreenDecorator],
};

export default meta;
type Story = StoryObj;

const folders = ['All', 'Infrastructure', 'Databases', 'Networking', 'Services', 'Observability'];

export const Default: Story = {
  render: () =>
    renderAppShell('dashboards', ['Dashboards'], html`
      <bh-stack gap="lg">
        <bh-input type="search" placeholder="Search dashboards...">
          <bh-icon slot="prefix" name="search"></bh-icon>
        </bh-input>

        <bh-cluster gap="sm">
          ${folders.map((f, i) => html`
            <bh-chip .variant=${i === 0 ? 'primary' : 'default'}>${f}</bh-chip>
          `)}
        </bh-cluster>

        <bh-section-header heading="Dashboards" .count=${dashboardList.length}></bh-section-header>

        <bh-grid gap="md" min="280px">
          ${dashboardList.map(d => html`
            <bh-card variant="outlined" padding="md">
              <bh-stack gap="sm">
                <bh-text variant="body"><strong>${d.name}</strong></bh-text>
                <bh-repel gap="sm">
                  <bh-cluster gap="xs" align="center">
                    <bh-icon name="menu" size="sm" class="graf-breadcrumb-sep"></bh-icon>
                    <bh-text variant="small">${d.folder}</bh-text>
                  </bh-cluster>
                  <bh-text variant="small">&#9733; ${d.stars}</bh-text>
                </bh-repel>
              </bh-stack>
            </bh-card>
          `)}
        </bh-grid>
      </bh-stack>
    `),
};
