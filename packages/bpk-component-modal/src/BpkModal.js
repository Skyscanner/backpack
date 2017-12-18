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
import { Portal, cssModules } from 'bpk-react-utils';
import { withScrim } from 'bpk-scrim-utils';

import BpkModalDialog from './BpkModalDialog';
import STYLES from './bpk-modal.scss';

const getClassName = cssModules(STYLES);
const ScrimBpkModalDialog = withScrim(BpkModalDialog);

const BpkModal = (props) => {
  const {
    isOpen,
    onClose,
    target,
    renderTarget,
    hideBackgroundOnMobile,
    ...rest
  } = props;

  delete rest.onClose;

  return (
    <Portal isOpen={isOpen} onClose={onClose} target={target} renderTarget={renderTarget}>
      <ScrimBpkModalDialog
        onClose={onClose}
        containerClassName={getClassName('bpk-modal__container')}
        hideBackgroundOnMobile={hideBackgroundOnMobile}
        {...rest}
      />
    </Portal>
  );
};

BpkModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  renderTarget: PropTypes.func,
  target: PropTypes.oneOfType([PropTypes.func, PropTypes.element]),
  hideBackgroundOnMobile: PropTypes.bool,
};

BpkModal.defaultProps = {
  renderTarget: null,
  target: null,
  hideBackgroundOnMobile: true,
};

export default BpkModal;
