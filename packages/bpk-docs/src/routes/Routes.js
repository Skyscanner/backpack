import React from 'react'
import { Route, IndexRoute, IndexRedirect, withRouter } from 'react-router'

import * as ROUTES from './../constants/routes'

import DefaultLayout from './../layouts/DefaultLayout'
import DocsLayout from './../layouts/DocsLayout'

import HomePage from './../pages/HomePage'

import GettingStartedPage from './../pages/GettingStartedPage'
import ContributingPage from './../pages/ContributingPage'
import BaseStylesheetPage from './../pages/BaseStylesheetPage'
import ColorsPage from './../pages/ColorsPage'
import SpacingPage from './../pages/SpacingPage'
import TypeSettingPage from './../pages/TypeSettingPage'
import LayoutPage from './../pages/LayoutPage'

import TypographyPage from './../pages/TypographyPage'
import ButtonsPage from './../pages/ButtonsPage'
import IconsPage from './../pages/IconsPage'
import SpinnersPage from './../pages/SpinnersPage'
import LogosPage from './../pages/LogosPage'

import DownloadsPage from './../pages/DownloadsPage'

const Routes = (
  <Route path={ROUTES.HOME} component={DefaultLayout}>
    <IndexRoute component={withRouter(HomePage)} />
    <Route path={ROUTES.DOCS} component={DocsLayout}>
      <IndexRedirect to={ROUTES.GETTING_STARTED} />
      <Route path={ROUTES.GETTING_STARTED} component={GettingStartedPage} />
      <Route path={ROUTES.BASE_STYLESHEET} component={BaseStylesheetPage} />
      <Route path={ROUTES.CONTRIBUTING} component={ContributingPage} />
      <Route path={ROUTES.BONDS}>
        <IndexRedirect to={ROUTES.COLORS} />
        <Route path={ROUTES.COLORS} component={ColorsPage} />
        <Route path={ROUTES.SPACING} component={SpacingPage} />
        <Route path={ROUTES.TYPE_SETTING} component={TypeSettingPage} />
        <Route path={ROUTES.LAYOUT} component={LayoutPage} />
      </Route>
      <Route path={ROUTES.ATOMS}>
        <IndexRedirect to={ROUTES.TYPOGRAPHY} />
        <Route path={ROUTES.TYPOGRAPHY} component={TypographyPage} />
        <Route path={ROUTES.BUTTONS} component={ButtonsPage} />
        <Route path={ROUTES.ICONS} component={IconsPage} />
        <Route path={ROUTES.SPINNERS} component={SpinnersPage} />
        <Route path={ROUTES.LOGOS} component={LogosPage} />
      </Route>
      <Route path={ROUTES.MOLECULES}>
        <IndexRedirect to={ROUTES.GETTING_STARTED} />
      </Route>
      <Route path={ROUTES.ORGANISMS}>
        <IndexRedirect to={ROUTES.GETTING_STARTED} />
      </Route>
    </Route>
    <Route path={ROUTES.DOWNLOADS} component={DownloadsPage} />
  </Route>
)

export default Routes
