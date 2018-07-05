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
import {
  type Element,
  StatusBar,
  StyleSheet,
  View,
  ViewPropTypes,
} from 'react-native';
import {
  withTheme,
  getThemeAttributes,
  makeThemePropType,
} from 'react-native-bpk-theming';
import {
  colorBlue300,
  colorBlue500,
  colorBlue700,
  colorWhite,
} from 'bpk-tokens/tokens/base.react.native';

import {
  type CommonTheme,
  type TitleProp,
  THEME_ATTRIBUTES,
  TITLE_PROPTYPE,
} from './common-types';
import BpkNavigationBarButtonAndroid from './BpkNavigationBarButtonAndroid.android';
import TitleView from './TitleView';

const ANDROID_THEME_ATTRIBUTES = [
  ...THEME_ATTRIBUTES,
  'navigationBarStatusBarStyle',
  'navigationBarStatusBarColor',
];

// NOTE: this file explicitly does not use the Backpack tokens(for spacing) because it's based on Material design tokens not Backpack.
const styles = StyleSheet.create({
  barOuter: {
    flexDirection: 'column',
    paddingHorizontal: 8, // eslint-disable-line backpack/use-tokens
    width: '100%',
    backgroundColor: colorBlue500,
    elevation: 3,
  },
  barOuterWithSubtitle: {
    paddingBottom: 16, // eslint-disable-line backpack/use-tokens
  },
  bar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 56, // eslint-disable-line backpack/use-tokens
    alignItems: 'center',
  },
  barOnlyTrailingButton: {
    justifyContent: 'flex-end',
  },
  titleString: {
    position: 'absolute',
    start: 72, // eslint-disable-line backpack/use-tokens
    bottom: 15, // eslint-disable-line backpack/use-tokens
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
    padding: 8, // eslint-disable-line backpack/use-tokens
    color: colorWhite,
  },
  subtitleViewContainer: {
    paddingHorizontal: 8, // eslint-disable-line backpack/use-tokens
  },
});

type AndroidTheme = {
  ...$Exact<CommonTheme>,
  navigationBarStatusBarColor: string,
};

export type Props = {
  title: TitleProp,
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
    title: TITLE_PROPTYPE.isRequired,
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
    let disabledTintColor = colorBlue300;
    let touchableColor = colorWhite;

    let titleView = null;

    // This if ensures Flow correctly refines the type of
    // title in the body of the if to `'string' | TitleWithIcon
    if (
      typeof title === 'string' ||
      (title !== null && typeof title === 'object' && title.icon)
    ) {
      titleView = (
        <TitleView
          title={title}
          tintColor={tintColor}
          style={styles.titleString}
        />
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
      titleView = (
        <View style={styles.titleViewOuter}>
          {React.cloneElement(title, {
            style: [
              title.props.style ? title.props.style : null,
              { maxHeight: 32 }, // eslint-disable-line backpack/use-tokens
            ],
          })}
        </View>
      );
    }

    if (this.theme) {
      const {
        navigationBarTintColor,
        navigationBarDisabledTintColor,
        navigationBarBackgroundColor,
      } = this.theme;

      titleStyle.push({ color: navigationBarTintColor });
      outerBarStyle.push({
        backgroundColor: navigationBarBackgroundColor,
      });
      tintColor = navigationBarTintColor;
      disabledTintColor = navigationBarDisabledTintColor;
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
              disabledTintColor,
              touchableColor,
              tintColor,
            })}
          {titleView}
          {trailingButton &&
            React.cloneElement(trailingButton, {
              disabledTintColor,
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
