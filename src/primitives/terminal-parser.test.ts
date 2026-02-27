import { expect } from '@open-wc/testing';
import {
  escapeTerminalHtml,
  parseColorTags,
  linkifyUrls,
  renderTerminalText,
  TERMINAL_TAG_MAP,
} from './terminal-parser.js';

describe('TERMINAL_TAG_MAP', () => {
  it('has entries for all semantic color tags', () => {
    const expected = [
      'primary',
      'success',
      'warning',
      'danger',
      'text',
      'bright',
      'muted',
      'tertiary',
      'bold',
    ];
    for (const tag of expected) {
      expect(TERMINAL_TAG_MAP[tag], `missing mapping for ${tag}`).to.exist;
    }
  });
});

describe('escapeTerminalHtml', () => {
  it('escapes & < > entities', () => {
    expect(escapeTerminalHtml('a & b < c > d')).to.equal('a &amp; b &lt; c &gt; d');
  });

  it('preserves curly braces used for tags', () => {
    expect(escapeTerminalHtml('{primary}hello{/}')).to.equal('{primary}hello{/}');
  });

  it('escapes entities while keeping braces', () => {
    expect(escapeTerminalHtml('{danger}<script>{/}')).to.equal(
      '{danger}&lt;script&gt;{/}'
    );
  });
});

describe('parseColorTags', () => {
  it('converts a single tag to a span', () => {
    expect(parseColorTags('{primary}hello{/}')).to.equal(
      '<span class="bh-t-primary">hello</span>'
    );
  });

  it('converts multiple different tags', () => {
    const input = '{success}ok{/} {danger}fail{/}';
    const expected =
      '<span class="bh-t-success">ok</span> <span class="bh-t-danger">fail</span>';
    expect(parseColorTags(input)).to.equal(expected);
  });

  it('handles nested tags', () => {
    const input = '{primary}hello {bold}world{/}{/}';
    const expected =
      '<span class="bh-t-primary">hello <span class="bh-t-bold">world</span></span>';
    expect(parseColorTags(input)).to.equal(expected);
  });

  it('leaves unknown tags as literal text', () => {
    expect(parseColorTags('{unknown}hello{/}')).to.equal('{unknown}hello</span>');
  });

  it('handles unclosed tags gracefully', () => {
    const result = parseColorTags('{primary}hello');
    expect(result).to.equal('<span class="bh-t-primary">hello');
  });

  it('handles text with no tags', () => {
    expect(parseColorTags('plain text')).to.equal('plain text');
  });

  it('converts bold tag correctly', () => {
    expect(parseColorTags('{bold}strong{/}')).to.equal(
      '<span class="bh-t-bold">strong</span>'
    );
  });
});

describe('linkifyUrls', () => {
  it('wraps http URLs in anchor tags', () => {
    const result = linkifyUrls('visit http://example.com now');
    expect(result).to.equal(
      'visit <a href="http://example.com" target="_blank" rel="noopener noreferrer" part="link">http://example.com</a> now'
    );
  });

  it('wraps https URLs in anchor tags', () => {
    const result = linkifyUrls('visit https://example.com/path now');
    expect(result).to.equal(
      'visit <a href="https://example.com/path" target="_blank" rel="noopener noreferrer" part="link">https://example.com/path</a> now'
    );
  });

  it('ignores non-URL text', () => {
    expect(linkifyUrls('no urls here')).to.equal('no urls here');
  });

  it('handles multiple URLs', () => {
    const result = linkifyUrls('a https://one.com b http://two.com c');
    expect(result).to.contain('href="https://one.com"');
    expect(result).to.contain('href="http://two.com"');
  });
});

describe('renderTerminalText', () => {
  it('runs the full pipeline', () => {
    const input = '{primary}Hello & <world>{/} https://example.com';
    const result = renderTerminalText(input);
    // HTML entities escaped
    expect(result).to.contain('&amp;');
    expect(result).to.contain('&lt;world&gt;');
    // Color tag converted
    expect(result).to.contain('<span class="bh-t-primary">');
    expect(result).to.contain('</span>');
    // URL linkified
    expect(result).to.contain('href="https://example.com"');
  });

  it('handles empty string', () => {
    expect(renderTerminalText('')).to.equal('');
  });

  it('handles plain text with no tags or URLs', () => {
    expect(renderTerminalText('just text')).to.equal('just text');
  });
});
