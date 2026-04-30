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

import { config as loadDotenv } from 'dotenv';

import { buildDtcg, formatBuildSummary } from './build-dtcg';
import {
  TARGET_COLLECTION_NAMES,
  formatFatalError,
  requireEnv,
} from './sync-helpers';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
loadDotenv({ path: path.resolve(scriptDir, '../.env') });

const DEFAULT_OUTPUT_DIR = path.resolve(scriptDir, '../tokens');

async function main() {
  const token = requireEnv('FIGMA_VARIABLES_SYNC_TOKEN');
  const fileKey = requireEnv('FIGMA_FILE_KEY');
  const outputDir = process.env.DTCG_OUTPUT_DIR?.trim() || DEFAULT_OUTPUT_DIR;

  console.log('Fetching variable collections from file...');
  const result = await buildDtcg({
    token,
    fileKey,
    targetNames: TARGET_COLLECTION_NAMES,
    outputDir,
  });

  for (const line of formatBuildSummary(result)) {
    console.log(line);
  }
  console.log('Done.');
}

main().catch((error: unknown) => {
  console.error(formatFatalError(error));
  process.exit(1);
});
