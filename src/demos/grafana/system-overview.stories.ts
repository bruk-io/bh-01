import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import type { BhPixelPanel } from '../../molecules/pixel-panel/bh-pixel-panel.js';
import {
  renderAppShell,
  renderStatPanel,
  renderPanel,
  renderAlertCard,
  fullscreenDecorator,
  services,
  alertRules,
} from './_helpers.js';

const meta: Meta = {
  title: 'Demos/Grafana/System Overview',
  parameters: { layout: 'fullscreen' },
  decorators: [fullscreenDecorator],
};

export default meta;
type Story = StoryObj;

const firingAlerts = alertRules.filter(a => a.state === 'firing');

export const Default: Story = {
  render: () =>
    renderAppShell('dashboards', ['Dashboards', 'Infrastructure', 'System Overview'], html`
      <bh-stack gap="lg">
        <bh-repel>
          <bh-text variant="heading">System Overview</bh-text>
          <bh-cluster gap="sm" align="center">
            <bh-led color="success" pulse></bh-led>
            <bh-text variant="small">All systems operational</bh-text>
          </bh-cluster>
        </bh-repel>

        <bh-switcher gap="md" threshold="10rem" limit="5">
          ${renderStatPanel('CPU', '23', '%')}
          ${renderStatPanel('Memory', '67', '%')}
          ${renderStatPanel('Disk', '45', '%')}
          ${renderStatPanel('Network', '342', 'Mbps')}
          ${renderStatPanel('Uptime', '14', 'days')}
        </bh-switcher>

        <bh-grid gap="md" min="350px">
          ${renderPanel('CPU Usage', html`
            <bh-pixel-panel
              id="graf-cpu"
              label="CPU" value="-"
              cols="40" rows="9"
              type="sparkline"
              transition="step"
              color="2"
              footer-start="8 cores" footer-end="1s interval"
            ></bh-pixel-panel>
          `)}
          ${renderPanel('Memory', html`
            <bh-pixel-panel
              id="graf-mem"
              label="MEMORY" value="-"
              cols="40" rows="5"
              type="bar"
              color="3"
              footer-start="16 GB" footer-end="used"
            ></bh-pixel-panel>
          `)}
          ${renderPanel('Network Traffic', html`
            <bh-pixel-panel
              id="graf-net"
              label="NETWORK" value="-"
              cols="40" rows="9"
              type="sparkline"
              transition="sweep"
              color="1"
              footer-start="eth0" footer-end="Mbps"
            ></bh-pixel-panel>
          `)}
          ${renderPanel('Disk I/O', html`
            <bh-pixel-panel
              id="graf-disk"
              label="DISK I/O" value="-"
              cols="40" rows="9"
              type="sparkline"
              transition="step"
              color="2"
              footer-start="nvme0n1" footer-end="MB/s"
            ></bh-pixel-panel>
          `)}
        </bh-grid>

        <bh-section-header heading="Service Health" .count=${services.length}></bh-section-header>
        <bh-grid gap="md" min="180px">
          ${services.map(s => html`
            <bh-card variant="outlined" padding="sm">
              <bh-cluster gap="sm" align="center">
                <bh-led color=${s.status} size="sm"></bh-led>
                <bh-text variant="small">${s.name}</bh-text>
              </bh-cluster>
            </bh-card>
          `)}
        </bh-grid>

        <bh-section-header heading="Recent Alerts" .count=${firingAlerts.length}></bh-section-header>
        <bh-reel gap="md" item-width="280px">
          ${firingAlerts.map(a => renderAlertCard(html`
            <bh-stack gap="xs">
              <bh-cluster gap="sm" align="center">
                <bh-led color="danger" pulse size="sm"></bh-led>
                <bh-text variant="small"><strong>${a.name}</strong></bh-text>
              </bh-cluster>
              <bh-cluster gap="xs">
                <bh-badge variant="danger" size="sm">${a.severity}</bh-badge>
                <bh-text variant="small">${a.instance}</bh-text>
              </bh-cluster>
            </bh-stack>
          `))}
        </bh-reel>
      </bh-stack>
    `),

  play: async ({ canvasElement }) => {
    const cpu = canvasElement.querySelector<BhPixelPanel>('#graf-cpu');
    const mem = canvasElement.querySelector<BhPixelPanel>('#graf-mem');
    const net = canvasElement.querySelector<BhPixelPanel>('#graf-net');
    const disk = canvasElement.querySelector<BhPixelPanel>('#graf-disk');
    const panels = [cpu, mem, net, disk].filter(Boolean) as BhPixelPanel[];
    if (panels.length === 0) return;
    await Promise.all(panels.map(p => p.updateComplete));

    // Seed CPU sparkline
    let cpuVal = 30 + Math.random() * 40;
    for (let i = 0; i < 40; i++) {
      cpuVal += (Math.random() - 0.5) * 20;
      cpuVal = Math.max(5, Math.min(95, cpuVal));
      cpu!.push(Math.round(cpuVal));
    }
    cpu!.value = `${Math.round(cpuVal)}%`;

    // Seed Memory bar
    let memVal = 67;
    mem!.push(memVal);
    mem!.value = `${memVal}%`;

    // Seed Network sparkline
    let netVal = 50;
    for (let i = 0; i < 40; i++) {
      netVal += (Math.random() - 0.5) * 30;
      netVal = Math.max(0, Math.min(100, netVal));
      net!.push(Math.round(netVal));
    }
    net!.value = `${Math.round(netVal * 3.42)}`;

    // Seed Disk I/O sparkline
    let diskVal = 40;
    for (let i = 0; i < 40; i++) {
      diskVal += (Math.random() - 0.5) * 20;
      diskVal = Math.max(5, Math.min(90, diskVal));
      disk!.push(Math.round(diskVal));
    }
    disk!.value = `${Math.round(diskVal)}`;

    // Stream live values
    setInterval(() => {
      cpuVal += (Math.random() - 0.5) * 15;
      cpuVal = Math.max(5, Math.min(95, cpuVal));
      cpu!.push(Math.round(cpuVal));
      cpu!.value = `${Math.round(cpuVal)}%`;

      memVal += (Math.random() - 0.5) * 5;
      memVal = Math.max(30, Math.min(90, memVal));
      mem!.push(Math.round(memVal));
      mem!.value = `${Math.round(memVal)}%`;

      netVal += (Math.random() - 0.5) * 25;
      netVal = Math.max(0, Math.min(100, netVal));
      net!.push(Math.round(netVal));
      net!.value = `${Math.round(netVal * 3.42)}`;

      diskVal += (Math.random() - 0.5) * 15;
      diskVal = Math.max(5, Math.min(90, diskVal));
      disk!.push(Math.round(diskVal));
      disk!.value = `${Math.round(diskVal)}`;
    }, 1000);
  },
};
