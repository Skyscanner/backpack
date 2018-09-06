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

import React, { type ComponentType } from 'react';
import PropTypes from 'prop-types';
// TODO: close button is not really only a close button, we should rename and update the import here
import BpkIconButton from 'bpk-component-close-button';
import { cssModules } from 'bpk-react-utils';

import STYLES from './BpkNavigationBarIconButton.css';

const getClassName = cssModules(STYLES);

export type Props = {
  icon: ComponentType<any>,
  label: string,
  onClick: (event: SyntheticEvent<>) => mixed,
  className: ?string,
};

const BpkNavigationBarIconButton = ({ icon, className, ...rest }: Props) => (
  <BpkIconButton
    customIcon={icon}
    className={getClassName('bpk-navigation-bar-icon-button', className)}
    {...rest}
  />
);

BpkNavigationBarIconButton.propTypes = {
  icon: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
};

BpkNavigationBarIconButton.defaultProps = {
  className: null,
};

export default BpkNavigationBarIconButton;
