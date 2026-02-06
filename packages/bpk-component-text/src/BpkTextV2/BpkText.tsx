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
import { createContext, useContext, useEffect, useState, Children } from 'react';

import { cssModules } from '../../../bpk-react-utils';

import STYLES from './BpkText.module.scss';

const getClassName = cssModules(STYLES);

type BpkTextContextType = {
  hasLeadingIcon: boolean;
  hasTrailingIcon: boolean;
  setHasLeadingIcon: (value: boolean) => void;
  setHasTrailingIcon: (value: boolean) => void;
};

const BpkTextContext = createContext<BpkTextContextType>({
  hasLeadingIcon: false,
  hasTrailingIcon: false,
  setHasLeadingIcon: () => {},
  setHasTrailingIcon: () => {},
});

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
  hero6: 'hero-6',
  editorial1: 'editorial-1',
  editorial2: 'editorial-2',
  editorial3: 'editorial-3',
} as const;

export const TEXT_COLORS = {
  textDisabled: 'text-disabled',
  textDisabledOnDark: 'text-disabled-on-dark',
  textError: 'text-error',
  textHero: 'text-hero',
  textLink: 'text-link',
  textOnDark: 'text-on-dark',
  textOnLight: 'text-on-light',
  textPrimary: 'text-primary',
  textPrimaryInverse: 'text-primary-inverse',
  textSecondary: 'text-secondary',
  textSuccess: 'text-success',
} as const;

export type TextColor = (typeof TEXT_COLORS)[keyof typeof TEXT_COLORS];
export type TextStyle = (typeof TEXT_STYLES)[keyof typeof TEXT_STYLES];
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
  color?: TextColor | null;
  accessibilityLabel?: string;
  id?: string;
  [rest: string]: any;
};

type IconProps = {
  children: ReactNode;
  className?: string | null;
};

const BpkText = ({
  accessibilityLabel,
  children,
  className = null,
  color = null,
  tagName: TagName = 'span',
  textStyle = TEXT_STYLES.bodyDefault,
  ...rest
}: Props) => {
  const [hasLeadingIcon, setHasLeadingIcon] = useState(false);
  const [hasTrailingIcon, setHasTrailingIcon] = useState(false);

  // Check if there's text content (non-icon children)
  const hasTextContent = Children.toArray(children).some(
    (child) => typeof child === 'string' || typeof child === 'number',
  );

  const hasIcons = hasLeadingIcon || hasTrailingIcon;
  const isIconOnly = hasIcons && !hasTextContent;

  const classNames = getClassName(
    'bpk-text',
    `bpk-text--${textStyle}`,
    color ? `bpk-text--${color}` : '',
    hasIcons && 'bpk-text--with-icons',
    isIconOnly && 'bpk-text--icon-only',
    className,
  );

  const contextValue = {
    hasLeadingIcon,
    hasTrailingIcon,
    setHasLeadingIcon,
    setHasTrailingIcon,
  };

  // For icon-only mode with span/text tags, we need role="img" to use aria-label
  const needsRole = isIconOnly && (TagName === 'span' || TagName === 'text');
  const ariaProps = isIconOnly
    ? {
        'aria-label': accessibilityLabel,
        title: accessibilityLabel,
        ...(needsRole && { role: 'img' }),
      }
    : {};

  return (
    <BpkTextContext.Provider value={contextValue}>
      <TagName
        // eslint-disable-next-line @skyscanner/rules/forbid-component-props
        className={classNames}
        {...ariaProps}
        {...rest}
      >
        {children}
      </TagName>
    </BpkTextContext.Provider>
  );
};

const LeadingIcon = ({ children, className = null }: IconProps) => {
  const { setHasLeadingIcon } = useContext(BpkTextContext);

  useEffect(() => {
    setHasLeadingIcon(true);
    return () => setHasLeadingIcon(false);
  }, [setHasLeadingIcon]);

  return (
    <span className={getClassName('bpk-text__leading-icon', className)}>
      {children}
    </span>
  );
};

const TrailingIcon = ({ children, className = null }: IconProps) => {
  const { setHasTrailingIcon } = useContext(BpkTextContext);

  useEffect(() => {
    setHasTrailingIcon(true);
    return () => setHasTrailingIcon(false);
  }, [setHasTrailingIcon]);

  return (
    <span className={getClassName('bpk-text__trailing-icon', className)}>
      {children}
    </span>
  );
};

const Content = ({ children }: { children: ReactNode }) => <>{children}</>;

BpkText.LeadingIcon = LeadingIcon;
BpkText.TrailingIcon = TrailingIcon;
BpkText.Content = Content;

export default BpkText;
