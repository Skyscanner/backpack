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
  colorGray50,
  colorGray700,
  spacingSm,
} from 'bpk-tokens/tokens/base.react.native';

import BpkBadge, { BADGE_TYPES, BADGE_DOCKED_TYPES } from './index';
import { StorySubheading } from '../../storybook/TextStyles';

const style = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flexWrap: 'wrap',
  },
  badgeWrapper: {
    alignSelf: 'stretch',
    justifyContent: 'space-around',
    margin: spacingSm,
    paddingBottom: spacingSm,
  },
  center: {
    flexDirection: 'row',
    padding: spacingSm,
    alignItems: 'center',
  },
  start: {
    backgroundColor: colorGray50,
    alignItems: 'flex-start',
  },
  end: {
    backgroundColor: colorGray50,
    alignItems: 'flex-end',
  },
  light: {
    backgroundColor: colorGray700,
  },
  outline: {
    backgroundColor: colorGray700,
  },
  inverse: {
    backgroundColor: colorGray700,
  },
});

const capitalise = input => input.charAt(0).toUpperCase() + input.slice(1);

const generateBadgeStory = (
  contents: Array<string>,
  config: { docked?: $Keys<typeof BADGE_DOCKED_TYPES> } = {},
) => {
  const badgeWrapperStyle = [style.badgeWrapper];
  if (config.docked) {
    badgeWrapperStyle.push(style[config.docked]);
  } else {
    badgeWrapperStyle.push(style.center);
  }
  const badges = Object.keys(BADGE_TYPES).map(i => (
    <View key={i}>
      <StorySubheading>{capitalise(i)}</StorySubheading>
      <View style={[badgeWrapperStyle, style[i]]}>
        {contents.map(content => (
          <BpkBadge
            key={content}
            message={content}
            docked={config.docked}
            type={i}
            style={style.badge}
          />
        ))}
      </View>
    </View>
  ));

  return <View style={style.container}>{badges}</View>;
};

storiesOf('BpkBadge', module)
  .add('docs:default', () => (
    <View>
      {generateBadgeStory(['Apples', 'Bananas', 'Strawberries', 'Pears'])}
    </View>
  ))
  .add('docs:docked-start', () => (
    <View>
      {generateBadgeStory(['Advert'], { docked: BADGE_DOCKED_TYPES.start })}
    </View>
  ))
  .add('docs:docked-end', () => (
    <View>
      {generateBadgeStory(['Advert'], { docked: BADGE_DOCKED_TYPES.end })}
    </View>
  ));
