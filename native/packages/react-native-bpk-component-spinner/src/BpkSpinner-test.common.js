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

import React from 'react';
import renderer from 'react-test-renderer';
import BpkThemeProvider from 'react-native-bpk-theming';

import BpkSpinner, { SPINNER_TYPES } from './BpkSpinner';

const commonTests = () => {
  describe('BpkSpinner', () => {
    it('should render correctly', () => {
      const tree = renderer.create(<BpkSpinner />).toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should support the "small" property', () => {
      const tree = renderer.create(<BpkSpinner small />).toJSON();
      expect(tree).toMatchSnapshot();
    });

    Object.keys(SPINNER_TYPES).forEach(spinnerType => {
      it(`should support type="${spinnerType}"`, () => {
        const tree = renderer
          .create(<BpkSpinner type={spinnerType} />)
          .toJSON();
        expect(tree).toMatchSnapshot();
      });
    });

    it('should throw an error for invalid spinner type', () => {
      jest.spyOn(console, 'error').mockImplementation(() => jest.fn());
      expect(() => renderer.create(<BpkSpinner type="silly" />)).toThrow(
        '"silly" is not a valid spinner type. Valid types are primary, light, dark',
      );
    });

    it('should support theming', () => {
      const theme = {
        spinnerPrimaryColor: 'red',
      };
      const tree = renderer
        .create(
          <BpkThemeProvider theme={theme}>
            <BpkSpinner />
          </BpkThemeProvider>,
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should disable theming if the required attribute is omitted', () => {
      const theme = {};
      const tree = renderer
        .create(
          <BpkThemeProvider theme={theme} type="primary">
            <BpkSpinner />
          </BpkThemeProvider>,
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
};
export default commonTests;
