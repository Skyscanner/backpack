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

import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { storiesOf } from '@storybook/react-native';
import {
  colorGray300,
  colorGray500,
} from 'bpk-tokens/tokens/base.react.native';
import range from 'lodash/range';
import BpkText from 'react-native-bpk-component-text';
import CenterDecorator from '../../storybook/CenterDecorator';
import BpkCarousel, { BpkCarouselItem } from './index';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  view: {
    alignSelf: 'center',
    width: 350,
    maxHeight: 233,
  },
});

const renderImages = () =>
  [
    'https://content.skyscnr.com/96508dbac15a2895b0147dc7e7f9ad30/canadian-rockies-canada.jpg',
    'https://content.skyscnr.com/8bd0d1b67b1bda63e5567a4c402402f2/iceland.jpg',
    'https://content.skyscnr.com/200946ddb82b7c026e6e186a7037b1f8/machu-picchu.jpg',
    'https://content.skyscnr.com/8a8ac17b591b61e6fe5d8f63414561cd/amsterdam-the-netherlands.jpg',
    'https://content.skyscnr.com/6c8f0e633bde70798a9d6f0a26cb6016/andalsnes-norway.jpg',
  ].map(uri => (
    <BpkCarouselItem key={uri}>
      <Image style={{ width: '100%', height: '100%' }} source={{ uri }} />
    </BpkCarouselItem>
  ));

const accessibilityLabel = (page, total) => `${page} of ${total}`;

storiesOf('react-native-bpk-component-carousel', module)
  .addDecorator(CenterDecorator)
  .add('Default', () => (
    <BpkCarousel style={styles.view} accessibilityLabel={accessibilityLabel}>
      {renderImages()}
    </BpkCarousel>
  ))
  .add('Multiple elements', () => (
    <BpkCarousel accessibilityLabel={accessibilityLabel} style={styles.view}>
      <BpkCarouselItem style={[styles.page, { backgroundColor: colorGray300 }]}>
        <BpkText textStyle="xl"> View 1 </BpkText>
      </BpkCarouselItem>
      <BpkCarouselItem>
        <Image
          style={{ width: '100%', height: '100%' }}
          source={{
            uri:
              'https://content.skyscnr.com/96508dbac15a2895b0147dc7e7f9ad30/canadian-rockies-canada.jpg',
          }}
        />
      </BpkCarouselItem>
    </BpkCarousel>
  ))
  .add('Without indicators', () => (
    <BpkCarousel
      accessibilityLabel={accessibilityLabel}
      style={styles.view}
      showIndicator={false}
    >
      {renderImages()}
    </BpkCarousel>
  ))
  .add('Perf: 100 elements with pagination', () => {
    const colors = [colorGray300, colorGray500];
    return (
      <BpkCarousel accessibilityLabel={accessibilityLabel} style={styles.view}>
        {range(100).map(idx => (
          <BpkCarouselItem
            key={idx}
            style={[styles.page, { backgroundColor: colors[idx % 2] }]}
          >
            <BpkText textStyle="xl"> View {idx} </BpkText>
          </BpkCarouselItem>
        ))}
      </BpkCarousel>
    );
  });
