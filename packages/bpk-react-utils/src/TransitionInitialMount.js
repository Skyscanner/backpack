import assign from 'object-assign';
import PropTypes from 'prop-types';
import React from 'react';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

// Object.assign() is used unpolyfilled in react-transition-group.
// It will use the native implementation if it's present and isn't buggy.
Object.assign = assign;

const FirstChild = (props) => {
  const children = React.Children.toArray(props.children);
  return children[0] || null;
};

const TransitionInitialMount = ({ appearClassName, appearActiveClassName, transitionTimeout, children }) => (
  <CSSTransitionGroup
    component={FirstChild}
    transitionName={{
      appear: appearClassName,
      appearActive: appearActiveClassName,
    }}
    transitionAppear
    transitionAppearTimeout={transitionTimeout}
    transitionEnterTimeout={0}
    transitionLeaveTimeout={0}
  >
    {children}
  </CSSTransitionGroup>
);

TransitionInitialMount.propTypes = {
  children: PropTypes.node.isRequired,
  appearClassName: PropTypes.string.isRequired,
  appearActiveClassName: PropTypes.string.isRequired,
  transitionTimeout: PropTypes.number.isRequired,
};

export default TransitionInitialMount;
