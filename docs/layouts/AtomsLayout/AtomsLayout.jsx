import React from 'react'

import * as routes from './../../constants/routes'

import SideNavLayout from './../SideNavLayout'

const links = [
  { route: routes.ROUTE_TYPOGRAPHY, children: 'Typography' }
]

export const AtomsLayout = ({ children }) => (
  <SideNavLayout links={links}>
    {children}
  </SideNavLayout>
)

AtomsLayout.propTypes = {
  children: React.PropTypes.element.isRequired
}

export default AtomsLayout
