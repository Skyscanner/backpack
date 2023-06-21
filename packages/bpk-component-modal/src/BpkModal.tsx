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

import type { ReactNode } from 'react';

import { withScrim } from '../../bpk-scrim-utils';
import { Portal, cssModules, isDeviceIphone } from '../../bpk-react-utils';

import STYLES from './BpkModal.module.scss';
import BpkModalInner from './BpkModalInner';
import type { Props as ModalDialogProps } from './BpkModalInner';

const getClassName = cssModules(STYLES);
const ScrimBpkModalInner = withScrim(BpkModalInner);

export type Props = Partial<ModalDialogProps> & {
  id: string;
  children: ReactNode;
  dialogRef?: (ref: HTMLElement | null | undefined) => void; // TODO - remove this in a later release as it is not being used. The dialogRef is injected in the withScrim HOC
  isOpen: boolean;
  closeOnScrimClick?: boolean;
  closeOnEscPressed?: boolean;
  renderTarget?: null | HTMLElement | (() => null | HTMLElement);
  onClose?: (
    arg0?: TouchEvent | MouseEvent | KeyboardEvent,
    arg1?: {
      source: 'ESCAPE' | 'DOCUMENT_CLICK';
    },
  ) => void;
  getApplicationElement: () => HTMLElement | null;
};

const BpkModal = ({
  accessoryView = null,
  className = null,
  closeLabel = '',
  closeOnEscPressed = true,
  closeOnScrimClick = true,
  closeText = null,
  contentClassName = null,
  dialogRef = () => null,
  fullScreen = false,
  fullScreenOnMobile = true,
  isIphone = isDeviceIphone(),
  isOpen,
  onClose = () => null,
  padded = true,
  renderTarget = null,
  showHeader = true,
  title = null,
  wide = false,
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
        title={title}
        className={className}
        contentClassName={contentClassName}
        closeLabel={closeLabel}
        closeText={closeText}
        wide={wide}
        showHeader={showHeader}
        padded={padded}
        accessoryView={accessoryView}
        dialogRef={dialogRef}
        {...rest}
      />
    </Portal>
  );
};

export default BpkModal;
