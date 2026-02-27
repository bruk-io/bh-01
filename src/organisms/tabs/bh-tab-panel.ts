import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { BaseElement } from '../../primitives/base-element.js';

/**
 * Content panel associated with a tab. Hidden when not active.
 *
 * @slot - Panel content
 */
@customElement('bh-tab-panel')
export class BhTabPanel extends BaseElement {
  static styles = [
    ...([BaseElement.styles].flat()),
    css`
      :host {
        display: none;
        height: 100%;
        overflow: auto;
      }

      :host([active]) {
        display: block;
      }
    `,
  ];

  @property({ attribute: 'tab-id' }) tabId = '';
  @property({ type: Boolean, reflect: true }) active = false;

  connectedCallback() {
    super.connectedCallback();
    if (!this.hasAttribute('role')) this.setAttribute('role', 'tabpanel');
    if (!this.hasAttribute('tabindex')) this.setAttribute('tabindex', '0');
  }

  render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bh-tab-panel': BhTabPanel;
  }
}
