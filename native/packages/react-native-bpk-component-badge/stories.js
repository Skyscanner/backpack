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
import { colorGray900, spacingSm } from 'bpk-tokens/tokens/base.react.native';

import BpkBadge, { BADGE_TYPES, BADGE_DOCKED_TYPES } from './index';
import { StorySubheading } from '../../storybook/TextStyles';

const style = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  badge: {
    margin: spacingSm,
  },
  dark: {
    backgroundColor: colorGray900,
  },
});

const generateBadgeStory = (
  config: { docked?: $Keys<typeof BADGE_DOCKED_TYPES>, isDark?: boolean } = {},
) => {
  const types = config.isDark
    ? [BADGE_TYPES.light, BADGE_TYPES.inverse, BADGE_TYPES.outline]
    : [BADGE_TYPES.success, BADGE_TYPES.warning, BADGE_TYPES.destructive];

  const containerStyle = config.isDark
    ? [style.container, style.dark]
    : style.container;

  const badges = types.map(i => (
    <BpkBadge
      key={i}
      style={style.badge}
      message="Badge"
      docked={config.docked}
      type={i}
    />
  ));

  return <View style={containerStyle}>{badges}</View>;
};

storiesOf('BpkBadge', module)
  .add('docs:default', () => (
    <View>
      <StorySubheading>Default</StorySubheading>
      {generateBadgeStory()}
      {generateBadgeStory({ isDark: true })}
    </View>
  ))
  .add('docs:docked-left', () => (
    <View>
      <StorySubheading>Docked on the left</StorySubheading>
      {generateBadgeStory({ docked: BADGE_DOCKED_TYPES.left })}
      {generateBadgeStory({ docked: BADGE_DOCKED_TYPES.left, isDark: true })}
    </View>
  ))
  .add('docs:docked-right', () => (
    <View>
      <StorySubheading>Docked on the right</StorySubheading>
      {generateBadgeStory({ docked: BADGE_DOCKED_TYPES.right })}
      {generateBadgeStory({ docked: BADGE_DOCKED_TYPES.right, isDark: true })}
    </View>
  ));
