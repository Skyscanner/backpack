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
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const DEFAULT_TOKENS_DIR = 'token-sync/tokens';
const MANIFEST_FILE_NAME = 'manifest.json';

export type ReleaseLabel = 'major' | 'minor';

type PlainObject = Record<string, unknown>;

export interface TokenFileChange {
  current: unknown;
  previous: unknown;
}

function git(args: string[]): string[] {
  return execFileSync('git', args, { encoding: 'utf8' })
    .split('\n')
    .filter(Boolean);
}

export function listTokenJsonFiles(tokensDir = DEFAULT_TOKENS_DIR): string[] {
  const tracked = git(['ls-files', tokensDir]);
  const untracked = git(['ls-files', '--others', '--exclude-standard', '--', tokensDir]);

  return Array.from(new Set([...tracked, ...untracked]))
    .filter((file) => file.endsWith('.json'))
    .filter((file) => path.basename(file) !== MANIFEST_FILE_NAME)
    .sort();
}

export function readCurrentJson(file: string): unknown {
  if (!fs.existsSync(file)) {
    return undefined;
  }

  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

function stringifyErrorOutput(output: unknown): string {
  if (Buffer.isBuffer(output)) {
    return output.toString('utf8');
  }

  return typeof output === 'string' ? output : '';
}

function isMissingHeadPathError(error: unknown): boolean {
  const gitError = error as { message?: string; status?: number; stderr?: unknown };
  const errorText = `${stringifyErrorOutput(gitError.stderr)} ${gitError.message ?? ''}`;

  return (
    gitError.status === 128 &&
    /does not exist in 'HEAD'|exists on disk, but not in 'HEAD'/.test(errorText)
  );
}

export function readHeadJson(file: string): unknown {
  let source: string;

  try {
    source = execFileSync('git', ['show', `HEAD:${file}`], { encoding: 'utf8' });
  } catch (error: unknown) {
    if (isMissingHeadPathError(error)) {
      return undefined;
    }

    throw error;
  }

  return JSON.parse(source);
}

function isObject(value: unknown): value is PlainObject {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function normalise(value: unknown): unknown {
  if (!isObject(value)) {
    return value;
  }

  const result: PlainObject = {};
  Object.keys(value)
    .sort()
    .forEach((key) => {
      result[key] = normalise(value[key]);
    });

  return result;
}

function collectTokens(
  node: unknown,
  prefix: string[] = [],
  inheritedType?: unknown,
): Map<string, string> {
  if (!isObject(node)) {
    return new Map();
  }

  const tokenType = node.$type ?? inheritedType;

  if (Object.prototype.hasOwnProperty.call(node, '$value')) {
    return new Map([
      [prefix.join('/'), JSON.stringify(normalise({ ...node, $type: tokenType }))],
    ]);
  }

  const tokens = new Map<string, string>();
  Object.entries(node)
    .filter(([key]) => !key.startsWith('$'))
    .forEach(([key, value]) => {
      collectTokens(value, [...prefix, key], tokenType).forEach((tokenValue, tokenPath) => {
        tokens.set(tokenPath, tokenValue);
      });
    });

  return tokens;
}

export function classifyTokenReleaseLabel(files: TokenFileChange[]): ReleaseLabel {
  for (const file of files) {
    const previousTokens = collectTokens(file.previous);
    const currentTokens = collectTokens(file.current);

    for (const [tokenPath, previousValue] of Array.from(previousTokens.entries())) {
      if (!currentTokens.has(tokenPath) || currentTokens.get(tokenPath) !== previousValue) {
        return 'major';
      }
    }
  }

  return 'minor';
}

export function classifyTokenReleaseLabelFromGit(
  tokensDir = DEFAULT_TOKENS_DIR,
): ReleaseLabel {
  return classifyTokenReleaseLabel(
    listTokenJsonFiles(tokensDir).map((file) => ({
      current: readCurrentJson(file),
      previous: readHeadJson(file),
    })),
  );
}
