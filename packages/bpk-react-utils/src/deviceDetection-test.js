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

/* @flow strict */

import { isIphone, isIpad, isIos } from './deviceDetection';

describe('isIphone tests', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  it('should return a boolean', () => {
    expect(typeof isIphone()).toBe('boolean');
  });

  it('should return false by default', () => {
    expect(isIphone()).toBe(false);
  });

  it('should return true if an iPhone', () => {
    // $FlowIssue[extra-arg] - The extra arg for accessType is valid as per the spec of Jest: https://jestjs.io/docs/jest-object#jestspyonobject-methodname-accesstype
    const platform = jest.spyOn(window.navigator, 'platform', 'get');
    platform.mockReturnValue('iPhone');

    expect(isIphone()).toBe(true);
  });
});

describe('isIpad tests', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  it('should return a boolean', () => {
    expect(typeof isIpad()).toBe('boolean');
  });

  it('should return false by default', () => {
    expect(isIpad()).toBe(false);
  });

  it('should return true if an iPad', () => {
    // $FlowIssue[extra-arg] - The extra arg for accessType is valid as per the spec of Jest: https://jestjs.io/docs/jest-object#jestspyonobject-methodname-accesstype
    const platform = jest.spyOn(window.navigator, 'platform', 'get');
    platform.mockReturnValue('iPad');

    expect(isIpad()).toBe(true);
  });
});

describe('isIos tests', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  it('should return a boolean', () => {
    expect(typeof isIos()).toBe('boolean');
  });

  it('should return false by default', () => {
    // $FlowIssue[extra-arg] - The extra arg for accessType is valid as per the spec of Jest: https://jestjs.io/docs/jest-object#jestspyonobject-methodname-accesstype
    const platform = jest.spyOn(window.navigator, 'platform', 'get');
    platform.mockReturnValue('Mac');

    expect(isIos()).toBe(false);
  });

  it('should return true if an iPhone', () => {
    // $FlowIssue[extra-arg] - The extra arg for accessType is valid as per the spec of Jest: https://jestjs.io/docs/jest-object#jestspyonobject-methodname-accesstype
    const platform = jest.spyOn(window.navigator, 'platform', 'get');
    platform.mockReturnValue('iPhone');

    expect(isIos()).toBe(true);
  });

  it('should return true if an iPad', () => {
    // $FlowIssue[extra-arg] - The extra arg for accessType is valid as per the spec of Jest: https://jestjs.io/docs/jest-object#jestspyonobject-methodname-accesstype
    const platform = jest.spyOn(window.navigator, 'platform', 'get');
    platform.mockReturnValue('iPad');

    expect(isIos()).toBe(true);
  });
});
