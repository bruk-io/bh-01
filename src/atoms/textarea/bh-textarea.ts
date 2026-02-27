import { html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { live } from 'lit/directives/live.js';
import { BaseElement } from '../../primitives/base-element.js';

export type TextareaSize = 'sm' | 'md' | 'lg';
export type TextareaResize = 'none' | 'vertical' | 'horizontal' | 'both';

/**
 * A multi-line text input for longer-form content like comments,
 * descriptions, and messages.
 *
 * @csspart wrapper - The outer container with border and background
 * @csspart textarea - The native `<textarea>` element
 *
 * @cssprop [--bh-textarea-bg=var(--bh-color-surface-raised)] - Textarea background
 * @cssprop [--bh-textarea-color=var(--bh-color-text)] - Textarea text color
 * @cssprop [--bh-textarea-border=var(--bh-color-border)] - Textarea border color
 * @cssprop [--bh-textarea-radius=var(--bh-radius-md)] - Textarea border radius
 *
 * @fires bh-input - Fired on each keystroke. `detail: { value: string }`
 * @fires bh-change - Fired on blur/commit. `detail: { value: string }`
 */
@customElement('bh-textarea')
export class BhTextarea extends BaseElement {
  static styles = [
    ...([BaseElement.styles].flat()),
    css`
      :host {
        display: block;
      }

      .wrapper {
        display: flex;
        width: 100%;
        background: var(--bh-textarea-bg, var(--bh-color-surface-raised));
        border: var(--bh-border-1) solid var(--bh-textarea-border, var(--bh-color-border));
        border-radius: var(--bh-textarea-radius, var(--bh-radius-md));
        box-shadow: var(--bh-shadow-inset);
        transition: all var(--bh-transition-fast);
      }

      textarea {
        flex: 1;
        min-width: 0;
        font-family: var(--bh-font-sans);
        line-height: var(--bh-leading-normal);
        color: var(--bh-textarea-color, var(--bh-color-text));
        background: transparent;
        border: none;
        outline: none;
        resize: vertical;
      }

      textarea::placeholder {
        color: var(--bh-color-text-muted);
      }

      /* Resize */
      :host([resize='none']) textarea { resize: none; }
      :host([resize='vertical']) textarea { resize: vertical; }
      :host([resize='horizontal']) textarea { resize: horizontal; }
      :host([resize='both']) textarea { resize: both; }

      /* Sizes */
      :host([size='sm']) .wrapper {
        font-size: var(--bh-text-sm);
        padding: var(--bh-spacing-1-5) var(--bh-spacing-3);
      }

      .wrapper,
      :host([size='md']) .wrapper {
        font-size: var(--bh-text-base);
        padding: var(--bh-spacing-2) var(--bh-spacing-4);
      }

      :host([size='lg']) .wrapper {
        font-size: var(--bh-text-lg);
        padding: var(--bh-spacing-2-5) var(--bh-spacing-6);
      }

      textarea {
        font-size: inherit;
      }

      /* Focus */
      .wrapper:focus-within {
        border-color: var(--bh-color-ring);
        box-shadow: 0 0 0 1px var(--bh-color-ring);
      }

      /* Error */
      :host([error]) .wrapper {
        border-color: var(--bh-color-danger);
      }

      :host([error]) .wrapper:focus-within {
        border-color: var(--bh-color-danger);
        box-shadow: 0 0 0 1px var(--bh-color-danger);
      }

      /* Disabled */
      :host([disabled]) .wrapper {
        opacity: 0.5;
        cursor: not-allowed;
      }

      :host([disabled]) textarea {
        cursor: not-allowed;
      }

      /* Readonly */
      :host([readonly]) .wrapper {
        background: var(--bh-color-surface);
      }
    `,
  ];

  @property({ reflect: true }) size: TextareaSize = 'md';
  @property() value = '';
  @property() placeholder = '';
  @property() name = '';
  @property() label = '';
  @property({ type: Number }) rows = 3;
  @property({ reflect: true }) resize: TextareaResize = 'vertical';
  @property({ type: Boolean, reflect: true }) disabled = false;
  @property({ type: Boolean, reflect: true }) readonly = false;
  @property({ type: Boolean, reflect: true }) required = false;
  @property({ type: Boolean, reflect: true }) error = false;

  render() {
    return html`
      <div class="wrapper" part="wrapper">
        <textarea
          part="textarea"
          .value=${live(this.value)}
          placeholder=${this.placeholder || nothing}
          name=${this.name || nothing}
          aria-label=${this.label || nothing}
          rows=${this.rows}
          ?disabled=${this.disabled}
          ?readonly=${this.readonly}
          ?required=${this.required}
          aria-invalid=${this.error ? 'true' : nothing}
          @input=${this._handleInput}
          @change=${this._handleChange}
        ></textarea>
      </div>
    `;
  }

  private _handleInput(e: InputEvent) {
    const textarea = e.target as HTMLTextAreaElement;
    this.value = textarea.value;
    this.dispatchEvent(
      new CustomEvent('bh-input', {
        bubbles: true,
        composed: true,
        detail: { value: this.value },
      })
    );
  }

  private _handleChange(e: Event) {
    const textarea = e.target as HTMLTextAreaElement;
    this.value = textarea.value;
    this.dispatchEvent(
      new CustomEvent('bh-change', {
        bubbles: true,
        composed: true,
        detail: { value: this.value },
      })
    );
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bh-textarea': BhTextarea;
  }
}
