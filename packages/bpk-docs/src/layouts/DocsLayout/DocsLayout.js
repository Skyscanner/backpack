import React, { PropTypes } from 'react';

import SideNavLayout from './../SideNavLayout';
import * as routes from './../../constants/routes';

const links = [
  {
    category: 'Introduction',
    links: [
      { route: routes.GETTING_STARTED, children: 'Getting started' },
      { route: routes.BACKPACK_REACT_SCRIPTS, children: 'Backpack React Scripts' },
      { route: routes.BASE_STYLESHEET, children: 'Base stylesheet' },
      { route: routes.CONTRIBUTING, children: 'Contributing' },
    ],
  },
  {
    category: 'Bonds',
    links: [
      { route: routes.COLORS, children: 'Colors' },
      { route: routes.TYPESETTING, children: 'Typesetting' },
      { route: routes.LAYOUT, children: 'Layout' },
      { route: routes.RADII, children: 'Radii' },
      { route: routes.SHADOWS, children: 'Shadows' },
      { route: routes.ANIMATION, children: 'Animation' },
    ],
  },
  {
    category: 'Atoms',
    links: [
      { route: routes.TYPOGRAPHY, children: 'Typography' },
      { route: routes.BUTTONS, children: 'Buttons' },
      { route: routes.ICONS, children: 'Icons' },
      { route: routes.SPINNERS, children: 'Spinners' },
      { route: routes.LOGOS, children: 'Logos' },
      { route: routes.FORMS, children: 'Forms' },
      { route: routes.CARDS, children: 'Cards' },
      { route: null, children: 'Illustrations' },
      { route: null, children: 'Image' },
      { route: null, children: 'Tabs' },
      { route: null, children: 'Badges' },
    ],
  },
  {
    category: 'Molecules',
    links: [
      { route: routes.NOTIFICATIONS, children: 'Notifications' },
      { route: routes.MODALS, children: 'Modals' },
      { route: routes.AUTOSUGGEST, children: 'Autosuggest' },
      { route: null, children: 'Popover' },
      { route: null, children: 'Tooltip' },
      { route: null, children: 'Pagination' },
      { route: null, children: 'Calendar' },
      { route: null, children: 'Nudgers' },
      { route: null, children: 'Slider' },
      { route: null, children: 'Accordion' },
      { route: null, children: 'Carousel' },
      { route: null, children: 'Toast' },
      { route: null, children: 'Primary navigation' },
      { route: null, children: 'Secondary navigation' },
      { route: null, children: 'Hamburger navigation' },
      { route: null, children: 'Breadcrumbs' },
      { route: null, children: 'Numerical rating' },
      { route: null, children: 'Star rating' },
      { route: null, children: 'Flight itinerary' },
      { route: null, children: 'Datepicker' },
      { route: null, children: 'Bar chart' },
      { route: null, children: 'Filters' },
    ],
  },
];

const DocsLayout = ({ children }) => <SideNavLayout links={links}>{children}</SideNavLayout>;

DocsLayout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default DocsLayout;
