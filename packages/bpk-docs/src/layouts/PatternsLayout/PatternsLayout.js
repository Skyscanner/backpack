import React, { PropTypes } from 'react';

import SideNavLayout from './../SideNavLayout';
import * as routes from './../../constants/routes';

const links = [
  {
    category: 'Patterns',
    links: [
      { route: routes.VERTICAL_RHYTHM, children: 'Vertical rhythm' },
      { route: routes.UNITS, children: 'Units' },
      { route: routes.STATEFULNESS, children: 'Statefulness' },
      { route: null, children: 'Error handling' },
      { route: null, children: 'Data entry' },
      { route: null, children: 'Messaging' },
      { route: null, children: 'Tap targets' },
    ],
  },
];

const PatternsLayout = ({ children }) => <SideNavLayout links={links}>{children}</SideNavLayout>;

PatternsLayout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default PatternsLayout;
