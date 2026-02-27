import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { BaseElement } from '../../primitives/base-element.js';

export type DividerSpacing = 'sm' | 'md' | 'lg';

/**
 * An industrial horizontal (or vertical) rule with an embossed 3D look.
 *
 * @csspart divider - The rule element
 *
 * @cssprop [--bh-divider-color] - Divider line color
 * @cssprop [--bh-divider-shadow] - Divider shadow (defaults to emboss)
 * @cssprop [--bh-divider-gradient] - Custom gradient value when `gradient` attribute is set
 */
@customElement('bh-divider')
export class BhDivider extends BaseElement {
  static styles = [
    ...([BaseElement.styles].flat()),
    css`
      :host {
        display: block;
      }

      hr {
        border: none;
        height: 1px;
        background: var(--bh-divider-color, var(--bh-color-border-muted));
        box-shadow: var(--bh-divider-shadow, var(--bh-shadow-emboss));
        margin: 0;
      }

      /* Spacing */
      :host([spacing='sm']) {
        padding: var(--bh-spacing-2) 0;
      }

      :host,
      :host([spacing='md']) {
        padding: var(--bh-spacing-4) 0;
      }

      :host([spacing='lg']) {
        padding: var(--bh-spacing-8) 0;
      }

      /* Vertical */
      :host([vertical]) {
        display: inline-block;
        height: 100%;
        padding: 0;
      }

      :host([vertical]) hr {
        display: none;
      }

      .vertical {
        display: none;
        width: 1px;
        height: 100%;
        background: var(--bh-divider-color, var(--bh-color-border-muted));
        box-shadow: var(--bh-divider-shadow, var(--bh-shadow-emboss));
      }

      :host([vertical]) .vertical {
        display: block;
      }

      :host([vertical][spacing='sm']) {
        padding: 0 var(--bh-spacing-2);
      }

      :host([vertical][spacing='md']),
      :host([vertical]) {
        padding: 0 var(--bh-spacing-4);
      }

      :host([vertical][spacing='lg']) {
        padding: 0 var(--bh-spacing-8);
      }

      /* Gradient mode */
      :host([gradient]) hr {
        height: 2px;
        background: var(
          --bh-divider-gradient,
          linear-gradient(to right, var(--bh-color-primary), var(--bh-color-border-muted) 40%, transparent)
        );
        box-shadow: none;
      }

      :host([gradient][vertical]) .vertical {
        width: 2px;
        background: var(
          --bh-divider-gradient,
          linear-gradient(to bottom, var(--bh-color-primary), var(--bh-color-border-muted) 40%, transparent)
        );
        box-shadow: none;
      }
    `,
  ];

  @property({ type: Boolean, reflect: true }) vertical = false;
  @property({ reflect: true }) spacing: DividerSpacing = 'md';
  @property({ type: Boolean, reflect: true }) gradient = false;

  render() {
    return html`
      <hr part="divider" aria-hidden="true" />
      <div class="vertical" part="divider" aria-hidden="true"></div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bh-divider': BhDivider;
  }
}
