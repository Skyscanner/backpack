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
import { type Element, StatusBar, StyleSheet, View } from 'react-native';
import BpkText from 'react-native-bpk-component-text';
import { withTheme } from 'react-native-bpk-theming';
import {
  colorGray50,
  colorGray100,
  colorGray700,
} from 'bpk-tokens/tokens/base.react.native';

import {
  type CommonTheme,
  getThemeStyle,
  makeThemePropType,
  THEME_ATTRIBUTES,
} from './common-types';
import BpkNavigationBarBackButtonIOS from './BpkNavigationBarBackButtonIOS';
import BpkNavigationBarTextButtonIOS from './BpkNavigationBarTextButtonIOS';
import BpkNavigationBarIconButtonIOS from './BpkNavigationBarIconButtonIOS';
import isIphoneX from './isIponeX';

const IOS_THEME_ATTRIBUTES = [...THEME_ATTRIBUTES, 'navigationBarShadowColor'];

const statusBarPadding = isIphoneX ? 44 : 20;

const styles = StyleSheet.create({
  barOuter: {
    flexDirection: 'column',
    paddingHorizontal: 8,
    width: '100%',
    backgroundColor: colorGray50,
    shadowColor: colorGray100,
    shadowOpacity: 1,
    shadowRadius: 0,
    shadowOffset: { width: 0, height: 1 },
  },
  barOuterWithSubtitle: {
    paddingBottom: 16,
  },
  bar: {
    paddingTop: statusBarPadding, // Status bar
    height: 64, // 44 for the bar + 20 for the status bar
    overflow: 'visible',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  barOnlyTrailingButton: {
    justifyContent: 'flex-end',
  },
  iPhoneXBar: {
    paddingTop: statusBarPadding,
    height: 88,
  },
  titleContainer: {
    position: 'absolute',
    top: statusBarPadding,
    left: 0,
    right: 0,
    bottom: 0,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    maxWidth: '60%',
  },
  subtitleViewContainer: {
    paddingHorizontal: 8,
  },
});

type IOSTheme = {
  ...$Exact<CommonTheme>,
  navigationBarShadowColor: string,
};

type ButtonType =
  | BpkNavigationBarBackButtonIOS
  | BpkNavigationBarTextButtonIOS
  | BpkNavigationBarIconButtonIOS;

export type Props = {
  title: string,
  theme: ?IOSTheme,
  leadingButton: Element<ButtonType>,
  trailingButton: Element<ButtonType>,
  subtitleView: ?Element<any>,
};

class BpkNavigationBar extends Component<Props, {}> {
  theme: ?IOSTheme;

  static propTypes = {
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
      .isRequired,
    theme: makeThemePropType(IOS_THEME_ATTRIBUTES),
    leadingButton: PropTypes.element,
    trailingButton: PropTypes.element,
    subtitleView: PropTypes.element,
  };

  static defaultProps = {
    theme: null,
    leadingButton: null,
    trailingButton: null,
    subtitleView: null,
  };

  constructor(props) {
    super(props);
    this.theme = getThemeStyle(IOS_THEME_ATTRIBUTES, this.props.theme || {});
  }

  componentDidMount() {
    this.updateStatusBar();
  }

  componentDidUpdate() {
    this.theme = getThemeStyle(IOS_THEME_ATTRIBUTES, this.props.theme || {});

    this.updateStatusBar();
  }

  updateStatusBar() {
    if (this.theme) {
      const { navigationBarStatusBarStyle } = this.theme;

      StatusBar.setBarStyle(navigationBarStatusBarStyle);
    } else {
      StatusBar.setBarStyle('dark-content');
    }
  }

  render() {
    const { title, leadingButton, trailingButton, subtitleView } = this.props;
    const isTitleView = typeof title !== 'string';
    const hasSubtitleView = subtitleView !== null;
    const titleStyle = [styles.title];
    const outerBarStyle = [styles.barOuter];
    const innerBarStyle = [styles.bar, isIphoneX && styles.iPhoneXBar];
    let tintColor = colorGray700;

    if (this.theme) {
      const {
        navigationBarTintColor,
        navigationBarShadowColor,
        navigationBarBackgroundColor,
      } = this.theme;
      outerBarStyle.push({
        shadowColor: navigationBarShadowColor,
        backgroundColor: navigationBarBackgroundColor,
      });
      titleStyle.push({ color: navigationBarTintColor });
      tintColor = navigationBarTintColor;
    }

    if (hasSubtitleView) {
      outerBarStyle.push(styles.barOuterWithSubtitle);
    }

    if (!leadingButton && trailingButton) {
      innerBarStyle.push(styles.barOnlyTrailingButton);
    }

    return (
      <View style={outerBarStyle}>
        <View style={innerBarStyle}>
          {leadingButton &&
            React.cloneElement(leadingButton, {
              tintColor,
              leading: true,
            })}
          <View style={styles.titleContainer}>
            {isTitleView ? (
              React.cloneElement(title, { style: { height: 28 } })
            ) : (
              <BpkText
                textStyle="lg"
                emphasize
                style={styles.title}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {title}
              </BpkText>
            )}
          </View>
          {trailingButton &&
            React.cloneElement(trailingButton, {
              tintColor,
              leading: false,
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
