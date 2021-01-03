/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016-2021 Skyscanner Ltd
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

import React, { type Node } from 'react';
import PropTypes from 'prop-types';
import { cssModules } from 'bpk-react-utils';
import BpkCloseButton from 'bpk-component-close-button';
import BpkModal, {
  type BpkModalProps,
  propTypes as modalPropTypes,
  defaultProps as modalDefaultProps,
} from 'bpk-component-modal';
import { BpkContentBubble } from 'bpk-component-flare';

import STYLES from './BpkDialog.scss';

const getClassName = cssModules(STYLES);

export const HEADER_ICON_TYPES = {
  primary: 'primary',
  warning: 'warning',
  destructive: 'destructive',
};

export type Props = {
  ...$Exact<BpkModalProps>,
  dismissible: boolean,
  flare: boolean,
  flareClassName: ?string,
  headerIcon: ?Node,
  headerIconType: $Keys<typeof HEADER_ICON_TYPES>,
};

const BpkDialog = (props: Props) => {
  const {
    children,
    closeLabel,
    dismissible,
    flare,
    flareClassName,
    headerIcon,
    headerIconType,
    onClose,
    ...rest
  } = props;

  const contentClassNames = getClassName('bpk-dialog--with-icon');
  const flareClassNames = getClassName('bpk-dialog__flare', flareClassName);
  const headerIconClassNames = getClassName(
    'bpk-dialog__icon',
    `bpk-dialog__icon--${headerIconType}`,
  );
  const closeButtonClassNames = getClassName('bpk-dialog__close-button');

  return (
    <BpkModal
      {...rest}
      onClose={onClose}
      showHeader={false}
      closeLabel={closeLabel}
      closeOnScrimClick={dismissible}
      closeOnEscPressed={dismissible}
      fullScreenOnMobile={false}
      isIphone={false}
      contentClassName={headerIcon ? contentClassNames : null}
      INTERNAL__outerComponent={
        flare ? <BpkContentBubble className={flareClassNames} /> : null
      }
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
    </BpkModal>
  );
};

const {
  title,
  showHeader,
  closeOnScrimClick,
  closeOnEscPressed,
  fullScreenOnMobile,
  ...newModalPropTypes
} = modalPropTypes;

BpkDialog.propTypes = {
  ...newModalPropTypes,
  onClose: PropTypes.func,
  dismissible: PropTypes.bool,
  flare: PropTypes.bool,
  flareClassName: PropTypes.string,
  headerIcon: PropTypes.node,
  headerIconType: PropTypes.oneOf(Object.keys(HEADER_ICON_TYPES)),
};

BpkDialog.defaultProps = {
  ...modalDefaultProps,
  onClose: () => null,
  dismissible: true,
  flare: false,
  flareClassName: null,
  headerIcon: null,
  headerIconType: HEADER_ICON_TYPES.primary,
};

export default BpkDialog;
