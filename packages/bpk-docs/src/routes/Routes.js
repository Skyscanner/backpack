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

const withPlatform = route => `${route}/:platform(native|web)?`;

const ROUTES_MAPPING = [
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
      { path: withPlatform(ROUTES.ACCORDION), component: AccordionsPage },
      { path: withPlatform(ROUTES.ALERT), component: AlertPage },
      { path: withPlatform(ROUTES.ALIGNMENT), component: AlignmentPage },
      {
        path: withPlatform(ROUTES.AUTOSUGGEST),
        component: AutosuggestPage,
      },
      { path: withPlatform(ROUTES.BADGE), component: BadgePage },
      {
        path: withPlatform(ROUTES.BANNER_ALERT),
        component: BannerAlertPage,
      },
      { path: withPlatform(ROUTES.BARCHART), component: BarchartsPage },
      {
        path: withPlatform(ROUTES.BLOCKQUOTE),
        component: BlockquotesPage,
      },
      { path: withPlatform(ROUTES.BREADCRUMB), component: BreadcrumbPage },
      {
        path: withPlatform(ROUTES.BREAKPOINT),
        component: BreakpointsPage,
      },
      { path: withPlatform(ROUTES.BUTTON), component: ButtonPage },
      { path: withPlatform(ROUTES.CALENDAR), component: CalendarPage },
      { path: withPlatform(ROUTES.CARD), component: CardPage },
      { path: withPlatform(ROUTES.CAROUSEL), component: CarouselPage },
      { path: withPlatform(ROUTES.CHIP), component: ChipsPage },
      { path: withPlatform(ROUTES.CODE), component: CodePage },
      { path: withPlatform(ROUTES.DATEPICKER), component: DatepickerPage },
      {
        path: withPlatform(ROUTES.DESCRIPTION_LIST),
        component: DescriptionListsPage,
      },
      { path: withPlatform(ROUTES.DIALOG), component: DialogsPage },
      { path: withPlatform(ROUTES.DRAWER), component: DrawerPage },
      { path: withPlatform(ROUTES.FIELDSET), component: FieldsetsPage },
      {
        path: withPlatform(ROUTES.FLAT_LIST),
        component: NativeFlatListPage,
      },
      { path: withPlatform(ROUTES.FORM), component: FormsPage },
      {
        path: withPlatform(ROUTES.HORIZONTAL_GRID),
        component: HorizontalGridPage,
      },
      {
        path: withPlatform(ROUTES.HORIZONTAL_NAV),
        component: HorizontalNavPage,
      },
      { path: withPlatform(ROUTES.ICON), component: IconPage },
      { path: withPlatform(ROUTES.IMAGE), component: ImagesPage },
      {
        path: withPlatform(ROUTES.INFINITE_SCROLL),
        component: InfiniteScrollPage,
      },
      { path: withPlatform(ROUTES.LINK), component: LinkPage },
      { path: withPlatform(ROUTES.LIST), component: ListsPage },
      { path: withPlatform(ROUTES.MAP), component: MapPage },
      {
        path: withPlatform(ROUTES.MOBILE_SCROLL_CONTAINER),
        component: MobileScrollContainerPage,
      },
      { path: withPlatform(ROUTES.MODAL), component: ModalsPage },
      {
        path: withPlatform(ROUTES.NAVIGATION_BAR),
        component: NavigationBarPage,
      },
      {
        path: withPlatform(ROUTES.NAVIGATION_STACK),
        component: NavigationStackPage,
      },
      { path: withPlatform(ROUTES.NUDGER), component: NudgerPage },
      { path: withPlatform(ROUTES.PAGINATION), component: PaginationPage },
      { path: withPlatform(ROUTES.PANEL), component: PanelPage },
      {
        path: withPlatform(ROUTES.PHONE_INPUT),
        component: PhoneInputPage,
      },
      { path: withPlatform(ROUTES.PICKER), component: NativePickerPage },
      { path: withPlatform(ROUTES.POPOVER), component: PopoversPage },
      { path: withPlatform(ROUTES.PROGRESS), component: ProgressPage },
      {
        path: withPlatform(ROUTES.SCROLLABLE_CALENDAR),
        component: ScrollableCalendarPage,
      },
      {
        path: withPlatform(ROUTES.SECTION_LIST),
        component: SectionListPage,
      },
      { path: withPlatform(ROUTES.SELECT), component: NativeSelectPage },
      { path: withPlatform(ROUTES.SLIDER), component: SlidersPage },
      { path: withPlatform(ROUTES.SPINNER), component: SpinnerPage },
      {
        path: withPlatform(ROUTES.STAR_RATING),
        component: StarRatingPage,
      },
      { path: withPlatform(ROUTES.SWITCH), component: NativeSwitchPage },
      { path: withPlatform(ROUTES.TABLE), component: TablesPage },
      { path: withPlatform(ROUTES.TEXT), component: TextPage },
      {
        path: withPlatform(ROUTES.TEXT_INPUT),
        component: NativeInputPage,
      },
      { path: withPlatform(ROUTES.THEMING), component: ThemingPage },
      { path: withPlatform(ROUTES.TICKET), component: TicketsPage },
      { path: withPlatform(ROUTES.TOOLTIP), component: TooltipsPage },
      {
        path: withPlatform(ROUTES.TOUCHABLE_NATIVE_FEEDBACK),
        component: NativeTouchableNativeFeedbackPage,
      },
      {
        path: withPlatform(ROUTES.TOUCHABLE_OVERLAY),
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

const withLayout = (Layout, Component) => {
  if (!Layout) {
    return Component;
  }
  return props => (
    <Layout>
      <Component {...props} />
    </Layout>
  );
};

const expandRoutes = (routes, layout) =>
  routes.reduce((all, routeConfig) => {
    const {
      component,
      routes: childRoutes,
      layout: routeLayout,
      redirect,
      path,
      ...routeProps
    } = routeConfig;
    if (component) {
      const Component = withLayout(layout, component);
      all.push(
        <Route
          key={path}
          path={path}
          component={Component}
          exact
          {...routeProps}
        />,
      );
    }

    if (redirect) {
      all.push(<Redirect exact key={path} from={path} to={redirect} />);
    }

    // Note we concat child routes instead of nesting them because
    // we want a "flat" deffinition so we get a 404 when the child route
    // doesn't match, even if the parent does.
    // e.g. if we have `/components` as a route and `/components/badge` nested,
    // `/components/anything` would still render because the parent matches.
    // The solution is to have them in a flat structure inside a <Switch>
    // container.
    if (childRoutes && childRoutes.length) {
      return all.concat(expandRoutes(childRoutes, routeLayout));
    }

    return all;
  }, []);

const allRoutes = expandRoutes(ROUTES_MAPPING);

const Routes = () => (
  <DefaultLayout>
    <Switch>{allRoutes}</Switch>
  </DefaultLayout>
);

export default Routes;
