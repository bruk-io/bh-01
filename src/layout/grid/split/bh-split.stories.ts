import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import './bh-split.js';
import '../../flex/stack/bh-stack.js';

const panel = (label: string, color = 'var(--bh-color-primary)') => html`
  <div style="padding: 2rem 1rem; background: ${color}; color: #fff; border-radius: 4px; text-align: center;">
    ${label}
  </div>
`;

const meta: Meta = {
  title: 'Layout/Grid/Split',
  component: 'bh-split',
  parameters: {
    docs: {
      description: {
        component: [
          '`bh-split` divides its children into columns at explicit ratios using CSS Grid — no percentage calculations or nested wrappers needed.',
          'The `ratio` prop accepts a slash-separated string like `"1/1"`, `"2/1"`, or `"1/2/1"` and converts it to `fr` units.',
          '',
          '**CSS:** `display: grid; grid-template-columns: <ratio as fr units>`',
          '',
          '**Use when:**',
          '- Sidebar + main content layouts (`1/3` or `1/4`)',
          '- Two-column forms or comparison views (`1/1`)',
          '- Three-column layouts with a wider center (`1/2/1`)',
          '- Any layout where you need explicit, proportional column widths',
        ].join('\n'),
      },
    },
  },
  argTypes: {
    gap: {
      control: 'select',
      options: ['none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'],
      description: 'Space between columns.',
    },
    ratio: {
      control: 'text',
      description: 'Column ratio as slash-separated numbers. `"1/1"` = equal halves, `"2/1"` = 2:1 split, `"1/2/1"` = three columns with wider center.',
    },
  },
  args: {
    gap: 'md',
    ratio: '1/1',
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'A simple 50/50 split. Both columns take equal space. Use the `ratio` control to experiment with different proportions.',
      },
    },
  },
  render: (args) => html`
    <bh-split gap=${args.gap} ratio=${args.ratio}>
      ${panel('Left')} ${panel('Right')}
    </bh-split>
  `,
};

export const Ratios: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Common ratio patterns. `1/1` for equal splits, `2/1` or `1/2` for asymmetric layouts, `1/3` for sidebars, and `1/2/1` for three-column with wider center. The ratio is converted directly to CSS `fr` units.',
      },
    },
  },
  render: () => html`
    <bh-stack gap="xl">
      ${(['1/1', '2/1', '1/2', '1/3', '3/1', '1/2/1', '1/1/1'] as const).map(
        (ratio) => html`
          <div>
            <p style="margin: 0 0 0.5rem; font-size: 0.875rem; opacity: 0.7;">ratio="${ratio}"</p>
            <bh-split gap="md" ratio=${ratio}>
              ${ratio.split('/').map((_, i) => panel(`Col ${i + 1}`))}
            </bh-split>
          </div>
        `
      )}
    </bh-stack>
  `,
};

export const SidebarLayout: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Classic sidebar layout with `ratio="1/3"` — the sidebar takes 1 fraction and the main content takes 3 fractions (25% / 75%). This is the most common dashboard pattern.',
      },
    },
  },
  render: () => html`
    <bh-split ratio="1/3" gap="md">
      <div style="padding: 1.5rem; background: var(--bh-color-surface); border-radius: 8px;">
        <p style="margin: 0; font-weight: 600;">Sidebar</p>
        <p style="margin: 0.5rem 0 0; font-size: 0.875rem; opacity: 0.7;">Navigation and filters</p>
      </div>
      <div style="padding: 1.5rem; background: var(--bh-color-surface); border-radius: 8px;">
        <p style="margin: 0; font-weight: 600;">Main Content</p>
        <p style="margin: 0.5rem 0 0; font-size: 0.875rem; opacity: 0.7;">Primary content area takes up more space</p>
      </div>
    </bh-split>
  `,
};

export const ThreeColumn: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Three-column layout with `ratio="1/2/1"` — left and right rails are equal width, and the center column gets double the space. Common for content-focused pages with contextual sidebars.',
      },
    },
  },
  render: () => html`
    <bh-split ratio="1/2/1" gap="md">
      <div style="padding: 1.5rem; background: var(--bh-color-surface); border-radius: 8px;">
        <p style="margin: 0; font-weight: 600; font-size: 0.875rem;">Left Rail</p>
      </div>
      <div style="padding: 1.5rem; background: var(--bh-color-surface); border-radius: 8px;">
        <p style="margin: 0; font-weight: 600;">Main Content</p>
        <p style="margin: 0.5rem 0 0; font-size: 0.875rem; opacity: 0.7;">Wider center column</p>
      </div>
      <div style="padding: 1.5rem; background: var(--bh-color-surface); border-radius: 8px;">
        <p style="margin: 0; font-weight: 600; font-size: 0.875rem;">Right Rail</p>
      </div>
    </bh-split>
  `,
};
