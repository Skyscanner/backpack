import PropTypes from 'prop-types';
import React from 'react';

import SideNavLayout from './../SideNavLayout';
import * as routes from './../../constants/routes';

const links = [
  {
    id: 'PATTERNS',
    category: 'Patterns',
    links: [
      { id: 'VERTICAL_RHYTHM', route: routes.VERTICAL_RHYTHM, children: 'Vertical rhythm' },
      { id: 'STATEFULNESS', route: routes.STATEFULNESS, children: 'Statefulness' },
      { id: 'UNITS', route: null, children: 'Units' },
      { id: 'ERROR_HANDLING', route: null, children: 'Error handling' },
      { id: 'DATA_ENTRY', route: null, children: 'Data entry' },
      { id: 'MESSAGIN', route: null, children: 'Messaging' },
      { id: 'TILES_AND_CARDS', route: null, children: 'Tiles and cards' },
      { id: 'TAP_TARGETS', route: null, children: 'Tap targets' },
    ],
  },
];

const PatternsLayout = ({ children, ...rest }) => <SideNavLayout links={links} {...rest}>{children}</SideNavLayout>;

PatternsLayout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default PatternsLayout;
