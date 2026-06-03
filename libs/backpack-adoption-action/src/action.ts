import { mkdir, writeFile } from "node:fs/promises";
import { basename, dirname, resolve } from "node:path";

import { createGitHubActionsIO, getBooleanInput } from "./action-io";
import type { ActionIO } from "./action-io";
import { analyzeRepository } from "./analyser";
import {
  BACKPACK_ADOPTION_CORTEX_KEY,
  DEFAULT_OUTPUT_PATH,
  DEFAULT_PATTERN,
} from "./constants";
import { uploadToCortex } from "./cortex";
import { evaluateGuard } from "./guard";
import {
  getPullRequestBaseRef,
  isMainBranch,
  isPullRequestEvent,
  withBaseWorktree,
} from "./git";
import { createPendingActionResult } from "./result";
import { buildStepSummary } from "./summary";
import type { ActionResult, AdoptionReport, ResultsFile } from "./types";

export type RunOptions = {
  cwd?: string;
  fetchImpl?: typeof fetch;
  io?: ActionIO;
};

const writeResults = async (
  cwd: string,
  outputPath: string,
  result: ActionResult,
) => {
  const absolutePath = resolve(cwd, outputPath);
  await mkdir(dirname(absolutePath), { recursive: true });

  const resultsFile: ResultsFile = {
    [BACKPACK_ADOPTION_CORTEX_KEY]: result,
  };

  await writeFile(
    absolutePath,
    `${JSON.stringify(resultsFile, null, 2)}\n`,
    "utf8",
  );
};

const analyzeBaseReport = async ({
  cwd,
  pattern,
}: {
  cwd: string;
  pattern: string;
}): Promise<AdoptionReport | null> => {
  if (!isPullRequestEvent()) {
    return null;
  }

  const baseRef = getPullRequestBaseRef();
  if (!baseRef) {
    return null;
  }

  return withBaseWorktree(cwd, baseRef, (basePath) =>
    analyzeRepository(basePath, { pattern }),
  );
};

export const run = async ({
  cwd = process.cwd(),
  fetchImpl,
  io = createGitHubActionsIO(),
}: RunOptions = {}) => {
  const dryRun = getBooleanInput(io, "dry-run");
  const pattern = io.getInput("pattern") || DEFAULT_PATTERN;
  const outputPath = io.getInput("output-path") || DEFAULT_OUTPUT_PATH;
  const cortexWebhookUuid = io.getInput("cortex-webhook-uuid");
  const cortexEntity = io.getInput("cortex-entity");
  const main = isMainBranch();
  const pullRequest = isPullRequestEvent();

  io.info(`Analyzing Backpack adoption in ${cwd}`);
  io.info(`Using file pattern: ${pattern}`);

  const headReport = await analyzeRepository(cwd, { pattern });
  const baseReport = main
    ? null
    : await analyzeBaseReport({
        cwd,
        pattern,
      });
  const guard = evaluateGuard({
    baseReport,
    dryRun,
    headReport,
    isMain: main,
  });
  const pendingResult = createPendingActionResult({
    baseReport,
    eventName: process.env.GITHUB_EVENT_NAME || null,
    guard,
    headReport,
    isMain: main,
    isPullRequest: pullRequest,
    ref: process.env.GITHUB_REF || null,
    repository: basename(cwd),
  });
  const cortex = await uploadToCortex({
    actionResult: pendingResult,
    cortexEntity,
    fetchImpl,
    io,
    isMain: main,
    webhookUuid: cortexWebhookUuid,
  });
  const result: ActionResult = {
    ...pendingResult,
    cortex,
  };

  await writeResults(cwd, outputPath, result);
  await io.appendSummary(buildStepSummary(result));

  io.info(`Backpack adoption results written to ${outputPath}`);
  io.info(`Head Backpack adoption: ${headReport.usage.backpack.percentage}%`);

  if (baseReport) {
    io.info(`Base Backpack adoption: ${baseReport.usage.backpack.percentage}%`);
    io.info(`Backpack adoption delta: ${guard.delta}%`);
  }

  if (headReport.parseErrors.length > 0) {
    io.warning(
      `${headReport.parseErrors.length} file(s) could not be parsed during head analysis.`,
    );
  }

  if (baseReport && baseReport.parseErrors.length > 0) {
    io.warning(
      `${baseReport.parseErrors.length} file(s) could not be parsed during base analysis.`,
    );
  }

  if (guard.status === "warn") {
    io.warning(guard.reason);
  }

  if (guard.status === "fail") {
    io.setFailed(guard.reason);
  }

  return result;
};
