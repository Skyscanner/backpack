/*
 *
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
 *
 */

/* global element, device, by */
const sleep = delay => new Promise(_ => setTimeout(_, delay));

describe('Example', () => {
  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('docs:switch', async () => {
    try {
      await expect(element(by.id('switch'))).toBeVisible();
      await expect(element(by.id('switch-themed'))).toBeVisible();

      await element(by.id('switch')).swipe('right', 'fast', 0.2);
      await sleep(500);

      await element(by.id('switch-themed')).swipe('right', 'fast', 0.2);
      await sleep(500);

      await element(by.id('switch')).swipe('left', 'fast', 0.2);
      await sleep(500);

      await element(by.id('switch-themed')).swipe('left', 'fast', 0.2);
      await sleep(500);
    } catch (exc) {
      // eslint-disable-next-line no-console
      console.error(exc);
    }
  });
});
