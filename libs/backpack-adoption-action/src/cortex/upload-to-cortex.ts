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
import type { ActionIO } from "../action/io";
import { BACKPACK_ADOPTION_CORTEX_KEY } from "../shared/config";
import type { ActionResult, CortexResult } from "../shared/types";

export type CortexUploadOptions = {
  actionResult: ActionResult;
  cortexEntity: string;
  fetchImpl?: typeof fetch;
  io: Pick<ActionIO, "warning">;
  isMain: boolean;
  webhookUuid: string;
};

export const cortexWebhookUrl = (webhookUuid: string) =>
  `https://api.getcortexapp.com/api/v1/custom-integrations/data/${webhookUuid}`;

export const uploadToCortex = async ({
  actionResult,
  cortexEntity,
  fetchImpl = fetch,
  io,
  isMain,
  webhookUuid,
}: CortexUploadOptions): Promise<CortexResult> => {
  if (!isMain) {
    return {
      status: "skipped",
      reason: "Cortex upload only runs on refs/heads/main.",
    };
  }

  if (!webhookUuid || !cortexEntity) {
    return {
      status: "skipped",
      reason: "Cortex webhook UUID or entity input was not provided.",
    };
  }

  try {
    const response = await fetchImpl(cortexWebhookUrl(webhookUuid), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        entity_tag: cortexEntity,
        [BACKPACK_ADOPTION_CORTEX_KEY]: actionResult,
      }),
    });

    if (!response.ok) {
      const body = await response.text().catch(() => "");
      throw new Error(
        `Cortex responded with ${response.status} ${response.statusText}${body ? `: ${body}` : ""}`,
      );
    }

    return {
      status: "uploaded",
      reason: "Uploaded Backpack adoption data to Cortex.",
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    io.warning(`Failed to upload Backpack adoption data to Cortex: ${message}`);
    return {
      status: "warning",
      reason: `Failed to upload Backpack adoption data to Cortex: ${message}`,
    };
  }
};