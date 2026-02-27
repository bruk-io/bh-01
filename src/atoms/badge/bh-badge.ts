import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { BaseElement } from '../../primitives/base-element.js';

export type BadgeVariant = 'default' | 'primary' | 'success' | 'warning' | 'danger';
export type BadgeSize = 'sm' | 'md';

/**
 * A pill-shaped badge for status indicators and counts.
 *
 * @slot - Badge content (text or number)
 *
 * @csspart badge - The inner `<span>` element
 *
 * @cssprop [--bh-badge-bg] - Badge background color
 * @cssprop [--bh-badge-color] - Badge text color
 */
@customElement('bh-badge')
export class BhBadge extends BaseElement {
  static styles = [
    ...([BaseElement.styles].flat()),
    css`
      :host {
        display: inline-flex;
      }

      span {
        display: inline-flex;
        align-items: center;
        font-family: var(--bh-font-sans);
        font-weight: var(--bh-font-medium);
        line-height: var(--bh-leading-none);
        border-radius: var(--bh-radius-full);
        white-space: nowrap;
        background: var(--bh-badge-bg);
        color: var(--bh-badge-color);
      }

      /* Sizes */
      :host([size='sm']) span {
        font-size: var(--bh-text-xs);
        padding: var(--bh-spacing-0-5) var(--bh-spacing-2);
      }

      span,
      :host([size='md']) span {
        font-size: var(--bh-text-sm);
        padding: var(--bh-spacing-1) var(--bh-spacing-2-5);
      }

      /* Default */
      span,
      :host([variant='default']) span {
        --bh-badge-bg: var(--bh-color-secondary);
        --bh-badge-color: var(--bh-color-secondary-text);
      }

      /* Primary */
      :host([variant='primary']) span {
        --bh-badge-bg: var(--bh-color-primary);
        --bh-badge-color: var(--bh-color-primary-text);
      }

      /* Success */
      :host([variant='success']) span {
        --bh-badge-bg: var(--bh-color-success);
        --bh-badge-color: var(--bh-color-text-inverse);
      }

      /* Warning */
      :host([variant='warning']) span {
        --bh-badge-bg: var(--bh-color-warning);
        --bh-badge-color: var(--bh-color-text);
      }

      /* Danger */
      :host([variant='danger']) span {
        --bh-badge-bg: var(--bh-color-danger);
        --bh-badge-color: var(--bh-color-danger-text);
      }
    `,
  ];

  @property({ reflect: true }) variant: BadgeVariant = 'default';
  @property({ reflect: true }) size: BadgeSize = 'md';

  render() {
    return html`<span part="badge"><slot></slot></span>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bh-badge': BhBadge;
  }
}
