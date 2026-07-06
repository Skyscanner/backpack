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

const { spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const BASE_CSS = 'packages/backpack-web/src/bpk-stylesheets/base.css';

// Allowlisted source extensions — everything else is skipped
const SOURCE_EXTENSIONS = new Set(['.scss', '.tsx', '.ts', '.js', '.jsx']);
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

function isCheckedFile(filePath) {
  if (SKIP_REGEX.test(filePath)) return false;
  return SOURCE_EXTENSIONS.has(path.extname(filePath));
}

// Parse added lines from a unified diff, returning { file, line, content }[]
function parseAddedLines(diff) {
  const results = [];
  let currentFile = null;
  let currentNewLine = 0;
  let insideHunk = false;

  for (const line of diff.split('\n')) {
    if (line.startsWith('+++ b/')) {
      currentFile = isCheckedFile(line.slice(6)) ? line.slice(6) : null;
      insideHunk = false;
    } else if (line.startsWith('@@ ')) {
      const lineMatch = line.match(/\+(\d+)/);
      if (lineMatch) currentNewLine = parseInt(lineMatch[1], 10) - 1;
      insideHunk = true;
    } else if (!insideHunk) {
      // skip diff header lines before the first hunk
    } else if (line.startsWith('\\')) {
      // meta line e.g. "\ No newline at end of file" — do not advance counter
    } else if (line.startsWith('+') && !line.startsWith('+++')) {
      currentNewLine += 1;
      if (currentFile) {
        results.push({
          content: line.slice(1),
          file: currentFile,
          line: currentNewLine,
        });
      }
    } else if (!line.startsWith('-')) {
      // context line
      currentNewLine += 1;
    }
  }

  return results;
}

// Use :(glob) pathspecs so nested files are matched at any depth.
// We still filter by extension in JS (isCheckedFile) as an extra safety net.
// spawnSync with an args array bypasses the shell so :(glob) is passed
// directly to git without shell-quoting issues.
const DIFF_PATHSPECS = [
  ':(glob)**/*.scss',
  ':(glob)**/*.tsx',
  ':(glob)**/*.ts',
  ':(glob)**/*.js',
  ':(glob)**/*.jsx',
];

function getDiff() {
  const result = spawnSync(
    'git',
    [
      'diff',
      'origin/main',
      '--unified=0',
      '--diff-filter=ACMR',
      '--',
      ...DIFF_PATHSPECS,
    ],
    { encoding: 'utf8', maxBuffer: 50 * 1024 * 1024 },
  );
  if (result.error) throw result.error;
  if (result.status !== 0) throw new Error(result.stderr || 'git diff failed');
  return result.stdout;
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

let diff;
try {
  diff = getDiff();
} catch (err) {
  const msg = `git diff failed: ${err.message}`;
  if (useJson) console.log(JSON.stringify({ error: msg, violations: [] }));
  else console.error(msg);
  process.exit(1);
}

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
