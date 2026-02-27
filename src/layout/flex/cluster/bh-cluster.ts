import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { BaseElement } from '../../../primitives/base-element.js';
import type {
  LayoutGap,
  LayoutAlign,
  LayoutJustify,
} from '../../layout-types.js';

/**
 * Horizontal wrapping flow layout primitive.
 *
 * Arranges slotted children in a row with configurable gap, alignment, and
 * justification. Wraps by default. Purely structural — no visual styling.
 *
 * @slot - Default slot for content
 *
 * @cssprop [--bh-cluster-gap] - Override gap value
 */
@customElement('bh-cluster')
export class BhCluster extends BaseElement {
  static styles = [
    ...([BaseElement.styles].flat()),
    css`
      :host {
        display: flex;
        flex-wrap: wrap;
        gap: var(--bh-cluster-gap, var(--bh-spacing-4));
        min-width: 0;
      }

      /* Gap */
      :host([gap='none']) {
        --bh-cluster-gap: 0;
      }

      :host([gap='xs']) {
        --bh-cluster-gap: var(--bh-spacing-1);
      }

      :host([gap='sm']) {
        --bh-cluster-gap: var(--bh-spacing-2);
      }

      :host([gap='md']) {
        --bh-cluster-gap: var(--bh-spacing-4);
      }

      :host([gap='lg']) {
        --bh-cluster-gap: var(--bh-spacing-6);
      }

      :host([gap='xl']) {
        --bh-cluster-gap: var(--bh-spacing-8);
      }

      :host([gap='2xl']) {
        --bh-cluster-gap: var(--bh-spacing-12);
      }

      /* Justify */
      :host([justify='start']) {
        justify-content: flex-start;
      }

      :host([justify='center']) {
        justify-content: center;
      }

      :host([justify='end']) {
        justify-content: flex-end;
      }

      :host([justify='between']) {
        justify-content: space-between;
      }

      :host([justify='around']) {
        justify-content: space-around;
      }

      :host([justify='evenly']) {
        justify-content: space-evenly;
      }

      /* Align */
      :host([align='start']) {
        align-items: flex-start;
      }

      :host([align='center']) {
        align-items: center;
      }

      :host([align='end']) {
        align-items: flex-end;
      }

      :host([align='stretch']) {
        align-items: stretch;
      }

      /* Nowrap */
      :host([nowrap]) {
        flex-wrap: nowrap;
      }
    `,
  ];

  @property({ reflect: true }) gap: LayoutGap = 'md';
  @property({ reflect: true }) justify: LayoutJustify = 'start';
  @property({ reflect: true }) align: LayoutAlign = 'center';
  @property({ type: Boolean, reflect: true }) nowrap = false;

  render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bh-cluster': BhCluster;
  }
}
