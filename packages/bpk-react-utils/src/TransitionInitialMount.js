/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2017 Skyscanner Ltd
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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

const TransitionInitialMount = ({
  appearClassName, appearActiveClassName, transitionTimeout, children,
}) => (
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
