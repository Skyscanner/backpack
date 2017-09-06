/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2017 Skyscanner Ltd
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
import {
  StyleSheet,
  View,
  ScrollView,
  Image,
  Platform,
} from 'react-native';

import PropTypes from 'prop-types';

import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';

import BpkText from 'react-native-bpk-component-text';

import BpkButton, { BUTTON_TYPES } from './src/BpkButton';

import ArrowImageSrc from './long-arrow-right-3x.png';

const tokens = Platform.OS === 'ios' ?
  require('bpk-tokens/tokens/ios/base.react.native.common.js') :
  require('bpk-tokens/tokens/android/base.react.native.common.js')
;

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: tokens.spacingMd,
    paddingRight: tokens.spacingMd,
  },
  btnContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  image: {
    height: 15,
    width: 17,
    tintColor: tokens.colorWhite,
  },
  imageLarge: {
    height: 22,
    width: 26,
    tintColor: tokens.colorWhite,
  },
  imageSecondary: {
    tintColor: tokens.colorBlue500,
  },
  imageDestructive: {
    tintColor: tokens.colorRed500,
  },
  bottomMargin: {
    marginBottom: tokens.spacingSm,
  },
});

const buttonStyles = StyleSheet.create({
  container: {
    marginBottom: tokens.spacingMd,
    marginRight: tokens.spacingMd,
  },
});

// Utility for creating arrow icons to show in the buttons.
const ArrowImage = ({ large, type }) => {
  const style = [large ? styles.imageLarge : styles.image];
  if (type === 'destructive') {
    style.push(styles.imageDestructive);
  }
  if (type === 'secondary') {
    style.push(styles.imageSecondary);
  }
  return <Image source={ArrowImageSrc} style={style} />;
};

ArrowImage.propTypes = {
  large: PropTypes.bool,
  type: PropTypes.string,
};

ArrowImage.defaultProps = {
  large: false,
  type: '',
};

const generateButtonStoryForType = type => (
  <View key={type}>
    <BpkText textStyle="sm" style={styles.bottomMargin}>Default</BpkText>
    <View style={styles.btnContainer}>
      <BpkButton
        type={type}
        title="Button"
        onPress={action(`${type} pressed`)}
        style={buttonStyles}
      />
      <BpkButton
        type={type}
        selected
        title="Selected"
        onPress={action(`${type} selected pressed`)}
        style={buttonStyles}
      />
      <BpkButton
        type={type}
        disabled
        title="Disabled"
        onPress={action(`${type} disabled pressed, somehow`)}
        style={buttonStyles}
      />
      <BpkButton
        type={type}
        title="With icon"
        icon={<ArrowImage type={type} />}
        onPress={action(`${type} with icon clicked`)}
        style={buttonStyles}
      />
      <BpkButton
        type={type}
        icon={<ArrowImage type={type} />}
        onPress={action(`${type} icon only button clicked`)}
        style={buttonStyles}
      />
    </View>

    <BpkText textStyle="sm" style={styles.bottomMargin}>Large</BpkText>
    <View style={styles.btnContainer}>
      <BpkButton
        large
        type={type}
        title="Button"
        onPress={action(`${type} pressed`)}
        style={buttonStyles}
      />
      <BpkButton
        large
        type={type}
        selected
        title="Selected"
        onPress={action(`${type} selected pressed`)}
        style={buttonStyles}
      />
      <BpkButton
        large
        type={type}
        disabled
        title="Disabled"
        onPress={action(`${type} disabled pressed, somehow`)}
        style={buttonStyles}
      />
      <BpkButton
        large
        type={type}
        title="With icon"
        icon={<ArrowImage large type={type} />}
        onPress={action(`${type} with icon clicked`)}
        style={buttonStyles}
      />
      <BpkButton
        large
        type={type}
        icon={<ArrowImage large type={type} />}
        onPress={action(`${type} icon only button clicked`)}
        style={buttonStyles}
      />
    </View>
  </View>
);

const allButtonStories = BUTTON_TYPES.map(generateButtonStoryForType);

storiesOf('BpkButton', module)
  .addDecorator(getStory =>
    <View style={styles.centered}>
      {getStory()}
    </View>,
  )
  .add('docs:primary', () => (
    <View>
      {generateButtonStoryForType('primary')}
    </View>
  ))
  .add('docs:secondary', () => (
    <View>
      {generateButtonStoryForType('secondary')}
    </View>
  ))
  .add('docs:destructive', () => (
    <View>
      {generateButtonStoryForType('destructive')}
    </View>
  ))
  .add('docs:featured', () => (
    <View>
      {generateButtonStoryForType('featured')}
    </View>
  ))
  .add('All Button Types', () => (
    <ScrollView>
      <BpkText textStyle="xxl">All Types</BpkText>
      {allButtonStories}
    </ScrollView>
  ))
  .add('Edge Cases', () => (
    <View>
      <BpkText textStyle="xxl">Edge Cases</BpkText>

      <BpkText textStyle="sm" style={styles.bottomMargin}>Long button titles</BpkText>
      <BpkButton
        type="primary"
        title="I have a really long title"
        onPress={action('Button with long title pressed')}
        style={buttonStyles}
      />
      <BpkButton
        large
        type="primary"
        title="I also have a really long title"
        onPress={action('Large button with long title pressed')}
        style={buttonStyles}
      />
      <BpkButton
        type="primary"
        title="I have an absurdly long title and an icon and may cause wrapping"
        icon={<ArrowImage />}
        onPress={action('Button with icon and long title pressed')}
        style={buttonStyles}
      />
      <BpkButton
        large
        type="primary"
        title="I also have an absurdly long title and an icon and may cause wrapping"
        icon={<ArrowImage />}
        onPress={action('Large button with icon and long title pressed')}
        style={buttonStyles}
      />
    </View>
  ));
