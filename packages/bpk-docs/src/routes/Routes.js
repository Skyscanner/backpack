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

import React from 'react';
import {
  Route,
  IndexRoute,
  IndexRedirect,
  Redirect,
  withRouter,
} from 'react-router';

import * as ROUTES from './../constants/routes';
import redirects from './../constants/redirect-routes';

import DefaultLayout from './../layouts/DefaultLayout';
import UsingLayout from './../layouts/UsingLayout';
import TokensLayout from './../layouts/TokensLayout';
import DocsLayout from './../layouts/DocsLayout';

import HomePage from './../pages/HomePage';
import NeoHomePage from './../pages/NeoHomePage';

import GettingStartedPage from './../pages/GettingStartedPage';
import BackpackReactScriptsPage from './../pages/BackpackReactScriptsPage';
import BaseStylesheetPage from './../pages/BaseStylesheetPage';

import StylePage from './../pages/StylePage';

import ColorsPage from './../pages/ColorsPage';
import TypesettingPage from './../pages/TypesettingPage';
import RadiiPage from './../pages/RadiiPage';
import ShadowsPage from './../pages/ShadowsPage';
import BordersPage from './../pages/BordersPage';
import SpacingsPage from './../pages/SpacingsPage';
import AnimationPage from './../pages/AnimationPage';
import ZIndexesPage from './../pages/ZIndexesPage';

import TextPage from './../pages/TextPage';
import LinksPage from './../pages/LinksPage';
import ListsPage from './../pages/ListsPage';
import DescriptionListsPage from './../pages/DescriptionListsPage';
import TablesPage from './../pages/TablesPage';
import BlockquotesPage from './../pages/BlockquotesPage';
import CodePage from './../pages/CodePage';
import ButtonsPage from './../pages/ButtonsPage';
import IconsPage from './../pages/IconsPage';
import SpinnersPage from './../pages/SpinnersPage';
import FormsPage from './../pages/FormsPage';
import CardsPage from './../pages/CardsPage';
import ChipsPage from './../pages/ChipsPage';
import BadgePage from './../pages/BadgePage';
import PanelsPage from './../pages/PanelsPage';
import ImagesPage from './../pages/ImagesPage';
import BreakpointsPage from './../pages/BreakpointsPage';
import HorizontalGridPage from './../pages/HorizontalGridPage';
import BannerAlertsPage from './../pages/BannerAlertsPage';
import MobileScrollContainerPage from './../pages/MobileScrollContainerPage';
import ModalsPage from './../pages/ModalsPage';
import AutosuggestPage from './../pages/AutosuggestPage';
import PopoversPage from './../pages/PopoversPage';
import CalendarPage from './../pages/CalendarPage';
import DatepickerPage from './../pages/DatepickerPage';
import TooltipsPage from './../pages/TooltipsPage';
import AccordionsPage from './../pages/AccordionsPage';
import NudgersPage from './../pages/NudgersPage';
import ProgressPage from './../pages/ProgressPage';
import TicketsPage from './../pages/TicketsPage';
import HorizontalNavPage from './../pages/HorizontalNavPage';
import FieldsetsPage from './../pages/FieldsetsPage';
import BarchartsPage from './../pages/BarchartsPage';
import PaginationPage from './../pages/PaginationPage';
import StarRatingPage from './../pages/StarRatingPage';
import SlidersPage from './../pages/SlidersPage';
import DrawerPage from './../pages/DrawerPage';
import DialogsPage from './../pages/DialogsPage';

import AlignmentPage from './../pages/AlignmentPage';
import ThemingPage from './../pages/ThemingPage';

import NativeBannerAlertPage from './../pages/NativeBannerAlertPage';
import NativeButtonPage from './../pages/NativeButtonPage';
import NativeButtonLinkPage from './../pages/NativeButtonLinkPage';
import NativeCardsPage from './../pages/NativeCardsPage';
import NativeHorizontalNavPage from './../pages/NativeHorizontalNavPage';
import NativeIconsPage from './../pages/NativeIconsPage';
import NativeInputPage from './../pages/NativeTextInputPage';
import NativeSpinnerPage from './../pages/NativeSpinnerPage';
import NativeStarRatingPage from './../pages/NativeStarRatingPage';
import NativeSwitchPage from './../pages/NativeSwitchPage';
import NativeTextPage from './../pages/NativeTextPage';
import NativeTouchableOverlayPage from './../pages/NativeTouchableOverlayPage';

import {
  GridColumnDemoPage,
  GridOffsetDemoPage,
} from './../pages/GridDemoPages';

// eslint-disable-next-line import/no-webpack-loader-syntax
const iconsSvgs = require('!!file-loader?name=[name].[hash].zip!zip-it-loader!./../../../bpk-svgs/src/icons/icons');

const Routes = (
  <Route path={ROUTES.HOME} component={DefaultLayout}>
    <IndexRoute
      component={withRouter(process.env.BPK_NEO ? NeoHomePage : HomePage)}
    />

    <Route path={ROUTES.USING_BACKPACK} component={UsingLayout}>
      <IndexRedirect to={ROUTES.GETTING_STARTED} />
      <Route path={ROUTES.GETTING_STARTED} component={GettingStartedPage} />
      <Route
        path={ROUTES.BACKPACK_REACT_SCRIPTS}
        component={BackpackReactScriptsPage}
      />
      <Route path={ROUTES.BASE_STYLESHEET} component={BaseStylesheetPage} />
    </Route>

    <Route path={ROUTES.STYLE} component={StylePage} iconsSvgs={iconsSvgs} />

    <Route path={ROUTES.TOKENS} component={TokensLayout}>
      <IndexRedirect to={ROUTES.ANIMATION} />
      <Route path={ROUTES.ANIMATION} component={AnimationPage} />
      <Route path={ROUTES.BORDERS} component={BordersPage} />
      <Route path={ROUTES.COLORS} component={ColorsPage} />
      <Route path={ROUTES.SPACINGS} component={SpacingsPage} />
      <Route path={ROUTES.RADII} component={RadiiPage} />
      <Route path={ROUTES.SHADOWS} component={ShadowsPage} />
      <Route path={ROUTES.TYPESETTING} component={TypesettingPage} />
      <Route path={ROUTES.Z_INDEXES} component={ZIndexesPage} />
    </Route>

    <Route path={ROUTES.COMPONENTS} component={DocsLayout}>
      <IndexRedirect to={ROUTES.WEB_COMPONENTS} />
      <Route path={ROUTES.WEB_COMPONENTS}>
        <IndexRedirect to={ROUTES.ACCORDIONS} />
        <Route path={ROUTES.TEXT} component={TextPage} />
        <Route path={ROUTES.LINKS} component={LinksPage} />
        <Route path={ROUTES.LISTS} component={ListsPage} />
        <Route
          path={ROUTES.DESCRIPTION_LISTS}
          component={DescriptionListsPage}
        />
        <Route path={ROUTES.TABLES} component={TablesPage} />
        <Route path={ROUTES.BLOCKQUOTES} component={BlockquotesPage} />
        <Route path={ROUTES.CODE} component={CodePage} />
        <Route path={ROUTES.BUTTONS} component={ButtonsPage} />
        <Route path={ROUTES.ICONS} component={IconsPage} />
        <Route path={ROUTES.SPINNERS} component={SpinnersPage} />
        <Route path={ROUTES.FORMS} component={FormsPage} />
        <Route path={ROUTES.CARDS} component={CardsPage} />
        <Route path={ROUTES.CHIPS} component={ChipsPage} />
        <Route path={ROUTES.BADGE} component={BadgePage} />
        <Route path={ROUTES.PANELS} component={PanelsPage} />
        <Route path={ROUTES.IMAGES} component={ImagesPage} />
        <Route path={ROUTES.BANNER_ALERTS} component={BannerAlertsPage} />
        <Route
          path={ROUTES.MOBILE_SCROLL_CONTAINER}
          component={MobileScrollContainerPage}
        />
        <Route path={ROUTES.MODALS} component={ModalsPage} />
        <Route path={ROUTES.AUTOSUGGEST} component={AutosuggestPage} />
        <Route path={ROUTES.POPOVERS} component={PopoversPage} />
        <Route path={ROUTES.CALENDAR} component={CalendarPage} />
        <Route path={ROUTES.DATEPICKER} component={DatepickerPage} />
        <Route path={ROUTES.TOOLTIPS} component={TooltipsPage} />
        <Route path={ROUTES.ACCORDIONS} component={AccordionsPage} />
        <Route path={ROUTES.NUDGERS} component={NudgersPage} />
        <Route path={ROUTES.PROGRESS} component={ProgressPage} />
        <Route path={ROUTES.PAGINATION} component={PaginationPage} />
        <Route path={ROUTES.TICKETS} component={TicketsPage} />
        <Route path={ROUTES.HORIZONTAL_NAV} component={HorizontalNavPage} />
        <Route path={ROUTES.FIELDSETS} component={FieldsetsPage} />
        <Route path={ROUTES.BARCHARTS} component={BarchartsPage} />
        <Route path={ROUTES.STAR_RATING} component={StarRatingPage} />
        <Route path={ROUTES.BREAKPOINTS} component={BreakpointsPage} />
        <Route path={ROUTES.HORIZONTAL_GRID} component={HorizontalGridPage} />
        <Route path={ROUTES.SLIDERS} component={SlidersPage} />
        <Route path={ROUTES.DRAWER} component={DrawerPage} />
        <Route path={ROUTES.DIALOGS} component={DialogsPage} />
      </Route>
      <Route path={ROUTES.NATIVE_COMPONENTS}>
        <IndexRedirect to={ROUTES.NATIVE_TEXT} />
        <Route
          path={ROUTES.NATIVE_BANNER_ALERT}
          component={NativeBannerAlertPage}
        />
        <Route path={ROUTES.NATIVE_BUTTON} component={NativeButtonPage} />
        <Route
          path={ROUTES.NATIVE_BUTTON_LINK}
          component={NativeButtonLinkPage}
        />
        <Route path={ROUTES.NATIVE_CARDS} component={NativeCardsPage} />
        <Route
          path={ROUTES.NATIVE_HORIZONTAL_NAV}
          component={NativeHorizontalNavPage}
        />
        <Route path={ROUTES.NATIVE_ICONS} component={NativeIconsPage} />
        <Route path={ROUTES.NATIVE_INPUT} component={NativeInputPage} />
        <Route path={ROUTES.NATIVE_SPINNER} component={NativeSpinnerPage} />
        <Route
          path={ROUTES.NATIVE_STAR_RATING}
          component={NativeStarRatingPage}
        />
        <Route path={ROUTES.NATIVE_SWITCH} component={NativeSwitchPage} />
        <Route path={ROUTES.NATIVE_TEXT} component={NativeTextPage} />
        <Route
          path={ROUTES.NATIVE_TOUCHABLE_OVERLAY}
          component={NativeTouchableOverlayPage}
        />
      </Route>
      <Route path={ROUTES.UTILITIES}>
        <IndexRedirect to={ROUTES.ALIGNMENT} />
        <Route path={ROUTES.ALIGNMENT} component={AlignmentPage} />
        <Route path={ROUTES.THEMING} component={ThemingPage} />
      </Route>
    </Route>

    <Route path={ROUTES.GRID_COLUMN_DEMO} component={GridColumnDemoPage} />
    <Route path={ROUTES.GRID_OFFSET_DEMO} component={GridOffsetDemoPage} />

    {Object.keys(redirects).map(from => (
      <Redirect key={from} from={from} to={redirects[from]} />
    ))}
  </Route>
);

export default Routes;
