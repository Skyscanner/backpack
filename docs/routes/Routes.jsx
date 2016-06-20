import React from 'react'
import { Route, IndexRoute } from 'react-router'

import * as routes from './../constants/routes'

import DefaultLayout from './../layouts/DefaultLayout'
import HomePage from './../pages/HomePage'
import ColoursPage from './../pages/ColoursPage'
import IconsPage from '../pages/IconsPage'
import FormsPage from '../pages/FormsPage'
import UnitsPage from '../pages/UnitsPage'
import LogosPage from '../pages/LogosPage'
import SpinnersPage from '../pages/SpinnersPage'

const Routes = (
  <Route path={routes.ROUTE_HOME} component={DefaultLayout}>
    <IndexRoute component={HomePage} />
    <Route path={routes.ROUTE_COLOURS} component={ColoursPage} />
    <Route path={routes.ROUTE_ICONS} component={IconsPage} />
    <Route path={routes.ROUTE_FORMS} component={FormsPage} />
    <Route path={routes.ROUTE_UNITS} component={UnitsPage} />
    <Route path={routes.ROUTE_LOGOS} component={LogosPage} />
    <Route path={routes.ROUTE_SPINNERS} component={SpinnersPage} />
  </Route>
)

export default Routes
