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

/* @flow */

import React from 'react';
import PropTypes from 'prop-types';
import BpkModal, { type BpkModalProps } from 'bpk-component-modal';

import { titlePropType } from './customPropTypes';

export type Props = {
  ...$Exact<BpkModalProps>,
  dismissible: boolean,
};

const BpkDialog = (props: Props) => {
  const { dismissible, ...rest } = props;

  return (
    <BpkModal
      {...rest}
      showHeader={dismissible}
      closeOnScrimClick={dismissible}
      closeOnEscPressed={dismissible}
      fullScreenOnMobile={false}
    />
  );
};

const {
  showHeader,
  closeOnScrimClick,
  closeOnEscPressed,
  fullScreenOnMobile,
  ...modalPropTypes
} = BpkModal.propTypes;

BpkDialog.propTypes = {
  ...modalPropTypes,
  title: titlePropType,
  dismissible: PropTypes.bool,
};

BpkDialog.defaultProps = {
  ...BpkModal.defaultProps,
  dismissible: true,
};

export default BpkDialog;
