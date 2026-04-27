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

import { Dialog } from '@ark-ui/react';

// @ts-expect-error Untyped import. See `decisions/imports-ts-suppressions.md`.
import BpkCloseButton from '../../../../bpk-component-close-button';
import CloseIcon from '../../../../bpk-component-icon/sm/close';
import { cssModules, getDataComponentAttribute } from '../../../../bpk-react-utils';

import STYLES from './BpkModalV3CloseTrigger.module.scss';

const getClassName = cssModules(STYLES);

type BpkModalV3CloseTriggerProps = {
  label: string;
  onImage?: boolean;
};

// BpkModalV3CloseTrigger renders a button that closes the modal when activated.
// When onImage is true it renders a bare icon button suitable for placement over a hero image; otherwise it renders a standard BpkCloseButton.
const BpkModalV3CloseTrigger = ({
  label,
  onImage = false,
}: BpkModalV3CloseTriggerProps) => {
  if (onImage) {
    return (
      <Dialog.CloseTrigger
        className={getClassName('bpk-modal-v3__close-trigger--on-image')}
        aria-label={label}
        {...getDataComponentAttribute('ModalV3CloseTrigger')}
      >
        <CloseIcon />
      </Dialog.CloseTrigger>
    );
  }

  return (
    <Dialog.CloseTrigger asChild>
      <BpkCloseButton
        label={label}
        onClick={() => {}}
        {...getDataComponentAttribute('ModalV3CloseTrigger')}
      />
    </Dialog.CloseTrigger>
  );
};

export default BpkModalV3CloseTrigger;
export type { BpkModalV3CloseTriggerProps };
