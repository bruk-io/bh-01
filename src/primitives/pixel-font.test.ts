import { expect } from '@open-wc/testing';
import { PIXEL_FONT, textToGrid } from './pixel-font.js';

describe('PIXEL_FONT', () => {
  it('has glyphs for A-Z', () => {
    for (let c = 65; c <= 90; c++) {
      const char = String.fromCharCode(c);
      expect(PIXEL_FONT[char], `missing glyph for ${char}`).to.exist;
      expect(PIXEL_FONT[char]).to.have.lengthOf(5);
    }
  });

  it('has glyphs for 0-9', () => {
    for (let i = 0; i <= 9; i++) {
      expect(PIXEL_FONT[String(i)], `missing glyph for ${i}`).to.exist;
      expect(PIXEL_FONT[String(i)]).to.have.lengthOf(5);
    }
  });

  it('has glyphs for symbols', () => {
    for (const sym of [' ', ':', '.', '%', '/', '-', '!', '+']) {
      expect(PIXEL_FONT[sym], `missing glyph for "${sym}"`).to.exist;
      expect(PIXEL_FONT[sym]).to.have.lengthOf(5);
    }
  });

  it('glyph rows fit in 3 bits', () => {
    for (const [char, rows] of Object.entries(PIXEL_FONT)) {
      for (const row of rows) {
        expect(row, `glyph ${char} has row value > 7`).to.be.lessThanOrEqual(0b111);
        expect(row, `glyph ${char} has negative row`).to.be.greaterThanOrEqual(0);
      }
    }
  });
});

describe('textToGrid', () => {
  it('returns a Uint8Array of correct length', () => {
    const grid = textToGrid('A', 20, 5);
    expect(grid).to.be.instanceOf(Uint8Array);
    expect(grid.length).to.equal(100);
  });

  it('renders a single character at correct position', () => {
    // "A" glyph row 0 = 0b010, so center pixel is lit
    const grid = textToGrid('A', 3, 5);
    // Row 0: should be [0, 1, 0]
    expect(grid[0]).to.equal(0); // (0,0)
    expect(grid[1]).to.equal(1); // (1,0)
    expect(grid[2]).to.equal(0); // (2,0)
  });

  it('converts lowercase to uppercase', () => {
    const upper = textToGrid('A', 10, 5);
    const lower = textToGrid('a', 10, 5);
    expect(Array.from(upper)).to.deep.equal(Array.from(lower));
  });

  it('uses custom color index', () => {
    const grid = textToGrid('!', 3, 5, 3);
    const litPixels = Array.from(grid).filter((v) => v !== 0);
    expect(litPixels.length).to.be.greaterThan(0);
    for (const px of litPixels) {
      expect(px).to.equal(3);
    }
  });

  it('skips unknown characters', () => {
    const withUnknown = textToGrid('A@B', 20, 5);
    const withoutUnknown = textToGrid('AB', 20, 5);
    expect(Array.from(withUnknown)).to.deep.equal(Array.from(withoutUnknown));
  });

  it('returns all zeros for empty string', () => {
    const grid = textToGrid('', 10, 5);
    expect(Array.from(grid).every((v) => v === 0)).to.be.true;
  });

  it('clips characters that exceed grid width', () => {
    const grid = textToGrid('ABCDEF', 5, 5);
    expect(grid.length).to.equal(25);
    // Should not throw, grid truncates gracefully
  });

  it('vertically centers text when rows > 5', () => {
    const grid = textToGrid('!', 3, 9);
    // "!" = row 0: 010, row 1: 010, row 2: 010, row 3: 000, row 4: 010
    // yOffset = floor((9-5)/2) = 2
    // So row 2 col 1 should be lit (first glyph row)
    expect(grid[2 * 3 + 1]).to.equal(1);
    // Row 0, col 1 should be off (above glyph)
    expect(grid[0 * 3 + 1]).to.equal(0);
  });

  it('adds 1-column spacing between characters', () => {
    // Two single-column chars with spacing:
    // "!!" should have 3 cols for first ! + 1 spacing + 3 cols for second !
    const grid = textToGrid('!!', 10, 5);
    // First "!" center pixel at col 1, second at col 1+3+1 = col 5
    expect(grid[0 * 10 + 1]).to.equal(1); // first "!" top
    expect(grid[0 * 10 + 5]).to.equal(1); // second "!" top
    // The spacing column (col 3) should be empty
    expect(grid[0 * 10 + 3]).to.equal(0);
  });
});
