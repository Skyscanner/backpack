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

import {
  View,
  Platform,
  Animated,
  ViewPropTypes,
} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';

const tokens = Platform.select({
  ios: () => require('bpk-tokens/tokens/ios/base.react.native.common.js'), // eslint-disable-line global-require
  android: () => require('bpk-tokens/tokens/android/base.react.native.common.js'), // eslint-disable-line global-require
})();

const {
  animationDurationSm,
} = tokens;

class BpkAnimateHeight extends React.Component {
  constructor() {
    super();

    this.state = {
      expanded: null,
      expandedHeight: null,
      collapsedHeight: 0,
      height: new Animated.Value(1),
      heightSet: false,
    };

    this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
    this.setExpandedHeight = this.setExpandedHeight.bind(this);
    this.resize = this.resize.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.expanded !== this.state.expanded) {
      this.state.expanded = nextProps.expanded;
      this.resize();
    }
  }

  setExpandedHeight(event, expandedImmediately) {
    const { height } = event.nativeEvent.layout;
    this.setState({
      // if the component has started expanded, we should now set the height of the container
      // why on earth does a value of 1 instead of 0 make this break!
      height: new Animated.Value(expandedImmediately ? height : 0),
      heightSet: true,
      expandedHeight: height,
    });
  }

  resize() {
    // overflow: hidden is not properly supported on Android,
    // which causes animation to look shoddy.
    // See https://facebook.github.io/react-native/releases/0.49/docs/layout-props.html#overflow
    const animationDuration = Platform.OS === 'ios' ? this.props.animationDuration : 0;

    const finalValue = this.state.expanded ? this.state.expandedHeight : this.state.collapsedHeight;

    Animated.timing(
      this.state.height,
      {
        toValue: finalValue,
        duration: animationDuration,
      },
    ).start();
  }

  render() {
    const { expanded, style, ...rest } = this.props;

    const { height } = this.state;

    return (
      <Animated.View
        style={{
          ...style,
          overflow: 'hidden',
          height,
        }}
        {...rest}
      >
        <View
          onLayout={event => (this.state.heightSet ? undefined : this.setExpandedHeight(event, expanded))}
        >
          {this.props.children}
        </View>
      </Animated.View>
    );
  }
}

BpkAnimateHeight.propTypes = {
  animationDuration: PropTypes.number.isRequired,
  expanded: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  style: ViewPropTypes.style,
};

BpkAnimateHeight.defaultProps = {
  animationDuration: parseInt(animationDurationSm, 10),
  style: null,
};

export default BpkAnimateHeight;
