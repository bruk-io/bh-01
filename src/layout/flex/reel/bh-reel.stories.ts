import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import './bh-reel.js';
import '../stack/bh-stack.js';

const card = (n: number) => html`
  <div style="padding: 2rem 1.5rem; background: var(--bh-color-primary); color: #fff; border-radius: 8px; text-align: center; white-space: nowrap;">
    Card ${n}
  </div>
`;

const meta: Meta = {
  title: 'Layout/Flex/Reel',
  component: 'bh-reel',
  parameters: {
    docs: {
      description: {
        component: [
          '`bh-reel` creates a horizontal scrollable strip of items — a "film reel" that the user can scroll through.',
          'Items stay in a single row and the container scrolls horizontally when content overflows. Optionally snap items into position for a carousel-like feel.',
          '',
          '**CSS:** `display: flex; overflow-x: auto`',
          '',
          '**Use when:**',
          '- Building a horizontal card carousel',
          '- Displaying a filmstrip of images or thumbnails',
          '- Horizontal tab bars that scroll when there are many tabs',
          '- Any horizontally-scrolling list (testimonials, product cards, media galleries)',
        ].join('\n'),
      },
    },
  },
  argTypes: {
    gap: {
      control: 'select',
      options: ['none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'],
      description: 'Space between scrollable items.',
    },
    itemWidth: {
      control: 'text',
      description: 'Fixed width for each item (e.g. `200px`, `15rem`). `auto` lets items size themselves.',
    },
    snap: {
      control: 'boolean',
      description: 'Enable scroll snapping — items lock into position when scrolling stops.',
    },
  },
  args: {
    gap: 'md',
    itemWidth: 'auto',
    snap: false,
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'A basic scrollable row of cards. Scroll horizontally to see more items. Items size themselves naturally (auto width).',
      },
    },
  },
  render: (args) => html`
    <bh-reel gap=${args.gap} item-width=${args.itemWidth} ?snap=${args.snap}>
      ${[1, 2, 3, 4, 5, 6, 7, 8].map((n) => card(n))}
    </bh-reel>
  `,
};

export const FixedItemWidth: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Each item is locked to 200px wide. This ensures uniform card sizes regardless of content length — ideal for product cards or image galleries.',
      },
    },
  },
  render: () => html`
    <p style="margin: 0 0 0.5rem; font-size: 0.875rem; opacity: 0.7;">item-width="200px"</p>
    <bh-reel gap="md" item-width="200px">
      ${[1, 2, 3, 4, 5, 6, 7, 8].map((n) => card(n))}
    </bh-reel>
  `,
};

export const WithSnap: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Scroll snapping gives a carousel feel — when you release the scroll, items lock to the nearest start edge. Combine with `item-width` for a polished paginated scroll experience.',
      },
    },
  },
  render: () => html`
    <p style="margin: 0 0 0.5rem; font-size: 0.875rem; opacity: 0.7;">snap + item-width="250px" — scroll to see snapping</p>
    <bh-reel gap="md" item-width="250px" snap>
      ${[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => card(n))}
    </bh-reel>
  `,
};

export const GapSizes: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Gap sizes compared. Tighter gaps (`xs`/`sm`) work well for thumbnail strips; wider gaps (`lg`/`xl`) suit larger card carousels.',
      },
    },
  },
  render: () => html`
    <bh-stack gap="lg">
      ${(['none', 'xs', 'sm', 'md', 'lg', 'xl'] as const).map(
        (gap) => html`
          <div>
            <p style="margin: 0 0 0.5rem; font-size: 0.875rem; opacity: 0.7;">gap="${gap}"</p>
            <bh-reel gap=${gap}>
              ${[1, 2, 3, 4, 5, 6].map((n) => card(n))}
            </bh-reel>
          </div>
        `
      )}
    </bh-stack>
  `,
};
