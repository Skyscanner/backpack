/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2018-present Skyscanner Ltd
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
const { spawn } = require('child_process');

const DEFAULT_ANIMATION_TIME = 500;
const DEFAULT_STORYBOOK_URL = 'http://localhost:7007';

const cleanFileName = (kind, story) =>
  `${kind}-${story}.mp4`
    .replace('docs:', '')
    .replace(/\s/g, '-')
    .toLowerCase();

const command = (commandString, ...args) =>
  new Promise((resolve, reject) => {
    const cmd = spawn(commandString, args);
    cmd.stderr.on('data', data => {
      reject(data);
    });
    cmd.on('close', code => {
      resolve(code);
    });
  });

const rawCommand = (cmd, ...args) => spawn(cmd, args);

const sleep = async delay => new Promise(resolve => setTimeout(resolve, delay));

const waitForAnimationToComplete = () => sleep(DEFAULT_ANIMATION_TIME);

module.exports = {
  cleanFileName,
  command,
  defaults: {
    DEFAULT_ANIMATION_TIME,
    DEFAULT_STORYBOOK_URL,
  },
  rawCommand,
  sleep,
  waitForAnimationToComplete,
};
