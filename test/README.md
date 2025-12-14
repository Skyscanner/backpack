# Layout perf comparison

Compared branches: `bpk-layout-PoC-control` (control) vs `CLOV-990` (candidate).

## Datasets

- **Control** files (2):
  - `test/bpk-layout-perf-bpk-layout-PoC-control-2025-12-14T17-47-15-008Z.jsonl`
  - `test/bpk-layout-perf-bpk-layout-PoC-control-2025-12-14T17-51-45-642Z.jsonl`
- **Candidate** files (2):
  - `test/bpk-layout-perf-CLOV-990-2025-12-14T17-58-26-555Z.jsonl`
  - `test/bpk-layout-perf-CLOV-990-2025-12-14T18-01-17-304Z.jsonl`

## Summary tables

Notes:
- For `toggle_ms`, values are flattened across iterations within each run.
- For `scroll_ms`, values are one per run.
- `Δ p75` is computed as (candidate - control) / control.

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

