import { run } from "./action/run";

run().catch((error: unknown) => {
  const message = error instanceof Error ? error.message : String(error);
  console.log(`::error::${message}`);
  process.exitCode = 1;
});
