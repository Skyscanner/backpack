/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016 Skyscanner Ltd
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

// IE11 doesn't support `Number.isNaN` so we must use the global.
// When IE11 support drops we can migrate.
// eslint-disable-next-line no-restricted-globals
const isNumber = (n) => !isNaN(parseFloat(n)) && isFinite(n);

const isTransitionEndSupported = () =>
  !!(typeof window !== 'undefined' && 'TransitionEvent' in window);

class AnimateHeight extends Component {
  constructor(props) {
    super(props);

    let height = 'auto';
    let overflow = 'visible';

    if (isNumber(this.props.height)) {
      height = this.props.height < 0 ? 0 : this.props.height;
      overflow = this.props.transitionOverflow;
    }

    this.state = {
      height,
      overflow,
    };
  }

  componentDidMount() {
    if (this.contentElement && this.props.height === 0) {
      this.contentElement.style.display = 'none';
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { height } = this.props;

    // Check if 'height' prop has changed
    if (this.contentElement && nextProps.height !== height) {
      // Cache content height
      this.contentElement.style.display = '';
      this.contentElement.style.overflow = this.props.transitionOverflow;
      const contentHeight = this.contentElement.offsetHeight;
      this.contentElement.style.overflow = '';

      let newHeight = null;
      let shouldSetTimeout = false;
      let timeoutHeight = null;
      let timeoutOverflow = this.props.transitionOverflow;
      let timeoutDuration = nextProps.duration;

      clearTimeout(this.timeoutID);

      if (isNumber(nextProps.height)) {
        // If new height is a number
        newHeight = nextProps.height < 0 ? 0 : nextProps.height;
      } else {
        // If not, animate to content height
        // and then reset to auto
        newHeight = contentHeight;
        shouldSetTimeout = true;
        timeoutHeight = 'auto';
        timeoutOverflow = 'visible';
      }

      if (this.state.height === 'auto') {
        // If previous height was 'auto'
        // set it explicitly to be able to use transition
        shouldSetTimeout = true;
        timeoutHeight = newHeight;

        newHeight = contentHeight;
        timeoutDuration = 50;
      }

      this.setState((state, props) => ({
        height: newHeight,
        overflow: props.transitionOverflow,
      }));

      if (shouldSetTimeout) {
        this.timeoutID = setTimeout(() => {
          this.setState({
            height: timeoutHeight,
            overflow: timeoutOverflow,
          });

          if (!isTransitionEndSupported()) {
            this.onTransitionEnd();
          }
        }, timeoutDuration);
      }
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timeoutID);
    this.timeoutID = null;
  }

  onTransitionEnd = () => {
    if (this.contentElement && this.props.height === 0) {
      this.contentElement.style.display = 'none';
    }
    if (this.props.onAnimationComplete) {
      this.props.onAnimationComplete();
    }
  };

  render() {
    const { children, duration, easing, onAnimationComplete, style, ...rest } =
      this.props;

    const { height, overflow } = this.state;

    const componentStyle = {
      ...style,
      height,
      overflow,
      WebkitTransition: `height ${duration}ms ${easing} `,
      MozTransition: `height ${duration}ms ${easing} `,
      OTransition: `height ${duration}ms ${easing} `,
      msTransition: `height ${duration}ms ${easing} `,
      transition: `height ${duration}ms ${easing} `,
    };

    delete rest.height;
    delete rest.transitionOverflow;

    return (
      <div
        style={componentStyle}
        onTransitionEnd={this.onTransitionEnd}
        {...rest}
      >
        <div
          ref={(el) => {
            this.contentElement = el;
          }}
        >
          {children}
        </div>
      </div>
    );
  }
}

AnimateHeight.propTypes = {
  children: PropTypes.node.isRequired,
  duration: PropTypes.number.isRequired,
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  easing: PropTypes.string,
  transitionOverflow: PropTypes.string,
  onAnimationComplete: PropTypes.func,
  style: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

AnimateHeight.defaultProps = {
  easing: 'ease',
  transitionOverflow: 'hidden',
  onAnimationComplete: null,
  style: {},
};

export default AnimateHeight;
