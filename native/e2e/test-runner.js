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
const EventEmitter = require('events');
const {
  cleanFileName,
  defaults: { DEFAULT_STORYBOOK_URL },
} = require('./utils');

const StorybookController = require('./storybook-controller');
const AndroidRecorder = require('./recorders/android-recorder');
const IOSRecorder = require('./recorders/ios-recorder');

const Recorder =
  process.env.BPK_PLATFORM === 'android' ? AndroidRecorder : IOSRecorder;

module.exports = async (kind, story, basePath, testFuction) => {
  const videoName = cleanFileName(story, kind);
  const recorder = new Recorder(`${basePath}/${videoName}`, videoName);

  const controllerEmitter = new EventEmitter();

  controllerEmitter.on('test:started', () => recorder.startRecording());

  const storybookController = new StorybookController(DEFAULT_STORYBOOK_URL);
  await storybookController.start();
  await storybookController.activateStory(kind, story);

  await testFuction(controllerEmitter);

  await recorder.finishRecording();
  await storybookController.done();
};
