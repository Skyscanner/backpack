import PropTypes from 'prop-types';
import React from 'react';
import BpkButton from 'bpk-component-button';

import { BpkSpinner, BpkLargeSpinner } from 'bpk-component-spinner';
import { withButtonAlignment, withLargeButtonAlignment, withRtlSupport } from 'bpk-component-icon';
import ArrowIconSm from 'bpk-component-icon/sm/long-arrow-right';
import ArrowIconLg from 'bpk-component-icon/lg/long-arrow-right';

import './bpk-loading-button.scss';

const getPropsIcon = (props) => {
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

const getSpinner = large => (
  large ?
    <BpkLargeSpinner alignToButton /> :
    <BpkSpinner alignToButton />
);

const getEnabledIcon = (large) => {
  const AlignedIcon = large ?
    withLargeButtonAlignment(withRtlSupport(ArrowIconLg)) :
    withButtonAlignment(withRtlSupport(ArrowIconSm));
  return <AlignedIcon />;
};

const getDefaultIcon = (props) => {
  const {
    loading,
    large,
  } = props;

  if (loading) {
    return getSpinner(large);
  }
  return getEnabledIcon(large);
};

const BpkLoadingButton = (props) => {
  const {
    children,
    className,
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

  const classNames = ['bpk-loading-button'];
  if (className) { classNames.push(className); }

  const spacer = (iconOnly) ? '' : '\u00A0';
  const buttonIcon = getPropsIcon(props) || getDefaultIcon(props);

  return (
    <BpkButton
      iconOnly={iconOnly}
      disabled={showBtnDisabled}
      className={classNames.join(' ')}
      {...rest}
    >
      {children}{spacer}{buttonIcon}
    </BpkButton>
  );
};

BpkLoadingButton.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  disabled: PropTypes.bool,
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
  loading: false,
  iconOnly: false,
  icon: null,
  iconSelected: null,
  iconDisabled: null,
  iconLoading: null,
};

export default BpkLoadingButton;
