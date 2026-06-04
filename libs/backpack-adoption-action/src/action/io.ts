import * as core from "@actions/core";

export type ActionIO = {
  getInput: (name: string) => string;
  info: (message: string) => void;
  warning: (message: string) => void;
  error: (message: string) => void;
  setFailed: (message: string) => void;
  appendSummary: (markdown: string) => Promise<void>;
};

export const getBooleanInput = (
  io: Pick<ActionIO, "getInput">,
  name: string,
) => io.getInput(name).trim().toLowerCase() === "true";

export const createGitHubActionsIO = (): ActionIO => ({
  getInput: (name) => core.getInput(name),
  info: (message) => core.info(message),
  warning: (message) => core.warning(message),
  error: (message) => core.error(message),
  setFailed: (message) => core.setFailed(message),
  appendSummary: async (markdown) => {
    if (!process.env.GITHUB_STEP_SUMMARY) {
      return;
    }
    await core.summary.addRaw(markdown).write();
  },
});
