import { html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { BaseElement } from '../../primitives/base-element.js';

export type SpinnerSize = 'sm' | 'md' | 'lg';

/**
 * A CSS-animated loading spinner. Inherits color from its parent.
 *
 * @csspart spinner - The `<svg>` element
 */
@customElement('bh-spinner')
export class BhSpinner extends BaseElement {
  static styles = [
    ...([BaseElement.styles].flat()),
    css`
      :host {
        display: inline-flex;
        align-items: center;
        justify-content: center;
      }

      svg {
        animation: spin 0.75s linear infinite;
        color: currentColor;
      }

      :host([size='sm']) svg {
        width: 1rem;
        height: 1rem;
      }

      svg,
      :host([size='md']) svg {
        width: 1.25rem;
        height: 1.25rem;
      }

      :host([size='lg']) svg {
        width: 1.5rem;
        height: 1.5rem;
      }

      circle {
        opacity: 0.25;
      }

      path {
        opacity: 0.75;
      }

      @keyframes spin {
        to {
          transform: rotate(360deg);
        }
      }
    `,
  ];

  @property({ reflect: true }) size: SpinnerSize = 'md';
  @property() label = 'Loading';

  render() {
    return html`
      <svg
        part="spinner"
        viewBox="0 0 24 24"
        fill="none"
        role="status"
        aria-label=${this.label || nothing}
      >
        <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
        ></path>
      </svg>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bh-spinner': BhSpinner;
  }
}
