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
import PropTypes from 'prop-types';
import {
  StyleSheet,
  View,
  Animated,
  Easing,
  Platform,
  ViewPropTypes,
} from 'react-native';
import {
  animmationDurationBase,
  spacingMd,
  colorGray100,
  colorGreen500,
  colorGreen50,
  borderRadiusPill,
  spacingXxl,
} from 'bpk-tokens/tokens/base.react.native';

import {
  getThemeAttributes,
  withTheme,
  type Theme,
} from 'react-native-bpk-theming';

import { REQUIRED_THEME_ATTRIBUTES, themePropType } from './theming';

const styles = StyleSheet.create({
  track: {
    backgroundColor: Platform.select({
      ios: () => colorGray100,
      android: () => colorGreen50,
    })(),
    height: spacingMd,
  },
  fill: {
    height: spacingMd,
  },
  defaultTrackStyle: {
    borderRadius: borderRadiusPill,
    width: spacingXxl * 3,
  },
  defaultFillStyle: {
    backgroundColor: colorGreen500,
    borderRadius: borderRadiusPill,
  },
  barTrackStyle: {
    width: '100%',
  },
  barFillStyle: {
    backgroundColor: colorGreen500,
  },
});

const BAR_TYPES = {
  default: 'default',
  bar: 'bar',
};

type Props = {
  max: number,
  min: number,
  value: number,
  type: $Keys<typeof BAR_TYPES>,
  style: ?any,
  fillStyle: ?any,
  theme: ?Theme,
  accessibilityLabel: string | ((number, number, number) => string),
};

type State = {
  width: number,
};

class ProgressBar extends React.Component<Props, State> {
  progressAnimation: Animated.Value;

  static propTypes = {
    max: PropTypes.number.isRequired,
    min: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
    type: PropTypes.oneOf(Object.keys(BAR_TYPES)),
    style: ViewPropTypes.style,
    fillStyle: ViewPropTypes.style,
    theme: themePropType,
    accessibilityLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.func])
      .isRequired,
  };

  static defaultProps = {
    type: BAR_TYPES.default,
    style: null,
    fillStyle: null,
    theme: null,
  };

  constructor(props: Props) {
    super(props);
    this.progressAnimation = new Animated.Value(this.getWithinBoundsProgress());
    this.state = {
      width: 0,
    };
  }

  componentDidUpdate(prevProps: Props) {
    if (this.props.value >= 0 && this.props.value !== prevProps.value) {
      Animated.timing(this.progressAnimation, {
        easing: Easing.inOut(Easing.ease),
        duration: animmationDurationBase,
        toValue: this.getWithinBoundsProgress(),
      }).start();
    }
  }

  onLayout = (event: any) => {
    this.setState({ width: event.nativeEvent.layout.width });
  };

  getWithinBoundsProgress() {
    return Math.max(Math.min(this.props.value, this.props.max), this.props.min);
  }

  render() {
    const {
      min,
      max,
      type,
      style,
      fillStyle,
      theme,
      accessibilityLabel,
    } = this.props;
    const { width } = this.state;
    const [baseTrackStyle, baseFillStyle] = ['TrackStyle', 'FillStyle'].map(
      stylePart => styles[`${type}${stylePart}`],
    );

    const fillWidth = this.progressAnimation.interpolate({
      inputRange: [min, max],
      outputRange: [0, width],
    });

    const themeAttributes = getThemeAttributes(
      REQUIRED_THEME_ATTRIBUTES,
      theme,
    );

    const themeStyle = {
      track: themeAttributes && {
        backgroundColor: themeAttributes.progressTrackBackgroundColor,
      },
      fill: themeAttributes && {
        backgroundColor: themeAttributes.progressFillBackgroundColor,
      },
    };

    const label =
      typeof accessibilityLabel === 'string'
        ? accessibilityLabel
        : accessibilityLabel(min, max, this.getWithinBoundsProgress());

    return (
      <View
        style={[styles.track, baseTrackStyle, themeStyle.track, style]}
        onLayout={this.onLayout}
        accessibilityLabel={label}
      >
        <Animated.View
          style={[
            styles.fill,
            baseFillStyle,
            { width: fillWidth },
            themeStyle.fill,
            fillStyle,
          ]}
        />
      </View>
    );
  }
}

export default withTheme(ProgressBar);
