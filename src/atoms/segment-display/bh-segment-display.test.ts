import { html } from 'lit';
import { fixture, expect } from '@open-wc/testing';
import type { BhSegmentDisplay } from './bh-segment-display.js';
import './bh-segment-display.js';

describe('bh-segment-display', () => {
  it('renders with default props', async () => {
    const el = await fixture<BhSegmentDisplay>(
      html`<bh-segment-display></bh-segment-display>`
    );
    expect(el.value).to.equal('');
    expect(el.color).to.equal('primary');
    expect(el.size).to.equal('md');
    expect(el.ghost).to.be.false;
  });

  it('uppercases the displayed text', async () => {
    const el = await fixture<BhSegmentDisplay>(
      html`<bh-segment-display value="open"></bh-segment-display>`
    );
    const display = el.shadowRoot!.querySelector('.display')!;
    expect(display.textContent).to.equal('OPEN');
  });

  it('reflects color attribute', async () => {
    const el = await fixture<BhSegmentDisplay>(
      html`<bh-segment-display color="success"></bh-segment-display>`
    );
    expect(el.getAttribute('color')).to.equal('success');
  });

  it('reflects size attribute', async () => {
    const el = await fixture<BhSegmentDisplay>(
      html`<bh-segment-display size="lg"></bh-segment-display>`
    );
    expect(el.getAttribute('size')).to.equal('lg');
  });

  it('exposes display CSS part', async () => {
    const el = await fixture<BhSegmentDisplay>(
      html`<bh-segment-display value="12"></bh-segment-display>`
    );
    const part = el.shadowRoot!.querySelector('[part="display"]');
    expect(part).to.exist;
  });

  it('sets role="status" and aria-label when label is provided', async () => {
    const el = await fixture<BhSegmentDisplay>(
      html`<bh-segment-display value="42" label="Score"></bh-segment-display>`
    );
    const display = el.shadowRoot!.querySelector('[part="display"]')!;
    expect(display.getAttribute('role')).to.equal('status');
    expect(display.getAttribute('aria-label')).to.equal('Score');
  });

  it('renders ghost segments when ghost attribute is set', async () => {
    const el = await fixture<BhSegmentDisplay>(
      html`<bh-segment-display value="12" ghost></bh-segment-display>`
    );
    const ghost = el.shadowRoot!.querySelector('.ghost');
    expect(ghost).to.exist;
    expect(ghost!.textContent).to.equal('88');
  });

  it('renders ghost alpha chars as ~', async () => {
    const el = await fixture<BhSegmentDisplay>(
      html`<bh-segment-display value="OK" ghost></bh-segment-display>`
    );
    const ghost = el.shadowRoot!.querySelector('.ghost');
    expect(ghost!.textContent).to.equal('~~');
  });

  it('does not render ghost element when ghost is false', async () => {
    const el = await fixture<BhSegmentDisplay>(
      html`<bh-segment-display value="12"></bh-segment-display>`
    );
    const ghost = el.shadowRoot!.querySelector('.ghost');
    expect(ghost).to.be.null;
  });

  it('hides ghost element from accessibility tree', async () => {
    const el = await fixture<BhSegmentDisplay>(
      html`<bh-segment-display value="99" ghost></bh-segment-display>`
    );
    const ghost = el.shadowRoot!.querySelector('.ghost')!;
    expect(ghost.getAttribute('aria-hidden')).to.equal('true');
  });
});
