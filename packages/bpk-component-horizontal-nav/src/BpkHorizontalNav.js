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
import React, { Component, type Node } from 'react';

import { cssModules } from '../../bpk-react-utils';
import BpkMobileScrollContainer from '../../bpk-component-mobile-scroll-container';

import STYLES from './BpkHorizontalNav.module.scss';

const getClassName = cssModules(STYLES);

const HORIZONTAL_NAV_TYPES = {
  default: 'default',
  light: 'light',
};

export type Props = {
  autoScrollToSelected: boolean,
  children: Node,
  showUnderline: boolean,
  type: $Keys<typeof HORIZONTAL_NAV_TYPES>,
  className: ?string,
  leadingScrollIndicatorClassName: ?string,
  trailingScrollIndicatorClassName: ?string,
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
    autoScrollToSelected: PropTypes.bool,
    className: PropTypes.string,
    leadingScrollIndicatorClassName: PropTypes.string,
    showUnderline: PropTypes.bool,
    trailingScrollIndicatorClassName: PropTypes.string,
    type: PropTypes.oneOf(Object.keys(HORIZONTAL_NAV_TYPES)),
  };

  static defaultProps = {
    autoScrollToSelected: false,
    className: null,
    leadingScrollIndicatorClassName: null,
    showUnderline: true,
    trailingScrollIndicatorClassName: null,
    type: HORIZONTAL_NAV_TYPES.default,
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

    if (!this.scrollRef) {
      return;
    }

    const selectedItemPos = getPos(this.selectedItemRef);
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
      this.scrollRef &&
      this.scrollRef.scroll &&
      typeof this.scrollRef.scroll === 'function' &&
      useSmoothScroll
    ) {
      this.scrollRef.scroll({
        left: scrollAdjustment,
        behavior: 'smooth',
      });
    } else if (this.scrollRef) {
      this.scrollRef.scrollLeft = scrollAdjustment;
    }
  };

  render() {
    const {
      autoScrollToSelected,
      children: rawChildren,
      className,
      leadingScrollIndicatorClassName,
      showUnderline,
      trailingScrollIndicatorClassName,
      type,
      ...rest
    } = this.props;

    const classNames = getClassName(
      'bpk-horizontal-nav',
      showUnderline && `bpk-horizontal-nav--show-${type}-underline`,
      className,
    );

    let children = rawChildren;

    if (autoScrollToSelected || type === HORIZONTAL_NAV_TYPES.light) {
      children = React.Children.map(rawChildren, (child) => {
        const childProps = {};
        let childRef;
        if (autoScrollToSelected) {
          if (child && child.props && child.props.selected) {
            childRef = (ref) => {
              this.selectedItemRef = ref;
            };
          }
        }

        if (type === HORIZONTAL_NAV_TYPES.light) {
          childProps.type = HORIZONTAL_NAV_TYPES.light;
        }

        return child ? (
          <div ref={childRef}>{React.cloneElement(child, childProps)}</div>
        ) : null;
      });
    }

    return (
      // $FlowFixMe[cannot-spread-inexact] - inexact rest. See 'decisions/flowfixme.md'.
      <BpkMobileScrollContainer
        innerContainerTagName="nav"
        className={classNames}
        leadingIndicatorClassName={leadingScrollIndicatorClassName}
        trailingIndicatorClassName={trailingScrollIndicatorClassName}
        scrollerRef={(ref) => {
          this.scrollRef = ref;
        }}
        {...rest}
      >
        <div
          className={getClassName('bpk-horizontal-nav__list')}
          role="tablist"
        >
          {children}
        </div>
      </BpkMobileScrollContainer>
    );
  }
}

export default BpkHorizontalNav;
export { HORIZONTAL_NAV_TYPES };
