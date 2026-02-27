import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { BaseElement } from '../../../primitives/base-element.js';
import type { LayoutGap, LayoutAlign } from '../../layout-types.js';

/**
 * Vertical flow layout primitive.
 *
 * Arranges slotted children in a column with configurable gap and alignment.
 * Purely structural — no visual styling.
 *
 * @slot - Default slot for content
 *
 * @cssprop [--bh-stack-gap] - Override gap value
 */
@customElement('bh-stack')
export class BhStack extends BaseElement {
  static styles = [
    ...([BaseElement.styles].flat()),
    css`
      :host {
        display: flex;
        flex-direction: column;
        gap: var(--bh-stack-gap, var(--bh-spacing-4));
        min-width: 0;
      }

      /* Gap */
      :host([gap='none']) {
        --bh-stack-gap: 0;
      }

      :host([gap='xs']) {
        --bh-stack-gap: var(--bh-spacing-1);
      }

      :host([gap='sm']) {
        --bh-stack-gap: var(--bh-spacing-2);
      }

      :host([gap='md']) {
        --bh-stack-gap: var(--bh-spacing-4);
      }

      :host([gap='lg']) {
        --bh-stack-gap: var(--bh-spacing-6);
      }

      :host([gap='xl']) {
        --bh-stack-gap: var(--bh-spacing-8);
      }

      :host([gap='2xl']) {
        --bh-stack-gap: var(--bh-spacing-12);
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

      /* Wrap */
      :host([wrap]) {
        flex-wrap: wrap;
      }
    `,
  ];

  @property({ reflect: true }) gap: LayoutGap = 'md';
  @property({ reflect: true }) align: LayoutAlign = 'stretch';
  @property({ type: Boolean, reflect: true }) wrap = false;

  render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bh-stack': BhStack;
  }
}
