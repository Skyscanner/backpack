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

import React from 'react';

import { cssModules, Portal } from '../../bpk-react-utils';
import BpkCloseButton from '../../bpk-component-close-button';

import BpkDialogInner from './BpkDialogInner';
import { type Props, propTypes, defaultProps } from './common-types';
import STYLES from './BpkDialog.module.scss';

const getClassName = cssModules(STYLES);

const BpkDialog = (props: Props) => {
  const {
    children,
    closeLabel,
    dismissible,
    headerIcon,
    headerIconType,
    isOpen,
    onClose,
    renderTarget,
    ...rest
  } = props;

  const headerIconClassNames = getClassName(
    'bpk-dialog__icon',
    `bpk-dialog__icon--${headerIconType}`,
  );
  const closeButtonClassNames = getClassName('bpk-dialog__close-button');

  return (
    <Portal
      isOpen={isOpen}
      onClose={onClose}
      renderTarget={renderTarget}
      closeOnEscPressed={dismissible}
    >
      {/* $FlowFixMe[cannot-spread-inexact] - inexact rest. See 'decisions/flowfixme.md'. */}
      <BpkDialogInner
        onClose={onClose}
        closeOnScrimClick={dismissible}
        containerClassName={getClassName('bpk-dialog__container')}
        contentClassName={
          headerIcon ? getClassName('bpk-dialog--with-icon') : null
        }
        {...rest}
      >
        {headerIcon && <div className={headerIconClassNames}>{headerIcon}</div>}
        {dismissible && (
          <BpkCloseButton
            className={closeButtonClassNames}
            label={closeLabel}
            onClick={onClose}
          />
        )}
        {children}
      </BpkDialogInner>
    </Portal>
  );
};

BpkDialog.propTypes = {
  ...propTypes,
};

BpkDialog.defaultProps = {
  ...defaultProps,
};

export default BpkDialog;
