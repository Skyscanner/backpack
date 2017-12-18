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

import { View, Platform, Animated } from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import { animationDurationSm } from 'bpk-tokens/tokens/base.react.native';

const COLLAPSED_HEIGHT = 0.01;

class BpkAnimateHeight extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      expanded: this.props.expanded,
      height: new Animated.Value(COLLAPSED_HEIGHT),
      inTree: this.props.expanded,
      expandAnimationInProgress: false,
    };

    // overflow: hidden is not properly supported on Android,
    // which causes animation to look shoddy.
    // See https://facebook.github.io/react-native/releases/0.49/docs/layout-props.html#overflow
    this.animationDuration =
      Platform.OS === 'ios' ? props.animationDuration : 0;

    this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
    this.setExpandedHeight = this.setExpandedHeight.bind(this);
    this.onHeightAnimationComplete = this.onHeightAnimationComplete.bind(this);
    this.performAnimation = this.performAnimation.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.expanded !== this.state.expanded) {
      if (this.state.expanded) {
        this.setState({ expanded: false });
        this.performAnimation(COLLAPSED_HEIGHT, this.props.collapseDelay);
      } else {
        this.setState({ inTree: true, expandAnimationInProgress: true });
      }
    }
  }

  onHeightAnimationComplete() {
    if (typeof this.props.onAnimationComplete === 'function') {
      this.props.onAnimationComplete();
    }
    // eslint-disable-next-line no-underscore-dangle
    if (this.state.height._value - 0.01 < 0.00001) {
      this.setState({ inTree: false });
    }
  }

  setExpandedHeight(event) {
    const { height } = event.nativeEvent.layout;
    if (height === 0) {
      return;
    }
    if (!this.state.expandAnimationInProgress) {
      this.setState({
        height: new Animated.Value(
          this.state.expanded ? height : COLLAPSED_HEIGHT,
        ),
      });
    } else {
      this.setState({ expanded: true, expandAnimationInProgress: false });
      this.performAnimation(height, this.props.expandDelay);
    }
  }

  performAnimation(height, delay) {
    Animated.timing(this.state.height, {
      toValue: height,
      duration: this.animationDuration,
      delay,
    }).start(this.onHeightAnimationComplete);
  }

  render() {
    const {
      animationDuration,
      expanded,
      children,
      expandDelay,
      collapseDelay,
      onAnimationComplete,
      ...rest
    } = this.props;

    const { height } = this.state;

    return this.state.inTree ? (
      <View {...rest}>
        <Animated.View
          style={{
            overflow: 'hidden',
            height,
          }}
        >
          <View onLayout={event => this.setExpandedHeight(event)}>
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
  animationDuration: animationDurationSm,
  expandDelay: 0,
  collapseDelay: 0,
  onAnimationComplete: null,
};

export default BpkAnimateHeight;
