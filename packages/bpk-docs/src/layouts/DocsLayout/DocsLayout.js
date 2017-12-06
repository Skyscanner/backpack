/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2017 Skyscanner Ltd
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import PropTypes from 'prop-types';
import React from 'react';

import SideNavLayout from './../SideNavLayout';
import * as routes from './../../constants/routes';

const links = [
  {
    id: 'COMPONENTS',
    category: 'Web components',
    sort: true,
    links: [
      { id: 'TYPOGRAPHY', route: routes.TYPOGRAPHY, children: 'Typography' },
      { id: 'BUTTONS', route: routes.BUTTONS, children: 'Buttons' },
      { id: 'ICONS', route: routes.ICONS, children: 'Icons' },
      { id: 'SPINNERS', route: routes.SPINNERS, children: 'Spinners' },
      { id: 'FORMS', route: routes.FORMS, children: 'Forms' },
      { id: 'CARDS', route: routes.CARDS, children: 'Cards' },
      { id: 'CHIPS', route: routes.CHIPS, children: 'Chips' },
      { id: 'BADGE', route: routes.BADGE, children: 'Badge' },
      { id: 'PANELS', route: routes.PANELS, children: 'Panels' },
      { id: 'IMAGES', route: routes.IMAGES, children: 'Images' },
      { id: 'BANNER_ALERTS', route: routes.BANNER_ALERTS, children: 'Banner alerts' },
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
      { id: 'SLIDERS', route: routes.SLIDERS, children: 'Sliders' },
      { id: 'DRAWER', route: routes.DRAWER, children: 'Drawer' },
      { id: 'PAGINATION', route: null, children: 'Pagination' },
      { id: 'CAROUSELS', route: null, children: 'Carousel' },
      { id: 'TOASTS', route: null, children: 'Toast' },
      { id: 'VERTICAL_NAV', route: null, children: 'Vertical navigation' },
      { id: 'OVERFLOW_NAV', route: null, children: 'Overflow navigation' },
      { id: 'BREADCRUMBS', route: null, children: 'Breadcrumbs' },
      { id: 'NUMERICAL_RATING', route: null, children: 'Numerical rating' },
      { id: 'FLIGHT_ITINERARIES', route: null, children: 'Flight itinerary' },
      { id: 'DIALOGS', route: null, children: 'Dialogs' },
      { id: 'BREAKPOINTS', route: routes.BREAKPOINTS, children: 'Breakpoints' },
      { id: 'HORIZONTAL_GRID', route: routes.HORIZONTAL_GRID, children: 'Horizontal grid' },
    ],
  },
  {
    id: 'NATIVE',
    category: 'Native components',
    sort: true,
    links: [
      { id: 'NATIVE_BANNER_ALERT', route: routes.NATIVE_BANNER_ALERT, children: 'Banner alerts' },
      { id: 'NATIVE_BUTTON', route: routes.NATIVE_BUTTON, children: 'Button' },
      { id: 'NATIVE_CARDS', route: routes.NATIVE_CARDS, children: 'Cards' },
      { id: 'NATIVE_HORIZONTAL_NAV', route: routes.NATIVE_HORIZONTAL_NAV, children: 'Horizontal navigation' },
      { id: 'NATIVE_ICONS', route: routes.NATIVE_ICONS, children: 'Icons' },
      { id: 'NATIVE_INPUT', route: routes.NATIVE_INPUT, children: 'Text input' },
      { id: 'NATIVE_SPINNER', route: routes.NATIVE_SPINNER, children: 'Spinners' },
      { id: 'NATIVE_SWITCH', route: routes.NATIVE_SWITCH, children: 'Switches' },
      { id: 'NATIVE_TEXT', route: routes.NATIVE_TEXT, children: 'Text' },
      { id: 'NATIVE_STAR_RATING', route: null, children: 'Star rating' },
      { id: 'NATIVE_NUDGER', route: null, children: 'Nudger' },
    ],
  },
  {
    id: 'UTILITIES',
    category: 'Utilities',
    sort: true,
    links: [
      { id: 'ALIGNMENT', route: routes.ALIGNMENT, children: 'Alignment' },
      { id: 'THEMING', route: routes.THEMING, children: 'Theming' },
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
