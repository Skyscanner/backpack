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
import { cssModules } from 'bpk-react-utils';
import BpkCloseButton from 'bpk-component-close-button';
import BpkModal, {
  type BpkModalProps,
  propTypes as modalPropTypes,
  defaultProps as modalDefaultProps,
} from 'bpk-component-modal';

import STYLES from './BpkDialog.css';
import { onClosePropType } from './customPropTypes';

const getClassName = cssModules(STYLES);

export type Props = {
  ...$Exact<BpkModalProps>,
  dismissible: boolean,
};

const BpkDialog = (props: Props) => {
  const { children, dismissible, onClose, closeLabel, ...rest } = props;

  return (
    <BpkModal
      {...rest}
      onClose={onClose}
      showHeader={false}
      closeLabel={closeLabel}
      closeOnScrimClick={dismissible}
      closeOnEscPressed={dismissible}
      fullScreenOnMobile={false}
      isIphone={false}
    >
      {dismissible && (
        <BpkCloseButton
          className={getClassName('bpk-dialog__close-button')}
          label={closeLabel}
          onClick={onClose}
        />
      )}
      {children}
    </BpkModal>
  );
};

const {
  title,
  showHeader,
  closeOnScrimClick,
  closeOnEscPressed,
  fullScreenOnMobile,
  ...newModalPropTypes
} = modalPropTypes;

BpkDialog.propTypes = {
  ...newModalPropTypes,
  onClose: onClosePropType,
  dismissible: PropTypes.bool,
};

BpkDialog.defaultProps = {
  ...modalDefaultProps,
  onClose: null,
  dismissible: true,
};

export default BpkDialog;
