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
import { execFile } from "node:child_process";
import { readFileSync } from "node:fs";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);

type GitHubEventPayload = {
  pull_request?: {
    base?: {
      sha?: string;
    };
  };
};

// Intentionally limited to `pull_request`: `pull_request_target` runs in the
// context of the base branch (GITHUB_REF=refs/heads/<base>), which would make
// the main-branch detection in run.ts win and silently drop the guard to
// the main reporting path even though the workflow logically targets a PR.
// Consumers that need PR-level guarding should use `pull_request`.
export const isPullRequestEvent = () =>
  process.env.GITHUB_EVENT_NAME === "pull_request";

export const isMainBranch = () => process.env.GITHUB_REF === "refs/heads/main";

const readBaseShaFromEvent = () => {
  const eventPath = process.env.GITHUB_EVENT_PATH;
  if (!eventPath) {
    return null;
  }

  try {
    const payload = JSON.parse(
      readFileSync(eventPath, "utf8"),
    ) as GitHubEventPayload;
    return payload.pull_request?.base?.sha || null;
  } catch {
    return null;
  }
};

export const getPullRequestBaseRef = () =>
  readBaseShaFromEvent() ||
  (process.env.GITHUB_BASE_REF
    ? `origin/${process.env.GITHUB_BASE_REF}`
    : null);

// Make the base commit available locally even when the consumer used a shallow
// `actions/checkout` (the default). Tries the exact base SHA first (cheapest
// on github.com), then falls back to the base branch name. Both attempts are
// best-effort: if they fail, the subsequent `git worktree add` will surface
// a clear error and `evaluateGuard` will turn it into a fail/warn result.
const ensureBaseRefAvailable = async (
  repoPath: string,
  log: (message: string) => void,
) => {
  const baseSha = readBaseShaFromEvent();
  const baseBranch = process.env.GITHUB_BASE_REF;

  if (baseSha) {
    try {
      await execFileAsync("git", [
        "-C",
        repoPath,
        "fetch",
        "origin",
        baseSha,
        "--depth=1",
      ]);
      return;
    } catch {
      // Some git servers reject fetch-by-SHA; fall through.
    }
  }

  if (baseBranch) {
    try {
      await execFileAsync("git", [
        "-C",
        repoPath,
        "fetch",
        "origin",
        baseBranch,
        "--depth=1",
      ]);
      return;
    } catch {
      // Fall through; let the worktree command surface the real error.
    }
  }

  log(
    "Could not pre-fetch base ref; relying on local git history. Set `fetch-depth: 0` on actions/checkout if base comparison fails.",
  );
};

export type WithBaseWorktreeOptions = {
  log?: (message: string) => void;
};

export const withBaseWorktree = async <T>(
  repoPath: string,
  baseRef: string,
  callback: (basePath: string) => Promise<T>,
  options: WithBaseWorktreeOptions = {},
) => {
  const log = options.log || (() => undefined);
  const parentDirectory = await mkdtemp(
    join(tmpdir(), "backpack-adoption-base-"),
  );
  const basePath = join(parentDirectory, "base");

  try {
    await ensureBaseRefAvailable(repoPath, log);

    await execFileAsync("git", [
      "-C",
      repoPath,
      "worktree",
      "add",
      "--detach",
      basePath,
      baseRef,
    ]);

    return await callback(basePath);
  } finally {
    await execFileAsync("git", [
      "-C",
      repoPath,
      "worktree",
      "remove",
      "--force",
      basePath,
    ]).catch(() => undefined);
    await rm(parentDirectory, { force: true, recursive: true }).catch(
      () => undefined,
    );
  }
};
