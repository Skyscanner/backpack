import React from 'react';
import { Route, IndexRoute, IndexRedirect, withRouter } from 'react-router';

import * as ROUTES from './../constants/routes';

import DefaultLayout from './../layouts/DefaultLayout';
import DocsLayout from './../layouts/DocsLayout';

import HomePage from './../pages/HomePage';

import GettingStartedPage from './../pages/GettingStartedPage';
import BackpackReactScriptsPage from './../pages/BackpackReactScriptsPage';
import ContributingPage from './../pages/ContributingPage';
import BaseStylesheetPage from './../pages/BaseStylesheetPage';
import ColorsPage from './../pages/ColorsPage';
import TypesettingPage from './../pages/TypesettingPage';
import RadiiPage from './../pages/RadiiPage';
import ShadowsPage from './../pages/ShadowsPage';
import LayoutPage from './../pages/LayoutPage';
import AnimationPage from './../pages/AnimationPage';

import TypographyPage from './../pages/TypographyPage';
import ButtonsPage from './../pages/ButtonsPage';
import IconsPage from './../pages/IconsPage';
import SpinnersPage from './../pages/SpinnersPage';
import LogosPage from './../pages/LogosPage';
import FormsPage from './../pages/FormsPage';
import CardsPage from './../pages/CardsPage';
import BadgePage from './../pages/BadgePage';

import NotificationsPage from './../pages/NotificationsPage';
import ModalsPage from './../pages/ModalsPage';

import AutosuggestPage from './../pages/AutosuggestPage';

import DownloadsPage from './../pages/DownloadsPage';
import { GridColumnDemoPage, GridOffsetDemoPage } from './../pages/GridDemoPages';

const Routes = (
  <Route path={ROUTES.HOME} component={DefaultLayout}>
    <IndexRoute component={withRouter(HomePage)} />
    <Route path={ROUTES.DOCS} component={DocsLayout}>
      <IndexRedirect to={ROUTES.GETTING_STARTED} />
      <Route path={ROUTES.GETTING_STARTED} component={GettingStartedPage} />
      <Route path={ROUTES.BACKPACK_REACT_SCRIPTS} component={BackpackReactScriptsPage} />
      <Route path={ROUTES.BASE_STYLESHEET} component={BaseStylesheetPage} />
      <Route path={ROUTES.CONTRIBUTING} component={ContributingPage} />
      <Route path={ROUTES.BONDS}>
        <IndexRedirect to={ROUTES.COLORS} />
        <Route path={ROUTES.COLORS} component={ColorsPage} />
        <Route path={ROUTES.TYPESETTING} component={TypesettingPage} />
        <Route path={ROUTES.RADII} component={RadiiPage} />
        <Route path={ROUTES.SHADOWS} component={ShadowsPage} />
        <Route path={ROUTES.LAYOUT} component={LayoutPage} />
        <Route path={ROUTES.ANIMATION} component={AnimationPage} />
      </Route>
      <Route path={ROUTES.ATOMS}>
        <IndexRedirect to={ROUTES.TYPOGRAPHY} />
        <Route path={ROUTES.TYPOGRAPHY} component={TypographyPage} />
        <Route path={ROUTES.BUTTONS} component={ButtonsPage} />
        <Route path={ROUTES.ICONS} component={IconsPage} />
        <Route path={ROUTES.SPINNERS} component={SpinnersPage} />
        <Route path={ROUTES.LOGOS} component={LogosPage} />
        <Route path={ROUTES.FORMS} component={FormsPage} />
        <Route path={ROUTES.CARDS} component={CardsPage} />
        <Route path={ROUTES.BADGE} component={BadgePage} />
      </Route>
      <Route path={ROUTES.MOLECULES}>
        <IndexRedirect to={ROUTES.NOTIFICATIONS} />
        <Route path={ROUTES.NOTIFICATIONS} component={NotificationsPage} />
        <Route path={ROUTES.MODALS} component={ModalsPage} />
        <Route path={ROUTES.AUTOSUGGEST} component={AutosuggestPage} />
      </Route>
      <Route path={ROUTES.ORGANISMS}>
        <IndexRedirect to={ROUTES.GETTING_STARTED} />
      </Route>
    </Route>
    <Route path={ROUTES.DOWNLOADS} component={DownloadsPage} />
    <Route path={ROUTES.GRID_COLUMN_DEMO} component={GridColumnDemoPage} />
    <Route path={ROUTES.GRID_OFFSET_DEMO} component={GridOffsetDemoPage} />
  </Route>
);

export default Routes;
