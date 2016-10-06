import React from 'react'

import { BpkButtonLink } from 'bpk-component-link'

const getHtmlElement = () => {
  return typeof document !== 'undefined' ? document.querySelector('html') : {}
}

const getDirection = () => {
  return getHtmlElement().dir || DIRECTIONS.LTR
}

const setDirection = (direction) => {
  getHtmlElement().dir = direction
}

const DIRECTIONS = {
  LTR: 'ltr',
  RTL: 'rtl'
}

class BpkRtlToggle extends React.Component {
  constructor (props) {
    super(props)

    this.toggleRtl = this.toggleRtl.bind(this)

    this.state = {
      direction: getDirection()
    }
  }

  toggleRtl (e) {
    e.preventDefault()

    const direction = getDirection() === DIRECTIONS.RTL ? DIRECTIONS.LTR : DIRECTIONS.RTL

    setDirection(direction)

    this.setState({ direction })
  }

  render () {
    const onOrOff = this.state.direction === DIRECTIONS.RTL ? 'off' : 'on'

    return <BpkButtonLink onClick={this.toggleRtl}>Toggle RTL {onOrOff}</BpkButtonLink>
  }
}

export default BpkRtlToggle

