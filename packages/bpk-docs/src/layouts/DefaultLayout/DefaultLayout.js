import React, { PropTypes } from 'react'
import Helmet from 'react-helmet'

import BpkLink from 'bpk-component-link'
import BpkGridToggle from 'bpk-component-grid-toggle'

import './default-layout.scss'
import Header from '../../components/Header'

const DefaultLayout = ({ children }) => (
  <div>
    <Helmet titleTemplate='%s | Backpack' />
    <Header />
    <main>{children}</main>
    <footer className='bpkdocs-default-layout__footer'>
      Copyright Skyscanner {new Date().getFullYear()}. <BpkGridToggle /><br />
      Maintained by the <BpkLink href='mailto:backpack@skyscanner.net'>Backpack Design System Squad</BpkLink>
    </footer>
  </div>
)

DefaultLayout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
}

export default DefaultLayout
