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
import type { BpkFlexProps } from './types';

const SPACING_KEYS = [
  'p', 'pt', 'pr', 'pb', 'pl', 'px', 'py',
  'padding', 'paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft',
  'm', 'mt', 'mr', 'mb', 'ml', 'mx', 'my',
  'margin', 'marginTop', 'marginRight', 'marginBottom', 'marginLeft',
  'gap',
  'borderRadius', 'borderTopLeftRadius', 'borderTopRightRadius',
  'borderBottomLeftRadius', 'borderBottomRightRadius',
];

const COLOR_KEYS = [
  'color',
  'bg', 'backgroundColor',
  'borderColor', 'borderTopColor', 'borderRightColor',
  'borderBottomColor', 'borderLeftColor',
];

const FLEX_KEYS = [
  'display',
  'flex',
  'flexDirection',
  'flexWrap',
  'alignItems',
  'justifyContent',
  'textAlign',
  'border',
  'borderStyle',
  'borderWidth',
  'boxShadow',
];

const STYLE_KEYS = new Set([
  ...SPACING_KEYS,
  ...COLOR_KEYS,
  ...FLEX_KEYS,
]);

export const BpkFlex = ({ children, ...props }: BpkFlexProps) => {
  const processedProps = processBpkProps(props);

  const styleProps: Record<string, unknown> = { display: 'flex' };
  const restProps: Record<string, unknown> = {};

  Object.entries(processedProps).forEach(([key, value]) => {
    if (STYLE_KEYS.has(key)) {
      styleProps[key] = value;
    } else {
      restProps[key] = value;
    }
  });

  const className = css(styleProps as any);

  return (
    <div
      data-bpk-component="bpk-flex"
      className={cx('bpk-flex', className)}
      {...restProps}
    >
      {children}
    </div>
  );
};

export type { BpkFlexProps };
