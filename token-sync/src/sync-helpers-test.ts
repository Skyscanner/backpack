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

import { FigmaApiError, type LocalVariableCollection } from './figma-api';
import {
  credentialLocation,
  filterLocalTargets,
  formatFatalError,
  isCI,
  requireEnv,
} from './sync-helpers';

// The real shape has many required fields we don't care about for filter logic.
// Cast through `unknown` to keep the test data minimal.
function makeCollection(
  name: string,
  remote = false,
): LocalVariableCollection {
  return { name, remote, modes: [] } as unknown as LocalVariableCollection;
}

describe('isCI / credentialLocation', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    process.env = { ...originalEnv };
    delete process.env.GITHUB_ACTIONS;
    delete process.env.CI;
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  it('isCI returns false by default, true for any non-empty GITHUB_ACTIONS / CI value', () => {
    expect(isCI()).toBe(false);

    // Empty string should still be treated as "not CI".
    process.env.CI = '';
    expect(isCI()).toBe(false);

    process.env.GITHUB_ACTIONS = 'true';
    expect(isCI()).toBe(true);

    delete process.env.GITHUB_ACTIONS;
    process.env.CI = 'true';
    expect(isCI()).toBe(true);

    // Other truthy values some CI providers use.
    process.env.CI = '1';
    expect(isCI()).toBe(true);
  });

  it('credentialLocation points to the .env file locally and to the repo secret in CI', () => {
    expect(credentialLocation('FOO')).toBe(
      'FOO in token-sync/.env (see token-sync/.env.example)',
    );

    process.env.GITHUB_ACTIONS = 'true';
    expect(credentialLocation('FOO')).toBe(
      'the "FOO" repository secret (Settings → Secrets and variables → Actions)',
    );
  });
});

describe('requireEnv', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    process.env = { ...originalEnv };
    delete process.env.GITHUB_ACTIONS;
    delete process.env.CI;
    delete process.env.TEST_TOKEN_SYNC_REQUIRE_ENV;
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  it('returns the trimmed value when the env var is set', () => {
    process.env.TEST_TOKEN_SYNC_REQUIRE_ENV = '  hello  ';
    expect(requireEnv('TEST_TOKEN_SYNC_REQUIRE_ENV')).toBe('hello');
  });

  it('throws a CI-aware message when the env var is missing', () => {
    expect(() => requireEnv('TEST_TOKEN_SYNC_REQUIRE_ENV')).toThrow(
      'Missing required environment variable: TEST_TOKEN_SYNC_REQUIRE_ENV. Set TEST_TOKEN_SYNC_REQUIRE_ENV in token-sync/.env (see token-sync/.env.example).',
    );
  });
});

describe('filterLocalTargets', () => {
  const backpackLocal = makeCollection('Backpack', false);
  const backpackRemote = makeCollection('Backpack', true);
  const primitives = makeCollection('Primitives', false);
  const vdl = makeCollection('VDL', false);

  it('keeps only non-remote collections matching a target name, with no missing', () => {
    const result = filterLocalTargets(
      [backpackLocal, backpackRemote, primitives, vdl],
      ['Backpack', 'Primitives'],
    );

    expect(result.matched).toEqual([backpackLocal, primitives]);
    expect(result.missingNames).toEqual([]);
    expect(result.availableLocalNames).toEqual([
      'Backpack',
      'Primitives',
      'VDL',
    ]);
  });

  it('reports missingNames when a target has only a remote variant, not local', () => {
    const result = filterLocalTargets(
      [primitives, backpackRemote],
      ['Backpack', 'Primitives'],
    );

    expect(result.matched).toEqual([primitives]);
    expect(result.missingNames).toEqual(['Backpack']);
    expect(result.availableLocalNames).toEqual(['Primitives']);
  });

  it('returns no matches plus a full availableLocalNames list when nothing matches', () => {
    const result = filterLocalTargets(
      [vdl, backpackRemote],
      ['Backpack', 'Primitives'],
    );

    expect(result.matched).toEqual([]);
    expect(result.missingNames).toEqual(['Backpack', 'Primitives']);
    expect(result.availableLocalNames).toEqual(['VDL']);
  });
});

describe('formatFatalError', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    process.env = { ...originalEnv };
    delete process.env.GITHUB_ACTIONS;
    delete process.env.CI;
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  it.each([401, 403])(
    'returns an auth-failure message pointing at FIGMA_VARIABLES_SYNC_TOKEN for FigmaApiError status %s',
    (status) => {
      const message = formatFatalError(
        new FigmaApiError(status, '/files/x/variables/local', 'denied'),
      );
      expect(message).toContain(`Authentication failed (${status})`);
      expect(message).toMatch(
        /FIGMA_VARIABLES_SYNC_TOKEN[\s\S]*(\.env|repository secret)/,
      );
    },
  );

  it('returns a file-not-found message pointing at FIGMA_FILE_KEY for FigmaApiError 404', () => {
    const message = formatFatalError(
      new FigmaApiError(404, '/files/bad/variables/local', 'not found'),
    );
    expect(message).toContain('File not found (404)');
    expect(message).toContain('FIGMA_FILE_KEY');
  });

  it('falls back to FigmaApiError.message for other status codes', () => {
    const error = new FigmaApiError(500, '/files/x/variables/local', 'boom');
    expect(formatFatalError(error)).toBe(error.message);
  });

  it('returns the message of a non-FigmaApiError Error', () => {
    expect(formatFatalError(new Error('regular error'))).toBe('regular error');
  });

  it('wraps unknown non-Error throws in an "Unknown error:" prefix', () => {
    expect(formatFatalError('oops')).toBe('Unknown error: oops');
    expect(formatFatalError(42)).toBe('Unknown error: 42');
  });
});
