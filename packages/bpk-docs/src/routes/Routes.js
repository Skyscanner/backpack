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

import React from 'react';
import { Route, IndexRoute, IndexRedirect, Redirect, withRouter } from 'react-router';

import * as ROUTES from './../constants/routes';
import redirects from './../constants/redirect-routes';

import DefaultLayout from './../layouts/DefaultLayout';
import UsingLayout from './../layouts/UsingLayout';
import TokensLayout from './../layouts/TokensLayout';
import DocsLayout from './../layouts/DocsLayout';

import HomePage from './../pages/HomePage';

import GettingStartedPage from './../pages/GettingStartedPage';
import BackpackReactScriptsPage from './../pages/BackpackReactScriptsPage';
import BaseStylesheetPage from './../pages/BaseStylesheetPage';

import StylePage from './../pages/StylePage';

import ColorsPage from './../pages/ColorsPage';
import TypesettingPage from './../pages/TypesettingPage';
import RadiiPage from './../pages/RadiiPage';
import ShadowsPage from './../pages/ShadowsPage';
import BordersPage from './../pages/BordersPage';
import LayoutPage from './../pages/LayoutPage';
import BreakpointsPage from './../pages/BreakpointsPage';
import HorizontalGridPage from './../pages/HorizontalGridPage';
import AnimationPage from './../pages/AnimationPage';

import TypographyPage from './../pages/TypographyPage';
import ButtonsPage from './../pages/ButtonsPage';
import IconsPage from './../pages/IconsPage';
import SpinnersPage from './../pages/SpinnersPage';
import FormsPage from './../pages/FormsPage';
import CardsPage from './../pages/CardsPage';
import ChipsPage from './../pages/ChipsPage';
import BadgePage from './../pages/BadgePage';
import PanelsPage from './../pages/PanelsPage';
import ImagesPage from './../pages/ImagesPage';

import BannerAlertsPage from './../pages/BannerAlertsPage';
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
import StarRatingPage from './../pages/StarRatingPage';

import AlignmentPage from './../pages/AlignmentPage';

import NativeInputPage from './../pages/NativeTextInputPage';
import NativeTextPage from './../pages/NativeTextPage';
import NativeButtonsPage from './../pages/NativeButtonsPage';

import ResourcesPage from './../pages/ResourcesPage';

import { GridColumnDemoPage, GridOffsetDemoPage } from './../pages/GridDemoPages';

// eslint-disable-next-line import/no-webpack-loader-syntax
const iconsSvgs = require('!!file-loader?name=[name].[hash].zip!zip-it-loader!./../../../bpk-svgs/src/icons/icons');

const Routes = (
  <Route path={ROUTES.HOME} component={DefaultLayout}>
    <IndexRoute component={withRouter(HomePage)} />

    <Route path={ROUTES.USING_BACKPACK} component={UsingLayout}>
      <IndexRedirect to={ROUTES.GETTING_STARTED} />
      <Route path={ROUTES.GETTING_STARTED} component={GettingStartedPage} />
      <Route path={ROUTES.BACKPACK_REACT_SCRIPTS} component={BackpackReactScriptsPage} />
      <Route path={ROUTES.BASE_STYLESHEET} component={BaseStylesheetPage} />
    </Route>

    <Route path={ROUTES.STYLE} component={StylePage} iconsSvgs={iconsSvgs} />

    <Route path={ROUTES.TOKENS} component={TokensLayout}>
      <IndexRedirect to={ROUTES.ANIMATION} />
      <Route path={ROUTES.ANIMATION} component={AnimationPage} />
      <Route path={ROUTES.BORDERS} component={BordersPage} />
      <Route path={ROUTES.COLORS} component={ColorsPage} />
      <Route path={ROUTES.LAYOUT} component={LayoutPage} />
      <Route path={ROUTES.RADII} component={RadiiPage} />
      <Route path={ROUTES.SHADOWS} component={ShadowsPage} />
      <Route path={ROUTES.TYPESETTING} component={TypesettingPage} />
    </Route>

    <Route path={ROUTES.COMPONENTS} component={DocsLayout}>
      <IndexRedirect to={ROUTES.WEB_COMPONENTS} />
      <Route path={ROUTES.WEB_COMPONENTS}>
        <IndexRedirect to={ROUTES.ACCORDIONS} />
        <Route path={ROUTES.TYPOGRAPHY} component={TypographyPage} />
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
        <Route path={ROUTES.MODALS} component={ModalsPage} />
        <Route path={ROUTES.AUTOSUGGEST} component={AutosuggestPage} />
        <Route path={ROUTES.POPOVERS} component={PopoversPage} />
        <Route path={ROUTES.CALENDAR} component={CalendarPage} />
        <Route path={ROUTES.DATEPICKER} component={DatepickerPage} />
        <Route path={ROUTES.TOOLTIPS} component={TooltipsPage} />
        <Route path={ROUTES.ACCORDIONS} component={AccordionsPage} />
        <Route path={ROUTES.NUDGERS} component={NudgersPage} />
        <Route path={ROUTES.PROGRESS} component={ProgressPage} />
        <Route path={ROUTES.TICKETS} component={TicketsPage} />
        <Route path={ROUTES.HORIZONTAL_NAV} component={HorizontalNavPage} />
        <Route path={ROUTES.FIELDSETS} component={FieldsetsPage} />
        <Route path={ROUTES.BARCHARTS} component={BarchartsPage} />
        <Route path={ROUTES.STAR_RATING} component={StarRatingPage} />
        <Route path={ROUTES.BREAKPOINTS} component={BreakpointsPage} />
        <Route path={ROUTES.HORIZONTAL_GRID} component={HorizontalGridPage} />
      </Route>
      <Route path={ROUTES.NATIVE_COMPONENTS}>
        <IndexRedirect to={ROUTES.NATIVE_TEXT} />
        <Route path={ROUTES.NATIVE_INPUT} component={NativeInputPage} />
        <Route path={ROUTES.NATIVE_TEXT} component={NativeTextPage} />
        <Route path={ROUTES.NATIVE_BUTTONS} component={NativeButtonsPage} />
      </Route>
      <Route path={ROUTES.UTILITIES}>
        <IndexRedirect to={ROUTES.ALIGNMENT} />
        <Route path={ROUTES.ALIGNMENT} component={AlignmentPage} />
      </Route>
    </Route>

    <Route path={ROUTES.RESOURCES} component={ResourcesPage} iconsSvgs={iconsSvgs} />
    <Route path={ROUTES.GRID_COLUMN_DEMO} component={GridColumnDemoPage} />
    <Route path={ROUTES.GRID_OFFSET_DEMO} component={GridOffsetDemoPage} />

    {
      Object.keys(redirects).map(from => <Redirect key={from} from={from} to={redirects[from]} />)
    }
  </Route>
);

export default Routes;
