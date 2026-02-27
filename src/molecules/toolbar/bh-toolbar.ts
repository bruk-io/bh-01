import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { BaseElement } from '../../primitives/base-element.js';

export type ToolbarGap = 'xs' | 'sm' | 'md';
export type ToolbarVariant = 'default' | 'surface';

/**
 * A horizontal toolbar with start, center, and end slots.
 *
 * @slot start - Content aligned to the start (left)
 * @slot - Default slot, placed in center
 * @slot end - Content aligned to the end (right)
 *
 * @csspart toolbar - The toolbar container
 *
 * @cssprop [--bh-toolbar-bg=transparent] - Toolbar background
 * @cssprop [--bh-toolbar-border=var(--bh-color-border)] - Bottom border color when sticky
 */
@customElement('bh-toolbar')
export class BhToolbar extends BaseElement {
  static styles = [
    ...([BaseElement.styles].flat()),
    css`
      :host {
        display: block;
      }

      .toolbar {
        display: flex;
        align-items: center;
        padding: var(--bh-spacing-2) var(--bh-spacing-4);
      }

      /* Variant: surface */
      :host([variant='surface']) .toolbar {
        background: var(--bh-toolbar-bg, var(--bh-color-surface));
      }

      /* Sticky border */
      :host([sticky]) {
        position: sticky;
        top: 0;
        z-index: var(--bh-z-sticky);
      }

      :host([sticky]) .toolbar {
        border-bottom: var(--bh-border-1) solid var(--bh-toolbar-border, var(--bh-color-border));
      }

      /* Gap sizes */
      .toolbar {
        gap: var(--bh-spacing-2);
      }

      :host([gap='xs']) .toolbar {
        gap: var(--bh-spacing-1);
      }

      :host([gap='sm']) .toolbar {
        gap: var(--bh-spacing-2);
      }

      :host([gap='md']) .toolbar {
        gap: var(--bh-spacing-4);
      }

      /* Sections */
      .start,
      .center,
      .end {
        display: flex;
        align-items: center;
        gap: inherit;
      }

      .start {
        margin-inline-end: auto;
      }

      .center {
        flex: 1;
        justify-content: center;
      }

      .end {
        margin-inline-start: auto;
      }
    `,
  ];

  @property({ reflect: true }) gap: ToolbarGap = 'sm';
  @property({ reflect: true }) variant: ToolbarVariant = 'default';
  @property({ type: Boolean, reflect: true }) sticky = false;

  render() {
    return html`
      <div class="toolbar" part="toolbar" role="toolbar">
        <div class="start"><slot name="start"></slot></div>
        <div class="center"><slot></slot></div>
        <div class="end"><slot name="end"></slot></div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bh-toolbar': BhToolbar;
  }
}
