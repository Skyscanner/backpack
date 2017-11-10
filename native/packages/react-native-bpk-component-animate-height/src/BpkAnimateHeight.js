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

const collapsedHeight = 0.01;

class BpkAnimateHeight extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      expanded: false,
      height: new Animated.Value(0.01),
      inTree: false,
      expandAnimationInProgress: false,
    };

    // overflow: hidden is not properly supported on Android,
    // which causes animation to look shoddy.
    // See https://facebook.github.io/react-native/releases/0.49/docs/layout-props.html#overflow
    this.animationDuration = Platform.OS === 'ios' ? props.animationDuration : 0;

    this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
    this.setExpandedHeight = this.setExpandedHeight.bind(this);
    this.onHeightAnimationComplete = this.onHeightAnimationComplete.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.expanded !== this.state.expanded) {
      if (this.state.expanded) {
        this.setState({ expanded: false });
        Animated.timing(this.state.height, {
          toValue: collapsedHeight,
          duration: this.animationDuration,
          delay: this.props.collapseDelay,
        }).start(this.onHeightAnimationComplete);
      } else {
        this.setState({ inTree: true, expandAnimationInProgress: true });
      }
    }
  }

  onHeightAnimationComplete() {
    if (typeof this.props.onAnimationComplete === 'function') {
      this.props.onAnimationComplete();
    }
    if (this.state.height._value - 0.01 < 0.00001) { // eslint-disable-line no-underscore-dangle
      this.setState({ inTree: false });
    }
  }

  setExpandedHeight(event) {
    const { height } = event.nativeEvent.layout;
    if (height !== 0) {
      if (!this.state.expandAnimationInProgress) {
        this.setState({
          height: this.state.expanded ? new Animated.Value(height) : new Animated.Value(collapsedHeight),
        });
      } else {
        this.setState({ expanded: true, expandAnimationInProgress: false });
        Animated.timing(this.state.height, {
          toValue: height,
          duration: this.animationDuration,
          delay: this.props.expandDelay,
        }).start(this.onHeightAnimationComplete);
      }
    }
  }

  render() {
    const {
      animationDuration, expanded, children, expandDelay, collapseDelay, onAnimationComplete, ...rest
    } = this.props;

    const { height } = this.state;

    return this.state.inTree ?
      (
        <View
          {...rest}
        >
          <Animated.View
            style={{
          overflow: 'hidden',
          height,
        }}
          >
            <View
              onLayout={event => (this.setExpandedHeight(event))}
            >
              {this.props.children}
            </View>
          </Animated.View>
        </View>
      ) : null;
  }
}

BpkAnimateHeight.propTypes = {
  animationDuration: PropTypes.number,
  expanded: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  expandDelay: PropTypes.number,
  collapseDelay: PropTypes.number,
  onAnimationComplete: PropTypes.func,
};

BpkAnimateHeight.defaultProps = {
  animationDuration: parseInt(animationDurationSm, 10),
  expandDelay: 0,
  collapseDelay: 0,
  onAnimationComplete: null,
};

export default BpkAnimateHeight;
