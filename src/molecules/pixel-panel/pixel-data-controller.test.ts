import { expect } from '@open-wc/testing';
import { PixelDataController } from './pixel-data-controller.js';
import type { ReactiveControllerHost } from 'lit';

function mockHost() {
  let updateCount = 0;
  const host: ReactiveControllerHost & { updateCount: number } = {
    addController() {},
    removeController() {},
    requestUpdate() {
      updateCount++;
    },
    get updateComplete() {
      return Promise.resolve(true);
    },
    get updateCount() {
      return updateCount;
    },
  };
  return host;
}

describe('PixelDataController', () => {
  describe('initialization', () => {
    it('creates a grid of correct size', () => {
      const host = mockHost();
      const ctrl = new PixelDataController(host, {
        cols: 10,
        rows: 5,
        type: 'sparkline',
      });
      expect(ctrl.grid).to.be.instanceOf(Uint8Array);
      expect(ctrl.grid.length).to.equal(50);
    });

    it('starts with empty buffer', () => {
      const host = mockHost();
      const ctrl = new PixelDataController(host, {
        cols: 10,
        rows: 5,
        type: 'sparkline',
      });
      expect(ctrl.latest).to.be.undefined;
      expect(ctrl.values).to.deep.equal([]);
    });

    it('starts with all-zero grid', () => {
      const host = mockHost();
      const ctrl = new PixelDataController(host, {
        cols: 5,
        rows: 3,
        type: 'sparkline',
      });
      expect(Array.from(ctrl.grid).every((v) => v === 0)).to.be.true;
    });
  });

  describe('push', () => {
    it('updates latest value', () => {
      const host = mockHost();
      const ctrl = new PixelDataController(host, {
        cols: 10,
        rows: 5,
        type: 'sparkline',
      });
      ctrl.push(42);
      expect(ctrl.latest).to.equal(42);
    });

    it('appends to buffer', () => {
      const host = mockHost();
      const ctrl = new PixelDataController(host, {
        cols: 10,
        rows: 5,
        type: 'sparkline',
      });
      ctrl.push(1);
      ctrl.push(2);
      ctrl.push(3);
      expect(ctrl.values).to.deep.equal([1, 2, 3]);
    });

    it('trims buffer to bufferSize', () => {
      const host = mockHost();
      const ctrl = new PixelDataController(host, {
        cols: 3,
        rows: 5,
        type: 'sparkline',
        bufferSize: 3,
      });
      ctrl.push(1);
      ctrl.push(2);
      ctrl.push(3);
      ctrl.push(4);
      expect(ctrl.values).to.deep.equal([2, 3, 4]);
    });

    it('defaults bufferSize to cols', () => {
      const host = mockHost();
      const ctrl = new PixelDataController(host, {
        cols: 2,
        rows: 3,
        type: 'sparkline',
      });
      ctrl.push(1);
      ctrl.push(2);
      ctrl.push(3);
      expect(ctrl.values).to.deep.equal([2, 3]);
    });

    it('calls requestUpdate on grid change', () => {
      const host = mockHost();
      const ctrl = new PixelDataController(host, {
        cols: 5,
        rows: 3,
        type: 'sparkline',
      });
      ctrl.push(50);
      expect(host.updateCount).to.be.greaterThan(0);
    });

    it('does not call requestUpdate when grid is unchanged', () => {
      const host = mockHost();
      const ctrl = new PixelDataController(host, {
        cols: 5,
        rows: 3,
        type: 'sparkline',
      });
      // Push zero — grid stays all zeros
      ctrl.push(0);
      const countAfterFirstPush = host.updateCount;
      ctrl.push(0);
      expect(host.updateCount).to.equal(countAfterFirstPush);
    });
  });

  describe('set', () => {
    it('replaces buffer entirely', () => {
      const host = mockHost();
      const ctrl = new PixelDataController(host, {
        cols: 5,
        rows: 3,
        type: 'sparkline',
      });
      ctrl.push(1);
      ctrl.set([10, 20, 30]);
      expect(ctrl.values).to.deep.equal([10, 20, 30]);
    });

    it('trims to bufferSize', () => {
      const host = mockHost();
      const ctrl = new PixelDataController(host, {
        cols: 3,
        rows: 3,
        type: 'sparkline',
        bufferSize: 2,
      });
      ctrl.set([10, 20, 30]);
      expect(ctrl.values).to.deep.equal([20, 30]);
    });
  });

  describe('setText', () => {
    it('generates text grid', () => {
      const host = mockHost();
      const ctrl = new PixelDataController(host, {
        cols: 20,
        rows: 5,
        type: 'text',
      });
      ctrl.setText('HI');
      const grid = ctrl.grid;
      // "HI" should produce some non-zero pixels
      const lit = Array.from(grid).filter((v) => v !== 0);
      expect(lit.length).to.be.greaterThan(0);
    });
  });

  describe('setGrid', () => {
    it('sets raw grid directly', () => {
      const host = mockHost();
      const ctrl = new PixelDataController(host, {
        cols: 3,
        rows: 2,
        type: 'raw',
      });
      const raw = new Uint8Array([1, 0, 2, 0, 3, 0]);
      ctrl.setGrid(raw);
      expect(Array.from(ctrl.grid)).to.deep.equal([1, 0, 2, 0, 3, 0]);
    });

    it('calls requestUpdate on change', () => {
      const host = mockHost();
      const ctrl = new PixelDataController(host, {
        cols: 2,
        rows: 2,
        type: 'raw',
      });
      ctrl.setGrid(new Uint8Array([1, 1, 1, 1]));
      expect(host.updateCount).to.be.greaterThan(0);
    });
  });

  describe('sparkline grid generation', () => {
    it('generates correct sparkline grid', () => {
      const host = mockHost();
      const ctrl = new PixelDataController(host, {
        cols: 5,
        rows: 3,
        type: 'sparkline',
      });
      ctrl.set([100, 50, 100]);
      const grid = ctrl.grid;
      expect(grid.length).to.equal(15);
      // Rightmost column (4) should be lit at bottom
      expect(grid[2 * 5 + 4]).to.equal(1);
    });
  });

  describe('bar grid generation', () => {
    it('generates bar grid from latest value', () => {
      const host = mockHost();
      const ctrl = new PixelDataController(host, {
        cols: 10,
        rows: 3,
        type: 'bar',
      });
      ctrl.push(50);
      const grid = ctrl.grid;
      const midRow = 1;
      let filled = 0;
      for (let c = 0; c < 10; c++) {
        if (grid[midRow * 10 + c] !== 0) filled++;
      }
      expect(filled).to.equal(5);
    });
  });

  describe('resize', () => {
    it('updates grid dimensions', () => {
      const host = mockHost();
      const ctrl = new PixelDataController(host, {
        cols: 5,
        rows: 3,
        type: 'sparkline',
      });
      ctrl.resize(10, 7);
      expect(ctrl.grid.length).to.equal(70);
    });

    it('regenerates grid after resize', () => {
      const host = mockHost();
      const ctrl = new PixelDataController(host, {
        cols: 5,
        rows: 3,
        type: 'sparkline',
      });
      ctrl.push(100);
      ctrl.resize(10, 7);
      const lit = Array.from(ctrl.grid).filter((v) => v !== 0);
      expect(lit.length).to.be.greaterThan(0);
    });
  });

  describe('configure', () => {
    it('batch-updates options', () => {
      const host = mockHost();
      const ctrl = new PixelDataController(host, {
        cols: 5,
        rows: 3,
        type: 'sparkline',
      });
      ctrl.configure({ cols: 10, rows: 5, color: 2 });
      expect(ctrl.grid.length).to.equal(50);
    });

    it('does not regenerate when nothing changes', () => {
      const host = mockHost();
      const ctrl = new PixelDataController(host, {
        cols: 5,
        rows: 3,
        type: 'sparkline',
      });
      const countBefore = host.updateCount;
      ctrl.configure({ cols: 5, rows: 3 });
      expect(host.updateCount).to.equal(countBefore);
    });

    it('trims buffer when bufferSize shrinks', () => {
      const host = mockHost();
      const ctrl = new PixelDataController(host, {
        cols: 5,
        rows: 3,
        type: 'sparkline',
        bufferSize: 5,
      });
      ctrl.set([1, 2, 3, 4, 5]);
      ctrl.configure({ bufferSize: 3 });
      expect(ctrl.values).to.deep.equal([3, 4, 5]);
    });

    it('preserves buffer on type change', () => {
      const host = mockHost();
      const ctrl = new PixelDataController(host, {
        cols: 10,
        rows: 3,
        type: 'sparkline',
      });
      ctrl.set([10, 50, 80]);
      ctrl.configure({ type: 'bar' });
      expect(ctrl.values).to.deep.equal([10, 50, 80]);
    });
  });

  describe('values getter', () => {
    it('returns a copy, not the internal buffer', () => {
      const host = mockHost();
      const ctrl = new PixelDataController(host, {
        cols: 5,
        rows: 3,
        type: 'sparkline',
      });
      ctrl.set([1, 2, 3]);
      const copy = ctrl.values;
      expect(copy).to.deep.equal([1, 2, 3]);
      // Mutating the copy should not affect the controller
      (copy as number[]).push(4);
      expect(ctrl.values).to.deep.equal([1, 2, 3]);
    });
  });

  describe('custom color', () => {
    it('uses specified palette index', () => {
      const host = mockHost();
      const ctrl = new PixelDataController(host, {
        cols: 5,
        rows: 3,
        type: 'sparkline',
        color: 3,
      });
      ctrl.push(100);
      const lit = Array.from(ctrl.grid).filter((v) => v !== 0);
      expect(lit.length).to.be.greaterThan(0);
      for (const px of lit) {
        expect(px).to.equal(3);
      }
    });
  });
});
