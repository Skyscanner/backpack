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

import { Text } from 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';

import BpkButtonLink from './BpkButtonLink';
import { ICON_ALIGNMENTS } from './common-types';

const onPressFn = jest.fn();

const commonTests = () => {
  jest.mock('Text', () => 'Text');

  describe('BpkButtonLink', () => {
    it('should render correctly', () => {
      const tree = renderer
        .create(<BpkButtonLink title="Lorem ipsum" onPress={onPressFn} />)
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should support the "icon" property', () => {
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
      const tree = renderer
        .create(
          <BpkButtonLink
            title="Lorem ipsum"
            icon={<Text>foo</Text>}
            iconOnly
            onPress={onPressFn}
          />,
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should support overwriting styles', () => {
      const tree = renderer
        .create(
          <BpkButtonLink
            title="Lorem ipsum"
            onPress={onPressFn}
            style={{ width: 100 }}
          />,
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    Object.keys(ICON_ALIGNMENTS).forEach(alignmentType => {
      it(`should render correctly with iconAlignment="${alignmentType}"`, () => {
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
