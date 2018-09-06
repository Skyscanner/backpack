/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2018 Skyscanner Ltd
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

import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { cssModules } from 'bpk-react-utils';

import STYLES from './bpk-router-link.css';

const getClassName = cssModules(STYLES);

const BpkRouterLink = props => {
  const classNames = [getClassName('bpk-router-link')];
  const { children, to, className, ...rest } = props;

  if (className) {
    classNames.push(className);
  }

  return (
    <NavLink
      className={classNames.join(' ')}
      activeClassName={getClassName('bpk-router-link--active')}
      to={to}
      {...rest}
    >
      {children}
    </NavLink>
  );
};

BpkRouterLink.propTypes = {
  children: PropTypes.node.isRequired,
  to: PropTypes.oneOfType([PropTypes.object, PropTypes.string]).isRequired,
  className: PropTypes.string,
};

BpkRouterLink.defaultProps = {
  className: null,
};

export default BpkRouterLink;
