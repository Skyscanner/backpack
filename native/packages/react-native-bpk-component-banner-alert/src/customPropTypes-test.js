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
import BpkText from 'react-native-bpk-component-text';
import { dismissablePropType } from './customPropTypes';

describe('customPropTypes', () => {
  describe('dismissablePropType', () => {
    it('should error if dismissable and expandable', () => {
      const result = dismissablePropType(
        {
          dismissable: true,
          children: <BpkText textStyle="sm">CHILD</BpkText>,
        },
        'dismissable',
        'BpkBannerAlert',
      ).toString();

      expect(result).toEqual(
        'Error: Invalid prop `dismissable` with value `true` supplied to `BpkBannerAlert`. Banner alert cannot be expanded to show children if it is dismissable.',
      ); // eslint-disable-line max-len
    });

    it('should not error if only expandable', () => {
      const result = dismissablePropType(
        {
          children: <BpkText textStyle="sm">CHILD</BpkText>,
        },
        'dismissable',
        'BpkBannerAlert',
      );

      expect(result).toEqual(false);
    });

    it('should not error if only dismissable', () => {
      const result = dismissablePropType(
        {
          dismissable: true,
          children: null,
        },
        'dismissable',
        'BpkBannerAlert',
      );

      expect(result).toEqual(false);
    });
  });
});
