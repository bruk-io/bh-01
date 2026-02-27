import { html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { BaseElement } from '../../primitives/base-element.js';

/**
 * A toggle switch for binary on/off settings. Unlike checkbox, a switch
 * implies an immediate effect rather than a form submission.
 *
 * @slot - Label text displayed next to the switch
 *
 * @csspart track - The switch track/rail
 * @csspart thumb - The sliding thumb indicator
 * @csspart label - The label text container
 *
 * @cssprop [--bh-switch-width=2.5rem] - Switch track width
 * @cssprop [--bh-switch-height=1.5rem] - Switch track height
 *
 * @fires bh-change - Fired when toggled. `detail: { checked: boolean }`
 */
@customElement('bh-switch')
export class BhSwitch extends BaseElement {
  static styles = [
    ...([BaseElement.styles].flat()),
    css`
      :host {
        display: inline-flex;
        align-items: center;
        gap: var(--bh-spacing-2);
        cursor: pointer;
      }

      :host([disabled]) {
        opacity: 0.5;
        cursor: not-allowed;
      }

      input {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border-width: 0;
      }

      .track {
        position: relative;
        width: var(--bh-switch-width, 2.5rem);
        height: var(--bh-switch-height, 1.5rem);
        border-radius: var(--bh-radius-full);
        background: var(--bh-color-secondary);
        transition: all var(--bh-transition-fast);
        flex-shrink: 0;
      }

      .thumb {
        position: absolute;
        top: 2px;
        left: 2px;
        width: calc(var(--bh-switch-height, 1.5rem) - 4px);
        height: calc(var(--bh-switch-height, 1.5rem) - 4px);
        border-radius: var(--bh-radius-full);
        background: var(--bh-color-white);
        box-shadow: var(--bh-shadow-sm);
        transition: all var(--bh-transition-fast);
      }

      /* Checked */
      :host([checked]) .track {
        background: var(--bh-color-primary);
      }

      :host([checked]) .thumb {
        transform: translateX(calc(var(--bh-switch-width, 2.5rem) - var(--bh-switch-height, 1.5rem)));
      }

      /* Focus */
      input:focus-visible ~ .track {
        outline: 2px solid var(--bh-color-ring);
        outline-offset: 2px;
      }

      /* Label */
      .label {
        font-family: var(--bh-font-sans);
        font-size: var(--bh-text-base);
        line-height: var(--bh-leading-normal);
        color: var(--bh-color-text);
        user-select: none;
      }
    `,
  ];

  @property({ type: Boolean, reflect: true }) checked = false;
  @property({ type: Boolean, reflect: true }) disabled = false;
  @property() label = '';

  render() {
    return html`
      <label>
        <input
          type="checkbox"
          role="switch"
          .checked=${this.checked}
          ?disabled=${this.disabled}
          aria-checked=${this.checked ? 'true' : 'false'}
          aria-label=${this.label || nothing}
          @change=${this._handleChange}
        />
        <span class="track" part="track">
          <span class="thumb" part="thumb"></span>
        </span>
        <span class="label" part="label"><slot>${this.label}</slot></span>
      </label>
    `;
  }

  private _handleChange(e: Event) {
    const input = e.target as HTMLInputElement;
    this.checked = input.checked;
    this.dispatchEvent(
      new CustomEvent('bh-change', {
        bubbles: true,
        composed: true,
        detail: { checked: this.checked },
      })
    );
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bh-switch': BhSwitch;
  }
}
