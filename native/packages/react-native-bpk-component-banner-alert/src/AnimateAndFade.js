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
  Platform,
  Animated,
  ViewPropTypes,
} from 'react-native';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BpkAnimateHeight from 'react-native-bpk-component-animate-height';

const tokens = Platform.select({
  ios: () => require('bpk-tokens/tokens/ios/base.react.native.common.js'), // eslint-disable-line global-require
  android: () => require('bpk-tokens/tokens/android/base.react.native.common.js'), // eslint-disable-line global-require
})();

const {
  animationDurationSm,
} = tokens;

const fadeDuration = parseInt(animationDurationSm, 10);
const animateHeightDuration = parseInt(animationDurationSm, 10);

class AnimateAndFade extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: !this.props.animateOnEnter,
      opacity: new Animated.Value(0.01),
    };

    this.animate = this.animate.bind(this);
  }

  // It may look like a hack, but it's a feature, baby. It's Zed's. Zed's dead, baby. Zed's dead.
  // see https://stanko.github.io/react-rerender-in-component-did-mount/
  componentDidMount() {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        this.animate(true);
      });
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.show !== this.state.visible) {
      this.animate(!this.state.visible);
    }
  }

  animate(show) {
    Animated.timing(this.state.opacity, {
      toValue: show ? 1 : 0,
      duration: ((show && this.props.animateOnEnter) || (!show && this.props.animateOnLeave)) ? fadeDuration : 0,
      delay: show ? animateHeightDuration : 0,
    }).start();
    this.setState({ visible: show });
  }

  render() {
    const { children, ...rest } = this.props;

    return (
      <BpkAnimateHeight
        duration={animateHeightDuration}
        expanded={this.state.visible}
        collapseDelay={fadeDuration}
        onAnimationComplete={this.onHeightAnimationComplete}
        {...rest}
      >
        <Animated.View style={{ opacity: this.state.opacity }}>
          {this.props.children}
        </Animated.View>
      </BpkAnimateHeight>
    );
  }
}

AnimateAndFade.propTypes = {
  animateOnEnter: PropTypes.bool.isRequired,
  animateOnLeave: PropTypes.bool.isRequired,
  children: PropTypes.node,
  show: PropTypes.bool,
  style: ViewPropTypes.style,
};

AnimateAndFade.defaultProps = {
  show: true,
  children: null,
  style: null,
};

export default AnimateAndFade;
