/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016-2020 Skyscanner Ltd
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
import ReactDOM from 'react-dom';
import { cssModules } from 'bpk-react-utils';
import React, { Component, type Node } from 'react';
import BpkMobileScrollContainer from 'bpk-component-mobile-scroll-container';

import STYLES from './BpkHorizontalNav.scss';

const getClassName = cssModules(STYLES);

export type Props = {
  children: Node,
  className: ?string,
  leadingScrollIndicatorClassName: ?string,
  trailingScrollIndicatorClassName: ?string,
  autoScrollToSelected: boolean,
};

const getPos = (ref: ?Element): ?{ left: number, right: number } => {
  if (!ref) {
    return null;
  }
  const pos = ref.getBoundingClientRect();
  return pos;
};

class BpkHorizontalNav extends Component<Props> {
  selectedItemRef: ?Element;

  scrollRef: ?Element;

  static propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    leadingScrollIndicatorClassName: PropTypes.string,
    trailingScrollIndicatorClassName: PropTypes.string,
    autoScrollToSelected: PropTypes.bool,
  };

  static defaultProps = {
    className: null,
    leadingScrollIndicatorClassName: null,
    trailingScrollIndicatorClassName: null,
    autoScrollToSelected: false,
  };

  constructor(props: Props) {
    super(props);

    this.scrollRef = null;
    this.selectedItemRef = null;
  }

  componentDidMount = () => {
    this.scrollSelectedIntoView(false);
  };

  componentDidUpdate() {
    this.scrollSelectedIntoView(true);
  }

  scrollSelectedIntoView = (useSmoothScroll: boolean) => {
    if (
      !this.props.autoScrollToSelected ||
      !this.scrollRef ||
      !this.selectedItemRef
    ) {
      return;
    }

    // Using find dom node is preferable here over changing the underlying mechanism of BpkHorizontalNavItem to accomodate dom-node refs
    // eslint-disable-next-line react/no-find-dom-node
    const selectedItemRef = ((ReactDOM.findDOMNode(
      this.selectedItemRef,
    ): any): Element);

    if (!this.scrollRef) {
      return;
    }

    const selectedItemPos = getPos(selectedItemRef);
    if (!selectedItemPos) {
      return;
    }

    const scrollPos = getPos(this.scrollRef);
    if (!scrollPos) {
      return;
    }

    // We only need to carry out a scroll if the element is not already fully within the scroll view
    const needsScroll =
      selectedItemPos.left < scrollPos.left ||
      selectedItemPos.right > scrollPos.right;

    if (!needsScroll) {
      return;
    }

    const scrollAdjustment = selectedItemPos.left - scrollPos.left;
    // Some browsers don't support smooth scrolling, so in those cases we must fall back to simply setting `scrollLeft`
    if (
      // $FlowFixMe - we've already checked that `this.scrollRef` is defined
      this.scrollRef.scroll &&
      typeof this.scrollRef.scroll === 'function' &&
      useSmoothScroll
    ) {
      this.scrollRef.scroll({
        left: scrollAdjustment,
        behavior: 'smooth',
      });
    } else {
      // $FlowFixMe - we've already checked that `this.scrollRef` is defined
      this.scrollRef.scrollLeft = scrollAdjustment;
    }
  };

  render() {
    const classNames = [getClassName('bpk-horizontal-nav')];
    const {
      children: rawChildren,
      className,
      autoScrollToSelected,
      leadingScrollIndicatorClassName,
      trailingScrollIndicatorClassName,
      ...rest
    } = this.props;

    // Outer classNames
    if (className) {
      classNames.push(className);
    }

    let children = null;
    if (!autoScrollToSelected) {
      children = rawChildren;
    } else {
      children = React.Children.map(rawChildren, child => {
        if (!child || !child.props || !child.props.selected) {
          return child;
        }

        return React.cloneElement(child, {
          ref: ref => {
            this.selectedItemRef = ref;
          },
        });
      });
    }

    return (
      <BpkMobileScrollContainer
        innerContainerTagName="nav"
        className={classNames.join(' ')}
        leadingIndicatorClassName={leadingScrollIndicatorClassName}
        trailingIndicatorClassName={trailingScrollIndicatorClassName}
        scrollerRef={ref => {
          this.scrollRef = ref;
        }}
        {...rest}
      >
        <ul className={getClassName('bpk-horizontal-nav__list')}>{children}</ul>
      </BpkMobileScrollContainer>
    );
  }
}

export default BpkHorizontalNav;
