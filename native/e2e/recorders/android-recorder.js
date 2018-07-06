/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2018 Skyscanner Ltd
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
const { rawCommand, command, sleep } = require('./../utils');

const video = filename => {
  let handler;
  const start = () => {
    handler = rawCommand(
      'adb',
      'shell',
      'screenrecord',
      ' --bit-rate',
      '6000000',
      `/sdcard/${filename}.mp4`,
    );
  };
  const stop = () => {
    if (!handler) {
      throw new Error(
        'Cannot call stop video if the process has not been started',
      );
    }
    handler.kill('SIGINT');
    handler.stdin.write('\n');
  };
  const get = async path =>
    command('adb', 'pull', `/sdcard/${filename}.mp4`, path);

  const remove = async () =>
    command('adb', 'shell', 'rm', '-f', `/sdcard/${filename}.mp4`);

  return {
    stop,
    start,
    get,
    remove,
  };
};

class Recorder {
  constructor(filePath, fileName) {
    this.filePath = filePath;
    this.fileName = fileName;
    this.handle = video(fileName);
  }

  startRecording() {
    this.handle.start();
  }

  async finishRecording() {
    this.handle.stop();
    await sleep(1000);
    await this.handle.get(this.filePath.replace(`${this.fileName}.mp4`, ''));
    await this.handle.remove();
  }
}

module.exports = Recorder;
