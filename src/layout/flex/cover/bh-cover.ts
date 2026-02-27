import { html, css, type PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { BaseElement } from '../../../primitives/base-element.js';
import type { LayoutGap } from '../../layout-types.js';

/**
 * Vertical layout with expanding center.
 *
 * Places content in top, center, and bottom slots. The center slot
 * expands to fill remaining space within the minimum height.
 *
 * @slot - Default slot for top content
 * @slot center - Center content that expands to fill space
 * @slot bottom - Bottom content
 *
 * @cssprop [--bh-cover-gap] - Override gap value
 * @cssprop [--bh-cover-min-height] - Override minimum height
 */
@customElement('bh-cover')
export class BhCover extends BaseElement {
  static styles = [
    ...([BaseElement.styles].flat()),
    css`
      :host {
        display: flex;
        flex-direction: column;
        gap: var(--bh-cover-gap, var(--bh-spacing-4));
        min-block-size: var(--bh-cover-min-height, 100vh);
        min-width: 0;
      }

      /* Gap */
      :host([gap='none']) {
        --bh-cover-gap: 0;
      }

      :host([gap='xs']) {
        --bh-cover-gap: var(--bh-spacing-1);
      }

      :host([gap='sm']) {
        --bh-cover-gap: var(--bh-spacing-2);
      }

      :host([gap='md']) {
        --bh-cover-gap: var(--bh-spacing-4);
      }

      :host([gap='lg']) {
        --bh-cover-gap: var(--bh-spacing-6);
      }

      :host([gap='xl']) {
        --bh-cover-gap: var(--bh-spacing-8);
      }

      :host([gap='2xl']) {
        --bh-cover-gap: var(--bh-spacing-12);
      }

      ::slotted([slot='center']) {
        flex-grow: 1;
      }
    `,
  ];

  @property({ reflect: true }) gap: LayoutGap = 'md';
  @property({ reflect: true, attribute: 'min-height' }) minHeight = '100vh';

  protected willUpdate(changed: PropertyValues<this>) {
    if (changed.has('minHeight')) {
      this.style.setProperty('--bh-cover-min-height', this.minHeight);
    }
  }

  render() {
    return html`
      <slot></slot>
      <slot name="center"></slot>
      <slot name="bottom"></slot>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bh-cover': BhCover;
  }
}
