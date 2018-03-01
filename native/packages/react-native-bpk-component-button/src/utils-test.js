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

import React from 'react';
import { Text } from 'react-native';

import { iconPropType, themePropType } from './utils';

describe('utils', () => {
  describe('iconPropType', () => {
    it('should accept iconOnly prop when icon prop is supplied', () => {
      expect(
        iconPropType(
          {
            iconOnly: true,
            icon: 'baggage',
          },
          'icon',
          'BpkButton',
        ),
      ).toBeFalsy();
    });

    it('should accept elements as the icon property', () => {
      expect(
        iconPropType(
          {
            iconOnly: true,
            icon: <Text>foo</Text>,
          },
          'icon',
          'BpkButton',
        ),
      ).toBeFalsy();
    });

    it('should reject iconOnly prop when icon prop is not supplied', () => {
      const result = iconPropType(
        {
          iconOnly: true,
        },
        'icon',
        'BpkButton',
      );

      const errorString =
        result instanceof Error ? result.toString() : 'Expected an error';

      expect(errorString).toEqual(
        'Error: Invalid prop `icon` supplied to `BpkButton`. When `iconOnly` is enabled, `icon` must be supplied.',
      );
    });
  });

  describe('themePropType', () => {
    it('should reject theme property when some theme attributes are omitted', () => {
      const result = themePropType(
        {
          type: 'primary',
          theme: {},
        },
        'theme',
        'BpkButton',
      );

      const errorString =
        result instanceof Error ? result.toString() : 'Expected an error';

      expect(errorString).toEqual(
        'Error: Invalid prop `theme` supplied to `BpkButton`. For buttons of type `primary`, the `theme` prop must include `buttonPrimaryTextColor, buttonPrimaryGradientStartColor, buttonPrimaryGradientEndColor`',
      );
    });

    it('should accept theme property when correct attributes are supplied', () => {
      expect(
        themePropType(
          {
            type: 'primary',
            theme: {
              buttonPrimaryGradientStartColor: 'red',
              buttonPrimaryGradientEndColor: 'green',
              buttonPrimaryTextColor: 'blue',
            },
          },
          'theme',
          'BpkButton',
        ),
      ).toBeFalsy();
    });
  });
});
