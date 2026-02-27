import { html, css, type PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { BaseElement } from '../../../primitives/base-element.js';
import type { LayoutGap } from '../../layout-types.js';

/**
 * Columns that collapse below a threshold.
 *
 * Uses CSS Grid auto-fit to switch between multi-column and single-column
 * layouts based on available width. Purely structural — no visual styling.
 *
 * @slot - Default slot for content
 *
 * @cssprop [--bh-switcher-gap] - Override gap value
 * @cssprop [--bh-switcher-threshold] - Override threshold value
 */
@customElement('bh-switcher')
export class BhSwitcher extends BaseElement {
  static styles = [
    ...([BaseElement.styles].flat()),
    css`
      :host {
        display: grid;
        gap: var(--bh-switcher-gap, var(--bh-spacing-4));
      }

      /* Gap */
      :host([gap='none']) {
        --bh-switcher-gap: 0;
      }

      :host([gap='xs']) {
        --bh-switcher-gap: var(--bh-spacing-1);
      }

      :host([gap='sm']) {
        --bh-switcher-gap: var(--bh-spacing-2);
      }

      :host([gap='md']) {
        --bh-switcher-gap: var(--bh-spacing-4);
      }

      :host([gap='lg']) {
        --bh-switcher-gap: var(--bh-spacing-6);
      }

      :host([gap='xl']) {
        --bh-switcher-gap: var(--bh-spacing-8);
      }

      :host([gap='2xl']) {
        --bh-switcher-gap: var(--bh-spacing-12);
      }
    `,
  ];

  @property({ reflect: true }) gap: LayoutGap = 'md';
  @property({ reflect: true }) threshold = '30rem';
  @property({ type: Number, reflect: true }) limit = 4;

  protected willUpdate(changed: PropertyValues<this>) {
    if (changed.has('threshold') || changed.has('limit')) {
      this.style.setProperty('--bh-switcher-threshold', this.threshold);
      // auto-fit collapses columns when container is narrow (no overflow).
      // The column minimum is the LARGER of threshold and 100%/limit —
      // this caps auto-fit at `limit` columns on wide containers.
      const limitMin = `calc(100% / ${this.limit})`;
      const threshold = `var(--bh-switcher-threshold, 30rem)`;
      this.style.gridTemplateColumns = `repeat(auto-fit, minmax(min(100%, max(${threshold}, ${limitMin})), 1fr))`;
    }
  }

  render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bh-switcher': BhSwitcher;
  }
}
