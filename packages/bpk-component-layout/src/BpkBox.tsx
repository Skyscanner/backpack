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

import { css, cx } from './styled-system/css';
import { processBpkProps } from './tokenUtils';

import type { BpkBoxProps } from './types';

const SPACING_KEYS = [
  // Padding props
  'p', 'pt', 'pr', 'pb', 'pl', 'px', 'py',
  'padding', 'paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft',
  // Margin props
  'm', 'mt', 'mr', 'mb', 'ml', 'mx', 'my',
  'margin', 'marginTop', 'marginRight', 'marginBottom', 'marginLeft',
  // Gap
  'gap',
  // Border radius
  'borderRadius', 'borderTopLeftRadius', 'borderTopRightRadius',
  'borderBottomLeftRadius', 'borderBottomRightRadius',
];

const COLOR_KEYS = [
  'color',
  'bg', 'backgroundColor',
  'borderColor', 'borderTopColor', 'borderRightColor',
  'borderBottomColor', 'borderLeftColor',
];

const OTHER_STYLE_KEYS = [
  'display',
  'flex',
  'flexDirection',
  'alignItems',
  'justifyContent',
  'textAlign',
  'border',
  'borderStyle',
  'borderWidth',
  'boxShadow',
];

const STYLE_KEYS = new Set<string>([
  ...SPACING_KEYS,
  ...COLOR_KEYS,
  ...OTHER_STYLE_KEYS,
]);

export const BpkBox = ({ children, ...props }: BpkBoxProps) => {
  // Process props to convert Backpack tokens and strip forbidden props like className.
  const processedProps = processBpkProps(props);

  const styleProps: Record<string, unknown> = {};
  const restProps: Record<string, unknown> = {};

  Object.entries(processedProps).forEach(([key, value]) => {
    if (STYLE_KEYS.has(key)) {
      styleProps[key] = value;
    } else {
      restProps[key] = value;
    }
  });

  const boxClassName = css(styleProps as any);

  return (
    <div
      data-bpk-component="bpk-box"
      className={cx('bpk-box', boxClassName)}
      {...restProps}
    >
      {children}
    </div>
  );
};

export type { BpkBoxProps };
