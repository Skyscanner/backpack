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
import { evaluateGuard } from "./evaluate-guard";
import type { AdoptionReport } from "../shared/types";

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

describe("evaluateGuard", () => {
  it("passes when base adoption is below the threshold even if head decreases", () => {
    const result = evaluateGuard({
      baseReport: reportWithBackpackPercentage(59),
      dryRun: false,
      headReport: reportWithBackpackPercentage(58),
      isMain: false,
    });

    expect(result.status).toBe("pass");
    expect(result.delta).toBe(-1);
  });

  it("fails when base adoption is at threshold and head decreases", () => {
    const result = evaluateGuard({
      baseReport: reportWithBackpackPercentage(60),
      dryRun: false,
      headReport: reportWithBackpackPercentage(59.5),
      isMain: false,
    });

    expect(result.status).toBe("fail");
    expect(result.delta).toBe(-0.5);
  });

  it("passes when base adoption is at threshold and head is unchanged", () => {
    const result = evaluateGuard({
      baseReport: reportWithBackpackPercentage(60),
      dryRun: false,
      headReport: reportWithBackpackPercentage(60),
      isMain: false,
    });

    expect(result.status).toBe("pass");
  });

  it("passes when base adoption is at threshold and head increases", () => {
    const result = evaluateGuard({
      baseReport: reportWithBackpackPercentage(61),
      dryRun: false,
      headReport: reportWithBackpackPercentage(62),
      isMain: false,
    });

    expect(result.status).toBe("pass");
    expect(result.delta).toBe(1);
  });

  it("converts a failing PR result to warning in dry-run mode", () => {
    const result = evaluateGuard({
      baseReport: reportWithBackpackPercentage(70),
      dryRun: true,
      headReport: reportWithBackpackPercentage(69),
      isMain: false,
    });

    expect(result.status).toBe("warn");
  });

  it("passes on main when no parse errors", () => {
    const result = evaluateGuard({
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

    const result = evaluateGuard({
      baseReport: null,
      dryRun: false,
      headReport,
      isMain: true,
    });

    expect(result.status).toBe("warn");
    expect(result.reason).toContain("1 file(s) were skipped");
  });

  it("fails on PR when base ref cannot be loaded", () => {
    const result = evaluateGuard({
      baseReport: null,
      dryRun: false,
      headReport: reportWithBackpackPercentage(75),
      isMain: false,
    });

    expect(result.status).toBe("fail");
    expect(result.reason).toContain("Could not load `main`");
  });

  it("warns on PR with missing base ref under dry-run", () => {
    const result = evaluateGuard({
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

    const result = evaluateGuard({
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

    const result = evaluateGuard({
      baseReport,
      dryRun: false,
      headReport: reportWithBackpackPercentage(72),
      isMain: false,
    });

    expect(result.status).toBe("fail");
    expect(result.reason).toContain("main (1)");
  });

  it("downgrades parse-error failure to warn under dry-run", () => {
    const headReport = reportWithBackpackPercentage(75);
    headReport.parseErrors = [
      { file: "src/Broken.tsx", message: "Unexpected token" },
    ];

    const result = evaluateGuard({
      baseReport: reportWithBackpackPercentage(70),
      dryRun: true,
      headReport,
      isMain: false,
    });

    expect(result.status).toBe("warn");
  });

});