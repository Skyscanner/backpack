import React, { PropTypes } from 'react'
import Helmet from 'react-helmet'

import BpkGridToggle from 'bpk-component-grid-toggle'

import './default-layout.scss'
import Header from '../../components/Header'

const DefaultLayout = ({ children }) => (
  <div>
    <Helmet titleTemplate='%s | Backpack' />
    <Header />
    <main>{children}</main>
    <footer className='bpkdocs-default-layout__footer'>
      <small className='bpkdocs-default-layout__footer-copyright'>&copy; Copyright Skyscanner {new Date().getFullYear()}</small>
      <div className='bpkdocs-default-layout__footer-toggle'><BpkGridToggle /></div>
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
