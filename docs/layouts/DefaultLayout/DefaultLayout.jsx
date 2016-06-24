import React from 'react'
import Helmet from 'react-helmet'

import './../../../base.scss'

import Header from '../../components/Header'
import styles from './default-layout.scss'

export const DefaultLayout = ({ children }) => (
  <div>
    <Helmet titleTemplate='%s | Living Styles' />
    <Header />
    <main className={styles.main}>
      {children}
    </main>
    <footer className={styles.footer}>Part of the Backpack Design System.</footer>
  </div>
)

DefaultLayout.propTypes = {
  children: React.PropTypes.element.isRequired
}

export default DefaultLayout
