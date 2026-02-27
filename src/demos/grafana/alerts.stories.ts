import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import type { DataTableColumn } from '../../organisms/data-table/bh-data-table.js';
import type { BhPixelPanel } from '../../molecules/pixel-panel/bh-pixel-panel.js';
import { renderAppShell, renderAlertCard, fullscreenDecorator, alertRules } from './_helpers.js';

const meta: Meta = {
  title: 'Demos/Grafana/Alerts',
  parameters: { layout: 'fullscreen' },
  decorators: [fullscreenDecorator],
};

export default meta;
type Story = StoryObj;

const firingAlerts = alertRules.filter(a => a.state === 'firing');
const firingCount = alertRules.filter(a => a.state === 'firing').length;
const pendingCount = alertRules.filter(a => a.state === 'pending').length;
const resolvedCount = alertRules.filter(a => a.state === 'resolved').length;

const alertColumns: DataTableColumn[] = [
  { key: 'name', label: 'Rule' },
  { key: 'state', label: 'State' },
  { key: 'severity', label: 'Severity' },
  { key: 'instance', label: 'Instance' },
  { key: 'duration', label: 'Duration', align: 'end' },
  { key: 'value', label: 'Value', align: 'end' },
];

export const Default: Story = {
  render: () =>
    renderAppShell('alerting', ['Alerting', 'Alert Rules'], html`
      <bh-cover gap="md" min-height="500px">
        <bh-stack gap="md">
          <bh-repel>
            <bh-text variant="heading">Alerting</bh-text>
            <bh-button variant="secondary" size="sm">
              <bh-icon slot="prefix" name="plus"></bh-icon>
              New Alert Rule
            </bh-button>
          </bh-repel>
          <bh-cluster gap="sm">
            <bh-chip variant="danger">Firing (${firingCount})</bh-chip>
            <bh-chip variant="warning">Pending (${pendingCount})</bh-chip>
            <bh-chip>Resolved (${resolvedCount})</bh-chip>
          </bh-cluster>
        </bh-stack>

        <div slot="center">
          <bh-stack gap="lg">
            <bh-section-header heading="Firing">
              <bh-badge slot="badge" variant="danger">Critical</bh-badge>
            </bh-section-header>
            <bh-stack gap="sm">
              ${firingAlerts.map((a, i) => renderAlertCard(html`
                <bh-stack gap="sm">
                  <bh-repel>
                    <bh-cluster gap="sm" align="center">
                      <bh-led color="danger" pulse size="sm"></bh-led>
                      <bh-stack gap="xs">
                        <bh-text variant="body"><strong>${a.name}</strong></bh-text>
                        <bh-cluster gap="xs">
                          <bh-badge variant="danger" size="sm">${a.severity}</bh-badge>
                          <bh-text variant="small">${a.instance} &middot; ${a.duration}</bh-text>
                        </bh-cluster>
                      </bh-stack>
                    </bh-cluster>
                    <bh-text variant="code">${a.value}</bh-text>
                  </bh-repel>
                  <bh-pixel-panel
                    id="alert-spark-${i}"
                    label="${a.name}" value="${a.value}"
                    cols="40" rows="7"
                    type="sparkline"
                    transition="step"
                    color="1"
                    footer-start="${a.instance}" footer-end="${a.duration}"
                  ></bh-pixel-panel>
                </bh-stack>
              `))}
            </bh-stack>

            <bh-section-header heading="All Rules" .count=${alertRules.length}></bh-section-header>
            <bh-data-table .columns=${alertColumns} .rows=${alertRules}></bh-data-table>
          </bh-stack>
        </div>

        <div slot="bottom">
          <bh-repel class="graf-status-bar">
            <bh-text variant="small">Evaluation: 15s &middot; Alertmanager: connected</bh-text>
            <bh-cluster gap="sm" align="center">
              <bh-led color="success" size="sm"></bh-led>
              <bh-text variant="small">Alertmanager</bh-text>
            </bh-cluster>
          </bh-repel>
        </div>
      </bh-cover>
    `),

  play: async ({ canvasElement }) => {
    const panels = firingAlerts.map((_, i) =>
      canvasElement.querySelector<BhPixelPanel>(`#alert-spark-${i}`)
    ).filter(Boolean) as BhPixelPanel[];

    await Promise.all(panels.map(p => p.updateComplete));

    const states = panels.map((panel, i) => {
      const baseVal = 70 + i * 8;
      let val = baseVal;
      for (let j = 0; j < 40; j++) {
        val += (Math.random() - 0.35) * 15;
        val = Math.max(20, Math.min(99, val));
        panel.push(Math.round(val));
      }
      return { panel, val };
    });

    setInterval(() => {
      for (const s of states) {
        s.val += (Math.random() - 0.35) * 10;
        s.val = Math.max(20, Math.min(99, s.val));
        s.panel.push(Math.round(s.val));
      }
    }, 1000);
  },
};
