import React from 'react'
import { Route, IndexRoute, withRouter } from 'react-router'

import * as ROUTES from './../constants/routes'

import DefaultLayout from './../layouts/DefaultLayout'
import DocsLayout from './../layouts/DocsLayout'

import HomePage from './../pages/HomePage'

import GettingStartedPage from './../pages/GettingStartedPage'
import BaseStylesheetPage from './../pages/BaseStylesheetPage'
import ColorsPage from './../pages/ColorsPage'
import SpacingPage from './../pages/SpacingPage'
import TypeUnitsPage from './../pages/TypeUnitsPage'
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
      <IndexRoute component={GettingStartedPage} />
      <Route path={ROUTES.GETTING_STARTED} component={GettingStartedPage} />
      <Route path={ROUTES.BONDS}>
        <IndexRoute component={BaseStylesheetPage} />
        <Route path={ROUTES.BASE_STYLESHEET} component={BaseStylesheetPage} />
        <Route path={ROUTES.COLORS} component={ColorsPage} />
        <Route path={ROUTES.SPACING} component={SpacingPage} />
        <Route path={ROUTES.TYPE_UNITS} component={TypeUnitsPage} />
        <Route path={ROUTES.LAYOUT} component={LayoutPage} />
      </Route>
      <Route path={ROUTES.ATOMS}>
        <IndexRoute component={TypographyPage} />
        <Route path={ROUTES.TYPOGRAPHY} component={TypographyPage} />
        <Route path={ROUTES.BUTTONS} component={ButtonsPage} />
        <Route path={ROUTES.ICONS} component={IconsPage} />
        <Route path={ROUTES.SPINNERS} component={SpinnersPage} />
        <Route path={ROUTES.LOGOS} component={LogosPage} />
      </Route>
      <Route path={ROUTES.MOLECULES}>
        <IndexRoute component={GettingStartedPage} />
      </Route>
      <Route path={ROUTES.ORGANISMS}>
        <IndexRoute component={GettingStartedPage} />
      </Route>
    </Route>
    <Route path={ROUTES.DOWNLOADS} component={DownloadsPage} />
  </Route>
)

export default Routes
