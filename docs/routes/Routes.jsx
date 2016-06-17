import React from 'react'
import { Route, IndexRoute } from 'react-router'

import * as routes from './../constants/routes'

import DefaultLayout from './../layouts/DefaultLayout'
import AtomsLayout from './../layouts/AtomsLayout'

import HomePage from './../pages/HomePage'
import AtomsPage from './../pages/AtomsPage'
import MoleculesPage from './../pages/MoleculesPage'
import OrganismsPage from './../pages/OrganismsPage'

import TypographyPage from './../pages/TypographyPage'

const Routes = (
  <Route path={routes.ROUTE_HOME} component={DefaultLayout}>
    <IndexRoute component={HomePage}/>
    <Route path={routes.ROUTE_ATOMS} component={AtomsLayout}>
      <IndexRoute component={AtomsPage}/>
      <Route path={routes.ROUTE_TYPOGRAPHY} component={TypographyPage}/>
    </Route>
    <Route path={routes.ROUTE_MOLECULES} component={MoleculesPage}/>
    <Route path={routes.ROUTE_ORGANISMS} component={OrganismsPage}/>
  </Route>
)

export default Routes
