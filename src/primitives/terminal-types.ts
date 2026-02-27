/** Output interface that command handlers write to. Implemented by bh-terminal. */
export interface TerminalAdapter {
  /** Append text to the current line (no newline). For streaming output. */
  write(text: string): void;
  /** Append a complete line. Supports {tag}color{/} syntax. */
  writeLine(text: string): void;
  /** Write a line styled as an error (danger color). */
  writeError(text: string): void;
  /** Write a replaceable line identified by id. */
  writeLine(text: string, options: { id: string }): void;
  /** Update a previously written replaceable line. */
  replaceLine(id: string, text: string): void;
  /** Enter RUNNING state — disable input, hide prompt. */
  startCommand(): void;
  /** Return to IDLE state — re-enable input, show prompt. */
  endCommand(): void;
  /** Clear the scrollback buffer. */
  clear(): void;
  /** Focus the terminal input. */
  focus(): void;
}

/** Command handler provided by consumers via Lit Context. */
export interface CommandHandler {
  /** Execute a command. Called by the terminal when user submits input. */
  execute(cmd: string, args: string[], terminal: TerminalAdapter): Promise<void>;
  /** Provide tab completions for partial input. Return matching strings. */
  complete?(partial: string): string[];
}

/** Terminal operating mode. */
export type TerminalMode = 'idle' | 'running';

/** Hint bar item. */
export interface TerminalHint {
  key: string;
  label: string;
}
