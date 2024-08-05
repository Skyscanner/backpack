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

import { BUTTON_TYPES, BpkButtonV2, SIZE_TYPES } from '../../bpk-component-button';
import type { Props as ButtonProps } from '../../bpk-component-button/src/BpkButtonV2/common-types';
import {
  withButtonAlignment,
  withLargeButtonAlignment,
  withRtlSupport,
} from '../../bpk-component-icon';
import ArrowIconLg from '../../bpk-component-icon/lg/long-arrow-right';
import ArrowIconSm from '../../bpk-component-icon/sm/long-arrow-right';
import { BpkSpinner, BpkLargeSpinner } from '../../bpk-component-spinner';
import { cssModules } from '../../bpk-react-utils';

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
  loading: boolean,
  iconOnly: boolean,
  icon?: ReactElement<any>,
  iconPosition: string,
  iconDisabled?: ReactElement<any>,
  iconLoading?: ReactElement<any>,
} & ButtonProps;

const BpkLoadingButton = (props: LoadingProps) => {
  const {
    children,
    destructive,
    disabled,
    featured,
    icon,
    iconDisabled,
    iconLoading,
    iconOnly,
    iconPosition,
    large,
    link,
    linkOnDark,
    loading,
    primaryOnDark,
    primaryOnLight,
    secondary,
    secondaryOnDark,
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
    <BpkButtonV2
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
    </BpkButtonV2>
  );
};

BpkLoadingButton.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  secondary: PropTypes.bool,
  destructive: PropTypes.bool,
  link: PropTypes.bool,
  linkOnDark: PropTypes.bool,
  loading: PropTypes.bool,
  iconOnly: PropTypes.bool,
  icon: PropTypes.element,
  iconPosition: PropTypes.oneOf([
    ICON_POSITION.LEADING,
    ICON_POSITION.TRAILING,
  ]),
  iconDisabled: PropTypes.element,
  iconLoading: PropTypes.element,
};

BpkLoadingButton.defaultProps = {
  className: null,
  disabled: false,
  secondary: false,
  destructive: false,
  large: false,
  link: false,
  linkOnDark: false,
  loading: false,
  iconOnly: false,
  icon: null,
  iconPosition: ICON_POSITION.TRAILING,
  iconDisabled: null,
  iconLoading: null,
};

export default BpkLoadingButton;
