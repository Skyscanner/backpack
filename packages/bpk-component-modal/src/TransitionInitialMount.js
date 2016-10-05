import React, { PropTypes } from 'react'

import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

const FirstChild = (props) => {
  const children = React.Children.toArray(props.children)
  return children[ 0 ] || null
}

const TransitionInitialMount = (props) => (
  <ReactCSSTransitionGroup
    component={FirstChild}
    transitionName={{
      appear: `${props.classNamePrefix}--appear`,
      appearActive: `${props.classNamePrefix}--appear-active`
    }}
    transitionAppear={true}
    transitionAppearTimeout={props.transitionTimeout}
    transitionEnterTimeout={0}
    transitionLeaveTimeout={0}>
    {props.children}
  </ReactCSSTransitionGroup>
)

TransitionInitialMount.propTypes = {
  classNamePrefix: PropTypes.string.isRequired,
  transitionTimeout: PropTypes.number.isRequired
}

export default TransitionInitialMount
