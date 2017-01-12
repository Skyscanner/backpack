import React, { PropTypes } from 'react';
import CloseIcon from 'bpk-component-icon/sm/close';
import { withButtonAlignment } from 'bpk-component-icon';

import './bpk-close-button.scss';

const CloseButtonIcon = withButtonAlignment(CloseIcon);

const BpkCloseButton = (props) => {
  const classNames = ['bpk-close-button'];
  const { label, onClick, className, ...rest } = props;

  if (className) { classNames.push(className); }

  return (
    <button
      type="button"
      title={label}
      onClick={onClick}
      aria-label={label}
      className={classNames.join(' ')}
      {...rest}
    >
      <CloseButtonIcon className="bpk-close-button__icon" />
    </button>
  );
};

BpkCloseButton.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
};

BpkCloseButton.defaultProps = {
  className: null,
};

export default BpkCloseButton;
