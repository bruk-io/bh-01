import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import './bh-stack.js';

const box = (label: string, color = 'var(--bh-color-primary)') => html`
  <div style="padding: 1rem; background: ${color}; color: #fff; border-radius: 4px; text-align: center;">
    ${label}
  </div>
`;

const meta: Meta = {
  title: 'Layout/Flex/Stack',
  component: 'bh-stack',
  parameters: {
    docs: {
      description: {
        component: [
          '`bh-stack` arranges children vertically in a column with consistent spacing between them.',
          'It is the most common layout primitive — use it anywhere you need to stack elements top-to-bottom: form fields, card content, page sections, sidebar navigation, or any vertical list of items.',
          '',
          '**CSS:** `display: flex; flex-direction: column`',
          '',
          '**Use when:**',
          '- Stacking form inputs with labels',
          '- Laying out card body content',
          '- Building a sidebar or vertical nav',
          '- Arranging page sections with consistent vertical rhythm',
        ].join('\n'),
      },
    },
  },
  argTypes: {
    gap: {
      control: 'select',
      options: ['none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'],
      description: 'Vertical space between children, mapped to spacing tokens.',
    },
    align: {
      control: 'select',
      options: ['start', 'center', 'end', 'stretch'],
      description: 'Cross-axis alignment (horizontal). `stretch` makes children fill the width.',
    },
    wrap: {
      control: 'boolean',
      description: 'Allow items to wrap to the next column if constrained.',
    },
  },
  args: {
    gap: 'md',
    align: 'stretch',
    wrap: false,
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Basic vertical stack with default medium gap. Children stretch to fill the available width. Use the controls to experiment with gap sizes, alignment, and wrapping.',
      },
    },
  },
  render: (args) => html`
    <bh-stack gap=${args.gap} align=${args.align} ?wrap=${args.wrap}>
      ${box('Item 1')} ${box('Item 2')} ${box('Item 3')}
    </bh-stack>
  `,
};

export const GapSizes: Story = {
  parameters: {
    docs: {
      description: {
        story: 'All seven gap sizes side by side, from `none` (0) to `2xl` (3rem). Choose the size that matches your content density — `xs`/`sm` for tight lists, `md` for general use, `lg`/`xl`/`2xl` for page sections.',
      },
    },
  },
  render: () => html`
    <div style="display: flex; gap: 2rem; flex-wrap: wrap;">
      ${(['none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const).map(
        (gap) => html`
          <div>
            <p style="margin: 0 0 0.5rem; font-size: 0.875rem; opacity: 0.7;">gap="${gap}"</p>
            <bh-stack gap=${gap} style="width: 120px;">
              ${box('A')} ${box('B')} ${box('C')}
            </bh-stack>
          </div>
        `
      )}
    </div>
  `,
};

export const Alignment: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Controls how children align on the cross axis (horizontally). `stretch` (default) makes every child fill the stack\'s width — ideal for forms. `start`, `center`, or `end` let children keep their intrinsic width and snap to one side.',
      },
    },
  },
  render: () => html`
    <div style="display: flex; gap: 2rem; flex-wrap: wrap;">
      ${(['start', 'center', 'end', 'stretch'] as const).map(
        (align) => html`
          <div style="width: 200px;">
            <p style="margin: 0 0 0.5rem; font-size: 0.875rem; opacity: 0.7;">align="${align}"</p>
            <bh-stack align=${align} gap="sm" style="border: 1px dashed rgba(255,255,255,0.2); padding: 0.5rem;">
              <div style="padding: 0.5rem 1rem; background: var(--bh-color-primary); color: #fff; border-radius: 4px;">Short</div>
              <div style="padding: 0.5rem 2rem; background: var(--bh-color-primary); color: #fff; border-radius: 4px;">Medium length</div>
              <div style="padding: 0.5rem 1rem; background: var(--bh-color-primary); color: #fff; border-radius: 4px;">Sm</div>
            </bh-stack>
          </div>
        `
      )}
    </div>
  `,
};
