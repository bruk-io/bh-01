import { html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { BaseElement } from '../../primitives/base-element.js';

export type LinkVariant = 'default' | 'muted' | 'accent';

/**
 * A styled anchor element with variant support and optional external indicator.
 *
 * @slot - Link text content
 *
 * @csspart link - The `<a>` element
 *
 * @cssprop [--bh-link-color=var(--bh-color-link)] - Link text color
 *
 * @fires bh-click - Fired on click. `detail: { originalEvent: MouseEvent }`
 */
@customElement('bh-link')
export class BhLink extends BaseElement {
  static styles = [
    ...([BaseElement.styles].flat()),
    css`
      :host {
        display: inline;
      }

      a {
        color: var(--bh-link-color, var(--bh-color-link));
        font-family: inherit;
        font-size: inherit;
        line-height: inherit;
        text-decoration: underline;
        text-decoration-color: transparent;
        text-underline-offset: 0.15em;
        transition: all var(--bh-transition-fast);
        cursor: pointer;
      }

      a:hover {
        color: var(--bh-color-link-hover);
        text-decoration-color: currentColor;
      }

      a:focus-visible {
        outline: 2px solid var(--bh-color-ring);
        outline-offset: 2px;
        border-radius: var(--bh-radius-sm);
      }

      /* Variants */
      :host([variant='muted']) a {
        --bh-link-color: var(--bh-color-link-subtle);
      }

      :host([variant='muted']) a:hover {
        color: var(--bh-color-link-subtle-hover);
      }

      :host([variant='accent']) a {
        --bh-link-color: var(--bh-color-primary);
        font-weight: var(--bh-font-medium);
      }

      /* External icon */
      .external-icon {
        display: inline-block;
        width: 0.75em;
        height: 0.75em;
        margin-left: 0.2em;
        vertical-align: baseline;
      }

      .external-icon svg {
        width: 100%;
        height: 100%;
        fill: none;
        stroke: currentColor;
        stroke-width: 2;
        stroke-linecap: round;
        stroke-linejoin: round;
      }
    `,
  ];

  @property() href = '';
  @property() target = '';
  @property({ reflect: true }) variant: LinkVariant = 'default';
  @property({ type: Boolean }) external = false;

  render() {
    const target = this.external ? '_blank' : this.target;
    const rel = this.external ? 'noopener noreferrer' : undefined;

    return html`
      <a
        part="link"
        href=${this.href || nothing}
        target=${target || nothing}
        rel=${rel || nothing}
        @click=${this._handleClick}
      >
        <slot></slot>${this.external ? html`<span class="external-icon"><svg viewBox="0 0 16 16"><path d="M6 3h7v7"/><path d="M13 3L6.5 9.5"/></svg></span>` : nothing}
      </a>
    `;
  }
  private _handleClick(e: MouseEvent) {
    this.dispatchEvent(
      new CustomEvent('bh-click', {
        bubbles: true,
        composed: true,
        detail: { originalEvent: e },
      })
    );
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bh-link': BhLink;
  }
}
