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

import type { ReactNode } from 'react';
import { useState } from 'react';

import { Portal, isDeviceIphone } from '../../bpk-react-utils';
import { withScrim } from '../../bpk-scrim-utils';

import BpkDrawerContent from './BpkDrawerContent';

const BpkScrimDrawerContent = withScrim(BpkDrawerContent);

export type Props = {
  id: string,
  children: ReactNode;
  isOpen: boolean,
  onClose?: (
    arg0?: TouchEvent | MouseEvent | KeyboardEvent,
    arg1?: {
      source: 'ESCAPE' | 'DOCUMENT_CLICK';
    },
  ) => void;
  title: string,
  getApplicationElement: () => HTMLElement | null,
  renderTarget?: null | HTMLElement | (() => null | HTMLElement),
  dialogRef?: (ref: HTMLElement | null | undefined) => void,
  className?: string | null,
  contentClassName?: string,
  closeLabel?: string | null,
  closeText?: string,
  hideTitle?: boolean,
  isIphone?: boolean,
  padded?: boolean,
  mobileModalDisplay?: boolean,
};

const BpkDrawer = ({
  children,
  className = null,
  closeLabel = null,
  closeText = undefined,
  contentClassName = undefined,
  dialogRef,
  getApplicationElement,
  hideTitle = false,
  id,
  isIphone = isDeviceIphone(),
  isOpen,
  mobileModalDisplay = false,
  onClose,
  padded = true,
  renderTarget = null,
  title,
}: Props) =>  {

  const [isDrawerShown, setIsDrawerShown] = useState(true);

  const onCloseAnimationComplete = () => {
    if (onClose){
      onClose();
    }
  };

  const hide = () => {
    setIsDrawerShown(false)
  };

  return(
      <Portal isOpen={isOpen} onClose={hide} renderTarget={renderTarget}>
        <BpkScrimDrawerContent
          id={id}
          title={title}
          dialogRef={dialogRef}
          closeLabel={closeLabel || ""}
          closeText={closeText}
          additionalClassName={className}
          contentClassName={contentClassName}
          getApplicationElement={getApplicationElement}
          hideTitle={hideTitle}
          isDrawerShown={isDrawerShown}
          onClose={hide}
          onCloseAnimationComplete={onCloseAnimationComplete}
          closeOnScrimClick
          isIpad
          isIphone={isIphone}
          padded={padded}
          mobileModalDisplay={mobileModalDisplay}
        >
          {children}
        </BpkScrimDrawerContent>
      </Portal>
  );
}

export default BpkDrawer;
