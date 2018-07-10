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

import React, { Component } from 'react';
import { View, StyleSheet, type ImageSourcePropType } from 'react-native';
import BpkButton from 'react-native-bpk-component-button';
import { spacingBase, spacingLg } from 'bpk-tokens/tokens/base.react.native';
import { storiesOf } from '@storybook/react-native';

import CenterDecorator from '../../storybook/CenterDecorator';
import BpkImage from './index';

const styles = StyleSheet.create({
  button: {
    marginBottom: spacingBase,
  },
  image: {
    width: '100%',
    height: spacingLg * 10,
  },
});

type Props = {
  source: ImageSourcePropType,
};
type State = { loaded: boolean };

class BpkImageLoadingStory extends Component<Props, State> {
  static propTypes = {};

  static defaultProps = {};

  constructor(props: Props) {
    super(props);
    this.state = {
      loaded: false,
    };
  }

  onLoadToggle = () => {
    this.setState(prevState => ({ loaded: !prevState.loaded }));
  };

  render() {
    const { source, ...rest } = this.props;

    return (
      <View>
        <BpkButton
          style={styles.button}
          title={
            this.state.loaded ? 'Reload story to try again' : 'Mark as loaded'
          }
          onPress={this.onLoadToggle}
          disabled={this.state.loaded}
        />
        <BpkImage
          loaded={this.state.loaded}
          alt="test"
          style={styles.image}
          source={source}
          {...rest}
        />
      </View>
    );
  }
}

storiesOf('react-native-bpk-component-image', module)
  .addDecorator(CenterDecorator)
  .add('docs:default', () => (
    <BpkImage
      alt="test"
      source={{
        uri: 'https://unsplash.com/photos/HC6Gkb9x4Ro/download?force=true',
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
  .add('docs:loading', () => (
    <BpkImageLoadingStory
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
        uri: 'https://unsplash.com/photos/HC6Gkb9x4Ro/download?force=true',
      }}
      style={styles.image}
    />
  ));
