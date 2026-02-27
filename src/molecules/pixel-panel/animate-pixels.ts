import { AsyncDirective } from 'lit/async-directive.js';
import { directive, type PartInfo } from 'lit/directive.js';
import { noChange } from 'lit';

export type PixelTransition = 'step' | 'sweep';

export interface AnimatePixelsOptions {
  transition?: PixelTransition;
  fps?: number;
  cols?: number;
}

/**
 * Directive that manages visual transitions between pixel grid states.
 *
 * Used in property bindings: `.data=${animatePixels(grid, opts)}`
 *
 * - **step**: Pass-through with fps throttle. The pixel-display CSS transition
 *   smooths individual pixel changes already.
 * - **sweep**: Left-to-right column reveal over ~0.3s. Produces intermediate
 *   frames via rAF until the sweep completes.
 */
class AnimatePixelsDirective extends AsyncDirective {
  private _current?: Uint8Array;
  private _target?: Uint8Array;
  private _fps = 12;
  private _cols = 0;

  // Sweep state
  private _sweepCursor = 0;
  private _sweepSpeed = 1;
  private _prev?: Uint8Array;
  private _rafId = 0;

  // Step throttle state
  private _pending = false;
  private _stepRafId = 0;

  constructor(partInfo: PartInfo) {
    super(partInfo);
  }

  render(grid: Uint8Array, opts?: AnimatePixelsOptions): Uint8Array | typeof noChange {
    const transition = opts?.transition ?? 'step';
    const fps = opts?.fps ?? 12;
    const cols = opts?.cols ?? 0;

    this._fps = fps;
    this._cols = cols;

    if (transition === 'sweep' && cols > 0) {
      return this._handleSweep(grid);
    }
    return this._handleStep(grid);
  }

  private _handleStep(grid: Uint8Array): Uint8Array | typeof noChange {
    // First render — always pass through
    if (!this._current) {
      this._current = grid;
      return grid;
    }

    // Same reference — no change
    if (grid === this._current) {
      return noChange;
    }

    // Throttle: if we already have a pending frame, just update the target
    this._target = grid;

    if (this._pending) {
      return noChange;
    }

    this._pending = true;
    this._stepRafId = requestAnimationFrame(() => {
      this._stepRafId = 0;
      this._pending = false;
      const latest = this._target!;
      this._current = latest;
      this._target = undefined;
      this.setValue(latest);
    });

    return noChange;
  }

  private _handleSweep(grid: Uint8Array): Uint8Array | typeof noChange {
    // First render — pass through
    if (!this._current) {
      this._current = grid;
      return grid;
    }

    // Same reference — no change
    if (grid === this._current) {
      return noChange;
    }

    // New target: start sweep
    this._cancelSweep();
    this._prev = this._current;
    this._target = grid;
    this._sweepCursor = 0;
    this._sweepSpeed = Math.ceil(this._cols / Math.ceil(0.3 * this._fps));
    this._tickSweep();

    return noChange;
  }

  private _tickSweep = (): void => {
    if (!this._target || !this._prev) return;

    this._sweepCursor += this._sweepSpeed;
    const cols = this._cols;
    const rows = this._target.length / cols;

    if (this._sweepCursor >= cols) {
      // Sweep complete
      this._current = this._target;
      this.setValue(this._target);
      this._prev = undefined;
      this._target = undefined;
      this._rafId = 0;
      return;
    }

    // Build intermediate frame
    const intermediate = new Uint8Array(this._target.length);
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const idx = row * cols + col;
        intermediate[idx] = col < this._sweepCursor
          ? this._target[idx]
          : this._prev[idx];
      }
    }

    this.setValue(intermediate);
    this._rafId = requestAnimationFrame(this._tickSweep);
  };

  private _cancelSweep(): void {
    if (this._rafId) {
      cancelAnimationFrame(this._rafId);
      this._rafId = 0;
    }
  }

  protected override disconnected(): void {
    this._cancelSweep();
    if (this._stepRafId) {
      cancelAnimationFrame(this._stepRafId);
      this._stepRafId = 0;
    }
  }

  protected override reconnected(): void {
    // Resume mid-sweep if applicable
    if (this._target && this._prev && this._sweepCursor < this._cols) {
      this._rafId = requestAnimationFrame(this._tickSweep);
    }
  }
}

export const animatePixels = directive(AnimatePixelsDirective);
export type { AnimatePixelsDirective };
