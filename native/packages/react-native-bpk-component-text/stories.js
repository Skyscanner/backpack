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
import {
  colorRed500,
  colorBlue700,
  colorGray500,
  colorGreen500,
  colorYellow500,
} from 'bpk-tokens/tokens/base.react.native';
import { View, Platform } from 'react-native';
import { storiesOf } from '@storybook/react-native';
import CenterDecorator from '../../storybook/CenterDecorator';

import BpkText from './index';

storiesOf('react-native-bpk-component-text', module)
  .addDecorator(CenterDecorator)
  .add('docs:default', () => (
    <View>
      <BpkText textStyle="xxl">Flights to Edinburgh</BpkText>
      <BpkText textStyle="xl">Flights to Edinburgh</BpkText>
      <BpkText textStyle="lg">Flights to Edinburgh</BpkText>
      <BpkText textStyle="base">Flights to Edinburgh</BpkText>
      <BpkText textStyle="sm">Flights to Edinburgh</BpkText>
      <BpkText textStyle="xs">Flights to Edinburgh</BpkText>
    </View>
  ))
  .add('docs:emphasize', () => (
    <View>
      <BpkText textStyle="xxl" emphasize={Platform.OS === 'android'}>
        Flights to Edinburgh
      </BpkText>
      <BpkText textStyle="xl" emphasize>
        Flights to Edinburgh
      </BpkText>
      <BpkText textStyle="lg" emphasize>
        Flights to Edinburgh
      </BpkText>
      <BpkText textStyle="base" emphasize>
        Flights to Edinburgh
      </BpkText>
      <BpkText textStyle="sm" emphasize>
        Flights to Edinburgh
      </BpkText>
      <BpkText textStyle="xs" emphasize>
        Flights to Edinburgh
      </BpkText>
    </View>
  ))
  .add('Colours', () => (
    <View>
      <BpkText textStyle="xxl" style={{ color: colorBlue700 }}>
        Flights to Edinburgh
      </BpkText>
      <BpkText textStyle="xl" style={{ color: colorRed500 }}>
        Flights to Edinburgh
      </BpkText>
      <BpkText textStyle="lg" style={{ color: colorGreen500 }}>
        Flights to Edinburgh
      </BpkText>
      <BpkText textStyle="base" style={{ color: colorYellow500 }}>
        Flights to Edinburgh
      </BpkText>
      <BpkText textStyle="sm" style={{ color: colorBlue700 }}>
        Flights to Edinburgh
      </BpkText>
      <BpkText textStyle="xs" style={{ color: colorGray500 }}>
        Flights to Edinburgh
      </BpkText>
    </View>
  ));
