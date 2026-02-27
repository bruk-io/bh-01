import { html } from 'lit';
import { fixture, expect, oneEvent } from '@open-wc/testing';
import type { BhTerminal } from './bh-terminal.js';
import './bh-terminal.js';

describe('bh-terminal', () => {
  it('renders with default props', async () => {
    const el = await fixture<BhTerminal>(html`<bh-terminal></bh-terminal>`);
    expect(el.title).to.equal('Terminal');
    expect(el.status).to.equal('');
    expect(el.statusColor).to.equal('success');
    expect(el.prompt).to.equal('\u25B8 ');
    expect(el.promptUser).to.equal('');
    expect(el.promptPath).to.equal('~');
    expect(el.maxLines).to.equal(1000);
    expect(el.autoscroll).to.equal(true);
    expect(el.scanlines).to.equal(false);
  });

  it('renders terminal bar with title', async () => {
    const el = await fixture<BhTerminal>(
      html`<bh-terminal title="zsh"></bh-terminal>`
    );
    const bar = el.shadowRoot!.querySelector('bh-terminal-bar');
    expect(bar).to.exist;
    expect(bar!.getAttribute('title')).to.equal('zsh');
  });

  it('renders terminal input', async () => {
    const el = await fixture<BhTerminal>(html`<bh-terminal></bh-terminal>`);
    const input = el.shadowRoot!.querySelector('bh-terminal-input');
    expect(input).to.exist;
  });

  it('writeLine adds a line to output', async () => {
    const el = await fixture<BhTerminal>(html`<bh-terminal></bh-terminal>`);
    el.writeLine('Hello, world!');
    const output = el.shadowRoot!.querySelector('.output')!;
    const lines = output.querySelectorAll('.line');
    expect(lines.length).to.equal(1);
    expect(lines[0].textContent).to.include('Hello, world!');
  });

  it('write appends to current line', async () => {
    const el = await fixture<BhTerminal>(html`<bh-terminal></bh-terminal>`);
    el.write('Hello');
    el.write(', world!');
    const output = el.shadowRoot!.querySelector('.output')!;
    const lines = output.querySelectorAll('.line');
    expect(lines.length).to.equal(1);
    expect(lines[0].textContent).to.include('Hello, world!');
  });

  it('writeError writes in danger style', async () => {
    const el = await fixture<BhTerminal>(html`<bh-terminal></bh-terminal>`);
    el.writeError('something broke');
    const output = el.shadowRoot!.querySelector('.output')!;
    const line = output.querySelector('.line')!;
    expect(line.innerHTML).to.include('bh-t-danger');
    expect(line.textContent).to.include('something broke');
  });

  it('clear removes all output lines', async () => {
    const el = await fixture<BhTerminal>(html`<bh-terminal></bh-terminal>`);
    el.writeLine('line 1');
    el.writeLine('line 2');
    el.clear();
    const output = el.shadowRoot!.querySelector('.output')!;
    expect(output.children.length).to.equal(0);
  });

  it('startCommand sets mode to running and disables input', async () => {
    const el = await fixture<BhTerminal>(html`<bh-terminal></bh-terminal>`);
    el.startCommand();
    await el.updateComplete;
    const input = el.shadowRoot!.querySelector('bh-terminal-input')!;
    expect(el._mode).to.equal('running');
    expect(input.hasAttribute('disabled')).to.equal(true);
  });

  it('endCommand sets mode to idle and enables input', async () => {
    const el = await fixture<BhTerminal>(html`<bh-terminal></bh-terminal>`);
    el.startCommand();
    await el.updateComplete;
    el.endCommand();
    await el.updateComplete;
    const input = el.shadowRoot!.querySelector('bh-terminal-input')!;
    expect(el._mode).to.equal('idle');
    expect(input.hasAttribute('disabled')).to.equal(false);
  });

  it('fires bh-command event when no context handler', async () => {
    const el = await fixture<BhTerminal>(html`<bh-terminal></bh-terminal>`);
    const input = el.shadowRoot!.querySelector('bh-terminal-input')!;
    const cmdInput = input.shadowRoot!.querySelector<HTMLInputElement>('.cmd-input')!;
    cmdInput.value = 'help';

    setTimeout(() => {
      cmdInput.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, cancelable: true })
      );
    });
    const { detail } = await oneEvent(el, 'bh-command');
    expect(detail).to.equal('help');
  });

  it('exposes terminal and output CSS parts', async () => {
    const el = await fixture<BhTerminal>(html`<bh-terminal></bh-terminal>`);
    const terminal = el.shadowRoot!.querySelector('[part="terminal"]');
    const output = el.shadowRoot!.querySelector('[part="output"]');
    expect(terminal).to.exist;
    expect(output).to.exist;
  });

  it('replaceLine updates existing line by id', async () => {
    const el = await fixture<BhTerminal>(html`<bh-terminal></bh-terminal>`);
    el.writeLine('Loading...', { id: 'status' });
    el.replaceLine('status', 'Done!');
    const output = el.shadowRoot!.querySelector('.output')!;
    const line = output.querySelector('[data-line-id="status"]')!;
    expect(line.textContent).to.include('Done!');
    expect(output.querySelectorAll('.line').length).to.equal(1);
  });

  it('trims lines when exceeding maxLines', async () => {
    const el = await fixture<BhTerminal>(
      html`<bh-terminal max-lines="3"></bh-terminal>`
    );
    el.writeLine('line 1');
    el.writeLine('line 2');
    el.writeLine('line 3');
    el.writeLine('line 4');
    el.writeLine('line 5');
    const output = el.shadowRoot!.querySelector('.output')!;
    expect(output.children.length).to.equal(3);
    expect(output.children[0].textContent).to.include('line 3');
  });

  it('renders hint bar when hints provided', async () => {
    const el = await fixture<BhTerminal>(html`<bh-terminal></bh-terminal>`);
    el.hints = [
      { key: 'Ctrl+C', label: 'Interrupt' },
      { key: 'Ctrl+L', label: 'Clear' },
    ];
    await el.updateComplete;
    const hintBar = el.shadowRoot!.querySelector('bh-terminal-hint-bar');
    expect(hintBar).to.exist;
  });

  it('does not render hint bar when hints empty', async () => {
    const el = await fixture<BhTerminal>(html`<bh-terminal></bh-terminal>`);
    const hintBar = el.shadowRoot!.querySelector('bh-terminal-hint-bar');
    expect(hintBar).to.not.exist;
  });
});
