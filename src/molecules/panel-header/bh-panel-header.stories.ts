import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import './bh-panel-header.js';
import '../../atoms/button/bh-button.js';

const meta: Meta = {
  title: 'Molecules/PanelHeader',
  component: 'bh-panel-header',
  argTypes: {
    label: { control: 'text' },
  },
  args: {
    label: 'Explorer',
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: (args) => html`
    <div style="max-width: 300px; border: 1px solid var(--bh-color-border); border-radius: var(--bh-radius-md);">
      <bh-panel-header label=${args.label}></bh-panel-header>
    </div>
  `,
};

export const WithEndSlot: Story = {
  render: () => html`
    <div style="max-width: 300px; border: 1px solid var(--bh-color-border); border-radius: var(--bh-radius-md);">
      <bh-panel-header label="Explorer">
        <bh-button slot="end" variant="ghost" size="sm">+</bh-button>
      </bh-panel-header>
    </div>
  `,
};

export const Multiple: Story = {
  render: () => html`
    <div style="max-width: 300px; border: 1px solid var(--bh-color-border); border-radius: var(--bh-radius-md); overflow: hidden;">
      <bh-panel-header label="Explorer">
        <bh-button slot="end" variant="ghost" size="sm">+</bh-button>
      </bh-panel-header>
      <bh-panel-header label="Open Editors"></bh-panel-header>
      <bh-panel-header label="Source Control">
        <bh-button slot="end" variant="ghost" size="sm">Refresh</bh-button>
      </bh-panel-header>
      <bh-panel-header label="Outline"></bh-panel-header>
    </div>
  `,
};
