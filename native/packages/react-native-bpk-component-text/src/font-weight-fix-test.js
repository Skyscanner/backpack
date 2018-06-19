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

/* @flow */
/* eslint-disable global-require */

describe('font-weight-fix', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  describe('shouldApplyFontWeightFix', () => {
    it('should equal true if iOS 11 and RN 0.55.X', () => {
      jest.mock('react-native', () => ({
        Platform: {
          OS: 'ios',
          Version: '11',
        },
      }));
      jest.mock('react-native/Libraries/Core/ReactNativeVersion', () => ({
        version: {
          major: 0,
          minor: 55,
          patch: 3,
        },
      }));

      const { shouldApplyFontWeightFix } = require('./font-weight-fix');

      expect(shouldApplyFontWeightFix).toBe(true);
    });

    it('should equal false if iOS 10', () => {
      jest.mock('react-native', () => ({
        Platform: {
          OS: 'ios',
          Version: '10',
        },
      }));
      jest.mock('react-native/Libraries/Core/ReactNativeVersion', () => ({
        version: {
          major: 0,
          minor: 55,
          patch: 3,
        },
      }));

      const { shouldApplyFontWeightFix } = require('./font-weight-fix');

      expect(shouldApplyFontWeightFix).toBe(false);
    });

    it('should equal false if RN 0.56.X', () => {
      jest.mock('react-native', () => ({
        Platform: {
          OS: 'ios',
          Version: '11',
        },
      }));
      jest.mock('react-native/Libraries/Core/ReactNativeVersion', () => ({
        version: {
          major: 0,
          minor: 56,
          patch: 0,
        },
      }));

      const { shouldApplyFontWeightFix } = require('./font-weight-fix');

      expect(shouldApplyFontWeightFix).toBe(false);
    });

    it('should equal false exception thrown', () => {
      jest.mock('react-native', () => ({
        Platform: {
          OS: 'ios',
          Version: '11',
        },
      }));
      jest.mock('react-native/Libraries/Core/ReactNativeVersion', () => {
        throw new Error('module not found');
      });

      const { shouldApplyFontWeightFix } = require('./font-weight-fix');

      expect(shouldApplyFontWeightFix).toBe(false);
    });
  });
});
