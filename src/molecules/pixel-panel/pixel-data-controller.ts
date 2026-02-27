import type { ReactiveController, ReactiveControllerHost } from 'lit';
import { sparklineToGrid, barToGrid } from '../../primitives/pixel-renderers.js';
import { textToGrid } from '../../primitives/pixel-font.js';

export type PixelDataType = 'sparkline' | 'bar' | 'text' | 'raw';

export interface PixelDataControllerOptions {
  cols: number;
  rows: number;
  type: PixelDataType;
  color?: number;
  bufferSize?: number;
}

/**
 * Manage pixel data buffering and grid generation.
 *
 * Push numeric values in; get a ready-to-render Uint8Array out.
 * Delegates to existing sparklineToGrid / barToGrid / textToGrid utilities.
 */
export class PixelDataController implements ReactiveController {
  private _host: ReactiveControllerHost;
  private _cols: number;
  private _rows: number;
  private _type: PixelDataType;
  private _color: number;
  private _bufferSize: number;
  private _buffer: number[] = [];
  private _text = '';
  private _grid: Uint8Array;

  constructor(host: ReactiveControllerHost, opts: PixelDataControllerOptions) {
    this._host = host;
    this._cols = opts.cols;
    this._rows = opts.rows;
    this._type = opts.type;
    this._color = opts.color ?? 1;
    this._bufferSize = opts.bufferSize ?? opts.cols;
    this._grid = new Uint8Array(opts.cols * opts.rows);
    host.addController(this);
  }

  hostConnected() {}
  hostDisconnected() {}

  get grid(): Uint8Array {
    return this._grid;
  }

  get latest(): number | undefined {
    return this._buffer.length > 0
      ? this._buffer[this._buffer.length - 1]
      : undefined;
  }

  get values(): readonly number[] {
    return this._buffer.slice();
  }

  push(value: number): void {
    this._buffer.push(value);
    if (this._buffer.length > this._bufferSize) {
      this._buffer = this._buffer.slice(this._buffer.length - this._bufferSize);
    }
    this._regenerate();
  }

  set(values: number[]): void {
    this._buffer = values.slice(-this._bufferSize);
    this._regenerate();
  }

  setText(text: string): void {
    this._text = text;
    this._regenerate();
  }

  setGrid(grid: Uint8Array): void {
    this._applyGrid(grid);
  }

  resize(cols: number, rows: number): void {
    this._cols = cols;
    this._rows = rows;
    this._grid = new Uint8Array(cols * rows);
    this._regenerate();
  }

  configure(opts: Partial<PixelDataControllerOptions>): void {
    let needsRegen = false;

    if (opts.cols !== undefined && opts.cols !== this._cols) {
      this._cols = opts.cols;
      needsRegen = true;
    }
    if (opts.rows !== undefined && opts.rows !== this._rows) {
      this._rows = opts.rows;
      needsRegen = true;
    }
    if (opts.type !== undefined && opts.type !== this._type) {
      this._type = opts.type;
      needsRegen = true;
    }
    if (opts.color !== undefined && opts.color !== this._color) {
      this._color = opts.color;
      needsRegen = true;
    }
    if (opts.bufferSize !== undefined && opts.bufferSize !== this._bufferSize) {
      this._bufferSize = opts.bufferSize;
      if (this._buffer.length > this._bufferSize) {
        this._buffer = this._buffer.slice(this._buffer.length - this._bufferSize);
      }
      needsRegen = true;
    }

    if (needsRegen) {
      this._grid = new Uint8Array(this._cols * this._rows);
      this._regenerate();
    }
  }

  private _regenerate(): void {
    const { _cols: cols, _rows: rows, _color: color, _type: type } = this;
    if (cols === 0 || rows === 0) return;

    let next: Uint8Array;
    switch (type) {
      case 'sparkline':
        next = sparklineToGrid(this._buffer, cols, rows, color);
        break;
      case 'bar':
        next = barToGrid(this._buffer.length > 0 ? this._buffer[this._buffer.length - 1] : 0, cols, rows, color);
        break;
      case 'text':
        next = textToGrid(this._text, cols, rows, color);
        break;
      case 'raw':
        return; // raw mode only uses setGrid
    }

    this._applyGrid(next!);
  }

  private _applyGrid(next: Uint8Array): void {
    const prev = this._grid;
    const len = Math.min(prev.length, next.length);
    let changed = prev.length !== next.length;

    if (!changed) {
      for (let i = 0; i < len; i++) {
        if (prev[i] !== next[i]) {
          changed = true;
          break;
        }
      }
    }

    if (changed) {
      this._grid = next;
      this._host.requestUpdate();
    }
  }
}
