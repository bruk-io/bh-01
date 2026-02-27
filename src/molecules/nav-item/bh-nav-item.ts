import { html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { BaseElement } from '../../primitives/base-element.js';

/**
 * A navigation item for sidebars and navbars with icon + label + optional badge.
 * Renders as `<a>` when `href` is provided, `<button>` otherwise.
 *
 * @slot prefix - Icon slot (before label)
 * @slot - Label text
 * @slot suffix - Badge or indicator slot (after label)
 *
 * @csspart item - The inner `<a>` or `<button>` element
 *
 * @cssprop [--bh-nav-item-bg=transparent] - Item background color
 * @cssprop [--bh-nav-item-color=var(--bh-color-text)] - Item text color
 * @cssprop [--bh-nav-item-hover-bg=var(--bh-color-secondary)] - Hover background
 * @cssprop [--bh-nav-item-active-bg=var(--bh-color-secondary)] - Active background
 * @cssprop [--bh-nav-item-active-color=var(--bh-color-primary)] - Active text color
 *
 * @fires bh-click - Fired on click. `detail: { originalEvent: MouseEvent }`
 */
@customElement('bh-nav-item')
export class BhNavItem extends BaseElement {
  static styles = [
    ...([BaseElement.styles].flat()),
    css`
      :host {
        display: block;
      }

      a,
      button {
        display: flex;
        align-items: center;
        gap: var(--bh-spacing-2);
        width: 100%;
        padding: var(--bh-spacing-2) var(--bh-spacing-3);
        border: none;
        border-radius: var(--bh-radius-md);
        background: var(--bh-nav-item-bg, transparent);
        color: var(--bh-nav-item-color, var(--bh-color-text));
        font-family: var(--bh-font-sans);
        font-size: var(--bh-text-base);
        font-weight: var(--bh-font-normal);
        line-height: var(--bh-leading-normal);
        text-decoration: none;
        cursor: pointer;
        transition: background var(--bh-transition-fast),
                    color var(--bh-transition-fast);
      }

      a:hover,
      button:hover {
        background: var(--bh-nav-item-hover-bg, var(--bh-color-secondary));
      }

      a:focus-visible,
      button:focus-visible {
        outline: 2px solid var(--bh-color-ring);
        outline-offset: -2px;
      }

      /* Active */
      :host([active]) a,
      :host([active]) button {
        background: var(--bh-nav-item-active-bg, var(--bh-color-secondary));
        color: var(--bh-nav-item-active-color, var(--bh-color-primary));
        font-weight: var(--bh-font-medium);
      }

      /* Disabled */
      :host([disabled]) a,
      :host([disabled]) button {
        opacity: 0.5;
        cursor: not-allowed;
        pointer-events: none;
      }

      /* Suffix pushed to end */
      .suffix {
        margin-left: auto;
      }
    `,
  ];

  @property({ type: Boolean, reflect: true }) active = false;
  @property({ type: Boolean, reflect: true }) disabled = false;
  @property() href = '';
  @property() target = '';

  render() {
    if (this.href) {
      return html`
        <a
          part="item"
          href=${this.href}
          target=${this.target || nothing}
          aria-current=${this.active ? 'page' : nothing}
          aria-disabled=${this.disabled ? 'true' : nothing}
          @click=${this._handleClick}
        >
          <slot name="prefix"></slot>
          <slot></slot>
          <span class="suffix"><slot name="suffix"></slot></span>
        </a>
      `;
    }

    return html`
      <button
        part="item"
        ?disabled=${this.disabled}
        aria-current=${this.active ? 'page' : nothing}
        @click=${this._handleClick}
      >
        <slot name="prefix"></slot>
        <slot></slot>
        <span class="suffix"><slot name="suffix"></slot></span>
      </button>
    `;
  }

  private _handleClick(e: MouseEvent) {
    if (this.disabled) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
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
    'bh-nav-item': BhNavItem;
  }
}
