import React, { PropTypes } from 'react';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

const FirstChild = (props) => {
  const children = React.Children.toArray(props.children);
  return children[0] || null;
};

const TransitionInitialMount = props => (
  <CSSTransitionGroup
    component={FirstChild}
    transitionName={{
      appear: `${props.classNamePrefix}--appear`,
      appearActive: `${props.classNamePrefix}--appear-active`,
    }}
    transitionAppear
    transitionAppearTimeout={props.transitionTimeout}
    transitionEnterTimeout={0}
    transitionLeaveTimeout={0}
  >
    {props.children}
  </CSSTransitionGroup>
);

TransitionInitialMount.propTypes = {
  children: PropTypes.node.isRequired,
  classNamePrefix: PropTypes.string.isRequired,
  transitionTimeout: PropTypes.number.isRequired,
};

export default TransitionInitialMount;
