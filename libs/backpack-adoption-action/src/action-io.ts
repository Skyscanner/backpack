import { appendFile } from "node:fs/promises";

export type ActionIO = {
  getInput: (name: string) => string;
  info: (message: string) => void;
  warning: (message: string) => void;
  error: (message: string) => void;
  setFailed: (message: string) => void;
  appendSummary: (markdown: string) => Promise<void>;
};

const escapeCommandValue = (value: string) =>
  value
    .replace(/%/g, "%25")
    .replace(/\r/g, "%0D")
    .replace(/\n/g, "%0A");

const inputKey = (name: string) =>
  `INPUT_${name.replace(/ /g, "_").toUpperCase()}`;

export const getBooleanInput = (
  io: Pick<ActionIO, "getInput">,
  name: string,
) => io.getInput(name).trim().toLowerCase() === "true";

export const createGitHubActionsIO = (): ActionIO => ({
  getInput(name) {
    return process.env[inputKey(name)] || "";
  },

  info(message) {
    console.log(message);
  },

  warning(message) {
    console.log(`::warning::${escapeCommandValue(message)}`);
  },

  error(message) {
    console.log(`::error::${escapeCommandValue(message)}`);
  },

  setFailed(message) {
    this.error(message);
    process.exitCode = 1;
  },

  async appendSummary(markdown) {
    const summaryPath = process.env.GITHUB_STEP_SUMMARY;
    if (!summaryPath) {
      return;
    }

    await appendFile(summaryPath, markdown, "utf8");
  },
});
