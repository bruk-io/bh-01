import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import './bh-skeleton.js';

const meta: Meta = {
  title: 'Atoms/Skeleton',
  component: 'bh-skeleton',
  argTypes: {
    variant: {
      control: 'select',
      options: ['text', 'circle', 'rect'],
    },
    width: { control: 'text' },
    height: { control: 'text' },
  },
  args: {
    variant: 'text',
    width: '',
    height: '',
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: (args) => html`
    <bh-skeleton
      variant=${args.variant}
      width=${args.width}
      height=${args.height}
    ></bh-skeleton>
  `,
};

export const Variants: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1.5rem; max-width: 400px;">
      <div>
        <span style="font-size: 0.75rem; color: var(--bh-color-text-muted); display: block; margin-bottom: 0.5rem;">text</span>
        <bh-skeleton variant="text"></bh-skeleton>
      </div>
      <div>
        <span style="font-size: 0.75rem; color: var(--bh-color-text-muted); display: block; margin-bottom: 0.5rem;">circle</span>
        <bh-skeleton variant="circle" width="3rem" height="3rem"></bh-skeleton>
      </div>
      <div>
        <span style="font-size: 0.75rem; color: var(--bh-color-text-muted); display: block; margin-bottom: 0.5rem;">rect</span>
        <bh-skeleton variant="rect" width="100%" height="6rem"></bh-skeleton>
      </div>
    </div>
  `,
};

export const CardPlaceholder: Story = {
  render: () => html`
    <div style="max-width: 300px; padding: 1rem; border: 1px solid var(--bh-color-border); border-radius: var(--bh-radius-lg); display: flex; flex-direction: column; gap: 0.75rem;">
      <bh-skeleton variant="rect" width="100%" height="8rem"></bh-skeleton>
      <bh-skeleton variant="text" width="80%"></bh-skeleton>
      <bh-skeleton variant="text" width="60%"></bh-skeleton>
      <div style="display: flex; gap: 0.5rem; align-items: center; margin-top: 0.5rem;">
        <bh-skeleton variant="circle" width="2rem" height="2rem"></bh-skeleton>
        <bh-skeleton variant="text" width="6rem"></bh-skeleton>
      </div>
    </div>
  `,
};

export const TextBlock: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 0.5rem; max-width: 400px;">
      <bh-skeleton variant="text" width="90%"></bh-skeleton>
      <bh-skeleton variant="text" width="100%"></bh-skeleton>
      <bh-skeleton variant="text" width="75%"></bh-skeleton>
      <bh-skeleton variant="text" width="85%"></bh-skeleton>
    </div>
  `,
};
