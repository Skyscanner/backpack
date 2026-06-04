import * as core from "@actions/core";

import { run } from "./action/run";

run().catch((error: unknown) => {
  const message = error instanceof Error ? error.message : String(error);
  core.setFailed(message);
});
