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

/* @flow */

import PropTypes from 'prop-types';
import debounce from 'lodash.debounce';
import React, { Component, type Node } from 'react';
import { cssModules } from 'bpk-react-utils';

import STYLES from './bpk-mobile-scroll-container.scss';

const getClassName = cssModules(STYLES);

const computeScrollBarAwareHeight = (
  scrollerEl: HTMLElement,
  innerEl: ?HTMLElement,
): ?string => {
  if (!(scrollerEl && innerEl)) {
    return null;
  }

  const scrollBarVisibile = scrollerEl.offsetHeight - innerEl.offsetHeight > 0;
  return scrollBarVisibile ? `${innerEl.offsetHeight / 16}rem` : 'auto';
};

const computeScrollIndicatorClassName = (scrollerEl: ?HTMLElement) => {
  if (!scrollerEl) {
    return null;
  }

  const classNames = [];
  const { scrollLeft, scrollWidth, offsetWidth } = scrollerEl;

  if (scrollLeft > 0) {
    classNames.push(
      getClassName('bpk-mobile-scroll-container--left-indicator'),
    );
  }
  if (scrollLeft < scrollWidth - offsetWidth) {
    classNames.push(
      getClassName('bpk-mobile-scroll-container--right-indicator'),
    );
  }

  return classNames;
};

type Props = {
  children: Node,
  innerContainerTagName: string,
  className: ?string,
  style: ?Object | Array<Object>,
};

type State = {
  computedHeight: ?string,
  scrollIndicatorClassName: ?string,
};

class BpkMobileScrollContainer extends Component<Props, State> {
  curDown: ?boolean;
  curXPos: ?Number;
  innerEl: ?HTMLElement;
  scrollerEl: HTMLElement;

  static propTypes = {
    children: PropTypes.node.isRequired,
    innerContainerTagName: PropTypes.string,
    className: PropTypes.string,
    style: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  };

  static defaultProps = {
    innerContainerTagName: 'div',
    className: null,
    style: null,
  };

  constructor() {
    super();

    this.state = {
      computedHeight: 'auto',
      scrollIndicatorClassName: null,
    };
  }

  componentDidMount() {
    this.setScrollBarAwareHeight();
    this.setScrollIndicatorClassName();
    this.scrollerEl.addEventListener('resize', this.onWindowResize);
    this.scrollerEl.addEventListener('mousemove', this.onMouseMove);
    this.scrollerEl.addEventListener('mousedown', this.onMouseDown);
    this.scrollerEl.addEventListener('mouseup', this.onMouseUp);
  }

  componentWillUnmount() {
    this.scrollerEl.removeEventListener('resize', this.onWindowResize);
    this.scrollerEl.removeEventListener('mousemove', this.onMouseMove);
    this.scrollerEl.removeEventListener('mousedown', this.onMouseDown);
    this.scrollerEl.removeEventListener('mouseup', this.onMouseUp);
  }

  onMouseMove = (e: Object) => {
    if (this.curDown) {
      this.scrollerEl.scrollLeft =
        this.scrollerEl.scrollLeft + (+this.curXPos - e.offsetX);
    }
  };

  onMouseUp = () => {
    this.curDown = false;
    this.scrollerEl.style.cursor = '';
  };

  onMouseDown = (e: Object) => {
    this.curXPos = e.offsetX;
    this.curDown = true;
    this.scrollerEl.style.cursor = '-webkit-grabbing';
  };

  onWindowResize = debounce(() => {
    this.setScrollBarAwareHeight();
    this.setScrollIndicatorClassName();
  }, 100);

  setScrollIndicatorClassName = () => {
    const classNames = computeScrollIndicatorClassName(this.scrollerEl);

    if (!classNames) {
      return;
    }

    this.setState(() => ({
      scrollIndicatorClassName: classNames.join(' '),
    }));
  };

  setScrollBarAwareHeight = () => {
    const computedHeight = computeScrollBarAwareHeight(
      this.scrollerEl,
      this.innerEl,
    );

    if (!computedHeight) {
      return;
    }

    this.setState(() => ({ computedHeight }));
  };

  render() {
    const classNames = [getClassName('bpk-mobile-scroll-container')];
    const {
      children,
      innerContainerTagName,
      className,
      style,
      ...rest
    } = this.props;

    if (className) {
      classNames.push(className);
    }
    if (this.state.scrollIndicatorClassName) {
      classNames.push(this.state.scrollIndicatorClassName);
    }

    const InnerContainer = innerContainerTagName;

    return (
      <div
        {...rest}
        className={classNames.join(' ')}
        style={{ ...style, height: this.state.computedHeight }}
      >
        <div
          ref={el => {
            this.scrollerEl = el;
          }}
          onScroll={this.setScrollIndicatorClassName}
          className={getClassName('bpk-mobile-scroll-container__scroller')}
        >
          <InnerContainer
            ref={el => {
              this.innerEl = el;
            }}
            className={getClassName('bpk-mobile-scroll-container__inner')}
          >
            {children}
          </InnerContainer>
        </div>
      </div>
    );
  }
}

export default BpkMobileScrollContainer;
export { computeScrollBarAwareHeight, computeScrollIndicatorClassName };
