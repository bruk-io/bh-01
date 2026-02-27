import { html, css, nothing } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import { BaseElement } from '../../primitives/base-element.js';

/**
 * A terminal input area with a styled prompt, text input, command history,
 * and line-editing shortcuts.
 *
 * @csspart input-area - The outer input container
 * @csspart prompt - The prompt character element
 * @csspart input - The text input element
 *
 * @cssprop [--bh-color-primary] - Accent color for cursor, prompt arrow, and user
 * @cssprop [--bh-color-text] - Text color
 * @cssprop [--bh-color-text-tertiary] - Dim text for prompt decorations
 * @cssprop [--bh-color-bg] - Background color
 * @cssprop [--bh-font-mono] - Monospace font family
 * @cssprop [--bh-color-success] - Path color (falls back to text color)
 *
 * @fires bh-command - When Enter is pressed with non-empty input. Detail is the command string.
 * @fires bh-tab-complete - When Tab is pressed. Detail is the current input value.
 * @fires bh-interrupt - When Ctrl+C is pressed.
 * @fires bh-clear - When Ctrl+L is pressed.
 */
@customElement('bh-terminal-input')
export class BhTerminalInput extends BaseElement {
  static styles = [
    ...([BaseElement.styles].flat()),
    css`
      :host {
        display: block;
      }

      .input-area {
        background: var(--bh-color-bg, var(--bh-color-cod));
        padding: 0 16px 12px;
        flex-shrink: 0;
      }

      .prompt-line {
        display: flex;
        align-items: flex-start;
        font-family: var(--bh-font-mono);
        font-size: 13px;
        line-height: 1.5;
      }

      .prompt-chrome {
        color: var(--bh-color-text-tertiary);
        white-space: pre;
        user-select: none;
      }

      .prompt-user {
        color: var(--bh-color-primary);
      }

      .prompt-path {
        color: var(--bh-color-success, var(--bh-color-text));
      }

      .prompt-char {
        color: var(--bh-color-primary);
        white-space: pre;
        user-select: none;
        flex-shrink: 0;
      }

      .cmd-input {
        flex: 1;
        font-family: var(--bh-font-mono);
        font-size: 13px;
        line-height: 1.5;
        color: var(--bh-color-text);
        background: transparent;
        border: none;
        outline: none;
        caret-color: var(--bh-color-primary);
        padding: 0;
        margin: 0;
      }

      .cmd-input:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }

      @media (max-width: 768px) {
        .cmd-input {
          font-size: 16px;
        }
      }
    `,
  ];

  /** The prompt character(s) displayed before input. */
  @property() prompt = '\u25B8 ';

  /** Optional user/host shown in prompt (e.g. 'bh-01'). */
  @property({ attribute: 'prompt-user' }) promptUser = '';

  /** Optional path shown in prompt. */
  @property({ attribute: 'prompt-path' }) promptPath = '~';

  /** Disables input when terminal is in RUNNING state. */
  @property({ type: Boolean, reflect: true }) disabled = false;

  @state() private _history: string[] = [];
  @state() private _historyIndex = -1;
  @state() private _tempLine = '';

  @query('.cmd-input') private _input!: HTMLInputElement;

  /** Focus the internal input element. */
  focus(): void {
    this.updateComplete.then(() => {
      this._input?.focus();
    });
  }

  private _onKeydown(e: KeyboardEvent): void {
    const input = this._input;

    if (e.key === 'Enter') {
      e.preventDefault();
      const value = input.value.trim();
      if (value) {
        this._history = [...this._history, value];
        this._historyIndex = -1;
        this._tempLine = '';
        this.dispatchEvent(
          new CustomEvent('bh-command', { detail: value, bubbles: true, composed: true })
        );
        input.value = '';
      }
      return;
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (this._history.length === 0) return;
      if (this._historyIndex === -1) {
        this._tempLine = input.value;
        this._historyIndex = this._history.length - 1;
      } else if (this._historyIndex > 0) {
        this._historyIndex--;
      }
      input.value = this._history[this._historyIndex];
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (this._historyIndex === -1) return;
      this._historyIndex++;
      if (this._historyIndex >= this._history.length) {
        this._historyIndex = -1;
        input.value = this._tempLine;
        this._tempLine = '';
      } else {
        input.value = this._history[this._historyIndex];
      }
      return;
    }

    if (e.key === 'Tab') {
      e.preventDefault();
      this.dispatchEvent(
        new CustomEvent('bh-tab-complete', {
          detail: input.value,
          bubbles: true,
          composed: true,
        })
      );
      return;
    }

    if (e.ctrlKey) {
      switch (e.key) {
        case 'c':
          e.preventDefault();
          this.dispatchEvent(
            new CustomEvent('bh-interrupt', { bubbles: true, composed: true })
          );
          input.value = '';
          return;
        case 'l':
          e.preventDefault();
          this.dispatchEvent(
            new CustomEvent('bh-clear', { bubbles: true, composed: true })
          );
          return;
        case 'u':
          e.preventDefault();
          input.value = '';
          return;
        case 'k':
          e.preventDefault();
          input.value = input.value.substring(0, input.selectionStart ?? 0);
          return;
        case 'a':
          e.preventDefault();
          input.setSelectionRange(0, 0);
          return;
        case 'e':
          e.preventDefault();
          input.setSelectionRange(input.value.length, input.value.length);
          return;
      }
    }
  }

  render() {
    return html`
      <div class="input-area" part="input-area">
        ${this.promptUser
          ? html`
              <div class="prompt-line">
                <span class="prompt-chrome">\u250C\u2500[</span>
                <span class="prompt-user">${this.promptUser}</span>
                <span class="prompt-chrome">]\u2500[</span>
                <span class="prompt-path">${this.promptPath}</span>
                <span class="prompt-chrome">]</span>
              </div>
            `
          : nothing}
        <div class="prompt-line">
          ${this.promptUser
            ? html`<span class="prompt-chrome">\u2514\u2500</span>`
            : nothing}
          <span class="prompt-char" part="prompt">${this.prompt}</span>
          <input
            type="text"
            class="cmd-input"
            part="input"
            autocomplete="off"
            autocorrect="off"
            autocapitalize="off"
            spellcheck="false"
            ?disabled=${this.disabled}
            @keydown=${this._onKeydown}
          />
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bh-terminal-input': BhTerminalInput;
  }
}
