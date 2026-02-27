import type { Preview } from '@storybook/web-components-vite';
import { setCustomElementsManifest } from '@storybook/web-components-vite';
import { html } from 'lit';
import customElements from '../custom-elements.json';
import '../src/themes/default.css';

setCustomElementsManifest(customElements);

const preview: Preview = {
  tags: ['autodocs'],
  globalTypes: {
    theme: {
      description: 'Theme for components',
      toolbar: {
        title: 'Theme',
        icon: 'mirror',
        items: [
          { value: 'light', title: 'Light', icon: 'sun' },
          { value: 'dark', title: 'Dark', icon: 'moon' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    theme: 'light',
  },
  decorators: [
    (story, context) => {
      const theme = context.globals.theme || 'light';
      document.documentElement.setAttribute('data-theme', theme);
      document.body.style.background = 'var(--bh-color-surface)';
      document.body.style.transition = 'background 0.2s';
      return html`
        <div
          data-theme=${theme}
          style="background: var(--bh-color-surface); color: var(--bh-color-text); padding: 1rem; min-height: 100px; transition: background 0.2s, color 0.2s;"
        >
          ${story()}
        </div>
      `;
    },
  ],
  parameters: {
    backgrounds: { disable: true },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: 'todo',
    },
  },
};

export default preview;
