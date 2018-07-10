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
import { StyleSheet } from 'react-native';
import { spacingLg } from 'bpk-tokens/tokens/base.react.native';
import { storiesOf } from '@storybook/react-native';

import CenterDecorator from '../../storybook/CenterDecorator';
import BpkImage, { withLoadingBehaviour } from './index';

const BpkImageWithLoading = withLoadingBehaviour(BpkImage);

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: spacingLg * 10,
  },
});

storiesOf('react-native-bpk-component-image', module)
  .addDecorator(CenterDecorator)
  .add('docs:default', () => (
    <BpkImage
      alt="test"
      source={{
        uri: 'https://unsplash.com/photos/fZ1gqh4jPgM/download?force=true',
      }}
      style={styles.image}
    />
  ))
  .add('docs:no-border-radius', () => (
    <BpkImage
      rounded={false}
      alt="test"
      source={{
        uri: 'https://unsplash.com/photos/NCq2PGvLWKM/download?force=true',
      }}
      style={styles.image}
    />
  ))
  .add('docs:withLoadingBehaviour', () => (
    <BpkImageWithLoading
      alt="test"
      style={styles.image}
      source={{
        uri: 'https://unsplash.com/photos/HEkMWKpynBA/download?force=true',
      }}
    />
  ))
  .add('out-of-view', () => (
    <BpkImage
      inView={false}
      loaded={false}
      alt="test"
      source={{
        uri: 'https://unsplash.com/photos/fZ1gqh4jPgM/download?force=true',
      }}
      style={styles.image}
    />
  ));
