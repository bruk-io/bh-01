/**
 * Terminal text parser — converts color tag syntax into HTML spans
 * using bh-01 semantic color tokens.
 *
 * Syntax: {primary}colored text{/}
 */

/** Maps tag names to CSS class names */
export const TERMINAL_TAG_MAP: Record<string, string> = {
  primary: 'bh-t-primary',
  success: 'bh-t-success',
  warning: 'bh-t-warning',
  danger: 'bh-t-danger',
  text: 'bh-t-text',
  bright: 'bh-t-bright',
  muted: 'bh-t-muted',
  tertiary: 'bh-t-tertiary',
  bold: 'bh-t-bold',
};

/**
 * Escape HTML entities while preserving curly braces used for tag syntax.
 */
export function escapeTerminalHtml(text: string): string {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

/**
 * Convert {tag}text{/} syntax to <span class="...">text</span>.
 * Unknown tags are left as literal text. Unclosed tags are still
 * converted to spans (the browser will close them implicitly).
 */
export function parseColorTags(text: string): string {
  return text.replace(/\{(\/?[a-zA-Z]*)\}/g, (_match, tag: string) => {
    if (tag === '/') {
      return '</span>';
    }
    const className = TERMINAL_TAG_MAP[tag];
    if (className) {
      return `<span class="${className}">`;
    }
    // Unknown tag — return the original text unchanged
    return `{${tag}}`;
  });
}

const URL_REGEX = /https?:\/\/[^\s<>"']+/g;

/**
 * Detect http/https URLs in text and wrap them in anchor tags.
 */
export function linkifyUrls(html: string): string {
  return html.replace(URL_REGEX, (url) => {
    return `<a href="${url}" target="_blank" rel="noopener noreferrer" part="link">${url}</a>`;
  });
}

/**
 * Full rendering pipeline: escape HTML → parse color tags → linkify URLs.
 */
export function renderTerminalText(text: string): string {
  const escaped = escapeTerminalHtml(text);
  const parsed = parseColorTags(escaped);
  return linkifyUrls(parsed);
}
