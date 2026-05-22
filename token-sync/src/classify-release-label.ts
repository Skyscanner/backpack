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
  fileName?: string;
  previous: unknown;
}

export interface TokenPathChange {
  fileName: string;
  tokenPath: string;
}

export interface TokenRenameChange {
  currentTokenPath: string;
  fileName: string;
  previousTokenPath: string;
}

export interface TokenReleaseSummary {
  addedTokens: TokenPathChange[];
  changedTokens: TokenPathChange[];
  classificationMethod: 'figma-key' | 'token-path';
  deletedTokens: TokenPathChange[];
  deletedOrRenamedTokens: TokenPathChange[];
  label: ReleaseLabel;
  renamedTokens: TokenRenameChange[];
}

function git(args: string[]): string[] {
  return execFileSync('git', args, { encoding: 'utf8' })
    .split('\n')
    .filter(Boolean);
}

export function listTokenJsonFiles(tokensDir = DEFAULT_TOKENS_DIR): string[] {
  const tracked = git(['ls-files', tokensDir]);
  const untracked = git([
    'ls-files',
    '--others',
    '--exclude-standard',
    '--',
    tokensDir,
  ]);

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
  const gitError = error as {
    message?: string;
    status?: number;
    stderr?: unknown;
  };
  const errorText = `${stringifyErrorOutput(gitError.stderr)} ${gitError.message ?? ''}`;

  return (
    gitError.status === 128 &&
    /does not exist in 'HEAD'|exists on disk, but not in 'HEAD'/.test(errorText)
  );
}

export function readHeadJson(file: string): unknown {
  let source: string;

  try {
    source = execFileSync('git', ['show', `HEAD:${file}`], {
      encoding: 'utf8',
    });
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

function tokenFingerprint(node: PlainObject, tokenType: unknown): string {
  const tokenWithoutExtensions: PlainObject = {};
  Object.entries(node).forEach(([key, value]) => {
    if (key !== '$extensions') {
      tokenWithoutExtensions[key] = value;
    }
  });

  return JSON.stringify(
    normalise({ ...tokenWithoutExtensions, $type: tokenType }),
  );
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
    return new Map([[prefix.join('/'), tokenFingerprint(node, tokenType)]]);
  }

  const tokens = new Map<string, string>();
  Object.entries(node)
    .filter(([key]) => !key.startsWith('$'))
    .forEach(([key, value]) => {
      collectTokens(value, [...prefix, key], tokenType).forEach(
        (tokenValue, tokenPath) => {
          tokens.set(tokenPath, tokenValue);
        },
      );
    });

  return tokens;
}

interface FigmaTokenRecord extends TokenPathChange {
  figmaId: string;
  figmaKey: string;
  value: string;
}

interface CollectedFigmaTokens {
  tokenCount: number;
  tokens: FigmaTokenRecord[];
}

function readFigmaMetadata(
  node: PlainObject,
): { id: string; key: string } | undefined {
  if (!isObject(node.$extensions)) {
    return undefined;
  }

  const { figma } = node.$extensions;
  if (
    !isObject(figma) ||
    typeof figma.id !== 'string' ||
    typeof figma.key !== 'string'
  ) {
    return undefined;
  }

  return { id: figma.id, key: figma.key };
}

function collectFigmaTokens(
  node: unknown,
  fileName: string,
  prefix: string[] = [],
  inheritedType?: unknown,
): CollectedFigmaTokens {
  if (!isObject(node)) {
    return { tokenCount: 0, tokens: [] };
  }

  const tokenType = node.$type ?? inheritedType;

  if (Object.prototype.hasOwnProperty.call(node, '$value')) {
    const metadata = readFigmaMetadata(node);
    if (!metadata) {
      return { tokenCount: 1, tokens: [] };
    }

    return {
      tokenCount: 1,
      tokens: [
        {
          figmaId: metadata.id,
          figmaKey: metadata.key,
          fileName,
          tokenPath: prefix.join('/'),
          value: tokenFingerprint(node, tokenType),
        },
      ],
    };
  }

  return Object.entries(node)
    .filter(([key]) => !key.startsWith('$'))
    .reduce<CollectedFigmaTokens>(
      (result, [key, value]) => {
        const child = collectFigmaTokens(
          value,
          fileName,
          [...prefix, key],
          tokenType,
        );
        return {
          tokenCount: result.tokenCount + child.tokenCount,
          tokens: [...result.tokens, ...child.tokens],
        };
      },
      { tokenCount: 0, tokens: [] },
    );
}

function displayFileName(fileName?: string): string {
  return fileName ? path.basename(fileName) : 'tokens';
}

function tokenIdentity(token: FigmaTokenRecord): string {
  return `${token.fileName}:${token.figmaKey}`;
}

function mapFigmaTokens(
  tokens: FigmaTokenRecord[],
): Map<string, FigmaTokenRecord> {
  const mapped = new Map<string, FigmaTokenRecord>();

  tokens.forEach((token) => {
    const identity = tokenIdentity(token);
    if (mapped.has(identity)) {
      throw new Error(
        `Duplicate Figma variable key "${token.figmaKey}" in ${token.fileName}.`,
      );
    }
    mapped.set(identity, token);
  });

  return mapped;
}

function buildSummary({
  addedTokens,
  changedTokens,
  classificationMethod,
  deletedTokens,
  renamedTokens,
}: {
  addedTokens: TokenPathChange[];
  changedTokens: TokenPathChange[];
  classificationMethod: TokenReleaseSummary['classificationMethod'];
  deletedTokens: TokenPathChange[];
  renamedTokens: TokenRenameChange[];
}): TokenReleaseSummary {
  const deletedOrRenamedTokens = [
    ...deletedTokens,
    ...renamedTokens.map(({ fileName, previousTokenPath }) => ({
      fileName,
      tokenPath: previousTokenPath,
    })),
  ];

  return {
    addedTokens,
    changedTokens,
    classificationMethod,
    deletedTokens,
    deletedOrRenamedTokens,
    label:
      deletedTokens.length > 0 ||
      renamedTokens.length > 0 ||
      changedTokens.length > 0
        ? 'major'
        : 'minor',
    renamedTokens,
  };
}

function summariseFigmaTokenReleaseChanges(
  previousTokens: FigmaTokenRecord[],
  currentTokens: FigmaTokenRecord[],
): TokenReleaseSummary {
  const addedTokens: TokenPathChange[] = [];
  const changedTokens: TokenPathChange[] = [];
  const deletedTokens: TokenPathChange[] = [];
  const renamedTokens: TokenRenameChange[] = [];
  const previousByIdentity = mapFigmaTokens(previousTokens);
  const currentByIdentity = mapFigmaTokens(currentTokens);

  previousByIdentity.forEach((previousToken, identity) => {
    const currentToken = currentByIdentity.get(identity);
    if (!currentToken) {
      deletedTokens.push({
        fileName: previousToken.fileName,
        tokenPath: previousToken.tokenPath,
      });
      return;
    }

    if (previousToken.tokenPath !== currentToken.tokenPath) {
      renamedTokens.push({
        currentTokenPath: currentToken.tokenPath,
        fileName: currentToken.fileName,
        previousTokenPath: previousToken.tokenPath,
      });
      return;
    }

    if (previousToken.value !== currentToken.value) {
      changedTokens.push({
        fileName: currentToken.fileName,
        tokenPath: currentToken.tokenPath,
      });
    }
  });

  currentByIdentity.forEach((currentToken, identity) => {
    if (!previousByIdentity.has(identity)) {
      addedTokens.push({
        fileName: currentToken.fileName,
        tokenPath: currentToken.tokenPath,
      });
    }
  });

  return buildSummary({
    addedTokens,
    changedTokens,
    classificationMethod: 'figma-key',
    deletedTokens,
    renamedTokens,
  });
}

function summariseTokenPathReleaseChanges(
  files: TokenFileChange[],
): TokenReleaseSummary {
  const addedTokens: TokenPathChange[] = [];
  const changedTokens: TokenPathChange[] = [];
  const deletedTokens: TokenPathChange[] = [];

  for (const file of files) {
    const previousTokens = collectTokens(file.previous);
    const currentTokens = collectTokens(file.current);
    const fileName = displayFileName(file.fileName);

    for (const [tokenPath, previousValue] of Array.from(
      previousTokens.entries(),
    )) {
      if (!currentTokens.has(tokenPath)) {
        deletedTokens.push({ fileName, tokenPath });
      } else if (currentTokens.get(tokenPath) !== previousValue) {
        changedTokens.push({ fileName, tokenPath });
      }
    }

    for (const tokenPath of Array.from(currentTokens.keys())) {
      if (!previousTokens.has(tokenPath)) {
        addedTokens.push({ fileName, tokenPath });
      }
    }
  }

  return buildSummary({
    addedTokens,
    changedTokens,
    classificationMethod: 'token-path',
    deletedTokens,
    renamedTokens: [],
  });
}

export function summariseTokenReleaseChanges(
  files: TokenFileChange[],
): TokenReleaseSummary {
  const figmaFiles = files.map((file) => {
    const fileName = displayFileName(file.fileName);
    return {
      current: collectFigmaTokens(file.current, fileName),
      previous: collectFigmaTokens(file.previous, fileName),
    };
  });

  const canUseFigmaMetadata =
    figmaFiles.some(
      ({ current, previous }) =>
        current.tokenCount > 0 || previous.tokenCount > 0,
    ) &&
    figmaFiles.every(
      ({ current, previous }) =>
        current.tokenCount === current.tokens.length &&
        previous.tokenCount === previous.tokens.length,
    );

  if (canUseFigmaMetadata) {
    return summariseFigmaTokenReleaseChanges(
      figmaFiles.flatMap(({ previous }) => previous.tokens),
      figmaFiles.flatMap(({ current }) => current.tokens),
    );
  }

  return summariseTokenPathReleaseChanges(files);
}

export function classifyTokenReleaseLabel(
  files: TokenFileChange[],
): ReleaseLabel {
  return summariseTokenReleaseChanges(files).label;
}

export function formatDeletedTokensMarkdown(
  deletedTokens: TokenPathChange[],
  limit = 50,
): string {
  if (deletedTokens.length === 0) {
    return '';
  }

  const visibleTokens = deletedTokens.slice(0, limit);
  const tokensByFile = new Map<string, string[]>();
  visibleTokens.forEach(({ fileName, tokenPath }) => {
    tokensByFile.set(fileName, [
      ...(tokensByFile.get(fileName) ?? []),
      tokenPath,
    ]);
  });

  const tokenLines = Array.from(tokensByFile.entries()).flatMap(
    ([fileName, tokenPaths]) => [
      `### ${fileName}`,
      '',
      ...tokenPaths.map((tokenPath) => `- \`${tokenPath}\``),
      '',
    ],
  );

  const lines = [
    '## Deleted tokens',
    '',
    'The following Figma variable keys existed in the previous commit but are missing from the fetched tokens. Treat them as breaking changes and verify usages have been migrated.',
    '',
    ...tokenLines.slice(0, -1),
  ];

  if (deletedTokens.length > visibleTokens.length) {
    lines.push(
      '',
      `And ${deletedTokens.length - visibleTokens.length} more deleted token path(s).`,
    );
  }

  return lines.join('\n');
}

export function formatDeletedOrRenamedTokensMarkdown(
  deletedOrRenamedTokens: TokenPathChange[],
  limit = 50,
): string {
  if (deletedOrRenamedTokens.length === 0) {
    return '';
  }

  const visibleTokens = deletedOrRenamedTokens.slice(0, limit);
  const tokensByFile = new Map<string, string[]>();
  visibleTokens.forEach(({ fileName, tokenPath }) => {
    tokensByFile.set(fileName, [
      ...(tokensByFile.get(fileName) ?? []),
      tokenPath,
    ]);
  });

  const tokenLines = Array.from(tokensByFile.entries()).flatMap(
    ([fileName, tokenPaths]) => [
      `### ${fileName}`,
      '',
      ...tokenPaths.map((tokenPath) => `- \`${tokenPath}\``),
      '',
    ],
  );

  const lines = [
    '## Deleted or renamed tokens',
    '',
    'The following token paths existed in the previous commit but are missing from the fetched tokens. Treat them as breaking changes and verify usages have been migrated.',
    '',
    ...tokenLines.slice(0, -1),
  ];

  if (deletedOrRenamedTokens.length > visibleTokens.length) {
    lines.push(
      '',
      `And ${deletedOrRenamedTokens.length - visibleTokens.length} more deleted or renamed token path(s).`,
    );
  }

  return lines.join('\n');
}

export function formatRenamedTokensMarkdown(
  renamedTokens: TokenRenameChange[],
  limit = 50,
): string {
  if (renamedTokens.length === 0) {
    return '';
  }

  const visibleTokens = renamedTokens.slice(0, limit);
  const tokensByFile = new Map<string, string[]>();
  visibleTokens.forEach(({ currentTokenPath, fileName, previousTokenPath }) => {
    tokensByFile.set(fileName, [
      ...(tokensByFile.get(fileName) ?? []),
      `\`${previousTokenPath}\` -> \`${currentTokenPath}\``,
    ]);
  });

  const tokenLines = Array.from(tokensByFile.entries()).flatMap(
    ([fileName, tokenPaths]) => [
      `### ${fileName}`,
      '',
      ...tokenPaths.map((tokenPath) => `- ${tokenPath}`),
      '',
    ],
  );

  const lines = [
    '## Renamed tokens',
    '',
    'The following token paths changed while the Figma variable key stayed the same. Treat them as breaking changes and verify usages have been migrated.',
    '',
    ...tokenLines.slice(0, -1),
  ];

  if (renamedTokens.length > visibleTokens.length) {
    lines.push(
      '',
      `And ${renamedTokens.length - visibleTokens.length} more renamed token path(s).`,
    );
  }

  return lines.join('\n');
}

export function formatChangedTokenValuesMarkdown(
  changedTokens: TokenPathChange[],
  limit = 50,
): string {
  if (changedTokens.length === 0) {
    return '';
  }

  const visibleTokens = changedTokens.slice(0, limit);
  const tokensByFile = new Map<string, string[]>();
  visibleTokens.forEach(({ fileName, tokenPath }) => {
    tokensByFile.set(fileName, [
      ...(tokensByFile.get(fileName) ?? []),
      tokenPath,
    ]);
  });

  const tokenLines = Array.from(tokensByFile.entries()).flatMap(
    ([fileName, tokenPaths]) => [
      `### ${fileName}`,
      '',
      ...tokenPaths.map((tokenPath) => `- \`${tokenPath}\``),
      '',
    ],
  );

  const lines = [
    '## Changed token values',
    '',
    'The following token values changed while the token path stayed the same. Treat them as potentially breaking — visuals or behaviour driven by these tokens may shift.',
    '',
    ...tokenLines.slice(0, -1),
  ];

  if (changedTokens.length > visibleTokens.length) {
    lines.push(
      '',
      `And ${changedTokens.length - visibleTokens.length} more changed token path(s).`,
    );
  }

  return lines.join('\n');
}

export function formatAddedTokensMarkdown(
  addedTokens: TokenPathChange[],
  limit = 50,
): string {
  if (addedTokens.length === 0) {
    return '';
  }

  const visibleTokens = addedTokens.slice(0, limit);
  const tokensByFile = new Map<string, string[]>();
  visibleTokens.forEach(({ fileName, tokenPath }) => {
    tokensByFile.set(fileName, [
      ...(tokensByFile.get(fileName) ?? []),
      tokenPath,
    ]);
  });

  const tokenLines = Array.from(tokensByFile.entries()).flatMap(
    ([fileName, tokenPaths]) => [
      `### ${fileName}`,
      '',
      ...tokenPaths.map((tokenPath) => `- \`${tokenPath}\``),
      '',
    ],
  );

  const lines = [
    '## Added tokens',
    '',
    'The following token paths are new in this sync. When Figma key metadata is available, these are variables whose keys were not present in the previous generated tokens.',
    '',
    ...tokenLines.slice(0, -1),
  ];

  if (addedTokens.length > visibleTokens.length) {
    lines.push(
      '',
      `And ${addedTokens.length - visibleTokens.length} more added token path(s).`,
    );
  }

  return lines.join('\n');
}

export function summariseTokenReleaseChangesFromGit(
  tokensDir = DEFAULT_TOKENS_DIR,
): TokenReleaseSummary {
  return summariseTokenReleaseChanges(
    listTokenJsonFiles(tokensDir).map((file) => ({
      current: readCurrentJson(file),
      fileName: file,
      previous: readHeadJson(file),
    })),
  );
}

export function classifyTokenReleaseLabelFromGit(
  tokensDir = DEFAULT_TOKENS_DIR,
): ReleaseLabel {
  return summariseTokenReleaseChangesFromGit(tokensDir).label;
}
