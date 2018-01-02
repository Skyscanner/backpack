/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2018 Skyscanner Ltd
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
import React from 'react';
import BpkButton from 'bpk-component-button';

import { BpkSpinner, BpkLargeSpinner } from 'bpk-component-spinner';
import {
  withButtonAlignment,
  withLargeButtonAlignment,
  withRtlSupport,
} from 'bpk-component-icon';
import ArrowIconSm from 'bpk-component-icon/sm/long-arrow-right';
import ArrowIconLg from 'bpk-component-icon/lg/long-arrow-right';

const getPropsIcon = props => {
  const {
    disabled,
    loading,
    selected,
    icon,
    iconSelected,
    iconDisabled,
    iconLoading,
  } = props;

  if (loading) {
    return iconLoading;
  } else if (disabled) {
    return iconDisabled;
  } else if (selected) {
    return iconSelected;
  }
  return icon;
};

const getSpinner = large =>
  large ? <BpkLargeSpinner alignToButton /> : <BpkSpinner alignToButton />;

const getEnabledIcon = large => {
  const AlignedIcon = large
    ? withLargeButtonAlignment(withRtlSupport(ArrowIconLg))
    : withButtonAlignment(withRtlSupport(ArrowIconSm));
  return <AlignedIcon />;
};

const getDefaultIcon = props => {
  const { loading, large } = props;

  if (loading) {
    return getSpinner(large);
  }
  return getEnabledIcon(large);
};

const BpkLoadingButton = props => {
  const {
    children,
    disabled,
    loading,
    iconOnly,
    icon,
    iconSelected,
    iconDisabled,
    iconLoading,
    ...rest
  } = props;

  const showBtnDisabled = disabled || loading;

  const spacer = iconOnly ? '' : '\u00A0';
  const buttonIcon = getPropsIcon(props) || getDefaultIcon(props);

  return (
    <BpkButton iconOnly={iconOnly} disabled={showBtnDisabled} {...rest}>
      {children}
      {spacer}
      {buttonIcon}
    </BpkButton>
  );
};

BpkLoadingButton.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  secondary: PropTypes.bool,
  selected: PropTypes.bool,
  destructive: PropTypes.bool,
  link: PropTypes.bool,
  loading: PropTypes.bool,
  iconOnly: PropTypes.bool,
  icon: PropTypes.element,
  iconSelected: PropTypes.element,
  iconDisabled: PropTypes.element,
  iconLoading: PropTypes.element,
};

BpkLoadingButton.defaultProps = {
  className: null,
  disabled: false,
  secondary: false,
  selected: false,
  destructive: false,
  link: false,
  loading: false,
  iconOnly: false,
  icon: null,
  iconSelected: null,
  iconDisabled: null,
  iconLoading: null,
};

export default BpkLoadingButton;
