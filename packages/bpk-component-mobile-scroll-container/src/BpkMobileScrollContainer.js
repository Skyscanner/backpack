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

/* @flow strict */

import PropTypes from 'prop-types';
import debounce from 'lodash.debounce';
import React, { Component, type Node } from 'react';

import { cssModules, isRTL } from '../../bpk-react-utils';

import STYLES from './BpkMobileScrollContainer.module.scss';

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
  const { offsetWidth, scrollLeft, scrollWidth } = scrollerEl;

  const rtl = isRTL();
  const scrollValue = rtl ? -Math.floor(scrollLeft) : Math.ceil(scrollLeft);
  const showLeadingIndicator = scrollValue > 0;
  const showTrailingIndicator = scrollValue < scrollWidth - offsetWidth;
  const showLeftIndicator = rtl ? showTrailingIndicator : showLeadingIndicator;
  const showRightIndicator = rtl ? showLeadingIndicator : showTrailingIndicator;

  if (showLeftIndicator) {
    classNames.push(
      getClassName('bpk-mobile-scroll-container--left-indicator'),
    );
  }
  if (showRightIndicator) {
    classNames.push(
      getClassName('bpk-mobile-scroll-container--right-indicator'),
    );
  }
  if (showLeadingIndicator && leadingIndicatorClassName) {
    classNames.push(leadingIndicatorClassName);
  }
  if (showTrailingIndicator && trailingIndicatorClassName) {
    classNames.push(trailingIndicatorClassName);
  }

  return classNames;
};

type Props = {
  children: Node,
  innerContainerTagName: string,
  className: ?string,
  leadingIndicatorClassName: ?string,
  trailingIndicatorClassName: ?string,
  scrollerRef: ?Function,
  style: ?Object,
  showScrollbar: ?boolean,
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
    scrollerRef: PropTypes.func,
    innerContainerTagName: PropTypes.string,
    className: PropTypes.string,
    leadingIndicatorClassName: PropTypes.string,
    trailingIndicatorClassName: PropTypes.string,
    style: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    showScrollbar: PropTypes.bool,
  };

  static defaultProps = {
    scrollerRef: null,
    innerContainerTagName: 'div',
    className: null,
    leadingIndicatorClassName: null,
    trailingIndicatorClassName: null,
    style: null,
    showScrollbar: false,
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
    if (this.props.showScrollbar) {
      return;
    }
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
      className,
      innerContainerTagName,
      leadingIndicatorClassName,
      scrollerRef,
      showScrollbar,
      style,
      trailingIndicatorClassName,
      ...rest
    } = this.props;

    if (className) {
      classNames.push(className);
    }
    if (this.state.scrollIndicatorClassName) {
      classNames.push(this.state.scrollIndicatorClassName);
    }

    const scrollerClassNames = getClassName(
      'bpk-mobile-scroll-container__scroller',
      showScrollbar && 'bpk-mobile-scroll-container__showScrollbar',
    );

    const InnerContainer = innerContainerTagName;

    return (
      <div
        {...rest}
        className={classNames.join(' ')}
        style={{ ...style, height: this.state.computedHeight }}
      >
        <div
          ref={(el) => {
            if (scrollerRef) {
              scrollerRef(el);
            }
            this.scrollerEl = el;
          }}
          onScroll={this.setScrollIndicatorClassName}
          className={scrollerClassNames}
        >
          <InnerContainer
            ref={(el) => {
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
