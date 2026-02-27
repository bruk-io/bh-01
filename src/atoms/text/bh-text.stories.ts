import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import './bh-text.js';

const meta: Meta = {
  title: 'Atoms/Text',
  component: 'bh-text',
  argTypes: {
    variant: {
      control: 'select',
      options: ['body', 'heading', 'small', 'code'],
    },
    truncate: { control: 'boolean' },
  },
  args: {
    variant: 'body',
    truncate: false,
  },
};

export default meta;
type Story = StoryObj;

export const Body: Story = {
  render: (args) => html`
    <bh-text variant=${args.variant} ?truncate=${args.truncate}>
      The quick brown fox jumps over the lazy dog. This is body text, used for
      paragraphs and general content throughout the interface.
    </bh-text>
  `,
};

export const Heading: Story = {
  args: { variant: 'heading' },
  render: (args) => html`
    <bh-text variant=${args.variant}>Page Heading</bh-text>
  `,
};

export const Small: Story = {
  args: { variant: 'small' },
  render: (args) => html`
    <bh-text variant=${args.variant}>
      Caption text for metadata, timestamps, and secondary information.
    </bh-text>
  `,
};

export const Code: Story = {
  args: { variant: 'code' },
  render: (args) => html`
    <bh-text variant=${args.variant}>const config = { theme: "dark" };</bh-text>
  `,
};

export const Truncated: Story = {
  args: { truncate: true },
  render: (args) => html`
    <div style="width: 250px; border: 1px dashed var(--bh-color-border); padding: 0.5rem;">
      <bh-text ?truncate=${args.truncate}>
        This is a very long piece of text that should be truncated with an
        ellipsis when it overflows its container.
      </bh-text>
    </div>
  `,
};

export const AllVariants: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <bh-text variant="heading">Heading variant</bh-text>
      <bh-text variant="body">
        Body variant — the default. Used for paragraphs and general content.
      </bh-text>
      <bh-text variant="small">
        Small variant — for captions, metadata, and secondary text.
      </bh-text>
      <bh-text variant="code">Code variant — for code and technical content.</bh-text>
    </div>
  `,
};
