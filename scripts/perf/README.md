# Layout perf comparison (bpk-layout-PoC-control vs CLOV-990)

This repo currently has no Playwright/Puppeteer/Lighthouse dependency, so the recommended workflow is:

1. Use **the same Storybook benchmark stories** in both branches.
2. Collect **DevTools Performance traces** for attribution and **auto-exported JSONL** for quick statistical comparison.

## 0) Add benchmark stories to both branches (critical)

Cherry-pick the commit that adds:

- `examples/bpk-component-layout/perfExamples.tsx`
- `examples/bpk-component-layout/perfRunner.ts`
- `examples/bpk-component-layout/perfExamples.module.scss`
- and updates `examples/bpk-component-layout/stories.tsx`

into both:

- `bpk-layout-PoC-control` (control / unoptimised)
- `CLOV-990` (candidate / optimised)

This ensures the benchmark DOM, data, and interactions are identical.

## 1) Build & serve Storybook (per branch)

From the repo root:

```bash
npm ci
npm run storybook:dist
python3 -m http.server 9101 --directory dist-storybook
```

Repeat in the other branch on a different port (e.g. `9102`).

## 2) Benchmarks to run

Open in Chrome:

- `bpk-component-layout/Box/PerfLargeList`
- `bpk-component-layout/Box/PerfDeepTree`

Each story has a **Run benchmark** button, **auto-saves results**, and supports exporting as JSONL.

Recommended: set the label to the branch name (e.g. `bpk-layout-PoC-control` / `CLOV-990`) so your exported dataset is self-identifying.

```js
// In the story iframe's console:
__bpkLayoutPerf.runLargeList()
__bpkLayoutPerf.runDeepTree()
__bpkLayoutPerf.last
__bpkLayoutPerf.exportJsonl?.()
__bpkLayoutPerf.downloadAll?.()
```

### Zero-click autorun (recommended)

You can run and export without any manual clicking by opening the story **iframe** with query params.

Large list:

```text
iframe.html?id=bpk-component-layout-box--perf-large-list&label=CLOV-990&clear=1&autorun=1&runs=30&download=1
```

Deep tree:

```text
iframe.html?id=bpk-component-layout-box--perf-deep-tree&label=CLOV-990&clear=1&autorun=1&runs=30&download=1
```

Params:

- `label`: stored in each result row (use branch name)
- `clear=1`: clears previous localStorage results before running
- `autorun=1`: starts running immediately after load
- `runs=30`: number of full benchmark runs (each run includes toggle + scroll)
- `download=1`: downloads a single JSONL file at the end

## 3) Collection protocol (make results stable)

Use the same machine and repeatable settings:

- Close other heavy apps/tabs.
- Chrome Incognito (no extensions).
- DevTools → Performance:
  - CPU throttling: **4×**
  - Disable cache: optional, but keep consistent

For each scenario:

- Do 1 warm run after page load (ignore results).
- Then run **5 runs** (results are appended to localStorage automatically).
- Refresh the page and repeat until you have **20–30 runs** per branch.

When done, click **Download all results (JSONL)** to export a single `.jsonl` file.

## 4) What to compare (high-signal)

From the JSON:

- `measures.toggle_ms`: CPU + style work from state changes (rerender + style resolution)
- `measures.scroll_ms`: scrolling loop duration (should be stable, but use it as a guardrail)
- `longTasks.count/totalMs/maxMs`: main-thread blockage (key for scroll/interaction smoothness)
- `raf.jankFrames/maxFrameMs/p95FrameMs`: frame stability proxy during scroll

From DevTools Performance trace (during the run):

- Main thread: **Scripting** time
- Rendering: **Recalculate Style** and **Layout** time (focus on scroll period)
- Hot stacks: check whether Chakra/emotion related work dominates in control branch

## 5) Interpreting results

Given the optimisation goal (reduce runtime CSS-in-JS), strong success signals usually look like:

- Lower **p75/p95** for `toggle_ms`
- Fewer/shorter **Long Tasks**
- Lower peaks in **Recalculate Style** during scroll

If you see small improvements:

- It may indicate many props still go through Chakra runtime resolution (fallback path).
  Consider extending the benchmark to emphasise props you migrated to CSS vars.


