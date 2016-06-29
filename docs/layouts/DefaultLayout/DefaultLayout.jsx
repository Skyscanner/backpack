import React, { PropTypes } from 'react'
import Helmet from 'react-helmet'
import CssModules from 'react-css-modules'

import './../../../base.scss'

import styles from './default-layout.scss'
import pkg from './../../../package.json'

import Header from '../../components/Header'
import BpkLink from '../../components/BpkLink'

export class DefaultLayout extends React.Component {
  constructor (props) {
    super(props)

    this.toggleGrid = this.toggleGrid.bind(this)

    this.state = {
      gridEnabled: false
    }
  }

  toggleGrid () {
    this.setState({
      gridEnabled: !this.state.gridEnabled
    })
  }

  render () {
    const { children } = this.props
    const { gridEnabled } = this.state

    return (
      <div>
        {gridEnabled
          ? <span styleName='bpkdocs-default-layout__grid-overlay' onClick={this.toggleGrid}></span>
          : null
        }
        <Helmet titleTemplate='%s | Backpack' />
        <Header />
        <main>
          {children}
        </main>
        <footer styleName='bpkdocs-default-layout__footer'>
          v{pkg.version}. Copyright Skyscanner {new Date().getFullYear()}.
          &nbsp;
          <button type='button' styleName='bpkdocs-default-layout__grid-toggle' onClick={this.toggleGrid}>
            Grid is {gridEnabled ? 'on' : 'off'}.
          </button>
          <br />
          Maintained by the <BpkLink href='mailto:backpack@skyscanner.net'>Backpack Design System Squad</BpkLink>
        </footer>
      </div>
    )
  }
}

DefaultLayout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
}

export default CssModules(DefaultLayout, styles)
