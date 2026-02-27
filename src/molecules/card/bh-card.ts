import { html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { BaseElement } from '../../primitives/base-element.js';

export type CardVariant = 'default' | 'outlined' | 'flat';
export type CardPadding = 'none' | 'sm' | 'md' | 'lg';

/**
 * An elevated surface container with optional header and footer.
 *
 * @slot - Card body content
 * @slot header - Content rendered in the start (left) of the card header
 * @slot header-actions - Content rendered in the end (right) of the card header
 * @slot footer - Content rendered in the card footer area
 *
 * @csspart card - The outer card container
 * @csspart header - The header wrapper (only rendered when header or header-actions has content)
 * @csspart body - The body wrapper
 * @csspart footer - The footer wrapper (only rendered when slot has content)
 *
 * @cssprop [--bh-card-bg=var(--bh-color-surface-raised)] - Card background color
 * @cssprop [--bh-card-border=var(--bh-color-border)] - Card border color
 * @cssprop [--bh-card-radius=var(--bh-radius-lg)] - Card border radius
 * @cssprop [--bh-card-shadow=var(--bh-shadow-md)] - Card box shadow
 * @cssprop [--bh-card-accent-color=var(--bh-color-border)] - Corner accent color
 * @cssprop [--bh-card-accent-hover-color=var(--bh-color-primary)] - Corner accent hover color
 * @cssprop [--bh-card-accent-glow=var(--bh-color-primary-glow)] - Corner accent glow color on hover
 */
@customElement('bh-card')
export class BhCard extends BaseElement {
  static styles = [
    ...([BaseElement.styles].flat()),
    css`
      :host {
        display: block;
      }

      .card {
        position: relative;
        background: var(--bh-card-bg, var(--bh-color-surface-raised));
        border-radius: var(--bh-card-radius, var(--bh-radius-lg));
        overflow: hidden;
      }

      /* Corner accents */
      :host([corner-accents]) .card::before,
      :host([corner-accents]) .card::after {
        content: '';
        position: absolute;
        width: 12px;
        height: 12px;
        border-color: var(--bh-card-accent-color, var(--bh-color-border));
        border-style: solid;
        border-width: 0;
        transition: border-color 0.2s, box-shadow 0.2s;
        pointer-events: none;
        z-index: 1;
      }

      :host([corner-accents]) .card::before {
        top: 0;
        left: 0;
        border-top-width: 2px;
        border-left-width: 2px;
        border-top-left-radius: var(--bh-card-radius, var(--bh-radius-lg));
      }

      :host([corner-accents]) .card::after {
        bottom: 0;
        right: 0;
        border-bottom-width: 2px;
        border-right-width: 2px;
        border-bottom-right-radius: var(--bh-card-radius, var(--bh-radius-lg));
      }

      :host([corner-accents]) .card:hover::before,
      :host([corner-accents]) .card:hover::after {
        border-color: var(--bh-card-accent-hover-color, var(--bh-color-primary));
        box-shadow: 0 0 6px var(--bh-card-accent-glow, var(--bh-color-primary-glow));
      }

      /* Default — shadow, no border */
      .card,
      :host([variant='default']) .card {
        box-shadow: var(--bh-card-shadow, var(--bh-shadow-md));
        border: var(--bh-border-1) solid transparent;
      }

      /* Outlined — border, no shadow */
      :host([variant='outlined']) .card {
        border: var(--bh-border-1) solid var(--bh-card-border, var(--bh-color-border));
        box-shadow: none;
      }

      /* Flat — no border, no shadow */
      :host([variant='flat']) .card {
        border: var(--bh-border-1) solid transparent;
        box-shadow: none;
      }

      /* Padding */
      .body {
        padding: var(--bh-spacing-4);
      }

      :host([padding='none']) .body {
        padding: 0;
      }

      :host([padding='sm']) .body {
        padding: var(--bh-spacing-2);
      }

      :host([padding='md']) .body {
        padding: var(--bh-spacing-4);
      }

      :host([padding='lg']) .body {
        padding: var(--bh-spacing-6);
      }

      /* Header */
      .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: var(--bh-spacing-2);
        padding: var(--bh-spacing-4);
        border-bottom: var(--bh-border-1) solid var(--bh-color-border);
      }

      :host([padding='sm']) .header {
        padding: var(--bh-spacing-2);
      }

      :host([padding='lg']) .header {
        padding: var(--bh-spacing-6);
      }

      :host([padding='none']) .header {
        padding: var(--bh-spacing-4);
      }

      .header-start {
        display: flex;
        align-items: center;
        gap: var(--bh-spacing-2);
        min-width: 0;
      }

      .header-end {
        display: flex;
        align-items: center;
        gap: var(--bh-spacing-2);
        flex-shrink: 0;
      }

      /* Footer */
      .footer {
        padding: var(--bh-spacing-4);
        border-top: var(--bh-border-1) solid var(--bh-color-border);
      }

      :host([padding='sm']) .footer {
        padding: var(--bh-spacing-2);
      }

      :host([padding='lg']) .footer {
        padding: var(--bh-spacing-6);
      }

      :host([padding='none']) .footer {
        padding: var(--bh-spacing-4);
      }
    `,
  ];

  @property({ reflect: true }) variant: CardVariant = 'default';
  @property({ reflect: true }) padding: CardPadding = 'md';
  @property({ type: Boolean, reflect: true, attribute: 'corner-accents' }) cornerAccents = false;

  @state() private _hasHeader = false;
  @state() private _hasHeaderActions = false;
  @state() private _hasFooter = false;

  private get _showHeader() {
    return this._hasHeader || this._hasHeaderActions;
  }

  render() {
    return html`
      <div class="card" part="card">
        ${this._showHeader
          ? html`<div class="header" part="header">
              <div class="header-start"><slot name="header" @slotchange=${this._onHeaderSlotChange}></slot></div>
              <div class="header-end"><slot name="header-actions" @slotchange=${this._onHeaderActionsSlotChange}></slot></div>
            </div>`
          : html`<slot name="header" @slotchange=${this._onHeaderSlotChange}></slot>
                 <slot name="header-actions" @slotchange=${this._onHeaderActionsSlotChange}></slot>`}
        <div class="body" part="body">
          <slot></slot>
        </div>
        ${this._hasFooter
          ? html`<div class="footer" part="footer"><slot name="footer" @slotchange=${this._onFooterSlotChange}></slot></div>`
          : html`<slot name="footer" @slotchange=${this._onFooterSlotChange}></slot>`}
      </div>
    `;
  }

  private _onHeaderSlotChange(e: Event) {
    const slot = e.target as HTMLSlotElement;
    this._hasHeader = slot.assignedNodes({ flatten: true }).length > 0;
  }

  private _onHeaderActionsSlotChange(e: Event) {
    const slot = e.target as HTMLSlotElement;
    this._hasHeaderActions = slot.assignedNodes({ flatten: true }).length > 0;
  }

  private _onFooterSlotChange(e: Event) {
    const slot = e.target as HTMLSlotElement;
    this._hasFooter = slot.assignedNodes({ flatten: true }).length > 0;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bh-card': BhCard;
  }
}
