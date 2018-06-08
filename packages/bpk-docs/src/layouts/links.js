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

const ComponentsLinks = [
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
        route: routes.TEXT,
        children: 'Text',
        tags: ['web', 'native'],
      },
      {
        id: 'LINK',
        route: routes.LINK,
        children: 'Link',
        tags: ['web', 'native'],
      },
      { id: 'LIST', route: routes.LIST, children: 'List', tags: ['web'] },
      {
        id: 'DESCRIPTION_LIST',
        route: routes.DESCRIPTION_LIST,
        children: 'Description list',
        tags: ['web'],
      },
      {
        id: 'TABLE',
        route: routes.TABLE,
        children: 'Table',
        tags: ['web'],
      },
      {
        id: 'BLOCKQUOTE',
        route: routes.BLOCKQUOTE,
        children: 'Blockquote',
      },
      { id: 'CODE', route: routes.CODE, children: 'Code', tags: ['web'] },
      {
        id: 'BUTTON',
        route: routes.BUTTON,
        children: 'Button',
        tags: ['web', 'native'],
      },
      {
        id: 'ICON',
        route: routes.ICON,
        children: 'Icon',
        tags: ['web', 'native'],
      },
      {
        id: 'SPINNER',
        route: routes.SPINNER,
        children: 'Spinner',
        tags: ['web', 'native'],
      },
      {
        id: 'FORM',
        route: routes.FORM,
        children: 'Form elements',
        tags: ['web'],
      },
      {
        id: 'CARD',
        route: routes.CARD,
        children: 'Card',
        tags: ['web', 'native'],
      },
      { id: 'CHIP', route: routes.CHIP, children: 'Chip', tags: ['web'] },
      {
        id: 'BADGE',
        route: routes.BADGE,
        children: 'Badge',
        tags: ['web', 'native'],
      },
      {
        id: 'PANEL',
        route: routes.PANEL,
        children: 'Panel',
        tags: ['web', 'native'],
      },
      {
        id: 'IMAGE',
        route: routes.IMAGE,
        children: 'Image',
        tags: ['web'],
      },
      {
        id: 'INFINITE_SCROLL',
        route: routes.INFINITE_SCROLL,
        children: 'Infinite scroll',
        tags: ['web'],
      },
      {
        id: 'BANNER_ALERT',
        route: routes.BANNER_ALERT,
        children: 'Banner alert',
        tags: ['web', 'native'],
      },
      {
        id: 'MOBILE_SCROLL_CONTAINER',
        route: routes.MOBILE_SCROLL_CONTAINER,
        children: 'Mobile scroll container',
        tags: ['web'],
      },
      {
        id: 'MODALS',
        route: routes.MODAL,
        children: 'Modal',
        tags: ['web'],
      },
      {
        id: 'AUTOSUGGEST',
        route: routes.AUTOSUGGEST,
        children: 'Autosuggest',
        tags: ['web'],
      },
      {
        id: 'POPOVER',
        route: routes.POPOVER,
        children: 'Popover',
        tags: ['web'],
      },
      {
        id: 'CALENDAR',
        route: routes.CALENDAR,
        children: 'Calendar',
        tags: ['web'],
      },
      {
        id: 'DATEPICKER',
        route: routes.DATEPICKER,
        children: 'Datepicker',
        tags: ['web'],
      },
      {
        id: 'TOOLTIP',
        route: routes.TOOLTIP,
        children: 'Tooltip',
        tags: ['web'],
      },
      {
        id: 'ACCORDION',
        route: routes.ACCORDION,
        children: 'Accordion',

        tags: ['web'],
      },
      {
        id: 'NUDGER',
        route: routes.NUDGER,
        children: 'Nudger',
        tags: ['web', 'native'],
      },
      {
        id: 'PROGRESS',
        route: routes.PROGRESS,
        children: 'Progress bar',
        tags: ['web', 'native'],
      },
      {
        id: 'TICKET',
        route: routes.TICKET,
        children: 'Ticket',
        tags: ['web'],
      },
      {
        id: 'HORIZONTAL_NAV',
        route: routes.HORIZONTAL_NAV,
        children: 'Horizontal navigation',
        tags: ['web', 'native'],
      },
      {
        id: 'FIELDSET',
        route: routes.FIELDSET,
        children: 'Fieldset',
        tags: ['web'],
      },
      {
        id: 'STAR_RATING',
        route: routes.STAR_RATING,
        children: 'Star rating',
        tags: ['web', 'native'],
      },
      {
        id: 'BAR_CHART',
        route: routes.BARCHART,
        children: 'Bar chart',
        tags: ['web'],
      },
      {
        id: 'SLIDER',
        route: routes.SLIDER,
        children: 'Slider',
        tags: ['web'],
      },
      {
        id: 'DRAWER',
        route: routes.DRAWER,
        children: 'Drawer',
        tags: ['web'],
      },
      {
        id: 'PAGINATION',
        route: routes.PAGINATION,
        children: 'Pagination',
        tags: ['web'],
      },
      {
        id: 'DIALOG',
        route: routes.DIALOG,
        children: 'Dialog',
        tags: ['web'],
      },
      {
        id: 'NAVIGATION_BAR',
        route: routes.NAVIGATION_BAR,
        children: 'Navigation bar',
        tags: ['web', 'native'],
      },
      {
        id: 'NAVIGATION_STACK',
        route: routes.NAVIGATION_STACK,
        children: 'Navigation stack',
        tags: ['web'],
      },
      {
        id: 'BREAKPOINT',
        route: routes.BREAKPOINT,
        children: 'Breakpoint',
        tags: ['web'],
      },
      {
        id: 'HORIZONTAL_GRID',
        route: routes.HORIZONTAL_GRID,
        children: 'Horizontal grid',
        tags: ['web'],
      },
      {
        id: 'MAP',
        route: routes.MAP,
        children: 'Map',
        tags: ['web', 'native'],
      },

      {
        id: 'PHONE_INPUT',
        route: routes.PHONE_INPUT,
        children: 'Phone input',
        tags: ['native', 'web'],
      },
      // Native components.
      {
        id: 'NATIVE_FLAT_LIST',
        route: routes.FLAT_LIST,
        children: 'Flat list',
        tags: ['native'],
      },
      {
        id: 'NATIVE_INPUT',
        route: routes.TEXT_INPUT,
        children: 'Text input',
        tags: ['native'],
      },
      // TODO: Uncomment later.
      // {
      //   id: 'NATIVE_PAGINATION_DOT',
      //   route: routes.PAGINATION_DOT,
      //   children: 'Pagination Dot',
      // },
      {
        id: 'NATIVE_PICKER',
        route: routes.PICKER,
        children: 'Picker',
        tags: ['native'],
      },
      {
        id: 'NATIVE_SECTION_LIST',
        route: routes.SECTION_LIST,
        children: 'Section list',
        tags: ['native'],
      },
      {
        id: 'NATIVE_SELECT',
        route: routes.SELECT,
        children: 'Select',
        tags: ['native'],
      },
      {
        id: 'NATIVE_SWITCH',
        route: routes.SWITCH,
        children: 'Switch',
        tags: ['native'],
      },
      {
        id: 'NATIVE_CAROUSEL',
        route: routes.CAROUSEL,
        children: 'Carousel',
        tags: ['native'],
      },
      {
        id: 'NATIVE_TOUCHABLE_OVERLAY',
        route: routes.TOUCHABLE_OVERLAY,
        children: 'Touchable overlay',
        tags: ['native'],
      },
      {
        id: 'NATIVE_TOUCHABLE_NATIVE_FEEDBACK',
        route: routes.TOUCHABLE_NATIVE_FEEDBACK,
        children: 'Touchable native feedback',
        tags: ['native'],
      },
      {
        id: 'NATIVE_ALERT',
        route: routes.ALERT,
        children: 'Alert',
        tags: ['native'],
      },
      // Utilities.
      {
        id: 'ALIGNMENT',
        route: routes.ALIGNMENT,
        children: 'Alignment',
        tags: ['web'],
      },
      {
        id: 'THEMING',
        route: routes.THEMING,
        children: 'Theming',
        tags: ['web', 'native'],
      },
    ],
  },
];

export default [
  ...ComponentsLinks,
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
  {
    id: 'STYLE_GUIDE',
    category: 'Style guide',
    sort: true,
    links: [
      { id: 'COPYWRITING', route: routes.COPYWRITING, children: 'Copywriting' },
    ],
  },
];
