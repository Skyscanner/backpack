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

import { useState, useCallback } from 'react';

// V0: Before changes (no icon detection)
import { BpkButtonV2 as BpkButtonV0 } from '../../packages/bpk-component-button/src/BpkButtonV2/BpkButtonV0';
// V1: After changes (with icon detection)  
import { BpkButtonV2 as BpkButtonV1 } from '../../packages/bpk-component-button/src/BpkButtonV2/BpkButton';
import { BUTTON_TYPES } from '../../packages/bpk-component-button';
import { withButtonAlignment } from '../../packages/bpk-component-icon';
import SmallFilterIcon from '../../packages/bpk-component-icon/sm/filter';

const AlignedFilterIcon = withButtonAlignment(SmallFilterIcon);

// ============================================================================
// Types
// ============================================================================

interface ComparisonResult {
  testCase: string;
  v0Times: number[];
  v1Times: number[];
  v0Median: number;
  v1Median: number;
  difference: number;
  percentChange: string;
}

// ============================================================================
// Styles
// ============================================================================

const styles = {
  container: {
    padding: '24px',
    fontFamily: 'system-ui, -apple-system, sans-serif',
    maxWidth: '1400px',
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
    marginBottom: '16px',
  },
  controls: {
    display: 'flex',
    gap: '12px',
    marginBottom: '24px',
    flexWrap: 'wrap' as const,
    alignItems: 'center',
  },
  button: {
    padding: '10px 20px',
    fontSize: '14px',
    fontWeight: 500,
    cursor: 'pointer',
    border: 'none',
    borderRadius: '8px',
    backgroundColor: '#0062e3',
    color: 'white',
  },
  buttonDisabled: {
    opacity: 0.5,
    cursor: 'not-allowed',
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
    width: '80px',
  },
  label: {
    fontSize: '14px',
    color: '#68697f',
  },
  resultsTable: {
    width: '100%',
    borderCollapse: 'collapse' as const,
    marginBottom: '24px',
    fontSize: '14px',
  },
  th: {
    padding: '12px 8px',
    textAlign: 'left' as const,
    borderBottom: '2px solid #e6e4eb',
    backgroundColor: '#f7f5fa',
    fontWeight: 600,
  },
  thRight: {
    padding: '12px 8px',
    textAlign: 'right' as const,
    borderBottom: '2px solid #e6e4eb',
    backgroundColor: '#f7f5fa',
    fontWeight: 600,
  },
  td: {
    padding: '12px 8px',
    borderBottom: '1px solid #e6e4eb',
  },
  tdRight: {
    padding: '12px 8px',
    borderBottom: '1px solid #e6e4eb',
    textAlign: 'right' as const,
    fontFamily: 'monospace',
  },
  positive: {
    color: '#d1435b',
    fontWeight: 500,
  },
  negative: {
    color: '#0c838a',
    fontWeight: 500,
  },
  neutral: {
    color: '#68697f',
  },
  running: {
    padding: '16px',
    backgroundColor: '#e8f4fd',
    borderRadius: '8px',
    marginBottom: '24px',
  },
  progressBar: {
    height: '4px',
    backgroundColor: '#e6e4eb',
    borderRadius: '2px',
    overflow: 'hidden',
    marginTop: '8px',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#0062e3',
    transition: 'width 0.3s ease',
  },
  summary: {
    padding: '16px',
    backgroundColor: '#f7f5fa',
    borderRadius: '8px',
    marginBottom: '24px',
  },
  rawData: {
    marginTop: '24px',
    padding: '16px',
    backgroundColor: '#f7f5fa',
    borderRadius: '8px',
    fontSize: '12px',
    fontFamily: 'monospace',
    whiteSpace: 'pre-wrap' as const,
    maxHeight: '300px',
    overflow: 'auto',
  },
  note: {
    padding: '12px 16px',
    backgroundColor: '#fff8e6',
    borderRadius: '8px',
    marginBottom: '24px',
    fontSize: '13px',
    color: '#8a6d3b',
  },
};

// ============================================================================
// Utility Functions
// ============================================================================

const getMedian = (arr: number[]): number => {
  const sorted = [...arr].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 !== 0
    ? sorted[mid]
    : (sorted[mid - 1] + sorted[mid]) / 2;
};

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// ============================================================================
// Test Cases
// ============================================================================

interface TestCase {
  name: string;
  renderV0: () => React.ReactNode;
  renderV1: () => React.ReactNode;
}

const createTestCases = (count: number): TestCase[] => [
  {
    name: `Primary Button (×${count})`,
    renderV0: () => (
      <>
        {Array.from({ length: count }, (_, i) => (
          <BpkButtonV0 key={i} type={BUTTON_TYPES.primary}>Button {i}</BpkButtonV0>
        ))}
      </>
    ),
    renderV1: () => (
      <>
        {Array.from({ length: count }, (_, i) => (
          <BpkButtonV1 key={i} type={BUTTON_TYPES.primary}>Button {i}</BpkButtonV1>
        ))}
      </>
    ),
  },
  {
    name: `Link Button - String (×${count})`,
    renderV0: () => (
      <>
        {Array.from({ length: count }, (_, i) => (
          <BpkButtonV0 key={i} type={BUTTON_TYPES.link}>Link {i}</BpkButtonV0>
        ))}
      </>
    ),
    renderV1: () => (
      <>
        {Array.from({ length: count }, (_, i) => (
          <BpkButtonV1 key={i} type={BUTTON_TYPES.link}>Link {i}</BpkButtonV1>
        ))}
      </>
    ),
  },
  {
    name: `Link Button - With Icon (×${count})`,
    renderV0: () => (
      <>
        {Array.from({ length: count }, (_, i) => (
          <BpkButtonV0 key={i} type={BUTTON_TYPES.link}>
            Link <AlignedFilterIcon />
          </BpkButtonV0>
        ))}
      </>
    ),
    renderV1: () => (
      <>
        {Array.from({ length: count }, (_, i) => (
          <BpkButtonV1 key={i} type={BUTTON_TYPES.link}>
            Link <AlignedFilterIcon />
          </BpkButtonV1>
        ))}
      </>
    ),
  },
  {
    name: `Link Button - Icon Both Sides (×${count})`,
    renderV0: () => (
      <>
        {Array.from({ length: count }, (_, i) => (
          <BpkButtonV0 key={i} type={BUTTON_TYPES.link}>
            <AlignedFilterIcon /> Link <AlignedFilterIcon />
          </BpkButtonV0>
        ))}
      </>
    ),
    renderV1: () => (
      <>
        {Array.from({ length: count }, (_, i) => (
          <BpkButtonV1 key={i} type={BUTTON_TYPES.link}>
            <AlignedFilterIcon /> Link <AlignedFilterIcon />
          </BpkButtonV1>
        ))}
      </>
    ),
  },
  {
    name: `LinkOnDark - With Icon (×${count})`,
    renderV0: () => (
      <>
        {Array.from({ length: count }, (_, i) => (
          <BpkButtonV0 key={i} type={BUTTON_TYPES.linkOnDark}>
            Link <AlignedFilterIcon />
          </BpkButtonV0>
        ))}
      </>
    ),
    renderV1: () => (
      <>
        {Array.from({ length: count }, (_, i) => (
          <BpkButtonV1 key={i} type={BUTTON_TYPES.linkOnDark}>
            Link <AlignedFilterIcon />
          </BpkButtonV1>
        ))}
      </>
    ),
  },
  {
    name: `Disabled Link (×${count})`,
    renderV0: () => (
      <>
        {Array.from({ length: count }, (_, i) => (
          <BpkButtonV0 key={i} type={BUTTON_TYPES.link} disabled>
            Disabled <AlignedFilterIcon />
          </BpkButtonV0>
        ))}
      </>
    ),
    renderV1: () => (
      <>
        {Array.from({ length: count }, (_, i) => (
          <BpkButtonV1 key={i} type={BUTTON_TYPES.link} disabled>
            Disabled <AlignedFilterIcon />
          </BpkButtonV1>
        ))}
      </>
    ),
  },
];

// ============================================================================
// Main Component
// ============================================================================

export const PerformanceComparison = () => {
  const [results, setResults] = useState<ComparisonResult[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState({ current: 0, total: 0, test: '' });
  const [buttonCount, setButtonCount] = useState(100);
  const [runCount, setRunCount] = useState(10);
  const [showRawData, setShowRawData] = useState(false);

  const runComparison = useCallback(async () => {
    setIsRunning(true);
    setResults([]);
    
    const testCases = createTestCases(buttonCount);
    const totalTests = testCases.length * runCount * 2; // V0 and V1 for each run
    let completedTests = 0;

    const newResults: ComparisonResult[] = [];

    for (const testCase of testCases) {
      const v0Times: number[] = [];
      const v1Times: number[] = [];

      // Warm up
      setProgress({ current: completedTests, total: totalTests, test: `${testCase.name} (warming up)` });
      for (let i = 0; i < 3; i++) {
        testCase.renderV0();
        testCase.renderV1();
      }
      await sleep(50);

      // Run multiple times, alternating V0 and V1
      for (let run = 0; run < runCount; run++) {
        // Test V0
        setProgress({ current: completedTests, total: totalTests, test: `${testCase.name} - V0 Run ${run + 1}` });
        await sleep(10); // Small delay to let UI update
        
        const startV0 = performance.now();
        testCase.renderV0();
        const endV0 = performance.now();
        v0Times.push(endV0 - startV0);
        completedTests++;

        await sleep(20); // Delay between tests

        // Test V1
        setProgress({ current: completedTests, total: totalTests, test: `${testCase.name} - V1 Run ${run + 1}` });
        await sleep(10);
        
        const startV1 = performance.now();
        testCase.renderV1();
        const endV1 = performance.now();
        v1Times.push(endV1 - startV1);
        completedTests++;

        await sleep(20);
      }

      const v0Median = getMedian(v0Times);
      const v1Median = getMedian(v1Times);
      const difference = v1Median - v0Median;
      const percentChange = v0Median > 0 
        ? `${difference >= 0 ? '+' : ''}${((difference / v0Median) * 100).toFixed(1)}%`
        : 'N/A';

      newResults.push({
        testCase: testCase.name,
        v0Times,
        v1Times,
        v0Median,
        v1Median,
        difference,
        percentChange,
      });

      setResults([...newResults]);
      await sleep(100); // Delay between test cases
    }

    setIsRunning(false);
    setProgress({ current: 0, total: 0, test: '' });
  }, [buttonCount, runCount]);

  const getChangeStyle = (diff: number) => {
    if (Math.abs(diff) < 0.5) return styles.neutral;
    return diff > 0 ? styles.positive : styles.negative;
  };

  // Calculate overall summary
  const linkWithIconResult = results.find(r => r.testCase.includes('Link Button - With Icon'));
  const primaryResult = results.find(r => r.testCase.includes('Primary Button'));

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>V0 vs V1 Performance Comparison</h1>
        <p style={styles.subtitle}>
          Compare button rendering performance before (V0) and after (V1) adding icon detection logic.
          Uses median of multiple runs to reduce variance.
        </p>
      </div>

      <div style={styles.note}>
        <strong>📊 Methodology:</strong> Each test runs {runCount} times, alternating between V0 and V1.
        Results show <strong>median</strong> time (more stable than average). 
        Difference &lt;1ms is considered negligible for real-world usage.
      </div>

      {/* Controls */}
      <div style={styles.controls}>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Buttons per test:</label>
          <input
            type="number"
            value={buttonCount}
            onChange={(e) => setButtonCount(Math.max(10, Number(e.target.value)))}
            style={styles.input}
            min={10}
            max={500}
            disabled={isRunning}
          />
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>Runs per test:</label>
          <input
            type="number"
            value={runCount}
            onChange={(e) => setRunCount(Math.max(3, Number(e.target.value)))}
            style={styles.input}
            min={3}
            max={20}
            disabled={isRunning}
          />
        </div>

        <button
          style={{ ...styles.button, ...(isRunning ? styles.buttonDisabled : {}) }}
          onClick={runComparison}
          disabled={isRunning}
        >
          {isRunning ? 'Running...' : 'Run Comparison'}
        </button>

        {results.length > 0 && (
          <button
            style={{ ...styles.button, backgroundColor: '#68697f' }}
            onClick={() => setShowRawData(!showRawData)}
          >
            {showRawData ? 'Hide' : 'Show'} Raw Data
          </button>
        )}
      </div>

      {/* Progress */}
      {isRunning && (
        <div style={styles.running}>
          <div>Running: {progress.test}</div>
          <div style={styles.progressBar}>
            <div 
              style={{ 
                ...styles.progressFill, 
                width: `${(progress.current / progress.total) * 100}%` 
              }} 
            />
          </div>
          <div style={{ marginTop: '4px', fontSize: '12px', color: '#68697f' }}>
            {progress.current} / {progress.total} tests completed
          </div>
        </div>
      )}

      {/* Summary */}
      {linkWithIconResult && primaryResult && (
        <div style={styles.summary}>
          <h3 style={{ margin: '0 0 12px 0', fontSize: '16px' }}>Summary</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
            <div>
              <div style={{ fontSize: '12px', color: '#68697f' }}>Primary (baseline)</div>
              <div style={{ fontSize: '20px', fontWeight: 600 }}>
                {primaryResult.percentChange}
              </div>
            </div>
            <div>
              <div style={{ fontSize: '12px', color: '#68697f' }}>Link + Icon (key case)</div>
              <div style={{ fontSize: '20px', fontWeight: 600, ...getChangeStyle(linkWithIconResult.difference) }}>
                {linkWithIconResult.percentChange}
              </div>
            </div>
            <div>
              <div style={{ fontSize: '12px', color: '#68697f' }}>Absolute diff</div>
              <div style={{ fontSize: '20px', fontWeight: 600 }}>
                {linkWithIconResult.difference.toFixed(2)}ms
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Results Table */}
      {results.length > 0 && (
        <table style={styles.resultsTable}>
          <thead>
            <tr>
              <th style={styles.th}>Test Case</th>
              <th style={styles.thRight}>V0 (Before)</th>
              <th style={styles.thRight}>V1 (After)</th>
              <th style={styles.thRight}>Difference</th>
              <th style={styles.thRight}>Change</th>
            </tr>
          </thead>
          <tbody>
            {results.map((result) => (
              <tr key={result.testCase}>
                <td style={styles.td}>{result.testCase}</td>
                <td style={styles.tdRight}>{result.v0Median.toFixed(2)}ms</td>
                <td style={styles.tdRight}>{result.v1Median.toFixed(2)}ms</td>
                <td style={styles.tdRight}>
                  {result.difference >= 0 ? '+' : ''}{result.difference.toFixed(2)}ms
                </td>
                <td style={{ ...styles.tdRight, ...getChangeStyle(result.difference) }}>
                  {result.percentChange}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Raw Data */}
      {showRawData && results.length > 0 && (
        <div style={styles.rawData}>
          <strong>Raw Timing Data (all runs in ms):</strong>
          {'\n\n'}
          {results.map((r) => (
            `${r.testCase}:\n` +
            `  V0: [${r.v0Times.map(t => t.toFixed(2)).join(', ')}]\n` +
            `  V1: [${r.v1Times.map(t => t.toFixed(2)).join(', ')}]\n\n`
          )).join('')}
        </div>
      )}

      {/* Legend */}
      <div style={{ fontSize: '13px', color: '#68697f', marginTop: '24px' }}>
        <strong>Legend:</strong>
        <span style={{ ...styles.positive, marginLeft: '16px' }}>● Red = Slower (V1 &gt; V0)</span>
        <span style={{ ...styles.negative, marginLeft: '16px' }}>● Green = Faster (V1 &lt; V0)</span>
        <span style={{ ...styles.neutral, marginLeft: '16px' }}>● Gray = Negligible (&lt;0.5ms)</span>
      </div>
    </div>
  );
};

export default PerformanceComparison;

