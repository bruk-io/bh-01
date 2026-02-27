import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import './bh-grid.js';
import '../../flex/stack/bh-stack.js';

const box = (n: number) => html`
  <div style="padding: 2rem 1rem; background: var(--bh-color-primary); color: #fff; border-radius: 4px; text-align: center;">
    Item ${n}
  </div>
`;

const meta: Meta = {
  title: 'Layout/Grid/Grid',
  component: 'bh-grid',
  parameters: {
    docs: {
      description: {
        component: [
          '`bh-grid` creates a responsive grid that automatically fills columns based on available space — no media queries needed.',
          'Columns are created with CSS `auto-fit` and `minmax()`, so items wrap to fewer columns as the container narrows and expand to more columns as it widens.',
          '',
          '**CSS:** `display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, <min>), 1fr))`',
          '',
          '**Use when:**',
          '- Displaying a grid of cards, tiles, or thumbnails',
          '- Product listings or search results',
          '- Dashboard widget grids',
          '- Any uniform grid where items should reflow responsively without breakpoints',
        ].join('\n'),
      },
    },
  },
  argTypes: {
    gap: {
      control: 'select',
      options: ['none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'],
      description: 'Space between grid items in both row and column directions.',
    },
    min: {
      control: 'text',
      description: 'Minimum column width before a column wraps. Smaller values = more columns; larger values = fewer columns.',
    },
  },
  args: {
    gap: 'md',
    min: '250px',
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Six items in a responsive grid. Resize the window to see columns automatically adjust — items wrap to fewer columns as space shrinks. The `min` prop (default 250px) controls the breakpoint for each column.',
      },
    },
  },
  render: (args) => html`
    <bh-grid gap=${args.gap} min=${args.min}>
      ${[1, 2, 3, 4, 5, 6].map((n) => box(n))}
    </bh-grid>
  `,
};

export const MinColumnWidths: Story = {
  parameters: {
    docs: {
      description: {
        story: 'The `min` prop controls how narrow a column can get before it wraps. `150px` creates many small columns (thumbnail grid), `250px` is a balanced default (card grid), `350px` creates fewer wide columns (article cards).',
      },
    },
  },
  render: () => html`
    <bh-stack gap="xl">
      ${(['150px', '250px', '350px'] as const).map(
        (min) => html`
          <div>
            <p style="margin: 0 0 0.5rem; font-size: 0.875rem; opacity: 0.7;">min="${min}"</p>
            <bh-grid gap="md" min=${min}>
              ${[1, 2, 3, 4, 5, 6].map((n) => box(n))}
            </bh-grid>
          </div>
        `
      )}
    </bh-stack>
  `,
};

export const ManyItems: Story = {
  parameters: {
    docs: {
      description: {
        story: 'A larger grid with 12 items at a smaller minimum width. This pattern works great for thumbnail galleries, icon grids, or any collection with many small items.',
      },
    },
  },
  render: () => html`
    <bh-grid gap="sm" min="200px">
      ${Array.from({ length: 12 }, (_, i) => box(i + 1))}
    </bh-grid>
  `,
};

export const GapSizes: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Gap size comparison. Tight gaps (`none`/`sm`) work for dense data grids; medium (`md`) for card layouts; wide (`lg`/`xl`) for spacious dashboard widgets.',
      },
    },
  },
  render: () => html`
    <bh-stack gap="xl">
      ${(['none', 'sm', 'md', 'lg', 'xl'] as const).map(
        (gap) => html`
          <div>
            <p style="margin: 0 0 0.5rem; font-size: 0.875rem; opacity: 0.7;">gap="${gap}"</p>
            <bh-grid gap=${gap} min="150px">
              ${[1, 2, 3, 4].map((n) => box(n))}
            </bh-grid>
          </div>
        `
      )}
    </bh-stack>
  `,
};
