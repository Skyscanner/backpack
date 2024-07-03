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

import { useEffect } from 'react';
import type { ReactNode } from 'react';

import { FloatingPortal } from '@floating-ui/react';

import { cssModules, isDeviceIphone } from '../../bpk-react-utils';
import { withScrim } from '../../bpk-scrim-utils';

import BpkModalInner, { MODAL_STYLING } from './BpkModalInner';

import type { Props as ModalDialogProps, ModalStyle } from './BpkModalInner';

import STYLES from './BpkModal.module.scss';

const getClassName = cssModules(STYLES);
const ScrimBpkModalInner = withScrim(BpkModalInner);

export type Props = Partial<ModalDialogProps> & {
  id: string;
  children: ReactNode;
  dialogRef?: (ref: HTMLElement | null | undefined) => void; // TODO - remove this in a later release as it is not being used. The dialogRef is injected in the withScrim HOC
  isOpen: boolean;
  closeOnScrimClick?: boolean;
  closeOnEscPressed?: boolean;
  renderTarget?: () => HTMLElement | HTMLElement | null;
  modalStyle?: ModalStyle;

  onClose?: (
    arg0?: TouchEvent | MouseEvent | KeyboardEvent,
    arg1?: {
      source: 'ESCAPE' | 'DOCUMENT_CLICK';
    },
  ) => void;
  /**
   * Because this component uses a modal on mobile viewports, you need to let it know what
   * the root element of your application is by returning its DOM node via this prop
   * This is to "hide" your application from screen readers whilst the modal is open.
   * The "pagewrap" element id is a convention we use internally at Skyscanner. In most cases it should "just work".
   */
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
  modalStyle = MODAL_STYLING.default,
  onClose = () => null,
  padded = true,
  renderTarget = () => null,
  showHeader = true,
  title = null,
  wide = false,
  ...rest
}: Props) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && onClose) {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const containerClass = [getClassName('bpk-modal__container')];

  if (fullScreen || isIphone) {
    containerClass.push(getClassName('bpk-modal__container--full-screen'));
  } else if (fullScreenOnMobile) {
    containerClass.push(
      getClassName('bpk-modal__container--full-screen-mobile'),
    );
  }

  const renTarget = typeof renderTarget === 'function' ? renderTarget() : renderTarget 

  return (
    <>
      {isOpen && (
        <FloatingPortal root={renTarget}>
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
            modalStyle={modalStyle}
            {...rest}
          />
        </FloatingPortal>
      )}
    </>
  );
};

export default BpkModal;
