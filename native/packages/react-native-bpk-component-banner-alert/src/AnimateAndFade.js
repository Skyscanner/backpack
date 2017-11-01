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
} from 'react-native';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BpkAnimateHeight from 'react-native-bpk-component-animate-height';
// import TransitionGroup, { FadeInOutTransition } from 'react-native-transitiongroup';
// import FadeTransition from './FadeTransition';


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
      visible: !this.props.onEnter,
      progress: new Animated.Value(0.01),
    };

    // this.onToggle = this.onToggle.bind(this);
    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  // It may look like a motorcycle, but it's a choppa, baby. It's Zed's. Zed's dead, baby. Zed's dead.
  // see https://stanko.github.io/react-rerender-in-component-did-mount/
  componentDidMount() {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        this.show();
      });
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.show !== this.state.visible) {
      this.toggle();
    }
  }

  toggle() {
    if (this.state.visible) {
      this.hide();
    } else {
      this.show();
    }
  }

  hide() {
    Animated.timing(
      this.state.progress,
      {
        toValue: 0,
        duration: this.props.onLeave ? fadeDuration : 0,
      },
    ).start();
    this.setState({
      visible: false,
    });
  }

  show() {
    Animated.timing(
      this.state.progress,
      {
        toValue: 1,
        duration: this.props.onEnter ? fadeDuration : 0,
        delay: animateHeightDuration,
      },
    ).start();
    this.setState({
      visible: true,
    });
  }

  render() {
    return (
      <BpkAnimateHeight
        duration={animateHeightDuration}
        expanded={this.state.visible}
        collapseDelay={fadeDuration}
      >
        <Animated.View style={{ opacity: this.state.progress }}>
          {this.props.children}
        </Animated.View>
      </BpkAnimateHeight>
    );
    /* eslint-enable */
  }
}

AnimateAndFade.propTypes = {
  onEnter: PropTypes.bool.isRequired,
  onLeave: PropTypes.bool.isRequired,
  children: PropTypes.node,
  show: PropTypes.bool,
};

AnimateAndFade.defaultProps = {
  show: true,
  children: null,
};

export default AnimateAndFade;
