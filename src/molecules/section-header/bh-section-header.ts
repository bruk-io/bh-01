import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { BaseElement } from '../../primitives/base-element.js';
import '../../atoms/badge/bh-badge.js';
import '../../atoms/divider/bh-divider.js';

/**
 * A section title with optional count badge and horizontal rule filling remaining space.
 *
 * @slot - Custom title content (overrides `heading` prop)
 * @slot badge - Custom badge content (overrides count display)
 * @slot end - Trailing content after the line
 *
 * @csspart header - The outer flex container
 * @csspart title - The title text
 * @csspart badge - The badge wrapper
 * @csspart line - The horizontal rule
 *
 * @cssprop [--bh-section-header-color=var(--bh-color-text-muted)] - Title text color
 * @cssprop [--bh-section-header-size=var(--bh-text-xs)] - Title font size
 * @cssprop [--bh-section-header-tracking=var(--bh-tracking-widest)] - Title letter-spacing
 * @cssprop [--bh-section-header-line-color=var(--bh-color-border-muted)] - Line color
 */
@customElement('bh-section-header')
export class BhSectionHeader extends BaseElement {
  static styles = [
    ...([BaseElement.styles].flat()),
    css`
      :host {
        display: block;
      }

      .header {
        display: flex;
        align-items: center;
        gap: var(--bh-spacing-2);
      }

      .title {
        font-family: var(--bh-font-mono);
        font-size: var(--bh-section-header-size, var(--bh-text-xs));
        font-weight: var(--bh-font-semibold);
        letter-spacing: var(--bh-section-header-tracking, var(--bh-tracking-widest));
        text-transform: uppercase;
        color: var(--bh-section-header-color, var(--bh-color-text-muted));
        white-space: nowrap;
      }

      bh-divider {
        flex: 1;
        padding: 0;
        --bh-divider-color: var(--bh-section-header-line-color, var(--bh-color-border-muted));
      }
    `,
  ];

  @property() heading = '';
  @property({ type: Number }) count?: number;

  render() {
    const hasCount = this.count !== undefined;

    return html`
      <div class="header" part="header">
        <span class="title" part="title" role="heading" aria-level="3">
          <slot>${this.heading}</slot>
        </span>
        ${hasCount
          ? html`<span part="badge"><slot name="badge"><bh-badge size="sm" variant="primary">${this.count}</bh-badge></slot></span>`
          : html`<slot name="badge"></slot>`}
        <bh-divider part="line"></bh-divider>
        <slot name="end"></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bh-section-header': BhSectionHeader;
  }
}
