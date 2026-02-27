import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import './bh-center.js';
import '../stack/bh-stack.js';

const meta: Meta = {
  title: 'Layout/Flex/Center',
  component: 'bh-center',
  parameters: {
    docs: {
      description: {
        component: [
          '`bh-center` horizontally centers its children within the viewport or parent container, with an optional maximum width and safe gutters.',
          'It replaces the classic `max-width` + `margin: 0 auto` + `padding-inline` CSS pattern with a single declarative component.',
          '',
          '**CSS:** `display: flex; flex-direction: column; margin-inline: auto`',
          '',
          '**Use when:**',
          '- Constraining page content to a readable line length',
          '- Creating a centered content column (articles, forms, landing pages)',
          '- Wrapping any block that needs horizontal centering with safe edge padding',
          '- Building responsive layouts that cap width on large screens',
        ].join('\n'),
      },
    },
  },
  argTypes: {
    max: {
      control: 'text',
      description: 'Maximum inline size (width). Set to a CSS length to constrain content. `none` means no limit.',
    },
    gutters: {
      control: 'select',
      options: ['none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'],
      description: 'Safe padding on both sides, preventing content from touching the viewport edge on narrow screens.',
    },
    intrinsic: {
      control: 'boolean',
      description: 'When false (default), children stretch to fill the max width. When true, children shrink-wrap their content.',
    },
  },
  args: {
    max: '600px',
    gutters: 'none',
    intrinsic: false,
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Content centered within the parent with a max-width of 600px. The dashed border shows the full-width parent — notice how the centered block sits in the middle.',
      },
    },
  },
  render: (args) => html`
    <div style="border: 1px dashed rgba(255,255,255,0.2);">
      <bh-center max=${args.max} gutters=${args.gutters} ?intrinsic=${args.intrinsic}>
        <div style="padding: 1rem; background: var(--bh-color-primary); color: #fff; border-radius: 4px; text-align: center;">
          Centered content (max-width: ${args.max})
        </div>
      </bh-center>
    </div>
  `,
};

export const MaxWidths: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Different `max` values for different content types. Use narrow widths (300-500px) for forms and dialogs, medium (600-800px) for article text, and wider for dashboards.',
      },
    },
  },
  render: () => html`
    <bh-stack gap="lg">
      ${(['300px', '500px', '800px'] as const).map(
        (max) => html`
          <div style="border: 1px dashed rgba(255,255,255,0.2);">
            <p style="margin: 0 0 0.5rem 0.5rem; font-size: 0.875rem; opacity: 0.7;">max="${max}"</p>
            <bh-center max=${max}>
              <div style="padding: 1rem; background: var(--bh-color-primary); color: #fff; border-radius: 4px; text-align: center;">
                Content
              </div>
            </bh-center>
          </div>
        `
      )}
    </bh-stack>
  `,
};

export const WithGutters: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Gutters add safe inline padding so content never touches the viewport edge on small screens. Even when the container is narrower than `max`, gutters keep breathing room. Essential for mobile-friendly layouts.',
      },
    },
  },
  render: () => html`
    <bh-stack gap="lg">
      ${(['none', 'sm', 'md', 'lg', 'xl'] as const).map(
        (gutters) => html`
          <div style="border: 1px dashed rgba(255,255,255,0.2);">
            <p style="margin: 0 0 0.5rem 0.5rem; font-size: 0.875rem; opacity: 0.7;">gutters="${gutters}"</p>
            <bh-center max="400px" gutters=${gutters}>
              <div style="padding: 1rem; background: var(--bh-color-primary); color: #fff; border-radius: 4px; text-align: center;">
                Content with gutters
              </div>
            </bh-center>
          </div>
        `
      )}
    </bh-stack>
  `,
};

export const Intrinsic: Story = {
  parameters: {
    docs: {
      description: {
        story: 'By default, children stretch to fill the `max` width. With `intrinsic`, children shrink-wrap to their natural content size and sit centered. Use intrinsic for centered buttons, badges, or any element that shouldn\'t stretch.',
      },
    },
  },
  render: () => html`
    <bh-stack gap="lg">
      <div style="border: 1px dashed rgba(255,255,255,0.2);">
        <p style="margin: 0 0 0.5rem 0.5rem; font-size: 0.875rem; opacity: 0.7;">intrinsic=false (default) — children stretch</p>
        <bh-center max="500px">
          <div style="padding: 1rem; background: var(--bh-color-primary); color: #fff; border-radius: 4px; text-align: center;">
            Stretches to fill
          </div>
        </bh-center>
      </div>
      <div style="border: 1px dashed rgba(255,255,255,0.2);">
        <p style="margin: 0 0 0.5rem 0.5rem; font-size: 0.875rem; opacity: 0.7;">intrinsic=true — children shrink-wrap</p>
        <bh-center max="500px" intrinsic>
          <div style="padding: 1rem; background: var(--bh-color-primary); color: #fff; border-radius: 4px; text-align: center;">
            Shrink-wraps content
          </div>
        </bh-center>
      </div>
    </bh-stack>
  `,
};
