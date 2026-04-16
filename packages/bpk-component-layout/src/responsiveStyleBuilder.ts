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

/** camelCase → kebab-case (e.g. `paddingTop` → `padding-top`) */
const toKebab = (s: string) => s.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`);

/** Props whose CSS var name differs from simple camelCase → kebab-case */
const CSS_VAR_ALIASES: Record<string, string> = {
  spacing: 'gap', // Chakra Stack alias
};

/**
 * All style props that participate in the CSS custom property system.
 * The CSS var name is derived automatically via camelCase → kebab-case,
 * except for aliases listed in CSS_VAR_ALIASES above.
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

/** Returns the CSS custom property base name for a style prop, or undefined if not a style prop. */
function getCssVarName(prop: string): string | undefined {
  if (!STYLE_PROPS.has(prop)) return undefined;
  return toKebab(CSS_VAR_ALIASES[prop] ?? prop);
}

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
 * Props that map to CSS properties but are NOT part of the CSS custom property
 * responsive system. They always produce inline styles, even when passed as
 * responsive objects (only the 'base' value is used in that case).
 *
 * These props were excluded from BpkLayoutResponsive.module.scss because they
 * are rarely — if ever — varied across breakpoints in practice.
 */
const STATIC_ONLY_PROPS = new Set([
  // Position offsets
  'top',
  'right',
  'bottom',
  'left',
  // Flex item details
  'flexGrow',
  'flexShrink',
  'flexBasis',
  'order',
  'justifySelf',
  // Grid internals
  'gridAutoFlow',
  'gridAutoRows',
  'gridAutoColumns',
  'gridTemplateAreas',
  // Typography details (font-family and letter-spacing are unlikely to change per breakpoint)
  'letterSpacing',
  'fontFamily',
  'whiteSpace',
  // Visual props unlikely to change per breakpoint
  'cursor',
  'opacity',
  'visibility',
  'pointerEvents',
  'userSelect',
]);

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
 * Breakpoint order (must match $breakpoints map in BpkLayoutResponsive.module.scss).
 * Used by the fill-forward algorithm so every CSS slot gets a value.
 */
const BP_ORDER: ReadonlyArray<string> = ['sm', 'md', 'lg', 'xl', '2xl'];

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

    const cssVarName = getCssVarName(key);

    // Responsive object → CSS custom properties (only for responsive-capable props)
    if (cssVarName && !STATIC_ONLY_PROPS.has(key) && typeof value === 'object' && !Array.isArray(value)) {
      hasResponsive = true;
      const responsive = value as Record<string, string>;

      // Fill-forward: propagate each specified value to all subsequent unspecified
      // breakpoints. This allows the CSS to use var(--bpk-X-bp) with no fallback
      // chain — each slot is guaranteed to hold the correct cascaded value.
      let carry: string | undefined = responsive.base !== undefined ? String(responsive.base) : undefined;
      if (carry !== undefined) {
        style[`--bpk-${cssVarName}`] = carry;
      }
      for (const bp of BP_ORDER) {
        if (responsive[bp] !== undefined) {
          carry = String(responsive[bp]);
        }
        if (carry !== undefined) {
          style[`--bpk-${cssVarName}-${bp}`] = carry;
        }
      }
      return;
    }

    // Scalar value → inline style (also handles static-only props that received a responsive object)
    if (cssVarName) {
      const cssPropName = PROP_TO_CSS_PROPERTY[key] || key;
      // For static-only props that received a responsive object, use the base value
      const finalValue =
        typeof value === 'object' && !Array.isArray(value) ? (value as Record<string, string>).base : value;
      if (finalValue !== undefined) {
        (style as any)[cssPropName] = String(finalValue);
      }
      return;
    }

    // Unknown prop — pass through to DOM (could be a data attribute we didn't list)
    passthrough[key] = value;
  });

  return { style: style as CSSProperties & Record<string, string>, hasResponsive, passthrough };
}
