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

import type { BpkCardV2Padding, BpkCardV2PaddingSize } from '../common-types';

const SPACING_MAP: Record<BpkCardV2PaddingSize, string> = {
  base: 'var(--bpk-spacing-base)',
  lg: 'var(--bpk-spacing-lg)',
  md: 'var(--bpk-spacing-md)',
  none: '0',
  sm: 'var(--bpk-spacing-sm)',
  xl: 'var(--bpk-spacing-xl)',
  xxl: 'var(--bpk-spacing-xxl)',
  xxxl: 'var(--bpk-spacing-xxxl)',
  xxxxl: 'var(--bpk-spacing-xxxxl)',
};

/**
 * Converts a BpkCardV2Padding prop to CSSProperties for inline styles.
 *
 * @param {BpkCardV2Padding | undefined} padding - Padding configuration (string size or object)
 * @returns {CSSProperties | undefined} CSSProperties object or undefined if no padding specified
 */
function getPaddingStyle(
  padding: BpkCardV2Padding | undefined,
): CSSProperties | undefined {
  if (!padding) return undefined;

  if (typeof padding === 'string') {
    return { padding: SPACING_MAP[padding] };
  }

  // Check for vertical/horizontal padding object
  if ('vertical' in padding || 'horizontal' in padding) {
    const { horizontal, vertical } = padding as {
      horizontal?: BpkCardV2PaddingSize;
      vertical?: BpkCardV2PaddingSize;
    };
    return {
      paddingBottom: vertical ? SPACING_MAP[vertical] : undefined,
      paddingInlineEnd: horizontal ? SPACING_MAP[horizontal] : undefined,
      paddingInlineStart: horizontal ? SPACING_MAP[horizontal] : undefined,
      paddingTop: vertical ? SPACING_MAP[vertical] : undefined,
    };
  }

  // Check for individual side padding object
  const { bottom, end, start, top } = padding as {
    bottom?: BpkCardV2PaddingSize;
    end?: BpkCardV2PaddingSize;
    start?: BpkCardV2PaddingSize;
    top?: BpkCardV2PaddingSize;
  };
  return {
    paddingBottom: bottom ? SPACING_MAP[bottom] : undefined,
    paddingInlineEnd: end ? SPACING_MAP[end] : undefined,
    paddingInlineStart: start ? SPACING_MAP[start] : undefined,
    paddingTop: top ? SPACING_MAP[top] : undefined,
  };
}

export default getPaddingStyle;
