import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import './bh-form-field.js';
import '../../atoms/input/bh-input.js';
import '../../atoms/select/bh-select.js';
import '../../atoms/textarea/bh-textarea.js';

const meta: Meta = {
  title: 'Molecules/FormField',
  component: 'bh-form-field',
  argTypes: {
    label: { control: 'text' },
    helpText: { control: 'text' },
    error: { control: 'text' },
    required: { control: 'boolean' },
  },
  args: {
    label: 'Email',
    helpText: '',
    error: '',
    required: false,
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: (args) => html`
    <bh-form-field
      label=${args.label}
      help-text=${args.helpText}
      error=${args.error}
      ?required=${args.required}
    >
      <bh-input placeholder="you@example.com"></bh-input>
    </bh-form-field>
  `,
};

export const WithHelpText: Story = {
  args: { helpText: "We'll never share your email with anyone." },
  render: (args) => html`
    <bh-form-field label=${args.label} help-text=${args.helpText}>
      <bh-input placeholder="you@example.com"></bh-input>
    </bh-form-field>
  `,
};

export const WithError: Story = {
  args: { error: 'Please enter a valid email address.' },
  render: (args) => html`
    <bh-form-field label=${args.label} error=${args.error}>
      <bh-input placeholder="you@example.com" error></bh-input>
    </bh-form-field>
  `,
};

export const Required: Story = {
  args: { required: true },
  render: (args) => html`
    <bh-form-field label=${args.label} ?required=${args.required}>
      <bh-input placeholder="you@example.com"></bh-input>
    </bh-form-field>
  `,
};

export const FormLayout: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem; max-width: 400px;">
      <bh-form-field label="Full Name" required>
        <bh-input placeholder="John Doe"></bh-input>
      </bh-form-field>
      <bh-form-field
        label="Email"
        required
        help-text="We'll never share your email."
      >
        <bh-input placeholder="you@example.com" type="email"></bh-input>
      </bh-form-field>
      <bh-form-field
        label="Password"
        required
        error="Password must be at least 8 characters."
      >
        <bh-input type="password" error></bh-input>
      </bh-form-field>
      <bh-form-field label="Bio" help-text="Tell us about yourself.">
        <bh-textarea placeholder="Write something..."></bh-textarea>
      </bh-form-field>
    </div>
  `,
};
