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