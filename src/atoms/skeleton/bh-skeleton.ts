import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { BaseElement } from '../../primitives/base-element.js';

export type SkeletonVariant = 'text' | 'circle' | 'rect';

/**
 * A content placeholder that shows a pulsing animation during loading.
 *
 * @csspart skeleton - The skeleton element
 *
 * @cssprop [--bh-skeleton-color=var(--bh-color-secondary)] - Skeleton base color
 * @cssprop [--bh-skeleton-highlight] - Pulse highlight color
 */
@customElement('bh-skeleton')
export class BhSkeleton extends BaseElement {
  static styles = [
    ...([BaseElement.styles].flat()),
    css`
      :host {
        display: block;
      }

      .skeleton {
        background: var(--bh-skeleton-color, var(--bh-color-secondary));
        animation: pulse 1.5s var(--bh-ease-in-out) infinite;
      }

      /* Text */
      :host([variant='text']) .skeleton,
      .skeleton {
        height: 1em;
        width: 100%;
        border-radius: var(--bh-radius-sm);
      }

      /* Circle */
      :host([variant='circle']) .skeleton {
        border-radius: var(--bh-radius-full);
      }

      /* Rect */
      :host([variant='rect']) .skeleton {
        border-radius: var(--bh-radius-md);
      }

      @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.4; }
      }
    `,
  ];

  @property({ reflect: true }) variant: SkeletonVariant = 'text';
  @property() width = '';
  @property() height = '';

  render() {
    const styles = [
      this.width ? `width: ${this.width}` : '',
      this.height ? `height: ${this.height}` : '',
    ].filter(Boolean).join('; ');

    return html`
      <div
        class="skeleton"
        part="skeleton"
        style=${styles}
        aria-busy="true"
        aria-label="Loading"
      ></div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bh-skeleton': BhSkeleton;
  }
}
