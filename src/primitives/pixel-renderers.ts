/**
 * Pixel grid rendering utilities.
 *
 * All functions produce a flat `Uint8Array` of length `cols * rows` (row-major).
 * Each byte is a palette index: 0 = off, 1 = primary, 2 = success, 3 = warning, 4 = danger.
 * Pixel at (col, row) = `data[row * cols + col]`.
 */

/**
 * Render a right-aligned sparkline chart.
 *
 * Values are normalized to the 0–1 range based on the max value in the array.
 * The most recent value appears at the rightmost column.
 *
 * @param values - Numeric data points
 * @param cols - Grid width
 * @param rows - Grid height
 * @param color - Palette index for lit pixels (default 1)
 */
export function sparklineToGrid(
  values: number[],
  cols: number,
  rows: number,
  color: number = 1,
): Uint8Array {
  const grid = new Uint8Array(cols * rows);
  if (values.length === 0 || rows === 0 || cols === 0) return grid;

  const max = Math.max(...values);
  const normalized = max > 0 ? values.map((v) => v / max) : values.map(() => 0);

  // Right-align: take the last `cols` values
  const start = Math.max(0, normalized.length - cols);
  const visible = normalized.slice(start);
  const colOffset = cols - visible.length;

  for (let i = 0; i < visible.length; i++) {
    if (visible[i] === 0) continue;
    const height = Math.round(visible[i] * (rows - 1));
    for (let h = 0; h <= height; h++) {
      const row = rows - 1 - h;
      grid[row * cols + (colOffset + i)] = color;
    }
  }

  return grid;
}

/**
 * Render a horizontal fill bar.
 *
 * Fills pixels from left to right based on the percentage.
 * The bar is vertically centered and 1 pixel tall.
 *
 * @param percent - Fill percentage (0–100)
 * @param cols - Grid width
 * @param rows - Grid height
 * @param color - Palette index for lit pixels (default 1)
 */
export function barToGrid(
  percent: number,
  cols: number,
  rows: number,
  color: number = 1,
): Uint8Array {
  const grid = new Uint8Array(cols * rows);
  if (rows === 0 || cols === 0) return grid;

  const clamped = Math.max(0, Math.min(100, percent));
  const fillCols = Math.round((clamped / 100) * cols);
  const midRow = Math.floor(rows / 2);

  for (let col = 0; col < fillCols; col++) {
    grid[midRow * cols + col] = color;
  }

  return grid;
}

/**
 * Layer multiple grids together. Non-zero values in overlays overwrite the base.
 *
 * All grids must have the same length. If lengths differ, the shorter grid is used
 * up to its length (excess in base is preserved).
 *
 * @param base - The bottom-layer grid
 * @param overlays - Additional grids to layer on top (in order)
 * @returns A new `Uint8Array` with the composited result
 */
export function compositeGrids(
  base: Uint8Array,
  ...overlays: Uint8Array[]
): Uint8Array {
  const result = new Uint8Array(base);
  for (const overlay of overlays) {
    const len = Math.min(result.length, overlay.length);
    for (let i = 0; i < len; i++) {
      if (overlay[i] !== 0) {
        result[i] = overlay[i];
      }
    }
  }
  return result;
}
