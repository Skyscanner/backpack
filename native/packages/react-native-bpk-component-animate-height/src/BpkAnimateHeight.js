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
import { View, Animated, ViewPropTypes, StyleSheet } from 'react-native';
import { animationDurationSm } from 'bpk-tokens/tokens/base.react.native';

const COLLAPSED_HEIGHT = 0.01;

const callOnce = fn => {
  let called = false;
  const internalCallOnce = (...args) => {
    if (!called) {
      called = true;
      fn(...args);
    }
  };
  internalCallOnce.reset = () => {
    called = false;
  };
  return internalCallOnce;
};

const STYLES = StyleSheet.create({
  view: {
    overflow: 'hidden',
    borderRadius: 0, // overflow hidden hack for Android
  },
  measure: {
    position: 'absolute',
    opacity: 0,
    left: 0,
  },
});

class BpkAnimateHeight extends React.Component {
  constructor(props) {
    super(props);

    this.innerViewRef = null;
    this.state = { computedHeight: null };
    this.height = this.props.expanded
      ? null
      : new Animated.Value(COLLAPSED_HEIGHT);

    this.adjustChildHeight = callOnce((height, onDone) =>
      this.setState({ computedHeight: height }, onDone),
    );
  }

  componentDidMount() {
    if (this.height) {
      return;
    }

    const captureHeight = (x, y, width, height) => {
      this.height = new Animated.Value(height);
    };

    this.measure(captureHeight);
  }

  componentDidUpdate() {
    this.measure(this.animate);
  }

  measure = callback =>
    requestAnimationFrame(() => this.innerViewRef.measure(callback));

  animate = (x, y, width, height) => {
    const {
      expanded,
      expandDelay,
      collapseDelay,
      animationDuration: duration,
      onAnimationComplete,
    } = this.props;

    const toValue = expanded ? height : COLLAPSED_HEIGHT;
    const delay = expanded ? expandDelay : collapseDelay;

    this.adjustChildHeight(height, () => {
      Animated.timing(this.height, { toValue, duration, delay }).start(() => {
        this.adjustChildHeight.reset();
        if (onAnimationComplete) {
          onAnimationComplete();
        }
      });
    });
  };

  render() {
    const {
      children,
      expanded,
      animationDuration,
      expandDelay,
      collapseDelay,
      onAnimationComplete,
      style: userStyle,
      innerStyle,
      ...rest
    } = this.props;

    const style = [STYLES.view, { height: this.height }];

    if (userStyle) {
      style.push(userStyle);
    }

    return (
      <Animated.View {...rest} style={style}>
        {/* This extra view is here only to measure the "natural" height in order to do the correct annimation.
        Since the upgrade to react-native 0.55.3 the inner view does not render outside its parent height on IOS, 
        unless position is absolute. To avoid changing the children's style we use this hidden view with position 
        absolute for measurment and render the children again bellow with its normal style */}
        <View
          ref={ref => {
            this.innerViewRef = ref;
          }}
          style={[innerStyle, STYLES.measure]}
          // `measure` api doesn;t work on Android unless `collapsable={false}`.
          // See https://github.com/facebook/react-native/issues/3282.
          collapsable={false}
        >
          {children}
        </View>
        <View style={[innerStyle, { height: this.state.computedHeight }]}>
          {children}
        </View>
      </Animated.View>
    );
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
  innerStyle: ViewPropTypes.style,
};

BpkAnimateHeight.defaultProps = {
  animationDuration: animationDurationSm,
  expandDelay: 0,
  collapseDelay: 0,
  onAnimationComplete: null,
  style: null,
  innerStyle: null,
};

export default BpkAnimateHeight;
