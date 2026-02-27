import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import './bh-section-header.js';
import '../../atoms/button/bh-button.js';

const meta: Meta = {
  title: 'Molecules/SectionHeader',
  component: 'bh-section-header',
  argTypes: {
    heading: { control: 'text' },
    count: { control: 'number' },
  },
  args: {
    heading: 'Services',
    count: undefined,
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: (args) => html`
    <bh-section-header heading=${args.heading}></bh-section-header>
  `,
};

export const WithCount: Story = {
  render: () => html`
    <bh-section-header heading="Services" count="12"></bh-section-header>
  `,
};

export const WithEndSlot: Story = {
  render: () => html`
    <bh-section-header heading="Projects" count="5">
      <bh-button slot="end" variant="ghost" size="sm">View All</bh-button>
    </bh-section-header>
  `,
};

export const MultipleSections: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 2rem; max-width: 600px;">
      <div>
        <bh-section-header heading="Infrastructure" count="8"></bh-section-header>
        <p style="margin: 0.5rem 0 0; color: var(--bh-color-text-muted); font-size: var(--bh-text-sm);">
          Core infrastructure services
        </p>
      </div>
      <div>
        <bh-section-header heading="Applications" count="14"></bh-section-header>
        <p style="margin: 0.5rem 0 0; color: var(--bh-color-text-muted); font-size: var(--bh-text-sm);">
          Deployed applications
        </p>
      </div>
      <div>
        <bh-section-header heading="Monitoring" count="3"></bh-section-header>
        <p style="margin: 0.5rem 0 0; color: var(--bh-color-text-muted); font-size: var(--bh-text-sm);">
          Observability tools
        </p>
      </div>
    </div>
  `,
};

export const ZeroCount: Story = {
  render: () => html`
    <bh-section-header heading="Alerts" count="0"></bh-section-header>
  `,
};
