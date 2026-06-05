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

export const isPullRequestEvent = () =>
  process.env.GITHUB_EVENT_NAME === "pull_request" ||
  process.env.GITHUB_EVENT_NAME === "pull_request_target";

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

export const withBaseWorktree = async <T>(
  repoPath: string,
  baseRef: string,
  callback: (basePath: string) => Promise<T>,
) => {
  const parentDirectory = await mkdtemp(
    join(tmpdir(), "backpack-adoption-base-"),
  );
  const basePath = join(parentDirectory, "base");

  try {
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