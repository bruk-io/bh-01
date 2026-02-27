import { html, css } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import { consume } from '@lit/context';
import { BaseElement } from '../../primitives/base-element.js';
import { renderTerminalText } from '../../primitives/terminal-parser.js';
import { commandHandlerContext } from '../../primitives/terminal-context.js';
import type {
  TerminalAdapter,
  CommandHandler,
  TerminalMode,
  TerminalHint,
} from '../../primitives/terminal-types.js';
import '../../molecules/terminal-bar/bh-terminal-bar.js';
import '../../molecules/terminal-input/bh-terminal-input.js';
import '../../molecules/terminal-hint-bar/bh-terminal-hint-bar.js';

/**
 * A full terminal shell component that composes the terminal bar, output area,
 * input, and hint bar. Implements TerminalAdapter so command handlers can write
 * output, show errors, and control terminal state.
 *
 * Consumes a CommandHandler from Lit Context when available; otherwise
 * re-dispatches commands as `bh-command` events for the consumer to handle.
 *
 * @csspart terminal - The outer terminal container
 * @csspart output - The scrollable output area
 *
 * @cssprop [--bh-terminal-height=100%] - Terminal height
 * @cssprop [--bh-color-cod] - Terminal background
 * @cssprop [--bh-color-tundora] - Terminal border
 * @cssprop [--bh-color-swiss-coffee] - Default text color
 * @cssprop [--bh-font-mono] - Monospace font family
 *
 * @fires bh-command - Fired when no context handler is present. Detail is the raw command string.
 * @fires bh-tab-complete - Re-dispatched when no context handler provides completions.
 */
@customElement('bh-terminal')
export class BhTerminal extends BaseElement implements TerminalAdapter {
  static styles = [
    ...([BaseElement.styles].flat()),
    css`
      :host {
        display: block;
        color-scheme: dark;
      }

      .terminal {
        display: flex;
        flex-direction: column;
        height: var(--bh-terminal-height, 100%);
        background: var(--bh-color-cod, #0d0c0a);
        border: 1px solid var(--bh-color-tundora, #2a2826);
        border-radius: var(--bh-radius-lg, 8px);
        overflow: hidden;
        color: var(--bh-color-swiss-coffee, #c8c4bc);
        font-family: var(--bh-font-mono);
      }

      .output {
        flex: 1;
        overflow-y: auto;
        overflow-x: hidden;
        padding: 12px 16px 0;
        min-height: 0;
        background: var(--bh-color-cod, #0d0c0a);
      }

      .output::-webkit-scrollbar {
        width: 6px;
      }
      .output::-webkit-scrollbar-track {
        background: var(--bh-color-cod, #0d0c0a);
      }
      .output::-webkit-scrollbar-thumb {
        background: var(--bh-color-tundora, #2a2826);
        border-radius: 3px;
      }

      .line {
        font-family: var(--bh-font-mono);
        font-size: 13px;
        line-height: 1.5;
        white-space: pre-wrap;
        word-break: break-word;
        min-height: 1.5em;
      }

      /* Scanlines overlay */
      :host([scanlines]) .terminal {
        position: relative;
      }

      :host([scanlines]) .terminal::after {
        content: '';
        position: absolute;
        inset: 0;
        background: repeating-linear-gradient(
          0deg,
          transparent,
          transparent 2px,
          rgba(0, 0, 0, 0.08) 2px,
          rgba(0, 0, 0, 0.08) 4px
        );
        pointer-events: none;
        z-index: 1;
      }

      /* Links in terminal output */
      .output a {
        color: var(--bh-color-primary);
        text-decoration: underline;
        text-underline-offset: 2px;
      }
      .output a:hover {
        color: var(--bh-color-primary-hover, var(--bh-color-primary));
      }

      /* Terminal color tag classes — map to bh-01 semantic tokens */
      .bh-t-primary {
        color: var(--bh-color-primary);
      }
      .bh-t-success {
        color: var(--bh-color-success);
      }
      .bh-t-warning {
        color: var(--bh-color-warning);
      }
      .bh-t-danger {
        color: var(--bh-color-danger);
      }
      .bh-t-text {
        color: var(--bh-color-text);
      }
      .bh-t-bright {
        color: var(--bh-color-text-bright);
      }
      .bh-t-muted {
        color: var(--bh-color-text-muted);
      }
      .bh-t-tertiary {
        color: var(--bh-color-text-tertiary);
      }
      .bh-t-bold {
        font-weight: var(--bh-font-medium, 500);
      }
    `,
  ];

  /** Title displayed in the terminal bar. */
  @property() title = 'Terminal';

  /** Status text shown in the terminal bar. */
  @property() status = '';

  /** Color of the status LED indicator. */
  @property({ attribute: 'status-color' }) statusColor = 'success';

  /** Prompt character(s) displayed before input. */
  @property() prompt = '\u25B8 ';

  /** Optional user/host shown in the prompt. */
  @property({ attribute: 'prompt-user' }) promptUser = '';

  /** Optional path shown in the prompt. */
  @property({ attribute: 'prompt-path' }) promptPath = '~';

  /** Maximum number of output lines before trimming. */
  @property({ type: Number, attribute: 'max-lines' }) maxLines = 1000;

  /** Auto-scroll to bottom on new output. */
  @property({ type: Boolean }) autoscroll = true;

  /** Keyboard shortcut hints shown in the bottom bar. */
  @property({ attribute: false }) hints: TerminalHint[] = [];

  /** Enable CRT scanline overlay effect. */
  @property({ type: Boolean, reflect: true }) scanlines = false;

  @consume({ context: commandHandlerContext, subscribe: true })
  _handler?: CommandHandler;

  @state() _mode: TerminalMode = 'idle';

  @query('.output') _output!: HTMLDivElement;
  @query('bh-terminal-input') _input!: HTMLElement & { focus(): void };

  // --- TerminalAdapter implementation ---

  /** Append text to the current (last) line. Create a line if none exist. */
  write(text: string): void {
    if (!this._output) return;
    let last = this._output.querySelector('.line:last-child') as HTMLElement | null;
    if (!last) {
      last = document.createElement('div');
      last.className = 'line';
      this._output.appendChild(last);
    }
    last.innerHTML += renderTerminalText(text);
    this._scrollToBottom();
  }

  /** Append a complete line. Optionally tag it with an id for later replacement. */
  writeLine(text: string, options?: { id: string }): void {
    if (!this._output) return;
    const line = document.createElement('div');
    line.className = 'line';
    line.innerHTML = renderTerminalText(text);
    if (options?.id) {
      line.setAttribute('data-line-id', options.id);
    }
    this._output.appendChild(line);
    this._trimLines();
    this._scrollToBottom();
  }

  /** Write a line styled as an error. */
  writeError(text: string): void {
    this.writeLine('{danger}' + text + '{/}');
  }

  /** Update a previously written line identified by id. Falls back to writeLine. */
  replaceLine(id: string, text: string): void {
    if (!this._output) return;
    const existing = this._output.querySelector(`[data-line-id="${id}"]`) as HTMLElement | null;
    if (existing) {
      existing.innerHTML = renderTerminalText(text);
    } else {
      this.writeLine(text, { id });
    }
  }

  /** Enter RUNNING state — disable input. */
  startCommand(): void {
    this._mode = 'running';
  }

  /** Return to IDLE state — re-enable and focus input. */
  endCommand(): void {
    this._mode = 'idle';
    this.updateComplete.then(() => {
      this._input?.focus();
    });
  }

  /** Clear the scrollback buffer. */
  clear(): void {
    if (this._output) {
      this._output.innerHTML = '';
    }
  }

  /** Focus the terminal input. */
  focus(): void {
    this._input?.focus();
  }

  // --- Private helpers ---

  private _scrollToBottom(): void {
    if (this.autoscroll && this._output) {
      requestAnimationFrame(() => {
        this._output.scrollTop = this._output.scrollHeight;
      });
    }
  }

  private _trimLines(): void {
    if (this._output && this.maxLines > 0) {
      while (this._output.children.length > this.maxLines) {
        this._output.removeChild(this._output.firstChild!);
      }
    }
  }

  /** Echo the user's command to the output area with prompt decoration. */
  private _echo(text: string): void {
    if (!this._output) return;

    if (this.promptUser) {
      // Two-line prompt: user@path on first line, prompt char + command on second
      const userLine = document.createElement('div');
      userLine.className = 'line';
      userLine.innerHTML =
        '<span class="bh-t-tertiary">\u250C\u2500[</span>' +
        '<span class="bh-t-primary">' + this.promptUser + '</span>' +
        '<span class="bh-t-tertiary">]\u2500[</span>' +
        '<span class="bh-t-success">' + this.promptPath + '</span>' +
        '<span class="bh-t-tertiary">]</span>';
      this._output.appendChild(userLine);

      const cmdLine = document.createElement('div');
      cmdLine.className = 'line';
      cmdLine.innerHTML =
        '<span class="bh-t-tertiary">\u2514\u2500</span>' +
        '<span class="bh-t-primary">' + this.prompt + '</span>' +
        renderTerminalText(text);
      this._output.appendChild(cmdLine);
    } else {
      const line = document.createElement('div');
      line.className = 'line';
      line.innerHTML =
        '<span class="bh-t-primary">' + this.prompt + '</span>' +
        renderTerminalText(text);
      this._output.appendChild(line);
    }

    this._trimLines();
    this._scrollToBottom();
  }

  // --- Event handlers ---

  private async _onCommand(e: CustomEvent<string>): Promise<void> {
    const raw = e.detail;
    this._echo(raw);

    if (this._handler) {
      const parts = raw.split(/\s+/);
      const cmd = parts[0];
      const args = parts.slice(1);
      try {
        await this._handler.execute(cmd, args, this);
      } catch (err) {
        this.writeError(err instanceof Error ? err.message : String(err));
      }
    } else {
      this.dispatchEvent(
        new CustomEvent('bh-command', {
          detail: raw,
          bubbles: true,
          composed: true,
        })
      );
    }
  }

  private _onInterrupt(): void {
    if (this._mode === 'running') {
      this.endCommand();
    }
    this.writeLine('{tertiary}^C{/}');
  }

  private _onTabComplete(e: CustomEvent<string>): void {
    if (this._handler?.complete) {
      const matches = this._handler.complete(e.detail);
      if (matches.length === 1) {
        // Single match — fill it in
        const input = this._input as HTMLElement & { shadowRoot: ShadowRoot };
        const cmdInput = input.shadowRoot?.querySelector('.cmd-input') as HTMLInputElement | null;
        if (cmdInput) {
          cmdInput.value = matches[0];
        }
      } else if (matches.length > 1) {
        this.writeLine(matches.join('  '));
      }
    } else {
      this.dispatchEvent(
        new CustomEvent('bh-tab-complete', {
          detail: e.detail,
          bubbles: true,
          composed: true,
        })
      );
    }
  }

  render() {
    return html`
      <div class="terminal" part="terminal">
        <bh-terminal-bar
          title=${this.title}
          status=${this.status}
          status-color=${this.statusColor}
        ></bh-terminal-bar>
        <div class="output" part="output"></div>
        <bh-terminal-input
          prompt=${this.prompt}
          prompt-user=${this.promptUser}
          prompt-path=${this.promptPath}
          ?disabled=${this._mode === 'running'}
          @bh-command=${this._onCommand}
          @bh-interrupt=${this._onInterrupt}
          @bh-tab-complete=${this._onTabComplete}
          @bh-clear=${() => this.clear()}
        ></bh-terminal-input>
        ${this.hints.length
          ? html`<bh-terminal-hint-bar .hints=${this.hints}></bh-terminal-hint-bar>`
          : ''}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bh-terminal': BhTerminal;
  }
}
