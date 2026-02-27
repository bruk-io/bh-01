import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { BaseElement } from '../../primitives/base-element.js';
import '../../atoms/icon/bh-icon.js';

/**
 * A wrapper for collapsible accordion items.
 * Set `multiple` to allow more than one item open at a time.
 *
 * @slot - bh-accordion-item elements
 */
@customElement('bh-accordion')
export class BhAccordion extends BaseElement {
  static styles = [
    ...([BaseElement.styles].flat()),
    css`
      :host {
        display: block;
      }
    `,
  ];

  @property({ type: Boolean, reflect: true }) multiple = false;

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('bh-toggle', this._handleItemToggle as EventListener);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('bh-toggle', this._handleItemToggle as EventListener);
  }

  private _handleItemToggle(e: CustomEvent<{ open: boolean; label: string }>) {
    if (this.multiple || !e.detail.open) return;

    // composedPath()[0] is the inner <button> inside the shadow root — walk up to
    // find the bh-accordion-item host element instead.
    const target = e.composedPath().find(
      (el) => (el as Element).tagName === 'BH-ACCORDION-ITEM'
    ) as Element | undefined;

    const items = this.querySelectorAll('bh-accordion-item');
    for (const item of items) {
      if (item !== target && (item as BhAccordionItem).open) {
        (item as BhAccordionItem).open = false;
      }
    }
  }

  render() {
    return html`<slot></slot>`;
  }
}

/**
 * A single collapsible section within a bh-accordion.
 *
 * @slot header - Custom header content (replaces default label text)
 * @slot - Content revealed when open
 *
 * @csspart header - The clickable header row
 * @csspart content - The collapsible content wrapper
 * @csspart chevron - The chevron indicator
 *
 * @cssprop [--bh-accordion-border=var(--bh-color-border)] - Border color
 *
 * @fires bh-toggle - Fired when item is opened or closed. `detail: { open: boolean, label: string }`
 */
@customElement('bh-accordion-item')
export class BhAccordionItem extends BaseElement {
  static styles = [
    ...([BaseElement.styles].flat()),
    css`
      :host {
        display: block;
        border-bottom: var(--bh-border-1) solid var(--bh-accordion-border, var(--bh-color-border));
      }

      .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: var(--bh-spacing-3) var(--bh-spacing-4);
        cursor: pointer;
        user-select: none;
        font-family: var(--bh-font-sans);
        font-size: var(--bh-text-sm);
        color: var(--bh-color-text);
        background: none;
        border: none;
        width: 100%;
        text-align: start;
      }

      .header:hover {
        background: var(--bh-color-surface);
      }

      .header:focus-visible {
        outline: var(--bh-border-2) solid var(--bh-color-ring);
        outline-offset: -2px;
      }

      .chevron {
        display: inline-flex;
        transition: transform var(--bh-transition-fast);
        color: var(--bh-color-text-muted);
        flex-shrink: 0;
      }

      :host([open]) .chevron {
        transform: rotate(90deg);
      }

      .content-wrapper {
        display: grid;
        grid-template-rows: 0fr;
        transition: grid-template-rows var(--bh-transition-fast);
      }

      :host([open]) .content-wrapper {
        grid-template-rows: 1fr;
      }

      .content {
        overflow: hidden;
      }

      .content-inner {
        padding: 0 var(--bh-spacing-4) var(--bh-spacing-3);
      }
    `,
  ];

  @property() label = '';
  @property({ type: Boolean, reflect: true }) open = false;

  render() {
    return html`
      <button
        class="header"
        part="header"
        aria-expanded=${this.open}
        aria-controls="accordion-content"
        @click=${this._toggle}
      >
        <slot name="header">${this.label}</slot>
        <bh-icon class="chevron" part="chevron" name="chevron-right" size="sm" aria-hidden="true"></bh-icon>
      </button>
      <div class="content-wrapper">
        <div id="accordion-content" class="content" part="content">
          <div class="content-inner">
            <slot></slot>
          </div>
        </div>
      </div>
    `;
  }

  private _toggle() {
    this.open = !this.open;
    this.dispatchEvent(
      new CustomEvent('bh-toggle', {
        bubbles: true,
        composed: true,
        detail: { open: this.open, label: this.label },
      })
    );
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bh-accordion': BhAccordion;
    'bh-accordion-item': BhAccordionItem;
  }
}
