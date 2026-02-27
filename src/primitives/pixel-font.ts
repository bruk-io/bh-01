/**
 * 3×5 bitmap pixel font.
 *
 * Each glyph is 5 rows of 3-bit values (0–7), where set bits map to lit pixels.
 * Row 0 is the top. Bit 2 = left, bit 1 = center, bit 0 = right.
 *
 * Example: "A" = [0b010, 0b101, 0b111, 0b101, 0b101]
 */

/** Glyph lookup — uppercase A-Z, 0-9, space, and common symbols. */
export const PIXEL_FONT: Record<string, number[]> = {
  A: [0b010, 0b101, 0b111, 0b101, 0b101],
  B: [0b110, 0b101, 0b110, 0b101, 0b110],
  C: [0b011, 0b100, 0b100, 0b100, 0b011],
  D: [0b110, 0b101, 0b101, 0b101, 0b110],
  E: [0b111, 0b100, 0b110, 0b100, 0b111],
  F: [0b111, 0b100, 0b110, 0b100, 0b100],
  G: [0b011, 0b100, 0b101, 0b101, 0b011],
  H: [0b101, 0b101, 0b111, 0b101, 0b101],
  I: [0b111, 0b010, 0b010, 0b010, 0b111],
  J: [0b001, 0b001, 0b001, 0b101, 0b010],
  K: [0b101, 0b101, 0b110, 0b101, 0b101],
  L: [0b100, 0b100, 0b100, 0b100, 0b111],
  M: [0b101, 0b111, 0b101, 0b101, 0b101],
  N: [0b101, 0b111, 0b111, 0b101, 0b101],
  O: [0b010, 0b101, 0b101, 0b101, 0b010],
  P: [0b110, 0b101, 0b110, 0b100, 0b100],
  Q: [0b010, 0b101, 0b101, 0b111, 0b011],
  R: [0b110, 0b101, 0b110, 0b101, 0b101],
  S: [0b011, 0b100, 0b010, 0b001, 0b110],
  T: [0b111, 0b010, 0b010, 0b010, 0b010],
  U: [0b101, 0b101, 0b101, 0b101, 0b010],
  V: [0b101, 0b101, 0b101, 0b010, 0b010],
  W: [0b101, 0b101, 0b101, 0b111, 0b101],
  X: [0b101, 0b101, 0b010, 0b101, 0b101],
  Y: [0b101, 0b101, 0b010, 0b010, 0b010],
  Z: [0b111, 0b001, 0b010, 0b100, 0b111],

  '0': [0b111, 0b101, 0b101, 0b101, 0b111],
  '1': [0b010, 0b110, 0b010, 0b010, 0b111],
  '2': [0b110, 0b001, 0b010, 0b100, 0b111],
  '3': [0b110, 0b001, 0b010, 0b001, 0b110],
  '4': [0b101, 0b101, 0b111, 0b001, 0b001],
  '5': [0b111, 0b100, 0b110, 0b001, 0b110],
  '6': [0b011, 0b100, 0b111, 0b101, 0b111],
  '7': [0b111, 0b001, 0b010, 0b010, 0b010],
  '8': [0b111, 0b101, 0b010, 0b101, 0b111],
  '9': [0b111, 0b101, 0b111, 0b001, 0b110],

  ' ': [0b000, 0b000, 0b000, 0b000, 0b000],
  ':': [0b000, 0b010, 0b000, 0b010, 0b000],
  '.': [0b000, 0b000, 0b000, 0b000, 0b010],
  '%': [0b101, 0b001, 0b010, 0b100, 0b101],
  '/': [0b001, 0b001, 0b010, 0b100, 0b100],
  '-': [0b000, 0b000, 0b111, 0b000, 0b000],
  '!': [0b010, 0b010, 0b010, 0b000, 0b010],
  '+': [0b000, 0b010, 0b111, 0b010, 0b000],
};

/**
 * Render text into a flat row-major pixel grid.
 *
 * Characters are laid out left-to-right with 1 column of spacing between glyphs.
 * Unknown characters are skipped. Text is uppercased automatically.
 *
 * @param text - The string to render
 * @param cols - Grid width in pixels
 * @param rows - Grid height in pixels (must be >= 5 for the font)
 * @param color - Palette index for lit pixels (default 1 = primary)
 * @returns Flat `Uint8Array` of length `cols * rows`
 */
export function textToGrid(
  text: string,
  cols: number,
  rows: number,
  color: number = 1,
): Uint8Array {
  const grid = new Uint8Array(cols * rows);
  const upper = text.toUpperCase();
  const glyphH = 5;
  const glyphW = 3;
  const spacing = 1;

  // Vertical centering
  const yOffset = Math.max(0, Math.floor((rows - glyphH) / 2));

  let cursor = 0;
  for (const char of upper) {
    const glyph = PIXEL_FONT[char];
    if (!glyph) continue;

    for (let row = 0; row < glyphH; row++) {
      const bits = glyph[row];
      for (let col = 0; col < glyphW; col++) {
        const bit = (bits >> (glyphW - 1 - col)) & 1;
        if (bit) {
          const px = cursor + col;
          const py = yOffset + row;
          if (px < cols && py < rows) {
            grid[py * cols + px] = color;
          }
        }
      }
    }
    cursor += glyphW + spacing;
    if (cursor >= cols) break;
  }

  return grid;
}
