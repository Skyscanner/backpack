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
import React, { type Element } from 'react';
import { withScrim } from 'bpk-scrim-utils';
import { Portal, cssModules } from 'bpk-react-utils';

import STYLES from './bpk-modal.scss';
import BpkModalDialog, {
  type Props as ModalDialogProps,
} from './BpkModalDialog';
import { modalOnClosePropType } from './customPropTypes';

const getClassName = cssModules(STYLES);
const ScrimBpkModalDialog = withScrim(BpkModalDialog);

// Please remove this type when `withScrim` is flow-typed
type ScrimProps = {
  isIphone: boolean,
  dialogRef: () => ?HTMLElement,
  closeEvents: {
    onTouchStart: (event: SyntheticEvent<>) => void,
    onTouchMove: (event: SyntheticEvent<>) => void,
    onTouchEnd: (event: SyntheticEvent<>) => void,
    onMouseDown: (event: SyntheticEvent<>) => void,
    onMouseMove: (event: SyntheticEvent<>) => void,
    onMouseUp: (event: SyntheticEvent<>) => void,
  },
};

export type Props = {
  // The `withScrim` HOC satisfies some of the ModalDialogs required
  // props but it's not flow typed yet so this
  // diff will suffice for now.
  ...$Exact<$Diff<ModalDialogProps, ScrimProps>>,
  isOpen: boolean,
  closeOnScrimClick: boolean,
  closeOnEscPressed: boolean,
  renderTarget: ?() => ?HTMLElement,
  target: ?((() => ?HTMLElement) | Element<any>),
};

const BpkModal = (props: Props) => {
  const {
    isOpen,
    onClose,
    target,
    renderTarget,
    fullScreenOnMobile,
    closeOnScrimClick,
    closeOnEscPressed,
    ...rest
  } = props;

  const containerClass = [getClassName('bpk-modal__container')];

  if (fullScreenOnMobile) {
    containerClass.push(getClassName('bpk-modal__container--full-screen'));
  }

  return (
    <Portal
      isOpen={isOpen}
      onClose={onClose}
      target={target}
      renderTarget={renderTarget}
      closeOnEscPressed={closeOnEscPressed}
    >
      <ScrimBpkModalDialog
        onClose={onClose}
        fullScreenOnMobile={fullScreenOnMobile}
        closeOnScrimClick={closeOnScrimClick}
        containerClassName={containerClass.join(' ')}
        {...rest}
      />
    </Portal>
  );
};

// isIphone, dialogRef and closeEvents are provided by the withScrim HOC
const {
  isIphone,
  dialogRef,
  closeEvents,
  ...modalDialogPropTypes
} = BpkModalDialog.propTypes;

BpkModal.propTypes = {
  ...modalDialogPropTypes,
  onClose: modalOnClosePropType,
  isOpen: PropTypes.bool.isRequired,
  renderTarget: PropTypes.func,
  target: PropTypes.oneOfType([PropTypes.func, PropTypes.element]),
  closeOnScrimClick: PropTypes.bool,
  closeOnEscPressed: PropTypes.bool,
};

BpkModal.defaultProps = {
  ...BpkModalDialog.defaultProps,
  renderTarget: null,
  target: null,
  closeOnScrimClick: true,
  closeOnEscPressed: true,
};

export default BpkModal;
