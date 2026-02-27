import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { textToGrid } from '../../primitives/pixel-font.js';
import { sparklineToGrid, barToGrid, compositeGrids } from '../../primitives/pixel-renderers.js';
import './bh-pixel-display.js';

const meta: Meta = {
  title: 'Atoms/PixelDisplay',
  component: 'bh-pixel-display',
  argTypes: {
    cols: { control: { type: 'number', min: 1, max: 60 } },
    rows: { control: { type: 'number', min: 1, max: 20 } },
    label: { control: 'text' },
  },
  args: {
    cols: 20,
    rows: 5,
    label: 'Pixel display',
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: (args) => {
    const data = textToGrid('HI', args.cols, args.rows);
    return html`
      <bh-pixel-display
        cols=${args.cols}
        rows=${args.rows}
        .data=${data}
        label=${args.label}
      ></bh-pixel-display>
    `;
  },
};

export const TextDisplay: Story = {
  render: () => {
    const data = textToGrid('CPU 23%', 40, 5);
    return html`
      <bh-pixel-display cols="40" rows="5" .data=${data} label="CPU text"></bh-pixel-display>
    `;
  },
};

export const Sparkline: Story = {
  render: () => {
    const values = [10, 25, 40, 35, 60, 80, 55, 70, 90, 45, 30, 50, 65, 75, 85, 40, 55, 70, 60, 50];
    const data = sparklineToGrid(values, 20, 9, 2);
    return html`
      <bh-pixel-display cols="20" rows="9" .data=${data} label="Sparkline chart"></bh-pixel-display>
    `;
  },
};

export const ProgressBar: Story = {
  render: () => {
    const data = barToGrid(73, 20, 3, 1);
    return html`
      <bh-pixel-display cols="20" rows="3" .data=${data} label="73% progress"></bh-pixel-display>
    `;
  },
};

export const Composite: Story = {
  render: () => {
    const cols = 40;
    const rows = 9;
    const values = [10, 25, 40, 35, 60, 80, 55, 70, 90, 45, 30, 50, 65, 75, 85, 40, 55, 70, 60, 50];
    const spark = sparklineToGrid(values, cols, rows, 2);
    const label = textToGrid('CPU', cols, rows, 1);
    const data = compositeGrids(spark, label);
    return html`
      <bh-pixel-display cols=${cols} rows=${rows} .data=${data} label="CPU sparkline with label"></bh-pixel-display>
    `;
  },
};

export const AllColors: Story = {
  render: () => {
    const cols = 10;
    const rows = 5;
    const data = new Uint8Array(cols * rows);
    // Fill each row with a different color
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        data[r * cols + c] = Math.min(r + 1, 4);
      }
    }
    // Row 0 empty (index 0+1=1), row 1=2, row 2=3, row 3=4, row 4=4
    return html`
      <bh-pixel-display cols=${cols} rows=${rows} .data=${data} label="Color palette"></bh-pixel-display>
    `;
  },
};

export const LargePixels: Story = {
  render: () => {
    const data = textToGrid('OK', 10, 5);
    return html`
      <bh-pixel-display
        cols="10"
        rows="5"
        .data=${data}
        label="Large pixels"
        style="--bh-pixel-size: 12px; --bh-pixel-gap: 2px; --bh-pixel-radius: 3px; --bh-pixel-glow: 8px;"
      ></bh-pixel-display>
    `;
  },
};
