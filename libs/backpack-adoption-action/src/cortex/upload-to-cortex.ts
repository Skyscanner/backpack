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
