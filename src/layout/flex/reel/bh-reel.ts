import { html, css, type PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { BaseElement } from '../../../primitives/base-element.js';
import type { LayoutGap } from '../../layout-types.js';

/**
 * Horizontal scroll strip layout primitive.
 *
 * Arranges slotted children in a horizontal scrollable row with configurable
 * gap, item width, and optional scroll snapping. Purely structural.
 *
 * @slot - Default slot for content
 *
 * @cssprop [--bh-reel-gap] - Override gap value
 * @cssprop [--bh-reel-item-width] - Override item width
 */
@customElement('bh-reel')
export class BhReel extends BaseElement {
  static styles = [
    ...([BaseElement.styles].flat()),
    css`
      :host {
        display: flex;
        overflow-x: auto;
        gap: var(--bh-reel-gap, var(--bh-spacing-4));
        min-width: 0;
      }

      /* Gap */
      :host([gap='none']) {
        --bh-reel-gap: 0;
      }

      :host([gap='xs']) {
        --bh-reel-gap: var(--bh-spacing-1);
      }

      :host([gap='sm']) {
        --bh-reel-gap: var(--bh-spacing-2);
      }

      :host([gap='md']) {
        --bh-reel-gap: var(--bh-spacing-4);
      }

      :host([gap='lg']) {
        --bh-reel-gap: var(--bh-spacing-6);
      }

      :host([gap='xl']) {
        --bh-reel-gap: var(--bh-spacing-8);
      }

      :host([gap='2xl']) {
        --bh-reel-gap: var(--bh-spacing-12);
      }

      /* Snap */
      :host([snap]) {
        scroll-snap-type: x mandatory;
      }

      :host([snap]) ::slotted(*) {
        scroll-snap-align: start;
      }

      /* Item width */
      ::slotted(*) {
        flex: 0 0 var(--bh-reel-item-width, auto);
      }
    `,
  ];

  @property({ reflect: true }) gap: LayoutGap = 'md';
  @property({ reflect: true, attribute: 'item-width' }) itemWidth = 'auto';
  @property({ type: Boolean, reflect: true }) snap = false;

  protected willUpdate(changed: PropertyValues<this>) {
    if (changed.has('itemWidth')) {
      this.style.setProperty('--bh-reel-item-width', this.itemWidth);
    }
  }

  render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bh-reel': BhReel;
  }
}
