import React from 'react';
import PropTypes from 'prop-types';
import MenuIcon from 'bpk-component-icon/sm/menu';
import CloseIcon from 'bpk-component-icon/sm/close';
import { withButtonAlignment } from 'bpk-component-icon';

import './HamburgerButton.scss';

const CloseButtonIcon = withButtonAlignment(CloseIcon);
const MenuButtonIcon = withButtonAlignment(MenuIcon);

const HamburgerButton = (props) => {
  const classNames = ['bpkdocs-hamburger-button'];
  const { expanded, onClick, className, ...rest } = props;

  if (className) { classNames.push(className); }

  return (
    <button
      type="button"
      onClick={onClick}
      className={classNames.join(' ')}
      aria-expanded={expanded}
      aria-controls="menu-list"
      aria-label={expanded ? 'Close menu' : 'Open menu'}
      {...rest}
    >
      {expanded ? <CloseButtonIcon /> : <MenuButtonIcon />}
    </button>
  );
};

HamburgerButton.propTypes = {
  expanded: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
};

HamburgerButton.defaultProps = {
  className: null,
};

export default HamburgerButton;
