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

import BpkCloseButton from '../../bpk-component-close-button';
import { cssModules, Portal, getDataComponentAttribute } from '../../bpk-react-utils';

import BpkDialogInner from './BpkDialogInner';
import { HEADER_ICON_TYPES } from './common-types';

import type { Props } from './common-types';

import STYLES from './BpkDialog.module.scss';

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

  if (!onClose && dismissible === true) {
    // eslint-disable-next-line no-console
    console.warn(
      'BpkDialog: dismissible is true but no onClose prop was provided. Dialog will not be dismissible.',
    );
  }

  return (
    <Portal
      isOpen={isOpen}
      onClose={onClose}
      renderTarget={renderTarget}
      closeOnEscPressed={dismissible}
    >
      <BpkDialogInner
        onClose={onClose}
        closeOnScrimClick={dismissible}
        containerClassName={getClassName('bpk-dialog__container')}
        contentClassName={
          headerIcon ? getClassName('bpk-dialog--with-icon') : undefined
        }
        {...rest}
        {...getDataComponentAttribute('Dialog')}
      >
        {headerIcon && <div className={headerIconClassNames}>{headerIcon}</div>}
        {dismissible && onClose && (
          <span className={closeButtonClassNames}>
            <BpkCloseButton label={closeLabel} onClick={() => onClose()} />
          </span>
        )}
        {children}
      </BpkDialogInner>
    </Portal>
  );
};

export default BpkDialog;
