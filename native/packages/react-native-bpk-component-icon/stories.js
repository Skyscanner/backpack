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
import { View, StyleSheet } from 'react-native';
import { storiesOf } from '@storybook/react-native';
import {
  colorBlue500,
  colorGreen500,
  colorYellow500,
  spacingBase,
  spacingSm,
} from 'bpk-tokens/tokens/base.react.native';

import BpkIcon, { icons } from './index';
import { StorySubheading } from '../../storybook/TextStyles';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    alignSelf: 'center',
  },
  group: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  column: {
    flexDirection: 'column',
    marginBottom: spacingBase,
  },
  singleRow: {
    minWidth: 100,
  },
  singleIcon: {
    paddingLeft: spacingSm,
    paddingRight: spacingSm,
  },
  icon: {
    color: colorBlue500,
  },
});

const getSmallIcons = () => (
  <View style={styles.column}>
    <StorySubheading>Small</StorySubheading>
    <View style={[styles.singleRow, styles.group]}>
      <BpkIcon style={styles.singleIcon} icon={icons.flight} small />
      <BpkIcon style={styles.singleIcon} icon={icons.cars} small />
      <BpkIcon style={styles.singleIcon} icon={icons.hotels} small />
    </View>
  </View>
);

const getLargeIcons = () => (
  <View style={styles.column}>
    <StorySubheading>Large</StorySubheading>
    <View style={[styles.singleRow, styles.group]}>
      <BpkIcon style={styles.singleIcon} icon={icons.flight} />
      <BpkIcon style={styles.singleIcon} icon={icons.cars} />
      <BpkIcon style={styles.singleIcon} icon={icons.hotels} />
    </View>
  </View>
);

const getColouredIcons = () => (
  <View style={styles.column}>
    <StorySubheading>In any color</StorySubheading>
    <View style={[styles.singleRow, styles.group]}>
      <BpkIcon
        style={[styles.singleIcon, { color: colorBlue500 }]}
        icon={icons.flight}
      />
      <BpkIcon
        style={[styles.singleIcon, { color: colorGreen500 }]}
        icon={icons.cars}
      />
      <BpkIcon
        style={[styles.singleIcon, { color: colorYellow500 }]}
        icon={icons.hotels}
      />
    </View>
  </View>
);

storiesOf('BpkIcon', module)
  .add('docs:icons', () => (
    <View style={styles.container}>
      {getSmallIcons()}
      {getLargeIcons()}
      {getColouredIcons()}
    </View>
  ))
  .add('docs:all-icons', () => (
    <View style={styles.container}>
      <View style={styles.group}>
        {Object.keys(icons).map(name => (
          <BpkIcon key={name} icon={name} style={styles.icon} />
        ))}
      </View>
    </View>
  ));
