import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import './bh-nav-item.js';
import '../../atoms/icon/bh-icon.js';
import '../../atoms/badge/bh-badge.js';

const meta: Meta = {
  title: 'Molecules/NavItem',
  component: 'bh-nav-item',
  argTypes: {
    active: { control: 'boolean' },
    disabled: { control: 'boolean' },
    href: { control: 'text' },
    target: { control: 'text' },
  },
  args: {
    active: false,
    disabled: false,
    href: '',
    target: '',
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: (args) => html`
    <div style="max-width: 240px;">
      <bh-nav-item
        ?active=${args.active}
        ?disabled=${args.disabled}
        href=${args.href || ''}
      >
        <bh-icon slot="prefix" name="home" size="sm"></bh-icon>
        Dashboard
      </bh-nav-item>
    </div>
  `,
};

export const Sidebar: Story = {
  render: () => html`
    <nav style="max-width: 240px; display: flex; flex-direction: column; gap: 0.25rem;">
      <bh-nav-item active>
        <bh-icon slot="prefix" name="home" size="sm"></bh-icon>
        Dashboard
      </bh-nav-item>
      <bh-nav-item>
        <bh-icon slot="prefix" name="user" size="sm"></bh-icon>
        Profile
      </bh-nav-item>
      <bh-nav-item>
        <bh-icon slot="prefix" name="settings" size="sm"></bh-icon>
        Settings
        <bh-badge slot="suffix" size="sm" variant="primary">3</bh-badge>
      </bh-nav-item>
      <bh-nav-item disabled>
        <bh-icon slot="prefix" name="lock" size="sm"></bh-icon>
        Admin
      </bh-nav-item>
    </nav>
  `,
};

export const AsLinks: Story = {
  render: () => html`
    <nav style="max-width: 240px; display: flex; flex-direction: column; gap: 0.25rem;">
      <bh-nav-item href="/dashboard" active>
        <bh-icon slot="prefix" name="home" size="sm"></bh-icon>
        Dashboard
      </bh-nav-item>
      <bh-nav-item href="/profile">
        <bh-icon slot="prefix" name="user" size="sm"></bh-icon>
        Profile
      </bh-nav-item>
      <bh-nav-item href="/settings">
        <bh-icon slot="prefix" name="settings" size="sm"></bh-icon>
        Settings
      </bh-nav-item>
    </nav>
  `,
};

export const WithBadge: Story = {
  render: () => html`
    <div style="max-width: 240px;">
      <bh-nav-item>
        <bh-icon slot="prefix" name="mail" size="sm"></bh-icon>
        Messages
        <bh-badge slot="suffix" size="sm" variant="danger">12</bh-badge>
      </bh-nav-item>
    </div>
  `,
};
