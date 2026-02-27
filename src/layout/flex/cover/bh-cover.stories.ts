import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import './bh-cover.js';

const meta: Meta = {
  title: 'Layout/Flex/Cover',
  component: 'bh-cover',
  parameters: {
    docs: {
      description: {
        component: [
          '`bh-cover` creates a vertical layout where the center content expands to fill all available space, pushing a header to the top and a footer to the bottom.',
          'It solves the classic "sticky footer" problem declaratively — no `calc()`, no absolute positioning, no `min-height` hacks.',
          '',
          '**CSS:** `display: flex; flex-direction: column; min-block-size`',
          '',
          '**Slots:** default (top), `center` (expands), `bottom` (footer)',
          '',
          '**Use when:**',
          '- Full-page layouts with header, main content, and footer',
          '- Dialog or modal interiors (header, body, action bar)',
          '- Card layouts where the body should fill remaining space',
          '- Any vertical arrangement where one section must grow to fill the available height',
        ].join('\n'),
      },
    },
  },
  argTypes: {
    gap: {
      control: 'select',
      options: ['none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'],
      description: 'Vertical spacing between the three sections.',
    },
    minHeight: {
      control: 'text',
      description: 'Minimum height of the cover. Use `100vh` for full-page layouts, or a fixed value for cards/dialogs.',
    },
  },
  args: {
    gap: 'md',
    minHeight: '400px',
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Three sections — header (default slot), center (expands to fill), and footer. The center section grows to consume all remaining vertical space within the `min-height`.',
      },
    },
  },
  render: (args) => html`
    <bh-cover gap=${args.gap} min-height=${args.minHeight} style="border: 1px dashed rgba(255,255,255,0.2); border-radius: 8px;">
      <div style="padding: 1rem; background: var(--bh-color-surface); border-radius: 4px; text-align: center;">Header</div>
      <div slot="center" style="padding: 1rem; background: var(--bh-color-primary); color: #fff; border-radius: 4px; text-align: center;">
        Center (expands)
      </div>
      <div slot="bottom" style="padding: 1rem; background: var(--bh-color-surface); border-radius: 4px; text-align: center;">Footer</div>
    </bh-cover>
  `,
};

export const PageLayout: Story = {
  parameters: {
    docs: {
      description: {
        story: 'A realistic page layout — nav at the top, main content area that fills the page, and a footer pinned to the bottom. This is the primary use case: wrap your entire page in `bh-cover` with `min-height="100vh"` and the footer will always sit at the bottom.',
      },
    },
  },
  render: () => html`
    <bh-cover min-height="500px" gap="none" style="border: 1px dashed rgba(255,255,255,0.2); border-radius: 8px; overflow: hidden;">
      <nav style="padding: 1rem; background: var(--bh-color-surface); display: flex; justify-content: space-between; align-items: center;">
        <span style="font-weight: 600;">My App</span>
        <div style="display: flex; gap: 1rem; font-size: 0.875rem;">
          <span>Home</span>
          <span>About</span>
          <span>Contact</span>
        </div>
      </nav>
      <main slot="center" style="padding: 2rem; display: flex; align-items: center; justify-content: center;">
        <p style="opacity: 0.7; text-align: center;">Main content area — expands to fill available space</p>
      </main>
      <footer slot="bottom" style="padding: 1rem; background: var(--bh-color-surface); text-align: center; font-size: 0.75rem; opacity: 0.6;">
        Footer content
      </footer>
    </bh-cover>
  `,
};

export const MinHeightVariations: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Different `min-height` values side by side. Use smaller values (200-300px) for card interiors or modals, larger values for page sections, and `100vh` for full-page layouts.',
      },
    },
  },
  render: () => html`
    <div style="display: flex; gap: 1.5rem; flex-wrap: wrap;">
      ${(['200px', '300px', '400px'] as const).map(
        (h) => html`
          <div style="flex: 1;">
            <p style="margin: 0 0 0.5rem; font-size: 0.875rem; opacity: 0.7;">min-height="${h}"</p>
            <bh-cover min-height=${h} gap="sm" style="border: 1px dashed rgba(255,255,255,0.2); border-radius: 8px;">
              <div style="padding: 0.5rem; background: var(--bh-color-surface); border-radius: 4px; text-align: center; font-size: 0.875rem;">Top</div>
              <div slot="center" style="padding: 0.5rem; background: var(--bh-color-primary); color: #fff; border-radius: 4px; text-align: center; font-size: 0.875rem;">Center</div>
              <div slot="bottom" style="padding: 0.5rem; background: var(--bh-color-surface); border-radius: 4px; text-align: center; font-size: 0.875rem;">Bottom</div>
            </bh-cover>
          </div>
        `
      )}
    </div>
  `,
};
