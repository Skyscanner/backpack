import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();

const CONTROL_BRANCH = 'bpk-layout-PoC-control';
const CANDIDATE_BRANCH = 'CLOV-990';

const run = (cmd) => execSync(cmd, { stdio: ['ignore', 'pipe', 'pipe'], encoding: 'utf8' }).trim();

const listJsonlFiles = (branch) => {
  const out = run(`git ls-tree -r --name-only ${branch} test`);
  return out
    .split('\n')
    .map((s) => s.trim())
    .filter(Boolean)
    .filter((p) => p.startsWith('test/') && p.endsWith('.jsonl') && p.includes('bpk-layout-perf-'));
};

const readJsonlFromBranch = (branch, filePath) => {
  // If file exists in current working tree and branch is current, read via fs to avoid git show overhead.
  const current = run('git branch --show-current');
  if (branch === current) {
    const abs = path.join(ROOT, filePath);
    if (fs.existsSync(abs)) return fs.readFileSync(abs, 'utf8');
  }
  return run(`git show ${branch}:${filePath}`);
};

const parseJsonl = (text, sourceLabel) => {
  const lines = text.split('\n').map((l) => l.trim()).filter(Boolean);
  const rows = [];
  for (const line of lines) {
    try {
      rows.push(JSON.parse(line));
    } catch (e) {
      throw new Error(`Failed to parse JSONL line from ${sourceLabel}: ${String(e)}\nLine:\n${line}`);
    }
  }
  return rows;
};

const mean = (arr) => (arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : 0);

const percentile = (arr, p) => {
  if (!arr.length) return 0;
  const sorted = [...arr].sort((a, b) => a - b);
  const idx = Math.min(sorted.length - 1, Math.max(0, Math.ceil((p / 100) * sorted.length) - 1));
  return sorted[idx];
};

const fmt = (n) => {
  if (!Number.isFinite(n)) return 'n/a';
  if (Math.abs(n) >= 1000) return `${Math.round(n)}`;
  return `${Math.round(n * 10) / 10}`;
};

const fmtPct = (ratio) => {
  if (!Number.isFinite(ratio)) return 'n/a';
  const pct = ratio * 100;
  const sign = pct > 0 ? '+' : '';
  return `${sign}${Math.round(pct)}%`;
};

const countWhere = (arr, pred) => arr.reduce((acc, v) => acc + (pred(v) ? 1 : 0), 0);

const collectMetrics = (runs) => {
  // Flatten per-run arrays into one pool per metric.
  const metricsByScenario = new Map(); // scenario -> metric -> number[]
  const add = (scenario, metric, values) => {
    if (!metricsByScenario.has(scenario)) metricsByScenario.set(scenario, new Map());
    const m = metricsByScenario.get(scenario);
    if (!m.has(metric)) m.set(metric, []);
    m.get(metric).push(...values);
  };

  for (const r of runs) {
    const scenario = r.scenario || 'unknown';
    const measures = r.measures || {};
    if (Array.isArray(measures.toggle_ms)) add(scenario, 'toggle_ms', measures.toggle_ms.map(Number));
    if (Array.isArray(measures.scroll_ms)) add(scenario, 'scroll_ms', measures.scroll_ms.map(Number));

    const lt = r.longTasks || {};
    if (typeof lt.count === 'number') add(scenario, 'longTasks.count', [lt.count]);
    if (typeof lt.totalMs === 'number') add(scenario, 'longTasks.totalMs', [lt.totalMs]);
    if (typeof lt.maxMs === 'number') add(scenario, 'longTasks.maxMs', [lt.maxMs]);

    const raf = r.raf || {};
    if (typeof raf.jankFrames === 'number') add(scenario, 'raf.jankFrames', [raf.jankFrames]);
    if (typeof raf.maxFrameMs === 'number') add(scenario, 'raf.maxFrameMs', [raf.maxFrameMs]);
    if (typeof raf.p95FrameMs === 'number') add(scenario, 'raf.p95FrameMs', [raf.p95FrameMs]);
  }

  return metricsByScenario;
};

const summarize = (values) => ({
  n: values.length,
  mean: mean(values),
  p50: percentile(values, 50),
  p75: percentile(values, 75),
  p95: percentile(values, 95),
});

const getVals = (metricsByScenario, scenario, metric) => metricsByScenario.get(scenario)?.get(metric) ?? [];

const mkOutlierSummary = (values, threshold) => ({
  threshold,
  count: countWhere(values, (v) => v > threshold),
  n: values.length,
});

const loadBranchDataset = (branch) => {
  const files = listJsonlFiles(branch);
  const allRuns = [];
  for (const f of files) {
    const text = readJsonlFromBranch(branch, f);
    const runs = parseJsonl(text, `${branch}:${f}`);
    allRuns.push(...runs);
  }
  return { branch, files, runs: allRuns };
};

const main = () => {
  const control = loadBranchDataset(CONTROL_BRANCH);
  const candidate = loadBranchDataset(CANDIDATE_BRANCH);

  const controlMetrics = collectMetrics(control.runs);
  const candidateMetrics = collectMetrics(candidate.runs);

  const scenarios = Array.from(
    new Set([
      ...controlMetrics.keys(),
      ...candidateMetrics.keys(),
    ]),
  ).sort();

  const metricOrder = [
    'toggle_ms',
    'scroll_ms',
    'longTasks.count',
    'longTasks.totalMs',
    'longTasks.maxMs',
    'raf.jankFrames',
    'raf.p95FrameMs',
    'raf.maxFrameMs',
  ];

  const lines = [];
  lines.push('# Layout perf comparison');
  lines.push('');
  lines.push(`Compared branches: \`${CONTROL_BRANCH}\` (control) vs \`${CANDIDATE_BRANCH}\` (candidate).`);
  lines.push('');
  lines.push('## Datasets');
  lines.push('');
  lines.push(`- **Control** files (${control.files.length}):`);
  for (const f of control.files) lines.push(`  - \`${f}\``);
  lines.push(`- **Candidate** files (${candidate.files.length}):`);
  for (const f of candidate.files) lines.push(`  - \`${f}\``);
  lines.push('');
  lines.push('## Summary tables');
  lines.push('');
  lines.push('Notes:');
  lines.push('- For `toggle_ms`, values are flattened across iterations within each run.');
  lines.push('- For `scroll_ms`, values are one per run.');
  lines.push('- `Δ p75` is computed as (candidate - control) / control.');
  lines.push('');

  lines.push('## Key findings (high-signal)');
  lines.push('');
  lines.push('This section focuses on **tail latency / worst-case jank** indicators (`p95` and outlier counts).');
  lines.push('');

  for (const scenario of scenarios) {
    const cScroll = summarize(getVals(controlMetrics, scenario, 'scroll_ms'));
    const kScroll = summarize(getVals(candidateMetrics, scenario, 'scroll_ms'));
    const cRafMax = summarize(getVals(controlMetrics, scenario, 'raf.maxFrameMs'));
    const kRafMax = summarize(getVals(candidateMetrics, scenario, 'raf.maxFrameMs'));

    // Outlier heuristics (keep simple and stable):
    // - scroll_ms outlier: > 2x p50
    // - raf.maxFrameMs outlier: > 50ms
    const cScrollOut = mkOutlierSummary(getVals(controlMetrics, scenario, 'scroll_ms'), cScroll.p50 ? cScroll.p50 * 2 : Infinity);
    const kScrollOut = mkOutlierSummary(getVals(candidateMetrics, scenario, 'scroll_ms'), kScroll.p50 ? kScroll.p50 * 2 : Infinity);
    const cRafOut = mkOutlierSummary(getVals(controlMetrics, scenario, 'raf.maxFrameMs'), 50);
    const kRafOut = mkOutlierSummary(getVals(candidateMetrics, scenario, 'raf.maxFrameMs'), 50);

    // Only emit key findings if we have data.
    if ((cScroll.n || kScroll.n) || (cRafMax.n || kRafMax.n)) {
      lines.push(`### Scenario: \`${scenario}\` (tail)`); 
      lines.push('');
      if (cScroll.n && kScroll.n) {
        const deltaP95 = cScroll.p95 ? (kScroll.p95 - cScroll.p95) / cScroll.p95 : NaN;
        lines.push(`- **scroll_ms p95**: control ${fmt(cScroll.p95)} → candidate ${fmt(kScroll.p95)} (${fmtPct(deltaP95)})`);
        lines.push(`- **scroll_ms outliers** (>2×p50): control ${cScrollOut.count}/${cScrollOut.n} vs candidate ${kScrollOut.count}/${kScrollOut.n}`);
      }
      if (cRafMax.n && kRafMax.n) {
        const deltaP95 = cRafMax.p95 ? (kRafMax.p95 - cRafMax.p95) / cRafMax.p95 : NaN;
        lines.push(`- **raf.maxFrameMs p95**: control ${fmt(cRafMax.p95)} → candidate ${fmt(kRafMax.p95)} (${fmtPct(deltaP95)})`);
        lines.push(`- **raf.maxFrameMs outliers** (>50ms): control ${cRafOut.count}/${cRafOut.n} vs candidate ${kRafOut.count}/${kRafOut.n}`);
      }
      lines.push('');
    }

    lines.push(`### Scenario: \`${scenario}\``);
    lines.push('');
    lines.push('| metric | control n | control p50 | control p75 | control p95 | candidate n | candidate p50 | candidate p75 | candidate p95 | Δ p75 |');
    lines.push('|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|');

    for (const metric of metricOrder) {
      const cVals = controlMetrics.get(scenario)?.get(metric) ?? [];
      const kVals = candidateMetrics.get(scenario)?.get(metric) ?? [];
      if (!cVals.length && !kVals.length) continue;

      const c = summarize(cVals);
      const k = summarize(kVals);
      const deltaP75 = c.p75 ? (k.p75 - c.p75) / c.p75 : NaN;

      lines.push(
        `| \`${metric}\` | ${c.n} | ${fmt(c.p50)} | ${fmt(c.p75)} | ${fmt(c.p95)} | ${k.n} | ${fmt(k.p50)} | ${fmt(k.p75)} | ${fmt(k.p95)} | ${fmtPct(deltaP75)} |`,
      );
    }

    lines.push('');
  }

  lines.push('## Quick interpretation guide');
  lines.push('');
  lines.push('- **Lower is better** for: `toggle_ms`, `scroll_ms`, `longTasks.*`, `raf.*`.');
  lines.push('- If `scroll_ms` is much larger than the configured `scrollMs`, it usually indicates the main thread was blocked during the scroll loop (jank/long tasks).');
  lines.push('');

  const outPath = path.join(ROOT, 'test/README.md');
  fs.writeFileSync(outPath, `${lines.join('\n')}\n`, 'utf8');
  // eslint-disable-next-line no-console
  console.log(`Wrote ${outPath}`);
};

main();


