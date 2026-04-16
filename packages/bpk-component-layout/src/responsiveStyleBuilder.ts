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

import type { CSSProperties } from 'react';

/**
 * All style props that participate in the layout system.
 * These are recognised as CSS-settable properties and will be
 * placed into the inline `style` object.
 */
const STYLE_PROPS = new Set([
  // Spacing
  'padding', 'paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft',
  'paddingStart', 'paddingEnd', 'paddingInline',
  'margin', 'marginTop', 'marginRight', 'marginBottom', 'marginLeft',
  'marginStart', 'marginEnd', 'marginInline',
  'gap', 'spacing', 'rowGap', 'columnGap',
  // Size
  'width', 'height', 'minWidth', 'minHeight', 'maxWidth', 'maxHeight',
  // Position offsets
  'top', 'right', 'bottom', 'left',
  // Display & position
  'display', 'position', 'overflow', 'overflowX', 'overflowY',
  // Flex container
  'flexDirection', 'flexWrap', 'justifyContent', 'alignItems', 'alignContent',
  // Flex item
  'flex', 'flexGrow', 'flexShrink', 'flexBasis', 'order', 'alignSelf', 'justifySelf',
  // Grid container
  'gridTemplateColumns', 'gridTemplateRows', 'gridTemplateAreas',
  'gridAutoFlow', 'gridAutoRows', 'gridAutoColumns',
  // Grid item
  'gridColumn', 'gridRow',
  // Typography
  'fontSize', 'lineHeight', 'fontWeight', 'letterSpacing', 'fontFamily',
  'textAlign', 'whiteSpace',
  // Visual
  'cursor', 'opacity', 'visibility', 'pointerEvents', 'userSelect',
]);

/**
 * Maps camelCase JS prop names to their CSS property equivalents.
 * Used for setting inline styles on props whose JS name differs from CSS.
 */
const PROP_TO_CSS_PROPERTY: Record<string, string> = {
  paddingStart: 'paddingInlineStart',
  paddingEnd: 'paddingInlineEnd',
  marginStart: 'marginInlineStart',
  marginEnd: 'marginInlineEnd',
  spacing: 'gap', // Chakra Stack alias
};

/**
 * Props that are passed through to the DOM element as-is (not style props).
 */
const PASSTHROUGH_KEYS = new Set([
  'id',
  'role',
  'tabIndex',
  'onClick',
  'onKeyDown',
  'onFocus',
  'onBlur',
  'onMouseEnter',
  'onMouseLeave',
  'onMouseOver',
  'onMouseOut',
  'onMouseDown',
  'onMouseUp',
  'onKeyUp',
  'onKeyPress',
  'children',
]);

const PASSTHROUGH_PREFIXES = ['aria-', 'data-'];

function isPassthroughProp(key: string): boolean {
  if (PASSTHROUGH_KEYS.has(key)) return true;
  return PASSTHROUGH_PREFIXES.some((prefix) => key.startsWith(prefix));
}

/**
 * Props that are handled separately by components (not style, not passthrough).
 * These are stripped from the style output and handled in the component layer.
 */
const COMPONENT_HANDLED_KEYS = new Set([
  'color',
  'backgroundColor',
  'className',
  'style',
  'zIndex',
]);

/**
 * Breakpoint order (ascending, mobile-first).
 * Used by the fill-forward resolution to determine which value applies
 * at the current breakpoint.
 */
const BP_ORDER: readonly string[] = ['sm', 'md', 'lg', 'xl', '2xl'];

/**
 * Resolves a responsive value object to the effective value for a given breakpoint.
 * Uses fill-forward: the most recently specified value at or below the current
 * breakpoint wins.
 *
 * @param {Record<string, string>} responsive - Object keyed by breakpoint (base, sm, md, lg, xl, 2xl)
 * @param {string} currentBp - The currently active breakpoint key
 * @returns {string | undefined} The resolved value, or undefined if no value applies
 */
function resolveResponsive(
  responsive: Record<string, string>,
  currentBp: string,
): string | undefined {
  let result: string | undefined = responsive.base !== undefined
    ? String(responsive.base)
    : undefined;

  for (const bp of BP_ORDER) {
    if (responsive[bp] !== undefined) {
      result = String(responsive[bp]);
    }
    if (bp === currentBp) break;
  }

  return result;
}

export type LayoutStyleOutput = {
  /** Inline styles (all values resolved for the current breakpoint) */
  style: CSSProperties & Record<string, string>;
  /** Non-style props to spread on the DOM element */
  passthrough: Record<string, any>;
};

/**
 * Converts processed layout props into an output suitable for a plain DOM element.
 *
 * - Scalar values → inline `style` properties
 * - Responsive objects → resolved to the current breakpoint's value via fill-forward,
 *   then set as inline `style` properties
 * - Non-style props (id, role, aria-*, data-*, event handlers) → `passthrough`
 *
 * @param {Record<string, any>} processedProps - Props after token conversion and validation
 *   by `processBpkComponentProps`. Values are already resolved to CSS values (e.g. '.5rem').
 *   Responsive values are objects keyed by Chakra breakpoint keys (base, sm, md, lg, xl, 2xl).
 * @param {string} currentBreakpoint - The currently active breakpoint key from useCurrentBreakpoint
 * @returns {LayoutStyleOutput} Style and passthrough props.
 */
export function buildLayoutOutput(
  processedProps: Record<string, any>,
  currentBreakpoint: string,
): LayoutStyleOutput {
  const style: Record<string, string> = {};
  const passthrough: Record<string, any> = {};

  Object.entries(processedProps).forEach(([key, value]) => {
    if (value === undefined || value === null) return;

    // Passthrough props go directly to the DOM element
    if (isPassthroughProp(key)) {
      passthrough[key] = value;
      return;
    }

    // Component-handled props are skipped (handled by the component)
    if (COMPONENT_HANDLED_KEYS.has(key)) return;

    // Not a known style prop — pass through
    if (!STYLE_PROPS.has(key)) {
      passthrough[key] = value;
      return;
    }

    const cssPropName = PROP_TO_CSS_PROPERTY[key] || key;

    // Responsive object → resolve to current breakpoint value
    if (typeof value === 'object' && !Array.isArray(value)) {
      const resolved = resolveResponsive(
        value as Record<string, string>,
        currentBreakpoint,
      );
      if (resolved !== undefined) {
        (style as any)[cssPropName] = resolved;
      }
      return;
    }

    // Scalar value → inline style
    (style as any)[cssPropName] = String(value);
  });

  return { style: style as CSSProperties & Record<string, string>, passthrough };
}
