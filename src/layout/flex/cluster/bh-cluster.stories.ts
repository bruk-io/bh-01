import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import './bh-cluster.js';
import '../stack/bh-stack.js';

const chip = (label: string) => html`
  <div style="padding: 0.375rem 0.75rem; background: var(--bh-color-primary); color: #fff; border-radius: 9999px; font-size: 0.875rem; white-space: nowrap;">
    ${label}
  </div>
`;

const meta: Meta = {
  title: 'Layout/Flex/Cluster',
  component: 'bh-cluster',
  parameters: {
    docs: {
      description: {
        component: [
          '`bh-cluster` arranges children horizontally in a wrapping row — items flow left to right and wrap to the next line when they run out of space.',
          'Think of it as the natural layout for groups of inline-level items that have unpredictable total width.',
          '',
          '**CSS:** `display: flex; flex-wrap: wrap`',
          '',
          '**Use when:**',
          '- Rendering a list of tags, chips, or badges',
          '- Laying out a toolbar or button group',
          '- Building a horizontal nav that wraps on narrow screens',
          '- Any set of inline items that should flow and wrap naturally',
        ].join('\n'),
      },
    },
  },
  argTypes: {
    gap: {
      control: 'select',
      options: ['none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'],
      description: 'Space between items in both directions (row and column gap).',
    },
    justify: {
      control: 'select',
      options: ['start', 'center', 'end', 'between', 'around', 'evenly'],
      description: 'How items distribute along the main (horizontal) axis.',
    },
    align: {
      control: 'select',
      options: ['start', 'center', 'end', 'stretch'],
      description: 'How items align on the cross (vertical) axis.',
    },
    nowrap: {
      control: 'boolean',
      description: 'Disable wrapping — items will overflow instead of wrapping to the next line.',
    },
  },
  args: {
    gap: 'md',
    justify: 'start',
    align: 'center',
    nowrap: false,
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'A row of tags that wraps naturally. Resize the window to see items flow to the next line. This is the most common cluster use case — any horizontal list of variable-width items.',
      },
    },
  },
  render: (args) => html`
    <bh-cluster gap=${args.gap} justify=${args.justify} align=${args.align} ?nowrap=${args.nowrap}>
      ${chip('HTML')} ${chip('CSS')} ${chip('JavaScript')}
      ${chip('TypeScript')} ${chip('Lit')} ${chip('Web Components')}
      ${chip('Storybook')} ${chip('Vite')}
    </bh-cluster>
  `,
};

export const Justification: Story = {
  parameters: {
    docs: {
      description: {
        story: 'All six justification options. `start` (default) packs items to the left. `between` pushes items to the edges with equal space between — useful for navbars. `evenly` distributes equal space around every item.',
      },
    },
  },
  render: () => html`
    <bh-stack gap="lg">
      ${(['start', 'center', 'end', 'between', 'around', 'evenly'] as const).map(
        (justify) => html`
          <div>
            <p style="margin: 0 0 0.5rem; font-size: 0.875rem; opacity: 0.7;">justify="${justify}"</p>
            <bh-cluster justify=${justify} gap="sm" style="border: 1px dashed rgba(255,255,255,0.2); padding: 0.5rem;">
              ${chip('A')} ${chip('B')} ${chip('C')}
            </bh-cluster>
          </div>
        `
      )}
    </bh-stack>
  `,
};

export const WrappingBehavior: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Cluster inside a constrained container (400px). As items exceed the available width, they wrap to the next line. This is the core behavior that distinguishes cluster from a plain flex row.',
      },
    },
  },
  render: () => html`
    <div style="max-width: 400px; border: 1px dashed rgba(255,255,255,0.2); padding: 0.5rem;">
      <p style="margin: 0 0 0.5rem; font-size: 0.875rem; opacity: 0.7;">Resize the container to see wrapping</p>
      <bh-cluster gap="sm">
        ${chip('React')} ${chip('Vue')} ${chip('Angular')}
        ${chip('Svelte')} ${chip('Lit')} ${chip('Solid')}
        ${chip('Preact')} ${chip('Alpine')} ${chip('Ember')}
      </bh-cluster>
    </div>
  `,
};

export const Nowrap: Story = {
  parameters: {
    docs: {
      description: {
        story: 'With `nowrap`, items stay on a single line and overflow the container. Use this when you want a fixed horizontal row without wrapping — for instance, inside a scrollable `bh-reel`.',
      },
    },
  },
  render: () => html`
    <div style="max-width: 300px; border: 1px dashed rgba(255,255,255,0.2); padding: 0.5rem; overflow: hidden;">
      <p style="margin: 0 0 0.5rem; font-size: 0.875rem; opacity: 0.7;">nowrap — items overflow</p>
      <bh-cluster gap="sm" nowrap>
        ${chip('One')} ${chip('Two')} ${chip('Three')}
        ${chip('Four')} ${chip('Five')} ${chip('Six')}
      </bh-cluster>
    </div>
  `,
};
