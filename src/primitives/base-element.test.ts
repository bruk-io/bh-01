import { html, css, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { fixture, expect } from '@open-wc/testing';
import { BaseElement } from './base-element.js';

@customElement('test-base-element')
class TestBaseElement extends BaseElement {
  static styles = [
    ...([BaseElement.styles].flat()),
    css`
      :host {
        display: block;
      }
    `,
  ];

  render() {
    return html`<div class="content">content</div>`;
  }
}

describe('BaseElement', () => {
  it('extends LitElement', () => {
    expect(new TestBaseElement()).to.be.instanceOf(LitElement);
  });

  it('applies box-sizing border-box', async () => {
    const el = await fixture<TestBaseElement>(
      html`<test-base-element></test-base-element>`
    );
    const style = getComputedStyle(el);
    expect(style.boxSizing).to.equal('border-box');
  });

  it('hides element when hidden attribute is set', async () => {
    const el = await fixture<TestBaseElement>(
      html`<test-base-element hidden></test-base-element>`
    );
    const style = getComputedStyle(el);
    expect(style.display).to.equal('none');
  });

  it('provides sr-only utility class', async () => {
    @customElement('test-sr-only')
    class TestSrOnly extends BaseElement {
      static styles = [...([BaseElement.styles].flat())];
      render() {
        return html`<span class="sr-only">screen reader only</span>`;
      }
    }

    const el = await fixture<TestSrOnly>(
      html`<test-sr-only></test-sr-only>`
    );
    const span = el.shadowRoot!.querySelector('.sr-only') as HTMLElement;
    const style = getComputedStyle(span);
    expect(style.position).to.equal('absolute');
    expect(style.width).to.equal('1px');
    expect(style.height).to.equal('1px');
    expect(style.overflow).to.equal('hidden');
  });
});
