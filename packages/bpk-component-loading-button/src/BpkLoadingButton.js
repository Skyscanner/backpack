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

/* @flow strict */

import PropTypes from 'prop-types';
import React, { type Node, type Element } from 'react';

import BpkButton from '../../bpk-component-button';
import { BpkSpinner, BpkLargeSpinner } from '../../bpk-component-spinner';
import {
  withButtonAlignment,
  withLargeButtonAlignment,
  withRtlSupport,
} from '../../bpk-component-icon';
import ArrowIconSm from '../../bpk-component-icon/sm/long-arrow-right';
import ArrowIconLg from '../../bpk-component-icon/lg/long-arrow-right';
import { cssModules } from '../../bpk-react-utils';

import STYLES from './BpkLoadingButton.module.scss';

const getClassName = cssModules(STYLES);

export const ICON_POSITION = {
  LEADING: 'leading',
  TRAILING: 'trailing',
};

const getPropsIcon = (props) => {
  const { disabled, icon, iconDisabled } = props;

  if (disabled) {
    return iconDisabled;
  }
  return icon;
};

const getSpinner = (large: boolean) =>
  large ? <BpkLargeSpinner alignToButton /> : <BpkSpinner alignToButton />;

const getEnabledIcon = (large: boolean) => {
  const AlignedIcon = large
    ? withLargeButtonAlignment(withRtlSupport(ArrowIconLg))
    : withButtonAlignment(withRtlSupport(ArrowIconSm));
  return <AlignedIcon />;
};

const getLoadingIcon = (props) => {
  const { iconLoading, large } = props;

  return iconLoading || getSpinner(large);
};

type LoadingProps = {
  children: Node,
  className: ?string,
  disabled: boolean,
  secondary: boolean,
  destructive: boolean,
  large: boolean,
  link: boolean,
  linkOnDark: boolean,
  loading: boolean,
  iconOnly: boolean,
  icon: ?Element<any>,
  iconPosition: string,
  iconDisabled: ?Element<any>,
  iconLoading: ?Element<any>,
};

const BpkLoadingButton = (props: LoadingProps) => {
  const {
    children,
    className,
    disabled,
    icon,
    iconDisabled,
    iconLoading,
    iconOnly,
    iconPosition,
    large,
    link,
    linkOnDark,
    loading,
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

  const classNames = getClassName(
    loading && 'bpk-loading-button',
    loading && (link || linkOnDark) && 'bpk-loading-button--link',
    className,
  );

  const iconClassNames = getClassName(
    'bpk-loading-button__icon',
    large && 'bpk-loading-button__icon--large',
    iconOnly &&
      (large
        ? 'bpk-loading-button__icon--large-icon-only'
        : 'bpk-loading-button__icon--icon-only'),
    (link || linkOnDark) && 'bpk-loading-button__icon--link',
  );

  return (
    // $FlowFixMe[cannot-spread-inexact] - inexact rest. See 'decisions/flowfixme.md'.
    <BpkButton
      iconOnly={iconOnly}
      disabled={showBtnDisabled}
      large={large}
      className={classNames}
      link={link}
      linkOnDark={linkOnDark}
      {...rest}
    >
      {loading && <span className={iconClassNames}>{loadingIcon}</span>}
      {child0}
      {child1}
      {child2}
    </BpkButton>
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
