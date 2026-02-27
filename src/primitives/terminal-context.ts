import { createContext } from '@lit/context';
import type { CommandHandler } from './terminal-types.js';

/**
 * Lit Context for providing a CommandHandler to bh-terminal.
 * Consumers provide this context; the terminal consumes it.
 */
export const commandHandlerContext = createContext<CommandHandler>('bh-terminal-handler');
