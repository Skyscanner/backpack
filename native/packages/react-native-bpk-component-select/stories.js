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
import { StyleSheet, View } from 'react-native';
import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';
import { spacingBase } from 'bpk-tokens/tokens/base.react.native';

import CenterDecorator from '../../storybook/CenterDecorator';
import { StorySubheading } from '../../storybook/TextStyles';

import BpkSelect from './index';

const styles = StyleSheet.create({
  select: {
    marginBottom: spacingBase,
  },
});

storiesOf('react-native-bpk-component-select', module)
  .addDecorator(CenterDecorator)
  .add('docs:default', () => (
    <View>
      <StorySubheading>Normal</StorySubheading>
      <View style={styles.select}>
        <BpkSelect onPress={action('Select pressed')} label="Value" />
      </View>

      <StorySubheading>With image</StorySubheading>
      <BpkSelect onPress={action('Select pressed')} label="Value" showImage />
    </View>
  ));
