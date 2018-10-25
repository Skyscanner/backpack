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
  colorPink500,
} from 'bpk-tokens/tokens/base.react.native';
import { View } from 'react-native';
import { storiesOf } from '@storybook/react-native';
import CenterDecorator from '../../storybook/CenterDecorator';

import BpkText, { WEIGHT_STYLES } from './index';

storiesOf('react-native-bpk-component-text', module)
  .addDecorator(CenterDecorator)
  .add('docs:default', () => (
    <View>
      <BpkText textStyle="xxxl">Flights to Edinburgh</BpkText>
      <BpkText textStyle="xxl">Flights to Edinburgh</BpkText>
      <BpkText textStyle="xl">Flights to Edinburgh</BpkText>
      <BpkText textStyle="lg">Flights to Edinburgh</BpkText>
      <BpkText textStyle="base">Flights to Edinburgh</BpkText>
      <BpkText textStyle="sm">Flights to Edinburgh</BpkText>
      <BpkText textStyle="xs">Flights to Edinburgh</BpkText>
      <BpkText textStyle="caps">FLIGHTS TO EDINBURGH</BpkText>
    </View>
  ))
  .add('docs:emphasize', () => (
    <View>
      <BpkText textStyle="xxxl" weight={WEIGHT_STYLES.emphasized}>
        Flights to Edinburgh
      </BpkText>
      <BpkText textStyle="xxl" weight={WEIGHT_STYLES.emphasized}>
        Flights to Edinburgh
      </BpkText>
      <BpkText textStyle="xl" weight={WEIGHT_STYLES.emphasized}>
        Flights to Edinburgh
      </BpkText>
      <BpkText textStyle="lg" weight={WEIGHT_STYLES.emphasized}>
        Flights to Edinburgh
      </BpkText>
      <BpkText textStyle="base" weight={WEIGHT_STYLES.emphasized}>
        Flights to Edinburgh
      </BpkText>
      <BpkText textStyle="sm" weight={WEIGHT_STYLES.emphasized}>
        Flights to Edinburgh
      </BpkText>
      <BpkText textStyle="xs" weight={WEIGHT_STYLES.emphasized}>
        Flights to Edinburgh
      </BpkText>
      <BpkText textStyle="caps" weight={WEIGHT_STYLES.emphasized}>
        FLIGHTS TO EDINBURGH
      </BpkText>
    </View>
  ))
  .add('docs:heavy', () => (
    <View>
      <BpkText textStyle="xxxl" weight={WEIGHT_STYLES.heavy}>
        Flights to Edinburgh
      </BpkText>
      <BpkText textStyle="xxl" weight={WEIGHT_STYLES.heavy}>
        Flights to Edinburgh
      </BpkText>
      <BpkText textStyle="xl" weight={WEIGHT_STYLES.heavy}>
        Flights to Edinburgh
      </BpkText>
    </View>
  ))
  .add('Colours', () => (
    <View>
      <BpkText textStyle="xxxl" style={{ color: colorBlue700 }}>
        Flights to Edinburgh
      </BpkText>
      <BpkText textStyle="xxl" style={{ color: colorRed500 }}>
        Flights to Edinburgh
      </BpkText>
      <BpkText textStyle="xl" style={{ color: colorGreen500 }}>
        Flights to Edinburgh
      </BpkText>
      <BpkText textStyle="lg" style={{ color: colorYellow500 }}>
        Flights to Edinburgh
      </BpkText>
      <BpkText textStyle="base" style={{ color: colorPink500 }}>
        Flights to Edinburgh
      </BpkText>
      <BpkText textStyle="sm" style={{ color: colorBlue700 }}>
        Flights to Edinburgh
      </BpkText>
      <BpkText textStyle="xs" style={{ color: colorGray500 }}>
        Flights to Edinburgh
      </BpkText>
      <BpkText textStyle="caps" style={{ color: colorRed500 }}>
        FLIGHTS TO EDINBURGH
      </BpkText>
    </View>
  ))
  .add('Emphasised (deprecated)', () => (
    <View>
      <BpkText emphasize>Flights to Edinburgh</BpkText>
    </View>
  ));
