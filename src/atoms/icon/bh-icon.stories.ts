import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { BhIcon } from './bh-icon.js';

const BUILT_IN_ICONS = [
  'x', 'check', 'plus', 'minus', 'search',
  'chevron-down', 'chevron-up', 'chevron-left', 'chevron-right', 'menu',
];

const meta: Meta = {
  title: 'Atoms/Icon',
  component: 'bh-icon',
  argTypes: {
    name: {
      control: 'select',
      options: BUILT_IN_ICONS,
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    label: { control: 'text' },
  },
  args: {
    name: 'check',
    size: 'md',
    label: '',
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: (args) => html`
    <bh-icon name=${args.name} size=${args.size} label=${args.label}></bh-icon>
  `,
};

export const AllIcons: Story = {
  render: () => html`
    <div style="display: flex; gap: 1.5rem; align-items: center; flex-wrap: wrap;">
      ${BUILT_IN_ICONS.map(
        (name) => html`
          <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
            <bh-icon name=${name}></bh-icon>
            <span style="font-size: 0.75rem; color: var(--bh-color-text-muted);">${name}</span>
          </div>
        `
      )}
    </div>
  `,
};

export const Sizes: Story = {
  render: () => html`
    <div style="display: flex; gap: 1.5rem; align-items: center;">
      <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
        <bh-icon name="check" size="sm"></bh-icon>
        <span style="font-size: 0.75rem; color: var(--bh-color-text-muted);">sm</span>
      </div>
      <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
        <bh-icon name="check" size="md"></bh-icon>
        <span style="font-size: 0.75rem; color: var(--bh-color-text-muted);">md</span>
      </div>
      <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
        <bh-icon name="check" size="lg"></bh-icon>
        <span style="font-size: 0.75rem; color: var(--bh-color-text-muted);">lg</span>
      </div>
    </div>
  `,
};

export const ColorInheritance: Story = {
  render: () => html`
    <div style="display: flex; gap: 1.5rem; align-items: center;">
      <bh-icon name="check" style="color: var(--bh-color-success);"></bh-icon>
      <bh-icon name="x" style="color: var(--bh-color-danger);"></bh-icon>
      <bh-icon name="search" style="color: var(--bh-color-primary);"></bh-icon>
      <bh-icon name="minus" style="color: var(--bh-color-warning);"></bh-icon>
    </div>
  `,
};

export const CustomIcon: Story = {
  render: () => {
    BhIcon.register(
      'heart',
      '<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>'
    );
    return html`
      <div style="display: flex; gap: 1rem; align-items: center;">
        <bh-icon name="heart" style="color: var(--bh-color-danger);"></bh-icon>
        <span style="font-size: 0.875rem; color: var(--bh-color-text-muted);">
          Custom "heart" icon registered via BhIcon.register()
        </span>
      </div>
    `;
  },
};
