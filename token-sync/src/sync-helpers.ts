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

import process from 'node:process';

import { FigmaApiError, type LocalVariableCollection } from './figma-api';

export const TARGET_COLLECTION_NAMES = ['Primitives', 'Backpack'] as const;

export function isCI(): boolean {
  // Most CIs set GITHUB_ACTIONS / CI to the string "true", but some use "1" or
  // another truthy value. Treat any non-empty trimmed value as CI.
  return (
    (process.env.GITHUB_ACTIONS?.trim() ?? '') !== '' ||
    (process.env.CI?.trim() ?? '') !== ''
  );
}

export function credentialLocation(name: string): string {
  if (isCI()) {
    return `the "${name}" repository secret (Settings → Secrets and variables → Actions)`;
  }
  return `${name} in token-sync/.env (see token-sync/.env.example)`;
}

export function requireEnv(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(
      `Missing required environment variable: ${name}. ` +
        `Set ${credentialLocation(name)}.`,
    );
  }
  return value;
}

export interface LocalTargetFilterResult {
  matched: LocalVariableCollection[];
  missingNames: string[];
  availableLocalNames: string[];
}

// Keep only collections that are (a) defined locally in this file (not subscribed
// back from a Library as `remote: true`) and (b) whose names are in `targetNames`.
// Returns the match plus `missingNames` (targets with no local match) and
// `availableLocalNames` (every local collection name, for error messaging).
export function filterLocalTargets(
  allCollections: LocalVariableCollection[],
  targetNames: readonly string[],
): LocalTargetFilterResult {
  const matched = allCollections.filter(
    (collection) =>
      !collection.remote && targetNames.includes(collection.name),
  );
  const foundNames = new Set(matched.map((collection) => collection.name));
  const missingNames = targetNames.filter((name) => !foundNames.has(name));
  const availableLocalNames = allCollections
    .filter((collection) => !collection.remote)
    .map((collection) => collection.name);
  return { matched, missingNames, availableLocalNames };
}

// Turn any thrown value into a single user-facing error string. Keeps the
// CI-vs-local hint consistent via `credentialLocation`. Pure — no logging,
// no `process.exit` — so the caller (index.ts) decides how to surface it.
export function formatFatalError(error: unknown): string {
  if (error instanceof FigmaApiError) {
    if (error.status === 403 || error.status === 401) {
      return (
        `Authentication failed (${error.status}). ` +
        `The Figma access token is invalid, expired, or missing the "Variables — Read-only" scope; ` +
        `or the account has no access to the file. ` +
        `Regenerate at https://www.figma.com/settings → Security → Personal access tokens, ` +
        `then update ${credentialLocation('FIGMA_VARIABLES_SYNC_TOKEN')}.`
      );
    }
    if (error.status === 404) {
      return (
        `File not found (404). ` +
        `Check ${credentialLocation('FIGMA_FILE_KEY')} points to a file the account can access.`
      );
    }
    return error.message;
  }
  if (error instanceof Error) {
    return error.message;
  }
  return `Unknown error: ${String(error)}`;
}
