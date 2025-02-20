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

import type { ReactNode, ElementType, CSSProperties } from 'react';
import { Component } from 'react';

import debounce from 'lodash/debounce';

import { cssModules, isRTL } from '../../bpk-react-utils';

import type { DebouncedFunc } from 'lodash';

import STYLES from './BpkMobileScrollContainer.module.scss';

const getClassName = cssModules(STYLES);

const computeScrollBarAwareHeight = (
  scrollerEl: HTMLElement | null,
  innerEl: HTMLElement | null,
) => {
  if (!(scrollerEl && innerEl)) {
    return null;
  }

  const scrollBarVisible = scrollerEl.offsetHeight - innerEl.offsetHeight > 0;
  return scrollBarVisible ? `${innerEl.offsetHeight / 16}rem` : 'auto';
};

const computeScrollIndicatorClassName = (
  scrollerEl: HTMLElement | null,
  leadingIndicatorClassName?: string,
  trailingIndicatorClassName?: string,
) => {
  if (!scrollerEl) {
    return null;
  }

  const classNames: string[] = [];
  const { offsetWidth, scrollLeft, scrollWidth } = scrollerEl;

  const rtl = isRTL();
  const scrollValue = rtl ? -Math.floor(scrollLeft) : Math.ceil(scrollLeft);
  const showLeadingIndicator = scrollValue > 0;
  const showTrailingIndicator = scrollValue < scrollWidth - offsetWidth;

  if (showLeadingIndicator && leadingIndicatorClassName) {
    classNames.push(leadingIndicatorClassName);
  }
  if (showTrailingIndicator && trailingIndicatorClassName) {
    classNames.push(trailingIndicatorClassName);
  }

  return classNames;
};

type Props = {
  ariaLabel?: string;
  children: ReactNode;
  innerContainerTagName?: ElementType;
  className?: string;
  leadingIndicatorClassName?: string;
  trailingIndicatorClassName?: string;
  scrollerRef?: (el: HTMLElement | null) => void;
  style?: CSSProperties;
  showScrollbar?: boolean;
};

type State = {
  computedHeight: string;
  scrollIndicatorClassName: string | null;
};

class BpkMobileScrollContainer extends Component<Props, State> {
  debouncedResize:  DebouncedFunc<() => void>

  static defaultProps: Partial<Props> = {
    innerContainerTagName: 'div',
    showScrollbar: false,
  };

  constructor(props: Props) {
    super(props);

    this.state = {
      computedHeight: 'auto',
      scrollIndicatorClassName: null,
    };

    this.debouncedResize = debounce(this.onWindowResize, 100);
  }

  componentDidMount() {
    requestAnimationFrame(() => {
      this.setScrollBarAwareHeight();
      this.setScrollIndicatorClassName();
    });
    window.addEventListener('resize', this.debouncedResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.debouncedResize);
  }

  onWindowResize = () => {
    this.setScrollBarAwareHeight();
    this.setScrollIndicatorClassName();
  };

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

    this.setState({ computedHeight });
  };

  innerEl: HTMLElement | null = null;

  scrollerEl: HTMLElement | null = null;

  render() {
    const classNames = [getClassName('bpk-mobile-scroll-container')];
    const {
      ariaLabel,
      children,
      className,
      innerContainerTagName = 'div',
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
            aria-label={ariaLabel}
            ref={(el: any) => {
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
