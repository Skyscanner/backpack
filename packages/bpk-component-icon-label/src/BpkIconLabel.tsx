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
import { createContext, useContext } from 'react';

import {
  iconSizeSm,
  lineHeightBase,
  lineHeightSm,
} from '@skyscanner/bpk-foundations-web/tokens/base.es6';

import { withAlignment } from '../../bpk-component-icon';
import BpkText, { TEXT_STYLES } from '../../bpk-component-text';
import { cssModules } from '../../bpk-react-utils';

import type {
  BpkIconLabelContext,
  BpkIconLabelRootProps,
  BpkIconLabelIconProps,
  BpkIconLabelTextProps,
  BpkIconLabelType,
} from './common-types';
import type { TextStyle } from '../../bpk-component-text';

import STYLES from './BpkIconLabel.module.scss';

const getClassName = cssModules(STYLES);

/**
 * Label type constants for convenient usage.
 * Use this in your code instead of string literals.
 *
 * @example
 * <BpkIconLabel.Root type={LABEL_STYLE.label1}>
 *
 * Note: BpkIconLabelType in common-types.ts should be kept in sync with these values.
 */
export const LABEL_STYLE = {
  body: 'body',
  label1: 'label1',
  footnote: 'footnote',
} as const;

/**
 * Maps BpkIconLabel type to BpkText textStyle.
 */
const TYPE_TO_TEXT_STYLE_MAP: Record<BpkIconLabelType, TextStyle> = {
  body: TEXT_STYLES.bodyDefault,
  label1: TEXT_STYLES.label1,
  footnote: TEXT_STYLES.footnote,
};

/**
 * Maps BpkIconLabel type to line-height for icon alignment.
 * Icon should align vertically centered with the first line of text.
 */
const TYPE_TO_LINE_HEIGHT_MAP: Record<BpkIconLabelType, string> = {
  body: lineHeightBase,      // 1.5rem
  label1: lineHeightBase,    // 1.5rem
  footnote: lineHeightSm,    // 1.25rem
};

/**
 * Context for sharing configuration between parent and child components.
 */
export const IconLabelContext = createContext<BpkIconLabelContext>({
  type: LABEL_STYLE.body,
  onDark: false,
});

/**
 * BpkIconLabel.Root - Container component that provides context for child components.
 *
 * @example
 * <BpkIconLabel.Root type="body" onDark={false}>
 *   <BpkIconLabel.Icon><InformationCircleIcon /></BpkIconLabel.Icon>
 *   <BpkIconLabel.Text>Information text</BpkIconLabel.Text>
 * </BpkIconLabel.Root>
 *
 * @returns {JSX.Element} The icon label root container with context provider.
 */
export const BpkIconLabelRoot = ({
  children,
  className = null,
  onDark = false,
  type = LABEL_STYLE.body,
  ...rest
}: BpkIconLabelRootProps) => {
  const classNames = getClassName(
    'bpk-icon-label',
    onDark && 'bpk-icon-label--on-dark',
    className,
  );

  return (
    <IconLabelContext.Provider value={{ type, onDark }}>
      <div className={classNames} {...rest}>
        {children}
      </div>
    </IconLabelContext.Provider>
  );
};

/**
 * BpkIconLabel.Icon - Icon display component using asChild pattern.
 * Uses withAlignment HOC to vertically center icon with first line of text.
 *
 * @example
 * <BpkIconLabel.Icon>
 *   <InformationCircleIcon />
 * </BpkIconLabel.Icon>
 *
 * @returns {JSX.Element} The icon element to be rendered inside the label.
 */
export const BpkIconLabelIcon = ({
  asChild = true,
  children,
  className = null,
  ...rest
}: BpkIconLabelIconProps) => {
  const { onDark, type } = useContext(IconLabelContext);

  const classNames = getClassName(
    'bpk-icon-label__icon',
    onDark && 'bpk-icon-label__icon--on-dark',
    className,
  );

  // Get line-height for the current type to align icon with first line of text
  const lineHeight = TYPE_TO_LINE_HEIGHT_MAP[type];

  // Apply withAlignment to align icon vertically centered with text's first line
  // objectHeight = text line-height, subjectHeight = icon size (1rem)
  const AlignedIcon = withAlignment(
    ({ children: iconChildren }: { children: ReactNode }) => (
      <span className={classNames} aria-hidden="true" {...rest}>
        {asChild ? iconChildren : <span>{iconChildren}</span>}
      </span>
    ),
    lineHeight,
    iconSizeSm,
  );

  return <AlignedIcon>{children}</AlignedIcon>;
};

/**
 * BpkIconLabel.Text - Text label component that wraps BpkText.
 * Supports inline BpkLink elements as children.
 *
 * @example
 * <BpkIconLabel.Text>
 *   Information text with <BpkLink href="/learn">inline link</BpkLink>
 * </BpkIconLabel.Text>
 *
 * @returns {JSX.Element} The text label element to be rendered inside the icon label.
 */
export const BpkIconLabelText = ({
  children,
  className = null,
  ...rest
}: BpkIconLabelTextProps) => {
  const { onDark, type } = useContext(IconLabelContext);

  const textStyle = TYPE_TO_TEXT_STYLE_MAP[type];

  const classNames = getClassName(
    'bpk-icon-label__text',
    onDark && 'bpk-icon-label__text--on-dark',
    className,
  );

  return (
    <BpkText
      textStyle={textStyle}
      tagName="span"
      // eslint-disable-next-line @skyscanner/rules/forbid-component-props
      className={classNames}
      {...rest}
    >
      {children}
    </BpkText>
  );
};

/**
 * BpkIconLabel - Compound component for displaying an icon alongside text with optional inline links.
 *
 * Supports three typography variants (body, label1, footnote) and two colour schemes (default, on-dark).
 *
 * This component uses BpkText for text rendering and accepts BpkLink as children.
 *
 * @example
 * // Compound component usage
 * <BpkIconLabel.Root type="body" style="default">
 *   <BpkIconLabel.Icon><InformationCircleIcon /></BpkIconLabel.Icon>
 *   <BpkIconLabel.Text>
 *     Check your details. <BpkLink href="/help">Need help?</BpkLink>
 *   </BpkIconLabel.Text>
 * </BpkIconLabel.Root>
 */
const BpkIconLabel = Object.assign(
  // Main component placeholder (could be convenience API in future)
  BpkIconLabelRoot,
  // Compound component API
  {
    Root: BpkIconLabelRoot,
    Icon: BpkIconLabelIcon,
    Text: BpkIconLabelText,
  },
);

export default BpkIconLabel;
