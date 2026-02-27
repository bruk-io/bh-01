import { html, css, type PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { BaseElement } from '../../../primitives/base-element.js';
import type { LayoutGap } from '../../layout-types.js';

/**
 * Responsive auto-fit grid layout primitive.
 *
 * Arranges slotted children in columns that auto-fit to the container
 * with a configurable minimum column width and gap.
 * Purely structural — no visual styling.
 *
 * @slot - Default slot for content
 *
 * @cssprop [--bh-grid-gap] - Override gap value
 * @cssprop [--bh-grid-min] - Override minimum column width
 */
@customElement('bh-grid')
export class BhGrid extends BaseElement {
  static styles = [
    ...([BaseElement.styles].flat()),
    css`
      :host {
        display: grid;
        grid-template-columns: repeat(
          auto-fit,
          minmax(min(100%, var(--bh-grid-min, 250px)), 1fr)
        );
        gap: var(--bh-grid-gap, var(--bh-spacing-4));
      }

      /* Gap */
      :host([gap='none']) {
        --bh-grid-gap: 0;
      }

      :host([gap='xs']) {
        --bh-grid-gap: var(--bh-spacing-1);
      }

      :host([gap='sm']) {
        --bh-grid-gap: var(--bh-spacing-2);
      }

      :host([gap='md']) {
        --bh-grid-gap: var(--bh-spacing-4);
      }

      :host([gap='lg']) {
        --bh-grid-gap: var(--bh-spacing-6);
      }

      :host([gap='xl']) {
        --bh-grid-gap: var(--bh-spacing-8);
      }

      :host([gap='2xl']) {
        --bh-grid-gap: var(--bh-spacing-12);
      }
    `,
  ];

  @property({ reflect: true }) gap: LayoutGap = 'md';
  @property({ reflect: true }) min: string = '250px';

  protected willUpdate(changed: PropertyValues<this>) {
    if (changed.has('min')) {
      this.style.setProperty('--bh-grid-min', this.min);
    }
  }

  render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bh-grid': BhGrid;
  }
}
