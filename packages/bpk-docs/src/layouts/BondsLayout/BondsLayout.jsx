import React, { PropTypes } from 'react'

import SideNavLayout from './../SideNavLayout'
import * as routes from './../../constants/routes'

const links = [
  { route: routes.BASE_STYLESHEET, children: 'Base stylesheet' },
  { route: routes.COLORS, children: 'Colours' },
  { route: routes.FONTS_AND_SPACING, children: 'Fonts and spacing' }
]

export const BondsLayout = ({ children }) => (
  <SideNavLayout links={links}>
    {children}
  </SideNavLayout>
)

BondsLayout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired

}

export default BondsLayout
