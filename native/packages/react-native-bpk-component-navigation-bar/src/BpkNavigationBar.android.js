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
import PropTypes from 'prop-types';
import {
  type Element,
  StatusBar,
  StyleSheet,
  View,
  ViewPropTypes,
} from 'react-native';
import BpkText from 'react-native-bpk-component-text';
import {
  withTheme,
  getThemeAttributes,
  makeThemePropType,
} from 'react-native-bpk-theming';
import {
  colorBlue700,
  colorBlue500,
  colorWhite,
} from 'bpk-tokens/tokens/base.react.native';

import BpkNavigationBarButtonAndroid from './BpkNavigationBarButtonAndroid.android';
import { type CommonTheme, THEME_ATTRIBUTES } from './common-types';

const ANDROID_THEME_ATTRIBUTES = [
  ...THEME_ATTRIBUTES,
  'navigationBarStatusBarStyle',
  'navigationBarStatusBarColor',
];

// NOTE: this file explicitly does not use the Backpack tokens(for spacing) because it's based on Material design tokens not Backpack.
const styles = StyleSheet.create({
  barOuter: {
    flexDirection: 'column',
    paddingHorizontal: 8,
    width: '100%',
    backgroundColor: colorBlue500,
    elevation: 3,
  },
  barOuterWithSubtitle: {
    paddingBottom: 16,
  },
  bar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 56,
    alignItems: 'center',
  },
  barOnlyTrailingButton: {
    justifyContent: 'flex-end',
  },
  titleString: {
    position: 'absolute',
    start: 72,
    bottom: 15,
    color: colorWhite,
  },
  titleViewOuter: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  leadingIcon: {
    padding: 8,
    color: colorWhite,
  },
  subtitleViewContainer: {
    paddingHorizontal: 8,
  },
});

type AndroidTheme = {
  ...$Exact<CommonTheme>,
  navigationBarStatusBarColor: string,
};

export type Props = {
  title: string | Element<any>,
  theme: ?AndroidTheme,
  leadingButton: ?Element<BpkNavigationBarButtonAndroid>,
  trailingButton: ?Element<BpkNavigationBarButtonAndroid>,
  subtitleView: ?Element<any>,
  // FIXME: We need a better flow type for style
  style: any,
};

class BpkNavigationBar extends Component<Props, {}> {
  theme: ?AndroidTheme;

  static propTypes = {
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
      .isRequired,
    theme: makeThemePropType(ANDROID_THEME_ATTRIBUTES),
    leadingButton: PropTypes.element,
    trailingButton: PropTypes.element,
    subtitleView: PropTypes.element,

    style: ViewPropTypes.style,
  };

  static defaultProps = {
    theme: null,
    leadingButton: null,
    trailingButton: null,
    subtitleView: null,
    style: null,
  };

  constructor(props) {
    super(props);
    this.theme = getThemeAttributes(
      ANDROID_THEME_ATTRIBUTES,
      this.props.theme || {},
    );
  }

  componentDidMount() {
    this.updateStatusBar();
  }

  componentDidUpdate() {
    this.theme = getThemeAttributes(
      ANDROID_THEME_ATTRIBUTES,
      this.props.theme || {},
    );

    this.updateStatusBar();
  }

  updateStatusBar() {
    if (this.theme) {
      const {
        navigationBarStatusBarColor,
        navigationBarStatusBarStyle,
      } = this.theme;

      StatusBar.setBackgroundColor(navigationBarStatusBarColor);
      StatusBar.setBarStyle(navigationBarStatusBarStyle);
    } else {
      StatusBar.setBackgroundColor(colorBlue700);
      StatusBar.setBarStyle('light-content');
    }
  }

  render() {
    const {
      title,
      leadingButton,
      trailingButton,
      subtitleView,
      style,
    } = this.props;
    const hasSubtitleView = subtitleView !== null;

    const barStyle = [styles.bar];
    const outerBarStyle = [styles.barOuter];
    const titleStyle = [styles.titleString];
    let tintColor = colorWhite;
    let touchableColor = colorWhite;

    if (this.theme) {
      const {
        navigationBarTintColor,
        navigationBarBackgroundColor,
      } = this.theme;

      titleStyle.push({ color: navigationBarTintColor });
      outerBarStyle.push({
        backgroundColor: navigationBarBackgroundColor,
      });
      tintColor = navigationBarTintColor;
      touchableColor = navigationBarTintColor;
    }

    if (hasSubtitleView) {
      outerBarStyle.push(styles.barOuterWithSubtitle);
    }

    if (!leadingButton && trailingButton) {
      barStyle.push(styles.barOnlyTrailingButton);
    }

    if (style) {
      outerBarStyle.push(style);
    }

    return (
      <View style={outerBarStyle}>
        <View style={barStyle}>
          {leadingButton &&
            React.cloneElement(leadingButton, {
              touchableColor,
              tintColor,
            })}
          {typeof title !== 'string' ? (
            <View style={styles.titleViewOuter}>
              {React.cloneElement(title, {
                style: [
                  title.props.style ? title.props.style : null,
                  { maxHeight: 32 },
                ],
              })}
            </View>
          ) : (
            <BpkText style={titleStyle} textStyle="lg" emphasize>
              {title}
            </BpkText>
          )}
          {trailingButton &&
            React.cloneElement(trailingButton, {
              touchableColor,
              tintColor,
            })}
        </View>
        {hasSubtitleView && (
          <View style={styles.subtitleViewContainer}>{subtitleView}</View>
        )}
      </View>
    );
  }
}

export default withTheme(BpkNavigationBar);
