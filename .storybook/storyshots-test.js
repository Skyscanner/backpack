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

/* @flow */

import path from 'path';

import initStoryshots from '@storybook/addon-storyshots';
import { imageSnapshot } from '@storybook/addon-storyshots-puppeteer';

// This small timeout is to allow the component to settle.
// See: https://www.npmjs.com/package/@storybook/addon-storyshots-puppeteer#specifying-options-to-jest-image-snapshots
// Its primary function is to delay the screenshot being taken to prevent regressions due to mounting animations & images loading.
const beforeScreenshot = () =>
  new Promise((resolve) =>
    setTimeout(() => {
      resolve();
    }, 800),
  );

// Allow a small amount of deviation to account for
// CI running on a different OS than local development.
const getMatchOptions = () => ({
  failureThreshold: 0.1,
  failureThresholdType: 'percent',
});

initStoryshots({
  suite: 'Visual tests',
  storyNameRegex: /Visual\stest\s?([a-z]*)?/i,
  test: imageSnapshot({
    storybookUrl: `file://${path.resolve(__dirname, '../dist-storybook')}`,
    getMatchOptions,
    beforeScreenshot,
  }),
});
