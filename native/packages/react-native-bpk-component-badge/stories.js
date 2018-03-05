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
import { storiesOf } from '@storybook/react-native';
import { View, StyleSheet } from 'react-native';
import {
  colorGray900,
  colorGray100,
  spacingSm,
  spacingXxl,
  spacingBase,
} from 'bpk-tokens/tokens/base.react.native';

import BpkBadge, { BADGE_TYPES, BADGE_DOCKED_TYPES } from './index';
import { StorySubheading } from '../../storybook/TextStyles';

const style = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flexWrap: 'wrap',
  },
  badgeWrapper: {
    backgroundColor: colorGray100,
    alignSelf: 'stretch',
    margin: spacingSm,
    paddingBottom: spacingSm,
  },
  badge: {
    maxWidth: spacingBase + spacingXxl,
  },
  center: {
    padding: spacingSm,
    alignItems: 'center',
  },
  left: {
    alignItems: 'flex-start',
  },
  right: {
    alignItems: 'flex-end',
  },
  outline: {
    backgroundColor: colorGray900,
  },
});

const generateBadgeStory = (
  config: { docked?: $Keys<typeof BADGE_DOCKED_TYPES> } = {},
) => {
  const badgeWrapperStyle = [style.badgeWrapper];
  if (config.docked) {
    badgeWrapperStyle.push(style[config.docked]);
  } else {
    badgeWrapperStyle.push(style.center);
  }
  const badges = Object.keys(BADGE_TYPES).map(i => (
    <View style={[badgeWrapperStyle, style[i]]} key={i}>
      <BpkBadge
        style={style.badge}
        message="Badge"
        docked={config.docked}
        type={i}
      />
    </View>
  ));

  return <View style={style.container}>{badges}</View>;
};

storiesOf('BpkBadge', module)
  .add('docs:default', () => (
    <View>
      <StorySubheading>Default</StorySubheading>
      {generateBadgeStory()}
    </View>
  ))
  .add('docs:docked-left', () => (
    <View>
      <StorySubheading>Docked on the left</StorySubheading>
      {generateBadgeStory({ docked: BADGE_DOCKED_TYPES.left })}
    </View>
  ))
  .add('docs:docked-right', () => (
    <View>
      <StorySubheading>Docked on the right</StorySubheading>
      {generateBadgeStory({ docked: BADGE_DOCKED_TYPES.right })}
    </View>
  ));
