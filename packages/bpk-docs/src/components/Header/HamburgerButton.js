import React from 'react';
import PropTypes from 'prop-types';
import MenuIcon from 'bpk-component-icon/sm/menu';
import CloseIcon from 'bpk-component-icon/sm/close';
import { withButtonAlignment } from 'bpk-component-icon';

import './HamburgerButton.scss';

const CloseButtonIcon = withButtonAlignment(CloseIcon);
const MenuButtonIcon = withButtonAlignment(MenuIcon);

const HamburgerButton = ({ expanded, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className="bpkdocs-hamburger-button"
    aria-expanded={expanded}
    aria-controls="menu-list"
    aria-label={expanded ? 'Close menu' : 'Open menu'}
  >
    {expanded ? <CloseButtonIcon /> : <MenuButtonIcon />}
  </button>
);

HamburgerButton.propTypes = {
  expanded: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default HamburgerButton;
