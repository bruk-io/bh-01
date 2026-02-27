import { html, css, type PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { BaseElement } from '../../../primitives/base-element.js';
import type { LayoutGap } from '../../layout-types.js';

/**
 * Explicit column ratio layout primitive.
 *
 * Arranges slotted children in a grid with configurable gap and column ratios.
 * Purely structural — no visual styling.
 *
 * @slot - Default slot for content
 *
 * @cssprop [--bh-split-gap] - Override gap value
 */
@customElement('bh-split')
export class BhSplit extends BaseElement {
  static styles = [
    ...([BaseElement.styles].flat()),
    css`
      :host {
        display: grid;
        gap: var(--bh-split-gap, var(--bh-spacing-4));
      }

      /* Gap */
      :host([gap='none']) {
        --bh-split-gap: 0;
      }

      :host([gap='xs']) {
        --bh-split-gap: var(--bh-spacing-1);
      }

      :host([gap='sm']) {
        --bh-split-gap: var(--bh-spacing-2);
      }

      :host([gap='md']) {
        --bh-split-gap: var(--bh-spacing-4);
      }

      :host([gap='lg']) {
        --bh-split-gap: var(--bh-spacing-6);
      }

      :host([gap='xl']) {
        --bh-split-gap: var(--bh-spacing-8);
      }

      :host([gap='2xl']) {
        --bh-split-gap: var(--bh-spacing-12);
      }
    `,
  ];

  @property({ reflect: true }) gap: LayoutGap = 'md';
  @property({ reflect: true }) ratio = '1/1';

  protected willUpdate(changedProperties: PropertyValues<this>): void {
    if (changedProperties.has('ratio')) {
      const columns = this.ratio
        .split('/')
        .map((n) => `${n.trim()}fr`)
        .join(' ');
      this.style.setProperty('grid-template-columns', columns);
    }
  }

  render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bh-split': BhSplit;
  }
}
