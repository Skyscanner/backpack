import React, { PropTypes } from 'react'

import SideNavLayout from './../SideNavLayout'
import * as routes from './../../constants/routes'

const links = [
  { route: routes.GETTING_STARTED, children: 'Getting started' },
  {
    category: 'Bonds',
    links: [
      { route: routes.BASE_STYLESHEET, children: 'Base stylesheet' },
      { route: routes.COLORS, children: 'Colors' },
      { route: routes.FONTS_AND_SPACING, children: 'Fonts and spacing' },
    ]
  },
  {
    category: 'Atoms',
    links: [
      { route: routes.TYPOGRAPHY, children: 'Typography' },
      { route: routes.BUTTONS, children: 'Buttons' },
      { route: routes.ICONS, children: 'Icons' },
      { route: routes.SPINNERS, children: 'Spinners' },
      { route: routes.LOGOS, children: 'Logos' }
    ]
  }
]

export const DocsLayout = ({ children }) => (
  <SideNavLayout links={links}>
    {children}
  </SideNavLayout>
)

DocsLayout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
}

export default DocsLayout
