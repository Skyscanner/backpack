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
import fs from 'node:fs';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

import {
  formatAddedTokensMarkdown,
  formatChangedTokenValuesMarkdown,
  formatDeletedTokensMarkdown,
  formatRenamedTokensMarkdown,
  summariseTokenReleaseChangesFromGit,
} from './classify-release-label';
import { formatFatalError } from './sync-helpers';

const GITHUB_OUTPUT_LABEL = 'label';

function writeLabelOutput(label: string): void {
  if (process.env.GITHUB_OUTPUT) {
    fs.appendFileSync(
      process.env.GITHUB_OUTPUT,
      `${GITHUB_OUTPUT_LABEL}=${label}\n`,
    );
    return;
  }

  console.log(label);
}

function writeTokenReleaseSummary(markdown: string): void {
  if (!process.env.TOKEN_RELEASE_SUMMARY_PATH) {
    return;
  }

  fs.writeFileSync(
    process.env.TOKEN_RELEASE_SUMMARY_PATH,
    markdown ? `${markdown}\n` : '',
    'utf8',
  );
}

function main(): void {
  const summary = summariseTokenReleaseChangesFromGit();
  writeLabelOutput(summary.label);

  const sections = [
    formatRenamedTokensMarkdown(summary.renamedTokens),
    formatChangedTokenValuesMarkdown(summary.changedTokens),
    formatDeletedTokensMarkdown(summary.deletedTokens),
    formatAddedTokensMarkdown(summary.addedTokens),
  ].filter(Boolean);

  writeTokenReleaseSummary(sections.join('\n\n'));
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  try {
    main();
  } catch (error: unknown) {
    console.error(formatFatalError(error));
    process.exit(1);
  }
}
