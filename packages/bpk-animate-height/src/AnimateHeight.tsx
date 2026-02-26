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

import type { CSSProperties, HTMLAttributes, ReactNode } from 'react';
import { Component } from 'react';

const isNumber = (n: number | 'auto'): n is number => typeof n === 'number';

const isTransitionEndSupported = () =>
  !!(typeof window !== 'undefined' && 'TransitionEvent' in window);

export type Props = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  duration: number;
  height: number | 'auto';
  easing?: string;
  transitionOverflow?: string;
  onAnimationComplete?: (() => void) | null;
};

type State = {
  height: number | 'auto';
  overflow: string;
};

class AnimateHeight extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    let height: number | 'auto' = 'auto';
    let overflow = 'visible';

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
    const {
      height: prevHeight,
      transitionOverflow: prevTransitionOverflow,
    } = prevProps;
    const { duration, height, transitionOverflow } = this.props;

    // Check if 'height' prop has changed
    if (this.contentElement && height !== prevHeight) {
      // Cache content height
      this.contentElement.style.display = '';
      const contentHeight = this.contentElement.offsetHeight;
      this.contentElement.style.overflow = '';

      let newHeight: number | 'auto' | null = null;
      let shouldSetTimeout = false;
      let timeoutHeight: number | 'auto' | null = null;
      let timeoutOverflow = prevTransitionOverflow ?? 'hidden';
      let timeoutDuration = duration;

      clearTimeout(this.timeoutID ?? undefined);

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
        height: newHeight,
        overflow: transitionOverflow ?? 'hidden',
      });

      if (shouldSetTimeout) {
        this.timeoutID = setTimeout(() => {
          this.setState({
            height: timeoutHeight ?? 0,
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
    clearTimeout(this.timeoutID ?? undefined);
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

  timeoutID: ReturnType<typeof setTimeout> | null = null;

  contentElement: HTMLDivElement | null = null;

  render() {
    const {
      children,
      duration,
      easing = 'ease',
      height: _height,
      onAnimationComplete: _onAnimationComplete,
      style,
      transitionOverflow: _transitionOverflow,
      ...rest
    } = this.props;

    const { height, overflow } = this.state;

    const componentStyle: CSSProperties & Record<string, string | number> = {
      ...style,
      height,
      overflow,
      WebkitTransition: `height ${duration}ms ${easing} `,
      MozTransition: `height ${duration}ms ${easing} `,
      OTransition: `height ${duration}ms ${easing} `,
      msTransition: `height ${duration}ms ${easing} `,
      transition: `height ${duration}ms ${easing} `,
    };

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

export default AnimateHeight;
