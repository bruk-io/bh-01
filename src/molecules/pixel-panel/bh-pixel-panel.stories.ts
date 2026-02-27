import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { sparklineToGrid, barToGrid } from '../../primitives/pixel-renderers.js';
import { textToGrid } from '../../primitives/pixel-font.js';
import '../../atoms/pixel-display/bh-pixel-display.js';
import type { BhPixelPanel } from './bh-pixel-panel.js';
import './bh-pixel-panel.js';

const meta: Meta = {
  title: 'Molecules/PixelPanel',
  component: 'bh-pixel-panel',
  argTypes: {
    label: { control: 'text' },
    value: { control: 'text' },
    footerStart: { control: 'text' },
    footerEnd: { control: 'text' },
  },
  args: {
    label: 'CPU',
    value: '23%',
    footerStart: '8 cores',
    footerEnd: '5s interval',
  },
};

export default meta;
type Story = StoryObj;

// --- Slot mode (existing) ---

export const Default: Story = {
  render: (args) => {
    const data = sparklineToGrid(
      [10, 25, 40, 35, 60, 80, 55, 70, 90, 45, 30, 50, 65, 75, 85, 40, 55, 70, 60, 50,
       65, 80, 45, 55, 70, 85, 40, 60, 75, 50, 65, 45, 70, 80, 55, 60, 75, 85, 50, 40],
      40, 9, 2
    );
    return html`
      <bh-pixel-panel
        label=${args.label}
        value=${args.value}
        footer-start=${args.footerStart}
        footer-end=${args.footerEnd}
      >
        <bh-pixel-display cols="40" rows="9" .data=${data} label="CPU sparkline"></bh-pixel-display>
      </bh-pixel-panel>
    `;
  },
};

export const MemoryPanel: Story = {
  render: () => {
    const data = barToGrid(67, 40, 5, 3);
    return html`
      <bh-pixel-panel label="MEMORY" value="67%" footer-start="16 GB" footer-end="10.7 GB used">
        <bh-pixel-display cols="40" rows="5" .data=${data} label="Memory usage bar"></bh-pixel-display>
      </bh-pixel-panel>
    `;
  },
};

export const TextPanel: Story = {
  render: () => {
    const data = textToGrid('UP 14D', 30, 5, 2);
    return html`
      <bh-pixel-panel label="UPTIME" value="14 days">
        <bh-pixel-display cols="30" rows="5" .data=${data} label="Uptime display"></bh-pixel-display>
      </bh-pixel-panel>
    `;
  },
};

// --- Managed mode (new) ---

/** Helper: start a fake data interval, return cleanup function. */
function startFakeStream(
  panel: BhPixelPanel,
  generator: () => number,
  intervalMs: number,
): () => void {
  const id = setInterval(() => panel.push(generator()), intervalMs);
  return () => clearInterval(id);
}

export const ManagedSparkline: Story = {
  render: () => html`
    <bh-pixel-panel
      id="managed-spark"
      label="CPU" value="—"
      cols="40" rows="9"
      type="sparkline"
      transition="step"
      color="2"
      footer-start="8 cores" footer-end="1s interval"
    ></bh-pixel-panel>
  `,
  play: async ({ canvasElement }) => {
    const panel = canvasElement.querySelector<BhPixelPanel>('#managed-spark')!;
    await panel.updateComplete;

    // Seed with some initial data
    let cpu = 30 + Math.random() * 40;
    for (let i = 0; i < 40; i++) {
      cpu += (Math.random() - 0.5) * 20;
      cpu = Math.max(5, Math.min(95, cpu));
      panel.push(Math.round(cpu));
    }
    panel.value = `${Math.round(cpu)}%`;

    // Stream live values
    const cleanup = startFakeStream(panel, () => {
      cpu += (Math.random() - 0.5) * 15;
      cpu = Math.max(5, Math.min(95, cpu));
      panel.value = `${Math.round(cpu)}%`;
      return Math.round(cpu);
    }, 1000);

    // Storybook doesn't have a teardown hook, but the interval
    // dies when the iframe reloads on story change.
    void cleanup;
  },
};

export const ManagedBar: Story = {
  render: () => html`
    <bh-pixel-panel
      id="managed-bar"
      label="MEMORY" value="—"
      cols="40" rows="5"
      type="bar"
      color="3"
      footer-start="16 GB" footer-end="used"
    ></bh-pixel-panel>
  `,
  play: async ({ canvasElement }) => {
    const panel = canvasElement.querySelector<BhPixelPanel>('#managed-bar')!;
    await panel.updateComplete;

    let mem = 55;
    panel.push(mem);
    panel.value = `${mem}%`;

    const cleanup = startFakeStream(panel, () => {
      mem += (Math.random() - 0.5) * 8;
      mem = Math.max(20, Math.min(90, mem));
      panel.value = `${Math.round(mem)}%`;
      return Math.round(mem);
    }, 2000);

    void cleanup;
  },
};

export const ManagedText: Story = {
  render: () => html`
    <bh-pixel-panel
      id="managed-text"
      label="UPTIME" value="counting..."
      cols="30" rows="5"
      type="text"
      color="2"
    ></bh-pixel-panel>
  `,
  play: async ({ canvasElement }) => {
    const panel = canvasElement.querySelector<BhPixelPanel>('#managed-text')!;
    await panel.updateComplete;

    let seconds = 0;
    const tick = () => {
      seconds++;
      const m = Math.floor(seconds / 60);
      const s = seconds % 60;
      const display = m > 0 ? `${m}M ${s}S` : `${s}S`;
      panel.setText(display);
      panel.value = display;
    };

    tick();
    setInterval(tick, 1000);
  },
};

export const ManagedSweep: Story = {
  render: () => html`
    <bh-pixel-panel
      id="managed-sweep"
      label="NETWORK" value="—"
      cols="40" rows="9"
      type="sparkline"
      transition="sweep"
      color="1"
      footer-start="eth0" footer-end="Mbps"
    ></bh-pixel-panel>
  `,
  play: async ({ canvasElement }) => {
    const panel = canvasElement.querySelector<BhPixelPanel>('#managed-sweep')!;
    await panel.updateComplete;

    let throughput = 50;
    for (let i = 0; i < 40; i++) {
      throughput += (Math.random() - 0.5) * 30;
      throughput = Math.max(0, Math.min(100, throughput));
      panel.push(Math.round(throughput));
    }
    panel.value = `${Math.round(throughput)}`;

    const cleanup = startFakeStream(panel, () => {
      throughput += (Math.random() - 0.5) * 25;
      throughput = Math.max(0, Math.min(100, throughput));
      panel.value = `${Math.round(throughput)}`;
      return Math.round(throughput);
    }, 800);

    void cleanup;
  },
};

// --- Dashboard layout ---

export const DashboardRow: Story = {
  render: () => html`
    <style>
      .dashboard-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 1rem;
        max-width: 800px;
      }
    </style>
    <div class="dashboard-grid">
      <bh-pixel-panel
        id="dash-cpu"
        label="CPU" value="—"
        cols="40" rows="9"
        type="sparkline" color="2"
        footer-start="8 cores" footer-end="1s"
      ></bh-pixel-panel>
      <bh-pixel-panel
        id="dash-mem"
        label="MEMORY" value="—"
        cols="40" rows="5"
        type="bar" color="3"
        footer-start="16 GB" footer-end="used"
      ></bh-pixel-panel>
      <bh-pixel-panel
        id="dash-disk"
        label="DISK" value="—"
        cols="40" rows="5"
        type="bar" color="1"
        footer-start="500 GB" footer-end="used"
      ></bh-pixel-panel>
    </div>
  `,
  play: async ({ canvasElement }) => {
    const cpu = canvasElement.querySelector<BhPixelPanel>('#dash-cpu')!;
    const mem = canvasElement.querySelector<BhPixelPanel>('#dash-mem')!;
    const disk = canvasElement.querySelector<BhPixelPanel>('#dash-disk')!;
    await Promise.all([cpu.updateComplete, mem.updateComplete, disk.updateComplete]);

    let cpuVal = 40, memVal = 65, diskVal = 45;

    // Seed CPU with history
    for (let i = 0; i < 40; i++) {
      cpuVal += (Math.random() - 0.5) * 20;
      cpuVal = Math.max(5, Math.min(95, cpuVal));
      cpu.push(Math.round(cpuVal));
    }
    cpu.value = `${Math.round(cpuVal)}%`;
    mem.push(Math.round(memVal));
    mem.value = `${Math.round(memVal)}%`;
    disk.push(Math.round(diskVal));
    disk.value = `${Math.round(diskVal)}%`;

    setInterval(() => {
      cpuVal += (Math.random() - 0.5) * 15;
      cpuVal = Math.max(5, Math.min(95, cpuVal));
      cpu.push(Math.round(cpuVal));
      cpu.value = `${Math.round(cpuVal)}%`;

      memVal += (Math.random() - 0.5) * 5;
      memVal = Math.max(30, Math.min(90, memVal));
      mem.push(Math.round(memVal));
      mem.value = `${Math.round(memVal)}%`;

      diskVal += (Math.random() - 0.3) * 2;
      diskVal = Math.max(30, Math.min(80, diskVal));
      disk.push(Math.round(diskVal));
      disk.value = `${Math.round(diskVal)}%`;
    }, 1000);
  },
};
