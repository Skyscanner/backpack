import React, { PropTypes } from 'react'

import * as routes from './../../constants/routes'

import SideNavLayout from './../SideNavLayout'

const links = [
  { route: routes.COLORS, children: 'Colours' }
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
