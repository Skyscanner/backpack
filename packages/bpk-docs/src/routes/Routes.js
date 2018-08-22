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
import { Route, Redirect, Switch } from 'react-router-dom';

import * as ROUTES from '../constants/routes';
import redirects from '../constants/redirect-routes';

import DefaultLayout from '../layouts/DefaultLayout';
import UsingLayout from '../layouts/UsingLayout';
import TokensLayout from '../layouts/TokensLayout';
import StyleGuideLayout from '../layouts/StyleGuideLayout';
import DocsLayout from '../layouts/DocsLayout';

import HomePage from '../pages/HomePage';

import GettingStartedPage from '../pages/GettingStartedPage';
import BackpackReactScriptsPage from '../pages/BackpackReactScriptsPage';
import BaseStylesheetPage from '../pages/BaseStylesheetPage';
import ContributingPage from '../pages/ContributingPage';
import PrinciplesPage from '../pages/PrinciplesPage';

import ColorsPage from '../pages/ColorsPage';
import TypesettingPage from '../pages/TypesettingPage';
import RadiiPage from '../pages/RadiiPage';
import ShadowsPage from '../pages/ShadowsPage';
import BordersPage from '../pages/BordersPage';
import SpacingsPage from '../pages/SpacingsPage';
import AnimationPage from '../pages/AnimationPage';
import ZIndexesPage from '../pages/ZIndexesPage';

import CopywritingPage from '../pages/CopywritingPage';

import AccordionsPage from '../pages/AccordionsPage';
import AlertPage from '../pages/AlertPage';
import AlignmentPage from '../pages/AlignmentPage';
import AutosuggestPage from '../pages/AutosuggestPage';
import BadgePage from '../pages/BadgePage';
import BannerAlertPage from '../pages/BannerAlertPage';
import BarchartsPage from '../pages/BarchartsPage';
import BlockquotesPage from '../pages/BlockquotesPage';
import BreakpointsPage from '../pages/BreakpointsPage';
import BreadcrumbPage from '../pages/BreadcrumbPage';
import ButtonPage from '../pages/ButtonPage';
import CalendarPage from '../pages/CalendarPage';
import CardPage from '../pages/CardPage';
import CarouselPage from '../pages/CarouselPage';
import ChipsPage from '../pages/ChipsPage';
import CodePage from '../pages/CodePage';
import DatepickerPage from '../pages/DatepickerPage';
import DescriptionListsPage from '../pages/DescriptionListsPage';
import DialogsPage from '../pages/DialogsPage';
import DrawerPage from '../pages/DrawerPage';
import FieldsetsPage from '../pages/FieldsetsPage';
import FormsPage from '../pages/FormsPage';
import HorizontalGridPage from '../pages/HorizontalGridPage';
import HorizontalNavPage from '../pages/HorizontalNavPage';
import IconPage from '../pages/IconPage';
import ImagesPage from '../pages/ImagesPage';
import LinkPage from '../pages/LinkPage';
import ListsPage from '../pages/ListsPage';
import MapPage from '../pages/MapPage';
import InfiniteScrollPage from '../pages/InfiniteScrollPage';
import MobileScrollContainerPage from '../pages/MobileScrollContainerPage';
import ModalsPage from '../pages/ModalsPage';
import NativeFlatListPage from '../pages/NativeFlatListPage';
import NativeInputPage from '../pages/NativeTextInputPage';
import NativePickerPage from '../pages/NativePickerPage';
import NativeSelectPage from '../pages/NativeSelectPage';
import NativeSwitchPage from '../pages/NativeSwitchPage';
import NativeTouchableNativeFeedbackPage from '../pages/NativeTouchableNativeFeedbackPage';
import NativeTouchableOverlayPage from '../pages/NativeTouchableOverlayPage';
import NavigationBarPage from '../pages/NavigationBarPage';
import NavigationStackPage from '../pages/NavigationStackPage';
import NudgerPage from '../pages/NudgerPage';
import PaginationPage from '../pages/PaginationPage';
import PanelPage from '../pages/PanelPage';
import PhoneInputPage from '../pages/PhoneInputPage';
import PopoversPage from '../pages/PopoversPage';
import ProgressPage from '../pages/ProgressPage';
import ScrollableCalendarPage from '../pages/ScrollableCalendarPage';
import SectionListPage from '../pages/SectionListPage';
import SlidersPage from '../pages/SlidersPage';
import SpinnerPage from '../pages/SpinnerPage';
import StarRatingPage from '../pages/StarRatingPage';
import TablesPage from '../pages/TablesPage';
import TextPage from '../pages/TextPage';
import ThemingPage from '../pages/ThemingPage';
import TicketsPage from '../pages/TicketsPage';
import TooltipsPage from '../pages/TooltipsPage';

import { GridColumnDemoPage, GridOffsetDemoPage } from '../pages/GridDemoPages';

export const ROUTES_MAPPINGS = [
  { path: ROUTES.HOME, component: HomePage },
  {
    path: ROUTES.USING_BACKPACK,
    layout: UsingLayout,
    redirect: ROUTES.GETTING_STARTED,
    routes: [
      {
        path: ROUTES.GETTING_STARTED,
        component: GettingStartedPage,
      },
      {
        path: ROUTES.BACKPACK_REACT_SCRIPTS,
        component: BackpackReactScriptsPage,
      },
      {
        path: ROUTES.BASE_STYLESHEET,
        component: BaseStylesheetPage,
      },
      { path: ROUTES.CONTRIBUTING, component: ContributingPage },
      { path: ROUTES.PRINCIPLES, component: PrinciplesPage },
    ],
  },
  {
    path: ROUTES.TOKENS,
    layout: TokensLayout,
    redirect: ROUTES.ANIMATION,
    routes: [
      { path: ROUTES.ANIMATION, component: AnimationPage },
      { path: ROUTES.BORDERS, component: BordersPage },
      { path: ROUTES.COLORS, component: ColorsPage },
      { path: ROUTES.SPACINGS, component: SpacingsPage },
      { path: ROUTES.RADII, component: RadiiPage },
      { path: ROUTES.SHADOWS, component: ShadowsPage },
      { path: ROUTES.TYPESETTING, component: TypesettingPage },
      { path: ROUTES.Z_INDEXES, component: ZIndexesPage },
    ],
  },
  {
    path: ROUTES.STYLE_GUIDE,
    layout: StyleGuideLayout,
    redirect: ROUTES.COPYWRITING,
    routes: [{ path: ROUTES.COPYWRITING, component: CopywritingPage }],
  },
  {
    path: ROUTES.COMPONENTS,
    layout: DocsLayout,
    redirect: ROUTES.ACCORDION,
    routes: [
      { path: ROUTES.ACCORDION, component: AccordionsPage },
      { path: ROUTES.ALERT, component: AlertPage },
      { path: ROUTES.ALIGNMENT, component: AlignmentPage },
      {
        path: ROUTES.AUTOSUGGEST,
        component: AutosuggestPage,
      },
      { path: ROUTES.BADGE, component: BadgePage },
      {
        path: ROUTES.BANNER_ALERT,
        component: BannerAlertPage,
      },
      { path: ROUTES.BARCHART, component: BarchartsPage },
      {
        path: ROUTES.BLOCKQUOTE,
        component: BlockquotesPage,
      },
      { path: ROUTES.BREADCRUMB, component: BreadcrumbPage },
      {
        path: ROUTES.BREAKPOINT,
        component: BreakpointsPage,
      },
      { path: ROUTES.BUTTON, component: ButtonPage },
      { path: ROUTES.CALENDAR, component: CalendarPage },
      { path: ROUTES.CARD, component: CardPage },
      { path: ROUTES.CAROUSEL, component: CarouselPage },
      { path: ROUTES.CHIP, component: ChipsPage },
      { path: ROUTES.CODE, component: CodePage },
      { path: ROUTES.DATEPICKER, component: DatepickerPage },
      {
        path: ROUTES.DESCRIPTION_LIST,
        component: DescriptionListsPage,
      },
      { path: ROUTES.DIALOG, component: DialogsPage },
      { path: ROUTES.DRAWER, component: DrawerPage },
      { path: ROUTES.FIELDSET, component: FieldsetsPage },
      {
        path: ROUTES.FLAT_LIST,
        component: NativeFlatListPage,
      },
      { path: ROUTES.FORM, component: FormsPage },
      {
        path: ROUTES.HORIZONTAL_GRID,
        component: HorizontalGridPage,
      },
      {
        path: ROUTES.HORIZONTAL_NAV,
        component: HorizontalNavPage,
      },
      { path: ROUTES.ICON, component: IconPage },
      { path: ROUTES.IMAGE, component: ImagesPage },
      {
        path: ROUTES.INFINITE_SCROLL,
        component: InfiniteScrollPage,
      },
      { path: ROUTES.LINK, component: LinkPage },
      { path: ROUTES.LIST, component: ListsPage },
      { path: ROUTES.MAP, component: MapPage },
      {
        path: ROUTES.MOBILE_SCROLL_CONTAINER,
        component: MobileScrollContainerPage,
      },
      { path: ROUTES.MODAL, component: ModalsPage },
      {
        path: ROUTES.NAVIGATION_BAR,
        component: NavigationBarPage,
      },
      {
        path: ROUTES.NAVIGATION_STACK,
        component: NavigationStackPage,
      },
      { path: ROUTES.NUDGER, component: NudgerPage },
      { path: ROUTES.PAGINATION, component: PaginationPage },
      { path: ROUTES.PANEL, component: PanelPage },
      {
        path: ROUTES.PHONE_INPUT,
        component: PhoneInputPage,
      },
      { path: ROUTES.PICKER, component: NativePickerPage },
      { path: ROUTES.POPOVER, component: PopoversPage },
      { path: ROUTES.PROGRESS, component: ProgressPage },
      {
        path: ROUTES.SCROLLABLE_CALENDAR,
        component: ScrollableCalendarPage,
      },
      {
        path: ROUTES.SECTION_LIST,
        component: SectionListPage,
      },
      { path: ROUTES.SELECT, component: NativeSelectPage },
      { path: ROUTES.SLIDER, component: SlidersPage },
      { path: ROUTES.SPINNER, component: SpinnerPage },
      {
        path: ROUTES.STAR_RATING,
        component: StarRatingPage,
      },
      { path: ROUTES.SWITCH, component: NativeSwitchPage },
      { path: ROUTES.TABLE, component: TablesPage },
      { path: ROUTES.TEXT, component: TextPage },
      {
        path: ROUTES.TEXT_INPUT,
        component: NativeInputPage,
      },
      { path: ROUTES.THEMING, component: ThemingPage },
      { path: ROUTES.TICKET, component: TicketsPage },
      { path: ROUTES.TOOLTIP, component: TooltipsPage },
      {
        path: ROUTES.TOUCHABLE_NATIVE_FEEDBACK,
        component: NativeTouchableNativeFeedbackPage,
      },
      {
        path: ROUTES.TOUCHABLE_OVERLAY,
        component: NativeTouchableOverlayPage,
      },
    ],
  },
  { path: ROUTES.GRID_COLUMN_DEMO, component: GridColumnDemoPage },
  { path: ROUTES.GRID_OFFSET_DEMO, component: GridOffsetDemoPage },
  ...Object.keys(redirects).map(from => ({
    path: from,
    redirect: redirects[from],
  })),
];

const expandRoutes = routes =>
  routes.reduce((all, routeConfig) => {
    const {
      component,
      routes: childRoutes,
      layout: RouteLayout,
      redirect,
      path,
      ...routeProps
    } = routeConfig;
    if (component) {
      all.push(
        <Route
          key={path}
          path={path}
          component={component}
          exact
          {...routeProps}
        />,
      );
    }

    if (redirect) {
      all.push(<Redirect exact key={redirect} from={path} to={redirect} />);
    }

    if (childRoutes && childRoutes.length) {
      all.push(
        <Route key={path} path={path}>
          <RouteLayout>
            <Switch>{expandRoutes(childRoutes)}</Switch>
          </RouteLayout>
        </Route>,
      );
    }

    return all;
  }, []);

const allRoutes = expandRoutes(ROUTES_MAPPINGS);

const Routes = () => (
  <DefaultLayout>
    <Switch>{allRoutes}</Switch>
  </DefaultLayout>
);

export default Routes;
