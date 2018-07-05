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

import React, { Component, isValidElement } from 'react';
import PropTypes from 'prop-types';
import { type Element, StyleSheet, View, ViewPropTypes } from 'react-native';
import {
  withTheme,
  getThemeAttributes,
  makeThemePropType,
} from 'react-native-bpk-theming';
import {
  colorGray50,
  colorGray100,
  colorGray300,
  colorGray700,
} from 'bpk-tokens/tokens/base.react.native';

import {
  type CommonTheme,
  type TitleProp,
  THEME_ATTRIBUTES,
  TITLE_PROPTYPE,
} from './common-types';

import BpkNavigationBarBackButtonIOS from './BpkNavigationBarBackButtonIOS';
import BpkNavigationBarTextButtonIOS from './BpkNavigationBarTextButtonIOS';
import BpkNavigationBarIconButtonIOS from './BpkNavigationBarIconButtonIOS';
import TitleView from './TitleView';
import isIphoneX from './isIphoneX';

const IOS_THEME_ATTRIBUTES = [...THEME_ATTRIBUTES, 'navigationBarShadowColor'];

const statusBarPadding = isIphoneX ? 44 : 20;

const styles = StyleSheet.create({
  barOuter: {
    flexDirection: 'column',
    paddingHorizontal: 8, // eslint-disable-line backpack/use-tokens
    width: '100%',
    backgroundColor: colorGray50,
    shadowColor: colorGray100,
    shadowOpacity: 1,
    shadowRadius: 0,
    shadowOffset: { width: 0, height: 1 }, // eslint-disable-line backpack/use-tokens
  },
  barOuterWithSubtitle: {
    paddingBottom: 16, // eslint-disable-line backpack/use-tokens
  },
  barInner: {
    paddingTop: statusBarPadding, // Status bar
    // 44 for the bar + 20 for the status bar
    height: 64, // eslint-disable-line backpack/use-tokens
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
    height: 88, // eslint-disable-line backpack/use-tokens
  },
  titleContainer: {
    position: 'absolute',
    top: statusBarPadding,
    left: 0,
    right: 0,
    bottom: 0,
    height: 44, // eslint-disable-line backpack/use-tokens
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    maxWidth: '60%',
  },
  subtitleViewContainer: {
    paddingHorizontal: 8, // eslint-disable-line backpack/use-tokens
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
  title: TitleProp,
  theme: ?IOSTheme,
  leadingButton: ?Element<ButtonType>,
  trailingButton: ?Element<ButtonType>,
  subtitleView: ?Element<any>,
  // FIXME: We need a better flow type for style
  style: any,
};

class BpkNavigationBar extends Component<Props, {}> {
  theme: ?IOSTheme;

  static propTypes = {
    title: TITLE_PROPTYPE.isRequired,
    theme: makeThemePropType(IOS_THEME_ATTRIBUTES),
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
      IOS_THEME_ATTRIBUTES,
      this.props.theme || {},
    );
  }

  componentDidUpdate() {
    this.theme = getThemeAttributes(
      IOS_THEME_ATTRIBUTES,
      this.props.theme || {},
    );
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
    const titleStyle = [styles.title];
    const outerBarStyle = [styles.barOuter];
    const innerBarStyle = [styles.barInner, isIphoneX && styles.iPhoneXBar];

    let tintColor = colorGray700;
    let disabledTintColor = colorGray300;
    if (this.theme) {
      const {
        navigationBarTintColor,
        navigationBarDisabledTintColor,
        navigationBarShadowColor,
        navigationBarBackgroundColor,
      } = this.theme;
      outerBarStyle.push({
        shadowColor: navigationBarShadowColor,
        backgroundColor: navigationBarBackgroundColor,
      });
      titleStyle.push({ color: navigationBarTintColor });
      tintColor = navigationBarTintColor;
      disabledTintColor = navigationBarDisabledTintColor;
    }

    let titleView = null;

    // This if ensures Flow correctly refines the type of
    // title in the body of the if to `'string' | TitleWithIcon
    if (
      typeof title === 'string' ||
      (title !== null && typeof title === 'object' && title.icon)
    ) {
      titleView = (
        <TitleView title={title} tintColor={tintColor} style={styles.title} />
      );
    }

    // This if ensures Flow correctly refines the type of
    // title in the body of the if to `Element`.
    // While this if is mutually exclusive to the above it
    // cannot be an else if as Flow seems unable to handle this.
    if (
      title !== null &&
      typeof title === 'object' &&
      title.type &&
      isValidElement(title)
    ) {
      titleView = React.cloneElement(title, {
        style: [
          title.props.style ? title.props.style : null,
          { maxHeight: 28 }, // eslint-disable-line backpack/use-tokens
        ],
      });
    }

    if (hasSubtitleView) {
      outerBarStyle.push(styles.barOuterWithSubtitle);
    }

    if (!leadingButton && trailingButton) {
      innerBarStyle.push(styles.barOnlyTrailingButton);
    }

    if (style) {
      outerBarStyle.push(style);
    }

    return (
      <View style={outerBarStyle}>
        <View style={innerBarStyle}>
          {leadingButton &&
            React.cloneElement(leadingButton, {
              disabledTintColor,
              tintColor,
              leading: true,
            })}
          <View style={styles.titleContainer}>{titleView}</View>
          {trailingButton &&
            React.cloneElement(trailingButton, {
              disabledTintColor,
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
