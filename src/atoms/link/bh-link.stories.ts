import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import './bh-link.js';

const meta: Meta = {
  title: 'Atoms/Link',
  component: 'bh-link',
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'muted', 'accent'],
    },
    href: { control: 'text' },
    external: { control: 'boolean' },
  },
  args: {
    variant: 'default',
    href: '#',
    external: false,
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: (args) => html`
    <bh-link href=${args.href} variant=${args.variant} ?external=${args.external}>
      Click here
    </bh-link>
  `,
};

export const Variants: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <bh-link href="#">Default link</bh-link>
      <bh-link href="#" variant="muted">Muted link</bh-link>
      <bh-link href="#" variant="accent">Accent link</bh-link>
    </div>
  `,
};

export const External: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <bh-link href="https://github.com" external>GitHub</bh-link>
      <bh-link href="https://lit.dev" external>Lit Documentation</bh-link>
    </div>
  `,
};

export const InlineWithText: Story = {
  render: () => html`
    <p style="font-family: var(--bh-font-sans); color: var(--bh-color-text); line-height: var(--bh-leading-relaxed); max-width: 500px;">
      By continuing, you agree to our
      <bh-link href="#">Terms of Service</bh-link>
      and
      <bh-link href="#">Privacy Policy</bh-link>.
      For more information, visit our
      <bh-link href="https://example.com" external>help center</bh-link>.
    </p>
  `,
};
