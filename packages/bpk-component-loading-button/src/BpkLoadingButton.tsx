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

import PropTypes from 'prop-types';
import type { ReactElement, ReactNode } from 'react';

import BpkButton, { BUTTON_TYPES, SIZE_TYPES } from '../../bpk-component-button';
import {
  withButtonAlignment,
  withLargeButtonAlignment,
  withRtlSupport,
} from '../../bpk-component-icon';
import ArrowIconLg from '../../bpk-component-icon/lg/long-arrow-right';
import ArrowIconSm from '../../bpk-component-icon/sm/long-arrow-right';
import { BpkSpinner, BpkLargeSpinner } from '../../bpk-component-spinner';
import { cssModules , getDataComponentAttribute } from '../../bpk-react-utils';

import type { Props as ButtonProps } from '../../bpk-component-button';

import STYLES from './BpkLoadingButton.module.scss';

const getClassName = cssModules(STYLES);

export const ICON_POSITION = {
  LEADING: 'leading',
  TRAILING: 'trailing',
};

const getPropsIcon = (props: LoadingProps) => {
  const { disabled, icon, iconDisabled } = props;

  if (disabled) {
    return iconDisabled;
  }
  return icon;
};

const getSpinner = (large: boolean | undefined) =>
  large ? <BpkLargeSpinner alignToButton /> : <BpkSpinner alignToButton />;

const getEnabledIcon = (large: boolean | undefined) => {
  const AlignedIcon = large
    ? withLargeButtonAlignment(withRtlSupport(ArrowIconLg))
    : withButtonAlignment(withRtlSupport(ArrowIconSm));
  return <AlignedIcon />;
};

const getLoadingIcon = (props: LoadingProps) => {
  const { iconLoading, large } = props;

  return iconLoading || getSpinner(large);
};

type LoadingProps = {
  featured?: boolean;
  secondaryOnDark?: boolean;
  primaryOnLight?: boolean;
  primaryOnDark?: boolean;
  children: ReactNode,
  className?: string,
  disabled?: boolean,
  secondary?: boolean,
  destructive?: boolean,
  large?: boolean,
  link?: boolean,
  linkOnDark?: boolean,
  loading?: boolean,
  iconOnly?: boolean,
  icon?: ReactElement<any>,
  iconPosition?: (typeof ICON_POSITION)[keyof typeof ICON_POSITION],
  iconDisabled?: ReactElement<any>,
  iconLoading?: ReactElement<any>,
} & ButtonProps;

const BpkLoadingButton = (props: LoadingProps) => {
  const {
    children,
    destructive = false,
    disabled = false,
    featured = false,
    icon,
    iconDisabled,
    iconLoading,
    iconOnly = false,
    iconPosition = ICON_POSITION.TRAILING,
    large = false,
    link = false,
    linkOnDark = false,
    loading = false,
    primaryOnDark = false,
    primaryOnLight = false,
    secondary = false,
    secondaryOnDark = false,
    ...rest
  } = props;

  const showBtnDisabled = disabled || loading;

  const spacer = iconOnly ? '' : '\u00A0';
  const buttonIcon = getPropsIcon(props) || getEnabledIcon(large);

  const [child0, child1, child2] =
    iconPosition === ICON_POSITION.LEADING
      ? [buttonIcon, spacer, children]
      : [children, spacer, buttonIcon];

  const loadingIcon = getLoadingIcon(props);

  const iconClassNames = getClassName(
    'bpk-loading-button__icon',
  );

  type ButtonType = typeof BUTTON_TYPES[keyof typeof BUTTON_TYPES]
  let type: ButtonType = BUTTON_TYPES.primary;
  if(link) {type = BUTTON_TYPES.link}
  if(linkOnDark) {type = BUTTON_TYPES.linkOnDark}
  if(featured) {type = BUTTON_TYPES.featured}
  if(destructive) {type = BUTTON_TYPES.destructive}
  if(secondaryOnDark) {type = BUTTON_TYPES.secondaryOnDark}
  if(secondary) {type = BUTTON_TYPES.secondary}
  if(primaryOnLight) {type = BUTTON_TYPES.primaryOnLight}
  if(primaryOnDark) {type = BUTTON_TYPES.primaryOnDark}

  return (
    <BpkButton
      iconOnly={iconOnly}
      disabled={showBtnDisabled}
      size={large ? SIZE_TYPES.large : SIZE_TYPES.small}
      type={type}
      {...rest}
    >
      <div className={getClassName('bpk-loading-button__container')}>
        {loading && <span className={iconClassNames}>{loadingIcon}</span>}
        <div className={getClassName(loading ? "bpk-loading-button--hidden": "bpk-loading-button--visible")}>
          {child0}
          {child1}
          {child2}
        </div>
      </div>
    </BpkButton>
  );
};

export default BpkLoadingButton;
