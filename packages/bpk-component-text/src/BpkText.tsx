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

import type { ReactNode } from 'react';

import { cssModules } from '../../bpk-react-utils';

import STYLES from './BpkText.module.scss';

const getClassName = cssModules(STYLES);

export const TEXT_STYLES = {
  xs: 'xs',
  sm: 'sm',
  base: 'base',
  lg: 'lg',
  xl: 'xl',
  xxl: 'xxl',
  xxxl: 'xxxl',
  xxxxl: 'xxxxl',
  xxxxxl: 'xxxxxl',
  caption: 'caption',
  footnote: 'footnote',
  label1: 'label-1',
  label2: 'label-2',
  label3: 'label-3',
  bodyDefault: 'body-default',
  bodyLongform: 'body-longform',
  subheading: 'subheading',
  heading1: 'heading-1',
  heading2: 'heading-2',
  heading3: 'heading-3',
  heading4: 'heading-4',
  heading5: 'heading-5',
  hero1: 'hero-1',
  hero2: 'hero-2',
  hero3: 'hero-3',
  hero4: 'hero-4',
  hero5: 'hero-5',
} as const;

export const WEIGHT_STYLES = {
  regular: 'regular',
  bold: 'bold',
  black: 'black',
} as const;

export type Weight = typeof WEIGHT_STYLES[keyof typeof WEIGHT_STYLES];
export type TextStyle = typeof TEXT_STYLES[keyof typeof TEXT_STYLES];
export type Tag =
  | 'span'
  | 'p'
  | 'text'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6';

type Props = {
  children: ReactNode;
  textStyle?: TextStyle;
  tagName?: Tag;
  className?: string | null;
  id?: string;
  /** @deprecated Use a different "textStyle" to achieve the desired weight. */
  bold?: boolean | null;
  /** @deprecated Use a different "textStyle" to achieve the desired weight. */
  weight?: Weight | null;
  [rest: string]: any;
};

const getWeight = (
  bold: boolean | null | undefined,
  weight: Weight | null | undefined,
  textStyle: TextStyle,
) => {
  if (bold || weight === WEIGHT_STYLES.bold) {
    return WEIGHT_STYLES.bold;
  }

  // Weight can only be black if textStyle is `xl`, `xxl` or `xxxl`.
  if (weight === WEIGHT_STYLES.black && textStyle.match(/^x+l$/)) {
    return WEIGHT_STYLES.black;
  }

  return null;
};

const BpkText = ({
  textStyle = TEXT_STYLES.bodyDefault,
  tagName: TagName = 'span',
  className = null,
  bold = null,
  weight = null,
  children,
  ...rest
}: Props) => {
  if (bold) {
    console.warn('Use a different "textStyle" to achieve the desired weight.');
  }
  if (weight) {
    console.warn('Use a different "textStyle" to achieve the desired weight.');
  }
  const validWeight = getWeight(bold, weight, textStyle);

  const classNames = getClassName(
    'bpk-text',
    `bpk-text--${textStyle}`,
    validWeight && `bpk-text--${validWeight}`,
    className,
  );

  return (
    <TagName className={classNames} {...rest}>
      {children}
    </TagName>
  );
};

export default BpkText;
