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

/* @flow */

import PropTypes from 'prop-types';
import React, { type Node, Children } from 'react';
import { cssModules } from 'bpk-react-utils';

import { BADGE_TYPES } from './index';
import STYLES from './badge-layout.css';

const getClassName = cssModules(STYLES);

const LIGHT_BADGES = [
  BADGE_TYPES.light,
  BADGE_TYPES.inverse,
  BADGE_TYPES.outline,
];

export type Props = {
  docked: ?string,
  children: Node,
};

const BadgeLayout = (props: Props) => {
  const { docked, children } = props;
  const classNames = [getClassName('bpk-badge-layout__container')];

  if (
    docked ||
    LIGHT_BADGES.indexOf(Children.toArray(children)[0].props.type) !== -1
  ) {
    classNames.push(getClassName('bpk-badge-layout__container--light'));
  }

  return <div className={classNames.join(' ')}>{children}</div>;
};

BadgeLayout.propTypes = {
  docked: PropTypes.string,
  children: PropTypes.node.isRequired,
};

BadgeLayout.defaultProps = {
  docked: null,
};

export default BadgeLayout;
