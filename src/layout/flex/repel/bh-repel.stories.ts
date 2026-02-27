import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import './bh-repel.js';
import '../stack/bh-stack.js';

const meta: Meta = {
  title: 'Layout/Flex/Repel',
  component: 'bh-repel',
  parameters: {
    docs: {
      description: {
        component: [
          '`bh-repel` pushes its children to opposite ends of the container — the first child goes to the left, the last to the right, with space-between distribution.',
          'This is the go-to layout for any "left vs right" arrangement where two groups of content should be pushed apart.',
          '',
          '**CSS:** `display: flex; justify-content: space-between; align-items: center`',
          '',
          '**Use when:**',
          '- Building a navbar (logo left, links right)',
          '- Card headers (title left, actions right)',
          '- Toolbar rows (search left, filters right)',
          '- Any two-sided horizontal arrangement',
        ].join('\n'),
      },
    },
  },
  argTypes: {
    gap: {
      control: 'select',
      options: ['none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'],
      description: 'Minimum space between the repelled groups. Prevents items from touching when the container is narrow.',
    },
    align: {
      control: 'select',
      options: ['start', 'center', 'end', 'stretch'],
      description: 'Vertical alignment of children. `center` (default) is best for most cases.',
    },
  },
  args: {
    gap: 'md',
    align: 'center',
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Two items pushed to opposite sides. The `gap` acts as a minimum distance — items will always have at least that much space even in narrow containers.',
      },
    },
  },
  render: (args) => html`
    <bh-repel gap=${args.gap} align=${args.align} style="border: 1px dashed rgba(255,255,255,0.2); padding: 0.5rem;">
      <div style="padding: 0.5rem 1rem; background: var(--bh-color-primary); color: #fff; border-radius: 4px;">Left</div>
      <div style="padding: 0.5rem 1rem; background: var(--bh-color-primary); color: #fff; border-radius: 4px;">Right</div>
    </bh-repel>
  `,
};

export const NavBar: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Classic navbar pattern — logo on the left, navigation links on the right. This is one of the most common uses for `bh-repel`.',
      },
    },
  },
  render: () => html`
    <bh-repel gap="md" style="padding: 0.75rem 1rem; background: var(--bh-color-surface); border-radius: 8px;">
      <div style="font-weight: 600; font-size: 1.125rem;">Logo</div>
      <div style="display: flex; gap: 1rem; align-items: center;">
        <span>Home</span>
        <span>About</span>
        <span>Contact</span>
      </div>
    </bh-repel>
  `,
};

export const CardHeader: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Card header with a title on the left and an action button on the right. Nest `bh-repel` inside card headers, list items, or table rows wherever you need a left/right split.',
      },
    },
  },
  render: () => html`
    <div style="max-width: 400px; padding: 1rem; background: var(--bh-color-surface); border-radius: 8px;">
      <bh-repel gap="sm">
        <div style="font-weight: 600;">Card Title</div>
        <div style="padding: 0.25rem 0.5rem; background: var(--bh-color-primary); color: #fff; border-radius: 4px; font-size: 0.75rem;">Action</div>
      </bh-repel>
    </div>
  `,
};

export const Alignment: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Vertical alignment when children have different heights. `center` (default) is the safest choice. Use `start` or `end` to pin items to the top or bottom. `stretch` makes both children match the tallest.',
      },
    },
  },
  render: () => html`
    <bh-stack gap="lg">
      ${(['start', 'center', 'end', 'stretch'] as const).map(
        (align) => html`
          <div>
            <p style="margin: 0 0 0.5rem; font-size: 0.875rem; opacity: 0.7;">align="${align}"</p>
            <bh-repel align=${align} style="border: 1px dashed rgba(255,255,255,0.2); padding: 0.5rem;">
              <div style="padding: 1.5rem 1rem; background: var(--bh-color-primary); color: #fff; border-radius: 4px;">Tall</div>
              <div style="padding: 0.5rem 1rem; background: var(--bh-color-primary); color: #fff; border-radius: 4px;">Short</div>
            </bh-repel>
          </div>
        `
      )}
    </bh-stack>
  `,
};
