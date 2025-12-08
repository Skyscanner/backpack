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
 * Checks if element is an icon (SVG element, icon component, or contains nested icon).
 * Uses recursive detection with depth limit for safety.
 *
 * @param {ReactNode} element - The React element to check
 * @param {number} [depth=0] - Current recursion depth (internal use)
 * @returns {boolean} true if element is an icon, false otherwise
 */
const isIconElement = (element: ReactNode, depth: number = 0): boolean => {
  // Guard: invalid element or max depth reached
  if (!isValidElement(element) || depth > SVG_DETECTION_DEPTH) {
    return false;
  }

  // Check 1: Direct SVG element
  if (element.type === 'svg') {
    return true;
  }

  // Check 2: Component name contains 'icon'
  if (typeof element.type === 'function') {
    const componentType = element.type as { displayName?: string; name?: string };
    const componentName = (componentType.displayName || componentType.name || '').toLowerCase();
    if (componentName.includes('icon')) {
      return true;
    }
  }

  // Check 3: Recursively check children
  const props = element.props as { children?: ReactNode };
  if (props?.children) {
    return Children.toArray(props.children).some((child) =>
      isIconElement(child, depth + 1)
    );
  }

  return false;
};

/**
 * Processes children for link types in a single optimized pass.
 *
 * Performance optimizations:
 * - Fast paths for simple cases (string, number, single element)
 * - Two-tier icon detection (fast name check + deep SVG check)
 * - Single pass detection and grouping with cached results
 * - Preserves original children reference when no icons present
 *
 * @param {ReactNode} children - React children to process
 * @param {string} underlinedClassNames - CSS class for underlined text
 * @returns {ReactNode} Processed children
 */
const processLinkChildren = (children: ReactNode, underlinedClassNames: string): ReactNode => {
  // Fast path 1: simple string/number (most common)
  if (typeof children === 'string' || typeof children === 'number') {
    return <span className={underlinedClassNames}>{children}</span>;
  }

  // Fast path 2: single React element
  if (isValidElement(children) && !Array.isArray(children)) {
    return isIconElement(children)
      ? children
      : <span className={underlinedClassNames}>{children}</span>;
  }

  // Process array of children
  const childrenArray = Children.toArray(children);

  // Fast path 3: empty children
  if (childrenArray.length === 0) {
    return <span className={underlinedClassNames}>{children}</span>;
  }

  // Single pass: detect icons and build result simultaneously
  // Cache detection results to avoid re-checking in forEach
  const iconFlags = childrenArray.map(isIconElement);
  const hasAnyIcon = iconFlags.includes(true);

  // Fast path 4: no icons - wrap all in single span (preserves original reference)
  if (!hasAnyIcon) {
    return <span className={underlinedClassNames}>{children}</span>;
  }

  // Build result: group consecutive non-icons, keep icons separate
  const result: ReactNode[] = [];
  let textGroup: ReactNode[] = [];
  let groupIndex = 0;

  const flushTextGroup = () => {
    if (textGroup.length > 0) {
      result.push(
        <span key={`t${groupIndex}`} className={underlinedClassNames}>
          {textGroup.length === 1 ? textGroup[0] : textGroup}
        </span>
      );
      groupIndex += 1;
      textGroup = [];
    }
  };

  childrenArray.forEach((child, index) => {
    if (iconFlags[index]) {
      flushTextGroup();
      result.push(child);
    } else {
      textGroup.push(child);
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

