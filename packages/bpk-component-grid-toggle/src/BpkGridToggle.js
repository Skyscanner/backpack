import React, { PropTypes } from 'react'

import BpkLink from 'bpk-component-link'

import './bpk-grid-toggle.scss'

const GRID_CLASS_NAME = 'bpk-vertical-grid--on'

class BpkGridToggle extends React.Component {
  constructor (props) {
    super(props)

    this.toggleGrid = this.toggleGrid.bind(this)

    this.state = {
      gridEnabled: false
    }
  }

  toggleGrid (e) {
    e.preventDefault()

    document.querySelector(this.props.targetContainer)
      .classList.toggle(GRID_CLASS_NAME)

    this.setState({
      gridEnabled: !this.state.gridEnabled
    })
  }

  componentWillUnmount () {
    document.querySelector(this.props.targetContainer)
      .classList.remove(GRID_CLASS_NAME)
  }

  render () {
    const { gridEnabled } = this.state
    const onOrOff = gridEnabled ? 'off' : 'on'

    return <BpkLink href='#' onClick={this.toggleGrid}>Toggle baseline grid {onOrOff}</BpkLink>
  }
}

BpkGridToggle.propTypes = {
  targetContainer: PropTypes.string
}

BpkGridToggle.defaultProps = {
  targetContainer: 'body'
}

export default BpkGridToggle

