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

import { cssModules, Portal } from '../../bpk-react-utils';
// @ts-expect-error Untyped import. See `decisions/imports-ts-suppressions.md`.
import BpkCloseButton from '../../bpk-component-close-button';

import BpkDialogInner from './BpkDialogInner';
import type { Props } from './common-types';
import { HEADER_ICON_TYPES } from './common-types';
import STYLES from './BpkDialog.module.scss';
import { useEffect, useRef } from 'react';

const getClassName = cssModules(STYLES);

const BpkDialog = ({
  children,
  closeLabel = '',
  dismissible = true,
  headerIcon = null,
  headerIconType = HEADER_ICON_TYPES.primary,
  isOpen,
  onClose,
  renderTarget = () => null,
  ...rest
}: Props) => {
  const headerIconClassNames = getClassName(
    'bpk-dialog__icon',
    `bpk-dialog__icon--${headerIconType}`,
  );
  const closeButtonClassNames = getClassName('bpk-dialog__close-button');

  // if(!onClose && dismissible === true) {
  //   // eslint-disable-next-line no-console
  //   console.warn('BpkDialog: dismissible is true but no onClose prop was provided. Dialog will not be dismissible.');
  // }

  const dialogRef = useRef(null)
  console.log(dialogRef)



  const clickCheck = (e) => {
    if(dialogRef.current){
      const rect = e.target.getBoundingClientRect();

      const clickedInDialog = (
          rect.top <= e.clientY &&
          e.clientY <= rect.top + rect.height &&
          rect.left <= e.clientX &&
          e.clientX <= rect.left + rect.width
      );
  
      if (clickedInDialog === false && dismissible)
          e.target.close();
    }
  }

  if(dialogRef.current){
    dialogRef.current.addEventListener("click", clickCheck)
    dialogRef.current.showModal()
  }

  useEffect(() => {
    if(isOpen){
      dialogRef.current.showModal()
    }

    if(!isOpen){
      dialogRef.current.close()
    }
  }, [isOpen])

  return (
    <dialog ref={dialogRef} style={{border: "none"}}>
      <BpkDialogInner
        containerClassName={getClassName('bpk-dialog__container')}
        contentClassName={
          headerIcon ? getClassName('bpk-dialog--with-icon') : undefined
        }
        {...rest}
      >
        {headerIcon && <div className={headerIconClassNames}>{headerIcon}</div>}
        <form method='dialog'>
          {dismissible && (
            <BpkCloseButton
              type={"submit"}
              autoFocus
              className={closeButtonClassNames}
              label={closeLabel}
            />
          )}
        </form>
        {children}
      </BpkDialogInner>
    </dialog>
  );
};

export default BpkDialog;
