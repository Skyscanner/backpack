/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016-2019 Skyscanner Ltd
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

import STYLES from './BpkHorizontalNav.css';

const getClassName = cssModules(STYLES);

export type Props = {
  children: Node,
  className: ?string,
  leadingScrollIndicatorClassName: ?string,
  trailingScrollIndicatorClassName: ?string,
  autoScrollToSelected: boolean,
};

const getLeft = (ref: ?Element): number => {
  if (!ref) {
    return 0;
  }
  const pos = ref.getBoundingClientRect();
  return pos.left;
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

    const scrollValue = getLeft(selectedItemRef) - getLeft(this.scrollRef);

    if (this.scrollRef) {
      this.scrollRef.scrollLeft = scrollValue;
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
