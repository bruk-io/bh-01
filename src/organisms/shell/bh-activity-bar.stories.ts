import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import './bh-activity-bar.js';
import './bh-activity-item.js';

const meta: Meta = {
  title: 'Organisms/Shell/ActivityBar',
  component: 'bh-activity-bar',
  argTypes: {
    activeItemId: {
      control: 'select',
      options: ['explorer', 'search', 'git', 'extensions', 'settings'],
      description: 'The currently active item id (set programmatically via setActive)',
    },
  },
  args: {
    activeItemId: 'explorer',
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
    <bh-activity-bar
      style="height: 400px;"
      @bh-activity-change=${(e: CustomEvent) => {
        console.log('[bh-activity-bar] bh-activity-change', e.detail);
      }}
    >
      <bh-activity-item
        item-id="explorer"
        label="Explorer"
        .active=${args['activeItemId'] === 'explorer'}
      >📁</bh-activity-item>
      <bh-activity-item
        item-id="search"
        label="Search"
        .active=${args['activeItemId'] === 'search'}
      >🔍</bh-activity-item>
      <bh-activity-item
        item-id="git"
        label="Source Control"
        .active=${args['activeItemId'] === 'git'}
      >🔀</bh-activity-item>
      <bh-activity-item
        item-id="extensions"
        label="Extensions"
        .active=${args['activeItemId'] === 'extensions'}
      >🧩</bh-activity-item>
      <bh-activity-item
        item-id="settings"
        label="Settings"
        .active=${args['activeItemId'] === 'settings'}
      >⚙️</bh-activity-item>
    </bh-activity-bar>
  `,
};

export const Interactive: Story = {
  name: 'Interactive',
  parameters: {
    docs: {
      description: {
        story:
          'Click any item to activate it. The `bh-activity-change` event is logged to the browser console. Clicking an already-active item deactivates it.',
      },
    },
  },
  render: () => {
    const onActivityChange = (e: CustomEvent<{ id: string; label: string }>) => {
      console.log('[bh-activity-bar] bh-activity-change', {
        id: e.detail.id,
        label: e.detail.label,
      });
    };

    return html`
      <bh-activity-bar
        style="height: 400px;"
        @bh-activity-change=${onActivityChange}
      >
        <bh-activity-item item-id="explorer" label="Explorer">📁</bh-activity-item>
        <bh-activity-item item-id="search" label="Search">🔍</bh-activity-item>
        <bh-activity-item item-id="git" label="Source Control" active>🔀</bh-activity-item>
        <bh-activity-item item-id="extensions" label="Extensions">🧩</bh-activity-item>
        <bh-activity-item item-id="settings" label="Settings">⚙️</bh-activity-item>
      </bh-activity-bar>
    `;
  },
};
