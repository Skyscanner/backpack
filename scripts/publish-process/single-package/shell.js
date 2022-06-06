/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016-2021 Skyscanner Ltd
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

/* eslint-disable no-console */

const childProcess = require('child_process');

const Shell = (root, initialOptions = {}) => {
  const baseOptions = {
    cwd: root,
    stdout: null,
    stderr: null,
    ...initialOptions,
  };

  /**
   * Executes a shell command.
   * Note that by default this command will suppress stdout and stderr,
   * you need to provide both in case you want it to be logged. see [options]
   *
   * @example
   * ```js
   * shellExec('ls', ['tasks']);
   * ```
   *
   * @param {String} cmd the command
   * @param {Array<String>} args the command arguments
   * @param {Object} [options={ cwd: root, stdout: null, sderr: null }] process options
   *
   * @returns {Promise} a promise object that will succeed when the exit code is 0 and fail otherwise.
   */
  const spawn = (cmd, args = [], options = {}) => {
    const safeOptions = { ...baseOptions, ...options };
    const { cwd, dryRun, stderr, stdout } = safeOptions;

    if (dryRun) {
      console.log(`$ ${cmd} ${args.join(' ')} <{ cwd: ${cwd} }>`);
      return Promise.resolve(0);
    }

    const shell = childProcess.spawn(cmd, args, { cwd });

    if (stdout) shell.stdout.pipe(stdout);
    if (stderr) shell.stderr.pipe(stderr);

    return new Promise((resolve, reject) => {
      shell.on('close', (code) => {
        if (code !== 0) {
          reject(code);
        } else {
          resolve(code);
        }
      });
    });
  };

  const execSync = (cmd, options = {}) => {
    const safeOptions = { ...baseOptions, ...options };
    const { cwd, dryRun } = safeOptions;

    if (dryRun) {
      console.log(`$ ${cmd} <{ cwd: ${cwd} }>`);
      return '';
    }

    return childProcess.execSync(cmd, { cwd });
  };

  return {
    spawn,
    execSync,
  };
};

module.exports = Shell;
