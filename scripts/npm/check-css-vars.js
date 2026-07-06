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

/* eslint-disable no-console */

const { execSync } = require('child_process');
const fs = require('fs');

const BASE_CSS = 'packages/backpack-web/src/bpk-stylesheets/base.css';

// Only check these source extensions; skip compiled .module.css outputs
const SOURCE_GLOB = ['*.scss', '*.tsx', '*.ts', '*.js', '*.jsx'];
// Skip compiled CSS module outputs and node_modules
const SKIP_REGEX = /(\bnode_modules\b|\.module\.css$)/;

function extractDefinedVars(cssPath) {
  const content = fs.readFileSync(cssPath, 'utf8');
  const defined = new Set();
  const re = /(--bpk-[a-z0-9-]+)\s*:/g;
  let m = re.exec(content);
  while (m !== null) {
    defined.add(m[1]);
    m = re.exec(content);
  }
  return defined;
}

// Parse added lines from a unified diff, returning { file, line, content }[]
function parseAddedLines(diff) {
  const results = [];
  let currentFile = null;
  let currentNewLine = 0;

  for (const line of diff.split('\n')) {
    if (line.startsWith('+++ b/')) {
      currentFile = line.slice(6);
      if (SKIP_REGEX.test(currentFile)) currentFile = null;
    } else if (line.startsWith('@@ ')) {
      const lineMatch = line.match(/\+(\d+)/);
      if (lineMatch) currentNewLine = parseInt(lineMatch[1], 10) - 1;
    } else if (line.startsWith('+') && !line.startsWith('+++')) {
      currentNewLine += 1;
      if (currentFile) {
        results.push({
          file: currentFile,
          line: currentNewLine,
          content: line.slice(1),
        });
      }
    } else if (!line.startsWith('-')) {
      currentNewLine += 1;
    }
  }

  return results;
}

function getDiff() {
  try {
    const globs = SOURCE_GLOB.map((g) => `"${g}"`).join(' ');
    return execSync(
      `git diff origin/main --unified=0 --diff-filter=ACMR -- ${globs}`,
      { encoding: 'utf8' },
    );
  } catch {
    return '';
  }
}

function findViolations(addedLines, definedVars) {
  const violations = [];
  const re = /var\((--bpk-[a-z0-9-]+)/g;

  for (const { content, file, line } of addedLines) {
    re.lastIndex = 0;
    let m = re.exec(content);
    while (m !== null) {
      const varName = m[1];
      if (!definedVars.has(varName)) {
        violations.push({ file, line, varName });
      }
      m = re.exec(content);
    }
  }

  return violations;
}

const useJson = process.argv.includes('--json');

if (!fs.existsSync(BASE_CSS)) {
  const msg = `Could not find base.css at ${BASE_CSS}`;
  if (useJson) console.log(JSON.stringify({ error: msg, violations: [] }));
  else console.error(msg);
  process.exit(1);
}

const definedVars = extractDefinedVars(BASE_CSS);
const diff = getDiff();
const addedLines = parseAddedLines(diff);
const violations = findViolations(addedLines, definedVars);

if (useJson) {
  console.log(JSON.stringify({ violations }));
} else if (violations.length === 0) {
  console.log('All CSS vars in changed lines are defined in base.css. 👍');
} else {
  console.log(
    `Found ${violations.length} CSS var(s) used in new lines but not defined in base.css:\n`,
  );
  violations.forEach(({ file, line, varName }) => {
    console.log(`  ${file}:${line}  ${varName}`);
  });
  console.log('');
}

process.exit(violations.length > 0 ? 1 : 0);
