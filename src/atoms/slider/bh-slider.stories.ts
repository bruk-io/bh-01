import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import './bh-slider.js';

const meta: Meta = {
  title: 'Atoms/Slider',
  component: 'bh-slider',
  argTypes: {
    min: { control: 'number' },
    max: { control: 'number' },
    step: { control: 'number' },
    value: { control: { type: 'range', min: 0, max: 100, step: 1 } },
    disabled: { control: 'boolean' },
    showValue: { control: 'boolean' },
    label: { control: 'text' },
  },
  args: {
    min: 0,
    max: 100,
    step: 1,
    value: 0,
    disabled: false,
    showValue: true,
    label: 'Slider',
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: (args) => html`
    <div style="max-width: 400px; padding: 1rem;">
      <bh-slider
        min=${args.min}
        max=${args.max}
        step=${args.step}
        value=${args.value}
        ?disabled=${args.disabled}
        ?show-value=${args.showValue}
        label=${args.label}
        @bh-input=${(e: CustomEvent) => console.log('bh-input:', e.detail)}
        @bh-change=${(e: CustomEvent) => console.log('bh-change:', e.detail)}
      ></bh-slider>
    </div>
  `,
};

export const Disabled: Story = {
  render: () => html`
    <div style="max-width: 400px; padding: 1rem;">
      <bh-slider value="40" disabled show-value label="Disabled slider"></bh-slider>
    </div>
  `,
};

export const Values: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1.5rem; max-width: 400px; padding: 1rem;">
      <div>
        <span style="font-size: 0.75rem; color: var(--bh-color-text-muted);">0%</span>
        <bh-slider value="0" show-value label="0 percent"></bh-slider>
      </div>
      <div>
        <span style="font-size: 0.75rem; color: var(--bh-color-text-muted);">25%</span>
        <bh-slider value="25" show-value label="25 percent"></bh-slider>
      </div>
      <div>
        <span style="font-size: 0.75rem; color: var(--bh-color-text-muted);">50%</span>
        <bh-slider value="50" show-value label="50 percent"></bh-slider>
      </div>
      <div>
        <span style="font-size: 0.75rem; color: var(--bh-color-text-muted);">75%</span>
        <bh-slider value="75" show-value label="75 percent"></bh-slider>
      </div>
      <div>
        <span style="font-size: 0.75rem; color: var(--bh-color-text-muted);">100%</span>
        <bh-slider value="100" show-value label="100 percent"></bh-slider>
      </div>
    </div>
  `,
};
