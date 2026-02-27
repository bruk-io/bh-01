import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import type { DataTableColumn } from '../../organisms/data-table/bh-data-table.js';
import {
  renderAppShell,
  renderStatPanel,
  fullscreenDecorator,
  k8sNodes,
} from './_helpers.js';

const meta: Meta = {
  title: 'Demos/Grafana/Kubernetes',
  parameters: { layout: 'fullscreen' },
  decorators: [fullscreenDecorator],
};

export default meta;
type Story = StoryObj;

const nodeColumns: DataTableColumn[] = [
  { key: 'name', label: 'Name' },
  { key: 'status', label: 'Status' },
  { key: 'role', label: 'Role' },
  { key: 'cpu', label: 'CPU', align: 'end' },
  { key: 'memory', label: 'Memory', align: 'end' },
  { key: 'pods', label: 'Pods', align: 'end' },
];

const podStatuses = [
  { label: 'Running', color: 'success' as const, count: 82 },
  { label: 'Pending', color: 'warning' as const, count: 5 },
  { label: 'Failed', color: 'danger' as const, count: 2 },
  { label: 'Succeeded', color: 'success' as const, count: 2 },
];

const nsColumns: DataTableColumn[] = [
  { key: 'name', label: 'Namespace' },
  { key: 'pods', label: 'Pods', align: 'end' },
  { key: 'cpu', label: 'CPU Request', align: 'end' },
  { key: 'memory', label: 'Memory Request', align: 'end' },
  { key: 'status', label: 'Status' },
];

const nsData = [
  { name: 'default', pods: '12', cpu: '2.4 cores', memory: '4.1 Gi', status: 'Active' },
  { name: 'monitoring', pods: '8', cpu: '1.8 cores', memory: '3.2 Gi', status: 'Active' },
  { name: 'kube-system', pods: '15', cpu: '1.2 cores', memory: '2.8 Gi', status: 'Active' },
  { name: 'ingress-nginx', pods: '3', cpu: '0.5 cores', memory: '512 Mi', status: 'Active' },
  { name: 'cert-manager', pods: '3', cpu: '0.2 cores', memory: '256 Mi', status: 'Active' },
];

export const Default: Story = {
  render: () =>
    renderAppShell('dashboards', ['Dashboards', 'Infrastructure', 'Kubernetes Cluster'], html`
      <bh-stack gap="lg">
        <bh-repel>
          <bh-cluster gap="sm" align="center">
            <bh-text variant="heading">Kubernetes Cluster</bh-text>
            <bh-badge variant="success">Healthy</bh-badge>
          </bh-cluster>
          <bh-cluster gap="xs">
            <bh-chip variant="primary" size="sm">production</bh-chip>
            <bh-chip size="sm">v1.28.2</bh-chip>
          </bh-cluster>
        </bh-repel>

        <bh-switcher gap="md" threshold="12rem" limit="4">
          ${renderStatPanel('Nodes', '4')}
          ${renderStatPanel('Pods', '91/440')}
          ${renderStatPanel('CPU Req', '45', '%')}
          ${renderStatPanel('Mem Req', '62', '%')}
        </bh-switcher>

        <bh-split ratio="3/2" gap="md">
          <bh-card variant="outlined" padding="none">
            <bh-text slot="header" variant="small"><strong>Nodes</strong></bh-text>
            <bh-data-table
              variant="striped"
              density="compact"
              .columns=${nodeColumns}
              .rows=${k8sNodes}
            ></bh-data-table>
          </bh-card>

          <bh-card variant="outlined" padding="md">
            <bh-text slot="header" variant="small"><strong>Pod Status</strong></bh-text>
            <bh-stack gap="md">
              ${podStatuses.map(ps => html`
                <bh-repel>
                  <bh-cluster gap="sm" align="center">
                    <bh-led color=${ps.color} size="sm"></bh-led>
                    <bh-text variant="small">${ps.label}</bh-text>
                  </bh-cluster>
                  <bh-text variant="code">${ps.count}</bh-text>
                </bh-repel>
              `)}
              <bh-divider></bh-divider>
              <bh-progress value="91" max="440" variant="success"></bh-progress>
              <bh-text variant="small">91 / 440 pods allocated</bh-text>
            </bh-stack>
          </bh-card>
        </bh-split>

        <bh-section-header heading="Namespaces" .count=${nsData.length}></bh-section-header>
        <bh-data-table .columns=${nsColumns} .rows=${nsData}></bh-data-table>
      </bh-stack>
    `),
};
