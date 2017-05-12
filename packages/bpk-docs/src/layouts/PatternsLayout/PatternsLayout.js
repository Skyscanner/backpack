import PropTypes from 'prop-types';
import React from 'react';

import SideNavLayout from './../SideNavLayout';
import * as routes from './../../constants/routes';

const links = [
  {
    category: 'Patterns',
    links: [
      { route: routes.VERTICAL_RHYTHM, children: 'Vertical rhythm' },
      { route: routes.STATEFULNESS, children: 'Statefulness' },
      { route: null, children: 'Units' },
      { route: null, children: 'Error handling' },
      { route: null, children: 'Data entry' },
      { route: null, children: 'Messaging' },
      { route: null, children: 'Tiles and cards' },
      { route: null, children: 'Tap targets' },
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
