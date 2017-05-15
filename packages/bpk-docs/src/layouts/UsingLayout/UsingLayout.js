import PropTypes from 'prop-types';
import React from 'react';

import SideNavLayout from './../SideNavLayout';
import * as routes from './../../constants/routes';

const links = [
  {
    id: 'USING_BACKPACK',
    category: 'Using Backpack',
    links: [
      { id: 'GETTING_STARTED', route: routes.GETTING_STARTED, children: 'Getting started' },
      { id: 'BACKPACK_REACT_SCRIPTS', route: routes.BACKPACK_REACT_SCRIPTS, children: 'Backpack React Scripts' },
      { id: 'BASE_STYLESHEET', route: routes.BASE_STYLESHEET, children: 'Base stylesheet' },
    ],
  },
];

const UsingLayout = ({ children, ...rest }) => <SideNavLayout links={links} {...rest}>{children}</SideNavLayout>;

UsingLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default UsingLayout;
