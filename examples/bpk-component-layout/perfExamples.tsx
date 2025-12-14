import type { ReactNode } from 'react';
import React, { useEffect, useMemo, useRef, useState } from 'react';

import {
  BpkBox,
  BpkFlex,
  BpkGrid,
  BpkProvider,
  BpkSpacing,
} from '../../packages/bpk-component-layout';

import STYLES from './perfExamples.module.scss';
import { measure, PerfCollector, type PerfRunResult, sleep, waitForNextFrame } from './perfRunner';

type WindowWithPerf = Window & {
  __bpkLayoutPerf?: {
    runLargeList: (opts?: Partial<LargeListPerfOptions>) => Promise<PerfRunResult>;
    runDeepTree: (opts?: Partial<DeepTreePerfOptions>) => Promise<PerfRunResult>;
    exportJsonl?: () => string;
    downloadAll?: () => void;
    clearStored?: () => void;
    last?: PerfRunResult;
  };
};

const STORAGE_KEY = 'bpk-layout-perf-results/v1';
const LABEL_KEY = 'bpk-layout-perf-label';

type AutorunParams = {
  autorun: boolean;
  runs: number;
  clear: boolean;
  download: boolean;
  label?: string;
};

const parseAutorunParams = (): AutorunParams => {
  const params = new URLSearchParams(window.location.search);
  const autorunRaw = params.get('autorun');
  const autorun = autorunRaw === '1' || autorunRaw === 'true';
  const runs = Math.max(0, Number.parseInt(params.get('runs') || '0', 10) || 0);
  const clear = (params.get('clear') || '') === '1' || (params.get('clear') || '') === 'true';
  const download = (params.get('download') || '') === '1' || (params.get('download') || '') === 'true';
  const label = params.get('label') || undefined;
  return { autorun, runs, clear, download, label };
};

const safeParseJson = <T,>(raw: string | null, fallback: T): T => {
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
};

const loadStoredResults = (): PerfRunResult[] => safeParseJson(localStorage.getItem(STORAGE_KEY), []);

const appendStoredResult = (result: PerfRunResult) => {
  const current = loadStoredResults();
  const next = [...current, result];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  return next;
};

const clearStoredResults = () => {
  localStorage.removeItem(STORAGE_KEY);
};

const exportStoredResultsJsonl = () => loadStoredResults().map((r) => JSON.stringify(r)).join('\n');

const downloadText = (filename: string, text: string) => {
  const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  // Let the click start before revoking.
  setTimeout(() => URL.revokeObjectURL(url), 0);
};

const Wrapper = ({ children }: { children: ReactNode }) => (
  <BpkProvider>{children}</BpkProvider>
);

const hash = (i: number) => {
  // deterministic pseudo-random-ish value
  let x = i + 1;
  x ^= x << 13;
  x ^= x >> 17;
  x ^= x << 5;
  return Math.abs(x);
};

type LargeListPerfOptions = {
  rows: number;
  nestedDepth: number;
  scrollMs: number;
  scrollStepPx: number;
  toggleEvery: number; // toggle every N rows
  iterations: number;
  warmupIterations: number;
};

const DEFAULT_LARGE_LIST_OPTS: LargeListPerfOptions = {
  rows: 1500,
  nestedDepth: 6,
  scrollMs: 8000,
  scrollStepPx: 48,
  toggleEvery: 8,
  iterations: 8,
  warmupIterations: 2,
};

type DeepTreePerfOptions = {
  branches: number;
  depth: number;
  scrollMs: number;
  iterations: number;
  warmupIterations: number;
};

const DEFAULT_DEEP_TREE_OPTS: DeepTreePerfOptions = {
  branches: 12,
  depth: 80,
  scrollMs: 8000,
  iterations: 8,
  warmupIterations: 2,
};

const NestedRow = ({
  index,
  depth,
  expanded,
}: {
  index: number;
  depth: number;
  expanded: boolean;
}) => {
  const seed = hash(index);

  // Mix BpkBox/BpkFlex/BpkGrid to approximate real layout composition.
  const content = (
    <BpkGrid
      templateColumns="repeat(3, minmax(0, 1fr))"
      gap={BpkSpacing.SM}
    >
      <BpkBox>
        <span className={STYLES['bpk-layout-perf__pill']}>
          fare {seed % 999}
        </span>
      </BpkBox>
      <BpkBox>
        <span className={STYLES['bpk-layout-perf__pill']}>
          stops {seed % 3}
        </span>
      </BpkBox>
      <BpkBox>
        <span className={STYLES['bpk-layout-perf__pill']}>
          time {seed % 24}:{String(seed % 60).padStart(2, '0')}
        </span>
      </BpkBox>
    </BpkGrid>
  );

  let node: ReactNode = content;
  for (let d = 0; d < depth; d += 1) {
    node = (
      <BpkFlex
        justify="space-between"
        align="center"
        padding={BpkSpacing.SM}
        gap={BpkSpacing.SM}
      >
        <BpkBox width="full">{node}</BpkBox>
        <BpkBox>
          <span className={STYLES['bpk-layout-perf__pill']}>#{index}</span>
        </BpkBox>
      </BpkFlex>
    );
  }

  return (
    <div className={STYLES['bpk-layout-perf__row']}>
      <BpkBox padding={BpkSpacing.SM}>
        <BpkFlex justify="space-between" align="center" gap={BpkSpacing.SM}>
          <BpkBox width="full">
            <div className={STYLES['bpk-layout-perf__rowInner']}>{node}</div>
          </BpkBox>
          <BpkBox>
            <span className={STYLES['bpk-layout-perf__pill']}>
              {expanded ? 'expanded' : 'collapsed'}
            </span>
          </BpkBox>
        </BpkFlex>
      </BpkBox>
      {expanded ? (
        <div className={STYLES['bpk-layout-perf__grid']}>
          <div className={STYLES['bpk-layout-perf__gridCell']}>details A</div>
          <div className={STYLES['bpk-layout-perf__gridCell']}>details B</div>
          <div className={STYLES['bpk-layout-perf__gridCell']}>details C</div>
        </div>
      ) : null}
    </div>
  );
};

const usePerfApi = (
  api: WindowWithPerf['__bpkLayoutPerf'],
  deps: any[] = [],
) => {
  useEffect(() => {
    (window as WindowWithPerf).__bpkLayoutPerf = api;
    return () => {
      const w = window as WindowWithPerf;
      if (w.__bpkLayoutPerf === api) delete w.__bpkLayoutPerf;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
};

export const LargeListPerfExample = () => {
  const [opts, setOpts] = useState<LargeListPerfOptions>(DEFAULT_LARGE_LIST_OPTS);
  const [expandedMap, setExpandedMap] = useState<Record<number, boolean>>({});
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const [busy, setBusy] = useState(false);
  const [label, setLabel] = useState(() => safeParseJson(localStorage.getItem(LABEL_KEY), ''));
  const runRef = useRef<(partial?: Partial<LargeListPerfOptions>) => Promise<PerfRunResult>>(async () => {
    throw new Error('Runner not initialised yet');
  });

  const rows = useMemo(() => Array.from({ length: opts.rows }, (_, i) => i), [opts.rows]);

  const toggleBatch = async () => {
    setExpandedMap((prev) => {
      const next = { ...prev };
      for (let i = 0; i < opts.rows; i += opts.toggleEvery) {
        next[i] = !next[i];
      }
      return next;
    });
    await waitForNextFrame(2);
  };

  const run = async (partial?: Partial<LargeListPerfOptions>): Promise<PerfRunResult> => {
    const runOpts = { ...opts, ...partial };
    setOpts(runOpts);
    setBusy(true);

    // ensure DOM updates apply
    await waitForNextFrame(2);

    const measures: PerfRunResult['measures'] = {};
    const collector = new PerfCollector();
    collector.startLongTasks();

    // Warmup
    for (let i = 0; i < runOpts.warmupIterations; i += 1) {
      await measure('warmup_toggle_ms', toggleBatch, measures);
      await sleep(50);
    }

    // Toggle cost
    for (let i = 0; i < runOpts.iterations; i += 1) {
      await measure('toggle_ms', toggleBatch, measures);
      await sleep(50);
    }

    // Scroll cost + RAF stability
    const viewport = viewportRef.current;
    if (viewport) {
      collector.startRaf();
      await measure(
        'scroll_ms',
        async () => {
          const startTs = performance.now();
          let dir = 1;
          while (performance.now() - startTs < runOpts.scrollMs) {
            viewport.scrollTop += dir * runOpts.scrollStepPx;
            if (viewport.scrollTop <= 0) dir = 1;
            if (viewport.scrollTop + viewport.clientHeight >= viewport.scrollHeight) dir = -1;
            await waitForNextFrame(1);
          }
        },
        measures,
      );
      collector.stopRaf();
    }

    collector.stopLongTasks();
    const result: PerfRunResult = {
      label: label || undefined,
      scenario: 'large_list_scroll',
      ts: Date.now(),
      userAgent: navigator.userAgent,
      iterations: runOpts.iterations,
      warmupIterations: runOpts.warmupIterations,
      measures,
      longTasks: collector.snapshotLongTasks(),
      raf: collector.snapshotRaf(),
    };

    (window as WindowWithPerf).__bpkLayoutPerf = (window as WindowWithPerf).__bpkLayoutPerf || ({} as any);
    (window as WindowWithPerf).__bpkLayoutPerf!.last = result;
    appendStoredResult(result);

    // High-signal console output for copy/paste.
    // eslint-disable-next-line no-console
    console.log('[bpk-layout-perf] result', result);

    setBusy(false);
    return result;
  };

  runRef.current = run;

  useEffect(() => {
    const { autorun, runs, clear, download, label: labelFromUrl } = parseAutorunParams();
    if (labelFromUrl && labelFromUrl !== label) {
      setLabel(labelFromUrl);
      localStorage.setItem(LABEL_KEY, JSON.stringify(labelFromUrl));
    }
    if (clear) clearStoredResults();
    if (!autorun || runs <= 0) return;

    let cancelled = false;
    (async () => {
      // Let the UI mount and settle before running.
      await waitForNextFrame(3);
      for (let i = 0; i < runs; i += 1) {
        if (cancelled) return;
        // eslint-disable-next-line no-await-in-loop
        await runRef.current();
        // eslint-disable-next-line no-await-in-loop
        await sleep(50);
      }
      if (download && !cancelled) {
        const ts = new Date().toISOString().replace(/[:.]/g, '-');
        const fname = `bpk-layout-perf${(labelFromUrl || label) ? `-${labelFromUrl || label}` : ''}-${ts}.jsonl`;
        downloadText(fname, exportStoredResultsJsonl());
      }
    })();

    return () => {
      cancelled = true;
    };
    // Run only once on mount; label is handled via URL parsing above.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  usePerfApi(
    {
      runLargeList: run,
      runDeepTree: async () => {
        throw new Error('DeepTree runner is not available on LargeListPerfExample story.');
      },
      exportJsonl: exportStoredResultsJsonl,
      downloadAll: () => {
        const ts = new Date().toISOString().replace(/[:.]/g, '-');
        const fname = `bpk-layout-perf${label ? `-${label}` : ''}-${ts}.jsonl`;
        downloadText(fname, exportStoredResultsJsonl());
      },
      clearStored: clearStoredResults,
      last: undefined,
    },
    [opts],
  );

  return (
    <Wrapper>
      <div className={STYLES['bpk-layout-perf__controls']}>
        <input
          aria-label="Dataset label (e.g. branch name)"
          value={label}
          onChange={(e) => {
            setLabel(e.target.value);
            localStorage.setItem(LABEL_KEY, JSON.stringify(e.target.value));
          }}
          placeholder="label (e.g. bpk-layout-PoC-control)"
        />
        <button
          type="button"
          className={STYLES['bpk-layout-perf__button']}
          disabled={busy}
          onClick={() => run()}
        >
          Run benchmark (LargeList)
        </button>
        <button
          type="button"
          className={STYLES['bpk-layout-perf__button']}
          disabled={busy}
          onClick={() => {
            const ts = new Date().toISOString().replace(/[:.]/g, '-');
            const fname = `bpk-layout-perf${label ? `-${label}` : ''}-${ts}.jsonl`;
            downloadText(fname, exportStoredResultsJsonl());
          }}
        >
          Download all results (JSONL)
        </button>
        <button
          type="button"
          className={STYLES['bpk-layout-perf__button']}
          disabled={busy}
          onClick={() => clearStoredResults()}
        >
          Clear stored
        </button>
        <p className={STYLES['bpk-layout-perf__note']}>
          Results are auto-saved to localStorage and can be downloaded as JSONL. Use Performance panel to record while running.
        </p>
      </div>
      <div ref={viewportRef} className={STYLES['bpk-layout-perf__viewport']}>
        {rows.map((i) => (
          <NestedRow
            key={i}
            index={i}
            depth={opts.nestedDepth}
            expanded={Boolean(expandedMap[i])}
          />
        ))}
      </div>
    </Wrapper>
  );
};

const DeepNode = ({
  depth,
  index,
  expanded,
}: {
  depth: number;
  index: number;
  expanded: boolean;
}) => {
  if (depth <= 0) {
    return (
      <BpkBox padding={BpkSpacing.SM}>
        <span className={STYLES['bpk-layout-perf__pill']}>
          leaf {index} {expanded ? 'on' : 'off'}
        </span>
      </BpkBox>
    );
  }

  return (
    <BpkFlex gap={BpkSpacing.SM} padding={BpkSpacing.SM} justify="space-between" align="center">
      <BpkBox width="full">
        <DeepNode depth={depth - 1} index={index} expanded={expanded} />
      </BpkBox>
      <BpkBox>
        <span className={STYLES['bpk-layout-perf__pill']}>{depth}</span>
      </BpkBox>
    </BpkFlex>
  );
};

export const DeepTreePerfExample = () => {
  const [opts, setOpts] = useState<DeepTreePerfOptions>(DEFAULT_DEEP_TREE_OPTS);
  const [expanded, setExpanded] = useState(false);
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const [busy, setBusy] = useState(false);
  const [label, setLabel] = useState(() => safeParseJson(localStorage.getItem(LABEL_KEY), ''));
  const runRef = useRef<(partial?: Partial<DeepTreePerfOptions>) => Promise<PerfRunResult>>(async () => {
    throw new Error('Runner not initialised yet');
  });

  const branches = useMemo(() => Array.from({ length: opts.branches }, (_, i) => i), [opts.branches]);

  const toggle = async () => {
    setExpanded((v) => !v);
    await waitForNextFrame(2);
  };

  const run = async (partial?: Partial<DeepTreePerfOptions>): Promise<PerfRunResult> => {
    const runOpts = { ...opts, ...partial };
    setOpts(runOpts);
    setBusy(true);
    await waitForNextFrame(2);

    const measures: PerfRunResult['measures'] = {};
    const collector = new PerfCollector();
    collector.startLongTasks();

    for (let i = 0; i < runOpts.warmupIterations; i += 1) {
      await measure('warmup_toggle_ms', toggle, measures);
      await sleep(50);
    }

    for (let i = 0; i < runOpts.iterations; i += 1) {
      await measure('toggle_ms', toggle, measures);
      await sleep(50);
    }

    const viewport = viewportRef.current;
    if (viewport) {
      collector.startRaf();
      await measure(
        'scroll_ms',
        async () => {
          const startTs = performance.now();
          let dir = 1;
          while (performance.now() - startTs < runOpts.scrollMs) {
            viewport.scrollTop += dir * 64;
            if (viewport.scrollTop <= 0) dir = 1;
            if (viewport.scrollTop + viewport.clientHeight >= viewport.scrollHeight) dir = -1;
            await waitForNextFrame(1);
          }
        },
        measures,
      );
      collector.stopRaf();
    }

    collector.stopLongTasks();
    const result: PerfRunResult = {
      label: label || undefined,
      scenario: 'deep_tree_scroll',
      ts: Date.now(),
      userAgent: navigator.userAgent,
      iterations: runOpts.iterations,
      warmupIterations: runOpts.warmupIterations,
      measures,
      longTasks: collector.snapshotLongTasks(),
      raf: collector.snapshotRaf(),
    };

    (window as WindowWithPerf).__bpkLayoutPerf = (window as WindowWithPerf).__bpkLayoutPerf || ({} as any);
    (window as WindowWithPerf).__bpkLayoutPerf!.last = result;
    appendStoredResult(result);
    // eslint-disable-next-line no-console
    console.log('[bpk-layout-perf] result', result);

    setBusy(false);
    return result;
  };

  runRef.current = run;

  useEffect(() => {
    const { autorun, runs, clear, download, label: labelFromUrl } = parseAutorunParams();
    if (labelFromUrl && labelFromUrl !== label) {
      setLabel(labelFromUrl);
      localStorage.setItem(LABEL_KEY, JSON.stringify(labelFromUrl));
    }
    if (clear) clearStoredResults();
    if (!autorun || runs <= 0) return;

    let cancelled = false;
    (async () => {
      await waitForNextFrame(3);
      for (let i = 0; i < runs; i += 1) {
        if (cancelled) return;
        // eslint-disable-next-line no-await-in-loop
        await runRef.current();
        // eslint-disable-next-line no-await-in-loop
        await sleep(50);
      }
      if (download && !cancelled) {
        const ts = new Date().toISOString().replace(/[:.]/g, '-');
        const fname = `bpk-layout-perf${(labelFromUrl || label) ? `-${labelFromUrl || label}` : ''}-${ts}.jsonl`;
        downloadText(fname, exportStoredResultsJsonl());
      }
    })();

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  usePerfApi(
    {
      runDeepTree: run,
      runLargeList: async () => {
        throw new Error('LargeList runner is not available on DeepTreePerfExample story.');
      },
      exportJsonl: exportStoredResultsJsonl,
      downloadAll: () => {
        const ts = new Date().toISOString().replace(/[:.]/g, '-');
        const fname = `bpk-layout-perf${label ? `-${label}` : ''}-${ts}.jsonl`;
        downloadText(fname, exportStoredResultsJsonl());
      },
      clearStored: clearStoredResults,
      last: undefined,
    },
    [opts],
  );

  return (
    <Wrapper>
      <div className={STYLES['bpk-layout-perf__controls']}>
        <input
          aria-label="Dataset label (e.g. branch name)"
          value={label}
          onChange={(e) => {
            setLabel(e.target.value);
            localStorage.setItem(LABEL_KEY, JSON.stringify(e.target.value));
          }}
          placeholder="label (e.g. CLOV-990)"
        />
        <button
          type="button"
          className={STYLES['bpk-layout-perf__button']}
          disabled={busy}
          onClick={() => run()}
        >
          Run benchmark (DeepTree)
        </button>
        <button
          type="button"
          className={STYLES['bpk-layout-perf__button']}
          disabled={busy}
          onClick={() => {
            const ts = new Date().toISOString().replace(/[:.]/g, '-');
            const fname = `bpk-layout-perf${label ? `-${label}` : ''}-${ts}.jsonl`;
            downloadText(fname, exportStoredResultsJsonl());
          }}
        >
          Download all results (JSONL)
        </button>
        <button
          type="button"
          className={STYLES['bpk-layout-perf__button']}
          disabled={busy}
          onClick={() => clearStoredResults()}
        >
          Clear stored
        </button>
        <p className={STYLES['bpk-layout-perf__note']}>
          Results are auto-saved to localStorage and can be downloaded as JSONL. Use Performance panel to record while running.
        </p>
      </div>
      <div ref={viewportRef} className={STYLES['bpk-layout-perf__viewport']}>
        <div className={STYLES['bpk-layout-perf__grid']}>
          {branches.map((i) => (
            <div key={i} className={STYLES['bpk-layout-perf__gridCell']}>
              <DeepNode depth={opts.depth} index={i} expanded={expanded} />
            </div>
          ))}
        </div>
      </div>
    </Wrapper>
  );
};


