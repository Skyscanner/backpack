/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016 Skyscanner Ltd
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

/* @flow strict */

import PropTypes from 'prop-types';
import type { Node } from 'react';

import { cssModules } from '../../packages/bpk-react-utils';

import STYLES from './BpkBadgeLayout.module.scss';

const getClassName = cssModules(STYLES);

export type Props = {
  docked: ?string,
  children: Node,
};

const BadgeLayout = (props: Props) => {
  const { children, docked } = props;
  const classNames = getClassName(
    'bpk-badge-layout__container',
    docked && 'bpk-badge-layout__container--light',
  );

  return <div className={classNames}>{children}</div>;
};

BadgeLayout.propTypes = {
  docked: PropTypes.string,
  children: PropTypes.node.isRequired,
};

BadgeLayout.defaultProps = {
  docked: null,
};

export default BadgeLayout;
