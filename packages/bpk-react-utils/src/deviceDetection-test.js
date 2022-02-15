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

import { isDeviceIphone, isDeviceIpad, isDeviceIos } from './deviceDetection';

describe('isIphone tests', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  it('should return a boolean', () => {
    expect(typeof isDeviceIphone()).toBe('boolean');
  });

  it('should return false by default', () => {
    expect(isDeviceIphone()).toBe(false);
  });

  it('should return true if an iPhone', () => {
    // $FlowIssue[extra-arg] - The extra arg for accessType is valid as per the spec of Jest: https://jestjs.io/docs/jest-object#jestspyonobject-methodname-accesstype
    const platform = jest.spyOn(window.navigator, 'platform', 'get');
    platform.mockReturnValue('iPhone');

    expect(isDeviceIphone()).toBe(true);
  });
});

describe('isIpad tests', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  it('should return a boolean', () => {
    expect(typeof isDeviceIpad()).toBe('boolean');
  });

  it('should return false by default', () => {
    expect(isDeviceIpad()).toBe(false);
  });

  it('should return true if an iPad', () => {
    // $FlowIssue[extra-arg] - The extra arg for accessType is valid as per the spec of Jest: https://jestjs.io/docs/jest-object#jestspyonobject-methodname-accesstype
    const platform = jest.spyOn(window.navigator, 'platform', 'get');
    platform.mockReturnValue('iPad');

    expect(isDeviceIpad()).toBe(true);
  });
});

describe('isIos tests', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  it('should return a boolean', () => {
    expect(typeof isDeviceIos()).toBe('boolean');
  });

  it('should return false by default', () => {
    // $FlowIssue[extra-arg] - The extra arg for accessType is valid as per the spec of Jest: https://jestjs.io/docs/jest-object#jestspyonobject-methodname-accesstype
    const platform = jest.spyOn(window.navigator, 'platform', 'get');
    platform.mockReturnValue('Mac');

    expect(isDeviceIos()).toBe(false);
  });

  it('should return true if an iPhone', () => {
    // $FlowIssue[extra-arg] - The extra arg for accessType is valid as per the spec of Jest: https://jestjs.io/docs/jest-object#jestspyonobject-methodname-accesstype
    const platform = jest.spyOn(window.navigator, 'platform', 'get');
    platform.mockReturnValue('iPhone');

    expect(isDeviceIos()).toBe(true);
  });

  it('should return true if an iPad', () => {
    // $FlowIssue[extra-arg] - The extra arg for accessType is valid as per the spec of Jest: https://jestjs.io/docs/jest-object#jestspyonobject-methodname-accesstype
    const platform = jest.spyOn(window.navigator, 'platform', 'get');
    platform.mockReturnValue('iPad');

    expect(isDeviceIos()).toBe(true);
  });
});
