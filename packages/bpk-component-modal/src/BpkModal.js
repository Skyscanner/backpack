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
import React from 'react';

import { withScrim } from '../../bpk-scrim-utils';
import { Portal, cssModules, isDeviceIphone } from '../../bpk-react-utils';

import STYLES from './BpkModal.module.scss';
import BpkModalInner, {
  propTypes as modalDialogPropTypes,
  defaultProps as modalDialogDefaultProps,
  type Props as ModalDialogProps,
} from './BpkModalInner';

const getClassName = cssModules(STYLES);
const ScrimBpkModalInner = withScrim(BpkModalInner);

// Please remove this type when `withScrim` is flow-typed
type ScrimProps = {
  isIphone: boolean,
  dialogRef: () => ?HTMLElement,
};

export type Props = {
  // The `withScrim` HOC satisfies some of the ModalDialogs required
  // props but it's not flow typed yet so this
  // diff will suffice for now.
  ...$Exact<$Diff<ModalDialogProps, ScrimProps>>,
  isOpen: boolean,
  isIphone: boolean,
  closeOnScrimClick: boolean,
  closeOnEscPressed: boolean,
  renderTarget: ?() => ?HTMLElement,
  onClose: (event: SyntheticEvent<>) => void | null,
};

const BpkModal = (props: Props) => {
  const {
    closeOnEscPressed,
    closeOnScrimClick,
    fullScreen,
    fullScreenOnMobile,
    isIphone,
    isOpen,
    onClose,
    renderTarget,
    ...rest
  } = props;

  const containerClass = [getClassName('bpk-modal__container')];

  if (fullScreen || isIphone) {
    containerClass.push(getClassName('bpk-modal__container--full-screen'));
  } else if (fullScreenOnMobile) {
    containerClass.push(
      getClassName('bpk-modal__container--full-screen-mobile'),
    );
  }

  return (
    <Portal
      isOpen={isOpen}
      onClose={onClose}
      renderTarget={renderTarget}
      closeOnEscPressed={closeOnEscPressed}
    >
      {/* $FlowFixMe[cannot-spread-inexact] - inexact rest. See 'decisions/flowfixme.md'. */}
      <ScrimBpkModalInner
        onClose={onClose}
        fullScreenOnMobile={fullScreenOnMobile}
        fullScreen={fullScreen}
        closeOnScrimClick={closeOnScrimClick}
        containerClassName={containerClass.join(' ')}
        isIphone={isIphone}
        {...rest}
      />
    </Portal>
  );
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

BpkModal.propTypes = { ...propTypes };
BpkModal.defaultProps = { ...defaultProps };

export default BpkModal;
