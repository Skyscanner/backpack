import React from 'react'
import { Route, IndexRoute } from 'react-router'

import * as ROUTES from './../constants/routes'

import DefaultLayout from './../layouts/DefaultLayout'
import BondsLayout from './../layouts/BondsLayout'
import AtomsLayout from './../layouts/AtomsLayout'
import MoleculesLayout from './../layouts/MoleculesLayout'
import OrganismsLayout from './../layouts/OrganismsLayout'

import HomePage from './../pages/HomePage'

import BondsPage from './../pages/BondsPage'
import ColorsPage from './../pages/ColorsPage'

import AtomsPage from './../pages/AtomsPage'
import TypographyPage from './../pages/TypographyPage'
import ButtonsPage from './../pages/ButtonsPage'

import MoleculesPage from './../pages/MoleculesPage'
import OrganismsPage from './../pages/OrganismsPage'

const Routes = (
  <Route path={ROUTES.HOME} component={DefaultLayout}>
    <IndexRoute component={HomePage} />
    <Route path={ROUTES.BONDS} component={BondsLayout}>
      <IndexRoute component={BondsPage} />
      <Route path={ROUTES.COLORS} component={ColorsPage} />
    </Route>
    <Route path={ROUTES.ATOMS} component={AtomsLayout}>
      <IndexRoute component={AtomsPage} />
      <Route path={ROUTES.TYPOGRAPHY} component={TypographyPage} />
      <Route path={ROUTES.BUTTONS} component={ButtonsPage} />
    </Route>
    <Route path={ROUTES.MOLECULES} component={MoleculesLayout}>
      <IndexRoute component={MoleculesPage} />
    </Route>
    <Route path={ROUTES.ORGANISMS} component={OrganismsLayout}>
      <IndexRoute component={OrganismsPage} />
    </Route>
  </Route>
)

export default Routes
