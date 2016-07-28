import React, { PropTypes } from 'react'

import SideNavLayout from './../SideNavLayout'
import * as routes from './../../constants/routes'

const links = [
  { route: routes.TYPOGRAPHY, children: 'Typography' },
  { route: routes.BUTTONS, children: 'Buttons' },
  { route: routes.ICONS, children: 'Icons' },
  { route: routes.SPINNERS, children: 'Spinners' },
  { route: routes.LOGOS, children: 'Logos' }
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
