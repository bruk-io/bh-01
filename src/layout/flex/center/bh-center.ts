import { html, css, type PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { BaseElement } from '../../../primitives/base-element.js';
import type { LayoutGap } from '../../layout-types.js';

/**
 * Center content with optional max-width.
 *
 * Centers slotted children horizontally with configurable max-width,
 * gutters, and intrinsic sizing. Purely structural — no visual styling.
 *
 * @slot - Default slot for content
 *
 * @cssprop [--bh-center-max] - Override max-inline-size value
 * @cssprop [--bh-center-gutters] - Override padding-inline value
 */
@customElement('bh-center')
export class BhCenter extends BaseElement {
  static styles = [
    ...([BaseElement.styles].flat()),
    css`
      :host {
        display: flex;
        flex-direction: column;
        align-items: stretch;
        max-inline-size: var(--bh-center-max, none);
        padding-inline: var(--bh-center-gutters, 0);
        margin-inline: auto;
        min-width: 0;
      }

      /* Intrinsic */
      :host([intrinsic]) {
        align-items: center;
      }

      /* Gutters */
      :host([gutters='none']) {
        --bh-center-gutters: 0;
      }

      :host([gutters='xs']) {
        --bh-center-gutters: var(--bh-spacing-1);
      }

      :host([gutters='sm']) {
        --bh-center-gutters: var(--bh-spacing-2);
      }

      :host([gutters='md']) {
        --bh-center-gutters: var(--bh-spacing-4);
      }

      :host([gutters='lg']) {
        --bh-center-gutters: var(--bh-spacing-6);
      }

      :host([gutters='xl']) {
        --bh-center-gutters: var(--bh-spacing-8);
      }

      :host([gutters='2xl']) {
        --bh-center-gutters: var(--bh-spacing-12);
      }
    `,
  ];

  @property({ reflect: true }) max: string = 'none';
  @property({ reflect: true }) gutters: LayoutGap = 'none';
  @property({ type: Boolean, reflect: true }) intrinsic = false;

  protected willUpdate(changed: PropertyValues<this>) {
    if (changed.has('max')) {
      this.style.setProperty('--bh-center-max', this.max);
    }
  }

  render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bh-center': BhCenter;
  }
}
