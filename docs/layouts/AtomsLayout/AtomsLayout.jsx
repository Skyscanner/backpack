import React, { PropTypes } from 'react'

import * as routes from './../../constants/routes'

import SideNavLayout from './../SideNavLayout'

const links = [
  { route: routes.ROUTE_TYPOGRAPHY, children: 'Typography' },
  { route: routes.ROUTE_BUTTONS, children: 'Buttons' }
]

export const AtomsLayout = ({ children }) => (
  <SideNavLayout links={links}>
    {children}
  </SideNavLayout>
)

AtomsLayout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired

}

export default AtomsLayout
