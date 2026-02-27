import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import './bh-accordion.js';

const meta: Meta = {
  title: 'Molecules/Accordion',
  component: 'bh-accordion',
  argTypes: {
    multiple: { control: 'boolean' },
  },
  args: {
    multiple: false,
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: (args) => html`
    <bh-accordion ?multiple=${args.multiple} style="max-width: 480px;" @bh-toggle=${(e: CustomEvent) => console.log('bh-toggle:', e.detail)}>
      <bh-accordion-item label="Section 1" open>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
        incididunt ut labore et dolore magna aliqua.
      </bh-accordion-item>
      <bh-accordion-item label="Section 2">
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
        aliquip ex ea commodo consequat.
      </bh-accordion-item>
      <bh-accordion-item label="Section 3">
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore
        eu fugiat nulla pariatur.
      </bh-accordion-item>
    </bh-accordion>
  `,
};

export const Multiple: Story = {
  render: () => html`
    <bh-accordion multiple style="max-width: 480px;">
      <bh-accordion-item label="Section 1" open>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
        incididunt ut labore et dolore magna aliqua.
      </bh-accordion-item>
      <bh-accordion-item label="Section 2" open>
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
        aliquip ex ea commodo consequat.
      </bh-accordion-item>
      <bh-accordion-item label="Section 3">
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore
        eu fugiat nulla pariatur.
      </bh-accordion-item>
    </bh-accordion>
  `,
};

export const AllClosed: Story = {
  render: () => html`
    <bh-accordion style="max-width: 480px;">
      <bh-accordion-item label="Section 1">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
        incididunt ut labore et dolore magna aliqua.
      </bh-accordion-item>
      <bh-accordion-item label="Section 2">
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
        aliquip ex ea commodo consequat.
      </bh-accordion-item>
      <bh-accordion-item label="Section 3">
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore
        eu fugiat nulla pariatur.
      </bh-accordion-item>
    </bh-accordion>
  `,
};
