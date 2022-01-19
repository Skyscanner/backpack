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
/* @flow strict */

/* eslint-disable global-require */

describe('BpkStorybookUtils', () => {
  it('action should use storybook/addon-actions if available', () => {
    const mockActionFunction = jest.fn();
    jest.mock('@storybook/addon-actions', () => ({
      action: mockActionFunction,
    }));
    const { action } = require('./BpkStorybookUtils');
    action('test');
    expect(mockActionFunction).toHaveBeenCalledTimes(1);
  });
});
