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

import { withScrim } from '../../bpk-scrim-utils';
import { Portal, cssModules, isDeviceIphone } from '../../bpk-react-utils';

import STYLES from './BpkModal.module.scss';
import BpkModalInner from './BpkModalInner';
import type { Props as ModalDialogProps } from './BpkModalInner';

const getClassName = cssModules(STYLES);
const ScrimBpkModalInner = withScrim(BpkModalInner);

export type Props = ModalDialogProps & {
  isOpen: boolean;
  closeOnScrimClick?: boolean;
  closeOnEscPressed?: boolean;
  renderTarget?: null | HTMLElement | (() => null | HTMLElement);
  onClose: (
    arg0: TouchEvent | MouseEvent | KeyboardEvent,
    arg1: {
      source: 'ESCAPE' | 'DOCUMENT_CLICK';
    },
  ) => void;
  getApplicationElement: () => HTMLElement | null;
};

const BpkModal = ({
  title = null,
  onClose = () => null,
  className = null,
  contentClassName = null,
  closeLabel = '',
  closeText = null,
  wide = false,
  showHeader = true,
  fullScreenOnMobile = true,
  fullScreen = false,
  padded = true,
  accessoryView = null,
  renderTarget = null,
  isIphone = isDeviceIphone(),
  closeOnScrimClick = true,
  closeOnEscPressed = true,
  isOpen,
  ...rest
}: Props) => {
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

export default BpkModal;
