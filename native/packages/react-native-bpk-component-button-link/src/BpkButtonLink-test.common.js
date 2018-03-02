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

import { Text } from 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';

import BpkButtonLink, { propTypes } from './BpkButtonLink';
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

    it('should support the "large" property', () => {
      const tree = renderer
        .create(<BpkButtonLink large title="Lorem ipsum" onPress={onPressFn} />)
        .toJSON();
      expect(tree).toMatchSnapshot();
    });
    it('should support the "large" and secondary property', () => {
      const tree = renderer
        .create(<BpkButtonLink large title="Lorem ipsum" onPress={onPressFn} />)
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should support the "icon" and "large" property', () => {
      const tree = renderer
        .create(
          <BpkButtonLink
            icon="baggage"
            large
            title="Lorem ipsum"
            onPress={onPressFn}
          />,
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should support having an icon as well as a title', () => {
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

    it('should accept elements as the icon property', () => {
      expect(
        propTypes.icon(
          {
            iconOnly: true,
            icon: <Text>foo</Text>,
          },
          'icon',
          'BpkButtonLink',
        ),
      ).toBeFalsy();
    });

    it('should reject theme property when some theme attributes are omitted', () => {
      // eslint-disable-line max-len
      expect(
        propTypes
          .theme(
            {
              theme: {},
            },
            'theme',
            'BpkButtonLink',
          )
          .toString(),
      ).toEqual(
        'Error: Invalid prop `theme` supplied to `BpkButtonLink`. For button link, the `theme` prop must include `buttonLinkTextColor`',
      ); // eslint-disable-line max-len
    });

    it('should accept theme property when correct attributes are supplied', () => {
      // eslint-disable-line max-len
      expect(
        propTypes.theme(
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
};

export default commonTests;
