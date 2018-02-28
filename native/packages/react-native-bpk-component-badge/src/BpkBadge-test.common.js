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
import { View } from 'react-native';
import renderer from 'react-test-renderer';
import { spacingSm } from 'bpk-tokens/tokens/base.react.native';

import BpkBadge, { BADGE_TYPES, BADGE_DOCKED_TYPES } from './BpkBadge';

const generateBadgeStory = (config: {
  docked?: $Keys<typeof BADGE_DOCKED_TYPES>,
  style?: Object,
}) => {
  const badges = Object.keys(BADGE_TYPES).map(type => (
    <BpkBadge
      key={type}
      style={config.style}
      message="Badge"
      docked={config.docked}
      type={type}
    />
  ));

  return <View>{badges}</View>;
};

const commonTests = () => {
  describe('BpkBadge', () => {
    it('should render correctly in normal mode', () => {
      const tree = renderer.create(generateBadgeStory({})).toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should render correctly docked to the left', () => {
      const tree = renderer
        .create(generateBadgeStory({ docked: BADGE_DOCKED_TYPES.left }))
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should render correctly docked to the right', () => {
      const tree = renderer
        .create(generateBadgeStory({ docked: BADGE_DOCKED_TYPES.right }))
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should throw an error is an extraneous docked values is provided', () => {
      jest.spyOn(console, 'error').mockImplementation(err => {
        throw err;
      });

      expect(() => {
        // $FlowFixMe
        renderer.create(generateBadgeStory({ docked: 'unknown' }));
      }).toThrow();
    });

    it('should render correctly with user provided style', () => {
      const tree = renderer
        .create(generateBadgeStory({ style: { margin: spacingSm } }))
        .toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
};
export default commonTests;
