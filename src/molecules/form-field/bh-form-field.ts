import { html, css, nothing } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { BaseElement } from '../../primitives/base-element.js';

let nextId = 0;

/**
 * Wraps any form atom with a label, help text, and error message.
 * Handles ARIA linking across Shadow DOM boundaries.
 *
 * @slot - The form control (e.g. `<bh-input>`, `<bh-select>`)
 *
 * @csspart field - The outer wrapper
 * @csspart label - The label element
 * @csspart help-text - The help text element
 * @csspart error - The error message element
 *
 * @cssprop [--bh-form-field-gap=var(--bh-spacing-1-5)] - Gap between label, control, and messages
 * @cssprop [--bh-form-field-label-color=var(--bh-color-text)] - Label text color
 * @cssprop [--bh-form-field-error-color=var(--bh-color-danger)] - Error text color
 */
@customElement('bh-form-field')
export class BhFormField extends BaseElement {
  static styles = [
    ...([BaseElement.styles].flat()),
    css`
      :host {
        display: block;
      }

      .field {
        display: flex;
        flex-direction: column;
        gap: var(--bh-form-field-gap, var(--bh-spacing-1-5));
      }

      label {
        font-family: var(--bh-font-sans);
        font-size: var(--bh-text-sm);
        font-weight: var(--bh-font-medium);
        line-height: var(--bh-leading-normal);
        color: var(--bh-form-field-label-color, var(--bh-color-text));
      }

      .required-marker {
        color: var(--bh-form-field-error-color, var(--bh-color-danger));
        margin-left: var(--bh-spacing-0-5);
      }

      .help-text {
        font-family: var(--bh-font-sans);
        font-size: var(--bh-text-sm);
        line-height: var(--bh-leading-normal);
        color: var(--bh-color-text-muted);
      }

      .error {
        font-family: var(--bh-font-sans);
        font-size: var(--bh-text-sm);
        line-height: var(--bh-leading-normal);
        color: var(--bh-form-field-error-color, var(--bh-color-danger));
      }
    `,
  ];

  @property() label = '';
  @property({ attribute: 'help-text' }) helpText = '';
  @property() error = '';
  @property({ type: Boolean }) required = false;

  @query('slot:not([name])') private _defaultSlot!: HTMLSlotElement;

  private _uniqueId = `bh-ff-${++nextId}`;

  render() {
    const labelId = `${this._uniqueId}-label`;
    const helpId = `${this._uniqueId}-help`;
    const errorId = `${this._uniqueId}-error`;

    return html`
      <div class="field" part="field">
        ${this.label
          ? html`<label id=${labelId} part="label">
              ${this.label}${this.required ? html`<span class="required-marker" aria-hidden="true">*</span>` : nothing}
            </label>`
          : nothing}
        <slot @slotchange=${this._onSlotChange}></slot>
        ${this.helpText && !this.error
          ? html`<div id=${helpId} class="help-text" part="help-text">${this.helpText}</div>`
          : nothing}
        ${this.error
          ? html`<div id=${errorId} class="error" part="error" role="alert">${this.error}</div>`
          : nothing}
      </div>
    `;
  }

  updated() {
    this._linkAria();
  }

  private _onSlotChange() {
    this._linkAria();
  }

  private _linkAria() {
    if (!this._defaultSlot) return;

    const assigned = this._defaultSlot.assignedElements({ flatten: true });
    if (assigned.length === 0) return;

    const control = assigned[0] as HTMLElement;

    const labelId = `${this._uniqueId}-label`;
    const helpId = `${this._uniqueId}-help`;
    const errorId = `${this._uniqueId}-error`;

    // aria-labelledby
    if (this.label) {
      control.setAttribute('aria-labelledby', labelId);
    } else {
      control.removeAttribute('aria-labelledby');
    }

    // aria-describedby
    if (this.error) {
      control.setAttribute('aria-describedby', errorId);
    } else if (this.helpText) {
      control.setAttribute('aria-describedby', helpId);
    } else {
      control.removeAttribute('aria-describedby');
    }

    // aria-invalid
    if (this.error) {
      control.setAttribute('aria-invalid', 'true');
    } else {
      control.removeAttribute('aria-invalid');
    }

    // aria-required
    if (this.required) {
      control.setAttribute('aria-required', 'true');
    } else {
      control.removeAttribute('aria-required');
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bh-form-field': BhFormField;
  }
}
