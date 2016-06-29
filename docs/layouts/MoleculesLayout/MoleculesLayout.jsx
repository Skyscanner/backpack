import React, { PropTypes } from 'react'

import SideNavLayout from './../SideNavLayout'

const links = [
  { route: 'foo', children: 'Coming soon' },
  { route: 'bar', children: 'Coming soon' },
  { route: 'baz', children: 'Coming soon' }
]

export const MoleculesLayout = ({ children }) => (
  <SideNavLayout links={links}>
    {children}
  </SideNavLayout>
)

MoleculesLayout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired

}

export default MoleculesLayout
