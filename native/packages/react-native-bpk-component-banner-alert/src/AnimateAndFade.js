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
} from 'react-native';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BpkAnimateHeight from 'react-native-bpk-component-animate-height';
import TransitionGroup, { FadeInOutTransition } from 'react-native-transitiongroup';

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
    };

    this.onToggle = this.onToggle.bind(this);
    this.hide = this.hide.bind(this);
    this.show = this.show.bind(this);
  }

  // Ok - I'll admit that this is a hack.
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
    if (nextProps.show !== this.props.show) {
      this.onToggle();
    }
  }

  onToggle() {
    if (this.state.visible) {
      this.hide();
    } else if (!this.state.visible) {
      this.show();
    }
  }

  show() {
    this.setState({
      visible: true,
    });
  }

  hide() {
    this.setState({
      visible: false,
    });
  }

  render() {
    const { children } = this.props;
    const showPlaceholder = !this.state.visible;

    const fadingComponent = (
      <TransitionGroup>
        <FadeInOutTransition
          inDuration={this.props.onEnter ? fadeDuration : 0}
          outDuration={this.props.onLeave ? fadeDuration : 0}
          inDelay={animateHeightDuration}
          style={{ flex: 0 }}
        >
          {this.state.visible &&
              children
           }
        </FadeInOutTransition>
      </TransitionGroup>
    );


    // While the expanding animation takes place, we render the child element
    // close to invisible. If we don't do this, the animate-height container
    // will take on height 0, and will never expand to allow the children to fade in
    const placeholder = (
      <View style={{ opacity: showPlaceholder ? 0.01 : 1 }}>
        {showPlaceholder &&
              children
            }
      </View>
    );

    return (
      <BpkAnimateHeight
        duration={animateHeightDuration}
        expanded={this.state.visible}
        collapseDelay={fadeDuration}
      >
        {placeholder}
        {fadingComponent}
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
  show: false,
  children: null,
};

export default AnimateAndFade;
