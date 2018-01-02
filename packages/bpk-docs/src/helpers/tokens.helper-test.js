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

import { getTokenValue } from './tokens-helper';

describe('tokens-helper', () => {
  describe('getTokenValue', () => {
    describe('web', () => {
      describe('size', () => {
        it('should format rem token values to pixels', () => {
          expect(getTokenValue({ value: '1rem', type: 'size' }, 'web')).toEqual(
            '1rem (16px)',
          );
        });

        it('should not format pixel token values', () => {
          expect(getTokenValue({ value: '16px', type: 'size' }, 'web')).toEqual(
            '16px',
          );
        });

        it('should not format percentage token values', () => {
          expect(getTokenValue({ value: '100%', type: 'size' }, 'web')).toEqual(
            '100%',
          );
        });
      });

      describe('font-size', () => {
        it('should format rem token values to pixels', () => {
          expect(
            getTokenValue({ value: '1rem', type: 'font-size' }, 'web'),
          ).toEqual('1rem (16px)');
        });

        it('should format percentage token values to pixels', () => {
          expect(
            getTokenValue({ value: '100%', type: 'font-size' }, 'web'),
          ).toEqual('100% (16px)');
        });

        it('should not format pixel token values', () => {
          expect(
            getTokenValue({ value: '16px', type: 'font-size' }, 'web'),
          ).toEqual('16px');
        });
      });
    });

    describe('iOS', () => {
      describe('size', () => {
        it('should format token values to points', () => {
          expect(getTokenValue({ value: '4', type: 'size' }, 'ios')).toEqual(
            '4pt',
          );
        });
      });

      describe('font-size', () => {
        it('should format token values to points', () => {
          expect(
            getTokenValue({ value: '4', type: 'font-size' }, 'ios'),
          ).toEqual('4pt');
        });
      });
    });

    describe('Android', () => {
      describe('size', () => {
        it('should format token values to density independant pixels', () => {
          expect(
            getTokenValue({ value: '4', type: 'size' }, 'android'),
          ).toEqual('4dp');
        });
      });

      describe('font-size', () => {
        it('should format token values to scale independant pixels', () => {
          expect(
            getTokenValue({ value: '4', type: 'font-size' }, 'android'),
          ).toEqual('4sp');
        });
      });
    });
  });
});
