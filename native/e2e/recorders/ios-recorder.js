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
const { command, rawCommand } = require('../utils');

const recordSimulator = fileName =>
  rawCommand(
    'xcrun',
    'simctl',
    'io',
    'booted',
    'recordVideo',
    '--type=fmp4',
    fileName,
  );

const optimiseRecordedVideo = filename => {
  command(`scripts/video/convert-to-mp4.sh`, filename).catch(error => {
    console.error(error); // eslint-disable-line no-console
    command(`rm -rf ${filename}`);
  });
};

class Recorder {
  constructor(filePath) {
    this.filePath = filePath;
    this.handle = null;
  }

  startRecording() {
    this.handle = recordSimulator(this.filePath);
  }

  finishRecording() {
    this.handle.kill('SIGINT');
    this.handle = null;
    optimiseRecordedVideo(this.filePath);
  }
}

module.exports = Recorder;
