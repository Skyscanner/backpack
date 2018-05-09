/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2018 Skyscanner Ltd
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

/* @flow */

import * as routes from './../constants/routes';

import ComponentsImage from '../static/components_hero.jpg';
import UsingBackpackImage from '../static/using_backpack_hero.jpg';
import DesignTokensImage from '../static/design_hero.jpg';

const componentsLinks = [
  {
    id: 'COMPONENTS',
    category: 'Web components',
    sort: true,
    hero: {
      url: `/${ComponentsImage}`,
    },
    links: [
      { id: 'TEXT', route: routes.TEXT, children: 'Text' },
      { id: 'LINKS', route: routes.LINKS, children: 'Links' },
      { id: 'LISTS', route: routes.LISTS, children: 'Lists' },
      {
        id: 'DESCRIPTION_LISTS',
        route: routes.DESCRIPTION_LISTS,
        children: 'Description Lists',
      },
      { id: 'TABLES', route: routes.TABLES, children: 'Tables' },
      {
        id: 'BLOCKQUOTES',
        route: routes.BLOCKQUOTES,
        children: 'Blockquotes',
      },
      { id: 'CODE', route: routes.CODE, children: 'Code' },
      { id: 'BUTTONS', route: routes.BUTTONS, children: 'Buttons' },
      { id: 'ICONS', route: routes.ICONS, children: 'Icons' },
      { id: 'SPINNERS', route: routes.SPINNERS, children: 'Spinners' },
      { id: 'FORMS', route: routes.FORMS, children: 'Forms' },
      { id: 'CARDS', route: routes.CARDS, children: 'Cards' },
      { id: 'CHIPS', route: routes.CHIPS, children: 'Chips' },
      { id: 'BADGE', route: routes.BADGE, children: 'Badge' },
      { id: 'PANELS', route: routes.PANELS, children: 'Panels' },
      { id: 'IMAGES', route: routes.IMAGES, children: 'Images' },
      {
        id: 'BANNER_ALERTS',
        route: routes.BANNER_ALERTS,
        children: 'Banner alerts',
      },
      {
        id: 'MOBILE_SCROLL_CONTAINER',
        route: routes.MOBILE_SCROLL_CONTAINER,
        children: 'Mobile scroll container',
      },
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
      {
        id: 'HORIZONTAL_NAV',
        route: routes.HORIZONTAL_NAV,
        children: 'Horizontal navigation',
      },
      { id: 'FIELDSETS', route: routes.FIELDSETS, children: 'Fieldsets' },
      {
        id: 'STAR_RATINGS',
        route: routes.STAR_RATING,
        children: 'Star rating',
      },
      { id: 'BAR_CHARTS', route: routes.BARCHARTS, children: 'Bar charts' },
      { id: 'SLIDERS', route: routes.SLIDERS, children: 'Sliders' },
      { id: 'DRAWER', route: routes.DRAWER, children: 'Drawer' },
      { id: 'PAGINATION', route: routes.PAGINATION, children: 'Pagination' },
      { id: 'DIALOGS', route: routes.DIALOGS, children: 'Dialogs' },
      {
        id: 'NAVIGATION_BAR',
        route: routes.NAVIGATION_BAR,
        children: 'Navigation Bar',
      },
      { id: 'CAROUSELS', route: null, children: 'Carousel' },
      { id: 'TOASTS', route: null, children: 'Toast' },
      { id: 'VERTICAL_NAV', route: null, children: 'Vertical navigation' },
      { id: 'OVERFLOW_NAV', route: null, children: 'Overflow navigation' },
      { id: 'BREADCRUMBS', route: null, children: 'Breadcrumbs' },
      { id: 'NUMERICAL_RATING', route: null, children: 'Numerical rating' },
      { id: 'FLIGHT_ITINERARIES', route: null, children: 'Flight itinerary' },
      { id: 'BREAKPOINTS', route: routes.BREAKPOINTS, children: 'Breakpoints' },
      {
        id: 'HORIZONTAL_GRID',
        route: routes.HORIZONTAL_GRID,
        children: 'Horizontal grid',
      },
    ],
  },
  {
    id: 'NATIVE',
    category: 'Native components',
    sort: true,
    hero: {
      url: `/${ComponentsImage}`,
    },
    links: [
      {
        id: 'NATIVE_BANNER_ALERT',
        route: routes.NATIVE_BANNER_ALERT,
        children: 'Banner alerts',
      },
      { id: 'NATIVE_BUTTON', route: routes.NATIVE_BUTTON, children: 'Button' },
      { id: 'NATIVE_BADGE', route: routes.NATIVE_BADGE, children: 'Badge' },
      {
        id: 'NATIVE_BUTTON_LINK',
        route: routes.NATIVE_BUTTON_LINK,
        children: 'Button Link',
      },
      { id: 'NATIVE_CARDS', route: routes.NATIVE_CARDS, children: 'Cards' },
      {
        id: 'NATIVE_FLAT_LIST',
        route: routes.NATIVE_FLAT_LIST,
        children: 'FlatList',
      },
      {
        id: 'NATIVE_HORIZONTAL_NAV',
        route: routes.NATIVE_HORIZONTAL_NAV,
        children: 'Horizontal navigation',
      },
      { id: 'NATIVE_ICONS', route: routes.NATIVE_ICONS, children: 'Icons' },
      {
        id: 'NATIVE_INPUT',
        route: routes.NATIVE_INPUT,
        children: 'Text input',
      },
      {
        id: 'NATIVE_NAVIGATION_BAR',
        route: routes.NATIVE_NAVIGATION_BAR,
        children: 'Navigation Bar',
      },
      { id: 'NATIVE_NUDGER', route: routes.NATIVE_NUDGER, children: 'Nudger' },
      // TODO: Uncomment later.
      // {
      //   id: 'NATIVE_PAGINATION_DOTS',
      //   route: routes.NATIVE_PAGINATION_DOTS,
      //   children: 'Pagination Dots',
      // },
      {
        id: 'NATIVE_PANELS',
        route: routes.NATIVE_PANELS,
        children: 'Panels',
      },
      {
        id: 'NATIVE_PHONE_INPUT',
        route: routes.NATIVE_PHONE_INPUT,
        children: 'Phone number input',
      },
      {
        id: 'NATIVE_PICKER',
        route: routes.NATIVE_PICKER,
        children: 'Pickers',
      },
      {
        id: 'NATIVE_PROGRESS',
        route: routes.NATIVE_PROGRESS,
        children: 'Progress',
      },
      {
        id: 'NATIVE_SECTION_LIST',
        route: routes.NATIVE_SECTION_LIST,
        children: 'SectionList',
      },
      {
        id: 'NATIVE_SELECT',
        route: routes.NATIVE_SELECT,
        children: 'Select',
      },
      {
        id: 'NATIVE_SPINNER',
        route: routes.NATIVE_SPINNER,
        children: 'Spinners',
      },
      {
        id: 'NATIVE_STAR_RATING',
        route: routes.NATIVE_STAR_RATING,
        children: 'Star Rating',
      },
      {
        id: 'NATIVE_SWITCH',
        route: routes.NATIVE_SWITCH,
        children: 'Switches',
      },
      { id: 'NATIVE_TEXT', route: routes.NATIVE_TEXT, children: 'Text' },
      {
        id: 'NATIVE_TOUCHABLE_OVERLAY',
        route: routes.NATIVE_TOUCHABLE_OVERLAY,
        children: 'Touchable Overlay',
      },
      {
        id: 'NATIVE_TOUCHABLE_NATIVE_FEEDBACK',
        route: routes.NATIVE_TOUCHABLE_NATIVE_FEEDBACK,
        children: 'Touchable Native Feedback',
      },
    ],
  },
  {
    id: 'UTILITIES',
    category: 'Utilities',
    sort: true,
    hero: {
      url: `/${ComponentsImage}`,
    },
    links: [
      { id: 'ALIGNMENT', route: routes.ALIGNMENT, children: 'Alignment' },
      { id: 'THEMING', route: routes.THEMING, children: 'Theming' },
    ],
  },
];

const neoComponentsLinks = [
  {
    id: 'COMPONENTS',
    category: 'Components',
    sort: true,
    hero: {
      url: `/${ComponentsImage}`,
    },
    links: [
      {
        id: 'TEXT',
        route: routes.NEO_TEXT,
        children: 'Text',
        tags: ['web', 'native'],
      },
      {
        id: 'LINK',
        route: routes.NEO_LINK,
        children: 'Link',
        tags: ['web', 'native'],
      },
      { id: 'LIST', route: routes.NEO_LIST, children: 'List', tags: ['web'] },
      {
        id: 'DESCRIPTION_LIST',
        route: routes.NEO_DESCRIPTION_LIST,
        children: 'Description list',
        tags: ['web'],
      },
      {
        id: 'TABLE',
        route: routes.NEO_TABLE,
        children: 'Table',
        tags: ['web'],
      },
      {
        id: 'BLOCKQUOTE',
        route: routes.NEO_BLOCKQUOTE,
        children: 'Blockquote',
      },
      { id: 'CODE', route: routes.NEO_CODE, children: 'Code', tags: ['web'] },
      {
        id: 'BUTTON',
        route: routes.NEO_BUTTON,
        children: 'Button',
        tags: ['web', 'native'],
      },
      {
        id: 'ICON',
        route: routes.NEO_ICON,
        children: 'Icon',
        tags: ['web', 'native'],
      },
      {
        id: 'SPINNER',
        route: routes.NEO_SPINNER,
        children: 'Spinner',
        tags: ['web', 'native'],
      },
      {
        id: 'FORM',
        route: routes.NEO_FORM,
        children: 'Form elements',
        tags: ['web'],
      },
      {
        id: 'CARD',
        route: routes.NEO_CARD,
        children: 'Card',
        tags: ['web', 'native'],
      },
      { id: 'CHIP', route: routes.NEO_CHIP, children: 'Chip', tags: ['web'] },
      {
        id: 'BADGE',
        route: routes.NEO_BADGE,
        children: 'Badge',
        tags: ['web', 'native'],
      },
      {
        id: 'PANEL',
        route: routes.NEO_PANEL,
        children: 'Panel',
        tags: ['web', 'native'],
      },
      {
        id: 'IMAGE',
        route: routes.NEO_IMAGE,
        children: 'Image',
        tags: ['web'],
      },
      {
        id: 'BANNER_ALERT',
        route: routes.NEO_BANNER_ALERT,
        children: 'Banner alert',
        tags: ['web', 'native'],
      },
      {
        id: 'MOBILE_SCROLL_CONTAINER',
        route: routes.NEO_MOBILE_SCROLL_CONTAINER,
        children: 'Mobile scroll container',
        tags: ['web'],
      },
      {
        id: 'MODALS',
        route: routes.NEO_MODAL,
        children: 'Modal',
        tags: ['web'],
      },
      {
        id: 'AUTOSUGGEST',
        route: routes.NEO_AUTOSUGGEST,
        children: 'Autosuggest',
        tags: ['web'],
      },
      {
        id: 'POPOVER',
        route: routes.NEO_POPOVER,
        children: 'Popover',
        tags: ['web'],
      },
      {
        id: 'CALENDAR',
        route: routes.NEO_CALENDAR,
        children: 'Calendar',
        tags: ['web'],
      },
      {
        id: 'DATEPICKER',
        route: routes.NEO_DATEPICKER,
        children: 'Datepicker',
        tags: ['web'],
      },
      {
        id: 'TOOLTIP',
        route: routes.NEO_TOOLTIP,
        children: 'Tooltip',
        tags: ['web'],
      },
      {
        id: 'ACCORDION',
        route: routes.NEO_ACCORDION,
        children: 'Accordion',

        tags: ['web'],
      },
      {
        id: 'NUDGER',
        route: routes.NEO_NUDGER,
        children: 'Nudger',
        tags: ['web', 'native'],
      },
      {
        id: 'PROGRESS',
        route: routes.NEO_PROGRESS,
        children: 'Progress bar',
        tags: ['web', 'native'],
      },
      {
        id: 'TICKET',
        route: routes.NEO_TICKET,
        children: 'Ticket',
        tags: ['web'],
      },
      {
        id: 'HORIZONTAL_NAV',
        route: routes.NEO_HORIZONTAL_NAV,
        children: 'Horizontal navigation',
        tags: ['web', 'native'],
      },
      {
        id: 'FIELDSET',
        route: routes.NEO_FIELDSET,
        children: 'Fieldset',
        tags: ['web'],
      },
      {
        id: 'STAR_RATING',
        route: routes.NEO_STAR_RATING,
        children: 'Star rating',
        tags: ['web', 'native'],
      },
      {
        id: 'BAR_CHART',
        route: routes.NEO_BARCHART,
        children: 'Bar chart',
        tags: ['web'],
      },
      {
        id: 'SLIDER',
        route: routes.NEO_SLIDER,
        children: 'Slider',
        tags: ['web'],
      },
      {
        id: 'DRAWER',
        route: routes.NEO_DRAWER,
        children: 'Drawer',
        tags: ['web'],
      },
      {
        id: 'PAGINATION',
        route: routes.NEO_PAGINATION,
        children: 'Pagination',
        tags: ['web'],
      },
      {
        id: 'DIALOG',
        route: routes.NEO_DIALOG,
        children: 'Dialog',
        tags: ['web'],
      },
      {
        id: 'NAVIGATION_BAR',
        route: routes.NEO_NAVIGATION_BAR,
        children: 'Navigation bar',
        tags: ['web', 'native'],
      },
      { id: 'CAROUSEL', route: null, children: 'Carousel' },
      { id: 'TOAST', route: null, children: 'Toast' },
      { id: 'VERTICAL_NAV', route: null, children: 'Vertical navigation' },
      { id: 'OVERFLOW_NAV', route: null, children: 'Overflow navigation' },
      { id: 'BREADCRUMB', route: null, children: 'Breadcrumb' },
      { id: 'NUMERICAL_RATING', route: null, children: 'Numerical rating' },
      { id: 'FLIGHT_ITINERARIES', route: null, children: 'Flight itinerary' },
      {
        id: 'BREAKPOINT',
        route: routes.NEO_BREAKPOINT,
        children: 'Breakpoint',
        tags: ['web'],
      },
      {
        id: 'HORIZONTAL_GRID',
        route: routes.NEO_HORIZONTAL_GRID,
        children: 'Horizontal grid',
        tags: ['web'],
      },

      // Native components.
      {
        id: 'NATIVE_FLAT_LIST',
        route: routes.NEO_FLAT_LIST,
        children: 'Flat list',
        tags: ['native'],
      },
      {
        id: 'NATIVE_INPUT',
        route: routes.NEO_TEXT_INPUT,
        children: 'Text input',
        tags: ['native'],
      },
      // TODO: Uncomment later.
      // {
      //   id: 'NATIVE_PAGINATION_DOT',
      //   route: routes.NEO_PAGINATION_DOT,
      //   children: 'Pagination Dot',
      // },
      {
        id: 'NATIVE_PHONE_INPUT',
        route: routes.NEO_PHONE_INPUT,
        children: 'Phone number input',
        tags: ['native'],
      },
      {
        id: 'NATIVE_PICKER',
        route: routes.NEO_PICKER,
        children: 'Picker',
        tags: ['native'],
      },
      {
        id: 'NATIVE_SECTION_LIST',
        route: routes.NEO_SECTION_LIST,
        children: 'Section list',
        tags: ['native'],
      },
      {
        id: 'NATIVE_SELECT',
        route: routes.NEO_SELECT,
        children: 'Select',
        tags: ['native'],
      },
      {
        id: 'NATIVE_SWITCH',
        route: routes.NEO_SWITCH,
        children: 'Switch',
        tags: ['native'],
      },
      {
        id: 'NATIVE_TOUCHABLE_OVERLAY',
        route: routes.NEO_TOUCHABLE_OVERLAY,
        children: 'Touchable overlay',
        tags: ['native'],
      },
      {
        id: 'NATIVE_TOUCHABLE_NATIVE_FEEDBACK',
        route: routes.NEO_TOUCHABLE_NATIVE_FEEDBACK,
        children: 'Touchable native feedback',
        tags: ['native'],
      },

      // Utilities.
      {
        id: 'ALIGNMENT',
        route: routes.NEO_ALIGNMENT,
        children: 'Alignment',
        tags: ['web'],
      },
      {
        id: 'THEMING',
        route: routes.NEO_THEMING,
        children: 'Theming',
        tags: ['web', 'native'],
      },
    ],
  },
];

export default [
  ...(process.env.BPK_NEO ? neoComponentsLinks : componentsLinks),
  {
    id: 'TOKENS',
    category: 'Tokens',
    sort: true,
    hero: {
      url: `/${DesignTokensImage}`,
    },
    links: [
      { id: 'COLORS', route: routes.COLORS, children: 'Colour' },
      { id: 'TYPESETTING', route: routes.TYPESETTING, children: 'Typesetting' },
      { id: 'LAYOUT', route: routes.SPACINGS, children: 'Spacing' },
      { id: 'RADII', route: routes.RADII, children: 'Radius' },
      { id: 'SHADOWS', route: routes.SHADOWS, children: 'Shadow' },
      { id: 'BORDERS', route: routes.BORDERS, children: 'Border' },
      { id: 'ANIMATION', route: routes.ANIMATION, children: 'Animation' },
      { id: 'Z_INDEXES', route: routes.Z_INDEXES, children: 'Z-index' },
    ],
  },
  {
    id: 'USING_BACKPACK',
    category: 'Using Backpack',
    hero: {
      url: `/${UsingBackpackImage}`,
      horizontalPosition: 60,
    },
    links: [
      {
        id: 'GETTING_STARTED',
        route: routes.GETTING_STARTED,
        children: 'Getting started',
      },
      {
        id: 'BACKPACK_REACT_SCRIPTS',
        route: routes.BACKPACK_REACT_SCRIPTS,
        children: 'Backpack React Scripts',
      },
      {
        id: 'BASE_STYLESHEET',
        route: routes.BASE_STYLESHEET,
        children: 'Base stylesheet',
      },
    ],
  },
];
