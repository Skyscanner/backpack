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

import React, { type Node } from 'react';
import PropTypes from 'prop-types';
// TODO: close button is not really only a close button, we should rename and update the import here
import { BpkButtonLink } from 'bpk-component-link';
import { cssModules } from 'bpk-react-utils';

import STYLES from './BpkNavigationBarButtonLink.css';

const getClassName = cssModules(STYLES);

export type Props = {
  children: Node,
  onClick: (event: SyntheticEvent<>) => void,
  className: ?string,
};

const BpkNavigationBarButtonLink = ({ className, ...rest }: Props) => (
  <BpkButtonLink
    className={getClassName('bpk-navigation-bar-button-link', className)}
    {...rest}
  />
);

BpkNavigationBarButtonLink.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
};

BpkNavigationBarButtonLink.defaultProps = {
  className: null,
};

export default BpkNavigationBarButtonLink;
