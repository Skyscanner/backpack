# Layout perf comparison

Compared branches: `bpk-layout-PoC-control` (control) vs `CLOV-990` (candidate).

## Datasets

- **Control** files (2):
  - `test/bpk-layout-perf-bpk-layout-PoC-control-2025-12-14T17-47-15-008Z.jsonl`
  - `test/bpk-layout-perf-bpk-layout-PoC-control-2025-12-14T17-51-45-642Z.jsonl`
- **Candidate** files (2):
  - `test/bpk-layout-perf-CLOV-990-2025-12-14T17-58-26-555Z.jsonl`
  - `test/bpk-layout-perf-CLOV-990-2025-12-14T18-01-17-304Z.jsonl`

### Benchmark scenarios and intent

This dataset contains results for two layout-heavy benchmark scenarios:

- **`large_list_scroll`**: simulates a “results list” style page (e.g. flight results) with many repeated layout compositions.
  - **Goal**: evaluate how layout primitives behave under repeated rendering + scrolling in a list-heavy UI.
  - **What it stresses**: runtime styling/prop resolution cost, style recalculation + layout during scroll, and worst-case jank/outliers.
- **`deep_tree_scroll`**: simulates a deeply nested layout tree (e.g. marketing/landing pages with many nested containers).
  - **Goal**: evaluate performance characteristics when layout nesting depth is high and updates propagate through a deep tree.
  - **What it stresses**: style recalculation/layout amplification due to depth, and scroll/interaction stability under deep composition.

## Summary tables

Notes:
- For `toggle_ms`, values are flattened across iterations within each run.
- For `scroll_ms`, values are one per run.
- `Δ p75` is computed as (candidate - control) / control.

### Terminology and column meanings

All time-based metrics are in **milliseconds (ms)** unless stated otherwise.

- **`n`**: sample size used for the percentile calculation.
  - For `toggle_ms`, `n` is the total number of toggle measurements across all runs (runs × iterations).
  - For `scroll_ms`, `n` is the number of runs (typically one `scroll_ms` per run).
  - For `longTasks.*` and `raf.*`, `n` is the number of runs (one snapshot per run).
- **`p50` / `p75` / `p95`**: 50th / 75th / 95th percentile of the metric’s sample distribution.
  - `p50` ~= median (typical case)
  - `p75` ~= “worse-than-typical” but common
  - `p95` ~= tail / rare bad cases
- **`Δ p75`**: relative change in the 75th percentile, computed as \((candidate\_p75 - control\_p75) / control\_p75\).
  - Negative means candidate is faster/better, positive means slower/worse.

### Metric meanings

- **`toggle_ms`**: time spent performing a “batch toggle” update that triggers React updates and layout/style work.
  - Collected multiple times per run (`iterations`) and then flattened across runs.
  - Lower indicates cheaper update work (CPU + rendering pipeline).
- **`scroll_ms`**: wall-clock time to complete a scripted scroll loop of a fixed target duration (`scrollMs` in the story options).
  - Ideally this is close to the configured target (e.g. ~4000ms or ~8000ms).
  - If `scroll_ms` is much larger than the configured target, it typically indicates main-thread blocking during the loop.
- **`longTasks.count`**: number of Long Tasks observed during the run (requires Long Tasks API support).
- **`longTasks.totalMs`**: total duration of all Long Tasks during the run.
- **`longTasks.maxMs`**: duration of the single longest Long Task during the run.
- **`raf.jankFrames`**: count of “slow frames” during the scroll section (heuristic: frame time > 32ms).
- **`raf.p95FrameMs`**: 95th percentile of per-frame durations captured during the scroll section.
- **`raf.maxFrameMs`**: maximum single-frame duration captured during the scroll section (useful for spotting extreme jank/outliers).

## Key findings (high-signal)

This section focuses on **tail latency / worst-case jank** indicators (`p95` and outlier counts).

### Scenario: `deep_tree_scroll` (tail)

- **scroll_ms p95**: control 4017 → candidate 4016 (0%)
- **scroll_ms outliers** (>2×p50): control 1/30 vs candidate 0/30
- **raf.maxFrameMs p95**: control 416.6 → candidate 19.8 (-95%)
- **raf.maxFrameMs outliers** (>50ms): control 2/30 vs candidate 1/30

### Scenario: `deep_tree_scroll`

| metric | control n | control p50 | control p75 | control p95 | candidate n | candidate p50 | candidate p75 | candidate p95 | Δ p75 |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| `toggle_ms` | 150 | 15.6 | 16.4 | 32.3 | 150 | 15.6 | 16.6 | 19.4 | +1% |
| `scroll_ms` | 30 | 4015 | 4016 | 4017 | 30 | 4013 | 4015 | 4016 | 0% |
| `longTasks.count` | 30 | 0 | 0 | 0 | 30 | 0 | 0 | 0 | n/a |
| `longTasks.totalMs` | 30 | 0 | 0 | 0 | 30 | 0 | 0 | 0 | n/a |
| `longTasks.maxMs` | 30 | 0 | 0 | 0 | 30 | 0 | 0 | 0 | n/a |
| `raf.jankFrames` | 30 | 0 | 0 | 1 | 30 | 0 | 0 | 0 | n/a |
| `raf.p95FrameMs` | 30 | 17.4 | 17.5 | 17.6 | 30 | 17.7 | 18 | 18.2 | +3% |
| `raf.maxFrameMs` | 30 | 17.7 | 17.8 | 416.6 | 30 | 18.8 | 19.1 | 19.8 | +7% |

### Scenario: `large_list_scroll` (tail)

- **scroll_ms p95**: control 20912 → candidate 4017 (-81%)
- **scroll_ms outliers** (>2×p50): control 5/30 vs candidate 0/30
- **raf.maxFrameMs p95**: control 18900 → candidate 18.6 (-100%)
- **raf.maxFrameMs outliers** (>50ms): control 6/30 vs candidate 0/30

### Scenario: `large_list_scroll`

| metric | control n | control p50 | control p75 | control p95 | candidate n | candidate p50 | candidate p75 | candidate p95 | Δ p75 |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| `toggle_ms` | 150 | 31.7 | 31.9 | 33.5 | 150 | 31.7 | 32.2 | 33.5 | +1% |
| `scroll_ms` | 30 | 4013 | 4018 | 20912 | 30 | 4001 | 4015 | 4017 | 0% |
| `longTasks.count` | 30 | 0 | 0 | 0 | 30 | 0 | 0 | 0 | n/a |
| `longTasks.totalMs` | 30 | 0 | 0 | 0 | 30 | 0 | 0 | 0 | n/a |
| `longTasks.maxMs` | 30 | 0 | 0 | 0 | 30 | 0 | 0 | 0 | n/a |
| `raf.jankFrames` | 30 | 0 | 0 | 1 | 30 | 0 | 0 | 0 | n/a |
| `raf.p95FrameMs` | 30 | 17.6 | 17.6 | 17.7 | 30 | 17.6 | 17.6 | 17.6 | 0% |
| `raf.maxFrameMs` | 30 | 18.3 | 18.5 | 18900 | 30 | 17.8 | 17.8 | 18.6 | -4% |

## Quick interpretation guide

- **Lower is better** for: `toggle_ms`, `scroll_ms`, `longTasks.*`, `raf.*`.
- If `scroll_ms` is much larger than the configured `scrollMs`, it usually indicates the main thread was blocked during the scroll loop (jank/long tasks).

## Decision summary (when is this optimisation worth it?)

This section summarises **how to decide whether the Layout PoC optimisation is worth rolling out**, combining the benchmark data above with cost/complexity considerations.

### What the optimisation aims to reduce

- **Runtime CPU**: style-prop parsing, CSS generation/insertion, runtime branching (e.g. Chakra/Emotion work)
- **Rendering pipeline cost**: style recalculation / layout amplification
- **Worst-case interaction smoothness**: fewer long tasks and extreme jank (tail)

### What it costs (trade-offs)

- **More code & complexity**: hybrid paths (CSS variables + Chakra fallback), API constraints, debugging burden, edge cases (responsive/RTL/theme/SSR)
- **Rollout/maintenance**: migration effort, documentation and enforcement of new constraints, ongoing support cost

### Decision by business premise

#### A) If you have **tail pain** (rare but severe freezes / scroll jank / “page becomes unresponsive”)

**Worth pursuing.** This optimisation class often shows up as **p95/outlier reduction** more than p50 improvements.

Use these signals:
- Consistent reduction in tail metrics (`scroll_ms p95`, `raf.maxFrameMs p95`, outlier counts)
- Traces show reduced Chakra/Emotion runtime work or reduced style-recalc/layout spikes

#### B) If you have **mean-path pain** (most users feel it’s consistently slow/laggy)

Only pursue if you can demonstrate a clear improvement in **p50/p75** (not just removing rare outliers).

Use these signals:
- `toggle_ms` and/or `scroll_ms` p50/p75 materially improve across repeated runs
- Distribution shifts left (not just fewer extreme outliers)

#### C) If you have **no current performance pain** (neither tail nor mean is a problem)

**Not recommended to roll out broadly right now.** The measurable benefit is unlikely to translate into user value, while the cost/complexity is guaranteed.

Recommended approach:
- Keep as PoC + keep the benchmark tooling
- Re-open the decision when conditions change (see “Triggers” below)

### What this dataset suggests

- **p50/p75 are broadly similar** between control and candidate for `toggle_ms` / `scroll_ms` → limited evidence of average-path improvement.
- **Tail/outliers improve** for scroll-related metrics (e.g. `large_list_scroll` shows extreme outliers in control that disappear in candidate).

So, this dataset is stronger evidence for **tail stability improvements** than for **average-path speedups**.

### Current recommendation (given your stated premise)

You stated: **there is no current business tail pain**.

Recommendation:
- **Do not expand rollout at this stage** (low ROI)
- **Keep the PoC + benchmark tooling** so you can quickly re-evaluate if pain emerges

### Triggers to re-evaluate later

Revisit this optimisation if any of the following become true:

- Product/monitoring shows **scroll jank / rare freezes / unresponsive interactions** in layout-heavy pages
- Target device mix shifts to lower-end hardware or more complex result cards / deeper layout trees
- Observed increases in long tasks / INP tail / style-recalc/layout spikes during scroll

