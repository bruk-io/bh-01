import { html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { BaseElement } from '../../primitives/base-element.js';

export type TextVariant = 'body' | 'heading' | 'small' | 'code';

/**
 * A text component for consistent typography across variants.
 *
 * @slot - Text content
 *
 * @csspart text - The inner `<span>` element
 */
@customElement('bh-text')
export class BhText extends BaseElement {
  static styles = [
    ...([BaseElement.styles].flat()),
    css`
      :host {
        display: block;
        color: var(--bh-color-text);
        font-family: var(--bh-font-sans);
      }

      /* Body (default) */
      :host,
      :host([variant='body']) {
        font-size: var(--bh-body-size);
        font-weight: var(--bh-body-weight);
        line-height: var(--bh-body-leading);
      }

      /* Heading */
      :host([variant='heading']) {
        font-size: var(--bh-heading-size);
        font-weight: var(--bh-heading-weight);
        line-height: var(--bh-heading-leading);
      }

      /* Small */
      :host([variant='small']) {
        font-size: var(--bh-small-size);
        font-weight: var(--bh-small-weight);
        line-height: var(--bh-small-leading);
        color: var(--bh-color-text-muted);
      }

      /* Code */
      :host([variant='code']) {
        font-family: var(--bh-font-mono);
        font-size: var(--bh-text-sm);
        line-height: var(--bh-leading-relaxed);
      }

      /* Truncation */
      :host([truncate]) {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      span {
        display: contents;
      }
    `,
  ];

  @property({ reflect: true }) variant: TextVariant = 'body';
  @property({ type: Boolean, reflect: true }) truncate = false;

  render() {
    const role = this.variant === 'heading' ? 'heading' : nothing;
    const ariaLevel = this.variant === 'heading' ? '2' : nothing;

    return html`
      <span
        part="text"
        role=${role}
        aria-level=${ariaLevel}
      >
        <slot></slot>
      </span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bh-text': BhText;
  }
}
