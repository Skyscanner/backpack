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
import type { ReactNode, CSSProperties } from 'react';
import { Component } from 'react';

export type Props = {
  children: ReactNode;
  duration: number;
  height: string | number;
  easing?: string;
  transitionOverflow?: string;
  onAnimationComplete?: (() => void) | null;
  style?: CSSProperties;
};

type State = {
  height: string | number;
  overflow: string;
};

// IE11 doesn't support `Number.isNaN` so we must use the global.
// When IE11 support drops we can migrate.
// eslint-disable-next-line no-restricted-globals
const isNumber = (n: unknown): n is number => !isNaN(parseFloat(n as string)) && isFinite(n as number);

const isTransitionEndSupported = () =>
  !!(typeof window !== 'undefined' && 'TransitionEvent' in window);

class AnimateHeight extends Component<Props, State> {
  static defaultProps = {
    easing: 'ease',
    transitionOverflow: 'hidden',
    onAnimationComplete: null,
    style: {},
  };

  // eslint-disable-next-line react/sort-comp
  contentElement: HTMLDivElement | null = null;

  timeoutID: ReturnType<typeof setTimeout> | null = null;

  constructor(props: Props) {
    super(props);

    let height: string | number = 'auto';
    let overflow: string = 'visible';

    if (isNumber(this.props.height)) {
      height = this.props.height < 0 ? 0 : this.props.height;
      overflow = this.props.transitionOverflow ?? 'hidden';
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

  componentDidUpdate(prevProps: Props, prevState: State) {
    const { height: prevHeight, transitionOverflow: prevTransitionOverflow } = prevProps;
    const { duration, height, transitionOverflow } = this.props;

    // Check if 'height' prop has changed
    if (this.contentElement && height !== prevHeight) {
      // Cache content height
      this.contentElement.style.display = '';
      const contentHeight = this.contentElement.offsetHeight;
      this.contentElement.style.overflow = '';

      let newHeight: string | number | null = null;
      let shouldSetTimeout = false;
      let timeoutHeight: string | number | null = null;
      let timeoutOverflow: string = prevTransitionOverflow ?? 'hidden';
      let timeoutDuration = duration;

      if (this.timeoutID) {
        clearTimeout(this.timeoutID);
      }

      if (isNumber(height)) {
        // If new height is a number
        newHeight = height < 0 ? 0 : height;
      } else {
        // If not, animate to content height and then reset to auto
        newHeight = contentHeight;
        shouldSetTimeout = true;
        timeoutHeight = 'auto';
        timeoutOverflow = 'visible';
      }

      // If previous height was 'auto'
      // set it explicitly to be able to use transition
      if (prevState.height === 'auto') {
        shouldSetTimeout = true;
        timeoutHeight = newHeight;
        newHeight = contentHeight;
        timeoutDuration = 50;
      }

      this.setState({
        height: newHeight!,
        overflow: transitionOverflow ?? 'hidden',
      });

      if (shouldSetTimeout) {
        this.timeoutID = setTimeout(() => {
          this.setState({
            height: timeoutHeight!,
            overflow: timeoutOverflow!,
          });

          if (!isTransitionEndSupported()) {
            this.onTransitionEnd();
          }
        }, timeoutDuration);
      }
    }
}

  componentWillUnmount() {
    if (this.timeoutID) {
      clearTimeout(this.timeoutID);
    }
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

     
    const restProps = rest as any;
    delete restProps.height;
    delete restProps.transitionOverflow;

    return (
      <div
        style={componentStyle}
        onTransitionEnd={this.onTransitionEnd}
        {...restProps}
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

// @ts-expect-error - propTypes are kept for backwards compatibility
AnimateHeight.propTypes = {
  children: PropTypes.node.isRequired,
  duration: PropTypes.number.isRequired,
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  easing: PropTypes.string,
  transitionOverflow: PropTypes.string,
  onAnimationComplete: PropTypes.func,
  style: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

export default AnimateHeight;
