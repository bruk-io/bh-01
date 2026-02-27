import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import './bh-spinner.js';

const meta: Meta = {
  title: 'Atoms/Spinner',
  component: 'bh-spinner',
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    label: { control: 'text' },
  },
  args: {
    size: 'md',
    label: 'Loading',
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: (args) => html`
    <bh-spinner size=${args.size} label=${args.label}></bh-spinner>
  `,
};

export const Sizes: Story = {
  render: () => html`
    <div style="display: flex; gap: 1.5rem; align-items: center;">
      <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
        <bh-spinner size="sm"></bh-spinner>
        <span style="font-size: 0.75rem; color: var(--bh-color-text-muted);">sm</span>
      </div>
      <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
        <bh-spinner size="md"></bh-spinner>
        <span style="font-size: 0.75rem; color: var(--bh-color-text-muted);">md</span>
      </div>
      <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
        <bh-spinner size="lg"></bh-spinner>
        <span style="font-size: 0.75rem; color: var(--bh-color-text-muted);">lg</span>
      </div>
    </div>
  `,
};

export const ColorInheritance: Story = {
  render: () => html`
    <div style="display: flex; gap: 1.5rem; align-items: center;">
      <bh-spinner style="color: var(--bh-color-primary);"></bh-spinner>
      <bh-spinner style="color: var(--bh-color-success);"></bh-spinner>
      <bh-spinner style="color: var(--bh-color-danger);"></bh-spinner>
      <bh-spinner style="color: var(--bh-color-warning);"></bh-spinner>
    </div>
  `,
};

export const InButton: Story = {
  render: () => {
    import('../button/bh-button.js');
    return html`
      <div style="display: flex; gap: 1rem; align-items: center;">
        <bh-button disabled>
          <bh-spinner slot="prefix" size="sm"></bh-spinner>
          Loading...
        </bh-button>
        <bh-button variant="secondary" disabled>
          <bh-spinner slot="prefix" size="sm"></bh-spinner>
          Saving
        </bh-button>
      </div>
    `;
  },
};
