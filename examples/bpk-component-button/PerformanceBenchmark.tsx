/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016 Skyscanner Ltd
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/* eslint-disable */
import { useState, useCallback, useRef } from 'react';

import {
  BpkButtonV2,
  BUTTON_TYPES,
} from '../../packages/bpk-component-button';
import { withButtonAlignment } from '../../packages/bpk-component-icon';
import SmallFilterIcon from '../../packages/bpk-component-icon/sm/filter';

const AlignedFilterIcon = withButtonAlignment(SmallFilterIcon);

// ============================================================================
// Types
// ============================================================================

interface BenchmarkResult {
  name: string;
  totalTime: number;
  avgTime: number;
  opsPerSec: number;
  iterations: number;
}

interface BenchmarkConfig {
  name: string;
  iterations: number;
  render: () => React.ReactNode;
}

// ============================================================================
// Styles
// ============================================================================

const styles = {
  container: {
    padding: '24px',
    fontFamily: 'system-ui, -apple-system, sans-serif',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  header: {
    marginBottom: '24px',
  },
  title: {
    fontSize: '24px',
    fontWeight: 600,
    marginBottom: '8px',
  },
  subtitle: {
    fontSize: '14px',
    color: '#68697f',
  },
  controls: {
    display: 'flex',
    gap: '12px',
    marginBottom: '24px',
    flexWrap: 'wrap' as const,
  },
  button: {
    padding: '8px 16px',
    fontSize: '14px',
    cursor: 'pointer',
    border: '1px solid #0062e3',
    borderRadius: '8px',
    backgroundColor: '#0062e3',
    color: 'white',
  },
  buttonSecondary: {
    padding: '8px 16px',
    fontSize: '14px',
    cursor: 'pointer',
    border: '1px solid #0062e3',
    borderRadius: '8px',
    backgroundColor: 'white',
    color: '#0062e3',
  },
  buttonDisabled: {
    opacity: 0.5,
    cursor: 'not-allowed',
  },
  resultsTable: {
    width: '100%',
    borderCollapse: 'collapse' as const,
    marginBottom: '24px',
  },
  th: {
    padding: '12px',
    textAlign: 'left' as const,
    borderBottom: '2px solid #e6e4eb',
    backgroundColor: '#f7f5fa',
    fontSize: '14px',
    fontWeight: 600,
  },
  td: {
    padding: '12px',
    borderBottom: '1px solid #e6e4eb',
    fontSize: '14px',
  },
  tdRight: {
    padding: '12px',
    borderBottom: '1px solid #e6e4eb',
    fontSize: '14px',
    textAlign: 'right' as const,
    fontFamily: 'monospace',
  },
  status: {
    display: 'inline-block',
    padding: '2px 8px',
    borderRadius: '4px',
    fontSize: '12px',
    fontWeight: 500,
  },
  statusPass: {
    backgroundColor: '#d4edda',
    color: '#155724',
  },
  statusFail: {
    backgroundColor: '#f8d7da',
    color: '#721c24',
  },
  running: {
    color: '#0062e3',
    fontStyle: 'italic' as const,
  },
  renderArea: {
    padding: '16px',
    border: '1px solid #e6e4eb',
    borderRadius: '8px',
    marginBottom: '24px',
    minHeight: '100px',
    display: 'flex',
    flexWrap: 'wrap' as const,
    gap: '8px',
    alignItems: 'flex-start',
  },
  summary: {
    padding: '16px',
    backgroundColor: '#f7f5fa',
    borderRadius: '8px',
    marginBottom: '24px',
  },
  summaryTitle: {
    fontSize: '16px',
    fontWeight: 600,
    marginBottom: '12px',
  },
  summaryItem: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '4px 0',
    fontSize: '14px',
  },
  inputGroup: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  input: {
    padding: '8px 12px',
    border: '1px solid #e6e4eb',
    borderRadius: '8px',
    fontSize: '14px',
    width: '100px',
  },
  label: {
    fontSize: '14px',
    color: '#68697f',
  },
};

// ============================================================================
// Performance Benchmark Component
// ============================================================================

export const PerformanceBenchmark = () => {
  const [results, setResults] = useState<BenchmarkResult[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [currentTest, setCurrentTest] = useState<string | null>(null);
  const [buttonCount, setButtonCount] = useState(100);
  const [renderedButtons, setRenderedButtons] = useState<React.ReactNode[]>([]);
  const renderAreaRef = useRef<HTMLDivElement>(null);

  // Benchmark configurations
  const benchmarks: BenchmarkConfig[] = [
    {
      name: 'Primary Buttons',
      iterations: buttonCount,
      render: () => (
        <BpkButtonV2 type={BUTTON_TYPES.primary}>
          Primary
        </BpkButtonV2>
      ),
    },
    {
      name: 'Link Buttons (string only)',
      iterations: buttonCount,
      render: () => (
        <BpkButtonV2 type={BUTTON_TYPES.link}>
          Link Button
        </BpkButtonV2>
      ),
    },
    {
      name: 'Link Buttons (with icon)',
      iterations: buttonCount,
      render: () => (
        <BpkButtonV2 type={BUTTON_TYPES.link}>
          Link <AlignedFilterIcon />
        </BpkButtonV2>
      ),
    },
    {
      name: 'Link Buttons (icon + text + icon)',
      iterations: buttonCount,
      render: () => (
        <BpkButtonV2 type={BUTTON_TYPES.link}>
          <AlignedFilterIcon /> Filter <AlignedFilterIcon />
        </BpkButtonV2>
      ),
    },
    {
      name: 'LinkOnDark Buttons',
      iterations: buttonCount,
      render: () => (
        <BpkButtonV2 type={BUTTON_TYPES.linkOnDark}>
          Link <AlignedFilterIcon />
        </BpkButtonV2>
      ),
    },
    {
      name: 'Disabled Link Buttons',
      iterations: buttonCount,
      render: () => (
        <BpkButtonV2 type={BUTTON_TYPES.link} disabled>
          Disabled <AlignedFilterIcon />
        </BpkButtonV2>
      ),
    },
  ];

  const runSingleBenchmark = useCallback(async (config: BenchmarkConfig): Promise<BenchmarkResult> => {
    // Force garbage collection if available
    if ((window as any).gc) {
      (window as any).gc();
    }

    // Warm up
    for (let i = 0; i < 10; i += 1) {
      config.render();
    }

    // Measure
    const buttons: React.ReactNode[] = [];
    const start = performance.now();

    for (let i = 0; i < config.iterations; i += 1) {
      buttons.push(
        <span key={i}>
          {config.render()}
        </span>
      );
    }

    const createTime = performance.now() - start;

    // Render to DOM and measure
    setRenderedButtons(buttons);

    // Wait for React to render
    await new Promise(resolve => setTimeout(resolve, 0));

    const totalTime = performance.now() - start;
    const avgTime = totalTime / config.iterations;
    const opsPerSec = Math.round(1000 / avgTime);

    return {
      name: config.name,
      totalTime,
      avgTime,
      opsPerSec,
      iterations: config.iterations,
    };
  }, []);

  const runAllBenchmarks = useCallback(async () => {
    setIsRunning(true);
    setResults([]);
    setRenderedButtons([]);

    const newResults: BenchmarkResult[] = [];

    for (const config of benchmarks) {
      setCurrentTest(config.name);

      // Small delay between tests
      await new Promise(resolve => setTimeout(resolve, 100));

      const result = await runSingleBenchmark(config);
      newResults.push(result);
      setResults([...newResults]);
    }

    setCurrentTest(null);
    setIsRunning(false);
    setRenderedButtons([]);
  }, [benchmarks, runSingleBenchmark]);

  const runQuickTest = useCallback(async (type: 'primary' | 'link' | 'linkIcon') => {
    setIsRunning(true);
    setRenderedButtons([]);

    const config = type === 'primary'
      ? benchmarks[0]
      : type === 'link'
        ? benchmarks[1]
        : benchmarks[2];

    setCurrentTest(config.name);
    const result = await runSingleBenchmark(config);
    setResults([result]);
    setCurrentTest(null);
    setIsRunning(false);
  }, [benchmarks, runSingleBenchmark]);

  const clearResults = useCallback(() => {
    setResults([]);
    setRenderedButtons([]);
  }, []);

  // Calculate summary
  const primaryResult = results.find(r => r.name === 'Primary Buttons');
  const linkIconResult = results.find(r => r.name === 'Link Buttons (with icon)');
  const overhead = primaryResult && linkIconResult
    ? ((linkIconResult.totalTime - primaryResult.totalTime) / primaryResult.totalTime * 100).toFixed(1)
    : null;

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>BpkButtonV2 Performance Benchmark</h1>
        <p style={styles.subtitle}>
          Real browser performance testing for link button icon detection
        </p>
      </div>

      {/* Controls */}
      <div style={styles.controls}>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Button Count:</label>
          <input
            type="number"
            value={buttonCount}
            onChange={(e) => setButtonCount(Number(e.target.value))}
            style={styles.input}
            min={10}
            max={1000}
            disabled={isRunning}
          />
        </div>

        <button
          style={{ ...styles.button, ...(isRunning ? styles.buttonDisabled : {}) }}
          onClick={runAllBenchmarks}
          disabled={isRunning}
        >
          {isRunning ? 'Running...' : 'Run All Benchmarks'}
        </button>

        <button
          style={{ ...styles.buttonSecondary, ...(isRunning ? styles.buttonDisabled : {}) }}
          onClick={() => runQuickTest('primary')}
          disabled={isRunning}
        >
          Quick: Primary
        </button>

        <button
          style={{ ...styles.buttonSecondary, ...(isRunning ? styles.buttonDisabled : {}) }}
          onClick={() => runQuickTest('link')}
          disabled={isRunning}
        >
          Quick: Link (string)
        </button>

        <button
          style={{ ...styles.buttonSecondary, ...(isRunning ? styles.buttonDisabled : {}) }}
          onClick={() => runQuickTest('linkIcon')}
          disabled={isRunning}
        >
          Quick: Link (icon)
        </button>

        <button
          style={styles.buttonSecondary}
          onClick={clearResults}
          disabled={isRunning}
        >
          Clear
        </button>
      </div>

      {/* Current Status */}
      {currentTest && (
        <p style={styles.running}>
          Running: {currentTest}...
        </p>
      )}

      {/* Summary */}
      {overhead && (
        <div style={styles.summary}>
          <h3 style={styles.summaryTitle}>Summary</h3>
          <div style={styles.summaryItem}>
            <span>Primary Button (baseline)</span>
            <span>{primaryResult?.totalTime.toFixed(2)}ms for {primaryResult?.iterations} buttons</span>
          </div>
          <div style={styles.summaryItem}>
            <span>Link Button (with icon)</span>
            <span>{linkIconResult?.totalTime.toFixed(2)}ms for {linkIconResult?.iterations} buttons</span>
          </div>
          <div style={styles.summaryItem}>
            <span><strong>Link vs Primary Overhead</strong></span>
            <span><strong>{overhead}%</strong></span>
          </div>
        </div>
      )}

      {/* Results Table */}
      {results.length > 0 && (
        <table style={styles.resultsTable}>
          <thead>
            <tr>
              <th style={styles.th}>Test</th>
              <th style={styles.th}>Count</th>
              <th style={{ ...styles.th, textAlign: 'right' }}>Total Time</th>
              <th style={{ ...styles.th, textAlign: 'right' }}>Avg Time</th>
              <th style={{ ...styles.th, textAlign: 'right' }}>Ops/sec</th>
              <th style={styles.th}>Status</th>
            </tr>
          </thead>
          <tbody>
            {results.map((result) => {
              const isPassing = result.avgTime < 1; // Less than 1ms per button
              return (
                <tr key={result.name}>
                  <td style={styles.td}>{result.name}</td>
                  <td style={styles.tdRight}>{result.iterations}</td>
                  <td style={styles.tdRight}>{result.totalTime.toFixed(2)}ms</td>
                  <td style={styles.tdRight}>{result.avgTime.toFixed(4)}ms</td>
                  <td style={styles.tdRight}>{result.opsPerSec.toLocaleString()}</td>
                  <td style={styles.td}>
                    <span style={{ ...styles.status, ...(isPassing ? styles.statusPass : styles.statusFail) }}>
                      {isPassing ? 'PASS' : 'SLOW'}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}

      {/* Render Area (for actual DOM rendering measurement) */}
      {renderedButtons.length > 0 && (
        <>
          <h3 style={{ fontSize: '14px', marginBottom: '8px', color: '#68697f' }}>
            Rendered Buttons ({renderedButtons.length})
          </h3>
          <div style={styles.renderArea} ref={renderAreaRef}>
            {renderedButtons}
          </div>
        </>
      )}

      {/* Performance Tips */}
      <div style={{ ...styles.summary, backgroundColor: '#e8f4fd' }}>
        <h3 style={styles.summaryTitle}>Performance Tips</h3>
        <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '14px' }}>
          <li>Open DevTools → Performance tab to see detailed flame graphs</li>
          <li>Run tests multiple times for consistent results</li>
          <li>Close other tabs to reduce interference</li>
          <li>Try different button counts: 100, 500, 1000</li>
          <li>Check React DevTools Profiler for component render times</li>
        </ul>
      </div>
    </div>
  );
};

export default PerformanceBenchmark;

