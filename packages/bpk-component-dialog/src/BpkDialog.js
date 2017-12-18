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

import PropTypes from 'prop-types';
import React from 'react';
import { cssModules } from 'bpk-react-utils';

import BpkModal from 'bpk-component-modal';
import STYLES from './bpk-dialog.scss';

const getClassName = cssModules(STYLES);

const BpkDialog = (props) => {
  const {
    isOpen, onClose, target, dismissible, ...rest
  } = props;

  return (
    <BpkModal
      isOpen={isOpen}
      onClose={dismissible ? onClose : () => {}}
      target={target}
      containerClassName={getClassName('bpk-dialog__container')}
      dismissible={dismissible}
      visibleBackground
      dialog
      {...rest}
    />
  );
};

BpkDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  target: PropTypes.element,
  dismissible: PropTypes.bool,
};

BpkDialog.defaultProps = {
  target: null,
  dismissible: true,
};

export default BpkDialog;
