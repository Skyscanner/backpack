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

import React from 'react';
import PropTypes from 'prop-types';
import { View, Platform, Animated, ViewPropTypes } from 'react-native';
import { animationDurationSm } from 'bpk-tokens/tokens/base.react.native';

const COLLAPSED_HEIGHT = 0.01;

class BpkAnimateHeight extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      height: new Animated.Value(COLLAPSED_HEIGHT),
    };

    this.inTree = this.props.expanded;
    this.expandAnimationInProgress = false;

    // overflow: hidden is not properly supported on Android,
    // which causes animation to look shoddy.
    // See https://facebook.github.io/react-native/releases/0.49/docs/layout-props.html#overflow
    this.animationDuration =
      Platform.OS === 'ios' ? props.animationDuration : 0;
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.expanded === this.props.expanded) {
      return;
    }

    if (nextProps.expanded) {
      this.inTree = true;
      this.expandAnimationInProgress = true;
    } else {
      this.animate(COLLAPSED_HEIGHT, this.props.collapseDelay);
    }
  }

  onHeightAnimationComplete = () => {
    if (typeof this.props.onAnimationComplete === 'function') {
      this.props.onAnimationComplete();
    }

    // eslint-disable-next-line no-underscore-dangle
    if (this.state.height._value - 0.01 < 0.00001) {
      this.inTree = false;
      this.forceUpdate();
    }
  };

  setExpandedHeight = event => {
    const { height } = event.nativeEvent.layout;

    if (height === 0) {
      return;
    }

    if (this.expandAnimationInProgress) {
      this.expandAnimationInProgress = false;
      this.animate(height, this.props.expandDelay);
    } else {
      this.setState({
        height: new Animated.Value(
          this.props.expanded ? height : COLLAPSED_HEIGHT,
        ),
      });
    }
  };

  animate = (height, delay) => {
    Animated.timing(this.state.height, {
      toValue: height,
      duration: this.animationDuration,
      delay,
    }).start(this.onHeightAnimationComplete);
  };

  render() {
    const {
      children,
      expanded, // not used in render
      animationDuration,
      expandDelay,
      collapseDelay,
      onAnimationComplete,
      style,
      ...rest
    } = this.props;

    const { height } = this.state;

    return this.inTree ? (
      <Animated.View
        {...rest}
        style={{
          ...style,
          overflow: 'hidden',
          height,
        }}
      >
        <View onLayout={event => this.setExpandedHeight(event)}>
          {this.props.children}
        </View>
      </Animated.View>
    ) : null;
  }
}

BpkAnimateHeight.propTypes = {
  children: PropTypes.node.isRequired,
  expanded: PropTypes.bool.isRequired,
  animationDuration: PropTypes.number,
  expandDelay: PropTypes.number,
  collapseDelay: PropTypes.number,
  onAnimationComplete: PropTypes.func,
  style: ViewPropTypes.style,
};

BpkAnimateHeight.defaultProps = {
  animationDuration: animationDurationSm,
  expandDelay: 0,
  collapseDelay: 0,
  onAnimationComplete: null,
  style: null,
};

export default BpkAnimateHeight;
