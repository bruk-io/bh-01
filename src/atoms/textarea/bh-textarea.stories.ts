import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import './bh-textarea.js';

const meta: Meta = {
  title: 'Atoms/Textarea',
  component: 'bh-textarea',
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    rows: { control: { type: 'number', min: 1, max: 20 } },
    resize: {
      control: 'select',
      options: ['none', 'vertical', 'horizontal', 'both'],
    },
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
    readonly: { control: 'boolean' },
    error: { control: 'boolean' },
  },
  args: {
    size: 'md',
    rows: 3,
    resize: 'vertical',
    placeholder: 'Type your message...',
    disabled: false,
    readonly: false,
    error: false,
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: (args) => html`
    <bh-textarea
      size=${args.size}
      rows=${args.rows}
      resize=${args.resize}
      placeholder=${args.placeholder}
      ?disabled=${args.disabled}
      ?readonly=${args.readonly}
      ?error=${args.error}
      style="max-width: 400px;"
    ></bh-textarea>
  `,
};

export const Sizes: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem; max-width: 400px;">
      <bh-textarea size="sm" placeholder="Small textarea" rows="2"></bh-textarea>
      <bh-textarea size="md" placeholder="Medium textarea" rows="3"></bh-textarea>
      <bh-textarea size="lg" placeholder="Large textarea" rows="4"></bh-textarea>
    </div>
  `,
};

export const States: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem; max-width: 400px;">
      <bh-textarea placeholder="Default"></bh-textarea>
      <bh-textarea disabled placeholder="Disabled"></bh-textarea>
      <bh-textarea readonly value="This is read-only content that cannot be edited."></bh-textarea>
      <bh-textarea error placeholder="Error state"></bh-textarea>
    </div>
  `,
};

export const CommentBox: Story = {
  render: () => html`
    <div style="max-width: 500px; display: flex; flex-direction: column; gap: 0.75rem;">
      <bh-textarea
        rows="5"
        placeholder="Leave a comment..."
        label="Comment"
      ></bh-textarea>
      <div style="display: flex; justify-content: flex-end;">
        <bh-button variant="primary">Comment</bh-button>
      </div>
    </div>
  `,
};
