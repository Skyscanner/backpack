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

import deferCallback from './deferCallback';

jest.unmock('./deferCallback');

describe('deferCallback', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should use requestIdleCallback if available', () => {
    const callback = jest.fn();
    window.requestIdleCallback = jest.fn();

    deferCallback(callback);

    expect(window.requestIdleCallback).toHaveBeenCalledWith(callback, {
      timeout: 500,
    });
  });

  it('should use setTimeout if requestIdleCallback is not available', () => {
    const callback = jest.fn();
    // @ts-expect-error - setTimeout should never be undefined in a browser context.
    window.requestIdleCallback = undefined;
    jest.spyOn(window, 'setTimeout');

    deferCallback(callback);

    expect(window.setTimeout).toHaveBeenCalledWith(callback, 0);
  });
});
