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
 * Maps camelCase JS prop names to kebab-case CSS custom property base names.
 * Only props listed here can participate in the responsive system.
 */
const PROP_TO_CSS_VAR: Record<string, string> = {
  // Spacing
  padding: 'padding',
  paddingTop: 'padding-top',
  paddingRight: 'padding-right',
  paddingBottom: 'padding-bottom',
  paddingLeft: 'padding-left',
  paddingStart: 'padding-start',
  paddingEnd: 'padding-end',
  paddingInline: 'padding-inline',
  margin: 'margin',
  marginTop: 'margin-top',
  marginRight: 'margin-right',
  marginBottom: 'margin-bottom',
  marginLeft: 'margin-left',
  marginStart: 'margin-start',
  marginEnd: 'margin-end',
  marginInline: 'margin-inline',
  gap: 'gap',
  spacing: 'gap', // Chakra Stack alias
  rowGap: 'row-gap',
  columnGap: 'column-gap',
  // Size
  width: 'width',
  height: 'height',
  minWidth: 'min-width',
  minHeight: 'min-height',
  maxWidth: 'max-width',
  maxHeight: 'max-height',
  // Position offsets
  top: 'top',
  right: 'right',
  bottom: 'bottom',
  left: 'left',
  // Display & position
  display: 'display',
  position: 'position',
  overflow: 'overflow',
  overflowX: 'overflow-x',
  overflowY: 'overflow-y',
  // Flex container
  flexDirection: 'flex-direction',
  flexWrap: 'flex-wrap',
  justifyContent: 'justify-content',
  alignItems: 'align-items',
  alignContent: 'align-content',
  // Flex item
  flex: 'flex',
  flexGrow: 'flex-grow',
  flexShrink: 'flex-shrink',
  flexBasis: 'flex-basis',
  order: 'order',
  alignSelf: 'align-self',
  justifySelf: 'justify-self',
  // Grid container
  gridTemplateColumns: 'grid-template-columns',
  gridTemplateRows: 'grid-template-rows',
  gridTemplateAreas: 'grid-template-areas',
  gridAutoFlow: 'grid-auto-flow',
  gridAutoRows: 'grid-auto-rows',
  gridAutoColumns: 'grid-auto-columns',
  // Grid item
  gridColumn: 'grid-column',
  gridRow: 'grid-row',
  // Typography (from textStyle expansion)
  fontSize: 'font-size',
  lineHeight: 'line-height',
  fontWeight: 'font-weight',
  letterSpacing: 'letter-spacing',
  fontFamily: 'font-family',
};

/**
 * Maps camelCase JS prop names to their CSS property equivalents.
 * Used for setting inline styles on static (non-responsive) props.
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

export type LayoutStyleOutput = {
  /** Inline styles + CSS custom properties for responsive values */
  style: CSSProperties & Record<string, string>;
  /** Whether any responsive CSS custom properties were emitted */
  hasResponsive: boolean;
  /** Non-style props to spread on the DOM element */
  passthrough: Record<string, any>;
};

/**
 * Converts processed layout props into an output suitable for a plain DOM element.
 *
 * - Scalar values → inline `style` properties
 * - Responsive objects (keyed by Chakra breakpoint keys like `md`, `xl`) →
 *   CSS custom properties (`--bpk-{prop}-{bp}`) read by BpkLayoutResponsive.module.scss
 * - Non-style props (id, role, aria-*, data-*, event handlers) → `passthrough`
 *
 * @param {Record<string, any>} processedProps - Props after token conversion and validation
 *   by `processBpkComponentProps`. Values are already resolved to CSS values (e.g. '.5rem').
 *   Responsive values are objects keyed by Chakra breakpoint keys (base, sm, md, lg, xl, 2xl).
 * @returns {LayoutStyleOutput} Style, responsive flag, and passthrough props.
 */
export function buildLayoutOutput(
  processedProps: Record<string, any>,
): LayoutStyleOutput {
  const style: Record<string, string> = {};
  const passthrough: Record<string, any> = {};
  let hasResponsive = false;

  Object.entries(processedProps).forEach(([key, value]) => {
    if (value === undefined || value === null) return;

    // Passthrough props go directly to the DOM element
    if (isPassthroughProp(key)) {
      passthrough[key] = value;
      return;
    }

    // Component-handled props are skipped (handled by the component)
    if (COMPONENT_HANDLED_KEYS.has(key)) return;

    const cssVarName = PROP_TO_CSS_VAR[key];

    // Responsive object → CSS custom properties
    if (cssVarName && typeof value === 'object' && !Array.isArray(value)) {
      hasResponsive = true;
      Object.entries(value as Record<string, string>).forEach(([bp, bpValue]) => {
        if (bp === 'base') {
          style[`--bpk-${cssVarName}`] = String(bpValue);
        } else {
          style[`--bpk-${cssVarName}-${bp}`] = String(bpValue);
        }
      });
      return;
    }

    // Scalar value → inline style
    if (cssVarName) {
      // Map to correct CSS property name (handles aliases like paddingStart → paddingInlineStart)
      const cssPropName = PROP_TO_CSS_PROPERTY[key] || key;
      (style as any)[cssPropName] = String(value);
      return;
    }

    // Unknown prop — pass through to DOM (could be a data attribute we didn't list)
    passthrough[key] = value;
  });

  return { style: style as CSSProperties & Record<string, string>, hasResponsive, passthrough };
}
