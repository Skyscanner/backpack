import React from 'react'
import Helmet from 'react-helmet'
import CssModules from 'react-css-modules'

import './../../../base.scss'

import styles from './default-layout.scss'

import Header from '../../components/Header'

export const DefaultLayout = ({ children }) => (
  <div>
    <Helmet titleTemplate='%s | Backpack'/>
    <Header />
    <main styleName='main'>
      {children}
    </main>
    <footer styleName='footer'>Some footer blurb.</footer>
  </div>
)

DefaultLayout.propTypes = {
  children: React.PropTypes.element.isRequired
}

export default CssModules(DefaultLayout, styles)
