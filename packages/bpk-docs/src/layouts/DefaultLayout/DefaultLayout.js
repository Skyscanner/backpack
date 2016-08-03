import React, { PropTypes } from 'react'
import Helmet from 'react-helmet'

import BpkLink from 'bpk-component-link'

import './default-layout.scss'
import Header from '../../components/Header'

export class DefaultLayout extends React.Component {
  constructor (props) {
    super(props)

    this.toggleGrid = this.toggleGrid.bind(this)

    this.state = {
      guideEnabled: false
    }
  }

  toggleGrid () {
    this.setState({
      guideEnabled: !this.state.guideEnabled
    })
  }

  render () {
    const { children } = this.props
    const { guideEnabled } = this.state

    return (
      <div className={guideEnabled ? 'bpkdocs-default-layout__vertical-rhythm-guide' : ''}>
        <Helmet titleTemplate='%s | Backpack' />
        <Header />
        <main>
          {children}
        </main>
        <footer className='bpkdocs-default-layout__footer'>
          Copyright Skyscanner {new Date().getFullYear()}.
          &nbsp;
          <button type='button' className='bpkdocs-default-layout__vertical-rhythm-guide-toggle'
            onClick={this.toggleGrid}>
            Vertical rhythm guide is {guideEnabled ? 'on' : 'off'}.
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

export default DefaultLayout
