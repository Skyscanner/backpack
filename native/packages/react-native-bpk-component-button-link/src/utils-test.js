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

import { themePropType } from './utils';

describe('utils', () => {
  describe('themePropType', () => {
    it('should reject theme property when some theme attributes are omitted', () => {
      const result = themePropType(
        {
          theme: {},
        },
        'theme',
        'BpkButtonLink',
      );

      const errorString =
        result instanceof Error ? result.toString() : 'Expected error';

      expect(errorString).toEqual(
        'Error: Invalid prop `theme` supplied to `BpkButtonLink`. For button link, the `theme` prop must include `buttonLinkTextColor`',
      );
    });

    it('should accept theme property when correct attributes are supplied', () => {
      expect(
        themePropType(
          {
            theme: {
              buttonLinkTextColor: 'blue',
            },
          },
          'theme',
          'BpkButtonLink',
        ),
      ).toBeFalsy();
    });
  });
});
