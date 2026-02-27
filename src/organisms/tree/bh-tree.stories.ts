import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import './bh-tree.js';
import './bh-tree-item.js';

const meta: Meta = {
  title: 'Organisms/Tree',
  component: 'bh-tree',
  argTypes: {
    selected: { control: 'text' },
  },
  args: {
    selected: '',
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: (args) => html`
    <bh-tree
      selected=${args.selected}
      style="width: 280px;"
      @bh-select=${(e: CustomEvent) => console.log('Selected:', e.detail)}
    >
      <bh-tree-item value="documents" label="Documents"></bh-tree-item>
      <bh-tree-item value="images" label="Images"></bh-tree-item>
      <bh-tree-item value="downloads" label="Downloads"></bh-tree-item>
      <bh-tree-item value="desktop" label="Desktop"></bh-tree-item>
    </bh-tree>
  `,
};

export const Nested: Story = {
  render: () => html`
    <bh-tree
      style="width: 280px;"
      @bh-select=${(e: CustomEvent) => console.log('Selected:', e.detail)}
    >
      <bh-tree-item value="src" label="src" expanded>
        <bh-tree-item slot="children" value="atoms" label="atoms" indent="1" expanded>
          <bh-tree-item slot="children" value="button" label="bh-button.ts" indent="2"></bh-tree-item>
          <bh-tree-item slot="children" value="input" label="bh-input.ts" indent="2"></bh-tree-item>
          <bh-tree-item slot="children" value="badge" label="bh-badge.ts" indent="2"></bh-tree-item>
        </bh-tree-item>
        <bh-tree-item slot="children" value="molecules" label="molecules" indent="1">
          <bh-tree-item slot="children" value="card" label="bh-card.ts" indent="2"></bh-tree-item>
          <bh-tree-item slot="children" value="search-bar" label="bh-search-bar.ts" indent="2"></bh-tree-item>
        </bh-tree-item>
        <bh-tree-item slot="children" value="organisms" label="organisms" indent="1">
          <bh-tree-item slot="children" value="data-table" label="bh-data-table.ts" indent="2"></bh-tree-item>
          <bh-tree-item slot="children" value="tabs" label="bh-tabs.ts" indent="2"></bh-tree-item>
        </bh-tree-item>
      </bh-tree-item>
      <bh-tree-item value="tokens" label="tokens"></bh-tree-item>
      <bh-tree-item value="primitives" label="primitives"></bh-tree-item>
    </bh-tree>
  `,
};

export const WithSelected: Story = {
  render: () => html`
    <bh-tree
      selected="downloads"
      style="width: 280px;"
      @bh-select=${(e: CustomEvent) => console.log('Selected:', e.detail)}
    >
      <bh-tree-item value="documents" label="Documents"></bh-tree-item>
      <bh-tree-item value="images" label="Images"></bh-tree-item>
      <bh-tree-item value="downloads" label="Downloads"></bh-tree-item>
      <bh-tree-item value="desktop" label="Desktop"></bh-tree-item>
    </bh-tree>
  `,
};
