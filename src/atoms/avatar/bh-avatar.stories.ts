import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import './bh-avatar.js';

const meta: Meta = {
  title: 'Atoms/Avatar',
  component: 'bh-avatar',
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    src: { control: 'text' },
    alt: { control: 'text' },
    initials: { control: 'text' },
  },
  args: {
    size: 'md',
    src: '',
    alt: '',
    initials: '',
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: (args) => html`
    <bh-avatar
      size=${args.size}
      src=${args.src}
      alt=${args.alt}
      initials=${args.initials}
    ></bh-avatar>
  `,
};

export const Initials: Story = {
  render: () => html`
    <div style="display: flex; gap: 1rem; align-items: center;">
      <bh-avatar initials="JD" alt="John Doe"></bh-avatar>
      <bh-avatar initials="AB" alt="Alice Brown"></bh-avatar>
      <bh-avatar initials="XY" alt="Xavier Young"></bh-avatar>
    </div>
  `,
};

export const Sizes: Story = {
  render: () => html`
    <div style="display: flex; gap: 1rem; align-items: center;">
      <bh-avatar size="sm" initials="SM"></bh-avatar>
      <bh-avatar size="md" initials="MD"></bh-avatar>
      <bh-avatar size="lg" initials="LG"></bh-avatar>
    </div>
  `,
};

export const Fallback: Story = {
  render: () => html`
    <div style="display: flex; gap: 1rem; align-items: center;">
      <bh-avatar src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Crect fill='%234a90d9' width='40' height='40'/%3E%3C/svg%3E" alt="Blue square"></bh-avatar>
      <bh-avatar initials="FB" alt="Initials fallback"></bh-avatar>
      <bh-avatar alt="Generic icon fallback"></bh-avatar>
    </div>
  `,
};

export const AvatarGroup: Story = {
  render: () => html`
    <div style="display: flex;">
      <bh-avatar initials="A" style="margin-left: -0.5rem; border: 2px solid var(--bh-color-surface); border-radius: 50%;"></bh-avatar>
      <bh-avatar initials="B" style="margin-left: -0.5rem; border: 2px solid var(--bh-color-surface); border-radius: 50%;"></bh-avatar>
      <bh-avatar initials="C" style="margin-left: -0.5rem; border: 2px solid var(--bh-color-surface); border-radius: 50%;"></bh-avatar>
      <bh-avatar initials="+3" style="margin-left: -0.5rem; border: 2px solid var(--bh-color-surface); border-radius: 50%;"></bh-avatar>
    </div>
  `,
};
