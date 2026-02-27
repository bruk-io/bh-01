import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { renderAppShell, fullscreenDecorator } from './_helpers.js';

const meta: Meta = {
  title: 'Demos/Grafana/App Shell',
  parameters: { layout: 'fullscreen' },
  decorators: [fullscreenDecorator],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () =>
    renderAppShell('home', ['Home'], html`
      <bh-center max="900px" gutters="md">
        <bh-stack gap="lg">
          <bh-text variant="heading">Welcome to Grafana</bh-text>
          <bh-text>Your home for infrastructure monitoring and observability.</bh-text>
          <bh-cluster gap="md">
            <bh-button variant="primary">
              <bh-icon slot="prefix" name="plus"></bh-icon>
              New Dashboard
            </bh-button>
            <bh-button variant="secondary">Import</bh-button>
          </bh-cluster>
        </bh-stack>
      </bh-center>
    `),
};
