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

import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { View, Animated, ViewPropTypes } from 'react-native';
import { animationDurationSm } from 'bpk-tokens/tokens/base.react.native';

const COLLAPSED_HEIGHT = 0.01;

class AnimateAndFade extends Component {
  constructor(props) {
    super(props);

    const isCollapsed = this.props.animateOnEnter || !this.props.show;

    this.shouldRenderHeight = true;
    this.innerViewRef = null;

    this.height = isCollapsed ? new Animated.Value(COLLAPSED_HEIGHT) : null;
    this.opacity = new Animated.Value(isCollapsed ? 0 : 1);
  }

  componentDidMount() {
    const captureHeightAndAnimate = (x, y, width, height) => {
      if (!this.height) {
        this.height = new Animated.Value(height);
      }

      this.animate(x, y, width, height);
    };

    this.measure(captureHeightAndAnimate);
  }

  componentWillReceiveProps(nextProps) {
    this.shouldRenderHeight = true;

    if (nextProps.show === this.props.show && this.props.show) {
      this.shouldRenderHeight = false;
    }
  }

  componentDidUpdate() {
    this.measure(this.animate);
  }

  measure = callback =>
    requestAnimationFrame(() => this.innerViewRef.measure(callback));

  animate = (x, y, width, height) => {
    const { show, animateOnEnter, animateOnLeave } = this.props;

    const animatingOnEnter = show && animateOnEnter;
    const animatingOnLeave = !show && animateOnLeave;
    const duration =
      animatingOnEnter || animatingOnLeave ? animationDurationSm : 0;

    const heightAnimation = Animated.timing(this.height, {
      toValue: show ? height : COLLAPSED_HEIGHT,
      duration,
    });

    const opacityAnimation = Animated.timing(this.opacity, {
      toValue: show ? 1 : 0,
      duration,
    });

    Animated.sequence(
      show
        ? [heightAnimation, opacityAnimation]
        : [opacityAnimation, heightAnimation],
    ).start();
  };

  render() {
    const {
      children,
      show,
      animateOnEnter,
      animateOnLeave,
      style: userStyle,
      innerStyle,
      ...rest
    } = this.props;

    const style = [{ opacity: this.opacity }];

    if (this.shouldRenderHeight) {
      style.push({
        height: this.height,
      });
    }

    if (userStyle) {
      style.push(userStyle);
    }

    return (
      <Animated.View {...rest} style={style}>
        <View
          ref={ref => {
            this.innerViewRef = ref;
          }}
          style={innerStyle}
          // `measure` api doesn;t work on Android unless `collapsable={false}`.
          // See https://github.com/facebook/react-native/issues/3282.
          collapsable={false}
        >
          {children}
        </View>
      </Animated.View>
    );
  }
}

AnimateAndFade.propTypes = {
  children: PropTypes.node.isRequired,
  show: PropTypes.bool.isRequired,
  animateOnEnter: PropTypes.bool,
  animateOnLeave: PropTypes.bool,
  style: ViewPropTypes.style,
  innerStyle: ViewPropTypes.style,
};

AnimateAndFade.defaultProps = {
  animateOnEnter: false,
  animateOnLeave: false,
  style: null,
  innerStyle: null,
};

export default AnimateAndFade;
