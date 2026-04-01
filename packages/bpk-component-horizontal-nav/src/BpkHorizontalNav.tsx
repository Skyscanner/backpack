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

import {
  Children,
  cloneElement,
  useCallback,
  useEffect,
  useRef,
  type ReactElement,
  type ReactNode,
} from 'react';

import BpkMobileScrollContainer from '../../bpk-component-mobile-scroll-container';
import { cssModules } from '../../bpk-react-utils';

import STYLES from './BpkHorizontalNav.module.scss';

const getClassName = cssModules(STYLES);

const HORIZONTAL_NAV_TYPES = {
  default: 'default',
  light: 'light',
} as const;

type Props = {
  children: ReactNode;
  ariaLabel?: string;
  autoScrollToSelected?: boolean;
  className?: string | null;
  leadingScrollIndicatorClassName?: string;
  showUnderline?: boolean;
  trailingScrollIndicatorClassName?: string;
  type?: keyof typeof HORIZONTAL_NAV_TYPES;
  [rest: string]: any;
};

const getPos = (ref: Element | null): DOMRect | null => {
  if (!ref) {
    return null;
  }
  return ref.getBoundingClientRect();
};

const BpkHorizontalNav = ({
  ariaLabel,
  autoScrollToSelected = false,
  children: rawChildren,
  className = null,
  leadingScrollIndicatorClassName,
  showUnderline = true,
  trailingScrollIndicatorClassName,
  type = HORIZONTAL_NAV_TYPES.default,
  ...rest
}: Props) => {
  const scrollRef = useRef<Element | null>(null);
  const selectedItemRef = useRef<Element | null>(null);

  const scrollSelectedIntoView = useCallback(
    (useSmoothScroll: boolean) => {
      if (
        !autoScrollToSelected ||
        !scrollRef.current ||
        !selectedItemRef.current
      ) {
        return;
      }

      const selectedItemPos = getPos(selectedItemRef.current);
      if (!selectedItemPos) {
        return;
      }

      const scrollPos = getPos(scrollRef.current);
      if (!scrollPos) {
        return;
      }

      const needsScroll =
        selectedItemPos.left < scrollPos.left ||
        selectedItemPos.right > scrollPos.right;

      if (!needsScroll) {
        return;
      }

      const scrollAdjustment = selectedItemPos.left - scrollPos.left;
      if (
        scrollRef.current &&
        scrollRef.current.scroll &&
        typeof scrollRef.current.scroll === 'function' &&
        useSmoothScroll
      ) {
        scrollRef.current.scroll({
          left: scrollAdjustment,
          behavior: 'smooth',
        });
      } else if (scrollRef.current) {
        scrollRef.current.scrollLeft = scrollAdjustment;
      }
    },
    [autoScrollToSelected],
  );

  useEffect(() => {
    requestAnimationFrame(() => {
      scrollSelectedIntoView(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    scrollSelectedIntoView(true);
  });

  const classNames = getClassName(
    'bpk-horizontal-nav',
    showUnderline && `bpk-horizontal-nav--show-${type}-underline`,
    className,
  );

  let children: ReactNode = rawChildren;

  if (autoScrollToSelected || type === HORIZONTAL_NAV_TYPES.light) {
    children = Children.map(rawChildren, (child) => {
      const childProps: { type?: string } = {};
      let childRef: ((ref: HTMLDivElement | null) => void) | undefined;
      if (autoScrollToSelected) {
        if (
          child &&
          typeof child === 'object' &&
          'props' in child &&
          child.props &&
          (child.props as any).selected
        ) {
          childRef = (ref) => {
            selectedItemRef.current = ref;
          };
        }
      }

      if (type === HORIZONTAL_NAV_TYPES.light) {
        childProps.type = HORIZONTAL_NAV_TYPES.light;
      }

      return child && typeof child === 'object' && 'props' in child ? (
        <div ref={childRef}>{cloneElement(child as ReactElement, childProps)}</div>
      ) : null;
    });
  }

  return (
    <div className={classNames}>
      <BpkMobileScrollContainer
        ariaLabel={ariaLabel}
        innerContainerTagName="nav"
        leadingIndicatorClassName={leadingScrollIndicatorClassName}
        trailingIndicatorClassName={trailingScrollIndicatorClassName}
        scrollerRef={(ref: Element | null) => {
          scrollRef.current = ref;
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
    </div>
  );
};

export type { Props };
export default BpkHorizontalNav;
export { HORIZONTAL_NAV_TYPES };
