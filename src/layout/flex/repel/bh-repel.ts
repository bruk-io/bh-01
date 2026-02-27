import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { BaseElement } from '../../../primitives/base-element.js';
import type { LayoutGap, LayoutAlign } from '../../layout-types.js';

/**
 * Push children to opposite ends.
 *
 * Arranges slotted children along the main axis with space-between
 * justification and configurable gap and alignment.
 * Purely structural — no visual styling.
 *
 * @slot - Default slot for content
 *
 * @cssprop [--bh-repel-gap] - Override gap value
 */
@customElement('bh-repel')
export class BhRepel extends BaseElement {
  static styles = [
    ...([BaseElement.styles].flat()),
    css`
      :host {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: var(--bh-repel-gap, var(--bh-spacing-4));
        min-width: 0;
      }

      /* Gap */
      :host([gap='none']) {
        --bh-repel-gap: 0;
      }

      :host([gap='xs']) {
        --bh-repel-gap: var(--bh-spacing-1);
      }

      :host([gap='sm']) {
        --bh-repel-gap: var(--bh-spacing-2);
      }

      :host([gap='md']) {
        --bh-repel-gap: var(--bh-spacing-4);
      }

      :host([gap='lg']) {
        --bh-repel-gap: var(--bh-spacing-6);
      }

      :host([gap='xl']) {
        --bh-repel-gap: var(--bh-spacing-8);
      }

      :host([gap='2xl']) {
        --bh-repel-gap: var(--bh-spacing-12);
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
    `,
  ];

  @property({ reflect: true }) gap: LayoutGap = 'md';
  @property({ reflect: true }) align: LayoutAlign = 'center';

  render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bh-repel': BhRepel;
  }
}
