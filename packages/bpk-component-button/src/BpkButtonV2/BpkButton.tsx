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
import { Children, isValidElement, useMemo, type ReactNode } from 'react';

import { cssModules } from '../../../bpk-react-utils';

import { BUTTON_TYPES, SIZE_TYPES } from './common-types';

import type { Props } from './common-types';

import COMMON_STYLES from './BpkButton.module.scss';

const getCommonClassName = cssModules(COMMON_STYLES);

// Maximum depth for recursive SVG detection (prevents infinite loops)
const SVG_DETECTION_DEPTH = 5;

/**
 * Recursively checks if a React element contains an SVG element.
 * Used to identify icon components that should not have underlines.
 *
 * @param {ReactNode} element - The React element to check
 * @param {number} [depth=0] - Current recursion depth (prevents infinite loops)
 * @returns {boolean} true if the element contains SVG, false otherwise
 */
const containsSVG = (element: ReactNode, depth: number = 0): boolean => {
  if (!isValidElement(element) || depth > SVG_DETECTION_DEPTH) {
    return false;
  }

  if (element.type === 'svg') {
    return true;
  }

  // Check if element type is a function component that might be an icon
  if (typeof element.type === 'function') {
    const componentType = element.type as { displayName?: string; name?: string };
    const componentName = (componentType.displayName || componentType.name || '').toLowerCase();
    if (componentName.includes('icon')) {
      return true;
    }
  }

  // Recursively check children
  const props = element.props as { children?: ReactNode };
  if (props?.children) {
    const children = Children.toArray(props.children);
    return children.some((child) => containsSVG(child, depth + 1));
  }

  return false;
};

/**
 * Processes children for link types, preserving original order while wrapping only text in underlined span.
 * Icons are identified by containing SVG elements and are rendered without underlines.
 * Spacing between text and icons is handled via CSS.
 * Optimized to perform icon detection and processing in a single pass.
 *
 * @param {ReactNode} children - Array of React children
 * @param {string} underlinedClassNames - CSS class names for underlined text
 * @returns {ReactNode} Processed children with text wrapped in underlined span, icons preserved as-is
 */
const processLinkChildren = (children: ReactNode, underlinedClassNames: string): ReactNode => {
  const childrenArray = Children.toArray(children);
  // Early return for text-only case (most common scenario)
  const hasAnyIcon = childrenArray.some((child) => containsSVG(child));
  if (!hasAnyIcon) {
    return <span className={underlinedClassNames}>{children}</span>;
  }

  // Process mixed content (text with icons)
  const result: ReactNode[] = [];
  let currentTextGroup: ReactNode[] = [];
  let textGroupIndex = 0;

  const flushTextGroup = () => {
    if (currentTextGroup.length > 0) {
      result.push(
        <span key={`text-group-${textGroupIndex}`} className={underlinedClassNames}>
          {currentTextGroup}
        </span>,
      );
      textGroupIndex += 1;
      currentTextGroup = [];
    }
  };

  childrenArray.forEach((child) => {
    if (containsSVG(child)) {
      flushTextGroup();
      result.push(child);
    } else {
      currentTextGroup.push(child);
    }
  });

  flushTextGroup();
  return <>{result}</>;
};

// eslint-disable-next-line import/prefer-default-export
export const BpkButtonV2 = ({
  blank = false,
  children,
  className = null,
  disabled = false,
  fullWidth = false,
  href = null,
  iconOnly = false,
  implicit = false,
  onClick = () => {},
  rel: propRel = undefined,
  size = SIZE_TYPES.small,
  submit = false,
  type = BUTTON_TYPES.primary,
  ...rest
}: Props) => {
  const isLinkType = type === BUTTON_TYPES.link || type === BUTTON_TYPES.linkOnDark;
  const isAlternate = type === BUTTON_TYPES.linkOnDark;
  const isEnabledLinkType = !disabled && isLinkType;

  const classNames = getCommonClassName(
    'bpk-button',
    size === SIZE_TYPES.large && 'bpk-button--large',
    iconOnly && 'bpk-button--icon-only',
    iconOnly && size === SIZE_TYPES.large && 'bpk-button--large-icon-only',
    `bpk-button--${type}`,
    fullWidth && 'bpk-button--full-width',
    isLinkType && implicit && 'bpk-button--link--implicit',
    className,
  );

  const underlinedClassNames = isEnabledLinkType
      ? getCommonClassName(
          'bpk-button--link-underlined',
          implicit && 'bpk-button--link-underlined--implicit',
          isAlternate && 'bpk-button--link-underlined--alternate',
          implicit && isAlternate && 'bpk-button--link-underlined--implicit--alternate',
        )
      : null;

  // Memoize children processing - only process children for link types
  // For non-link types, return children as-is to avoid unnecessary computation
  const processedChildren: ReactNode = useMemo(() => {
    // Early return for non-link and disabled link types - no underline needed
    if (!isLinkType || !underlinedClassNames) {
      return children;
    }

    // Process children while preserving original order
    // Only text elements are wrapped in underlined span, icons are rendered as-is
    // Spacing between text and icons is handled via CSS
    return processLinkChildren(children, underlinedClassNames);
  }, [isLinkType, underlinedClassNames, children]);

  const target = blank ? '_blank' : undefined;
  const rel = blank ? propRel || 'noopener noreferrer' : propRel;

  if (!disabled && href) {
    return (
      <a
        href={href}
        className={classNames}
        onClick={onClick}
        target={target}
        rel={rel}
        {...rest}
      >
        {processedChildren}
      </a>
    );
  }

  return (
    <button
      type={submit ? 'submit' : 'button'}
      disabled={disabled}
      className={classNames}
      onClick={onClick}
      {...rest}
    >
      {processedChildren}
    </button>
  );
};

