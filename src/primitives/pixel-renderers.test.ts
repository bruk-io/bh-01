import { expect } from '@open-wc/testing';
import { sparklineToGrid, barToGrid, compositeGrids } from './pixel-renderers.js';

describe('sparklineToGrid', () => {
  it('returns a Uint8Array of correct length', () => {
    const grid = sparklineToGrid([1, 2, 3], 10, 5);
    expect(grid).to.be.instanceOf(Uint8Array);
    expect(grid.length).to.equal(50);
  });

  it('returns all zeros for empty values', () => {
    const grid = sparklineToGrid([], 10, 5);
    expect(Array.from(grid).every((v) => v === 0)).to.be.true;
  });

  it('right-aligns values', () => {
    // 3 values in a 5-col grid: values should be in cols 2, 3, 4
    const grid = sparklineToGrid([1, 0, 1], 5, 3);
    // Value 1 (max) should light bottom-to-top at col 2
    const bottomRow = 2;
    expect(grid[bottomRow * 5 + 2]).to.equal(1); // first value, rightmost position
    expect(grid[bottomRow * 5 + 4]).to.equal(1); // third value
  });

  it('normalizes values to max', () => {
    // [50, 100] in 5 rows: max=100, so 50 fills ~half
    const grid = sparklineToGrid([50, 100], 2, 5);
    // Right-aligned: col 0 = 50, col 1 = 100
    // Max value fills all 5 rows (height = 4, so rows 0-4 lit)
    expect(grid[0 * 2 + 1]).to.equal(1); // top of full bar
    expect(grid[4 * 2 + 1]).to.equal(1); // bottom of full bar
  });

  it('handles all-zero values', () => {
    const grid = sparklineToGrid([0, 0, 0], 5, 5);
    // All zeros => all off (normalized to 0)
    expect(Array.from(grid).every((v) => v === 0)).to.be.true;
  });

  it('uses custom color', () => {
    const grid = sparklineToGrid([1], 1, 3, 2);
    const lit = Array.from(grid).filter((v) => v !== 0);
    expect(lit.length).to.be.greaterThan(0);
    for (const px of lit) {
      expect(px).to.equal(2);
    }
  });

  it('truncates when more values than columns', () => {
    const grid = sparklineToGrid([1, 2, 3, 4, 5], 3, 3);
    expect(grid.length).to.equal(9);
    // Should only show last 3 values
  });

  it('handles zero rows/cols', () => {
    expect(sparklineToGrid([1], 0, 5).length).to.equal(0);
    expect(sparklineToGrid([1], 5, 0).length).to.equal(0);
  });
});

describe('barToGrid', () => {
  it('returns a Uint8Array of correct length', () => {
    const grid = barToGrid(50, 10, 3);
    expect(grid).to.be.instanceOf(Uint8Array);
    expect(grid.length).to.equal(30);
  });

  it('fills correct number of columns for 50%', () => {
    const grid = barToGrid(50, 10, 3);
    const midRow = 1; // floor(3/2)
    let filled = 0;
    for (let c = 0; c < 10; c++) {
      if (grid[midRow * 10 + c] !== 0) filled++;
    }
    expect(filled).to.equal(5);
  });

  it('fills all columns at 100%', () => {
    const grid = barToGrid(100, 10, 3);
    const midRow = 1;
    for (let c = 0; c < 10; c++) {
      expect(grid[midRow * 10 + c]).to.equal(1);
    }
  });

  it('fills no columns at 0%', () => {
    const grid = barToGrid(0, 10, 3);
    expect(Array.from(grid).every((v) => v === 0)).to.be.true;
  });

  it('clamps values above 100', () => {
    const grid = barToGrid(150, 10, 3);
    const midRow = 1;
    let filled = 0;
    for (let c = 0; c < 10; c++) {
      if (grid[midRow * 10 + c] !== 0) filled++;
    }
    expect(filled).to.equal(10);
  });

  it('clamps negative values to 0', () => {
    const grid = barToGrid(-50, 10, 3);
    expect(Array.from(grid).every((v) => v === 0)).to.be.true;
  });

  it('uses custom color', () => {
    const grid = barToGrid(100, 5, 1, 4);
    for (let c = 0; c < 5; c++) {
      expect(grid[c]).to.equal(4);
    }
  });

  it('handles zero rows/cols', () => {
    expect(barToGrid(50, 0, 5).length).to.equal(0);
    expect(barToGrid(50, 5, 0).length).to.equal(0);
  });
});

describe('compositeGrids', () => {
  it('returns a copy of base when no overlays', () => {
    const base = new Uint8Array([1, 0, 1, 0]);
    const result = compositeGrids(base);
    expect(Array.from(result)).to.deep.equal([1, 0, 1, 0]);
    // Should be a new array, not the same reference
    expect(result).to.not.equal(base);
  });

  it('overlays non-zero values', () => {
    const base = new Uint8Array([1, 1, 1, 1]);
    const overlay = new Uint8Array([0, 2, 0, 3]);
    const result = compositeGrids(base, overlay);
    expect(Array.from(result)).to.deep.equal([1, 2, 1, 3]);
  });

  it('preserves base where overlay is zero', () => {
    const base = new Uint8Array([1, 2, 3, 4]);
    const overlay = new Uint8Array([0, 0, 0, 0]);
    const result = compositeGrids(base, overlay);
    expect(Array.from(result)).to.deep.equal([1, 2, 3, 4]);
  });

  it('applies multiple overlays in order', () => {
    const base = new Uint8Array([0, 0, 0]);
    const first = new Uint8Array([1, 0, 0]);
    const second = new Uint8Array([2, 2, 0]);
    const result = compositeGrids(base, first, second);
    // second overwrites first at index 0
    expect(Array.from(result)).to.deep.equal([2, 2, 0]);
  });

  it('handles overlays shorter than base', () => {
    const base = new Uint8Array([1, 1, 1, 1]);
    const overlay = new Uint8Array([2, 2]);
    const result = compositeGrids(base, overlay);
    expect(Array.from(result)).to.deep.equal([2, 2, 1, 1]);
  });

  it('does not mutate the original base', () => {
    const base = new Uint8Array([1, 2, 3]);
    const overlay = new Uint8Array([4, 0, 4]);
    compositeGrids(base, overlay);
    expect(Array.from(base)).to.deep.equal([1, 2, 3]);
  });
});
