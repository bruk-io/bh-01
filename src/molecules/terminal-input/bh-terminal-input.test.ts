import { html } from 'lit';
import { fixture, expect, oneEvent } from '@open-wc/testing';
import type { BhTerminalInput } from './bh-terminal-input.js';
import './bh-terminal-input.js';

function keydown(el: HTMLElement, key: string, opts: Partial<KeyboardEventInit> = {}): void {
  el.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true, cancelable: true, ...opts }));
}

describe('bh-terminal-input', () => {
  it('renders with default props', async () => {
    const el = await fixture<BhTerminalInput>(html`<bh-terminal-input></bh-terminal-input>`);
    expect(el.prompt).to.equal('\u25B8 ');
    expect(el.promptUser).to.equal('');
    expect(el.promptPath).to.equal('~');
    expect(el.disabled).to.equal(false);
  });

  it('displays prompt character', async () => {
    const el = await fixture<BhTerminalInput>(
      html`<bh-terminal-input prompt="$ "></bh-terminal-input>`
    );
    const promptChar = el.shadowRoot!.querySelector('.prompt-char');
    expect(promptChar).to.exist;
    expect(promptChar!.textContent).to.equal('$ ');
  });

  it('displays user and path when set', async () => {
    const el = await fixture<BhTerminalInput>(
      html`<bh-terminal-input prompt-user="bh-01" prompt-path="/home"></bh-terminal-input>`
    );
    const user = el.shadowRoot!.querySelector('.prompt-user');
    const path = el.shadowRoot!.querySelector('.prompt-path');
    expect(user).to.exist;
    expect(user!.textContent).to.equal('bh-01');
    expect(path).to.exist;
    expect(path!.textContent).to.equal('/home');
  });

  it('fires bh-command event on Enter with input value', async () => {
    const el = await fixture<BhTerminalInput>(html`<bh-terminal-input></bh-terminal-input>`);
    const input = el.shadowRoot!.querySelector<HTMLInputElement>('.cmd-input')!;
    input.value = 'ls -la';

    setTimeout(() => keydown(input, 'Enter'));
    const { detail } = await oneEvent(el, 'bh-command');

    expect(detail).to.equal('ls -la');
  });

  it('does not fire bh-command on Enter with empty input', async () => {
    const el = await fixture<BhTerminalInput>(html`<bh-terminal-input></bh-terminal-input>`);
    const input = el.shadowRoot!.querySelector<HTMLInputElement>('.cmd-input')!;
    input.value = '';

    let fired = false;
    el.addEventListener('bh-command', () => {
      fired = true;
    });
    keydown(input, 'Enter');

    expect(fired).to.equal(false);
  });

  it('clears input after command submission', async () => {
    const el = await fixture<BhTerminalInput>(html`<bh-terminal-input></bh-terminal-input>`);
    const input = el.shadowRoot!.querySelector<HTMLInputElement>('.cmd-input')!;
    input.value = 'echo hello';

    keydown(input, 'Enter');

    expect(input.value).to.equal('');
  });

  it('fires bh-tab-complete on Tab', async () => {
    const el = await fixture<BhTerminalInput>(html`<bh-terminal-input></bh-terminal-input>`);
    const input = el.shadowRoot!.querySelector<HTMLInputElement>('.cmd-input')!;
    input.value = 'gi';

    setTimeout(() => keydown(input, 'Tab'));
    const { detail } = await oneEvent(el, 'bh-tab-complete');

    expect(detail).to.equal('gi');
  });

  it('fires bh-interrupt on Ctrl+C', async () => {
    const el = await fixture<BhTerminalInput>(html`<bh-terminal-input></bh-terminal-input>`);
    const input = el.shadowRoot!.querySelector<HTMLInputElement>('.cmd-input')!;
    input.value = 'some text';

    setTimeout(() => keydown(input, 'c', { ctrlKey: true }));
    await oneEvent(el, 'bh-interrupt');

    expect(input.value).to.equal('');
  });

  it('disables input when disabled prop is true', async () => {
    const el = await fixture<BhTerminalInput>(
      html`<bh-terminal-input disabled></bh-terminal-input>`
    );
    const input = el.shadowRoot!.querySelector<HTMLInputElement>('.cmd-input')!;
    expect(input.disabled).to.equal(true);
  });

  it('reflects disabled attribute', async () => {
    const el = await fixture<BhTerminalInput>(
      html`<bh-terminal-input disabled></bh-terminal-input>`
    );
    expect(el.hasAttribute('disabled')).to.equal(true);
    expect(el.disabled).to.equal(true);
  });

  it('exposes input-area and input CSS parts', async () => {
    const el = await fixture<BhTerminalInput>(html`<bh-terminal-input></bh-terminal-input>`);
    const inputArea = el.shadowRoot!.querySelector('[part="input-area"]');
    const input = el.shadowRoot!.querySelector('[part="input"]');
    expect(inputArea).to.exist;
    expect(input).to.exist;
  });

  it('navigates history with up/down arrows', async () => {
    const el = await fixture<BhTerminalInput>(html`<bh-terminal-input></bh-terminal-input>`);
    const input = el.shadowRoot!.querySelector<HTMLInputElement>('.cmd-input')!;

    // Submit two commands
    input.value = 'first';
    keydown(input, 'Enter');
    input.value = 'second';
    keydown(input, 'Enter');

    // Press Up to get last command
    keydown(input, 'ArrowUp');
    expect(input.value).to.equal('second');

    // Press Up again to get first command
    keydown(input, 'ArrowUp');
    expect(input.value).to.equal('first');

    // Press Down to go back to second
    keydown(input, 'ArrowDown');
    expect(input.value).to.equal('second');

    // Press Down to restore empty input
    keydown(input, 'ArrowDown');
    expect(input.value).to.equal('');
  });
});
