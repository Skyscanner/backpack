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
import NavigationBarPage from './../pages/NavigationBarPage';

import AlignmentPage from './../pages/AlignmentPage';
import ThemingPage from './../pages/ThemingPage';

import NativeBannerAlertPage from './../pages/NativeBannerAlertPage';
import NativeBadgePage from './../pages/NativeBadgePage';
import NativeButtonPage from './../pages/NativeButtonPage';
import NativeButtonLinkPage from './../pages/NativeButtonLinkPage';
import NativeCardsPage from './../pages/NativeCardsPage';
import NativeFlatListPage from './../pages/NativeFlatListPage';
import NativeHorizontalNavPage from './../pages/NativeHorizontalNavPage';
import NativeIconsPage from './../pages/NativeIconsPage';
import NativeInputPage from './../pages/NativeTextInputPage';
import NativeNavigationBarPage from './../pages/NativeNavigationBarPage';
import NativeNudgerPage from './../pages/NativeNudgerPage';
import NativePaginationDotsPage from './../pages/NativePaginationDotsPage';
import NativePanelsPage from './../pages/NativePanelsPage';
import NativePhoneInputPage from './../pages/NativePhoneInputPage';
import NativePickerPage from './../pages/NativePickerPage';
import NativeProgressPage from './../pages/NativeProgressPage';
import NativeSectionListPage from './../pages/NativeSectionListPage';
import NativeSelectPage from './../pages/NativeSelectPage';
import NativeSpinnerPage from './../pages/NativeSpinnerPage';
import NativeStarRatingPage from './../pages/NativeStarRatingPage';
import NativeSwitchPage from './../pages/NativeSwitchPage';
import NativeTextPage from './../pages/NativeTextPage';
import NativeTouchableOverlayPage from './../pages/NativeTouchableOverlayPage';
import NativeTouchableNativeFeedbackPage from './../pages/NativeTouchableNativeFeedbackPage';

import NeoBadgePage from './../pages/NeoBadgePage';
import NeoBannerAlertPage from './../pages/NeoBannerAlertPage';
import NeoButtonPage from './../pages/NeoButtonPage';
import NeoCardPage from './../pages/NeoCardPage';
import NeoHorizontalNavPage from './../pages/NeoHorizontalNavPage';
import NeoIconPage from './../pages/NeoIconPage';
import NeoLinkPage from './../pages/NeoLinkPage';
import NeoNavigationBarPage from './../pages/NeoNavigationBarPage';
import NeoNudgerPage from './../pages/NeoNudgerPage';
import NeoPanelPage from './../pages/NeoPanelPage';
import NeoProgressPage from './../pages/NeoProgressPage';
import NeoSpinnerPage from './../pages/NeoSpinnerPage';
import NeoStarRatingPage from './../pages/NeoStarRatingPage';
import NeoTextPage from './../pages/NeoTextPage';

import {
  GridColumnDemoPage,
  GridOffsetDemoPage,
} from './../pages/GridDemoPages';

// eslint-disable-next-line import/no-webpack-loader-syntax
const iconsSvgs = require('!!file-loader?name=[name].[hash].zip!zip-it-loader!./../../../bpk-svgs/src/icons/icons');

const isOldSite = !process.env.BPK_NEO;

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
        {isOldSite && <Route path={ROUTES.TEXT} component={TextPage} />}
        {isOldSite && <Route path={ROUTES.LINKS} component={LinksPage} />}
        {isOldSite && <Route path={ROUTES.LISTS} component={ListsPage} />}
        {isOldSite && (
          <Route
            path={ROUTES.DESCRIPTION_LISTS}
            component={DescriptionListsPage}
          />
        )}
        {isOldSite && <Route path={ROUTES.TABLES} component={TablesPage} />}
        {isOldSite && (
          <Route path={ROUTES.BLOCKQUOTES} component={BlockquotesPage} />
        )}
        {isOldSite && <Route path={ROUTES.CODE} component={CodePage} />}
        {isOldSite && <Route path={ROUTES.BUTTONS} component={ButtonsPage} />}
        {isOldSite && <Route path={ROUTES.ICONS} component={IconsPage} />}
        {isOldSite && <Route path={ROUTES.SPINNERS} component={SpinnersPage} />}
        {isOldSite && <Route path={ROUTES.FORMS} component={FormsPage} />}
        {isOldSite && <Route path={ROUTES.CARDS} component={CardsPage} />}
        {isOldSite && <Route path={ROUTES.CHIPS} component={ChipsPage} />}
        {isOldSite && <Route path={ROUTES.BADGE} component={BadgePage} />}
        {isOldSite && <Route path={ROUTES.PANELS} component={PanelsPage} />}
        {isOldSite && <Route path={ROUTES.IMAGES} component={ImagesPage} />}
        {isOldSite && (
          <Route path={ROUTES.BANNER_ALERTS} component={BannerAlertsPage} />
        )}
        {isOldSite && (
          <Route
            path={ROUTES.MOBILE_SCROLL_CONTAINER}
            component={MobileScrollContainerPage}
          />
        )}
        {isOldSite && <Route path={ROUTES.MODALS} component={ModalsPage} />}
        {isOldSite && (
          <Route path={ROUTES.AUTOSUGGEST} component={AutosuggestPage} />
        )}
        {isOldSite && <Route path={ROUTES.POPOVERS} component={PopoversPage} />}
        {isOldSite && <Route path={ROUTES.CALENDAR} component={CalendarPage} />}
        {isOldSite && (
          <Route path={ROUTES.DATEPICKER} component={DatepickerPage} />
        )}
        {isOldSite && <Route path={ROUTES.TOOLTIPS} component={TooltipsPage} />}
        {isOldSite && (
          <Route path={ROUTES.ACCORDIONS} component={AccordionsPage} />
        )}
        {isOldSite && <Route path={ROUTES.NUDGERS} component={NudgersPage} />}
        {isOldSite && <Route path={ROUTES.PROGRESS} component={ProgressPage} />}
        {isOldSite && (
          <Route path={ROUTES.PAGINATION} component={PaginationPage} />
        )}
        {isOldSite && <Route path={ROUTES.TICKETS} component={TicketsPage} />}
        {isOldSite && (
          <Route path={ROUTES.HORIZONTAL_NAV} component={HorizontalNavPage} />
        )}
        {isOldSite && (
          <Route path={ROUTES.FIELDSETS} component={FieldsetsPage} />
        )}
        {isOldSite && (
          <Route path={ROUTES.BARCHARTS} component={BarchartsPage} />
        )}
        {isOldSite && (
          <Route path={ROUTES.STAR_RATING} component={StarRatingPage} />
        )}
        {isOldSite && (
          <Route path={ROUTES.BREAKPOINTS} component={BreakpointsPage} />
        )}
        {isOldSite && (
          <Route path={ROUTES.HORIZONTAL_GRID} component={HorizontalGridPage} />
        )}
        {isOldSite && <Route path={ROUTES.SLIDERS} component={SlidersPage} />}
        {isOldSite && <Route path={ROUTES.DRAWER} component={DrawerPage} />}
        {isOldSite && <Route path={ROUTES.DIALOGS} component={DialogsPage} />}
        {isOldSite && (
          <Route path={ROUTES.NAVIGATION_BAR} component={NavigationBarPage} />
        )}
        {/* Neo routes. */}
        <Route path={ROUTES.NEO_TEXT} component={NeoTextPage} />
        <Route path={ROUTES.NEO_LINK} component={NeoLinkPage} />
        <Route path={ROUTES.NEO_LIST} component={ListsPage} />
        <Route
          path={ROUTES.NEO_DESCRIPTION_LIST}
          component={DescriptionListsPage}
        />
        <Route path={ROUTES.NEO_TABLE} component={TablesPage} />
        <Route path={ROUTES.NEO_BLOCKQUOTE} component={BlockquotesPage} />
        <Route path={ROUTES.NEO_CODE} component={CodePage} />
        <Route path={ROUTES.NEO_BUTTON} component={NeoButtonPage} />
        <Route path={ROUTES.NEO_BUTTON_LINK} component={NativeButtonLinkPage} />
        <Route path={ROUTES.NEO_ICON} component={NeoIconPage} />
        <Route path={ROUTES.NEO_SPINNER} component={NeoSpinnerPage} />
        <Route path={ROUTES.NEO_FORM} component={FormsPage} />
        <Route path={ROUTES.NEO_CARD} component={NeoCardPage} />
        <Route path={ROUTES.NEO_CHIP} component={ChipsPage} />
        <Route path={ROUTES.NEO_BADGE} component={NeoBadgePage} />
        <Route path={ROUTES.NEO_PANEL} component={NeoPanelPage} />
        <Route path={ROUTES.NEO_IMAGE} component={ImagesPage} />
        <Route path={ROUTES.NEO_BANNER_ALERT} component={NeoBannerAlertPage} />
        <Route
          path={ROUTES.NEO_MOBILE_SCROLL_CONTAINER}
          component={MobileScrollContainerPage}
        />
        <Route path={ROUTES.NEO_MODAL} component={ModalsPage} />
        <Route path={ROUTES.NEO_AUTOSUGGEST} component={AutosuggestPage} />
        <Route path={ROUTES.NEO_POPOVER} component={PopoversPage} />
        <Route path={ROUTES.NEO_CALENDAR} component={CalendarPage} />
        <Route path={ROUTES.NEO_DATEPICKER} component={DatepickerPage} />
        <Route path={ROUTES.NEO_TOOLTIP} component={TooltipsPage} />
        <Route path={ROUTES.NEO_ACCORDION} component={AccordionsPage} />
        <Route path={ROUTES.NEO_NUDGER} component={NeoNudgerPage} />
        <Route path={ROUTES.NEO_PROGRESS} component={NeoProgressPage} />
        <Route path={ROUTES.NEO_TICKET} component={TicketsPage} />
        <Route
          path={ROUTES.NEO_HORIZONTAL_NAV}
          component={NeoHorizontalNavPage}
        />
        <Route path={ROUTES.NEO_FIELDSET} component={FieldsetsPage} />
        <Route path={ROUTES.NEO_BARCHART} component={BarchartsPage} />
        <Route path={ROUTES.NEO_PAGINATION} component={PaginationPage} />
        <Route path={ROUTES.NEO_STAR_RATING} component={NeoStarRatingPage} />
        <Route path={ROUTES.NEO_BREAKPOINT} component={BreakpointsPage} />
        <Route
          path={ROUTES.NEO_HORIZONTAL_GRID}
          component={HorizontalGridPage}
        />
        <Route path={ROUTES.NEO_SLIDER} component={SlidersPage} />
        <Route path={ROUTES.NEO_DRAWER} component={DrawerPage} />
        <Route path={ROUTES.NEO_DIALOG} component={DialogsPage} />
        <Route path={ROUTES.NEO_INPUT} component={NativeInputPage} />
        <Route path={ROUTES.NEO_FLAT_LIST} component={NativeFlatListPage} />
        <Route
          path={ROUTES.NEO_NAVIGATION_BAR}
          component={NeoNavigationBarPage}
        />
        <Route
          path={ROUTES.NEO_PAGINATION_DOT}
          component={NativePaginationDotsPage}
        />
        <Route path={ROUTES.NEO_TEXT_INPUT} component={NativeInputPage} />
        <Route path={ROUTES.NEO_PHONE_INPUT} component={NativePhoneInputPage} />
        <Route path={ROUTES.NEO_PICKER} component={NativePickerPage} />
        <Route path={ROUTES.NEO_SELECT} component={NativeSelectPage} />
        <Route path={ROUTES.NEO_SWITCH} component={NativeSwitchPage} />
        <Route
          path={ROUTES.NEO_SECTION_LIST}
          component={NativeSectionListPage}
        />
        <Route
          path={ROUTES.NEO_TOUCHABLE_OVERLAY}
          component={NativeTouchableOverlayPage}
        />
        <Route
          path={ROUTES.NEO_TOUCHABLE_NATIVE_FEEDBACK}
          component={NativeTouchableNativeFeedbackPage}
        />
        <Route path={ROUTES.NEO_ALIGNMENT} component={AlignmentPage} />
        <Route path={ROUTES.NEO_THEMING} component={ThemingPage} />
      </Route>

      {isOldSite && (
        <Route path={ROUTES.NATIVE_COMPONENTS}>
          <IndexRedirect to={ROUTES.NATIVE_TEXT} />

          <Route
            path={ROUTES.NATIVE_BANNER_ALERT}
            component={NativeBannerAlertPage}
          />

          <Route path={ROUTES.NATIVE_BADGE} component={NativeBadgePage} />
          <Route path={ROUTES.NATIVE_BUTTON} component={NativeButtonPage} />
          <Route
            path={ROUTES.NATIVE_BUTTON_LINK}
            component={NativeButtonLinkPage}
          />
          <Route path={ROUTES.NATIVE_CARDS} component={NativeCardsPage} />
          <Route
            path={ROUTES.NATIVE_FLAT_LIST}
            component={NativeFlatListPage}
          />
          <Route
            path={ROUTES.NATIVE_HORIZONTAL_NAV}
            component={NativeHorizontalNavPage}
          />
          <Route path={ROUTES.NATIVE_ICONS} component={NativeIconsPage} />
          <Route path={ROUTES.NATIVE_INPUT} component={NativeInputPage} />
          <Route
            path={ROUTES.NATIVE_NAVIGATION_BAR}
            component={NativeNavigationBarPage}
          />
          <Route path={ROUTES.NATIVE_NUDGER} component={NativeNudgerPage} />
          <Route
            path={ROUTES.NATIVE_PAGINATION_DOTS}
            component={NativePaginationDotsPage}
          />
          <Route path={ROUTES.NATIVE_PANELS} component={NativePanelsPage} />
          <Route
            path={ROUTES.NATIVE_PHONE_INPUT}
            component={NativePhoneInputPage}
          />
          <Route path={ROUTES.NATIVE_PICKER} component={NativePickerPage} />
          <Route path={ROUTES.NATIVE_PROGRESS} component={NativeProgressPage} />
          <Route
            path={ROUTES.NATIVE_SECTION_LIST}
            component={NativeSectionListPage}
          />
          <Route path={ROUTES.NATIVE_SELECT} component={NativeSelectPage} />
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
          <Route
            path={ROUTES.NATIVE_TOUCHABLE_NATIVE_FEEDBACK}
            component={NativeTouchableNativeFeedbackPage}
          />
        </Route>
      )}
      <Route path={ROUTES.UTILITIES}>
        <IndexRedirect to={ROUTES.ALIGNMENT} />
        {isOldSite && (
          <Route path={ROUTES.ALIGNMENT} component={AlignmentPage} />
        )}
        {isOldSite && <Route path={ROUTES.THEMING} component={ThemingPage} />}
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
