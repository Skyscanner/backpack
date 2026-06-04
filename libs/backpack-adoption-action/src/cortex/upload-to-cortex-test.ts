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
import { uploadToCortex, cortexWebhookUrl } from "./upload-to-cortex";
import type { ActionResult } from "../shared/types";

const actionResult = {
  generatedAt: "2026-06-03T00:00:00.000Z",
  repository: "repo",
  branch: {
    ref: "refs/heads/main",
    eventName: "push",
    isMain: true,
    isPullRequest: false,
  },
  head: {},
  base: null,
  comparison: {
    baseBackpackPercentage: null,
    headBackpackPercentage: 60,
    delta: null,
    threshold: 60,
  },
  guard: {
    status: "not_applicable",
    reason: "main",
    dryRun: false,
    threshold: 60,
    baseBackpackPercentage: null,
    headBackpackPercentage: 60,
    delta: null,
  },
  cortex: {
    status: "skipped",
    reason: "pending",
  },
} as ActionResult;

describe("uploadToCortex", () => {
  it("uploads custom data on main when Cortex inputs are present", async () => {
    const fetchImpl = jest.fn().mockResolvedValue({
      ok: true,
      status: 200,
      statusText: "OK",
    });
    const io = { warning: jest.fn() };

    const result = await uploadToCortex({
      actionResult,
      cortexEntity: "carhire-homepage",
      fetchImpl,
      io,
      isMain: true,
      webhookUuid: "abc-123",
    });

    expect(result.status).toBe("uploaded");
    expect(fetchImpl).toHaveBeenCalledWith(cortexWebhookUrl("abc-123"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        entity_tag: "carhire-homepage",
        "backpack-adoption": actionResult,
      }),
    });
  });

  it("skips upload outside main", async () => {
    const fetchImpl = jest.fn();

    const result = await uploadToCortex({
      actionResult,
      cortexEntity: "carhire-homepage",
      fetchImpl,
      io: { warning: jest.fn() },
      isMain: false,
      webhookUuid: "abc-123",
    });

    expect(result.status).toBe("skipped");
    expect(fetchImpl).not.toHaveBeenCalled();
  });

  it("skips upload when Cortex inputs are missing", async () => {
    const fetchImpl = jest.fn();

    const result = await uploadToCortex({
      actionResult,
      cortexEntity: "",
      fetchImpl,
      io: { warning: jest.fn() },
      isMain: true,
      webhookUuid: "",
    });

    expect(result.status).toBe("skipped");
    expect(fetchImpl).not.toHaveBeenCalled();
  });

  it("warns instead of failing when Cortex upload fails", async () => {
    const fetchImpl = jest.fn().mockResolvedValue({
      ok: false,
      status: 500,
      statusText: "Internal Server Error",
      text: async () => "Nope",
    });
    const io = { warning: jest.fn() };

    const result = await uploadToCortex({
      actionResult,
      cortexEntity: "carhire-homepage",
      fetchImpl,
      io,
      isMain: true,
      webhookUuid: "abc-123",
    });

    expect(result.status).toBe("warning");
    expect(io.warning).toHaveBeenCalledWith(
      expect.stringContaining("Failed to upload Backpack adoption data to Cortex"),
    );
  });
});