export type PerfScenarioName =
  | 'large_list_render'
  | 'large_list_toggle'
  | 'large_list_scroll'
  | 'deep_tree_render'
  | 'deep_tree_toggle'
  | 'deep_tree_scroll';

export type PerfRunResult = {
  /**
   * Free-form label to identify the run in exported datasets.
   * Suggested values: branch name (e.g. "bpk-layout-PoC-control" / "CLOV-990")
   */
  label?: string;
  scenario: PerfScenarioName;
  ts: number;
  userAgent: string;
  iterations: number;
  warmupIterations: number;
  // Measures are in milliseconds unless specified.
  measures: Record<string, number[]>;
  longTasks?: {
    count: number;
    totalMs: number;
    maxMs: number;
  };
  raf?: {
    frames: number;
    jankFrames: number;
    maxFrameMs: number;
    p95FrameMs: number;
  };
};

const now = () => performance.now();

const percentile = (values: number[], p: number) => {
  if (values.length === 0) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const idx = Math.min(sorted.length - 1, Math.max(0, Math.ceil((p / 100) * sorted.length) - 1));
  return sorted[idx];
};

export class PerfCollector {
  private longTaskObserver: PerformanceObserver | null = null;
  private longTaskTotal = 0;
  private longTaskCount = 0;
  private longTaskMax = 0;

  private rafFrames: number[] = [];
  private rafRunning = false;
  private rafLastTs = 0;
  private rafHandle = 0;

  public startLongTasks() {
    // Long Tasks API is not available in all environments.
    if (typeof PerformanceObserver === 'undefined') return;
    try {
      this.longTaskObserver = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          // entry.duration is ms
          this.longTaskCount += 1;
          this.longTaskTotal += entry.duration;
          this.longTaskMax = Math.max(this.longTaskMax, entry.duration);
        });
      });
      this.longTaskObserver.observe({ entryTypes: ['longtask'] as any });
    } catch {
      // ignore
    }
  }

  public stopLongTasks() {
    this.longTaskObserver?.disconnect();
    this.longTaskObserver = null;
  }

  public startRaf() {
    this.rafFrames = [];
    this.rafRunning = true;
    this.rafLastTs = 0;

    const loop = (ts: number) => {
      if (!this.rafRunning) return;
      if (this.rafLastTs !== 0) {
        this.rafFrames.push(ts - this.rafLastTs);
      }
      this.rafLastTs = ts;
      this.rafHandle = requestAnimationFrame(loop);
    };
    this.rafHandle = requestAnimationFrame(loop);
  }

  public stopRaf() {
    this.rafRunning = false;
    if (this.rafHandle) cancelAnimationFrame(this.rafHandle);
  }

  public snapshotLongTasks(): PerfRunResult['longTasks'] {
    return {
      count: this.longTaskCount,
      totalMs: this.longTaskTotal,
      maxMs: this.longTaskMax,
    };
  }

  public snapshotRaf(): PerfRunResult['raf'] {
    const maxFrameMs = this.rafFrames.length ? Math.max(...this.rafFrames) : 0;
    const p95FrameMs = percentile(this.rafFrames, 95);
    // “Jank” heuristic: frames slower than 32ms (~2 frames at 60hz).
    const jankFrames = this.rafFrames.filter((d) => d > 32).length;
    return {
      frames: this.rafFrames.length,
      jankFrames,
      maxFrameMs,
      p95FrameMs,
    };
  }
}

export const waitForNextFrame = async (count = 2) => {
  for (let i = 0; i < count; i += 1) {
    await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
  }
};

export const sleep = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

export const measure = async <T>(
  name: string,
  fn: () => Promise<T>,
  measures: Record<string, number[]>,
): Promise<T> => {
  const start = now();
  const res = await fn();
  const dur = now() - start;
  if (!measures[name]) measures[name] = [];
  measures[name].push(dur);
  return res;
};


