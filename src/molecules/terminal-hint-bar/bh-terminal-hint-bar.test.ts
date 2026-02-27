import { html } from 'lit';
import { fixture, expect } from '@open-wc/testing';
import type { BhTerminalHintBar } from './bh-terminal-hint-bar.js';
import './bh-terminal-hint-bar.js';

describe('bh-terminal-hint-bar', () => {
  it('renders with default (empty) hints', async () => {
    const el = await fixture<BhTerminalHintBar>(
      html`<bh-terminal-hint-bar></bh-terminal-hint-bar>`
    );
    expect(el.hints).to.deep.equal([]);
    const hints = el.shadowRoot!.querySelectorAll('.hint');
    expect(hints.length).to.equal(0);
  });

  it('renders hint items', async () => {
    const el = await fixture<BhTerminalHintBar>(
      html`<bh-terminal-hint-bar
        .hints=${[
          { key: 'Ctrl+C', label: 'Copy' },
          { key: 'Ctrl+V', label: 'Paste' },
        ]}
      ></bh-terminal-hint-bar>`
    );
    const hints = el.shadowRoot!.querySelectorAll('.hint');
    expect(hints.length).to.equal(2);
  });

  it('displays key in kbd element', async () => {
    const el = await fixture<BhTerminalHintBar>(
      html`<bh-terminal-hint-bar
        .hints=${[{ key: 'Esc', label: 'Quit' }]}
      ></bh-terminal-hint-bar>`
    );
    const kbd = el.shadowRoot!.querySelector('kbd');
    expect(kbd).to.exist;
    expect(kbd!.textContent).to.equal('Esc');
  });

  it('displays label text', async () => {
    const el = await fixture<BhTerminalHintBar>(
      html`<bh-terminal-hint-bar
        .hints=${[{ key: 'F1', label: 'Help' }]}
      ></bh-terminal-hint-bar>`
    );
    const hint = el.shadowRoot!.querySelector('.hint');
    expect(hint).to.exist;
    expect(hint!.textContent).to.contain('Help');
  });

  it('exposes bar CSS part', async () => {
    const el = await fixture<BhTerminalHintBar>(
      html`<bh-terminal-hint-bar></bh-terminal-hint-bar>`
    );
    const bar = el.shadowRoot!.querySelector('[part="bar"]');
    expect(bar).to.exist;
  });
});
