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
import { requireNativeComponent, StyleSheet, View } from 'react-native';
import {
  colorGray700,
  colorBlue500,
} from 'bpk-tokens/tokens/base.react.native';

export type Props = {
  title: string,
  titleColor: string,
  tintColor: string,
  prefersLargeTitles: boolean,
  extendBehindStatusBar: boolean,
  style: ?Object,
  leftButtonText: ?string,
  rightButtonText: ?string,
  onLeftButtonTap: ?() => void,
  onRightButtonTap: ?() => void,
};

const propTypes = {
  title: PropTypes.string.isRequired,
  titleColor: PropTypes.string.isRequired,
  tintColor: PropTypes.string.isRequired,
  prefersLargeTitles: PropTypes.bool,
  extendBehindStatusBar: PropTypes.bool,
  style: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  leftButtonText: PropTypes.string,
  rightButtonText: PropTypes.string,
  onLeftButtonTap: PropTypes.func,
  onRightButtonTap: PropTypes.func,
};

const defaultProps = {
  titleColor: colorGray700,
  tintColor: colorBlue500,
  prefersLargeTitles: false,
  extendBehindStatusBar: true,
  style: null,
  leftButtonText: null,
  rightButtonText: null,
  onLeftButtonTap: null,
  onRightButtonTap: null,
};

const NAVIGATION_BAR_HEIGHT = 44;
const STATUS_BAR_HEIGHT = 20;
const LARGE_TITLE_NAVIGATION_BAR_HEIGHT = 96;

const styles = StyleSheet.create({
  bar: {
    height: NAVIGATION_BAR_HEIGHT,
  },
  extended: {
    paddingTop: STATUS_BAR_HEIGHT,
    backgroundColor: 'rgb(249, 249, 249)',
  },
  largeTitleBar: {
    height: LARGE_TITLE_NAVIGATION_BAR_HEIGHT,
  },
});

class BpkNavigationBariOSInternal extends Component<Props, any> {
  static propTypes = propTypes;
  static defaultProps = defaultProps;

  onLeftButtonTap = () => {
    if (this.props.onLeftButtonTap) {
      this.props.onLeftButtonTap();
    }
  };

  onRightButtonTap = () => {
    if (this.props.onRightButtonTap) {
      this.props.onRightButtonTap();
    }
  };

  render() {
    const {
      onLeftButtonTap,
      onRightButtonTap,
      style,
      extendBehindStatusBar,
      ...rest
    } = this.props;
    const outerStyles = [style];
    let barStyle = styles.bar;

    if (rest.prefersLargeTitles) {
      barStyle = styles.largeTitleBar;
    }

    if (extendBehindStatusBar) {
      outerStyles.push(styles.expanded);
    }

    return (
      <View style={outerStyles}>
        <BPKNavigationBar
          style={barStyle}
          onLeftButtonTap={this.onLeftButtonTap}
          onRightButtonTap={this.onRightButtonTap}
          {...rest}
        />
      </View>
    );
  }
}
const BPKNavigationBar = requireNativeComponent(
  'BPKNavigationBar',
  BpkNavigationBariOSInternal,
);

export default BpkNavigationBariOSInternal;
export { propTypes, defaultProps };
