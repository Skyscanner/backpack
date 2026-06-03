import { evaluateGuard } from "./guard";
import type { AdoptionReport } from "./types";

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
  cssOverrides: {
    byCategory: {
      color: 0,
      layout: 0,
      typography: 0,
      size: 0,
      position: 0,
      visibility: 0,
      border: 0,
      shadow: 0,
      transform: 0,
      custom: 0,
    },
    total: 0,
  },
  rawHtmlCssOverrides: {
    byCategory: {
      color: 0,
      layout: 0,
      typography: 0,
      size: 0,
      position: 0,
      visibility: 0,
      border: 0,
      shadow: 0,
      transform: 0,
      custom: 0,
    },
    total: 0,
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

  it("never fails on main", () => {
    const result = evaluateGuard({
      baseReport: reportWithBackpackPercentage(80),
      dryRun: false,
      headReport: reportWithBackpackPercentage(10),
      isMain: true,
    });

    expect(result.status).toBe("not_applicable");
  });
});
