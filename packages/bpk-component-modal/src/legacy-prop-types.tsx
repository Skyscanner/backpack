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
// @ts-nocheck


import PropTypes from 'prop-types';

import { isDeviceIphone } from '../../bpk-react-utils';

import { titlePropType, onClosePropType } from './customPropTypes';

const modalDialogPropTypes = {
  id: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  isIphone: PropTypes.bool.isRequired,
  dialogRef: PropTypes.func.isRequired,
  title: titlePropType,
  onClose: onClosePropType,
  className: PropTypes.string,
  contentClassName: PropTypes.string,
  closeLabel: PropTypes.string,
  closeText: PropTypes.string,
  wide: PropTypes.bool,
  showHeader: PropTypes.bool,
  fullScreenOnMobile: PropTypes.bool,
  fullScreen: PropTypes.bool,
  padded: PropTypes.bool,
  accesoryView: PropTypes.func,
};

const modalDialogDefaultProps = {
  title: null,
  onClose: () => null,
  className: null,
  contentClassName: null,
  closeLabel: '',
  closeText: null,
  wide: false,
  showHeader: true,
  fullScreenOnMobile: true,
  fullScreen: false,
  padded: true,
  accessoryView: null,
};

const { dialogRef, ...newModalDialogPropTypes } = modalDialogPropTypes;

export const propTypes = {
  ...newModalDialogPropTypes,
  onClose: PropTypes.func,
  isIphone: PropTypes.bool,
  isOpen: PropTypes.bool.isRequired,
  renderTarget: PropTypes.func,
  closeOnScrimClick: PropTypes.bool,
  closeOnEscPressed: PropTypes.bool,
};

export const defaultProps = {
  ...modalDialogDefaultProps,
  onClose: () => null,
  renderTarget: null,
  isIphone: isDeviceIphone(),
  closeOnScrimClick: true,
  closeOnEscPressed: true,
};
