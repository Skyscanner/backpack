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
/* eslint-disable no-console -- CLI entry: stdout/stderr output is intentional. */
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

import { runBuildCSS } from './build-css';
import { formatFatalError } from './sync-helpers';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));

// Default layout:
//   token-sync/tokens/   ← Stage 1 DTCG output (`pnpm run tokens:fetch`)
//   token-sync/css/      ← Stage 2 CSS output (`pnpm run tokens:build-css`)
// CSS sits outside `tokens/` so Stage 1's directory-clear doesn't wipe it.
// Both paths overridable via env vars.
const DEFAULT_TOKENS_DIR = path.resolve(scriptDir, '../tokens');
const DEFAULT_BUILD_DIR = path.resolve(scriptDir, '../css');

async function main() {
  const tokensDir = process.env.DTCG_OUTPUT_DIR?.trim() || DEFAULT_TOKENS_DIR;
  const buildDir = process.env.CSS_OUTPUT_DIR?.trim() || DEFAULT_BUILD_DIR;

  console.log(`Building CSS from ${tokensDir} → ${buildDir}`);
  const { outputs } = await runBuildCSS({ tokensDir, buildDir });
  for (const output of outputs) {
    console.log(`  wrote ${path.relative(process.cwd(), output)}`);
  }
  console.log('Done.');
}

main().catch((error: unknown) => {
  console.error(formatFatalError(error));
  process.exit(1);
});
