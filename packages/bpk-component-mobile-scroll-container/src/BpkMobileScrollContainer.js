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

import STYLES from './bpk-mobile-scroll-container.css';

const getClassName = cssModules(STYLES);

const computeScrollBarAwareHeight = (
  scrollerEl: ?HTMLElement,
  innerEl: ?HTMLElement,
): ?string => {
  if (!(scrollerEl && innerEl)) {
    return null;
  }

  const scrollBarVisibile = scrollerEl.offsetHeight - innerEl.offsetHeight > 0;
  return scrollBarVisibile ? `${innerEl.offsetHeight / 16}rem` : 'auto';
};

const computeScrollIndicatorClassName = (
  scrollerEl: ?HTMLElement,
  leadingIndicatorClassName: ?string = null,
  trailingIndicatorClassName: ?string = null,
) => {
  if (!scrollerEl) {
    return null;
  }

  const classNames = [];
  const { scrollLeft, scrollWidth, offsetWidth } = scrollerEl;

  if (scrollLeft > 0) {
    classNames.push(
      getClassName('bpk-mobile-scroll-container--left-indicator'),
    );
    if (leadingIndicatorClassName) {
      classNames.push(leadingIndicatorClassName);
    }
  }
  if (scrollLeft < scrollWidth - offsetWidth) {
    classNames.push(
      getClassName('bpk-mobile-scroll-container--right-indicator'),
    );
    if (trailingIndicatorClassName) {
      classNames.push(trailingIndicatorClassName);
    }
  }

  return classNames;
};

type Props = {
  children: Node,
  innerContainerTagName: string,
  className: ?string,
  leadingIndicatorClassName: ?string,
  trailingIndicatorClassName: ?string,
  style: ?Object,
};

type State = {
  computedHeight: ?string,
  scrollIndicatorClassName: ?string,
};

class BpkMobileScrollContainer extends Component<Props, State> {
  innerEl: ?HTMLElement;

  scrollerEl: ?HTMLElement;

  static propTypes = {
    children: PropTypes.node.isRequired,
    innerContainerTagName: PropTypes.string,
    className: PropTypes.string,
    leadingIndicatorClassName: PropTypes.string,
    trailingIndicatorClassName: PropTypes.string,
    style: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  };

  static defaultProps = {
    innerContainerTagName: 'div',
    className: null,
    leadingIndicatorClassName: null,
    trailingIndicatorClassName: null,
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
    window.addEventListener('resize', this.onWindowResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onWindowResize);
  }

  onWindowResize = debounce(() => {
    this.setScrollBarAwareHeight();
    this.setScrollIndicatorClassName();
  }, 100);

  setScrollIndicatorClassName = () => {
    const classNames = computeScrollIndicatorClassName(
      this.scrollerEl,
      this.props.leadingIndicatorClassName,
      this.props.trailingIndicatorClassName,
    );

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
      leadingIndicatorClassName,
      trailingIndicatorClassName,
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
