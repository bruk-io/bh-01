import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import './bh-tooltip.js';
import '../button/bh-button.js';

const meta: Meta = {
  title: 'Atoms/Tooltip',
  component: 'bh-tooltip',
  argTypes: {
    content: { control: 'text' },
    placement: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
    },
  },
  args: {
    content: 'Tooltip text',
    placement: 'top',
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: (args) => html`
    <div style="padding: 4rem; display: flex; justify-content: center;">
      <bh-tooltip content=${args.content} placement=${args.placement}>
        <bh-button>Hover me</bh-button>
      </bh-tooltip>
    </div>
  `,
};

export const Placements: Story = {
  render: () => html`
    <div style="padding: 4rem; display: flex; gap: 2rem; justify-content: center; flex-wrap: wrap;">
      <bh-tooltip content="Top tooltip" placement="top">
        <bh-button variant="secondary">Top</bh-button>
      </bh-tooltip>
      <bh-tooltip content="Bottom tooltip" placement="bottom">
        <bh-button variant="secondary">Bottom</bh-button>
      </bh-tooltip>
      <bh-tooltip content="Left tooltip" placement="left">
        <bh-button variant="secondary">Left</bh-button>
      </bh-tooltip>
      <bh-tooltip content="Right tooltip" placement="right">
        <bh-button variant="secondary">Right</bh-button>
      </bh-tooltip>
    </div>
  `,
};

export const OnIcon: Story = {
  render: () => {
    import('../icon/bh-icon.js');
    return html`
      <div style="padding: 4rem; display: flex; justify-content: center;">
        <bh-tooltip content="Close this panel">
          <bh-button icon-only label="Close">
            <bh-icon name="x"></bh-icon>
          </bh-button>
        </bh-tooltip>
      </div>
    `;
  },
};
