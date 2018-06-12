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
import StyleGuideLayout from './../layouts/StyleGuideLayout';

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
import SpacingsPage from './../pages/SpacingsPage';
import AnimationPage from './../pages/AnimationPage';
import ZIndexesPage from './../pages/ZIndexesPage';

import CopywritingPage from './../pages/CopywritingPage';

import AccordionsPage from './../pages/AccordionsPage';
import AlertPage from './../pages/AlertPage';
import AlignmentPage from './../pages/AlignmentPage';
import AutosuggestPage from './../pages/AutosuggestPage';
import BadgePage from './../pages/BadgePage';
import BannerAlertPage from './../pages/BannerAlertPage';
import BarchartsPage from './../pages/BarchartsPage';
import BlockquotesPage from './../pages/BlockquotesPage';
import BreakpointsPage from './../pages/BreakpointsPage';
import ButtonPage from './../pages/ButtonPage';
import CalendarPage from './../pages/CalendarPage';
import CardPage from './../pages/CardPage';
import CarouselPage from './../pages/CarouselPage';
import ChipsPage from './../pages/ChipsPage';
import CodePage from './../pages/CodePage';
import DatepickerPage from './../pages/DatepickerPage';
import DescriptionListsPage from './../pages/DescriptionListsPage';
import DialogsPage from './../pages/DialogsPage';
import DrawerPage from './../pages/DrawerPage';
import FieldsetsPage from './../pages/FieldsetsPage';
import FormsPage from './../pages/FormsPage';
import HorizontalGridPage from './../pages/HorizontalGridPage';
import HorizontalNavPage from './../pages/HorizontalNavPage';
import IconPage from './../pages/IconPage';
import ImagesPage from './../pages/ImagesPage';
import LinkPage from './../pages/LinkPage';
import ListsPage from './../pages/ListsPage';
import MapPage from './../pages/MapPage';
import InfiniteScrollPage from './../pages/InfiniteScrollPage';
import MobileScrollContainerPage from './../pages/MobileScrollContainerPage';
import ModalsPage from './../pages/ModalsPage';
import NativeButtonLinkPage from './../pages/NativeButtonLinkPage';
import NativeFlatListPage from './../pages/NativeFlatListPage';
import NativeInputPage from './../pages/NativeTextInputPage';
import NativePaginationDotsPage from './../pages/NativePaginationDotsPage';
import NativePickerPage from './../pages/NativePickerPage';
import NativeSelectPage from './../pages/NativeSelectPage';
import NativeSwitchPage from './../pages/NativeSwitchPage';
import NativeTouchableNativeFeedbackPage from './../pages/NativeTouchableNativeFeedbackPage';
import NativeTouchableOverlayPage from './../pages/NativeTouchableOverlayPage';
import NavigationBarPage from './../pages/NavigationBarPage';
import NavigationStackPage from './../pages/NavigationStackPage';
import NudgerPage from './../pages/NudgerPage';
import PaginationPage from './../pages/PaginationPage';
import PanelPage from './../pages/PanelPage';
import PhoneInputPage from './../pages/PhoneInputPage';
import PopoversPage from './../pages/PopoversPage';
import ProgressPage from './../pages/ProgressPage';
import SectionListPage from './../pages/SectionListPage';
import SlidersPage from './../pages/SlidersPage';
import SpinnerPage from './../pages/SpinnerPage';
import StarRatingPage from './../pages/StarRatingPage';
import TablesPage from './../pages/TablesPage';
import TextPage from './../pages/TextPage';
import ThemingPage from './../pages/ThemingPage';
import TicketsPage from './../pages/TicketsPage';
import TooltipsPage from './../pages/TooltipsPage';

import {
  GridColumnDemoPage,
  GridOffsetDemoPage,
} from './../pages/GridDemoPages';

// eslint-disable-next-line import/no-webpack-loader-syntax
const iconsSvgs = require('!!file-loader?name=[name].[hash].zip!zip-it-loader!./../../../bpk-svgs/src/icons/icons');

const Routes = (
  <Route path={ROUTES.HOME} component={DefaultLayout}>
    <IndexRoute component={withRouter(HomePage)} />

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

    <Route path={ROUTES.STYLE_GUIDE} component={StyleGuideLayout}>
      <IndexRedirect to={ROUTES.COPYWRITING} component={CopywritingPage} />
      <Route path={ROUTES.COPYWRITING} component={CopywritingPage} />
    </Route>

    <Route path={ROUTES.COMPONENTS} component={DocsLayout}>
      <IndexRedirect to={ROUTES.ACCORDION} />
      <Route path={ROUTES.TEXT} component={TextPage} />
      <Route path={ROUTES.LINK} component={LinkPage} />
      <Route path={ROUTES.LIST} component={ListsPage} />
      <Route path={ROUTES.DESCRIPTION_LIST} component={DescriptionListsPage} />
      <Route path={ROUTES.TABLE} component={TablesPage} />
      <Route path={ROUTES.BLOCKQUOTE} component={BlockquotesPage} />
      <Route path={ROUTES.CODE} component={CodePage} />
      <Route path={ROUTES.BUTTON} component={ButtonPage} />
      <Route path={ROUTES.BUTTON_LINK} component={NativeButtonLinkPage} />
      <Route path={ROUTES.ICON} component={IconPage} />
      <Route path={ROUTES.SPINNER} component={SpinnerPage} />
      <Route path={ROUTES.FORM} component={FormsPage} />
      <Route path={ROUTES.CARD} component={CardPage} />
      <Route path={ROUTES.CHIP} component={ChipsPage} />
      <Route path={ROUTES.BADGE} component={BadgePage} />
      <Route path={ROUTES.PANEL} component={PanelPage} />
      <Route path={ROUTES.IMAGE} component={ImagesPage} />
      <Route path={ROUTES.BANNER_ALERT} component={BannerAlertPage} />
      <Route
        path={ROUTES.MOBILE_SCROLL_CONTAINER}
        component={MobileScrollContainerPage}
      />
      <Route path={ROUTES.MODAL} component={ModalsPage} />
      <Route path={ROUTES.AUTOSUGGEST} component={AutosuggestPage} />
      <Route path={ROUTES.POPOVER} component={PopoversPage} />
      <Route path={ROUTES.CALENDAR} component={CalendarPage} />
      <Route path={ROUTES.DATEPICKER} component={DatepickerPage} />
      <Route path={ROUTES.TOOLTIP} component={TooltipsPage} />
      <Route path={ROUTES.ACCORDION} component={AccordionsPage} />
      <Route path={ROUTES.NUDGER} component={NudgerPage} />
      <Route path={ROUTES.PROGRESS} component={ProgressPage} />
      <Route path={ROUTES.TICKET} component={TicketsPage} />
      <Route path={ROUTES.HORIZONTAL_NAV} component={HorizontalNavPage} />
      <Route path={ROUTES.FIELDSET} component={FieldsetsPage} />
      <Route path={ROUTES.BARCHART} component={BarchartsPage} />
      <Route path={ROUTES.PAGINATION} component={PaginationPage} />
      <Route path={ROUTES.STAR_RATING} component={StarRatingPage} />
      <Route path={ROUTES.BREAKPOINT} component={BreakpointsPage} />
      <Route path={ROUTES.HORIZONTAL_GRID} component={HorizontalGridPage} />
      <Route path={ROUTES.SLIDER} component={SlidersPage} />
      <Route path={ROUTES.DRAWER} component={DrawerPage} />
      <Route path={ROUTES.DIALOG} component={DialogsPage} />
      <Route path={ROUTES.INPUT} component={NativeInputPage} />
      <Route path={ROUTES.FLAT_LIST} component={NativeFlatListPage} />
      <Route path={ROUTES.NAVIGATION_BAR} component={NavigationBarPage} />
      <Route path={ROUTES.NAVIGATION_STACK} component={NavigationStackPage} />
      <Route
        path={ROUTES.PAGINATION_DOT}
        component={NativePaginationDotsPage}
      />
      <Route path={ROUTES.TEXT_INPUT} component={NativeInputPage} />
      <Route path={ROUTES.PHONE_INPUT} component={PhoneInputPage} />
      <Route path={ROUTES.PICKER} component={NativePickerPage} />
      <Route path={ROUTES.SELECT} component={NativeSelectPage} />
      <Route path={ROUTES.SWITCH} component={NativeSwitchPage} />
      <Route path={ROUTES.SECTION_LIST} component={SectionListPage} />
      <Route path={ROUTES.MAP} component={MapPage} />
      <Route path={ROUTES.INFINITE_SCROLL} component={InfiniteScrollPage} />
      <Route path={ROUTES.CAROUSEL} component={CarouselPage} />
      <Route
        path={ROUTES.TOUCHABLE_OVERLAY}
        component={NativeTouchableOverlayPage}
      />
      <Route
        path={ROUTES.TOUCHABLE_NATIVE_FEEDBACK}
        component={NativeTouchableNativeFeedbackPage}
      />
      <Route path={ROUTES.ALIGNMENT} component={AlignmentPage} />
      <Route path={ROUTES.THEMING} component={ThemingPage} />
      <Route path={ROUTES.ALERT} component={AlertPage} />
    </Route>

    <Route path={ROUTES.GRID_COLUMN_DEMO} component={GridColumnDemoPage} />
    <Route path={ROUTES.GRID_OFFSET_DEMO} component={GridOffsetDemoPage} />

    {Object.keys(redirects).map(from => (
      <Redirect key={from} from={from} to={redirects[from]} />
    ))}
  </Route>
);

export default Routes;
