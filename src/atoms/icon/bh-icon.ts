import { html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { unsafeSVG } from 'lit/directives/unsafe-svg.js';
import { BaseElement } from '../../primitives/base-element.js';

export type IconSize = 'sm' | 'md' | 'lg';

const ICON_REGISTRY = new Map<string, string>();

/**
 * An SVG icon component with a static registry for custom icons.
 *
 * Register custom icons via `BhIcon.register(name, svgPaths)`.
 * Ships with built-in icons: x, check, plus, minus, search,
 * chevron-down, chevron-up, chevron-left, chevron-right, menu.
 *
 * @csspart svg - The `<svg>` element
 *
 * @cssprop [--bh-icon-size=1.25em] - Icon width and height
 */
@customElement('bh-icon')
export class BhIcon extends BaseElement {
  static styles = [
    ...([BaseElement.styles].flat()),
    css`
      :host {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: var(--bh-icon-size, 1.25em);
        height: var(--bh-icon-size, 1.25em);
        color: inherit;
        flex-shrink: 0;
      }

      :host([size='sm']) {
        --bh-icon-size: 1rem;
      }

      :host([size='md']) {
        --bh-icon-size: 1.25rem;
      }

      :host([size='lg']) {
        --bh-icon-size: 1.5rem;
      }

      svg {
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

  static register(name: string, svg: string): void {
    ICON_REGISTRY.set(name, svg);
  }

  static getIcon(name: string): string | undefined {
    return ICON_REGISTRY.get(name);
  }

  @property({ reflect: true }) name = '';
  @property({ reflect: true }) size: IconSize = 'md';
  @property() label = '';

  render() {
    const svg = ICON_REGISTRY.get(this.name);
    const ariaHidden = this.label ? nothing : 'true';
    const role = this.label ? 'img' : nothing;

    return html`
      <svg
        part="svg"
        viewBox="0 0 24 24"
        aria-hidden=${ariaHidden}
        role=${role}
        aria-label=${this.label || nothing}
      >
        ${svg ? unsafeSVG(svg) : nothing}
      </svg>
    `;
  }
}

// Built-in icons — minimal set of essentials
BhIcon.register('x', '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>');
BhIcon.register('check', '<path d="M20 6 9 17l-5-5"/>');
BhIcon.register('plus', '<path d="M5 12h14"/><path d="M12 5v14"/>');
BhIcon.register('minus', '<path d="M5 12h14"/>');
BhIcon.register('search', '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>');
BhIcon.register('chevron-down', '<path d="m6 9 6 6 6-6"/>');
BhIcon.register('chevron-up', '<path d="m18 15-6-6-6 6"/>');
BhIcon.register('chevron-left', '<path d="m15 18-6-6 6-6"/>');
BhIcon.register('chevron-right', '<path d="m9 18 6-6-6-6"/>');
BhIcon.register('menu', '<path d="M4 12h16"/><path d="M4 6h16"/><path d="M4 18h16"/>');

declare global {
  interface HTMLElementTagNameMap {
    'bh-icon': BhIcon;
  }
}
