import PropTypes from 'prop-types';
import React from 'react';

import SideNavLayout from './../SideNavLayout';
import * as routes from './../../constants/routes';

const links = [
  {
    id: 'BONDS',
    category: 'Bonds',
    links: [
      { id: 'COLORS', route: routes.COLORS, children: 'Colors' },
      { id: 'TYPESETTING', route: routes.TYPESETTING, children: 'Typesetting' },
      { id: 'LAYOUT', route: routes.LAYOUT, children: 'Layout' },
      { id: 'RADII', route: routes.RADII, children: 'Radii' },
      { id: 'SHADOWS', route: routes.SHADOWS, children: 'Shadows' },
      { id: 'BORDERS', route: routes.BORDERS, children: 'Borders' },
      { id: 'ANIMATION', route: routes.ANIMATION, children: 'Animation' },
    ],
  },
  {
    id: 'ATOMS',
    category: 'Atoms',
    links: [
      { id: 'TYPOGRAPHY', route: routes.TYPOGRAPHY, children: 'Typography' },
      { id: 'BUTTONS', route: routes.BUTTONS, children: 'Buttons' },
      { id: 'ICONS', route: routes.ICONS, children: 'Icons' },
      { id: 'SPINNERS', route: routes.SPINNERS, children: 'Spinners' },
      { id: 'FORMS', route: routes.FORMS, children: 'Forms' },
      { id: 'CARDS', route: routes.CARDS, children: 'Cards' },
      { id: 'BADGE', route: routes.BADGE, children: 'Badge' },
      { id: 'PANELS', route: routes.PANELS, children: 'Panels' },
      { id: 'ILLUSTRATIONS', route: null, children: 'Illustrations' },
      { id: 'IMAGES', route: null, children: 'Image' },
    ],
  },
  {
    id: 'MOLECULES',
    category: 'Molecules',
    links: [
      { id: 'NOTIFICATIONS', route: routes.NOTIFICATIONS, children: 'Notifications' },
      { id: 'MODALS', route: routes.MODALS, children: 'Modals' },
      { id: 'AUTOSUGGEST', route: routes.AUTOSUGGEST, children: 'Autosuggest' },
      { id: 'POPOVERS', route: routes.POPOVERS, children: 'Popovers' },
      { id: 'CALENDAR', route: routes.CALENDAR, children: 'Calendar' },
      { id: 'DATEPICKER', route: routes.DATEPICKER, children: 'Datepicker' },
      { id: 'TOOLTIPS', route: routes.TOOLTIPS, children: 'Tooltips' },
      { id: 'ACCORDIONS', route: routes.ACCORDIONS, children: 'Accordions' },
      { id: 'NUDGERS', route: routes.NUDGERS, children: 'Nudgers' },
      { id: 'PROGRESS', route: routes.PROGRESS, children: 'Progress bars' },
      { id: 'TICKETS', route: routes.TICKETS, children: 'Tickets' },
      { id: 'HORIZONTAL_NAV', route: routes.HORIZONTAL_NAV, children: 'Horizontal navigation' },
      { id: 'FIELDSETS', route: routes.FIELDSETS, children: 'Fieldsets' },
      { id: 'STAR_RATINGS', route: routes.STAR_RATING, children: 'Star rating' },
      { id: 'BAR_CHARTS', route: routes.BARCHARTS, children: 'Bar charts' },
      { id: 'PAGINATION', route: null, children: 'Pagination' },
      { id: 'SLIDERS', route: null, children: 'Slider' },
      { id: 'CAROUSELS', route: null, children: 'Carousel' },
      { id: 'TOASTS', route: null, children: 'Toast' },
      { id: 'VERTICAL_NAV', route: null, children: 'Vertical navigation' },
      { id: 'OVERFLOW_NAV', route: null, children: 'Overflow navigation' },
      { id: 'BREADCRUMBS', route: null, children: 'Breadcrumbs' },
      { id: 'NUMERICAL_RATING', route: null, children: 'Numerical rating' },
      { id: 'FLIGHT_ITINERARIES', route: null, children: 'Flight itinerary' },
      { id: 'FILTERS', route: null, children: 'Filters' },
    ],
  },
];

const DocsLayout = ({ children, ...rest }) => <SideNavLayout links={links} {...rest}>{children}</SideNavLayout>;

DocsLayout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default DocsLayout;
