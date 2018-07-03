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
import renderer from 'react-test-renderer';
import BpkText from 'react-native-bpk-component-text';
import BpkThemeProvider from 'react-native-bpk-theming';
import { spacingSm } from 'bpk-tokens/tokens/base.react.native';

import BpkButtonLink from './BpkButtonLink';
import { ICON_ALIGNMENTS } from './common-types';

const commonTests = () => {
  describe('BpkButtonLink', () => {
    it('should render correctly', () => {
      const onPressFn = jest.fn();

      const tree = renderer
        .create(<BpkButtonLink title="Lorem ipsum" onPress={onPressFn} />)
        .toJSON();

      expect(tree).toMatchSnapshot();
    });

    it('should support the "disabled" property', () => {
      const onPressFn = jest.fn();

      const tree = renderer
        .create(
          <BpkButtonLink disabled title="Lorem ipsum" onPress={onPressFn} />,
        )
        .toJSON();

      expect(tree).toMatchSnapshot();
    });

    it('should support the "icon" property', () => {
      const onPressFn = jest.fn();

      const tree = renderer
        .create(
          <BpkButtonLink
            icon="baggage"
            title="Lorem ipsum"
            onPress={onPressFn}
          />,
        )
        .toJSON();

      expect(tree).toMatchSnapshot();
    });

    it('should support elements as icons', () => {
      const onPressFn = jest.fn();

      const tree = renderer
        .create(
          <BpkButtonLink
            title="Lorem ipsum"
            icon={<BpkText>foo</BpkText>}
            iconOnly
            onPress={onPressFn}
          />,
        )
        .toJSON();

      expect(tree).toMatchSnapshot();
    });

    it('should support overwriting styles', () => {
      const onPressFn = jest.fn();

      const tree = renderer
        .create(
          <BpkButtonLink
            title="Lorem ipsum"
            onPress={onPressFn}
            style={{ width: spacingSm }}
          />,
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should render correctly with theme prop', () => {
      const onPressFn = jest.fn();

      const theme = {
        buttonLinkTextColor: 'red',
      };

      const tree = renderer
        .create(
          <BpkThemeProvider theme={theme}>
            <BpkButtonLink title="Lorem ipsum" onPress={onPressFn} />
          </BpkThemeProvider>,
        )
        .toJSON();

      expect(tree).toMatchSnapshot();
    });

    Object.keys(ICON_ALIGNMENTS).forEach(alignmentType => {
      it(`should render correctly with iconAlignment="${alignmentType}"`, () => {
        const onPressFn = jest.fn();

        const tree = renderer
          .create(
            <BpkButtonLink
              title="Lorem ipsum"
              icon="baggage"
              iconAlignment={alignmentType}
              onPress={onPressFn}
            />,
          )
          .toJSON();

        expect(tree).toMatchSnapshot();
      });
    });
  });
};

export default commonTests;
