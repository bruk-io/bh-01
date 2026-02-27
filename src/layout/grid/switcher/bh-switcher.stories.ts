import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import './bh-switcher.js';
import '../../flex/stack/bh-stack.js';

const box = (n: number) => html`
  <div style="padding: 2rem 1rem; background: var(--bh-color-primary); color: #fff; border-radius: 4px; text-align: center;">
    Item ${n}
  </div>
`;

const meta: Meta = {
  title: 'Layout/Grid/Switcher',
  component: 'bh-switcher',
  parameters: {
    docs: {
      description: {
        component: [
          '`bh-switcher` creates a multi-column layout that automatically collapses to a single column when the container becomes too narrow — all without media queries.',
          'It uses CSS Grid with a `minmax()` trick: columns stay side by side when each can fit above the `threshold` width, and stack vertically when they can\'t.',
          '',
          '**CSS:** `display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, max(<threshold>, 100%/<limit>)), 1fr))`',
          '',
          '**Use when:**',
          '- Feature cards that should stack on mobile',
          '- Pricing tier comparisons',
          '- Dashboard widgets that collapse on narrow viewports',
          '- Any multi-column layout that needs a single breakpoint to stack',
          '',
          '**How it differs from `bh-grid`:** Grid auto-fits as many columns as possible with a minimum width. Switcher uses `max()` to enforce a column cap (`limit`) while still using `auto-fit` — columns collapse when each can\'t meet the `threshold`, and never exceed `limit` columns.',
        ].join('\n'),
      },
    },
  },
  argTypes: {
    gap: {
      control: 'select',
      options: ['none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'],
      description: 'Space between items in both row and column directions.',
    },
    threshold: {
      control: 'text',
      description: 'Minimum width each column needs before the layout collapses to a single column.',
    },
    limit: {
      control: 'number',
      description: 'Maximum number of columns. Items beyond this count wrap to a new row.',
    },
  },
  args: {
    gap: 'md',
    threshold: '30rem',
    limit: 4,
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Four columns that collapse to a single column when the container can\'t give each column at least 30rem of space. Resize the window to see the switch happen.',
      },
    },
  },
  render: (args) => html`
    <bh-switcher gap=${args.gap} threshold=${args.threshold} limit=${args.limit}>
      ${[1, 2, 3, 4].map((n) => box(n))}
    </bh-switcher>
  `,
};

export const ThresholdVariations: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Different threshold values control when the collapse happens. A smaller threshold (20rem) means columns stay longer; a larger threshold (40rem) makes them stack sooner. Choose based on how much content each column needs.',
      },
    },
  },
  render: () => html`
    <bh-stack gap="xl">
      ${(['20rem', '30rem', '40rem'] as const).map(
        (threshold) => html`
          <div>
            <p style="margin: 0 0 0.5rem; font-size: 0.875rem; opacity: 0.7;">threshold="${threshold}" — resize window to see collapse</p>
            <bh-switcher gap="md" threshold=${threshold} limit="3">
              ${[1, 2, 3].map((n) => box(n))}
            </bh-switcher>
          </div>
        `
      )}
    </bh-stack>
  `,
};

export const LimitVariations: Story = {
  parameters: {
    docs: {
      description: {
        story: 'The `limit` prop caps the maximum number of columns. Use `limit="2"` for side-by-side pairs, `limit="3"` for feature sections, `limit="4"` for dense grids. Extra items wrap to new rows.',
      },
    },
  },
  render: () => html`
    <bh-stack gap="xl">
      ${([2, 3, 4] as const).map(
        (limit) => html`
          <div>
            <p style="margin: 0 0 0.5rem; font-size: 0.875rem; opacity: 0.7;">limit=${limit}</p>
            <bh-switcher gap="md" threshold="15rem" limit=${limit}>
              ${Array.from({ length: limit }, (_, i) => box(i + 1))}
            </bh-switcher>
          </div>
        `
      )}
    </bh-stack>
  `,
};

export const CardGrid: Story = {
  parameters: {
    docs: {
      description: {
        story: 'A realistic use case — three feature cards that sit side by side on wide screens and stack vertically on narrow ones. This is the most common switcher pattern for landing pages and feature sections.',
      },
    },
  },
  render: () => html`
    <bh-switcher gap="md" threshold="20rem" limit="3">
      <div style="padding: 1.5rem; background: var(--bh-color-surface); border-radius: 8px;">
        <p style="margin: 0; font-weight: 600;">Feature 1</p>
        <p style="margin: 0.5rem 0 0; font-size: 0.875rem; opacity: 0.7;">Collapses to single column on narrow screens</p>
      </div>
      <div style="padding: 1.5rem; background: var(--bh-color-surface); border-radius: 8px;">
        <p style="margin: 0; font-weight: 600;">Feature 2</p>
        <p style="margin: 0.5rem 0 0; font-size: 0.875rem; opacity: 0.7;">Automatically stacks when space is limited</p>
      </div>
      <div style="padding: 1.5rem; background: var(--bh-color-surface); border-radius: 8px;">
        <p style="margin: 0; font-weight: 600;">Feature 3</p>
        <p style="margin: 0.5rem 0 0; font-size: 0.875rem; opacity: 0.7;">No media queries needed</p>
      </div>
    </bh-switcher>
  `,
};
