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
import {
  combineGuardStatuses,
  evaluateGuard,
  evaluateProjectGuards,
} from "./evaluate-guard";
import type { AdoptionReport, GuardResult } from "../shared/types";

const reportWithBackpackPercentage = (percentage: number): AdoptionReport => ({
  repository: "repo",
  generatedAt: "2026-06-03T00:00:00.000Z",
  filesAnalyzed: 1,
  parseErrors: [],
  backpackWebVersion: null,
  usage: {
    backpack: { count: percentage, percentage },
    pureBackpack: { count: percentage, percentage },
    nonPureBackpack: { count: 0, percentage: 0 },
    nonBackpack: { count: 0, percentage: 0 },
    rawHtml: { count: 0, percentage: 0 },
  },
  componentCounts: {},
});

const DEFAULT_THRESHOLD = 60;

const evaluate = (
  options: Omit<Parameters<typeof evaluateGuard>[0], "threshold">,
) => evaluateGuard({ ...options, threshold: DEFAULT_THRESHOLD });

describe("evaluateGuard", () => {
  it("passes when base adoption is below the threshold even if head decreases", () => {
    const result = evaluate({
      baseReport: reportWithBackpackPercentage(59),
      dryRun: false,
      headReport: reportWithBackpackPercentage(58),
      isMain: false,
    });

    expect(result.status).toBe("pass");
    expect(result.delta).toBe(-1);
  });

  it("fails when base adoption is at threshold and head decreases", () => {
    const result = evaluate({
      baseReport: reportWithBackpackPercentage(60),
      dryRun: false,
      headReport: reportWithBackpackPercentage(59.5),
      isMain: false,
    });

    expect(result.status).toBe("fail");
    expect(result.delta).toBe(-0.5);
  });

  it("passes when base adoption is at threshold and head is unchanged", () => {
    const result = evaluate({
      baseReport: reportWithBackpackPercentage(60),
      dryRun: false,
      headReport: reportWithBackpackPercentage(60),
      isMain: false,
    });

    expect(result.status).toBe("pass");
  });

  it("passes when base adoption is at threshold and head increases", () => {
    const result = evaluate({
      baseReport: reportWithBackpackPercentage(61),
      dryRun: false,
      headReport: reportWithBackpackPercentage(62),
      isMain: false,
    });

    expect(result.status).toBe("pass");
    expect(result.delta).toBe(1);
  });

  it("converts a failing PR result to warning in dry-run mode", () => {
    const result = evaluate({
      baseReport: reportWithBackpackPercentage(70),
      dryRun: true,
      headReport: reportWithBackpackPercentage(69),
      isMain: false,
    });

    expect(result.status).toBe("warn");
  });

  it("passes on main when no parse errors", () => {
    const result = evaluate({
      baseReport: null,
      dryRun: false,
      headReport: reportWithBackpackPercentage(10),
      isMain: true,
    });

    expect(result.status).toBe("pass");
  });

  it("warns on main when there are parse errors (data is incomplete)", () => {
    const headReport = reportWithBackpackPercentage(75);
    headReport.parseErrors = [
      { file: "src/Broken.tsx", message: "Unexpected token" },
    ];

    const result = evaluate({
      baseReport: null,
      dryRun: false,
      headReport,
      isMain: true,
    });

    expect(result.status).toBe("warn");
    expect(result.reason).toContain("1 file(s) were skipped");
  });

  it("fails on PR when base ref cannot be loaded", () => {
    const result = evaluate({
      baseReport: null,
      dryRun: false,
      headReport: reportWithBackpackPercentage(75),
      isMain: false,
    });

    expect(result.status).toBe("fail");
    expect(result.reason).toContain("Could not load `main`");
  });

  it("warns on PR with missing base ref under dry-run", () => {
    const result = evaluate({
      baseReport: null,
      dryRun: true,
      headReport: reportWithBackpackPercentage(75),
      isMain: false,
    });

    expect(result.status).toBe("warn");
  });

  it("fails when head has parse errors above threshold (refuses to evaluate on incomplete data)", () => {
    const headReport = reportWithBackpackPercentage(75);
    headReport.parseErrors = [
      { file: "src/Broken.tsx", message: "Unexpected token" },
    ];

    const result = evaluate({
      baseReport: reportWithBackpackPercentage(70),
      dryRun: false,
      headReport,
      isMain: false,
    });

    expect(result.status).toBe("fail");
    expect(result.reason).toContain("this PR (1)");
  });

  it("fails when base has parse errors above threshold", () => {
    const baseReport = reportWithBackpackPercentage(70);
    baseReport.parseErrors = [
      { file: "src/Stale.tsx", message: "Unexpected token" },
    ];

    const result = evaluate({
      baseReport,
      dryRun: false,
      headReport: reportWithBackpackPercentage(72),
      isMain: false,
    });

    expect(result.status).toBe("fail");
    expect(result.reason).toContain("main (1)");
  });

  it("passes when base adoption is below threshold even with parse errors", () => {
    const headReport = reportWithBackpackPercentage(40);
    headReport.parseErrors = [
      { file: "src/Broken.tsx", message: "Unexpected token" },
    ];

    const result = evaluate({
      baseReport: reportWithBackpackPercentage(30),
      dryRun: false,
      headReport,
      isMain: false,
    });

    expect(result.status).toBe("pass");
    expect(result.reason).toContain("below the");
    expect(result.reason).toContain("1 file(s) were skipped");
  });

  it("downgrades parse-error failure to warn under dry-run", () => {
    const headReport = reportWithBackpackPercentage(75);
    headReport.parseErrors = [
      { file: "src/Broken.tsx", message: "Unexpected token" },
    ];

    const result = evaluate({
      baseReport: reportWithBackpackPercentage(70),
      dryRun: true,
      headReport,
      isMain: false,
    });

    expect(result.status).toBe("warn");
  });

  it("uses the configured threshold when deciding whether to block", () => {
    const result = evaluateGuard({
      baseReport: reportWithBackpackPercentage(65),
      dryRun: false,
      headReport: reportWithBackpackPercentage(64),
      isMain: false,
      threshold: 70,
    });

    expect(result.status).toBe("pass");
    expect(result.threshold).toBe(70);
    expect(result.reason).toContain("70% threshold");
  });
});

const reportWithProjects = (
  overallPercentage: number,
  projects: Record<string, number>,
): AdoptionReport => {
  const report = reportWithBackpackPercentage(overallPercentage);
  report.projects = {};
  for (const [name, percentage] of Object.entries(projects)) {
    report.projects[name] = reportWithBackpackPercentage(percentage);
  }
  return report;
};

describe("evaluateProjectGuards", () => {
  it("evaluates each project independently using the same rules as evaluateGuard", () => {
    const baseReport = reportWithProjects(65, { flights: 70, hotels: 50 });
    const headReport = reportWithProjects(66, { flights: 65, hotels: 55 });

    const results = evaluateProjectGuards({
      baseReport,
      dryRun: false,
      headReport,
      isMain: false,
      threshold: DEFAULT_THRESHOLD,
    });

    // flights: base (70) >= threshold, head decreased (65) -> fail
    expect(results.flights.status).toBe("fail");
    // hotels: base (50) < threshold -> pass regardless of head movement
    expect(results.hotels.status).toBe("pass");
  });

  it("treats a project missing from base as unable to compare", () => {
    const baseReport = reportWithProjects(65, { flights: 70 });
    const headReport = reportWithProjects(66, { flights: 70, hotels: 55 });

    const results = evaluateProjectGuards({
      baseReport,
      dryRun: false,
      headReport,
      isMain: false,
      threshold: DEFAULT_THRESHOLD,
    });

    expect(results.hotels.status).toBe("fail");
    expect(results.hotels.reason).toContain("Could not load `main`");
  });

  it("skips projects that exist only in base (removed in this PR)", () => {
    const baseReport = reportWithProjects(65, { flights: 70, hotels: 50 });
    const headReport = reportWithProjects(66, { flights: 70 });

    const results = evaluateProjectGuards({
      baseReport,
      dryRun: false,
      headReport,
      isMain: false,
      threshold: DEFAULT_THRESHOLD,
    });

    expect(Object.keys(results)).toEqual(["flights"]);
  });

  it("returns an empty map when neither side has NX projects", () => {
    const results = evaluateProjectGuards({
      baseReport: reportWithBackpackPercentage(65),
      dryRun: false,
      headReport: reportWithBackpackPercentage(66),
      isMain: false,
      threshold: DEFAULT_THRESHOLD,
    });

    expect(results).toEqual({});
  });
});

describe("combineGuardStatuses", () => {
  const passResult: GuardResult = {
    status: "pass",
    reason: "ok",
    dryRun: false,
    threshold: 60,
    baseBackpackPercentage: 65,
    headBackpackPercentage: 66,
    delta: 1,
  };

  it("returns fail when the overall status passes but a project fails", () => {
    const failingProject: GuardResult = { ...passResult, status: "fail" };

    const combined = combineGuardStatuses(passResult, {
      flights: failingProject,
      hotels: passResult,
    });

    expect(combined).toBe("fail");
  });

  it("returns warn when no project fails but one warns", () => {
    const warningProject: GuardResult = { ...passResult, status: "warn" };

    const combined = combineGuardStatuses(passResult, {
      flights: warningProject,
      hotels: passResult,
    });

    expect(combined).toBe("warn");
  });

  it("keeps the overall status when no project fails or warns", () => {
    const combined = combineGuardStatuses(passResult, {
      flights: passResult,
      hotels: passResult,
    });

    expect(combined).toBe("pass");
  });

  it("prefers fail over warn when both are present", () => {
    const failingProject: GuardResult = { ...passResult, status: "fail" };
    const warningProject: GuardResult = { ...passResult, status: "warn" };

    const combined = combineGuardStatuses(passResult, {
      flights: failingProject,
      hotels: warningProject,
    });

    expect(combined).toBe("fail");
  });
});
