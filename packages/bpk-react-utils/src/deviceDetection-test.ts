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
import { isDeviceIphone, isDeviceIpad, isDeviceIos } from './deviceDetection';

let windowSpy: jest.SpyInstance;

describe('isIphone tests', () => {
  beforeEach(() => {
    jest.resetModules();
    windowSpy = jest.spyOn(window, 'navigator', 'get');
  });

  afterEach(() => {
    windowSpy.mockRestore();
  });

  it('should return a boolean', () => {
    expect(typeof isDeviceIphone()).toBe('boolean');
  });

  it('should return false by default', () => {
    expect(isDeviceIphone()).toBe(false);
  });

  it('should return true if an iPhone', () => {
    windowSpy.mockImplementation(() => ({
      userAgent: 'iPhone',
    }));

    expect(isDeviceIphone()).toBe(true);
  });
});

describe('isIpad tests', () => {
  beforeEach(() => {
    jest.resetModules();
    windowSpy = jest.spyOn(window, 'navigator', 'get');
  });

  afterEach(() => {
    windowSpy.mockRestore();
  });

  it('should return a boolean', () => {
    expect(typeof isDeviceIpad()).toBe('boolean');
  });

  it('should return false by default', () => {
    expect(isDeviceIpad()).toBe(false);
  });

  it('should return true if an iPad', () => {
    windowSpy.mockImplementation(() => ({
      userAgent: 'iPad',
    }));

    expect(isDeviceIpad()).toBe(true);
  });

  it('should return true if an iPad Pro', () => {
    windowSpy.mockImplementation(() => ({
      maxTouchPoints: 3,
      userAgent: 'Macintosh',
    }));
    expect(isDeviceIpad()).toBe(true);
  });
});

describe('isIos tests', () => {
  beforeEach(() => {
    jest.resetModules();
    windowSpy = jest.spyOn(window, 'navigator', 'get');
  });

  afterEach(() => {
    windowSpy.mockRestore();
  });

  it('should return a boolean', () => {
    expect(typeof isDeviceIos()).toBe('boolean');
  });

  it('should return false by default', () => {
    windowSpy.mockImplementation(() => ({
      userAgent: 'Mac',
    }));

    expect(isDeviceIos()).toBe(false);
  });

  it('should return true if an iPhone', () => {
    windowSpy.mockImplementation(() => ({
      userAgent: 'iPhone',
    }));

    expect(isDeviceIos()).toBe(true);
  });

  it('should return true if an iPad', () => {
    windowSpy.mockImplementation(() => ({
      userAgent: 'iPad',
    }));

    expect(isDeviceIos()).toBe(true);
  });

  it('should return true if an iPad Pro', () => {
    windowSpy.mockImplementation(() => ({
      userAgent: 'Macintosh',
      maxTouchPoints: 3,
    }));

    expect(isDeviceIos()).toBe(true);
  });
});
